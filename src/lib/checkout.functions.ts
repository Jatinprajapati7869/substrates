import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { z } from "zod";
import { requireFirebaseAuth } from "@/integrations/firebase/auth-middleware";
import { listPurchasesForUser, resolveStripeCustomerId } from "@/lib/purchases.server";
import { isPlanId } from "./plans";
import { createBillingPortalSession, createCheckoutSession, createTemplateCheckoutSession, getCheckoutSession, recordSession } from "./stripe.server";

export const startCheckout = createServerFn({ method: "POST" })
  .middleware([requireFirebaseAuth])
  .inputValidator((d) => z.object({ plan: z.string().refine(isPlanId) }).parse(d))
  .handler(async ({ data, context }) => {
    const origin = new URL(getRequest().url).origin;
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
    const origin = new URL(getRequest().url).origin;
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
        error: msg === "Payments are not set up yet." ? "Checkout isn't available yet — payments are still being set up." : msg || "Checkout failed.",
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

export const myPurchases = createServerFn({ method: "GET" })
  .middleware([requireFirebaseAuth])
  .handler(async ({ context }) => listPurchasesForUser(context.userId));

export const openBillingPortal = createServerFn({ method: "POST" })
  .middleware([requireFirebaseAuth])
  .handler(async ({ context }) => {
    const origin = new URL(getRequest().url).origin;
    try {
      const customerId = await resolveStripeCustomerId(context.userId);
      if (!customerId) {
        return { url: null as string | null, error: "No billing account yet. Complete a checkout first." };
      }
      const url = await createBillingPortalSession(customerId, `${origin}/signin`);
      return { url, error: null as string | null };
    } catch (e) {
      return { url: null, error: e instanceof Error ? e.message : "Billing portal unavailable." };
    }
  });
