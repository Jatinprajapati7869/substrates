import { describe, expect, it } from "vitest";
import { trustedCheckoutOrigin } from "@/lib/checkout-origin.server";
import { SITE_ORIGIN } from "@/lib/brand";

describe("trustedCheckoutOrigin", () => {
  it("falls back to SITE_ORIGIN when Host is untrusted", () => {
    const req = new Request("https://evil.example/pricing", { headers: { host: "evil.example" } });
    expect(trustedCheckoutOrigin(req)).toBe(SITE_ORIGIN);
  });

  it("allows localhost for dev checkout", () => {
    const req = new Request("http://localhost:8080/pricing");
    expect(trustedCheckoutOrigin(req)).toBe("http://localhost:8080");
  });
});
