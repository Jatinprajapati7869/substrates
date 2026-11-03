import * as Sentry from "@sentry/tanstackstart-react";
import {
  buildSentryInitOptions,
  readServerSentryDsn,
  shouldReportHttpStatus,
  shouldReportThrownError,
} from "./sentry-config";
import { sentryBeforeSend, type ScrubbableSentryEvent } from "./sentry-scrub";

let initialized = false;

export function isSentryServerEnabled(): boolean {
  return initialized;
}

export function initSentryServer(): void {
  if (initialized) return;
  const dsn = readServerSentryDsn();
  if (!dsn) return;
  Sentry.init({
    ...buildSentryInitOptions(dsn, "server"),
    beforeSend: (event, _hint) =>
      sentryBeforeSend(event as unknown as ScrubbableSentryEvent) as unknown as typeof event,
  });
  initialized = true;
}

export function captureServerException(
  error: unknown,
  context?: { tags?: Record<string, string> },
): void {
  if (!initialized) return;
  if (!shouldReportThrownError(error)) return;
  Sentry.captureException(error, context?.tags ? { tags: { ...context.tags } } : undefined);
}

export function captureServerMessage(
  message: string,
  context?: { tags?: Record<string, string> },
): void {
  if (!initialized) return;
  Sentry.captureMessage(message, context?.tags ? { tags: context.tags } : undefined);
}

export function captureHttpFailure(
  status: number,
  message: string,
  context?: { tags?: Record<string, string> },
): void {
  if (!initialized) return;
  if (!shouldReportHttpStatus(status)) return;
  Sentry.captureMessage(message, {
    level: "error",
    ...(context?.tags ? { tags: { ...context.tags } } : {}),
  });
}

initSentryServer();
