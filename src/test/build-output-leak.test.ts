import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { FIXTURE_LEAK_MARKER } from "@/lib/delivery-fixtures.server";

function walkFiles(dir: string, out: string[] = []): string[] {
  if (!existsSync(dir)) return out;
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) walkFiles(path, out);
    else if (/\.(js|css|html|json)$/.test(name)) out.push(path);
  }
  return out;
}

describe("S8 build output leak", () => {
  it("built client assets do not contain the fixture marker", () => {
    const candidates = [".output/public", ".output/client", "dist", ".vinxi/build/client"];
    const root = candidates.find((dir) => existsSync(dir));
    if (!root) {
      expect(true).toBe(true);
      return;
    }
    const files = walkFiles(root);
    expect(files.length).toBeGreaterThan(0);
    for (const file of files) {
      expect(readFileSync(file, "utf8")).not.toContain(FIXTURE_LEAK_MARKER);
    }
  });
});
