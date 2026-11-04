import { catalog, type Product } from "@/lib/catalog";
import { LOGO_PNG, PRODUCT_NAME, SITE_ORIGIN } from "@/lib/brand";

export type HeadMeta =
  { title: string } | { name: string; content: string } | { property: string; content: string };

export type PageHead = {
  meta?: HeadMeta[];
  links?: Array<{ rel: string; href: string; hreflang?: string }>;
  scripts?: Array<{ type: string; children: string }>;
};

export const DEFAULT_OG_IMAGE = `${SITE_ORIGIN}${LOGO_PNG}`;

export function absoluteUrl(pathname: string): string {
  const path = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return `${SITE_ORIGIN}${path}`;
}

export function guidePath(slug: string): string {
  return `/guides/${slug}`;
}

export const GUIDE_SLUGS = [
  "404-page-design-examples",
  "ai-generated-websites-less-generic",
  "animated-explainer-videos-with-claude",
  "app-landing-page-templates",
  "best-fonts-for-video-captions",
  "build-a-website-with-claude-code",
  "claude-animation-prompts",
  "claude-prompts-for-website-design",
  "faceless-explainer-videos",
  "figma-to-code-with-claude",
  "hero-section-examples",
  "how-to-create-a-claude-skill",
  "landing-page-structure",
  "portfolio-website-templates",
  "saas-website-templates",
  "video-hook-examples",
  "webflow-vs-framer",
  "website-templates-for-coaches-and-consultants",
  "what-are-claude-skills",
] as const;

export const VIDEO_SLUGS = ["kiln", "organic", "rays", "small-details"] as const;

const STATIC_SITEMAP_PATHS = [
  "/",
  "/templates",
  "/sections",
  "/pricing",
  "/pricing/videos",
  "/guides",
  "/help",
  "/privacy",
  "/terms",
  "/refunds",
  "/videos",
] as const;

export function collectSitemapPaths(): string[] {
  const paths = new Set<string>(STATIC_SITEMAP_PATHS);
  for (const product of catalog) {
    paths.add(
      product.kind === "template" ? `/templates/${product.slug}` : `/sections/${product.slug}`,
    );
  }
  for (const slug of GUIDE_SLUGS) paths.add(guidePath(slug));
  for (const slug of VIDEO_SLUGS) paths.add(`/videos/${slug}`);
  return [...paths].sort((a, b) => a.localeCompare(b));
}

export function buildSitemapXml(paths: string[], origin: string = SITE_ORIGIN): string {
  const body = paths.map((path) => `  <url><loc>${origin}${path}</loc></url>`).join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>`;
}

export function buildRobotsTxt(origin: string = SITE_ORIGIN): string {
  return `User-agent: *
Allow: /

Disallow: /api/
Disallow: /signin

Sitemap: ${origin}/sitemap.xml
`;
}

function productDescription(product: Product): string {
  if (product.description?.trim()) return product.description.trim();
  if (product.kind === "section") {
    return `${product.name} is a website section from the ${PRODUCT_NAME} collection.`;
  }
  const platform = product.platform === "framer" ? "Framer" : "Webflow";
  return `${product.name} is a ${platform} template in the ${product.category} collection.`;
}

export function productJsonLd(product: Product, pathname: string): Record<string, unknown> {
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    url: absoluteUrl(pathname),
  };
  if (typeof product.priceUsd === "number" && product.priceUsd > 0) {
    data["offers"] = {
      "@type": "Offer",
      price: String(product.priceUsd),
      priceCurrency: "USD",
    };
  }
  return data;
}

export function withPublicPageHead(
  pathname: string,
  meta: HeadMeta[],
  options?: { ogImage?: string },
): PageHead {
  const canonical = absoluteUrl(pathname);
  const ogImage = options?.ogImage ?? DEFAULT_OG_IMAGE;
  const hasOgImage = meta.some((m) => "property" in m && m.property === "og:image");
  const hasTwitterImage = meta.some((m) => "name" in m && m.name === "twitter:image");
  const hasOgUrl = meta.some((m) => "property" in m && m.property === "og:url");
  const hasTwitterCard = meta.some((m) => "name" in m && m.name === "twitter:card");

  const enriched: HeadMeta[] = [...meta];
  if (!hasOgUrl) enriched.push({ property: "og:url", content: canonical });
  if (!hasOgImage) enriched.push({ property: "og:image", content: ogImage });
  if (!hasTwitterImage) enriched.push({ name: "twitter:image", content: ogImage });
  if (!hasTwitterCard) enriched.push({ name: "twitter:card", content: "summary_large_image" });

  return {
    meta: enriched,
    links: [{ rel: "canonical", href: canonical }],
  };
}

export function productPageHead(product: Product, pathname: string): PageHead {
  const title = `${product.name} — ${PRODUCT_NAME}`;
  const description = productDescription(product);
  const image = product.image || DEFAULT_OG_IMAGE;
  const head = withPublicPageHead(
    pathname,
    [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "product" },
      { property: "og:image", content: image },
      { name: "twitter:image", content: image },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    { ogImage: image },
  );
  return {
    ...head,
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(productJsonLd(product, pathname)),
      },
    ],
  };
}
