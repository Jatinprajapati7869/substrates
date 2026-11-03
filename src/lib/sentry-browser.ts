import type { AnyRouter } from "@tanstack/react-router";
import * as Sentry from "@sentry/tanstackstart-react";
import { buildSentryInitOptions } from "./sentry-config";
import { sentryBeforeSend, type ScrubbableSentryEvent } from "./sentry-scrub";

let initialized = false;

function readClientSentryDsn(): string | undefined {
  const dsn = import.meta.env["VITE_SENTRY_DSN"]?.trim();
  return dsn || undefined;
}

function readClientReleaseSha(): string | undefined {
  const vercel = import.meta.env["VITE_VERCEL_GIT_COMMIT_SHA"]?.trim();
  if (vercel) return vercel;
  const heroku = import.meta.env["VITE_SOURCE_VERSION"]?.trim();
  return heroku || undefined;
}

export function initSentryClient(router: AnyRouter): void {
  if (initialized || router.isServer) return;
  const dsn = readClientSentryDsn();
  if (!dsn) return;
  const release = readClientReleaseSha();
  const base = buildSentryInitOptions(dsn, "client");
  Sentry.init({
    ...base,
    ...(release ? { release } : {}),
    integrations: [Sentry.tanstackRouterBrowserTracingIntegration(router)],
    beforeSend: (event, _hint) =>
      sentryBeforeSend(event as unknown as ScrubbableSentryEvent) as unknown as typeof event,
  });
  initialized = true;
}

export function captureClientException(error: unknown): void {
  if (!initialized) return;
  Sentry.captureException(error);
}

export function isSentryClientEnabled(): boolean {
  return initialized;
}
