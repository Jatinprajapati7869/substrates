import { describe, expect, it } from "vitest";
import type { EntitlementDoc } from "@/lib/entitlements.types";
import { PLANS } from "@/lib/plans";
import { buildAccountDashboardView } from "@/lib/account-dashboard";

const resetEnd = new Date("2026-04-01T00:00:00.000Z");

function entitlement(
  partial: Partial<EntitlementDoc> & Pick<EntitlementDoc, "plan" | "status">,
): EntitlementDoc {
  return {
    creditsRemaining: null,
    creditsPeriodStart: null,
    creditsPeriodEnd: null,
    sectionAccess: "pro",
    templateAccess: "credits",
    updatedAt: new Date(),
    ...partial,
  };
}

describe("account dashboard view", () => {
  it("none: no plan, pricing link copy, billing hidden with reason", () => {
    const view = buildAccountDashboardView({
      entitlement: null,
      unlockSlugs: [],
      purchases: [],
      providerCustomerPortalUrl: null,
    });
    expect(view.membership.hasPlan).toBe(false);
    expect(view.membership.planName).toBeNull();
    expect(view.membership.statusLabel).toBe("No membership");
    expect(view.membership.showCredits).toBe(false);
    expect(view.unlocks).toHaveLength(0);
    expect(view.purchases).toHaveLength(0);
    expect(view.billing.canManageBilling).toBe(false);
    expect(view.billing.unavailableReason).toMatch(/subscription/i);
  });

  it("active with credits: plan, status, credits, reset date", () => {
    const view = buildAccountDashboardView({
      entitlement: entitlement({
        plan: "sections-templates",
        status: "active",
        creditsRemaining: 2,
        creditsPeriodEnd: resetEnd,
        templateAccess: "credits",
      }),
      unlockSlugs: [],
      purchases: [{ plan: "sections-templates", created_at: "2026-01-15T12:00:00.000Z" }],
      providerCustomerPortalUrl: "cus_123",
    });
    expect(view.membership.hasPlan).toBe(true);
    expect(view.membership.planName).toBe(PLANS["sections-templates"].name);
    expect(view.membership.statusLabel).toBe("Active");
    expect(view.membership.creditsRemaining).toBe(2);
    expect(view.membership.showCredits).toBe(true);
    expect(view.membership.creditsResetLabel).toBe("Apr 1, 2026");
    expect(view.billing.canManageBilling).toBe(true);
    expect(view.purchases[0]?.planLabel).toBe(PLANS["sections-templates"].name);
  });

  it("active with zero credits still shows credit row", () => {
    const view = buildAccountDashboardView({
      entitlement: entitlement({
        plan: "sections",
        status: "active",
        creditsRemaining: 0,
        creditsPeriodEnd: resetEnd,
      }),
      unlockSlugs: [],
      purchases: [],
      providerCustomerPortalUrl: "cus_abc",
    });
    expect(view.membership.creditsRemaining).toBe(0);
    expect(view.membership.showCredits).toBe(true);
  });

  it("past_due: status and guidance", () => {
    const view = buildAccountDashboardView({
      entitlement: entitlement({
        plan: "sections-templates",
        status: "past_due",
        creditsRemaining: 1,
        creditsPeriodEnd: resetEnd,
      }),
      unlockSlugs: [],
      purchases: [],
      providerCustomerPortalUrl: "cus_x",
    });
    expect(view.membership.statusLabel).toBe("Past due");
    expect(view.membership.membershipSummary).toMatch(/past due/i);
  });

  it("canceled with unlocks kept in library", () => {
    const view = buildAccountDashboardView({
      entitlement: entitlement({
        plan: "sections-templates",
        status: "canceled",
        creditsRemaining: 0,
        creditsPeriodEnd: resetEnd,
      }),
      unlockSlugs: ["aerials"],
      purchases: [],
      providerCustomerPortalUrl: "cus_old",
    });
    expect(view.membership.statusLabel).toBe("Canceled");
    expect(view.membership.membershipSummary).toMatch(/stay in your library/i);
    expect(view.unlocks).toEqual([expect.objectContaining({ slug: "aerials", name: "Aerials" })]);
  });

  it("lifetime: no credit meter, unlimited summary", () => {
    const view = buildAccountDashboardView({
      entitlement: entitlement({
        plan: "lifetime",
        status: "active",
        creditsRemaining: null,
        unlimitedTemplates: true,
        templateAccess: "all",
      }),
      unlockSlugs: [],
      purchases: [{ plan: "lifetime", created_at: "2025-06-01T00:00:00.000Z" }],
      providerCustomerPortalUrl: "cus_life",
    });
    expect(view.membership.planName).toBe(PLANS.lifetime.name);
    expect(view.membership.showCredits).toBe(false);
    expect(view.membership.membershipSummary).toMatch(/lifetime access/i);
  });
});
