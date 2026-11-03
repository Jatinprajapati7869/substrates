import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { confirmPasswordReset } from "firebase/auth";
import { Button } from "@/components/ui/button";
import { getClientAuth } from "@/integrations/firebase/client";
import { passwordSchema } from "@/lib/account-validation";
import capturedCSS from "../styles/pages/signin.css?raw";

export const Route = createFileRoute("/reset-password")({
  validateSearch: (search: { oobCode?: unknown; mode?: unknown }): { oobCode?: string } => ({
    oobCode: typeof search.oobCode === "string" && search.oobCode.length > 0 ? search.oobCode : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Reset password — Substrates" },
      { name: "description", content: "Set a new password for your Substrates account." },
      { property: "og:title", content: "Reset password — Substrates" },
      { property: "og:description", content: "Securely reset your Substrates password." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ResetPassword,
});

function ResetPassword() {
  const { oobCode } = Route.useSearch();
  const valid = Boolean(oobCode);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  async function submit(event: FormEvent) {
    event.preventDefault();
    if (!oobCode) return;
    setError("");
    setBusy(true);
    try {
      const next = passwordSchema.parse(password);
      if (next !== confirm) throw new Error("Passwords must match.");
      await confirmPasswordReset(getClientAuth(), oobCode, next);
      setPassword("");
      setConfirm("");
      setDone(true);
    } catch (failure) {
      setError(failure instanceof Error && !("issues" in failure) ? failure.message : "Use at least 8 characters.");
    } finally {
      setBusy(false);
    }
  }
  return (
    <>
      <style>{capturedCSS}</style>
      <main className="flex min-h-screen items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm">
          <Link to="/" className="text-lg font-semibold text-text">
            Substrates
          </Link>
          <h1 className="mt-8 text-2xl font-semibold text-text">Reset your password</h1>
          {done ? (
            <p role="status" className="mt-4 text-success-ink">
              Your password has been updated.
            </p>
          ) : !valid ? (
            <p role="alert" className="mt-4 text-muted-foreground">
              This reset link is missing or expired. Request a new one from the Sign in page.
            </p>
          ) : (
            <form onSubmit={submit} className="mt-6 space-y-3">
              <label htmlFor="new-password" className="label block">
                New password
              </label>
              <input
                id="new-password"
                className="os-field h-11 w-full px-4"
                type="password"
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                minLength={8}
                maxLength={128}
                required
              />
              <label htmlFor="confirm-password" className="label block">
                Confirm password
              </label>
              <input
                id="confirm-password"
                className="os-field h-11 w-full px-4"
                type="password"
                autoComplete="new-password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                minLength={8}
                maxLength={128}
                required
              />
              <Button className="os-btn-dark w-full" type="submit" disabled={busy}>
                {busy ? "Updating…" : "Update password"}
              </Button>
            </form>
          )}
          {error && (
            <p role="alert" className="mt-4 text-danger-ink">
              {error}
            </p>
          )}
          <Link to="/signin" className="mt-6 block text-sm underline">
            Return to sign in
          </Link>
        </div>
      </main>
    </>
  );
}
