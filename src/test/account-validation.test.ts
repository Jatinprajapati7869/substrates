import { describe, expect, it } from "vitest";
import { displayNameSchema, safeReturnPath, signInCallbackPath } from "@/lib/account-validation";
describe("Account isolation and input", () => {
  it("preserves the free section and copy intent through sign-in callbacks", () => {
    const next = "/sections/signal?copy=1";
    expect(safeReturnPath(next)).toBe(next);
    expect(signInCallbackPath(next)).toBe("/signin?next=%2Fsections%2Fsignal%3Fcopy%3D1");
    expect(new URL(signInCallbackPath(next), "https://app.invalid").searchParams.get("next")).toBe(
      next,
    );
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
  it("S3 rejects protocol-relative //evil.com", () => {
    expect(safeReturnPath("//evil.com")).toBe("/");
  });
  it("S3 rejects absolute https://evil.com", () => {
    expect(safeReturnPath("https://evil.com")).toBe("/");
  });
  it("S3 rejects backslash open redirect /\\evil", () => {
    expect(safeReturnPath("/\\evil")).toBe("/");
  });
  it("S3 rejects javascript: URLs", () => {
    expect(safeReturnPath("javascript:alert(1)")).toBe("/");
  });
  it("S3 rejects control characters in paths", () => {
    expect(safeReturnPath("/templates/\u0001")).toBe("/");
  });
  it("S3 keeps valid in-app return /pricing?checkout=lifetime", () => {
    expect(safeReturnPath("/pricing?checkout=lifetime")).toBe("/pricing?checkout=lifetime");
  });
  it("rejects profile names longer than the database allows", () => {
    expect(displayNameSchema.safeParse("a".repeat(101)).success).toBe(false);
    expect(displayNameSchema.safeParse("Jatin").success).toBe(true);
  });
});
