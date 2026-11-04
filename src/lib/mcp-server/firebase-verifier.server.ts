import {
  OAuthError,
  OAuthErrorCode,
  type AuthInfo,
  type OAuthTokenVerifier,
} from "@modelcontextprotocol/server";
import { getAdminAuth } from "@/integrations/firebase/admin.server";
import { getServerEnv } from "@/lib/env.server";

function firebaseProjectId(): string {
  return getServerEnv("firebaseAdmin").FIREBASE_PROJECT_ID;
}

export function firebaseMcpIssuer(): string {
  return `https://securetoken.google.com/${firebaseProjectId()}`;
}

export function createFirebaseMcpVerifier(): OAuthTokenVerifier {
  const projectId = firebaseProjectId();
  return {
    async verifyAccessToken(token: string): Promise<AuthInfo> {
      try {
        const decoded = await (await getAdminAuth()).verifyIdToken(token);
        if (decoded.aud !== projectId) {
          throw new OAuthError(OAuthErrorCode.InvalidToken, "Token audience mismatch");
        }
        const exp = decoded.exp;
        if (typeof exp !== "number") {
          throw new OAuthError(OAuthErrorCode.InvalidToken, "Token missing exp");
        }
        return {
          token,
          clientId: decoded.sub ?? decoded.uid,
          scopes: [],
          expiresAt: exp,
        };
      } catch (error) {
        if (error instanceof OAuthError) throw error;
        throw new OAuthError(OAuthErrorCode.InvalidToken, "Invalid Firebase ID token");
      }
    },
  };
}
