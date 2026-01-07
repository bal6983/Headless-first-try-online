const features = [
  {
    icon: "🚚",
    title: "Γρήγορη αποστολή",
    text: "Παράδοση σε 1-3 εργάσιμες σε όλη την Ελλάδα.",
  },
  {
    icon: "🛡️",
    title: "Εγγυημένη ποιότητα",
    text: "Επιλεγμένα προϊόντα με αυστηρό έλεγχο ποιότητας.",
  },
  {
    icon: "💳",
    title: "Ασφαλείς πληρωμές",
    text: "Πολλαπλές επιλογές πληρωμής με προστασία δεδομένων.",
  },
];

export default function Features() {
  return (
    <section style={{ padding: "96px 0" }}>
      <h2
        style={{
          fontSize: 24,
          fontWeight: 600,
          letterSpacing: "-0.01em",
          marginBottom: 32,
        }}
      >
        Γιατί να μας επιλέξεις
      </h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 32,
        }}
      >
        {features.map((feature) => (
          <div
            key={feature.title}
            style={{
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: 12,
              padding: 24,
            }}
          >
            <div style={{ fontSize: 20, marginBottom: 16, color: "#9ca3af" }}>
              {feature.icon}
            </div>
            <h3 style={{ margin: "0 0 8px", fontSize: 18 }}>
              {feature.title}
            </h3>
            <p style={{ margin: 0, color: "#d1d5db", lineHeight: 1.6 }}>
              {feature.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
