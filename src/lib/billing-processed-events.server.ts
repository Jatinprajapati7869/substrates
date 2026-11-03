import { getAdminFirestore } from "@/integrations/firebase/admin.server";

/** Returns true when this event key is newly claimed. False on replay. */
export async function claimBillingProcessedEvent(eventKey: string): Promise<boolean> {
  const db = await getAdminFirestore();
  return db.runTransaction(async (tx) => {
    const ref = db.collection("billing_processed_events").doc(eventKey);
    const snap = await tx.get(ref);
    if (snap.exists) return false;
    tx.set(ref, { processedAt: new Date() });
    return true;
  });
}

/** Allows the provider to retry after a handler failure. */
export async function releaseBillingProcessedEvent(eventKey: string): Promise<void> {
  const db = await getAdminFirestore();
  await db.collection("billing_processed_events").doc(eventKey).delete();
}
