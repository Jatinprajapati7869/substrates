import { withPublicPageHead } from "@/lib/seo";
import { useSupplyShell } from "@/lib/use-supply-shell";
import type { CSSProperties } from "react";
import { createFileRoute } from "@tanstack/react-router";
import capturedCSS from "../styles/pages/guides.claude-prompts-for-website-design.css?raw";

export const Route = createFileRoute("/guides_/claude-prompts-for-website-design")({
  head: () =>
    withPublicPageHead("/guides/claude-prompts-for-website-design", [
      {
        title:
          "12 Claude Prompts for Website Design That Don't Produce Generic Sites \u2014 Substrates",
      },
      {
        name: "description",
        content:
          "The prompt decides whether Claude designs your site or averages every site it's seen. Here are twelve prompts I'd actually use, for every stage from brief to polish.",
      },
      {
        property: "og:title",
        content:
          "12 Claude Prompts for Website Design That Don't Produce Generic Sites \u2014 Substrates",
      },
      {
        property: "og:description",
        content:
          "The prompt decides whether Claude designs your site or averages every site it's seen. Here are twelve prompts I'd actually use, for every stage from brief to polish.",
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
                      12 Claude Prompts for Website Design That Don't Produce Generic Sites
                    </span>
                  </li>
                </ol>
              </nav>
              <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_220px] lg:gap-14">
                <ImportedArticle12ClaudePromptsFor />
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
                          href="#before-you-build"
                        >
                          Before you build
                        </a>
                      </li>
                      <li>
                        <a
                          className={
                            "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
                          }
                          href="#layout-and-structure"
                        >
                          Layout and structure
                        </a>
                      </li>
                      <li>
                        <a
                          className={
                            "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
                          }
                          href="#typography-and-colour"
                        >
                          Typography and colour
                        </a>
                      </li>
                      <li>
                        <a
                          className={
                            "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
                          }
                          href="#copy"
                        >
                          Copy
                        </a>
                      </li>
                      <li>
                        <a
                          className={
                            "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
                          }
                          href="#mobile-motion-and-polish"
                        >
                          Mobile, motion and polish
                        </a>
                      </li>
                      <li>
                        <a
                          className={
                            "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
                          }
                          href="#putting-it-together"
                        >
                          Putting it together
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

function ImportedArticle12ClaudePromptsFor() {
  return (
    <article className="mx-auto w-full min-w-0 max-w-[680px]">
      <header>
        <p className={"text-[12.5px] font-medium \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
          <a className={"\x74ext-[#\x66f5206]"} href="/guides">
            AI &amp; Claude
          </a>{" "}
          · <time dateTime="2026-10-26T09:20:00.000Z">Oct 26, 2026</time> · 4 min read
        </p>
        <h1
          className={
            "mt-3 \x66ont-[\x66amily-name:\x76ar(\x2d-font-heading)] text-[34px] font-medium leading-[1.08] tracking-[-0.03em] \x74ext-[\x76ar(\x2d-text)] \x73m:\x74ext-[\x346px]"
          }
        >
          12 Claude Prompts for Website Design That Don't Produce Generic Sites
        </h1>
        <p className={"mt-4 text-[17px] leading-relaxed \x74ext-[\x76ar(\x2d-text-secondary)]"}>
          The prompt decides whether Claude designs your site or averages every site it's seen. Here
          are twelve prompts I'd actually use, for every stage from brief to polish.
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
            Claude is very good at building websites. Left to guess, it's also very good at building
            the same website over and over. The fix is almost never a "magic" prompt. It's giving
            Claude the decisions a designer would make, one stage at a time.
          </p>
          <p>
            These twelve prompts cover the whole process. They work in Claude chat and in Claude
            Code; swap the bracketed parts for your own project.
          </p>
          <h2 className="[scroll-margin-top:90px]" id="before-you-build">
            Before you build
          </h2>
          <h3 className="[scroll-margin-top:90px]" id="1-get-claude-to-ask-before-it-builds">
            1. Get Claude to ask before it builds
          </h3>
          <pre className="[overflow-x:auto] [word-break:break-word]">
            <code>
              I want to build [a website for X]. Before writing any code, ask me up to 8 questions
              about the audience, goal, pages, content and the look I want. Wait for my answers.
            </code>
          </pre>
          <p>
            <strong className={"font-semibold \x74ext-[\x76ar(\x2d-text)]"}>Why it works:</strong>{" "}
            most generic sites come from missing information. Making Claude ask first fills the gaps
            with your answers instead of its defaults.
          </p>
          <h3 className="[scroll-margin-top:90px]" id="2-turn-your-answers-into-a-brief">
            2. Turn your answers into a brief
          </h3>
          <pre className="[overflow-x:auto] [word-break:break-word]">
            <code>
              Turn my answers into a one-page brief: goal, audience, the single action visitors
              should take, the page list, and the sections of the homepage in order. Keep it short.
              We'll build from this.
            </code>
          </pre>
          <p>
            <strong className={"font-semibold \x74ext-[\x76ar(\x2d-text)]"}>Why it works:</strong> a
            written brief keeps every later prompt consistent, and you can paste it into a new chat
            at any time.
          </p>
          <h2 className="[scroll-margin-top:90px]" id="layout-and-structure">
            Layout and structure
          </h2>
          <h3 className="[scroll-margin-top:90px]" id="3-start-from-a-reference">
            3. Start from a reference
          </h3>
          <pre className="[overflow-x:auto] [word-break:break-word]">
            <code>
              Use this section as the reference for layout, spacing and type: [paste a section
              prompt or describe a site precisely]. Adapt it to my brief. Keep the structure, change
              the content.
            </code>
          </pre>
          <p>
            <strong className={"font-semibold \x74ext-[\x76ar(\x2d-text)]"}>Why it works:</strong> a
            concrete reference replaces vague words like "modern". Every section on{" "}
            <a
              className={
                "font-medium \x74ext-[\x76ar(\x2d-text)] underline \x64ecoration-black/\x325 \x75nderline-offset-[\x33px] transition-colors \x68over:\x64ecoration-black/\x370"
              }
              href="/sections"
            >
              Substrates's sections page
            </a>{" "}
            can be copied as a prompt like this.
          </p>
          <h3 className="[scroll-margin-top:90px]" id="4-build-one-section-at-a-time">
            4. Build one section at a time
          </h3>
          <pre className="[overflow-x:auto] [word-break:break-word]">
            <code>
              Build only the hero section from the brief. Use my copy exactly. Stop when it's done
              so I can review it before the next section.
            </code>
          </pre>
          <p>
            <strong className={"font-semibold \x74ext-[\x76ar(\x2d-text)]"}>Why it works:</strong>{" "}
            you review each part while it's small, and problems don't spread across the whole page.
          </p>
          <h3 className="[scroll-margin-top:90px]" id="5-break-the-symmetry">
            5. Break the symmetry
          </h3>
          <pre className="[overflow-x:auto] [word-break:break-word]">
            <code>
              Make the features section asymmetric: one large item and two small ones, not three
              equal cards. Left-align the text.
            </code>
          </pre>
          <p>
            <strong className={"font-semibold \x74ext-[\x76ar(\x2d-text)]"}>Why it works:</strong>{" "}
            three equal cards in a row is the most recognisable AI-generated layout. One deliberate
            change makes the page feel designed.
          </p>
          <h2 className="[scroll-margin-top:90px]" id="typography-and-colour">
            Typography and colour
          </h2>
          <h3 className="[scroll-margin-top:90px]" id="6-set-a-type-scale">
            6. Set a type scale
          </h3>
          <pre className="[overflow-x:auto] [word-break:break-word]">
            <code>
              Typography: [heading font] for headings, [body font] for body. Headline 64px desktop /
              40px mobile, tight letter-spacing (-0.03em). Body 17px, line-height 1.6. Use no more
              than four font sizes.
            </code>
          </pre>
          <p>
            <strong className={"font-semibold \x74ext-[\x76ar(\x2d-text)]"}>Why it works:</strong>{" "}
            strong contrast between headline and body is what makes a page look intentional.
            Limiting the sizes keeps it clean.
          </p>
          <h3 className="[scroll-margin-top:90px]" id="7-restrain-the-colour">
            7. Restrain the colour
          </h3>
          <pre className="[overflow-x:auto] [word-break:break-word]">
            <code>
              Palette: warm off-white background, near-black text, two greys for secondary text and
              borders. One accent colour, [colour], used only for the main button and one highlight
              per section. No gradients.
            </code>
          </pre>
          <p>
            <strong className={"font-semibold \x74ext-[\x76ar(\x2d-text)]"}>Why it works:</strong>{" "}
            generic sites spread colour everywhere. One accent, used rarely, looks confident.
          </p>
          <h2 className="[scroll-margin-top:90px]" id="copy">
            Copy
          </h2>
          <h3 className="[scroll-margin-top:90px]" id="8-ban-invented-content">
            8. Ban invented content
          </h3>
          <pre className="[overflow-x:auto] [word-break:break-word]">
            <code>
              Use only the copy I give you. Do not add statistics, testimonials, client logos,
              awards or claims that aren't in my brief. If a section needs content I haven't
              provided, leave a clear placeholder.
            </code>
          </pre>
          <p>
            <strong className={"font-semibold \x74ext-[\x76ar(\x2d-text)]"}>Why it works:</strong>{" "}
            AI loves filler like "Trusted by 10,000+ teams". Fake proof hurts trust and can mislead
            people, so rule it out up front.
          </p>
          <h3 className="[scroll-margin-top:90px]" id="9-tighten-the-headline">
            9. Tighten the headline
          </h3>
          <pre className="[overflow-x:auto] [word-break:break-word]">
            <code>
              Give me 5 alternative headlines for the hero, each under 8 words, in plain language a
              customer would use. No buzzwords.
            </code>
          </pre>
          <p>
            <strong className={"font-semibold \x74ext-[\x76ar(\x2d-text)]"}>Why it works:</strong>{" "}
            short, specific headlines beat clever ones. Asking for options lets you pick instead of
            settling.
          </p>
          <h2 className="[scroll-margin-top:90px]" id="mobile-motion-and-polish">
            Mobile, motion and polish
          </h2>
          <h3 className="[scroll-margin-top:90px]" id="10-check-mobile-properly">
            10. Check mobile properly
          </h3>
          <pre className="[overflow-x:auto] [word-break:break-word]">
            <code>
              Check every section at 375px wide. Nothing may scroll sideways, text must be at least
              16px, and buttons at least 44px tall. List what you changed.
            </code>
          </pre>
          <p>
            <strong className={"font-semibold \x74ext-[\x76ar(\x2d-text)]"}>Why it works:</strong>{" "}
            "make it responsive" is vague; specific numbers give Claude something to test against.
          </p>
          <h3 className="[scroll-margin-top:90px]" id="11-add-motion-with-restraint">
            11. Add motion with restraint
          </h3>
          <pre className="[overflow-x:auto] [word-break:break-word]">
            <code>
              Add subtle entrance animations: elements fade in and move up 12px, 450ms, ease-out,
              staggered 70ms. Exits faster than entrances. Disable all of it when the user prefers
              reduced motion.
            </code>
          </pre>
          <p>
            <strong className={"font-semibold \x74ext-[\x76ar(\x2d-text)]"}>Why it works:</strong>{" "}
            specific timing and easing is what separates designed motion from default fades. For
            more, see{" "}
            <a
              className={
                "font-medium \x74ext-[\x76ar(\x2d-text)] underline \x64ecoration-black/\x325 \x75nderline-offset-[\x33px] transition-colors \x68over:\x64ecoration-black/\x370"
              }
              href="/guides/claude-animation-prompts"
            >
              10 Claude animation prompts
            </a>
            .
          </p>
          <h3 className="[scroll-margin-top:90px]" id="12-run-a-final-review">
            12. Run a final review
          </h3>
          <pre className="[overflow-x:auto] [word-break:break-word]">
            <code>
              Review the page like a senior designer. List the 5 biggest issues with hierarchy,
              spacing, contrast and consistency, then fix them.
            </code>
          </pre>
          <p>
            <strong className={"font-semibold \x74ext-[\x76ar(\x2d-text)]"}>Why it works:</strong>{" "}
            Claude is often better at critiquing than at getting everything right first time. A
            review pass catches what you've stopped seeing.
          </p>
          <h2 className="[scroll-margin-top:90px]" id="putting-it-together">
            Putting it together
          </h2>
          <p>
            Use 1–2 to plan, 3–5 to structure, 6–9 to style and write, and 10–12 to finish. For the
            bigger picture on why AI sites look alike, see{" "}
            <a
              className={
                "font-medium \x74ext-[\x76ar(\x2d-text)] underline \x64ecoration-black/\x325 \x75nderline-offset-[\x33px] transition-colors \x68over:\x64ecoration-black/\x370"
              }
              href="/guides/ai-generated-websites-less-generic"
            >
              how to make AI-generated websites look less generic
            </a>
            , and for comparing tools,{" "}
            <a
              className={
                "font-medium \x74ext-[\x76ar(\x2d-text)] underline \x64ecoration-black/\x325 \x75nderline-offset-[\x33px] transition-colors \x68over:\x64ecoration-black/\x370"
              }
              href="https://substrates.app/post/claude-vs-lovable-vs-cursor-vs-v0-interactive-ui-components"
              rel="noopener noreferrer"
              target="_blank"
            >
              Claude vs Lovable vs Cursor vs v0
            </a>
            .
          </p>
        </div>
      </div>
      <aside
        className="os-dark relative mt-16 overflow-hidden !rounded-[var(--r-shell)] p-7 sm:p-10"
        aria-label={"Sections for Claude, Cursor & v0"}
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
          Sections for Claude, Cursor &amp; v0
        </p>
        <p
          className={
            "relative mt-3 \x66ont-[\x66amily-name:\x76ar(\x2d-font-heading)] text-[28px] font-medium leading-[1.1] tracking-[-0.02em] text-white \x73m:\x74ext-[\x334px]"
          }
        >
          Borrow a section that already works.
          <br />
          <span className={"\x74ext-white/\x350"}>Copy it as one prompt.</span>
        </p>
        <p className={"relative mt-3 max-w-md text-[14.5px] leading-relaxed \x74ext-white/\x365"}>
          Heroes, pricing blocks, features and more, each copyable as a single prompt you drop into
          your own project. Many are free.
        </p>
        <div
          className={"relative mt-7 flex flex-col gap-2.5 \x73m:\x66lex-row \x73m:\x69tems-center"}
        >
          <a
            className={
              "flex h-12 items-center justify-center gap-2 rounded-full bg-white px-6 text-[14.5px] font-semibold text-black transition-transform \x61ctive:\x73cale-[\x30.\x398]"
            }
            href="/sections"
          >
            Browse the sections{" "}
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
            href="/templates"
          >
            See full templates
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
          href="/guides/figma-to-code-with-claude"
        >
          <p className={"text-[11.5px] font-medium \x74ext-[#\x66f5206]"}>AI &amp; Claude</p>
          <p
            className={
              "mt-1.5 \x66ont-[\x66amily-name:\x76ar(\x2d-font-heading)] text-[17px] font-medium leading-snug \x74ext-[\x76ar(\x2d-text)]"
            }
          >
            How to Turn a Figma Design Into Code With Claude
          </p>
          <p className={"mt-1.5 \x6cine-clamp-2 text-[13px] \x74ext-[\x76ar(\x2d-text-secondary)]"}>
            You designed it in Figma. Now you want it as real, working code. Here are three ways to
            get there with Claude, from a quick screenshot to a direct Figma connection.
          </p>
        </a>
        <a
          className={"os-shell block p-5 transition-transform \x68over:\x2dtranslate-y-0.\x35"}
          href="/guides/build-a-website-with-claude-code"
        >
          <p className={"text-[11.5px] font-medium \x74ext-[#\x66f5206]"}>AI &amp; Claude</p>
          <p
            className={
              "mt-1.5 \x66ont-[\x66amily-name:\x76ar(\x2d-font-heading)] text-[17px] font-medium leading-snug \x74ext-[\x76ar(\x2d-text)]"
            }
          >
            How to Build a Website With Claude Code (That Doesn't Look AI-Made)
          </p>
          <p className={"mt-1.5 \x6cine-clamp-2 text-[13px] \x74ext-[\x76ar(\x2d-text-secondary)]"}>
            "Build me a website" gets you the same site everyone gets. Here's the process I'd use
            instead: plan, pick a reference, build one section at a time, then ship it.
          </p>
        </a>
        <a
          className={"os-shell block p-5 transition-transform \x68over:\x2dtranslate-y-0.\x35"}
          href="/guides/how-to-create-a-claude-skill"
        >
          <p className={"text-[11.5px] font-medium \x74ext-[#\x66f5206]"}>AI &amp; Claude</p>
          <p
            className={
              "mt-1.5 \x66ont-[\x66amily-name:\x76ar(\x2d-font-heading)] text-[17px] font-medium leading-snug \x74ext-[\x76ar(\x2d-text)]"
            }
          >
            How to Create a Claude Skill: SKILL.md Explained With a Real Example
          </p>
          <p className={"mt-1.5 \x6cine-clamp-2 text-[13px] \x74ext-[\x76ar(\x2d-text-secondary)]"}>
            Most skills that "don't work" have one problem: a vague description. Here's how to write
            a SKILL.md Claude actually uses, with a complete example you can copy.
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
