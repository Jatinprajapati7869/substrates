import { findProduct } from "./catalog";
import {
  countCatalogTemplates,
  countDeliverableTemplates,
  templateAvailabilitySummaryLine,
} from "./content-manifest";
import type { EntitlementDoc, EntitlementStatus } from "./entitlements.types";
import { hasVideoSkillsAccess } from "./video-skills-access";
import { PLANS, VIDEO_PLANS, isPlanId, isVideoPlanId, type PlanId } from "./plans";

export type AccountPurchaseRow = { plan: string; created_at: string };

export type AccountDashboardInput = {
  entitlement: EntitlementDoc | null;
  unlockSlugs: string[];
  purchases: AccountPurchaseRow[];
  providerCustomerPortalUrl: string | null;
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
  video: {
    hasMembership: boolean;
    planName: string | null;
    status: EntitlementStatus | null;
    statusLabel: string;
    accessActive: boolean;
    periodEndLabel: string | null;
    summary: string;
  };
  billing: {
    canManageBilling: boolean;
    unavailableReason: string;
  };
  unlocks: Array<{ slug: string; name: string; image: string }>;
  purchases: Array<{ planLabel: string; dateLabel: string }>;
  catalogAvailability: {
    deliverableTemplates: number;
    totalTemplates: number;
    summaryLine: string;
  };
};

export function planDisplayName(plan: string): string {
  if (isPlanId(plan)) return PLANS[plan].name;
  if (isVideoPlanId(plan)) return VIDEO_PLANS[plan].name;
  if (plan.startsWith("template:")) return `Template: ${plan.slice("template:".length)}`;
  return plan;
}

function videoMembershipSummary(ent: EntitlementDoc | null, accessActive: boolean): string {
  if (!ent?.videoSkillsStatus) {
    return "No video skills membership. Premium styles stay locked on the demo pages.";
  }
  if (accessActive) {
    return ent.videoSkillsStatus === "canceled"
      ? "Video access stays on until the end of your paid period."
      : "Video skills membership is active.";
  }
  if (ent.videoSkillsStatus === "past_due") {
    return "Video payment is past due. Update billing to restore access.";
  }
  if (ent.videoSkillsStatus === "refunded") {
    return "Video membership was refunded.";
  }
  return "Video membership ended.";
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

  const videoAccessActive = hasVideoSkillsAccess(ent);
  const videoPlanId = ent?.videoSkillsPlan ?? null;
  const videoStatus = ent?.videoSkillsStatus ?? null;

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
    video: {
      hasMembership: Boolean(videoStatus),
      planName: videoPlanId ? planDisplayName(videoPlanId) : null,
      status: videoStatus,
      statusLabel: videoStatus ? statusLabel(videoStatus) : "No video membership",
      accessActive: videoAccessActive,
      periodEndLabel: formatCreditsReset(ent?.videoSkillsPeriodEnd ?? null),
      summary: videoMembershipSummary(ent, videoAccessActive),
    },
    billing: {
      canManageBilling: Boolean(input.providerCustomerPortalUrl),
      unavailableReason: input.providerCustomerPortalUrl
        ? ""
        : "Manage billing appears after an active subscription (Lemon Squeezy customer portal).",
    },
    unlocks,
    purchases: input.purchases.map((p) => ({
      planLabel: planDisplayName(p.plan),
      dateLabel: formatMembershipDate(p.created_at),
    })),
    catalogAvailability: {
      deliverableTemplates: countDeliverableTemplates(),
      totalTemplates: countCatalogTemplates(),
      summaryLine: templateAvailabilitySummaryLine(),
    },
  };
}
