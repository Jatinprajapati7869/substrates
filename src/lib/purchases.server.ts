import { getAdminFirestore } from "@/integrations/firebase/admin.server";

export async function upsertPurchaseFromStripeSession(session: {
  id: string;
  metadata?: { user_id?: string; plan?: string };
  payment_status?: string;
  status?: string;
  customer?: string | { id?: string } | null;
  subscription?: string | { id?: string } | null;
  amount_total?: number | null;
  currency?: string | null;
}) {
  const userId = session.metadata?.user_id;
  const plan = session.metadata?.plan;
  if (!userId || !plan) return false;
  if (session.payment_status !== "paid" && session.status !== "complete") return false;

  const db = getAdminFirestore();
  await db
    .collection("purchases")
    .doc(session.id)
    .set(
      {
        userId,
        plan,
        status: "paid",
        stripeSessionId: session.id,
        stripeCustomerId: typeof session.customer === "string" ? session.customer : null,
        stripeSubscriptionId: typeof session.subscription === "string" ? session.subscription : null,
        amountTotal: session.amount_total ?? null,
        currency: session.currency ?? null,
        createdAt: new Date(),
      },
      { merge: true },
    );

  const customerId = typeof session.customer === "string" ? session.customer : null;
  if (customerId) {
    await db.collection("profiles").doc(userId).set({ stripeCustomerId: customerId }, { merge: true });
  }
  return true;
}

export async function resolveStripeCustomerId(userId: string): Promise<string | null> {
  const db = getAdminFirestore();
  const profile = await db.collection("profiles").doc(userId).get();
  const fromProfile = profile.data()?.stripeCustomerId;
  if (typeof fromProfile === "string" && fromProfile) return fromProfile;

  const snap = await db.collection("purchases").where("userId", "==", userId).get();
  for (const doc of snap.docs) {
    const id = doc.data().stripeCustomerId;
    if (typeof id === "string" && id) {
      await db.collection("profiles").doc(userId).set({ stripeCustomerId: id }, { merge: true });
      return id;
    }
  }
  return null;
}

export async function listPurchasesForUser(userId: string) {
  const snap = await getAdminFirestore().collection("purchases").where("userId", "==", userId).get();
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
