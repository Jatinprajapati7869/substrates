export function firebaseWebConfig() {
  const apiKey = import.meta.env["VITE_FIREBASE_API_KEY"];
  const authDomain = import.meta.env["VITE_FIREBASE_AUTH_DOMAIN"];
  const projectId = import.meta.env["VITE_FIREBASE_PROJECT_ID"];
  const appId = import.meta.env["VITE_FIREBASE_APP_ID"];
  const missing = [
    ...(!apiKey ? ["VITE_FIREBASE_API_KEY"] : []),
    ...(!authDomain ? ["VITE_FIREBASE_AUTH_DOMAIN"] : []),
    ...(!projectId ? ["VITE_FIREBASE_PROJECT_ID"] : []),
    ...(!appId ? ["VITE_FIREBASE_APP_ID"] : []),
  ];
  if (missing.length) {
    throw new Error(`Missing Firebase config: ${missing.join(", ")}`);
  }
  return { apiKey, authDomain, projectId, appId };
}
