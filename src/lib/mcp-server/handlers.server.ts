import {
  createMcpHandler,
  getOAuthProtectedResourceMetadataUrl,
  oauthMetadataResponse,
  requireBearerAuth,
  type AuthMetadataOptions,
} from "@modelcontextprotocol/server";
import { createCatalogMcpServer } from "./factory.server";
import { createFirebaseMcpVerifier, firebaseMcpIssuer } from "./firebase-verifier.server";

const MCP_PATH = "/mcp";

function requestOrigin(request: Request): URL {
  const forwardedHost = request.headers.get("x-forwarded-host");
  const forwardedProto = request.headers.get("x-forwarded-proto") ?? "https";
  if (forwardedHost) {
    return new URL(`${forwardedProto}://${forwardedHost.split(",")[0]?.trim()}`);
  }
  return new URL(request.url);
}

function resourceServerUrl(request: Request): URL {
  const origin = requestOrigin(request);
  return new URL(MCP_PATH, origin);
}

function authMetadataOptions(request: Request): AuthMetadataOptions {
  const issuer = firebaseMcpIssuer();
  const resource = resourceServerUrl(request);
  return {
    resourceServerUrl: resource,
    resourceName: "Substrates",
    serviceDocumentationUrl: new URL("/signin", resource),
    oauthMetadata: {
      issuer,
      authorization_endpoint: `${issuer}/authorize`,
      token_endpoint: `${issuer}/token`,
      jwks_uri: "https://www.googleapis.com/service_accounts/v1/metadata/jwk/securetoken@system.gserviceaccount.com",
      response_types_supported: ["token"],
      grant_types_supported: ["implicit"],
    },
  };
}

const mcpHandler = createMcpHandler(() => createCatalogMcpServer());

function bearerGate(request: Request) {
  const metadataUrl = getOAuthProtectedResourceMetadataUrl(resourceServerUrl(request)).href;
  return requireBearerAuth({
    verifier: createFirebaseMcpVerifier(),
    resourceMetadataUrl: metadataUrl,
  })(request);
}

export async function handleOAuthProtectedResourceMetadata(request: Request): Promise<Response> {
  const metadata = oauthMetadataResponse(request, authMetadataOptions(request));
  if (metadata) return metadata;
  return new Response("Not Found", { status: 404 });
}

export async function handleMcpProtocol(request: Request): Promise<Response> {
  const auth = await bearerGate(request);
  if (auth instanceof Response) return auth;
  return mcpHandler.fetch(request, { authInfo: auth });
}

export function tanstackMcpHandler({ request }: { request: Request }) {
  return handleMcpProtocol(request);
}

export function tanstackOAuthMetadataHandler({ request }: { request: Request }) {
  return handleOAuthProtectedResourceMetadata(request);
}
