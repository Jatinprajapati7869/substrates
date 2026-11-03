import products from "../catalog.json";

export function catalogRecord(p: (typeof products)[number]) {
  return {
    slug: p.slug,
    kind: p.kind,
    name: p.name,
    description: p.description,
    category: p.category,
    platform: p.platform,
    priceUsd: p.priceUsd ?? null,
    tier: p.tier ?? null,
    image: p.image,
    detailPath: `/${p.kind === "template" ? "templates" : "sections"}/${p.slug}`,
    demoUrl: p.demoUrl ?? null,
    previewPath: p.previewUrl ?? null,
  };
}
export function searchCatalog(query = "", kind = "all", limit = 20) {
  const text = query.toLowerCase();
  return products
    .filter(
      (p) =>
        (kind === "all" || p.kind === kind) &&
        `${p.name} ${p.description} ${p.category}`.toLowerCase().includes(text),
    )
    .slice(0, limit)
    .map(catalogRecord);
}
export function catalogProduct(kind: string, slug: string) {
  const p = products.find((p) => p.kind === kind && p.slug === slug);
  return p ? catalogRecord(p) : null;
}
