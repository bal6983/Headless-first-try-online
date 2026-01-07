"use client";

import Link from "next/link";
import { useCart } from "@/components/CartContext";

export default function CartLink() {
  const { totalItems } = useCart();

  return (
    <Link
      href="/cart"
      style={{
        textDecoration: "none",
        color: "inherit",
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
      }}
    >
      <span>Καλάθι</span>
      <span
        style={{
          minWidth: 20,
          height: 20,
          padding: "0 6px",
          borderRadius: 999,
          background: "#f5f5f5",
          color: "#111",
          fontSize: 12,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {totalItems}
      </span>
    </Link>
  );
}
