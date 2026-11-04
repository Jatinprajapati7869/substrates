import manifest from "./content-manifest.json";
import { catalog } from "./catalog";

export type ContentManifestProduct = {
  slug: string;
  docId: string;
  kind: string;
};

export type ContentManifest = {
  updatedAt: string | null;
  products: ContentManifestProduct[];
};

const data = manifest as ContentManifest;

const deliverableSlugSet = new Set(data.products.map((p) => p.slug));

export function isDeliverable(slug: string): boolean {
  return deliverableSlugSet.has(slug);
}

export function deliverableTemplateSlugs(): string[] {
  return data.products.filter((p) => p.kind === "template").map((p) => p.slug);
}

export function countCatalogTemplates(): number {
  return catalog.filter((p) => p.kind === "template").length;
}

export function countDeliverableTemplates(): number {
  return deliverableTemplateSlugs().length;
}

/** Honest launch line when marketing copy refers to the full template catalog. */
export function templateAvailabilitySummaryLine(): string {
  const total = countCatalogTemplates();
  const available = countDeliverableTemplates();
  return `${available} of ${total} templates available now`;
}

export function planCheckoutShowsTemplateAvailability(planId: string): boolean {
  return planId === "lifetime";
}
