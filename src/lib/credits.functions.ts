import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireFirebaseAuth } from "@/integrations/firebase/auth-middleware";
import { spendCreditForTemplateWithLookup } from "@/lib/spend-credit.server";

export const spendCredit = createServerFn({ method: "POST" })
  .middleware([requireFirebaseAuth])
  .inputValidator((d) => z.object({ slug: z.string().min(1).max(120) }).parse(d))
  .handler(async ({ data, context }) => {
    const result = await spendCreditForTemplateWithLookup(context.userId, data.slug);
    if (!result.ok) {
      if (result.error === "unknown_product") {
        return { ok: false as const, error: "Unknown template.", creditsRemaining: null };
      }
      if (result.error === "no_entitlement") {
        return {
          ok: false as const,
          error: "Choose a plan to unlock templates.",
          errorCode: result.error,
          creditsRemaining: 0,
        };
      }
      if (result.error === "not_available_yet") {
        return {
          ok: false as const,
          error: "This template is not available yet.",
          errorCode: "not_available_yet" as const,
          creditsRemaining: null,
        };
      }
      return {
        ok: false as const,
        error: "No credits left this period.",
        errorCode: result.error,
        creditsRemaining: 0,
      };
    }
    return {
      ok: true as const,
      alreadyUnlocked: result.alreadyUnlocked,
      creditsRemaining: result.creditsRemaining,
      error: null as string | null,
    };
  });
