import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { LEGAL_ADDRESS, LEGAL_ENTITY, SUPPORT_EMAIL } from "@/lib/brand";
import { LEGAL_FORBIDDEN_STRINGS, LEGAL_PRIVACY_PROCESSORS } from "@/lib/legal-providers";

const LEGAL_ROUTE_FILES = [
  "src/routes/privacy.tsx",
  "src/routes/terms.tsx",
  "src/routes/refunds.tsx",
  "src/routes/help.tsx",
] as const;

function readRepoFile(relativePath: string): string {
  return readFileSync(join(process.cwd(), relativePath), "utf8");
}

describe("S18 legal page copy", () => {
  it("S18 brand operator constants match owner facts", () => {
    expect(LEGAL_ENTITY).toBe("Substrates");
    expect(LEGAL_ADDRESS).toBe("Chennai, India");
    expect(SUPPORT_EMAIL).toBe("jatin@substrates.app");
  });

  for (const file of LEGAL_ROUTE_FILES) {
    it(`S18 ${file} contains no forbidden stale strings`, () => {
      const src = readRepoFile(file);
      for (const forbidden of LEGAL_FORBIDDEN_STRINGS) {
        expect(src, `found ${forbidden}`).not.toContain(forbidden);
      }
    });
  }

  it("S18 privacy page names every LEGAL_PRIVACY_PROCESSORS entry", () => {
    const privacy = readRepoFile("src/routes/privacy.tsx");
    for (const processor of LEGAL_PRIVACY_PROCESSORS) {
      expect(privacy).toContain(processor.privacyLabel);
    }
  });

  it("S18 LEGAL_PRIVACY_PROCESSORS env groups exist in env.server", () => {
    const envSrc = readRepoFile("src/lib/env.server.ts");
    for (const processor of LEGAL_PRIVACY_PROCESSORS) {
      if (processor.serverEnvGroup) {
        expect(envSrc).toContain(`"${processor.serverEnvGroup}"`);
      }
    }
  });

  it("S18 legal routes mention Lemon Squeezy merchant of record", () => {
    expect(readRepoFile("src/routes/terms.tsx")).toMatch(/Lemon Squeezy/i);
    expect(readRepoFile("src/routes/refunds.tsx")).toMatch(/Lemon Squeezy/i);
    expect(readRepoFile("src/routes/privacy.tsx")).toMatch(/Lemon Squeezy/i);
  });
});
