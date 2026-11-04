import type { Product } from "./catalog";
import type { EntitlementDoc } from "./entitlements.types";
import { unlockDocId } from "./spend-credit.server";

export type DeliveryGate = "ok" | "not_entitled" | "reference_only";

export function canDeliverFullPrompt(
  product: Product,
  entitlement: EntitlementDoc | null | undefined,
  hasUnlock: boolean,
): DeliveryGate {
  if (product.kind === "section") {
    if (product.tier !== "pro") return "reference_only";
    if (!entitlement || entitlement.status !== "active" || entitlement.sectionAccess !== "pro") {
      return "not_entitled";
    }
    return "ok";
  }

  if (hasUnlock) return "ok";

  if (!entitlement) return "not_entitled";

  if (entitlement.status === "refunded") return "not_entitled";

  if (entitlement.status !== "active") {
    return "not_entitled";
  }

  if (
    entitlement.unlimitedTemplates ||
    entitlement.templateAccess === "all" ||
    entitlement.plan === "lifetime"
  ) {
    return "ok";
  }

  return "not_entitled";
}

export function unlockDocumentPath(userId: string, slug: string): string {
  return `unlocks/${unlockDocId(userId, slug)}`;
}
