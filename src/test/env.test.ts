import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { clearServerEnvCacheForTests, getServerEnv } from "@/lib/env.server";

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

describe("getServerEnv", () => {
  it("lists missing stripe variable names without secret values", () => {
    delete process.env["STRIPE_SECRET_KEY"];
    delete process.env["STRIPE_WEBHOOK_SECRET"];
    process.env["STRIPE_SECRET_KEY"] = "sk_test_never_in_error";
    delete process.env["STRIPE_WEBHOOK_SECRET"];

    let message = "";
    try {
      getServerEnv("stripe");
    } catch (e) {
      message = e instanceof Error ? e.message : String(e);
    }
    expect(message).toContain("STRIPE_WEBHOOK_SECRET");
    expect(message).not.toContain("sk_test_never_in_error");
  });

  it("lists missing firebase admin variable names only", () => {
    delete process.env["FIREBASE_PROJECT_ID"];
    delete process.env["FIREBASE_CLIENT_EMAIL"];
    delete process.env["FIREBASE_PRIVATE_KEY"];
    process.env["FIREBASE_PRIVATE_KEY"] =
      "-----BEGIN PRIVATE KEY-----\\nsekret\\n-----END PRIVATE KEY-----";

    let message = "";
    try {
      getServerEnv("firebaseAdmin");
    } catch (e) {
      message = e instanceof Error ? e.message : String(e);
    }
    expect(message).toContain("FIREBASE_PROJECT_ID");
    expect(message).toContain("FIREBASE_CLIENT_EMAIL");
    expect(message).not.toContain("sekret");
  });

  it("returns undefined OpenAI key when optional and applies model default", () => {
    delete process.env["OPENAI_API_KEY"];
    delete process.env["OPENAI_MODEL"];

    const env = getServerEnv("openai");
    expect(env.OPENAI_API_KEY).toBeUndefined();
    expect(env.OPENAI_MODEL).toBe("gpt-4o-mini");
  });

  it("unescapes firebase private key newlines", () => {
    process.env["FIREBASE_PROJECT_ID"] = "proj";
    process.env["FIREBASE_CLIENT_EMAIL"] = "svc@proj.iam.gserviceaccount.com";
    process.env["FIREBASE_PRIVATE_KEY"] = "line1\\nline2";

    const env = getServerEnv("firebaseAdmin");
    expect(env.FIREBASE_PRIVATE_KEY).toBe("line1\nline2");
  });
});
