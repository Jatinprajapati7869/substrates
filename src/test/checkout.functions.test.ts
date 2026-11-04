import { describe, expect, it, vi, beforeEach } from "vitest";
import { z } from "zod";
import { isPlanId } from "@/lib/plans";
import { checkoutParams } from "@/lib/stripe.server";

vi.mock("@tanstack/react-start/server", () => ({
  getRequest: vi.fn(),
}));

vi.mock("@/integrations/firebase/admin.server", () => ({
  getAdminAuth: vi.fn(),
}));

import { getRequest } from "@tanstack/react-start/server";
import { getAdminAuth } from "@/integrations/firebase/admin.server";
import { requireFirebaseAuth } from "@/integrations/firebase/auth-middleware";

const startCheckoutInput = z.object({ plan: z.string().refine(isPlanId) });

type FunctionMiddleware = {
  options?: {
    server?: (ctx: { next: () => Promise<{ context?: unknown }> }) => Promise<unknown>;
  };
};

function serverMiddleware() {
  const server = (requireFirebaseAuth as unknown as FunctionMiddleware).options?.server;
  if (!server) throw new Error("requireFirebaseAuth server hook missing");
  return server;
}

describe("S4 checkout server function", () => {
  beforeEach(() => {
    vi.mocked(getAdminAuth).mockReset();
    vi.mocked(getRequest).mockReset();
  });

  it("rejects checkout when no bearer token is sent", async () => {
    vi.mocked(getRequest).mockReturnValue({
      headers: new Headers(),
    } as Request);

    await expect(
      serverMiddleware()({
        next: async () => ({ context: {} }),
      }),
    ).rejects.toThrow(/Unauthorized: No authorization header/);
  });

  it("rejects an unknown plan id before Stripe is called", () => {
    expect(() => startCheckoutInput.parse({ plan: "not-a-real-plan" })).toThrow();
    expect(() => startCheckoutInput.parse({ plan: "sections" })).not.toThrow();
  });

  it("sets subscription plan metadata on the server-side Stripe session params", () => {
    const params = checkoutParams(
      "sections-templates",
      "member-1",
      undefined,
      "https://substrates.app",
    );
    expect(params.get("metadata[plan]")).toBe("sections-templates");
    expect(params.get("metadata[user_id]")).toBe("member-1");
    expect(params.get("line_items[0][price_data][unit_amount]")).toBe("3900");
  });
});
