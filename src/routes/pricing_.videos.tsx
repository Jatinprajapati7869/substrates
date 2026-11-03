import { Button } from "@/components/ui/button";
import { useSupplyShell } from "@/lib/use-supply-shell";
import type { CSSProperties } from "react";
import { useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import capturedCSS from "../styles/pages/pricing.videos.css?raw";

export const Route = createFileRoute("/pricing_/videos")({
  head: () => ({ meta: [
    { title: "Video Skills Pricing — Substrates" },
    { name: "description", content: "Explore monthly and yearly Substrates video skill memberships and preview every included style." },
    { property: "og:title", content: "Video Skills Pricing — Substrates" },
    { property: "og:description", content: "Explore monthly and yearly Substrates video skill memberships and preview every included style." },
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
            <div className="pb-28 pt-[72px] lg:pt-10">
              <nav className="flex justify-center" aria-label="Pricing">
                <div className="os-seg">
                  <a className="os-seg-item px-4 text-[13px]" href="/pricing">Website templates</a>
                  <a className="os-seg-item px-4 text-[13px]" aria-current="page" data-active="true" href="#">Video skills</a>
                </div>
              </nav>
              <header className="mx-auto mt-10 max-w-2xl px-4 text-center sm:px-6">
                <p className={"vid-gold-chip inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[13px] \x74ext-[#\x37a5a1c]"}>From the creator behind <span className="vid-gold-text font-bold">2.6M+ views</span></p>
                <h1 className={"mt-5 \x66ont-[\x66amily-name:\x76ar(\x2d-font-heading)] text-[34px] font-medium leading-[1.08] tracking-[-0.03em] \x73m:\x74ext-[\x348px]"}>
                  <span className={"\x74ext-[\x76ar(\x2d-text)]"}>Every video skill I use.</span>
                  <br />
                  <span className={"\x74ext-[\x76ar(\x2d-text-tertiary)]"}>Less than a coffee a month.</span>
                </h1>
                <p className={"mx-auto mt-4 max-w-md text-[14px] leading-relaxed \x74ext-[\x76ar(\x2d-text-secondary)] \x73m:\x74ext-[\x315px]"}>3 premium styles today, with new ones added to your plan as they’re released.</p>
              </header>
              <div className="mx-auto mt-10 grid max-w-3xl gap-2 px-4 sm:grid-cols-2 sm:px-6">
                <div className="os-shell flex flex-col p-6 sm:p-7">
                  <p className={"text-[15px] font-medium \x74ext-[\x76ar(\x2d-text)]"}>Monthly</p>
                  <p className="mt-4 flex items-baseline gap-1.5">
                    <span className={"\x66ont-[\x66amily-name:\x76ar(\x2d-font-heading)] text-[44px] font-medium leading-none tracking-tight"}>$9.99</span>
                    <span className={"text-[13px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>/ month</span>
                  </p>
                  <p className={"mt-2 text-[13px] \x74ext-[\x76ar(\x2d-text-secondary)]"}>Try it for a month. Leave whenever.</p>
                  <ul className={"mt-6 \x73pace-y-3"}>
                    <li className={"flex items-start gap-2.5 text-[13.5px] \x74ext-[\x76ar(\x2d-text-secondary)]"}><span className={"mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-white \x74ext-[\x76ar(\x2d-text)] \x73hadow-[\x30_0_0_1px_rgba(\x30,\x30,\x30,\x30.\x308)]"}><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5" /></svg></span>All 3 premium styles, plus the free ones</li>
                    <li className={"flex items-start gap-2.5 text-[13.5px] \x74ext-[\x76ar(\x2d-text-secondary)]"}><span className={"mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-white \x74ext-[\x76ar(\x2d-text)] \x73hadow-[\x30_0_0_1px_rgba(\x30,\x30,\x30,\x30.\x308)]"}><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5" /></svg></span>New premium skills included as they launch</li>
                    <li className={"flex items-start gap-2.5 text-[13.5px] \x74ext-[\x76ar(\x2d-text-secondary)]"}><span className={"mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-white \x74ext-[\x76ar(\x2d-text)] \x73hadow-[\x30_0_0_1px_rgba(\x30,\x30,\x30,\x30.\x308)]"}><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5" /></svg></span>SKILL.md, style guide and reference frames</li>
                    <li className={"flex items-start gap-2.5 text-[13.5px] \x74ext-[\x76ar(\x2d-text-secondary)]"}><span className={"mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-white \x74ext-[\x76ar(\x2d-text)] \x73hadow-[\x30_0_0_1px_rgba(\x30,\x30,\x30,\x30.\x308)]"}><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5" /></svg></span>Render scripts: one command to a finished MP4</li>
                    <li className={"flex items-start gap-2.5 text-[13.5px] \x74ext-[\x76ar(\x2d-text-secondary)]"}><span className={"mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-white \x74ext-[\x76ar(\x2d-text)] \x73hadow-[\x30_0_0_1px_rgba(\x30,\x30,\x30,\x30.\x308)]"}><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5" /></svg></span>A worked example for every style</li>
                    <li className={"flex items-start gap-2.5 text-[13.5px] \x74ext-[\x76ar(\x2d-text-secondary)]"}><span className={"mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-white \x74ext-[\x76ar(\x2d-text)] \x73hadow-[\x30_0_0_1px_rgba(\x30,\x30,\x30,\x30.\x308)]"}><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5" /></svg></span>Runs on your computer, no API keys</li>
                    <li className={"flex items-start gap-2.5 text-[13.5px] \x74ext-[\x76ar(\x2d-text-secondary)]"}><span className={"mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-white \x74ext-[\x76ar(\x2d-text)] \x73hadow-[\x30_0_0_1px_rgba(\x30,\x30,\x30,\x30.\x308)]"}><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5" /></svg></span>Instant download</li>
                    <li className={"flex items-start gap-2.5 text-[13.5px] \x74ext-[\x76ar(\x2d-text-secondary)]"}><span className={"mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-white \x74ext-[\x76ar(\x2d-text)] \x73hadow-[\x30_0_0_1px_rgba(\x30,\x30,\x30,\x30.\x308)]"}><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5" /></svg></span>Cancel whenever you want</li>
                  </ul>
                  <div className="mt-8">
                    <Button className={"flex h-12 w-full items-center justify-center rounded-full text-[14px] font-semibold transition-transform \x61ctive:\x73cale-[\x30.\x398] disabled:opacity-70 \x62g-[#\x3111] text-white"} type="button" disabled title="Video membership payments are not connected yet">Start monthly</Button>
                    <label className={"mt-3 flex cursor-pointer items-center justify-center gap-2 text-[11.5px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
                      <input className={"h-3.5 w-3.5 shrink-0 \x61ccent-[#\x66f5206]"} type="checkbox" />
                      <span>Instant download, so <a className={"underline \x75nderline-offset-2"} href="/refunds">sales are final</a></span>
                    </label>
                  </div>
                </div>
                <div className="os-dark relative flex flex-col overflow-hidden p-6 sm:p-7">
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-[15px] font-medium text-white">Yearly</p>
                    <span className={"rounded-full \x62g-[#\x665d98a] px-2.5 py-1 text-[10.5px] font-bold uppercase tracking-wide \x74ext-[#\x33b2a08]"}>Save 33%</span>
                  </div>
                  <p className="mt-4 flex items-baseline gap-1.5">
                    <span className={"\x66ont-[\x66amily-name:\x76ar(\x2d-font-heading)] text-[44px] font-medium leading-none tracking-tight text-white"}>$79.99</span>
                    <span className={"text-[13px] \x74ext-white/\x350"}>/ year</span>
                  </p>
                  <p className={"mt-2 text-[13px] \x74ext-white/\x360"}>That’s $6.67 a month, billed once a year.</p>
                  <ul className={"mt-6 \x73pace-y-3"}>
                    <li className={"flex items-start gap-2.5 text-[13.5px] \x74ext-white/\x380"}><span className={"mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full \x62g-white/\x310 text-white"}><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5" /></svg></span>All 3 premium styles, plus the free ones</li>
                    <li className={"flex items-start gap-2.5 text-[13.5px] \x74ext-white/\x380"}><span className={"mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full \x62g-white/\x310 text-white"}><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5" /></svg></span>New premium skills included as they launch</li>
                    <li className={"flex items-start gap-2.5 text-[13.5px] \x74ext-white/\x380"}><span className={"mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full \x62g-white/\x310 text-white"}><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5" /></svg></span>SKILL.md, style guide and reference frames</li>
                    <li className={"flex items-start gap-2.5 text-[13.5px] \x74ext-white/\x380"}><span className={"mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full \x62g-white/\x310 text-white"}><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5" /></svg></span>Render scripts: one command to a finished MP4</li>
                    <li className={"flex items-start gap-2.5 text-[13.5px] \x74ext-white/\x380"}><span className={"mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full \x62g-white/\x310 text-white"}><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5" /></svg></span>A worked example for every style</li>
                    <li className={"flex items-start gap-2.5 text-[13.5px] \x74ext-white/\x380"}><span className={"mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full \x62g-white/\x310 text-white"}><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5" /></svg></span>Runs on your computer, no API keys</li>
                    <li className={"flex items-start gap-2.5 text-[13.5px] \x74ext-white/\x380"}><span className={"mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full \x62g-white/\x310 text-white"}><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5" /></svg></span>Instant download</li>
                    <li className={"flex items-start gap-2.5 text-[13.5px] \x74ext-white/\x380"}><span className={"mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full \x62g-white/\x310 text-white"}><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5" /></svg></span>Cancel whenever you want</li>
                  </ul>
                  <div className="mt-8">
                    <Button className={"flex h-12 w-full items-center justify-center rounded-full text-[14px] font-semibold transition-transform \x61ctive:\x73cale-[\x30.\x398] disabled:opacity-70 bg-white text-black"} type="button" disabled title="Video membership payments are not connected yet">Start yearly</Button>
                    <label className={"mt-3 flex cursor-pointer items-center justify-center gap-2 text-[11.5px] \x74ext-white/\x355"}>
                      <input className={"h-3.5 w-3.5 shrink-0 \x61ccent-[#\x66f5206]"} type="checkbox" />
                      <span>Instant download, so <a className={"underline \x75nderline-offset-2"} href="/refunds">sales are final</a></span>
                    </label>
                  </div>
                </div>
              </div>
              <p className={"mx-auto mt-4 max-w-3xl px-4 text-center text-[12px] leading-relaxed \x74ext-[\x76ar(\x2d-text-tertiary)] sm:px-6"}>Prices in USD. Separate from website template plans and credits.<br />Video skills are instant digital downloads, and you can see every result before you buy, so <strong className={"font-medium \x74ext-[\x76ar(\x2d-text-secondary)]"}>all video skill sales are final</strong>. <a className={"underline \x75nderline-offset-2"} href="/refunds">Refund policy</a></p>
              <p className="mt-4 px-4 text-center text-sm text-muted-foreground" role="status">Video memberships are not available for purchase yet.</p>
              <ImportedSectionWhatYouGetToday />
              <ImportedSection />
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

function ImportedSectionWhatYouGetToday() {
  return (
    <section className="mx-auto mt-16 max-w-4xl px-4 sm:px-6">
      <h2 className={"text-center \x66ont-[\x66amily-name:\x76ar(\x2d-font-heading)] text-[24px] font-medium tracking-tight \x73m:\x74ext-[\x330px]"}><span className={"\x74ext-[\x76ar(\x2d-text)]"}>What you get</span> <span className={"\x74ext-[\x76ar(\x2d-text-tertiary)]"}>today</span></h2>
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <a className="os-shell block p-1.5" href="/videos/small-details">
          <div className="relative aspect-[9/16] overflow-hidden rounded-[18px] bg-black">
            <video className="h-full w-full object-cover" src="/site-assets/eb1bf923e75e1b03.mp4" muted loop playsInline preload="auto" />
          </div>
          <p className={"px-1 pt-2 text-[13px] font-medium \x74ext-[\x76ar(\x2d-text)]"}>Small details. Big difference.</p>
          <p className={"px-1 pb-1 text-[11.5px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>Included</p>
        </a>
        <a className="os-shell block p-1.5" href="/videos/organic">
          <div className="relative aspect-[9/16] overflow-hidden rounded-[18px] bg-black">
            <video className="h-full w-full object-cover" src="/site-assets/0fa7a2f3e366dece.mp4" muted loop playsInline preload="auto" />
          </div>
          <p className={"px-1 pt-2 text-[13px] font-medium \x74ext-[\x76ar(\x2d-text)]"}>Organic</p>
          <p className={"px-1 pb-1 text-[11.5px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>Included</p>
        </a>
        <a className="os-shell block p-1.5" href="/videos/kiln">
          <div className="relative aspect-[9/16] overflow-hidden rounded-[18px] bg-black">
            <video className="h-full w-full object-cover" src="/site-assets/4d82b15ad5c33738.mp4" muted loop playsInline preload="auto" />
          </div>
          <p className={"px-1 pt-2 text-[13px] font-medium \x74ext-[\x76ar(\x2d-text)]"}>Kiln</p>
          <p className={"px-1 pb-1 text-[11.5px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>Included</p>
        </a>
        <a className="os-shell block p-1.5" href="/videos/rays">
          <div className="relative aspect-[9/16] overflow-hidden rounded-[18px] bg-black">
            <video className="h-full w-full object-cover" src="/site-assets/98d9947330bee3f6.mp4" muted loop playsInline preload="auto" />
          </div>
          <p className={"px-1 pt-2 text-[13px] font-medium \x74ext-[\x76ar(\x2d-text)]"}>Rays</p>
          <p className={"px-1 pb-1 text-[11.5px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>Free with an account</p>
        </a>
      </div>
    </section>
  );
}

function ImportedSection() {
  return (
    <section className="mx-auto mt-16 max-w-2xl px-4 sm:px-6">
      <details className={"\x62order-b \x62order-[\x76ar(\x2d-line)] py-4"}>
        <summary className={"cursor-pointer text-[15px] font-medium \x74ext-[\x76ar(\x2d-text)]"}>What exactly do I get?</summary>
        <p className={"mt-2 text-[13.5px] leading-relaxed \x74ext-[\x76ar(\x2d-text-secondary)]"}>Each style is a Claude skill: a SKILL.md, a style guide with reference frames, render scripts and a worked example. You download it, install it in Claude Code, and give it a topic.</p>
      </details>
      <details className={"\x62order-b \x62order-[\x76ar(\x2d-line)] py-4"}>
        <summary className={"cursor-pointer text-[15px] font-medium \x74ext-[\x76ar(\x2d-text)]"}>Do I need anything else?</summary>
        <p className={"mt-2 text-[13.5px] leading-relaxed \x74ext-[\x76ar(\x2d-text-secondary)]"}>A Claude plan that includes Claude Code, and Node.js (free). Each style lists its tools and their costs on its page. Voiceover is optional.</p>
      </details>
      <details className={"\x62order-b \x62order-[\x76ar(\x2d-line)] py-4"}>
        <summary className={"cursor-pointer text-[15px] font-medium \x74ext-[\x76ar(\x2d-text)]"}>Can I get a refund?</summary>
        <p className={"mt-2 text-[13.5px] leading-relaxed \x74ext-[\x76ar(\x2d-text-secondary)]"}>No. Video skills are instant downloads and every example result is shown on the site before you buy, and you get the same files I use. So all video skill sales are final. If something doesn't work, use the help after downloading and I'll help you fix it.</p>
      </details>
      <details className={"\x62order-b \x62order-[\x76ar(\x2d-line)] py-4"}>
        <summary className={"cursor-pointer text-[15px] font-medium \x74ext-[\x76ar(\x2d-text)]"}>What happens if I cancel?</summary>
        <p className={"mt-2 text-[13.5px] leading-relaxed \x74ext-[\x76ar(\x2d-text-secondary)]"}>You keep access until the end of the period you paid for. Skills you already downloaded keep working on your computer.</p>
      </details>
      <details className={"\x62order-b \x62order-[\x76ar(\x2d-line)] py-4"}>
        <summary className={"cursor-pointer text-[15px] font-medium \x74ext-[\x76ar(\x2d-text)]"}>Is this the same as the template membership?</summary>
        <p className={"mt-2 text-[13.5px] leading-relaxed \x74ext-[\x76ar(\x2d-text-secondary)]"}>No. Video skills and website templates are separate plans, so you only pay for the one you use.</p>
      </details>
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
