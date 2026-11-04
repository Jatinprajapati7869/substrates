import { formatFreeSectionCatalogCount, formatTemplateCatalogCount } from "@/lib/public-claims";

export function HomeHeroCatalogParagraph() {
  return (
    <p
      className={
        "mt-4 max-w-md text-[14px] leading-relaxed text-[var(--text-secondary)] sm:text-[15px]"
      }
      data-testid="home-hero-catalog-line"
    >
      Copy Substrates templates and sections straight into Claude Code, Cursor, v0 and more, or open
      them in Webflow and Framer. {formatTemplateCatalogCount()} templates to preview, and{" "}
      <strong className={"font-medium text-[var(--text)]"}>
        {formatFreeSectionCatalogCount()} sections free to copy
      </strong>{" "}
      with an account.
    </p>
  );
}

export function HomeBrowseTemplatesLinkLabel() {
  return (
    <span data-testid="home-browse-templates-count">
      Browse {formatTemplateCatalogCount()} templates
    </span>
  );
}
