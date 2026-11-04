import { getAdminFirestore } from "@/integrations/firebase/admin.server";
import type { BillingCheckoutPayload } from "@/lib/billing/types";
import { isPlanId } from "@/lib/plans";

export async function upsertPurchaseFromCheckout(payload: BillingCheckoutPayload) {
  const { userId, plan, checkoutId, customerId, subscriptionId, amountCents, currency } = payload;
  if (!userId || !plan || !payload.paid) return false;

  const db = await getAdminFirestore();
  await db
    .collection("purchases")
    .doc(checkoutId)
    .set(
      {
        userId,
        plan,
        status: "paid",
        billingCheckoutId: checkoutId,
        billingCustomerId: customerId,
        billingSubscriptionId: subscriptionId ?? null,
        amountTotal: amountCents ?? null,
        currency: currency ?? null,
        createdAt: new Date(),
      },
      { merge: true },
    );

  if (customerId) {
    await db
      .collection("profiles")
      .doc(userId)
      .set({ billingCustomerId: customerId }, { merge: true });
  }
  return true;
}

export async function recordCheckoutPurchase(payload: BillingCheckoutPayload): Promise<boolean> {
  const { applyLifetimeEntitlementFromCheckout, applyTemplateUnlockFromPurchase } =
    await import("@/lib/entitlements.server");
  try {
    const ok = await upsertPurchaseFromCheckout(payload);
    if (ok && payload.plan.startsWith("template:")) {
      const slug = payload.plan.slice("template:".length);
      await applyTemplateUnlockFromPurchase(payload.userId, slug);
    } else if (ok && isPlanId(payload.plan) && payload.plan === "lifetime") {
      await applyLifetimeEntitlementFromCheckout(
        payload.userId,
        payload.customerId,
        payload.subscriptionId ?? null,
      );
    }
    return ok;
  } catch (e) {
    console.error("purchase record failed", e instanceof Error ? e.message : e);
    return false;
  }
}

export async function resolveBillingCustomerId(userId: string): Promise<string | null> {
  const db = await getAdminFirestore();
  const profile = await db.collection("profiles").doc(userId).get();
  const fromProfile = profile.data()?.["billingCustomerId"];
  if (typeof fromProfile === "string" && fromProfile) return fromProfile;

  const snap = await db.collection("purchases").where("userId", "==", userId).get();
  for (const doc of snap.docs) {
    const id = doc.data()["billingCustomerId"];
    if (typeof id === "string" && id) {
      await db.collection("profiles").doc(userId).set({ billingCustomerId: id }, { merge: true });
      return id;
    }
  }
  return null;
}

export async function listPurchasesForUser(userId: string) {
  const snap = await (
    await getAdminFirestore()
  )
    .collection("purchases")
    .where("userId", "==", userId)
    .get();
  return snap.docs
    .map((doc) => doc.data() as { plan: string; createdAt?: { toDate?: () => Date } | Date })
    .map((row) => ({
      plan: row.plan,
      created_at:
        row.createdAt instanceof Date
          ? row.createdAt.toISOString()
          : (row.createdAt?.toDate?.().toISOString() ?? new Date().toISOString()),
    }))
    .sort((a, b) => b.created_at.localeCompare(a.created_at));
}
