import { describe, expect, it } from "vitest";
import { catalog } from "@/lib/catalog";
import { confirmMembershipAfterPayment } from "@/lib/checkout-success-flow";
import {
  CHECKOUT_PLAN_INCLUDES,
  checkoutPreviewItems,
  checkoutSummaryForPlan,
  checkoutSuccessPrimaryAction,
  formatPlanPrice,
  pollEntitlementActive,
} from "@/lib/checkout-summary";
import { PLANS } from "@/lib/plans";

describe("checkout summary", () => {
  it("shows plan name, price from PLANS, and 3–6 catalog images", () => {
    const summary = checkoutSummaryForPlan("sections-templates");
    expect(summary.planName).toBe(PLANS["sections-templates"].name);
    expect(summary.priceLabel).toBe(formatPlanPrice("sections-templates"));
    expect(summary.includes).toEqual(CHECKOUT_PLAN_INCLUDES["sections-templates"]);
    expect(summary.previews.length).toBeGreaterThanOrEqual(3);
    expect(summary.previews.length).toBeLessThanOrEqual(6);
    for (const item of summary.previews) {
      const product = catalog.find((p) => p.slug === item.slug);
      expect(product?.image).toBe(item.image);
      expect(item.image.startsWith("http") || item.image.startsWith("/")).toBe(true);
    }
  });

  it("lifetime previews favor templates", () => {
    const items = checkoutPreviewItems("lifetime");
    const templateCount = items.filter((i) => i.kind === "template").length;
    expect(templateCount).toBeGreaterThanOrEqual(2);
  });

  it("primary action links templates for credit plans", () => {
    expect(checkoutSuccessPrimaryAction("sections").to).toBe("/sections");
    expect(checkoutSuccessPrimaryAction("lifetime").to).toBe("/templates");
  });
});

describe("checkout success entitlement poll", () => {
  it("confirms when entitlement becomes active", async () => {
    let calls = 0;
    const result = await pollEntitlementActive(
      async () => {
        calls += 1;
        return calls < 3 ? { active: false, plan: null } : { active: true, plan: "sections" };
      },
      "sections",
      { intervalMs: 1, timeoutMs: 50, sleep: async () => {} },
    );
    expect(result).toBe("confirmed");
    expect(calls).toBeGreaterThanOrEqual(3);
  });

  it("times out when webhook is slow", async () => {
    const result = await pollEntitlementActive(
      async () => ({ active: false, plan: null }),
      "sections",
      { intervalMs: 1, timeoutMs: 5, sleep: async () => {} },
    );
    expect(result).toBe("timeout");
  });
});

describe("checkout success flow", () => {
  it("moves from payment confirm to entitlement confirmed", async () => {
    let entCalls = 0;
    const result = await confirmMembershipAfterPayment(
      async () => ({ ok: true, plan: "sections" }),
      async () => {
        entCalls += 1;
        return entCalls >= 2 ? { active: true, plan: "sections" } : { active: false, plan: null };
      },
      { intervalMs: 0, timeoutMs: 100, sleep: async () => {} },
    );
    expect(result.status).toBe("confirmed");
    expect(result.plan).toBe("sections");
    expect(entCalls).toBeGreaterThanOrEqual(2);
  });
});
