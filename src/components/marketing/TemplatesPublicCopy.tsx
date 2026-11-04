import {
  formatFreeSectionCatalogCount,
  formatSectionCatalogCount,
  formatTemplateCatalogCount,
  templatesPageTitleCount,
} from "@/lib/public-claims";

export function TemplatesPageTitleCount() {
  return (
    <span className={"text-[var(--text-tertiary)]"} data-testid="templates-page-count">
      {templatesPageTitleCount()}
    </span>
  );
}

const sidebarCountClass = "shrink-0 text-[11px] tabular-nums text-[var(--text-tertiary)]";

export function SidebarTemplateCount() {
  return (
    <span className={sidebarCountClass} data-testid="sidebar-template-count">
      {formatTemplateCatalogCount()}
    </span>
  );
}

export function SidebarSectionCount() {
  return (
    <span className={sidebarCountClass} data-testid="sidebar-section-count">
      {formatSectionCatalogCount()}
    </span>
  );
}
