import { withPublicPageHead } from "@/lib/seo";
import { CatalogBrowser } from "@/components/CatalogBrowser";
import {
  TemplatesPageTitleCount,
  SidebarSectionCount,
  SidebarTemplateCount,
} from "@/components/marketing/TemplatesPublicCopy";
import { useSupplyShell } from "@/lib/use-supply-shell";
import type { CSSProperties } from "react";
import { createFileRoute } from "@tanstack/react-router";
import capturedCSS from "../styles/pages/templates.css?raw";

export const Route = createFileRoute("/templates")({
  head: () =>
    withPublicPageHead("/templates", [
      { title: "All Webflow \u0026 Framer Website Templates — Substrates" },
      {
        name: "description",
        content: "Browse Webflow and Framer website templates from the Substrates catalog.",
      },
      { property: "og:title", content: "All Webflow \u0026 Framer Website Templates — Substrates" },
      {
        property: "og:description",
        content: "Browse Webflow and Framer website templates from the Substrates catalog.",
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
            <div
              className={
                "mx-auto max-w-6xl \x73pace-y-8 px-4 pb-20 pt-[72px] sm:px-6 lg:px-8 lg:pt-8"
              }
            >
              <CatalogBrowser kind="template" />
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
                    <span className={"\x74ext-[\x76ar(\x2d-text-secondary)]"} aria-current="page">
                      Templates
                    </span>
                  </li>
                </ol>
              </nav>
              <header className="px-1">
                <h1
                  className={
                    "\x66ont-[\x66amily-name:\x76ar(\x2d-font-heading)] text-[32px] font-medium leading-[1.05] tracking-tight \x73m:\x74ext-[\x344px]"
                  }
                >
                  <TemplatesPageTitleCount />{" "}
                  <span className={"\x74ext-[\x76ar(\x2d-text)]"}>
                    Webflow &amp; Framer templates
                  </span>
                </h1>
                <p
                  className={
                    "mt-3 max-w-2xl text-[14px] leading-relaxed \x74ext-[\x76ar(\x2d-text-secondary)]"
                  }
                >
                  Every template designed and built by Substrates, grouped by category. Open any one
                  for its details, or browse them all with live previews in the catalog.
                </p>
                <a
                  className={
                    "os-button relative inline-flex select-none items-center justify-center gap-2 rounded-full font-medium transition-[transform,box-shadow,filter,background-color] duration-150 ease-out \x64isabled:\x63ursor-not-allowed disabled:opacity-45 h-12 px-6 text-[14px] os-spark text-white mt-6 w-full sm:w-auto"
                  }
                  style={
                    {
                      backgroundImage:
                        "linear-gradient(rgb(46, 46, 46) 0%, rgb(26, 26, 26) 50%, rgb(14, 14, 14) 100%)",
                      boxShadow:
                        "rgba(255, 255, 255, 0.14) 0px 1px 0px inset, rgba(0, 0, 0, 0.5) 0px -1px 0px inset, rgba(0, 0, 0, 0.22) 0px 1px 2px, rgba(0, 0, 0, 0.5) 0px 10px 22px -10px, rgba(255, 82, 6, 0.55) 0px 8px 18px -12px",
                    } as CSSProperties
                  }
                  href="/?collection=all"
                >
                  Browse with live previews
                </a>
              </header>
              <div
                className={"\x63olumns-1 gap-4 \x73pace-y-4 \x6dd:\x63olumns-2 \x78l:\x63olumns-3"}
              >
                <ImportedSectionTechnology />
                <ImportedSectionPortfolioAgency />
                <ImportedSectionWellness />
                <ImportedSectionProfessionalServices />
                <ImportedSectionRetailECommerce />
                <section className="os-shell break-inside-avoid p-6">
                  <h2
                    className={
                      "\x66ont-[\x66amily-name:\x76ar(\x2d-font-heading)] text-[18px] font-medium tracking-tight \x74ext-[\x76ar(\x2d-text)]"
                    }
                  >
                    Architecture &amp; Design
                  </h2>
                  <div className="mt-4">
                    <h3 className="label">Architecture</h3>
                    <ul className={"mt-2 \x73pace-y-1.\x35"}>
                      <li className="flex items-baseline justify-between gap-3 text-[13px]">
                        <a
                          className={
                            "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
                          }
                          href="/templates/architectura-architecture"
                        >
                          Architectura
                        </a>
                        <span
                          className={"shrink-0 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}
                        >
                          Webflow
                        </span>
                      </li>
                      <li className="flex items-baseline justify-between gap-3 text-[13px]">
                        <a
                          className={
                            "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
                          }
                          href="/templates/blueprint"
                        >
                          Blue-print
                        </a>
                        <span
                          className={"shrink-0 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}
                        >
                          Webflow
                        </span>
                      </li>
                      <li className="flex items-baseline justify-between gap-3 text-[13px]">
                        <a
                          className={
                            "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
                          }
                          href="/templates/daylight"
                        >
                          Daylight
                        </a>
                        <span
                          className={"shrink-0 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}
                        >
                          Webflow &amp; Framer
                        </span>
                      </li>
                      <li className="flex items-baseline justify-between gap-3 text-[13px]">
                        <a
                          className={
                            "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
                          }
                          href="/templates/mosby"
                        >
                          Mosby
                        </a>
                        <span
                          className={"shrink-0 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}
                        >
                          Webflow
                        </span>
                      </li>
                    </ul>
                  </div>
                </section>
                <section className="os-shell break-inside-avoid p-6">
                  <h2
                    className={
                      "\x66ont-[\x66amily-name:\x76ar(\x2d-font-heading)] text-[18px] font-medium tracking-tight \x74ext-[\x76ar(\x2d-text)]"
                    }
                  >
                    Travel
                  </h2>
                  <div className="mt-4">
                    <h3 className="label">Hotels &amp; Lodging</h3>
                    <ul className={"mt-2 \x73pace-y-1.\x35"}>
                      <li className="flex items-baseline justify-between gap-3 text-[13px]">
                        <a
                          className={
                            "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
                          }
                          href="/templates/coastal"
                        >
                          Coastal
                        </a>
                        <span
                          className={"shrink-0 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}
                        >
                          Webflow
                        </span>
                      </li>
                      <li className="flex items-baseline justify-between gap-3 text-[13px]">
                        <a
                          className={
                            "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
                          }
                          href="/templates/scarlet"
                        >
                          Scarlet
                        </a>
                        <span
                          className={"shrink-0 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}
                        >
                          Webflow
                        </span>
                      </li>
                      <li className="flex items-baseline justify-between gap-3 text-[13px]">
                        <a
                          className={
                            "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
                          }
                          href="/templates/skyline"
                        >
                          Skyline Hotels
                        </a>
                        <span
                          className={"shrink-0 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}
                        >
                          Webflow
                        </span>
                      </li>
                    </ul>
                  </div>
                </section>
                <section className="os-shell break-inside-avoid p-6">
                  <h2
                    className={
                      "\x66ont-[\x66amily-name:\x76ar(\x2d-font-heading)] text-[18px] font-medium tracking-tight \x74ext-[\x76ar(\x2d-text)]"
                    }
                  >
                    Launch &amp; Coming Soon
                  </h2>
                  <div className="mt-4">
                    <h3 className="label">Waitlist</h3>
                    <ul className={"mt-2 \x73pace-y-1.\x35"}>
                      <li className="flex items-baseline justify-between gap-3 text-[13px]">
                        <a
                          className={
                            "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
                          }
                          href="/templates/queue"
                        >
                          Queue
                        </a>
                        <span
                          className={"shrink-0 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}
                        >
                          Framer
                        </span>
                      </li>
                      <li className="flex items-baseline justify-between gap-3 text-[13px]">
                        <a
                          className={
                            "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
                          }
                          href="/templates/waiting"
                        >
                          Waiting
                        </a>
                        <span
                          className={"shrink-0 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}
                        >
                          Webflow
                        </span>
                      </li>
                    </ul>
                  </div>
                </section>
                <section className="os-shell break-inside-avoid p-6">
                  <h2
                    className={
                      "\x66ont-[\x66amily-name:\x76ar(\x2d-font-heading)] text-[18px] font-medium tracking-tight \x74ext-[\x76ar(\x2d-text)]"
                    }
                  >
                    Arts &amp; Entertainment
                  </h2>
                  <div className="mt-4">
                    <h3 className="label">Gaming</h3>
                    <ul className={"mt-2 \x73pace-y-1.\x35"}>
                      <li className="flex items-baseline justify-between gap-3 text-[13px]">
                        <a
                          className={
                            "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
                          }
                          href="/templates/sekiro-game"
                        >
                          Sekiro
                        </a>
                        <span
                          className={"shrink-0 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}
                        >
                          Webflow
                        </span>
                      </li>
                    </ul>
                  </div>
                </section>
                <section className="os-shell break-inside-avoid p-6">
                  <h2
                    className={
                      "\x66ont-[\x66amily-name:\x76ar(\x2d-font-heading)] text-[18px] font-medium tracking-tight \x74ext-[\x76ar(\x2d-text)]"
                    }
                  >
                    Blog &amp; Editorial
                  </h2>
                  <div className="mt-4">
                    <h3 className="label">Business &amp; Finance Blog</h3>
                    <ul className={"mt-2 \x73pace-y-1.\x35"}>
                      <li className="flex items-baseline justify-between gap-3 text-[13px]">
                        <a
                          className={
                            "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
                          }
                          href="/templates/protocol"
                        >
                          Protocol
                        </a>
                        <span
                          className={"shrink-0 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}
                        >
                          Webflow
                        </span>
                      </li>
                    </ul>
                  </div>
                </section>
                <section className="os-shell break-inside-avoid p-6">
                  <h2
                    className={
                      "\x66ont-[\x66amily-name:\x76ar(\x2d-font-heading)] text-[18px] font-medium tracking-tight \x74ext-[\x76ar(\x2d-text)]"
                    }
                  >
                    Education
                  </h2>
                  <div className="mt-4">
                    <h3 className="label">Schools</h3>
                    <ul className={"mt-2 \x73pace-y-1.\x35"}>
                      <li className="flex items-baseline justify-between gap-3 text-[13px]">
                        <a
                          className={
                            "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
                          }
                          href="/templates/giggle"
                        >
                          Giggle
                        </a>
                        <span
                          className={"shrink-0 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}
                        >
                          Webflow
                        </span>
                      </li>
                    </ul>
                  </div>
                </section>
              </div>
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
              <SidebarTemplateCount />
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
              <SidebarSectionCount />
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
                "group mx-2 flex items-center gap-2.5 rounded-[12px] px-2.5 py-[7px] text-[13px] transition-[background-color,color,box-shadow] duration-150 \x74ext-[\x76ar(\x2d-text-secondary)] \x68over:\x62g-black/[\x30.\x3035] \x68over:\x74ext-[\x76ar(\x2d-text)]"
              }
              href="/guides"
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
              <SidebarTemplateCount />
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

function ImportedSectionTechnology() {
  return (
    <section className="os-shell break-inside-avoid p-6">
      <h2
        className={
          "\x66ont-[\x66amily-name:\x76ar(\x2d-font-heading)] text-[18px] font-medium tracking-tight \x74ext-[\x76ar(\x2d-text)]"
        }
      >
        Technology
      </h2>
      <div className="mt-4">
        <h3 className="label">Software &amp; SaaS</h3>
        <ul className={"mt-2 \x73pace-y-1.\x35"}>
          <li className="flex items-baseline justify-between gap-3 text-[13px]">
            <a
              className={
                "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
              }
              href="/templates/array"
            >
              Array
            </a>
            <span className={"shrink-0 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
              Webflow
            </span>
          </li>
          <li className="flex items-baseline justify-between gap-3 text-[13px]">
            <a
              className={
                "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
              }
              href="/templates/ascend"
            >
              Ascend
            </a>
            <span className={"shrink-0 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
              Webflow
            </span>
          </li>
          <li className="flex items-baseline justify-between gap-3 text-[13px]">
            <a
              className={
                "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
              }
              href="/templates/bluehours"
            >
              BlueHours
            </a>
            <span className={"shrink-0 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
              Webflow
            </span>
          </li>
          <li className="flex items-baseline justify-between gap-3 text-[13px]">
            <a
              className={
                "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
              }
              href="/templates/blues"
            >
              Blues
            </a>
            <span className={"shrink-0 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
              Webflow
            </span>
          </li>
          <li className="flex items-baseline justify-between gap-3 text-[13px]">
            <a
              className={
                "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
              }
              href="/templates/blured"
            >
              Blured
            </a>
            <span className={"shrink-0 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
              Webflow
            </span>
          </li>
          <li className="flex items-baseline justify-between gap-3 text-[13px]">
            <a
              className={
                "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
              }
              href="/templates/branch-saas"
            >
              Branch
            </a>
            <span className={"shrink-0 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
              Webflow
            </span>
          </li>
          <li className="flex items-baseline justify-between gap-3 text-[13px]">
            <a
              className={
                "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
              }
              href="/templates/bubblegum"
            >
              Bubblegum
            </a>
            <span className={"shrink-0 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
              Webflow
            </span>
          </li>
          <li className="flex items-baseline justify-between gap-3 text-[13px]">
            <a
              className={
                "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
              }
              href="/templates/capra-saas"
            >
              Capra
            </a>
            <span className={"shrink-0 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
              Webflow
            </span>
          </li>
          <li className="flex items-baseline justify-between gap-3 text-[13px]">
            <a
              className={
                "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
              }
              href="/templates/chapter"
            >
              Chapter
            </a>
            <span className={"shrink-0 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
              Webflow
            </span>
          </li>
          <li className="flex items-baseline justify-between gap-3 text-[13px]">
            <a
              className={
                "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
              }
              href="/templates/colourless-saas"
            >
              Colourless
            </a>
            <span className={"shrink-0 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
              Webflow
            </span>
          </li>
          <li className="flex items-baseline justify-between gap-3 text-[13px]">
            <a
              className={
                "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
              }
              href="/templates/command"
            >
              Command
            </a>
            <span className={"shrink-0 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
              Webflow
            </span>
          </li>
          <li className="flex items-baseline justify-between gap-3 text-[13px]">
            <a
              className={
                "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
              }
              href="/templates/commit"
            >
              Commit
            </a>
            <span className={"shrink-0 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
              Webflow
            </span>
          </li>
          <li className="flex items-baseline justify-between gap-3 text-[13px]">
            <a
              className={
                "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
              }
              href="/templates/credit-saas"
            >
              Credit
            </a>
            <span className={"shrink-0 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
              Webflow
            </span>
          </li>
          <li className="flex items-baseline justify-between gap-3 text-[13px]">
            <a
              className={
                "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
              }
              href="/templates/credix"
            >
              Credix
            </a>
            <span className={"shrink-0 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
              Webflow
            </span>
          </li>
          <li className="flex items-baseline justify-between gap-3 text-[13px]">
            <a
              className={
                "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
              }
              href="/templates/datadash-technology"
            >
              DataDash
            </a>
            <span className={"shrink-0 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
              Webflow
            </span>
          </li>
          <li className="flex items-baseline justify-between gap-3 text-[13px]">
            <a
              className={
                "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
              }
              href="/templates/dimmer"
            >
              Dimmer
            </a>
            <span className={"shrink-0 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
              Webflow
            </span>
          </li>
          <li className="flex items-baseline justify-between gap-3 text-[13px]">
            <a
              className={
                "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
              }
              href="/templates/drow-app"
            >
              Drow
            </a>
            <span className={"shrink-0 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
              Webflow
            </span>
          </li>
          <li className="flex items-baseline justify-between gap-3 text-[13px]">
            <a
              className={
                "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
              }
              href="/templates/ecliptic"
            >
              Ecliptic
            </a>
            <span className={"shrink-0 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
              Webflow
            </span>
          </li>
          <li className="flex items-baseline justify-between gap-3 text-[13px]">
            <a
              className={
                "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
              }
              href="/templates/ethereal-saas"
            >
              Ethereal
            </a>
            <span className={"shrink-0 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
              Webflow
            </span>
          </li>
          <li className="flex items-baseline justify-between gap-3 text-[13px]">
            <a
              className={
                "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
              }
              href="/templates/evergrid"
            >
              Evergrid
            </a>
            <span className={"shrink-0 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
              Webflow
            </span>
          </li>
          <li className="flex items-baseline justify-between gap-3 text-[13px]">
            <a
              className={
                "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
              }
              href="/templates/fastest"
            >
              Fastest
            </a>
            <span className={"shrink-0 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
              Webflow
            </span>
          </li>
          <li className="flex items-baseline justify-between gap-3 text-[13px]">
            <a
              className={
                "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
              }
              href="/templates/feathers"
            >
              Feathers
            </a>
            <span className={"shrink-0 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
              Webflow
            </span>
          </li>
          <li className="flex items-baseline justify-between gap-3 text-[13px]">
            <a
              className={
                "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
              }
              href="/templates/flagship"
            >
              Flagship
            </a>
            <span className={"shrink-0 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
              Webflow
            </span>
          </li>
          <li className="flex items-baseline justify-between gap-3 text-[13px]">
            <a
              className={
                "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
              }
              href="/templates/frost-app"
            >
              Frost
            </a>
            <span className={"shrink-0 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
              Webflow
            </span>
          </li>
          <li className="flex items-baseline justify-between gap-3 text-[13px]">
            <a
              className={
                "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
              }
              href="/templates/greenday-saas"
            >
              Greenday
            </a>
            <span className={"shrink-0 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
              Webflow
            </span>
          </li>
          <li className="flex items-baseline justify-between gap-3 text-[13px]">
            <a
              className={
                "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
              }
              href="/templates/hedwig-bank"
            >
              Hedwig
            </a>
            <span className={"shrink-0 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
              Webflow
            </span>
          </li>
          <li className="flex items-baseline justify-between gap-3 text-[13px]">
            <a
              className={
                "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
              }
              href="/templates/illusion"
            >
              Illusion
            </a>
            <span className={"shrink-0 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
              Webflow
            </span>
          </li>
          <li className="flex items-baseline justify-between gap-3 text-[13px]">
            <a
              className={
                "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
              }
              href="/templates/inkbank"
            >
              InkBank
            </a>
            <span className={"shrink-0 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
              Webflow
            </span>
          </li>
          <li className="flex items-baseline justify-between gap-3 text-[13px]">
            <a
              className={
                "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
              }
              href="/templates/kiwi-saas"
            >
              Kiwi
            </a>
            <span className={"shrink-0 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
              Webflow
            </span>
          </li>
          <li className="flex items-baseline justify-between gap-3 text-[13px]">
            <a
              className={
                "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
              }
              href="/templates/large"
            >
              Large
            </a>
            <span className={"shrink-0 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
              Webflow
            </span>
          </li>
          <li className="flex items-baseline justify-between gap-3 text-[13px]">
            <a
              className={
                "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
              }
              href="/templates/lithium-saas"
            >
              Lithium
            </a>
            <span className={"shrink-0 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
              Webflow
            </span>
          </li>
          <li className="flex items-baseline justify-between gap-3 text-[13px]">
            <a
              className={
                "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
              }
              href="/templates/magnetix"
            >
              Magnetix
            </a>
            <span className={"shrink-0 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
              Webflow
            </span>
          </li>
          <li className="flex items-baseline justify-between gap-3 text-[13px]">
            <a
              className={
                "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
              }
              href="/templates/manual"
            >
              Manual
            </a>
            <span className={"shrink-0 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
              Webflow
            </span>
          </li>
          <li className="flex items-baseline justify-between gap-3 text-[13px]">
            <a
              className={
                "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
              }
              href="/templates/messenger"
            >
              Messenger
            </a>
            <span className={"shrink-0 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
              Webflow
            </span>
          </li>
          <li className="flex items-baseline justify-between gap-3 text-[13px]">
            <a
              className={
                "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
              }
              href="/templates/midway-app"
            >
              Midway
            </a>
            <span className={"shrink-0 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
              Webflow
            </span>
          </li>
          <li className="flex items-baseline justify-between gap-3 text-[13px]">
            <a
              className={
                "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
              }
              href="/templates/northern"
            >
              Northern
            </a>
            <span className={"shrink-0 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
              Webflow
            </span>
          </li>
          <li className="flex items-baseline justify-between gap-3 text-[13px]">
            <a
              className={
                "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
              }
              href="/templates/noted-app"
            >
              Noted
            </a>
            <span className={"shrink-0 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
              Webflow
            </span>
          </li>
          <li className="flex items-baseline justify-between gap-3 text-[13px]">
            <a
              className={
                "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
              }
              href="/templates/notify-app"
            >
              Notify
            </a>
            <span className={"shrink-0 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
              Webflow
            </span>
          </li>
          <li className="flex items-baseline justify-between gap-3 text-[13px]">
            <a
              className={
                "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
              }
              href="/templates/notifypro-app"
            >
              NotifyPro
            </a>
            <span className={"shrink-0 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
              Webflow
            </span>
          </li>
          <li className="flex items-baseline justify-between gap-3 text-[13px]">
            <a
              className={
                "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
              }
              href="/templates/nullify"
            >
              Nullify
            </a>
            <span className={"shrink-0 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
              Webflow
            </span>
          </li>
          <li className="flex items-baseline justify-between gap-3 text-[13px]">
            <a
              className={
                "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
              }
              href="/templates/object"
            >
              Object
            </a>
            <span className={"shrink-0 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
              Webflow
            </span>
          </li>
          <li className="flex items-baseline justify-between gap-3 text-[13px]">
            <a
              className={
                "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
              }
              href="/templates/optify-saas"
            >
              Optify
            </a>
            <span className={"shrink-0 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
              Webflow
            </span>
          </li>
          <li className="flex items-baseline justify-between gap-3 text-[13px]">
            <a
              className={
                "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
              }
              href="/templates/outside"
            >
              Outside
            </a>
            <span className={"shrink-0 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
              Webflow &amp; Framer
            </span>
          </li>
          <li className="flex items-baseline justify-between gap-3 text-[13px]">
            <a
              className={
                "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
              }
              href="/templates/phases-saas"
            >
              Phases
            </a>
            <span className={"shrink-0 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
              Webflow
            </span>
          </li>
          <li className="flex items-baseline justify-between gap-3 text-[13px]">
            <a
              className={
                "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
              }
              href="/templates/photon"
            >
              Photon
            </a>
            <span className={"shrink-0 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
              Webflow
            </span>
          </li>
          <li className="flex items-baseline justify-between gap-3 text-[13px]">
            <a
              className={
                "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
              }
              href="/templates/pretty"
            >
              Pretty
            </a>
            <span className={"shrink-0 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
              Webflow &amp; Framer
            </span>
          </li>
          <li className="flex items-baseline justify-between gap-3 text-[13px]">
            <a
              className={
                "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
              }
              href="/templates/raspberry-saas"
            >
              Raspberry
            </a>
            <span className={"shrink-0 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
              Webflow
            </span>
          </li>
          <li className="flex items-baseline justify-between gap-3 text-[13px]">
            <a
              className={
                "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
              }
              href="/templates/redai-saas"
            >
              RedAI
            </a>
            <span className={"shrink-0 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
              Webflow
            </span>
          </li>
          <li className="flex items-baseline justify-between gap-3 text-[13px]">
            <a
              className={
                "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
              }
              href="/templates/redsun"
            >
              RedSun
            </a>
            <span className={"shrink-0 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
              Webflow
            </span>
          </li>
          <li className="flex items-baseline justify-between gap-3 text-[13px]">
            <a
              className={
                "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
              }
              href="/templates/saasmind-saas"
            >
              SaaSMind
            </a>
            <span className={"shrink-0 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
              Webflow
            </span>
          </li>
          <li className="flex items-baseline justify-between gap-3 text-[13px]">
            <a
              className={
                "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
              }
              href="/templates/saturn"
            >
              Saturns
            </a>
            <span className={"shrink-0 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
              Webflow
            </span>
          </li>
          <li className="flex items-baseline justify-between gap-3 text-[13px]">
            <a
              className={
                "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
              }
              href="/templates/silk"
            >
              Silk
            </a>
            <span className={"shrink-0 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
              Webflow
            </span>
          </li>
          <li className="flex items-baseline justify-between gap-3 text-[13px]">
            <a
              className={
                "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
              }
              href="/templates/skylinks"
            >
              Skylinks
            </a>
            <span className={"shrink-0 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
              Webflow
            </span>
          </li>
          <li className="flex items-baseline justify-between gap-3 text-[13px]">
            <a
              className={
                "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
              }
              href="/templates/sliver-saas"
            >
              Sliver
            </a>
            <span className={"shrink-0 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
              Webflow
            </span>
          </li>
          <li className="flex items-baseline justify-between gap-3 text-[13px]">
            <a
              className={
                "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
              }
              href="/templates/smarter"
            >
              Smarter
            </a>
            <span className={"shrink-0 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
              Webflow
            </span>
          </li>
          <li className="flex items-baseline justify-between gap-3 text-[13px]">
            <a
              className={
                "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
              }
              href="/templates/sonar-app"
            >
              Sonar
            </a>
            <span className={"shrink-0 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
              Webflow
            </span>
          </li>
          <li className="flex items-baseline justify-between gap-3 text-[13px]">
            <a
              className={
                "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
              }
              href="/templates/spectral"
            >
              Spectral
            </a>
            <span className={"shrink-0 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
              Webflow
            </span>
          </li>
          <li className="flex items-baseline justify-between gap-3 text-[13px]">
            <a
              className={
                "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
              }
              href="/templates/starfish-app"
            >
              Starfish
            </a>
            <span className={"shrink-0 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
              Webflow
            </span>
          </li>
          <li className="flex items-baseline justify-between gap-3 text-[13px]">
            <a
              className={
                "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
              }
              href="/templates/strike"
            >
              Strike
            </a>
            <span className={"shrink-0 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
              Webflow
            </span>
          </li>
          <li className="flex items-baseline justify-between gap-3 text-[13px]">
            <a
              className={
                "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
              }
              href="/templates/submit-app"
            >
              Submit
            </a>
            <span className={"shrink-0 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
              Webflow
            </span>
          </li>
          <li className="flex items-baseline justify-between gap-3 text-[13px]">
            <a
              className={
                "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
              }
              href="/templates/sunlight-app"
            >
              Sunlight
            </a>
            <span className={"shrink-0 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
              Webflow
            </span>
          </li>
          <li className="flex items-baseline justify-between gap-3 text-[13px]">
            <a
              className={
                "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
              }
              href="/templates/superstar-saas"
            >
              SuperStar
            </a>
            <span className={"shrink-0 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
              Webflow
            </span>
          </li>
          <li className="flex items-baseline justify-between gap-3 text-[13px]">
            <a
              className={
                "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
              }
              href="/templates/swift"
            >
              Swift
            </a>
            <span className={"shrink-0 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
              Webflow
            </span>
          </li>
          <li className="flex items-baseline justify-between gap-3 text-[13px]">
            <a
              className={
                "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
              }
              href="/templates/thread"
            >
              Thread
            </a>
            <span className={"shrink-0 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
              Webflow
            </span>
          </li>
          <li className="flex items-baseline justify-between gap-3 text-[13px]">
            <a
              className={
                "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
              }
              href="/templates/todo"
            >
              Todo
            </a>
            <span className={"shrink-0 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
              Webflow
            </span>
          </li>
          <li className="flex items-baseline justify-between gap-3 text-[13px]">
            <a
              className={
                "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
              }
              href="/templates/torii"
            >
              Torii
            </a>
            <span className={"shrink-0 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
              Webflow
            </span>
          </li>
          <li className="flex items-baseline justify-between gap-3 text-[13px]">
            <a
              className={
                "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
              }
              href="/templates/variable"
            >
              Variable
            </a>
            <span className={"shrink-0 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
              Webflow
            </span>
          </li>
          <li className="flex items-baseline justify-between gap-3 text-[13px]">
            <a
              className={
                "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
              }
              href="/templates/viavia"
            >
              ViaVia
            </a>
            <span className={"shrink-0 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
              Webflow
            </span>
          </li>
        </ul>
      </div>
      <div className="mt-4">
        <h3 className="label">Mobile App</h3>
        <ul className={"mt-2 \x73pace-y-1.\x35"}>
          <li className="flex items-baseline justify-between gap-3 text-[13px]">
            <a
              className={
                "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
              }
              href="/templates/armor"
            >
              Armor
            </a>
            <span className={"shrink-0 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
              Webflow &amp; Framer
            </span>
          </li>
          <li className="flex items-baseline justify-between gap-3 text-[13px]">
            <a
              className={
                "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
              }
              href="/templates/brave"
            >
              Brave
            </a>
            <span className={"shrink-0 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
              Webflow
            </span>
          </li>
          <li className="flex items-baseline justify-between gap-3 text-[13px]">
            <a
              className={
                "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
              }
              href="/templates/confetti"
            >
              Confettis
            </a>
            <span className={"shrink-0 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
              Webflow
            </span>
          </li>
          <li className="flex items-baseline justify-between gap-3 text-[13px]">
            <a
              className={
                "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
              }
              href="/templates/control"
            >
              Control
            </a>
            <span className={"shrink-0 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
              Webflow
            </span>
          </li>
          <li className="flex items-baseline justify-between gap-3 text-[13px]">
            <a
              className={
                "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
              }
              href="/templates/coraline"
            >
              Coraline
            </a>
            <span className={"shrink-0 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
              Webflow
            </span>
          </li>
          <li className="flex items-baseline justify-between gap-3 text-[13px]">
            <a
              className={
                "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
              }
              href="/templates/crocus"
            >
              Crocus
            </a>
            <span className={"shrink-0 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
              Webflow
            </span>
          </li>
          <li className="flex items-baseline justify-between gap-3 text-[13px]">
            <a
              className={
                "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
              }
              href="/templates/crystal"
            >
              Crystal
            </a>
            <span className={"shrink-0 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
              Webflow
            </span>
          </li>
          <li className="flex items-baseline justify-between gap-3 text-[13px]">
            <a
              className={
                "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
              }
              href="/templates/delayed"
            >
              Delayed
            </a>
            <span className={"shrink-0 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
              Webflow
            </span>
          </li>
          <li className="flex items-baseline justify-between gap-3 text-[13px]">
            <a
              className={
                "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
              }
              href="/templates/deliverdash"
            >
              DeliverDash
            </a>
            <span className={"shrink-0 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
              Webflow
            </span>
          </li>
          <li className="flex items-baseline justify-between gap-3 text-[13px]">
            <a
              className={
                "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
              }
              href="/templates/delusional"
            >
              Delusional
            </a>
            <span className={"shrink-0 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
              Webflow
            </span>
          </li>
          <li className="flex items-baseline justify-between gap-3 text-[13px]">
            <a
              className={
                "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
              }
              href="/templates/genius"
            >
              Genius
            </a>
            <span className={"shrink-0 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
              Webflow
            </span>
          </li>
          <li className="flex items-baseline justify-between gap-3 text-[13px]">
            <a
              className={
                "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
              }
              href="/templates/glossy"
            >
              Glossy
            </a>
            <span className={"shrink-0 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
              Webflow
            </span>
          </li>
          <li className="flex items-baseline justify-between gap-3 text-[13px]">
            <a
              className={
                "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
              }
              href="/templates/hazy-app"
            >
              Hazy
            </a>
            <span className={"shrink-0 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
              Webflow
            </span>
          </li>
          <li className="flex items-baseline justify-between gap-3 text-[13px]">
            <a
              className={
                "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
              }
              href="/templates/labyrinth"
            >
              Labyrinth
            </a>
            <span className={"shrink-0 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
              Webflow
            </span>
          </li>
          <li className="flex items-baseline justify-between gap-3 text-[13px]">
            <a
              className={
                "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
              }
              href="/templates/lime"
            >
              Limes
            </a>
            <span className={"shrink-0 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
              Webflow
            </span>
          </li>
          <li className="flex items-baseline justify-between gap-3 text-[13px]">
            <a
              className={
                "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
              }
              href="/templates/matte"
            >
              Matte
            </a>
            <span className={"shrink-0 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
              Webflow
            </span>
          </li>
          <li className="flex items-baseline justify-between gap-3 text-[13px]">
            <a
              className={
                "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
              }
              href="/templates/midnight"
            >
              Mid-Night
            </a>
            <span className={"shrink-0 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
              Webflow
            </span>
          </li>
          <li className="flex items-baseline justify-between gap-3 text-[13px]">
            <a
              className={
                "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
              }
              href="/templates/oreo"
            >
              Oreo AI
            </a>
            <span className={"shrink-0 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
              Webflow
            </span>
          </li>
          <li className="flex items-baseline justify-between gap-3 text-[13px]">
            <a
              className={
                "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
              }
              href="/templates/pearl"
            >
              Pearl
            </a>
            <span className={"shrink-0 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
              Webflow
            </span>
          </li>
          <li className="flex items-baseline justify-between gap-3 text-[13px]">
            <a
              className={
                "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
              }
              href="/templates/pure"
            >
              Pure
            </a>
            <span className={"shrink-0 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
              Webflow
            </span>
          </li>
          <li className="flex items-baseline justify-between gap-3 text-[13px]">
            <a
              className={
                "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
              }
              href="/templates/radiant"
            >
              Radiants
            </a>
            <span className={"shrink-0 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
              Webflow
            </span>
          </li>
          <li className="flex items-baseline justify-between gap-3 text-[13px]">
            <a
              className={
                "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
              }
              href="/templates/sharp"
            >
              Sharp
            </a>
            <span className={"shrink-0 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
              Webflow
            </span>
          </li>
          <li className="flex items-baseline justify-between gap-3 text-[13px]">
            <a
              className={
                "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
              }
              href="/templates/snooze"
            >
              Snooze
            </a>
            <span className={"shrink-0 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
              Webflow
            </span>
          </li>
          <li className="flex items-baseline justify-between gap-3 text-[13px]">
            <a
              className={
                "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
              }
              href="/templates/snowie"
            >
              Snowie
            </a>
            <span className={"shrink-0 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
              Webflow
            </span>
          </li>
          <li className="flex items-baseline justify-between gap-3 text-[13px]">
            <a
              className={
                "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
              }
              href="/templates/soundwave"
            >
              Soundwave
            </a>
            <span className={"shrink-0 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
              Webflow
            </span>
          </li>
          <li className="flex items-baseline justify-between gap-3 text-[13px]">
            <a
              className={
                "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
              }
              href="/templates/sparkle"
            >
              Sparkle
            </a>
            <span className={"shrink-0 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
              Webflow
            </span>
          </li>
          <li className="flex items-baseline justify-between gap-3 text-[13px]">
            <a
              className={
                "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
              }
              href="/templates/stars"
            >
              Stars
            </a>
            <span className={"shrink-0 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
              Webflow
            </span>
          </li>
          <li className="flex items-baseline justify-between gap-3 text-[13px]">
            <a
              className={
                "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
              }
              href="/templates/underrated"
            >
              UnderRated
            </a>
            <span className={"shrink-0 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
              Webflow
            </span>
          </li>
          <li className="flex items-baseline justify-between gap-3 text-[13px]">
            <a
              className={
                "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
              }
              href="/templates/vanta"
            >
              Vanta
            </a>
            <span className={"shrink-0 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
              Webflow
            </span>
          </li>
          <li className="flex items-baseline justify-between gap-3 text-[13px]">
            <a
              className={
                "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
              }
              href="/templates/vibe"
            >
              Vibe
            </a>
            <span className={"shrink-0 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
              Webflow
            </span>
          </li>
          <li className="flex items-baseline justify-between gap-3 text-[13px]">
            <a
              className={
                "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
              }
              href="/templates/voids"
            >
              Void
            </a>
            <span className={"shrink-0 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
              Webflow
            </span>
          </li>
          <li className="flex items-baseline justify-between gap-3 text-[13px]">
            <a
              className={
                "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
              }
              href="/templates/wisex"
            >
              WiseX
            </a>
            <span className={"shrink-0 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
              Webflow
            </span>
          </li>
        </ul>
      </div>
      <div className="mt-4">
        <h3 className="label">AI</h3>
        <ul className={"mt-2 \x73pace-y-1.\x35"}>
          <li className="flex items-baseline justify-between gap-3 text-[13px]">
            <a
              className={
                "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
              }
              href="/templates/betterai"
            >
              Better AI
            </a>
            <span className={"shrink-0 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
              Webflow
            </span>
          </li>
          <li className="flex items-baseline justify-between gap-3 text-[13px]">
            <a
              className={
                "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
              }
              href="/templates/chatty"
            >
              Chatty
            </a>
            <span className={"shrink-0 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
              Webflow
            </span>
          </li>
          <li className="flex items-baseline justify-between gap-3 text-[13px]">
            <a
              className={
                "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
              }
              href="/templates/enterprise"
            >
              EnterpriseLink
            </a>
            <span className={"shrink-0 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
              Webflow
            </span>
          </li>
          <li className="flex items-baseline justify-between gap-3 text-[13px]">
            <a
              className={
                "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
              }
              href="/templates/forgefinx"
            >
              Forge FinX
            </a>
            <span className={"shrink-0 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
              Webflow
            </span>
          </li>
          <li className="flex items-baseline justify-between gap-3 text-[13px]">
            <a
              className={
                "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
              }
              href="/templates/matte-extra"
            >
              Matte Extra
            </a>
            <span className={"shrink-0 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
              Webflow
            </span>
          </li>
          <li className="flex items-baseline justify-between gap-3 text-[13px]">
            <a
              className={
                "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
              }
              href="/templates/overcast"
            >
              Overcast
            </a>
            <span className={"shrink-0 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
              Webflow
            </span>
          </li>
          <li className="flex items-baseline justify-between gap-3 text-[13px]">
            <a
              className={
                "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
              }
              href="/templates/quiver"
            >
              Quiver
            </a>
            <span className={"shrink-0 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
              Webflow
            </span>
          </li>
        </ul>
      </div>
      <div className="mt-4">
        <h3 className="label">Blockchain, Cryptocurrency &amp; NFTs</h3>
        <ul className={"mt-2 \x73pace-y-1.\x35"}>
          <li className="flex items-baseline justify-between gap-3 text-[13px]">
            <a
              className={
                "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
              }
              href="/templates/cryptosphere"
            >
              CryptoSphere
            </a>
            <span className={"shrink-0 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
              Webflow
            </span>
          </li>
        </ul>
      </div>
    </section>
  );
}

function ImportedSectionPortfolioAgency() {
  return (
    <section className="os-shell break-inside-avoid p-6">
      <h2
        className={
          "\x66ont-[\x66amily-name:\x76ar(\x2d-font-heading)] text-[18px] font-medium tracking-tight \x74ext-[\x76ar(\x2d-text)]"
        }
      >
        Portfolio &amp; Agency
      </h2>
      <div className="mt-4">
        <h3 className="label">Design Portfolio</h3>
        <ul className={"mt-2 \x73pace-y-1.\x35"}>
          <li className="flex items-baseline justify-between gap-3 text-[13px]">
            <a
              className={
                "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
              }
              href="/templates/aerials"
            >
              Aerials
            </a>
            <span className={"shrink-0 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
              Webflow
            </span>
          </li>
          <li className="flex items-baseline justify-between gap-3 text-[13px]">
            <a
              className={
                "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
              }
              href="/templates/apocalypse"
            >
              Apocalypse
            </a>
            <span className={"shrink-0 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
              Webflow
            </span>
          </li>
          <li className="flex items-baseline justify-between gap-3 text-[13px]">
            <a
              className={
                "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
              }
              href="/templates/arata"
            >
              Arata
            </a>
            <span className={"shrink-0 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
              Webflow
            </span>
          </li>
          <li className="flex items-baseline justify-between gap-3 text-[13px]">
            <a
              className={
                "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
              }
              href="/templates/ashina"
            >
              Ashina
            </a>
            <span className={"shrink-0 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
              Webflow
            </span>
          </li>
          <li className="flex items-baseline justify-between gap-3 text-[13px]">
            <a
              className={
                "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
              }
              href="/templates/beaut"
            >
              Beauté
            </a>
            <span className={"shrink-0 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
              Webflow
            </span>
          </li>
          <li className="flex items-baseline justify-between gap-3 text-[13px]">
            <a
              className={
                "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
              }
              href="/templates/blade"
            >
              Blade
            </a>
            <span className={"shrink-0 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
              Webflow
            </span>
          </li>
          <li className="flex items-baseline justify-between gap-3 text-[13px]">
            <a
              className={
                "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
              }
              href="/templates/blury"
            >
              Blury
            </a>
            <span className={"shrink-0 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
              Webflow
            </span>
          </li>
          <li className="flex items-baseline justify-between gap-3 text-[13px]">
            <a
              className={
                "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
              }
              href="/templates/cherry"
            >
              Cherry
            </a>
            <span className={"shrink-0 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
              Framer
            </span>
          </li>
          <li className="flex items-baseline justify-between gap-3 text-[13px]">
            <a
              className={
                "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
              }
              href="/templates/click"
            >
              Click
            </a>
            <span className={"shrink-0 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
              Webflow
            </span>
          </li>
          <li className="flex items-baseline justify-between gap-3 text-[13px]">
            <a
              className={
                "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
              }
              href="/templates/easiest-portfolio"
            >
              Easiest
            </a>
            <span className={"shrink-0 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
              Webflow
            </span>
          </li>
          <li className="flex items-baseline justify-between gap-3 text-[13px]">
            <a
              className={
                "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
              }
              href="/templates/fallen"
            >
              Fallen
            </a>
            <span className={"shrink-0 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
              Webflow
            </span>
          </li>
          <li className="flex items-baseline justify-between gap-3 text-[13px]">
            <a
              className={
                "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
              }
              href="/templates/fearless"
            >
              Fearless
            </a>
            <span className={"shrink-0 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
              Webflow
            </span>
          </li>
          <li className="flex items-baseline justify-between gap-3 text-[13px]">
            <a
              className={
                "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
              }
              href="/templates/haste"
            >
              Haste
            </a>
            <span className={"shrink-0 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
              Webflow
            </span>
          </li>
          <li className="flex items-baseline justify-between gap-3 text-[13px]">
            <a
              className={
                "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
              }
              href="/templates/indigo"
            >
              Indigo
            </a>
            <span className={"shrink-0 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
              Webflow
            </span>
          </li>
          <li className="flex items-baseline justify-between gap-3 text-[13px]">
            <a
              className={
                "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
              }
              href="/templates/kuro"
            >
              Kuro
            </a>
            <span className={"shrink-0 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
              Webflow
            </span>
          </li>
          <li className="flex items-baseline justify-between gap-3 text-[13px]">
            <a
              className={
                "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
              }
              href="/templates/loading"
            >
              Loading
            </a>
            <span className={"shrink-0 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
              Webflow
            </span>
          </li>
          <li className="flex items-baseline justify-between gap-3 text-[13px]">
            <a
              className={
                "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
              }
              href="/templates/lumenis"
            >
              Lumenis
            </a>
            <span className={"shrink-0 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
              Webflow
            </span>
          </li>
          <li className="flex items-baseline justify-between gap-3 text-[13px]">
            <a
              className={
                "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
              }
              href="/templates/madeline"
            >
              Madeline
            </a>
            <span className={"shrink-0 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
              Framer
            </span>
          </li>
          <li className="flex items-baseline justify-between gap-3 text-[13px]">
            <a
              className={
                "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
              }
              href="/templates/majesty"
            >
              Majesty
            </a>
            <span className={"shrink-0 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
              Webflow
            </span>
          </li>
          <li className="flex items-baseline justify-between gap-3 text-[13px]">
            <a
              className={
                "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
              }
              href="/templates/mark"
            >
              Mark
            </a>
            <span className={"shrink-0 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
              Webflow
            </span>
          </li>
          <li className="flex items-baseline justify-between gap-3 text-[13px]">
            <a
              className={
                "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
              }
              href="/templates/mirrorless-portfolio"
            >
              Mirrorless
            </a>
            <span className={"shrink-0 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
              Webflow
            </span>
          </li>
          <li className="flex items-baseline justify-between gap-3 text-[13px]">
            <a
              className={
                "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
              }
              href="/templates/netfolio-portfolio"
            >
              Netfolio
            </a>
            <span className={"shrink-0 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
              Webflow
            </span>
          </li>
          <li className="flex items-baseline justify-between gap-3 text-[13px]">
            <a
              className={
                "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
              }
              href="/templates/nura"
            >
              Nura
            </a>
            <span className={"shrink-0 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
              Webflow
            </span>
          </li>
          <li className="flex items-baseline justify-between gap-3 text-[13px]">
            <a
              className={
                "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
              }
              href="/templates/palette"
            >
              Palette
            </a>
            <span className={"shrink-0 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
              Webflow &amp; Framer
            </span>
          </li>
          <li className="flex items-baseline justify-between gap-3 text-[13px]">
            <a
              className={
                "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
              }
              href="/templates/pixies"
            >
              Pixies
            </a>
            <span className={"shrink-0 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
              Webflow
            </span>
          </li>
          <li className="flex items-baseline justify-between gap-3 text-[13px]">
            <a
              className={
                "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
              }
              href="/templates/pleasures"
            >
              Pleasures
            </a>
            <span className={"shrink-0 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
              Webflow
            </span>
          </li>
          <li className="flex items-baseline justify-between gap-3 text-[13px]">
            <a
              className={
                "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
              }
              href="/templates/procapture"
            >
              ProCapture
            </a>
            <span className={"shrink-0 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
              Webflow
            </span>
          </li>
          <li className="flex items-baseline justify-between gap-3 text-[13px]">
            <a
              className={
                "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
              }
              href="/templates/prosper"
            >
              Prosper
            </a>
            <span className={"shrink-0 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
              Webflow
            </span>
          </li>
          <li className="flex items-baseline justify-between gap-3 text-[13px]">
            <a
              className={
                "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
              }
              href="/templates/pulse"
            >
              Pulse
            </a>
            <span className={"shrink-0 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
              Webflow
            </span>
          </li>
          <li className="flex items-baseline justify-between gap-3 text-[13px]">
            <a
              className={
                "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
              }
              href="/templates/rampage"
            >
              Rampage
            </a>
            <span className={"shrink-0 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
              Webflow
            </span>
          </li>
          <li className="flex items-baseline justify-between gap-3 text-[13px]">
            <a
              className={
                "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
              }
              href="/templates/rapture"
            >
              Rapture
            </a>
            <span className={"shrink-0 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
              Webflow
            </span>
          </li>
          <li className="flex items-baseline justify-between gap-3 text-[13px]">
            <a
              className={
                "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
              }
              href="/templates/reality-portfolio"
            >
              Reality
            </a>
            <span className={"shrink-0 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
              Webflow
            </span>
          </li>
          <li className="flex items-baseline justify-between gap-3 text-[13px]">
            <a
              className={
                "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
              }
              href="/templates/sakura"
            >
              Sakura
            </a>
            <span className={"shrink-0 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
              Webflow
            </span>
          </li>
          <li className="flex items-baseline justify-between gap-3 text-[13px]">
            <a
              className={
                "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
              }
              href="/templates/shift"
            >
              Shift
            </a>
            <span className={"shrink-0 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
              Webflow
            </span>
          </li>
          <li className="flex items-baseline justify-between gap-3 text-[13px]">
            <a
              className={
                "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
              }
              href="/templates/sideways-photography"
            >
              Sideways
            </a>
            <span className={"shrink-0 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
              Webflow
            </span>
          </li>
          <li className="flex items-baseline justify-between gap-3 text-[13px]">
            <a
              className={
                "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
              }
              href="/templates/sodium"
            >
              Sodium
            </a>
            <span className={"shrink-0 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
              Webflow
            </span>
          </li>
          <li className="flex items-baseline justify-between gap-3 text-[13px]">
            <a
              className={
                "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
              }
              href="/templates/sprinter"
            >
              Sprinter
            </a>
            <span className={"shrink-0 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
              Webflow
            </span>
          </li>
          <li className="flex items-baseline justify-between gap-3 text-[13px]">
            <a
              className={
                "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
              }
              href="/templates/stonepixels"
            >
              StonePixels
            </a>
            <span className={"shrink-0 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
              Webflow
            </span>
          </li>
          <li className="flex items-baseline justify-between gap-3 text-[13px]">
            <a
              className={
                "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
              }
              href="/templates/tilted"
            >
              Tilted
            </a>
            <span className={"shrink-0 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
              Webflow
            </span>
          </li>
          <li className="flex items-baseline justify-between gap-3 text-[13px]">
            <a
              className={
                "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
              }
              href="/templates/tunnel-photography"
            >
              Tunnel
            </a>
            <span className={"shrink-0 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
              Webflow
            </span>
          </li>
        </ul>
      </div>
      <div className="mt-4">
        <h3 className="label">Photography &amp; Video Portfolio</h3>
        <ul className={"mt-2 \x73pace-y-1.\x35"}>
          <li className="flex items-baseline justify-between gap-3 text-[13px]">
            <a
              className={
                "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
              }
              href="/templates/alien"
            >
              Alien
            </a>
            <span className={"shrink-0 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
              Webflow
            </span>
          </li>
          <li className="flex items-baseline justify-between gap-3 text-[13px]">
            <a
              className={
                "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
              }
              href="/templates/campione"
            >
              Campione
            </a>
            <span className={"shrink-0 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
              Webflow &amp; Framer
            </span>
          </li>
          <li className="flex items-baseline justify-between gap-3 text-[13px]">
            <a
              className={
                "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
              }
              href="/templates/expose"
            >
              Expose
            </a>
            <span className={"shrink-0 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
              Webflow
            </span>
          </li>
          <li className="flex items-baseline justify-between gap-3 text-[13px]">
            <a
              className={
                "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
              }
              href="/templates/leak"
            >
              Leak
            </a>
            <span className={"shrink-0 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
              Webflow
            </span>
          </li>
          <li className="flex items-baseline justify-between gap-3 text-[13px]">
            <a
              className={
                "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
              }
              href="/templates/legion"
            >
              Legion
            </a>
            <span className={"shrink-0 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
              Webflow
            </span>
          </li>
          <li className="flex items-baseline justify-between gap-3 text-[13px]">
            <a
              className={
                "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
              }
              href="/templates/lenses"
            >
              Lenses
            </a>
            <span className={"shrink-0 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
              Webflow
            </span>
          </li>
          <li className="flex items-baseline justify-between gap-3 text-[13px]">
            <a
              className={
                "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
              }
              href="/templates/petal"
            >
              Petal
            </a>
            <span className={"shrink-0 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
              Webflow
            </span>
          </li>
          <li className="flex items-baseline justify-between gap-3 text-[13px]">
            <a
              className={
                "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
              }
              href="/templates/through"
            >
              Through
            </a>
            <span className={"shrink-0 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
              Webflow
            </span>
          </li>
          <li className="flex items-baseline justify-between gap-3 text-[13px]">
            <a
              className={
                "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
              }
              href="/templates/unmarked"
            >
              Unmarked
            </a>
            <span className={"shrink-0 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
              Webflow
            </span>
          </li>
        </ul>
      </div>
      <div className="mt-4">
        <h3 className="label">Creative Agency</h3>
        <ul className={"mt-2 \x73pace-y-1.\x35"}>
          <li className="flex items-baseline justify-between gap-3 text-[13px]">
            <a
              className={
                "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
              }
              href="/templates/algorithm"
            >
              Algorithm
            </a>
            <span className={"shrink-0 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
              Webflow
            </span>
          </li>
          <li className="flex items-baseline justify-between gap-3 text-[13px]">
            <a
              className={
                "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
              }
              href="/templates/altverse"
            >
              Altverse
            </a>
            <span className={"shrink-0 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
              Webflow
            </span>
          </li>
          <li className="flex items-baseline justify-between gap-3 text-[13px]">
            <a
              className={
                "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
              }
              href="/templates/celestial"
            >
              Celestial
            </a>
            <span className={"shrink-0 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
              Webflow
            </span>
          </li>
          <li className="flex items-baseline justify-between gap-3 text-[13px]">
            <a
              className={
                "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
              }
              href="/templates/elytra"
            >
              Elytra
            </a>
            <span className={"shrink-0 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
              Webflow
            </span>
          </li>
        </ul>
      </div>
      <div className="mt-4">
        <h3 className="label">Freelancers &amp; Consultants</h3>
        <ul className={"mt-2 \x73pace-y-1.\x35"}>
          <li className="flex items-baseline justify-between gap-3 text-[13px]">
            <a
              className={
                "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
              }
              href="/templates/wings"
            >
              Wings
            </a>
            <span className={"shrink-0 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
              Webflow &amp; Framer
            </span>
          </li>
        </ul>
      </div>
    </section>
  );
}

function ImportedSectionWellness() {
  return (
    <section className="os-shell break-inside-avoid p-6">
      <h2
        className={
          "\x66ont-[\x66amily-name:\x76ar(\x2d-font-heading)] text-[18px] font-medium tracking-tight \x74ext-[\x76ar(\x2d-text)]"
        }
      >
        Wellness
      </h2>
      <div className="mt-4">
        <h3 className="label">Therapy &amp; Psychology</h3>
        <ul className={"mt-2 \x73pace-y-1.\x35"}>
          <li className="flex items-baseline justify-between gap-3 text-[13px]">
            <a
              className={
                "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
              }
              href="/templates/calma"
            >
              Calma
            </a>
            <span className={"shrink-0 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
              Webflow
            </span>
          </li>
          <li className="flex items-baseline justify-between gap-3 text-[13px]">
            <a
              className={
                "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
              }
              href="/templates/serenya"
            >
              Serenya
            </a>
            <span className={"shrink-0 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
              Webflow &amp; Framer
            </span>
          </li>
          <li className="flex items-baseline justify-between gap-3 text-[13px]">
            <a
              className={
                "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
              }
              href="/templates/solora"
            >
              Solora
            </a>
            <span className={"shrink-0 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
              Webflow
            </span>
          </li>
          <li className="flex items-baseline justify-between gap-3 text-[13px]">
            <a
              className={
                "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
              }
              href="/templates/stillpoint"
            >
              Stillpoint
            </a>
            <span className={"shrink-0 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
              Webflow
            </span>
          </li>
        </ul>
      </div>
      <div className="mt-4">
        <h3 className="label">Fitness &amp; Gym</h3>
        <ul className={"mt-2 \x73pace-y-1.\x35"}>
          <li className="flex items-baseline justify-between gap-3 text-[13px]">
            <a
              className={
                "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
              }
              href="/templates/flexify"
            >
              Flexify
            </a>
            <span className={"shrink-0 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
              Webflow
            </span>
          </li>
          <li className="flex items-baseline justify-between gap-3 text-[13px]">
            <a
              className={
                "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
              }
              href="/templates/healthsquare-health"
            >
              HealthSquare
            </a>
            <span className={"shrink-0 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
              Webflow
            </span>
          </li>
        </ul>
      </div>
      <div className="mt-4">
        <h3 className="label">Sports &amp; Outdoors Store</h3>
        <ul className={"mt-2 \x73pace-y-1.\x35"}>
          <li className="flex items-baseline justify-between gap-3 text-[13px]">
            <a
              className={
                "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
              }
              href="/templates/sneaky"
            >
              Sneaky
            </a>
            <span className={"shrink-0 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
              Webflow
            </span>
          </li>
        </ul>
      </div>
      <div className="mt-4">
        <h3 className="label">Health &amp; Nutrition</h3>
        <ul className={"mt-2 \x73pace-y-1.\x35"}>
          <li className="flex items-baseline justify-between gap-3 text-[13px]">
            <a
              className={
                "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
              }
              href="/templates/wellnesswave-health"
            >
              WellnessWave
            </a>
            <span className={"shrink-0 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
              Webflow
            </span>
          </li>
        </ul>
      </div>
    </section>
  );
}

function ImportedSectionProfessionalServices() {
  return (
    <section className="os-shell break-inside-avoid p-6">
      <h2
        className={
          "\x66ont-[\x66amily-name:\x76ar(\x2d-font-heading)] text-[18px] font-medium tracking-tight \x74ext-[\x76ar(\x2d-text)]"
        }
      >
        Professional Services
      </h2>
      <div className="mt-4">
        <h3 className="label">Consulting &amp; Coaching</h3>
        <ul className={"mt-2 \x73pace-y-1.\x35"}>
          <li className="flex items-baseline justify-between gap-3 text-[13px]">
            <a
              className={
                "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
              }
              href="/templates/echoes-business"
            >
              Echoes
            </a>
            <span className={"shrink-0 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
              Webflow
            </span>
          </li>
          <li className="flex items-baseline justify-between gap-3 text-[13px]">
            <a
              className={
                "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
              }
              href="/templates/enterpriseedge-business"
            >
              EnterpriseEdge
            </a>
            <span className={"shrink-0 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
              Webflow
            </span>
          </li>
          <li className="flex items-baseline justify-between gap-3 text-[13px]">
            <a
              className={
                "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
              }
              href="/templates/numeris"
            >
              Numeris
            </a>
            <span className={"shrink-0 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
              Webflow &amp; Framer
            </span>
          </li>
        </ul>
      </div>
      <div className="mt-4">
        <h3 className="label">Law Firm &amp; Attorney</h3>
        <ul className={"mt-2 \x73pace-y-1.\x35"}>
          <li className="flex items-baseline justify-between gap-3 text-[13px]">
            <a
              className={
                "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
              }
              href="/templates/azure"
            >
              Azure
            </a>
            <span className={"shrink-0 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
              Webflow
            </span>
          </li>
        </ul>
      </div>
      <div className="mt-4">
        <h3 className="label">Banking &amp; Investment</h3>
        <ul className={"mt-2 \x73pace-y-1.\x35"}>
          <li className="flex items-baseline justify-between gap-3 text-[13px]">
            <a
              className={
                "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
              }
              href="/templates/savvy"
            >
              Savvy
            </a>
            <span className={"shrink-0 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
              Webflow
            </span>
          </li>
        </ul>
      </div>
    </section>
  );
}

function ImportedSectionRetailECommerce() {
  return (
    <section className="os-shell break-inside-avoid p-6">
      <h2
        className={
          "\x66ont-[\x66amily-name:\x76ar(\x2d-font-heading)] text-[18px] font-medium tracking-tight \x74ext-[\x76ar(\x2d-text)]"
        }
      >
        Retail &amp; E-Commerce
      </h2>
      <div className="mt-4">
        <h3 className="label">Beauty &amp; Wellness Store</h3>
        <ul className={"mt-2 \x73pace-y-1.\x35"}>
          <li className="flex items-baseline justify-between gap-3 text-[13px]">
            <a
              className={
                "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
              }
              href="/templates/glaze"
            >
              Glaze
            </a>
            <span className={"shrink-0 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
              Webflow
            </span>
          </li>
          <li className="flex items-baseline justify-between gap-3 text-[13px]">
            <a
              className={
                "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
              }
              href="/templates/savior"
            >
              Savior
            </a>
            <span className={"shrink-0 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
              Webflow
            </span>
          </li>
        </ul>
      </div>
      <div className="mt-4">
        <h3 className="label">Home Decor Store</h3>
        <ul className={"mt-2 \x73pace-y-1.\x35"}>
          <li className="flex items-baseline justify-between gap-3 text-[13px]">
            <a
              className={
                "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
              }
              href="/templates/cozyhome-furniture"
            >
              CozyHome
            </a>
            <span className={"shrink-0 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
              Webflow
            </span>
          </li>
        </ul>
      </div>
      <div className="mt-4">
        <h3 className="label">Electronics Store</h3>
        <ul className={"mt-2 \x73pace-y-1.\x35"}>
          <li className="flex items-baseline justify-between gap-3 text-[13px]">
            <a
              className={
                "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
              }
              href="/templates/technest"
            >
              TechNest
            </a>
            <span className={"shrink-0 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
              Webflow
            </span>
          </li>
        </ul>
      </div>
      <div className="mt-4">
        <h3 className="label">Fashion &amp; Clothing Store</h3>
        <ul className={"mt-2 \x73pace-y-1.\x35"}>
          <li className="flex items-baseline justify-between gap-3 text-[13px]">
            <a
              className={
                "\x74ext-[\x76ar(\x2d-text-secondary)] transition-colors \x68over:\x74ext-[\x76ar(\x2d-text)]"
              }
              href="/templates/techwear-fashion"
            >
              Techwear
            </a>
            <span className={"shrink-0 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
              Webflow
            </span>
          </li>
        </ul>
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
              "relative flex h-12 flex-col items-center justify-center gap-0.5 rounded-full text-[10px] font-medium transition-[background,color] duration-150 \x62g-gradient-to-b \x66rom-white \x74o-[#\x663f3f2] \x74ext-[\x76ar(\x2d-text)] \x73hadow-[\x76ar(\x2d-shadow-raised)]"
            }
            aria-current="page"
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
