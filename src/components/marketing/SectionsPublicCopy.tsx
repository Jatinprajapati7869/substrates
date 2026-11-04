import { formatFreeSectionCatalogCount, formatSectionCatalogCount } from "@/lib/public-claims";

export function SectionsHeroCatalogChip() {
  return (
    <span data-testid="sections-hero-catalog-chip">
      <strong className={"font-semibold \x74ext-[\x76ar(\x2dtext)] tabular-nums"}>
        {formatSectionCatalogCount()}
      </strong>{" "}
      sections · <span className="tabular-nums">{formatFreeSectionCatalogCount()}</span> free to
      copy
    </span>
  );
}

export function SectionsBrowseFreeSectionsLabel() {
  return (
    <span data-testid="sections-browse-free-label">
      Browse {formatFreeSectionCatalogCount()} free sections
    </span>
  );
}

export function SectionsLibraryCountLine() {
  return <span data-testid="sections-library-count">{formatSectionCatalogCount()} sections</span>;
}
