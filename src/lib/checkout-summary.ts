import { catalog, type Product } from "./catalog";
import { PLANS, type PlanId } from "./plans";

export type CheckoutPreviewItem = {
  slug: string;
  name: string;
  image: string;
  kind: Product["kind"];
};

export const CHECKOUT_REFUND_LINE = "Full refund within 14 days, no questions asked.";

export const CHECKOUT_PLAN_INCLUDES: Record<PlanId, readonly string[]> = {
  sections: [
    "Every Pro section, plus new ones as they land",
    "1 template credit every paid month",
    "1 credit unlocks a design and all its formats, permanently",
    "Keep everything you unlock, even after cancelling",
    CHECKOUT_REFUND_LINE,
  ],
  "sections-templates": [
    "Everything in Sections, plus 3 template credits every paid month",
    "Choose from Webflow and Framer",
    "1 credit unlocks a design and all its formats, permanently",
    "Keep everything you unlock, even after cancelling",
    CHECKOUT_REFUND_LINE,
  ],
  lifetime: [
    "Every template in the catalog, unlocked",
    "Every Pro section, now and in future",
    "All future templates as they are added",
    "No credits, no renewal, no expiry",
    CHECKOUT_REFUND_LINE,
  ],
};

export function formatPlanPrice(planId: PlanId): string {
  const plan = PLANS[planId];
  const dollars = plan.amountCents / 100;
  if (plan.mode === "subscription") {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(dollars);
  }
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(dollars);
}

export function planBillingLabel(planId: PlanId): string {
  const plan = PLANS[planId];
  if (plan.mode === "subscription") return "per month";
  return "one-time";
}

function sortCatalogProducts(list: Product[]): Product[] {
  return [...list].sort((a, b) => {
    if (Boolean(a.featured) !== Boolean(b.featured)) return a.featured ? -1 : 1;
    return a.slug.localeCompare(b.slug);
  });
}

/** Picks 3–6 catalog preview images for the checkout summary (catalog `image` only). */
export function checkoutPreviewItems(
  planId: PlanId,
  products: Product[] = catalog,
): CheckoutPreviewItem[] {
  const withImage = products.filter((p) => typeof p.image === "string" && p.image.length > 0);
  const templates = sortCatalogProducts(withImage.filter((p) => p.kind === "template"));
  const proSections = sortCatalogProducts(
    withImage.filter((p) => p.kind === "section" && p.tier === "pro"),
  );

  let ordered: Product[] = [];
  if (planId === "sections") {
    ordered = [...proSections.slice(0, 4), ...templates.slice(0, 2)];
  } else if (planId === "sections-templates") {
    ordered = [...templates.slice(0, 4), ...proSections.slice(0, 2)];
  } else {
    ordered = [...templates.slice(0, 5), ...proSections.slice(0, 2)];
  }

  if (ordered.length < 3) {
    ordered = sortCatalogProducts(withImage);
  }

  const seen = new Set<string>();
  const unique: Product[] = [];
  for (const p of ordered) {
    if (seen.has(p.slug)) continue;
    seen.add(p.slug);
    unique.push(p);
    if (unique.length >= 6) break;
  }

  const slice = unique.slice(0, Math.min(6, Math.max(3, unique.length)));
  return slice.map((p) => ({
    slug: p.slug,
    name: p.name,
    image: p.image,
    kind: p.kind,
  }));
}

export function checkoutSummaryForPlan(planId: PlanId) {
  const plan = PLANS[planId];
  return {
    planId,
    planName: plan.name,
    priceLabel: formatPlanPrice(planId),
    billingLabel: planBillingLabel(planId),
    includes: CHECKOUT_PLAN_INCLUDES[planId],
    previews: checkoutPreviewItems(planId),
  };
}

export function checkoutSuccessPrimaryAction(planId: PlanId): {
  to: "/sections" | "/templates";
  label: string;
} {
  if (planId === "sections") {
    return { to: "/sections", label: "Browse Pro sections" };
  }
  return { to: "/templates", label: "Browse templates to unlock" };
}

export type EntitlementPollSnapshot = {
  active: boolean;
  plan: string | null;
  videoSkillsActive?: boolean;
  videoSkillsPlan?: string | null;
};

export async function pollEntitlementActive(
  fetchSnapshot: () => Promise<EntitlementPollSnapshot>,
  expectedPlan: string,
  options: { intervalMs: number; timeoutMs: number; sleep?: (ms: number) => Promise<void> },
): Promise<"confirmed" | "timeout"> {
  const sleep = options.sleep ?? ((ms: number) => new Promise((r) => setTimeout(r, ms)));
  const deadline = Date.now() + options.timeoutMs;
  while (Date.now() < deadline) {
    const snap = await fetchSnapshot();
    if (snap.active && snap.plan === expectedPlan) return "confirmed";
    await sleep(options.intervalMs);
  }
  return "timeout";
}

export async function pollVideoSkillsActive(
  fetchSnapshot: () => Promise<EntitlementPollSnapshot>,
  expectedPlan: string,
  options: { intervalMs: number; timeoutMs: number; sleep?: (ms: number) => Promise<void> },
): Promise<"confirmed" | "timeout"> {
  const sleep = options.sleep ?? ((ms: number) => new Promise((r) => setTimeout(r, ms)));
  const deadline = Date.now() + options.timeoutMs;
  while (Date.now() < deadline) {
    const snap = await fetchSnapshot();
    if (snap.videoSkillsActive && snap.videoSkillsPlan === expectedPlan) return "confirmed";
    await sleep(options.intervalMs);
  }
  return "timeout";
}
