export const FILTERED = "[Filtered]" as const;

const SENSITIVE_KEY_PARTS = [
  "authorization",
  "cookie",
  "set-cookie",
  "password",
  "secret",
  "token",
  "email",
  "x-signature",
  "private_key",
  "api_key",
] as const;

function isSensitiveKey(key: string): boolean {
  const lower = key.toLowerCase();
  return SENSITIVE_KEY_PARTS.some((part) => lower.includes(part));
}

export function scrubSensitiveValue(key: string, value: unknown): unknown {
  if (isSensitiveKey(key)) return FILTERED;
  if (value && typeof value === "object" && !Array.isArray(value)) {
    return scrubSensitiveRecord(value as Record<string, unknown>);
  }
  return value;
}

export function scrubSensitiveRecord(record: Record<string, unknown>): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(record)) {
    out[key] = scrubSensitiveValue(key, value);
  }
  return out;
}

export function scrubHttpHeaders(headers: Record<string, string>): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [key, value] of Object.entries(headers)) {
    out[key] = isSensitiveKey(key) ? FILTERED : value;
  }
  return out;
}

export function scrubRequestData(data: unknown): unknown {
  if (data == null) return data;
  if (typeof data === "string") {
    try {
      return scrubRequestData(JSON.parse(data) as unknown);
    } catch {
      return FILTERED;
    }
  }
  if (Array.isArray(data)) return data.map((item) => scrubRequestData(item));
  if (typeof data === "object") return scrubSensitiveRecord(data as Record<string, unknown>);
  return data;
}

export type ScrubbableSentryEvent = {
  user?: { email?: string; [key: string]: unknown };
  request?: {
    headers?: Record<string, string>;
    cookies?: Record<string, string>;
    data?: unknown;
    [key: string]: unknown;
  };
  [key: string]: unknown;
};

export function scrubEventForSentry<T extends ScrubbableSentryEvent>(event: T): T {
  const next = { ...event };
  if (next.user?.email) {
    next.user = { ...next.user };
    delete next.user.email;
  }
  if (next.request) {
    const request = { ...next.request };
    if (request.headers) request.headers = scrubHttpHeaders(request.headers);
    if (request.cookies) {
      const cookies: Record<string, string> = {};
      for (const key of Object.keys(request.cookies)) cookies[key] = FILTERED;
      request.cookies = cookies;
    }
    if (request.data !== undefined) request.data = scrubRequestData(request.data);
    next.request = request;
  }
  return next;
}

export function sentryBeforeSend<E extends ScrubbableSentryEvent>(event: E): E {
  return scrubEventForSentry(event);
}
