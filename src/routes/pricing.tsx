import { useSupplyShell } from "@/lib/use-supply-shell";
import type { CSSProperties } from "react";
import { CheckoutButton, CheckoutCancelledNote } from "@/components/CheckoutButton";
import { createFileRoute } from "@tanstack/react-router";
import capturedCSS from "../styles/pages/pricing.css?raw";

export const Route = createFileRoute("/pricing")({
  head: () => ({ meta: [
    { title: "Membership — Substrates" },
    { name: "description", content: "Compare Substrates membership options for website templates and sections." },
    { property: "og:title", content: "Membership — Substrates" },
    { property: "og:description", content: "Compare Substrates membership options for website templates and sections." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  staticData: { importedDocument: { html: { "className": "inter_c15e96cb-module__0bjUvq__variable", "lang": "en" }, body: { "className": "\x6din-h-screen \x62g-[\x76ar(\x2d-surface)] \x61ntialiased" } } },
  component: Index,
});

function Index() {
  useSupplyShell();
  return (
    <>
      <style>{capturedCSS}</style>
      <div hidden />
      <CheckoutCancelledNote />
      <a className={"\x73r-only \x66ocus:\x6eot-sr-only \x66ocus:\x66ixed focus:left-3 focus:top-3 focus:z-[100] \x66ocus:\x62order \x66ocus:\x62order-[\x76ar(\x2d-line-strong)] \x66ocus:\x62g-[\x76ar(\x2d-surface)] focus:px-3 focus:py-2 \x66ocus:\x74ext-[\x313px] focus:font-medium \x66ocus:\x74ext-[\x76ar(\x2d-text)]"} href="#main">Skip to templates</a>
      <div className="flex min-h-screen">
        <div className={"fixed \x69nset-x-0 top-0 z-30 flex h-14 items-center justify-between \x62order-b \x62order-black/\x35 \x62g-white/\x380 px-4 \x62ackdrop-blur-xl \x62ackdrop-saturate-150 \x6cg:\x68idden"}>
          <a className="flex items-center" aria-label="Substrates home" href="/">
            <img className="h-[15.6px] w-auto" style={{ color: "transparent" }} alt="Substrates" loading="eager" width="51" height="8" decoding="async" src="/site-assets/024c73af1ec90150-c4a2585c8f9f7fb8652d67979571478a.png" />
          </a>
          <button className={"rounded-full bg-white p-2 \x74ext-[\x76ar(\x2d-text-secondary)] \x73hadow-[\x76ar(\x2d-shadow-raised)]"} type="button" aria-label="Open navigation">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </button>
        </div>
        <ImportedAside />
        <div className="flex min-w-0 flex-1 flex-col pb-24 lg:pb-0 lg:pl-[var(--sidebar-w)]">
          <main className="min-w-0 flex-1" id="main">
            <div className="pb-28 pt-[88px] lg:pt-16">
              <div className="mb-8">
                <nav className="flex justify-center" aria-label="Pricing">
                  <div className="os-seg">
                    <a className="os-seg-item px-4 text-[13px]" aria-current="page" data-active="true" href="#">Website templates</a>
                    <a className="os-seg-item px-4 text-[13px]" href="/pricing/videos">Video skills</a>
                  </div>
                </nav>
              </div>
              <header className="mx-auto mb-10 max-w-2xl px-4 text-center sm:px-6">
                <div className="os-chip text-[10.5px] uppercase tracking-[0.06em]"><span className="os-dot" />192 templates, one membership</div>
                <h1 className={"mt-5 \x66ont-[\x66amily-name:\x76ar(\x2d-font-heading)] text-[36px] font-medium leading-[1.05] tracking-tight \x73m:\x74ext-[\x352px]"}><span className={"\x74ext-[\x76ar(\x2d-text-tertiary)]"}>Stop paying</span> <span className={"\x74ext-[\x76ar(\x2d-text)]"}>per template.</span></h1>
                <p className={"mx-auto mt-3.5 max-w-lg text-[14px] leading-relaxed \x74ext-[\x76ar(\x2d-text-secondary)] \x73m:\x74ext-[\x315px]"}>Copy premium templates straight into Claude, Cursor and v0, or open them in Webflow and Framer. Substrates templates sell individually for $29–$129; a membership gets you the same designs for a fraction of buying them one at a time. Free sections only need an account.</p>
              </header>
              <div className="px-4 sm:px-6">
                <div className="mx-auto mb-6 flex w-fit items-center gap-2">
                  <svg width="30" height="56" viewBox="0 0 32 60" aria-hidden="true">
                    <defs>
                      <linearGradient id="os-gold-l" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0" stopColor="#F5D98A" />
                        <stop offset="1" stopColor="#B7832A" />
                      </linearGradient>
                    </defs>
                    <path d="M28 56C16 50 10 36 13 6" stroke="url(#os-gold-l)" strokeWidth="1.6" fill="none" strokeLinecap="round" />
                    <g>
                      <ellipse cx="15" cy="46" rx="2.6" ry="5.2" transform="rotate(-10 15 46)" fill="url(#os-gold-l)" />
                      <ellipse cx="24" cy="48" rx="2.3" ry="4.6" transform="rotate(10 24 48)" fill="url(#os-gold-l)" />
                    </g>
                    <g>
                      <ellipse cx="10" cy="38" rx="2.6" ry="5.2" transform="rotate(-25 10 38)" fill="url(#os-gold-l)" />
                      <ellipse cx="19" cy="40" rx="2.3" ry="4.6" transform="rotate(25 19 40)" fill="url(#os-gold-l)" />
                    </g>
                    <g>
                      <ellipse cx="7" cy="29" rx="2.6" ry="5.2" transform="rotate(-35 7 29)" fill="url(#os-gold-l)" />
                      <ellipse cx="16" cy="31" rx="2.3" ry="4.6" transform="rotate(35 16 31)" fill="url(#os-gold-l)" />
                    </g>
                    <g>
                      <ellipse cx="6" cy="20" rx="2.6" ry="5.2" transform="rotate(-45 6 20)" fill="url(#os-gold-l)" />
                      <ellipse cx="15" cy="22" rx="2.3" ry="4.6" transform="rotate(45 15 22)" fill="url(#os-gold-l)" />
                    </g>
                    <g>
                      <ellipse cx="7" cy="11" rx="2.6" ry="5.2" transform="rotate(-55 7 11)" fill="url(#os-gold-l)" />
                      <ellipse cx="16" cy="13" rx="2.3" ry="4.6" transform="rotate(55 16 13)" fill="url(#os-gold-l)" />
                    </g>
                  </svg>
                  <div className="text-center leading-tight">
                    <p className={"text-[13px] font-medium \x74ext-[\x76ar(\x2d-text)]"}>Trusted by developers</p>
                    <p className={"text-[13px] font-medium \x74ext-[\x76ar(\x2d-text)]"}>and designers</p>
                  </div>
                  <svg className={"\x2dscale-x-100"} width="30" height="56" viewBox="0 0 32 60" aria-hidden="true">
                    <defs>
                      <linearGradient id="os-gold-r" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0" stopColor="#F5D98A" />
                        <stop offset="1" stopColor="#B7832A" />
                      </linearGradient>
                    </defs>
                    <path d="M28 56C16 50 10 36 13 6" stroke="url(#os-gold-r)" strokeWidth="1.6" fill="none" strokeLinecap="round" />
                    <g>
                      <ellipse cx="15" cy="46" rx="2.6" ry="5.2" transform="rotate(-10 15 46)" fill="url(#os-gold-r)" />
                      <ellipse cx="24" cy="48" rx="2.3" ry="4.6" transform="rotate(10 24 48)" fill="url(#os-gold-r)" />
                    </g>
                    <g>
                      <ellipse cx="10" cy="38" rx="2.6" ry="5.2" transform="rotate(-25 10 38)" fill="url(#os-gold-r)" />
                      <ellipse cx="19" cy="40" rx="2.3" ry="4.6" transform="rotate(25 19 40)" fill="url(#os-gold-r)" />
                    </g>
                    <g>
                      <ellipse cx="7" cy="29" rx="2.6" ry="5.2" transform="rotate(-35 7 29)" fill="url(#os-gold-r)" />
                      <ellipse cx="16" cy="31" rx="2.3" ry="4.6" transform="rotate(35 16 31)" fill="url(#os-gold-r)" />
                    </g>
                    <g>
                      <ellipse cx="6" cy="20" rx="2.6" ry="5.2" transform="rotate(-45 6 20)" fill="url(#os-gold-r)" />
                      <ellipse cx="15" cy="22" rx="2.3" ry="4.6" transform="rotate(45 15 22)" fill="url(#os-gold-r)" />
                    </g>
                    <g>
                      <ellipse cx="7" cy="11" rx="2.6" ry="5.2" transform="rotate(-55 7 11)" fill="url(#os-gold-r)" />
                      <ellipse cx="16" cy="13" rx="2.3" ry="4.6" transform="rotate(55 16 13)" fill="url(#os-gold-r)" />
                    </g>
                  </svg>
                </div>
                <ImportedSectionMakeExplainerVideosWith />
                <div className="os-shell mx-auto grid max-w-6xl gap-2 p-2 lg:grid-cols-3">
                  <ImportedSectionSections />
                  <ImportedSectionSectionsTemplates />
                  <ImportedSectionLifetime />
                </div>
              </div>
              <p className={"mx-auto mt-5 max-w-6xl px-4 text-center text-[12px] \x74ext-[\x76ar(\x2d-text-tertiary)] sm:px-6"}>Prices in USD. You will always be asked to confirm before a credit is spent.</p>
              <ImportedSectionMakeExplainerVideosWith2 />
              <ImportedSectionUnlockATemplateUse />
              <ImportedSectionBuiltOnceProperlyYours />
              <ImportedSectionBeforeYouDecide />
              <section className="mx-auto mt-24 max-w-3xl px-4 sm:px-6">
                <div className="os-dark overflow-hidden !rounded-[var(--r-shell)] px-6 py-14 text-center sm:px-10">
                  <h2 className={"\x66ont-[\x66amily-name:\x76ar(\x2d-font-heading)] text-[28px] font-medium tracking-tight \x73m:\x74ext-[\x336px]"}><span className={"\x74ext-white/\x345"}>Browse the whole catalog</span> <span className="text-white">first.</span></h2>
                  <p className={"mx-auto mt-3 max-w-md text-[14px] leading-relaxed \x74ext-white/\x360"}>Every template is fully previewable at desktop, tablet and mobile before you spend anything. No account needed to look around.</p>
                  <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
                    <a className={"os-button relative inline-flex select-none items-center justify-center gap-2 rounded-full font-medium transition-[transform,box-shadow,filter,background-color] duration-150 ease-out \x64isabled:\x63ursor-not-allowed disabled:opacity-45 h-12 px-6 text-[14px] \x74ext-[\x76ar(\x2d-text)]"} style={{ backgroundImage: "linear-gradient(rgb(255, 255, 255) 0%, rgb(248, 248, 247) 55%, rgb(239, 239, 238) 100%)", boxShadow: "rgb(255, 255, 255) 0px 1px 0px inset, rgba(0, 0, 0, 0.05) 0px -1px 0px inset, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px, rgba(0, 0, 0, 0.08) 0px 1px 2px, rgba(0, 0, 0, 0.28) 0px 8px 18px -10px" } as CSSProperties} href="/?collection=all">Browse 192 templates</a>
                    <a className={"os-button relative inline-flex select-none items-center justify-center gap-2 rounded-full font-medium transition-[transform,box-shadow,filter,background-color] duration-150 ease-out \x64isabled:\x63ursor-not-allowed disabled:opacity-45 h-12 px-6 text-[14px] \x74ext-white/\x390"} style={{ background: "rgba(255, 255, 255, 0.07)", boxShadow: "rgba(255, 255, 255, 0.1) 0px 1px 0px inset, rgba(255, 255, 255, 0.12) 0px 0px 0px 1px" }} href="/help">Read the FAQ</a>
                  </div>
                </div>
              </section>
            </div>
          </main>
          <footer className={"mx-auto flex w-full max-w-6xl flex-wrap items-center gap-x-4 gap-y-2 \x62order-t \x62order-[\x76ar(\x2d-line)] px-4 py-5 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)] sm:px-6"}>
            <span>© 2026 OversightStudio, LLC</span>
            <a className={"\x68over:\x74ext-[\x76ar(\x2d-text)]"} href="/terms">Terms</a>
            <a className={"\x68over:\x74ext-[\x76ar(\x2d-text)]"} href="/privacy">Privacy</a>
            <a className={"\x68over:\x74ext-[\x76ar(\x2d-text)]"} href="/refunds">Refunds</a>
            <a className={"\x68over:\x74ext-[\x76ar(\x2d-text)]"} href="mailto:jatin@substrates.app">Contact</a>
          </footer>
        </div>
        <ImportedNavMain />
      </div>
      <div className={"\x61nimate-rise os-shell fixed bottom-[92px] left-4 right-4 z-[70] lg:bottom-4 p-3 sm:left-auto sm:right-4 sm:w-[360px] sm:p-5"} role="dialog" aria-live="polite" aria-label="Cookie preferences">
        <p className={"hidden items-center gap-2 text-[13px] font-medium \x74ext-[\x76ar(\x2d-text)] \x73m:\x66lex"}><span className="os-dot" /> Cookies</p>
        <p className={"px-1 text-[12px] leading-snug \x74ext-[\x76ar(\x2d-text-secondary)] sm:mt-1.5 sm:px-0 \x73m:\x74ext-[\x312.\x35px] sm:leading-relaxed"}><span className={"\x73m:\x68idden"}>Analytics cookies help improve Substrates.</span><span className={"hidden \x73m:\x69nline"}>We’d like to use analytics cookies and session replay to improve Substrates. Typed text is never recorded.</span> <a className={"underline \x75nderline-offset-2 \x68over:\x74ext-[\x76ar(\x2d-text)]"} href="/privacy#cookies">Privacy</a></p>
        <div className="mt-2.5 grid grid-cols-2 gap-2 sm:mt-4">
          <button className={"os-btn-white \x6dax-sm:!\x68-9 \x6dax-sm:!\x74ext-[\x313px]"} type="button">Decline</button>
          <button className={"os-btn-dark \x6dax-sm:!\x68-9 \x6dax-sm:!\x74ext-[\x313px]"} type="button">Accept</button>
        </div>
      </div>
    </>
  );
}

function ImportedAside() {
  return (
    <aside className={"fixed \x69nset-y-0 left-0 z-20 hidden w-[var(--sidebar-w)] py-3 pl-3 \x6cg:\x62lock"}>
      <div className="os-shell h-full overflow-hidden">
        <div className="flex h-full flex-col">
          <div className="flex h-14 items-center gap-2 px-5">
            <a className="flex items-center" aria-label="Substrates home" href="/">
              <img className="h-[15.6px] w-auto" style={{ color: "transparent" }} alt="Substrates" loading="eager" width="51" height="8" decoding="async" src="/site-assets/024c73af1ec90150-c4a2585c8f9f7fb8652d67979571478a.png" />
            </a>
          </div>
          <nav className="thin-scroll flex-1 overflow-y-auto pb-4 [scrollbar-color:var(--line-strong)_transparent] [scrollbar-width:thin]" aria-label="Catalog">
            <div className="label px-5 pb-1.5 pt-5">Browse</div>
            <a className={"group mx-2 flex items-center gap-2.5 rounded-[12px] px-2.5 py-[7px] text-[13px] transition-[background-color,color,box-shadow] duration-150 \x74ext-[\x76ar(\x2d-text-secondary)] \x68over:\x62g-black/[\x30.\x3035] \x68over:\x74ext-[\x76ar(\x2d-text)]"} href="/">
              <span className={"flex h-[18px] w-[18px] shrink-0 items-center justify-center \x74ext-[\x76ar(\x2d-text-tertiary)] \x67roup-hover:\x74ext-[\x76ar(\x2d-text-secondary)]"} aria-hidden="true">
                <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="currentColor" viewBox="0 0 256 256">
                  <path d="M224,120v96a8,8,0,0,1-8,8H40a8,8,0,0,1-8-8V120a15.87,15.87,0,0,1,4.69-11.32l80-80a16,16,0,0,1,22.62,0l80,80A15.87,15.87,0,0,1,224,120Z" />
                </svg>
              </span>
              <span className="min-w-0 flex-1 truncate">Home</span>
              <span className="os-dot mr-1" aria-hidden="true" />
            </a>
            <a className={"group mx-2 flex items-center gap-2.5 rounded-[12px] px-2.5 py-[7px] text-[13px] transition-[background-color,color,box-shadow] duration-150 \x74ext-[\x76ar(\x2d-text-secondary)] \x68over:\x62g-black/[\x30.\x3035] \x68over:\x74ext-[\x76ar(\x2d-text)]"} href="/?collection=all">
              <span className={"flex h-[18px] w-[18px] shrink-0 items-center justify-center \x74ext-[\x76ar(\x2d-text-tertiary)] \x67roup-hover:\x74ext-[\x76ar(\x2d-text-secondary)]"} aria-hidden="true">
                <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="currentColor" viewBox="0 0 256 256">
                  <path d="M120,56v48a16,16,0,0,1-16,16H56a16,16,0,0,1-16-16V56A16,16,0,0,1,56,40h48A16,16,0,0,1,120,56Zm80-16H152a16,16,0,0,0-16,16v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V56A16,16,0,0,0,200,40Zm-96,96H56a16,16,0,0,0-16,16v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V152A16,16,0,0,0,104,136Zm96,0H152a16,16,0,0,0-16,16v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V152A16,16,0,0,0,200,136Z" />
                </svg>
              </span>
              <span className="min-w-0 flex-1 truncate">All Templates</span>
              <span className={"shrink-0 text-[11px] tabular-nums \x74ext-[\x76ar(\x2d-text-tertiary)]"}>192</span>
            </a>
            <a className={"group mx-2 flex items-center gap-2.5 rounded-[12px] px-2.5 py-[7px] text-[13px] transition-[background-color,color,box-shadow] duration-150 \x74ext-[\x76ar(\x2d-text-secondary)] \x68over:\x62g-black/[\x30.\x3035] \x68over:\x74ext-[\x76ar(\x2d-text)]"} href="/?collection=recent">
              <span className={"flex h-[18px] w-[18px] shrink-0 items-center justify-center \x74ext-[\x76ar(\x2d-text-tertiary)] \x67roup-hover:\x74ext-[\x76ar(\x2d-text-secondary)]"} aria-hidden="true">
                <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="currentColor" viewBox="0 0 256 256">
                  <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm56,112H128a8,8,0,0,1-8-8V72a8,8,0,0,1,16,0v48h48a8,8,0,0,1,0,16Z" />
                </svg>
              </span>
              <span className="min-w-0 flex-1 truncate">Recently Added</span>
            </a>
            <a className={"group mx-2 flex items-center gap-2.5 rounded-[12px] px-2.5 py-[7px] text-[13px] transition-[background-color,color,box-shadow] duration-150 \x74ext-[\x76ar(\x2d-text-secondary)] \x68over:\x62g-black/[\x30.\x3035] \x68over:\x74ext-[\x76ar(\x2d-text)]"} href="/sections">
              <span className={"flex h-[18px] w-[18px] shrink-0 items-center justify-center \x74ext-[\x76ar(\x2d-text-tertiary)] \x67roup-hover:\x74ext-[\x76ar(\x2d-text-secondary)]"} aria-hidden="true">
                <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="currentColor" viewBox="0 0 256 256">
                  <path d="M208,144a15.78,15.78,0,0,1-10.42,14.94L146,178l-19,51.62a15.92,15.92,0,0,1-29.88,0L78,178l-51.62-19a15.92,15.92,0,0,1,0-29.88L78,110l19-51.62a15.92,15.92,0,0,1,29.88,0L146,110l51.62,19A15.78,15.78,0,0,1,208,144ZM152,48h16V64a8,8,0,0,0,16,0V48h16a8,8,0,0,0,0-16H184V16a8,8,0,0,0-16,0V32H152a8,8,0,0,0,0,16Zm88,32h-8V72a8,8,0,0,0-16,0v8h-8a8,8,0,0,0,0,16h8v8a8,8,0,0,0,16,0V96h8a8,8,0,0,0,0-16Z" />
                </svg>
              </span>
              <span className="min-w-0 flex-1 truncate">Sections</span>
              <span className={"shrink-0 text-[11px] tabular-nums \x74ext-[\x76ar(\x2d-text-tertiary)]"}>58</span>
            </a>
            <a className={"group mx-2 flex items-center gap-2.5 rounded-[12px] px-2.5 py-[7px] text-[13px] transition-[background-color,color,box-shadow] duration-150 \x74ext-[\x76ar(\x2d-text-secondary)] \x68over:\x62g-black/[\x30.\x3035] \x68over:\x74ext-[\x76ar(\x2d-text)]"} href="/videos">
              <span className={"flex h-[18px] w-[18px] shrink-0 items-center justify-center \x74ext-[\x76ar(\x2d-text-tertiary)] \x67roup-hover:\x74ext-[\x76ar(\x2d-text-secondary)]"} aria-hidden="true">
                <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="currentColor" viewBox="0 0 256 256">
                  <path d="M216,104H102.09L210,75.51a8,8,0,0,0,5.68-9.84l-8.16-30a15.93,15.93,0,0,0-19.42-11.13L35.81,64.74a15.75,15.75,0,0,0-9.7,7.4,15.51,15.51,0,0,0-1.55,12L32,111.56c0,.14,0,.29,0,.44v88a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V112A8,8,0,0,0,216,104ZM192.16,40l6,22.07L164.57,71,136.44,54.72ZM77.55,70.27l28.12,16.24-59.6,15.73-6-22.08Z" />
                </svg>
              </span>
              <span className="min-w-0 flex-1 truncate">Videos</span>
              <span className={"os-chip h-5 shrink-0 px-2 text-[9.5px] uppercase tracking-wide \x74ext-[\x76ar(\x2d-text-tertiary)]"}>New</span>
            </a>
            <a className={"group mx-2 flex items-center gap-2.5 rounded-[12px] px-2.5 py-[7px] text-[13px] transition-[background-color,color,box-shadow] duration-150 \x74ext-[\x76ar(\x2d-text-secondary)] \x68over:\x62g-black/[\x30.\x3035] \x68over:\x74ext-[\x76ar(\x2d-text)]"} href="/guides">
              <span className={"flex h-[18px] w-[18px] shrink-0 items-center justify-center \x74ext-[\x76ar(\x2d-text-tertiary)] \x67roup-hover:\x74ext-[\x76ar(\x2d-text-secondary)]"} aria-hidden="true">
                <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="currentColor" viewBox="0 0 256 256">
                  <path d="M232,48H168a32,32,0,0,0-32,32v87.73a8.17,8.17,0,0,1-7.47,8.25,8,8,0,0,1-8.53-8V80A32,32,0,0,0,88,48H24a8,8,0,0,0-8,8V200a8,8,0,0,0,8,8H96a24,24,0,0,1,24,23.94,7.9,7.9,0,0,0,5.12,7.55A8,8,0,0,0,136,232a24,24,0,0,1,24-24h72a8,8,0,0,0,8-8V56A8,8,0,0,0,232,48ZM208,168H168.27a8.17,8.17,0,0,1-8.25-7.47,8,8,0,0,1,8-8.53h39.73a8.17,8.17,0,0,1,8.25,7.47A8,8,0,0,1,208,168Zm0-32H168.27a8.17,8.17,0,0,1-8.25-7.47,8,8,0,0,1,8-8.53h39.73a8.17,8.17,0,0,1,8.25,7.47A8,8,0,0,1,208,136Zm0-32H168.27A8.17,8.17,0,0,1,160,96.53,8,8,0,0,1,168,88h39.73A8.17,8.17,0,0,1,216,95.47,8,8,0,0,1,208,104Z" />
                </svg>
              </span>
              <span className="min-w-0 flex-1 truncate">Guides</span>
            </a>
            <div className="label px-5 pb-1.5 pt-5">Platform</div>
            <a className={"group mx-2 flex items-center gap-2.5 rounded-[12px] px-2.5 py-[7px] text-[13px] transition-[background-color,color,box-shadow] duration-150 \x74ext-[\x76ar(\x2d-text-secondary)] \x68over:\x62g-black/[\x30.\x3035] \x68over:\x74ext-[\x76ar(\x2d-text)]"} href="/?platform=all">
              <span className={"flex h-[18px] w-[18px] shrink-0 items-center justify-center \x74ext-[\x76ar(\x2d-text-tertiary)] \x67roup-hover:\x74ext-[\x76ar(\x2d-text-secondary)]"} aria-hidden="true">
                <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="currentColor" viewBox="0 0 256 256">
                  <path d="M220,169.09l-92,53.65L36,169.09A8,8,0,0,0,28,182.91l96,56a8,8,0,0,0,8.06,0l96-56A8,8,0,1,0,220,169.09Z" />
                  <path d="M220,121.09l-92,53.65L36,121.09A8,8,0,0,0,28,134.91l96,56a8,8,0,0,0,8.06,0l96-56A8,8,0,1,0,220,121.09Z" />
                  <path d="M28,86.91l96,56a8,8,0,0,0,8.06,0l96-56a8,8,0,0,0,0-13.82l-96-56a8,8,0,0,0-8.06,0l-96,56a8,8,0,0,0,0,13.82Z" />
                </svg>
              </span>
              <span className="min-w-0 flex-1 truncate">All Platforms</span>
              <span className={"shrink-0 text-[11px] tabular-nums \x74ext-[\x76ar(\x2d-text-tertiary)]"}>192</span>
            </a>
            <a className={"group mx-2 flex items-center gap-2.5 rounded-[12px] px-2.5 py-[7px] text-[13px] transition-[background-color,color,box-shadow] duration-150 \x74ext-[\x76ar(\x2d-text-secondary)] \x68over:\x62g-black/[\x30.\x3035] \x68over:\x74ext-[\x76ar(\x2d-text)]"} href="/?platform=webflow">
              <span className={"flex h-[18px] w-[18px] shrink-0 items-center justify-center \x74ext-[\x76ar(\x2d-text-tertiary)] \x67roup-hover:\x74ext-[\x76ar(\x2d-text-secondary)]"} aria-hidden="true">
                <svg width="17.0625" height="10.5" viewBox="0 0 26 16" fill="none" aria-hidden="true">
                  <path fillRule="evenodd" clipRule="evenodd" d="M25.65 0L17.4654 16H9.77778L13.203 9.36892H13.0493C10.2235 13.0372 6.00738 15.452 0 16V9.46068C0 9.46068 3.84306 9.23369 6.10229 6.85844H0V0.000126383H6.85832V5.64099L7.01225 5.64036L9.8148 0.000126383H15.0016V5.60523L15.1555 5.60497L18.0632 0H25.65Z" fill="currentColor" />
                </svg>
              </span>
              <span className="min-w-0 flex-1 truncate">Webflow</span>
              <span className={"shrink-0 text-[11px] tabular-nums \x74ext-[\x76ar(\x2d-text-tertiary)]"}>189</span>
            </a>
            <a className={"group mx-2 flex items-center gap-2.5 rounded-[12px] px-2.5 py-[7px] text-[13px] transition-[background-color,color,box-shadow] duration-150 \x74ext-[\x76ar(\x2d-text-secondary)] \x68over:\x62g-black/[\x30.\x3035] \x68over:\x74ext-[\x76ar(\x2d-text)]"} href="/?platform=framer">
              <span className={"flex h-[18px] w-[18px] shrink-0 items-center justify-center \x74ext-[\x76ar(\x2d-text-tertiary)] \x67roup-hover:\x74ext-[\x76ar(\x2d-text-secondary)]"} aria-hidden="true">
                <svg width="10" height="15" viewBox="0 0 192 288" fill="none" aria-hidden="true">
                  <path d="M 96 192 L 96 288 L 0 192 L 0 96 L 96 96 L 0 0 L 192 0 L 192 96 L 96 96 L 192 192 Z" fill="currentColor" />
                </svg>
              </span>
              <span className="min-w-0 flex-1 truncate">Framer</span>
              <span className={"shrink-0 text-[11px] tabular-nums \x74ext-[\x76ar(\x2d-text-tertiary)]"}>12</span>
            </a>
            <div className="label px-5 pb-1.5 pt-5">My Library</div>
            <a className={"group mx-2 flex items-center gap-2.5 rounded-[12px] px-2.5 py-[7px] text-[13px] transition-[background-color,color,box-shadow] duration-150 \x74ext-[\x76ar(\x2d-text-secondary)] \x68over:\x62g-black/[\x30.\x3035] \x68over:\x74ext-[\x76ar(\x2d-text)]"} href="/?collection=my-templates">
              <span className={"flex h-[18px] w-[18px] shrink-0 items-center justify-center \x74ext-[\x76ar(\x2d-text-tertiary)] \x67roup-hover:\x74ext-[\x76ar(\x2d-text-secondary)]"} aria-hidden="true">
                <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="currentColor" viewBox="0 0 256 256">
                  <path d="M232,88V200.89A15.13,15.13,0,0,1,216.89,216H40a16,16,0,0,1-16-16V64A16,16,0,0,1,40,48H93.33a16.12,16.12,0,0,1,9.6,3.2L130.67,72H216A16,16,0,0,1,232,88Z" />
                </svg>
              </span>
              <span className="min-w-0 flex-1 truncate">My Templates</span>
              <span className={"shrink-0 text-[11px] tabular-nums \x74ext-[\x76ar(\x2d-text-tertiary)]"}>0</span>
            </a>
            <a className={"group mx-2 flex items-center gap-2.5 rounded-[12px] px-2.5 py-[7px] text-[13px] transition-[background-color,color,box-shadow] duration-150 \x74ext-[\x76ar(\x2d-text-secondary)] \x68over:\x62g-black/[\x30.\x3035] \x68over:\x74ext-[\x76ar(\x2d-text)]"} href="/?collection=favorites">
              <span className={"flex h-[18px] w-[18px] shrink-0 items-center justify-center \x74ext-[\x76ar(\x2d-text-tertiary)] \x67roup-hover:\x74ext-[\x76ar(\x2d-text-secondary)]"} aria-hidden="true">
                <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="currentColor" viewBox="0 0 256 256">
                  <path d="M240,102c0,70-103.79,126.66-108.21,129a8,8,0,0,1-7.58,0C119.79,228.66,16,172,16,102A62.07,62.07,0,0,1,78,40c20.65,0,38.73,8.88,50,23.89C139.27,48.88,157.35,40,178,40A62.07,62.07,0,0,1,240,102Z" />
                </svg>
              </span>
              <span className="min-w-0 flex-1 truncate">Favorites</span>
              <span className={"shrink-0 text-[11px] tabular-nums \x74ext-[\x76ar(\x2d-text-tertiary)]"}>0</span>
            </a>
          </nav>
          <div className="p-2 pt-0">
            <div className="os-rule mx-3 mb-3" />
            <div className="flex flex-col gap-2 px-2">
              <a className={"os-button relative inline-flex select-none items-center justify-center gap-2 rounded-full font-medium transition-[transform,box-shadow,filter,background-color] duration-150 ease-out \x64isabled:\x63ursor-not-allowed disabled:opacity-45 h-9 px-4 text-[12px] os-spark text-white w-full"} style={{ backgroundImage: "linear-gradient(rgb(46, 46, 46) 0%, rgb(26, 26, 26) 50%, rgb(14, 14, 14) 100%)", boxShadow: "rgba(255, 255, 255, 0.14) 0px 1px 0px inset, rgba(0, 0, 0, 0.5) 0px -1px 0px inset, rgba(0, 0, 0, 0.22) 0px 1px 2px, rgba(0, 0, 0, 0.5) 0px 10px 22px -10px, rgba(255, 82, 6, 0.55) 0px 8px 18px -12px" } as CSSProperties} href="#">View pricing</a>
              <a className={"os-button relative inline-flex select-none items-center justify-center gap-2 rounded-full font-medium transition-[transform,box-shadow,filter,background-color] duration-150 ease-out \x64isabled:\x63ursor-not-allowed disabled:opacity-45 h-9 px-4 text-[12px] \x74ext-[\x76ar(\x2d-text)] w-full"} style={{ backgroundImage: "linear-gradient(rgb(255, 255, 255) 0%, rgb(248, 248, 247) 55%, rgb(239, 239, 238) 100%)", boxShadow: "rgb(255, 255, 255) 0px 1px 0px inset, rgba(0, 0, 0, 0.05) 0px -1px 0px inset, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px, rgba(0, 0, 0, 0.08) 0px 1px 2px, rgba(0, 0, 0, 0.28) 0px 8px 18px -10px" } as CSSProperties} href="/signin">Sign in</a>
            </div>
            <div className="mt-2">
              <button className={"group mx-2 flex w-[calc(100%-16px)] items-center gap-2.5 rounded-[12px] px-2.5 py-[7px] text-left text-[13px] \x74ext-[\x76ar(\x2d-text-secondary)] transition-[background-color,color] duration-150 \x68over:\x62g-black/[\x30.\x3035] \x68over:\x74ext-[\x76ar(\x2d-text)]"} type="button">
                <span className={"flex h-[18px] w-[18px] shrink-0 items-center justify-center \x74ext-[\x76ar(\x2d-text-tertiary)] \x67roup-hover:\x74ext-[\x76ar(\x2d-text-secondary)]"} aria-hidden="true">
                  <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="currentColor" viewBox="0 0 256 256">
                    <path d="M128,24A104,104,0,0,0,36.18,176.88L24.83,210.93a16,16,0,0,0,20.24,20.24l34.05-11.35A104,104,0,1,0,128,24Zm32,128H96a8,8,0,0,1,0-16h64a8,8,0,0,1,0,16Zm0-32H96a8,8,0,0,1,0-16h64a8,8,0,0,1,0,16Z" />
                  </svg>
                </span>
                <span className="min-w-0 flex-1 truncate">Feedback</span>
              </button>
              <a className={"group mx-2 flex items-center gap-2.5 rounded-[12px] px-2.5 py-[7px] text-[13px] transition-[background-color,color,box-shadow] duration-150 \x74ext-[\x76ar(\x2d-text-secondary)] \x68over:\x62g-black/[\x30.\x3035] \x68over:\x74ext-[\x76ar(\x2d-text)]"} href="/help">
                <span className={"flex h-[18px] w-[18px] shrink-0 items-center justify-center \x74ext-[\x76ar(\x2d-text-tertiary)] \x67roup-hover:\x74ext-[\x76ar(\x2d-text-secondary)]"} aria-hidden="true">
                  <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="currentColor" viewBox="0 0 256 256">
                    <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,168a12,12,0,1,1,12-12A12,12,0,0,1,128,192Zm8-48.72V144a8,8,0,0,1-16,0v-8a8,8,0,0,1,8-8c13.23,0,24-9,24-20s-10.77-20-24-20-24,9-24,20v4a8,8,0,0,1-16,0v-4c0-19.85,17.94-36,40-36s40,16.15,40,36C168,125.38,154.24,139.93,136,143.28Z" />
                  </svg>
                </span>
                <span className="min-w-0 flex-1 truncate">Help</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

function ImportedSectionMakeExplainerVideosWith() {
  return (
    <section className={"mx-auto mt-10 max-w-6xl px-4 sm:px-6 mb-6 !mt-0 !px-0 \x6cg:\x68idden"}>
      <div className={"os-dark flex flex-col gap-6 overflow-hidden !rounded-[var(--r-shell)] p-6 sm:p-8 \x6cg:\x66lex-row \x6cg:\x69tems-center \x6cg:\x6austify-between"}>
        <div className="max-w-md">
          <p className={"inline-flex rounded-full \x62g-[#\x665d98a] px-2.5 py-1 text-[10.5px] font-bold uppercase tracking-wide \x74ext-[#\x33b2a08]"}>New · Video skills</p>
          <h2 className={"mt-3 \x66ont-[\x66amily-name:\x76ar(\x2d-font-heading)] text-[26px] font-medium leading-tight tracking-tight text-white \x73m:\x74ext-[\x330px]"}>Make explainer videos <span className={"\x74ext-white/\x350"}>with Claude.</span></h2>
          <p className={"mt-2 text-[13.5px] leading-relaxed \x74ext-white/\x360"}>All 3 premium video styles plus new ones as they launch. Separate from template plans.</p>
        </div>
        <div className="grid grid-cols-2 gap-2 lg:w-[380px]">
          <a className={"rounded-2xl \x62g-white/[\x30.\x306] p-4 \x72ing-1 \x72ing-white/\x310 transition-colors \x68over:\x62g-white/\x310"} href="/pricing/videos">
            <p className={"text-[12.5px] \x74ext-white/\x360"}>Monthly</p>
            <p className={"mt-1 \x66ont-[\x66amily-name:\x76ar(\x2d-font-heading)] text-[28px] font-medium leading-none text-white"}>$9.99</p>
            <p className={"mt-1.5 text-[11.5px] \x74ext-white/\x345"}>per month</p>
          </a>
          <a className={"relative rounded-2xl \x62g-white/[\x30.\x306] p-4 \x72ing-1 \x72ing-[#\x665d98a]/\x340 transition-colors \x68over:\x62g-white/\x310"} href="/pricing/videos">
            <span className={"absolute right-3 top-3 rounded-full \x62g-[#\x665d98a] px-1.5 text-[9.5px] font-bold uppercase leading-[16px] \x74ext-[#\x33b2a08]"}>-33%</span>
            <p className={"text-[12.5px] \x74ext-white/\x360"}>Yearly</p>
            <p className={"mt-1 \x66ont-[\x66amily-name:\x76ar(\x2d-font-heading)] text-[28px] font-medium leading-none text-white"}>$79.99</p>
            <p className={"mt-1.5 text-[11.5px] \x74ext-white/\x345"}>$6.67/mo, billed yearly</p>
          </a>
          <a className="col-span-2 flex h-11 items-center justify-center gap-1.5 rounded-full bg-white text-[13.5px] font-semibold text-black" href="/pricing/videos">See video plans <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg></a>
          <a className={"col-span-2 text-center text-[12px] \x74ext-white/\x355 \x75nderline-offset-2 \x68over:\x75nderline"} href="/videos/rays">Or try Rays free</a>
        </div>
      </div>
    </section>
  );
}

function ImportedSectionSections() {
  return (
    <section className={"os-soft flex \x73croll-mt-24 flex-col p-6 sm:p-7"} id="plan-starter">
      <div className="flex items-start justify-between gap-3">
        <h2 className={"text-[15px] font-medium \x74ext-[\x76ar(\x2d-text)]"}>Sections</h2>
      </div>
      <div className="mt-4 flex items-baseline gap-1.5">
        <span className="relative inline-flex items-baseline gap-2">
          <span className={"\x66ont-[\x66amily-name:\x76ar(\x2d-font-heading)] text-[44px] font-medium leading-none tracking-tight \x74ext-[\x76ar(\x2d-text)]"}>$15</span>
        </span>
        <span className={"text-[13px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>/ month</span>
      </div>
      <p className={"mt-2 text-[13px] \x74ext-[\x76ar(\x2d-text-secondary)]"}>Every Pro section and one template a month. The easy way in.</p>
      <div className="mt-5">
        <p className={"text-[10.5px] font-medium uppercase tracking-[0.08em] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>Works with</p>
        <div className="mt-2 flex flex-wrap items-center gap-1.5">
          <span className={"flex h-8 w-8 items-center justify-center rounded-[9px] \x73hadow-[\x30_0_0_1px_rgba(\x30,\x30,\x30,\x30.\x307),\x30_1px_2px_rgba(\x30,\x30,\x30,\x30.\x306)] bg-white"} title="Claude Code">
            <img style={{ color: "transparent" }} alt="Claude Code" loading="lazy" width="18" height="18" decoding="async" src="/site-assets/3737e44be6f1bbfb-5a19e14c570fcde745ab2532dc89a9e8.png" />
          </span>
          <span className={"flex h-8 w-8 items-center justify-center rounded-[9px] \x73hadow-[\x30_0_0_1px_rgba(\x30,\x30,\x30,\x30.\x307),\x30_1px_2px_rgba(\x30,\x30,\x30,\x30.\x306)] \x62g-[#\x3111]"} title="Cursor">
            <img className={"\x69nvert"} style={{ color: "transparent" }} alt="Cursor" loading="lazy" width="18" height="18" decoding="async" src="/site-assets/8cf8b65ff525f0ff-49ebbaad505f220ef8e4b9a616cb6435.png" />
          </span>
          <span className={"flex h-8 w-8 items-center justify-center rounded-[9px] \x73hadow-[\x30_0_0_1px_rgba(\x30,\x30,\x30,\x30.\x307),\x30_1px_2px_rgba(\x30,\x30,\x30,\x30.\x306)] bg-white"} title="v0">
            <img style={{ color: "transparent" }} alt="v0" loading="lazy" width="18" height="18" decoding="async" src="/site-assets/b06fd899b1111984-5ae9202f6b3df6563b0d0d89be27f00a.png" />
          </span>
          <span className={"flex h-8 w-8 items-center justify-center rounded-[9px] \x73hadow-[\x30_0_0_1px_rgba(\x30,\x30,\x30,\x30.\x307),\x30_1px_2px_rgba(\x30,\x30,\x30,\x30.\x306)] \x62g-[#\x3111]"} title="Lovable">
            <img style={{ color: "transparent" }} alt="Lovable" loading="lazy" width="18" height="18" decoding="async" src="/site-assets/c071d2a2086e34ac-14e29e39e1cb77a54af42896b9e1a8b3.png" />
          </span>
          <span className={"mx-1 h-5 w-px \x62g-black/\x310"} aria-hidden="true" />
          <span className={"flex h-8 w-8 items-center justify-center rounded-[9px] \x73hadow-[\x30_0_0_1px_rgba(\x30,\x30,\x30,\x30.\x307),\x30_1px_2px_rgba(\x30,\x30,\x30,\x30.\x306)] bg-white"} title="Webflow">
            <svg width="16.25" height="10" viewBox="0 0 26 16" fill="none" role="img" aria-label="Webflow">
              <title>Webflow</title>
              <path fillRule="evenodd" clipRule="evenodd" d="M25.65 0L17.4654 16H9.77778L13.203 9.36892H13.0493C10.2235 13.0372 6.00738 15.452 0 16V9.46068C0 9.46068 3.84306 9.23369 6.10229 6.85844H0V0.000126383H6.85832V5.64099L7.01225 5.64036L9.8148 0.000126383H15.0016V5.60523L15.1555 5.60497L18.0632 0H25.65Z" fill="#146EF5" />
            </svg>
          </span>
          <span className={"flex h-8 w-8 items-center justify-center rounded-[9px] \x73hadow-[\x30_0_0_1px_rgba(\x30,\x30,\x30,\x30.\x307),\x30_1px_2px_rgba(\x30,\x30,\x30,\x30.\x306)] bg-white text-black"} title="Framer">
            <svg width="9.333333333333332" height="14" viewBox="0 0 192 288" fill="none" role="img" aria-label="Framer">
              <title>Framer</title>
              <path d="M 96 192 L 96 288 L 0 192 L 0 96 L 96 96 L 0 0 L 192 0 L 192 96 L 96 96 L 192 192 Z" fill="currentColor" />
            </svg>
          </span>
        </div>
      </div>
      <div className="mt-5">
        <CheckoutButton plan="sections" className={"os-button relative inline-flex select-none items-center justify-center gap-2 rounded-full font-medium transition-[transform,box-shadow,filter,background-color] duration-150 ease-out \x64isabled:\x63ursor-not-allowed disabled:opacity-45 h-12 px-6 text-[14px] \x74ext-[\x76ar(\x2d-text)] w-full"} style={{ backgroundImage: "linear-gradient(rgb(255, 255, 255) 0%, rgb(248, 248, 247) 55%, rgb(239, 239, 238) 100%)", boxShadow: "rgb(255, 255, 255) 0px 1px 0px inset, rgba(0, 0, 0, 0.05) 0px -1px 0px inset, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px, rgba(0, 0, 0, 0.08) 0px 1px 2px, rgba(0, 0, 0, 0.28) 0px 8px 18px -10px" } as CSSProperties}>Get Sections</CheckoutButton>
        <a className={"mt-3 flex items-start gap-2 rounded-[12px] px-3 py-2 text-[12px] leading-snug transition-colors \x62g-[#\x65ef7ea] \x74ext-[#\x31f5a33] \x72ing-1 \x72ing-[\x72gba(\x340,\x3110,\x360,\x30.\x314)] \x68over:\x62g-[#\x656f3e1]"} href="/refunds">
          <span className={"mt-px flex h-4 w-4 shrink-0 items-center justify-center rounded-full \x62g-[#\x31f9d55] text-white"}>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="m5 12.5 4.5 4.5L19 7.5" />
            </svg>
          </span>
          <span>Full refund within 14 days, no questions asked.</span>
        </a>
      </div>
      <div className="os-rule mt-6" />
      <ul className={"mt-5 \x73pace-y-3"}>
        <li className="flex items-start gap-2.5">
          <span className={"mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-white \x74ext-[\x76ar(\x2d-text)] \x73hadow-[\x30_0_0_1px_rgba(\x30,\x30,\x30,\x30.\x308),\x30_1px_1px_rgba(\x30,\x30,\x30,\x30.\x305)]"}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="m5 12.5 4.5 4.5L19 7.5" />
            </svg>
          </span>
          <span className={"text-[13px] leading-relaxed \x74ext-[\x76ar(\x2d-text-secondary)]"}>Every Pro section, plus new ones as they land</span>
        </li>
        <li className="flex items-start gap-2.5">
          <span className={"mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-white \x74ext-[\x76ar(\x2d-text)] \x73hadow-[\x30_0_0_1px_rgba(\x30,\x30,\x30,\x30.\x308),\x30_1px_1px_rgba(\x30,\x30,\x30,\x30.\x305)]"}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="m5 12.5 4.5 4.5L19 7.5" />
            </svg>
          </span>
          <span className={"text-[13px] leading-relaxed \x74ext-[\x76ar(\x2d-text-secondary)]"}>1 template credit every paid month</span>
        </li>
        <li className="flex items-start gap-2.5">
          <span className={"mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-white \x74ext-[\x76ar(\x2d-text)] \x73hadow-[\x30_0_0_1px_rgba(\x30,\x30,\x30,\x30.\x308),\x30_1px_1px_rgba(\x30,\x30,\x30,\x30.\x305)]"}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="m5 12.5 4.5 4.5L19 7.5" />
            </svg>
          </span>
          <span className={"text-[13px] leading-relaxed \x74ext-[\x76ar(\x2d-text-secondary)]"}>Copy unlocked templates into Claude, Cursor &amp; v0 as a full prompt (AI-ready templates)</span>
        </li>
        <li className="flex items-start gap-2.5">
          <span className={"mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-white \x74ext-[\x76ar(\x2d-text)] \x73hadow-[\x30_0_0_1px_rgba(\x30,\x30,\x30,\x30.\x308),\x30_1px_1px_rgba(\x30,\x30,\x30,\x30.\x305)]"}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="m5 12.5 4.5 4.5L19 7.5" />
            </svg>
          </span>
          <span className={"text-[13px] leading-relaxed \x74ext-[\x76ar(\x2d-text-secondary)]"}>1 credit unlocks a design and all its formats, permanently</span>
        </li>
        <li className="flex items-start gap-2.5">
          <span className={"mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-white \x74ext-[\x76ar(\x2d-text)] \x73hadow-[\x30_0_0_1px_rgba(\x30,\x30,\x30,\x30.\x308),\x30_1px_1px_rgba(\x30,\x30,\x30,\x30.\x305)]"}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="m5 12.5 4.5 4.5L19 7.5" />
            </svg>
          </span>
          <span className={"text-[13px] leading-relaxed \x74ext-[\x76ar(\x2d-text-secondary)]"}>Keep everything you unlock, even after cancelling</span>
        </li>
        <li className="flex items-start gap-2.5">
          <span className={"mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-white \x74ext-[\x76ar(\x2d-text)] \x73hadow-[\x30_0_0_1px_rgba(\x30,\x30,\x30,\x30.\x308),\x30_1px_1px_rgba(\x30,\x30,\x30,\x30.\x305)]"}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="m5 12.5 4.5 4.5L19 7.5" />
            </svg>
          </span>
          <span className={"text-[13px] leading-relaxed \x74ext-[\x76ar(\x2d-text-tertiary)]"}>Credits reset each month and do not roll over</span>
        </li>
      </ul>
      <div className="mt-8">
        <div className={"relative mx-auto h-[200px] overflow-hidden rounded-[16px] bg-white p-2 \x73hadow-[\x30_0_0_1px_rgba(\x30,\x30,\x30,\x30.\x306),\x30_18px_36px_-20px_rgba(\x30,\x30,\x30,\x30.\x335)] [mask-image:linear-gradient(180deg,transparent,#000_16%,#000_84%,transparent)]"} aria-hidden="true">
          <div className="grid h-full grid-cols-2 gap-2">
            <div className="overflow-hidden">
              <div className={"flex flex-col gap-2 \x6dotion-safe:\x61nimate-[\x6fs-marquee-up_linear_infinite]"} style={{ animationDuration: "22s", animationDirection: "normal" } as CSSProperties}>
                <div className={"relative aspect-[16/10] w-full shrink-0 overflow-hidden rounded-[8px] \x72ing-1 \x72ing-black/\x35"}>
                  <img className={"object-cover \x6fbject-top"} style={{ position: "absolute", height: "100%", width: "100%", inset: "0px", color: "transparent" }} alt="" loading="lazy" decoding="async" src="/site-assets/7a4a567962749912.webp" />
                </div>
                <div className={"relative aspect-[16/10] w-full shrink-0 overflow-hidden rounded-[8px] \x72ing-1 \x72ing-black/\x35"}>
                  <img className={"object-cover \x6fbject-top"} style={{ position: "absolute", height: "100%", width: "100%", inset: "0px", color: "transparent" }} alt="" loading="lazy" decoding="async" src="/site-assets/0a8774a472a19fea.webp" />
                </div>
                <div className={"relative aspect-[16/10] w-full shrink-0 overflow-hidden rounded-[8px] \x72ing-1 \x72ing-black/\x35"}>
                  <img className={"object-cover \x6fbject-top"} style={{ position: "absolute", height: "100%", width: "100%", inset: "0px", color: "transparent" }} alt="" loading="lazy" decoding="async" src="/site-assets/7dfda5219ff4277f.webp" />
                </div>
                <div className={"relative aspect-[16/10] w-full shrink-0 overflow-hidden rounded-[8px] \x72ing-1 \x72ing-black/\x35"}>
                  <img className={"object-cover \x6fbject-top"} style={{ position: "absolute", height: "100%", width: "100%", inset: "0px", color: "transparent" }} alt="" loading="lazy" decoding="async" src="/site-assets/8b1303595328c998.webp" />
                </div>
                <div className={"relative aspect-[16/10] w-full shrink-0 overflow-hidden rounded-[8px] \x72ing-1 \x72ing-black/\x35"}>
                  <img className={"object-cover \x6fbject-top"} style={{ position: "absolute", height: "100%", width: "100%", inset: "0px", color: "transparent" }} alt="" loading="lazy" decoding="async" src="/site-assets/84f67e00fa378b78.webp" />
                </div>
                <div className={"relative aspect-[16/10] w-full shrink-0 overflow-hidden rounded-[8px] \x72ing-1 \x72ing-black/\x35"}>
                  <img className={"object-cover \x6fbject-top"} style={{ position: "absolute", height: "100%", width: "100%", inset: "0px", color: "transparent" }} alt="" loading="lazy" decoding="async" src="/site-assets/151dc951416e275e.webp" />
                </div>
                <div className={"relative aspect-[16/10] w-full shrink-0 overflow-hidden rounded-[8px] \x72ing-1 \x72ing-black/\x35"}>
                  <img className={"object-cover \x6fbject-top"} style={{ position: "absolute", height: "100%", width: "100%", inset: "0px", color: "transparent" }} alt="" loading="lazy" decoding="async" src="/site-assets/7a4a567962749912.webp" />
                </div>
                <div className={"relative aspect-[16/10] w-full shrink-0 overflow-hidden rounded-[8px] \x72ing-1 \x72ing-black/\x35"}>
                  <img className={"object-cover \x6fbject-top"} style={{ position: "absolute", height: "100%", width: "100%", inset: "0px", color: "transparent" }} alt="" loading="lazy" decoding="async" src="/site-assets/0a8774a472a19fea.webp" />
                </div>
                <div className={"relative aspect-[16/10] w-full shrink-0 overflow-hidden rounded-[8px] \x72ing-1 \x72ing-black/\x35"}>
                  <img className={"object-cover \x6fbject-top"} style={{ position: "absolute", height: "100%", width: "100%", inset: "0px", color: "transparent" }} alt="" loading="lazy" decoding="async" src="/site-assets/7dfda5219ff4277f.webp" />
                </div>
                <div className={"relative aspect-[16/10] w-full shrink-0 overflow-hidden rounded-[8px] \x72ing-1 \x72ing-black/\x35"}>
                  <img className={"object-cover \x6fbject-top"} style={{ position: "absolute", height: "100%", width: "100%", inset: "0px", color: "transparent" }} alt="" loading="lazy" decoding="async" src="/site-assets/8b1303595328c998.webp" />
                </div>
                <div className={"relative aspect-[16/10] w-full shrink-0 overflow-hidden rounded-[8px] \x72ing-1 \x72ing-black/\x35"}>
                  <img className={"object-cover \x6fbject-top"} style={{ position: "absolute", height: "100%", width: "100%", inset: "0px", color: "transparent" }} alt="" loading="lazy" decoding="async" src="/site-assets/84f67e00fa378b78.webp" />
                </div>
                <div className={"relative aspect-[16/10] w-full shrink-0 overflow-hidden rounded-[8px] \x72ing-1 \x72ing-black/\x35"}>
                  <img className={"object-cover \x6fbject-top"} style={{ position: "absolute", height: "100%", width: "100%", inset: "0px", color: "transparent" }} alt="" loading="lazy" decoding="async" src="/site-assets/151dc951416e275e.webp" />
                </div>
              </div>
            </div>
            <div className="overflow-hidden">
              <div className={"flex flex-col gap-2 \x6dotion-safe:\x61nimate-[\x6fs-marquee-up_linear_infinite]"} style={{ animationDuration: "28s", animationDirection: "reverse" } as CSSProperties}>
                <div className={"relative aspect-[16/10] w-full shrink-0 overflow-hidden rounded-[8px] \x72ing-1 \x72ing-black/\x35"}>
                  <img className={"object-cover \x6fbject-top"} style={{ position: "absolute", height: "100%", width: "100%", inset: "0px", color: "transparent" }} alt="" loading="lazy" decoding="async" src="/site-assets/85032072e01d8d59.webp" />
                </div>
                <div className={"relative aspect-[16/10] w-full shrink-0 overflow-hidden rounded-[8px] \x72ing-1 \x72ing-black/\x35"}>
                  <img className={"object-cover \x6fbject-top"} style={{ position: "absolute", height: "100%", width: "100%", inset: "0px", color: "transparent" }} alt="" loading="lazy" decoding="async" src="/site-assets/1db11d66a9a3b89c.webp" />
                </div>
                <div className={"relative aspect-[16/10] w-full shrink-0 overflow-hidden rounded-[8px] \x72ing-1 \x72ing-black/\x35"}>
                  <img className={"object-cover \x6fbject-top"} style={{ position: "absolute", height: "100%", width: "100%", inset: "0px", color: "transparent" }} alt="" loading="lazy" decoding="async" src="/site-assets/3980afc0627c0f3a.webp" />
                </div>
                <div className={"relative aspect-[16/10] w-full shrink-0 overflow-hidden rounded-[8px] \x72ing-1 \x72ing-black/\x35"}>
                  <img className={"object-cover \x6fbject-top"} style={{ position: "absolute", height: "100%", width: "100%", inset: "0px", color: "transparent" }} alt="" loading="lazy" decoding="async" src="/site-assets/f5631803122804d7.webp" />
                </div>
                <div className={"relative aspect-[16/10] w-full shrink-0 overflow-hidden rounded-[8px] \x72ing-1 \x72ing-black/\x35"}>
                  <img className={"object-cover \x6fbject-top"} style={{ position: "absolute", height: "100%", width: "100%", inset: "0px", color: "transparent" }} alt="" loading="lazy" decoding="async" src="/site-assets/35954cbe83da4223.webp" />
                </div>
                <div className={"relative aspect-[16/10] w-full shrink-0 overflow-hidden rounded-[8px] \x72ing-1 \x72ing-black/\x35"}>
                  <img className={"object-cover \x6fbject-top"} style={{ position: "absolute", height: "100%", width: "100%", inset: "0px", color: "transparent" }} alt="" loading="lazy" decoding="async" src="/site-assets/c96409457dce64b7.webp" />
                </div>
                <div className={"relative aspect-[16/10] w-full shrink-0 overflow-hidden rounded-[8px] \x72ing-1 \x72ing-black/\x35"}>
                  <img className={"object-cover \x6fbject-top"} style={{ position: "absolute", height: "100%", width: "100%", inset: "0px", color: "transparent" }} alt="" loading="lazy" decoding="async" src="/site-assets/85032072e01d8d59.webp" />
                </div>
                <div className={"relative aspect-[16/10] w-full shrink-0 overflow-hidden rounded-[8px] \x72ing-1 \x72ing-black/\x35"}>
                  <img className={"object-cover \x6fbject-top"} style={{ position: "absolute", height: "100%", width: "100%", inset: "0px", color: "transparent" }} alt="" loading="lazy" decoding="async" src="/site-assets/1db11d66a9a3b89c.webp" />
                </div>
                <div className={"relative aspect-[16/10] w-full shrink-0 overflow-hidden rounded-[8px] \x72ing-1 \x72ing-black/\x35"}>
                  <img className={"object-cover \x6fbject-top"} style={{ position: "absolute", height: "100%", width: "100%", inset: "0px", color: "transparent" }} alt="" loading="lazy" decoding="async" src="/site-assets/3980afc0627c0f3a.webp" />
                </div>
                <div className={"relative aspect-[16/10] w-full shrink-0 overflow-hidden rounded-[8px] \x72ing-1 \x72ing-black/\x35"}>
                  <img className={"object-cover \x6fbject-top"} style={{ position: "absolute", height: "100%", width: "100%", inset: "0px", color: "transparent" }} alt="" loading="lazy" decoding="async" src="/site-assets/f5631803122804d7.webp" />
                </div>
                <div className={"relative aspect-[16/10] w-full shrink-0 overflow-hidden rounded-[8px] \x72ing-1 \x72ing-black/\x35"}>
                  <img className={"object-cover \x6fbject-top"} style={{ position: "absolute", height: "100%", width: "100%", inset: "0px", color: "transparent" }} alt="" loading="lazy" decoding="async" src="/site-assets/35954cbe83da4223.webp" />
                </div>
                <div className={"relative aspect-[16/10] w-full shrink-0 overflow-hidden rounded-[8px] \x72ing-1 \x72ing-black/\x35"}>
                  <img className={"object-cover \x6fbject-top"} style={{ position: "absolute", height: "100%", width: "100%", inset: "0px", color: "transparent" }} alt="" loading="lazy" decoding="async" src="/site-assets/c96409457dce64b7.webp" />
                </div>
              </div>
            </div>
          </div>
          <span className={"absolute left-1/2 top-1/2 z-10 inline-flex h-8 \x2dtranslate-x-1/\x32 \x2dtranslate-y-1/\x32 items-center gap-1.5 rounded-full \x62g-[#\x3111] px-3.5 text-[12.5px] font-semibold \x74ext-[#\x665d98a] \x73hadow-[\x30_10px_30px_-6px_rgba(\x30,\x30,\x30,\x30.\x35)]"}>✦ Pro sections</span>
        </div>
        <p className={"mt-6 text-center text-[14px] font-medium \x74ext-[\x76ar(\x2d-text)]"}>20 Pro sections + 1 template a month</p>
      </div>
    </section>
  );
}

function ImportedSectionSectionsTemplates() {
  return (
    <section className={"os-soft flex \x73croll-mt-24 flex-col p-6 sm:p-7"} id="plan-monthly">
      <div className="flex items-start justify-between gap-3">
        <h2 className={"text-[15px] font-medium \x74ext-[\x76ar(\x2d-text)]"}>Sections + Templates</h2>
      </div>
      <div className="mt-4 flex items-baseline gap-1.5">
        <span className="relative inline-flex items-baseline gap-2">
          <span className={"\x66ont-[\x66amily-name:\x76ar(\x2d-font-heading)] text-[44px] font-medium leading-none tracking-tight \x74ext-[\x76ar(\x2d-text)]"}>$39</span>
        </span>
        <span className={"text-[13px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>/ month</span>
      </div>
      <p className={"mt-2 text-[13px] \x74ext-[\x76ar(\x2d-text-secondary)]"}>Three credits a month. Good if you ship a few projects a year.</p>
      <div className="mt-5">
        <p className={"text-[10.5px] font-medium uppercase tracking-[0.08em] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>Works with</p>
        <div className="mt-2 flex flex-wrap items-center gap-1.5">
          <span className={"flex h-8 w-8 items-center justify-center rounded-[9px] \x73hadow-[\x30_0_0_1px_rgba(\x30,\x30,\x30,\x30.\x307),\x30_1px_2px_rgba(\x30,\x30,\x30,\x30.\x306)] bg-white"} title="Claude Code">
            <img style={{ color: "transparent" }} alt="Claude Code" loading="lazy" width="18" height="18" decoding="async" src="/site-assets/3737e44be6f1bbfb-5a19e14c570fcde745ab2532dc89a9e8.png" />
          </span>
          <span className={"flex h-8 w-8 items-center justify-center rounded-[9px] \x73hadow-[\x30_0_0_1px_rgba(\x30,\x30,\x30,\x30.\x307),\x30_1px_2px_rgba(\x30,\x30,\x30,\x30.\x306)] \x62g-[#\x3111]"} title="Cursor">
            <img className={"\x69nvert"} style={{ color: "transparent" }} alt="Cursor" loading="lazy" width="18" height="18" decoding="async" src="/site-assets/8cf8b65ff525f0ff-49ebbaad505f220ef8e4b9a616cb6435.png" />
          </span>
          <span className={"flex h-8 w-8 items-center justify-center rounded-[9px] \x73hadow-[\x30_0_0_1px_rgba(\x30,\x30,\x30,\x30.\x307),\x30_1px_2px_rgba(\x30,\x30,\x30,\x30.\x306)] bg-white"} title="v0">
            <img style={{ color: "transparent" }} alt="v0" loading="lazy" width="18" height="18" decoding="async" src="/site-assets/b06fd899b1111984-5ae9202f6b3df6563b0d0d89be27f00a.png" />
          </span>
          <span className={"flex h-8 w-8 items-center justify-center rounded-[9px] \x73hadow-[\x30_0_0_1px_rgba(\x30,\x30,\x30,\x30.\x307),\x30_1px_2px_rgba(\x30,\x30,\x30,\x30.\x306)] \x62g-[#\x3111]"} title="Lovable">
            <img style={{ color: "transparent" }} alt="Lovable" loading="lazy" width="18" height="18" decoding="async" src="/site-assets/c071d2a2086e34ac-14e29e39e1cb77a54af42896b9e1a8b3.png" />
          </span>
          <span className={"mx-1 h-5 w-px \x62g-black/\x310"} aria-hidden="true" />
          <span className={"flex h-8 w-8 items-center justify-center rounded-[9px] \x73hadow-[\x30_0_0_1px_rgba(\x30,\x30,\x30,\x30.\x307),\x30_1px_2px_rgba(\x30,\x30,\x30,\x30.\x306)] bg-white"} title="Webflow">
            <svg width="16.25" height="10" viewBox="0 0 26 16" fill="none" role="img" aria-label="Webflow">
              <title>Webflow</title>
              <path fillRule="evenodd" clipRule="evenodd" d="M25.65 0L17.4654 16H9.77778L13.203 9.36892H13.0493C10.2235 13.0372 6.00738 15.452 0 16V9.46068C0 9.46068 3.84306 9.23369 6.10229 6.85844H0V0.000126383H6.85832V5.64099L7.01225 5.64036L9.8148 0.000126383H15.0016V5.60523L15.1555 5.60497L18.0632 0H25.65Z" fill="#146EF5" />
            </svg>
          </span>
          <span className={"flex h-8 w-8 items-center justify-center rounded-[9px] \x73hadow-[\x30_0_0_1px_rgba(\x30,\x30,\x30,\x30.\x307),\x30_1px_2px_rgba(\x30,\x30,\x30,\x30.\x306)] bg-white text-black"} title="Framer">
            <svg width="9.333333333333332" height="14" viewBox="0 0 192 288" fill="none" role="img" aria-label="Framer">
              <title>Framer</title>
              <path d="M 96 192 L 96 288 L 0 192 L 0 96 L 96 96 L 0 0 L 192 0 L 192 96 L 96 96 L 192 192 Z" fill="currentColor" />
            </svg>
          </span>
        </div>
      </div>
      <div className="mt-5">
        <CheckoutButton plan="sections-templates" className={"os-button relative inline-flex select-none items-center justify-center gap-2 rounded-full font-medium transition-[transform,box-shadow,filter,background-color] duration-150 ease-out \x64isabled:\x63ursor-not-allowed disabled:opacity-45 h-12 px-6 text-[14px] os-spark text-white w-full"} style={{ backgroundImage: "linear-gradient(rgb(46, 46, 46) 0%, rgb(26, 26, 26) 50%, rgb(14, 14, 14) 100%)", boxShadow: "rgba(255, 255, 255, 0.14) 0px 1px 0px inset, rgba(0, 0, 0, 0.5) 0px -1px 0px inset, rgba(0, 0, 0, 0.22) 0px 1px 2px, rgba(0, 0, 0, 0.5) 0px 10px 22px -10px, rgba(255, 82, 6, 0.55) 0px 8px 18px -12px" } as CSSProperties}>Get Sections + Templates</CheckoutButton>
        <a className={"mt-3 flex items-start gap-2 rounded-[12px] px-3 py-2 text-[12px] leading-snug transition-colors \x62g-[#\x65ef7ea] \x74ext-[#\x31f5a33] \x72ing-1 \x72ing-[\x72gba(\x340,\x3110,\x360,\x30.\x314)] \x68over:\x62g-[#\x656f3e1]"} href="/refunds">
          <span className={"mt-px flex h-4 w-4 shrink-0 items-center justify-center rounded-full \x62g-[#\x31f9d55] text-white"}>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="m5 12.5 4.5 4.5L19 7.5" />
            </svg>
          </span>
          <span>Full refund within 14 days, no questions asked.</span>
        </a>
      </div>
      <div className="os-rule mt-6" />
      <p className={"mt-5 text-[12.5px] font-medium \x74ext-[\x76ar(\x2d-text)]"}>Everything in Sections, plus:</p>
      <ul className={"mt-3 \x73pace-y-3"}>
        <li className="flex items-start gap-2.5">
          <span className={"mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-white \x74ext-[\x76ar(\x2d-text)] \x73hadow-[\x30_0_0_1px_rgba(\x30,\x30,\x30,\x30.\x308),\x30_1px_1px_rgba(\x30,\x30,\x30,\x30.\x305)]"}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="m5 12.5 4.5 4.5L19 7.5" />
            </svg>
          </span>
          <span className={"text-[13px] leading-relaxed \x74ext-[\x76ar(\x2d-text-secondary)]"}>3 template credits every paid month</span>
        </li>
        <li className="flex items-start gap-2.5">
          <span className={"mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-white \x74ext-[\x76ar(\x2d-text)] \x73hadow-[\x30_0_0_1px_rgba(\x30,\x30,\x30,\x30.\x308),\x30_1px_1px_rgba(\x30,\x30,\x30,\x30.\x305)]"}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="m5 12.5 4.5 4.5L19 7.5" />
            </svg>
          </span>
          <span className={"text-[13px] leading-relaxed \x74ext-[\x76ar(\x2d-text-secondary)]"}>Choose from Webflow and Framer</span>
        </li>
        <li className="flex items-start gap-2.5">
          <span className={"mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-white \x74ext-[\x76ar(\x2d-text)] \x73hadow-[\x30_0_0_1px_rgba(\x30,\x30,\x30,\x30.\x308),\x30_1px_1px_rgba(\x30,\x30,\x30,\x30.\x305)]"}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="m5 12.5 4.5 4.5L19 7.5" />
            </svg>
          </span>
          <span className={"text-[13px] leading-relaxed \x74ext-[\x76ar(\x2d-text-secondary)]"}>Figma source file where one is available</span>
        </li>
        <li className="flex items-start gap-2.5">
          <span className={"mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-white \x74ext-[\x76ar(\x2d-text)] \x73hadow-[\x30_0_0_1px_rgba(\x30,\x30,\x30,\x30.\x308),\x30_1px_1px_rgba(\x30,\x30,\x30,\x30.\x305)]"}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="m5 12.5 4.5 4.5L19 7.5" />
            </svg>
          </span>
          <span className={"text-[13px] leading-relaxed \x74ext-[\x76ar(\x2d-text-secondary)]"}>Keep everything you unlock, even after cancelling</span>
        </li>
        <li className="flex items-start gap-2.5">
          <span className={"mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-white \x74ext-[\x76ar(\x2d-text)] \x73hadow-[\x30_0_0_1px_rgba(\x30,\x30,\x30,\x30.\x308),\x30_1px_1px_rgba(\x30,\x30,\x30,\x30.\x305)]"}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="m5 12.5 4.5 4.5L19 7.5" />
            </svg>
          </span>
          <span className={"text-[13px] leading-relaxed \x74ext-[\x76ar(\x2d-text-tertiary)]"}>Credits reset each month and do not roll over</span>
        </li>
      </ul>
      <div className="mt-8">
        <div className="relative h-[200px]" aria-hidden="true">
          <div className={"absolute left-1/2 top-1/2 aspect-[16/10] w-[64%] overflow-hidden rounded-[12px] \x62g-[\x76ar(\x2d-surface-sunken)] \x73hadow-[\x30_0_0_1px_rgba(\x30,\x30,\x30,\x30.\x308),\x30_18px_36px_-16px_rgba(\x30,\x30,\x30,\x30.\x35)] transition-transform duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)]"} style={{ transform: "translate(-50%, -50%) translate(-26px, 12px) rotate(-5deg)", zIndex: "2" }}>
            <img className={"object-cover \x6fbject-top"} style={{ position: "absolute", height: "100%", width: "100%", inset: "0px", color: "transparent" }} alt="" loading="lazy" decoding="async" src="/site-assets/12063fbec8dab475.webp" />
          </div>
          <div className={"absolute left-1/2 top-1/2 aspect-[16/10] w-[64%] overflow-hidden rounded-[12px] \x62g-[\x76ar(\x2d-surface-sunken)] \x73hadow-[\x30_0_0_1px_rgba(\x30,\x30,\x30,\x30.\x308),\x30_18px_36px_-16px_rgba(\x30,\x30,\x30,\x30.\x35)] transition-transform duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)]"} style={{ transform: "translate(-50%, -50%) translate(0px, 0px) rotate(0deg)", zIndex: "3" }}>
            <img className={"object-cover \x6fbject-top"} style={{ position: "absolute", height: "100%", width: "100%", inset: "0px", color: "transparent" }} alt="" loading="lazy" decoding="async" src="/site-assets/5ee6ef4b5d3a5a80.webp" />
          </div>
          <div className={"absolute left-1/2 top-1/2 aspect-[16/10] w-[64%] overflow-hidden rounded-[12px] \x62g-[\x76ar(\x2d-surface-sunken)] \x73hadow-[\x30_0_0_1px_rgba(\x30,\x30,\x30,\x30.\x308),\x30_18px_36px_-16px_rgba(\x30,\x30,\x30,\x30.\x35)] transition-transform duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)]"} style={{ transform: "translate(-50%, -50%) translate(26px, -12px) rotate(5deg)", zIndex: "1" }}>
            <img className={"object-cover \x6fbject-top"} style={{ position: "absolute", height: "100%", width: "100%", inset: "0px", color: "transparent" }} alt="" loading="lazy" decoding="async" src="/site-assets/84cb0b3d02e2b143.webp" />
          </div>
        </div>
        <p className={"mt-6 text-center text-[14px] font-medium \x74ext-[\x76ar(\x2d-text)]"}>192 templates, unlock 3 per month</p>
      </div>
    </section>
  );
}

function ImportedSectionLifetime() {
  return (
    <section className={"os-dark flex \x73croll-mt-24 flex-col overflow-hidden p-6 sm:p-7"} id="plan-lifetime">
      <div className="flex items-start justify-between gap-3">
        <h2 className="text-[15px] font-medium text-white">Lifetime</h2>
        <span className="os-chip h-6 shrink-0 text-[10px] uppercase tracking-wide">Best value</span>
      </div>
      <div className="mt-4 flex items-baseline gap-1.5">
        <span className={"\x66ont-[\x66amily-name:\x76ar(\x2d-font-heading)] text-[44px] font-medium leading-none tracking-tight text-white"}>$499</span>
        <span className={"text-[13px] \x74ext-white/\x350"}>once</span>
      </div>
      <p className={"mt-2 text-[13px] \x74ext-white/\x360"}>Everything, forever. Pays for itself against roughly six single templates.</p>
      <div className="mt-5">
        <p className={"text-[10.5px] font-medium uppercase tracking-[0.08em] \x74ext-white/\x340"}>Works with</p>
        <div className="mt-2 flex flex-wrap items-center gap-1.5">
          <span className={"flex h-8 w-8 items-center justify-center rounded-[9px] \x72ing-1 \x72ing-white/\x310 bg-white"} title="Claude Code">
            <img style={{ color: "transparent" }} alt="Claude Code" loading="lazy" width="18" height="18" decoding="async" src="/site-assets/3737e44be6f1bbfb-5a19e14c570fcde745ab2532dc89a9e8.png" />
          </span>
          <span className={"flex h-8 w-8 items-center justify-center rounded-[9px] \x72ing-1 \x72ing-white/\x310 \x62g-[#\x3111]"} title="Cursor">
            <img className={"\x69nvert"} style={{ color: "transparent" }} alt="Cursor" loading="lazy" width="18" height="18" decoding="async" src="/site-assets/8cf8b65ff525f0ff-49ebbaad505f220ef8e4b9a616cb6435.png" />
          </span>
          <span className={"flex h-8 w-8 items-center justify-center rounded-[9px] \x72ing-1 \x72ing-white/\x310 bg-white"} title="v0">
            <img style={{ color: "transparent" }} alt="v0" loading="lazy" width="18" height="18" decoding="async" src="/site-assets/b06fd899b1111984-5ae9202f6b3df6563b0d0d89be27f00a.png" />
          </span>
          <span className={"flex h-8 w-8 items-center justify-center rounded-[9px] \x72ing-1 \x72ing-white/\x310 \x62g-[#\x3111]"} title="Lovable">
            <img style={{ color: "transparent" }} alt="Lovable" loading="lazy" width="18" height="18" decoding="async" src="/site-assets/c071d2a2086e34ac-14e29e39e1cb77a54af42896b9e1a8b3.png" />
          </span>
          <span className={"mx-1 h-5 w-px \x62g-white/\x315"} aria-hidden="true" />
          <span className={"flex h-8 w-8 items-center justify-center rounded-[9px] \x72ing-1 \x72ing-white/\x310 bg-white"} title="Webflow">
            <svg width="16.25" height="10" viewBox="0 0 26 16" fill="none" role="img" aria-label="Webflow">
              <title>Webflow</title>
              <path fillRule="evenodd" clipRule="evenodd" d="M25.65 0L17.4654 16H9.77778L13.203 9.36892H13.0493C10.2235 13.0372 6.00738 15.452 0 16V9.46068C0 9.46068 3.84306 9.23369 6.10229 6.85844H0V0.000126383H6.85832V5.64099L7.01225 5.64036L9.8148 0.000126383H15.0016V5.60523L15.1555 5.60497L18.0632 0H25.65Z" fill="#146EF5" />
            </svg>
          </span>
          <span className={"flex h-8 w-8 items-center justify-center rounded-[9px] \x72ing-1 \x72ing-white/\x310 bg-white text-black"} title="Framer">
            <svg width="9.333333333333332" height="14" viewBox="0 0 192 288" fill="none" role="img" aria-label="Framer">
              <title>Framer</title>
              <path d="M 96 192 L 96 288 L 0 192 L 0 96 L 96 96 L 0 0 L 192 0 L 192 96 L 96 96 L 192 192 Z" fill="currentColor" />
            </svg>
          </span>
        </div>
      </div>
      <div className="mt-5">
        <CheckoutButton plan="lifetime" className={"os-button relative inline-flex select-none items-center justify-center gap-2 rounded-full font-medium transition-[transform,box-shadow,filter,background-color] duration-150 ease-out \x64isabled:\x63ursor-not-allowed disabled:opacity-45 h-12 px-6 text-[14px] \x74ext-[\x76ar(\x2d-text)] w-full"} style={{ backgroundImage: "linear-gradient(rgb(255, 255, 255) 0%, rgb(248, 248, 247) 55%, rgb(239, 239, 238) 100%)", boxShadow: "rgb(255, 255, 255) 0px 1px 0px inset, rgba(0, 0, 0, 0.05) 0px -1px 0px inset, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px, rgba(0, 0, 0, 0.08) 0px 1px 2px, rgba(0, 0, 0, 0.28) 0px 8px 18px -10px" } as CSSProperties}>Get Lifetime</CheckoutButton>
        <a className={"mt-3 flex items-start gap-2 rounded-[12px] px-3 py-2 text-[12px] leading-snug transition-colors \x62g-white/[\x30.\x306] \x74ext-white/\x375 \x72ing-1 \x72ing-white/\x310 \x68over:\x62g-white/[\x30.\x309]"} href="/refunds">
          <span className={"mt-px flex h-4 w-4 shrink-0 items-center justify-center rounded-full \x62g-[#\x33ccf7a] \x74ext-[#\x30b1f12]"}>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="m5 12.5 4.5 4.5L19 7.5" />
            </svg>
          </span>
          <span>Full refund within 14 days, no questions asked.</span>
        </a>
      </div>
      <div className="os-rule mt-6" />
      <ul className={"mt-5 \x73pace-y-3"}>
        <li className="flex items-start gap-2.5">
          <span className={"mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full \x62g-white/\x310 \x74ext-white/\x385 \x73hadow-[\x69nset_0_1px_0_rgba(\x3255,\x3255,\x3255,\x30.\x308)]"}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="m5 12.5 4.5 4.5L19 7.5" />
            </svg>
          </span>
          <span className={"text-[13px] leading-relaxed \x74ext-white/\x380"}>Every template in the catalog, unlocked</span>
        </li>
        <li className="flex items-start gap-2.5">
          <span className={"mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full \x62g-white/\x310 \x74ext-white/\x385 \x73hadow-[\x69nset_0_1px_0_rgba(\x3255,\x3255,\x3255,\x30.\x308)]"}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="m5 12.5 4.5 4.5L19 7.5" />
            </svg>
          </span>
          <span className={"text-[13px] leading-relaxed \x74ext-white/\x380"}>Every Pro section, now and in future</span>
        </li>
        <li className="flex items-start gap-2.5">
          <span className={"mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full \x62g-white/\x310 \x74ext-white/\x385 \x73hadow-[\x69nset_0_1px_0_rgba(\x3255,\x3255,\x3255,\x30.\x308)]"}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="m5 12.5 4.5 4.5L19 7.5" />
            </svg>
          </span>
          <span className={"text-[13px] leading-relaxed \x74ext-white/\x380"}>Copy every AI-ready template into Claude, Cursor &amp; v0 as a full prompt</span>
        </li>
        <li className="flex items-start gap-2.5">
          <span className={"mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full \x62g-white/\x310 \x74ext-white/\x385 \x73hadow-[\x69nset_0_1px_0_rgba(\x3255,\x3255,\x3255,\x30.\x308)]"}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="m5 12.5 4.5 4.5L19 7.5" />
            </svg>
          </span>
          <span className={"text-[13px] leading-relaxed \x74ext-white/\x380"}>All future templates as they are added</span>
        </li>
        <li className="flex items-start gap-2.5">
          <span className={"mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full \x62g-white/\x310 \x74ext-white/\x385 \x73hadow-[\x69nset_0_1px_0_rgba(\x3255,\x3255,\x3255,\x30.\x308)]"}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="m5 12.5 4.5 4.5L19 7.5" />
            </svg>
          </span>
          <span className={"text-[13px] leading-relaxed \x74ext-white/\x380"}>Figma source files where available</span>
        </li>
        <li className="flex items-start gap-2.5">
          <span className={"mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full \x62g-white/\x310 \x74ext-white/\x385 \x73hadow-[\x69nset_0_1px_0_rgba(\x3255,\x3255,\x3255,\x30.\x308)]"}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="m5 12.5 4.5 4.5L19 7.5" />
            </svg>
          </span>
          <span className={"text-[13px] leading-relaxed \x74ext-white/\x380"}>Request a Figma file for any template<span className={"\x74ext-white/\x340"}>{" "}(coming soon)</span></span>
        </li>
        <li className="flex items-start gap-2.5">
          <span className={"mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full \x62g-white/\x310 \x74ext-white/\x385 \x73hadow-[\x69nset_0_1px_0_rgba(\x3255,\x3255,\x3255,\x30.\x308)]"}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="m5 12.5 4.5 4.5L19 7.5" />
            </svg>
          </span>
          <span className={"text-[13px] leading-relaxed \x74ext-white/\x380"}>No credits, no renewal, no expiry</span>
        </li>
      </ul>
      <div className="mt-8">
        <div className="relative -mx-6 overflow-hidden py-1 sm:-mx-7 [mask-image:linear-gradient(90deg,transparent,#000_14%,#000_86%,transparent)]" aria-hidden="true">
          <div className={"flex \x2drotate-[\x34deg] flex-col gap-2 py-2"}>
            <div className={"flex w-max gap-2 \x6dotion-safe:\x61nimate-[\x6fs-marquee-x_linear_infinite]"} style={{ animationDuration: "34s", animationDirection: "normal" } as CSSProperties}>
              <div className={"relative aspect-[16/10] w-[112px] shrink-0 overflow-hidden rounded-[8px] \x72ing-1 \x72ing-white/\x310"}>
                <img className={"object-cover \x6fbject-top"} style={{ position: "absolute", height: "100%", width: "100%", inset: "0px", color: "transparent" }} alt="" loading="lazy" decoding="async" src="/site-assets/bac8d4a5acf1ce46.webp" />
              </div>
              <div className={"relative aspect-[16/10] w-[112px] shrink-0 overflow-hidden rounded-[8px] \x72ing-1 \x72ing-white/\x310"}>
                <img className={"object-cover \x6fbject-top"} style={{ position: "absolute", height: "100%", width: "100%", inset: "0px", color: "transparent" }} alt="" loading="lazy" decoding="async" src="/site-assets/acf328f50931d605.webp" />
              </div>
              <div className={"relative aspect-[16/10] w-[112px] shrink-0 overflow-hidden rounded-[8px] \x72ing-1 \x72ing-white/\x310"}>
                <img className={"object-cover \x6fbject-top"} style={{ position: "absolute", height: "100%", width: "100%", inset: "0px", color: "transparent" }} alt="" loading="lazy" decoding="async" src="/site-assets/12063fbec8dab475.webp" />
              </div>
              <div className={"relative aspect-[16/10] w-[112px] shrink-0 overflow-hidden rounded-[8px] \x72ing-1 \x72ing-white/\x310"}>
                <img className={"object-cover \x6fbject-top"} style={{ position: "absolute", height: "100%", width: "100%", inset: "0px", color: "transparent" }} alt="" loading="lazy" decoding="async" src="/site-assets/614d6ffd42b218df.webp" />
              </div>
              <div className={"relative aspect-[16/10] w-[112px] shrink-0 overflow-hidden rounded-[8px] \x72ing-1 \x72ing-white/\x310"}>
                <img className={"object-cover \x6fbject-top"} style={{ position: "absolute", height: "100%", width: "100%", inset: "0px", color: "transparent" }} alt="" loading="lazy" decoding="async" src="/site-assets/3964e0c4f4c7aaba.webp" />
              </div>
              <div className={"relative aspect-[16/10] w-[112px] shrink-0 overflow-hidden rounded-[8px] \x72ing-1 \x72ing-white/\x310"}>
                <img className={"object-cover \x6fbject-top"} style={{ position: "absolute", height: "100%", width: "100%", inset: "0px", color: "transparent" }} alt="" loading="lazy" decoding="async" src="/site-assets/1e9c6b5e9559eab7.webp" />
              </div>
              <div className={"relative aspect-[16/10] w-[112px] shrink-0 overflow-hidden rounded-[8px] \x72ing-1 \x72ing-white/\x310"}>
                <img className={"object-cover \x6fbject-top"} style={{ position: "absolute", height: "100%", width: "100%", inset: "0px", color: "transparent" }} alt="" loading="lazy" decoding="async" src="/site-assets/b7dc577d80dcf8a8.webp" />
              </div>
              <div className={"relative aspect-[16/10] w-[112px] shrink-0 overflow-hidden rounded-[8px] \x72ing-1 \x72ing-white/\x310"}>
                <img className={"object-cover \x6fbject-top"} style={{ position: "absolute", height: "100%", width: "100%", inset: "0px", color: "transparent" }} alt="" loading="lazy" decoding="async" src="/site-assets/f3c9472c82fd2cee.webp" />
              </div>
              <div className={"relative aspect-[16/10] w-[112px] shrink-0 overflow-hidden rounded-[8px] \x72ing-1 \x72ing-white/\x310"}>
                <img className={"object-cover \x6fbject-top"} style={{ position: "absolute", height: "100%", width: "100%", inset: "0px", color: "transparent" }} alt="" loading="lazy" decoding="async" src="/site-assets/bac8d4a5acf1ce46.webp" />
              </div>
              <div className={"relative aspect-[16/10] w-[112px] shrink-0 overflow-hidden rounded-[8px] \x72ing-1 \x72ing-white/\x310"}>
                <img className={"object-cover \x6fbject-top"} style={{ position: "absolute", height: "100%", width: "100%", inset: "0px", color: "transparent" }} alt="" loading="lazy" decoding="async" src="/site-assets/acf328f50931d605.webp" />
              </div>
              <div className={"relative aspect-[16/10] w-[112px] shrink-0 overflow-hidden rounded-[8px] \x72ing-1 \x72ing-white/\x310"}>
                <img className={"object-cover \x6fbject-top"} style={{ position: "absolute", height: "100%", width: "100%", inset: "0px", color: "transparent" }} alt="" loading="lazy" decoding="async" src="/site-assets/12063fbec8dab475.webp" />
              </div>
              <div className={"relative aspect-[16/10] w-[112px] shrink-0 overflow-hidden rounded-[8px] \x72ing-1 \x72ing-white/\x310"}>
                <img className={"object-cover \x6fbject-top"} style={{ position: "absolute", height: "100%", width: "100%", inset: "0px", color: "transparent" }} alt="" loading="lazy" decoding="async" src="/site-assets/614d6ffd42b218df.webp" />
              </div>
              <div className={"relative aspect-[16/10] w-[112px] shrink-0 overflow-hidden rounded-[8px] \x72ing-1 \x72ing-white/\x310"}>
                <img className={"object-cover \x6fbject-top"} style={{ position: "absolute", height: "100%", width: "100%", inset: "0px", color: "transparent" }} alt="" loading="lazy" decoding="async" src="/site-assets/3964e0c4f4c7aaba.webp" />
              </div>
              <div className={"relative aspect-[16/10] w-[112px] shrink-0 overflow-hidden rounded-[8px] \x72ing-1 \x72ing-white/\x310"}>
                <img className={"object-cover \x6fbject-top"} style={{ position: "absolute", height: "100%", width: "100%", inset: "0px", color: "transparent" }} alt="" loading="lazy" decoding="async" src="/site-assets/1e9c6b5e9559eab7.webp" />
              </div>
              <div className={"relative aspect-[16/10] w-[112px] shrink-0 overflow-hidden rounded-[8px] \x72ing-1 \x72ing-white/\x310"}>
                <img className={"object-cover \x6fbject-top"} style={{ position: "absolute", height: "100%", width: "100%", inset: "0px", color: "transparent" }} alt="" loading="lazy" decoding="async" src="/site-assets/b7dc577d80dcf8a8.webp" />
              </div>
              <div className={"relative aspect-[16/10] w-[112px] shrink-0 overflow-hidden rounded-[8px] \x72ing-1 \x72ing-white/\x310"}>
                <img className={"object-cover \x6fbject-top"} style={{ position: "absolute", height: "100%", width: "100%", inset: "0px", color: "transparent" }} alt="" loading="lazy" decoding="async" src="/site-assets/f3c9472c82fd2cee.webp" />
              </div>
            </div>
            <div className={"flex w-max gap-2 \x6dotion-safe:\x61nimate-[\x6fs-marquee-x_linear_infinite]"} style={{ animationDuration: "42s", animationDirection: "reverse" } as CSSProperties}>
              <div className={"relative aspect-[16/10] w-[112px] shrink-0 overflow-hidden rounded-[8px] \x72ing-1 \x72ing-white/\x310"}>
                <img className={"object-cover \x6fbject-top"} style={{ position: "absolute", height: "100%", width: "100%", inset: "0px", color: "transparent" }} alt="" loading="lazy" decoding="async" src="/site-assets/369ef747a0ffde0e.webp" />
              </div>
              <div className={"relative aspect-[16/10] w-[112px] shrink-0 overflow-hidden rounded-[8px] \x72ing-1 \x72ing-white/\x310"}>
                <img className={"object-cover \x6fbject-top"} style={{ position: "absolute", height: "100%", width: "100%", inset: "0px", color: "transparent" }} alt="" loading="lazy" decoding="async" src="/site-assets/ab92887d56dbc66d.webp" />
              </div>
              <div className={"relative aspect-[16/10] w-[112px] shrink-0 overflow-hidden rounded-[8px] \x72ing-1 \x72ing-white/\x310"}>
                <img className={"object-cover \x6fbject-top"} style={{ position: "absolute", height: "100%", width: "100%", inset: "0px", color: "transparent" }} alt="" loading="lazy" decoding="async" src="/site-assets/5ee6ef4b5d3a5a80.webp" />
              </div>
              <div className={"relative aspect-[16/10] w-[112px] shrink-0 overflow-hidden rounded-[8px] \x72ing-1 \x72ing-white/\x310"}>
                <img className={"object-cover \x6fbject-top"} style={{ position: "absolute", height: "100%", width: "100%", inset: "0px", color: "transparent" }} alt="" loading="lazy" decoding="async" src="/site-assets/8d8f135b6c86ad46.webp" />
              </div>
              <div className={"relative aspect-[16/10] w-[112px] shrink-0 overflow-hidden rounded-[8px] \x72ing-1 \x72ing-white/\x310"}>
                <img className={"object-cover \x6fbject-top"} style={{ position: "absolute", height: "100%", width: "100%", inset: "0px", color: "transparent" }} alt="" loading="lazy" decoding="async" src="/site-assets/83c347b4a7b2d1dc.webp" />
              </div>
              <div className={"relative aspect-[16/10] w-[112px] shrink-0 overflow-hidden rounded-[8px] \x72ing-1 \x72ing-white/\x310"}>
                <img className={"object-cover \x6fbject-top"} style={{ position: "absolute", height: "100%", width: "100%", inset: "0px", color: "transparent" }} alt="" loading="lazy" decoding="async" src="/site-assets/9f0a418593554969.webp" />
              </div>
              <div className={"relative aspect-[16/10] w-[112px] shrink-0 overflow-hidden rounded-[8px] \x72ing-1 \x72ing-white/\x310"}>
                <img className={"object-cover \x6fbject-top"} style={{ position: "absolute", height: "100%", width: "100%", inset: "0px", color: "transparent" }} alt="" loading="lazy" decoding="async" src="/site-assets/8603258d8882e0b4.webp" />
              </div>
              <div className={"relative aspect-[16/10] w-[112px] shrink-0 overflow-hidden rounded-[8px] \x72ing-1 \x72ing-white/\x310"}>
                <img className={"object-cover \x6fbject-top"} style={{ position: "absolute", height: "100%", width: "100%", inset: "0px", color: "transparent" }} alt="" loading="lazy" decoding="async" src="/site-assets/97c6fcf181897f6d.webp" />
              </div>
              <div className={"relative aspect-[16/10] w-[112px] shrink-0 overflow-hidden rounded-[8px] \x72ing-1 \x72ing-white/\x310"}>
                <img className={"object-cover \x6fbject-top"} style={{ position: "absolute", height: "100%", width: "100%", inset: "0px", color: "transparent" }} alt="" loading="lazy" decoding="async" src="/site-assets/369ef747a0ffde0e.webp" />
              </div>
              <div className={"relative aspect-[16/10] w-[112px] shrink-0 overflow-hidden rounded-[8px] \x72ing-1 \x72ing-white/\x310"}>
                <img className={"object-cover \x6fbject-top"} style={{ position: "absolute", height: "100%", width: "100%", inset: "0px", color: "transparent" }} alt="" loading="lazy" decoding="async" src="/site-assets/ab92887d56dbc66d.webp" />
              </div>
              <div className={"relative aspect-[16/10] w-[112px] shrink-0 overflow-hidden rounded-[8px] \x72ing-1 \x72ing-white/\x310"}>
                <img className={"object-cover \x6fbject-top"} style={{ position: "absolute", height: "100%", width: "100%", inset: "0px", color: "transparent" }} alt="" loading="lazy" decoding="async" src="/site-assets/5ee6ef4b5d3a5a80.webp" />
              </div>
              <div className={"relative aspect-[16/10] w-[112px] shrink-0 overflow-hidden rounded-[8px] \x72ing-1 \x72ing-white/\x310"}>
                <img className={"object-cover \x6fbject-top"} style={{ position: "absolute", height: "100%", width: "100%", inset: "0px", color: "transparent" }} alt="" loading="lazy" decoding="async" src="/site-assets/8d8f135b6c86ad46.webp" />
              </div>
              <div className={"relative aspect-[16/10] w-[112px] shrink-0 overflow-hidden rounded-[8px] \x72ing-1 \x72ing-white/\x310"}>
                <img className={"object-cover \x6fbject-top"} style={{ position: "absolute", height: "100%", width: "100%", inset: "0px", color: "transparent" }} alt="" loading="lazy" decoding="async" src="/site-assets/83c347b4a7b2d1dc.webp" />
              </div>
              <div className={"relative aspect-[16/10] w-[112px] shrink-0 overflow-hidden rounded-[8px] \x72ing-1 \x72ing-white/\x310"}>
                <img className={"object-cover \x6fbject-top"} style={{ position: "absolute", height: "100%", width: "100%", inset: "0px", color: "transparent" }} alt="" loading="lazy" decoding="async" src="/site-assets/9f0a418593554969.webp" />
              </div>
              <div className={"relative aspect-[16/10] w-[112px] shrink-0 overflow-hidden rounded-[8px] \x72ing-1 \x72ing-white/\x310"}>
                <img className={"object-cover \x6fbject-top"} style={{ position: "absolute", height: "100%", width: "100%", inset: "0px", color: "transparent" }} alt="" loading="lazy" decoding="async" src="/site-assets/8603258d8882e0b4.webp" />
              </div>
              <div className={"relative aspect-[16/10] w-[112px] shrink-0 overflow-hidden rounded-[8px] \x72ing-1 \x72ing-white/\x310"}>
                <img className={"object-cover \x6fbject-top"} style={{ position: "absolute", height: "100%", width: "100%", inset: "0px", color: "transparent" }} alt="" loading="lazy" decoding="async" src="/site-assets/97c6fcf181897f6d.webp" />
              </div>
            </div>
            <div className={"flex w-max gap-2 \x6dotion-safe:\x61nimate-[\x6fs-marquee-x_linear_infinite]"} style={{ animationDuration: "50s", animationDirection: "normal" } as CSSProperties}>
              <div className={"relative aspect-[16/10] w-[112px] shrink-0 overflow-hidden rounded-[8px] \x72ing-1 \x72ing-white/\x310"}>
                <img className={"object-cover \x6fbject-top"} style={{ position: "absolute", height: "100%", width: "100%", inset: "0px", color: "transparent" }} alt="" loading="lazy" decoding="async" src="/site-assets/e611cb809f2f58a2.webp" />
              </div>
              <div className={"relative aspect-[16/10] w-[112px] shrink-0 overflow-hidden rounded-[8px] \x72ing-1 \x72ing-white/\x310"}>
                <img className={"object-cover \x6fbject-top"} style={{ position: "absolute", height: "100%", width: "100%", inset: "0px", color: "transparent" }} alt="" loading="lazy" decoding="async" src="/site-assets/54324c1b7d45ef42.webp" />
              </div>
              <div className={"relative aspect-[16/10] w-[112px] shrink-0 overflow-hidden rounded-[8px] \x72ing-1 \x72ing-white/\x310"}>
                <img className={"object-cover \x6fbject-top"} style={{ position: "absolute", height: "100%", width: "100%", inset: "0px", color: "transparent" }} alt="" loading="lazy" decoding="async" src="/site-assets/84cb0b3d02e2b143.webp" />
              </div>
              <div className={"relative aspect-[16/10] w-[112px] shrink-0 overflow-hidden rounded-[8px] \x72ing-1 \x72ing-white/\x310"}>
                <img className={"object-cover \x6fbject-top"} style={{ position: "absolute", height: "100%", width: "100%", inset: "0px", color: "transparent" }} alt="" loading="lazy" decoding="async" src="/site-assets/40f9a83ab363d229.webp" />
              </div>
              <div className={"relative aspect-[16/10] w-[112px] shrink-0 overflow-hidden rounded-[8px] \x72ing-1 \x72ing-white/\x310"}>
                <img className={"object-cover \x6fbject-top"} style={{ position: "absolute", height: "100%", width: "100%", inset: "0px", color: "transparent" }} alt="" loading="lazy" decoding="async" src="/site-assets/e320792ea0191375.webp" />
              </div>
              <div className={"relative aspect-[16/10] w-[112px] shrink-0 overflow-hidden rounded-[8px] \x72ing-1 \x72ing-white/\x310"}>
                <img className={"object-cover \x6fbject-top"} style={{ position: "absolute", height: "100%", width: "100%", inset: "0px", color: "transparent" }} alt="" loading="lazy" decoding="async" src="/site-assets/ea4dd985c7ff23c2.webp" />
              </div>
              <div className={"relative aspect-[16/10] w-[112px] shrink-0 overflow-hidden rounded-[8px] \x72ing-1 \x72ing-white/\x310"}>
                <img className={"object-cover \x6fbject-top"} style={{ position: "absolute", height: "100%", width: "100%", inset: "0px", color: "transparent" }} alt="" loading="lazy" decoding="async" src="/site-assets/0b4dd344c6d36d5f.webp" />
              </div>
              <div className={"relative aspect-[16/10] w-[112px] shrink-0 overflow-hidden rounded-[8px] \x72ing-1 \x72ing-white/\x310"}>
                <img className={"object-cover \x6fbject-top"} style={{ position: "absolute", height: "100%", width: "100%", inset: "0px", color: "transparent" }} alt="" loading="lazy" decoding="async" src="/site-assets/5a8620db6e724e8a.webp" />
              </div>
              <div className={"relative aspect-[16/10] w-[112px] shrink-0 overflow-hidden rounded-[8px] \x72ing-1 \x72ing-white/\x310"}>
                <img className={"object-cover \x6fbject-top"} style={{ position: "absolute", height: "100%", width: "100%", inset: "0px", color: "transparent" }} alt="" loading="lazy" decoding="async" src="/site-assets/e611cb809f2f58a2.webp" />
              </div>
              <div className={"relative aspect-[16/10] w-[112px] shrink-0 overflow-hidden rounded-[8px] \x72ing-1 \x72ing-white/\x310"}>
                <img className={"object-cover \x6fbject-top"} style={{ position: "absolute", height: "100%", width: "100%", inset: "0px", color: "transparent" }} alt="" loading="lazy" decoding="async" src="/site-assets/54324c1b7d45ef42.webp" />
              </div>
              <div className={"relative aspect-[16/10] w-[112px] shrink-0 overflow-hidden rounded-[8px] \x72ing-1 \x72ing-white/\x310"}>
                <img className={"object-cover \x6fbject-top"} style={{ position: "absolute", height: "100%", width: "100%", inset: "0px", color: "transparent" }} alt="" loading="lazy" decoding="async" src="/site-assets/84cb0b3d02e2b143.webp" />
              </div>
              <div className={"relative aspect-[16/10] w-[112px] shrink-0 overflow-hidden rounded-[8px] \x72ing-1 \x72ing-white/\x310"}>
                <img className={"object-cover \x6fbject-top"} style={{ position: "absolute", height: "100%", width: "100%", inset: "0px", color: "transparent" }} alt="" loading="lazy" decoding="async" src="/site-assets/40f9a83ab363d229.webp" />
              </div>
              <div className={"relative aspect-[16/10] w-[112px] shrink-0 overflow-hidden rounded-[8px] \x72ing-1 \x72ing-white/\x310"}>
                <img className={"object-cover \x6fbject-top"} style={{ position: "absolute", height: "100%", width: "100%", inset: "0px", color: "transparent" }} alt="" loading="lazy" decoding="async" src="/site-assets/e320792ea0191375.webp" />
              </div>
              <div className={"relative aspect-[16/10] w-[112px] shrink-0 overflow-hidden rounded-[8px] \x72ing-1 \x72ing-white/\x310"}>
                <img className={"object-cover \x6fbject-top"} style={{ position: "absolute", height: "100%", width: "100%", inset: "0px", color: "transparent" }} alt="" loading="lazy" decoding="async" src="/site-assets/ea4dd985c7ff23c2.webp" />
              </div>
              <div className={"relative aspect-[16/10] w-[112px] shrink-0 overflow-hidden rounded-[8px] \x72ing-1 \x72ing-white/\x310"}>
                <img className={"object-cover \x6fbject-top"} style={{ position: "absolute", height: "100%", width: "100%", inset: "0px", color: "transparent" }} alt="" loading="lazy" decoding="async" src="/site-assets/0b4dd344c6d36d5f.webp" />
              </div>
              <div className={"relative aspect-[16/10] w-[112px] shrink-0 overflow-hidden rounded-[8px] \x72ing-1 \x72ing-white/\x310"}>
                <img className={"object-cover \x6fbject-top"} style={{ position: "absolute", height: "100%", width: "100%", inset: "0px", color: "transparent" }} alt="" loading="lazy" decoding="async" src="/site-assets/5a8620db6e724e8a.webp" />
              </div>
            </div>
          </div>
          <span className={"absolute left-1/2 top-1/2 z-10 inline-flex h-8 \x2dtranslate-x-1/\x32 \x2dtranslate-y-1/\x32 items-center gap-1.5 rounded-full bg-white px-3.5 text-[12.5px] font-semibold text-black \x73hadow-[\x30_10px_30px_-6px_rgba(\x30,\x30,\x30,\x30.\x36)]"}><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5" /></svg> All unlocked</span>
        </div>
        <p className="mt-6 text-center text-[14px] font-medium text-white">192 templates, all yours</p>
      </div>
    </section>
  );
}

function ImportedSectionMakeExplainerVideosWith2() {
  return (
    <section className={"mx-auto mt-10 max-w-6xl px-4 sm:px-6 hidden \x6cg:\x62lock"}>
      <div className={"os-dark flex flex-col gap-6 overflow-hidden !rounded-[var(--r-shell)] p-6 sm:p-8 \x6cg:\x66lex-row \x6cg:\x69tems-center \x6cg:\x6austify-between"}>
        <div className="max-w-md">
          <p className={"inline-flex rounded-full \x62g-[#\x665d98a] px-2.5 py-1 text-[10.5px] font-bold uppercase tracking-wide \x74ext-[#\x33b2a08]"}>New · Video skills</p>
          <h2 className={"mt-3 \x66ont-[\x66amily-name:\x76ar(\x2d-font-heading)] text-[26px] font-medium leading-tight tracking-tight text-white \x73m:\x74ext-[\x330px]"}>Make explainer videos <span className={"\x74ext-white/\x350"}>with Claude.</span></h2>
          <p className={"mt-2 text-[13.5px] leading-relaxed \x74ext-white/\x360"}>All 3 premium video styles plus new ones as they launch. Separate from template plans.</p>
        </div>
        <div className="grid grid-cols-2 gap-2 lg:w-[380px]">
          <a className={"rounded-2xl \x62g-white/[\x30.\x306] p-4 \x72ing-1 \x72ing-white/\x310 transition-colors \x68over:\x62g-white/\x310"} href="/pricing/videos">
            <p className={"text-[12.5px] \x74ext-white/\x360"}>Monthly</p>
            <p className={"mt-1 \x66ont-[\x66amily-name:\x76ar(\x2d-font-heading)] text-[28px] font-medium leading-none text-white"}>$9.99</p>
            <p className={"mt-1.5 text-[11.5px] \x74ext-white/\x345"}>per month</p>
          </a>
          <a className={"relative rounded-2xl \x62g-white/[\x30.\x306] p-4 \x72ing-1 \x72ing-[#\x665d98a]/\x340 transition-colors \x68over:\x62g-white/\x310"} href="/pricing/videos">
            <span className={"absolute right-3 top-3 rounded-full \x62g-[#\x665d98a] px-1.5 text-[9.5px] font-bold uppercase leading-[16px] \x74ext-[#\x33b2a08]"}>-33%</span>
            <p className={"text-[12.5px] \x74ext-white/\x360"}>Yearly</p>
            <p className={"mt-1 \x66ont-[\x66amily-name:\x76ar(\x2d-font-heading)] text-[28px] font-medium leading-none text-white"}>$79.99</p>
            <p className={"mt-1.5 text-[11.5px] \x74ext-white/\x345"}>$6.67/mo, billed yearly</p>
          </a>
          <a className="col-span-2 flex h-11 items-center justify-center gap-1.5 rounded-full bg-white text-[13.5px] font-semibold text-black" href="/pricing/videos">See video plans <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg></a>
          <a className={"col-span-2 text-center text-[12px] \x74ext-white/\x355 \x75nderline-offset-2 \x68over:\x75nderline"} href="/videos/rays">Or try Rays free</a>
        </div>
      </div>
    </section>
  );
}

function ImportedSectionUnlockATemplateUse() {
  return (
    <section className="mx-auto mt-24 max-w-5xl px-4 sm:px-6" aria-labelledby="demo-title">
      <div className="text-center">
        <div className="os-chip text-[10.5px] uppercase tracking-[0.06em]"><span className="os-dot" /> What you get</div>
        <h2 className={"mt-4 \x66ont-[\x66amily-name:\x76ar(\x2d-font-heading)] text-[30px] font-medium leading-[1.1] tracking-tight \x73m:\x74ext-[\x340px]"} id="demo-title"><span className={"\x74ext-[\x76ar(\x2d-text-tertiary)]"}>Unlock a template,</span> <span className={"\x74ext-[\x76ar(\x2d-text)]"}>use it your way.</span></h2>
        <p className={"mx-auto mt-3 max-w-lg text-[14px] leading-relaxed \x74ext-[\x76ar(\x2d-text-secondary)]"}>Paste the full build into your AI tool, or open the finished template in Webflow or Framer. One unlock covers every format the design has.</p>
      </div>
      <div className="mt-7 flex justify-center">
        <div className="os-seg max-w-full overflow-x-auto" role="tablist" aria-label="Ways to use a template">
          <button className="os-seg-item" type="button" role="tab" aria-selected="true" data-active="true">
            <span className="os-dot" />
            <span className={"\x73m:\x68idden"}>Claude</span>
            <span className={"hidden \x73m:\x69nline"}>Copy into Claude</span>
          </button>
          <button className="os-seg-item" type="button" role="tab" aria-selected="false">
            <span className={"\x73m:\x68idden"}>Webflow</span>
            <span className={"hidden \x73m:\x69nline"}>Open in Webflow</span>
          </button>
          <button className="os-seg-item" type="button" role="tab" aria-selected="false">
            <span className={"\x73m:\x68idden"}>Framer</span>
            <span className={"hidden \x73m:\x69nline"}>Remix in Framer</span>
          </button>
        </div>
      </div>
      <div className="os-shell mt-6 p-2" aria-hidden="true">
        <div className="os-inset grid min-h-[360px] items-center gap-5 p-5 sm:p-8 md:grid-cols-[0.85fr_1.15fr]">
          <div className="mx-auto w-full max-w-[300px]">
            <div className="os-shell overflow-hidden !rounded-[18px] p-1.5">
              <div className={"relative aspect-[16/10] overflow-hidden rounded-[13px] \x62g-[\x76ar(\x2d-surface-sunken)]"}>
                <img className={"object-cover \x6fbject-top"} style={{ position: "absolute", height: "100%", width: "100%", inset: "0px", color: "transparent" }} alt="" loading="lazy" decoding="async" src="/site-assets/40f9a83ab363d229.webp" />
                <span className="os-glass-tag absolute left-2 top-2 !h-6 text-[10.5px]"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5" /></svg> Unlocked</span>
              </div>
              <div className="flex items-center justify-between px-2 pb-1 pt-2.5">
                <div>
                  <p className={"text-[13px] font-medium \x74ext-[\x76ar(\x2d-text)]"}>Lumenis</p>
                  <p className={"text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>Design Portfolio</p>
                </div>
                <span className={"flex items-center gap-1.5 \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
                  <svg width="14.625" height="9" viewBox="0 0 26 16" fill="none" aria-hidden="true">
                    <path fillRule="evenodd" clipRule="evenodd" d="M25.65 0L17.4654 16H9.77778L13.203 9.36892H13.0493C10.2235 13.0372 6.00738 15.452 0 16V9.46068C0 9.46068 3.84306 9.23369 6.10229 6.85844H0V0.000126383H6.85832V5.64099L7.01225 5.64036L9.8148 0.000126383H15.0016V5.60523L15.1555 5.60497L18.0632 0H25.65Z" fill="currentColor" />
                  </svg>
                  <svg width="8" height="12" viewBox="0 0 192 288" fill="none" aria-hidden="true">
                    <path d="M 96 192 L 96 288 L 0 192 L 0 96 L 96 96 L 0 0 L 192 0 L 192 96 L 96 96 L 192 192 Z" fill="currentColor" />
                  </svg>
                </span>
              </div>
            </div>
            <div className="relative mt-4">
              <div className="relative">
                <span className={"relative flex h-10 w-full items-center justify-center gap-2 rounded-full text-[12.5px] font-medium \x73hadow-[\x76ar(\x2d-shadow-raised)] transition-all duration-300 \x73cale-[\x30.\x397] \x62g-[#\x661f1f0] \x74ext-[\x76ar(\x2d-text)]"}><span className={"flex h-6 w-6 items-center justify-center rounded-full \x62g-[#\x37a5be8] text-white"}><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18" /></svg></span>Copy Prompt<svg className={"pointer-events-none absolute -bottom-3 -right-2 z-10 \x64rop-shadow-[\x30_2px_3px_rgba(\x30,\x30,\x30,\x30.\x335)] transition-all duration-300 \x73cale-100 opacity-100"} aria-hidden="true" width="16" height="16" viewBox="0 0 16 16"><path d="M2 1.5l11 6.2-4.9 1.1-2.2 4.7L2 1.5z" fill="#111" stroke="#fff" strokeWidth="1.2" strokeLinejoin="round" /></svg></span>
                <div className={"absolute \x69nset-x-0 top-[calc(100%+6px)] z-10 rounded-[12px] bg-white p-1.5 \x73hadow-[\x30_18px_40px_rgba(\x30,\x30,\x30,\x30.\x316),\x30_0_0_1px_rgba(\x30,\x30,\x30,\x30.\x305)] \x74ranslate-y-0 opacity-100 transition-all duration-300"}>
                  <div className={"flex h-9 items-center gap-2.5 rounded-[8px] px-2 text-[12px] font-medium transition-colors duration-200 \x74ext-[\x76ar(\x2d-text-secondary)]"}><span className="flex h-6 w-6 items-center justify-center rounded-[5px] bg-white"><img style={{ color: "transparent" }} alt="" loading="lazy" width="16" height="16" decoding="async" src="/site-assets/3737e44be6f1bbfb-5a19e14c570fcde745ab2532dc89a9e8.png" /></span>Claude Code</div>
                  <div className={"flex h-9 items-center gap-2.5 rounded-[8px] px-2 text-[12px] font-medium transition-colors duration-200 \x74ext-[\x76ar(\x2d-text-secondary)]"}><span className={"flex h-6 w-6 items-center justify-center rounded-[5px] \x62g-[#\x3111]"}><img className={"\x69nvert"} style={{ color: "transparent" }} alt="" loading="lazy" width="16" height="16" decoding="async" src="/site-assets/8cf8b65ff525f0ff-49ebbaad505f220ef8e4b9a616cb6435.png" /></span>Cursor</div>
                  <div className={"flex h-9 items-center gap-2.5 rounded-[8px] px-2 text-[12px] font-medium transition-colors duration-200 \x74ext-[\x76ar(\x2d-text-secondary)]"}><span className="flex h-6 w-6 items-center justify-center rounded-[5px] bg-white"><img style={{ color: "transparent" }} alt="" loading="lazy" width="16" height="16" decoding="async" src="/site-assets/b06fd899b1111984-5ae9202f6b3df6563b0d0d89be27f00a.png" /></span>v0</div>
                </div>
              </div>
            </div>
          </div>
          <div className={"overflow-hidden rounded-[16px] bg-white \x73hadow-[\x30_0_0_1px_rgba(\x30,\x30,\x30,\x30.\x306),\x30_30px_60px_-30px_rgba(\x30,\x30,\x30,\x30.\x345)]"}>
            <div className={"flex items-center gap-2 \x62order-b \x62order-[\x76ar(\x2d-line)] px-3.5 py-2.5"}>
              <span className="flex gap-1">
                <span className={"h-2.5 w-2.5 rounded-full \x62g-[#\x66f5f57]"} />
                <span className={"h-2.5 w-2.5 rounded-full \x62g-[#\x66ebc2e]"} />
                <span className={"h-2.5 w-2.5 rounded-full \x62g-[#\x328c840]"} />
              </span>
              <span className={"ml-2 flex items-center gap-1.5 text-[11.5px] font-medium \x74ext-[\x76ar(\x2d-text-secondary)]"}><img style={{ color: "transparent" }} alt="" loading="lazy" width="13" height="13" decoding="async" src="/site-assets/3737e44be6f1bbfb-5a19e14c570fcde745ab2532dc89a9e8.png" /> Claude Code</span>
            </div>
            <div className="min-h-[250px] p-4 text-[12.5px]">
              <div className={"\x73pace-y-2.\x35"}>
                <div className={"ml-auto w-fit max-w-[85%] rounded-[12px] \x72ounded-br-[\x34px] \x62g-[#\x663f3f2] px-3 py-2 \x74ext-[\x76ar(\x2d-text)] transition-all duration-500 ease-out pointer-events-none \x74ranslate-y-1.\x35 opacity-0"}><span className={"mb-1 flex items-center gap-1.5 text-[10.5px] font-medium \x74ext-[\x76ar(\x2d-text-tertiary)]"}><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18" /></svg> Pasted · Lumenis full template prompt</span>Build the Lumenis site from this spec.</div>
                <div className={"flex items-center gap-2 \x74ext-[\x76ar(\x2d-text-secondary)] transition-all duration-500 ease-out pointer-events-none \x74ranslate-y-1.\x35 opacity-0"}><span className={"flex h-4 w-4 items-center justify-center rounded-full \x62g-[#\x657f5e1] \x74ext-[#\x31f5a33]"}><svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5" /></svg></span>Setting up the project and design tokens…</div>
                <div className={"flex items-center gap-2 \x74ext-[\x76ar(\x2d-text-secondary)] transition-all duration-500 ease-out pointer-events-none \x74ranslate-y-1.\x35 opacity-0"}><span className={"flex h-4 w-4 items-center justify-center rounded-full \x62g-[#\x657f5e1] \x74ext-[#\x31f5a33]"}><svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5" /></svg></span>Hero, gallery and journal pages</div>
                <div className={"flex items-center gap-2 \x74ext-[\x76ar(\x2d-text-secondary)] transition-all duration-500 ease-out pointer-events-none \x74ranslate-y-1.\x35 opacity-0"}><span className={"flex h-4 w-4 items-center justify-center rounded-full \x62g-[#\x657f5e1] \x74ext-[#\x31f5a33]"}><svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5" /></svg></span>Responsive layout and motion</div>
                <div className={"mt-3 overflow-hidden rounded-[10px] \x73hadow-[\x30_0_0_1px_rgba(\x30,\x30,\x30,\x30.\x306)] transition-all duration-500 ease-out pointer-events-none \x74ranslate-y-1.\x35 opacity-0"}>
                  <div className="relative aspect-[16/7]">
                    <img className={"object-cover \x6fbject-top"} style={{ position: "absolute", height: "100%", width: "100%", inset: "0px", color: "transparent" }} alt="" loading="lazy" decoding="async" src="/site-assets/40f9a83ab363d229.webp" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p className={"mt-3 text-center text-[11.5px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>Illustration. AI prompts are available for AI-ready templates; Webflow and Framer depend on the formats a design has.</p>
    </section>
  );
}

function ImportedSectionBuiltOnceProperlyYours() {
  return (
    <section className="mx-auto mt-24 max-w-5xl px-4 sm:px-6">
      <div className="os-chip text-[10.5px] uppercase tracking-[0.06em]"><span className="os-dot" />What a membership gets you</div>
      <div className={"mt-5 grid gap-x-12 gap-y-3 md:grid-cols-[1.15fr_1fr] \x6dd:\x69tems-start"}>
        <h2 className={"\x66ont-[\x66amily-name:\x76ar(\x2d-font-heading)] text-[30px] font-medium leading-[1.1] tracking-tight \x74ext-[\x76ar(\x2d-text)] \x73m:\x74ext-[\x340px]"}>Built once, properly.<span className={"block \x74ext-[\x76ar(\x2d-text-tertiary)]"}>Yours to take anywhere.</span></h2>
        <p className={"text-[14px] leading-relaxed \x74ext-[\x76ar(\x2d-text-secondary)] md:pt-3"}>Every template here was designed and built by Substrates, not licensed from a marketplace. That means clean structure, real CMS setups, and files you can actually work with.</p>
      </div>
      <div className="mt-12 grid gap-4 md:grid-cols-2">
        <article className="os-shell p-2 pb-6">
          <div className="os-inset flex aspect-[4/3] items-center justify-center overflow-hidden px-6 sm:aspect-[16/10]" style={{ backgroundImage: "radial-gradient(90% 80% at 30% 20%, rgb(251, 251, 251) 0%, rgb(239, 239, 238) 60%, rgb(231, 231, 230) 100%)" } as CSSProperties}>
            <div className={"rounded-[16px] bg-white \x73hadow-[\x30_0_0_1px_rgba(\x30,\x30,\x30,\x30.\x305),\x30_1px_2px_rgba(\x30,\x30,\x30,\x30.\x306),\x30_18px_36px_-20px_rgba(\x30,\x30,\x30,\x30.\x335),\x69nset_0_1px_0_#\x66ff] w-full max-w-[320px] p-3"}>
              <div className="mb-2.5 flex items-center justify-between px-1">
                <span className={"text-[11px] font-medium \x74ext-[#\x3111]"}>One unlock</span>
                <span className={"text-[10px] \x74ext-black/\x340"}>1 credit</span>
              </div>
              <div className={"\x73pace-y-1.\x35"}>
                <div className={"flex items-center gap-2.5 rounded-[10px] \x62g-[#\x665f5f4] px-2.5 py-2 \x73hadow-[\x69nset_0_0_0_1px_rgba(\x30,\x30,\x30,\x30.\x304)]"}>
                  <span className={"flex w-4 shrink-0 justify-center \x74ext-black/\x370"}>
                    <svg width="16.25" height="10" viewBox="0 0 26 16" fill="none" aria-hidden="true">
                      <path fillRule="evenodd" clipRule="evenodd" d="M25.65 0L17.4654 16H9.77778L13.203 9.36892H13.0493C10.2235 13.0372 6.00738 15.452 0 16V9.46068C0 9.46068 3.84306 9.23369 6.10229 6.85844H0V0.000126383H6.85832V5.64099L7.01225 5.64036L9.8148 0.000126383H15.0016V5.60523L15.1555 5.60497L18.0632 0H25.65Z" fill="#146EF5" />
                    </svg>
                  </span>
                  <span className={"flex-1 text-[11px] \x74ext-[#\x3111]"}>Webflow template</span>
                  <span className={"text-[10px] \x74ext-black/\x335"}>Ready</span>
                </div>
                <div className={"flex items-center gap-2.5 rounded-[10px] \x62g-[#\x665f5f4] px-2.5 py-2 \x73hadow-[\x69nset_0_0_0_1px_rgba(\x30,\x30,\x30,\x30.\x304)]"}>
                  <span className={"flex w-4 shrink-0 justify-center \x74ext-black/\x370"}>
                    <svg width="8" height="12" viewBox="0 0 192 288" fill="none" aria-hidden="true">
                      <path d="M 96 192 L 96 288 L 0 192 L 0 96 L 96 96 L 0 0 L 192 0 L 192 96 L 96 96 L 192 192 Z" fill="currentColor" />
                    </svg>
                  </span>
                  <span className={"flex-1 text-[11px] \x74ext-[#\x3111]"}>Framer version</span>
                  <span className={"text-[10px] \x74ext-black/\x335"}>Ready</span>
                </div>
                <div className={"flex items-center gap-2.5 rounded-[10px] \x62g-[#\x665f5f4] px-2.5 py-2 \x73hadow-[\x69nset_0_0_0_1px_rgba(\x30,\x30,\x30,\x30.\x304)]"}>
                  <span className={"flex w-4 shrink-0 justify-center \x74ext-black/\x370"}>
                    <svg width="8.666666666666666" height="13" viewBox="0 0 288 432" fill="none" aria-hidden="true">
                      <path d="M144 216C144 176.641 175.907 144.733 215.267 144.733C254.626 144.733 286.534 176.641 286.534 216C286.534 255.36 254.626 287.267 215.267 287.267C175.907 287.267 144 255.36 144 216Z" fill="#1ABCFE" />
                      <path d="M1.46603 358.534C1.46603 319.175 33.3733 287.267 72.733 287.267H144V358.534C144 397.894 112.093 429.801 72.733 429.801C33.3733 429.801 1.46603 397.894 1.46603 358.534Z" fill="#0ACF83" />
                      <path d="M144 2.19946V144.733H215.267C254.627 144.733 286.534 112.826 286.534 73.4664C286.534 34.1068 254.627 2.19946 215.267 2.19946L144 2.19946Z" fill="#FF7262" />
                      <path d="M1.46603 73.4664C1.46603 112.826 33.3733 144.733 72.733 144.733L144 144.733L144 2.19941L72.733 2.19941C33.3733 2.19941 1.46603 34.1067 1.46603 73.4664Z" fill="#F24E1E" />
                      <path d="M1.46603 216C1.46603 255.36 33.3733 287.267 72.733 287.267H144L144 144.733L72.733 144.733C33.3733 144.733 1.46603 176.641 1.46603 216Z" fill="#A259FF" />
                    </svg>
                  </span>
                  <span className={"flex-1 text-[11px] \x74ext-[#\x3111]"}>Figma source file</span>
                  <span className={"text-[10px] \x74ext-black/\x335"}>Where available</span>
                </div>
              </div>
            </div>
          </div>
          <h3 className={"mt-5 px-4 text-[15px] font-medium \x74ext-[\x76ar(\x2d-text)]"}>One credit, every format</h3>
          <p className={"mt-1.5 max-w-lg px-4 text-[13px] leading-relaxed \x74ext-[\x76ar(\x2d-text-secondary)]"}>Unlocking a design gives you the Webflow template, the Framer version where one exists, and the Figma source file where one is available — including formats added to that design later.</p>
        </article>
        <article className="os-shell p-2 pb-6">
          <div className="os-inset flex aspect-[4/3] items-center justify-center overflow-hidden px-6 sm:aspect-[16/10]" style={{ backgroundImage: "radial-gradient(90% 80% at 70% 20%, rgb(251, 251, 251) 0%, rgb(239, 239, 238) 60%, rgb(231, 231, 230) 100%)" } as CSSProperties}>
            <div className="relative w-full max-w-[340px]">
              <div className={"rounded-[16px] bg-white \x73hadow-[\x30_0_0_1px_rgba(\x30,\x30,\x30,\x30.\x305),\x30_1px_2px_rgba(\x30,\x30,\x30,\x30.\x306),\x30_18px_36px_-20px_rgba(\x30,\x30,\x30,\x30.\x335),\x69nset_0_1px_0_#\x66ff] p-3"}>
                <div className="mb-2 flex items-center gap-1.5 px-1">
                  <svg className={"\x74ext-[\x76ar(\x2d-accent)]"} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18" />
                  </svg>
                  <span className={"text-[11px] font-medium \x74ext-[#\x3111]"}>Hand it to any tool</span>
                </div>
                <div className={"rounded-[10px] \x62g-[#\x30f0f0f] p-2.5 font-mono text-[10px] leading-relaxed \x74ext-white/\x370"}><span className={"\x74ext-white/\x335"}>$</span> open <span className={"\x74ext-[#\x66f8a4f]"}>template.html</span><br /><span className={"\x74ext-white/\x335"}>→</span> clean semantic markup<br /><span className={"\x74ext-white/\x335"}>→</span> ready for Cursor, Claude, v0</div>
              </div>
              <div className={"rounded-[16px] bg-white \x73hadow-[\x30_0_0_1px_rgba(\x30,\x30,\x30,\x30.\x305),\x30_1px_2px_rgba(\x30,\x30,\x30,\x30.\x306),\x30_18px_36px_-20px_rgba(\x30,\x30,\x30,\x30.\x335),\x69nset_0_1px_0_#\x66ff] absolute -bottom-5 -right-3 flex items-center gap-2 px-2.5 py-1.5"}>
                <span className={"flex h-4 w-4 items-center justify-center rounded-full \x62g-[#\x31f6b3f]/\x310 \x74ext-[#\x31f6b3f]"}>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="m5 12.5 4.5 4.5L19 7.5" />
                  </svg>
                </span>
                <span className={"text-[10px] \x74ext-[#\x3111]"}>Not locked to Webflow</span>
              </div>
            </div>
          </div>
          <h3 className={"mt-5 px-4 text-[15px] font-medium \x74ext-[\x76ar(\x2d-text)]"}>Not locked to one tool</h3>
          <p className={"mt-1.5 max-w-lg px-4 text-[13px] leading-relaxed \x74ext-[\x76ar(\x2d-text-secondary)]"}>These are real, clean builds. Open the markup, hand it to Cursor or Claude, or rebuild it somewhere else entirely. A template you cannot take with you is a rental.</p>
        </article>
        <article className="os-shell p-2 pb-6">
          <div className="os-inset flex aspect-[4/3] items-center justify-center overflow-hidden px-6 sm:aspect-[16/10]" style={{ backgroundImage: "radial-gradient(90% 80% at 30% 80%, rgb(251, 251, 251) 0%, rgb(239, 239, 238) 60%, rgb(231, 231, 230) 100%)" } as CSSProperties}>
            <div className="relative w-full max-w-[320px]">
              <div className={"rounded-[16px] bg-white \x73hadow-[\x30_0_0_1px_rgba(\x30,\x30,\x30,\x30.\x305),\x30_1px_2px_rgba(\x30,\x30,\x30,\x30.\x306),\x30_18px_36px_-20px_rgba(\x30,\x30,\x30,\x30.\x335),\x69nset_0_1px_0_#\x66ff] p-3"}>
                <div className="mb-2.5 flex items-center justify-between px-1">
                  <span className={"text-[11px] font-medium \x74ext-[#\x3111]"}>Request a Figma file</span>
                  <span className={"os-chip h-5 px-2 text-[9px] uppercase tracking-wide \x74ext-black/\x350"}>Soon</span>
                </div>
                <div className={"flex items-center gap-2.5 rounded-[10px] \x62g-[#\x665f5f4] px-2.5 py-2 \x73hadow-[\x69nset_0_0_0_1px_rgba(\x30,\x30,\x30,\x30.\x304)]"}>
                  <div className={"h-7 w-10 shrink-0 rounded-[6px] \x62g-gradient-to-br \x66rom-[#\x659e9e8] \x74o-[#\x63fcfcd]"} />
                  <div className="min-w-0 flex-1">
                    <div className={"h-1.5 w-20 rounded-full \x62g-black/\x312"} />
                    <div className={"mt-1.5 h-1.5 w-12 rounded-full \x62g-black/\x38"} />
                  </div>
                </div>
                <div className="os-spark relative mt-2 flex h-7 items-center justify-center rounded-full text-[10px] font-medium text-white" style={{ backgroundImage: "linear-gradient(rgb(46, 46, 46) 0%, rgb(17, 17, 17) 100%)", boxShadow: "rgba(255, 255, 255, 0.14) 0px 1px 0px inset, rgba(0, 0, 0, 0.5) 0px 6px 14px -8px" } as CSSProperties}>Request file</div>
              </div>
              <div className={"rounded-[16px] bg-white \x73hadow-[\x30_0_0_1px_rgba(\x30,\x30,\x30,\x30.\x305),\x30_1px_2px_rgba(\x30,\x30,\x30,\x30.\x306),\x30_18px_36px_-20px_rgba(\x30,\x30,\x30,\x30.\x335),\x69nset_0_1px_0_#\x66ff] absolute -left-4 -top-4 px-2.5 py-1.5"}>
                <span className={"text-[10px] \x74ext-[#\x3111]"}>Usually within a few days</span>
              </div>
            </div>
          </div>
          <h3 className={"mt-5 px-4 text-[15px] font-medium \x74ext-[\x76ar(\x2d-text)]"}>Ask for the Figma file</h3>
          <p className={"mt-1.5 max-w-lg px-4 text-[13px] leading-relaxed \x74ext-[\x76ar(\x2d-text-secondary)]"}>Not every design has a Figma file ready yet. Lifetime members will be able to request one for any template and we will prepare it. This is not live yet — it is coming after launch.</p>
        </article>
        <article className="os-shell p-2 pb-6">
          <div className="os-inset flex aspect-[4/3] items-center justify-center overflow-hidden px-6 sm:aspect-[16/10]" style={{ backgroundImage: "radial-gradient(90% 80% at 70% 80%, rgb(251, 251, 251) 0%, rgb(239, 239, 238) 60%, rgb(231, 231, 230) 100%)" } as CSSProperties}>
            <div className={"rounded-[16px] bg-white \x73hadow-[\x30_0_0_1px_rgba(\x30,\x30,\x30,\x30.\x305),\x30_1px_2px_rgba(\x30,\x30,\x30,\x30.\x306),\x30_18px_36px_-20px_rgba(\x30,\x30,\x30,\x30.\x335),\x69nset_0_1px_0_#\x66ff] w-full max-w-[320px] p-3"}>
              <div className="mb-2.5 flex items-center justify-between px-1">
                <span className={"text-[11px] font-medium \x74ext-[#\x3111]"}>Try before you spend</span>
                <span className={"text-[10px] \x74ext-black/\x340"}>No account</span>
              </div>
              <div className={"\x73pace-y-1.\x35"}>
                <div className="flex items-center gap-2.5">
                  <span className={"w-11 shrink-0 text-[10px] \x74ext-black/\x345"}>Desktop</span>
                  <div className={"h-6 flex-1 rounded-full \x62g-[#\x663f3f2] p-1 \x73hadow-[\x69nset_0_1px_2px_rgba(\x30,\x30,\x30,\x30.\x306)]"}>
                    <div className={"h-full rounded-full w-full \x62g-[#\x31a1a1a]"} />
                  </div>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className={"w-11 shrink-0 text-[10px] \x74ext-black/\x345"}>Tablet</span>
                  <div className={"h-6 flex-1 rounded-full \x62g-[#\x663f3f2] p-1 \x73hadow-[\x69nset_0_1px_2px_rgba(\x30,\x30,\x30,\x30.\x306)]"}>
                    <div className={"h-full rounded-full w-3/5 \x62g-black/\x312"} />
                  </div>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className={"w-11 shrink-0 text-[10px] \x74ext-black/\x345"}>Mobile</span>
                  <div className={"h-6 flex-1 rounded-full \x62g-[#\x663f3f2] p-1 \x73hadow-[\x69nset_0_1px_2px_rgba(\x30,\x30,\x30,\x30.\x306)]"}>
                    <div className={"h-full rounded-full w-1/3 \x62g-black/\x310"} />
                  </div>
                </div>
              </div>
              <p className={"mt-2 px-1 text-[10px] leading-relaxed \x74ext-black/\x345"}>Live preview at real device widths.</p>
            </div>
          </div>
          <h3 className={"mt-5 px-4 text-[15px] font-medium \x74ext-[\x76ar(\x2d-text)]"}>See it before you buy it</h3>
          <p className={"mt-1.5 max-w-lg px-4 text-[13px] leading-relaxed \x74ext-[\x76ar(\x2d-text-secondary)]"}>Browse and preview the whole catalog without an account. Each template opens as the real published site at desktop, tablet and mobile widths — not a screenshot, and not a squeezed desktop layout pretending to be a phone.</p>
        </article>
      </div>
    </section>
  );
}

function ImportedSectionBeforeYouDecide() {
  return (
    <section className="mx-auto mt-24 max-w-3xl px-4 sm:px-6">
      <h2 className={"\x66ont-[\x66amily-name:\x76ar(\x2d-font-heading)] text-[28px] font-medium tracking-tight \x74ext-[\x76ar(\x2d-text)] \x73m:\x74ext-[\x334px]"}>Before you decide</h2>
      <dl className="os-shell mt-7 px-6 py-2">
        <div className={"\x62order-b \x62order-[\x76ar(\x2d-line)] \x6cast:\x62order-b-0"}>
          <dt>
            <button className="flex w-full items-center justify-between gap-4 py-4 text-left transition-colors hover:opacity-70" type="button" aria-expanded="true" aria-controls="faq-panel-0">
              <span className={"text-[14px] font-medium \x74ext-[\x76ar(\x2d-text)]"}>What exactly does one credit unlock?</span>
              <svg className={"shrink-0 \x74ext-[\x76ar(\x2d-text-tertiary)] transition-transform duration-200 \x72otate-180"} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>
          </dt>
          <dd className={"pb-4 pr-8 text-[13px] leading-relaxed \x74ext-[\x76ar(\x2d-text-secondary)]"} id="faq-panel-0">One credit permanently unlocks one design and every format available for it, including formats added to that design later. Reopening or downloading a design you have already unlocked never costs another credit.</dd>
        </div>
        <div className={"\x62order-b \x62order-[\x76ar(\x2d-line)] \x6cast:\x62order-b-0"}>
          <dt>
            <button className="flex w-full items-center justify-between gap-4 py-4 text-left transition-colors hover:opacity-70" type="button" aria-expanded="false" aria-controls="faq-panel-1">
              <span className={"text-[14px] font-medium \x74ext-[\x76ar(\x2d-text)]"}>Which is better value for me?</span>
              <svg className={"shrink-0 \x74ext-[\x76ar(\x2d-text-tertiary)] transition-transform duration-200"} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>
          </dt>
          <dd className={"pb-4 pr-8 text-[13px] leading-relaxed \x74ext-[\x76ar(\x2d-text-secondary)]"} id="faq-panel-1" hidden>Sections is $15 a month for every Pro section and one template credit, the easy way in. Sections + Templates suits you if you build a few sites a year and want to spread the cost — $39 a month for three credits. Lifetime is $499 once for the whole catalog, which works out cheaper than buying roughly six templates individually, and it keeps covering everything added later.</dd>
        </div>
        <div className={"\x62order-b \x62order-[\x76ar(\x2d-line)] \x6cast:\x62order-b-0"}>
          <dt>
            <button className="flex w-full items-center justify-between gap-4 py-4 text-left transition-colors hover:opacity-70" type="button" aria-expanded="false" aria-controls="faq-panel-2">
              <span className={"text-[14px] font-medium \x74ext-[\x76ar(\x2d-text)]"}>Do unused credits roll over?</span>
              <svg className={"shrink-0 \x74ext-[\x76ar(\x2d-text-tertiary)] transition-transform duration-200"} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>
          </dt>
          <dd className={"pb-4 pr-8 text-[13px] leading-relaxed \x74ext-[\x76ar(\x2d-text-secondary)]"} id="faq-panel-2" hidden>No. Credits (one on Sections, three on Sections + Templates) are granted after each successful payment, and anything unused resets at renewal. If you want to bank templates rather than use them month to month, Lifetime is the better fit.</dd>
        </div>
        <div className={"\x62order-b \x62order-[\x76ar(\x2d-line)] \x6cast:\x62order-b-0"}>
          <dt>
            <button className="flex w-full items-center justify-between gap-4 py-4 text-left transition-colors hover:opacity-70" type="button" aria-expanded="false" aria-controls="faq-panel-3">
              <span className={"text-[14px] font-medium \x74ext-[\x76ar(\x2d-text)]"}>What happens to my templates if I cancel?</span>
              <svg className={"shrink-0 \x74ext-[\x76ar(\x2d-text-tertiary)] transition-transform duration-200"} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>
          </dt>
          <dd className={"pb-4 pr-8 text-[13px] leading-relaxed \x74ext-[\x76ar(\x2d-text-secondary)]"} id="faq-panel-3" hidden>Everything you already unlocked stays yours and stays in My Templates. Cancelling takes effect at the end of the period you have paid for, so you keep access and can spend remaining credits until then. After that the unused credits expire.</dd>
        </div>
        <div className={"\x62order-b \x62order-[\x76ar(\x2d-line)] \x6cast:\x62order-b-0"}>
          <dt>
            <button className="flex w-full items-center justify-between gap-4 py-4 text-left transition-colors hover:opacity-70" type="button" aria-expanded="false" aria-controls="faq-panel-4">
              <span className={"text-[14px] font-medium \x74ext-[\x76ar(\x2d-text)]"}>Does every template come with a Figma file?</span>
              <svg className={"shrink-0 \x74ext-[\x76ar(\x2d-text-tertiary)] transition-transform duration-200"} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>
          </dt>
          <dd className={"pb-4 pr-8 text-[13px] leading-relaxed \x74ext-[\x76ar(\x2d-text-secondary)]"} id="faq-panel-4" hidden>No, and we will not pretend otherwise. Figma files exist for a selected group of designs, and a download only appears once a file has actually been attached. Lifetime members will be able to request a file for any template — that feature is coming shortly after launch.</dd>
        </div>
        <div className={"\x62order-b \x62order-[\x76ar(\x2d-line)] \x6cast:\x62order-b-0"}>
          <dt>
            <button className="flex w-full items-center justify-between gap-4 py-4 text-left transition-colors hover:opacity-70" type="button" aria-expanded="false" aria-controls="faq-panel-5">
              <span className={"text-[14px] font-medium \x74ext-[\x76ar(\x2d-text)]"}>Can I use these outside Webflow?</span>
              <svg className={"shrink-0 \x74ext-[\x76ar(\x2d-text-tertiary)] transition-transform duration-200"} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>
          </dt>
          <dd className={"pb-4 pr-8 text-[13px] leading-relaxed \x74ext-[\x76ar(\x2d-text-secondary)]"} id="faq-panel-5" hidden>Yes. They are real builds with clean markup, so you can export, adapt, or hand the structure to an AI tool and rebuild elsewhere. Framer versions exist for some designs, and more are being added.</dd>
        </div>
        <div className={"\x62order-b \x62order-[\x76ar(\x2d-line)] \x6cast:\x62order-b-0"}>
          <dt>
            <button className="flex w-full items-center justify-between gap-4 py-4 text-left transition-colors hover:opacity-70" type="button" aria-expanded="false" aria-controls="faq-panel-6">
              <span className={"text-[14px] font-medium \x74ext-[\x76ar(\x2d-text)]"}>Can I use a template for a client project?</span>
              <svg className={"shrink-0 \x74ext-[\x76ar(\x2d-text-tertiary)] transition-transform duration-200"} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>
          </dt>
          <dd className={"pb-4 pr-8 text-[13px] leading-relaxed \x74ext-[\x76ar(\x2d-text-secondary)]"} id="faq-panel-6" hidden>Yes — personal and client projects are both fine. What is not allowed is redistributing or reselling the files, sharing your account, or passing on a fulfilment link. <span className={"\x74ext-[\x76ar(\x2d-text-tertiary)]"}>Reuse of a single template across multiple projects is not confirmed under Webflow’s licence, so check before relying on it.</span></dd>
        </div>
        <div className={"\x62order-b \x62order-[\x76ar(\x2d-line)] \x6cast:\x62order-b-0"}>
          <dt>
            <button className="flex w-full items-center justify-between gap-4 py-4 text-left transition-colors hover:opacity-70" type="button" aria-expanded="false" aria-controls="faq-panel-7">
              <span className={"text-[14px] font-medium \x74ext-[\x76ar(\x2d-text)]"}>Is there a refund?</span>
              <svg className={"shrink-0 \x74ext-[\x76ar(\x2d-text-tertiary)] transition-transform duration-200"} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>
          </dt>
          <dd className={"pb-4 pr-8 text-[13px] leading-relaxed \x74ext-[\x76ar(\x2d-text-secondary)]"} id="faq-panel-7" hidden>Because unlocking delivers the template immediately and permanently, an unlocked design cannot be returned. If something is broken or not as described, contact us and we will sort it out.</dd>
        </div>
      </dl>
      <div className="os-inset mt-4 p-6">
        <h3 className={"text-[13px] font-medium \x74ext-[\x76ar(\x2d-text)]"}>Licence, in short</h3>
        <ul className={"mt-2.5 \x73pace-y-1.\x35"}>
          <li className={"text-[13px] leading-relaxed \x74ext-[\x76ar(\x2d-text-secondary)]"}>Use in your own personal or client projects.</li>
          <li className={"text-[13px] leading-relaxed \x74ext-[\x76ar(\x2d-text-secondary)]"}>No redistribution or resale of the template files.</li>
          <li className={"text-[13px] leading-relaxed \x74ext-[\x76ar(\x2d-text-secondary)]"}>No account sharing and no sharing of fulfillment links.</li>
          <li className={"text-[13px] leading-relaxed \x74ext-[\x76ar(\x2d-text-secondary)]"}>Reuse across multiple projects is not confirmed — check the template licence before relying on it.</li>
        </ul>
        <p className={"mt-4 text-[12px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>Still unsure? <a className={"underline \x75nderline-offset-4 \x68over:\x74ext-[\x76ar(\x2d-text-secondary)]"} href="/help">Read the full help page</a> or <a className={"underline \x75nderline-offset-4 \x68over:\x74ext-[\x76ar(\x2d-text-secondary)]"} href="https://substrates.app/" rel="noopener noreferrer" target="_blank">contact Substrates</a>.</p>
      </div>
    </section>
  );
}

function ImportedNavMain() {
  return (
    <nav className={"fixed \x69nset-x-3 bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-30 \x6cg:\x68idden"} aria-label="Main">
      <ul className="os-shell mx-auto flex max-w-md items-stretch justify-between gap-0.5 !rounded-full p-1.5">
        <li className="min-w-0 flex-1">
          <a className={"relative flex h-12 flex-col items-center justify-center gap-0.5 rounded-full text-[10px] font-medium transition-[background,color] duration-150 \x74ext-[\x76ar(\x2d-text-tertiary)]"} href="/"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 256 256" aria-hidden="true"><path d="M224,120v96a8,8,0,0,1-8,8H40a8,8,0,0,1-8-8V120a15.87,15.87,0,0,1,4.69-11.32l80-80a16,16,0,0,1,22.62,0l80,80A15.87,15.87,0,0,1,224,120Z" /></svg>Home</a>
        </li>
        <li className="min-w-0 flex-1">
          <a className={"relative flex h-12 flex-col items-center justify-center gap-0.5 rounded-full text-[10px] font-medium transition-[background,color] duration-150 \x74ext-[\x76ar(\x2d-text-tertiary)]"} href="/?collection=all"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 256 256" aria-hidden="true"><path d="M120,56v48a16,16,0,0,1-16,16H56a16,16,0,0,1-16-16V56A16,16,0,0,1,56,40h48A16,16,0,0,1,120,56Zm80-16H152a16,16,0,0,0-16,16v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V56A16,16,0,0,0,200,40Zm-96,96H56a16,16,0,0,0-16,16v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V152A16,16,0,0,0,104,136Zm96,0H152a16,16,0,0,0-16,16v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V152A16,16,0,0,0,200,136Z" /></svg>Templates</a>
        </li>
        <li className="min-w-0 flex-1">
          <a className={"relative flex h-12 flex-col items-center justify-center gap-0.5 rounded-full text-[10px] font-medium transition-[background,color] duration-150 \x74ext-[\x76ar(\x2d-text-tertiary)]"} href="/sections"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 256 256" aria-hidden="true"><path d="M208,144a15.78,15.78,0,0,1-10.42,14.94L146,178l-19,51.62a15.92,15.92,0,0,1-29.88,0L78,178l-51.62-19a15.92,15.92,0,0,1,0-29.88L78,110l19-51.62a15.92,15.92,0,0,1,29.88,0L146,110l51.62,19A15.78,15.78,0,0,1,208,144ZM152,48h16V64a8,8,0,0,0,16,0V48h16a8,8,0,0,0,0-16H184V16a8,8,0,0,0-16,0V32H152a8,8,0,0,0,0,16Zm88,32h-8V72a8,8,0,0,0-16,0v8h-8a8,8,0,0,0,0,16h8v8a8,8,0,0,0,16,0V96h8a8,8,0,0,0,0-16Z" /></svg>Sections<span className={"absolute right-[6%] top-0.5 rounded-full \x62g-[#\x657f5e1] px-1 text-[8.5px] font-semibold uppercase leading-[14px] \x74ext-[#\x31f5a33]"}>Free</span></a>
        </li>
        <li className="min-w-0 flex-1">
          <a className={"relative flex h-12 flex-col items-center justify-center gap-0.5 rounded-full text-[10px] font-medium transition-[background,color] duration-150 \x74ext-[\x76ar(\x2d-text-tertiary)]"} href="/videos"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 256 256" aria-hidden="true"><path d="M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40ZM184,56h32V72H184ZM72,200H40V184H72ZM72,72H40V56H72Zm48,128H88V184h32Zm0-128H88V56h32Zm48,128H136V184h32Zm0-128H136V56h32Zm48,128H184V184h32v16Z" /></svg>Videos</a>
        </li>
        <li className="min-w-0 flex-1">
          <a className={"relative flex h-12 flex-col items-center justify-center gap-0.5 rounded-full text-[10px] font-medium transition-[background,color] duration-150 \x62g-gradient-to-b \x66rom-white \x74o-[#\x663f3f2] \x74ext-[\x76ar(\x2d-text)] \x73hadow-[\x76ar(\x2d-shadow-raised)]"} aria-current="page" href="#"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 256 256" aria-hidden="true"><path d="M243.31,136,144,36.69A15.86,15.86,0,0,0,132.69,32H40a8,8,0,0,0-8,8v92.69A15.86,15.86,0,0,0,36.69,144L136,243.31a16,16,0,0,0,22.63,0l84.68-84.68a16,16,0,0,0,0-22.63ZM84,96A12,12,0,1,1,96,84,12,12,0,0,1,84,96Z" /></svg>Pricing</a>
        </li>
      </ul>
    </nav>
  );
}
