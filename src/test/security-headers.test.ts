import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { existsSync } from "node:fs";
import { spawn, type ChildProcess } from "node:child_process";
import { securityResponseHeaders } from "@/lib/security-headers.server";

describe("S13 securityResponseHeaders", () => {
  it("includes baseline headers and CSP report-only", () => {
    const headers = securityResponseHeaders();
    expect(headers["Strict-Transport-Security"]).toContain("max-age=");
    expect(headers["X-Content-Type-Options"]).toBe("nosniff");
    expect(headers["Referrer-Policy"]).toBe("strict-origin-when-cross-origin");
    expect(headers["Permissions-Policy"]).toContain("camera=()");
    expect(headers["X-Frame-Options"]).toBe("DENY");
    expect(headers["Content-Security-Policy-Report-Only"]).toContain("frame-ancestors 'none'");
  });
});

const builtServerPath = ".output/server/index.mjs";
const builtServerPort = "8208";

describe.skipIf(!existsSync(builtServerPath))("S13 built server headers", () => {
  let proc: ChildProcess | undefined;

  beforeAll(async () => {
    proc = spawn(process.execPath, [builtServerPath], {
      cwd: process.cwd(),
      env: {
        ...process.env,
        PORT: builtServerPort,
        VITE_FIREBASE_API_KEY: process.env["VITE_FIREBASE_API_KEY"] ?? "placeholder",
        VITE_FIREBASE_AUTH_DOMAIN:
          process.env["VITE_FIREBASE_AUTH_DOMAIN"] ?? "placeholder.firebaseapp.com",
        VITE_FIREBASE_PROJECT_ID: process.env["VITE_FIREBASE_PROJECT_ID"] ?? "placeholder",
        VITE_FIREBASE_APP_ID: process.env["VITE_FIREBASE_APP_ID"] ?? "placeholder",
      },
      stdio: "ignore",
    });
    const deadline = Date.now() + 30_000;
    while (Date.now() < deadline) {
      try {
        const res = await fetch(`http://127.0.0.1:${builtServerPort}/api/health`);
        if (res.ok) return;
      } catch {
        await new Promise((r) => setTimeout(r, 250));
      }
    }
    throw new Error("built server did not start");
  }, 60_000);

  afterAll(async () => {
    proc?.kill();
  });

  it("sets security headers on GET /", async () => {
    const res = await fetch(`http://127.0.0.1:${builtServerPort}/`);
    expect(res.status).toBe(200);
    expect(res.headers.get("x-content-type-options")).toBe("nosniff");
    expect(res.headers.get("referrer-policy")).toBe("strict-origin-when-cross-origin");
    expect(res.headers.get("content-security-policy-report-only")).toContain("default-src 'self'");
  });
});
