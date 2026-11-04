/** Customer-facing product name (matches substrates.app). */
export const PRODUCT_NAME = "Substrates";

/** Production site origin (no trailing slash). */
export const SITE_ORIGIN = "https://substrates.app";

export const SUPPORT_EMAIL = "jatin@substrates.app";

/** Legal entity shown in policies and footers (D14 — replace placeholders after counsel). */
export const LEGAL_ENTITY = "[LEGAL ENTITY]";

export const LEGAL_ADDRESS = "[LEGAL ADDRESS]";

export const GOVERNING_LAW = "[GOVERNING LAW]";

export const LEGAL_UPDATED = "November 3, 2026";

/** Production host per D3 (Heroku). */
export const HOSTING_PROVIDER = "Heroku";

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
