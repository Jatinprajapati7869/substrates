import { describe, expect, it } from "vitest";
import { sectionPrompt } from "@/lib/assistant-copy";
import { searchCatalog, catalogProduct } from "@/lib/mcp/catalog";
import { safeReturnPath } from "@/lib/account-validation";
describe("Assistant support", () => {
  it.each(["Codex", "grokbuild"])("creates a reference prompt for %s", assistant => {
    const prompt = sectionPrompt("signal", assistant, "https://supply.example");
    expect(prompt).toContain(`In ${assistant}`);
    expect(prompt).toContain("https://supply.example/sections/signal");
    expect(prompt).toContain("not licensed source code");
  });
  it("preserves safe internal return paths and rejects unsafe returns", () => {
    expect(safeReturnPath("/pricing?checkout=cancelled")).toBe("/pricing?checkout=cancelled");
    expect(safeReturnPath("/\u0000bad")).toBe("/");
    expect(safeReturnPath("/x/..//outside.example")).toBe("/");
  });
  it("limits catalog search and excludes private account data", () => {
    expect(searchCatalog("", "section", 3)).toHaveLength(3);
    expect(searchCatalog("", "section", 3).every(p => p.kind === "section")).toBe(true);
    expect(catalogProduct("template", "daylight")?.priceUsd).toBe(79);
    expect(catalogProduct("template", "missing")).toBeNull();
    expect(catalogProduct("template", "daylight")).not.toHaveProperty("email");
  });
});