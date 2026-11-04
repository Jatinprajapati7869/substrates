import type { BillingCheckoutPayload } from "./types";
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
import { isPlanId, isVideoPlanId } from "@/lib/plans";
import type { BillingEvent } from "./types";

export type BillingDispatchDeps = {
  recordCheckout: (payload: BillingCheckoutPayload) => Promise<boolean>;
  applyInvoicePaid: typeof applyInvoicePaidEntitlement;
  applyVideoInvoicePaid: typeof applyVideoInvoicePaidEntitlement;
  setStatus: typeof setEntitlementStatus;
  setVideoStatus: typeof setVideoSkillsStatus;
  applyRefund: typeof applyRefundedEntitlement;
  resolveUserId: typeof resolveUserIdByBillingCustomer;
  refreshPortalUrl: typeof refreshProviderPortalUrl;
};

export async function dispatchBillingEvent(
  event: BillingEvent,
  deps: BillingDispatchDeps,
): Promise<void> {
  switch (event.type) {
    case "checkout_completed": {
      if (event.checkoutPayload) {
        const ok = await deps.recordCheckout(event.checkoutPayload);
        if (!ok) throw new Error("checkout record failed");
      }
      break;
    }
    case "subscription_cycle_paid": {
      const uid = event.userId;
      const plan = event.plan;
      const periodStart = event.periodStart;
      const periodEnd = event.periodEnd;
      if (uid && plan && periodStart != null && periodEnd != null && isVideoPlanId(plan)) {
        await deps.applyVideoInvoicePaid(
          uid,
          plan,
          periodStart,
          periodEnd,
          event.customerId ?? null,
          event.subscriptionId ?? null,
        );
      } else if (uid && plan && periodStart != null && periodEnd != null && isPlanId(plan)) {
        await deps.applyInvoicePaid(
          uid,
          plan,
          periodStart,
          periodEnd,
          event.customerId ?? null,
          event.subscriptionId ?? null,
          event.portalUrl ?? null,
        );
      }
      break;
    }
    case "portal_url_updated": {
      const uid = event.userId;
      if (uid && event.portalUrl) await deps.refreshPortalUrl(uid, event.portalUrl);
      break;
    }
    case "subscription_canceled": {
      const uid = event.userId;
      const plan = event.plan;
      if (uid && plan && isVideoPlanId(plan)) await deps.setVideoStatus(uid, "canceled");
      else if (uid) await deps.setStatus(uid, "canceled");
      break;
    }
    case "subscription_past_due": {
      const uid = event.userId;
      const plan = event.plan;
      if (uid && plan && isVideoPlanId(plan)) await deps.setVideoStatus(uid, "past_due");
      else if (uid) await deps.setStatus(uid, "past_due");
      break;
    }
    case "refunded": {
      const uid = event.userId;
      if (uid) await deps.applyRefund(uid, event.plan);
      else if (event.customerId) {
        const resolved = await deps.resolveUserId(event.customerId);
        if (resolved) await deps.applyRefund(resolved, event.plan);
      }
      break;
    }
    default: {
      const _exhaustive: never = event.type;
      return _exhaustive;
    }
  }
}

export async function dispatchBillingEvents(
  events: BillingEvent[],
  deps: BillingDispatchDeps,
): Promise<void> {
  for (const event of events) {
    await dispatchBillingEvent(event, deps);
  }
}
