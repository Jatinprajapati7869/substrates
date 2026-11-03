export type PlanId = "sections" | "sections-templates" | "lifetime";

export type Plan = {
  id: PlanId;
  name: string;
  amountCents: number;
  mode: "subscription" | "payment";
  interval?: "month";
};

export const PLANS: Record<PlanId, Plan> = {
  sections: { id: "sections", name: "Sections", amountCents: 1500, mode: "subscription", interval: "month" },
  "sections-templates": { id: "sections-templates", name: "Sections + Templates", amountCents: 3900, mode: "subscription", interval: "month" },
  lifetime: { id: "lifetime", name: "Lifetime", amountCents: 49900, mode: "payment" },
};

export function isPlanId(value: unknown): value is PlanId {
  return typeof value === "string" && value in PLANS;
}

/** Path visitors return to after signing in so checkout resumes automatically. */
export function checkoutResumePath(plan: PlanId) {
  return `/pricing?checkout=${plan}`;
}
