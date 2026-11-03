import { recordSession, verifyStripeSignature, type StripeWebhookResult } from "./stripe.server";
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
import { isPlanId, isVideoPlanId } from "./plans";
import type { StripeCheckoutSessionRecord } from "@/lib/purchases.server";

export type StripeEvent = {
  id: string;
  type: string;
  data: { object: Record<string, unknown> };
};

export type StripeWebhookDeps = {
  claimEvent: (eventId: string) => Promise<boolean>;
  releaseEvent: (eventId: string) => Promise<void>;
  recordCheckoutSession: (session: StripeCheckoutSessionRecord) => Promise<boolean>;
  applyInvoicePaid: typeof applyInvoicePaidEntitlement;
  applyVideoInvoicePaid: typeof applyVideoInvoicePaidEntitlement;
  setStatus: typeof setEntitlementStatus;
  setVideoStatus: typeof setVideoSkillsStatus;
  applyRefund: typeof applyRefundedEntitlement;
  resolveUserId: typeof resolveUserIdByStripeCustomer;
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

function metadataUserPlan(obj: Record<string, unknown>): { userId?: string; plan?: string } {
  const meta = obj["metadata"] as Record<string, string> | undefined;
  const userId = meta?.["user_id"];
  const plan = meta?.["plan"];
  return {
    ...(userId ? { userId } : {}),
    ...(plan ? { plan } : {}),
  };
}

function subscriptionMetadata(invoice: Record<string, unknown>): {
  userId?: string;
  plan?: string;
} {
  const details = invoice["subscription_details"] as
    { metadata?: Record<string, string> } | undefined;
  if (details?.metadata) {
    const userId = details.metadata["user_id"];
    const plan = details.metadata["plan"];
    return {
      ...(userId ? { userId } : {}),
      ...(plan ? { plan } : {}),
    };
  }
  return metadataUserPlan(invoice);
}

function invoicePeriod(invoice: Record<string, unknown>): { start: number; end: number } | null {
  const lines = invoice["lines"] as
    { data?: Array<{ period?: { start?: number; end?: number } }> } | undefined;
  const period = lines?.data?.[0]?.period;
  if (period?.start && period?.end) return { start: period.start, end: period.end };
  return null;
}

export async function dispatchStripeEvent(
  event: StripeEvent,
  deps: StripeWebhookDeps,
): Promise<void> {
  const object = event.data.object;
  switch (event.type) {
    case "checkout.session.completed":
    case "checkout.session.async_payment_succeeded": {
      await deps.recordCheckoutSession(object as StripeCheckoutSessionRecord);
      break;
    }
    case "invoice.paid": {
      const { userId, plan } = subscriptionMetadata(object);
      let uid = userId;
      const customer = object["customer"];
      const customerId = typeof customer === "string" ? customer : null;
      if (!uid && customerId) uid = (await deps.resolveUserId(customerId)) ?? undefined;
      const period = invoicePeriod(object);
      const subscription = object["subscription"];
      const subscriptionId = typeof subscription === "string" ? subscription : null;
      if (uid && period && plan && isVideoPlanId(plan)) {
        await deps.applyVideoInvoicePaid(
          uid,
          plan,
          period.start,
          period.end,
          customerId,
          subscriptionId,
        );
      } else if (uid && period && plan && isPlanId(plan)) {
        await deps.applyInvoicePaid(
          uid,
          plan,
          period.start,
          period.end,
          customerId,
          subscriptionId,
        );
      }
      break;
    }
    case "customer.subscription.deleted": {
      const customer = object["customer"];
      const customerId = typeof customer === "string" ? customer : null;
      const { userId, plan } = metadataUserPlan(object);
      let uid = userId;
      if (!uid && customerId) uid = (await deps.resolveUserId(customerId)) ?? undefined;
      if (uid && plan && isVideoPlanId(plan)) await deps.setVideoStatus(uid, "canceled");
      else if (uid) await deps.setStatus(uid, "canceled");
      break;
    }
    case "invoice.payment_failed": {
      const customer = object["customer"];
      const customerId = typeof customer === "string" ? customer : null;
      const { userId, plan } = subscriptionMetadata(object);
      let uid = userId;
      if (!uid && customerId) uid = (await deps.resolveUserId(customerId)) ?? undefined;
      if (uid && plan && isVideoPlanId(plan)) await deps.setVideoStatus(uid, "past_due");
      else if (uid) await deps.setStatus(uid, "past_due");
      break;
    }
    case "charge.refunded": {
      const customer = object["customer"];
      const customerId = typeof customer === "string" ? customer : null;
      let uid: string | null = null;
      if (customerId) uid = await deps.resolveUserId(customerId);
      if (uid) await deps.applyRefund(uid, undefined);
      break;
    }
    default:
      break;
  }
}

export async function processStripeWebhook(
  rawBody: string,
  signatureHeader: string | null,
  webhookSecret: string,
  deps: StripeWebhookDeps = defaultStripeWebhookDeps,
  nowSec = Math.floor(Date.now() / 1000),
): Promise<StripeWebhookResult> {
  if (!(await verifyStripeSignature(rawBody, signatureHeader, webhookSecret, 300, nowSec))) {
    return { status: 401, body: "Invalid signature" };
  }
  let event: StripeEvent;
  try {
    event = JSON.parse(rawBody) as StripeEvent;
  } catch {
    return { status: 400, body: "Invalid JSON" };
  }
  if (!event.id) return { status: 400, body: "Missing event id" };

  const claimed = await deps.claimEvent(event.id);
  if (!claimed) return { status: 200, body: "ok" };

  try {
    await dispatchStripeEvent(event, deps);
  } catch (error) {
    await deps.releaseEvent(event.id);
    captureServerException(error, { tags: { area: "stripe-webhook", eventType: event.type } });
    return { status: 500, body: "Webhook handler error" };
  }
  return { status: 200, body: "ok" };
}
