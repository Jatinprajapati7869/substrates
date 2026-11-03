import { getAdminFirestore } from "@/integrations/firebase/admin.server";
import { buildAccountDashboardView } from "./account-dashboard";
import { getEntitlement } from "./entitlements.server";
import { listPurchasesForUser } from "./purchases.server";

export async function listUnlockSlugsForUser(userId: string): Promise<string[]> {
  const db = await getAdminFirestore();
  const snap = await db.collection("unlocks").where("userId", "==", userId).get();
  const slugs: string[] = [];
  for (const doc of snap.docs) {
    const slug = doc.data()["slug"];
    if (typeof slug === "string" && slug) slugs.push(slug);
  }
  return [...new Set(slugs)].sort((a, b) => a.localeCompare(b));
}

export async function loadAccountDashboardForUser(userId: string) {
  const [entitlement, unlockSlugs, purchases] = await Promise.all([
    getEntitlement(userId),
    listUnlockSlugsForUser(userId),
    listPurchasesForUser(userId),
  ]);
  return buildAccountDashboardView({
    entitlement,
    unlockSlugs,
    purchases,
    providerCustomerPortalUrl: entitlement?.providerCustomerPortalUrl ?? null,
  });
}
