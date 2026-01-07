export default function ContactForm() {
  return (
    <section style={{ padding: "80px 0" }}>
      <h2 style={{ fontSize: 22, marginBottom: 12, letterSpacing: "-0.01em" }}>
        Επικοινωνία
      </h2>
      <form
        style={{
          display: "grid",
          gap: 16,
          maxWidth: 520,
        }}
      >
        <label style={{ display: "grid", gap: 8 }}>
          <span>Όνομα</span>
          <input
            type="text"
            name="name"
            placeholder="Το όνομά σας"
            style={{
              padding: "12px 0",
              border: "none",
              borderBottom: "1px solid rgba(255,255,255,0.2)",
              borderRadius: 0,
              background: "transparent",
              color: "#f5f5f5",
              fontSize: 15,
              outline: "none",
            }}
          />
        </label>
        <label style={{ display: "grid", gap: 8 }}>
          <span>Email</span>
          <input
            type="email"
            name="email"
            placeholder="example@email.com"
            style={{
              padding: "12px 0",
              border: "none",
              borderBottom: "1px solid rgba(255,255,255,0.2)",
              borderRadius: 0,
              background: "transparent",
              color: "#f5f5f5",
              fontSize: 15,
              outline: "none",
            }}
          />
        </label>
        <label style={{ display: "grid", gap: 8 }}>
          <span>Μήνυμα</span>
          <textarea
            name="message"
            placeholder="Γράψτε το μήνυμά σας"
            rows={5}
            style={{
              padding: "12px 0",
              border: "none",
              borderBottom: "1px solid rgba(255,255,255,0.2)",
              borderRadius: 0,
              background: "transparent",
              color: "#f5f5f5",
              fontSize: 15,
              outline: "none",
              resize: "vertical",
            }}
          />
        </label>
        <button
          type="button"
          style={{
            justifySelf: "start",
            padding: "10px 16px",
            borderRadius: 999,
            border: "1px solid #f5f5f5",
            background: "transparent",
            color: "#f5f5f5",
            fontWeight: 600,
            letterSpacing: 0.3,
            cursor: "pointer",
          }}
        >
          Αποστολή μηνύματος
        </button>
      </form>
    </section>
  );
}
