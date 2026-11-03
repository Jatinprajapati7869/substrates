import { getAdminFirestore } from "@/integrations/firebase/admin.server";

/** Returns true when this event id is newly claimed. False on replay. */
export async function claimStripeEvent(eventId: string): Promise<boolean> {
  const db = await getAdminFirestore();
  return db.runTransaction(async (tx) => {
    const ref = db.collection("stripe_events").doc(eventId);
    const snap = await tx.get(ref);
    if (snap.exists) return false;
    tx.set(ref, { processedAt: new Date() });
    return true;
  });
}

/** Allows Stripe to retry after a handler failure. */
export async function releaseStripeEvent(eventId: string): Promise<void> {
  const db = await getAdminFirestore();
  await db.collection("stripe_events").doc(eventId).delete();
}
