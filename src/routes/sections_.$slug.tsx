import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import capturedCSS from "../styles/site.css?raw";
import { findProduct } from "@/lib/catalog";
import { productPageHead, withPublicPageHead } from "@/lib/seo";
import { ProductPage } from "@/components/ProductPage";

export const Route = createFileRoute("/sections_/$slug")({
  validateSearch: (search: { copy?: unknown }) => ({
    copy: search.copy === 1 || search.copy === "1" ? 1 : undefined,
  }),
  loader: ({ params }) => {
    const product = findProduct("section", params.slug);
    if (!product) throw notFound();
    return product;
  },
  head: ({ loaderData, params }) => {
    const path = `/sections/${params.slug}`;
    if (!loaderData) {
      return withPublicPageHead(path, [
        { title: "Unavailable — Substrates" },
        { name: "description", content: "This section is not in the Substrates catalog." },
        { property: "og:title", content: "Unavailable — Substrates" },
        { property: "og:description", content: "This section is not in the Substrates catalog." },
        { property: "og:type", content: "website" },
      ]);
    }
    return productPageHead(loaderData, path);
  },
  component: Page,
  notFoundComponent: () => (
    <main style={{ padding: 48, textAlign: "center" }}>
      <h1 style={{ fontSize: 28, fontWeight: 600 }}>We couldn't find that section</h1>
      <Link to="/" className="os-btn-dark" style={{ marginTop: 16, display: "inline-flex" }}>
        Back to home
      </Link>
    </main>
  ),
  errorComponent: () => (
    <main style={{ padding: 48, textAlign: "center" }}>This page didn't load.</main>
  ),
});

function Page() {
  const product = Route.useLoaderData();
  const { copy } = Route.useSearch();
  return (
    <>
      <style>{capturedCSS}</style>
      <ProductPage product={product} resumeCopy={copy === 1} />
    </>
  );
}
