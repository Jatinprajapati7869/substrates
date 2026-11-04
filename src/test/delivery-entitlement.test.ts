import { describe, expect, it } from "vitest";
import type { EntitlementDoc } from "@/lib/entitlements.types";
import { findProduct } from "@/lib/catalog";
import { canDeliverFullPrompt } from "@/lib/delivery-entitlement.server";

const template = findProduct("template", "aerials");
const proSection = findProduct("section", "portfolio-jewelcase");

describe("canDeliverFullPrompt", () => {
  it("blocks lifetime catalog delivery when entitlement is refunded", () => {
    if (!template) throw new Error("fixture template missing");
    const ent: EntitlementDoc = {
      plan: "lifetime",
      status: "refunded",
      creditsRemaining: null,
      creditsPeriodStart: null,
      creditsPeriodEnd: null,
      unlimitedTemplates: true,
      sectionAccess: "pro",
      templateAccess: "all",
      updatedAt: new Date(),
    };
    expect(canDeliverFullPrompt(template, ent, false)).toBe("not_entitled");
  });

  it("allows template delivery when user has a permanent unlock", () => {
    if (!template) throw new Error("fixture template missing");
    const ent: EntitlementDoc = {
      plan: "sections",
      status: "refunded",
      creditsRemaining: 0,
      creditsPeriodStart: null,
      creditsPeriodEnd: null,
      sectionAccess: "pro",
      templateAccess: "credits",
      updatedAt: new Date(),
    };
    expect(canDeliverFullPrompt(template, ent, true)).toBe("ok");
  });

  it("requires active status for lifetime template access without unlock", () => {
    if (!template) throw new Error("fixture template missing");
    const ent: EntitlementDoc = {
      plan: "lifetime",
      status: "past_due",
      creditsRemaining: null,
      creditsPeriodStart: null,
      creditsPeriodEnd: null,
      unlimitedTemplates: true,
      sectionAccess: "pro",
      templateAccess: "all",
      updatedAt: new Date(),
    };
    expect(canDeliverFullPrompt(template, ent, false)).toBe("not_entitled");
  });

  it("requires active pro entitlement for pro sections", () => {
    if (!proSection || proSection.tier !== "pro") throw new Error("fixture section missing");
    expect(
      canDeliverFullPrompt(
        proSection,
        {
          plan: "sections",
          status: "canceled",
          creditsRemaining: 0,
          creditsPeriodStart: null,
          creditsPeriodEnd: null,
          sectionAccess: "pro",
          templateAccess: "credits",
          updatedAt: new Date(),
        },
        false,
      ),
    ).toBe("not_entitled");
  });
});
