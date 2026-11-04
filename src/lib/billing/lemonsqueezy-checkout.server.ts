import { findProduct } from "@/lib/catalog";
import { isDeliverable } from "@/lib/content-manifest";
import {
  getServerEnv,
  isVideoSkillsCheckoutConfigured,
  type LemonSqueezyEnv,
} from "@/lib/env.server";
import { PLANS, isPlanId, isVideoPlanId } from "@/lib/plans";
import type { CreateCheckoutInput } from "./types";
import { logBillingWarn } from "./lemonsqueezy-log.server";
import {
  lemonSqueezyTestModeFromEnv,
  pricingCheckoutCancelledUrl,
  variantIdForPlan,
  variantIdForVideoPlan,
  videoPricingCheckoutCancelledUrl,
} from "./lemonsqueezy-shared.server";

export function buildLemonSqueezyCheckoutBody(
  input: CreateCheckoutInput,
  env: LemonSqueezyEnv,
  origin: string,
) {
  const { plan, userId, email } = input;

  let variantId: string;
  let customPrice: number | undefined;
  let planForCustom = plan;
  let cancelUrl = pricingCheckoutCancelledUrl(origin);

  if (isVideoPlanId(plan)) {
    if (!isVideoSkillsCheckoutConfigured()) throw new Error("Video checkout is not available yet.");
    variantId = variantIdForVideoPlan(plan, env);
    cancelUrl = videoPricingCheckoutCancelledUrl(origin);
  } else if (typeof plan === "string" && plan.startsWith("template:")) {
    const slug = plan.slice("template:".length);
    if (!isDeliverable(slug)) throw new Error("This template is not available yet.");
    const product = findProduct("template", slug);
    if (!product || typeof product.priceUsd !== "number" || product.priceUsd <= 0)
      throw new Error("This template can't be bought individually.");
    variantId = env.LEMONSQUEEZY_VARIANT_ID_LIFETIME;
    customPrice = Math.round(product.priceUsd * 100);
    planForCustom = plan;
  } else if (isPlanId(plan)) {
    variantId = variantIdForPlan(plan, env);
  } else {
    throw new Error("Unknown plan.");
  }

  const redirectPlan = encodeURIComponent(planForCustom);
  const successOrigin = origin.replace(/\/$/, "");
  const attributes: Record<string, unknown> = {
    checkout_data: {
      email: email ?? "",
      custom: { user_id: userId, plan: planForCustom },
    },
    product_options: {
      redirect_url: `${successOrigin}/checkout-success?plan=${redirectPlan}`,
      receipt_link_url: cancelUrl,
      receipt_button_text: "Return to pricing",
    },
    test_mode: lemonSqueezyTestModeFromEnv(env.LEMONSQUEEZY_TEST_MODE),
  };
  if (customPrice != null) attributes["custom_price"] = customPrice;

  return {
    data: {
      type: "checkouts",
      attributes,
      relationships: {
        store: { data: { type: "stores", id: env.LEMONSQUEEZY_STORE_ID } },
        variant: { data: { type: "variants", id: variantId } },
      },
    },
  };
}

export type LemonApiErrorLog = { status: number; code: string | null };

export function logLemonSqueezyApiError(
  status: number,
  json: Record<string, unknown>,
): LemonApiErrorLog {
  const errors = json["errors"];
  let code: string | null = null;
  if (Array.isArray(errors) && errors[0] && typeof errors[0] === "object") {
    const first = errors[0] as { status?: string; title?: string };
    code = first.status ?? first.title ?? null;
  }
  logBillingWarn("lemonsqueezy_api_error", { status, code: code ?? "unknown" });
  return { status, code };
}

export async function lemonSqueezyFetch(path: string, init: RequestInit, apiKey: string) {
  const res = await fetch(`https://api.lemonsqueezy.com/v1/${path}`, {
    ...init,
    headers: {
      Accept: "application/vnd.api+json",
      "Content-Type": "application/vnd.api+json",
      Authorization: `Bearer ${apiKey}`,
      ...(init.headers ?? {}),
    },
  });
  const json = (await res.json()) as Record<string, unknown>;
  if (!res.ok) {
    logLemonSqueezyApiError(res.status, json);
    throw new Error("Payment provider error. Please try again.");
  }
  return json;
}

function lemonsqueezyEnv(): LemonSqueezyEnv {
  try {
    return getServerEnv("lemonsqueezy");
  } catch {
    throw new Error("Payments are not set up yet.");
  }
}

export async function createLemonCheckout(input: CreateCheckoutInput): Promise<string> {
  const env = lemonsqueezyEnv();
  const origin = input.origin.replace(/\/$/, "") || input.origin;
  const body = buildLemonSqueezyCheckoutBody(input, env, origin);
  const json = await lemonSqueezyFetch(
    "checkouts",
    { method: "POST", body: JSON.stringify(body) },
    env.LEMONSQUEEZY_API_KEY,
  );
  const data = json["data"] as { attributes?: { url?: string } } | undefined;
  const url = data?.attributes?.url;
  if (!url) throw new Error("Payment provider error. Please try again.");
  return url;
}

export function templateCheckoutPriceCents(slug: string): number {
  const product = findProduct("template", slug);
  if (!product || typeof product.priceUsd !== "number") throw new Error("missing product");
  return Math.round(product.priceUsd * 100);
}

export function lifetimeMinimumCents(): number {
  return PLANS.lifetime.amountCents;
}
