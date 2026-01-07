import { NextResponse } from "next/server";

type CheckoutPayload = {
  cart: { id: number; quantity: number }[];
  customer: {
    first_name: string;
    last_name: string;
    email: string;
    phone?: string;
    address?: string;
    city?: string;
    postcode?: string;
  };
  payment_method?: string;
  payment_method_title?: string;
  status?: string;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as CheckoutPayload;

    if (!body?.cart || !Array.isArray(body.cart) || body.cart.length === 0) {
      return NextResponse.json(
        { success: false, error: "Cart is empty" },
        { status: 400 }
      );
    }

    if (
      !body.customer ||
      !body.customer.first_name ||
      !body.customer.last_name ||
      !body.customer.email
    ) {
      return NextResponse.json(
        { success: false, error: "Missing required customer fields" },
        { status: 400 }
      );
    }

    const line_items = body.cart
      .map((item) => ({
        product_id: Number(item.id),
        quantity: Number(item.quantity),
      }))
      .filter(
        (item) =>
          Number.isFinite(item.product_id) &&
          item.product_id > 0 &&
          Number.isFinite(item.quantity) &&
          item.quantity > 0
      );

    if (line_items.length === 0) {
      return NextResponse.json(
        { success: false, error: "Invalid cart items" },
        { status: 400 }
      );
    }

    const apiUrl = process.env.WC_API_URL;
    const consumerKey = process.env.WC_CONSUMER_KEY;
    const consumerSecret = process.env.WC_CONSUMER_SECRET;

    if (!apiUrl || !consumerKey || !consumerSecret) {
      return NextResponse.json(
        { success: false, error: "Missing WooCommerce env vars" },
        { status: 500 }
      );
    }

    if (process.env.NODE_ENV !== "production") {
      let apiOrigin = apiUrl;
      try {
        apiOrigin = new URL(apiUrl).origin;
      } catch {
        apiOrigin = apiUrl;
      }

      const keySuffix =
        consumerKey.length > 4 ? consumerKey.slice(-4) : consumerKey;
      const secretSuffix =
        consumerSecret.length > 4 ? consumerSecret.slice(-4) : consumerSecret;

      console.log("WC checkout env", {
        apiOrigin,
        keySuffix,
        secretSuffix,
      });
    }

    const url = new URL("/wp-json/wc/v3/orders", apiUrl);
    url.searchParams.set("consumer_key", consumerKey);
    url.searchParams.set("consumer_secret", consumerSecret);

    const payload = {
      status: body.status ?? "pending",
      payment_method: body.payment_method,
      payment_method_title: body.payment_method_title,
      billing: {
        first_name: body.customer.first_name,
        last_name: body.customer.last_name,
        email: body.customer.email,
        phone: body.customer.phone ?? "",
        address_1: body.customer.address ?? "",
        city: body.customer.city ?? "",
        postcode: body.customer.postcode ?? "",
      },
      line_items,
    };

    const wooRes = await fetch(url.toString(), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await wooRes.json();

    if (!wooRes.ok) {
      return NextResponse.json(
        {
          success: false,
          error: data?.message || "WooCommerce order creation failed",
        },
        { status: wooRes.status }
      );
    }

    return NextResponse.json({ success: true, orderId: data?.id });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
