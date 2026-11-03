import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";
import { firebaseWebConfig } from "./config";

let app: FirebaseApp | undefined;
let auth: Auth | undefined;
let db: Firestore | undefined;

function getApp(): FirebaseApp {
  if (!app) {
    app = getApps().length ? getApps()[0]! : initializeApp(firebaseWebConfig());
  }
  return app;
}

export function getClientAuth(): Auth {
  if (!auth) auth = getAuth(getApp());
  return auth;
}

export function getClientFirestore(): Firestore {
  if (!db) db = getFirestore(getApp());
  return db;
}
