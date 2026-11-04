import type { BillingCheckoutPayload, BillingEvent } from "./types";
import type { LemonSqueezyEnv } from "@/lib/env.server";
import { resolveOrderPlan, resolveSubscriptionPlan } from "./lemonsqueezy-plan-resolve.server";
import {
  attrCustomerId,
  attrNumber,
  attrString,
  customData,
  isoToUnixSeconds,
  lemonSqueezyEventKey,
  orderVariantId,
  portalFromAttrs,
  subscriptionVariantId,
  type LemonWebhook,
} from "./lemonsqueezy-shared.server";

export type WebhookMapResult = {
  events: BillingEvent[];
  /** Release idempotency claim so LS can replay after custom_data is fixed. */
  releaseClaimOnEmpty: boolean;
};

function optionalFields(fields: Record<string, unknown>): Partial<BillingEvent> {
  const out: Partial<BillingEvent> = {};
  for (const [key, value] of Object.entries(fields)) {
    if (value !== undefined) (out as Record<string, unknown>)[key] = value;
  }
  return out;
}

export function mapLemonSqueezyWebhookToEvents(
  payload: LemonWebhook,
  env: Pick<
    LemonSqueezyEnv,
    | "LEMONSQUEEZY_VARIANT_ID_SECTIONS"
    | "LEMONSQUEEZY_VARIANT_ID_SECTIONS_TEMPLATES"
    | "LEMONSQUEEZY_VARIANT_ID_LIFETIME"
  >,
): WebhookMapResult {
  const eventName = payload.meta?.event_name;
  const data = payload.data;
  if (!eventName || !data?.type || !data.id) {
    return { events: [], releaseClaimOnEmpty: false };
  }

  const eventKey = lemonSqueezyEventKey(eventName, data.type, data.id);
  const attrs = data.attributes ?? {};
  const { userId, plan: planMeta } = customData(payload);
  const customerId = attrCustomerId(attrs);
  const subscriptionId =
    data.type === "subscriptions"
      ? data.id
      : (attrString(attrs, "subscription_id") ??
        (typeof attrs["subscription_id"] === "number" ? String(attrs["subscription_id"]) : null));

  switch (eventName) {
    case "order_created": {
      if (attrs["status"] !== "paid") return { events: [], releaseClaimOnEmpty: false };
      const variantId = orderVariantId(attrs);
      const resolved = resolveOrderPlan({
        planMeta,
        variantId,
        amountCents: attrNumber(attrs, "total_usd"),
        eventName,
        env,
      });
      if (!resolved.ok) return { events: [], releaseClaimOnEmpty: false };
      if (!userId) return { events: [], releaseClaimOnEmpty: true };
      const plan = resolved.plan;
      const checkoutPayload: BillingCheckoutPayload = {
        checkoutId: data.id,
        userId,
        plan,
        customerId,
        subscriptionId: null,
        amountCents: attrNumber(attrs, "total_usd"),
        currency: "usd",
        paid: true,
      };
      return {
        releaseClaimOnEmpty: false,
        events: [
          {
            type: "checkout_completed",
            eventKey,
            ...optionalFields({ userId, plan, customerId, checkoutPayload }),
          },
        ],
      };
    }
    case "subscription_created":
    case "subscription_payment_success":
    case "subscription_payment_recovered": {
      const variantId = subscriptionVariantId(attrs);
      const resolved = resolveSubscriptionPlan({ planMeta, variantId, eventName, env });
      if (!resolved.ok) return { events: [], releaseClaimOnEmpty: false };
      const periodEnd =
        isoToUnixSeconds(attrString(attrs, "renews_at")) ??
        isoToUnixSeconds(attrString(attrs, "updated_at"));
      const periodStart =
        isoToUnixSeconds(attrString(attrs, "created_at")) ??
        isoToUnixSeconds(attrString(attrs, "updated_at"));
      if (!userId) return { events: [], releaseClaimOnEmpty: true };
      if (periodStart == null || periodEnd == null)
        return { events: [], releaseClaimOnEmpty: false };
      const plan = resolved.plan;
      return {
        releaseClaimOnEmpty: false,
        events: [
          {
            type: "subscription_cycle_paid",
            eventKey,
            ...optionalFields({
              userId,
              plan,
              periodStart,
              periodEnd,
              customerId,
              subscriptionId,
              portalUrl: portalFromAttrs(attrs),
              amountCents: attrNumber(attrs, "total_usd") ?? undefined,
              currency: attrString(attrs, "currency") ?? "usd",
            }),
          },
        ],
      };
    }
    case "subscription_updated": {
      const portalUrl = portalFromAttrs(attrs);
      if (!portalUrl) return { events: [], releaseClaimOnEmpty: false };
      return {
        releaseClaimOnEmpty: false,
        events: [
          {
            type: "portal_url_updated",
            eventKey,
            ...optionalFields({ userId, customerId, portalUrl }),
          },
        ],
      };
    }
    case "subscription_cancelled":
    case "subscription_expired": {
      return {
        releaseClaimOnEmpty: false,
        events: [
          {
            type: "subscription_canceled",
            eventKey,
            ...optionalFields({ userId, plan: planMeta, customerId, status: "canceled" }),
          },
        ],
      };
    }
    case "subscription_payment_failed": {
      return {
        releaseClaimOnEmpty: false,
        events: [
          {
            type: "subscription_past_due",
            eventKey,
            ...optionalFields({ userId, plan: planMeta, customerId, status: "past_due" }),
          },
        ],
      };
    }
    case "order_refunded":
    case "subscription_payment_refunded": {
      return {
        releaseClaimOnEmpty: false,
        events: [
          {
            type: "refunded",
            eventKey,
            ...optionalFields({ userId, plan: planMeta, customerId }),
          },
        ],
      };
    }
    default:
      return { events: [], releaseClaimOnEmpty: false };
  }
}
