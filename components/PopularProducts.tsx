import Link from "next/link";

type Product = {
  id: number;
  name: string;
  slug: string;
  price: string;
  images: {
    src: string;
    alt: string;
  }[];
};

type Props = {
  products: Product[];
};

export default function PopularProducts({ products }: Props) {
  const items = products.slice(0, 4);

  return (
    <section style={{ padding: "96px 0" }}>
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
          gap: 16,
          marginBottom: 24,
          flexWrap: "wrap",
        }}
      >
        <h2 style={{ fontSize: 24, margin: 0, letterSpacing: "-0.01em" }}>
          Δημοφιλή προϊόντα
        </h2>
        <Link
          href="/products"
          style={{ textDecoration: "none", color: "#e5e7eb", opacity: 0.7, fontSize: 14 }}
        >
          Όλα τα προϊόντα →
        </Link>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: 24,
        }}
      >
        {items.map((product) => (
          <Link
            key={product.id}
            href={`/product/${product.slug}?id=${product.id}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div
              className="product-card"
              style={{
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 10,
                padding: 16,
                cursor: "pointer",
                background: "rgba(255,255,255,0.04)",
                color: "#f5f5f5",
                boxShadow: "0 0 0 rgba(0,0,0,0)",
                transition: "transform 200ms ease, box-shadow 200ms ease",
              }}
            >
              {product.images[0] && (
                <img
                  src={product.images[0].src}
                  alt={product.images[0].alt || product.name}
                  style={{
                    width: "100%",
                    height: 140,
                    objectFit: "cover",
                    borderRadius: 6,
                    marginBottom: 12,
                  }}
                />
              )}

              <div style={{ fontWeight: 600 }}>{product.name}</div>
              <div style={{ marginTop: 4 }}>€{product.price}</div>
            </div>
          </Link>
        ))}
      </div>
      <style>{`
        .product-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 24px rgba(0,0,0,0.08);
        }
      `}</style>
    </section>
  );
}
