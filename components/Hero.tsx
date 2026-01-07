import Link from "next/link";
import { ParticleButton } from "@/components/ui/particle-button";

const slides = [
  "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1600&q=80",
];

export default function Hero() {
  return (
    <section
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        marginLeft: "calc(50% - 50vw)",
        marginRight: "calc(50% - 50vw)",
        overflow: "hidden",
        color: "#fff",
        backgroundColor: "#111",
      }}
    >
      <div style={{ position: "absolute", inset: 0 }} aria-hidden="true">
        {slides.map((src, index) => (
          <div
            key={src}
            className="hero-slide"
            style={{
              backgroundImage: `url(${src})`,
              animationDelay: `${index * 6}s`,
            }}
          />
        ))}
      </div>
      <div
        style={{
          position: "relative",
          zIndex: 1,
          height: "100%",
          display: "flex",
          alignItems: "center",
          backgroundColor: "rgba(0,0,0,0.35)",
          padding: "0 24px",
        }}
      >
        <div style={{ maxWidth: 600, margin: "0 auto", width: "100%" }}>
          <p
            style={{
              letterSpacing: 1.5,
              textTransform: "uppercase",
              fontSize: 11,
              fontWeight: 500,
              color: "rgba(255,255,255,0.7)",
              marginBottom: 16,
            }}
          >
            Νέα συλλογή
          </p>
          <h1
            style={{
              fontSize: 56,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              margin: "0 0 12px",
            }}
          >
            Ανακάλυψε προϊόντα που κάνουν τη διαφορά
          </h1>
          <p
            style={{
              fontSize: 16,
              lineHeight: 1.7,
              color: "rgba(255,255,255,0.78)",
              marginBottom: 24,
            }}
          >
            Ένα επιμελημένο e-shop με ποιοτικές επιλογές και γρήγορη εξυπηρέτηση.
          </p>
          <ParticleButton
            asChild
            className="gap-2 bg-white text-zinc-900 hover:bg-white/90"
          >
            <Link
              href="/categories"
              style={{
                display: "inline-block",
                padding: "10px 18px",
                background: "#ffffff",
                color: "#111",
                border: "1px solid #ffffff",
                borderRadius: 999,
                textDecoration: "none",
                fontWeight: 600,
                fontSize: 14,
                letterSpacing: 0.3,
              }}
            >
            Δες τα προϊόντα
            </Link>
          </ParticleButton>
        </div>
      </div>
      <style>{`
        .hero-slide {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          opacity: 0;
          animation: heroFade 24s infinite;
        }
        @keyframes heroFade {
          0% { opacity: 0; }
          10% { opacity: 1; }
          40% { opacity: 1; }
          50% { opacity: 0; }
          100% { opacity: 0; }
        }
      `}</style>
    </section>
  );
}
