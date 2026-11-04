import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { z } from "zod";
import { requireFirebaseAuth } from "@/integrations/firebase/auth-middleware";
import { trustedCheckoutOrigin } from "@/lib/checkout-origin.server";
import { createBillingPortalUrl } from "@/lib/billing-portal.server";
import { listPurchasesForUser } from "@/lib/purchases.server";
import { getEntitlement, hasVideoSkillsAccess } from "./entitlements.server";
import { isPlanId, isVideoPlanId } from "./plans";
import {
  createCheckoutSession,
  createTemplateCheckoutSession,
  createVideoCheckoutSession,
  getCheckoutSession,
  recordSession,
} from "./stripe.server";

export const startVideoCheckout = createServerFn({ method: "POST" })
  .middleware([requireFirebaseAuth])
  .inputValidator((d) => z.object({ plan: z.string().refine(isVideoPlanId) }).parse(d))
  .handler(async ({ data, context }) => {
    const origin = trustedCheckoutOrigin(getRequest());
    const email = context.email ?? undefined;
    try {
      const url = await createVideoCheckoutSession(
        data.plan as never,
        context.userId,
        email,
        origin,
      );
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
      const url = await createCheckoutSession(data.plan as never, context.userId, email, origin);
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
      return {
        url: await createTemplateCheckoutSession(data.slug, context.userId, email, origin),
        error: null as string | null,
      };
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
  .inputValidator((d) => z.object({ sessionId: z.string().min(5).max(255) }).parse(d))
  .handler(async ({ data, context }) => {
    try {
      const s = await getCheckoutSession(data.sessionId);
      if (s.metadata?.user_id !== context.userId) return { ok: false, plan: null };
      const ok = await recordSession(s);
      return { ok, plan: (s.metadata?.plan as string) ?? null };
    } catch {
      return { ok: false, plan: null };
    }
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
    const origin = trustedCheckoutOrigin(getRequest());
    try {
      return await createBillingPortalUrl(context.userId, origin);
    } catch (e) {
      return { url: null, error: e instanceof Error ? e.message : "Billing portal unavailable." };
    }
  });
