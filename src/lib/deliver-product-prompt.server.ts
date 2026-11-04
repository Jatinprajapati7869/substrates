import { findProduct, type Product } from "./catalog";
import { assistantSchema } from "./assistant-copy";
import { canDeliverFullPrompt } from "./delivery-entitlement.server";
import {
  productContentDocId,
  wrapFullPrompt,
  FULL_PROMPT_LICENSE_NOTICE,
} from "./delivery-content.server";
import type { EntitlementDoc } from "./entitlements.types";

export type DeliverErrorCode =
  | "unknown_product"
  | "unknown_assistant"
  | "not_entitled"
  | "content_missing"
  | "rate_limited"
  | "reference_only";

export type DeliverSuccess = {
  ok: true;
  kind: "full";
  text: string;
  assistant: string;
  productSlug: string;
  productKind: Product["kind"];
  licenseNotice: string;
};

export type DeliverFailure = {
  ok: false;
  code: DeliverErrorCode;
};

export type DeliverResult = DeliverSuccess | DeliverFailure;

export type DeliverDeps = {
  getEntitlement: (userId: string) => Promise<EntitlementDoc | null>;
  hasUnlock: (userId: string, slug: string) => Promise<boolean>;
  getProductBody: (docId: string) => Promise<string | null>;
  consumeRateLimit: (userId: string) => boolean;
};

export async function deliverProductPromptWithDeps(
  userId: string,
  kind: Product["kind"],
  slug: string,
  assistant: string,
  deps: DeliverDeps,
): Promise<DeliverResult> {
  const parsedAssistant = assistantSchema.safeParse(assistant);
  if (!parsedAssistant.success) return { ok: false, code: "unknown_assistant" };

  const product = findProduct(kind, slug);
  if (!product) return { ok: false, code: "unknown_product" };

  const gate = canDeliverFullPrompt(
    product,
    await deps.getEntitlement(userId),
    await deps.hasUnlock(userId, slug),
  );
  if (gate === "reference_only") return { ok: false, code: "reference_only" };
  if (gate === "not_entitled") return { ok: false, code: "not_entitled" };

  if (!deps.consumeRateLimit(userId)) return { ok: false, code: "rate_limited" };

  const docId = productContentDocId(product);
  const body = await deps.getProductBody(docId);
  if (!body) return { ok: false, code: "content_missing" };

  const text = wrapFullPrompt(parsedAssistant.data, body);
  return {
    ok: true,
    kind: "full",
    text,
    assistant: parsedAssistant.data,
    productSlug: slug,
    productKind: kind,
    licenseNotice: FULL_PROMPT_LICENSE_NOTICE,
  };
}

export type ProductDeliveryMeta = {
  proSectionAccess: boolean;
  templateUnlocked: boolean;
  canSpendCredit: boolean;
  creditsRemaining: number | null;
  unlimitedTemplates: boolean;
};

export async function productDeliveryMetaWithDeps(
  userId: string,
  kind: Product["kind"],
  slug: string,
  deps: Pick<DeliverDeps, "getEntitlement" | "hasUnlock">,
): Promise<ProductDeliveryMeta | null> {
  const product = findProduct(kind, slug);
  if (!product) return null;

  const entitlement = await deps.getEntitlement(userId);
  const unlocked = await deps.hasUnlock(userId, slug);

  const proSectionAccess =
    product.kind === "section" &&
    product.tier === "pro" &&
    !!entitlement &&
    entitlement.status === "active" &&
    entitlement.sectionAccess === "pro";

  const unlimitedTemplates =
    !!entitlement &&
    entitlement.status !== "refunded" &&
    (entitlement.unlimitedTemplates === true ||
      entitlement.templateAccess === "all" ||
      entitlement.plan === "lifetime");

  const creditsRemaining = entitlement?.creditsRemaining ?? null;
  const canSpendCredit =
    !!entitlement &&
    entitlement.status === "active" &&
    entitlement.templateAccess === "credits" &&
    !unlimitedTemplates &&
    (creditsRemaining ?? 0) > 0;

  return {
    proSectionAccess,
    templateUnlocked: unlocked || unlimitedTemplates,
    canSpendCredit,
    creditsRemaining,
    unlimitedTemplates,
  };
}
