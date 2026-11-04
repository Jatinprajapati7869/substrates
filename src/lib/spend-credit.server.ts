import type { Firestore } from "firebase-admin/firestore";
import { findProduct } from "./catalog";
import { isDeliverable } from "./content-manifest";
import type { EntitlementDoc } from "./entitlements.types";

export type SpendCreditResult =
  | { ok: true; alreadyUnlocked: boolean; creditsRemaining: number | null }
  | {
      ok: false;
      error: "unknown_product" | "no_entitlement" | "no_credits" | "not_available_yet";
    };

export function unlockDocId(userId: string, slug: string): string {
  return `${userId}_${slug}`;
}

export async function spendCreditForTemplateWithLookup(
  userId: string,
  slug: string,
): Promise<SpendCreditResult> {
  const product = findProduct("template", slug);
  if (!product) return { ok: false, error: "unknown_product" };
  if (!isDeliverable(slug)) return { ok: false, error: "not_available_yet" };
  const db = await import("@/integrations/firebase/admin.server").then((m) =>
    m.getAdminFirestore(),
  );
  return spendCreditTransaction(db, userId, slug);
}

export async function spendCreditTransaction(
  db: Firestore,
  userId: string,
  slug: string,
): Promise<SpendCreditResult> {
  if (!isDeliverable(slug)) return { ok: false, error: "not_available_yet" };
  const unlockId = unlockDocId(userId, slug);
  return db.runTransaction(async (tx) => {
    const unlockRef = db.collection("unlocks").doc(unlockId);
    const entRef = db.collection("entitlements").doc(userId);
    const unlockSnap = await tx.get(unlockRef);
    const entSnap = await tx.get(entRef);
    const ent = entSnap.data() as EntitlementDoc | undefined;

    if (unlockSnap.exists) {
      return {
        ok: true,
        alreadyUnlocked: true,
        creditsRemaining: ent?.creditsRemaining ?? null,
      };
    }

    if (!ent) return { ok: false, error: "no_entitlement" };

    if (ent.status === "refunded") return { ok: false, error: "no_entitlement" };

    if (ent.unlimitedTemplates || ent.templateAccess === "all" || ent.plan === "lifetime") {
      tx.set(unlockRef, {
        userId,
        slug,
        source: "lifetime",
        createdAt: new Date(),
      });
      return { ok: true, alreadyUnlocked: false, creditsRemaining: null };
    }

    const credits = ent.creditsRemaining ?? 0;
    if (credits <= 0) return { ok: false, error: "no_credits" };

    tx.set(unlockRef, {
      userId,
      slug,
      source: "credit",
      createdAt: new Date(),
    });
    tx.set(
      entRef,
      {
        creditsRemaining: credits - 1,
        updatedAt: new Date(),
      },
      { merge: true },
    );
    return { ok: true, alreadyUnlocked: false, creditsRemaining: credits - 1 };
  });
}
