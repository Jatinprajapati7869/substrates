import { describe, expect, it } from "vitest";
import { PLANS, checkoutResumePath } from "@/lib/plans";
import { checkoutParams } from "@/lib/stripe.server";

describe("pricing plans", () => {
  it("Sections is $15 per month", () => {
    const b = checkoutParams("sections", "u1", undefined, "https://x");
    expect(b.get("mode")).toBe("subscription");
    expect(b.get("line_items[0][price_data][unit_amount]")).toBe("1500");
    expect(b.get("line_items[0][price_data][recurring][interval]")).toBe("month");
  });
  it("Sections + Templates is $39 per month", () => {
    expect(PLANS["sections-templates"].amountCents).toBe(3900);
    expect(checkoutParams("sections-templates", "u1", undefined, "https://x").get("mode")).toBe("subscription");
  });
  it("Lifetime is a one-time $499 payment", () => {
    const b = checkoutParams("lifetime", "u1", undefined, "https://x");
    expect(b.get("mode")).toBe("payment");
    expect(b.get("line_items[0][price_data][unit_amount]")).toBe("49900");
    expect(b.get("line_items[0][price_data][recurring][interval]")).toBeNull();
  });
  it("links the payment to the signed-in user", () => {
    expect(checkoutParams("lifetime", "user-9", undefined, "https://x").get("metadata[user_id]")).toBe("user-9");
  });
  it("signed-out visitors resume checkout after sign in", () => {
    expect(checkoutResumePath("sections")).toBe("/pricing?checkout=sections");
  });
});

import { templateCheckoutParams } from "@/lib/stripe.server";
import { findProduct } from "@/lib/catalog";
describe("single template checkout", () => {
  it("charges the template's catalog price once", () => {
    const b = templateCheckoutParams("daylight", "u1", undefined, "https://x");
    const p = findProduct("template", "daylight")!;
    expect(b.get("mode")).toBe("payment");
    expect(b.get("line_items[0][price_data][unit_amount]")).toBe(String(Math.round((p.priceUsd as number) * 100)));
    expect(b.get("metadata[plan]")).toBe("template:daylight");
  });
  it("rejects unknown templates", () => {
    expect(() => templateCheckoutParams("nope-xyz", "u1", undefined, "https://x")).toThrow();
  });
});
