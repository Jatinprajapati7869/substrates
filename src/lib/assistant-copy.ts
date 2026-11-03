import { z } from "zod";
import { findProduct } from "./catalog";

export const assistantSchema = z.enum([
  "Claude Code",
  "Cursor",
  "Windsurf",
  "v0",
  "Bolt",
  "Lovable",
  "Replit",
  "Codex",
  "grokbuild",
]);
export function sectionPrompt(slug: string, assistant: string, origin: string) {
  const target = assistantSchema.parse(assistant);
  const product = findProduct("section", slug);
  if (!product) throw new Error("Section not found.");
  const url = new URL(`/sections/${encodeURIComponent(slug)}`, origin);
  if (!["http:", "https:"].includes(url.protocol)) throw new Error("Invalid site address.");
  return `In ${target}, recreate the "${product.name}" section from Substrates: ${url.href}. ${product.description || "Use the product preview as the visual reference."} Match the layout and interactions, preserve the project's existing design system, and adapt it to the project. This is a reference prompt, not licensed source code. ${product.tier === "pro" ? "This section requires Pro membership; do not bypass purchase or access restrictions." : "This is a free section."}`;
}
export async function copySectionPrompt(slug: string, assistant: string) {
  const prompt = sectionPrompt(slug, assistant, window.location.origin);
  if (!navigator.clipboard)
    throw new Error("Clipboard is unavailable. Please use a secure browser connection.");
  await navigator.clipboard.writeText(prompt);
}
