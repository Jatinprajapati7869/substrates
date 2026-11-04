import type { LemonWebhook } from "./lemonsqueezy-shared.server";
import { lemonSqueezyTestModeFromEnv } from "./lemonsqueezy-shared.server";

export function isProductionNodeEnv(): boolean {
  return process.env["NODE_ENV"] === "production";
}

export function lemonAllowTestInProduction(): boolean {
  return lemonSqueezyTestModeFromEnv(process.env["LEMONSQUEEZY_ALLOW_TEST_IN_PROD"]);
}

export function lemonEnvTestModeEnabled(): boolean {
  return lemonSqueezyTestModeFromEnv(process.env["LEMONSQUEEZY_TEST_MODE"]);
}

export function webhookPayloadTestMode(payload: LemonWebhook): boolean {
  if (payload.meta?.test_mode === true) return true;
  const attrs = payload.data?.attributes;
  if (attrs && attrs["test_mode"] === true) return true;
  return false;
}

/** Four-quadrant filter: prod test events, non-prod live events, etc. */
export function shouldProcessLemonWebhookPayload(payload: LemonWebhook): boolean {
  const eventTest = webhookPayloadTestMode(payload);
  const envTest = lemonEnvTestModeEnabled();
  const prod = isProductionNodeEnv();

  if (prod && eventTest && !lemonAllowTestInProduction()) return false;
  if (prod && envTest && eventTest && !lemonAllowTestInProduction()) return false;
  if (!prod && envTest && !eventTest) return false;
  return true;
}

export function lemonSqueezyHealthWarnings(): string[] {
  const warnings: string[] = [];
  if (isProductionNodeEnv() && lemonEnvTestModeEnabled()) {
    warnings.push("LEMONSQUEEZY_TEST_MODE is enabled while NODE_ENV is production");
  }
  return warnings;
}
