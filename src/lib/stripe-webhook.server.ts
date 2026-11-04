import { recordSession } from "./stripe.server";
import { claimStripeEvent, releaseStripeEvent } from "./stripe-events.server";
import { captureServerException } from "./sentry.server";
import {
  applyInvoicePaidEntitlement,
  applyRefundedEntitlement,
  applyVideoInvoicePaidEntitlement,
  resolveUserIdByStripeCustomer,
  setEntitlementStatus,
  setVideoSkillsStatus,
} from "./entitlements.server";
import type { StripeCheckoutSessionRecord } from "@/lib/purchases.server";
import { dispatchBillingEvents, type BillingDispatchDeps } from "./billing/dispatch.server";
import type { BillingEvent } from "./billing/types";
import {
  mapStripeEventToBillingEvents,
  stripeBillingProvider,
  type StripeEvent,
} from "./billing/stripe-provider";

export type { StripeEvent };

export type StripeWebhookDeps = BillingDispatchDeps & {
  claimEvent: (eventId: string) => Promise<boolean>;
  releaseEvent: (eventId: string) => Promise<void>;
};

export const defaultStripeWebhookDeps: StripeWebhookDeps = {
  claimEvent: claimStripeEvent,
  releaseEvent: releaseStripeEvent,
  recordCheckoutSession: recordSession,
  applyInvoicePaid: applyInvoicePaidEntitlement,
  applyVideoInvoicePaid: applyVideoInvoicePaidEntitlement,
  setStatus: setEntitlementStatus,
  setVideoStatus: setVideoSkillsStatus,
  applyRefund: applyRefundedEntitlement,
  resolveUserId: resolveUserIdByStripeCustomer,
};

async function enrichBillingEvents(
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
        event.type === "subscription_past_due")
    ) {
      userId = (await deps.resolveUserId(event.customerId)) ?? undefined;
    }
    enriched.push(userId && !event.userId ? { ...event, userId } : event);
  }
  return enriched;
}

export async function dispatchStripeEvent(
  event: StripeEvent,
  deps: StripeWebhookDeps,
): Promise<void> {
  const events = await enrichBillingEvents(mapStripeEventToBillingEvents(event), deps);
  await dispatchBillingEvents(events, deps);
}

export async function processStripeWebhook(
  rawBody: string,
  signatureHeader: string | null,
  webhookSecret: string,
  deps: StripeWebhookDeps = defaultStripeWebhookDeps,
  nowSec = Math.floor(Date.now() / 1000),
) {
  const parsed = await stripeBillingProvider.verifyAndParseWebhook(
    rawBody,
    signatureHeader,
    webhookSecret,
    nowSec,
  );
  if (!parsed.ok) return { status: parsed.status, body: parsed.body };

  const claimed = await deps.claimEvent(parsed.idempotencyKey);
  if (!claimed) return { status: 200, body: "ok" };

  try {
    const events = await enrichBillingEvents(parsed.events, deps);
    await dispatchBillingEvents(events, deps);
  } catch (error) {
    await deps.releaseEvent(parsed.idempotencyKey);
    captureServerException(error, {
      tags: { area: "stripe-webhook", eventType: parsed.events[0]?.type ?? "unknown" },
    });
    return { status: 500, body: "Webhook handler error" };
  }
  return { status: 200, body: "ok" };
}

export type { StripeCheckoutSessionRecord };
