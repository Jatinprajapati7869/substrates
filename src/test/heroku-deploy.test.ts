import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const pkg = JSON.parse(readFileSync("package.json", "utf8")) as {
  engines?: { node?: string };
  scripts?: Record<string, string>;
};
const procfile = readFileSync("Procfile", "utf8");
const appJson = JSON.parse(readFileSync("app.json", "utf8")) as {
  env?: Record<string, { value?: string; required?: boolean }>;
  buildpacks?: { url: string }[];
};

describe("Heroku deploy config", () => {
  it("pins Node 22 for the Heroku Node buildpack", () => {
    expect(pkg.engines?.node).toMatch(/^22(\.x)?$/);
  });

  it("sets NITRO_PRESET=node-server on Heroku build via heroku-postbuild", () => {
    const script = pkg.scripts?.["heroku-postbuild"] ?? "";
    expect(script).toContain("NITRO_PRESET=node-server");
    expect(script).toMatch(/npm run build/);
  });

  it("Procfile binds 0.0.0.0 and runs the Nitro server entry", () => {
    expect(procfile).toMatch(/HOST=0\.0\.0\.0/);
    expect(procfile).toContain("node .output/server/index.mjs");
  });

  it("app.json installs devDependencies at build and sets Nitro preset", () => {
    expect(appJson.buildpacks?.some((b) => b.url.includes("heroku/nodejs"))).toBe(true);
    expect(appJson.env?.["NPM_CONFIG_PRODUCTION"]?.value).toBe("false");
    expect(appJson.env?.["NITRO_PRESET"]?.value).toBe("node-server");
    expect(appJson.env?.["NITRO_PRESET"]?.required).toBe(true);
  });
});
