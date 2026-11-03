import type { EntitlementStatus } from "@/lib/entitlements.types";
import type { PlanId, VideoPlanId } from "@/lib/plans";

/** Normalized billing webhook / lifecycle events (provider-agnostic). */
export type BillingEventType =
  | "checkout_completed"
  | "subscription_cycle_paid"
  | "subscription_canceled"
  | "subscription_past_due"
  | "refunded";

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
  /** Provider checkout reference (Stripe session id today; Lemon Squeezy order id in P23). */
  checkoutReference?: string;
  paid?: boolean;
  /**
   * Opaque provider payload for purchase recording until purchases are fully neutral (P23).
   * Stripe webhook dispatch passes the checkout session object here.
   */
  checkoutPayload?: unknown;
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
  | { ok: true; idempotencyKey: string; events: BillingEvent[] };

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
