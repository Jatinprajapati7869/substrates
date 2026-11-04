import {
  createMcpHandler,
  getOAuthProtectedResourceMetadataUrl,
  oauthMetadataResponse,
  requireBearerAuth,
  type AuthMetadataOptions,
  type OAuthTokenVerifier,
} from "@modelcontextprotocol/server";
import { createCatalogMcpServer } from "./factory.server";
import { createFirebaseMcpVerifier, firebaseMcpIssuer } from "./firebase-verifier.server";
import { consumeMcpRateLimit } from "@/lib/mcp-rate-limit.server";
import { SITE_ORIGIN } from "@/lib/brand";

const MCP_PATH = "/mcp";

function resourceServerUrl(): URL {
  return new URL(MCP_PATH, SITE_ORIGIN);
}

function authMetadataOptions(_request: Request): AuthMetadataOptions {
  const issuer = firebaseMcpIssuer();
  const resource = resourceServerUrl();
  return {
    resourceServerUrl: resource,
    resourceName: "Substrates",
    serviceDocumentationUrl: new URL("/signin", resource),
    oauthMetadata: {
      issuer,
      authorization_endpoint: `${issuer}/authorize`,
      token_endpoint: `${issuer}/token`,
      jwks_uri:
        "https://www.googleapis.com/service_accounts/v1/metadata/jwk/securetoken@system.gserviceaccount.com",
      response_types_supported: ["token"],
      grant_types_supported: ["implicit"],
    },
  };
}

const mcpHandler = createMcpHandler(() => createCatalogMcpServer());

function bearerGate(request: Request, verifier?: OAuthTokenVerifier) {
  const metadataUrl = getOAuthProtectedResourceMetadataUrl(resourceServerUrl());
  return requireBearerAuth({
    verifier: verifier ?? createFirebaseMcpVerifier(),
    resourceMetadataUrl: metadataUrl,
  })(request);
}

export async function handleMcpProtocol(
  request: Request,
  options?: { verifier?: OAuthTokenVerifier },
): Promise<Response> {
  const auth = await bearerGate(request, options?.verifier);
  if (auth instanceof Response) return auth;
  if (!consumeMcpRateLimit(auth.clientId)) {
    return new Response("Too Many Requests", { status: 429 });
  }
  return mcpHandler.fetch(request, { authInfo: auth });
}

export async function handleOAuthProtectedResourceMetadata(request: Request): Promise<Response> {
  const metadata = oauthMetadataResponse(request, authMetadataOptions(request));
  if (metadata) return metadata;
  return new Response("Not Found", { status: 404 });
}

export function tanstackMcpHandler({ request }: { request: Request }) {
  return handleMcpProtocol(request);
}

export function tanstackOAuthMetadataHandler({ request }: { request: Request }) {
  return handleOAuthProtectedResourceMetadata(request);
}
