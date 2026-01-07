import Link from "next/link";

type Category = {
  id: number;
  name: string;
  slug: string;
  count: number;
};

export default async function CategoriesPage() {
  const res = await fetch(
    `${process.env.WC_API_URL}/wp-json/wc/v3/products/categories?consumer_key=${process.env.WC_CONSUMER_KEY}&consumer_secret=${process.env.WC_CONSUMER_SECRET}`,
    { cache: "no-store" }
  );

  const categories: Category[] = await res.json();

  return (
    <main style={{ padding: "40px 24px", maxWidth: 1000, margin: "0 auto" }}>
      <h1 style={{ marginBottom: 24 }}>Κατηγορίες</h1>
      <div style={{ display: "grid", gap: 12 }}>
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/category/${category.slug}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 12,
                padding: "12px 16px",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: 8,
              }}
            >
              <span>{category.name}</span>
              <span style={{ color: "#a1a1aa", fontSize: 14 }}>
                {category.count}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
