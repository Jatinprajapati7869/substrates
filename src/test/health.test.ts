import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { buildHealthPayload } from "@/lib/health.server";
import { clearServerEnvCacheForTests } from "@/lib/env.server";

const savedEnv = { ...process.env };

beforeEach(() => {
  clearServerEnvCacheForTests();
});

afterEach(() => {
  for (const key of Object.keys(process.env)) {
    if (!(key in savedEnv)) delete process.env[key];
  }
  Object.assign(process.env, savedEnv);
  clearServerEnvCacheForTests();
});

describe("buildHealthPayload", () => {
  it("reports configured flags without secret values in JSON", () => {
    delete process.env["FIREBASE_PROJECT_ID"];
    delete process.env["STRIPE_SECRET_KEY"];
    delete process.env["OPENAI_API_KEY"];
    process.env["VITE_FIREBASE_API_KEY"] = "pk";
    process.env["VITE_FIREBASE_AUTH_DOMAIN"] = "x.firebaseapp.com";
    process.env["VITE_FIREBASE_PROJECT_ID"] = "proj";
    process.env["VITE_FIREBASE_APP_ID"] = "app";
    process.env["STRIPE_SECRET_KEY"] = "sk_live_never_leak";
    delete process.env["STRIPE_WEBHOOK_SECRET"];

    const body = buildHealthPayload();
    const serialized = JSON.stringify(body);

    expect(body.ok).toBe(true);
    expect(body.configured.firebaseClient).toBe(true);
    expect(body.configured.firebaseAdmin).toBe(false);
    expect(body.configured.stripe).toBe(false);
    expect(body.configured.openai).toBe(false);
    expect(serialized).not.toContain("sk_live_never_leak");
    expect(serialized).not.toContain("pk");
  });

  it("uses SOURCE_VERSION for commit when set", () => {
    delete process.env["VERCEL_GIT_COMMIT_SHA"];
    process.env["SOURCE_VERSION"] = "heroku-sha-abc";

    expect(buildHealthPayload().commit).toBe("heroku-sha-abc");
  });
});
