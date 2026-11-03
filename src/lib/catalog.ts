import data from "./catalog.json";

export type Product = {
  slug: string;
  kind: "template" | "section";
  name: string;
  description: string;
  category: string;
  subcategory: string;
  platform: string | null;
  image: string;
  demoUrl?: string;
  previewUrl?: string;
  priceUsd?: number | null;
  tier?: string | null;
  featured?: boolean;
};

export const catalog = data as Product[];

/** Sections whose interactive preview is hosted inside this site. */
export const LOCAL_SECTION_PREVIEWS = ["condensation", "florilegium", "joiner", "portfolio-collage", "signal", "transmission", "tiered-pricing", "praise-wall", "feature-bento", "dispatch-footer"];

export function findProduct(kind: Product["kind"], slug: string) {
  return catalog.find((p) => p.kind === kind && p.slug === slug);
}

/** Never invent a purchase price when the source catalog only specifies membership. */
export function productPrice(product: Product): string {
  if (product.kind === "section" && product.tier === "pro") return "Included with Pro membership";
  if (product.priceUsd === 0 || (product.kind === "section" && product.tier === "free")) return "Free";
  if (typeof product.priceUsd === "number") return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(product.priceUsd);
  return "See membership plans";
}

/** Simple non-AI fallback: same kind, same category first. */
export function fallbackRelated(product: Product, count = 4) {
  const others = catalog.filter((p) => p.slug !== product.slug && p.kind === product.kind);
  const same = others.filter((p) => p.category === product.category);
  return [...same, ...others.filter((p) => p.category !== product.category)].slice(0, count);
}

const photos = import.meta.glob("../assets/products/*.jpg", { eager: true, import: "default" }) as Record<string, string>;

/** AI-generated on-brand product photo, when one exists. */
export function productPhoto(slug: string): string | undefined {
  return photos[`../assets/products/${slug}.jpg`];
}
