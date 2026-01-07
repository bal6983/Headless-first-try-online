import Link from "next/link";

type Category = {
  id: number;
  name: string;
  slug: string;
};

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
  params?: Promise<{
    slug?: string;
  }>;
};

export default async function CategoryPage({ params }: Props) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;

  if (!slug) {
    return (
      <main style={{ padding: "40px 24px", maxWidth: 1000, margin: "0 auto" }}>
        <h1>Κατηγορία δεν βρέθηκε</h1>
      </main>
    );
  }

  const categoryRes = await fetch(
    `${process.env.WC_API_URL}/wp-json/wc/v3/products/categories?slug=${slug}&consumer_key=${process.env.WC_CONSUMER_KEY}&consumer_secret=${process.env.WC_CONSUMER_SECRET}`,
    { cache: "no-store" }
  );

  const categories: Category[] = await categoryRes.json();
  const category = categories[0];

  if (!category) {
    return (
      <main style={{ padding: "40px 24px", maxWidth: 1000, margin: "0 auto" }}>
        <h1>Κατηγορία δεν βρέθηκε</h1>
      </main>
    );
  }

  const productsRes = await fetch(
    `${process.env.WC_API_URL}/wp-json/wc/v3/products?category=${category.id}&consumer_key=${process.env.WC_CONSUMER_KEY}&consumer_secret=${process.env.WC_CONSUMER_SECRET}`,
    { cache: "no-store" }
  );

  const products: Product[] = await productsRes.json();

  return (
    <main style={{ padding: "40px 24px", maxWidth: 1100, margin: "0 auto" }}>
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
          gap: 16,
          flexWrap: "wrap",
        }}
      >
        <h1 style={{ margin: 0 }}>{category.name}</h1>
        <span style={{ color: "#a1a1aa", fontSize: 14 }}>
          {products.length} προϊόντα
        </span>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: 24,
          marginTop: 24,
        }}
      >
        {products.map((product) => (
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
                    height: 160,
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
    </main>
  );
}
