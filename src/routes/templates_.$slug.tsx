import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import capturedCSS from "../styles/site.css?raw";
import { findProduct } from "@/lib/catalog";
import { ProductPage } from "@/components/ProductPage";

export const Route = createFileRoute("/templates_/$slug")({
  loader: ({ params }) => {
    const product = findProduct("template", params.slug);
    if (!product) throw notFound();
    return product;
  },
  head: ({ loaderData }) => {
    const title = loaderData ? `${loaderData.name} — Substrates` : "Unavailable — Substrates";
    const description = loaderData?.description || "A template from Substrates.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "product" },
        { name: "twitter:card", content: "summary_large_image" },
        ...(loaderData?.image ? [{ property: "og:image", content: loaderData.image }, { name: "twitter:image", content: loaderData.image }] : []),
      ],
    };
  },
  component: Page,
  notFoundComponent: () => (
    <main style={{ padding: 48, textAlign: "center" }}>
      <h1 style={{ fontSize: 28, fontWeight: 600 }}>We couldn't find that template</h1>
      <Link to="/" className="os-btn-dark" style={{ marginTop: 16, display: "inline-flex" }}>Back to home</Link>
    </main>
  ),
  errorComponent: () => <main style={{ padding: 48, textAlign: "center" }}>This page didn't load.</main>,
});

function Page() {
  const product = Route.useLoaderData();
  return (
    <>
      <style>{capturedCSS}</style>
      <ProductPage product={product} />
    </>
  );
}
