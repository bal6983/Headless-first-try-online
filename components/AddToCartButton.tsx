"use client";

import { useCart } from "@/components/CartContext";

type ProductForCart = {
  id: number;
  name: string;
  price: string;
  image?: string;
};

type Props = {
  product: ProductForCart;
  quantity?: number;
};

export default function AddToCartButton({ product, quantity = 1 }: Props) {
  const { addToCart } = useCart();

  return (
    <button
      type="button"
      onClick={() => {
        addToCart(product, quantity);
        console.log("Add to cart", product.id);
      }}
      style={{
        alignSelf: "flex-start",
        padding: "10px 18px",
        borderRadius: 999,
        border: "1px solid #f5f5f5",
        background: "#f5f5f5",
        color: "#111",
        fontWeight: 600,
        letterSpacing: 0.2,
        cursor: "pointer",
      }}
    >
      Προσθήκη στο καλάθι
    </button>
  );
}
