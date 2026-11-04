import { SITE_ORIGIN } from "@/lib/brand";

/** Origin for Stripe return URLs — trusted host only (blocks Host header injection). */
export function trustedCheckoutOrigin(request: Request): string {
  const req = new URL(request.url);
  const canonical = new URL(SITE_ORIGIN);
  if (
    req.hostname === canonical.hostname ||
    req.hostname === "localhost" ||
    req.hostname === "127.0.0.1"
  ) {
    return req.origin;
  }
  return SITE_ORIGIN;
}
