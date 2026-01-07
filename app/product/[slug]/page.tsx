import AddToCartButton from "@/components/AddToCartButton";
import ProductGallery from "@/components/ProductGallery";

type Product = {
  id: number;
  name: string;
  price: string;
  description: string;
  images: {
    src: string;
    alt: string;
  }[];
};

type Props = {
  params: {
    slug: string;
  };
  searchParams?: Promise<{
    id?: string | string[];
  }>;
};

export default async function ProductPage({ searchParams }: Props) {
  const resolvedSearchParams = await searchParams;
  const id = Array.isArray(resolvedSearchParams?.id)
    ? resolvedSearchParams?.id[0]
    : resolvedSearchParams?.id;

  if (!id) {
    return <div style={{ padding: 40 }}>Product not found</div>;
  }

  const query = new URLSearchParams({
    consumer_key: process.env.WC_CONSUMER_KEY ?? "",
    consumer_secret: process.env.WC_CONSUMER_SECRET ?? "",
  });

  const res = await fetch(
    `${process.env.WC_API_URL}/wp-json/wc/v3/products/${id}?${query.toString()}`,
    { cache: "no-store" }
  );

  console.log("FETCH STATUS:", res.status);
  console.log("FETCH OK:", res.ok);
  console.log("FETCH URL:", res.url);

  const product: Product = await res.json();
  console.log("PRODUCT DATA:", product);

  if (!product) {
    return <div style={{ padding: 40 }}>Product not found</div>;
  }

  return (
    <main style={{ padding: "40px 24px", maxWidth: 1100, margin: "0 auto" }}>
      <div
        className="product-layout"
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)",
          gap: 40,
          alignItems: "start",
        }}
      >
        <ProductGallery images={product.images} name={product.name} />
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <h1 style={{ fontSize: 32, margin: 0, letterSpacing: "-0.01em" }}>
            {product.name}
          </h1>
          <p style={{ fontSize: 20, fontWeight: 600, margin: 0 }}>
            €{product.price}
          </p>
          <AddToCartButton
            product={{
              id: product.id,
              name: product.name,
              price: product.price,
              image: product.images[0]?.src,
            }}
          />
          <div
            style={{ marginTop: 8, color: "#d1d5db", lineHeight: 1.7 }}
            dangerouslySetInnerHTML={{ __html: product.description }}
          />
        </div>
      </div>
      <style>{`
        @media (max-width: 900px) {
          .product-layout {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </main>
  );
}
