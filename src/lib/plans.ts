export type PlanId = "sections" | "sections-templates" | "lifetime";

export type VideoPlanId = "video-monthly" | "video-yearly";

export type SectionAccess = "free" | "pro";
export type TemplateAccess = "none" | "credits" | "all";

export type Plan = {
  id: PlanId;
  name: string;
  amountCents: number;
  mode: "subscription" | "payment";
  interval?: "month";
  /** Monthly template credits; null means unlimited (lifetime). */
  monthlyCredits: number | null;
  unlimitedTemplates: boolean;
  sectionAccess: SectionAccess;
  templateAccess: TemplateAccess;
};

export type VideoPlan = {
  id: VideoPlanId;
  name: string;
  amountCents: number;
  mode: "subscription";
  interval: "month" | "year";
};

export const PLANS: Record<PlanId, Plan> = {
  sections: {
    id: "sections",
    name: "Sections",
    amountCents: 1500,
    mode: "subscription",
    interval: "month",
    monthlyCredits: 1,
    unlimitedTemplates: false,
    sectionAccess: "pro",
    templateAccess: "credits",
  },
  "sections-templates": {
    id: "sections-templates",
    name: "Sections + Templates",
    amountCents: 3900,
    mode: "subscription",
    interval: "month",
    monthlyCredits: 3,
    unlimitedTemplates: false,
    sectionAccess: "pro",
    templateAccess: "credits",
  },
  lifetime: {
    id: "lifetime",
    name: "Lifetime",
    amountCents: 49900,
    mode: "payment",
    monthlyCredits: null,
    unlimitedTemplates: true,
    sectionAccess: "pro",
    templateAccess: "all",
  },
};

/** Video skills membership — separate product from template plans (D16). */
export const VIDEO_PLANS: Record<VideoPlanId, VideoPlan> = {
  "video-monthly": {
    id: "video-monthly",
    name: "Video skills",
    amountCents: 999,
    mode: "subscription",
    interval: "month",
  },
  "video-yearly": {
    id: "video-yearly",
    name: "Video skills (yearly)",
    amountCents: 7999,
    mode: "subscription",
    interval: "year",
  },
};

export function isPlanId(value: unknown): value is PlanId {
  return typeof value === "string" && value in PLANS;
}

export function isVideoPlanId(value: unknown): value is VideoPlanId {
  return typeof value === "string" && value in VIDEO_PLANS;
}

export function planFromMetadata(plan: string | undefined): Plan | null {
  if (!plan || !isPlanId(plan)) return null;
  return PLANS[plan];
}

export function videoPlanFromMetadata(plan: string | undefined): VideoPlan | null {
  if (!plan || !isVideoPlanId(plan)) return null;
  return VIDEO_PLANS[plan];
}

export function monthlyCreditGrant(planId: PlanId): number | null {
  return PLANS[planId].monthlyCredits;
}

/** Path visitors return to after signing in so checkout resumes automatically. */
export function checkoutResumePath(plan: PlanId) {
  return `/pricing?checkout=${plan}`;
}

export function videoCheckoutResumePath(plan: VideoPlanId) {
  return `/pricing/videos?checkout=${plan}`;
}

/** Premium video demo styles (Rays is free). */
export const PREMIUM_VIDEO_STYLE_SLUGS = ["kiln", "organic", "small-details"] as const;
