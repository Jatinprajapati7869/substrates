import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { z } from "zod";
import { requireFirebaseAuth } from "@/integrations/firebase/auth-middleware";
import { trustedCheckoutOrigin } from "@/lib/checkout-origin.server";
import { createBillingPortalUrl } from "@/lib/billing-portal.server";
import { getDefaultBillingProvider } from "@/lib/billing/lemonsqueezy-provider";
import { isVideoSkillsCheckoutConfigured } from "@/lib/env.server";
import { listPurchasesForUser } from "@/lib/purchases.server";
import { getEntitlement, hasVideoSkillsAccess } from "./entitlements.server";
import { isPlanId, isVideoPlanId, type VideoPlanId } from "./plans";

export const getVideoCheckoutAvailability = createServerFn({ method: "GET" }).handler(async () => ({
  available: isVideoSkillsCheckoutConfigured(),
}));

export const startVideoCheckout = createServerFn({ method: "POST" })
  .middleware([requireFirebaseAuth])
  .inputValidator((d) => z.object({ plan: z.string().refine(isVideoPlanId) }).parse(d))
  .handler(async ({ data, context }) => {
    if (!isVideoSkillsCheckoutConfigured()) {
      return {
        url: null as string | null,
        error: "Video membership checkout is not available yet.",
      };
    }
    const origin = trustedCheckoutOrigin(getRequest());
    const email = context.email ?? undefined;
    try {
      const url = await getDefaultBillingProvider().createCheckout({
        plan: data.plan as VideoPlanId,
        userId: context.userId,
        ...(email ? { email } : {}),
        origin,
      });
      return { url, error: null as string | null };
    } catch (e) {
      return { url: null, error: e instanceof Error ? e.message : "Checkout failed." };
    }
  });

export const startCheckout = createServerFn({ method: "POST" })
  .middleware([requireFirebaseAuth])
  .inputValidator((d) => z.object({ plan: z.string().refine(isPlanId) }).parse(d))
  .handler(async ({ data, context }) => {
    const origin = trustedCheckoutOrigin(getRequest());
    const email = context.email ?? undefined;
    try {
      const url = await getDefaultBillingProvider().createCheckout({
        plan: data.plan as never,
        userId: context.userId,
        ...(email ? { email } : {}),
        origin,
      });
      return { url, error: null as string | null };
    } catch (e) {
      return { url: null, error: e instanceof Error ? e.message : "Checkout failed." };
    }
  });

export const startTemplateCheckout = createServerFn({ method: "POST" })
  .middleware([requireFirebaseAuth])
  .inputValidator((d) => z.object({ slug: z.string().min(1).max(120) }).parse(d))
  .handler(async ({ data, context }) => {
    const origin = trustedCheckoutOrigin(getRequest());
    const email = context.email ?? undefined;
    try {
      const url = await getDefaultBillingProvider().createCheckout({
        plan: `template:${data.slug}`,
        userId: context.userId,
        ...(email ? { email } : {}),
        origin,
      });
      return { url, error: null as string | null };
    } catch (e) {
      const msg = e instanceof Error ? e.message : "";
      return {
        url: null,
        error:
          msg === "Payments are not set up yet."
            ? "Checkout isn't available yet — payments are still being set up."
            : msg || "Checkout failed.",
      };
    }
  });

export const confirmCheckout = createServerFn({ method: "POST" })
  .middleware([requireFirebaseAuth])
  .inputValidator((d) => z.object({ plan: z.string().min(1).max(120) }).parse(d))
  .handler(async ({ data }) => {
    const plan = data.plan;
    if (plan.startsWith("template:") || isPlanId(plan) || isVideoPlanId(plan)) {
      return { ok: true, plan };
    }
    return { ok: false, plan: null };
  });

export const getMyEntitlement = createServerFn({ method: "GET" })
  .middleware([requireFirebaseAuth])
  .handler(async ({ context }) => {
    const ent = await getEntitlement(context.userId);
    if (!ent)
      return {
        active: false as const,
        plan: null as string | null,
        status: null as string | null,
        videoSkillsActive: false as const,
        videoSkillsPlan: null as string | null,
      };
    return {
      active: ent.status === "active",
      plan: ent.plan,
      status: ent.status,
      videoSkillsActive: hasVideoSkillsAccess(ent),
      videoSkillsPlan: ent.videoSkillsPlan ?? null,
    };
  });

export const myPurchases = createServerFn({ method: "GET" })
  .middleware([requireFirebaseAuth])
  .handler(async ({ context }) => listPurchasesForUser(context.userId));

export const openBillingPortal = createServerFn({ method: "POST" })
  .middleware([requireFirebaseAuth])
  .handler(async ({ context }) => {
    try {
      return await createBillingPortalUrl(context.userId);
    } catch (e) {
      return { url: null, error: e instanceof Error ? e.message : "Billing portal unavailable." };
    }
  });
