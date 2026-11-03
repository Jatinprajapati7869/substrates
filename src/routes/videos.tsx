import { useSupplyShell } from "@/lib/use-supply-shell";
import type { CSSProperties } from "react";
import { useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import capturedCSS from "../styles/pages/videos.css?raw";

export const Route = createFileRoute("/videos")({
  head: () => ({ meta: [
    { title: "Make explainer videos with Claude — Substrates video skills" },
    { name: "description", content: "Explore Substrates video skills and explainer video examples." },
    { property: "og:title", content: "Make explainer videos with Claude — Substrates video skills" },
    { property: "og:description", content: "Explore Substrates video skills and explainer video examples." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  staticData: { importedDocument: { html: { "className": "inter_c15e96cb-module__0bjUvq__variable", "lang": "en" }, body: { "className": "\x6din-h-screen \x62g-[\x76ar(\x2d-surface)] \x61ntialiased" } } },
  component: Index,
});

function Index() {
  useSupplyShell();
  useImportedLayout();
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
            <div className="pb-28 pt-[60px] lg:pt-0">
              <div className={"fixed \x69nset-x-0 top-[68px] z-30 px-3 transition-[opacity,translate] duration-300 \x73m:\x73tatic \x73m:!\x74ranslate-y-0 sm:px-6 sm:pt-3 sm:!opacity-100 \x73m:!\x70ointer-events-auto lg:pt-5 pointer-events-none \x2dtranslate-y-3 opacity-0"}>
                <a className={"vid-banner group mx-auto flex max-w-3xl items-center gap-3 rounded-full py-1.5 pl-4 pr-1.5 sm:pl-1.5 text-[13px] \x74ext-[#\x35c4417] transition-transform \x68over:\x2dtranslate-y-px sm:gap-4"} href="/pricing/videos">
                  <span className={"hidden h-8 shrink-0 items-center rounded-full \x62g-[#\x31f1608] \x73m:\x66lex px-3 text-[11px] font-bold uppercase tracking-[0.08em] \x74ext-[#\x665d98a]"}>✦ Premium</span>
                  <span className="min-w-0 flex-1 truncate">
                    <strong className={"font-semibold \x74ext-[\x76ar(\x2d-text)] \x73m:\x74ext-[#\x33b2a08]"}>All premium skills for $9.99/mo</strong>
                    <span className={"hidden \x73m:\x69nline"}> · Cancel anytime</span>
                  </span>
                  <span className={"vid-banner-cta flex h-8 shrink-0 items-center gap-1 rounded-full bg-white px-3.5 text-[12px] font-semibold \x74ext-[#\x31f1608] \x73hadow-[\x30_1px_2px_rgba(\x360,\x340,\x30,\x30.\x315)]"}>See plans <svg className={"transition-transform \x67roup-hover:\x74ranslate-x-0.\x35"} width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg></span>
                </a>
              </div>
              <div className="pt-5 sm:pt-8 lg:pt-12" />
              <ImportedSectionMakeExplainerVideosLike />
              <div className="relative mx-auto mt-6 h-[360px] max-w-5xl [overflow-x:clip] sm:h-[500px]">
                <div className="vid-hero-card absolute left-1/2 top-[8%] w-[36%] sm:w-[19%]" style={{ transform: "translateX(-50%) translateX(-184%) translateY(18%) rotate(-12deg)", zIndex: "8", animationDelay: "0s" } as CSSProperties} aria-hidden="true">
                  <div className={"relative aspect-[9/16] overflow-hidden rounded-[18px] bg-black \x73hadow-[\x30_0_0_1px_rgba(\x30,\x30,\x30,\x30.\x303),\x30_30px_60px_-24px_rgba(\x30,\x30,\x30,\x30.\x345)]"}>
                    <video className="h-full w-full object-cover" src="/site-assets/98d9947330bee3f6.mp4" muted loop playsInline preload="auto" />
                  </div>
                </div>
                <div className="vid-hero-card absolute left-1/2 top-[8%] w-[36%] sm:w-[19%]" style={{ transform: "translateX(-50%) translateX(-92%) translateY(9%) rotate(-6deg)", zIndex: "9", animationDelay: "0.6s" } as CSSProperties} aria-hidden="true">
                  <div className={"relative aspect-[9/16] overflow-hidden rounded-[18px] bg-black \x73hadow-[\x30_0_0_1px_rgba(\x30,\x30,\x30,\x30.\x303),\x30_30px_60px_-24px_rgba(\x30,\x30,\x30,\x30.\x345)]"}>
                    <video className="h-full w-full object-cover" src="/site-assets/0fa7a2f3e366dece.mp4" muted loop playsInline preload="auto" />
                  </div>
                </div>
                <div className="vid-hero-card absolute left-1/2 top-[8%] w-[36%] sm:w-[19%]" style={{ transform: "translateX(-50%) translateX(0%) translateY(0%) rotate(0deg)", zIndex: "10", animationDelay: "1.2s" } as CSSProperties} aria-hidden="false">
                  <div className={"relative aspect-[9/16] overflow-hidden rounded-[18px] bg-black \x73hadow-[\x30_0_0_1px_rgba(\x30,\x30,\x30,\x30.\x303),\x30_30px_60px_-24px_rgba(\x30,\x30,\x30,\x30.\x345)]"}>
                    <video className="h-full w-full object-cover" src="/site-assets/eb1bf923e75e1b03.mp4" muted loop playsInline preload="auto" />
                  </div>
                  <div className={"absolute bottom-3 left-1/2 z-20 \x2dtranslate-x-1/\x32"}>
                    <button className={"flex items-center gap-1.5 whitespace-nowrap rounded-full \x62g-black/\x370 px-3 py-1.5 text-[12px] font-semibold text-white \x73hadow-[\x30_8px_20px_-8px_rgba(\x30,\x30,\x30,\x30.\x36)] \x72ing-1 \x72ing-white/\x315 \x62ackdrop-blur-md transition-transform \x68over:\x73cale-[\x31.\x304]"} type="button" aria-expanded="false" aria-label="662,771 views on Instagram. Show proof"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M1.5 12S5.5 4.5 12 4.5 22.5 12 22.5 12 18.5 19.5 12 19.5 1.5 12 1.5 12z" /><circle cx="12" cy="12" r="3.4" /></svg><span className="tabular-nums">662,771</span> views</button>
                  </div>
                </div>
                <div className="vid-hero-card absolute left-1/2 top-[8%] w-[36%] sm:w-[19%]" style={{ transform: "translateX(-50%) translateX(92%) translateY(9%) rotate(6deg)", zIndex: "9", animationDelay: "1.8s" } as CSSProperties} aria-hidden="true">
                  <div className={"relative aspect-[9/16] overflow-hidden rounded-[18px] bg-black \x73hadow-[\x30_0_0_1px_rgba(\x30,\x30,\x30,\x30.\x303),\x30_30px_60px_-24px_rgba(\x30,\x30,\x30,\x30.\x345)]"}>
                    <video className="h-full w-full object-cover" src="/site-assets/200f16a8dd5a8877.mp4" muted loop playsInline preload="auto" />
                  </div>
                </div>
                <div className="vid-hero-card absolute left-1/2 top-[8%] w-[36%] sm:w-[19%]" style={{ transform: "translateX(-50%) translateX(184%) translateY(18%) rotate(12deg)", zIndex: "8", animationDelay: "2.4s" } as CSSProperties} aria-hidden="true">
                  <div className={"relative aspect-[9/16] overflow-hidden rounded-[18px] bg-black \x73hadow-[\x30_0_0_1px_rgba(\x30,\x30,\x30,\x30.\x303),\x30_30px_60px_-24px_rgba(\x30,\x30,\x30,\x30.\x345)]"}>
                    <video className="h-full w-full object-cover" src="/site-assets/4d82b15ad5c33738.mp4" muted loop playsInline preload="auto" />
                  </div>
                </div>
              </div>
              <ImportedSectionVideoStylesToMake />
              <ImportedSectionYouBringTheCuriosity />
              <section className="mx-auto mt-20 max-w-3xl px-4 sm:px-6">
                <div className={"os-dark flex flex-col items-start gap-5 overflow-hidden !rounded-[var(--r-shell)] p-7 \x73m:\x66lex-row \x73m:\x69tems-center \x73m:\x6austify-between sm:p-9"}>
                  <div>
                    <p className={"\x66ont-[\x66amily-name:\x76ar(\x2d-font-heading)] text-[26px] font-medium leading-tight tracking-tight text-white \x73m:\x74ext-[\x330px]"}>Every premium skill.<br /><span className={"\x74ext-white/\x350"}>$9.99/month or $79.99/year.</span></p>
                    <p className={"mt-2 text-[13px] \x74ext-white/\x355"}>New skills included. Cancel whenever you want.</p>
                  </div>
                  <a className="flex h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-white px-6 text-[14px] font-semibold text-black" href="/pricing/videos">See plans <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg></a>
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
            <a className={"group mx-2 flex items-center gap-2.5 rounded-[12px] px-2.5 py-[7px] text-[13px] transition-[background-color,color,box-shadow] duration-150 \x62g-gradient-to-b \x66rom-white \x74o-[#\x667f7f6] font-medium \x74ext-[\x76ar(\x2d-text)] \x73hadow-[\x76ar(\x2d-shadow-raised)]"} aria-current="page" href="#">
              <span className={"flex h-[18px] w-[18px] shrink-0 items-center justify-center \x74ext-[\x76ar(\x2d-text)]"} aria-hidden="true">
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
              <a className={"os-button relative inline-flex select-none items-center justify-center gap-2 rounded-full font-medium transition-[transform,box-shadow,filter,background-color] duration-150 ease-out \x64isabled:\x63ursor-not-allowed disabled:opacity-45 h-9 px-4 text-[12px] os-spark text-white w-full"} style={{ backgroundImage: "linear-gradient(rgb(46, 46, 46) 0%, rgb(26, 26, 26) 50%, rgb(14, 14, 14) 100%)", boxShadow: "rgba(255, 255, 255, 0.14) 0px 1px 0px inset, rgba(0, 0, 0, 0.5) 0px -1px 0px inset, rgba(0, 0, 0, 0.22) 0px 1px 2px, rgba(0, 0, 0, 0.5) 0px 10px 22px -10px, rgba(255, 82, 6, 0.55) 0px 8px 18px -12px" } as CSSProperties} href="/pricing/videos">View pricing</a>
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

function ImportedSectionMakeExplainerVideosLike() {
  return (
    <section className="mx-auto max-w-5xl px-4 text-center sm:px-6">
      <p className={"vid-gold-chip inline-flex items-center gap-2.5 rounded-full py-1.5 pl-3 pr-3 text-[13.5px] \x74ext-[#\x37a5a1c] \x73m:\x74ext-[\x314px]"}>
        <svg width="16" height="26" viewBox="0 0 14 22" aria-hidden="true">
          <defs>
            <linearGradient id="sprig-gold-l" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#f7d983" />
              <stop offset="1" stopColor="#b8842a" />
            </linearGradient>
          </defs>
          <path d="M11 21C5 17 3 11 5 2" stroke="url(#sprig-gold-l)" strokeWidth="1.3" fill="none" strokeLinecap="round" />
          <ellipse cx="3.5" cy="5" rx="1.7" ry="3.4" transform="rotate(-35 3.5 5)" fill="url(#sprig-gold-l)" />
          <ellipse cx="3" cy="10" rx="1.7" ry="3.4" transform="rotate(-35 3 10)" fill="url(#sprig-gold-l)" />
          <ellipse cx="4.5" cy="15" rx="1.7" ry="3.4" transform="rotate(-35 4.5 15)" fill="url(#sprig-gold-l)" />
        </svg>
        <span><span className={"vid-gold-text text-[15px] font-bold tabular-nums \x73m:\x74ext-[\x316px]"}>2.6M+ views</span>{" "}on my last 10 videos</span>
        <svg className={"\x2dscale-x-100"} width="16" height="26" viewBox="0 0 14 22" aria-hidden="true">
          <defs>
            <linearGradient id="sprig-gold-r" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#f7d983" />
              <stop offset="1" stopColor="#b8842a" />
            </linearGradient>
          </defs>
          <path d="M11 21C5 17 3 11 5 2" stroke="url(#sprig-gold-r)" strokeWidth="1.3" fill="none" strokeLinecap="round" />
          <ellipse cx="3.5" cy="5" rx="1.7" ry="3.4" transform="rotate(-35 3.5 5)" fill="url(#sprig-gold-r)" />
          <ellipse cx="3" cy="10" rx="1.7" ry="3.4" transform="rotate(-35 3 10)" fill="url(#sprig-gold-r)" />
          <ellipse cx="4.5" cy="15" rx="1.7" ry="3.4" transform="rotate(-35 4.5 15)" fill="url(#sprig-gold-r)" />
        </svg>
      </p>
      <h1 className={"mx-auto mt-4 sm:mt-6 \x66ont-[\x66amily-name:\x76ar(\x2d-font-heading)] text-[40px] font-medium leading-[1.12] tracking-[-0.035em] \x74ext-[\x76ar(\x2d-text)] \x73m:\x74ext-[\x63lamp(\x328px,\x33.\x39vw,\x358px)]"}>
        <span className={"\x73m:\x77hitespace-nowrap"}>Make explainer <span className="vid-flip inline-block"><span className={"vid-key vid-key-tt relative mx-[0.04em] inline-flex h-[0.86em] w-[1.06em] \x72otate-[\x37deg] items-center justify-center rounded-[0.24em] \x61lign-[\x30.\x304em]"} aria-hidden="true"><svg className="h-[0.52em] w-auto" viewBox="0 0 24 24"><path d="M14.5 3h-3v11.6a2.6 2.6 0 1 1-2.6-2.6c.27 0 .53.04.78.12V9a5.6 5.6 0 1 0 4.82 5.55V8.4a7.1 7.1 0 0 0 4 1.24V6.6a4 4 0 0 1-4-3.6z" fill="#25f4ee" transform="translate(-1 -1)" /><path d="M14.5 3h-3v11.6a2.6 2.6 0 1 1-2.6-2.6c.27 0 .53.04.78.12V9a5.6 5.6 0 1 0 4.82 5.55V8.4a7.1 7.1 0 0 0 4 1.24V6.6a4 4 0 0 1-4-3.6z" fill="#fe2c55" transform="translate(1 1)" /><path d="M14.5 3h-3v11.6a2.6 2.6 0 1 1-2.6-2.6c.27 0 .53.04.78.12V9a5.6 5.6 0 1 0 4.82 5.55V8.4a7.1 7.1 0 0 0 4 1.24V6.6a4 4 0 0 1-4-3.6z" fill="#fff" /></svg></span></span>{" "}<span className={"\x74ext-[\x76ar(\x2d-text-tertiary)]"}>videos like mine.</span></span>
        <br />
        <span className="whitespace-nowrap">
          <span className="vid-gradient-text">With Claude.</span>
          <span className={"vid-key relative -top-[0.06em] ml-[0.2em] inline-flex h-[0.86em] w-[1.06em] \x72otate-[\x37deg] items-center justify-center rounded-[0.24em] \x61lign-[\x30.\x304em]"} aria-hidden="true">
            <img className="h-[0.5em] w-auto" src="/site-assets/4df6f08245fb1868-8367d659f39ac02c11aa599e4ef1812b.png" alt="" />
          </span>
        </span>
      </h1>
      <p className={"mx-auto mt-3 max-w-lg text-[14px] leading-relaxed \x74ext-[\x76ar(\x2d-text-secondary)] sm:mt-5 \x73m:\x74ext-[\x316px]"}>
        <span className={"\x73m:\x68idden"}>My video styles and step-by-step instructions. Pick a style, bring your topic.</span>
        <span className={"hidden \x73m:\x69nline"}>Get my video styles, references, and step-by-step instructions. Pick a style, bring your topic, and follow the walkthrough.</span>
      </p>
      <div className={"mt-6 flex flex-col items-stretch justify-center gap-3 sm:mt-8 \x73m:\x66lex-row \x73m:\x69tems-center"}>
        <a className={"os-button relative inline-flex select-none items-center justify-center gap-2 rounded-full font-medium transition-[transform,box-shadow,filter,background-color] duration-150 ease-out \x64isabled:\x63ursor-not-allowed disabled:opacity-45 h-12 px-6 text-[14px] os-spark text-white w-full sm:w-auto"} style={{ backgroundImage: "linear-gradient(rgb(46, 46, 46) 0%, rgb(26, 26, 26) 50%, rgb(14, 14, 14) 100%)", boxShadow: "rgba(255, 255, 255, 0.14) 0px 1px 0px inset, rgba(0, 0, 0, 0.5) 0px -1px 0px inset, rgba(0, 0, 0, 0.22) 0px 1px 2px, rgba(0, 0, 0, 0.5) 0px 10px 22px -10px, rgba(255, 82, 6, 0.55) 0px 8px 18px -12px" } as CSSProperties} href="/pricing/videos">Unlock all styles · $9.99/mo</a>
        <a className={"vid-free-cta group inline-flex h-12 w-full items-center justify-center gap-2.5 rounded-full bg-white pl-2 pr-5 text-[14px] font-semibold \x74ext-[\x76ar(\x2d-text)] sm:w-auto"} href="/videos/rays"><span className={"rounded-full \x62g-[#\x31f9d55] px-2.5 py-1 text-[10.5px] font-bold uppercase tracking-wide text-white"}>Free</span>Try Rays free<svg className={"transition-transform \x67roup-hover:\x74ranslate-x-0.\x35"} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg></a>
      </div>
      <p className={"mx-auto mt-4 max-w-md text-[11.5px] leading-relaxed \x74ext-[\x76ar(\x2d-text-tertiary)]"}>Views are from my own 10 videos (1.6M+ on Instagram, ~1M on TikTok). Your results will depend on your topics and audience.</p>
    </section>
  );
}

function ImportedSectionVideoStylesToMake() {
  return (
    <section className={"mx-auto mt-20 max-w-6xl \x73croll-mt-24 px-4 sm:px-6"} id="styles">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <h2 className={"\x66ont-[\x66amily-name:\x76ar(\x2d-font-heading)] text-[26px] font-medium tracking-tight \x73m:\x74ext-[\x332px]"}><span className={"\x74ext-[\x76ar(\x2d-text)]"}>Video styles</span> <span className={"\x74ext-[\x76ar(\x2d-text-tertiary)]"}>to make your own</span></h2>
        <div className="os-seg" role="radiogroup" aria-label="Filter styles">
          <button className="os-seg-item px-3.5 text-[12px] capitalize" type="button" role="radio" aria-checked="true" data-active="true">all{" "}<span className="ml-1 opacity-60">4</span></button>
          <button className="os-seg-item px-3.5 text-[12px] capitalize" type="button" role="radio" aria-checked="false">free{" "}<span className="ml-1 opacity-60">1</span></button>
          <button className="os-seg-item px-3.5 text-[12px] capitalize" type="button" role="radio" aria-checked="false">premium{" "}<span className="ml-1 opacity-60">3</span></button>
        </div>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-3 lg:grid-cols-4">
        <a className={"group os-shell block p-1.5 transition-transform duration-200 \x68over:\x2dtranslate-y-0.\x35 \x72ing-2 \x72ing-[#\x66f5206]/\x340"} href="/videos/small-details">
          <div className="relative">
            <div className="relative aspect-[9/16] overflow-hidden rounded-[18px] bg-black">
              <video className="h-full w-full object-cover" src="/site-assets/eb1bf923e75e1b03.mp4" muted loop playsInline preload="auto" />
            </div>
            <span className={"absolute right-2 top-2 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide \x62g-[#\x3111]/\x385 \x74ext-[#\x665d98a]"}><svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="4" y="10" width="16" height="10" rx="1" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /></svg> Premium</span>
            <span className={"absolute left-2 top-2 rounded-full \x62g-[#\x66f5206] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white"}>My style</span>
          </div>
          <div className="px-1.5 pb-1.5 pt-2.5">
            <p className={"text-[14px] font-medium \x74ext-[\x76ar(\x2d-text)]"}>Small details. Big difference.</p>
            <p className={"mt-0.5 \x6cine-clamp-2 text-[12.5px] leading-snug \x74ext-[\x76ar(\x2d-text-secondary)]"}>Apple-clean 3D explainers for tiny clever details</p>
            <span className={"mt-3 flex h-10 items-center justify-center gap-1.5 rounded-full text-[13px] font-semibold transition-colors bg-white \x74ext-[\x76ar(\x2d-text)] \x73hadow-[\x30_0_0_1px_rgba(\x30,\x30,\x30,\x30.\x31)] \x67roup-hover:\x62g-[#\x667f7f6]"}>See details{" "}<svg className={"transition-transform \x67roup-hover:\x74ranslate-x-0.\x35"} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg></span>
          </div>
        </a>
        <a className={"group os-shell block p-1.5 transition-transform duration-200 \x68over:\x2dtranslate-y-0.\x35"} href="/videos/rays">
          <div className="relative">
            <div className="relative aspect-[9/16] overflow-hidden rounded-[18px] bg-black">
              <video className="h-full w-full object-cover" src="/site-assets/98d9947330bee3f6.mp4" muted loop playsInline preload="auto" />
            </div>
            <span className={"absolute right-2 top-2 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide \x62g-[#\x657f5e1] \x74ext-[#\x31f5a33]"}>Free</span>
          </div>
          <div className="px-1.5 pb-1.5 pt-2.5">
            <p className={"text-[14px] font-medium \x74ext-[\x76ar(\x2d-text)]"}>Rays</p>
            <p className={"mt-0.5 \x6cine-clamp-2 text-[12.5px] leading-snug \x74ext-[\x76ar(\x2d-text-secondary)]"}>Light rays in the dark that make an idea glow.</p>
            <span className={"mt-3 flex h-10 items-center justify-center gap-1.5 rounded-full text-[13px] font-semibold transition-colors \x62g-[#\x3111] text-white \x67roup-hover:\x62g-black"}>Try it free{" "}<svg className={"transition-transform \x67roup-hover:\x74ranslate-x-0.\x35"} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg></span>
          </div>
        </a>
        <a className={"group os-shell block p-1.5 transition-transform duration-200 \x68over:\x2dtranslate-y-0.\x35"} href="/videos/organic">
          <div className="relative">
            <div className="relative aspect-[9/16] overflow-hidden rounded-[18px] bg-black">
              <video className="h-full w-full object-cover" src="/site-assets/0fa7a2f3e366dece.mp4" muted loop playsInline preload="auto" />
            </div>
            <span className={"absolute right-2 top-2 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide \x62g-[#\x3111]/\x385 \x74ext-[#\x665d98a]"}><svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="4" y="10" width="16" height="10" rx="1" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /></svg> Premium</span>
          </div>
          <div className="px-1.5 pb-1.5 pt-2.5">
            <p className={"text-[14px] font-medium \x74ext-[\x76ar(\x2d-text)]"}>Organic</p>
            <p className={"mt-0.5 \x6cine-clamp-2 text-[12.5px] leading-snug \x74ext-[\x76ar(\x2d-text-secondary)]"}>Soft, breathing colour auras that explain things calmly.</p>
            <span className={"mt-3 flex h-10 items-center justify-center gap-1.5 rounded-full text-[13px] font-semibold transition-colors bg-white \x74ext-[\x76ar(\x2d-text)] \x73hadow-[\x30_0_0_1px_rgba(\x30,\x30,\x30,\x30.\x31)] \x67roup-hover:\x62g-[#\x667f7f6]"}>See details{" "}<svg className={"transition-transform \x67roup-hover:\x74ranslate-x-0.\x35"} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg></span>
          </div>
        </a>
        <a className={"group os-shell block p-1.5 transition-transform duration-200 \x68over:\x2dtranslate-y-0.\x35"} href="/videos/kiln">
          <div className="relative">
            <div className="relative aspect-[9/16] overflow-hidden rounded-[18px] bg-black">
              <video className="h-full w-full object-cover" src="/site-assets/4d82b15ad5c33738.mp4" muted loop playsInline preload="auto" />
            </div>
            <span className={"absolute right-2 top-2 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide \x62g-[#\x3111]/\x385 \x74ext-[#\x665d98a]"}><svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="4" y="10" width="16" height="10" rx="1" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /></svg> Premium</span>
          </div>
          <div className="px-1.5 pb-1.5 pt-2.5">
            <p className={"text-[14px] font-medium \x74ext-[\x76ar(\x2d-text)]"}>Kiln</p>
            <p className={"mt-0.5 \x6cine-clamp-2 text-[12.5px] leading-snug \x74ext-[\x76ar(\x2d-text-secondary)]"}>Drafting-table explainers that land with a bang.</p>
            <span className={"mt-3 flex h-10 items-center justify-center gap-1.5 rounded-full text-[13px] font-semibold transition-colors bg-white \x74ext-[\x76ar(\x2d-text)] \x73hadow-[\x30_0_0_1px_rgba(\x30,\x30,\x30,\x30.\x31)] \x67roup-hover:\x62g-[#\x667f7f6]"}>See details{" "}<svg className={"transition-transform \x67roup-hover:\x74ranslate-x-0.\x35"} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg></span>
          </div>
        </a>
      </div>
    </section>
  );
}

function ImportedSectionYouBringTheCuriosity() {
  return (
    <section className="mx-auto mt-24 max-w-6xl px-4 sm:px-6">
      <div className={"\x62order-t \x62order-[\x76ar(\x2d-line)] pt-10 \x6cg:\x67rid lg:grid-cols-[200px_1fr] lg:gap-10"}>
        <p className={"text-[13px] font-medium \x74ext-[#\x36b5a2e]"}>How it works</p>
        <h2 className={"mt-2 \x66ont-[\x66amily-name:\x76ar(\x2d-font-heading)] text-[30px] font-medium leading-[1.1] tracking-tight \x74ext-[\x76ar(\x2d-text)] \x73m:\x74ext-[\x340px] lg:mt-0"}>You bring the curiosity.<br /><span className={"\x74ext-[\x76ar(\x2d-text-tertiary)]"}>Claude builds the scenes.</span></h2>
      </div>
      <div className="mt-10 grid gap-8 sm:grid-cols-3 sm:gap-4">
        <div>
          <div className="relative flex aspect-[4/5] items-center justify-center overflow-hidden rounded-[22px]" style={{ background: "radial-gradient(90% 70% at 30% 20%, rgb(255, 217, 194) 0%, transparent 60%), radial-gradient(80% 80% at 80% 90%, rgb(201, 184, 255) 0%, transparent 60%), rgb(239, 236, 230)" }}>
            <div className={"absolute inset-0 \x62ackdrop-blur-2xl"} aria-hidden="true" />
            <span className={"absolute left-3 top-3 z-10 flex h-6 w-6 items-center justify-center rounded-full \x62g-white/\x370 text-[11px] font-semibold \x74ext-[\x76ar(\x2d-text)] \x62ackdrop-blur"}>1</span>
            <div className="relative z-10 w-[78%]">
              <div className={"rounded-[14px] \x62g-white/\x390 p-3 \x73hadow-[\x30_0_0_1px_rgba(\x30,\x30,\x30,\x30.\x305),\x30_18px_40px_-18px_rgba(\x30,\x30,\x30,\x30.\x335)] \x62ackdrop-blur"}>
                <p className={"text-[10px] font-medium \x74ext-[\x76ar(\x2d-text-tertiary)]"}>Choose a style</p>
                <div className="mt-2 grid grid-cols-3 gap-1.5">
                  <div className={"overflow-hidden rounded-[8px] transition-all duration-300 \x73cale-[\x31.\x304] \x72ing-2 \x72ing-[#\x66f5206]"}>
                    <div className="relative aspect-[9/16] overflow-hidden rounded-[18px] bg-black !rounded-[8px]">
                      <video className="h-full w-full object-cover" src="/site-assets/eb1bf923e75e1b03.mp4" muted loop playsInline preload="auto" />
                    </div>
                  </div>
                  <div className="overflow-hidden rounded-[8px] transition-all duration-300 opacity-60">
                    <div className="relative aspect-[9/16] overflow-hidden rounded-[18px] bg-black !rounded-[8px]">
                      <video className="h-full w-full object-cover" src="/site-assets/98d9947330bee3f6.mp4" muted loop playsInline preload="auto" />
                    </div>
                  </div>
                  <div className="overflow-hidden rounded-[8px] transition-all duration-300 opacity-60">
                    <div className="relative aspect-[9/16] overflow-hidden rounded-[18px] bg-black !rounded-[8px]">
                      <video className="h-full w-full object-cover" src="/site-assets/0fa7a2f3e366dece.mp4" muted loop playsInline preload="auto" />
                    </div>
                  </div>
                </div>
                <p className={"mt-2 truncate text-[11px] font-medium \x74ext-[\x76ar(\x2d-text)]"}>Small details. Big difference.</p>
              </div>
            </div>
          </div>
          <p className={"mt-4 text-[15px] font-medium \x74ext-[\x76ar(\x2d-text)]"}>Pick a style</p>
          <p className={"mt-1 text-[13px] leading-relaxed \x74ext-[\x76ar(\x2d-text-secondary)]"}>Each one comes with everything Claude needs to make it.</p>
        </div>
        <div>
          <div className="relative flex aspect-[4/5] items-center justify-center overflow-hidden rounded-[22px]" style={{ background: "radial-gradient(90% 70% at 25% 20%, rgb(215, 231, 196) 0%, transparent 60%), radial-gradient(80% 80% at 80% 85%, rgb(126, 154, 90) 0%, transparent 60%), rgb(228, 232, 220)" }}>
            <div className={"absolute inset-0 \x62ackdrop-blur-2xl"} aria-hidden="true" />
            <span className={"absolute left-3 top-3 z-10 flex h-6 w-6 items-center justify-center rounded-full \x62g-white/\x370 text-[11px] font-semibold \x74ext-[\x76ar(\x2d-text)] \x62ackdrop-blur"}>2</span>
            <div className="relative z-10 w-[78%]">
              <div className={"\x73pace-y-2"}>
                <div className={"rounded-[14px] \x62g-white/\x390 p-3 \x73hadow-[\x30_0_0_1px_rgba(\x30,\x30,\x30,\x30.\x305),\x30_18px_40px_-18px_rgba(\x30,\x30,\x30,\x30.\x335)] \x62ackdrop-blur !py-2"}>
                  <p className={"text-[10px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>Your topic</p>
                  <p className={"text-[12px] font-medium \x74ext-[\x76ar(\x2d-text)]"}>Why do cats purr?</p>
                </div>
                <div className={"rounded-[14px] \x62g-white/\x390 p-3 \x73hadow-[\x30_0_0_1px_rgba(\x30,\x30,\x30,\x30.\x305),\x30_18px_40px_-18px_rgba(\x30,\x30,\x30,\x30.\x335)] \x62ackdrop-blur"}>
                  <p className={"flex items-center gap-1.5 text-[10px] font-medium \x74ext-[\x76ar(\x2d-text-tertiary)]"}><span className={"h-1.5 w-1.5 rounded-full \x62g-[#\x37e9a5a]"} /> Storyboard</p>
                  <ol className={"mt-1.5 \x73pace-y-1"}>
                    <li className={"flex items-center gap-1.5 text-[10.5px] \x74ext-[\x76ar(\x2d-text-secondary)] transition-all duration-300 \x74ranslate-x-0 opacity-100"}><span className={"w-3 text-[9px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>1</span>Hook: the 0.3 second question</li>
                    <li className={"flex items-center gap-1.5 text-[10.5px] \x74ext-[\x76ar(\x2d-text-secondary)] transition-all duration-300 \x2dtranslate-x-1 opacity-0"}><span className={"w-3 text-[9px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>2</span>What vibration actually is</li>
                    <li className={"flex items-center gap-1.5 text-[10.5px] \x74ext-[\x76ar(\x2d-text-secondary)] transition-all duration-300 \x2dtranslate-x-1 opacity-0"}><span className={"w-3 text-[9px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>3</span>Why 25 Hz matters</li>
                    <li className={"flex items-center gap-1.5 text-[10.5px] \x74ext-[\x76ar(\x2d-text-secondary)] transition-all duration-300 \x2dtranslate-x-1 opacity-0"}><span className={"w-3 text-[9px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>4</span>The twist</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
          <p className={"mt-4 text-[15px] font-medium \x74ext-[\x76ar(\x2d-text)]"}>Give it a topic</p>
          <p className={"mt-1 text-[13px] leading-relaxed \x74ext-[\x76ar(\x2d-text-secondary)]"}>A question, a fact you love, a thing you just learned.</p>
        </div>
        <div>
          <div className="relative flex aspect-[4/5] items-center justify-center overflow-hidden rounded-[22px]" style={{ background: "radial-gradient(90% 70% at 70% 20%, rgb(255, 176, 138) 0%, transparent 60%), radial-gradient(80% 80% at 20% 90%, rgb(43, 34, 51) 0%, transparent 65%), rgb(233, 225, 219)" }}>
            <div className={"absolute inset-0 \x62ackdrop-blur-2xl"} aria-hidden="true" />
            <span className={"absolute left-3 top-3 z-10 flex h-6 w-6 items-center justify-center rounded-full \x62g-white/\x370 text-[11px] font-semibold \x74ext-[\x76ar(\x2d-text)] \x62ackdrop-blur"}>3</span>
            <div className="relative z-10 w-[78%]">
              <div className={"rounded-[14px] \x62g-white/\x390 p-3 \x73hadow-[\x30_0_0_1px_rgba(\x30,\x30,\x30,\x30.\x305),\x30_18px_40px_-18px_rgba(\x30,\x30,\x30,\x30.\x335)] \x62ackdrop-blur"}>
                <p className={"text-[10px] font-medium \x74ext-[\x76ar(\x2d-text-tertiary)]"}>Animating scenes</p>
                <div className="mt-2 flex gap-1">
                  <div className={"h-10 flex-1 rounded-[6px] transition-colors duration-300 \x62g-gradient-to-b \x66rom-[#\x66f8a4c] \x74o-[#\x650551b]"} />
                  <div className={"h-10 flex-1 rounded-[6px] transition-colors duration-300 \x62g-gradient-to-b \x66rom-[#\x66f8a4c] \x74o-[#\x650551b]"} />
                  <div className={"h-10 flex-1 rounded-[6px] transition-colors duration-300 \x62g-gradient-to-b \x66rom-[#\x66f8a4c] \x74o-[#\x650551b]"} />
                  <div className={"h-10 flex-1 rounded-[6px] transition-colors duration-300 \x62g-gradient-to-b \x66rom-[#\x66f8a4c] \x74o-[#\x650551b]"} />
                </div>
                <div className={"mt-2 h-1 overflow-hidden rounded-full \x62g-black/[\x30.\x306]"}>
                  <div className={"h-full rounded-full \x62g-[#\x3111] transition-[width] duration-500"} style={{ width: "100%" }} />
                </div>
                <p className={"mt-2 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold transition-colors \x62g-[#\x657f5e1] \x74ext-[#\x31f5a33]"}>✓ Ready · 9:16</p>
              </div>
            </div>
          </div>
          <p className={"mt-4 text-[15px] font-medium \x74ext-[\x76ar(\x2d-text)]"}>Watch it come to life</p>
          <p className={"mt-1 text-[13px] leading-relaxed \x74ext-[\x76ar(\x2d-text-secondary)]"}>Claude writes it, storyboards it and animates it.</p>
        </div>
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
          <a className={"relative flex h-12 flex-col items-center justify-center gap-0.5 rounded-full text-[10px] font-medium transition-[background,color] duration-150 \x62g-gradient-to-b \x66rom-white \x74o-[#\x663f3f2] \x74ext-[\x76ar(\x2d-text)] \x73hadow-[\x76ar(\x2d-shadow-raised)]"} aria-current="page" href="#"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 256 256" aria-hidden="true"><path d="M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40ZM184,56h32V72H184ZM72,200H40V184H72ZM72,72H40V56H72Zm48,128H88V184h32Zm0-128H88V56h32Zm48,128H136V184h32Zm0-128H136V56h32Zm48,128H184V184h32v16Z" /></svg>Videos</a>
        </li>
        <li className="min-w-0 flex-1">
          <a className={"relative flex h-12 flex-col items-center justify-center gap-0.5 rounded-full text-[10px] font-medium transition-[background,color] duration-150 \x74ext-[\x76ar(\x2d-text-tertiary)]"} href="/pricing/videos"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 256 256" aria-hidden="true"><path d="M243.31,136,144,36.69A15.86,15.86,0,0,0,132.69,32H40a8,8,0,0,0-8,8v92.69A15.86,15.86,0,0,0,36.69,144L136,243.31a16,16,0,0,0,22.63,0l84.68-84.68a16,16,0,0,0,0-22.63ZM84,96A12,12,0,1,1,96,84,12,12,0,0,1,84,96Z" /></svg>Pricing</a>
        </li>
      </ul>
    </nav>
  );
}


function useImportedLayout() {
  useEffect(() => {
    const loopingVideos = Array.from(
      document.querySelectorAll<HTMLVideoElement>("video[loop]:not([autoplay]):not([controls])"),
    )
      .filter((video) => video.muted && !video.closest("[data-site-import-carousel-store]"))
      .slice(0, 32);
    const videoObserver = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        const video = entry.target as HTMLVideoElement;
        if (entry.isIntersecting) void video.play().catch(() => {});
        else video.pause();
      }
    });
    loopingVideos.forEach((video) => videoObserver.observe(video));
    return () => {
      videoObserver.disconnect();
      loopingVideos.forEach((video) => video.pause());
    };
  }, []);
}
