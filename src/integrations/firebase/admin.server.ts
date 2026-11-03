import type { App } from "firebase-admin/app";
import type { Auth } from "firebase-admin/auth";
import type { Firestore } from "firebase-admin/firestore";

let appPromise: Promise<App> | undefined;

async function adminApp(): Promise<App> {
  if (!appPromise) {
    appPromise = (async () => {
      const { cert, getApps, initializeApp } = await import("firebase-admin/app");
      const existing = getApps()[0];
      if (existing) return existing;
      const projectId = process.env["FIREBASE_PROJECT_ID"];
      const clientEmail = process.env["FIREBASE_CLIENT_EMAIL"];
      const privateKey = process.env["FIREBASE_PRIVATE_KEY"]?.replace(/\\n/g, "\n");
      if (!projectId || !clientEmail || !privateKey) {
        throw new Error("Missing FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, or FIREBASE_PRIVATE_KEY");
      }
      return initializeApp({
        credential: cert({ projectId, clientEmail, privateKey }),
        projectId,
      });
    })();
  }
  return appPromise;
}

export async function getAdminAuth(): Promise<Auth> {
  const { getAuth } = await import("firebase-admin/auth");
  return getAuth(await adminApp());
}

export async function getAdminFirestore(): Promise<Firestore> {
  const { getFirestore } = await import("firebase-admin/firestore");
  return getFirestore(await adminApp());
}
