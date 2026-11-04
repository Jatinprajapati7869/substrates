import type { BillingProvider, BillingWebhookVerifyResult } from "./types";
import { getServerEnv } from "@/lib/env.server";
import { createLemonCheckout } from "./lemonsqueezy-checkout.server";
import { shouldProcessLemonWebhookPayload } from "./lemonsqueezy-mode.server";
import { mapLemonSqueezyWebhookToEvents } from "./lemonsqueezy-webhook-map.server";
import {
  lemonSqueezyEventKey,
  verifyLemonSqueezySignature,
  type LemonWebhook,
} from "./lemonsqueezy-shared.server";

export {
  buildLemonSqueezyCheckoutBody,
  createLemonCheckout,
  lemonSqueezyFetch,
  logLemonSqueezyApiError,
  lifetimeMinimumCents,
  templateCheckoutPriceCents,
} from "./lemonsqueezy-checkout.server";
export { mapLemonSqueezyWebhookToEvents } from "./lemonsqueezy-webhook-map.server";
export {
  lemonSqueezyTestModeFromEnv,
  planIdFromVariantId,
  pricingCheckoutCancelledUrl,
  variantIdForPlan,
  verifyLemonSqueezySignature,
} from "./lemonsqueezy-shared.server";
export {
  isProductionNodeEnv,
  lemonAllowTestInProduction,
  lemonEnvTestModeEnabled,
  lemonSqueezyHealthWarnings,
  shouldProcessLemonWebhookPayload,
  webhookPayloadTestMode,
} from "./lemonsqueezy-mode.server";
export { resolveOrderPlan, resolveSubscriptionPlan } from "./lemonsqueezy-plan-resolve.server";

async function verifyLemonWebhook(
  rawBody: string,
  signatureHeader: string | null,
  webhookSecret: string,
): Promise<BillingWebhookVerifyResult> {
  if (!(await verifyLemonSqueezySignature(rawBody, signatureHeader, webhookSecret))) {
    return { ok: false, status: 400, body: "Invalid signature" };
  }
  let payload: LemonWebhook;
  try {
    payload = JSON.parse(rawBody) as LemonWebhook;
  } catch {
    return { ok: false, status: 400, body: "Invalid JSON" };
  }
  const eventName = payload.meta?.event_name;
  const data = payload.data;
  if (!eventName || !data?.type || !data.id) {
    return { ok: false, status: 400, body: "Missing event metadata" };
  }

  if (!shouldProcessLemonWebhookPayload(payload)) {
    return {
      ok: true,
      idempotencyKey: lemonSqueezyEventKey(eventName, data.type, data.id),
      events: [],
      releaseClaimOnEmpty: false,
    };
  }

  const env = (() => {
    try {
      return getServerEnv("lemonsqueezy");
    } catch {
      return null;
    }
  })();
  if (!env) {
    return { ok: false, status: 503, body: "Payments are not set up yet." };
  }
  const mapped = mapLemonSqueezyWebhookToEvents(payload, env);
  return {
    ok: true,
    idempotencyKey: lemonSqueezyEventKey(eventName, data.type, data.id),
    events: mapped.events,
    releaseClaimOnEmpty: mapped.releaseClaimOnEmpty,
  };
}

export const lemonSqueezyBillingProvider: BillingProvider = {
  createCheckout: createLemonCheckout,
  verifyAndParseWebhook: verifyLemonWebhook,
  getPortalUrl: async () => {
    throw new Error("Use stored providerCustomerPortalUrl on entitlements.");
  },
};

export function getDefaultBillingProvider(): BillingProvider {
  return lemonSqueezyBillingProvider;
}
