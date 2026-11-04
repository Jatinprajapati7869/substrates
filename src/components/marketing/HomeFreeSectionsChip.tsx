import { formatFreeSectionCatalogCount } from "@/lib/public-claims";

export function HomeFreeSectionsChip() {
  return (
    <span data-testid="home-free-sections-chip">
      {formatFreeSectionCatalogCount()} sections, free to copy
    </span>
  );
}
