import {
  isFirebaseClientEnvConfigured,
  isOpenAiEnvConfigured,
  isServerEnvGroupConfigured,
  isVideoSkillsCheckoutConfigured,
} from "./env.server";
import { lemonSqueezyHealthWarnings } from "./billing/lemonsqueezy-provider";

export type HealthConfigured = {
  firebaseClient: boolean;
  firebaseAdmin: boolean;
  lemonsqueezy: boolean;
  videoConfigured: boolean;
  openai: boolean;
};

export type HealthPayload = {
  ok: boolean;
  commit: string | null;
  configured: HealthConfigured;
  warnings?: string[];
};

function deploymentCommitSha(): string | null {
  return process.env["VERCEL_GIT_COMMIT_SHA"] ?? process.env["SOURCE_VERSION"] ?? null;
}

export function buildHealthPayload(): HealthPayload {
  const warnings = lemonSqueezyHealthWarnings();
  return {
    ok: true,
    commit: deploymentCommitSha(),
    configured: {
      firebaseClient: isFirebaseClientEnvConfigured(),
      firebaseAdmin: isServerEnvGroupConfigured("firebaseAdmin"),
      lemonsqueezy: isServerEnvGroupConfigured("lemonsqueezy"),
      videoConfigured: isVideoSkillsCheckoutConfigured(),
      openai: isOpenAiEnvConfigured(),
    },
    ...(warnings.length ? { warnings } : {}),
  };
}
