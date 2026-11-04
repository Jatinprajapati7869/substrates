import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const entitlementSet = vi.fn().mockResolvedValue(undefined);

vi.mock("@/integrations/firebase/admin.server", () => ({
  getAdminFirestore: vi.fn(async () => ({
    collection: () => ({
      doc: () => ({ set: entitlementSet }),
    }),
  })),
}));

import { buildHealthPayload } from "@/lib/health.server";
import { clearServerEnvCacheForTests } from "@/lib/env.server";
import {
  buildLemonSqueezyCheckoutBody,
  mapLemonSqueezyWebhookToEvents,
} from "@/lib/billing/lemonsqueezy-provider";
import { hasVideoSkillsAccess } from "@/lib/video-skills-access";
import { entitlementFromPlan, applyVideoInvoicePaidEntitlement } from "@/lib/entitlements.server";
import { VIDEO_PLANS, videoCheckoutResumePath } from "@/lib/plans";
import { dispatchBillingEvents, type BillingDispatchDeps } from "@/lib/billing/dispatch.server";
import type { BillingEvent } from "@/lib/billing/types";

const templateVariantEnv = {
  LEMONSQUEEZY_VARIANT_ID_SECTIONS: "9001",
  LEMONSQUEEZY_VARIANT_ID_SECTIONS_TEMPLATES: "9002",
  LEMONSQUEEZY_VARIANT_ID_LIFETIME: "9003",
  LEMONSQUEEZY_VARIANT_ID_VIDEO_MONTHLY: "9101",
  LEMONSQUEEZY_VARIANT_ID_VIDEO_YEARLY: "9102",
};

const lemonEnv = {
  LEMONSQUEEZY_API_KEY: "k",
  LEMONSQUEEZY_STORE_ID: "10",
  LEMONSQUEEZY_WEBHOOK_SECRET: "w",
  ...templateVariantEnv,
};

const savedEnv = { ...process.env };

function setVideoEnvForCheckout(enabled: boolean) {
  process.env["LEMONSQUEEZY_VARIANT_ID_VIDEO_MONTHLY"] = enabled ? "9101" : "";
  process.env["LEMONSQUEEZY_VARIANT_ID_VIDEO_YEARLY"] = enabled ? "9102" : "";
  if (!enabled) {
    delete process.env["LEMONSQUEEZY_VARIANT_ID_VIDEO_MONTHLY"];
    delete process.env["LEMONSQUEEZY_VARIANT_ID_VIDEO_YEARLY"];
  }
}

beforeEach(() => {
  Object.assign(process.env, savedEnv);
  clearServerEnvCacheForTests();
  entitlementSet.mockClear();
  setVideoEnvForCheckout(true);
});

afterEach(() => {
  Object.assign(process.env, savedEnv);
  clearServerEnvCacheForTests();
});

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

describe("S22 Lemon Squeezy checkout bodies", () => {
  it("S22 monthly checkout uses video monthly variant and cancel URL", () => {
    const body = buildLemonSqueezyCheckoutBody(
      { plan: "video-monthly", userId: "u1", origin: "https://substrates.app" },
      lemonEnv,
      "https://substrates.app",
    );
    const variant = body.data.relationships.variant.data.id;
    expect(variant).toBe("9101");
    const opts = body.data.attributes["product_options"] as { receipt_link_url: string };
    expect(opts.receipt_link_url).toBe("https://substrates.app/pricing/videos?checkout=cancelled");
  });

  it("S22 yearly checkout uses video yearly variant", () => {
    const body = buildLemonSqueezyCheckoutBody(
      { plan: "video-yearly", userId: "u1", origin: "https://x" },
      lemonEnv,
      "https://x",
    );
    expect(body.data.relationships.variant.data.id).toBe("9102");
  });
});

describe("S22 health videoConfigured", () => {
  it("S22 reports videoConfigured false when video variant env is missing", () => {
    process.env["LEMONSQUEEZY_API_KEY"] = "k";
    process.env["LEMONSQUEEZY_STORE_ID"] = "1";
    process.env["LEMONSQUEEZY_WEBHOOK_SECRET"] = "w";
    process.env["LEMONSQUEEZY_VARIANT_ID_SECTIONS"] = "9001";
    process.env["LEMONSQUEEZY_VARIANT_ID_SECTIONS_TEMPLATES"] = "9002";
    process.env["LEMONSQUEEZY_VARIANT_ID_LIFETIME"] = "9003";
    setVideoEnvForCheckout(false);
    clearServerEnvCacheForTests();
    expect(buildHealthPayload().configured.videoConfigured).toBe(false);
  });

  it("S22 reports videoConfigured true when both video variants are set", () => {
    process.env["LEMONSQUEEZY_API_KEY"] = "k";
    process.env["LEMONSQUEEZY_STORE_ID"] = "1";
    process.env["LEMONSQUEEZY_WEBHOOK_SECRET"] = "w";
    process.env["LEMONSQUEEZY_VARIANT_ID_SECTIONS"] = "9001";
    process.env["LEMONSQUEEZY_VARIANT_ID_SECTIONS_TEMPLATES"] = "9002";
    process.env["LEMONSQUEEZY_VARIANT_ID_LIFETIME"] = "9003";
    setVideoEnvForCheckout(true);
    clearServerEnvCacheForTests();
    expect(buildHealthPayload().configured.videoConfigured).toBe(true);
  });
});

describe("S22 video entitlements stay separate from templates", () => {
  it("S22 template Sections plan does not grant video skills access", () => {
    const ent = entitlementFromPlan("sections");
    expect(hasVideoSkillsAccess(ent)).toBe(false);
    expect(ent.videoSkillsStatus).toBeUndefined();
  });

  it("S22 webhook subscription_created grants videoAccess via subscription_cycle_paid", () => {
    const payload = {
      meta: {
        event_name: "subscription_created",
        custom_data: { user_id: "user-v", plan: "video-monthly" },
      },
      data: {
        type: "subscriptions",
        id: "200",
        attributes: {
          customer_id: 77,
          variant_id: 9101,
          created_at: "2026-01-01T00:00:00.000000Z",
          renews_at: "2026-02-01T00:00:00.000000Z",
          updated_at: "2026-01-15T00:00:00.000000Z",
        },
      },
    };
    const events = mapLemonSqueezyWebhookToEvents(payload as never, templateVariantEnv).events;
    expect(events[0]?.type).toBe("subscription_cycle_paid");
    expect(events[0]?.plan).toBe("video-monthly");
  });

  it("S22 subscription_cycle_paid for video plan sets video access without template credits", async () => {
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

  it("S22 renewal stores video period end on entitlement write", async () => {
    await applyVideoInvoicePaidEntitlement(
      "user-v",
      "video-monthly",
      1700000000,
      1702678400,
      "77",
      "200",
    );
    expect(entitlementSet).toHaveBeenCalledWith(
      expect.objectContaining({
        videoSkillsStatus: "active",
        videoSkillsPlan: "video-monthly",
        videoSkillsPeriodEnd: new Date(1702678400 * 1000),
      }),
      { merge: true },
    );
  });

  it("S22 canceled video keeps access until period end", () => {
    const future = new Date(Date.now() + 86400000);
    expect(
      hasVideoSkillsAccess({
        plan: "sections",
        status: "active",
        creditsRemaining: 1,
        creditsPeriodStart: null,
        creditsPeriodEnd: null,
        sectionAccess: "pro",
        templateAccess: "credits",
        updatedAt: new Date(),
        videoSkillsStatus: "canceled",
        videoSkillsPeriodEnd: future,
      }),
    ).toBe(true);
  });

  it("S22 refund removes video access", () => {
    expect(
      hasVideoSkillsAccess({
        plan: "sections",
        status: "active",
        creditsRemaining: 1,
        creditsPeriodStart: null,
        creditsPeriodEnd: null,
        sectionAccess: "pro",
        templateAccess: "credits",
        updatedAt: new Date(),
        videoSkillsStatus: "refunded",
        videoSkillsPeriodEnd: new Date(Date.now() + 86400000),
      }),
    ).toBe(false);
  });

  it("S22 video buyer entitlement merge does not grant template credits", async () => {
    await applyVideoInvoicePaidEntitlement(
      "user-v",
      "video-yearly",
      1700000000,
      1735689600,
      "77",
      "201",
    );
    const payload = entitlementSet.mock.calls.at(-1)?.[0] as Record<string, unknown>;
    expect(payload).not.toHaveProperty("creditsRemaining");
    expect(payload).not.toHaveProperty("templateAccess");
    expect(payload).not.toHaveProperty("unlimitedTemplates");
  });
});
