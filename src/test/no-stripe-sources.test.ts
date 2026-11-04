import { describe, expect, it } from "vitest";
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

function walk(dir: string): string[] {
  const out: string[] = [];
  for (const name of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, name.name);
    if (name.isDirectory()) out.push(...walk(p));
    else if (/\.(ts|tsx)$/.test(name.name) && !name.name.includes("no-stripe-sources")) out.push(p);
  }
  return out;
}

describe("P23 no Stripe in src", () => {
  it("has no STRIPE_ or stripe.server references under src/", () => {
    const root = join(process.cwd(), "src");
    const hits: string[] = [];
    for (const file of walk(root)) {
      const text = readFileSync(file, "utf8");
      if (text.includes("STRIPE_") || text.includes("stripe.server")) {
        hits.push(file.replace(process.cwd(), ""));
      }
    }
    expect(hits).toEqual([]);
  });
});
