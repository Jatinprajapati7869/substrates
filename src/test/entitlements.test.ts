import { describe, expect, it } from "vitest";
import { creditsStateForInvoicePaid, entitlementFromPlan } from "@/lib/entitlements.server";
import { monthlyCreditGrant, PLANS } from "@/lib/plans";

describe("D7 plan entitlements", () => {
  it("Sections grants 1 credit per month", () => {
    expect(PLANS.sections.monthlyCredits).toBe(1);
    expect(PLANS.sections.sectionAccess).toBe("pro");
    expect(PLANS.sections.templateAccess).toBe("credits");
  });
  it("Sections + Templates grants 3 credits per month", () => {
    expect(monthlyCreditGrant("sections-templates")).toBe(3);
  });
  it("Lifetime is unlimited templates without monthly credits", () => {
    const ent = entitlementFromPlan("lifetime");
    expect(ent.unlimitedTemplates).toBe(true);
    expect(ent.creditsRemaining).toBeNull();
  });
});

describe("S20 invoice credit grant", () => {
  it("sets credits to the plan amount rather than adding", () => {
    const start = new Date("2026-01-01T00:00:00Z");
    const end = new Date("2026-02-01T00:00:00Z");
    const state = creditsStateForInvoicePaid("sections", start, end);
    expect(state.creditsRemaining).toBe(1);
    expect(state.creditsPeriodEnd).toEqual(end);
  });
});
