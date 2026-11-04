import { describe, expect, it } from "vitest";
import { PLANS, checkoutResumePath } from "@/lib/plans";
import {
  buildLemonSqueezyCheckoutBody,
  lemonSqueezyTestModeFromEnv,
} from "@/lib/billing/lemonsqueezy-provider";

const env = {
  LEMONSQUEEZY_API_KEY: "k",
  LEMONSQUEEZY_STORE_ID: "10",
  LEMONSQUEEZY_WEBHOOK_SECRET: "w",
  LEMONSQUEEZY_VARIANT_ID_SECTIONS: "9001",
  LEMONSQUEEZY_VARIANT_ID_SECTIONS_TEMPLATES: "9002",
  LEMONSQUEEZY_VARIANT_ID_LIFETIME: "9003",
  LEMONSQUEEZY_TEST_MODE: "true",
};

describe("pricing plans (S4 Lemon Squeezy checkout body)", () => {
  it("Sections is $15 per month variant", () => {
    const body = buildLemonSqueezyCheckoutBody(
      { plan: "sections", userId: "u1", origin: "https://substrates.app" },
      env,
      "https://substrates.app",
    );
    const rel = body.data.relationships.variant.data.id;
    expect(rel).toBe("9001");
    expect(body.data.attributes["test_mode"]).toBe(true);
  });

  it("Sections + Templates is $39 per month", () => {
    expect(PLANS["sections-templates"].amountCents).toBe(3900);
    const body = buildLemonSqueezyCheckoutBody(
      { plan: "sections-templates", userId: "u1", origin: "https://x" },
      env,
      "https://x",
    );
    expect(body.data.relationships.variant.data.id).toBe("9002");
  });

  it("Lifetime uses lifetime variant", () => {
    const body = buildLemonSqueezyCheckoutBody(
      { plan: "lifetime", userId: "u1", origin: "https://x" },
      env,
      "https://x",
    );
    expect(body.data.relationships.variant.data.id).toBe("9003");
  });

  it("links the payment to the signed-in user in custom data", () => {
    const body = buildLemonSqueezyCheckoutBody(
      { plan: "lifetime", userId: "user-9", origin: "https://x" },
      env,
      "https://x",
    );
    const custom = body.data.attributes["checkout_data"] as { custom: Record<string, string> };
    expect(custom.custom["user_id"]).toBe("user-9");
    expect(custom.custom["plan"]).toBe("lifetime");
  });

  it("redirect URL uses trusted origin and plan query", () => {
    const body = buildLemonSqueezyCheckoutBody(
      { plan: "sections", userId: "u1", email: "a@b.com", origin: "https://substrates.app" },
      env,
      "https://substrates.app",
    );
    const opts = body.data.attributes["product_options"] as { redirect_url: string };
    expect(opts.redirect_url).toBe("https://substrates.app/checkout-success?plan=sections");
    const data = body.data.attributes["checkout_data"] as { email: string };
    expect(data.email).toBe("a@b.com");
  });

  it("signed-out visitors resume checkout after sign in", () => {
    expect(checkoutResumePath("sections")).toBe("/pricing?checkout=sections");
  });

  it("LEMONSQUEEZY_TEST_MODE parses true", () => {
    expect(lemonSqueezyTestModeFromEnv("true")).toBe(true);
    expect(lemonSqueezyTestModeFromEnv("0")).toBe(false);
  });
});

describe("single template checkout", () => {
  it("uses custom_price from catalog on lifetime variant slot", () => {
    const body = buildLemonSqueezyCheckoutBody(
      { plan: "template:daylight", userId: "u1", origin: "https://x" },
      env,
      "https://x",
    );
    expect(body.data.attributes["custom_price"]).toBeGreaterThan(0);
    const custom = body.data.attributes["checkout_data"] as { custom: Record<string, string> };
    expect(custom.custom["plan"]).toBe("template:daylight");
  });
});
