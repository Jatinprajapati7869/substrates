import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  getOAuthProtectedResourceMetadataUrl,
  LATEST_PROTOCOL_VERSION,
  type OAuthTokenVerifier,
} from "@modelcontextprotocol/server";
import { clearServerEnvCacheForTests } from "@/lib/env.server";
import { clearRateLimitStoreForTests, RECOMMEND_RATE_LIMIT } from "@/lib/rate-limit.server";
import { createCatalogMcpServer } from "@/lib/mcp-server/factory.server";
import {
  handleMcpProtocol,
  handleOAuthProtectedResourceMetadata,
} from "@/lib/mcp-server/handlers.server";
import { firebaseMcpIssuer } from "@/lib/mcp-server/firebase-verifier.server";
import { searchCatalog, catalogProduct } from "@/lib/mcp/catalog";

const savedEnv = { ...process.env };

function seedFirebaseAdminEnv(projectId = "substrates-mcp-test") {
  process.env["FIREBASE_PROJECT_ID"] = projectId;
  process.env["FIREBASE_CLIENT_EMAIL"] = "svc@test.iam.gserviceaccount.com";
  process.env["FIREBASE_PRIVATE_KEY"] =
    "-----BEGIN PRIVATE KEY-----\\ntest\\n-----END PRIVATE KEY-----";
  clearServerEnvCacheForTests();
}

const PRIVATE_FIELD_MARKERS = [
  "profiles",
  "purchases",
  "entitlement",
  "unlock",
  "product_content",
  "billingCustomerId",
  "userId",
  "displayName",
] as const;

function assertCatalogOnlyJson(text: string) {
  const lower = text.toLowerCase();
  for (const marker of PRIVATE_FIELD_MARKERS) {
    expect(lower).not.toContain(marker);
  }
}

const mockVerifier: OAuthTokenVerifier = {
  verifyAccessToken: vi.fn(async (token: string) => ({
    token,
    clientId: "mock-uid-123",
    scopes: [],
    expiresAt: Math.floor(Date.now() / 1000) + 3600,
  })),
};

function mcpMetadataRequest(origin: string): Request {
  const resourceUrl = new URL("/mcp", origin);
  const metadataUrl = getOAuthProtectedResourceMetadataUrl(resourceUrl);
  return new Request(metadataUrl);
}

function mcpRequest(origin: string, body: unknown, authorization?: string): Request {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Accept: "application/json, text/event-stream",
  };
  if (authorization) headers["Authorization"] = authorization;
  return new Request(`${origin}/mcp`, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  });
}

async function mcpAuthorizedJsonRpc(
  origin: string,
  method: string,
  params: Record<string, unknown> | undefined,
  id: number,
  verifier: OAuthTokenVerifier,
): Promise<Response> {
  const auth = "Bearer mock-firebase-token";
  const init = await handleMcpProtocol(
    mcpRequest(
      origin,
      {
        jsonrpc: "2.0",
        id: 0,
        method: "initialize",
        params: {
          protocolVersion: LATEST_PROTOCOL_VERSION,
          capabilities: {},
          clientInfo: { name: "vitest", version: "1.0.0" },
        },
      },
      auth,
    ),
    { verifier },
  );
  if (init.status !== 200) {
    throw new Error(`initialize failed ${init.status}: ${await init.text()}`);
  }
  await init.text();
  return handleMcpProtocol(mcpRequest(origin, { jsonrpc: "2.0", id, method, params }, auth), {
    verifier,
  });
}

beforeEach(() => {
  seedFirebaseAdminEnv();
  clearRateLimitStoreForTests();
});

afterEach(() => {
  for (const key of Object.keys(process.env)) {
    if (!(key in savedEnv)) delete process.env[key];
  }
  Object.assign(process.env, savedEnv);
  clearServerEnvCacheForTests();
  clearRateLimitStoreForTests();
  vi.clearAllMocks();
});

describe("S12 oauth protected resource metadata", () => {
  it("names Firebase as issuer and excludes Supabase or Lovable", async () => {
    const response = await handleOAuthProtectedResourceMetadata(
      mcpMetadataRequest("https://substrates.app"),
    );
    expect(response.status).toBe(200);
    const payload = (await response.json()) as {
      authorization_servers?: Array<{ issuer?: string }>;
      resource?: string;
    };
    const servers = payload.authorization_servers ?? [];
    const issuerEntry = servers[0];
    const issuer =
      typeof issuerEntry === "string"
        ? issuerEntry
        : ((issuerEntry as { issuer?: string } | undefined)?.issuer ?? "");
    expect(issuer).toBe(firebaseMcpIssuer());
    expect(issuer).toContain("securetoken.google.com");
    expect(JSON.stringify(payload).toLowerCase()).not.toContain("supabase");
    expect(JSON.stringify(payload).toLowerCase()).not.toContain("lovable");
  });
});

describe("S11 MCP client", () => {
  it("returns 401 with WWW-Authenticate pointing at resource metadata when unauthenticated", async () => {
    const response = await handleMcpProtocol(
      mcpRequest("https://substrates.app", { jsonrpc: "2.0", id: 1, method: "tools/list" }),
    );
    expect(response.status).toBe(401);
    const header = response.headers.get("WWW-Authenticate") ?? "";
    expect(header.toLowerCase()).toContain("oauth-protected-resource");
    expect(header).toContain("/.well-known/oauth-protected-resource");
  });

  it("lists search_catalog and get_product with a valid mocked token", async () => {
    const response = await mcpAuthorizedJsonRpc(
      "https://substrates.app",
      "tools/list",
      {},
      1,
      mockVerifier,
    );
    const raw = await response.text();
    expect(response.status).toBe(200);
    expect(raw).toContain("search_catalog");
    expect(raw).toContain("get_product");
    assertCatalogOnlyJson(raw);
  });

  it("never returns profile, purchase, entitlement, unlock, or product_content fields", async () => {
    const searchPayload = JSON.stringify(searchCatalog("aerials", "all", 5));
    const productPayload = JSON.stringify(catalogProduct("template", "aerials"));
    assertCatalogOnlyJson(searchPayload);
    assertCatalogOnlyJson(productPayload);

    const listResponse = await mcpAuthorizedJsonRpc(
      "https://substrates.app",
      "tools/call",
      { name: "get_product", arguments: { kind: "template", slug: "aerials" } },
      2,
      mockVerifier,
    );
    expect(listResponse.status).toBe(200);
    assertCatalogOnlyJson(await listResponse.text());

    const server = createCatalogMcpServer();
    expect(server).toBeTruthy();
  });

  it("rate limits authenticated MCP calls per uid", async () => {
    const auth = "Bearer mock-firebase-token";
    for (let i = 0; i < RECOMMEND_RATE_LIMIT.maxRequests; i++) {
      const ok = await handleMcpProtocol(
        mcpRequest(
          "https://substrates.app",
          {
            jsonrpc: "2.0",
            id: i,
            method: "initialize",
            params: {
              protocolVersion: LATEST_PROTOCOL_VERSION,
              capabilities: {},
              clientInfo: { name: "vitest", version: "1.0.0" },
            },
          },
          auth,
        ),
        { verifier: mockVerifier },
      );
      expect(ok.status).toBe(200);
      await ok.text();
    }
    const limited = await handleMcpProtocol(
      mcpRequest(
        "https://substrates.app",
        {
          jsonrpc: "2.0",
          id: RECOMMEND_RATE_LIMIT.maxRequests,
          method: "initialize",
          params: {
            protocolVersion: LATEST_PROTOCOL_VERSION,
            capabilities: {},
            clientInfo: { name: "vitest", version: "1.0.0" },
          },
        },
        auth,
      ),
      { verifier: mockVerifier },
    );
    expect(limited.status).toBe(429);
  });
});
