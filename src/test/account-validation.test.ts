import { describe, expect, it } from "vitest";
import { displayNameSchema, safeReturnPath, signInCallbackPath } from "@/lib/account-validation";
describe("Account isolation and input", () => {
  it("preserves the free section and copy intent through sign-in callbacks", () => {
    const next = "/sections/signal?copy=1";
    expect(safeReturnPath(next)).toBe(next);
    expect(signInCallbackPath(next)).toBe("/signin?next=%2Fsections%2Fsignal%3Fcopy%3D1");
    expect(new URL(signInCallbackPath(next), "https://app.invalid").searchParams.get("next")).toBe(next);
  });
  it("never accepts an external sign-in callback destination", () => {
    expect(signInCallbackPath("https://attacker.example/sections/signal")).toBe("/signin");
  });
  it("never redirects visitors to another origin", () => {
    expect(safeReturnPath("//attacker.example")).toBe("/");
    expect(safeReturnPath("/\\attacker.example")).toBe("/");
    expect(safeReturnPath("https://attacker.example")).toBe("/");
    expect(safeReturnPath("/templates/daylight")).toBe("/templates/daylight");
  });
  it("rejects profile names longer than the database allows", () => {
    expect(displayNameSchema.safeParse("a".repeat(101)).success).toBe(false);
    expect(displayNameSchema.safeParse("Jatin").success).toBe(true);
  });
});