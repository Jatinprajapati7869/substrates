import { withPublicPageHead } from "@/lib/seo";
import { useSupplyShell } from "@/lib/use-supply-shell";
import type { CSSProperties } from "react";
import { useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import capturedCSS from "../styles/pages/guides.animated-explainer-videos-with-claude.css?raw";

export const Route = createFileRoute("/guides_/animated-explainer-videos-with-claude")({
  head: () =>
    withPublicPageHead("/guides/animated-explainer-videos-with-claude", [
      { title: "How to Create Animated Explainer Videos With Claude \u2014 Substrates" },
      {
        name: "description",
        content:
          "Claude doesn't press record. It writes the code that draws every frame, then renders it into an MP4 on your computer. Here's the full workflow, from one idea to a finished short.",
      },
      {
        property: "og:title",
        content: "How to Create Animated Explainer Videos With Claude \u2014 Substrates",
      },
      {
        property: "og:description",
        content:
          "Claude doesn't press record. It writes the code that draws every frame, then renders it into an MP4 on your computer. Here's the full workflow, from one idea to a finished short.",
      },
      { property: "og:type", content: "article" },
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
  useImportedLayout();
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
      <div className="flex min-h-screen">
        <div
          className={
            "fixed \x69nset-x-0 top-0 z-30 flex h-14 items-center justify-between \x62order-b \x62order-black/\x35 \x62g-white/\x380 px-4 \x62ackdrop-blur-xl \x62ackdrop-saturate-150 \x6cg:\x68idden"
          }
        >
          <a className="flex items-center" aria-label="Substrates home" href="/">
            <img
              className="h-[15.6px] w-auto"
              style={{ color: "transparent" }}
              alt="Substrates"
              loading="eager"
              width="51"
              height="8"
              decoding="async"
              src="/site-assets/024c73af1ec90150-c4a2585c8f9f7fb8652d67979571478a.png"
            />
          </a>
          <button
            className={
              "rounded-full bg-white p-2 \x74ext-[\x76ar(\x2d-text-secondary)] \x73hadow-[\x76ar(\x2d-shadow-raised)]"
            }
            type="button"
            aria-label="Open navigation"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </button>
        </div>
        <ImportedAside />
        <div className="flex min-w-0 flex-1 flex-col pb-24 lg:pb-0 lg:pl-[var(--sidebar-w)]">
          <main className="min-w-0 flex-1" id="main">
            <div className="mx-auto max-w-6xl px-4 pb-24 pt-[72px] sm:px-6 lg:px-8 lg:pt-8">
              <nav
                className={"px-1 text-[12px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}
                aria-label="Breadcrumb"
              >
                <ol className="flex flex-wrap items-center gap-1.5">
                  <li className="flex items-center gap-1.5">
                    <a
                      className={"transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"}
                      href="/"
                    >
                      Home
                    </a>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span aria-hidden="true">/</span>
                    <a
                      className={"transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"}
                      href="/guides"
                    >
                      Guides
                    </a>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span aria-hidden="true">/</span>
                    <span className={"\x74ext-[\x76ar(\x2d-text-secondary)]"} aria-current="page">
                      How to Create Animated Explainer Videos With Claude
                    </span>
                  </li>
                </ol>
              </nav>
              <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_220px] lg:gap-14">
                <ImportedArticleHowToCreateAnimated />
                <nav className={"hidden \x6cg:\x62lock"} aria-label="On this page">
                  <div className="sticky top-8">
                    <p
                      className={
                        "text-[11.5px] font-semibold uppercase tracking-[0.08em] \x74ext-[\x76ar(\x2d-text-tertiary)]"
                      }
                    >
                      On this page
                    </p>
                    <ol
                      className={
                        "mt-3 \x73pace-y-2 \x62order-l \x62order-[\x76ar(\x2d-line)] pl-3 text-[13px] leading-snug"
                      }
                    >
                      <li>
                        <a
                          className={
                            "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
                          }
                          href="#what-you-need"
                        >
                          What you need
                        </a>
                      </li>
                      <li>
                        <a
                          className={
                            "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
                          }
                          href="#the-workflow-step-by-step"
                        >
                          The workflow, step by step
                        </a>
                      </li>
                      <li>
                        <a
                          className={
                            "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
                          }
                          href="#why-a-reusable-style-matters-more-than-any-single-prompt"
                        >
                          Why a reusable style matters more than any single prompt
                        </a>
                      </li>
                      <li>
                        <a
                          className={
                            "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
                          }
                          href="#common-mistakes"
                        >
                          Common mistakes
                        </a>
                      </li>
                    </ol>
                  </div>
                </nav>
              </div>
              <ImportedSectionKeepReading />
            </div>
          </main>
          <footer
            className={
              "mx-auto flex w-full max-w-6xl flex-wrap items-center gap-x-4 gap-y-2 \x62order-t \x62order-[\x76ar(\x2d-line)] px-4 py-5 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)] sm:px-6"
            }
          >
            <span>© 2026 [LEGAL ENTITY]</span>
            <a className={"\x68over:\x74ext-[\x76ar(\x2d-text)]"} href="/terms">
              Terms
            </a>
            <a className={"\x68over:\x74ext-[\x76ar(\x2d-text)]"} href="/privacy">
              Privacy
            </a>
            <a className={"\x68over:\x74ext-[\x76ar(\x2d-text)]"} href="/refunds">
              Refunds
            </a>
            <a
              className={"\x68over:\x74ext-[\x76ar(\x2d-text)]"}
              href="mailto:jatin@substrates.app"
            >
              Contact
            </a>
          </footer>
        </div>
        <ImportedNavMain />
      </div>
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
    <aside
      className={
        "fixed \x69nset-y-0 left-0 z-20 hidden w-[var(--sidebar-w)] py-3 pl-3 \x6cg:\x62lock"
      }
    >
      <div className="os-shell h-full overflow-hidden">
        <div className="flex h-full flex-col">
          <div className="flex h-14 items-center gap-2 px-5">
            <a className="flex items-center" aria-label="Substrates home" href="/">
              <img
                className="h-[15.6px] w-auto"
                style={{ color: "transparent" }}
                alt="Substrates"
                loading="eager"
                width="51"
                height="8"
                decoding="async"
                src="/site-assets/024c73af1ec90150-c4a2585c8f9f7fb8652d67979571478a.png"
              />
            </a>
          </div>
          <nav
            className="thin-scroll flex-1 overflow-y-auto pb-4 [scrollbar-color:var(--line-strong)_transparent] [scrollbar-width:thin]"
            aria-label="Catalog"
          >
            <div className="label px-5 pb-1.5 pt-5">Browse</div>
            <a
              className={
                "group mx-2 flex items-center gap-2.5 rounded-[12px] px-2.5 py-[7px] text-[13px] transition-[background-color,color,box-shadow] duration-150 \x74ext-[\x76ar(\x2d-text-secondary)] \x68over:\x62g-black/[\x30.\x3035] \x68over:\x74ext-[\x76ar(\x2d-text)]"
              }
              href="/"
            >
              <span
                className={
                  "flex h-[18px] w-[18px] shrink-0 items-center justify-center \x74ext-[\x76ar(\x2d-text-tertiary)] \x67roup-hover:\x74ext-[\x76ar(\x2d-text-secondary)]"
                }
                aria-hidden="true"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="17"
                  height="17"
                  fill="currentColor"
                  viewBox="0 0 256 256"
                >
                  <path d="M224,120v96a8,8,0,0,1-8,8H40a8,8,0,0,1-8-8V120a15.87,15.87,0,0,1,4.69-11.32l80-80a16,16,0,0,1,22.62,0l80,80A15.87,15.87,0,0,1,224,120Z" />
                </svg>
              </span>
              <span className="min-w-0 flex-1 truncate">Home</span>
              <span className="os-dot mr-1" aria-hidden="true" />
            </a>
            <a
              className={
                "group mx-2 flex items-center gap-2.5 rounded-[12px] px-2.5 py-[7px] text-[13px] transition-[background-color,color,box-shadow] duration-150 \x74ext-[\x76ar(\x2d-text-secondary)] \x68over:\x62g-black/[\x30.\x3035] \x68over:\x74ext-[\x76ar(\x2d-text)]"
              }
              href="/?collection=all"
            >
              <span
                className={
                  "flex h-[18px] w-[18px] shrink-0 items-center justify-center \x74ext-[\x76ar(\x2d-text-tertiary)] \x67roup-hover:\x74ext-[\x76ar(\x2d-text-secondary)]"
                }
                aria-hidden="true"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="17"
                  height="17"
                  fill="currentColor"
                  viewBox="0 0 256 256"
                >
                  <path d="M120,56v48a16,16,0,0,1-16,16H56a16,16,0,0,1-16-16V56A16,16,0,0,1,56,40h48A16,16,0,0,1,120,56Zm80-16H152a16,16,0,0,0-16,16v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V56A16,16,0,0,0,200,40Zm-96,96H56a16,16,0,0,0-16,16v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V152A16,16,0,0,0,104,136Zm96,0H152a16,16,0,0,0-16,16v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V152A16,16,0,0,0,200,136Z" />
                </svg>
              </span>
              <span className="min-w-0 flex-1 truncate">All Templates</span>
              <span
                className={"shrink-0 text-[11px] tabular-nums \x74ext-[\x76ar(\x2d-text-tertiary)]"}
              >
                192
              </span>
            </a>
            <a
              className={
                "group mx-2 flex items-center gap-2.5 rounded-[12px] px-2.5 py-[7px] text-[13px] transition-[background-color,color,box-shadow] duration-150 \x74ext-[\x76ar(\x2d-text-secondary)] \x68over:\x62g-black/[\x30.\x3035] \x68over:\x74ext-[\x76ar(\x2d-text)]"
              }
              href="/?collection=recent"
            >
              <span
                className={
                  "flex h-[18px] w-[18px] shrink-0 items-center justify-center \x74ext-[\x76ar(\x2d-text-tertiary)] \x67roup-hover:\x74ext-[\x76ar(\x2d-text-secondary)]"
                }
                aria-hidden="true"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="17"
                  height="17"
                  fill="currentColor"
                  viewBox="0 0 256 256"
                >
                  <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm56,112H128a8,8,0,0,1-8-8V72a8,8,0,0,1,16,0v48h48a8,8,0,0,1,0,16Z" />
                </svg>
              </span>
              <span className="min-w-0 flex-1 truncate">Recently Added</span>
            </a>
            <a
              className={
                "group mx-2 flex items-center gap-2.5 rounded-[12px] px-2.5 py-[7px] text-[13px] transition-[background-color,color,box-shadow] duration-150 \x74ext-[\x76ar(\x2d-text-secondary)] \x68over:\x62g-black/[\x30.\x3035] \x68over:\x74ext-[\x76ar(\x2d-text)]"
              }
              href="/sections"
            >
              <span
                className={
                  "flex h-[18px] w-[18px] shrink-0 items-center justify-center \x74ext-[\x76ar(\x2d-text-tertiary)] \x67roup-hover:\x74ext-[\x76ar(\x2d-text-secondary)]"
                }
                aria-hidden="true"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="17"
                  height="17"
                  fill="currentColor"
                  viewBox="0 0 256 256"
                >
                  <path d="M208,144a15.78,15.78,0,0,1-10.42,14.94L146,178l-19,51.62a15.92,15.92,0,0,1-29.88,0L78,178l-51.62-19a15.92,15.92,0,0,1,0-29.88L78,110l19-51.62a15.92,15.92,0,0,1,29.88,0L146,110l51.62,19A15.78,15.78,0,0,1,208,144ZM152,48h16V64a8,8,0,0,0,16,0V48h16a8,8,0,0,0,0-16H184V16a8,8,0,0,0-16,0V32H152a8,8,0,0,0,0,16Zm88,32h-8V72a8,8,0,0,0-16,0v8h-8a8,8,0,0,0,0,16h8v8a8,8,0,0,0,16,0V96h8a8,8,0,0,0,0-16Z" />
                </svg>
              </span>
              <span className="min-w-0 flex-1 truncate">Sections</span>
              <span
                className={"shrink-0 text-[11px] tabular-nums \x74ext-[\x76ar(\x2d-text-tertiary)]"}
              >
                58
              </span>
            </a>
            <a
              className={
                "group mx-2 flex items-center gap-2.5 rounded-[12px] px-2.5 py-[7px] text-[13px] transition-[background-color,color,box-shadow] duration-150 \x74ext-[\x76ar(\x2d-text-secondary)] \x68over:\x62g-black/[\x30.\x3035] \x68over:\x74ext-[\x76ar(\x2d-text)]"
              }
              href="/videos"
            >
              <span
                className={
                  "flex h-[18px] w-[18px] shrink-0 items-center justify-center \x74ext-[\x76ar(\x2d-text-tertiary)] \x67roup-hover:\x74ext-[\x76ar(\x2d-text-secondary)]"
                }
                aria-hidden="true"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="17"
                  height="17"
                  fill="currentColor"
                  viewBox="0 0 256 256"
                >
                  <path d="M216,104H102.09L210,75.51a8,8,0,0,0,5.68-9.84l-8.16-30a15.93,15.93,0,0,0-19.42-11.13L35.81,64.74a15.75,15.75,0,0,0-9.7,7.4,15.51,15.51,0,0,0-1.55,12L32,111.56c0,.14,0,.29,0,.44v88a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V112A8,8,0,0,0,216,104ZM192.16,40l6,22.07L164.57,71,136.44,54.72ZM77.55,70.27l28.12,16.24-59.6,15.73-6-22.08Z" />
                </svg>
              </span>
              <span className="min-w-0 flex-1 truncate">Videos</span>
              <span
                className={
                  "os-chip h-5 shrink-0 px-2 text-[9.5px] uppercase tracking-wide \x74ext-[\x76ar(\x2d-text-tertiary)]"
                }
              >
                New
              </span>
            </a>
            <a
              className={
                "group mx-2 flex items-center gap-2.5 rounded-[12px] px-2.5 py-[7px] text-[13px] transition-[background-color,color,box-shadow] duration-150 \x62g-gradient-to-b \x66rom-white \x74o-[#\x667f7f6] font-medium \x74ext-[\x76ar(\x2d-text)] \x73hadow-[\x76ar(\x2d-shadow-raised)]"
              }
              aria-current="page"
              href="/guides"
            >
              <span
                className={
                  "flex h-[18px] w-[18px] shrink-0 items-center justify-center \x74ext-[\x76ar(\x2d-text)]"
                }
                aria-hidden="true"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="17"
                  height="17"
                  fill="currentColor"
                  viewBox="0 0 256 256"
                >
                  <path d="M232,48H168a32,32,0,0,0-32,32v87.73a8.17,8.17,0,0,1-7.47,8.25,8,8,0,0,1-8.53-8V80A32,32,0,0,0,88,48H24a8,8,0,0,0-8,8V200a8,8,0,0,0,8,8H96a24,24,0,0,1,24,23.94,7.9,7.9,0,0,0,5.12,7.55A8,8,0,0,0,136,232a24,24,0,0,1,24-24h72a8,8,0,0,0,8-8V56A8,8,0,0,0,232,48ZM208,168H168.27a8.17,8.17,0,0,1-8.25-7.47,8,8,0,0,1,8-8.53h39.73a8.17,8.17,0,0,1,8.25,7.47A8,8,0,0,1,208,168Zm0-32H168.27a8.17,8.17,0,0,1-8.25-7.47,8,8,0,0,1,8-8.53h39.73a8.17,8.17,0,0,1,8.25,7.47A8,8,0,0,1,208,136Zm0-32H168.27A8.17,8.17,0,0,1,160,96.53,8,8,0,0,1,168,88h39.73A8.17,8.17,0,0,1,216,95.47,8,8,0,0,1,208,104Z" />
                </svg>
              </span>
              <span className="min-w-0 flex-1 truncate">Guides</span>
            </a>
            <div className="label px-5 pb-1.5 pt-5">Platform</div>
            <a
              className={
                "group mx-2 flex items-center gap-2.5 rounded-[12px] px-2.5 py-[7px] text-[13px] transition-[background-color,color,box-shadow] duration-150 \x74ext-[\x76ar(\x2d-text-secondary)] \x68over:\x62g-black/[\x30.\x3035] \x68over:\x74ext-[\x76ar(\x2d-text)]"
              }
              href="/?platform=all"
            >
              <span
                className={
                  "flex h-[18px] w-[18px] shrink-0 items-center justify-center \x74ext-[\x76ar(\x2d-text-tertiary)] \x67roup-hover:\x74ext-[\x76ar(\x2d-text-secondary)]"
                }
                aria-hidden="true"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="17"
                  height="17"
                  fill="currentColor"
                  viewBox="0 0 256 256"
                >
                  <path d="M220,169.09l-92,53.65L36,169.09A8,8,0,0,0,28,182.91l96,56a8,8,0,0,0,8.06,0l96-56A8,8,0,1,0,220,169.09Z" />
                  <path d="M220,121.09l-92,53.65L36,121.09A8,8,0,0,0,28,134.91l96,56a8,8,0,0,0,8.06,0l96-56A8,8,0,1,0,220,121.09Z" />
                  <path d="M28,86.91l96,56a8,8,0,0,0,8.06,0l96-56a8,8,0,0,0,0-13.82l-96-56a8,8,0,0,0-8.06,0l-96,56a8,8,0,0,0,0,13.82Z" />
                </svg>
              </span>
              <span className="min-w-0 flex-1 truncate">All Platforms</span>
              <span
                className={"shrink-0 text-[11px] tabular-nums \x74ext-[\x76ar(\x2d-text-tertiary)]"}
              >
                192
              </span>
            </a>
            <a
              className={
                "group mx-2 flex items-center gap-2.5 rounded-[12px] px-2.5 py-[7px] text-[13px] transition-[background-color,color,box-shadow] duration-150 \x74ext-[\x76ar(\x2d-text-secondary)] \x68over:\x62g-black/[\x30.\x3035] \x68over:\x74ext-[\x76ar(\x2d-text)]"
              }
              href="/?platform=webflow"
            >
              <span
                className={
                  "flex h-[18px] w-[18px] shrink-0 items-center justify-center \x74ext-[\x76ar(\x2d-text-tertiary)] \x67roup-hover:\x74ext-[\x76ar(\x2d-text-secondary)]"
                }
                aria-hidden="true"
              >
                <svg
                  width="17.0625"
                  height="10.5"
                  viewBox="0 0 26 16"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M25.65 0L17.4654 16H9.77778L13.203 9.36892H13.0493C10.2235 13.0372 6.00738 15.452 0 16V9.46068C0 9.46068 3.84306 9.23369 6.10229 6.85844H0V0.000126383H6.85832V5.64099L7.01225 5.64036L9.8148 0.000126383H15.0016V5.60523L15.1555 5.60497L18.0632 0H25.65Z"
                    fill="currentColor"
                  />
                </svg>
              </span>
              <span className="min-w-0 flex-1 truncate">Webflow</span>
              <span
                className={"shrink-0 text-[11px] tabular-nums \x74ext-[\x76ar(\x2d-text-tertiary)]"}
              >
                189
              </span>
            </a>
            <a
              className={
                "group mx-2 flex items-center gap-2.5 rounded-[12px] px-2.5 py-[7px] text-[13px] transition-[background-color,color,box-shadow] duration-150 \x74ext-[\x76ar(\x2d-text-secondary)] \x68over:\x62g-black/[\x30.\x3035] \x68over:\x74ext-[\x76ar(\x2d-text)]"
              }
              href="/?platform=framer"
            >
              <span
                className={
                  "flex h-[18px] w-[18px] shrink-0 items-center justify-center \x74ext-[\x76ar(\x2d-text-tertiary)] \x67roup-hover:\x74ext-[\x76ar(\x2d-text-secondary)]"
                }
                aria-hidden="true"
              >
                <svg width="10" height="15" viewBox="0 0 192 288" fill="none" aria-hidden="true">
                  <path
                    d="M 96 192 L 96 288 L 0 192 L 0 96 L 96 96 L 0 0 L 192 0 L 192 96 L 96 96 L 192 192 Z"
                    fill="currentColor"
                  />
                </svg>
              </span>
              <span className="min-w-0 flex-1 truncate">Framer</span>
              <span
                className={"shrink-0 text-[11px] tabular-nums \x74ext-[\x76ar(\x2d-text-tertiary)]"}
              >
                12
              </span>
            </a>
            <div className="label px-5 pb-1.5 pt-5">My Library</div>
            <a
              className={
                "group mx-2 flex items-center gap-2.5 rounded-[12px] px-2.5 py-[7px] text-[13px] transition-[background-color,color,box-shadow] duration-150 \x74ext-[\x76ar(\x2d-text-secondary)] \x68over:\x62g-black/[\x30.\x3035] \x68over:\x74ext-[\x76ar(\x2d-text)]"
              }
              href="/?collection=my-templates"
            >
              <span
                className={
                  "flex h-[18px] w-[18px] shrink-0 items-center justify-center \x74ext-[\x76ar(\x2d-text-tertiary)] \x67roup-hover:\x74ext-[\x76ar(\x2d-text-secondary)]"
                }
                aria-hidden="true"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="17"
                  height="17"
                  fill="currentColor"
                  viewBox="0 0 256 256"
                >
                  <path d="M232,88V200.89A15.13,15.13,0,0,1,216.89,216H40a16,16,0,0,1-16-16V64A16,16,0,0,1,40,48H93.33a16.12,16.12,0,0,1,9.6,3.2L130.67,72H216A16,16,0,0,1,232,88Z" />
                </svg>
              </span>
              <span className="min-w-0 flex-1 truncate">My Templates</span>
              <span
                className={"shrink-0 text-[11px] tabular-nums \x74ext-[\x76ar(\x2d-text-tertiary)]"}
              >
                0
              </span>
            </a>
            <a
              className={
                "group mx-2 flex items-center gap-2.5 rounded-[12px] px-2.5 py-[7px] text-[13px] transition-[background-color,color,box-shadow] duration-150 \x74ext-[\x76ar(\x2d-text-secondary)] \x68over:\x62g-black/[\x30.\x3035] \x68over:\x74ext-[\x76ar(\x2d-text)]"
              }
              href="/?collection=favorites"
            >
              <span
                className={
                  "flex h-[18px] w-[18px] shrink-0 items-center justify-center \x74ext-[\x76ar(\x2d-text-tertiary)] \x67roup-hover:\x74ext-[\x76ar(\x2d-text-secondary)]"
                }
                aria-hidden="true"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="17"
                  height="17"
                  fill="currentColor"
                  viewBox="0 0 256 256"
                >
                  <path d="M240,102c0,70-103.79,126.66-108.21,129a8,8,0,0,1-7.58,0C119.79,228.66,16,172,16,102A62.07,62.07,0,0,1,78,40c20.65,0,38.73,8.88,50,23.89C139.27,48.88,157.35,40,178,40A62.07,62.07,0,0,1,240,102Z" />
                </svg>
              </span>
              <span className="min-w-0 flex-1 truncate">Favorites</span>
              <span
                className={"shrink-0 text-[11px] tabular-nums \x74ext-[\x76ar(\x2d-text-tertiary)]"}
              >
                0
              </span>
            </a>
          </nav>
          <div className="p-2 pt-0">
            <div className="os-rule mx-3 mb-3" />
            <div className="flex flex-col gap-2 px-2">
              <a
                className={
                  "os-button relative inline-flex select-none items-center justify-center gap-2 rounded-full font-medium transition-[transform,box-shadow,filter,background-color] duration-150 ease-out \x64isabled:\x63ursor-not-allowed disabled:opacity-45 h-9 px-4 text-[12px] os-spark text-white w-full"
                }
                style={
                  {
                    backgroundImage:
                      "linear-gradient(rgb(46, 46, 46) 0%, rgb(26, 26, 26) 50%, rgb(14, 14, 14) 100%)",
                    boxShadow:
                      "rgba(255, 255, 255, 0.14) 0px 1px 0px inset, rgba(0, 0, 0, 0.5) 0px -1px 0px inset, rgba(0, 0, 0, 0.22) 0px 1px 2px, rgba(0, 0, 0, 0.5) 0px 10px 22px -10px, rgba(255, 82, 6, 0.55) 0px 8px 18px -12px",
                  } as CSSProperties
                }
                href="/pricing"
              >
                View pricing
              </a>
              <a
                className={
                  "os-button relative inline-flex select-none items-center justify-center gap-2 rounded-full font-medium transition-[transform,box-shadow,filter,background-color] duration-150 ease-out \x64isabled:\x63ursor-not-allowed disabled:opacity-45 h-9 px-4 text-[12px] \x74ext-[\x76ar(\x2d-text)] w-full"
                }
                style={
                  {
                    backgroundImage:
                      "linear-gradient(rgb(255, 255, 255) 0%, rgb(248, 248, 247) 55%, rgb(239, 239, 238) 100%)",
                    boxShadow:
                      "rgb(255, 255, 255) 0px 1px 0px inset, rgba(0, 0, 0, 0.05) 0px -1px 0px inset, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px, rgba(0, 0, 0, 0.08) 0px 1px 2px, rgba(0, 0, 0, 0.28) 0px 8px 18px -10px",
                  } as CSSProperties
                }
                href="/signin"
              >
                Sign in
              </a>
            </div>
            <div className="mt-2">
              <button
                className={
                  "group mx-2 flex w-[calc(100%-16px)] items-center gap-2.5 rounded-[12px] px-2.5 py-[7px] text-left text-[13px] \x74ext-[\x76ar(\x2d-text-secondary)] transition-[background-color,color] duration-150 \x68over:\x62g-black/[\x30.\x3035] \x68over:\x74ext-[\x76ar(\x2d-text)]"
                }
                type="button"
              >
                <span
                  className={
                    "flex h-[18px] w-[18px] shrink-0 items-center justify-center \x74ext-[\x76ar(\x2d-text-tertiary)] \x67roup-hover:\x74ext-[\x76ar(\x2d-text-secondary)]"
                  }
                  aria-hidden="true"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="17"
                    height="17"
                    fill="currentColor"
                    viewBox="0 0 256 256"
                  >
                    <path d="M128,24A104,104,0,0,0,36.18,176.88L24.83,210.93a16,16,0,0,0,20.24,20.24l34.05-11.35A104,104,0,1,0,128,24Zm32,128H96a8,8,0,0,1,0-16h64a8,8,0,0,1,0,16Zm0-32H96a8,8,0,0,1,0-16h64a8,8,0,0,1,0,16Z" />
                  </svg>
                </span>
                <span className="min-w-0 flex-1 truncate">Feedback</span>
              </button>
              <a
                className={
                  "group mx-2 flex items-center gap-2.5 rounded-[12px] px-2.5 py-[7px] text-[13px] transition-[background-color,color,box-shadow] duration-150 \x74ext-[\x76ar(\x2d-text-secondary)] \x68over:\x62g-black/[\x30.\x3035] \x68over:\x74ext-[\x76ar(\x2d-text)]"
                }
                href="/help"
              >
                <span
                  className={
                    "flex h-[18px] w-[18px] shrink-0 items-center justify-center \x74ext-[\x76ar(\x2d-text-tertiary)] \x67roup-hover:\x74ext-[\x76ar(\x2d-text-secondary)]"
                  }
                  aria-hidden="true"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="17"
                    height="17"
                    fill="currentColor"
                    viewBox="0 0 256 256"
                  >
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

function ImportedArticleHowToCreateAnimated() {
  return (
    <article className="mx-auto w-full min-w-0 max-w-[680px]">
      <header>
        <p className={"text-[12.5px] font-medium \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
          <a className={"\x74ext-[#\x66f5206]"} href="/guides">
            Animations &amp; Videos
          </a>{" "}
          · <time dateTime="2026-10-22T09:00:00.000Z">Oct 22, 2026</time> · 4 min read
        </p>
        <h1
          className={
            "mt-3 \x66ont-[\x66amily-name:\x76ar(\x2d-font-heading)] text-[34px] font-medium leading-[1.08] tracking-[-0.03em] \x74ext-[\x76ar(\x2d-text)] \x73m:\x74ext-[\x346px]"
          }
        >
          How to Create Animated Explainer Videos With Claude
        </h1>
        <p className={"mt-4 text-[17px] leading-relaxed \x74ext-[\x76ar(\x2d-text-secondary)]"}>
          Claude doesn't press record. It writes the code that draws every frame, then renders it
          into an MP4 on your computer. Here's the full workflow, from one idea to a finished short.
        </p>
        <p className={"mt-5 text-[13px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
          By Florent,{" "}
          <a className={"underline \x75nderline-offset-2"} href="https://substrates.app">
            Substrates
          </a>
        </p>
      </header>
      <div className="mt-10">
        <div className="guide-prose">
          <p>
            If you ask Claude in a normal chat to "make me an explainer video", you'll get a script,
            maybe a storyboard, and no video. That's not Claude being lazy. A chat model writes text
            and code; it doesn't have a video editor.
          </p>
          <p>
            The trick is to stop asking for a video and start asking for{" "}
            <strong className={"font-semibold \x74ext-[\x76ar(\x2d-text)]"}>
              the code that draws one
            </strong>
            . Every animated explainer is just a few hundred frames. If Claude can write a program
            that draws frame 1, frame 2, frame 3 and so on, a free tool like ffmpeg can stitch them
            into an MP4. Claude Code can run that program on your own computer, look at the frames
            it made, and fix what's wrong.
          </p>
          <p>That's how my videos are made, including the one below. It has had 662,771 views.</p>
          <figure>
            <video
              className="guide-video aspect-[9/16] object-cover"
              src="/site-assets/b8e618643c4b9c6c.mp4"
              muted
              loop
              autoPlay
              playsInline
              preload="auto"
              aria-label="A short explainer about the invisible triangle in the menus you use"
            />
            <figcaption>
              A short explainer about the invisible triangle in the menus you use
            </figcaption>
          </figure>
          <h2 className="[scroll-margin-top:90px]" id="what-you-need">
            What you need
          </h2>
          <ul>
            <li>
              <strong className={"font-semibold \x74ext-[\x76ar(\x2d-text)]"}>Claude Code.</strong>{" "}
              This is Claude running in your terminal, where it can create files and run commands.
              It needs a paid Claude plan (Pro or Max) or Anthropic API credits.
            </li>
            <li>
              <strong className={"font-semibold \x74ext-[\x76ar(\x2d-text)]"}>
                Node.js 18 or newer.
              </strong>{" "}
              Free, from nodejs.org. It runs the render scripts.
            </li>
            <li>
              <strong className={"font-semibold \x74ext-[\x76ar(\x2d-text)]"}>
                A drawing library and ffmpeg.
              </strong>{" "}
              In my setup that's{" "}
              <code
                className={
                  "rounded-md \x62g-[\x76ar(\x2d-surface-sunken,#\x65feeea)] px-1.5 py-0.5 font-mono text-[0.88em] \x74ext-[\x76ar(\x2d-text)]"
                }
              >
                @napi-rs/canvas
              </code>{" "}
              to draw each frame and{" "}
              <code
                className={
                  "rounded-md \x62g-[\x76ar(\x2d-surface-sunken,#\x65feeea)] px-1.5 py-0.5 font-mono text-[0.88em] \x74ext-[\x76ar(\x2d-text)]"
                }
              >
                ffmpeg-static
              </code>{" "}
              to encode the MP4. Both are free and install with npm, so Claude can set them up for
              you.
            </li>
            <li>
              <strong className={"font-semibold \x74ext-[\x76ar(\x2d-text)]"}>
                Optional: a voiceover.
              </strong>{" "}
              Most of my shorts work without one, because the captions carry the story. If you want
              one, record it yourself or use a text-to-speech tool you're licensed to use.
            </li>
          </ul>
          <p>
            You don't need After Effects, a GPU or any API keys for the rendering itself. It all
            runs locally.
          </p>
          <h2 className="[scroll-margin-top:90px]" id="the-workflow-step-by-step">
            The workflow, step by step
          </h2>
          <h3 className="[scroll-margin-top:90px]" id="1-pick-one-idea-not-a-topic">
            1. Pick one idea, not a topic
          </h3>
          <p>
            "How credit cards work" is a topic. "Why your card number passes a check before it's
            ever sent to the bank" is an idea. Short explainers live or die on having exactly one
            surprising thing to show.
          </p>
          <p>
            A good test: can you say the payoff in one sentence? If not, narrow it down before you
            open Claude.
          </p>
          <h3 className="[scroll-margin-top:90px]" id="2-get-a-script-with-beats-not-paragraphs">
            2. Get a script with beats, not paragraphs
          </h3>
          <p>
            Ask Claude for the script as a list of short beats, each one a caption that fits on a
            phone screen. For a 12–15 second short that's usually four to six beats.
          </p>
          <pre className="[overflow-x:auto] [word-break:break-word]">
            <code>
              Write a 12–15 second explainer script about [your idea]. Return 4–6 beats. Each beat:
              one caption under 8 words, and one line describing what the viewer should see. The
              first beat must create a question. The last beat answers it.
            </code>
          </pre>
          <p>Read it out loud. If a beat needs a second sentence to make sense, cut or merge it.</p>
          <h3 className="[scroll-margin-top:90px]" id="3-turn-the-beats-into-a-storyboard">
            3. Turn the beats into a storyboard
          </h3>
          <p>
            Now ask Claude to plan the visuals for each beat: what's on screen, what moves, how long
            it stays. This is where you decide the{" "}
            <strong className={"font-semibold \x74ext-[\x76ar(\x2d-text)]"}>style</strong>: colours,
            fonts, the kind of motion (soft and slow, or snappy and punchy). Writing the style down
            once, as a short style guide, keeps every video looking like it belongs to the same
            channel.
          </p>
          <h3 className="[scroll-margin-top:90px]" id="4-have-claude-code-build-the-scene">
            4. Have Claude Code build the scene
          </h3>
          <p>
            This is the part a chat can't do. In Claude Code, ask it to write a Node script that
            draws each frame of the storyboard with canvas, at 1080×1920 and 30 frames per second,
            then encodes the frames into an MP4 with ffmpeg.
          </p>
          <p>
            The first render is rarely right. That's fine. Ask Claude Code to{" "}
            <strong className={"font-semibold \x74ext-[\x76ar(\x2d-text)]"}>
              render a few still frames
            </strong>{" "}
            from different beats and look at them before rendering the whole video. Fixing a caption
            that overlaps a shape takes seconds at this stage.
          </p>
          <blockquote>
            Tip: ask for timing in seconds per beat in one config object at the top of the script.
            Then "make beat 3 half a second longer" is a one-line change instead of a hunt through
            the code.
          </blockquote>
          <h3 className="[scroll-margin-top:90px]" id="5-render-watch-adjust">
            5. Render, watch, adjust
          </h3>
          <p>
            Render the full MP4 and watch it on your phone, not your monitor. That's where it'll be
            seen. Things to check:
          </p>
          <ul>
            <li>Can you read every caption before it disappears?</li>
            <li>Does the first second make you want to see the second?</li>
            <li>Does anything move for no reason? Motion should point at the idea.</li>
          </ul>
          <p>
            Tell Claude Code exactly what to change ("beat 2 caption on screen for 1.5s more", "the
            circle should grow, not fade in") and render again.
          </p>
          <h3 className="[scroll-margin-top:90px]" id="6-add-audio-if-you-want-it-then-post">
            6. Add audio if you want it, then post
          </h3>
          <p>
            Drop in a voiceover or music if you're using one, have ffmpeg mix it in, and post the
            MP4 yourself.
          </p>
          <h2
            className="[scroll-margin-top:90px]"
            id="why-a-reusable-style-matters-more-than-any-single-prompt"
          >
            Why a reusable style matters more than any single prompt
          </h2>
          <p>
            The first video takes the longest, because you're inventing the look, the timing and the
            scripts all at once. The second one is much faster if you saved what worked: the style
            guide, the render script and an example. Then you only bring a new idea and Claude
            reuses everything else.
          </p>
          <p>
            That's exactly what a Claude{" "}
            <strong className={"font-semibold \x74ext-[\x76ar(\x2d-text)]"}>skill</strong> is: a
            folder with instructions (a{" "}
            <code
              className={
                "rounded-md \x62g-[\x76ar(\x2d-surface-sunken,#\x65feeea)] px-1.5 py-0.5 font-mono text-[0.88em] \x74ext-[\x76ar(\x2d-text)]"
              }
            >
              SKILL.md
            </code>
            ), references and scripts that Claude Code loads when it needs them. Package your style
            as a skill once, and every new video starts from a working pipeline instead of a blank
            page.
          </p>
          <h2 className="[scroll-margin-top:90px]" id="common-mistakes">
            Common mistakes
          </h2>
          <ul>
            <li>
              <strong className={"font-semibold \x74ext-[\x76ar(\x2d-text)]"}>
                Asking for "a video" in one prompt.
              </strong>{" "}
              You'll get something generic. Script, storyboard and scene as separate steps give you
              control.
            </li>
            <li>
              <strong className={"font-semibold \x74ext-[\x76ar(\x2d-text)]"}>
                Too many ideas per video.
              </strong>{" "}
              One payoff per short.
            </li>
            <li>
              <strong className={"font-semibold \x74ext-[\x76ar(\x2d-text)]"}>
                Skipping the still-frame check.
              </strong>{" "}
              Rendering the whole video to spot one overlap wastes the most time.
            </li>
            <li>
              <strong className={"font-semibold \x74ext-[\x76ar(\x2d-text)]"}>
                Tiny captions.
              </strong>{" "}
              Design for a phone held at arm's length.
            </li>
          </ul>
          <p>
            If you want to try this without building the pipeline yourself, the styles I use for my
            own videos are on{" "}
            <a
              className={
                "font-medium \x74ext-[\x76ar(\x2d-text)] underline \x64ecoration-black/\x325 \x75nderline-offset-[\x33px] transition-colors \x68over:\x64ecoration-black/\x370"
              }
              href="/videos"
            >
              the video styles page
            </a>
            , with scripts, references and step-by-step instructions.{" "}
            <a
              className={
                "font-medium \x74ext-[\x76ar(\x2d-text)] underline \x64ecoration-black/\x325 \x75nderline-offset-[\x33px] transition-colors \x68over:\x64ecoration-black/\x370"
              }
              href="/videos/rays"
            >
              Rays
            </a>{" "}
            is free with an account.
          </p>
        </div>
      </div>
      <aside
        className="os-dark relative mt-16 overflow-hidden !rounded-[var(--r-shell)] p-7 sm:p-10"
        aria-label="Video styles for Claude"
      >
        <div
          className={
            "pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full \x62g-[#\x66f5206] opacity-25 \x62lur-[\x390px]"
          }
          aria-hidden="true"
        />
        <p
          className={
            "relative text-[11.5px] font-semibold uppercase tracking-[0.1em] \x74ext-[#\x665d98a]"
          }
        >
          Video styles for Claude
        </p>
        <p
          className={
            "relative mt-3 \x66ont-[\x66amily-name:\x76ar(\x2d-font-heading)] text-[28px] font-medium leading-[1.1] tracking-[-0.02em] text-white \x73m:\x74ext-[\x334px]"
          }
        >
          Make explainer videos like mine.
          <br />
          <span className={"\x74ext-white/\x350"}>With Claude.</span>
        </p>
        <p className={"relative mt-3 max-w-md text-[14.5px] leading-relaxed \x74ext-white/\x365"}>
          Get the exact styles I use: references, render scripts and step-by-step instructions,
          packaged as Claude skills. Bring a topic, Claude makes the video.
        </p>
        <div
          className={"relative mt-7 flex flex-col gap-2.5 \x73m:\x66lex-row \x73m:\x69tems-center"}
        >
          <a
            className={
              "flex h-12 items-center justify-center gap-2 rounded-full bg-white px-6 text-[14.5px] font-semibold text-black transition-transform \x61ctive:\x73cale-[\x30.\x398]"
            }
            href="/videos"
          >
            Explore the video styles{" "}
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </a>
          <a
            className={
              "flex h-12 items-center justify-center rounded-full px-5 text-[14px] font-medium \x74ext-white/\x380 \x72ing-1 \x72ing-white/\x320 transition-colors \x68over:\x62g-white/\x310"
            }
            href="/videos/rays"
          >
            Get Rays free
          </a>
        </div>
      </aside>
    </article>
  );
}

function ImportedSectionKeepReading() {
  return (
    <section className="mx-auto mt-20 max-w-6xl" aria-labelledby="related">
      <h2
        className={
          "px-1 \x66ont-[\x66amily-name:\x76ar(\x2d-font-heading)] text-[22px] font-medium tracking-tight \x74ext-[\x76ar(\x2d-text)]"
        }
        id="related"
      >
        Keep reading
      </h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <a
          className={"os-shell block p-5 transition-transform \x68over:\x2dtranslate-y-0.\x35"}
          href="/guides/video-hook-examples"
        >
          <p className={"text-[11.5px] font-medium \x74ext-[#\x66f5206]"}>
            Animations &amp; Videos
          </p>
          <p
            className={
              "mt-1.5 \x66ont-[\x66amily-name:\x76ar(\x2d-font-heading)] text-[17px] font-medium leading-snug \x74ext-[\x76ar(\x2d-text)]"
            }
          >
            15 Hook Examples for Short Explainer Videos (Reels and TikTok)
          </p>
          <p className={"mt-1.5 \x6cine-clamp-2 text-[13px] \x74ext-[\x76ar(\x2d-text-secondary)]"}>
            The first second decides whether anyone sees the rest. Here are fifteen hook formulas
            for explainer videos, with examples you can adapt, and the openings to avoid.
          </p>
        </a>
        <a
          className={"os-shell block p-5 transition-transform \x68over:\x2dtranslate-y-0.\x35"}
          href="/guides/best-fonts-for-video-captions"
        >
          <p className={"text-[11.5px] font-medium \x74ext-[#\x66f5206]"}>
            Animations &amp; Videos
          </p>
          <p
            className={
              "mt-1.5 \x66ont-[\x66amily-name:\x76ar(\x2d-font-heading)] text-[17px] font-medium leading-snug \x74ext-[\x76ar(\x2d-text)]"
            }
          >
            Best Fonts for Video Captions on Reels and TikTok
          </p>
          <p className={"mt-1.5 \x6cine-clamp-2 text-[13px] \x74ext-[\x76ar(\x2d-text-secondary)]"}>
            Captions carry a short video when the sound is off. Here's how to pick fonts that read
            instantly on a phone, and the free pairings I use in my own explainers.
          </p>
        </a>
        <a
          className={"os-shell block p-5 transition-transform \x68over:\x2dtranslate-y-0.\x35"}
          href="/guides/faceless-explainer-videos"
        >
          <p className={"text-[11.5px] font-medium \x74ext-[#\x66f5206]"}>
            Animations &amp; Videos
          </p>
          <p
            className={
              "mt-1.5 \x66ont-[\x66amily-name:\x76ar(\x2d-font-heading)] text-[17px] font-medium leading-snug \x74ext-[\x76ar(\x2d-text)]"
            }
          >
            How to Make Faceless Explainer Videos for Reels and TikTok
          </p>
          <p className={"mt-1.5 \x6cine-clamp-2 text-[13px] \x74ext-[\x76ar(\x2d-text-secondary)]"}>
            You don't need to be on camera to make videos that travel. My explainer shorts never
            show a face. Here's what actually makes a faceless video work, and how to make one.
          </p>
        </a>
      </div>
    </section>
  );
}

function ImportedNavMain() {
  return (
    <nav
      className={
        "fixed \x69nset-x-3 bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-30 \x6cg:\x68idden"
      }
      aria-label="Main"
    >
      <ul className="os-shell mx-auto flex max-w-md items-stretch justify-between gap-0.5 !rounded-full p-1.5">
        <li className="min-w-0 flex-1">
          <a
            className={
              "relative flex h-12 flex-col items-center justify-center gap-0.5 rounded-full text-[10px] font-medium transition-[background,color] duration-150 \x74ext-[\x76ar(\x2d-text-tertiary)]"
            }
            href="/"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              fill="currentColor"
              viewBox="0 0 256 256"
              aria-hidden="true"
            >
              <path d="M224,120v96a8,8,0,0,1-8,8H40a8,8,0,0,1-8-8V120a15.87,15.87,0,0,1,4.69-11.32l80-80a16,16,0,0,1,22.62,0l80,80A15.87,15.87,0,0,1,224,120Z" />
            </svg>
            Home
          </a>
        </li>
        <li className="min-w-0 flex-1">
          <a
            className={
              "relative flex h-12 flex-col items-center justify-center gap-0.5 rounded-full text-[10px] font-medium transition-[background,color] duration-150 \x74ext-[\x76ar(\x2d-text-tertiary)]"
            }
            href="/?collection=all"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              fill="currentColor"
              viewBox="0 0 256 256"
              aria-hidden="true"
            >
              <path d="M120,56v48a16,16,0,0,1-16,16H56a16,16,0,0,1-16-16V56A16,16,0,0,1,56,40h48A16,16,0,0,1,120,56Zm80-16H152a16,16,0,0,0-16,16v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V56A16,16,0,0,0,200,40Zm-96,96H56a16,16,0,0,0-16,16v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V152A16,16,0,0,0,104,136Zm96,0H152a16,16,0,0,0-16,16v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V152A16,16,0,0,0,200,136Z" />
            </svg>
            Templates
          </a>
        </li>
        <li className="min-w-0 flex-1">
          <a
            className={
              "relative flex h-12 flex-col items-center justify-center gap-0.5 rounded-full text-[10px] font-medium transition-[background,color] duration-150 \x74ext-[\x76ar(\x2d-text-tertiary)]"
            }
            href="/sections"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              fill="currentColor"
              viewBox="0 0 256 256"
              aria-hidden="true"
            >
              <path d="M208,144a15.78,15.78,0,0,1-10.42,14.94L146,178l-19,51.62a15.92,15.92,0,0,1-29.88,0L78,178l-51.62-19a15.92,15.92,0,0,1,0-29.88L78,110l19-51.62a15.92,15.92,0,0,1,29.88,0L146,110l51.62,19A15.78,15.78,0,0,1,208,144ZM152,48h16V64a8,8,0,0,0,16,0V48h16a8,8,0,0,0,0-16H184V16a8,8,0,0,0-16,0V32H152a8,8,0,0,0,0,16Zm88,32h-8V72a8,8,0,0,0-16,0v8h-8a8,8,0,0,0,0,16h8v8a8,8,0,0,0,16,0V96h8a8,8,0,0,0,0-16Z" />
            </svg>
            Sections
            <span
              className={
                "absolute right-[6%] top-0.5 rounded-full \x62g-[#\x657f5e1] px-1 text-[8.5px] font-semibold uppercase leading-[14px] \x74ext-[#\x31f5a33]"
              }
            >
              Free
            </span>
          </a>
        </li>
        <li className="min-w-0 flex-1">
          <a
            className={
              "relative flex h-12 flex-col items-center justify-center gap-0.5 rounded-full text-[10px] font-medium transition-[background,color] duration-150 \x74ext-[\x76ar(\x2d-text-tertiary)]"
            }
            href="/videos"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              fill="currentColor"
              viewBox="0 0 256 256"
              aria-hidden="true"
            >
              <path d="M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40ZM184,56h32V72H184ZM72,200H40V184H72ZM72,72H40V56H72Zm48,128H88V184h32Zm0-128H88V56h32Zm48,128H136V184h32Zm0-128H136V56h32Zm48,128H184V184h32v16Z" />
            </svg>
            Videos
          </a>
        </li>
        <li className="min-w-0 flex-1">
          <a
            className={
              "relative flex h-12 flex-col items-center justify-center gap-0.5 rounded-full text-[10px] font-medium transition-[background,color] duration-150 \x74ext-[\x76ar(\x2d-text-tertiary)]"
            }
            href="/pricing"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              fill="currentColor"
              viewBox="0 0 256 256"
              aria-hidden="true"
            >
              <path d="M243.31,136,144,36.69A15.86,15.86,0,0,0,132.69,32H40a8,8,0,0,0-8,8v92.69A15.86,15.86,0,0,0,36.69,144L136,243.31a16,16,0,0,0,22.63,0l84.68-84.68a16,16,0,0,0,0-22.63ZM84,96A12,12,0,1,1,96,84,12,12,0,0,1,84,96Z" />
            </svg>
            Pricing
          </a>
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
