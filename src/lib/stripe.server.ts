/** @deprecated Import from `@/lib/billing/stripe-provider` — re-exported for P22 compat until P23. */
export {
  checkoutParams,
  createBillingPortalSession,
  createCheckoutSession,
  createTemplateCheckoutSession,
  createVideoCheckoutSession,
  getCheckoutSession,
  recordSession,
  stripeBillingProvider,
  templateCheckoutParams,
  type StripeEvent,
  type StripeWebhookResult,
  mapStripeEventToBillingEvents,
  verifyStripeSignature,
  videoCheckoutParams,
} from "./billing/stripe-provider";
