import { catalog } from "./catalog";
import {
  countCatalogTemplates,
  countDeliverableTemplates,
  isDeliverable,
} from "./content-manifest";
import { PLANS } from "./plans";

export {
  countCatalogTemplates,
  countDeliverableTemplates,
  isDeliverable,
} from "./content-manifest";

export function countCatalogSections(): number {
  return catalog.filter((p) => p.kind === "section").length;
}

export function countCatalogProSections(): number {
  return catalog.filter((p) => p.kind === "section" && p.tier === "pro").length;
}

export function countCatalogFreeSections(): number {
  return catalog.filter((p) => p.kind === "section" && p.tier !== "pro").length;
}

export function countDeliverableProSections(): number {
  return catalog.filter((p) => p.kind === "section" && p.tier === "pro" && isDeliverable(p.slug))
    .length;
}

export function countDeliverableFreeSections(): number {
  return catalog.filter((p) => p.kind === "section" && p.tier !== "pro" && isDeliverable(p.slug))
    .length;
}

export function formatTemplateCatalogCount(): string {
  return String(countCatalogTemplates());
}

export function formatProSectionCatalogCount(): string {
  return String(countCatalogProSections());
}

export function formatFreeSectionCatalogCount(): string {
  return String(countCatalogFreeSections());
}

/** Pricing hero chip: total catalog size (preview/browse), not deliverable count. */
export function formatSectionCatalogCount(): string {
  return String(countCatalogSections());
}

export function pricingMembershipChipLine(): string {
  return `${formatTemplateCatalogCount()} templates, one membership`;
}

export function pricingSectionsPlanHeadline(): string {
  return `${formatProSectionCatalogCount()} Pro sections + ${PLANS.sections.monthlyCredits} template a month`;
}

export function pricingTemplatesPlanHeadline(): string {
  return `${formatTemplateCatalogCount()} templates, unlock ${PLANS["sections-templates"].monthlyCredits} per month`;
}

export function pricingLifetimePlanHeadline(): string {
  return `${formatTemplateCatalogCount()} templates in the catalog`;
}

export function templateAvailabilityOnPricingLine(): string {
  return `${countDeliverableTemplates()} of ${countCatalogTemplates()} templates with rebuild prompts available now`;
}

export function proSectionAvailabilityOnPricingLine(): string {
  return `${countDeliverableProSections()} of ${countCatalogProSections()} Pro sections with full prompts available now`;
}

export function homeHeroCatalogLine(freeSectionCount = countCatalogFreeSections()): string {
  return `${formatTemplateCatalogCount()} templates to preview, and ${freeSectionCount} sections free to copy`;
}

export function templatesPageTitleCount(): string {
  return formatTemplateCatalogCount();
}

export function planMonthlyPriceUsd(planId: keyof typeof PLANS): string {
  return String(PLANS[planId].amountCents / 100);
}
