"use client";

import Link from "next/link";
import { useCart } from "@/components/CartContext";

function formatMoney(value: number) {
  return `€${value.toFixed(2)}`;
}

export default function CartPage() {
  const { items, totalPrice, updateQuantity, removeFromCart } = useCart();

  if (items.length === 0) {
    return (
      <main style={{ padding: "40px 24px", maxWidth: 900, margin: "0 auto" }}>
        <h1 style={{ marginBottom: 12 }}>Καλάθι</h1>
        <p style={{ color: "#9ca3af" }}>Το καλάθι είναι άδειο.</p>
        <Link href="/categories" style={{ color: "#e5e7eb" }}>
          Δες κατηγορίες
        </Link>
      </main>
    );
  }

  return (
    <main style={{ padding: "40px 24px", maxWidth: 1000, margin: "0 auto" }}>
      <h1 style={{ marginBottom: 24 }}>Καλάθι</h1>
      <div style={{ display: "grid", gap: 16 }}>
        {items.map((item) => (
          <div
            key={item.id}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              paddingBottom: 16,
              borderBottom: "1px solid rgba(255,255,255,0.12)",
            }}
          >
            {item.image ? (
              <img
                src={item.image}
                alt={item.name}
                style={{ width: 72, height: 72, objectFit: "cover", borderRadius: 8 }}
              />
            ) : (
              <div
                style={{
                  width: 72,
                  height: 72,
                  borderRadius: 8,
                  background: "rgba(255,255,255,0.1)",
                }}
              />
            )}
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600 }}>{item.name}</div>
              <div style={{ color: "#a1a1aa", marginTop: 4 }}>€{item.price}</div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <button
                type="button"
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 6,
                  border: "1px solid rgba(255,255,255,0.2)",
                  background: "transparent",
                  color: "#f5f5f5",
                  cursor: "pointer",
                }}
              >
                -
              </button>
              <span style={{ minWidth: 24, textAlign: "center" }}>
                {item.quantity}
              </span>
              <button
                type="button"
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 6,
                  border: "1px solid rgba(255,255,255,0.2)",
                  background: "transparent",
                  color: "#f5f5f5",
                  cursor: "pointer",
                }}
              >
                +
              </button>
            </div>
            <button
              type="button"
              onClick={() => removeFromCart(item.id)}
              style={{
                border: "none",
                background: "transparent",
                color: "#f5f5f5",
                cursor: "pointer",
              }}
            >
              Αφαίρεση
            </button>
          </div>
        ))}
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: 24,
        }}
      >
        <strong>Σύνολο</strong>
        <strong>{formatMoney(totalPrice)}</strong>
      </div>

      <Link
        href="/checkout"
        style={{
          display: "inline-block",
          marginTop: 24,
          padding: "10px 18px",
          borderRadius: 999,
          background: "#f5f5f5",
          color: "#111",
          textDecoration: "none",
          fontWeight: 600,
        }}
      >
        Προχωρώ στο checkout
      </Link>
    </main>
  );
}


