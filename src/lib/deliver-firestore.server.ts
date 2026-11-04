import { getAdminFirestore } from "@/integrations/firebase/admin.server";
import { getEntitlement } from "./entitlements.server";
import { consumeDeliverRateLimit } from "./deliver-rate-limit.server";
import type { DeliverDeps } from "./deliver-product-prompt.server";
import { unlockDocId } from "./spend-credit.server";

export async function createDeliverDeps(): Promise<DeliverDeps> {
  const db = await getAdminFirestore();
  return {
    getEntitlement: (userId) => getEntitlement(userId),
    hasUnlock: async (userId, slug) => {
      const snap = await db.collection("unlocks").doc(unlockDocId(userId, slug)).get();
      return snap.exists;
    },
    getProductBody: async (docId) => {
      const snap = await db.collection("product_content").doc(docId).get();
      if (!snap.exists) return null;
      const body = snap.data()?.["body"];
      return typeof body === "string" ? body : null;
    },
    consumeRateLimit: (userId) => consumeDeliverRateLimit(userId),
  };
}
