import { describe, expect, it, vi } from "vitest";
import { entitlementFromPlan, hasVideoSkillsAccess } from "@/lib/entitlements.server";
import { VIDEO_PLANS, videoCheckoutResumePath } from "@/lib/plans";
import { dispatchBillingEvents, type BillingDispatchDeps } from "@/lib/billing/dispatch.server";
import type { BillingEvent } from "@/lib/billing/types";

describe("S22 video plans", () => {
  it("defines $9.99 per month for video-monthly", () => {
    expect(VIDEO_PLANS["video-monthly"].amountCents).toBe(999);
    expect(VIDEO_PLANS["video-monthly"].interval).toBe("month");
  });

  it("defines $79.99 per year for video-yearly", () => {
    expect(VIDEO_PLANS["video-yearly"].amountCents).toBe(7999);
    expect(VIDEO_PLANS["video-yearly"].interval).toBe("year");
  });

  it("resumes video checkout after sign-in on /pricing/videos", () => {
    expect(videoCheckoutResumePath("video-monthly")).toBe("/pricing/videos?checkout=video-monthly");
  });
});

describe("S22 video entitlements stay separate from templates", () => {
  it("template Sections plan does not grant video skills access", () => {
    const ent = entitlementFromPlan("sections");
    expect(hasVideoSkillsAccess(ent)).toBe(false);
    expect(ent.videoSkillsStatus).toBeUndefined();
  });

  it("subscription_cycle_paid for video plan sets video access without template credits", async () => {
    const applyInvoicePaid = vi.fn();
    const applyVideoInvoicePaid = vi.fn().mockResolvedValue(undefined);
    const deps: BillingDispatchDeps = {
      recordCheckout: vi.fn(),
      applyInvoicePaid,
      applyVideoInvoicePaid,
      setStatus: vi.fn(),
      setVideoStatus: vi.fn(),
      applyRefund: vi.fn(),
      resolveUserId: vi.fn(),
      refreshPortalUrl: vi.fn(),
    };
    const events: BillingEvent[] = [
      {
        type: "subscription_cycle_paid",
        eventKey: "test:1",
        userId: "user-v",
        plan: "video-monthly",
        periodStart: 1700000000,
        periodEnd: 1702592000,
        customerId: "77",
        subscriptionId: "200",
      },
    ];
    await dispatchBillingEvents(events, deps);
    expect(applyVideoInvoicePaid).toHaveBeenCalledWith(
      "user-v",
      "video-monthly",
      1700000000,
      1702592000,
      "77",
      "200",
    );
    expect(applyInvoicePaid).not.toHaveBeenCalled();
  });
});
