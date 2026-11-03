import { useSupplyShell } from "@/lib/use-supply-shell";
import type { CSSProperties } from "react";
import { createFileRoute } from "@tanstack/react-router";
import capturedCSS from "../styles/pages/guides.faceless-explainer-videos.css?raw";

export const Route = createFileRoute("/guides_/faceless-explainer-videos")({
  head: () => ({ meta: [
    { title: "How to Make Faceless Explainer Videos for Reels and TikTok \u2014 Substrates" },
    { name: "description", content: "You don't need to be on camera to make videos that travel. My explainer shorts never show a face. Here's what actually makes a faceless video work, and how to make one." },
    { property: "og:title", content: "How to Make Faceless Explainer Videos for Reels and TikTok \u2014 Substrates" },
    { property: "og:description", content: "You don't need to be on camera to make videos that travel. My explainer shorts never show a face. Here's what actually makes a faceless video work, and how to make one." },
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
                    <span className={"\x74ext-[\x76ar(\x2d-text-secondary)]"} aria-current="page">How to Make Faceless Explainer Videos for Reels and TikTok</span>
                  </li>
                </ol>
              </nav>
              <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_220px] lg:gap-14">
                <ImportedArticleHowToMakeFaceless />
                <nav className={"hidden \x6cg:\x62lock"} aria-label="On this page">
                  <div className="sticky top-8">
                    <p className={"text-[11.5px] font-semibold uppercase tracking-[0.08em] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>On this page</p>
                    <ol className={"mt-3 \x73pace-y-2 \x62order-l \x62order-[\x76ar(\x2d-line)] pl-3 text-[13px] leading-snug"}>
                      <li>
                        <a className={"\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"} href="#what-makes-a-faceless-explainer-work">What makes a faceless explainer work</a>
                      </li>
                      <li>
                        <a className={"\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"} href="#a-workflow-for-making-them">A workflow for making them</a>
                      </li>
                      <li>
                        <a className={"\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"} href="#using-ai-to-animate-them">Using AI to animate them</a>
                      </li>
                      <li>
                        <a className={"\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"} href="#mistakes-that-kill-faceless-videos">Mistakes that kill faceless videos</a>
                      </li>
                      <li>
                        <a className={"\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"} href="#where-to-start">Where to start</a>
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

function ImportedArticleHowToMakeFaceless() {
  return (
    <article className="mx-auto w-full min-w-0 max-w-[680px]">
      <header>
        <p className={"text-[12.5px] font-medium \x74ext-[\x76ar(\x2d-text-tertiary)]"}><a className={"\x74ext-[#\x66f5206]"} href="/guides">Animations &amp; Videos</a> · <time dateTime="2026-10-25T09:30:00.000Z">Oct 25, 2026</time> · 3 min read</p>
        <h1 className={"mt-3 \x66ont-[\x66amily-name:\x76ar(\x2d-font-heading)] text-[34px] font-medium leading-[1.08] tracking-[-0.03em] \x74ext-[\x76ar(\x2d-text)] \x73m:\x74ext-[\x346px]"}>How to Make Faceless Explainer Videos for Reels and TikTok</h1>
        <p className={"mt-4 text-[17px] leading-relaxed \x74ext-[\x76ar(\x2d-text-secondary)]"}>You don't need to be on camera to make videos that travel. My explainer shorts never show a face. Here's what actually makes a faceless video work, and how to make one.</p>
        <p className={"mt-5 text-[13px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>By Florent, <a className={"underline \x75nderline-offset-2"} href="https://substrates.app">Substrates</a></p>
      </header>
      <div className="mt-10">
        <div className="guide-prose">
          <p>A lot of people want to post short videos but don't want to be on camera. Good news: you don't have to be. The explainer shorts I post are animations with captions, no face, and together my last 10 have passed 2.6 million views.</p>
          <p>But "faceless" isn't a shortcut. Without a face, the video has to hold attention on its own, with the idea, the visuals and the pacing. Here's what I've found matters, and a workflow you can use.</p>
          <h2 className="[scroll-margin-top:90px]" id="what-makes-a-faceless-explainer-work">What makes a faceless explainer work</h2>
          <h3 className="[scroll-margin-top:90px]" id="one-surprising-idea">One surprising idea</h3>
          <p>The best-performing format is simple: show people one thing they've seen a hundred times and never noticed. For example, why a menu on your computer seems to "know" where your mouse is heading. That one idea is the whole video.</p>
          <p>If you can't say the payoff in one sentence, the video is trying to do too much. Narrow it down.</p>
          <h3 className="[scroll-margin-top:90px]" id="a-hook-in-the-first-second">A hook in the first second</h3>
          <p>Without a face to look at, the first frame and first caption decide whether someone keeps watching. Good hooks:</p>
          <ul>
            <li><strong className={"font-semibold \x74ext-[\x76ar(\x2d-text)]"}>A question they can't answer yet:</strong> "Why does this menu never close by accident?"</li>
            <li><strong className={"font-semibold \x74ext-[\x76ar(\x2d-text)]"}>A claim that sounds wrong:</strong> "There's an invisible triangle on your screen."</li>
            <li><strong className={"font-semibold \x74ext-[\x76ar(\x2d-text)]"}>Showing the result first,</strong> then explaining it.</li>
          </ul>
          <p>Avoid slow intros, logos or "In this video…". Start with the idea.</p>
          <h3 className="[scroll-margin-top:90px]" id="captions-that-carry-the-story">Captions that carry the story</h3>
          <p>Plenty of people scroll with the sound off, so in a faceless video the captions are the narrator. Write them as short beats, a few words each, big enough to read on a phone at arm's length. If the video makes sense with no audio, it'll work everywhere.</p>
          <h3 className="[scroll-margin-top:90px]" id="motion-with-a-purpose">Motion with a purpose</h3>
          <p>Everything that moves should point at the idea: a shape that appears at the exact moment the caption mentions it, a line that draws the path you're describing. Decorative motion is what makes AI videos feel generic.</p>
          <h3 className="[scroll-margin-top:90px]" id="short-and-complete">Short and complete</h3>
          <p>Many good explainers are 12–20 seconds. The aim isn't a specific length; it's that nothing in it could be cut. A short video watched to the end beats a long one people skip.</p>
          <h2 className="[scroll-margin-top:90px]" id="a-workflow-for-making-them">A workflow for making them</h2>
          <ol>
            <li><strong className={"font-semibold \x74ext-[\x76ar(\x2d-text)]"}>Collect ideas.</strong> Keep a note of small "huh, why is that?" moments from apps, products and everyday life.</li>
            <li><strong className={"font-semibold \x74ext-[\x76ar(\x2d-text)]"}>Write the beats.</strong> Four to six captions, each under eight words, with a note of what's on screen.</li>
            <li><strong className={"font-semibold \x74ext-[\x76ar(\x2d-text)]"}>Storyboard the visuals.</strong> For each beat, decide what appears and what moves.</li>
            <li><strong className={"font-semibold \x74ext-[\x76ar(\x2d-text)]"}>Animate it.</strong> This is where most people get stuck. Options range from editing apps with templates to animation tools, or having AI write the animation for you.</li>
            <li><strong className={"font-semibold \x74ext-[\x76ar(\x2d-text)]"}>Add audio if you want.</strong> Music, a voiceover or sound effects. Optional, because the captions already tell the story.</li>
            <li><strong className={"font-semibold \x74ext-[\x76ar(\x2d-text)]"}>Watch it on your phone</strong> before posting. Every caption readable? Does the first second make you want the second?</li>
          </ol>
          <h2 className="[scroll-margin-top:90px]" id="using-ai-to-animate-them">Using AI to animate them</h2>
          <p>Here's the approach I use: Claude doesn't edit video, but <strong className={"font-semibold \x74ext-[\x76ar(\x2d-text)]"}>Claude Code can write the code that draws every frame</strong> and render it into an MP4 on your computer. You give it the beats and the style, it builds the scene, you check a few still frames, and it renders. I wrote up the full process in <a className={"font-medium \x74ext-[\x76ar(\x2d-text)] underline \x64ecoration-black/\x325 \x75nderline-offset-[\x33px] transition-colors \x68over:\x64ecoration-black/\x370"} href="/guides/animated-explainer-videos-with-claude">how to create animated explainer videos with Claude</a>.</p>
          <p>The big advantage of doing it this way is consistency. Once a style works, you can keep it, so every new video only needs a new idea, and your feed looks like one channel instead of a mix of templates.</p>
          <h2 className="[scroll-margin-top:90px]" id="mistakes-that-kill-faceless-videos">Mistakes that kill faceless videos</h2>
          <ul>
            <li><strong className={"font-semibold \x74ext-[\x76ar(\x2d-text)]"}>Stock footage with a voiceover.</strong> It's the most common faceless format, and the most skipped.</li>
            <li><strong className={"font-semibold \x74ext-[\x76ar(\x2d-text)]"}>Too much text per caption.</strong> If people have to pause to read it, they won't.</li>
            <li><strong className={"font-semibold \x74ext-[\x76ar(\x2d-text)]"}>Several ideas in one video.</strong> Split them into a series instead.</li>
            <li><strong className={"font-semibold \x74ext-[\x76ar(\x2d-text)]"}>No payoff.</strong> The last beat should answer the hook, clearly.</li>
            <li><strong className={"font-semibold \x74ext-[\x76ar(\x2d-text)]"}>Fake claims.</strong> Exaggerated numbers get comments correcting you, not shares. Only say what you can back up.</li>
          </ul>
          <h2 className="[scroll-margin-top:90px]" id="where-to-start">Where to start</h2>
          <p>Pick one idea from your notes, write five beats, and make the simplest version you can. Then make the next one a little better. Consistency beats production value, especially at the start.</p>
        </div>
      </div>
      <aside className="os-dark relative mt-16 overflow-hidden !rounded-[var(--r-shell)] p-7 sm:p-10" aria-label="Video styles for Claude">
        <div className={"pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full \x62g-[#\x66f5206] opacity-25 \x62lur-[\x390px]"} aria-hidden="true" />
        <p className={"relative text-[11.5px] font-semibold uppercase tracking-[0.1em] \x74ext-[#\x665d98a]"}>Video styles for Claude</p>
        <p className={"relative mt-3 \x66ont-[\x66amily-name:\x76ar(\x2d-font-heading)] text-[28px] font-medium leading-[1.1] tracking-[-0.02em] text-white \x73m:\x74ext-[\x334px]"}>Make explainer videos like mine.<br /><span className={"\x74ext-white/\x350"}>With Claude.</span></p>
        <p className={"relative mt-3 max-w-md text-[14.5px] leading-relaxed \x74ext-white/\x365"}>Get the exact styles I use: references, render scripts and step-by-step instructions, packaged as Claude skills. Bring a topic, Claude makes the video.</p>
        <div className={"relative mt-7 flex flex-col gap-2.5 \x73m:\x66lex-row \x73m:\x69tems-center"}>
          <a className={"flex h-12 items-center justify-center gap-2 rounded-full bg-white px-6 text-[14.5px] font-semibold text-black transition-transform \x61ctive:\x73cale-[\x30.\x398]"} href="/videos">Explore the video styles{" "}<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg></a>
          <a className={"flex h-12 items-center justify-center rounded-full px-5 text-[14px] font-medium \x74ext-white/\x380 \x72ing-1 \x72ing-white/\x320 transition-colors \x68over:\x62g-white/\x310"} href="/videos/rays">Get Rays free</a>
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
        <a className={"os-shell block p-5 transition-transform \x68over:\x2dtranslate-y-0.\x35"} href="/guides/video-hook-examples">
          <p className={"text-[11.5px] font-medium \x74ext-[#\x66f5206]"}>Animations &amp; Videos</p>
          <p className={"mt-1.5 \x66ont-[\x66amily-name:\x76ar(\x2d-font-heading)] text-[17px] font-medium leading-snug \x74ext-[\x76ar(\x2d-text)]"}>15 Hook Examples for Short Explainer Videos (Reels and TikTok)</p>
          <p className={"mt-1.5 \x6cine-clamp-2 text-[13px] \x74ext-[\x76ar(\x2d-text-secondary)]"}>The first second decides whether anyone sees the rest. Here are fifteen hook formulas for explainer videos, with examples you can adapt, and the openings to avoid.</p>
        </a>
        <a className={"os-shell block p-5 transition-transform \x68over:\x2dtranslate-y-0.\x35"} href="/guides/best-fonts-for-video-captions">
          <p className={"text-[11.5px] font-medium \x74ext-[#\x66f5206]"}>Animations &amp; Videos</p>
          <p className={"mt-1.5 \x66ont-[\x66amily-name:\x76ar(\x2d-font-heading)] text-[17px] font-medium leading-snug \x74ext-[\x76ar(\x2d-text)]"}>Best Fonts for Video Captions on Reels and TikTok</p>
          <p className={"mt-1.5 \x6cine-clamp-2 text-[13px] \x74ext-[\x76ar(\x2d-text-secondary)]"}>Captions carry a short video when the sound is off. Here's how to pick fonts that read instantly on a phone, and the free pairings I use in my own explainers.</p>
        </a>
        <a className={"os-shell block p-5 transition-transform \x68over:\x2dtranslate-y-0.\x35"} href="/guides/animated-explainer-videos-with-claude">
          <p className={"text-[11.5px] font-medium \x74ext-[#\x66f5206]"}>Animations &amp; Videos</p>
          <p className={"mt-1.5 \x66ont-[\x66amily-name:\x76ar(\x2d-font-heading)] text-[17px] font-medium leading-snug \x74ext-[\x76ar(\x2d-text)]"}>How to Create Animated Explainer Videos With Claude</p>
          <p className={"mt-1.5 \x6cine-clamp-2 text-[13px] \x74ext-[\x76ar(\x2d-text-secondary)]"}>Claude doesn't press record. It writes the code that draws every frame, then renders it into an MP4 on your computer. Here's the full workflow, from one idea to a finished short.</p>
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
