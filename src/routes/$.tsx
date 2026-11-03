import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/$")({
  head: () => ({
    meta: [
      { title: "Coming soon — Substrates" },
      { name: "description", content: "This Substrates page is not available yet." },
      { property: "og:title", content: "Coming soon — Substrates" },
      { property: "og:description", content: "This Substrates page is not available yet." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ComingSoon,
});

function ComingSoon() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        textAlign: "center",
        padding: 24,
      }}
    >
      <div>
        <p
          style={{
            fontSize: 12,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            opacity: 0.6,
          }}
        >
          Substrates
        </p>
        <h1 style={{ fontSize: 32, fontWeight: 600, margin: "12px 0" }}>Coming soon</h1>
        <p style={{ opacity: 0.7, marginBottom: 24 }}>This page hasn't been added yet.</p>
        <Link to="/" className="os-btn-dark">
          Back to home
        </Link>
      </div>
    </main>
  );
}
