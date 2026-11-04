export function readReleaseSha(): string | undefined {
  const vercel = process.env["VERCEL_GIT_COMMIT_SHA"]?.trim();
  if (vercel) return vercel;
  const heroku = process.env["SOURCE_VERSION"]?.trim();
  return heroku || undefined;
}

export function readServerSentryDsn(): string | undefined {
  const dsn = process.env["SENTRY_DSN"]?.trim();
  return dsn || undefined;
}

export function buildSentryInitOptions(dsn: string, runtime: "server" | "client") {
  const release = readReleaseSha();
  return {
    dsn,
    enabled: true,
    environment: process.env["NODE_ENV"] ?? "development",
    ...(release ? { release } : {}),
    sendDefaultPii: false,
    dataCollection: {
      httpHeaders: {
        deny: ["authorization", "cookie", "set-cookie", "x-signature", "x-forwarded-for"],
      },
      cookies: { deny: ["session", "auth", "token", "email"] as string[] },
      urlQueryParams: { deny: ["token", "email", "code", "oobCode"] as string[] },
      ...(runtime === "server"
        ? {
            httpBody: {
              deny: ["authorization", "password", "email", "token", "secret"] as string[],
            },
          }
        : {}),
    },
    tracesSampleRate: runtime === "server" ? 0.1 : 0,
  };
}

export function isExpectedClientError(status: number): boolean {
  return status >= 400 && status < 500;
}

export function shouldReportHttpStatus(status: number): boolean {
  return status >= 500;
}

export function shouldReportThrownError(error: unknown): boolean {
  if (error == null || typeof error !== "object") return true;
  const status =
    "status" in error && typeof (error as { status?: unknown }).status === "number"
      ? (error as { status: number }).status
      : "statusCode" in error && typeof (error as { statusCode?: unknown }).statusCode === "number"
        ? (error as { statusCode: number }).statusCode
        : undefined;
  if (status === undefined) return true;
  return shouldReportHttpStatus(status);
}
