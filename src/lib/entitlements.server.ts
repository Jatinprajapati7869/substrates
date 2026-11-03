import type { Firestore } from "firebase-admin/firestore";
import { getAdminFirestore } from "@/integrations/firebase/admin.server";
import type { EntitlementDoc, EntitlementStatus } from "./entitlements.types";
import { planFromMetadata, PLANS, videoPlanFromMetadata, type PlanId } from "./plans";

export function entitlementFromPlan(
  planId: PlanId,
  partial?: Partial<EntitlementDoc>,
): EntitlementDoc {
  const plan = PLANS[planId];
  const now = new Date();
  return {
    plan: planId,
    status: "active",
    creditsRemaining: plan.monthlyCredits,
    creditsPeriodStart: plan.monthlyCredits != null ? now : null,
    creditsPeriodEnd: plan.monthlyCredits != null ? null : null,
    unlimitedTemplates: plan.unlimitedTemplates,
    sectionAccess: plan.sectionAccess,
    templateAccess: plan.templateAccess,
    billingCustomerId: null,
    billingSubscriptionId: null,
    updatedAt: now,
    ...partial,
  };
}

export async function writeEntitlement(userId: string, data: EntitlementDoc): Promise<void> {
  const db = await getAdminFirestore();
  await db.collection("entitlements").doc(userId).set(data, { merge: true });
}

export async function getEntitlement(userId: string): Promise<EntitlementDoc | null> {
  const db = await getAdminFirestore();
  const snap = await db.collection("entitlements").doc(userId).get();
  if (!snap.exists) return null;
  return snap.data() as EntitlementDoc;
}

export function hasVideoSkillsAccess(ent: EntitlementDoc | null | undefined): boolean {
  return ent?.videoSkillsStatus === "active";
}

export async function resolveUserIdByBillingCustomer(customerId: string): Promise<string | null> {
  const db = await getAdminFirestore();
  const profiles = await db
    .collection("profiles")
    .where("billingCustomerId", "==", customerId)
    .limit(1)
    .get();
  if (!profiles.empty) return profiles.docs[0]!.id;
  const purchases = await db
    .collection("purchases")
    .where("billingCustomerId", "==", customerId)
    .limit(1)
    .get();
  if (!purchases.empty) return (purchases.docs[0]!.data() as { userId: string }).userId;
  return null;
}

/** Set credits to the plan monthly grant (never add). */
export function creditsStateForInvoicePaid(
  planId: PlanId,
  periodStart: Date,
  periodEnd: Date,
): Pick<
  EntitlementDoc,
  | "creditsRemaining"
  | "creditsPeriodStart"
  | "creditsPeriodEnd"
  | "plan"
  | "status"
  | "sectionAccess"
  | "templateAccess"
  | "unlimitedTemplates"
> {
  const plan = PLANS[planId];
  return {
    plan: planId,
    status: "active",
    creditsRemaining: plan.monthlyCredits,
    creditsPeriodStart: periodStart,
    creditsPeriodEnd: periodEnd,
    unlimitedTemplates: plan.unlimitedTemplates,
    sectionAccess: plan.sectionAccess,
    templateAccess: plan.templateAccess,
  };
}

export async function applyLifetimeEntitlementFromCheckout(
  userId: string,
  customerId: string | null,
  subscriptionId: string | null,
): Promise<void> {
  await writeEntitlement(
    userId,
    entitlementFromPlan("lifetime", {
      billingCustomerId: customerId,
      billingSubscriptionId: subscriptionId,
      creditsRemaining: null,
      creditsPeriodStart: null,
      creditsPeriodEnd: null,
    }),
  );
}

export async function applyInvoicePaidEntitlement(
  userId: string,
  planMeta: string | undefined,
  periodStartUnix: number,
  periodEndUnix: number,
  customerId: string | null,
  subscriptionId: string | null,
  portalUrl?: string | null,
): Promise<void> {
  const plan = planFromMetadata(planMeta);
  if (!plan || plan.mode !== "subscription") return;
  const periodStart = new Date(periodStartUnix * 1000);
  const periodEnd = new Date(periodEndUnix * 1000);
  await writeEntitlement(userId, {
    ...creditsStateForInvoicePaid(plan.id, periodStart, periodEnd),
    billingCustomerId: customerId,
    billingSubscriptionId: subscriptionId,
    ...(portalUrl ? { providerCustomerPortalUrl: portalUrl } : {}),
    updatedAt: new Date(),
  });
}

export async function refreshProviderPortalUrl(userId: string, portalUrl: string): Promise<void> {
  const db = await getAdminFirestore();
  await db
    .collection("entitlements")
    .doc(userId)
    .set({ providerCustomerPortalUrl: portalUrl, updatedAt: new Date() }, { merge: true });
}

export async function applyVideoInvoicePaidEntitlement(
  userId: string,
  planMeta: string | undefined,
  periodStartUnix: number,
  periodEndUnix: number,
  customerId: string | null,
  subscriptionId: string | null,
): Promise<void> {
  const videoPlan = videoPlanFromMetadata(planMeta);
  if (!videoPlan) return;
  void periodStartUnix;
  void periodEndUnix;
  const db = await getAdminFirestore();
  await db.collection("entitlements").doc(userId).set(
    {
      videoSkillsStatus: "active",
      videoSkillsPlan: videoPlan.id,
      videoBillingSubscriptionId: subscriptionId,
      billingCustomerId: customerId,
      updatedAt: new Date(),
    },
    { merge: true },
  );
}

export async function setVideoSkillsStatus(
  userId: string,
  status: EntitlementStatus,
): Promise<void> {
  const db = await getAdminFirestore();
  await db
    .collection("entitlements")
    .doc(userId)
    .set({ videoSkillsStatus: status, updatedAt: new Date() }, { merge: true });
}

export async function setEntitlementStatus(
  userId: string,
  status: EntitlementDoc["status"],
): Promise<void> {
  const db = await getAdminFirestore();
  await db
    .collection("entitlements")
    .doc(userId)
    .set({ status, updatedAt: new Date() }, { merge: true });
}

export async function applyRefundedEntitlement(
  userId: string,
  planMeta: string | undefined,
): Promise<void> {
  const db = await getAdminFirestore();
  const entRef = db.collection("entitlements").doc(userId);

  if (planMeta && videoPlanFromMetadata(planMeta)) {
    await entRef.set(
      {
        videoSkillsStatus: "refunded",
        videoSkillsPlan: null,
        videoBillingSubscriptionId: null,
        updatedAt: new Date(),
      },
      { merge: true },
    );
    return;
  }

  const entSnap = await entRef.get();
  const ent = entSnap.data() as EntitlementDoc | undefined;
  const periodStart = ent?.creditsPeriodStart ?? null;

  await entRef.set(
    {
      status: "refunded",
      creditsRemaining: 0,
      unlimitedTemplates: false,
      templateAccess: "none",
      sectionAccess: "free",
      updatedAt: new Date(),
    },
    { merge: true },
  );

  const unlocks = await db.collection("unlocks").where("userId", "==", userId).get();
  const batch = db.batch();
  for (const doc of unlocks.docs) {
    const data = doc.data() as { source?: string; createdAt?: { toDate?: () => Date } | Date };
    const created =
      data.createdAt instanceof Date ? data.createdAt : (data.createdAt?.toDate?.() ?? new Date(0));
    const isLifetimePlan = planMeta === "lifetime" || ent?.unlimitedTemplates;
    if (isLifetimePlan) {
      batch.delete(doc.ref);
      continue;
    }
    if (data.source === "credit" && periodStart && created >= periodStart) {
      batch.delete(doc.ref);
    }
  }
  await batch.commit();
}

export async function runWithFirestore<T>(fn: (db: Firestore) => Promise<T>): Promise<T> {
  return fn(await getAdminFirestore());
}
