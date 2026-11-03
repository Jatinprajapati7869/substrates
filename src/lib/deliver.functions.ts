import { createServerFn } from "@tanstack/react-start";
import { setResponseHeaders } from "@tanstack/react-start/server";
import { z } from "zod";
import { requireFirebaseAuth } from "@/integrations/firebase/auth-middleware";
import { createDeliverDeps } from "./deliver-firestore.server";
import { DELIVERY_RESPONSE_HEADERS } from "./delivery-headers.server";
import {
  deliverProductPromptWithDeps,
  productDeliveryMetaWithDeps,
} from "./deliver-product-prompt.server";

const productKindSchema = z.enum(["section", "template"]);

export const deliverProductPrompt = createServerFn({ method: "POST" })
  .middleware([requireFirebaseAuth])
  .inputValidator((d) =>
    z
      .object({
        kind: productKindSchema,
        slug: z.string().min(1).max(120),
        assistant: z.string().min(1).max(40),
      })
      .parse(d),
  )
  .handler(async ({ data, context }) => {
    setResponseHeaders(new Headers(DELIVERY_RESPONSE_HEADERS));
    const deps = await createDeliverDeps();
    return deliverProductPromptWithDeps(context.userId, data.kind, data.slug, data.assistant, deps);
  });

export const getProductDeliveryMeta = createServerFn({ method: "GET" })
  .middleware([requireFirebaseAuth])
  .inputValidator((d) =>
    z.object({ kind: productKindSchema, slug: z.string().min(1).max(120) }).parse(d),
  )
  .handler(async ({ data, context }) => {
    const deps = await createDeliverDeps();
    const meta = await productDeliveryMetaWithDeps(context.userId, data.kind, data.slug, deps);
    if (!meta) return { ok: false as const, error: "unknown_product" as const };
    return { ok: true as const, ...meta };
  });
