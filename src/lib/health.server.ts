import {
  isFirebaseClientEnvConfigured,
  isOpenAiEnvConfigured,
  isServerEnvGroupConfigured,
} from "./env.server";

export type HealthConfigured = {
  firebaseClient: boolean;
  firebaseAdmin: boolean;
  stripe: boolean;
  openai: boolean;
};

export type HealthPayload = {
  ok: boolean;
  commit: string | null;
  configured: HealthConfigured;
};

function deploymentCommitSha(): string | null {
  return process.env["VERCEL_GIT_COMMIT_SHA"] ?? process.env["SOURCE_VERSION"] ?? null;
}

export function buildHealthPayload(): HealthPayload {
  return {
    ok: true,
    commit: deploymentCommitSha(),
    configured: {
      firebaseClient: isFirebaseClientEnvConfigured(),
      firebaseAdmin: isServerEnvGroupConfigured("firebaseAdmin"),
      stripe: isServerEnvGroupConfigured("stripe"),
      openai: isOpenAiEnvConfigured(),
    },
  };
}
