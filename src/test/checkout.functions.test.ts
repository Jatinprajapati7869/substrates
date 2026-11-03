import { describe, expect, it, vi, beforeEach } from "vitest";
import { z } from "zod";
import { isPlanId } from "@/lib/plans";
import { buildLemonSqueezyCheckoutBody } from "@/lib/billing/lemonsqueezy-provider";

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

const env = {
  LEMONSQUEEZY_API_KEY: "k",
  LEMONSQUEEZY_STORE_ID: "1",
  LEMONSQUEEZY_WEBHOOK_SECRET: "w",
  LEMONSQUEEZY_VARIANT_ID_SECTIONS: "9001",
  LEMONSQUEEZY_VARIANT_ID_SECTIONS_TEMPLATES: "9002",
  LEMONSQUEEZY_VARIANT_ID_LIFETIME: "9003",
};

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

  it("rejects an unknown plan id before checkout is created", () => {
    expect(() => startCheckoutInput.parse({ plan: "not-a-real-plan" })).toThrow();
    expect(() => startCheckoutInput.parse({ plan: "sections" })).not.toThrow();
  });

  it("sets plan metadata on the server-side Lemon Squeezy checkout body", () => {
    const body = buildLemonSqueezyCheckoutBody(
      { plan: "sections-templates", userId: "member-1", origin: "https://substrates.app" },
      env,
      "https://substrates.app",
    );
    const custom = body.data.attributes["checkout_data"] as { custom: Record<string, string> };
    expect(custom.custom["plan"]).toBe("sections-templates");
    expect(custom.custom["user_id"]).toBe("member-1");
  });
});
