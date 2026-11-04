import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { LOCAL_SECTION_PREVIEWS, productPhoto, type Product } from "@/lib/catalog";
import { getRelatedProducts } from "@/lib/recommend.functions";
import { productPrice } from "@/lib/catalog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useWebMCP } from "use-webmcp-tool";
import { runWebMCPTool } from "@/lib/webmcp-telemetry";
import { assistantSchema, copySectionPrompt } from "@/lib/assistant-copy";
import { ProductDeliveryActions } from "@/components/ProductDeliveryActions";
import { useAccount } from "@/lib/account-context";

function productLink(p: Product) {
  if (p.kind === "template") {
    return {
      to: "/templates/$slug" as const,
      params: { slug: p.slug },
      search: { copy: undefined as number | undefined },
    };
  }
  return {
    to: "/sections/$slug" as const,
    params: { slug: p.slug },
    search: { copy: undefined as number | undefined },
  };
}

export function ProductPage({
  product,
  resumeCopy = false,
}: {
  product: Product;
  resumeCopy?: boolean;
}) {
  const { user } = useAccount();
  const [copyOpen, setCopyOpen] = useState(false);
  const [resumeDismissed, setResumeDismissed] = useState(false);
  const freeSection = product.kind === "section" && product.tier !== "pro";
  const proSection = product.kind === "section" && product.tier === "pro";
  const showCopy = copyOpen || (resumeCopy && !resumeDismissed && !!user && freeSection);
  const [copyStatus, setCopyStatus] = useState("");
  const [copyBusy, setCopyBusy] = useState(false);
  useWebMCP({
    name: "read_current_product",
    description: "Read the product currently displayed, including its name, price and description.",
    annotations: { readOnlyHint: true, untrustedContentHint: true },
    execute: () =>
      runWebMCPTool(
        "read_current_product",
        () =>
          `${product.kind}:${product.slug} — ${product.name}; ${productPrice(product)}; ${product.description || product.category}`,
      ),
  });
  async function copyFor(assistant: string) {
    setCopyBusy(true);
    setCopyStatus("");
    try {
      await copySectionPrompt(product.slug, assistant);
      setCopyStatus(`Reference prompt copied for ${assistant}.`);
    } catch {
      setCopyStatus("Could not copy. Please try again.");
    } finally {
      setCopyBusy(false);
    }
  }
  const related = useQuery({
    queryKey: ["related", product.kind, product.slug],
    queryFn: () => getRelatedProducts({ data: { kind: product.kind, slug: product.slug } }),
    staleTime: Infinity,
  });
  const photo = productPhoto(product.slug);
  const live = product.kind === "section" && LOCAL_SECTION_PREVIEWS.includes(product.slug);
  const description =
    product.description ||
    (product.kind === "section"
      ? `${product.name} is a website section from the Substrates collection.`
      : `${product.name} is a ${product.platform === "framer" ? "Framer" : "Webflow"} template in the ${product.category} collection${product.subcategory ? `, for ${product.subcategory.toLowerCase()}` : ""}.`);

  return (
    <main className="mx-auto max-w-6xl px-5 py-10 text-text" data-product-slug={product.slug}>
      <Link
        to={product.kind === "template" ? "/templates" : "/sections"}
        className="text-[13px] text-muted-foreground hover:underline"
      >
        ← Back to {product.kind === "template" ? "Templates" : "Sections"}
      </Link>
      <header className="mt-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--text-tertiary)]">
            {product.kind === "template" ? `${product.category} template` : "Section"}
          </p>
          <h1 className="mt-2 break-words text-4xl font-semibold">{product.name}</h1>
          <p className="mt-3 text-lg font-semibold" data-product-price>
            {productPrice(product)}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {product.demoUrl && (
            <Button asChild variant="outline" className="os-btn-white">
              <a href={product.demoUrl} target="_blank" rel="noreferrer">
                Open live demo ↗
              </a>
            </Button>
          )}
          {product.kind === "template" || proSection ? (
            <ProductDeliveryActions product={product} resumeCopy={resumeCopy} />
          ) : user ? (
            <Button
              className="os-btn-dark"
              onClick={() => {
                setCopyStatus("");
                setCopyOpen(true);
              }}
            >
              Copy section — free
            </Button>
          ) : (
            <Button asChild className="os-btn-dark">
              <Link to="/signin" search={{ next: `/sections/${product.slug}?copy=1` }}>
                Sign in to copy — free
              </Link>
            </Button>
          )}
        </div>
      </header>
      <p
        className="mt-4 max-w-2xl text-[15px] leading-relaxed text-muted-foreground"
        data-product-description
      >
        {description}
      </p>
      {freeSection && (
        <Dialog
          open={showCopy}
          onOpenChange={(open) => {
            setCopyOpen(open);
            if (!open) setResumeDismissed(true);
          }}
        >
          <DialogContent className="max-h-[85vh] w-[calc(100%-2rem)] overflow-y-auto rounded-lg">
            <DialogTitle>Copy {product.name}</DialogTitle>
            <DialogDescription>Reference prompt</DialogDescription>
            <div className="grid grid-cols-2 gap-2">
              {assistantSchema.options.map((assistant) => (
                <Button
                  key={assistant}
                  variant="outline"
                  disabled={copyBusy}
                  onClick={() => copyFor(assistant)}
                >
                  {assistant}
                </Button>
              ))}
            </div>
            {copyStatus && (
              <p role="status" className="text-sm text-muted-foreground">
                {copyStatus}
              </p>
            )}
          </DialogContent>
        </Dialog>
      )}
      {freeSection && (
        <div className="mt-5 flex flex-wrap items-center gap-2">
          <Button
            variant="outline"
            className="os-btn-white"
            disabled={copyBusy}
            onClick={() => copyFor("Codex")}
          >
            Copy prompt for Codex
          </Button>
          <Button
            variant="outline"
            className="os-btn-white"
            disabled={copyBusy}
            onClick={() => copyFor("grokbuild")}
          >
            Copy prompt for grokbuild
          </Button>
          {copyStatus && (
            <p role="status" className="w-full text-sm text-muted-foreground">
              {copyStatus}
            </p>
          )}
        </div>
      )}

      <img
        src={photo ?? product.image}
        alt={photo ? `${product.name} shown on a device` : `${product.name} preview`}
        className="mt-8 block w-full rounded-lg border border-line"
        data-product-photo
      />
      {(live || photo) && (
        <div className="mt-8 overflow-hidden rounded-lg border border-line bg-surface">
          {live ? (
            <iframe
              src={`/section-previews/${product.slug}/index.html`}
              title={`${product.name} live preview`}
              sandbox="allow-scripts"
              className="block h-[70vh] w-full border-0"
            />
          ) : (
            <img src={product.image} alt={`${product.name} preview`} className="block w-full" />
          )}
        </div>
      )}

      <section className="mt-14" aria-labelledby="related-heading">
        <div className="flex items-baseline justify-between">
          <h2 id="related-heading" className="text-2xl font-semibold">
            You may also like
          </h2>
          {related.data && (
            <span className="text-[12px] text-[var(--text-tertiary)]">
              {related.data.ai ? "Picked by AI" : "Similar items"}
            </span>
          )}
        </div>
        <div className="mt-5 grid grid-cols-2 gap-4 md:grid-cols-4">
          {related.isPending &&
            Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="aspect-[4/3] animate-pulse rounded-lg bg-surface-sunken" />
            ))}
          {related.data?.items.map((p) => (
            <Link key={p.kind + p.slug} {...productLink(p)} className="group block">
              <div className="aspect-[4/3] overflow-hidden rounded-lg border border-line bg-surface">
                <img
                  src={productPhoto(p.slug) ?? p.image}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.03]"
                />
              </div>
              <p className="mt-2 text-[14px] font-medium">{p.name}</p>
              <p className="text-[12px] text-[var(--text-tertiary)]">
                {p.kind === "template" ? p.category : "Section"}
              </p>
              <p className="mt-1 text-[12px] text-text">{productPrice(p)}</p>
            </Link>
          ))}
        </div>
        {related.isError && (
          <p className="mt-4 text-[13px] text-[var(--text-tertiary)]">
            Recommendations couldn't load right now.
          </p>
        )}
      </section>
    </main>
  );
}
