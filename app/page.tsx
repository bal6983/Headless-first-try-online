import ContactForm from "@/components/ContactForm";
import Features from "@/components/Features";
import Hero from "@/components/Hero";
import PopularProducts from "@/components/PopularProducts";
import Social from "@/components/Social";

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

async function fetchProducts(): Promise<Product[]> {
  const apiUrl = process.env.WC_API_URL;
  const consumerKey = process.env.WC_CONSUMER_KEY;
  const consumerSecret = process.env.WC_CONSUMER_SECRET;

  if (!apiUrl || !consumerKey || !consumerSecret) {
    return [];
  }

  const url = new URL("/wp-json/wc/v3/products", apiUrl);
  url.searchParams.set("consumer_key", consumerKey);
  url.searchParams.set("consumer_secret", consumerSecret);

  try {
    const res = await fetch(url.toString(), { cache: "no-store" });
    if (!res.ok) {
      return [];
    }

    const data = (await res.json()) as Product[];
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

export default async function Home() {
  const products = await fetchProducts();

  return (
    <>
      <Hero />
      <PopularProducts products={products} />
      <Features />
      <ContactForm />
      <Social />
    </>
  );
}