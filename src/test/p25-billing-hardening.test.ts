import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { buildHealthPayload } from "@/lib/health.server";
import { clearServerEnvCacheForTests } from "@/lib/env.server";
import {
  buildLemonSqueezyCheckoutBody,
  logLemonSqueezyApiError,
  templateCheckoutPriceCents,
  lifetimeMinimumCents,
} from "@/lib/billing/lemonsqueezy-checkout.server";
import {
  mapLemonSqueezyWebhookToEvents,
  resolveOrderPlan,
  shouldProcessLemonWebhookPayload,
  webhookPayloadTestMode,
} from "@/lib/billing/lemonsqueezy-provider";
import { lemonSqueezyBillingProvider } from "@/lib/billing/lemonsqueezy-provider";
import {
  processBillingWebhook,
  type BillingWebhookDeps,
} from "@/lib/billing/process-webhook.server";
import orderLifetime from "./fixtures/lemonsqueezy/order-created-lifetime.json";
import subscriptionCreated from "./fixtures/lemonsqueezy/subscription-created.json";

const testVariantEnv = {
  LEMONSQUEEZY_API_KEY: "k",
  LEMONSQUEEZY_STORE_ID: "10",
  LEMONSQUEEZY_WEBHOOK_SECRET: "w",
  LEMONSQUEEZY_VARIANT_ID_SECTIONS: "9001",
  LEMONSQUEEZY_VARIANT_ID_SECTIONS_TEMPLATES: "9002",
  LEMONSQUEEZY_VARIANT_ID_LIFETIME: "9003",
};

const savedEnv = { ...process.env };

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

const p25EnvKeys = ["LEMONSQUEEZY_TEST_MODE", "LEMONSQUEEZY_ALLOW_TEST_IN_PROD"] as const;

beforeEach(() => {
  Object.assign(process.env, savedEnv);
  for (const key of p25EnvKeys) delete process.env[key];
  clearServerEnvCacheForTests();
  process.env["LEMONSQUEEZY_API_KEY"] = "test_api";
  process.env["LEMONSQUEEZY_STORE_ID"] = "1";
  process.env["LEMONSQUEEZY_WEBHOOK_SECRET"] = "whsec_test";
  process.env["LEMONSQUEEZY_VARIANT_ID_SECTIONS"] = "9001";
  process.env["LEMONSQUEEZY_VARIANT_ID_SECTIONS_TEMPLATES"] = "9002";
  process.env["LEMONSQUEEZY_VARIANT_ID_LIFETIME"] = "9003";
  clearServerEnvCacheForTests();
});

afterEach(() => {
  Object.assign(process.env, savedEnv);
  for (const key of p25EnvKeys) delete process.env[key];
  clearServerEnvCacheForTests();
});

describe("P25 test-mode guard", () => {
  it("P25 health warns when production NODE_ENV and LEMONSQUEEZY_TEST_MODE", () => {
    process.env["NODE_ENV"] = "production";
    process.env["LEMONSQUEEZY_TEST_MODE"] = "true";
    const body = buildHealthPayload();
    expect(body.warnings?.some((w) => w.includes("LEMONSQUEEZY_TEST_MODE"))).toBe(true);
  });

  it("P25 four combinations: prod+envTest+eventTest blocked without ALLOW", () => {
    process.env["NODE_ENV"] = "production";
    process.env["LEMONSQUEEZY_TEST_MODE"] = "true";
    delete process.env["LEMONSQUEEZY_ALLOW_TEST_IN_PROD"];
    const payload = {
      meta: { test_mode: true, event_name: "order_created" },
      data: { type: "orders", id: "1" },
    };
    expect(shouldProcessLemonWebhookPayload(payload as never)).toBe(false);
  });

  it("P25 four combinations: prod+envTest+eventTest allowed with ALLOW", () => {
    process.env["NODE_ENV"] = "production";
    process.env["LEMONSQUEEZY_TEST_MODE"] = "true";
    process.env["LEMONSQUEEZY_ALLOW_TEST_IN_PROD"] = "true";
    expect(shouldProcessLemonWebhookPayload({ meta: { test_mode: true } } as never)).toBe(true);
  });

  it("P25 four combinations: non-prod+envTest+live event blocked", () => {
    process.env["NODE_ENV"] = "development";
    process.env["LEMONSQUEEZY_TEST_MODE"] = "true";
    expect(shouldProcessLemonWebhookPayload({ meta: { test_mode: false } } as never)).toBe(false);
  });

  it("P25 four combinations: non-prod+envTest+test event allowed", () => {
    process.env["NODE_ENV"] = "development";
    process.env["LEMONSQUEEZY_TEST_MODE"] = "true";
    expect(shouldProcessLemonWebhookPayload({ meta: { test_mode: true } } as never)).toBe(true);
  });
});

describe("P25 plan and variant cross-check", () => {
  it("P25 rejects plan_variant_mismatch on order_created", () => {
    const result = resolveOrderPlan({
      planMeta: "sections",
      variantId: "9003",
      amountCents: 1500,
      eventName: "order_created",
      env: testVariantEnv,
    });
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.reason).toBe("plan_variant_mismatch");
  });

  it("P25 template purchase resolves template slug on lifetime variant", () => {
    const result = resolveOrderPlan({
      planMeta: "template:daylight",
      variantId: "9003",
      amountCents: templateCheckoutPriceCents("daylight"),
      eventName: "order_created",
      env: testVariantEnv,
    });
    expect(result).toEqual({ ok: true, plan: "template:daylight" });
  });

  it("P25 lifetime variant without template meta requires lifetime minimum cents", () => {
    const low = resolveOrderPlan({
      variantId: "9003",
      amountCents: 100,
      eventName: "order_created",
      env: testVariantEnv,
    });
    expect(low.ok).toBe(false);
    const ok = resolveOrderPlan({
      variantId: "9003",
      amountCents: lifetimeMinimumCents(),
      eventName: "order_created",
      env: testVariantEnv,
    });
    expect(ok).toEqual({ ok: true, plan: "lifetime" });
  });

  it("P25 template order maps to checkout_completed not lifetime plan id", () => {
    const payload = {
      meta: {
        event_name: "order_created",
        custom_data: { user_id: "u1", plan: "template:daylight" },
      },
      data: {
        type: "orders",
        id: "55",
        attributes: {
          status: "paid",
          customer_id: 1,
          total_usd: templateCheckoutPriceCents("daylight"),
          first_order_item: { variant_id: 9003 },
        },
      },
    };
    const events = mapLemonSqueezyWebhookToEvents(payload as never, testVariantEnv).events;
    expect(events[0]?.type).toBe("checkout_completed");
    expect(events[0]?.plan).toBe("template:daylight");
    expect(events[0]?.plan).not.toBe("lifetime");
  });
});

describe("P25 checkout cancel redirect and catalog custom_price", () => {
  it("P25 checkout body sets success redirect and pricing cancel link", () => {
    const body = buildLemonSqueezyCheckoutBody(
      { plan: "sections", userId: "u1", origin: "https://substrates.app" },
      { ...testVariantEnv, LEMONSQUEEZY_TEST_MODE: "false" },
      "https://substrates.app",
    );
    const opts = body.data.attributes["product_options"] as {
      redirect_url: string;
      receipt_link_url: string;
    };
    expect(opts.redirect_url).toContain("/checkout-success?plan=sections");
    expect(opts.receipt_link_url).toBe("https://substrates.app/pricing?checkout=cancelled");
  });

  it("P25 template custom_price matches catalog.json server-side", () => {
    const body = buildLemonSqueezyCheckoutBody(
      { plan: "template:daylight", userId: "u1", origin: "https://x" },
      { ...testVariantEnv, LEMONSQUEEZY_TEST_MODE: "false" },
      "https://x",
    );
    expect(body.data.attributes["custom_price"]).toBe(templateCheckoutPriceCents("daylight"));
  });
});

describe("P25 subscription_payment_recovered", () => {
  it("P25 maps subscription_payment_recovered to subscription_cycle_paid", () => {
    const payload = {
      meta: {
        event_name: "subscription_payment_recovered",
        custom_data: { user_id: "user-sub", plan: "sections-templates" },
      },
      data: {
        type: "subscriptions",
        id: "200",
        attributes: {
          customer_id: 77,
          variant_id: 9002,
          created_at: "2026-01-01T00:00:00.000000Z",
          renews_at: "2026-02-01T00:00:00.000000Z",
          updated_at: "2026-01-15T00:00:00.000000Z",
        },
      },
    };
    const events = mapLemonSqueezyWebhookToEvents(payload as never, testVariantEnv).events;
    expect(events[0]?.type).toBe("subscription_cycle_paid");
  });
});

describe("P25 Lemon Squeezy API error logging", () => {
  it("P25 logs status and code only from API errors", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    const logged = logLemonSqueezyApiError(422, {
      errors: [{ status: "422", title: "invalid", detail: "secret@email.com" }],
    });
    expect(logged.status).toBe(422);
    expect(warn.mock.calls[0]?.[1]).not.toHaveProperty("detail");
    expect(JSON.stringify(warn.mock.calls)).not.toContain("secret@email.com");
    warn.mockRestore();
  });
});

describe("P25 idempotency retry after dispatch failure", () => {
  it("P25 provider retry succeeds after claim release on first failure", async () => {
    const deps = mockDeps({
      recordCheckout: vi.fn().mockResolvedValueOnce(false).mockResolvedValueOnce(true),
    });
    const secret = "whsec_test";
    const body = JSON.stringify(orderLifetime);
    const header = await signBody(body, secret);
    const first = await processBillingWebhook(
      lemonSqueezyBillingProvider,
      body,
      header,
      secret,
      deps,
    );
    expect(first.status).toBe(500);
    expect(deps.releaseEvent).toHaveBeenCalledTimes(1);
    const second = await processBillingWebhook(
      lemonSqueezyBillingProvider,
      body,
      header,
      secret,
      deps,
    );
    expect(second.status).toBe(200);
    expect(deps.recordCheckout).toHaveBeenCalledTimes(2);
  });
});

describe("P25 webhookPayloadTestMode", () => {
  it("reads meta.test_mode", () => {
    expect(webhookPayloadTestMode({ meta: { test_mode: true } } as never)).toBe(true);
  });
});
