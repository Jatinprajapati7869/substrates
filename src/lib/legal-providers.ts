import type { ServerEnvGroup } from "@/lib/env.server";

/** Processors named on the privacy policy — must match prose in `privacy.tsx` and real integrations. */
export type LegalPrivacyProcessor = {
  /** Substring that must appear in the privacy policy article source. */
  privacyLabel: string;
  /** Optional `getServerEnv` group when the processor is env-gated. */
  serverEnvGroup?: Exclude<ServerEnvGroup, "cron">;
  /** Listed even when env is optional (hosting, optional monitoring). */
  optional?: boolean;
};

export const LEGAL_PRIVACY_PROCESSORS: LegalPrivacyProcessor[] = [
  { privacyLabel: "Google Firebase", serverEnvGroup: "firebaseAdmin" },
  { privacyLabel: "Lemon Squeezy", serverEnvGroup: "lemonsqueezy" },
  { privacyLabel: "Heroku", optional: true },
  { privacyLabel: "OpenAI", serverEnvGroup: "openai", optional: true },
  { privacyLabel: "Sentry", optional: true },
];

/** Strings that must not appear on public legal routes (stale import / wrong stack). */
export const LEGAL_FORBIDDEN_STRINGS = [
  "Stripe",
  "Supabase",
  "PostHog",
  "Vercel",
  "Oversight",
  "[LEGAL ENTITY]",
  "[LEGAL ADDRESS]",
  "[GOVERNING LAW]",
] as const;
