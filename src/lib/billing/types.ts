import type { EntitlementStatus } from "@/lib/entitlements.types";
import type { PlanId, VideoPlanId } from "@/lib/plans";

/** Normalized billing webhook / lifecycle events (provider-agnostic). */
export type BillingEventType =
  | "checkout_completed"
  | "subscription_cycle_paid"
  | "subscription_canceled"
  | "subscription_past_due"
  | "refunded"
  | "portal_url_updated";

export type BillingCheckoutPayload = {
  checkoutId: string;
  userId: string;
  plan: string;
  customerId: string | null;
  subscriptionId?: string | null;
  amountCents?: number | null;
  currency?: string | null;
  paid: boolean;
};

export type BillingEvent = {
  type: BillingEventType;
  /** Idempotency key for processed-events collection (unique per provider delivery). */
  eventKey: string;
  userId?: string;
  plan?: string;
  status?: EntitlementStatus;
  periodStart?: number;
  periodEnd?: number | null;
  customerId?: string | null;
  subscriptionId?: string | null;
  portalUrl?: string | null;
  amountCents?: number;
  currency?: string;
  /** Provider checkout reference (Lemon Squeezy order or checkout id). */
  checkoutReference?: string;
  paid?: boolean;
  checkoutPayload?: BillingCheckoutPayload;
};

export type BillingCheckoutPlan = PlanId | VideoPlanId | `template:${string}`;

export type CreateCheckoutInput = {
  plan: BillingCheckoutPlan;
  userId: string;
  email?: string;
  origin: string;
};

export type BillingWebhookVerifyResult =
  | { ok: false; status: number; body: string }
  | {
      ok: true;
      idempotencyKey: string;
      events: BillingEvent[];
      /** When true and events is empty, release the idempotency claim after a 200 response. */
      releaseClaimOnEmpty?: boolean;
    };

export interface BillingProvider {
  createCheckout(input: CreateCheckoutInput): Promise<string>;
  verifyAndParseWebhook(
    rawBody: string,
    signatureHeader: string | null,
    webhookSecret: string,
    nowSec?: number,
  ): Promise<BillingWebhookVerifyResult>;
  getPortalUrl(customerId: string, returnUrl: string): Promise<string>;
}
