import { findProduct } from "./catalog";
import type { EntitlementDoc, EntitlementStatus } from "./entitlements.types";
import { PLANS, isPlanId, type PlanId } from "./plans";

export type AccountPurchaseRow = { plan: string; created_at: string };

export type AccountDashboardInput = {
  entitlement: EntitlementDoc | null;
  unlockSlugs: string[];
  purchases: AccountPurchaseRow[];
  stripeCustomerId: string | null;
};

export type AccountDashboardView = {
  membership: {
    hasPlan: boolean;
    planName: string | null;
    planId: string | null;
    status: EntitlementStatus | null;
    statusLabel: string;
    creditsRemaining: number | null;
    creditsResetLabel: string | null;
    showCredits: boolean;
    membershipSummary: string;
  };
  billing: {
    canManageBilling: boolean;
    unavailableReason: string;
  };
  unlocks: Array<{ slug: string; name: string; image: string }>;
  purchases: Array<{ planLabel: string; dateLabel: string }>;
};

export function planDisplayName(plan: string): string {
  if (isPlanId(plan)) return PLANS[plan].name;
  if (plan.startsWith("template:")) return `Template: ${plan.slice("template:".length)}`;
  return plan;
}

export function formatMembershipDate(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export function formatCreditsReset(end: Date | null | undefined): string | null {
  if (!end) return null;
  return end.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function statusLabel(status: EntitlementStatus | null): string {
  if (!status) return "No membership";
  switch (status) {
    case "active":
      return "Active";
    case "past_due":
      return "Past due";
    case "canceled":
      return "Canceled";
    case "refunded":
      return "Refunded";
    default: {
      const _exhaustive: never = status;
      return _exhaustive;
    }
  }
}

function membershipSummary(ent: EntitlementDoc | null): string {
  if (!ent) return "No active plan. Choose a membership to unlock Pro sections and templates.";
  if (ent.plan === "lifetime" || ent.unlimitedTemplates) {
    return "Lifetime access to every template and Pro section.";
  }
  if (ent.status === "past_due") {
    return "Payment is past due. Update billing to restore full access.";
  }
  if (ent.status === "canceled") {
    return "Subscription canceled. Unlocked templates stay in your library.";
  }
  if (ent.status === "refunded") {
    return "This membership was refunded.";
  }
  return "Your membership is active.";
}

export function buildAccountDashboardView(input: AccountDashboardInput): AccountDashboardView {
  const ent = input.entitlement;
  const planId = ent && isPlanId(ent.plan) ? (ent.plan as PlanId) : null;
  const hasPlan = !!ent && ent.status !== "refunded";
  const showCredits =
    !!ent &&
    ent.plan !== "lifetime" &&
    !ent.unlimitedTemplates &&
    ent.templateAccess === "credits" &&
    ent.creditsRemaining !== null;

  const unlocks = input.unlockSlugs
    .map((slug) => {
      const product = findProduct("template", slug);
      if (!product) return null;
      return { slug, name: product.name, image: product.image };
    })
    .filter((row): row is { slug: string; name: string; image: string } => row !== null);

  return {
    membership: {
      hasPlan,
      planName: ent ? planDisplayName(ent.plan) : null,
      planId: ent?.plan ?? null,
      status: ent?.status ?? null,
      statusLabel: ent ? statusLabel(ent.status) : "No membership",
      creditsRemaining: ent?.creditsRemaining ?? null,
      creditsResetLabel: formatCreditsReset(ent?.creditsPeriodEnd ?? null),
      showCredits,
      membershipSummary: membershipSummary(ent),
    },
    billing: {
      canManageBilling: Boolean(input.stripeCustomerId),
      unavailableReason: input.stripeCustomerId
        ? ""
        : "Manage billing appears after your first checkout creates a Stripe customer.",
    },
    unlocks,
    purchases: input.purchases.map((p) => ({
      planLabel: planDisplayName(p.plan),
      dateLabel: formatMembershipDate(p.created_at),
    })),
  };
}
