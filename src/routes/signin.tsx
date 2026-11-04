import { withPublicPageHead } from "@/lib/seo";
import { useSupplyShell } from "@/lib/use-supply-shell";
import { useEffect, useState, type CSSProperties, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { getClientAuth, getClientFirestore } from "@/integrations/firebase/client";
import { useAccount } from "@/lib/account-context";
import {
  emailSchema,
  passwordSchema,
  displayNameSchema,
  safeReturnPath,
} from "@/lib/account-validation";
import { useRouter, createFileRoute } from "@tanstack/react-router";
import capturedCSS from "../styles/pages/signin.css?raw";
import { AccountDashboard } from "@/components/AccountDashboard";
import { PRODUCT_NAME } from "@/lib/brand";

export const Route = createFileRoute("/signin")({
  validateSearch: (search: { next?: unknown }): { next?: string } => ({
    next: safeReturnPath(search.next),
  }),
  head: () =>
    withPublicPageHead("/signin", [
      { title: "Sign in — Substrates" },
      {
        name: "description",
        content: "Create your Substrates account or sign in to your personal profile.",
      },
      { property: "og:title", content: "Sign in — Substrates" },
      {
        property: "og:description",
        content: "Create an account and manage your Substrates profile.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ]),
  staticData: {
    importedDocument: {
      html: { className: "inter_c15e96cb-module__0bjUvq__variable", lang: "en" },
      body: { className: "\x6din-h-screen \x62g-[\x76ar(\x2d-surface)] \x61ntialiased" },
    },
  },
  component: Index,
});

function Index() {
  useSupplyShell();
  const { user, loading, signOut } = useAccount();
  const router = useRouter();
  const search = Route.useSearch();
  const next = safeReturnPath(search.next);
  const [mode, setMode] = useState<"signin" | "signup" | "forgot">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [profileReady, setProfileReady] = useState(false);
  useEffect(() => {
    if (loading || !user || next === "/") return;
    void router.navigate({ href: next, replace: true });
  }, [user, loading, next, router]);
  useEffect(() => {
    if (!user) {
      setProfileReady(false);
      return;
    }
    let active = true;
    getDoc(doc(getClientFirestore(), "profiles", user.uid))
      .then((snap) => {
        if (!active) return;
        if (!snap.exists())
          setError("Your profile could not be loaded. Please refresh and try again.");
        else {
          setName(String(snap.data()["displayName"] ?? ""));
          setProfileReady(true);
        }
      })
      .catch(() => {
        if (active) setError("Your profile could not be loaded. Please refresh and try again.");
      });
    return () => {
      active = false;
    };
  }, [user?.uid]);
  function switchMode(next: typeof mode) {
    setMode(next);
    setError("");
    setMessage("");
    setPassword("");
  }
  async function submit(event: FormEvent) {
    event.preventDefault();
    setError("");
    setMessage("");
    setBusy(true);
    try {
      const validEmail = emailSchema.parse(email);
      const auth = getClientAuth();
      if (mode === "forgot") {
        await sendPasswordResetEmail(auth, validEmail, {
          url: `${window.location.origin}/reset-password`,
        });
        setMessage("If an account exists for this email, a password reset link is on its way.");
      } else if (mode === "signup") {
        const validPassword = passwordSchema.parse(password);
        const displayName = displayNameSchema.parse(name);
        const cred = await createUserWithEmailAndPassword(auth, validEmail, validPassword);
        await setDoc(doc(getClientFirestore(), "profiles", cred.user.uid), {
          displayName,
          createdAt: new Date(),
        });
        setPassword("");
        if (!cred.user.emailVerified)
          setMessage("Check your email to confirm your account, then return here to sign in.");
      } else {
        if (!password) throw new Error("Enter your password.");
        await signInWithEmailAndPassword(auth, validEmail, password);
        setPassword("");
      }
    } catch (failure) {
      setError(
        failure && typeof failure === "object" && "issues" in failure
          ? String((failure as { issues: { message: string }[] }).issues[0]?.message)
          : failure instanceof Error
            ? failure.message
            : "Please try again.",
      );
    } finally {
      setBusy(false);
    }
  }
  async function social(provider: "google") {
    if (provider !== "google") return;
    setError("");
    setBusy(true);
    try {
      const auth = getClientAuth();
      await signInWithPopup(auth, new GoogleAuthProvider());
      const current = auth.currentUser;
      if (current) {
        const profileRef = doc(getClientFirestore(), "profiles", current.uid);
        const existing = await getDoc(profileRef);
        if (!existing.exists()) {
          await setDoc(profileRef, {
            displayName: current["displayName"]?.trim() || "Member",
            createdAt: new Date(),
          });
        }
      }
    } catch (failure) {
      setError(failure instanceof Error ? failure.message : "Sign-in failed. Please try again.");
    } finally {
      setBusy(false);
    }
  }
  async function saveProfile(event: FormEvent) {
    event.preventDefault();
    if (!user) return;
    setBusy(true);
    setError("");
    setMessage("");
    try {
      const displayName = displayNameSchema.parse(name);
      await updateDoc(doc(getClientFirestore(), "profiles", user.uid), { displayName });
      setName(displayName);
      setMessage("Profile saved.");
    } catch {
      setError("Enter a display name of 1–100 characters and try again.");
    } finally {
      setBusy(false);
    }
  }
  return (
    <>
      <style>{capturedCSS}</style>
      <div hidden />
      <a
        className={
          "\x73r-only \x66ocus:\x6eot-sr-only \x66ocus:\x66ixed focus:left-3 focus:top-3 focus:z-[100] \x66ocus:\x62order \x66ocus:\x62order-[\x76ar(\x2d-line-strong)] \x66ocus:\x62g-[\x76ar(\x2d-surface)] focus:px-3 focus:py-2 \x66ocus:\x74ext-[\x313px] focus:font-medium \x66ocus:\x74ext-[\x76ar(\x2d-text)]"
        }
        href="#main"
      >
        Skip to templates
      </a>
      <main className="flex min-h-screen lg:h-screen lg:overflow-hidden" id="main">
        <div className="flex w-full flex-col items-center justify-center px-4 py-12 sm:px-8 lg:w-1/2 lg:overflow-y-auto xl:px-16">
          <div className="mx-auto w-full max-w-[380px]">
            <div className="mb-6 text-center">
              <a
                className="inline-flex items-center justify-center"
                href="/"
                aria-label={PRODUCT_NAME}
              >
                <picture>
                  <source srcSet="/logo.webp" type="image/webp" />
                  <img
                    src="/logo.png"
                    alt={PRODUCT_NAME}
                    className="h-8 w-auto"
                    width={120}
                    height={32}
                    decoding="async"
                  />
                </picture>
              </a>
            </div>
            <div className="p-7">
              <h1 className="text-[20px] font-semibold text-text">
                {loading
                  ? "Welcome to Substrates"
                  : user
                    ? "Your account"
                    : mode === "signup"
                      ? "Create an account"
                      : mode === "forgot"
                        ? "Reset your password"
                        : "Sign in to Substrates"}
              </h1>
              {loading ? (
                <p className="mt-4 text-sm text-muted-foreground" role="status">
                  Loading your account…
                </p>
              ) : user ? (
                <>
                  <p className="mt-2 break-all text-sm text-muted-foreground">{user.email}</p>
                  <AccountDashboard disabled={busy} onError={setError} />

                  <form onSubmit={saveProfile} className="mt-6 space-y-3">
                    <label htmlFor="display-name" className="label block">
                      Display name
                    </label>
                    <input
                      id="display-name"
                      className="os-field h-11 w-full px-4"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      maxLength={100}
                      required
                      disabled={!profileReady}
                      autoComplete="nickname"
                    />
                    <Button
                      className="os-btn-dark w-full"
                      disabled={busy || !profileReady}
                      type="submit"
                    >
                      {busy ? "Saving…" : "Save profile"}
                    </Button>
                  </form>
                  <Button
                    variant="outline"
                    className="os-btn-white mt-3 w-full"
                    disabled={busy}
                    onClick={async () => {
                      setBusy(true);
                      setError("");
                      try {
                        await signOut();
                        setMessage("");
                        setPassword("");
                      } catch {
                        setError("Could not sign out. Please try again.");
                      } finally {
                        setBusy(false);
                      }
                    }}
                  >
                    Sign out
                  </Button>
                  <a className="mt-5 block text-center text-sm underline" href="/">
                    Browse templates
                  </a>
                </>
              ) : (
                <>
                  <p className="mt-2 text-[13px] text-muted-foreground">
                    {mode === "forgot"
                      ? "We’ll email you a secure reset link."
                      : "Your next project starts here."}
                  </p>
                  {mode !== "forgot" && (
                    <div className="mt-5 space-y-3">
                      <Button
                        variant="outline"
                        className="os-btn-white w-full"
                        disabled={busy}
                        onClick={() => social("google")}
                      >
                        Continue with Google
                      </Button>
                      <div className="py-2 text-center text-xs text-muted-foreground">
                        or with email
                      </div>
                    </div>
                  )}
                  <form onSubmit={submit} className="mt-4 space-y-3">
                    {mode === "signup" && (
                      <>
                        <label className="label block" htmlFor="display-name">
                          Display name
                        </label>
                        <input
                          className="os-field h-11 w-full px-4"
                          id="display-name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          maxLength={100}
                          autoComplete="nickname"
                          required
                        />
                      </>
                    )}
                    <label className="label block" htmlFor="email">
                      Email
                    </label>
                    <input
                      className="os-field h-11 w-full px-4"
                      id="email"
                      type="email"
                      autoComplete="email"
                      maxLength={255}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@company.com"
                      required
                    />
                    {mode !== "forgot" && (
                      <>
                        <label className="label block" htmlFor="password">
                          Password
                        </label>
                        <input
                          className="os-field h-11 w-full px-4"
                          id="password"
                          type="password"
                          autoComplete={mode === "signup" ? "new-password" : "current-password"}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          minLength={mode === "signup" ? 8 : 1}
                          maxLength={128}
                          required
                        />
                        {mode === "signup" && (
                          <p className="text-xs text-muted-foreground">At least 8 characters.</p>
                        )}
                      </>
                    )}
                    <Button className="os-btn-dark w-full" disabled={busy} type="submit">
                      {busy
                        ? "Please wait…"
                        : mode === "signup"
                          ? "Create account"
                          : mode === "forgot"
                            ? "Send reset link"
                            : "Sign in"}
                    </Button>
                  </form>
                  {mode === "signin" && (
                    <Button
                      variant="link"
                      className="mt-2 w-full text-text"
                      onClick={() => switchMode("forgot")}
                    >
                      Forgot password?
                    </Button>
                  )}
                  <Button
                    variant="link"
                    className="mt-2 h-auto w-full whitespace-normal text-text"
                    onClick={() => switchMode(mode === "signin" ? "signup" : "signin")}
                  >
                    {mode === "signin"
                      ? "New to Substrates? Create an account"
                      : "Already have an account? Sign in"}
                  </Button>
                </>
              )}
              {error && (
                <p role="alert" className="mt-4 text-sm text-danger-ink">
                  {error}
                </p>
              )}
              {message && (
                <p role="status" className="mt-4 text-sm text-success-ink">
                  {message}
                </p>
              )}
            </div>
            <p
              className={
                "mt-4 text-center text-[12px] leading-relaxed \x74ext-[\x76ar(\x2d-text-tertiary)]"
              }
            >
              Creating an account is free. It does not unlock any templates on its own — those need
              a{" "}
              <a
                className={
                  "underline \x75nderline-offset-2 \x68over:\x74ext-[\x76ar(\x2d-text-secondary)]"
                }
                href="/pricing"
              >
                plan
              </a>
              .
            </p>
          </div>
        </div>
        <ImportedAside />
      </main>
      <div
        className={
          "\x61nimate-rise os-shell fixed bottom-[92px] left-4 right-4 z-[70] lg:bottom-4 p-3 sm:left-auto sm:right-4 sm:w-[360px] sm:p-5"
        }
        role="dialog"
        aria-live="polite"
        aria-label="Cookie preferences"
      >
        <p
          className={
            "hidden items-center gap-2 text-[13px] font-medium \x74ext-[\x76ar(\x2d-text)] \x73m:\x66lex"
          }
        >
          <span className="os-dot" /> Cookies
        </p>
        <p
          className={
            "px-1 text-[12px] leading-snug \x74ext-[\x76ar(\x2d-text-secondary)] sm:mt-1.5 sm:px-0 \x73m:\x74ext-[\x312.\x35px] sm:leading-relaxed"
          }
        >
          <span className={"\x73m:\x68idden"}>Analytics cookies help improve Substrates.</span>
          <span className={"hidden \x73m:\x69nline"}>
            We’d like to use analytics cookies and session replay to improve Substrates. Typed text
            is never recorded.
          </span>{" "}
          <a
            className={"underline \x75nderline-offset-2 \x68over:\x74ext-[\x76ar(\x2d-text)]"}
            href="/privacy#cookies"
          >
            Privacy
          </a>
        </p>
        <div className="mt-2.5 grid grid-cols-2 gap-2 sm:mt-4">
          <button
            className={"os-btn-white \x6dax-sm:!\x68-9 \x6dax-sm:!\x74ext-[\x313px]"}
            type="button"
          >
            Decline
          </button>
          <button
            className={"os-btn-dark \x6dax-sm:!\x68-9 \x6dax-sm:!\x74ext-[\x313px]"}
            type="button"
          >
            Accept
          </button>
        </div>
      </div>
    </>
  );
}

function ImportedAside() {
  return (
    <aside className={"relative hidden h-screen overflow-hidden \x6cg:\x62lock lg:w-1/2"}>
      <div
        className={"pointer-events-none absolute inset-0 overflow-hidden \x62g-[#\x30d0d0d]"}
        aria-hidden="true"
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 80% at 70% 10%, rgba(255, 110, 40, 0.16) 0%, rgba(255, 82, 6, 0.05) 35%, transparent 70%)",
          }}
        />
        <div className="relative mx-auto flex h-full max-w-[720px] gap-2.5 px-5">
          <div className="os-marquee relative overflow-hidden flex-1">
            <div
              className="os-marquee-track flex flex-col gap-2.5"
              style={{ animationDuration: "58s" } as CSSProperties}
            >
              <figure
                className={
                  "relative aspect-[16/11] w-full shrink-0 overflow-hidden \x62order \x62order-white/[\x30.\x307] \x62g-white/\x35"
                }
              >
                <img
                  className={"object-cover \x6fbject-top"}
                  style={{
                    position: "absolute",
                    height: "100%",
                    width: "100%",
                    inset: "0px",
                    color: "transparent",
                  }}
                  alt=""
                  decoding="async"
                  src="/site-assets/e611cb809f2f58a2.webp"
                />
              </figure>
              <figure
                className={
                  "relative aspect-[16/11] w-full shrink-0 overflow-hidden \x62order \x62order-white/[\x30.\x307] \x62g-white/\x35"
                }
              >
                <img
                  className={"object-cover \x6fbject-top"}
                  style={{
                    position: "absolute",
                    height: "100%",
                    width: "100%",
                    inset: "0px",
                    color: "transparent",
                  }}
                  alt=""
                  decoding="async"
                  src="/site-assets/5ee6ef4b5d3a5a80.webp"
                />
              </figure>
              <figure
                className={
                  "relative aspect-[16/11] w-full shrink-0 overflow-hidden \x62order \x62order-white/[\x30.\x307] \x62g-white/\x35"
                }
              >
                <img
                  className={"object-cover \x6fbject-top"}
                  style={{
                    position: "absolute",
                    height: "100%",
                    width: "100%",
                    inset: "0px",
                    color: "transparent",
                  }}
                  alt=""
                  decoding="async"
                  src="/site-assets/8d8f135b6c86ad46.webp"
                />
              </figure>
              <figure
                className={
                  "relative aspect-[16/11] w-full shrink-0 overflow-hidden \x62order \x62order-white/[\x30.\x307] \x62g-white/\x35"
                }
              >
                <img
                  className={"object-cover \x6fbject-top"}
                  style={{
                    position: "absolute",
                    height: "100%",
                    width: "100%",
                    inset: "0px",
                    color: "transparent",
                  }}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  src="/site-assets/b7dc577d80dcf8a8.webp"
                />
              </figure>
              <figure
                className={
                  "relative aspect-[16/11] w-full shrink-0 overflow-hidden \x62order \x62order-white/[\x30.\x307] \x62g-white/\x35"
                }
              >
                <img
                  className={"object-cover \x6fbject-top"}
                  style={{
                    position: "absolute",
                    height: "100%",
                    width: "100%",
                    inset: "0px",
                    color: "transparent",
                  }}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  src="/site-assets/1e2df35014d8f1ae.webp"
                />
              </figure>
              <figure
                className={
                  "relative aspect-[16/11] w-full shrink-0 overflow-hidden \x62order \x62order-white/[\x30.\x307] \x62g-white/\x35"
                }
              >
                <img
                  className={"object-cover \x6fbject-top"}
                  style={{
                    position: "absolute",
                    height: "100%",
                    width: "100%",
                    inset: "0px",
                    color: "transparent",
                  }}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  src="/site-assets/8323362aa949af03.webp"
                />
              </figure>
              <figure
                className={
                  "relative aspect-[16/11] w-full shrink-0 overflow-hidden \x62order \x62order-white/[\x30.\x307] \x62g-white/\x35"
                }
              >
                <img
                  className={"object-cover \x6fbject-top"}
                  style={{
                    position: "absolute",
                    height: "100%",
                    width: "100%",
                    inset: "0px",
                    color: "transparent",
                  }}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  src="/site-assets/e611cb809f2f58a2.webp"
                />
              </figure>
              <figure
                className={
                  "relative aspect-[16/11] w-full shrink-0 overflow-hidden \x62order \x62order-white/[\x30.\x307] \x62g-white/\x35"
                }
              >
                <img
                  className={"object-cover \x6fbject-top"}
                  style={{
                    position: "absolute",
                    height: "100%",
                    width: "100%",
                    inset: "0px",
                    color: "transparent",
                  }}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  src="/site-assets/5ee6ef4b5d3a5a80.webp"
                />
              </figure>
              <figure
                className={
                  "relative aspect-[16/11] w-full shrink-0 overflow-hidden \x62order \x62order-white/[\x30.\x307] \x62g-white/\x35"
                }
              >
                <img
                  className={"object-cover \x6fbject-top"}
                  style={{
                    position: "absolute",
                    height: "100%",
                    width: "100%",
                    inset: "0px",
                    color: "transparent",
                  }}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  src="/site-assets/8d8f135b6c86ad46.webp"
                />
              </figure>
              <figure
                className={
                  "relative aspect-[16/11] w-full shrink-0 overflow-hidden \x62order \x62order-white/[\x30.\x307] \x62g-white/\x35"
                }
              >
                <img
                  className={"object-cover \x6fbject-top"}
                  style={{
                    position: "absolute",
                    height: "100%",
                    width: "100%",
                    inset: "0px",
                    color: "transparent",
                  }}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  src="/site-assets/b7dc577d80dcf8a8.webp"
                />
              </figure>
              <figure
                className={
                  "relative aspect-[16/11] w-full shrink-0 overflow-hidden \x62order \x62order-white/[\x30.\x307] \x62g-white/\x35"
                }
              >
                <img
                  className={"object-cover \x6fbject-top"}
                  style={{
                    position: "absolute",
                    height: "100%",
                    width: "100%",
                    inset: "0px",
                    color: "transparent",
                  }}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  src="/site-assets/1e2df35014d8f1ae.webp"
                />
              </figure>
              <figure
                className={
                  "relative aspect-[16/11] w-full shrink-0 overflow-hidden \x62order \x62order-white/[\x30.\x307] \x62g-white/\x35"
                }
              >
                <img
                  className={"object-cover \x6fbject-top"}
                  style={{
                    position: "absolute",
                    height: "100%",
                    width: "100%",
                    inset: "0px",
                    color: "transparent",
                  }}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  src="/site-assets/8323362aa949af03.webp"
                />
              </figure>
            </div>
          </div>
          <div className="os-marquee relative overflow-hidden flex-1">
            <div
              className="os-marquee-track flex flex-col gap-2.5"
              style={{ animationDuration: "70s" } as CSSProperties}
              data-direction="down"
            >
              <figure
                className={
                  "relative aspect-[16/11] w-full shrink-0 overflow-hidden \x62order \x62order-white/[\x30.\x307] \x62g-white/\x35"
                }
              >
                <img
                  className={"object-cover \x6fbject-top"}
                  style={{
                    position: "absolute",
                    height: "100%",
                    width: "100%",
                    inset: "0px",
                    color: "transparent",
                  }}
                  alt=""
                  decoding="async"
                  src="/site-assets/acf328f50931d605.webp"
                />
              </figure>
              <figure
                className={
                  "relative aspect-[16/11] w-full shrink-0 overflow-hidden \x62order \x62order-white/[\x30.\x307] \x62g-white/\x35"
                }
              >
                <img
                  className={"object-cover \x6fbject-top"}
                  style={{
                    position: "absolute",
                    height: "100%",
                    width: "100%",
                    inset: "0px",
                    color: "transparent",
                  }}
                  alt=""
                  decoding="async"
                  src="/site-assets/84cb0b3d02e2b143.webp"
                />
              </figure>
              <figure
                className={
                  "relative aspect-[16/11] w-full shrink-0 overflow-hidden \x62order \x62order-white/[\x30.\x307] \x62g-white/\x35"
                }
              >
                <img
                  className={"object-cover \x6fbject-top"}
                  style={{
                    position: "absolute",
                    height: "100%",
                    width: "100%",
                    inset: "0px",
                    color: "transparent",
                  }}
                  alt=""
                  decoding="async"
                  src="/site-assets/40f9a83ab363d229.webp"
                />
              </figure>
              <figure
                className={
                  "relative aspect-[16/11] w-full shrink-0 overflow-hidden \x62order \x62order-white/[\x30.\x307] \x62g-white/\x35"
                }
              >
                <img
                  className={"object-cover \x6fbject-top"}
                  style={{
                    position: "absolute",
                    height: "100%",
                    width: "100%",
                    inset: "0px",
                    color: "transparent",
                  }}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  src="/site-assets/ea4dd985c7ff23c2.webp"
                />
              </figure>
              <figure
                className={
                  "relative aspect-[16/11] w-full shrink-0 overflow-hidden \x62order \x62order-white/[\x30.\x307] \x62g-white/\x35"
                }
              >
                <img
                  className={"object-cover \x6fbject-top"}
                  style={{
                    position: "absolute",
                    height: "100%",
                    width: "100%",
                    inset: "0px",
                    color: "transparent",
                  }}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  src="/site-assets/80e7571a3173d2bc.webp"
                />
              </figure>
              <figure
                className={
                  "relative aspect-[16/11] w-full shrink-0 overflow-hidden \x62order \x62order-white/[\x30.\x307] \x62g-white/\x35"
                }
              >
                <img
                  className={"object-cover \x6fbject-top"}
                  style={{
                    position: "absolute",
                    height: "100%",
                    width: "100%",
                    inset: "0px",
                    color: "transparent",
                  }}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  src="/site-assets/acf328f50931d605.webp"
                />
              </figure>
              <figure
                className={
                  "relative aspect-[16/11] w-full shrink-0 overflow-hidden \x62order \x62order-white/[\x30.\x307] \x62g-white/\x35"
                }
              >
                <img
                  className={"object-cover \x6fbject-top"}
                  style={{
                    position: "absolute",
                    height: "100%",
                    width: "100%",
                    inset: "0px",
                    color: "transparent",
                  }}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  src="/site-assets/84cb0b3d02e2b143.webp"
                />
              </figure>
              <figure
                className={
                  "relative aspect-[16/11] w-full shrink-0 overflow-hidden \x62order \x62order-white/[\x30.\x307] \x62g-white/\x35"
                }
              >
                <img
                  className={"object-cover \x6fbject-top"}
                  style={{
                    position: "absolute",
                    height: "100%",
                    width: "100%",
                    inset: "0px",
                    color: "transparent",
                  }}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  src="/site-assets/40f9a83ab363d229.webp"
                />
              </figure>
              <figure
                className={
                  "relative aspect-[16/11] w-full shrink-0 overflow-hidden \x62order \x62order-white/[\x30.\x307] \x62g-white/\x35"
                }
              >
                <img
                  className={"object-cover \x6fbject-top"}
                  style={{
                    position: "absolute",
                    height: "100%",
                    width: "100%",
                    inset: "0px",
                    color: "transparent",
                  }}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  src="/site-assets/ea4dd985c7ff23c2.webp"
                />
              </figure>
              <figure
                className={
                  "relative aspect-[16/11] w-full shrink-0 overflow-hidden \x62order \x62order-white/[\x30.\x307] \x62g-white/\x35"
                }
              >
                <img
                  className={"object-cover \x6fbject-top"}
                  style={{
                    position: "absolute",
                    height: "100%",
                    width: "100%",
                    inset: "0px",
                    color: "transparent",
                  }}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  src="/site-assets/80e7571a3173d2bc.webp"
                />
              </figure>
            </div>
          </div>
          <div className={"os-marquee relative overflow-hidden hidden flex-1 \x6cg:\x62lock"}>
            <div
              className="os-marquee-track flex flex-col gap-2.5"
              style={{ animationDuration: "82s" } as CSSProperties}
            >
              <figure
                className={
                  "relative aspect-[16/11] w-full shrink-0 overflow-hidden \x62order \x62order-white/[\x30.\x307] \x62g-white/\x35"
                }
              >
                <img
                  className={"object-cover \x6fbject-top"}
                  style={{
                    position: "absolute",
                    height: "100%",
                    width: "100%",
                    inset: "0px",
                    color: "transparent",
                  }}
                  alt=""
                  decoding="async"
                  src="/site-assets/ab92887d56dbc66d.webp"
                />
              </figure>
              <figure
                className={
                  "relative aspect-[16/11] w-full shrink-0 overflow-hidden \x62order \x62order-white/[\x30.\x307] \x62g-white/\x35"
                }
              >
                <img
                  className={"object-cover \x6fbject-top"}
                  style={{
                    position: "absolute",
                    height: "100%",
                    width: "100%",
                    inset: "0px",
                    color: "transparent",
                  }}
                  alt=""
                  decoding="async"
                  src="/site-assets/614d6ffd42b218df.webp"
                />
              </figure>
              <figure
                className={
                  "relative aspect-[16/11] w-full shrink-0 overflow-hidden \x62order \x62order-white/[\x30.\x307] \x62g-white/\x35"
                }
              >
                <img
                  className={"object-cover \x6fbject-top"}
                  style={{
                    position: "absolute",
                    height: "100%",
                    width: "100%",
                    inset: "0px",
                    color: "transparent",
                  }}
                  alt=""
                  decoding="async"
                  src="/site-assets/83c347b4a7b2d1dc.webp"
                />
              </figure>
              <figure
                className={
                  "relative aspect-[16/11] w-full shrink-0 overflow-hidden \x62order \x62order-white/[\x30.\x307] \x62g-white/\x35"
                }
              >
                <img
                  className={"object-cover \x6fbject-top"}
                  style={{
                    position: "absolute",
                    height: "100%",
                    width: "100%",
                    inset: "0px",
                    color: "transparent",
                  }}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  src="/site-assets/f3c9472c82fd2cee.webp"
                />
              </figure>
              <figure
                className={
                  "relative aspect-[16/11] w-full shrink-0 overflow-hidden \x62order \x62order-white/[\x30.\x307] \x62g-white/\x35"
                }
              >
                <img
                  className={"object-cover \x6fbject-top"}
                  style={{
                    position: "absolute",
                    height: "100%",
                    width: "100%",
                    inset: "0px",
                    color: "transparent",
                  }}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  src="/site-assets/ddf5f91f7f652265.webp"
                />
              </figure>
              <figure
                className={
                  "relative aspect-[16/11] w-full shrink-0 overflow-hidden \x62order \x62order-white/[\x30.\x307] \x62g-white/\x35"
                }
              >
                <img
                  className={"object-cover \x6fbject-top"}
                  style={{
                    position: "absolute",
                    height: "100%",
                    width: "100%",
                    inset: "0px",
                    color: "transparent",
                  }}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  src="/site-assets/ab92887d56dbc66d.webp"
                />
              </figure>
              <figure
                className={
                  "relative aspect-[16/11] w-full shrink-0 overflow-hidden \x62order \x62order-white/[\x30.\x307] \x62g-white/\x35"
                }
              >
                <img
                  className={"object-cover \x6fbject-top"}
                  style={{
                    position: "absolute",
                    height: "100%",
                    width: "100%",
                    inset: "0px",
                    color: "transparent",
                  }}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  src="/site-assets/614d6ffd42b218df.webp"
                />
              </figure>
              <figure
                className={
                  "relative aspect-[16/11] w-full shrink-0 overflow-hidden \x62order \x62order-white/[\x30.\x307] \x62g-white/\x35"
                }
              >
                <img
                  className={"object-cover \x6fbject-top"}
                  style={{
                    position: "absolute",
                    height: "100%",
                    width: "100%",
                    inset: "0px",
                    color: "transparent",
                  }}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  src="/site-assets/83c347b4a7b2d1dc.webp"
                />
              </figure>
              <figure
                className={
                  "relative aspect-[16/11] w-full shrink-0 overflow-hidden \x62order \x62order-white/[\x30.\x307] \x62g-white/\x35"
                }
              >
                <img
                  className={"object-cover \x6fbject-top"}
                  style={{
                    position: "absolute",
                    height: "100%",
                    width: "100%",
                    inset: "0px",
                    color: "transparent",
                  }}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  src="/site-assets/f3c9472c82fd2cee.webp"
                />
              </figure>
              <figure
                className={
                  "relative aspect-[16/11] w-full shrink-0 overflow-hidden \x62order \x62order-white/[\x30.\x307] \x62g-white/\x35"
                }
              >
                <img
                  className={"object-cover \x6fbject-top"}
                  style={{
                    position: "absolute",
                    height: "100%",
                    width: "100%",
                    inset: "0px",
                    color: "transparent",
                  }}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  src="/site-assets/ddf5f91f7f652265.webp"
                />
              </figure>
            </div>
          </div>
        </div>
        <div className={"absolute \x69nset-x-0 bottom-0 z-10 p-10"}>
          <p
            className={
              "max-w-sm \x66ont-[\x66amily-name:\x76ar(\x2d-font-heading)] text-[22px] font-semibold leading-snug tracking-tight text-white"
            }
          >
            192 premium templates.
            <span className={"block \x74ext-white/\x355"}>One membership.</span>
          </p>
        </div>
        <div
          className={"absolute \x69nset-x-0 top-0 h-32"}
          style={{ background: "linear-gradient(rgb(13, 13, 13) 10%, transparent 100%)" }}
        />
        <div
          className={"absolute \x69nset-x-0 bottom-0 h-48"}
          style={{ background: "linear-gradient(0deg, rgb(13, 13, 13) 28%, transparent 100%)" }}
        />
      </div>
    </aside>
  );
}
