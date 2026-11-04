import { describe, expect, it } from "vitest";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const ROOT = process.cwd();

function walk(dir: string, filter: (rel: string) => boolean): string[] {
  const out: string[] = [];
  for (const name of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, name.name);
    const rel = p.replace(ROOT, "").replace(/^[/\\]/, "");
    if (name.isDirectory()) {
      if (name.name === "node_modules" || name.name === ".output") continue;
      out.push(...walk(p, filter));
    } else if (filter(rel)) out.push(p);
  }
  return out;
}

function scanPaths(): string[] {
  const paths: string[] = [];
  const srcRoot = join(ROOT, "src");
  paths.push(
    ...walk(srcRoot, (rel) => /\.(ts|tsx)$/.test(rel) && !rel.includes("no-stripe-sources")),
  );
  const scriptsRoot = join(ROOT, "scripts");
  if (statSync(scriptsRoot).isDirectory()) {
    paths.push(...walk(scriptsRoot, (rel) => /\.(ts|tsx|mjs|js)$/.test(rel)));
  }
  for (const name of readdirSync(ROOT)) {
    if (/\.(json|js|mjs|ts)$/.test(name)) paths.push(join(ROOT, name));
  }
  paths.push(join(ROOT, ".env.example"));
  return paths;
}

function stripeHits(file: string): boolean {
  const text = readFileSync(file, "utf8");
  return text.includes("STRIPE_") || text.includes("stripe.server");
}

describe("P23 no Stripe in product source", () => {
  it("has no STRIPE_ or stripe.server in src, scripts, root configs, or .env.example", () => {
    const hits = scanPaths()
      .filter(stripeHits)
      .map((p) => p.replace(ROOT, ""));
    expect(hits).toEqual([]);
  });
});
