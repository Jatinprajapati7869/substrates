import { describe, expect, it, vi } from "vitest";
import {
  dispatchStripeEvent,
  processStripeWebhook,
  type StripeWebhookDeps,
} from "@/lib/stripe-webhook.server";
import checkoutCompleted from "./fixtures/stripe/checkout.session.completed.json";
import invoicePaid from "./fixtures/stripe/invoice.paid.json";
import subscriptionDeleted from "./fixtures/stripe/customer.subscription.deleted.json";

async function stripeSignature(body: string, secret: string, timestamp: number) {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(`${timestamp}.${body}`));
  const hex = [...new Uint8Array(sig)].map((b) => b.toString(16).padStart(2, "0")).join("");
  return `t=${timestamp},v1=${hex}`;
}

function mockDeps(overrides: Partial<StripeWebhookDeps> = {}): StripeWebhookDeps {
  return {
    claimEvent: vi.fn().mockResolvedValue(true),
    releaseEvent: vi.fn().mockResolvedValue(undefined),
    recordCheckoutSession: vi.fn().mockResolvedValue(true),
    applyInvoicePaid: vi.fn().mockResolvedValue(undefined),
    applyVideoInvoicePaid: vi.fn().mockResolvedValue(undefined),
    setStatus: vi.fn().mockResolvedValue(undefined),
    setVideoStatus: vi.fn().mockResolvedValue(undefined),
    applyRefund: vi.fn().mockResolvedValue(undefined),
    resolveUserId: vi.fn().mockResolvedValue("user-1"),
    ...overrides,
  };
}

describe("S5 Stripe webhook", () => {
  it("rejects a bad signature on the raw body", async () => {
    const body = JSON.stringify(checkoutCompleted);
    const result = await processStripeWebhook(
      body,
      "t=1,v1=bad",
      "whsec_test",
      mockDeps(),
      1_700_000_000,
    );
    expect(result.status).toBe(401);
  });

  it("rejects timestamps older than five minutes", async () => {
    const secret = "whsec_test";
    const body = JSON.stringify(checkoutCompleted);
    const old = 1_700_000_000;
    const now = old + 301;
    const header = await stripeSignature(body, secret, old);
    const result = await processStripeWebhook(body, header, secret, mockDeps(), now);
    expect(result.status).toBe(401);
  });

  it("returns 200 and skips work when the event id is a replay", async () => {
    const deps = mockDeps({ claimEvent: vi.fn().mockResolvedValue(false) });
    const body = JSON.stringify({ ...checkoutCompleted, id: "evt_dup" });
    const secret = "whsec_test";
    const t = 1_700_000_100;
    const header = await stripeSignature(body, secret, t);
    const result = await processStripeWebhook(body, header, secret, deps, t);
    expect(result.status).toBe(200);
    expect(deps.recordCheckoutSession).not.toHaveBeenCalled();
  });

  it("records checkout.session.completed once for a new event", async () => {
    const deps = mockDeps();
    await dispatchStripeEvent(checkoutCompleted as never, deps);
    expect(deps.recordCheckoutSession).toHaveBeenCalledTimes(1);
  });

  it("releases the event claim when dispatch throws so Stripe can retry", async () => {
    const deps = mockDeps({
      recordCheckoutSession: vi.fn().mockRejectedValue(new Error("firestore down")),
    });
    const body = JSON.stringify({ ...checkoutCompleted, id: "evt_fail" });
    const secret = "whsec_test";
    const t = 1_700_000_200;
    const header = await stripeSignature(body, secret, t);
    const result = await processStripeWebhook(body, header, secret, deps, t);
    expect(result.status).toBe(500);
    expect(deps.releaseEvent).toHaveBeenCalledWith("evt_fail");
  });
});

describe("S20 invoice.paid", () => {
  it("sets subscription credits from plan metadata", async () => {
    const deps = mockDeps();
    await dispatchStripeEvent(invoicePaid as never, deps);
    expect(deps.applyInvoicePaid).toHaveBeenCalledWith(
      "user-1",
      "sections-templates",
      expect.any(Number),
      expect.any(Number),
      "cus_test",
      "sub_test",
    );
  });
});

describe("S21 cancel and refund paths", () => {
  it("marks entitlement canceled on subscription deleted", async () => {
    const deps = mockDeps();
    await dispatchStripeEvent(subscriptionDeleted as never, deps);
    expect(deps.setStatus).toHaveBeenCalledWith("user-1", "canceled");
  });

  it("runs refund handler on charge.refunded", async () => {
    const deps = mockDeps();
    await dispatchStripeEvent(
      {
        id: "evt_ref",
        type: "charge.refunded",
        data: { object: { customer: "cus_test" } },
      },
      deps,
    );
    expect(deps.applyRefund).toHaveBeenCalled();
  });
});
