import { readFileSync } from "node:fs";
import { join } from "node:path";
import { spawnSync } from "node:child_process";
import { describe, expect, it } from "vitest";
import {
  validateProductBody,
  validateFileOnDisk,
} from "../../scripts/lib/product-content-validation.mjs";

const ROOT = join(process.cwd());
const SAMPLE = join(ROOT, "content-example/collage.md");
const MANIFEST = join(ROOT, "src/lib/content-manifest.json");

describe("product content validation", () => {
  it("accepts the tracked format sample", () => {
    const result = validateFileOnDisk(SAMPLE, "content-example/collage.md");
    expect(result.ok).toBe(true);
  });

  it("rejects missing title line", () => {
    const result = validateProductBody("content/x.md", "## Stack & dependencies\n");
    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(result.errors[0]?.message).toMatch(/title line/i);
  });

  it("rejects Oversight in title", () => {
    let body = readFileSync(SAMPLE, "utf8");
    body = body.replace(
      "# Collage — Portfolio hero — Substrates",
      "# Collage — Portfolio hero — Oversight Supply",
    );
    const result = validateProductBody("content-example/collage.md", body);
    expect(result.ok).toBe(false);
  });

  it("rejects secret-like patterns", () => {
    const body = `${readFileSync(SAMPLE, "utf8")}\napi_key=sk_live_bad\n`;
    const result = validateProductBody("content-example/collage.md", body);
    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(result.errors.some((e: { message: string }) => /secret-like/i.test(e.message))).toBe(
      true,
    );
  });

  it("rejects unbalanced fences", () => {
    const body = `${readFileSync(SAMPLE, "utf8")}\n\`\`\`extra\n`;
    const result = validateProductBody("content-example/collage.md", body);
    expect(result.ok).toBe(false);
  });

  it("rejects unknown catalog slug", () => {
    const body = readFileSync(SAMPLE, "utf8");
    const result = validateProductBody("content/not-a-real-slug-xyz.md", body);
    expect(result.ok).toBe(false);
  });
});

describe("content manifest", () => {
  it("contains no body text fields", () => {
    const raw = readFileSync(MANIFEST, "utf8");
    expect(raw).not.toMatch(/"body"\s*:/);
    const parsed = JSON.parse(raw) as { products: unknown[] };
    expect(Array.isArray(parsed.products)).toBe(true);
  });
});

describe("upload dry-run", () => {
  it("does not write manifest or print body text", () => {
    const before = readFileSync(MANIFEST, "utf8");
    const run = spawnSync(process.execPath, ["scripts/upload-product-content.mjs"], {
      cwd: ROOT,
      encoding: "utf8",
    });
    const after = readFileSync(MANIFEST, "utf8");
    expect(after).toBe(before);
    expect(run.stdout ?? "").not.toMatch(/CollageSample/);
    expect(run.stderr ?? "").not.toMatch(/CollageSample/);
  });
});
