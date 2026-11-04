/** Host-agnostic security headers applied in src/server.ts on every response. */

function firebaseAuthDomainHost(): string | undefined {
  const raw = process.env["VITE_FIREBASE_AUTH_DOMAIN"]?.trim();
  if (!raw) return undefined;
  return raw.replace(/^https?:\/\//, "").replace(/\/$/, "");
}

export function buildContentSecurityPolicyReportOnly(): string {
  const authHost = firebaseAuthDomainHost();
  const connectSrc = [
    "'self'",
    "https://identitytoolkit.googleapis.com",
    "https://securetoken.googleapis.com",
    "https://firestore.googleapis.com",
    "https://firebase.googleapis.com",
    "https://firebaseinstallations.googleapis.com",
    "https://www.googleapis.com",
    ...(authHost ? [`https://${authHost}`] : []),
  ];

  const directives = [
    "default-src 'self'",
    "base-uri 'self'",
    "object-src 'none'",
    "frame-ancestors 'none'",
    `script-src 'self' 'unsafe-inline' https://apis.google.com https://www.gstatic.com`,
    `style-src 'self' 'unsafe-inline'`,
    `font-src 'self' data:`,
    `img-src 'self' data: blob: https://cdn.prod.website-files.com https://*.webflow.io https://y4pdgnepgswqffpt.public.blob.vercel-storage.com https://supply.madebyoversight.com`,
    `connect-src ${connectSrc.join(" ")}`,
    `frame-src 'self' https://accounts.google.com`,
    `form-action 'self'`,
  ];
  return directives.join("; ");
}

export function securityResponseHeaders(): Record<string, string> {
  return {
    "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
    "X-Content-Type-Options": "nosniff",
    "Referrer-Policy": "strict-origin-when-cross-origin",
    "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
    "X-Frame-Options": "DENY",
    "Content-Security-Policy-Report-Only": buildContentSecurityPolicyReportOnly(),
  };
}

export function withSecurityHeaders(response: Response): Response {
  const headers = new Headers(response.headers);
  for (const [name, value] of Object.entries(securityResponseHeaders())) {
    if (!headers.has(name)) headers.set(name, value);
  }
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}
