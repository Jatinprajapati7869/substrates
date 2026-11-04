import { findProduct } from "@/lib/catalog";
import { PLANS, isPlanId, type PlanId } from "@/lib/plans";
import type { LemonSqueezyEnv } from "@/lib/env.server";
import { logBillingWarn } from "./lemonsqueezy-log.server";
import { planIdFromVariantId } from "./lemonsqueezy-shared.server";

export type PlanResolveResult =
  | { ok: true; plan: string }
  | {
      ok: false;
      reason:
        | "unknown_variant"
        | "plan_variant_mismatch"
        | "invalid_template"
        | "lifetime_amount_too_low";
    };

function variantPlanOrUnknown(
  variantId: string | null,
  env: Pick<
    LemonSqueezyEnv,
    | "LEMONSQUEEZY_VARIANT_ID_SECTIONS"
    | "LEMONSQUEEZY_VARIANT_ID_SECTIONS_TEMPLATES"
    | "LEMONSQUEEZY_VARIANT_ID_LIFETIME"
  >,
): PlanId | null | "unknown" {
  if (!variantId) return null;
  const mapped = planIdFromVariantId(variantId, env);
  return mapped ?? "unknown";
}

function assertVariantMatchesPlanMeta(
  planMeta: string,
  variantId: string | null,
  env: Pick<
    LemonSqueezyEnv,
    | "LEMONSQUEEZY_VARIANT_ID_SECTIONS"
    | "LEMONSQUEEZY_VARIANT_ID_SECTIONS_TEMPLATES"
    | "LEMONSQUEEZY_VARIANT_ID_LIFETIME"
  >,
): boolean {
  if (!variantId) return true;
  if (planMeta.startsWith("template:")) {
    return variantId === env.LEMONSQUEEZY_VARIANT_ID_LIFETIME;
  }
  if (!isPlanId(planMeta)) return false;
  const fromVariant = planIdFromVariantId(variantId, env);
  return fromVariant === planMeta;
}

export function resolveTemplatePlan(planMeta: string): PlanResolveResult {
  if (!planMeta.startsWith("template:")) {
    return { ok: false, reason: "invalid_template" };
  }
  const slug = planMeta.slice("template:".length);
  const product = findProduct("template", slug);
  if (!product || typeof product.priceUsd !== "number" || product.priceUsd <= 0) {
    return { ok: false, reason: "invalid_template" };
  }
  return { ok: true, plan: planMeta };
}

export function resolveOrderPlan(params: {
  planMeta?: string | undefined;
  variantId: string | null;
  amountCents: number | null;
  eventName: string;
  env: Pick<
    LemonSqueezyEnv,
    | "LEMONSQUEEZY_VARIANT_ID_SECTIONS"
    | "LEMONSQUEEZY_VARIANT_ID_SECTIONS_TEMPLATES"
    | "LEMONSQUEEZY_VARIANT_ID_LIFETIME"
  >;
}): PlanResolveResult {
  const { planMeta, variantId, amountCents, eventName, env } = params;
  const variantMapped = variantPlanOrUnknown(variantId, env);

  if (variantMapped === "unknown") {
    logBillingWarn("unknown_variant", { eventName, variantId: variantId ?? "none" });
    return { ok: false, reason: "unknown_variant" };
  }

  if (planMeta?.startsWith("template:")) {
    const template = resolveTemplatePlan(planMeta);
    if (!template.ok) return template;
    if (!assertVariantMatchesPlanMeta(planMeta, variantId, env)) {
      logBillingWarn("plan_variant_mismatch", {
        eventName,
        plan: "template",
        variantId: variantId ?? "none",
      });
      return { ok: false, reason: "plan_variant_mismatch" };
    }
    const slug = planMeta.slice("template:".length);
    const expected = Math.round((findProduct("template", slug)?.priceUsd ?? 0) * 100);
    if (expected <= 0 || (amountCents != null && amountCents < expected)) {
      logBillingWarn("template_amount_too_low", {
        eventName,
        amountCents: amountCents ?? 0,
        expected,
      });
      return { ok: false, reason: "lifetime_amount_too_low" };
    }
    return template;
  }

  if (planMeta && isPlanId(planMeta)) {
    if (!assertVariantMatchesPlanMeta(planMeta, variantId, env)) {
      logBillingWarn("plan_variant_mismatch", {
        eventName,
        plan: planMeta,
        variantId: variantId ?? "none",
      });
      return { ok: false, reason: "plan_variant_mismatch" };
    }
    return { ok: true, plan: planMeta };
  }

  if (variantMapped === "lifetime") {
    const paid = amountCents ?? 0;
    if (paid < PLANS.lifetime.amountCents) {
      logBillingWarn("lifetime_amount_too_low", { eventName, amountCents: paid });
      return { ok: false, reason: "lifetime_amount_too_low" };
    }
    return { ok: true, plan: "lifetime" };
  }

  if (variantMapped) return { ok: true, plan: variantMapped };

  return { ok: false, reason: "unknown_variant" };
}

export function resolveSubscriptionPlan(params: {
  planMeta?: string | undefined;
  variantId: string | null;
  eventName: string;
  env: Pick<
    LemonSqueezyEnv,
    | "LEMONSQUEEZY_VARIANT_ID_SECTIONS"
    | "LEMONSQUEEZY_VARIANT_ID_SECTIONS_TEMPLATES"
    | "LEMONSQUEEZY_VARIANT_ID_LIFETIME"
  >;
}): PlanResolveResult {
  const { planMeta, variantId, eventName, env } = params;
  const variantMapped = variantPlanOrUnknown(variantId, env);

  if (variantMapped === "unknown") {
    logBillingWarn("unknown_variant", { eventName, variantId: variantId ?? "none" });
    return { ok: false, reason: "unknown_variant" };
  }

  if (planMeta && isPlanId(planMeta)) {
    if (!assertVariantMatchesPlanMeta(planMeta, variantId, env)) {
      logBillingWarn("plan_variant_mismatch", {
        eventName,
        plan: planMeta,
        variantId: variantId ?? "none",
      });
      return { ok: false, reason: "plan_variant_mismatch" };
    }
    return { ok: true, plan: planMeta };
  }

  if (variantMapped) return { ok: true, plan: variantMapped };

  return { ok: false, reason: "unknown_variant" };
}
