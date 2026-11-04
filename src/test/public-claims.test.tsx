import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import {
  countCatalogFreeSections,
  countCatalogProSections,
  countCatalogTemplates,
  countDeliverableTemplates,
  countCatalogSections,
  formatSectionCatalogCount,
  formatFreeSectionCatalogCount,
  formatTemplateCatalogCount,
  pricingMembershipChipLine,
  templateAvailabilityOnPricingLine,
} from "@/lib/public-claims";
import {
  PricingMembershipChip,
  PricingTemplateAvailabilityLine,
} from "@/components/marketing/PricingPublicCopy";
import {
  SectionsBrowseFreeSectionsLabel,
  SectionsHeroCatalogChip,
} from "@/components/marketing/SectionsPublicCopy";
import { TemplatesPageTitleCount } from "@/components/marketing/TemplatesPublicCopy";

const ROOT = join(process.cwd());

describe("public-claims helpers", () => {
  it("catalog counts match catalog.json", () => {
    expect(countCatalogTemplates()).toBeGreaterThan(0);
    expect(countCatalogProSections()).toBe(20);
    expect(countCatalogFreeSections()).toBe(42);
    expect(formatSectionCatalogCount()).toBe(String(countCatalogSections()));
    expect(pricingMembershipChipLine()).toBe(
      `${countCatalogTemplates()} templates, one membership`,
    );
    expect(templateAvailabilityOnPricingLine()).toBe(
      `${countDeliverableTemplates()} of ${countCatalogTemplates()} templates with rebuild prompts available now`,
    );
  });
});

describe("P33 pricing public copy", () => {
  it("renders membership chip from helper", () => {
    render(<PricingMembershipChip />);
    expect(screen.getByTestId("pricing-membership-chip").textContent).toBe(
      pricingMembershipChipLine(),
    );
  });

  it("renders template availability from manifest", () => {
    render(<PricingTemplateAvailabilityLine />);
    expect(screen.getByTestId("pricing-template-availability").textContent).toBe(
      templateAvailabilityOnPricingLine(),
    );
  });

  it("PricingPublicCopy source has no hard-coded catalog counts", () => {
    const src = readFileSync(join(ROOT, "src/components/marketing/PricingPublicCopy.tsx"), "utf8");
    expect(src).not.toMatch(/\b192\b/);
    expect(src).not.toMatch(/\b20 Pro\b/);
    expect(src).toMatch(/public-claims/);
  });

  it("pricing route has no hard-coded template catalog count in marketing strings", () => {
    const src = readFileSync(join(ROOT, "src/routes/pricing.tsx"), "utf8");
    expect(src).not.toMatch(/192 templates/);
    expect(src).not.toMatch(/20 Pro sections \+ 1/);
    expect(src).not.toMatch(/Browse 192 templates/);
  });
});

describe("P33 templates page count", () => {
  it("matches helper", () => {
    render(<TemplatesPageTitleCount />);
    expect(screen.getByTestId("templates-page-count").textContent).toBe(
      formatTemplateCatalogCount(),
    );
  });
});

describe("P33 sections public copy", () => {
  it("hero chip uses catalog section counts", () => {
    render(<SectionsHeroCatalogChip />);
    const chip = screen.getByTestId("sections-hero-catalog-chip");
    expect(chip.textContent).toContain(formatSectionCatalogCount());
    expect(chip.textContent).toContain(formatFreeSectionCatalogCount());
  });

  it("browse free label uses catalog free section count", () => {
    render(<SectionsBrowseFreeSectionsLabel />);
    expect(screen.getByTestId("sections-browse-free-label").textContent).toBe(
      `Browse ${formatFreeSectionCatalogCount()} free sections`,
    );
  });

  it("sections route has no stale hard-coded section counts", () => {
    const src = readFileSync(join(ROOT, "src/routes/sections.tsx"), "utf8");
    expect(src).not.toMatch(/58 sections/);
    expect(src).not.toMatch(/Browse 38 free sections/);
    expect(src).toMatch(/SectionsPublicCopy/);
  });
});
