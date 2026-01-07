"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CreditCard, Minus, Plus, ShoppingCart, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import NumberFlow from "@number-flow/react";
import { useCart } from "@/components/CartContext";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type FormState = {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postal: string;
  message: string;
};

const inputClass =
  "w-full border-b border-white/20 bg-transparent pb-2 text-sm text-zinc-100 placeholder:text-zinc-500 focus:border-white/40 focus:outline-none";

function parsePrice(value: string) {
  const normalized = value.replace(",", ".").replace(/[^\d.]/g, "");
  const parsed = Number.parseFloat(normalized);
  return Number.isFinite(parsed) ? parsed : 0;
}

function formatMoney(value: number) {
  return `EUR ${value.toFixed(2)}`;
}

function splitName(value: string) {
  const parts = value.trim().split(/\s+/).filter(Boolean);
  const first = parts[0] ?? "";
  const last = parts.slice(1).join(" ") || first;
  return { first, last };
}

const BANK_TRANSFER_METHOD = "bacs";
const BANK_TRANSFER_STATUS = "on-hold";
const BANK_TRANSFER_LABEL =
  "\u03A4\u03C1\u03B1\u03C0\u03B5\u03B6\u03B9\u03BA\u03AE \u03BA\u03B1\u03C4\u03AC\u03B8\u03B5\u03C3\u03B7";

export function InteractiveCheckout() {
  const { items, totalItems, totalPrice, updateQuantity, removeFromCart, clearCart } =
    useCart();
  const router = useRouter();
  const [formData, setFormData] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postal: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(BANK_TRANSFER_METHOD);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) {
      return;
    }

    const { first, last } = splitName(formData.name);
    const payload = {
      cart: items.map((item) => ({ id: item.id, quantity: item.quantity })),
      customer: {
        first_name: first,
        last_name: last,
        email: formData.email.trim(),
        phone: formData.phone.trim() || undefined,
        address: formData.address.trim() || undefined,
        city: formData.city.trim() || undefined,
        postcode: formData.postal.trim() || undefined,
      },
      payment_method: paymentMethod,
      payment_method_title: BANK_TRANSFER_LABEL,
      status: BANK_TRANSFER_STATUS,
    };

    try {
      setIsSubmitting(true);
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok || !data?.success || !data?.orderId) {
        console.error(data?.error || res.statusText);
        alert("Order failed.");
        return;
      }

      clearCart();
      router.push(`/thank-you?order=${encodeURIComponent(data.orderId)}`);
    } catch (error) {
      console.error(error);
      alert("Order failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="mx-auto w-full max-w-3xl py-10">
        <h1 className="text-2xl font-semibold text-zinc-100">Checkout</h1>
        <p className="mt-2 text-sm text-zinc-400">Your cart is empty.</p>
        <Link
          href="/categories"
          className="mt-4 inline-flex text-sm font-medium text-zinc-100 underline"
        >
          Browse categories
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-5xl">
      <h1 className="text-2xl font-semibold text-zinc-100">Checkout</h1>
      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_320px]">
        <form
          id="checkout-form"
          onSubmit={handleSubmit}
          className="rounded-xl border border-white/10 bg-black/40 p-6 shadow-sm backdrop-blur"
        >
          <div className="grid gap-5">
            <label className="grid gap-2 text-sm text-zinc-400">
              <span>Full name</span>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Jane Doe"
                className={inputClass}
                required
              />
            </label>
            <label className="grid gap-2 text-sm text-zinc-400">
              <span>Email</span>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="jane@email.com"
                className={inputClass}
                required
              />
            </label>
            <label className="grid gap-2 text-sm text-zinc-400">
              <span>Phone</span>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="6900000000"
                className={inputClass}
              />
            </label>
            <label className="grid gap-2 text-sm text-zinc-400">
              <span>Address</span>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Street, number"
                className={inputClass}
              />
            </label>
            <div className="grid gap-5 md:grid-cols-2">
              <label className="grid gap-2 text-sm text-zinc-400">
                <span>City</span>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="City"
                  className={inputClass}
                />
              </label>
              <label className="grid gap-2 text-sm text-zinc-400">
                <span>Postal code</span>
                <input
                  type="text"
                  name="postal"
                  value={formData.postal}
                  onChange={handleChange}
                  placeholder="00000"
                  className={inputClass}
                />
              </label>
            </div>
            <label className="grid gap-2 text-sm text-zinc-400">
              <span>Message</span>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Optional notes"
                rows={4}
                className={cn(inputClass, "resize-y")}
              />
            </label>
            <div className="grid gap-2 text-sm text-zinc-400">
              <span>Payment method</span>
              <label className="flex items-center gap-2 text-zinc-100">
                <input
                  type="radio"
                  name="paymentMethod"
                  value={BANK_TRANSFER_METHOD}
                  checked={paymentMethod === BANK_TRANSFER_METHOD}
                  onChange={(event) => setPaymentMethod(event.target.value)}
                  className="h-4 w-4 accent-zinc-100"
                />
                <span>{BANK_TRANSFER_LABEL}</span>
              </label>
            </div>
          </div>
        </form>

        <motion.aside
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className={cn(
            "flex h-fit flex-col",
            "rounded-xl border border-white/10 bg-black/40 p-4 shadow-sm backdrop-blur"
          )}
        >
          <div className="flex items-center gap-2">
            <ShoppingCart className="h-4 w-4 text-zinc-400" />
            <h2 className="text-sm font-medium text-zinc-100">
              Cart ({totalItems})
            </h2>
          </div>

          <motion.div className="mt-4 flex max-h-[24rem] flex-col gap-3 overflow-y-auto">
            <AnimatePresence initial={false} mode="popLayout">
              {items.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ opacity: { duration: 0.2 }, layout: { duration: 0.2 } }}
                  className={cn(
                    "flex items-center gap-3",
                    "rounded-lg border border-white/5 bg-white/5 p-3"
                  )}
                >
                  <div className="h-12 w-12 overflow-hidden rounded-md bg-white/10">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    ) : null}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="truncate text-sm font-medium text-zinc-100">
                        {item.name}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                        className="rounded-md p-1 text-zinc-400 hover:bg-white/10"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                    <div className="mt-2 flex items-center justify-between text-xs text-zinc-400">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="rounded-md p-1 hover:bg-white/10"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-4 text-center text-sm">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="rounded-md p-1 hover:bg-white/10"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      <span className="text-sm font-medium text-zinc-200">
                        {formatMoney(parsePrice(item.price) * item.quantity)}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          <div className="mt-4 border-t border-white/10 pt-4">
            <div className="flex items-center justify-between text-sm font-medium">
              <span>Total</span>
              <span className="text-base font-semibold text-zinc-100">
                <NumberFlow value={totalPrice} />
              </span>
            </div>
            <Button
              type="submit"
              form="checkout-form"
              className="mt-4 w-full gap-2"
              disabled={isSubmitting}
            >
              <CreditCard className="h-4 w-4" />
              {isSubmitting ? "Processing..." : "Complete order"}
            </Button>
          </div>
        </motion.aside>
      </div>
    </div>
  );
}
