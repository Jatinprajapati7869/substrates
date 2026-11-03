import { describe, expect, it, vi } from "vitest";
import { entitlementFromPlan, hasVideoSkillsAccess } from "@/lib/entitlements.server";
import { VIDEO_PLANS, videoCheckoutResumePath } from "@/lib/plans";
import { videoCheckoutParams } from "@/lib/stripe.server";
import { dispatchStripeEvent, type StripeWebhookDeps } from "@/lib/stripe-webhook.server";

describe("S22 video plans", () => {
  it("charges $9.99 per month for video-monthly", () => {
    const b = videoCheckoutParams("video-monthly", "u1", undefined, "https://substrates.app");
    expect(b.get("mode")).toBe("subscription");
    expect(b.get("line_items[0][price_data][unit_amount]")).toBe("999");
    expect(b.get("line_items[0][price_data][recurring][interval]")).toBe("month");
    expect(b.get("metadata[plan]")).toBe("video-monthly");
  });

  it("charges $79.99 per year for video-yearly", () => {
    expect(VIDEO_PLANS["video-yearly"].amountCents).toBe(7999);
    const b = videoCheckoutParams("video-yearly", "u1", undefined, "https://substrates.app");
    expect(b.get("line_items[0][price_data][recurring][interval]")).toBe("year");
    expect(b.get("cancel_url")).toContain("/pricing/videos");
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

  it("invoice.paid for video plan sets video access without template invoice handler", async () => {
    const applyInvoicePaid = vi.fn();
    const applyVideoInvoicePaid = vi.fn().mockResolvedValue(undefined);
    const deps: StripeWebhookDeps = {
      claimEvent: vi.fn(),
      releaseEvent: vi.fn(),
      recordCheckoutSession: vi.fn(),
      applyInvoicePaid,
      applyVideoInvoicePaid,
      setStatus: vi.fn(),
      setVideoStatus: vi.fn(),
      applyRefund: vi.fn(),
      resolveUserId: vi.fn(),
    };
    await dispatchStripeEvent(
      {
        id: "evt_vid",
        type: "invoice.paid",
        data: {
          object: {
            customer: "cus_v",
            subscription: "sub_v",
            subscription_details: {
              metadata: { user_id: "user-v", plan: "video-monthly" },
            },
            lines: { data: [{ period: { start: 1700000000, end: 1702592000 } }] },
          },
        },
      },
      deps,
    );
    expect(applyVideoInvoicePaid).toHaveBeenCalledWith(
      "user-v",
      "video-monthly",
      1700000000,
      1702592000,
      "cus_v",
      "sub_v",
    );
    expect(applyInvoicePaid).not.toHaveBeenCalled();
  });
});
