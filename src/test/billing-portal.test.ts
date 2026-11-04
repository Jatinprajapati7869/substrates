import { describe, expect, it, vi, beforeEach } from "vitest";
import { createBillingPortalUrl } from "@/lib/billing-portal.server";

vi.mock("@/lib/entitlements.server", () => ({
  getEntitlement: vi.fn(),
}));

import { getEntitlement } from "@/lib/entitlements.server";

describe("S7 billing portal", () => {
  beforeEach(() => {
    vi.mocked(getEntitlement).mockReset();
  });

  it("returns stored Lemon Squeezy portal URL for the signed-in owner", async () => {
    vi.mocked(getEntitlement).mockResolvedValue({
      providerCustomerPortalUrl: "https://store.lemonsqueezy.com/billing?sig=abc",
    } as never);

    const result = await createBillingPortalUrl("user-1");
    expect(result.error).toBeNull();
    expect(result.url).toBe("https://store.lemonsqueezy.com/billing?sig=abc");
  });

  it("returns a clear error when no portal URL exists (e.g. lifetime-only)", async () => {
    vi.mocked(getEntitlement).mockResolvedValue(null);
    const result = await createBillingPortalUrl("user-1");
    expect(result.url).toBeNull();
    expect(result.error).toContain("No billing portal");
  });
});
