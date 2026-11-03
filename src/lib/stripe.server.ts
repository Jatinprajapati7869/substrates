import { findProduct } from "./catalog";
import { PRODUCT_NAME } from "./brand";
import { getServerEnv } from "./env.server";
import { PLANS, type PlanId, isPlanId, VIDEO_PLANS, type VideoPlanId } from "./plans";
import type { StripeCheckoutSessionRecord } from "@/lib/purchases.server";

function key() {
  try {
    return getServerEnv("stripe").STRIPE_SECRET_KEY;
  } catch {
    throw new Error("Payments are not set up yet.");
  }
}

async function stripe(path: string, init: { method?: string; body?: URLSearchParams } = {}) {
  const res = await fetch(`https://api.stripe.com/v1/${path}`, {
    method: init.method ?? "GET",
    headers: {
      Authorization: `Bearer ${key()}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: init.body ?? null,
  });
  const json = (await res.json()) as Record<string, unknown>;
  if (!res.ok) {
    const stripeError = json["error"];
    const message =
      stripeError &&
      typeof stripeError === "object" &&
      stripeError !== null &&
      "message" in stripeError
        ? String((stripeError as { message: unknown }).message)
        : undefined;
    console.error("Stripe error", message);
    throw new Error("Payment provider error. Please try again.");
  }
  return json;
}

export function checkoutParams(
  plan: PlanId,
  userId: string,
  email: string | undefined,
  origin: string,
  stripeCustomerId?: string | null,
) {
  const p = PLANS[plan];
  const b = new URLSearchParams();
  b.set("mode", p.mode);
  b.set("success_url", `${origin}/checkout-success?session_id={CHECKOUT_SESSION_ID}`);
  b.set("cancel_url", `${origin}/pricing?checkout=cancelled`);
  b.set("client_reference_id", userId);
  b.set("metadata[user_id]", userId);
  b.set("metadata[plan]", plan);
  if (stripeCustomerId) b.set("customer", stripeCustomerId);
  else if (email) b.set("customer_email", email);
  b.set("line_items[0][quantity]", "1");
  b.set("line_items[0][price_data][currency]", "usd");
  b.set("line_items[0][price_data][unit_amount]", String(p.amountCents));
  b.set("line_items[0][price_data][product_data][name]", `${PRODUCT_NAME} — ${p.name}`);
  if (p.interval) {
    b.set("line_items[0][price_data][recurring][interval]", p.interval);
    b.set("subscription_data[metadata][user_id]", userId);
    b.set("subscription_data[metadata][plan]", plan);
  }
  return b;
}

export async function createCheckoutSession(
  plan: PlanId,
  userId: string,
  email: string | undefined,
  origin: string,
) {
  const { resolveStripeCustomerId } = await import("@/lib/purchases.server");
  const customerId = await resolveStripeCustomerId(userId);
  const s = await stripe("checkout/sessions", {
    method: "POST",
    body: checkoutParams(plan, userId, email, origin, customerId),
  });
  return s["url"] as string;
}

export function videoCheckoutParams(
  plan: VideoPlanId,
  userId: string,
  email: string | undefined,
  origin: string,
  stripeCustomerId?: string | null,
) {
  const p = VIDEO_PLANS[plan];
  const b = new URLSearchParams();
  b.set("mode", p.mode);
  b.set("success_url", `${origin}/checkout-success?session_id={CHECKOUT_SESSION_ID}`);
  b.set("cancel_url", `${origin}/pricing/videos?checkout=cancelled`);
  b.set("client_reference_id", userId);
  b.set("metadata[user_id]", userId);
  b.set("metadata[plan]", plan);
  if (stripeCustomerId) b.set("customer", stripeCustomerId);
  else if (email) b.set("customer_email", email);
  b.set("line_items[0][quantity]", "1");
  b.set("line_items[0][price_data][currency]", "usd");
  b.set("line_items[0][price_data][unit_amount]", String(p.amountCents));
  b.set("line_items[0][price_data][product_data][name]", `${PRODUCT_NAME} — ${p.name}`);
  b.set("line_items[0][price_data][recurring][interval]", p.interval);
  b.set("subscription_data[metadata][user_id]", userId);
  b.set("subscription_data[metadata][plan]", plan);
  return b;
}

export async function createVideoCheckoutSession(
  plan: VideoPlanId,
  userId: string,
  email: string | undefined,
  origin: string,
) {
  const { resolveStripeCustomerId } = await import("@/lib/purchases.server");
  const customerId = await resolveStripeCustomerId(userId);
  const s = await stripe("checkout/sessions", {
    method: "POST",
    body: videoCheckoutParams(plan, userId, email, origin, customerId),
  });
  return s["url"] as string;
}

/** One-time purchase of a single paid template, priced from the catalog. */
export function templateCheckoutParams(
  slug: string,
  userId: string,
  email: string | undefined,
  origin: string,
  stripeCustomerId?: string | null,
) {
  const product = findProduct("template", slug);
  if (!product || typeof product.priceUsd !== "number" || product.priceUsd <= 0)
    throw new Error("This template can't be bought individually.");
  const b = new URLSearchParams();
  b.set("mode", "payment");
  b.set("success_url", `${origin}/checkout-success?session_id={CHECKOUT_SESSION_ID}`);
  b.set("cancel_url", `${origin}/templates/${encodeURIComponent(slug)}`);
  b.set("client_reference_id", userId);
  b.set("metadata[user_id]", userId);
  b.set("metadata[plan]", `template:${slug}`);
  if (stripeCustomerId) b.set("customer", stripeCustomerId);
  else if (email) b.set("customer_email", email);
  b.set("line_items[0][quantity]", "1");
  b.set("line_items[0][price_data][currency]", "usd");
  b.set("line_items[0][price_data][unit_amount]", String(Math.round(product.priceUsd * 100)));
  b.set(
    "line_items[0][price_data][product_data][name]",
    `${PRODUCT_NAME} — ${product.name} template`,
  );
  return b;
}

export async function createTemplateCheckoutSession(
  slug: string,
  userId: string,
  email: string | undefined,
  origin: string,
) {
  const { resolveStripeCustomerId } = await import("@/lib/purchases.server");
  const customerId = await resolveStripeCustomerId(userId);
  const s = await stripe("checkout/sessions", {
    method: "POST",
    body: templateCheckoutParams(slug, userId, email, origin, customerId),
  });
  return s["url"] as string;
}

export async function getCheckoutSession(id: string): Promise<StripeCheckoutSessionRecord> {
  return (await stripe(
    `checkout/sessions/${encodeURIComponent(id)}`,
  )) as StripeCheckoutSessionRecord;
}

export async function createBillingPortalSession(customerId: string, returnUrl: string) {
  const b = new URLSearchParams();
  b.set("customer", customerId);
  b.set("return_url", returnUrl);
  const s = await stripe("billing_portal/sessions", { method: "POST", body: b });
  return s["url"] as string;
}

/** Records a completed session. Only call with a session fetched from Stripe or a verified webhook. */
export async function recordSession(s: StripeCheckoutSessionRecord) {
  const userId = s.metadata?.user_id;
  const plan = s.metadata?.plan;
  const { isCheckoutSessionPaid } = await import("@/lib/purchases.server");
  if (!userId || !plan || !isCheckoutSessionPaid(s)) return false;
  const { upsertPurchaseFromStripeSession } = await import("@/lib/purchases.server");
  try {
    const ok = await upsertPurchaseFromStripeSession(s);
    if (ok && isPlanId(plan) && plan === "lifetime") {
      const { applyLifetimeEntitlementFromCheckout } = await import("@/lib/entitlements.server");
      await applyLifetimeEntitlementFromCheckout(
        userId,
        typeof s.customer === "string" ? s.customer : null,
        typeof s.subscription === "string" ? s.subscription : null,
      );
    }
    return ok;
  } catch (e) {
    console.error("purchase record failed", e instanceof Error ? e.message : e);
    return false;
  }
}

export type StripeWebhookResult = { status: number; body: string };

async function hmacHex(secret: string, payload: string) {
  const k = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", k, new TextEncoder().encode(payload));
  return [...new Uint8Array(sig)].map((x) => x.toString(16).padStart(2, "0")).join("");
}

export async function verifyStripeSignature(
  body: string,
  header: string | null,
  secret: string,
  toleranceSec = 300,
  nowSec = Math.floor(Date.now() / 1000),
) {
  if (!header) return false;
  const parts = Object.fromEntries(header.split(",").map((p) => p.split("=") as [string, string]));
  const t = Number(parts["t"]);
  const v1s = header
    .split(",")
    .filter((p) => p.startsWith("v1="))
    .map((p) => p.slice(3));
  if (!t || !v1s.length || Math.abs(nowSec - t) > toleranceSec) return false;
  const expected = await hmacHex(secret, `${t}.${body}`);
  return v1s.some((v) => v.length === expected.length && [...v].every((c, i) => c === expected[i]));
}
