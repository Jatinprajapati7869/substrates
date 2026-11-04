import { z } from "zod";

export type ServerEnvGroup = "firebaseAdmin" | "lemonsqueezy" | "openai" | "cron";

const FIREBASE_CLIENT_KEYS = [
  "VITE_FIREBASE_API_KEY",
  "VITE_FIREBASE_AUTH_DOMAIN",
  "VITE_FIREBASE_PROJECT_ID",
  "VITE_FIREBASE_APP_ID",
] as const;

const FIREBASE_ADMIN_KEYS = [
  "FIREBASE_PROJECT_ID",
  "FIREBASE_CLIENT_EMAIL",
  "FIREBASE_PRIVATE_KEY",
] as const;

const LEMONSQUEEZY_KEYS = [
  "LEMONSQUEEZY_API_KEY",
  "LEMONSQUEEZY_STORE_ID",
  "LEMONSQUEEZY_WEBHOOK_SECRET",
  "LEMONSQUEEZY_VARIANT_ID_SECTIONS",
  "LEMONSQUEEZY_VARIANT_ID_SECTIONS_TEMPLATES",
  "LEMONSQUEEZY_VARIANT_ID_LIFETIME",
] as const;

const LEMONSQUEEZY_VIDEO_VARIANT_KEYS = [
  "LEMONSQUEEZY_VARIANT_ID_VIDEO_MONTHLY",
  "LEMONSQUEEZY_VARIANT_ID_VIDEO_YEARLY",
] as const;

const cache = new Map<ServerEnvGroup, unknown>();

export function clearServerEnvCacheForTests(): void {
  cache.clear();
}

function envValue(name: string): string | undefined {
  const raw = process.env[name];
  if (raw === undefined || raw.trim() === "") return undefined;
  return raw;
}

function missingError(group: ServerEnvGroup, names: string[]): Error {
  return new Error(`Missing server environment (${group}): ${names.join(", ")}`);
}

const firebaseAdminShape = z.object({
  FIREBASE_PROJECT_ID: z.string().min(1),
  FIREBASE_CLIENT_EMAIL: z.string().min(1),
  FIREBASE_PRIVATE_KEY: z
    .string()
    .min(1)
    .transform((value) => value.replace(/\\n/g, "\n")),
});

const lemonsqueezyShape = z.object({
  LEMONSQUEEZY_API_KEY: z.string().min(1),
  LEMONSQUEEZY_STORE_ID: z.string().min(1),
  LEMONSQUEEZY_WEBHOOK_SECRET: z.string().min(1),
  LEMONSQUEEZY_VARIANT_ID_SECTIONS: z.string().min(1),
  LEMONSQUEEZY_VARIANT_ID_SECTIONS_TEMPLATES: z.string().min(1),
  LEMONSQUEEZY_VARIANT_ID_LIFETIME: z.string().min(1),
  LEMONSQUEEZY_VARIANT_ID_VIDEO_MONTHLY: z.string().min(1).optional(),
  LEMONSQUEEZY_VARIANT_ID_VIDEO_YEARLY: z.string().min(1).optional(),
  LEMONSQUEEZY_TEST_MODE: z.string().optional(),
});

const cronShape = z.object({
  CRON_SECRET: z.string().min(1),
  CRON_SECRET_PREVIOUS: z.string().min(1).optional(),
});

export type FirebaseAdminEnv = z.infer<typeof firebaseAdminShape>;
export type LemonSqueezyEnv = z.infer<typeof lemonsqueezyShape>;
export type OpenAiEnv = { OPENAI_API_KEY: string | undefined; OPENAI_MODEL: string };
export type CronEnv = z.infer<typeof cronShape>;

function parseFirebaseAdmin(): FirebaseAdminEnv {
  const keys = ["FIREBASE_PROJECT_ID", "FIREBASE_CLIENT_EMAIL", "FIREBASE_PRIVATE_KEY"] as const;
  const missing = keys.filter((key) => !envValue(key));
  if (missing.length) throw missingError("firebaseAdmin", [...missing]);
  const parsed = firebaseAdminShape.safeParse({
    FIREBASE_PROJECT_ID: envValue("FIREBASE_PROJECT_ID"),
    FIREBASE_CLIENT_EMAIL: envValue("FIREBASE_CLIENT_EMAIL"),
    FIREBASE_PRIVATE_KEY: envValue("FIREBASE_PRIVATE_KEY"),
  });
  if (!parsed.success)
    throw missingError(
      "firebaseAdmin",
      keys.filter((key) => !envValue(key)),
    );
  return parsed.data;
}

function parseLemonSqueezy(): LemonSqueezyEnv {
  const required = [
    "LEMONSQUEEZY_API_KEY",
    "LEMONSQUEEZY_STORE_ID",
    "LEMONSQUEEZY_WEBHOOK_SECRET",
    "LEMONSQUEEZY_VARIANT_ID_SECTIONS",
    "LEMONSQUEEZY_VARIANT_ID_SECTIONS_TEMPLATES",
    "LEMONSQUEEZY_VARIANT_ID_LIFETIME",
  ] as const;
  const missing = required.filter((key) => !envValue(key));
  if (missing.length) throw missingError("lemonsqueezy", [...missing]);
  const parsed = lemonsqueezyShape.safeParse({
    LEMONSQUEEZY_API_KEY: envValue("LEMONSQUEEZY_API_KEY"),
    LEMONSQUEEZY_STORE_ID: envValue("LEMONSQUEEZY_STORE_ID"),
    LEMONSQUEEZY_WEBHOOK_SECRET: envValue("LEMONSQUEEZY_WEBHOOK_SECRET"),
    LEMONSQUEEZY_VARIANT_ID_SECTIONS: envValue("LEMONSQUEEZY_VARIANT_ID_SECTIONS"),
    LEMONSQUEEZY_VARIANT_ID_SECTIONS_TEMPLATES: envValue(
      "LEMONSQUEEZY_VARIANT_ID_SECTIONS_TEMPLATES",
    ),
    LEMONSQUEEZY_VARIANT_ID_LIFETIME: envValue("LEMONSQUEEZY_VARIANT_ID_LIFETIME"),
    ...(envValue("LEMONSQUEEZY_VARIANT_ID_VIDEO_MONTHLY")
      ? { LEMONSQUEEZY_VARIANT_ID_VIDEO_MONTHLY: envValue("LEMONSQUEEZY_VARIANT_ID_VIDEO_MONTHLY") }
      : {}),
    ...(envValue("LEMONSQUEEZY_VARIANT_ID_VIDEO_YEARLY")
      ? { LEMONSQUEEZY_VARIANT_ID_VIDEO_YEARLY: envValue("LEMONSQUEEZY_VARIANT_ID_VIDEO_YEARLY") }
      : {}),
    ...(envValue("LEMONSQUEEZY_TEST_MODE")
      ? { LEMONSQUEEZY_TEST_MODE: envValue("LEMONSQUEEZY_TEST_MODE") }
      : {}),
  });
  if (!parsed.success) throw missingError("lemonsqueezy", [...missing]);
  return parsed.data;
}

function parseOpenAi(): OpenAiEnv {
  const model = envValue("OPENAI_MODEL") ?? "gpt-4o-mini";
  const apiKey = envValue("OPENAI_API_KEY");
  return { OPENAI_API_KEY: apiKey, OPENAI_MODEL: model };
}

function parseCron(): CronEnv {
  const keys = ["CRON_SECRET"] as const;
  const missing = keys.filter((key) => !envValue(key));
  if (missing.length) throw missingError("cron", [...missing]);
  const previous = envValue("CRON_SECRET_PREVIOUS");
  const parsed = cronShape.safeParse({
    CRON_SECRET: envValue("CRON_SECRET"),
    ...(previous ? { CRON_SECRET_PREVIOUS: previous } : {}),
  });
  if (!parsed.success) throw missingError("cron", [...missing]);
  return parsed.data;
}

export function getServerEnv(group: "firebaseAdmin"): FirebaseAdminEnv;
export function getServerEnv(group: "lemonsqueezy"): LemonSqueezyEnv;
export function getServerEnv(group: "openai"): OpenAiEnv;
export function getServerEnv(group: "cron"): CronEnv;
export function getServerEnv(
  group: ServerEnvGroup,
): FirebaseAdminEnv | LemonSqueezyEnv | OpenAiEnv | CronEnv {
  const hit = cache.get(group);
  if (hit !== undefined) return hit as FirebaseAdminEnv | LemonSqueezyEnv | OpenAiEnv | CronEnv;

  let value: FirebaseAdminEnv | LemonSqueezyEnv | OpenAiEnv | CronEnv;
  switch (group) {
    case "firebaseAdmin":
      value = parseFirebaseAdmin();
      break;
    case "lemonsqueezy":
      value = parseLemonSqueezy();
      break;
    case "openai":
      value = parseOpenAi();
      break;
    case "cron":
      value = parseCron();
      break;
    default: {
      const never: never = group;
      throw new Error(String(never));
    }
  }
  cache.set(group, value);
  return value;
}

function groupKeysPresent(keys: readonly string[]): boolean {
  return keys.every((key) => envValue(key) !== undefined);
}

export function isFirebaseClientEnvConfigured(): boolean {
  return groupKeysPresent(FIREBASE_CLIENT_KEYS);
}

export function isServerEnvGroupConfigured(
  group: Exclude<ServerEnvGroup, "openai" | "cron">,
): boolean {
  switch (group) {
    case "firebaseAdmin":
      return groupKeysPresent(FIREBASE_ADMIN_KEYS);
    case "lemonsqueezy":
      return groupKeysPresent(LEMONSQUEEZY_KEYS);
    default: {
      const never: never = group;
      throw new Error(String(never));
    }
  }
}

export function isOpenAiEnvConfigured(): boolean {
  return envValue("OPENAI_API_KEY") !== undefined;
}

/** Both video variant ids set — required before video checkout is offered (S22 / P26). */
export function isVideoSkillsCheckoutConfigured(): boolean {
  return groupKeysPresent(LEMONSQUEEZY_VIDEO_VARIANT_KEYS);
}

export type SentryServerEnv = {
  SENTRY_DSN: string | undefined;
  releaseSha: string | undefined;
};

export function getSentryServerEnv(): SentryServerEnv {
  return {
    SENTRY_DSN: envValue("SENTRY_DSN"),
    releaseSha: envValue("VERCEL_GIT_COMMIT_SHA") ?? envValue("SOURCE_VERSION"),
  };
}
