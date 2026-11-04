import { timingSafeEqual } from "node:crypto";
import { findProduct } from "@/lib/catalog";
import { SITE_ORIGIN } from "@/lib/brand";
import { getServerEnv, type LemonSqueezyEnv } from "@/lib/env.server";
import { PLANS, isPlanId, isVideoPlanId, type PlanId } from "@/lib/plans";
import type {
  BillingCheckoutPayload,
  BillingEvent,
  BillingProvider,
  BillingWebhookVerifyResult,
  CreateCheckoutInput,
} from "./types";

type LemonMeta = {
  event_name?: string;
  custom_data?: Record<string, unknown>;
};

type LemonData = {
  type?: string;
  id?: string;
  attributes?: Record<string, unknown>;
};

type LemonWebhook = {
  meta?: LemonMeta;
  data?: LemonData;
};

export function lemonSqueezyTestModeFromEnv(raw: string | undefined): boolean {
  if (!raw) return false;
  const v = raw.trim().toLowerCase();
  return v === "true" || v === "1" || v === "yes";
}

export function planIdFromVariantId(
  variantId: string,
  env: Pick<
    LemonSqueezyEnv,
    | "LEMONSQUEEZY_VARIANT_ID_SECTIONS"
    | "LEMONSQUEEZY_VARIANT_ID_SECTIONS_TEMPLATES"
    | "LEMONSQUEEZY_VARIANT_ID_LIFETIME"
  >,
): PlanId | null {
  if (variantId === env.LEMONSQUEEZY_VARIANT_ID_SECTIONS) return "sections";
  if (variantId === env.LEMONSQUEEZY_VARIANT_ID_SECTIONS_TEMPLATES) return "sections-templates";
  if (variantId === env.LEMONSQUEEZY_VARIANT_ID_LIFETIME) return "lifetime";
  return null;
}

export function variantIdForPlan(plan: PlanId, env: LemonSqueezyEnv): string {
  switch (plan) {
    case "sections":
      return env.LEMONSQUEEZY_VARIANT_ID_SECTIONS;
    case "sections-templates":
      return env.LEMONSQUEEZY_VARIANT_ID_SECTIONS_TEMPLATES;
    case "lifetime":
      return env.LEMONSQUEEZY_VARIANT_ID_LIFETIME;
    default: {
      const _never: never = plan;
      throw new Error(String(_never));
    }
  }
}

function customData(payload: LemonWebhook): { userId?: string; plan?: string } {
  const raw = payload.meta?.custom_data ?? {};
  const userId = raw["user_id"];
  const plan = raw["plan"];
  return {
    ...(typeof userId === "string" && userId ? { userId } : {}),
    ...(typeof plan === "string" && plan ? { plan } : {}),
  };
}

function attrString(attrs: Record<string, unknown> | undefined, key: string): string | null {
  const v = attrs?.[key];
  return typeof v === "string" && v ? v : null;
}

function attrCustomerId(attrs: Record<string, unknown> | undefined): string | null {
  const c = attrs?.["customer_id"];
  if (typeof c === "number") return String(c);
  return attrString(attrs, "customer_id");
}

function attrNumber(attrs: Record<string, unknown> | undefined, key: string): number | null {
  const v = attrs?.[key];
  return typeof v === "number" ? v : null;
}

export function isoToUnixSeconds(iso: string | null | undefined): number | undefined {
  if (!iso) return undefined;
  const ms = Date.parse(iso);
  if (Number.isNaN(ms)) return undefined;
  return Math.floor(ms / 1000);
}

function portalFromAttrs(attrs: Record<string, unknown> | undefined): string | null {
  const urls = attrs?.["urls"];
  if (!urls || typeof urls !== "object") return null;
  const portal = (urls as { customer_portal?: unknown }).customer_portal;
  return typeof portal === "string" && portal ? portal : null;
}

export function lemonSqueezyEventKey(eventName: string, dataType: string, dataId: string): string {
  return `${eventName}:${dataType}:${dataId}`;
}

async function hmacSha256Hex(secret: string, payload: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(payload));
  return [...new Uint8Array(sig)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

export async function verifyLemonSqueezySignature(
  rawBody: string,
  signatureHeader: string | null,
  secret: string,
): Promise<boolean> {
  if (!signatureHeader) return false;
  const expected = await hmacSha256Hex(secret, rawBody);
  const a = Buffer.from(expected, "utf8");
  const b = Buffer.from(signatureHeader.trim(), "utf8");
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

function optionalFields(fields: Record<string, unknown>): Partial<BillingEvent> {
  const out: Partial<BillingEvent> = {};
  for (const [key, value] of Object.entries(fields)) {
    if (value !== undefined) (out as Record<string, unknown>)[key] = value;
  }
  return out;
}

export function mapLemonSqueezyWebhookToEvents(
  payload: LemonWebhook,
  env: Pick<
    LemonSqueezyEnv,
    | "LEMONSQUEEZY_VARIANT_ID_SECTIONS"
    | "LEMONSQUEEZY_VARIANT_ID_SECTIONS_TEMPLATES"
    | "LEMONSQUEEZY_VARIANT_ID_LIFETIME"
  >,
): BillingEvent[] {
  const eventName = payload.meta?.event_name;
  const data = payload.data;
  if (!eventName || !data?.type || !data.id) return [];

  const eventKey = lemonSqueezyEventKey(eventName, data.type, data.id);
  const attrs = data.attributes ?? {};
  const { userId, plan: planMeta } = customData(payload);
  const customerId = attrCustomerId(attrs);
  const subscriptionId =
    data.type === "subscriptions"
      ? data.id
      : (attrString(attrs, "subscription_id") ??
        (typeof attrs["subscription_id"] === "number" ? String(attrs["subscription_id"]) : null));

  switch (eventName) {
    case "order_created": {
      if (attrs["status"] !== "paid") return [];
      const first = attrs["first_order_item"] as { variant_id?: number } | undefined;
      const variantId = first?.variant_id != null ? String(first.variant_id) : null;
      let plan = planMeta;
      if (!plan && variantId) {
        const mapped = planIdFromVariantId(variantId, env);
        if (mapped) plan = mapped;
      }
      if (!userId || !plan) return [];
      const checkoutPayload: BillingCheckoutPayload = {
        checkoutId: data.id,
        userId,
        plan,
        customerId,
        subscriptionId: null,
        amountCents: attrNumber(attrs, "total_usd"),
        currency: "usd",
        paid: true,
      };
      return [
        {
          type: "checkout_completed",
          eventKey,
          ...optionalFields({ userId, plan, customerId, checkoutPayload: checkoutPayload }),
        },
      ];
    }
    case "subscription_created":
    case "subscription_payment_success":
    case "subscription_payment_recovered": {
      if (eventName === "subscription_payment_recovered") return [];
      let plan = planMeta;
      const variantId = attrNumber(attrs, "variant_id");
      if (!plan && variantId != null) {
        const mapped = planIdFromVariantId(String(variantId), env);
        if (mapped) plan = mapped;
      }
      const periodEnd =
        isoToUnixSeconds(attrString(attrs, "renews_at")) ??
        isoToUnixSeconds(attrString(attrs, "updated_at"));
      const periodStart =
        isoToUnixSeconds(attrString(attrs, "created_at")) ??
        isoToUnixSeconds(attrString(attrs, "updated_at"));
      if (!userId || !plan || periodStart == null || periodEnd == null) return [];
      return [
        {
          type: "subscription_cycle_paid",
          eventKey,
          ...optionalFields({
            userId,
            plan,
            periodStart,
            periodEnd,
            customerId,
            subscriptionId,
            portalUrl: portalFromAttrs(attrs),
            amountCents: attrNumber(attrs, "total_usd") ?? undefined,
            currency: attrString(attrs, "currency") ?? "usd",
          }),
        },
      ];
    }
    case "subscription_updated": {
      const portalUrl = portalFromAttrs(attrs);
      if (!portalUrl) return [];
      return [
        {
          type: "portal_url_updated",
          eventKey,
          ...optionalFields({ userId, customerId, portalUrl }),
        },
      ];
    }
    case "subscription_cancelled":
    case "subscription_expired": {
      return [
        {
          type: "subscription_canceled",
          eventKey,
          ...optionalFields({ userId, plan: planMeta, customerId, status: "canceled" }),
        },
      ];
    }
    case "subscription_payment_failed": {
      return [
        {
          type: "subscription_past_due",
          eventKey,
          ...optionalFields({ userId, plan: planMeta, customerId, status: "past_due" }),
        },
      ];
    }
    case "order_refunded":
    case "subscription_payment_refunded": {
      return [
        {
          type: "refunded",
          eventKey,
          ...optionalFields({ userId, plan: planMeta, customerId }),
        },
      ];
    }
    default:
      return [];
  }
}

export function buildLemonSqueezyCheckoutBody(
  input: CreateCheckoutInput,
  env: LemonSqueezyEnv,
  origin: string,
) {
  const { plan, userId, email } = input;
  if (isVideoPlanId(plan)) throw new Error("Video checkout is not available yet.");

  let variantId: string;
  let customPrice: number | undefined;
  let planForCustom = plan;

  if (typeof plan === "string" && plan.startsWith("template:")) {
    const slug = plan.slice("template:".length);
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
  const attributes: Record<string, unknown> = {
    checkout_data: {
      email: email ?? "",
      custom: { user_id: userId, plan: planForCustom },
    },
    product_options: {
      redirect_url: `${origin}/checkout-success?plan=${redirectPlan}`,
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

async function lemonSqueezyFetch(path: string, init: RequestInit, apiKey: string) {
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
    console.error("Lemon Squeezy API error", json);
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

async function createLemonCheckout(input: CreateCheckoutInput): Promise<string> {
  const env = lemonsqueezyEnv();
  const origin = input.origin || SITE_ORIGIN;
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

async function verifyLemonWebhook(
  rawBody: string,
  signatureHeader: string | null,
  webhookSecret: string,
): Promise<BillingWebhookVerifyResult> {
  if (!(await verifyLemonSqueezySignature(rawBody, signatureHeader, webhookSecret))) {
    return { ok: false, status: 400, body: "Invalid signature" };
  }
  let payload: LemonWebhook;
  try {
    payload = JSON.parse(rawBody) as LemonWebhook;
  } catch {
    return { ok: false, status: 400, body: "Invalid JSON" };
  }
  const eventName = payload.meta?.event_name;
  const data = payload.data;
  if (!eventName || !data?.type || !data.id) {
    return { ok: false, status: 400, body: "Missing event metadata" };
  }
  const env = lemonsqueezyEnv();
  const events = mapLemonSqueezyWebhookToEvents(payload, env);
  return {
    ok: true,
    idempotencyKey: lemonSqueezyEventKey(eventName, data.type, data.id),
    events,
  };
}

export const lemonSqueezyBillingProvider: BillingProvider = {
  createCheckout: createLemonCheckout,
  verifyAndParseWebhook: verifyLemonWebhook,
  getPortalUrl: async () => {
    throw new Error("Use stored providerCustomerPortalUrl on entitlements.");
  },
};

export function getDefaultBillingProvider(): BillingProvider {
  return lemonSqueezyBillingProvider;
}
