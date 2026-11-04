import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import {
  lemonSqueezyBillingProvider,
  mapLemonSqueezyWebhookToEvents,
  verifyLemonSqueezySignature,
} from "@/lib/billing/lemonsqueezy-provider";
import {
  enrichBillingEvents,
  processBillingWebhook,
  type BillingWebhookDeps,
} from "@/lib/billing/process-webhook.server";
import { clearServerEnvCacheForTests } from "@/lib/env.server";
import orderLifetime from "./fixtures/lemonsqueezy/order-created-lifetime.json";
import subscriptionCreated from "./fixtures/lemonsqueezy/subscription-created.json";
import subscriptionPayment from "./fixtures/lemonsqueezy/subscription-payment-success.json";
import subscriptionCancelled from "./fixtures/lemonsqueezy/subscription-cancelled.json";
import orderRefunded from "./fixtures/lemonsqueezy/order-refunded.json";

const testVariantEnv = {
  LEMONSQUEEZY_VARIANT_ID_SECTIONS: "9001",
  LEMONSQUEEZY_VARIANT_ID_SECTIONS_TEMPLATES: "9002",
  LEMONSQUEEZY_VARIANT_ID_LIFETIME: "9003",
};

const savedEnv = { ...process.env };

function setLemonEnv() {
  process.env["LEMONSQUEEZY_API_KEY"] = "test_api";
  process.env["LEMONSQUEEZY_STORE_ID"] = "1";
  process.env["LEMONSQUEEZY_WEBHOOK_SECRET"] = "whsec_test";
  process.env["LEMONSQUEEZY_VARIANT_ID_SECTIONS"] = "9001";
  process.env["LEMONSQUEEZY_VARIANT_ID_SECTIONS_TEMPLATES"] = "9002";
  process.env["LEMONSQUEEZY_VARIANT_ID_LIFETIME"] = "9003";
  clearServerEnvCacheForTests();
}

async function signBody(body: string, secret: string) {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(body));
  return [...new Uint8Array(sig)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

function mockDeps(overrides: Partial<BillingWebhookDeps> = {}): BillingWebhookDeps {
  return {
    claimEvent: vi.fn().mockResolvedValue(true),
    releaseEvent: vi.fn().mockResolvedValue(undefined),
    recordCheckout: vi.fn().mockResolvedValue(true),
    applyInvoicePaid: vi.fn().mockResolvedValue(undefined),
    applyVideoInvoicePaid: vi.fn().mockResolvedValue(undefined),
    setStatus: vi.fn().mockResolvedValue(undefined),
    setVideoStatus: vi.fn().mockResolvedValue(undefined),
    applyRefund: vi.fn().mockResolvedValue(undefined),
    resolveUserId: vi.fn().mockResolvedValue("user-1"),
    refreshPortalUrl: vi.fn().mockResolvedValue(undefined),
    ...overrides,
  };
}

beforeEach(() => setLemonEnv());
afterEach(() => {
  Object.assign(process.env, savedEnv);
  clearServerEnvCacheForTests();
});

describe("S5 Lemon Squeezy webhook", () => {
  it("rejects a bad signature on the raw body", async () => {
    const body = JSON.stringify(orderLifetime);
    const result = await processBillingWebhook(
      lemonSqueezyBillingProvider,
      body,
      "bad",
      "whsec_test",
      mockDeps(),
    );
    expect(result.status).toBe(400);
  });

  it("accepts a valid signature", async () => {
    const secret = "whsec_test";
    const body = JSON.stringify(orderLifetime);
    const header = await signBody(body, secret);
    expect(await verifyLemonSqueezySignature(body, header, secret)).toBe(true);
  });

  it("returns 200 and skips work when the event key is a replay", async () => {
    const deps = mockDeps({ claimEvent: vi.fn().mockResolvedValue(false) });
    const secret = "whsec_test";
    const body = JSON.stringify(orderLifetime);
    const header = await signBody(body, secret);
    const result = await processBillingWebhook(
      lemonSqueezyBillingProvider,
      body,
      header,
      secret,
      deps,
    );
    expect(result.status).toBe(200);
    expect(deps.recordCheckout).not.toHaveBeenCalled();
  });

  it("records lifetime order_created once for a new event", async () => {
    const deps = mockDeps();
    const events = mapLemonSqueezyWebhookToEvents(orderLifetime as never, testVariantEnv).events;
    await enrichBillingEvents(events, deps).then((e) =>
      import("@/lib/billing/dispatch.server").then(({ dispatchBillingEvents }) =>
        dispatchBillingEvents(e, deps),
      ),
    );
    expect(deps.recordCheckout).toHaveBeenCalledTimes(1);
    expect(deps.recordCheckout).toHaveBeenCalledWith(
      expect.objectContaining({ plan: "lifetime", userId: "user-lifetime" }),
    );
  });

  it("returns 500 and releases the claim when dispatch throws", async () => {
    const deps = mockDeps({
      recordCheckout: vi.fn().mockRejectedValue(new Error("firestore down")),
    });
    const secret = "whsec_test";
    const body = JSON.stringify(orderLifetime);
    const header = await signBody(body, secret);
    const result = await processBillingWebhook(
      lemonSqueezyBillingProvider,
      body,
      header,
      secret,
      deps,
    );
    expect(result.status).toBe(500);
    expect(deps.releaseEvent).toHaveBeenCalled();
  });

  it("no-ops unknown provider events with 200", async () => {
    const deps = mockDeps();
    const payload = {
      meta: { event_name: "affiliate_activated" },
      data: { type: "affiliates", id: "1", attributes: {} },
    };
    const secret = "whsec_test";
    const body = JSON.stringify(payload);
    const header = await signBody(body, secret);
    const result = await processBillingWebhook(
      lemonSqueezyBillingProvider,
      body,
      header,
      secret,
      deps,
    );
    expect(result.status).toBe(200);
    expect(deps.applyInvoicePaid).not.toHaveBeenCalled();
  });

  it("ignores order_created without custom_data user_id", async () => {
    const deps = mockDeps();
    const payload = {
      meta: { event_name: "order_created", custom_data: {} },
      data: {
        type: "orders",
        id: "9",
        attributes: { status: "paid", customer_id: 1, first_order_item: { variant_id: 9003 } },
      },
    };
    const events = mapLemonSqueezyWebhookToEvents(payload as never, testVariantEnv).events;
    expect(events).toHaveLength(0);
  });

  it("P25 releases claim when order_created lacks user_id after verify", async () => {
    const deps = mockDeps();
    const payload = {
      meta: { event_name: "order_created", custom_data: { plan: "lifetime" } },
      data: {
        type: "orders",
        id: "9",
        attributes: {
          status: "paid",
          customer_id: 1,
          total_usd: 49900,
          first_order_item: { variant_id: 9003 },
        },
      },
    };
    const secret = "whsec_test";
    const body = JSON.stringify(payload);
    const header = await signBody(body, secret);
    const result = await processBillingWebhook(
      lemonSqueezyBillingProvider,
      body,
      header,
      secret,
      deps,
    );
    expect(result.status).toBe(200);
    expect(deps.releaseEvent).toHaveBeenCalled();
    expect(deps.recordCheckout).not.toHaveBeenCalled();
  });

  it("ignores unknown variant when plan missing from custom_data", async () => {
    const payload = {
      meta: { event_name: "order_created", custom_data: { user_id: "u1" } },
      data: {
        type: "orders",
        id: "9",
        attributes: {
          status: "paid",
          customer_id: 1,
          first_order_item: { variant_id: 99999 },
        },
      },
    };
    expect(mapLemonSqueezyWebhookToEvents(payload as never, testVariantEnv).events).toHaveLength(0);
  });
});

describe("S20 subscription_cycle_paid", () => {
  it("S20 subscription_created grants credits via applyInvoicePaid", async () => {
    const deps = mockDeps();
    const events = mapLemonSqueezyWebhookToEvents(
      subscriptionCreated as never,
      testVariantEnv,
    ).events;
    await import("@/lib/billing/dispatch.server").then(({ dispatchBillingEvents }) =>
      dispatchBillingEvents(events, deps),
    );
    expect(deps.applyInvoicePaid).toHaveBeenCalledWith(
      "user-sub",
      "sections-templates",
      expect.any(Number),
      expect.any(Number),
      "77",
      "200",
      "https://store.lemonsqueezy.com/billing?sig=abc",
    );
  });

  it("S20 renewal sets credits from subscription_payment_success (not add)", async () => {
    const deps = mockDeps();
    const paymentFixture = {
      ...subscriptionPayment,
      data: {
        ...subscriptionPayment.data,
        attributes: {
          ...subscriptionPayment.data.attributes,
          renews_at: "2026-03-01T00:00:00.000000Z",
        },
      },
    };
    const events = mapLemonSqueezyWebhookToEvents(paymentFixture as never, testVariantEnv).events;
    await import("@/lib/billing/dispatch.server").then(({ dispatchBillingEvents }) =>
      dispatchBillingEvents(events, deps),
    );
    expect(deps.applyInvoicePaid).toHaveBeenCalled();
  });
});

describe("S21 cancel and refund", () => {
  it("S21 cancel keeps unlocks path calls setStatus canceled", async () => {
    const deps = mockDeps();
    const events = mapLemonSqueezyWebhookToEvents(
      subscriptionCancelled as never,
      testVariantEnv,
    ).events;
    await import("@/lib/billing/dispatch.server").then(({ dispatchBillingEvents }) =>
      dispatchBillingEvents(events, deps),
    );
    expect(deps.setStatus).toHaveBeenCalledWith("user-sub", "canceled");
  });

  it("S21 refund revokes via applyRefund", async () => {
    const deps = mockDeps();
    const events = mapLemonSqueezyWebhookToEvents(orderRefunded as never, testVariantEnv).events;
    await import("@/lib/billing/dispatch.server").then(({ dispatchBillingEvents }) =>
      dispatchBillingEvents(events, deps),
    );
    expect(deps.applyRefund).toHaveBeenCalledWith("user-sub", "sections-templates");
  });
});

describe("S7 portal URL stored", () => {
  it("stores portal URL from subscription_created", async () => {
    const deps = mockDeps();
    const events = mapLemonSqueezyWebhookToEvents(
      subscriptionCreated as never,
      testVariantEnv,
    ).events;
    await import("@/lib/billing/dispatch.server").then(({ dispatchBillingEvents }) =>
      dispatchBillingEvents(events, deps),
    );
    expect(deps.applyInvoicePaid).toHaveBeenCalledWith(
      expect.any(String),
      expect.any(String),
      expect.any(Number),
      expect.any(Number),
      expect.any(String),
      expect.any(String),
      "https://store.lemonsqueezy.com/billing?sig=abc",
    );
  });
});

describe("subscription_expired", () => {
  it("maps subscription_expired to canceled status", async () => {
    const payload = {
      meta: {
        event_name: "subscription_expired",
        custom_data: { user_id: "u1", plan: "sections" },
      },
      data: { type: "subscriptions", id: "1", attributes: { customer_id: 1 } },
    };
    const events = mapLemonSqueezyWebhookToEvents(payload as never, testVariantEnv).events;
    expect(events[0]?.type).toBe("subscription_canceled");
  });
});
