import type { BillingProvider } from "./types";
import { dispatchBillingEvents, type BillingDispatchDeps } from "./dispatch.server";
import type { BillingEvent } from "./types";
import {
  claimBillingProcessedEvent,
  releaseBillingProcessedEvent,
} from "@/lib/billing-processed-events.server";
import { captureServerException } from "@/lib/sentry.server";
import {
  applyInvoicePaidEntitlement,
  applyRefundedEntitlement,
  applyVideoInvoicePaidEntitlement,
  refreshProviderPortalUrl,
  resolveUserIdByBillingCustomer,
  setEntitlementStatus,
  setVideoSkillsStatus,
} from "@/lib/entitlements.server";
import { recordCheckoutPurchase } from "@/lib/purchases.server";

export type BillingWebhookDeps = BillingDispatchDeps & {
  claimEvent: (eventKey: string) => Promise<boolean>;
  releaseEvent: (eventKey: string) => Promise<void>;
};

export function createDefaultBillingWebhookDeps(): BillingWebhookDeps {
  return {
    claimEvent: claimBillingProcessedEvent,
    releaseEvent: releaseBillingProcessedEvent,
    recordCheckout: recordCheckoutPurchase,
    applyInvoicePaid: applyInvoicePaidEntitlement,
    applyVideoInvoicePaid: applyVideoInvoicePaidEntitlement,
    setStatus: setEntitlementStatus,
    setVideoStatus: setVideoSkillsStatus,
    applyRefund: applyRefundedEntitlement,
    resolveUserId: resolveUserIdByBillingCustomer,
    refreshPortalUrl: refreshProviderPortalUrl,
  };
}

export async function enrichBillingEvents(
  events: BillingEvent[],
  deps: BillingDispatchDeps,
): Promise<BillingEvent[]> {
  const enriched: BillingEvent[] = [];
  for (const event of events) {
    let userId = event.userId;
    if (
      !userId &&
      event.customerId &&
      (event.type === "subscription_cycle_paid" ||
        event.type === "subscription_canceled" ||
        event.type === "subscription_past_due" ||
        event.type === "portal_url_updated")
    ) {
      userId = (await deps.resolveUserId(event.customerId)) ?? undefined;
    }
    enriched.push(userId && !event.userId ? { ...event, userId } : event);
  }
  return enriched;
}

export async function processBillingWebhook(
  provider: BillingProvider,
  rawBody: string,
  signatureHeader: string | null,
  webhookSecret: string,
  deps: BillingWebhookDeps,
): Promise<{ status: number; body: string }> {
  const parsed = await provider.verifyAndParseWebhook(rawBody, signatureHeader, webhookSecret);
  if (!parsed.ok) return { status: parsed.status, body: parsed.body };

  const claimed = await deps.claimEvent(parsed.idempotencyKey);
  if (!claimed) return { status: 200, body: "ok" };

  if (parsed.events.length === 0) {
    if (parsed.releaseClaimOnEmpty) await deps.releaseEvent(parsed.idempotencyKey);
    return { status: 200, body: "ok" };
  }

  try {
    const events = await enrichBillingEvents(parsed.events, deps);
    await dispatchBillingEvents(events, deps);
  } catch (error) {
    await deps.releaseEvent(parsed.idempotencyKey);
    captureServerException(error, {
      tags: { area: "billing-webhook", eventType: parsed.events[0]?.type ?? "unknown" },
    });
    return { status: 500, body: "Webhook handler error" };
  }
  return { status: 200, body: "ok" };
}
