const socialLinks = [
  { label: "Instagram", href: "https://instagram.com", icon: "📸" },
  { label: "Facebook", href: "https://facebook.com", icon: "👍" },
  { label: "TikTok", href: "https://tiktok.com", icon: "🎵" },
];

export default function Social() {
  return (
    <section style={{ padding: "80px 0" }}>
      <h2 style={{ fontSize: 22, marginBottom: 12, letterSpacing: "-0.01em" }}>
        Βρείτε μας
      </h2>
      <div style={{ display: "flex", gap: 24, flexWrap: "wrap", opacity: 0.7 }}>
        {socialLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              textDecoration: "none",
              color: "#e5e7eb",
              fontSize: 14,
            }}
          >
            <span>{link.icon}</span>
            <span>{link.label}</span>
          </a>
        ))}
      </div>
    </section>
  );
}
