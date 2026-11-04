import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { buildAccountDashboardView } from "@/lib/account-dashboard";
import type { EntitlementDoc } from "@/lib/entitlements.types";
import { AccountDashboardPanel } from "@/components/AccountDashboardPanel";

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

describe("AccountDashboardPanel", () => {
  it("shows billing unavailable copy when no Stripe customer", () => {
    const view = buildAccountDashboardView({
      entitlement: null,
      unlockSlugs: [],
      purchases: [],
      stripeCustomerId: null,
    });
    render(<AccountDashboardPanel view={view} billingBusy={false} onManageBilling={vi.fn()} />);
    expect(screen.getByTestId("account-billing-unavailable")).toBeTruthy();
    expect(screen.queryByTestId("account-billing")).toBeNull();
    expect(screen.getByRole("link", { name: /See plans/i }).getAttribute("href")).toBe("/pricing");
  });

  it("shows manage billing when customer exists", () => {
    const view = buildAccountDashboardView({
      entitlement: entitlement({ plan: "sections", status: "active", creditsRemaining: 1 }),
      unlockSlugs: [],
      purchases: [],
      stripeCustomerId: "cus_test",
    });
    render(<AccountDashboardPanel view={view} billingBusy={false} onManageBilling={vi.fn()} />);
    expect(screen.getByTestId("account-billing")).toBeTruthy();
  });

  it("lists unlocked templates with copy actions", () => {
    const view = buildAccountDashboardView({
      entitlement: entitlement({ plan: "sections-templates", status: "canceled" }),
      unlockSlugs: ["aerials"],
      purchases: [],
      stripeCustomerId: "cus_x",
    });
    render(<AccountDashboardPanel view={view} billingBusy={false} onManageBilling={vi.fn()} />);
    expect(screen.getByTestId("unlock-aerials")).toBeTruthy();
    expect(screen.getByRole("button", { name: /Copy for Cursor/i })).toBeTruthy();
  });
});
