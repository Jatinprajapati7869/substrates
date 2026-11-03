import { useSupplyShell } from "@/lib/use-supply-shell";
import type { CSSProperties } from "react";
import { createFileRoute } from "@tanstack/react-router";
import capturedCSS from "../styles/pages/guides.webflow-vs-framer.css?raw";

export const Route = createFileRoute("/guides_/webflow-vs-framer")({
  head: () => ({ meta: [
    { title: "Webflow vs Framer: Which Should You Build Your Website In? \u2014 Substrates" },
    { name: "description", content: "I design templates for both, so I get this question a lot. The short answer: Framer if you think like a designer, Webflow if you think like a developer. Here's the longer one." },
    { property: "og:title", content: "Webflow vs Framer: Which Should You Build Your Website In? \u2014 Substrates" },
    { property: "og:description", content: "I design templates for both, so I get this question a lot. The short answer: Framer if you think like a designer, Webflow if you think like a developer. Here's the longer one." },
    { property: "og:type", content: "article" },
    { name: "twitter:card", content: "summary_large_image" }
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
            <div className="mx-auto max-w-6xl px-4 pb-24 pt-[72px] sm:px-6 lg:px-8 lg:pt-8">
              <nav className={"px-1 text-[12px] \x74ext-[\x76ar(\x2d-text-tertiary)]"} aria-label="Breadcrumb">
                <ol className="flex flex-wrap items-center gap-1.5">
                  <li className="flex items-center gap-1.5">
                    <a className={"transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"} href="/">Home</a>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span aria-hidden="true">/</span>
                    <a className={"transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"} href="/guides">Guides</a>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span aria-hidden="true">/</span>
                    <span className={"\x74ext-[\x76ar(\x2d-text-secondary)]"} aria-current="page">Webflow vs Framer: Which Should You Build Your Website In?</span>
                  </li>
                </ol>
              </nav>
              <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_220px] lg:gap-14">
                <ImportedArticleWebflowVsFramerWhich />
                <nav className={"hidden \x6cg:\x62lock"} aria-label="On this page">
                  <div className="sticky top-8">
                    <p className={"text-[11.5px] font-semibold uppercase tracking-[0.08em] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>On this page</p>
                    <ol className={"mt-3 \x73pace-y-2 \x62order-l \x62order-[\x76ar(\x2d-line)] pl-3 text-[13px] leading-snug"}>
                      <li>
                        <a className={"\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"} href="#how-they-feel-to-use">How they feel to use</a>
                      </li>
                      <li>
                        <a className={"\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"} href="#webflow-vs-framer-side-by-side">Webflow vs Framer, side by side</a>
                      </li>
                      <li>
                        <a className={"\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"} href="#which-is-better-for-a-portfolio">Which is better for a portfolio?</a>
                      </li>
                      <li>
                        <a className={"\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"} href="#which-is-better-for-an-agency-or-a-client-site">Which is better for an agency or a client site?</a>
                      </li>
                      <li>
                        <a className={"\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"} href="#which-is-better-for-a-saas-or-startup-landing-page">Which is better for a SaaS or startup landing page?</a>
                      </li>
                      <li>
                        <a className={"\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"} href="#what-about-seo">What about SEO?</a>
                      </li>
                      <li>
                        <a className={"\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"} href="#can-you-switch-later">Can you switch later?</a>
                      </li>
                      <li>
                        <a className={"\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"} href="#the-fastest-way-to-decide">The fastest way to decide</a>
                      </li>
                    </ol>
                  </div>
                </nav>
              </div>
              <ImportedSectionKeepReading />
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
            <a className={"group mx-2 flex items-center gap-2.5 rounded-[12px] px-2.5 py-[7px] text-[13px] transition-[background-color,color,box-shadow] duration-150 \x62g-gradient-to-b \x66rom-white \x74o-[#\x667f7f6] font-medium \x74ext-[\x76ar(\x2d-text)] \x73hadow-[\x76ar(\x2d-shadow-raised)]"} aria-current="page" href="/guides">
              <span className={"flex h-[18px] w-[18px] shrink-0 items-center justify-center \x74ext-[\x76ar(\x2d-text)]"} aria-hidden="true">
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
              <a className={"os-button relative inline-flex select-none items-center justify-center gap-2 rounded-full font-medium transition-[transform,box-shadow,filter,background-color] duration-150 ease-out \x64isabled:\x63ursor-not-allowed disabled:opacity-45 h-9 px-4 text-[12px] os-spark text-white w-full"} style={{ backgroundImage: "linear-gradient(rgb(46, 46, 46) 0%, rgb(26, 26, 26) 50%, rgb(14, 14, 14) 100%)", boxShadow: "rgba(255, 255, 255, 0.14) 0px 1px 0px inset, rgba(0, 0, 0, 0.5) 0px -1px 0px inset, rgba(0, 0, 0, 0.22) 0px 1px 2px, rgba(0, 0, 0, 0.5) 0px 10px 22px -10px, rgba(255, 82, 6, 0.55) 0px 8px 18px -12px" } as CSSProperties} href="/pricing">View pricing</a>
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

function ImportedArticleWebflowVsFramerWhich() {
  return (
    <article className="mx-auto w-full min-w-0 max-w-[680px]">
      <header>
        <p className={"text-[12.5px] font-medium \x74ext-[\x76ar(\x2d-text-tertiary)]"}><a className={"\x74ext-[#\x66f5206]"} href="/guides">Webflow &amp; Framer</a> · <time dateTime="2026-10-22T09:30:00.000Z">Oct 22, 2026</time> · 3 min read</p>
        <h1 className={"mt-3 \x66ont-[\x66amily-name:\x76ar(\x2d-font-heading)] text-[34px] font-medium leading-[1.08] tracking-[-0.03em] \x74ext-[\x76ar(\x2d-text)] \x73m:\x74ext-[\x346px]"}>Webflow vs Framer: Which Should You Build Your Website In?</h1>
        <p className={"mt-4 text-[17px] leading-relaxed \x74ext-[\x76ar(\x2d-text-secondary)]"}>I design templates for both, so I get this question a lot. The short answer: Framer if you think like a designer, Webflow if you think like a developer. Here's the longer one.</p>
        <p className={"mt-5 text-[13px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>By Florent, <a className={"underline \x75nderline-offset-2"} href="https://substrates.app">Substrates</a></p>
      </header>
      <div className="mt-10">
        <div className="guide-prose">
          <p>I build website templates in both Webflow and Framer, and "which one should I use?" is the question I get most. Both are no-code website builders, both host your site, and both can produce something that looks great. They just get there in very different ways, and the right one depends more on how you like to work than on which is "better".</p>
          <p>Here's the short version, then the details.</p>
          <ul>
            <li><strong className={"font-semibold \x74ext-[\x76ar(\x2d-text)]"}>Pick Framer</strong> if you design in Figma, want to move fast, and care most about how the site looks and moves.</li>
            <li><strong className={"font-semibold \x74ext-[\x76ar(\x2d-text)]"}>Pick Webflow</strong> if you want control over structure and styling, a serious CMS, or you're handing the site to a client or team to manage.</li>
          </ul>
          <h2 className="[scroll-margin-top:90px]" id="how-they-feel-to-use">How they feel to use</h2>
          <p><strong className={"font-semibold \x74ext-[\x76ar(\x2d-text)]"}>Framer feels like a design tool.</strong> You work on a free canvas, much like Figma: draw a frame, drop things in, use stacks to lay them out. If you've designed anything in Figma, you'll be productive in an afternoon. Animations, scroll effects and hover states are built in and quick to add, which is why so many Framer sites feel lively.</p>
          <p><strong className={"font-semibold \x74ext-[\x76ar(\x2d-text)]"}>Webflow feels like building a website.</strong> It's visual, but the concepts are the ones the web is made of: containers, flexbox and grid, classes that you reuse across the site. That makes the learning curve steeper, but once it clicks you get precise control over how everything is structured and how it responds on different screen sizes.</p>
          <p>Neither is wrong. If you've ever written a bit of CSS, Webflow will make sense. If you've only ever designed, Framer will.</p>
          <h2 className="[scroll-margin-top:90px]" id="webflow-vs-framer-side-by-side">Webflow vs Framer, side by side</h2>
          <div className="guide-table [overflow-x:auto]">
            <table>
              <thead>
                <tr>
                  <th scope="col" />
                  <th scope="col">Framer</th>
                  <th scope="col">Webflow</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">Feels like</th>
                  <td>A design tool (Figma-style canvas)</td>
                  <td>A visual website builder (HTML/CSS concepts)</td>
                </tr>
                <tr>
                  <th scope="row">Learning curve</th>
                  <td>Gentle</td>
                  <td>Steeper</td>
                </tr>
                <tr>
                  <th scope="row">Layout</th>
                  <td>Stacks and free positioning</td>
                  <td>Flexbox, grid and reusable classes</td>
                </tr>
                <tr>
                  <th scope="row">Animation</th>
                  <td>Built-in effects, very quick</td>
                  <td>Webflow Interactions, very flexible</td>
                </tr>
                <tr>
                  <th scope="row">CMS</th>
                  <td>Yes, good for blogs and simple collections</td>
                  <td>Yes, more structured and powerful</td>
                </tr>
                <tr>
                  <th scope="row">Handing to a client</th>
                  <td>Possible</td>
                  <td>A strong point, with an editor built for it</td>
                </tr>
                <tr>
                  <th scope="row">Starting from a template</th>
                  <td>Remix a template with one link</td>
                  <td>Clone a template into your workspace</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>Pricing changes often on both, so check their current plans before deciding; both have paid site plans for custom domains.</p>
          <h2 className="[scroll-margin-top:90px]" id="which-is-better-for-a-portfolio">Which is better for a portfolio?</h2>
          <p>For most personal portfolios I'd lean <strong className={"font-semibold \x74ext-[\x76ar(\x2d-text)]"}>Framer</strong>. Portfolios are mostly visual, rarely need complex content structures, and benefit from the motion Framer makes easy. You'll go from idea to published site fastest there.</p>
          <p>If your portfolio has a lot of case studies you want to manage as structured content, Webflow's CMS starts to pay off.</p>
          <h2 className="[scroll-margin-top:90px]" id="which-is-better-for-an-agency-or-a-client-site">Which is better for an agency or a client site?</h2>
          <p>Usually <strong className={"font-semibold \x74ext-[\x76ar(\x2d-text)]"}>Webflow</strong>. Clients need to edit content without breaking the design, and Webflow's class system and editor are built for exactly that. Its structure also scales better when a site grows to dozens of pages.</p>
          <h2 className="[scroll-margin-top:90px]" id="which-is-better-for-a-saas-or-startup-landing-page">Which is better for a SaaS or startup landing page?</h2>
          <p>Both work well. Framer gets a polished launch page live quickly, which matters when you're iterating on messaging every week. Webflow is the safer bet if the site will grow into docs, a blog with many categories, or a larger marketing team working in it.</p>
          <h2 className="[scroll-margin-top:90px]" id="what-about-seo">What about SEO?</h2>
          <p>Both give you per-page titles, meta descriptions, Open Graph images, clean URLs and a generated sitemap, and both host on fast global infrastructure. Your rankings will depend far more on what you write and how your pages are structured than on which of the two you pick.</p>
          <h2 className="[scroll-margin-top:90px]" id="can-you-switch-later">Can you switch later?</h2>
          <p>Not easily. There's no clean export from one into the other, so moving usually means rebuilding the design. That's the best reason to pick deliberately now, and a good reason to start from a template so the rebuild cost is lower if you ever do switch.</p>
          <h2 className="[scroll-margin-top:90px]" id="the-fastest-way-to-decide">The fastest way to decide</h2>
          <p>Open one template in each and try to change the hero section. Whichever one you enjoy more after twenty minutes is your answer. You can browse <a className={"font-medium \x74ext-[\x76ar(\x2d-text)] underline \x64ecoration-black/\x325 \x75nderline-offset-[\x33px] transition-colors \x68over:\x64ecoration-black/\x370"} href="/?platform=webflow">Webflow templates</a> and <a className={"font-medium \x74ext-[\x76ar(\x2d-text)] underline \x64ecoration-black/\x325 \x75nderline-offset-[\x33px] transition-colors \x68over:\x64ecoration-black/\x370"} href="/?platform=framer">Framer templates</a> side by side on Substrates, or see <a className={"font-medium \x74ext-[\x76ar(\x2d-text)] underline \x64ecoration-black/\x325 \x75nderline-offset-[\x33px] transition-colors \x68over:\x64ecoration-black/\x370"} href="/templates">every template by category</a>.</p>
          <p>And if you're building with Claude, Cursor or v0 instead, the same designs can be copied as a single prompt, so the tool choice matters even less.</p>
        </div>
      </div>
      <aside className="os-dark relative mt-16 overflow-hidden !rounded-[var(--r-shell)] p-7 sm:p-10" aria-label={"Webflow & Framer templates"}>
        <div className={"pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full \x62g-[#\x66f5206] opacity-25 \x62lur-[\x390px]"} aria-hidden="true" />
        <p className={"relative text-[11.5px] font-semibold uppercase tracking-[0.1em] \x74ext-[#\x665d98a]"}>Webflow &amp; Framer templates</p>
        <p className={"relative mt-3 \x66ont-[\x66amily-name:\x76ar(\x2d-font-heading)] text-[28px] font-medium leading-[1.1] tracking-[-0.02em] text-white \x73m:\x74ext-[\x334px]"}>Start from a finished design.<br /><span className={"\x74ext-white/\x350"}>Not a blank page.</span></p>
        <p className={"relative mt-3 max-w-md text-[14.5px] leading-relaxed \x74ext-white/\x365"}>Open a template in Webflow or Framer, or copy the whole thing as one prompt for Claude, Cursor or v0.</p>
        <div className={"relative mt-7 flex flex-col gap-2.5 \x73m:\x66lex-row \x73m:\x69tems-center"}>
          <a className={"flex h-12 items-center justify-center gap-2 rounded-full bg-white px-6 text-[14.5px] font-semibold text-black transition-transform \x61ctive:\x73cale-[\x30.\x398]"} href="/templates">Browse the templates{" "}<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg></a>
          <a className={"flex h-12 items-center justify-center rounded-full px-5 text-[14px] font-medium \x74ext-white/\x380 \x72ing-1 \x72ing-white/\x320 transition-colors \x68over:\x62g-white/\x310"} href="/sections">See free sections</a>
        </div>
      </aside>
    </article>
  );
}

function ImportedSectionKeepReading() {
  return (
    <section className="mx-auto mt-20 max-w-6xl" aria-labelledby="related">
      <h2 className={"px-1 \x66ont-[\x66amily-name:\x76ar(\x2d-font-heading)] text-[22px] font-medium tracking-tight \x74ext-[\x76ar(\x2d-text)]"} id="related">Keep reading</h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <a className={"os-shell block p-5 transition-transform \x68over:\x2dtranslate-y-0.\x35"} href="/guides/app-landing-page-templates">
          <p className={"text-[11.5px] font-medium \x74ext-[#\x66f5206]"}>Webflow &amp; Framer</p>
          <p className={"mt-1.5 \x66ont-[\x66amily-name:\x76ar(\x2d-font-heading)] text-[17px] font-medium leading-snug \x74ext-[\x76ar(\x2d-text)]"}>6 App Landing Page Templates That Make Your App Look Great</p>
          <p className={"mt-1.5 \x6cine-clamp-2 text-[13px] \x74ext-[\x76ar(\x2d-text-secondary)]"}>An app landing page has one job: get the download. Here are six Webflow templates built around phone mockups and big product moments, and what every app page needs.</p>
        </a>
        <a className={"os-shell block p-5 transition-transform \x68over:\x2dtranslate-y-0.\x35"} href="/guides/saas-website-templates">
          <p className={"text-[11.5px] font-medium \x74ext-[#\x66f5206]"}>Webflow &amp; Framer</p>
          <p className={"mt-1.5 \x66ont-[\x66amily-name:\x76ar(\x2d-font-heading)] text-[17px] font-medium leading-snug \x74ext-[\x76ar(\x2d-text)]"}>8 SaaS Website Templates for Webflow (and How to Pick One)</p>
          <p className={"mt-1.5 \x6cine-clamp-2 text-[13px] \x74ext-[\x76ar(\x2d-text-secondary)]"}>A SaaS site has to explain the product fast and get people to try it. Here are eight Webflow templates built for that, and how to choose the right one for your product.</p>
        </a>
        <a className={"os-shell block p-5 transition-transform \x68over:\x2dtranslate-y-0.\x35"} href="/guides/portfolio-website-templates">
          <p className={"text-[11.5px] font-medium \x74ext-[#\x66f5206]"}>Webflow &amp; Framer</p>
          <p className={"mt-1.5 \x66ont-[\x66amily-name:\x76ar(\x2d-font-heading)] text-[17px] font-medium leading-snug \x74ext-[\x76ar(\x2d-text)]"}>8 Portfolio Website Templates for Designers, Photographers and Agencies</p>
          <p className={"mt-1.5 \x6cine-clamp-2 text-[13px] \x74ext-[\x76ar(\x2d-text-secondary)]"}>Your portfolio should make your work the star, not the template. Here are eight portfolio designs for designers, photographers and agencies, and how to choose between them.</p>
        </a>
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
          <a className={"relative flex h-12 flex-col items-center justify-center gap-0.5 rounded-full text-[10px] font-medium transition-[background,color] duration-150 \x74ext-[\x76ar(\x2d-text-tertiary)]"} href="/pricing"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 256 256" aria-hidden="true"><path d="M243.31,136,144,36.69A15.86,15.86,0,0,0,132.69,32H40a8,8,0,0,0-8,8v92.69A15.86,15.86,0,0,0,36.69,144L136,243.31a16,16,0,0,0,22.63,0l84.68-84.68a16,16,0,0,0,0-22.63ZM84,96A12,12,0,1,1,96,84,12,12,0,0,1,84,96Z" /></svg>Pricing</a>
        </li>
      </ul>
    </nav>
  );
}
