import { timingSafeEqual } from "node:crypto";
import type { PlanId, VideoPlanId } from "@/lib/plans";
import type { LemonSqueezyEnv } from "@/lib/env.server";

export type LemonMeta = {
  event_name?: string;
  test_mode?: boolean;
  custom_data?: Record<string, unknown>;
};

export type LemonData = {
  type?: string;
  id?: string;
  attributes?: Record<string, unknown>;
};

export type LemonWebhook = {
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

export function videoPlanIdFromVariantId(
  variantId: string,
  env: Pick<
    LemonSqueezyEnv,
    "LEMONSQUEEZY_VARIANT_ID_VIDEO_MONTHLY" | "LEMONSQUEEZY_VARIANT_ID_VIDEO_YEARLY"
  >,
): VideoPlanId | null {
  if (!env.LEMONSQUEEZY_VARIANT_ID_VIDEO_MONTHLY || !env.LEMONSQUEEZY_VARIANT_ID_VIDEO_YEARLY)
    return null;
  if (variantId === env.LEMONSQUEEZY_VARIANT_ID_VIDEO_MONTHLY) return "video-monthly";
  if (variantId === env.LEMONSQUEEZY_VARIANT_ID_VIDEO_YEARLY) return "video-yearly";
  return null;
}

export function variantIdForVideoPlan(plan: VideoPlanId, env: LemonSqueezyEnv): string {
  if (plan === "video-monthly") {
    const id = env.LEMONSQUEEZY_VARIANT_ID_VIDEO_MONTHLY;
    if (!id) throw new Error("Video checkout is not available yet.");
    return id;
  }
  const id = env.LEMONSQUEEZY_VARIANT_ID_VIDEO_YEARLY;
  if (!id) throw new Error("Video checkout is not available yet.");
  return id;
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

export function customData(payload: LemonWebhook): { userId?: string; plan?: string } {
  const raw = payload.meta?.custom_data ?? {};
  const userId = raw["user_id"];
  const plan = raw["plan"];
  return {
    ...(typeof userId === "string" && userId ? { userId } : {}),
    ...(typeof plan === "string" && plan ? { plan } : {}),
  };
}

export function attrString(attrs: Record<string, unknown> | undefined, key: string): string | null {
  const v = attrs?.[key];
  return typeof v === "string" && v ? v : null;
}

export function attrCustomerId(attrs: Record<string, unknown> | undefined): string | null {
  const c = attrs?.["customer_id"];
  if (typeof c === "number") return String(c);
  return attrString(attrs, "customer_id");
}

export function attrNumber(attrs: Record<string, unknown> | undefined, key: string): number | null {
  const v = attrs?.[key];
  return typeof v === "number" ? v : null;
}

export function isoToUnixSeconds(iso: string | null | undefined): number | undefined {
  if (!iso) return undefined;
  const ms = Date.parse(iso);
  if (Number.isNaN(ms)) return undefined;
  return Math.floor(ms / 1000);
}

export function portalFromAttrs(attrs: Record<string, unknown> | undefined): string | null {
  const urls = attrs?.["urls"];
  if (!urls || typeof urls !== "object") return null;
  const portal = (urls as { customer_portal?: unknown }).customer_portal;
  return typeof portal === "string" && portal ? portal : null;
}

export function lemonSqueezyEventKey(eventName: string, dataType: string, dataId: string): string {
  return `${eventName}:${dataType}:${dataId}`;
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

export function orderVariantId(attrs: Record<string, unknown>): string | null {
  const first = attrs["first_order_item"] as { variant_id?: number } | undefined;
  if (first?.variant_id != null) return String(first.variant_id);
  return null;
}

export function subscriptionVariantId(attrs: Record<string, unknown>): string | null {
  const v = attrNumber(attrs, "variant_id");
  return v != null ? String(v) : null;
}

export function pricingCheckoutCancelledUrl(origin: string): string {
  return `${origin.replace(/\/$/, "")}/pricing?checkout=cancelled`;
}

export function videoPricingCheckoutCancelledUrl(origin: string): string {
  return `${origin.replace(/\/$/, "")}/pricing/videos?checkout=cancelled`;
}
