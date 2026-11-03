/** Customer-facing product name (matches substrates.app). */
export const PRODUCT_NAME = "Substrates";

/** Production site origin (no trailing slash). */
export const SITE_ORIGIN = "https://substrates.app";

export const SUPPORT_EMAIL = "jatin@substrates.app";

/** Legal entity shown in policies and footers (confirm with your lawyer if this changes). */
export const LEGAL_ENTITY = "OversightStudio, LLC";

export const LEGAL_ADDRESS = "1111B S Governors Ave STE 7287, Dover, DE 19904, USA";

export const DEFAULT_META_DESCRIPTION =
  "Substrates — website templates and AI-ready sections for modern builds.";

export const LOGO_WEBP = "/logo.webp";
export const LOGO_PNG = "/logo.png";

export const GITHUB_REPO = "https://github.com/Jatinprajapati7869/substrates";

export function mailtoSupport(subject?: string) {
  const q = subject ? `?subject=${encodeURIComponent(subject)}` : "";
  return `mailto:${SUPPORT_EMAIL}${q}`;
}

export function contactHref() {
  return mailtoSupport();
}
