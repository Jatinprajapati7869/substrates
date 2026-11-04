import { withPublicPageHead } from "@/lib/seo";
import { CatalogBrowser } from "@/components/CatalogBrowser";
import { useSupplyShell } from "@/lib/use-supply-shell";
import type { CSSProperties } from "react";
import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import capturedCSS from "../styles/pages/sections.css?raw";
import { AssistantCopyOptions } from "@/components/AssistantCopyOptions";
import { copySectionPrompt } from "@/lib/assistant-copy";
import { SectionAssistantMenu } from "@/components/SectionAssistantMenu";
import {
  SidebarSectionCount,
  SidebarTemplateCount,
} from "@/components/marketing/TemplatesPublicCopy";

export const Route = createFileRoute("/sections")({
  head: () =>
    withPublicPageHead("/sections", [
      { title: "Website Sections — Substrates" },
      {
        name: "description",
        content: "Explore Substrates website sections and interactive design previews.",
      },
      { property: "og:title", content: "Website Sections — Substrates" },
      {
        property: "og:description",
        content: "Explore Substrates website sections and interactive design previews.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ]),
  staticData: {
    importedDocument: {
      html: { className: "inter_c15e96cb-module__0bjUvq__variable", lang: "en" },
      body: {
        className: "\x6din-h-screen \x62g-[\x76ar(\x2d-surface)] \x61ntialiased",
        "data-site-import-popup-incomplete": "limit",
      },
    },
  },
  component: Index,
});

function Index() {
  useSupplyShell();
  const [openMenu0, setOpenMenu0] = useState(null as string | null);
  const [copyMessage, setCopyMessage] = useState("");
  const [assistantSection, setAssistantSection] = useState<string | null>(null);
  return (
    <>
      <style>{capturedCSS}</style>
      {assistantSection && (
        <SectionAssistantMenu slug={assistantSection} close={() => setAssistantSection(null)} />
      )}
      <div hidden />
      <a
        className={
          "\x73r-only \x66ocus:\x6eot-sr-only \x66ocus:\x66ixed focus:left-3 focus:top-3 focus:z-[100] \x66ocus:\x62order \x66ocus:\x62order-[\x76ar(\x2d-line-strong)] \x66ocus:\x62g-[\x76ar(\x2d-surface)] focus:px-3 focus:py-2 \x66ocus:\x74ext-[\x313px] focus:font-medium \x66ocus:\x74ext-[\x76ar(\x2d-text)]"
        }
        href="#main"
      >
        Skip to templates
      </a>
      {copyMessage && (
        <p
          role="status"
          className="fixed bottom-5 left-5 z-[80] rounded-lg border border-line bg-surface px-4 py-3 text-sm text-text"
        >
          {copyMessage}
        </p>
      )}
      <div
        className="flex min-h-screen"
        onClick={(event) => {
          if (!(event.target instanceof Element)) return;
          const trigger = event.target.closest('button[aria-haspopup="menu"]');
          if (trigger && !trigger.getAttribute("aria-controls")) {
            const id = trigger.closest("article")?.id;
            if (id) setAssistantSection(id);
            return;
          }
          const item = event.target.closest('button[role="menuitem"]');
          const slug = item?.closest("article")?.id;
          const tool = item?.getAttribute("title")?.replace("Copy section for ", "");
          if (!slug || !tool) return;
          void copySectionPrompt(slug, tool)
            .then(() => {
              setOpenMenu0(null);
              setCopyMessage(`Prompt copied for ${tool}`);
              window.setTimeout(() => setCopyMessage(""), 3000);
            })
            .catch(() => setCopyMessage("Could not copy. Please try again."));
        }}
      >
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
          <main className="min-w-0 flex-1">
            <div className="mx-auto w-full max-w-6xl px-4 pb-20 pt-[84px] sm:px-6 lg:pt-14">
              <CatalogBrowser kind="section" />
              <ImportedSectionOneSectionCanCarrythe />
              <div className="mt-14">
                <div className={"flex \x73croll-mt-24 justify-center"} id="library">
                  <div
                    className={
                      "os-shell flex w-full flex-wrap items-center justify-center gap-2 !rounded-[27px] p-2 \x73m:\x69nline-flex sm:w-auto sm:max-w-full"
                    }
                    role="search"
                    aria-label="Filter sections"
                    hidden
                  >
                    <div className="relative w-full sm:w-[220px]">
                      <svg
                        className={
                          "pointer-events-none absolute left-3.5 top-1/2 \x2dtranslate-y-1/\x32 \x74ext-[\x76ar(\x2d-text-tertiary)]"
                        }
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <circle cx="11" cy="11" r="7" />
                        <path d="m20 20-3.5-3.5" />
                      </svg>
                      <input
                        className="os-field w-full pl-9 pr-4"
                        type="search"
                        placeholder="Search sections"
                        aria-label="Search sections"
                        defaultValue=""
                      />
                    </div>
                    <div className={"relative shrink-0 \x6frder-1"}>
                      <button
                        className={
                          "os-field flex max-w-[min(16rem,70vw)] items-center gap-2 pl-4 pr-3 text-left \x74ext-[\x76ar(\x2d-text-secondary)]"
                        }
                        type="button"
                        aria-haspopup="listbox"
                        aria-expanded="false"
                        aria-controls="_R_12inpfcjb_-list"
                        aria-label="Section type: All sections"
                      >
                        <span className="min-w-0 flex-1 truncate">All sections</span>
                        <svg
                          className={
                            "shrink-0 \x74ext-[\x76ar(\x2d-text-tertiary)] transition-transform duration-200"
                          }
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <path d="m6 9 6 6 6-6" />
                        </svg>
                      </button>
                    </div>
                    <div
                      className={"os-seg \x6frder-3 shrink-0 \x73m:\x6frder-2"}
                      role="radiogroup"
                      aria-label="Price"
                    >
                      <button
                        className="os-seg-item px-3 text-[12.5px]"
                        type="button"
                        role="radio"
                        aria-checked="true"
                        data-active="true"
                      >
                        Any price
                      </button>
                      <button
                        className="os-seg-item px-3 text-[12.5px]"
                        type="button"
                        role="radio"
                        aria-checked="false"
                      >
                        Free<span className="tabular-nums opacity-50">38</span>
                      </button>
                      <button
                        className="os-seg-item px-3 text-[12.5px]"
                        type="button"
                        role="radio"
                        aria-checked="false"
                      >
                        ✦ Pro<span className="tabular-nums opacity-50">20</span>
                      </button>
                    </div>
                    <div className={"relative shrink-0 \x6frder-2 \x73m:\x6frder-3"}>
                      <button
                        className={
                          "os-field flex max-w-[min(16rem,70vw)] items-center gap-2 pl-4 pr-3 text-left \x74ext-[\x76ar(\x2d-text-secondary)]"
                        }
                        type="button"
                        aria-haspopup="listbox"
                        aria-expanded="false"
                        aria-controls="_R_22inpfcjb_-list"
                        aria-label="Style: Any style"
                      >
                        <span className="min-w-0 flex-1 truncate">Any style</span>
                        <svg
                          className={
                            "shrink-0 \x74ext-[\x76ar(\x2d-text-tertiary)] transition-transform duration-200"
                          }
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <path d="m6 9 6 6 6-6" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
                <p
                  className={
                    "mt-4 px-1 text-center text-[12px] \x74ext-[\x76ar(\x2d-text-tertiary)]"
                  }
                  aria-live="polite"
                >
                  58 sections
                </p>
                <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  <ImportedArticleJewelcase />
                  <ImportedArticlePanes />
                  <ImportedArticleMeadow />
                  <ImportedArticleBloom />
                  <article
                    className={
                      "relative flex flex-col \x68as-[[\x61ria-expanded=\x74rue]]:\x7a-30 rounded-[20px] \x62order \x62order-[\x76ar(\x2d-line)] bg-white p-2 \x73hadow-[\x76ar(\x2d-shadow-raised)]"
                    }
                    style={
                      {
                        viewTransitionName: "sec-portfolio-collage",
                        viewTransitionClass: "sec-card",
                      } as CSSProperties
                    }
                    id="portfolio-collage"
                  >
                    <button
                      className={
                        "group relative block aspect-[16/10] w-full overflow-hidden rounded-[12px] \x62g-[\x76ar(\x2d-surface-sunken)] text-left"
                      }
                      type="button"
                      aria-label="Preview Collage"
                    >
                      <img
                        className={
                          "object-cover \x6fbject-top transition-transform duration-300 \x67roup-hover:\x73cale-[\x31.\x3025]"
                        }
                        style={{
                          position: "absolute",
                          height: "100%",
                          width: "100%",
                          inset: "0px",
                          color: "transparent",
                        }}
                        alt="Collage section preview"
                        loading="lazy"
                        decoding="async"
                        src="/site-assets/8ee5e17c64c47fad.webp"
                      />
                      <span
                        className={
                          "absolute bottom-2 right-2 rounded-full \x62g-white/\x395 px-3 py-1.5 text-[11px] font-medium \x74ext-[\x76ar(\x2d-text)] \x73hadow-[\x76ar(\x2d-shadow-raised)]"
                        }
                      >
                        Preview
                      </span>
                    </button>
                    <div
                      className={
                        "flex flex-1 flex-col gap-3 px-2 pb-1 pt-3 [&\x5fbutton[\x61ria-haspopup]]:\x77-full"
                      }
                    >
                      <div className="flex min-w-0 items-start justify-between gap-2">
                        <div className="min-w-0">
                          <h2
                            className={
                              "truncate text-[13px] font-medium \x74ext-[\x76ar(\x2d-text)]"
                            }
                          >
                            <a
                              className={"\x75nderline-offset-2 \x68over:\x75nderline"}
                              href="/sections/portfolio-collage"
                            >
                              Collage
                            </a>
                          </h2>
                          <p
                            className={
                              "mt-0.5 truncate text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"
                            }
                          >
                            Portfolio hero · Studio Original
                          </p>
                        </div>
                        <a
                          className={
                            "-mr-1 shrink-0 rounded-full px-2 py-1 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)] transition-colors \x68over:\x62g-black/[\x30.\x304] \x68over:\x74ext-[\x76ar(\x2d-text)]"
                          }
                          href="/sections/portfolio-collage"
                        >
                          Details
                        </a>
                      </div>
                      <div className={"mt-auto [&>\x64iv]:\x77-full"}>
                        <div className="relative shrink-0">
                          <button
                            className={
                              "flex h-9 items-center gap-2 rounded-full \x62g-gradient-to-b \x66rom-white \x74o-[#\x663f3f2] pl-1 pr-3 text-[12px] font-medium \x74ext-[\x76ar(\x2d-text)] \x73hadow-[\x76ar(\x2d-shadow-raised)] transition-[transform,filter,box-shadow] duration-150 \x68over:\x2dtranslate-y-0.\x35 \x68over:\x73hadow-[\x30_5px_14px_rgba(\x30,\x30,\x30,\x30.\x312)] \x61ctive:\x74ranslate-y-px \x61ctive:\x73cale-[\x30.\x397] \x66ocus-visible:\x6futline-2 \x66ocus-visible:\x6futline-offset-2 \x66ocus-visible:\x6futline-[\x76ar(\x2d-accent)] \x6dotion-reduce:\x74ransform-none"
                            }
                            aria-expanded={openMenu0 === "observed-0"}
                            onClick={(event) => {
                              event.preventDefault();
                              event.stopPropagation();
                              setOpenMenu0((open) => (open === "observed-0" ? null : "observed-0"));
                            }}
                            type="button"
                            aria-label="Copy Section options"
                            aria-haspopup="menu"
                            aria-controls="site-import-popup-0"
                          >
                            <span
                              className={
                                "flex h-7 w-7 shrink-0 items-center justify-center rounded-full \x62g-[#\x37a5be8] text-white"
                              }
                            >
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                aria-hidden="true"
                              >
                                <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18" />
                              </svg>
                            </span>
                            <span className="flex-1 whitespace-nowrap text-left">Copy Section</span>
                            <span
                              className={
                                "rounded-full \x62g-[#\x657f5e1] px-1.5 py-px text-[9.5px] font-semibold uppercase tracking-wide \x74ext-[#\x31f5a33]"
                              }
                            >
                              Free
                            </span>
                            <svg
                              className={
                                "ml-0.5 \x74ext-[\x76ar(\x2d-text-secondary)] transition-transform \x2drotate-90"
                              }
                              width="13"
                              height="13"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              aria-hidden="true"
                            >
                              <path d="m6 9 6 6 6-6" />
                            </svg>
                          </button>
                          <div
                            className={
                              "\x61nimate-fade-in absolute right-0 z-[70] w-[248px] rounded-[12px] \x62order \x62order-[\x76ar(\x2d-line)] bg-white p-2 \x74ext-[\x76ar(\x2d-text)] \x73hadow-[\x30_18px_48px_rgba(\x30,\x30,\x30,\x30.\x316)] bottom-[calc(100%+8px)]"
                            }
                            aria-hidden={openMenu0 === "observed-0" ? undefined : undefined}
                            data-state={openMenu0 === "observed-0" ? undefined : undefined}
                            hidden={openMenu0 === "observed-0" ? undefined : true}
                            inert={openMenu0 === "observed-0" ? undefined : false}
                            {...{
                              open: (openMenu0 === "observed-0" ? undefined : false)
                                ? ""
                                : undefined,
                            }}
                            style={openMenu0 === "observed-0" ? {} : { display: "none" }}
                            role="menu"
                            aria-label="Copy Section destinations"
                            data-site-import-observed-popup=""
                            id="site-import-popup-0"
                          >
                            <AssistantCopyOptions />
                            <p
                              className={
                                "px-2 pb-2 pt-1 text-[10px] font-semibold uppercase tracking-[0.12em] \x74ext-[\x76ar(\x2d-text-tertiary)]"
                              }
                            >
                              Sign in to copy section
                            </p>
                            <button
                              className={
                                "flex h-11 w-full items-center gap-3 rounded-[7px] px-2 text-left text-[13px] font-medium \x74ext-[\x76ar(\x2d-text-secondary)] transition-[background-color,transform] duration-150 \x68over:\x62g-[#\x665f5f4] \x61ctive:\x73cale-[\x30.\x398] \x6dotion-reduce:\x74ransform-none"
                              }
                              type="button"
                              role="menuitem"
                              title="Copy section for Claude Code"
                            >
                              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[6px] bg-white">
                                <img
                                  style={{ color: "transparent" }}
                                  alt=""
                                  aria-hidden="true"
                                  loading="lazy"
                                  width="22"
                                  height="22"
                                  decoding="async"
                                  src="/site-assets/3737e44be6f1bbfb-7b27014eefcb6c8e988c06a3a27c4881.png"
                                />
                              </span>
                              <span className="flex-1">Claude Code</span>
                              <svg
                                className={"\x74ext-[\x76ar(\x2d-text-tertiary)]"}
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
                                <rect x="4" y="10" width="16" height="10" rx="1" />
                                <path d="M8 10V7a4 4 0 0 1 8 0v3" />
                              </svg>
                            </button>
                            <button
                              className={
                                "flex h-11 w-full items-center gap-3 rounded-[7px] px-2 text-left text-[13px] font-medium \x74ext-[\x76ar(\x2d-text-secondary)] transition-[background-color,transform] duration-150 \x68over:\x62g-[#\x665f5f4] \x61ctive:\x73cale-[\x30.\x398] \x6dotion-reduce:\x74ransform-none"
                              }
                              type="button"
                              role="menuitem"
                              title="Copy section for Cursor"
                            >
                              <span
                                className={
                                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-[6px] \x62g-[#\x3111]"
                                }
                              >
                                <img
                                  className={"\x69nvert"}
                                  style={{ color: "transparent" }}
                                  alt=""
                                  aria-hidden="true"
                                  loading="lazy"
                                  width="22"
                                  height="22"
                                  decoding="async"
                                  src="/site-assets/8cf8b65ff525f0ff-fa119eef08d1931ac97df58d915cc032.png"
                                />
                              </span>
                              <span className="flex-1">Cursor</span>
                              <svg
                                className={"\x74ext-[\x76ar(\x2d-text-tertiary)]"}
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
                                <rect x="4" y="10" width="16" height="10" rx="1" />
                                <path d="M8 10V7a4 4 0 0 1 8 0v3" />
                              </svg>
                            </button>
                            <button
                              className={
                                "flex h-11 w-full items-center gap-3 rounded-[7px] px-2 text-left text-[13px] font-medium \x74ext-[\x76ar(\x2d-text-secondary)] transition-[background-color,transform] duration-150 \x68over:\x62g-[#\x665f5f4] \x61ctive:\x73cale-[\x30.\x398] \x6dotion-reduce:\x74ransform-none"
                              }
                              type="button"
                              role="menuitem"
                              title="Copy section for Windsurf"
                            >
                              <span
                                className={
                                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-[6px] \x62g-[#\x3111]"
                                }
                              >
                                <img
                                  className={"\x69nvert"}
                                  style={{ color: "transparent" }}
                                  alt=""
                                  aria-hidden="true"
                                  loading="lazy"
                                  width="22"
                                  height="22"
                                  decoding="async"
                                  src="/site-assets/d4db4e42691f0129-fe722cb6dea53ad9ccfd57b5bac0360a.png"
                                />
                              </span>
                              <span className="flex-1">Windsurf</span>
                              <svg
                                className={"\x74ext-[\x76ar(\x2d-text-tertiary)]"}
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
                                <rect x="4" y="10" width="16" height="10" rx="1" />
                                <path d="M8 10V7a4 4 0 0 1 8 0v3" />
                              </svg>
                            </button>
                            <button
                              className={
                                "flex h-11 w-full items-center gap-3 rounded-[7px] px-2 text-left text-[13px] font-medium \x74ext-[\x76ar(\x2d-text-secondary)] transition-[background-color,transform] duration-150 \x68over:\x62g-[#\x665f5f4] \x61ctive:\x73cale-[\x30.\x398] \x6dotion-reduce:\x74ransform-none"
                              }
                              type="button"
                              role="menuitem"
                              title="Copy section for v0"
                            >
                              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[6px] bg-white">
                                <img
                                  style={{ color: "transparent" }}
                                  alt=""
                                  aria-hidden="true"
                                  loading="lazy"
                                  width="22"
                                  height="22"
                                  decoding="async"
                                  src="/site-assets/b06fd899b1111984-dc3bed71932d0002eca70704eed42737.png"
                                />
                              </span>
                              <span className="flex-1">v0</span>
                              <svg
                                className={"\x74ext-[\x76ar(\x2d-text-tertiary)]"}
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
                                <rect x="4" y="10" width="16" height="10" rx="1" />
                                <path d="M8 10V7a4 4 0 0 1 8 0v3" />
                              </svg>
                            </button>
                            <button
                              className={
                                "flex h-11 w-full items-center gap-3 rounded-[7px] px-2 text-left text-[13px] font-medium \x74ext-[\x76ar(\x2d-text-secondary)] transition-[background-color,transform] duration-150 \x68over:\x62g-[#\x665f5f4] \x61ctive:\x73cale-[\x30.\x398] \x6dotion-reduce:\x74ransform-none"
                              }
                              type="button"
                              role="menuitem"
                              title="Copy section for Bolt"
                            >
                              <span
                                className={
                                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-[6px] \x62g-[#\x3111]"
                                }
                              >
                                <img
                                  style={{ color: "transparent" }}
                                  alt=""
                                  aria-hidden="true"
                                  loading="lazy"
                                  width="22"
                                  height="22"
                                  decoding="async"
                                  src="/site-assets/9e7c5dcffc2bada5-0a117f6ebf8d64db0cccb3cbba727dac.png"
                                />
                              </span>
                              <span className="flex-1">Bolt</span>
                              <svg
                                className={"\x74ext-[\x76ar(\x2d-text-tertiary)]"}
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
                                <rect x="4" y="10" width="16" height="10" rx="1" />
                                <path d="M8 10V7a4 4 0 0 1 8 0v3" />
                              </svg>
                            </button>
                            <button
                              className={
                                "flex h-11 w-full items-center gap-3 rounded-[7px] px-2 text-left text-[13px] font-medium \x74ext-[\x76ar(\x2d-text-secondary)] transition-[background-color,transform] duration-150 \x68over:\x62g-[#\x665f5f4] \x61ctive:\x73cale-[\x30.\x398] \x6dotion-reduce:\x74ransform-none"
                              }
                              type="button"
                              role="menuitem"
                              title="Copy section for Lovable"
                            >
                              <span
                                className={
                                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-[6px] \x62g-[#\x3111]"
                                }
                              >
                                <img
                                  style={{ color: "transparent" }}
                                  alt=""
                                  aria-hidden="true"
                                  loading="lazy"
                                  width="22"
                                  height="22"
                                  decoding="async"
                                  src="/site-assets/c071d2a2086e34ac-b5e0fcd3616727fef0705738ccdfbfc6.png"
                                />
                              </span>
                              <span className="flex-1">Lovable</span>
                              <svg
                                className={"\x74ext-[\x76ar(\x2d-text-tertiary)]"}
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
                                <rect x="4" y="10" width="16" height="10" rx="1" />
                                <path d="M8 10V7a4 4 0 0 1 8 0v3" />
                              </svg>
                            </button>
                            <button
                              className={
                                "flex h-11 w-full items-center gap-3 rounded-[7px] px-2 text-left text-[13px] font-medium \x74ext-[\x76ar(\x2d-text-secondary)] transition-[background-color,transform] duration-150 \x68over:\x62g-[#\x665f5f4] \x61ctive:\x73cale-[\x30.\x398] \x6dotion-reduce:\x74ransform-none"
                              }
                              type="button"
                              role="menuitem"
                              title="Copy section for Replit"
                            >
                              <span
                                className={
                                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-[6px] \x62g-[#\x66d5402]"
                                }
                              >
                                <img
                                  className={"\x62rightness-0 \x69nvert"}
                                  style={{ color: "transparent" }}
                                  alt=""
                                  aria-hidden="true"
                                  loading="lazy"
                                  width="22"
                                  height="22"
                                  decoding="async"
                                  src="/site-assets/c02184817b8a7268-6de29ee0366ebd52c2c2ba6f26e9e38f.png"
                                />
                              </span>
                              <span className="flex-1">Replit</span>
                              <svg
                                className={"\x74ext-[\x76ar(\x2d-text-tertiary)]"}
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
                                <rect x="4" y="10" width="16" height="10" rx="1" />
                                <path d="M8 10V7a4 4 0 0 1 8 0v3" />
                              </svg>
                            </button>
                            <p
                              className={
                                "\x62order-t \x62order-[\x76ar(\x2d-line)] px-2 pt-2 text-[11px] leading-snug \x74ext-[\x76ar(\x2d-text-tertiary)]"
                              }
                              role="status"
                              aria-live="polite"
                            >
                              Free with an account. No plan required.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                  <article
                    className={
                      "relative flex flex-col \x68as-[[\x61ria-expanded=\x74rue]]:\x7a-30 rounded-[20px] \x62order \x62order-[\x76ar(\x2d-line)] bg-white p-2 \x73hadow-[\x76ar(\x2d-shadow-raised)]"
                    }
                    style={
                      {
                        viewTransitionName: "sec-signal",
                        viewTransitionClass: "sec-card",
                      } as CSSProperties
                    }
                    id="signal"
                  >
                    <button
                      className={
                        "group relative block aspect-[16/10] w-full overflow-hidden rounded-[12px] \x62g-[\x76ar(\x2d-surface-sunken)] text-left"
                      }
                      type="button"
                      aria-label={"Preview Signal & Soil"}
                    >
                      <img
                        className={
                          "object-cover \x6fbject-top transition-transform duration-300 \x67roup-hover:\x73cale-[\x31.\x3025]"
                        }
                        style={{
                          position: "absolute",
                          height: "100%",
                          width: "100%",
                          inset: "0px",
                          color: "transparent",
                        }}
                        alt={"Signal & Soil section preview"}
                        loading="lazy"
                        decoding="async"
                        src="/site-assets/84207ae451b8e173.webp"
                      />
                      <span
                        className={
                          "absolute bottom-2 right-2 rounded-full \x62g-white/\x395 px-3 py-1.5 text-[11px] font-medium \x74ext-[\x76ar(\x2d-text)] \x73hadow-[\x76ar(\x2d-shadow-raised)]"
                        }
                      >
                        Preview
                      </span>
                    </button>
                    <div
                      className={
                        "flex flex-1 flex-col gap-3 px-2 pb-1 pt-3 [&\x5fbutton[\x61ria-haspopup]]:\x77-full"
                      }
                    >
                      <div className="flex min-w-0 items-start justify-between gap-2">
                        <div className="min-w-0">
                          <h2
                            className={
                              "truncate text-[13px] font-medium \x74ext-[\x76ar(\x2d-text)]"
                            }
                          >
                            <a
                              className={"\x75nderline-offset-2 \x68over:\x75nderline"}
                              href="/sections/signal"
                            >
                              Signal &amp; Soil
                            </a>
                          </h2>
                          <p
                            className={
                              "mt-0.5 truncate text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"
                            }
                          >
                            Scroll story · Studio Original
                          </p>
                        </div>
                        <a
                          className={
                            "-mr-1 shrink-0 rounded-full px-2 py-1 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)] transition-colors \x68over:\x62g-black/[\x30.\x304] \x68over:\x74ext-[\x76ar(\x2d-text)]"
                          }
                          href="/sections/signal"
                        >
                          Details
                        </a>
                      </div>
                      <div className={"mt-auto [&>\x64iv]:\x77-full"}>
                        <div className="relative shrink-0">
                          <button
                            className={
                              "flex h-9 items-center gap-2 rounded-full \x62g-gradient-to-b \x66rom-white \x74o-[#\x663f3f2] pl-1 pr-3 text-[12px] font-medium \x74ext-[\x76ar(\x2d-text)] \x73hadow-[\x76ar(\x2d-shadow-raised)] transition-[transform,filter,box-shadow] duration-150 \x68over:\x2dtranslate-y-0.\x35 \x68over:\x73hadow-[\x30_5px_14px_rgba(\x30,\x30,\x30,\x30.\x312)] \x61ctive:\x74ranslate-y-px \x61ctive:\x73cale-[\x30.\x397] \x66ocus-visible:\x6futline-2 \x66ocus-visible:\x6futline-offset-2 \x66ocus-visible:\x6futline-[\x76ar(\x2d-accent)] \x6dotion-reduce:\x74ransform-none"
                            }
                            aria-expanded={openMenu0 === "observed-1"}
                            onClick={(event) => {
                              event.preventDefault();
                              event.stopPropagation();
                              setOpenMenu0((open) => (open === "observed-1" ? null : "observed-1"));
                            }}
                            type="button"
                            aria-label="Copy Section options"
                            aria-haspopup="menu"
                            aria-controls="site-import-popup-1"
                          >
                            <span
                              className={
                                "flex h-7 w-7 shrink-0 items-center justify-center rounded-full \x62g-[#\x37a5be8] text-white"
                              }
                            >
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                aria-hidden="true"
                              >
                                <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18" />
                              </svg>
                            </span>
                            <span className="flex-1 whitespace-nowrap text-left">Copy Section</span>
                            <span
                              className={
                                "rounded-full \x62g-[#\x657f5e1] px-1.5 py-px text-[9.5px] font-semibold uppercase tracking-wide \x74ext-[#\x31f5a33]"
                              }
                            >
                              Free
                            </span>
                            <svg
                              className={
                                "ml-0.5 \x74ext-[\x76ar(\x2d-text-secondary)] transition-transform \x2drotate-90"
                              }
                              width="13"
                              height="13"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              aria-hidden="true"
                            >
                              <path d="m6 9 6 6 6-6" />
                            </svg>
                          </button>
                          <div
                            className={
                              "\x61nimate-fade-in absolute right-0 z-[70] w-[248px] rounded-[12px] \x62order \x62order-[\x76ar(\x2d-line)] bg-white p-2 \x74ext-[\x76ar(\x2d-text)] \x73hadow-[\x30_18px_48px_rgba(\x30,\x30,\x30,\x30.\x316)] bottom-[calc(100%+8px)]"
                            }
                            aria-hidden={openMenu0 === "observed-1" ? undefined : undefined}
                            data-state={openMenu0 === "observed-1" ? undefined : undefined}
                            hidden={openMenu0 === "observed-1" ? undefined : true}
                            inert={openMenu0 === "observed-1" ? undefined : false}
                            {...{
                              open: (openMenu0 === "observed-1" ? undefined : false)
                                ? ""
                                : undefined,
                            }}
                            style={openMenu0 === "observed-1" ? {} : { display: "none" }}
                            role="menu"
                            aria-label="Copy Section destinations"
                            data-site-import-observed-popup=""
                            id="site-import-popup-1"
                          >
                            <AssistantCopyOptions />
                            <p
                              className={
                                "px-2 pb-2 pt-1 text-[10px] font-semibold uppercase tracking-[0.12em] \x74ext-[\x76ar(\x2d-text-tertiary)]"
                              }
                            >
                              Sign in to copy section
                            </p>
                            <button
                              className={
                                "flex h-11 w-full items-center gap-3 rounded-[7px] px-2 text-left text-[13px] font-medium \x74ext-[\x76ar(\x2d-text-secondary)] transition-[background-color,transform] duration-150 \x68over:\x62g-[#\x665f5f4] \x61ctive:\x73cale-[\x30.\x398] \x6dotion-reduce:\x74ransform-none"
                              }
                              type="button"
                              role="menuitem"
                              title="Copy section for Claude Code"
                            >
                              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[6px] bg-white">
                                <img
                                  style={{ color: "transparent" }}
                                  alt=""
                                  aria-hidden="true"
                                  loading="lazy"
                                  width="22"
                                  height="22"
                                  decoding="async"
                                  src="/site-assets/3737e44be6f1bbfb-7b27014eefcb6c8e988c06a3a27c4881.png"
                                />
                              </span>
                              <span className="flex-1">Claude Code</span>
                              <svg
                                className={"\x74ext-[\x76ar(\x2d-text-tertiary)]"}
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
                                <rect x="4" y="10" width="16" height="10" rx="1" />
                                <path d="M8 10V7a4 4 0 0 1 8 0v3" />
                              </svg>
                            </button>
                            <button
                              className={
                                "flex h-11 w-full items-center gap-3 rounded-[7px] px-2 text-left text-[13px] font-medium \x74ext-[\x76ar(\x2d-text-secondary)] transition-[background-color,transform] duration-150 \x68over:\x62g-[#\x665f5f4] \x61ctive:\x73cale-[\x30.\x398] \x6dotion-reduce:\x74ransform-none"
                              }
                              type="button"
                              role="menuitem"
                              title="Copy section for Cursor"
                            >
                              <span
                                className={
                                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-[6px] \x62g-[#\x3111]"
                                }
                              >
                                <img
                                  className={"\x69nvert"}
                                  style={{ color: "transparent" }}
                                  alt=""
                                  aria-hidden="true"
                                  loading="lazy"
                                  width="22"
                                  height="22"
                                  decoding="async"
                                  src="/site-assets/8cf8b65ff525f0ff-fa119eef08d1931ac97df58d915cc032.png"
                                />
                              </span>
                              <span className="flex-1">Cursor</span>
                              <svg
                                className={"\x74ext-[\x76ar(\x2d-text-tertiary)]"}
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
                                <rect x="4" y="10" width="16" height="10" rx="1" />
                                <path d="M8 10V7a4 4 0 0 1 8 0v3" />
                              </svg>
                            </button>
                            <button
                              className={
                                "flex h-11 w-full items-center gap-3 rounded-[7px] px-2 text-left text-[13px] font-medium \x74ext-[\x76ar(\x2d-text-secondary)] transition-[background-color,transform] duration-150 \x68over:\x62g-[#\x665f5f4] \x61ctive:\x73cale-[\x30.\x398] \x6dotion-reduce:\x74ransform-none"
                              }
                              type="button"
                              role="menuitem"
                              title="Copy section for Windsurf"
                            >
                              <span
                                className={
                                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-[6px] \x62g-[#\x3111]"
                                }
                              >
                                <img
                                  className={"\x69nvert"}
                                  style={{ color: "transparent" }}
                                  alt=""
                                  aria-hidden="true"
                                  loading="lazy"
                                  width="22"
                                  height="22"
                                  decoding="async"
                                  src="/site-assets/d4db4e42691f0129-fe722cb6dea53ad9ccfd57b5bac0360a.png"
                                />
                              </span>
                              <span className="flex-1">Windsurf</span>
                              <svg
                                className={"\x74ext-[\x76ar(\x2d-text-tertiary)]"}
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
                                <rect x="4" y="10" width="16" height="10" rx="1" />
                                <path d="M8 10V7a4 4 0 0 1 8 0v3" />
                              </svg>
                            </button>
                            <button
                              className={
                                "flex h-11 w-full items-center gap-3 rounded-[7px] px-2 text-left text-[13px] font-medium \x74ext-[\x76ar(\x2d-text-secondary)] transition-[background-color,transform] duration-150 \x68over:\x62g-[#\x665f5f4] \x61ctive:\x73cale-[\x30.\x398] \x6dotion-reduce:\x74ransform-none"
                              }
                              type="button"
                              role="menuitem"
                              title="Copy section for v0"
                            >
                              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[6px] bg-white">
                                <img
                                  style={{ color: "transparent" }}
                                  alt=""
                                  aria-hidden="true"
                                  loading="lazy"
                                  width="22"
                                  height="22"
                                  decoding="async"
                                  src="/site-assets/b06fd899b1111984-dc3bed71932d0002eca70704eed42737.png"
                                />
                              </span>
                              <span className="flex-1">v0</span>
                              <svg
                                className={"\x74ext-[\x76ar(\x2d-text-tertiary)]"}
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
                                <rect x="4" y="10" width="16" height="10" rx="1" />
                                <path d="M8 10V7a4 4 0 0 1 8 0v3" />
                              </svg>
                            </button>
                            <button
                              className={
                                "flex h-11 w-full items-center gap-3 rounded-[7px] px-2 text-left text-[13px] font-medium \x74ext-[\x76ar(\x2d-text-secondary)] transition-[background-color,transform] duration-150 \x68over:\x62g-[#\x665f5f4] \x61ctive:\x73cale-[\x30.\x398] \x6dotion-reduce:\x74ransform-none"
                              }
                              type="button"
                              role="menuitem"
                              title="Copy section for Bolt"
                            >
                              <span
                                className={
                                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-[6px] \x62g-[#\x3111]"
                                }
                              >
                                <img
                                  style={{ color: "transparent" }}
                                  alt=""
                                  aria-hidden="true"
                                  loading="lazy"
                                  width="22"
                                  height="22"
                                  decoding="async"
                                  src="/site-assets/9e7c5dcffc2bada5-0a117f6ebf8d64db0cccb3cbba727dac.png"
                                />
                              </span>
                              <span className="flex-1">Bolt</span>
                              <svg
                                className={"\x74ext-[\x76ar(\x2d-text-tertiary)]"}
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
                                <rect x="4" y="10" width="16" height="10" rx="1" />
                                <path d="M8 10V7a4 4 0 0 1 8 0v3" />
                              </svg>
                            </button>
                            <button
                              className={
                                "flex h-11 w-full items-center gap-3 rounded-[7px] px-2 text-left text-[13px] font-medium \x74ext-[\x76ar(\x2d-text-secondary)] transition-[background-color,transform] duration-150 \x68over:\x62g-[#\x665f5f4] \x61ctive:\x73cale-[\x30.\x398] \x6dotion-reduce:\x74ransform-none"
                              }
                              type="button"
                              role="menuitem"
                              title="Copy section for Lovable"
                            >
                              <span
                                className={
                                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-[6px] \x62g-[#\x3111]"
                                }
                              >
                                <img
                                  style={{ color: "transparent" }}
                                  alt=""
                                  aria-hidden="true"
                                  loading="lazy"
                                  width="22"
                                  height="22"
                                  decoding="async"
                                  src="/site-assets/c071d2a2086e34ac-b5e0fcd3616727fef0705738ccdfbfc6.png"
                                />
                              </span>
                              <span className="flex-1">Lovable</span>
                              <svg
                                className={"\x74ext-[\x76ar(\x2d-text-tertiary)]"}
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
                                <rect x="4" y="10" width="16" height="10" rx="1" />
                                <path d="M8 10V7a4 4 0 0 1 8 0v3" />
                              </svg>
                            </button>
                            <button
                              className={
                                "flex h-11 w-full items-center gap-3 rounded-[7px] px-2 text-left text-[13px] font-medium \x74ext-[\x76ar(\x2d-text-secondary)] transition-[background-color,transform] duration-150 \x68over:\x62g-[#\x665f5f4] \x61ctive:\x73cale-[\x30.\x398] \x6dotion-reduce:\x74ransform-none"
                              }
                              type="button"
                              role="menuitem"
                              title="Copy section for Replit"
                            >
                              <span
                                className={
                                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-[6px] \x62g-[#\x66d5402]"
                                }
                              >
                                <img
                                  className={"\x62rightness-0 \x69nvert"}
                                  style={{ color: "transparent" }}
                                  alt=""
                                  aria-hidden="true"
                                  loading="lazy"
                                  width="22"
                                  height="22"
                                  decoding="async"
                                  src="/site-assets/c02184817b8a7268-6de29ee0366ebd52c2c2ba6f26e9e38f.png"
                                />
                              </span>
                              <span className="flex-1">Replit</span>
                              <svg
                                className={"\x74ext-[\x76ar(\x2d-text-tertiary)]"}
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
                                <rect x="4" y="10" width="16" height="10" rx="1" />
                                <path d="M8 10V7a4 4 0 0 1 8 0v3" />
                              </svg>
                            </button>
                            <p
                              className={
                                "\x62order-t \x62order-[\x76ar(\x2d-line)] px-2 pt-2 text-[11px] leading-snug \x74ext-[\x76ar(\x2d-text-tertiary)]"
                              }
                              role="status"
                              aria-live="polite"
                            >
                              Free with an account. No plan required.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                  <ImportedArticleOrbit />
                  <article
                    className={
                      "relative flex flex-col \x68as-[[\x61ria-expanded=\x74rue]]:\x7a-30 rounded-[20px] \x62order \x62order-[\x76ar(\x2d-line)] bg-white p-2 \x73hadow-[\x76ar(\x2d-shadow-raised)]"
                    }
                    style={
                      {
                        viewTransitionName: "sec-condensation",
                        viewTransitionClass: "sec-card",
                      } as CSSProperties
                    }
                    id="condensation"
                  >
                    <button
                      className={
                        "group relative block aspect-[16/10] w-full overflow-hidden rounded-[12px] \x62g-[\x76ar(\x2d-surface-sunken)] text-left"
                      }
                      type="button"
                      aria-label="Preview Condensation"
                    >
                      <img
                        className={
                          "object-cover \x6fbject-top transition-transform duration-300 \x67roup-hover:\x73cale-[\x31.\x3025]"
                        }
                        style={{
                          position: "absolute",
                          height: "100%",
                          width: "100%",
                          inset: "0px",
                          color: "transparent",
                        }}
                        alt="Condensation section preview"
                        loading="lazy"
                        decoding="async"
                        src="/site-assets/b333ce52f7fb8712.webp"
                      />
                      <span
                        className={
                          "absolute bottom-2 right-2 rounded-full \x62g-white/\x395 px-3 py-1.5 text-[11px] font-medium \x74ext-[\x76ar(\x2d-text)] \x73hadow-[\x76ar(\x2d-shadow-raised)]"
                        }
                      >
                        Preview
                      </span>
                    </button>
                    <div
                      className={
                        "flex flex-1 flex-col gap-3 px-2 pb-1 pt-3 [&\x5fbutton[\x61ria-haspopup]]:\x77-full"
                      }
                    >
                      <div className="flex min-w-0 items-start justify-between gap-2">
                        <div className="min-w-0">
                          <h2
                            className={
                              "truncate text-[13px] font-medium \x74ext-[\x76ar(\x2d-text)]"
                            }
                          >
                            <a
                              className={"\x75nderline-offset-2 \x68over:\x75nderline"}
                              href="/sections/condensation"
                            >
                              Condensation
                            </a>
                          </h2>
                          <p
                            className={
                              "mt-0.5 truncate text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"
                            }
                          >
                            Scroll story · Studio Original
                          </p>
                        </div>
                        <a
                          className={
                            "-mr-1 shrink-0 rounded-full px-2 py-1 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)] transition-colors \x68over:\x62g-black/[\x30.\x304] \x68over:\x74ext-[\x76ar(\x2d-text)]"
                          }
                          href="/sections/condensation"
                        >
                          Details
                        </a>
                      </div>
                      <div className={"mt-auto [&>\x64iv]:\x77-full"}>
                        <div className="relative shrink-0">
                          <button
                            className={
                              "flex h-9 items-center gap-2 rounded-full \x62g-gradient-to-b \x66rom-white \x74o-[#\x663f3f2] pl-1 pr-3 text-[12px] font-medium \x74ext-[\x76ar(\x2d-text)] \x73hadow-[\x76ar(\x2d-shadow-raised)] transition-[transform,filter,box-shadow] duration-150 \x68over:\x2dtranslate-y-0.\x35 \x68over:\x73hadow-[\x30_5px_14px_rgba(\x30,\x30,\x30,\x30.\x312)] \x61ctive:\x74ranslate-y-px \x61ctive:\x73cale-[\x30.\x397] \x66ocus-visible:\x6futline-2 \x66ocus-visible:\x6futline-offset-2 \x66ocus-visible:\x6futline-[\x76ar(\x2d-accent)] \x6dotion-reduce:\x74ransform-none"
                            }
                            aria-expanded={openMenu0 === "observed-2"}
                            onClick={(event) => {
                              event.preventDefault();
                              event.stopPropagation();
                              setOpenMenu0((open) => (open === "observed-2" ? null : "observed-2"));
                            }}
                            type="button"
                            aria-label="Copy Section options"
                            aria-haspopup="menu"
                            aria-controls="site-import-popup-2"
                          >
                            <span
                              className={
                                "flex h-7 w-7 shrink-0 items-center justify-center rounded-full \x62g-[#\x37a5be8] text-white"
                              }
                            >
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                aria-hidden="true"
                              >
                                <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18" />
                              </svg>
                            </span>
                            <span className="flex-1 whitespace-nowrap text-left">Copy Section</span>
                            <span
                              className={
                                "rounded-full \x62g-[#\x657f5e1] px-1.5 py-px text-[9.5px] font-semibold uppercase tracking-wide \x74ext-[#\x31f5a33]"
                              }
                            >
                              Free
                            </span>
                            <svg
                              className={
                                "ml-0.5 \x74ext-[\x76ar(\x2d-text-secondary)] transition-transform \x2drotate-90"
                              }
                              width="13"
                              height="13"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              aria-hidden="true"
                            >
                              <path d="m6 9 6 6 6-6" />
                            </svg>
                          </button>
                          <div
                            className={
                              "\x61nimate-fade-in absolute right-0 z-[70] w-[248px] rounded-[12px] \x62order \x62order-[\x76ar(\x2d-line)] bg-white p-2 \x74ext-[\x76ar(\x2d-text)] \x73hadow-[\x30_18px_48px_rgba(\x30,\x30,\x30,\x30.\x316)] bottom-[calc(100%+8px)]"
                            }
                            aria-hidden={openMenu0 === "observed-2" ? undefined : undefined}
                            data-state={openMenu0 === "observed-2" ? undefined : undefined}
                            hidden={openMenu0 === "observed-2" ? undefined : true}
                            inert={openMenu0 === "observed-2" ? undefined : false}
                            {...{
                              open: (openMenu0 === "observed-2" ? undefined : false)
                                ? ""
                                : undefined,
                            }}
                            style={openMenu0 === "observed-2" ? {} : { display: "none" }}
                            role="menu"
                            aria-label="Copy Section destinations"
                            data-site-import-observed-popup=""
                            id="site-import-popup-2"
                          >
                            <AssistantCopyOptions />
                            <p
                              className={
                                "px-2 pb-2 pt-1 text-[10px] font-semibold uppercase tracking-[0.12em] \x74ext-[\x76ar(\x2d-text-tertiary)]"
                              }
                            >
                              Sign in to copy section
                            </p>
                            <button
                              className={
                                "flex h-11 w-full items-center gap-3 rounded-[7px] px-2 text-left text-[13px] font-medium \x74ext-[\x76ar(\x2d-text-secondary)] transition-[background-color,transform] duration-150 \x68over:\x62g-[#\x665f5f4] \x61ctive:\x73cale-[\x30.\x398] \x6dotion-reduce:\x74ransform-none"
                              }
                              type="button"
                              role="menuitem"
                              title="Copy section for Claude Code"
                            >
                              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[6px] bg-white">
                                <img
                                  style={{ color: "transparent" }}
                                  alt=""
                                  aria-hidden="true"
                                  loading="lazy"
                                  width="22"
                                  height="22"
                                  decoding="async"
                                  src="/site-assets/3737e44be6f1bbfb-7b27014eefcb6c8e988c06a3a27c4881.png"
                                />
                              </span>
                              <span className="flex-1">Claude Code</span>
                              <svg
                                className={"\x74ext-[\x76ar(\x2d-text-tertiary)]"}
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
                                <rect x="4" y="10" width="16" height="10" rx="1" />
                                <path d="M8 10V7a4 4 0 0 1 8 0v3" />
                              </svg>
                            </button>
                            <button
                              className={
                                "flex h-11 w-full items-center gap-3 rounded-[7px] px-2 text-left text-[13px] font-medium \x74ext-[\x76ar(\x2d-text-secondary)] transition-[background-color,transform] duration-150 \x68over:\x62g-[#\x665f5f4] \x61ctive:\x73cale-[\x30.\x398] \x6dotion-reduce:\x74ransform-none"
                              }
                              type="button"
                              role="menuitem"
                              title="Copy section for Cursor"
                            >
                              <span
                                className={
                                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-[6px] \x62g-[#\x3111]"
                                }
                              >
                                <img
                                  className={"\x69nvert"}
                                  style={{ color: "transparent" }}
                                  alt=""
                                  aria-hidden="true"
                                  loading="lazy"
                                  width="22"
                                  height="22"
                                  decoding="async"
                                  src="/site-assets/8cf8b65ff525f0ff-fa119eef08d1931ac97df58d915cc032.png"
                                />
                              </span>
                              <span className="flex-1">Cursor</span>
                              <svg
                                className={"\x74ext-[\x76ar(\x2d-text-tertiary)]"}
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
                                <rect x="4" y="10" width="16" height="10" rx="1" />
                                <path d="M8 10V7a4 4 0 0 1 8 0v3" />
                              </svg>
                            </button>
                            <button
                              className={
                                "flex h-11 w-full items-center gap-3 rounded-[7px] px-2 text-left text-[13px] font-medium \x74ext-[\x76ar(\x2d-text-secondary)] transition-[background-color,transform] duration-150 \x68over:\x62g-[#\x665f5f4] \x61ctive:\x73cale-[\x30.\x398] \x6dotion-reduce:\x74ransform-none"
                              }
                              type="button"
                              role="menuitem"
                              title="Copy section for Windsurf"
                            >
                              <span
                                className={
                                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-[6px] \x62g-[#\x3111]"
                                }
                              >
                                <img
                                  className={"\x69nvert"}
                                  style={{ color: "transparent" }}
                                  alt=""
                                  aria-hidden="true"
                                  loading="lazy"
                                  width="22"
                                  height="22"
                                  decoding="async"
                                  src="/site-assets/d4db4e42691f0129-fe722cb6dea53ad9ccfd57b5bac0360a.png"
                                />
                              </span>
                              <span className="flex-1">Windsurf</span>
                              <svg
                                className={"\x74ext-[\x76ar(\x2d-text-tertiary)]"}
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
                                <rect x="4" y="10" width="16" height="10" rx="1" />
                                <path d="M8 10V7a4 4 0 0 1 8 0v3" />
                              </svg>
                            </button>
                            <button
                              className={
                                "flex h-11 w-full items-center gap-3 rounded-[7px] px-2 text-left text-[13px] font-medium \x74ext-[\x76ar(\x2d-text-secondary)] transition-[background-color,transform] duration-150 \x68over:\x62g-[#\x665f5f4] \x61ctive:\x73cale-[\x30.\x398] \x6dotion-reduce:\x74ransform-none"
                              }
                              type="button"
                              role="menuitem"
                              title="Copy section for v0"
                            >
                              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[6px] bg-white">
                                <img
                                  style={{ color: "transparent" }}
                                  alt=""
                                  aria-hidden="true"
                                  loading="lazy"
                                  width="22"
                                  height="22"
                                  decoding="async"
                                  src="/site-assets/b06fd899b1111984-dc3bed71932d0002eca70704eed42737.png"
                                />
                              </span>
                              <span className="flex-1">v0</span>
                              <svg
                                className={"\x74ext-[\x76ar(\x2d-text-tertiary)]"}
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
                                <rect x="4" y="10" width="16" height="10" rx="1" />
                                <path d="M8 10V7a4 4 0 0 1 8 0v3" />
                              </svg>
                            </button>
                            <button
                              className={
                                "flex h-11 w-full items-center gap-3 rounded-[7px] px-2 text-left text-[13px] font-medium \x74ext-[\x76ar(\x2d-text-secondary)] transition-[background-color,transform] duration-150 \x68over:\x62g-[#\x665f5f4] \x61ctive:\x73cale-[\x30.\x398] \x6dotion-reduce:\x74ransform-none"
                              }
                              type="button"
                              role="menuitem"
                              title="Copy section for Bolt"
                            >
                              <span
                                className={
                                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-[6px] \x62g-[#\x3111]"
                                }
                              >
                                <img
                                  style={{ color: "transparent" }}
                                  alt=""
                                  aria-hidden="true"
                                  loading="lazy"
                                  width="22"
                                  height="22"
                                  decoding="async"
                                  src="/site-assets/9e7c5dcffc2bada5-0a117f6ebf8d64db0cccb3cbba727dac.png"
                                />
                              </span>
                              <span className="flex-1">Bolt</span>
                              <svg
                                className={"\x74ext-[\x76ar(\x2d-text-tertiary)]"}
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
                                <rect x="4" y="10" width="16" height="10" rx="1" />
                                <path d="M8 10V7a4 4 0 0 1 8 0v3" />
                              </svg>
                            </button>
                            <button
                              className={
                                "flex h-11 w-full items-center gap-3 rounded-[7px] px-2 text-left text-[13px] font-medium \x74ext-[\x76ar(\x2d-text-secondary)] transition-[background-color,transform] duration-150 \x68over:\x62g-[#\x665f5f4] \x61ctive:\x73cale-[\x30.\x398] \x6dotion-reduce:\x74ransform-none"
                              }
                              type="button"
                              role="menuitem"
                              title="Copy section for Lovable"
                            >
                              <span
                                className={
                                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-[6px] \x62g-[#\x3111]"
                                }
                              >
                                <img
                                  style={{ color: "transparent" }}
                                  alt=""
                                  aria-hidden="true"
                                  loading="lazy"
                                  width="22"
                                  height="22"
                                  decoding="async"
                                  src="/site-assets/c071d2a2086e34ac-b5e0fcd3616727fef0705738ccdfbfc6.png"
                                />
                              </span>
                              <span className="flex-1">Lovable</span>
                              <svg
                                className={"\x74ext-[\x76ar(\x2d-text-tertiary)]"}
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
                                <rect x="4" y="10" width="16" height="10" rx="1" />
                                <path d="M8 10V7a4 4 0 0 1 8 0v3" />
                              </svg>
                            </button>
                            <button
                              className={
                                "flex h-11 w-full items-center gap-3 rounded-[7px] px-2 text-left text-[13px] font-medium \x74ext-[\x76ar(\x2d-text-secondary)] transition-[background-color,transform] duration-150 \x68over:\x62g-[#\x665f5f4] \x61ctive:\x73cale-[\x30.\x398] \x6dotion-reduce:\x74ransform-none"
                              }
                              type="button"
                              role="menuitem"
                              title="Copy section for Replit"
                            >
                              <span
                                className={
                                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-[6px] \x62g-[#\x66d5402]"
                                }
                              >
                                <img
                                  className={"\x62rightness-0 \x69nvert"}
                                  style={{ color: "transparent" }}
                                  alt=""
                                  aria-hidden="true"
                                  loading="lazy"
                                  width="22"
                                  height="22"
                                  decoding="async"
                                  src="/site-assets/c02184817b8a7268-6de29ee0366ebd52c2c2ba6f26e9e38f.png"
                                />
                              </span>
                              <span className="flex-1">Replit</span>
                              <svg
                                className={"\x74ext-[\x76ar(\x2d-text-tertiary)]"}
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
                                <rect x="4" y="10" width="16" height="10" rx="1" />
                                <path d="M8 10V7a4 4 0 0 1 8 0v3" />
                              </svg>
                            </button>
                            <p
                              className={
                                "\x62order-t \x62order-[\x76ar(\x2d-line)] px-2 pt-2 text-[11px] leading-snug \x74ext-[\x76ar(\x2d-text-tertiary)]"
                              }
                              role="status"
                              aria-live="polite"
                            >
                              Free with an account. No plan required.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                  <article
                    className={
                      "relative flex flex-col \x68as-[[\x61ria-expanded=\x74rue]]:\x7a-30 rounded-[20px] \x62order \x62order-[\x76ar(\x2d-line)] bg-white p-2 \x73hadow-[\x76ar(\x2d-shadow-raised)]"
                    }
                    style={
                      {
                        viewTransitionName: "sec-transmission",
                        viewTransitionClass: "sec-card",
                      } as CSSProperties
                    }
                    id="transmission"
                  >
                    <button
                      className={
                        "group relative block aspect-[16/10] w-full overflow-hidden rounded-[12px] \x62g-[\x76ar(\x2d-surface-sunken)] text-left"
                      }
                      type="button"
                      aria-label="Preview Transmission"
                    >
                      <img
                        className={
                          "object-cover \x6fbject-top transition-transform duration-300 \x67roup-hover:\x73cale-[\x31.\x3025]"
                        }
                        style={{
                          position: "absolute",
                          height: "100%",
                          width: "100%",
                          inset: "0px",
                          color: "transparent",
                        }}
                        alt="Transmission section preview"
                        loading="lazy"
                        decoding="async"
                        src="/site-assets/3502e614feb9f00d.webp"
                      />
                      <span
                        className={
                          "absolute bottom-2 right-2 rounded-full \x62g-white/\x395 px-3 py-1.5 text-[11px] font-medium \x74ext-[\x76ar(\x2d-text)] \x73hadow-[\x76ar(\x2d-shadow-raised)]"
                        }
                      >
                        Preview
                      </span>
                    </button>
                    <div
                      className={
                        "flex flex-1 flex-col gap-3 px-2 pb-1 pt-3 [&\x5fbutton[\x61ria-haspopup]]:\x77-full"
                      }
                    >
                      <div className="flex min-w-0 items-start justify-between gap-2">
                        <div className="min-w-0">
                          <h2
                            className={
                              "truncate text-[13px] font-medium \x74ext-[\x76ar(\x2d-text)]"
                            }
                          >
                            <a
                              className={"\x75nderline-offset-2 \x68over:\x75nderline"}
                              href="/sections/transmission"
                            >
                              Transmission
                            </a>
                          </h2>
                          <p
                            className={
                              "mt-0.5 truncate text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"
                            }
                          >
                            Scroll story · Studio Original
                          </p>
                        </div>
                        <a
                          className={
                            "-mr-1 shrink-0 rounded-full px-2 py-1 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)] transition-colors \x68over:\x62g-black/[\x30.\x304] \x68over:\x74ext-[\x76ar(\x2d-text)]"
                          }
                          href="/sections/transmission"
                        >
                          Details
                        </a>
                      </div>
                      <div className={"mt-auto [&>\x64iv]:\x77-full"}>
                        <div className="relative shrink-0">
                          <button
                            className={
                              "flex h-9 items-center gap-2 rounded-full \x62g-gradient-to-b \x66rom-white \x74o-[#\x663f3f2] pl-1 pr-3 text-[12px] font-medium \x74ext-[\x76ar(\x2d-text)] \x73hadow-[\x76ar(\x2d-shadow-raised)] transition-[transform,filter,box-shadow] duration-150 \x68over:\x2dtranslate-y-0.\x35 \x68over:\x73hadow-[\x30_5px_14px_rgba(\x30,\x30,\x30,\x30.\x312)] \x61ctive:\x74ranslate-y-px \x61ctive:\x73cale-[\x30.\x397] \x66ocus-visible:\x6futline-2 \x66ocus-visible:\x6futline-offset-2 \x66ocus-visible:\x6futline-[\x76ar(\x2d-accent)] \x6dotion-reduce:\x74ransform-none"
                            }
                            aria-expanded={openMenu0 === "observed-3"}
                            onClick={(event) => {
                              event.preventDefault();
                              event.stopPropagation();
                              setOpenMenu0((open) => (open === "observed-3" ? null : "observed-3"));
                            }}
                            type="button"
                            aria-label="Copy Section options"
                            aria-haspopup="menu"
                            aria-controls="site-import-popup-3"
                          >
                            <span
                              className={
                                "flex h-7 w-7 shrink-0 items-center justify-center rounded-full \x62g-[#\x37a5be8] text-white"
                              }
                            >
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                aria-hidden="true"
                              >
                                <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18" />
                              </svg>
                            </span>
                            <span className="flex-1 whitespace-nowrap text-left">Copy Section</span>
                            <span
                              className={
                                "rounded-full \x62g-[#\x657f5e1] px-1.5 py-px text-[9.5px] font-semibold uppercase tracking-wide \x74ext-[#\x31f5a33]"
                              }
                            >
                              Free
                            </span>
                            <svg
                              className={
                                "ml-0.5 \x74ext-[\x76ar(\x2d-text-secondary)] transition-transform \x2drotate-90"
                              }
                              width="13"
                              height="13"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              aria-hidden="true"
                            >
                              <path d="m6 9 6 6 6-6" />
                            </svg>
                          </button>
                          <div
                            className={
                              "\x61nimate-fade-in absolute right-0 z-[70] w-[248px] rounded-[12px] \x62order \x62order-[\x76ar(\x2d-line)] bg-white p-2 \x74ext-[\x76ar(\x2d-text)] \x73hadow-[\x30_18px_48px_rgba(\x30,\x30,\x30,\x30.\x316)] bottom-[calc(100%+8px)]"
                            }
                            aria-hidden={openMenu0 === "observed-3" ? undefined : undefined}
                            data-state={openMenu0 === "observed-3" ? undefined : undefined}
                            hidden={openMenu0 === "observed-3" ? undefined : true}
                            inert={openMenu0 === "observed-3" ? undefined : false}
                            {...{
                              open: (openMenu0 === "observed-3" ? undefined : false)
                                ? ""
                                : undefined,
                            }}
                            style={openMenu0 === "observed-3" ? {} : { display: "none" }}
                            role="menu"
                            aria-label="Copy Section destinations"
                            data-site-import-observed-popup=""
                            id="site-import-popup-3"
                          >
                            <AssistantCopyOptions />
                            <p
                              className={
                                "px-2 pb-2 pt-1 text-[10px] font-semibold uppercase tracking-[0.12em] \x74ext-[\x76ar(\x2d-text-tertiary)]"
                              }
                            >
                              Sign in to copy section
                            </p>
                            <button
                              className={
                                "flex h-11 w-full items-center gap-3 rounded-[7px] px-2 text-left text-[13px] font-medium \x74ext-[\x76ar(\x2d-text-secondary)] transition-[background-color,transform] duration-150 \x68over:\x62g-[#\x665f5f4] \x61ctive:\x73cale-[\x30.\x398] \x6dotion-reduce:\x74ransform-none"
                              }
                              type="button"
                              role="menuitem"
                              title="Copy section for Claude Code"
                            >
                              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[6px] bg-white">
                                <img
                                  style={{ color: "transparent" }}
                                  alt=""
                                  aria-hidden="true"
                                  loading="lazy"
                                  width="22"
                                  height="22"
                                  decoding="async"
                                  src="/site-assets/3737e44be6f1bbfb-7b27014eefcb6c8e988c06a3a27c4881.png"
                                />
                              </span>
                              <span className="flex-1">Claude Code</span>
                              <svg
                                className={"\x74ext-[\x76ar(\x2d-text-tertiary)]"}
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
                                <rect x="4" y="10" width="16" height="10" rx="1" />
                                <path d="M8 10V7a4 4 0 0 1 8 0v3" />
                              </svg>
                            </button>
                            <button
                              className={
                                "flex h-11 w-full items-center gap-3 rounded-[7px] px-2 text-left text-[13px] font-medium \x74ext-[\x76ar(\x2d-text-secondary)] transition-[background-color,transform] duration-150 \x68over:\x62g-[#\x665f5f4] \x61ctive:\x73cale-[\x30.\x398] \x6dotion-reduce:\x74ransform-none"
                              }
                              type="button"
                              role="menuitem"
                              title="Copy section for Cursor"
                            >
                              <span
                                className={
                                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-[6px] \x62g-[#\x3111]"
                                }
                              >
                                <img
                                  className={"\x69nvert"}
                                  style={{ color: "transparent" }}
                                  alt=""
                                  aria-hidden="true"
                                  loading="lazy"
                                  width="22"
                                  height="22"
                                  decoding="async"
                                  src="/site-assets/8cf8b65ff525f0ff-fa119eef08d1931ac97df58d915cc032.png"
                                />
                              </span>
                              <span className="flex-1">Cursor</span>
                              <svg
                                className={"\x74ext-[\x76ar(\x2d-text-tertiary)]"}
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
                                <rect x="4" y="10" width="16" height="10" rx="1" />
                                <path d="M8 10V7a4 4 0 0 1 8 0v3" />
                              </svg>
                            </button>
                            <button
                              className={
                                "flex h-11 w-full items-center gap-3 rounded-[7px] px-2 text-left text-[13px] font-medium \x74ext-[\x76ar(\x2d-text-secondary)] transition-[background-color,transform] duration-150 \x68over:\x62g-[#\x665f5f4] \x61ctive:\x73cale-[\x30.\x398] \x6dotion-reduce:\x74ransform-none"
                              }
                              type="button"
                              role="menuitem"
                              title="Copy section for Windsurf"
                            >
                              <span
                                className={
                                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-[6px] \x62g-[#\x3111]"
                                }
                              >
                                <img
                                  className={"\x69nvert"}
                                  style={{ color: "transparent" }}
                                  alt=""
                                  aria-hidden="true"
                                  loading="lazy"
                                  width="22"
                                  height="22"
                                  decoding="async"
                                  src="/site-assets/d4db4e42691f0129-fe722cb6dea53ad9ccfd57b5bac0360a.png"
                                />
                              </span>
                              <span className="flex-1">Windsurf</span>
                              <svg
                                className={"\x74ext-[\x76ar(\x2d-text-tertiary)]"}
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
                                <rect x="4" y="10" width="16" height="10" rx="1" />
                                <path d="M8 10V7a4 4 0 0 1 8 0v3" />
                              </svg>
                            </button>
                            <button
                              className={
                                "flex h-11 w-full items-center gap-3 rounded-[7px] px-2 text-left text-[13px] font-medium \x74ext-[\x76ar(\x2d-text-secondary)] transition-[background-color,transform] duration-150 \x68over:\x62g-[#\x665f5f4] \x61ctive:\x73cale-[\x30.\x398] \x6dotion-reduce:\x74ransform-none"
                              }
                              type="button"
                              role="menuitem"
                              title="Copy section for v0"
                            >
                              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[6px] bg-white">
                                <img
                                  style={{ color: "transparent" }}
                                  alt=""
                                  aria-hidden="true"
                                  loading="lazy"
                                  width="22"
                                  height="22"
                                  decoding="async"
                                  src="/site-assets/b06fd899b1111984-dc3bed71932d0002eca70704eed42737.png"
                                />
                              </span>
                              <span className="flex-1">v0</span>
                              <svg
                                className={"\x74ext-[\x76ar(\x2d-text-tertiary)]"}
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
                                <rect x="4" y="10" width="16" height="10" rx="1" />
                                <path d="M8 10V7a4 4 0 0 1 8 0v3" />
                              </svg>
                            </button>
                            <button
                              className={
                                "flex h-11 w-full items-center gap-3 rounded-[7px] px-2 text-left text-[13px] font-medium \x74ext-[\x76ar(\x2d-text-secondary)] transition-[background-color,transform] duration-150 \x68over:\x62g-[#\x665f5f4] \x61ctive:\x73cale-[\x30.\x398] \x6dotion-reduce:\x74ransform-none"
                              }
                              type="button"
                              role="menuitem"
                              title="Copy section for Bolt"
                            >
                              <span
                                className={
                                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-[6px] \x62g-[#\x3111]"
                                }
                              >
                                <img
                                  style={{ color: "transparent" }}
                                  alt=""
                                  aria-hidden="true"
                                  loading="lazy"
                                  width="22"
                                  height="22"
                                  decoding="async"
                                  src="/site-assets/9e7c5dcffc2bada5-0a117f6ebf8d64db0cccb3cbba727dac.png"
                                />
                              </span>
                              <span className="flex-1">Bolt</span>
                              <svg
                                className={"\x74ext-[\x76ar(\x2d-text-tertiary)]"}
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
                                <rect x="4" y="10" width="16" height="10" rx="1" />
                                <path d="M8 10V7a4 4 0 0 1 8 0v3" />
                              </svg>
                            </button>
                            <button
                              className={
                                "flex h-11 w-full items-center gap-3 rounded-[7px] px-2 text-left text-[13px] font-medium \x74ext-[\x76ar(\x2d-text-secondary)] transition-[background-color,transform] duration-150 \x68over:\x62g-[#\x665f5f4] \x61ctive:\x73cale-[\x30.\x398] \x6dotion-reduce:\x74ransform-none"
                              }
                              type="button"
                              role="menuitem"
                              title="Copy section for Lovable"
                            >
                              <span
                                className={
                                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-[6px] \x62g-[#\x3111]"
                                }
                              >
                                <img
                                  style={{ color: "transparent" }}
                                  alt=""
                                  aria-hidden="true"
                                  loading="lazy"
                                  width="22"
                                  height="22"
                                  decoding="async"
                                  src="/site-assets/c071d2a2086e34ac-b5e0fcd3616727fef0705738ccdfbfc6.png"
                                />
                              </span>
                              <span className="flex-1">Lovable</span>
                              <svg
                                className={"\x74ext-[\x76ar(\x2d-text-tertiary)]"}
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
                                <rect x="4" y="10" width="16" height="10" rx="1" />
                                <path d="M8 10V7a4 4 0 0 1 8 0v3" />
                              </svg>
                            </button>
                            <button
                              className={
                                "flex h-11 w-full items-center gap-3 rounded-[7px] px-2 text-left text-[13px] font-medium \x74ext-[\x76ar(\x2d-text-secondary)] transition-[background-color,transform] duration-150 \x68over:\x62g-[#\x665f5f4] \x61ctive:\x73cale-[\x30.\x398] \x6dotion-reduce:\x74ransform-none"
                              }
                              type="button"
                              role="menuitem"
                              title="Copy section for Replit"
                            >
                              <span
                                className={
                                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-[6px] \x62g-[#\x66d5402]"
                                }
                              >
                                <img
                                  className={"\x62rightness-0 \x69nvert"}
                                  style={{ color: "transparent" }}
                                  alt=""
                                  aria-hidden="true"
                                  loading="lazy"
                                  width="22"
                                  height="22"
                                  decoding="async"
                                  src="/site-assets/c02184817b8a7268-6de29ee0366ebd52c2c2ba6f26e9e38f.png"
                                />
                              </span>
                              <span className="flex-1">Replit</span>
                              <svg
                                className={"\x74ext-[\x76ar(\x2d-text-tertiary)]"}
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
                                <rect x="4" y="10" width="16" height="10" rx="1" />
                                <path d="M8 10V7a4 4 0 0 1 8 0v3" />
                              </svg>
                            </button>
                            <p
                              className={
                                "\x62order-t \x62order-[\x76ar(\x2d-line)] px-2 pt-2 text-[11px] leading-snug \x74ext-[\x76ar(\x2d-text-tertiary)]"
                              }
                              role="status"
                              aria-live="polite"
                            >
                              Free with an account. No plan required.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                  <ImportedArticleFlorilegium />
                  <ImportedArticleJoiner />
                  <ImportedArticleDarkroom />
                  <ImportedArticle404Planet />
                  <ImportedArticleTide />
                  <ImportedArticleDesktop />
                  <ImportedArticleKernel />
                  <ImportedArticlePetal />
                  <ImportedArticleVinyl />
                  <article
                    className={
                      "relative flex flex-col \x68as-[[\x61ria-expanded=\x74rue]]:\x7a-30 rounded-[20px] \x62order \x62order-[\x76ar(\x2d-line)] bg-white p-2 \x73hadow-[\x76ar(\x2d-shadow-raised)]"
                    }
                    style={
                      {
                        viewTransitionName: "sec-cyanotype",
                        viewTransitionClass: "sec-card",
                      } as CSSProperties
                    }
                    id="cyanotype"
                  >
                    <button
                      className={
                        "group relative block aspect-[16/10] w-full overflow-hidden rounded-[12px] \x62g-[\x76ar(\x2d-surface-sunken)] text-left"
                      }
                      type="button"
                      aria-label="Preview Cyanotype"
                    >
                      <img
                        className={
                          "object-cover \x6fbject-top transition-transform duration-300 \x67roup-hover:\x73cale-[\x31.\x3025]"
                        }
                        style={{
                          position: "absolute",
                          height: "100%",
                          width: "100%",
                          inset: "0px",
                          color: "transparent",
                        }}
                        alt="Cyanotype section preview"
                        loading="lazy"
                        decoding="async"
                        src="/site-assets/3ccb62573f5675de.webp"
                      />
                      <span
                        className={
                          "absolute bottom-2 right-2 rounded-full \x62g-white/\x395 px-3 py-1.5 text-[11px] font-medium \x74ext-[\x76ar(\x2d-text)] \x73hadow-[\x76ar(\x2d-shadow-raised)]"
                        }
                      >
                        Preview
                      </span>
                    </button>
                    <div
                      className={
                        "flex flex-1 flex-col gap-3 px-2 pb-1 pt-3 [&\x5fbutton[\x61ria-haspopup]]:\x77-full"
                      }
                    >
                      <div className="flex min-w-0 items-start justify-between gap-2">
                        <div className="min-w-0">
                          <h2
                            className={
                              "truncate text-[13px] font-medium \x74ext-[\x76ar(\x2d-text)]"
                            }
                          >
                            <a
                              className={"\x75nderline-offset-2 \x68over:\x75nderline"}
                              href="/sections/cyanotype"
                            >
                              Cyanotype
                            </a>
                          </h2>
                          <p
                            className={
                              "mt-0.5 truncate text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"
                            }
                          >
                            Scroll story · Studio Original
                          </p>
                        </div>
                        <a
                          className={
                            "-mr-1 shrink-0 rounded-full px-2 py-1 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)] transition-colors \x68over:\x62g-black/[\x30.\x304] \x68over:\x74ext-[\x76ar(\x2d-text)]"
                          }
                          href="/sections/cyanotype"
                        >
                          Details
                        </a>
                      </div>
                      <div className={"mt-auto [&>\x64iv]:\x77-full"}>
                        <div className="relative shrink-0">
                          <button
                            className={
                              "flex h-9 items-center gap-2 rounded-full \x62g-gradient-to-b \x66rom-white \x74o-[#\x663f3f2] pl-1 pr-3 text-[12px] font-medium \x74ext-[\x76ar(\x2d-text)] \x73hadow-[\x76ar(\x2d-shadow-raised)] transition-[transform,filter,box-shadow] duration-150 \x68over:\x2dtranslate-y-0.\x35 \x68over:\x73hadow-[\x30_5px_14px_rgba(\x30,\x30,\x30,\x30.\x312)] \x61ctive:\x74ranslate-y-px \x61ctive:\x73cale-[\x30.\x397] \x66ocus-visible:\x6futline-2 \x66ocus-visible:\x6futline-offset-2 \x66ocus-visible:\x6futline-[\x76ar(\x2d-accent)] \x6dotion-reduce:\x74ransform-none"
                            }
                            type="button"
                            aria-label="Copy Section options"
                            aria-haspopup="menu"
                            aria-expanded="false"
                          >
                            <span
                              className={
                                "flex h-7 w-7 shrink-0 items-center justify-center rounded-full \x62g-[#\x37a5be8] text-white"
                              }
                            >
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                aria-hidden="true"
                              >
                                <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18" />
                              </svg>
                            </span>
                            <span className="flex-1 whitespace-nowrap text-left">Copy Section</span>
                            <span
                              className={
                                "rounded-full \x62g-[#\x657f5e1] px-1.5 py-px text-[9.5px] font-semibold uppercase tracking-wide \x74ext-[#\x31f5a33]"
                              }
                            >
                              Free
                            </span>
                            <svg
                              className={
                                "ml-0.5 \x74ext-[\x76ar(\x2d-text-secondary)] transition-transform \x2drotate-90"
                              }
                              width="13"
                              height="13"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              aria-hidden="true"
                            >
                              <path d="m6 9 6 6 6-6" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>
                  <article
                    className={
                      "relative flex flex-col \x68as-[[\x61ria-expanded=\x74rue]]:\x7a-30 rounded-[20px] \x62order \x62order-[\x76ar(\x2d-line)] bg-white p-2 \x73hadow-[\x76ar(\x2d-shadow-raised)]"
                    }
                    style={
                      {
                        viewTransitionName: "sec-prompt-parlor",
                        viewTransitionClass: "sec-card",
                      } as CSSProperties
                    }
                    id="prompt-parlor"
                  >
                    <button
                      className={
                        "group relative block aspect-[16/10] w-full overflow-hidden rounded-[12px] \x62g-[\x76ar(\x2d-surface-sunken)] text-left"
                      }
                      type="button"
                      aria-label="Preview Parlor"
                    >
                      <img
                        className={
                          "object-cover \x6fbject-top transition-transform duration-300 \x67roup-hover:\x73cale-[\x31.\x3025]"
                        }
                        style={{
                          position: "absolute",
                          height: "100%",
                          width: "100%",
                          inset: "0px",
                          color: "transparent",
                        }}
                        alt="Parlor section preview"
                        loading="lazy"
                        decoding="async"
                        src="/site-assets/d1a5fe8b10a3ed06.webp"
                      />
                      <span
                        className={
                          "absolute bottom-2 right-2 rounded-full \x62g-white/\x395 px-3 py-1.5 text-[11px] font-medium \x74ext-[\x76ar(\x2d-text)] \x73hadow-[\x76ar(\x2d-shadow-raised)]"
                        }
                      >
                        Preview
                      </span>
                    </button>
                    <div
                      className={
                        "flex flex-1 flex-col gap-3 px-2 pb-1 pt-3 [&\x5fbutton[\x61ria-haspopup]]:\x77-full"
                      }
                    >
                      <div className="flex min-w-0 items-start justify-between gap-2">
                        <div className="min-w-0">
                          <h2
                            className={
                              "truncate text-[13px] font-medium \x74ext-[\x76ar(\x2d-text)]"
                            }
                          >
                            <a
                              className={"\x75nderline-offset-2 \x68over:\x75nderline"}
                              href="/sections/prompt-parlor"
                            >
                              Parlor
                            </a>
                          </h2>
                          <p
                            className={
                              "mt-0.5 truncate text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"
                            }
                          >
                            Hero section · Studio Original
                          </p>
                        </div>
                        <a
                          className={
                            "-mr-1 shrink-0 rounded-full px-2 py-1 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)] transition-colors \x68over:\x62g-black/[\x30.\x304] \x68over:\x74ext-[\x76ar(\x2d-text)]"
                          }
                          href="/sections/prompt-parlor"
                        >
                          Details
                        </a>
                      </div>
                      <div className={"mt-auto [&>\x64iv]:\x77-full"}>
                        <div className="relative shrink-0">
                          <button
                            className={
                              "flex h-9 items-center gap-2 rounded-full \x62g-gradient-to-b \x66rom-white \x74o-[#\x663f3f2] pl-1 pr-3 text-[12px] font-medium \x74ext-[\x76ar(\x2d-text)] \x73hadow-[\x76ar(\x2d-shadow-raised)] transition-[transform,filter,box-shadow] duration-150 \x68over:\x2dtranslate-y-0.\x35 \x68over:\x73hadow-[\x30_5px_14px_rgba(\x30,\x30,\x30,\x30.\x312)] \x61ctive:\x74ranslate-y-px \x61ctive:\x73cale-[\x30.\x397] \x66ocus-visible:\x6futline-2 \x66ocus-visible:\x6futline-offset-2 \x66ocus-visible:\x6futline-[\x76ar(\x2d-accent)] \x6dotion-reduce:\x74ransform-none"
                            }
                            type="button"
                            aria-label="Copy Section options"
                            aria-haspopup="menu"
                            aria-expanded="false"
                          >
                            <span
                              className={
                                "flex h-7 w-7 shrink-0 items-center justify-center rounded-full \x62g-[#\x37a5be8] text-white"
                              }
                            >
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                aria-hidden="true"
                              >
                                <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18" />
                              </svg>
                            </span>
                            <span className="flex-1 whitespace-nowrap text-left">Copy Section</span>
                            <span
                              className={
                                "rounded-full \x62g-[#\x657f5e1] px-1.5 py-px text-[9.5px] font-semibold uppercase tracking-wide \x74ext-[#\x31f5a33]"
                              }
                            >
                              Free
                            </span>
                            <svg
                              className={
                                "ml-0.5 \x74ext-[\x76ar(\x2d-text-secondary)] transition-transform \x2drotate-90"
                              }
                              width="13"
                              height="13"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              aria-hidden="true"
                            >
                              <path d="m6 9 6 6 6-6" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>
                  <article
                    className={
                      "relative flex flex-col \x68as-[[\x61ria-expanded=\x74rue]]:\x7a-30 rounded-[20px] \x62order \x62order-[\x76ar(\x2d-line)] bg-white p-2 \x73hadow-[\x76ar(\x2d-shadow-raised)]"
                    }
                    style={
                      {
                        viewTransitionName: "sec-evergrid-home-product-showcase-01",
                        viewTransitionClass: "sec-card",
                      } as CSSProperties
                    }
                    id="evergrid-home-product-showcase-01"
                  >
                    <button
                      className={
                        "group relative block aspect-[16/10] w-full overflow-hidden rounded-[12px] \x62g-[\x76ar(\x2d-surface-sunken)] text-left"
                      }
                      type="button"
                      aria-label="Preview Home — Product Showcase 01"
                    >
                      <img
                        className={
                          "object-cover \x6fbject-top transition-transform duration-300 \x67roup-hover:\x73cale-[\x31.\x3025]"
                        }
                        style={{
                          position: "absolute",
                          height: "100%",
                          width: "100%",
                          inset: "0px",
                          color: "transparent",
                        }}
                        alt="Home — Product Showcase 01 section preview"
                        loading="lazy"
                        decoding="async"
                        width="640"
                        height="400"
                        src="/site-assets/adef9145afaf21d6.webp"
                      />
                      <span
                        className={
                          "absolute bottom-2 right-2 rounded-full \x62g-white/\x395 px-3 py-1.5 text-[11px] font-medium \x74ext-[\x76ar(\x2d-text)] \x73hadow-[\x76ar(\x2d-shadow-raised)]"
                        }
                      >
                        Preview
                      </span>
                    </button>
                    <div
                      className={
                        "flex flex-1 flex-col gap-3 px-2 pb-1 pt-3 [&\x5fbutton[\x61ria-haspopup]]:\x77-full"
                      }
                    >
                      <div className="flex min-w-0 items-start justify-between gap-2">
                        <div className="min-w-0">
                          <h2
                            className={
                              "truncate text-[13px] font-medium \x74ext-[\x76ar(\x2d-text)]"
                            }
                          >
                            <a
                              className={"\x75nderline-offset-2 \x68over:\x75nderline"}
                              href="/sections/evergrid-home-product-showcase-01"
                            >
                              Home — Product Showcase 01
                            </a>
                          </h2>
                          <p
                            className={
                              "mt-0.5 truncate text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"
                            }
                          >
                            Template section · From Evergrid
                          </p>
                        </div>
                        <a
                          className={
                            "-mr-1 shrink-0 rounded-full px-2 py-1 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)] transition-colors \x68over:\x62g-black/[\x30.\x304] \x68over:\x74ext-[\x76ar(\x2d-text)]"
                          }
                          href="/sections/evergrid-home-product-showcase-01"
                        >
                          Details
                        </a>
                      </div>
                      <div className={"mt-auto [&>\x64iv]:\x77-full"}>
                        <div className="relative shrink-0">
                          <button
                            className={
                              "flex h-9 items-center gap-2 rounded-full \x62g-gradient-to-b \x66rom-white \x74o-[#\x663f3f2] pl-1 pr-3 text-[12px] font-medium \x74ext-[\x76ar(\x2d-text)] \x73hadow-[\x76ar(\x2d-shadow-raised)] transition-[transform,filter,box-shadow] duration-150 \x68over:\x2dtranslate-y-0.\x35 \x68over:\x73hadow-[\x30_5px_14px_rgba(\x30,\x30,\x30,\x30.\x312)] \x61ctive:\x74ranslate-y-px \x61ctive:\x73cale-[\x30.\x397] \x66ocus-visible:\x6futline-2 \x66ocus-visible:\x6futline-offset-2 \x66ocus-visible:\x6futline-[\x76ar(\x2d-accent)] \x6dotion-reduce:\x74ransform-none"
                            }
                            type="button"
                            aria-label="Copy Section options"
                            aria-haspopup="menu"
                            aria-expanded="false"
                          >
                            <span
                              className={
                                "flex h-7 w-7 shrink-0 items-center justify-center rounded-full \x62g-[#\x37a5be8] text-white"
                              }
                            >
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                aria-hidden="true"
                              >
                                <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18" />
                              </svg>
                            </span>
                            <span className="flex-1 whitespace-nowrap text-left">Copy Section</span>
                            <span
                              className={
                                "rounded-full \x62g-[#\x657f5e1] px-1.5 py-px text-[9.5px] font-semibold uppercase tracking-wide \x74ext-[#\x31f5a33]"
                              }
                            >
                              Free
                            </span>
                            <svg
                              className={
                                "ml-0.5 \x74ext-[\x76ar(\x2d-text-secondary)] transition-transform \x2drotate-90"
                              }
                              width="13"
                              height="13"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              aria-hidden="true"
                            >
                              <path d="m6 9 6 6 6-6" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>
                  <article
                    className={
                      "relative flex flex-col \x68as-[[\x61ria-expanded=\x74rue]]:\x7a-30 rounded-[20px] \x62order \x62order-[\x76ar(\x2d-line)] bg-white p-2 \x73hadow-[\x76ar(\x2d-shadow-raised)]"
                    }
                    style={
                      {
                        viewTransitionName: "sec-rootsong",
                        viewTransitionClass: "sec-card",
                      } as CSSProperties
                    }
                    id="rootsong"
                  >
                    <button
                      className={
                        "group relative block aspect-[16/10] w-full overflow-hidden rounded-[12px] \x62g-[\x76ar(\x2d-surface-sunken)] text-left"
                      }
                      type="button"
                      aria-label="Preview Rootsong"
                    >
                      <img
                        className={
                          "object-cover \x6fbject-top transition-transform duration-300 \x67roup-hover:\x73cale-[\x31.\x3025]"
                        }
                        style={{
                          position: "absolute",
                          height: "100%",
                          width: "100%",
                          inset: "0px",
                          color: "transparent",
                        }}
                        alt="Rootsong section preview"
                        loading="lazy"
                        decoding="async"
                        src="/site-assets/4338c6978203608e.webp"
                      />
                      <span
                        className={
                          "absolute bottom-2 right-2 rounded-full \x62g-white/\x395 px-3 py-1.5 text-[11px] font-medium \x74ext-[\x76ar(\x2d-text)] \x73hadow-[\x76ar(\x2d-shadow-raised)]"
                        }
                      >
                        Preview
                      </span>
                    </button>
                    <div
                      className={
                        "flex flex-1 flex-col gap-3 px-2 pb-1 pt-3 [&\x5fbutton[\x61ria-haspopup]]:\x77-full"
                      }
                    >
                      <div className="flex min-w-0 items-start justify-between gap-2">
                        <div className="min-w-0">
                          <h2
                            className={
                              "truncate text-[13px] font-medium \x74ext-[\x76ar(\x2d-text)]"
                            }
                          >
                            <a
                              className={"\x75nderline-offset-2 \x68over:\x75nderline"}
                              href="/sections/rootsong"
                            >
                              Rootsong
                            </a>
                          </h2>
                          <p
                            className={
                              "mt-0.5 truncate text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"
                            }
                          >
                            Scroll story · Studio Original
                          </p>
                        </div>
                        <a
                          className={
                            "-mr-1 shrink-0 rounded-full px-2 py-1 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)] transition-colors \x68over:\x62g-black/[\x30.\x304] \x68over:\x74ext-[\x76ar(\x2d-text)]"
                          }
                          href="/sections/rootsong"
                        >
                          Details
                        </a>
                      </div>
                      <div className={"mt-auto [&>\x64iv]:\x77-full"}>
                        <div className="relative shrink-0">
                          <button
                            className={
                              "flex h-9 items-center gap-2 rounded-full \x62g-gradient-to-b \x66rom-white \x74o-[#\x663f3f2] pl-1 pr-3 text-[12px] font-medium \x74ext-[\x76ar(\x2d-text)] \x73hadow-[\x76ar(\x2d-shadow-raised)] transition-[transform,filter,box-shadow] duration-150 \x68over:\x2dtranslate-y-0.\x35 \x68over:\x73hadow-[\x30_5px_14px_rgba(\x30,\x30,\x30,\x30.\x312)] \x61ctive:\x74ranslate-y-px \x61ctive:\x73cale-[\x30.\x397] \x66ocus-visible:\x6futline-2 \x66ocus-visible:\x6futline-offset-2 \x66ocus-visible:\x6futline-[\x76ar(\x2d-accent)] \x6dotion-reduce:\x74ransform-none"
                            }
                            type="button"
                            aria-label="Copy Section options"
                            aria-haspopup="menu"
                            aria-expanded="false"
                          >
                            <span
                              className={
                                "flex h-7 w-7 shrink-0 items-center justify-center rounded-full \x62g-[#\x37a5be8] text-white"
                              }
                            >
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                aria-hidden="true"
                              >
                                <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18" />
                              </svg>
                            </span>
                            <span className="flex-1 whitespace-nowrap text-left">Copy Section</span>
                            <span
                              className={
                                "rounded-full \x62g-[#\x657f5e1] px-1.5 py-px text-[9.5px] font-semibold uppercase tracking-wide \x74ext-[#\x31f5a33]"
                              }
                            >
                              Free
                            </span>
                            <svg
                              className={
                                "ml-0.5 \x74ext-[\x76ar(\x2d-text-secondary)] transition-transform \x2drotate-90"
                              }
                              width="13"
                              height="13"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              aria-hidden="true"
                            >
                              <path d="m6 9 6 6 6-6" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>
                  <article
                    className={
                      "relative flex flex-col \x68as-[[\x61ria-expanded=\x74rue]]:\x7a-30 rounded-[20px] \x62order \x62order-[\x76ar(\x2d-line)] bg-white p-2 \x73hadow-[\x76ar(\x2d-shadow-raised)]"
                    }
                    style={
                      {
                        viewTransitionName: "sec-prompt-horizon",
                        viewTransitionClass: "sec-card",
                      } as CSSProperties
                    }
                    id="prompt-horizon"
                  >
                    <button
                      className={
                        "group relative block aspect-[16/10] w-full overflow-hidden rounded-[12px] \x62g-[\x76ar(\x2d-surface-sunken)] text-left"
                      }
                      type="button"
                      aria-label="Preview Horizon"
                    >
                      <img
                        className={
                          "object-cover \x6fbject-top transition-transform duration-300 \x67roup-hover:\x73cale-[\x31.\x3025]"
                        }
                        style={{
                          position: "absolute",
                          height: "100%",
                          width: "100%",
                          inset: "0px",
                          color: "transparent",
                        }}
                        alt="Horizon section preview"
                        loading="lazy"
                        decoding="async"
                        src="/site-assets/407d273d18a04f86.webp"
                      />
                      <span
                        className={
                          "absolute bottom-2 right-2 rounded-full \x62g-white/\x395 px-3 py-1.5 text-[11px] font-medium \x74ext-[\x76ar(\x2d-text)] \x73hadow-[\x76ar(\x2d-shadow-raised)]"
                        }
                      >
                        Preview
                      </span>
                    </button>
                    <div
                      className={
                        "flex flex-1 flex-col gap-3 px-2 pb-1 pt-3 [&\x5fbutton[\x61ria-haspopup]]:\x77-full"
                      }
                    >
                      <div className="flex min-w-0 items-start justify-between gap-2">
                        <div className="min-w-0">
                          <h2
                            className={
                              "truncate text-[13px] font-medium \x74ext-[\x76ar(\x2d-text)]"
                            }
                          >
                            <a
                              className={"\x75nderline-offset-2 \x68over:\x75nderline"}
                              href="/sections/prompt-horizon"
                            >
                              Horizon
                            </a>
                          </h2>
                          <p
                            className={
                              "mt-0.5 truncate text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"
                            }
                          >
                            Hero section · Studio Original
                          </p>
                        </div>
                        <a
                          className={
                            "-mr-1 shrink-0 rounded-full px-2 py-1 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)] transition-colors \x68over:\x62g-black/[\x30.\x304] \x68over:\x74ext-[\x76ar(\x2d-text)]"
                          }
                          href="/sections/prompt-horizon"
                        >
                          Details
                        </a>
                      </div>
                      <div className={"mt-auto [&>\x64iv]:\x77-full"}>
                        <div className="relative shrink-0">
                          <button
                            className={
                              "flex h-9 items-center gap-2 rounded-full \x62g-gradient-to-b \x66rom-white \x74o-[#\x663f3f2] pl-1 pr-3 text-[12px] font-medium \x74ext-[\x76ar(\x2d-text)] \x73hadow-[\x76ar(\x2d-shadow-raised)] transition-[transform,filter,box-shadow] duration-150 \x68over:\x2dtranslate-y-0.\x35 \x68over:\x73hadow-[\x30_5px_14px_rgba(\x30,\x30,\x30,\x30.\x312)] \x61ctive:\x74ranslate-y-px \x61ctive:\x73cale-[\x30.\x397] \x66ocus-visible:\x6futline-2 \x66ocus-visible:\x6futline-offset-2 \x66ocus-visible:\x6futline-[\x76ar(\x2d-accent)] \x6dotion-reduce:\x74ransform-none"
                            }
                            type="button"
                            aria-label="Copy Section options"
                            aria-haspopup="menu"
                            aria-expanded="false"
                          >
                            <span
                              className={
                                "flex h-7 w-7 shrink-0 items-center justify-center rounded-full \x62g-[#\x37a5be8] text-white"
                              }
                            >
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                aria-hidden="true"
                              >
                                <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18" />
                              </svg>
                            </span>
                            <span className="flex-1 whitespace-nowrap text-left">Copy Section</span>
                            <span
                              className={
                                "rounded-full \x62g-[#\x657f5e1] px-1.5 py-px text-[9.5px] font-semibold uppercase tracking-wide \x74ext-[#\x31f5a33]"
                              }
                            >
                              Free
                            </span>
                            <svg
                              className={
                                "ml-0.5 \x74ext-[\x76ar(\x2d-text-secondary)] transition-transform \x2drotate-90"
                              }
                              width="13"
                              height="13"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              aria-hidden="true"
                            >
                              <path d="m6 9 6 6 6-6" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>
                  <article
                    className={
                      "relative flex flex-col \x68as-[[\x61ria-expanded=\x74rue]]:\x7a-30 rounded-[20px] \x62order \x62order-[\x76ar(\x2d-line)] bg-white p-2 \x73hadow-[\x76ar(\x2d-shadow-raised)]"
                    }
                    style={
                      {
                        viewTransitionName: "sec-herbarium",
                        viewTransitionClass: "sec-card",
                      } as CSSProperties
                    }
                    id="herbarium"
                  >
                    <button
                      className={
                        "group relative block aspect-[16/10] w-full overflow-hidden rounded-[12px] \x62g-[\x76ar(\x2d-surface-sunken)] text-left"
                      }
                      type="button"
                      aria-label="Preview Herbarium"
                    >
                      <img
                        className={
                          "object-cover \x6fbject-top transition-transform duration-300 \x67roup-hover:\x73cale-[\x31.\x3025]"
                        }
                        style={{
                          position: "absolute",
                          height: "100%",
                          width: "100%",
                          inset: "0px",
                          color: "transparent",
                        }}
                        alt="Herbarium section preview"
                        loading="lazy"
                        decoding="async"
                        src="/site-assets/6b164f85294c8618.webp"
                      />
                      <span
                        className={
                          "absolute bottom-2 right-2 rounded-full \x62g-white/\x395 px-3 py-1.5 text-[11px] font-medium \x74ext-[\x76ar(\x2d-text)] \x73hadow-[\x76ar(\x2d-shadow-raised)]"
                        }
                      >
                        Preview
                      </span>
                    </button>
                    <div
                      className={
                        "flex flex-1 flex-col gap-3 px-2 pb-1 pt-3 [&\x5fbutton[\x61ria-haspopup]]:\x77-full"
                      }
                    >
                      <div className="flex min-w-0 items-start justify-between gap-2">
                        <div className="min-w-0">
                          <h2
                            className={
                              "truncate text-[13px] font-medium \x74ext-[\x76ar(\x2d-text)]"
                            }
                          >
                            <a
                              className={"\x75nderline-offset-2 \x68over:\x75nderline"}
                              href="/sections/herbarium"
                            >
                              Herbarium
                            </a>
                          </h2>
                          <p
                            className={
                              "mt-0.5 truncate text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"
                            }
                          >
                            Scroll story · Studio Original
                          </p>
                        </div>
                        <a
                          className={
                            "-mr-1 shrink-0 rounded-full px-2 py-1 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)] transition-colors \x68over:\x62g-black/[\x30.\x304] \x68over:\x74ext-[\x76ar(\x2d-text)]"
                          }
                          href="/sections/herbarium"
                        >
                          Details
                        </a>
                      </div>
                      <div className={"mt-auto [&>\x64iv]:\x77-full"}>
                        <div className="relative shrink-0">
                          <button
                            className={
                              "flex h-9 items-center gap-2 rounded-full \x62g-gradient-to-b \x66rom-white \x74o-[#\x663f3f2] pl-1 pr-3 text-[12px] font-medium \x74ext-[\x76ar(\x2d-text)] \x73hadow-[\x76ar(\x2d-shadow-raised)] transition-[transform,filter,box-shadow] duration-150 \x68over:\x2dtranslate-y-0.\x35 \x68over:\x73hadow-[\x30_5px_14px_rgba(\x30,\x30,\x30,\x30.\x312)] \x61ctive:\x74ranslate-y-px \x61ctive:\x73cale-[\x30.\x397] \x66ocus-visible:\x6futline-2 \x66ocus-visible:\x6futline-offset-2 \x66ocus-visible:\x6futline-[\x76ar(\x2d-accent)] \x6dotion-reduce:\x74ransform-none"
                            }
                            type="button"
                            aria-label="Copy Section options"
                            aria-haspopup="menu"
                            aria-expanded="false"
                          >
                            <span
                              className={
                                "flex h-7 w-7 shrink-0 items-center justify-center rounded-full \x62g-[#\x37a5be8] text-white"
                              }
                            >
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                aria-hidden="true"
                              >
                                <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18" />
                              </svg>
                            </span>
                            <span className="flex-1 whitespace-nowrap text-left">Copy Section</span>
                            <span
                              className={
                                "rounded-full \x62g-[#\x657f5e1] px-1.5 py-px text-[9.5px] font-semibold uppercase tracking-wide \x74ext-[#\x31f5a33]"
                              }
                            >
                              Free
                            </span>
                            <svg
                              className={
                                "ml-0.5 \x74ext-[\x76ar(\x2d-text-secondary)] transition-transform \x2drotate-90"
                              }
                              width="13"
                              height="13"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              aria-hidden="true"
                            >
                              <path d="m6 9 6 6 6-6" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>
                  <article
                    className={
                      "relative flex flex-col \x68as-[[\x61ria-expanded=\x74rue]]:\x7a-30 rounded-[20px] \x62order \x62order-[\x76ar(\x2d-line)] bg-white p-2 \x73hadow-[\x76ar(\x2d-shadow-raised)]"
                    }
                    style={
                      {
                        viewTransitionName: "sec-evergrid-product-integrations-01",
                        viewTransitionClass: "sec-card",
                      } as CSSProperties
                    }
                    id="evergrid-product-integrations-01"
                  >
                    <button
                      className={
                        "group relative block aspect-[16/10] w-full overflow-hidden rounded-[12px] \x62g-[\x76ar(\x2d-surface-sunken)] text-left"
                      }
                      type="button"
                      aria-label="Preview Product — Integrations 01"
                    >
                      <img
                        className={
                          "object-cover \x6fbject-top transition-transform duration-300 \x67roup-hover:\x73cale-[\x31.\x3025]"
                        }
                        style={{
                          position: "absolute",
                          height: "100%",
                          width: "100%",
                          inset: "0px",
                          color: "transparent",
                        }}
                        alt="Product — Integrations 01 section preview"
                        loading="lazy"
                        decoding="async"
                        src="/site-assets/4ae55f1e32580ebf.webp"
                      />
                      <span
                        className={
                          "absolute bottom-2 right-2 rounded-full \x62g-white/\x395 px-3 py-1.5 text-[11px] font-medium \x74ext-[\x76ar(\x2d-text)] \x73hadow-[\x76ar(\x2d-shadow-raised)]"
                        }
                      >
                        Preview
                      </span>
                    </button>
                    <div
                      className={
                        "flex flex-1 flex-col gap-3 px-2 pb-1 pt-3 [&\x5fbutton[\x61ria-haspopup]]:\x77-full"
                      }
                    >
                      <div className="flex min-w-0 items-start justify-between gap-2">
                        <div className="min-w-0">
                          <h2
                            className={
                              "truncate text-[13px] font-medium \x74ext-[\x76ar(\x2d-text)]"
                            }
                          >
                            <a
                              className={"\x75nderline-offset-2 \x68over:\x75nderline"}
                              href="/sections/evergrid-product-integrations-01"
                            >
                              Product — Integrations 01
                            </a>
                          </h2>
                          <p
                            className={
                              "mt-0.5 truncate text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"
                            }
                          >
                            Template section · From Evergrid
                          </p>
                        </div>
                        <a
                          className={
                            "-mr-1 shrink-0 rounded-full px-2 py-1 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)] transition-colors \x68over:\x62g-black/[\x30.\x304] \x68over:\x74ext-[\x76ar(\x2d-text)]"
                          }
                          href="/sections/evergrid-product-integrations-01"
                        >
                          Details
                        </a>
                      </div>
                      <div className={"mt-auto [&>\x64iv]:\x77-full"}>
                        <div className="relative shrink-0">
                          <button
                            className={
                              "flex h-9 items-center gap-2 rounded-full \x62g-gradient-to-b \x66rom-white \x74o-[#\x663f3f2] pl-1 pr-3 text-[12px] font-medium \x74ext-[\x76ar(\x2d-text)] \x73hadow-[\x76ar(\x2d-shadow-raised)] transition-[transform,filter,box-shadow] duration-150 \x68over:\x2dtranslate-y-0.\x35 \x68over:\x73hadow-[\x30_5px_14px_rgba(\x30,\x30,\x30,\x30.\x312)] \x61ctive:\x74ranslate-y-px \x61ctive:\x73cale-[\x30.\x397] \x66ocus-visible:\x6futline-2 \x66ocus-visible:\x6futline-offset-2 \x66ocus-visible:\x6futline-[\x76ar(\x2d-accent)] \x6dotion-reduce:\x74ransform-none"
                            }
                            type="button"
                            aria-label="Copy Section options"
                            aria-haspopup="menu"
                            aria-expanded="false"
                          >
                            <span
                              className={
                                "flex h-7 w-7 shrink-0 items-center justify-center rounded-full \x62g-[#\x37a5be8] text-white"
                              }
                            >
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                aria-hidden="true"
                              >
                                <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18" />
                              </svg>
                            </span>
                            <span className="flex-1 whitespace-nowrap text-left">Copy Section</span>
                            <span
                              className={
                                "rounded-full \x62g-[#\x657f5e1] px-1.5 py-px text-[9.5px] font-semibold uppercase tracking-wide \x74ext-[#\x31f5a33]"
                              }
                            >
                              Free
                            </span>
                            <svg
                              className={
                                "ml-0.5 \x74ext-[\x76ar(\x2d-text-secondary)] transition-transform \x2drotate-90"
                              }
                              width="13"
                              height="13"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              aria-hidden="true"
                            >
                              <path d="m6 9 6 6 6-6" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>
                  <article
                    className={
                      "relative flex flex-col \x68as-[[\x61ria-expanded=\x74rue]]:\x7a-30 rounded-[20px] \x62order \x62order-[\x76ar(\x2d-line)] bg-white p-2 \x73hadow-[\x76ar(\x2d-shadow-raised)]"
                    }
                    style={
                      {
                        viewTransitionName: "sec-prompt-murmur",
                        viewTransitionClass: "sec-card",
                      } as CSSProperties
                    }
                    id="prompt-murmur"
                  >
                    <button
                      className={
                        "group relative block aspect-[16/10] w-full overflow-hidden rounded-[12px] \x62g-[\x76ar(\x2d-surface-sunken)] text-left"
                      }
                      type="button"
                      aria-label="Preview Murmur"
                    >
                      <img
                        className={
                          "object-cover \x6fbject-top transition-transform duration-300 \x67roup-hover:\x73cale-[\x31.\x3025]"
                        }
                        style={{
                          position: "absolute",
                          height: "100%",
                          width: "100%",
                          inset: "0px",
                          color: "transparent",
                        }}
                        alt="Murmur section preview"
                        loading="lazy"
                        decoding="async"
                        src="/site-assets/d98db436e35ebe2d.webp"
                      />
                      <span
                        className={
                          "absolute bottom-2 right-2 rounded-full \x62g-white/\x395 px-3 py-1.5 text-[11px] font-medium \x74ext-[\x76ar(\x2d-text)] \x73hadow-[\x76ar(\x2d-shadow-raised)]"
                        }
                      >
                        Preview
                      </span>
                    </button>
                    <div
                      className={
                        "flex flex-1 flex-col gap-3 px-2 pb-1 pt-3 [&\x5fbutton[\x61ria-haspopup]]:\x77-full"
                      }
                    >
                      <div className="flex min-w-0 items-start justify-between gap-2">
                        <div className="min-w-0">
                          <h2
                            className={
                              "truncate text-[13px] font-medium \x74ext-[\x76ar(\x2d-text)]"
                            }
                          >
                            <a
                              className={"\x75nderline-offset-2 \x68over:\x75nderline"}
                              href="/sections/prompt-murmur"
                            >
                              Murmur
                            </a>
                          </h2>
                          <p
                            className={
                              "mt-0.5 truncate text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"
                            }
                          >
                            Hero section · Studio Original
                          </p>
                        </div>
                        <a
                          className={
                            "-mr-1 shrink-0 rounded-full px-2 py-1 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)] transition-colors \x68over:\x62g-black/[\x30.\x304] \x68over:\x74ext-[\x76ar(\x2d-text)]"
                          }
                          href="/sections/prompt-murmur"
                        >
                          Details
                        </a>
                      </div>
                      <div className={"mt-auto [&>\x64iv]:\x77-full"}>
                        <div className="relative shrink-0">
                          <button
                            className={
                              "flex h-9 items-center gap-2 rounded-full \x62g-gradient-to-b \x66rom-white \x74o-[#\x663f3f2] pl-1 pr-3 text-[12px] font-medium \x74ext-[\x76ar(\x2d-text)] \x73hadow-[\x76ar(\x2d-shadow-raised)] transition-[transform,filter,box-shadow] duration-150 \x68over:\x2dtranslate-y-0.\x35 \x68over:\x73hadow-[\x30_5px_14px_rgba(\x30,\x30,\x30,\x30.\x312)] \x61ctive:\x74ranslate-y-px \x61ctive:\x73cale-[\x30.\x397] \x66ocus-visible:\x6futline-2 \x66ocus-visible:\x6futline-offset-2 \x66ocus-visible:\x6futline-[\x76ar(\x2d-accent)] \x6dotion-reduce:\x74ransform-none"
                            }
                            type="button"
                            aria-label="Copy Section options"
                            aria-haspopup="menu"
                            aria-expanded="false"
                          >
                            <span
                              className={
                                "flex h-7 w-7 shrink-0 items-center justify-center rounded-full \x62g-[#\x37a5be8] text-white"
                              }
                            >
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                aria-hidden="true"
                              >
                                <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18" />
                              </svg>
                            </span>
                            <span className="flex-1 whitespace-nowrap text-left">Copy Section</span>
                            <span
                              className={
                                "rounded-full \x62g-[#\x657f5e1] px-1.5 py-px text-[9.5px] font-semibold uppercase tracking-wide \x74ext-[#\x31f5a33]"
                              }
                            >
                              Free
                            </span>
                            <svg
                              className={
                                "ml-0.5 \x74ext-[\x76ar(\x2d-text-secondary)] transition-transform \x2drotate-90"
                              }
                              width="13"
                              height="13"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              aria-hidden="true"
                            >
                              <path d="m6 9 6 6 6-6" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>
                  <article
                    className={
                      "relative flex flex-col \x68as-[[\x61ria-expanded=\x74rue]]:\x7a-30 rounded-[20px] \x62order \x62order-[\x76ar(\x2d-line)] bg-white p-2 \x73hadow-[\x76ar(\x2d-shadow-raised)]"
                    }
                    style={
                      {
                        viewTransitionName: "sec-portfolio-folio",
                        viewTransitionClass: "sec-card",
                      } as CSSProperties
                    }
                    id="portfolio-folio"
                  >
                    <button
                      className={
                        "group relative block aspect-[16/10] w-full overflow-hidden rounded-[12px] \x62g-[\x76ar(\x2d-surface-sunken)] text-left"
                      }
                      type="button"
                      aria-label="Preview Folio"
                    >
                      <img
                        className={
                          "object-cover \x6fbject-top transition-transform duration-300 \x67roup-hover:\x73cale-[\x31.\x3025]"
                        }
                        style={{
                          position: "absolute",
                          height: "100%",
                          width: "100%",
                          inset: "0px",
                          color: "transparent",
                        }}
                        alt="Folio section preview"
                        loading="lazy"
                        decoding="async"
                        src="/site-assets/6ad1e896fefc3940.webp"
                      />
                      <span
                        className={
                          "absolute bottom-2 right-2 rounded-full \x62g-white/\x395 px-3 py-1.5 text-[11px] font-medium \x74ext-[\x76ar(\x2d-text)] \x73hadow-[\x76ar(\x2d-shadow-raised)]"
                        }
                      >
                        Preview
                      </span>
                    </button>
                    <div
                      className={
                        "flex flex-1 flex-col gap-3 px-2 pb-1 pt-3 [&\x5fbutton[\x61ria-haspopup]]:\x77-full"
                      }
                    >
                      <div className="flex min-w-0 items-start justify-between gap-2">
                        <div className="min-w-0">
                          <h2
                            className={
                              "truncate text-[13px] font-medium \x74ext-[\x76ar(\x2d-text)]"
                            }
                          >
                            <a
                              className={"\x75nderline-offset-2 \x68over:\x75nderline"}
                              href="/sections/portfolio-folio"
                            >
                              Folio
                            </a>
                          </h2>
                          <p
                            className={
                              "mt-0.5 truncate text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"
                            }
                          >
                            Portfolio hero · Studio Original
                          </p>
                        </div>
                        <a
                          className={
                            "-mr-1 shrink-0 rounded-full px-2 py-1 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)] transition-colors \x68over:\x62g-black/[\x30.\x304] \x68over:\x74ext-[\x76ar(\x2d-text)]"
                          }
                          href="/sections/portfolio-folio"
                        >
                          Details
                        </a>
                      </div>
                      <div className={"mt-auto [&>\x64iv]:\x77-full"}>
                        <div className="relative shrink-0">
                          <button
                            className={
                              "flex h-9 items-center gap-2 rounded-full \x62g-gradient-to-b \x66rom-white \x74o-[#\x663f3f2] pl-1 pr-3 text-[12px] font-medium \x74ext-[\x76ar(\x2d-text)] \x73hadow-[\x76ar(\x2d-shadow-raised)] transition-[transform,filter,box-shadow] duration-150 \x68over:\x2dtranslate-y-0.\x35 \x68over:\x73hadow-[\x30_5px_14px_rgba(\x30,\x30,\x30,\x30.\x312)] \x61ctive:\x74ranslate-y-px \x61ctive:\x73cale-[\x30.\x397] \x66ocus-visible:\x6futline-2 \x66ocus-visible:\x6futline-offset-2 \x66ocus-visible:\x6futline-[\x76ar(\x2d-accent)] \x6dotion-reduce:\x74ransform-none"
                            }
                            type="button"
                            aria-label="Copy Section options"
                            aria-haspopup="menu"
                            aria-expanded="false"
                          >
                            <span
                              className={
                                "flex h-7 w-7 shrink-0 items-center justify-center rounded-full \x62g-[#\x37a5be8] text-white"
                              }
                            >
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                aria-hidden="true"
                              >
                                <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18" />
                              </svg>
                            </span>
                            <span className="flex-1 whitespace-nowrap text-left">Copy Section</span>
                            <span
                              className={
                                "rounded-full \x62g-[#\x657f5e1] px-1.5 py-px text-[9.5px] font-semibold uppercase tracking-wide \x74ext-[#\x31f5a33]"
                              }
                            >
                              Free
                            </span>
                            <svg
                              className={
                                "ml-0.5 \x74ext-[\x76ar(\x2d-text-secondary)] transition-transform \x2drotate-90"
                              }
                              width="13"
                              height="13"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              aria-hidden="true"
                            >
                              <path d="m6 9 6 6 6-6" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>
                  <article
                    className={
                      "relative flex flex-col \x68as-[[\x61ria-expanded=\x74rue]]:\x7a-30 rounded-[20px] \x62order \x62order-[\x76ar(\x2d-line)] bg-white p-2 \x73hadow-[\x76ar(\x2d-shadow-raised)]"
                    }
                    style={
                      {
                        viewTransitionName: "sec-phototropism",
                        viewTransitionClass: "sec-card",
                      } as CSSProperties
                    }
                    id="phototropism"
                  >
                    <button
                      className={
                        "group relative block aspect-[16/10] w-full overflow-hidden rounded-[12px] \x62g-[\x76ar(\x2d-surface-sunken)] text-left"
                      }
                      type="button"
                      aria-label="Preview Phototropism"
                    >
                      <img
                        className={
                          "object-cover \x6fbject-top transition-transform duration-300 \x67roup-hover:\x73cale-[\x31.\x3025]"
                        }
                        style={{
                          position: "absolute",
                          height: "100%",
                          width: "100%",
                          inset: "0px",
                          color: "transparent",
                        }}
                        alt="Phototropism section preview"
                        loading="lazy"
                        decoding="async"
                        src="/site-assets/799857b23852901d.webp"
                      />
                      <span
                        className={
                          "absolute bottom-2 right-2 rounded-full \x62g-white/\x395 px-3 py-1.5 text-[11px] font-medium \x74ext-[\x76ar(\x2d-text)] \x73hadow-[\x76ar(\x2d-shadow-raised)]"
                        }
                      >
                        Preview
                      </span>
                    </button>
                    <div
                      className={
                        "flex flex-1 flex-col gap-3 px-2 pb-1 pt-3 [&\x5fbutton[\x61ria-haspopup]]:\x77-full"
                      }
                    >
                      <div className="flex min-w-0 items-start justify-between gap-2">
                        <div className="min-w-0">
                          <h2
                            className={
                              "truncate text-[13px] font-medium \x74ext-[\x76ar(\x2d-text)]"
                            }
                          >
                            <a
                              className={"\x75nderline-offset-2 \x68over:\x75nderline"}
                              href="/sections/phototropism"
                            >
                              Phototropism
                            </a>
                          </h2>
                          <p
                            className={
                              "mt-0.5 truncate text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"
                            }
                          >
                            Scroll story · Studio Original
                          </p>
                        </div>
                        <a
                          className={
                            "-mr-1 shrink-0 rounded-full px-2 py-1 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)] transition-colors \x68over:\x62g-black/[\x30.\x304] \x68over:\x74ext-[\x76ar(\x2d-text)]"
                          }
                          href="/sections/phototropism"
                        >
                          Details
                        </a>
                      </div>
                      <div className={"mt-auto [&>\x64iv]:\x77-full"}>
                        <div className="relative shrink-0">
                          <button
                            className={
                              "flex h-9 items-center gap-2 rounded-full \x62g-gradient-to-b \x66rom-white \x74o-[#\x663f3f2] pl-1 pr-3 text-[12px] font-medium \x74ext-[\x76ar(\x2d-text)] \x73hadow-[\x76ar(\x2d-shadow-raised)] transition-[transform,filter,box-shadow] duration-150 \x68over:\x2dtranslate-y-0.\x35 \x68over:\x73hadow-[\x30_5px_14px_rgba(\x30,\x30,\x30,\x30.\x312)] \x61ctive:\x74ranslate-y-px \x61ctive:\x73cale-[\x30.\x397] \x66ocus-visible:\x6futline-2 \x66ocus-visible:\x6futline-offset-2 \x66ocus-visible:\x6futline-[\x76ar(\x2d-accent)] \x6dotion-reduce:\x74ransform-none"
                            }
                            type="button"
                            aria-label="Copy Section options"
                            aria-haspopup="menu"
                            aria-expanded="false"
                          >
                            <span
                              className={
                                "flex h-7 w-7 shrink-0 items-center justify-center rounded-full \x62g-[#\x37a5be8] text-white"
                              }
                            >
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                aria-hidden="true"
                              >
                                <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18" />
                              </svg>
                            </span>
                            <span className="flex-1 whitespace-nowrap text-left">Copy Section</span>
                            <span
                              className={
                                "rounded-full \x62g-[#\x657f5e1] px-1.5 py-px text-[9.5px] font-semibold uppercase tracking-wide \x74ext-[#\x31f5a33]"
                              }
                            >
                              Free
                            </span>
                            <svg
                              className={
                                "ml-0.5 \x74ext-[\x76ar(\x2d-text-secondary)] transition-transform \x2drotate-90"
                              }
                              width="13"
                              height="13"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              aria-hidden="true"
                            >
                              <path d="m6 9 6 6 6-6" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>
                  <article
                    className={
                      "relative flex flex-col \x68as-[[\x61ria-expanded=\x74rue]]:\x7a-30 rounded-[20px] \x62order \x62order-[\x76ar(\x2d-line)] bg-white p-2 \x73hadow-[\x76ar(\x2d-shadow-raised)]"
                    }
                    style={
                      {
                        viewTransitionName: "sec-evergrid-home-hero-01",
                        viewTransitionClass: "sec-card",
                      } as CSSProperties
                    }
                    id="evergrid-home-hero-01"
                  >
                    <button
                      className={
                        "group relative block aspect-[16/10] w-full overflow-hidden rounded-[12px] \x62g-[\x76ar(\x2d-surface-sunken)] text-left"
                      }
                      type="button"
                      aria-label="Preview Home — Hero 01"
                    >
                      <img
                        className={
                          "object-cover \x6fbject-top transition-transform duration-300 \x67roup-hover:\x73cale-[\x31.\x3025]"
                        }
                        style={{
                          position: "absolute",
                          height: "100%",
                          width: "100%",
                          inset: "0px",
                          color: "transparent",
                        }}
                        alt="Home — Hero 01 section preview"
                        loading="lazy"
                        decoding="async"
                        src="/site-assets/9482393b55fc785c.webp"
                      />
                      <span
                        className={
                          "absolute bottom-2 right-2 rounded-full \x62g-white/\x395 px-3 py-1.5 text-[11px] font-medium \x74ext-[\x76ar(\x2d-text)] \x73hadow-[\x76ar(\x2d-shadow-raised)]"
                        }
                      >
                        Preview
                      </span>
                    </button>
                    <div
                      className={
                        "flex flex-1 flex-col gap-3 px-2 pb-1 pt-3 [&\x5fbutton[\x61ria-haspopup]]:\x77-full"
                      }
                    >
                      <div className="flex min-w-0 items-start justify-between gap-2">
                        <div className="min-w-0">
                          <h2
                            className={
                              "truncate text-[13px] font-medium \x74ext-[\x76ar(\x2d-text)]"
                            }
                          >
                            <a
                              className={"\x75nderline-offset-2 \x68over:\x75nderline"}
                              href="/sections/evergrid-home-hero-01"
                            >
                              Home — Hero 01
                            </a>
                          </h2>
                          <p
                            className={
                              "mt-0.5 truncate text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"
                            }
                          >
                            Template section · From Evergrid
                          </p>
                        </div>
                        <a
                          className={
                            "-mr-1 shrink-0 rounded-full px-2 py-1 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)] transition-colors \x68over:\x62g-black/[\x30.\x304] \x68over:\x74ext-[\x76ar(\x2d-text)]"
                          }
                          href="/sections/evergrid-home-hero-01"
                        >
                          Details
                        </a>
                      </div>
                      <div className={"mt-auto [&>\x64iv]:\x77-full"}>
                        <div className="relative shrink-0">
                          <button
                            className={
                              "flex h-9 items-center gap-2 rounded-full \x62g-gradient-to-b \x66rom-white \x74o-[#\x663f3f2] pl-1 pr-3 text-[12px] font-medium \x74ext-[\x76ar(\x2d-text)] \x73hadow-[\x76ar(\x2d-shadow-raised)] transition-[transform,filter,box-shadow] duration-150 \x68over:\x2dtranslate-y-0.\x35 \x68over:\x73hadow-[\x30_5px_14px_rgba(\x30,\x30,\x30,\x30.\x312)] \x61ctive:\x74ranslate-y-px \x61ctive:\x73cale-[\x30.\x397] \x66ocus-visible:\x6futline-2 \x66ocus-visible:\x6futline-offset-2 \x66ocus-visible:\x6futline-[\x76ar(\x2d-accent)] \x6dotion-reduce:\x74ransform-none"
                            }
                            type="button"
                            aria-label="Copy Section options"
                            aria-haspopup="menu"
                            aria-expanded="false"
                          >
                            <span
                              className={
                                "flex h-7 w-7 shrink-0 items-center justify-center rounded-full \x62g-[#\x37a5be8] text-white"
                              }
                            >
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                aria-hidden="true"
                              >
                                <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18" />
                              </svg>
                            </span>
                            <span className="flex-1 whitespace-nowrap text-left">Copy Section</span>
                            <span
                              className={
                                "rounded-full \x62g-[#\x657f5e1] px-1.5 py-px text-[9.5px] font-semibold uppercase tracking-wide \x74ext-[#\x31f5a33]"
                              }
                            >
                              Free
                            </span>
                            <svg
                              className={
                                "ml-0.5 \x74ext-[\x76ar(\x2d-text-secondary)] transition-transform \x2drotate-90"
                              }
                              width="13"
                              height="13"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              aria-hidden="true"
                            >
                              <path d="m6 9 6 6 6-6" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>
                  <article
                    className={
                      "relative flex flex-col \x68as-[[\x61ria-expanded=\x74rue]]:\x7a-30 rounded-[20px] \x62order \x62order-[\x76ar(\x2d-line)] bg-white p-2 \x73hadow-[\x76ar(\x2d-shadow-raised)]"
                    }
                    style={
                      {
                        viewTransitionName: "sec-pigment",
                        viewTransitionClass: "sec-card",
                      } as CSSProperties
                    }
                    id="pigment"
                  >
                    <button
                      className={
                        "group relative block aspect-[16/10] w-full overflow-hidden rounded-[12px] \x62g-[\x76ar(\x2d-surface-sunken)] text-left"
                      }
                      type="button"
                      aria-label="Preview Pigment"
                    >
                      <img
                        className={
                          "object-cover \x6fbject-top transition-transform duration-300 \x67roup-hover:\x73cale-[\x31.\x3025]"
                        }
                        style={{
                          position: "absolute",
                          height: "100%",
                          width: "100%",
                          inset: "0px",
                          color: "transparent",
                        }}
                        alt="Pigment section preview"
                        loading="lazy"
                        decoding="async"
                        src="/site-assets/db19dd6c7e99e277.webp"
                      />
                      <span
                        className={
                          "absolute bottom-2 right-2 rounded-full \x62g-white/\x395 px-3 py-1.5 text-[11px] font-medium \x74ext-[\x76ar(\x2d-text)] \x73hadow-[\x76ar(\x2d-shadow-raised)]"
                        }
                      >
                        Preview
                      </span>
                    </button>
                    <div
                      className={
                        "flex flex-1 flex-col gap-3 px-2 pb-1 pt-3 [&\x5fbutton[\x61ria-haspopup]]:\x77-full"
                      }
                    >
                      <div className="flex min-w-0 items-start justify-between gap-2">
                        <div className="min-w-0">
                          <h2
                            className={
                              "truncate text-[13px] font-medium \x74ext-[\x76ar(\x2d-text)]"
                            }
                          >
                            <a
                              className={"\x75nderline-offset-2 \x68over:\x75nderline"}
                              href="/sections/pigment"
                            >
                              Pigment
                            </a>
                          </h2>
                          <p
                            className={
                              "mt-0.5 truncate text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"
                            }
                          >
                            Scroll story · Studio Original
                          </p>
                        </div>
                        <a
                          className={
                            "-mr-1 shrink-0 rounded-full px-2 py-1 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)] transition-colors \x68over:\x62g-black/[\x30.\x304] \x68over:\x74ext-[\x76ar(\x2d-text)]"
                          }
                          href="/sections/pigment"
                        >
                          Details
                        </a>
                      </div>
                      <div className={"mt-auto [&>\x64iv]:\x77-full"}>
                        <div className="relative shrink-0">
                          <button
                            className={
                              "flex h-9 items-center gap-2 rounded-full \x62g-gradient-to-b \x66rom-white \x74o-[#\x663f3f2] pl-1 pr-3 text-[12px] font-medium \x74ext-[\x76ar(\x2d-text)] \x73hadow-[\x76ar(\x2d-shadow-raised)] transition-[transform,filter,box-shadow] duration-150 \x68over:\x2dtranslate-y-0.\x35 \x68over:\x73hadow-[\x30_5px_14px_rgba(\x30,\x30,\x30,\x30.\x312)] \x61ctive:\x74ranslate-y-px \x61ctive:\x73cale-[\x30.\x397] \x66ocus-visible:\x6futline-2 \x66ocus-visible:\x6futline-offset-2 \x66ocus-visible:\x6futline-[\x76ar(\x2d-accent)] \x6dotion-reduce:\x74ransform-none"
                            }
                            type="button"
                            aria-label="Copy Section options"
                            aria-haspopup="menu"
                            aria-expanded="false"
                          >
                            <span
                              className={
                                "flex h-7 w-7 shrink-0 items-center justify-center rounded-full \x62g-[#\x37a5be8] text-white"
                              }
                            >
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                aria-hidden="true"
                              >
                                <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18" />
                              </svg>
                            </span>
                            <span className="flex-1 whitespace-nowrap text-left">Copy Section</span>
                            <span
                              className={
                                "rounded-full \x62g-[#\x657f5e1] px-1.5 py-px text-[9.5px] font-semibold uppercase tracking-wide \x74ext-[#\x31f5a33]"
                              }
                            >
                              Free
                            </span>
                            <svg
                              className={
                                "ml-0.5 \x74ext-[\x76ar(\x2d-text-secondary)] transition-transform \x2drotate-90"
                              }
                              width="13"
                              height="13"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              aria-hidden="true"
                            >
                              <path d="m6 9 6 6 6-6" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>
                  <article
                    className={
                      "relative flex flex-col \x68as-[[\x61ria-expanded=\x74rue]]:\x7a-30 rounded-[20px] \x62order \x62order-[\x76ar(\x2d-line)] bg-white p-2 \x73hadow-[\x76ar(\x2d-shadow-raised)]"
                    }
                    style={
                      {
                        viewTransitionName: "sec-fold",
                        viewTransitionClass: "sec-card",
                      } as CSSProperties
                    }
                    id="fold"
                  >
                    <button
                      className={
                        "group relative block aspect-[16/10] w-full overflow-hidden rounded-[12px] \x62g-[\x76ar(\x2d-surface-sunken)] text-left"
                      }
                      type="button"
                      aria-label="Preview Fold"
                    >
                      <img
                        className={
                          "object-cover \x6fbject-top transition-transform duration-300 \x67roup-hover:\x73cale-[\x31.\x3025]"
                        }
                        style={{
                          position: "absolute",
                          height: "100%",
                          width: "100%",
                          inset: "0px",
                          color: "transparent",
                        }}
                        alt="Fold section preview"
                        loading="lazy"
                        decoding="async"
                        src="/site-assets/c96409457dce64b7.webp"
                      />
                      <span
                        className={
                          "absolute left-2 top-2 inline-flex items-center gap-1 rounded-full \x62g-[#\x3111]/\x390 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide \x74ext-[#\x665d98a] \x73hadow-[\x76ar(\x2d-shadow-raised)] \x62ackdrop-blur"
                        }
                      >
                        ✦ Pro
                      </span>
                      <span
                        className={
                          "absolute bottom-2 right-2 rounded-full \x62g-white/\x395 px-3 py-1.5 text-[11px] font-medium \x74ext-[\x76ar(\x2d-text)] \x73hadow-[\x76ar(\x2d-shadow-raised)]"
                        }
                      >
                        Preview
                      </span>
                    </button>
                    <div
                      className={
                        "flex flex-1 flex-col gap-3 px-2 pb-1 pt-3 [&\x5fbutton[\x61ria-haspopup]]:\x77-full"
                      }
                    >
                      <div className="flex min-w-0 items-start justify-between gap-2">
                        <div className="min-w-0">
                          <h2
                            className={
                              "truncate text-[13px] font-medium \x74ext-[\x76ar(\x2d-text)]"
                            }
                          >
                            <a
                              className={"\x75nderline-offset-2 \x68over:\x75nderline"}
                              href="/sections/fold"
                            >
                              Fold
                            </a>
                          </h2>
                          <p
                            className={
                              "mt-0.5 truncate text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"
                            }
                          >
                            Scroll story · Studio Original
                          </p>
                        </div>
                        <a
                          className={
                            "-mr-1 shrink-0 rounded-full px-2 py-1 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)] transition-colors \x68over:\x62g-black/[\x30.\x304] \x68over:\x74ext-[\x76ar(\x2d-text)]"
                          }
                          href="/sections/fold"
                        >
                          Details
                        </a>
                      </div>
                      <div className={"mt-auto [&>\x64iv]:\x77-full"}>
                        <a
                          className="os-btn-dark os-spark h-10 justify-center w-full"
                          href="/pricing?plan=sections"
                        >
                          <svg
                            width="13"
                            height="13"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                          >
                            <rect x="4" y="10" width="16" height="10" rx="1" />
                            <path d="M8 10V7a4 4 0 0 1 8 0v3" />
                          </svg>{" "}
                          Unlock with Pro
                        </a>
                      </div>
                    </div>
                  </article>
                  <article
                    className={
                      "relative flex flex-col \x68as-[[\x61ria-expanded=\x74rue]]:\x7a-30 rounded-[20px] \x62order \x62order-[\x76ar(\x2d-line)] bg-white p-2 \x73hadow-[\x76ar(\x2d-shadow-raised)]"
                    }
                    style={
                      {
                        viewTransitionName: "sec-evergrid-pricing-pricing-01",
                        viewTransitionClass: "sec-card",
                      } as CSSProperties
                    }
                    id="evergrid-pricing-pricing-01"
                  >
                    <button
                      className={
                        "group relative block aspect-[16/10] w-full overflow-hidden rounded-[12px] \x62g-[\x76ar(\x2d-surface-sunken)] text-left"
                      }
                      type="button"
                      aria-label="Preview Pricing — Pricing 01"
                    >
                      <img
                        className={
                          "object-cover \x6fbject-top transition-transform duration-300 \x67roup-hover:\x73cale-[\x31.\x3025]"
                        }
                        style={{
                          position: "absolute",
                          height: "100%",
                          width: "100%",
                          inset: "0px",
                          color: "transparent",
                        }}
                        alt="Pricing — Pricing 01 section preview"
                        loading="lazy"
                        decoding="async"
                        src="/site-assets/ae0251f2f35b277c.webp"
                      />
                      <span
                        className={
                          "absolute bottom-2 right-2 rounded-full \x62g-white/\x395 px-3 py-1.5 text-[11px] font-medium \x74ext-[\x76ar(\x2d-text)] \x73hadow-[\x76ar(\x2d-shadow-raised)]"
                        }
                      >
                        Preview
                      </span>
                    </button>
                    <div
                      className={
                        "flex flex-1 flex-col gap-3 px-2 pb-1 pt-3 [&\x5fbutton[\x61ria-haspopup]]:\x77-full"
                      }
                    >
                      <div className="flex min-w-0 items-start justify-between gap-2">
                        <div className="min-w-0">
                          <h2
                            className={
                              "truncate text-[13px] font-medium \x74ext-[\x76ar(\x2d-text)]"
                            }
                          >
                            <a
                              className={"\x75nderline-offset-2 \x68over:\x75nderline"}
                              href="/sections/evergrid-pricing-pricing-01"
                            >
                              Pricing — Pricing 01
                            </a>
                          </h2>
                          <p
                            className={
                              "mt-0.5 truncate text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"
                            }
                          >
                            Template section · From Evergrid
                          </p>
                        </div>
                        <a
                          className={
                            "-mr-1 shrink-0 rounded-full px-2 py-1 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)] transition-colors \x68over:\x62g-black/[\x30.\x304] \x68over:\x74ext-[\x76ar(\x2d-text)]"
                          }
                          href="/sections/evergrid-pricing-pricing-01"
                        >
                          Details
                        </a>
                      </div>
                      <div className={"mt-auto [&>\x64iv]:\x77-full"}>
                        <div className="relative shrink-0">
                          <button
                            className={
                              "flex h-9 items-center gap-2 rounded-full \x62g-gradient-to-b \x66rom-white \x74o-[#\x663f3f2] pl-1 pr-3 text-[12px] font-medium \x74ext-[\x76ar(\x2d-text)] \x73hadow-[\x76ar(\x2d-shadow-raised)] transition-[transform,filter,box-shadow] duration-150 \x68over:\x2dtranslate-y-0.\x35 \x68over:\x73hadow-[\x30_5px_14px_rgba(\x30,\x30,\x30,\x30.\x312)] \x61ctive:\x74ranslate-y-px \x61ctive:\x73cale-[\x30.\x397] \x66ocus-visible:\x6futline-2 \x66ocus-visible:\x6futline-offset-2 \x66ocus-visible:\x6futline-[\x76ar(\x2d-accent)] \x6dotion-reduce:\x74ransform-none"
                            }
                            type="button"
                            aria-label="Copy Section options"
                            aria-haspopup="menu"
                            aria-expanded="false"
                          >
                            <span
                              className={
                                "flex h-7 w-7 shrink-0 items-center justify-center rounded-full \x62g-[#\x37a5be8] text-white"
                              }
                            >
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                aria-hidden="true"
                              >
                                <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18" />
                              </svg>
                            </span>
                            <span className="flex-1 whitespace-nowrap text-left">Copy Section</span>
                            <span
                              className={
                                "rounded-full \x62g-[#\x657f5e1] px-1.5 py-px text-[9.5px] font-semibold uppercase tracking-wide \x74ext-[#\x31f5a33]"
                              }
                            >
                              Free
                            </span>
                            <svg
                              className={
                                "ml-0.5 \x74ext-[\x76ar(\x2d-text-secondary)] transition-transform \x2drotate-90"
                              }
                              width="13"
                              height="13"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              aria-hidden="true"
                            >
                              <path d="m6 9 6 6 6-6" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>
                  <article
                    className={
                      "relative flex flex-col \x68as-[[\x61ria-expanded=\x74rue]]:\x7a-30 rounded-[20px] \x62order \x62order-[\x76ar(\x2d-line)] bg-white p-2 \x73hadow-[\x76ar(\x2d-shadow-raised)]"
                    }
                    style={
                      {
                        viewTransitionName: "sec-evergrid-home-features-01",
                        viewTransitionClass: "sec-card",
                      } as CSSProperties
                    }
                    id="evergrid-home-features-01"
                  >
                    <button
                      className={
                        "group relative block aspect-[16/10] w-full overflow-hidden rounded-[12px] \x62g-[\x76ar(\x2d-surface-sunken)] text-left"
                      }
                      type="button"
                      aria-label="Preview Home — Features 01"
                    >
                      <img
                        className={
                          "object-cover \x6fbject-top transition-transform duration-300 \x67roup-hover:\x73cale-[\x31.\x3025]"
                        }
                        style={{
                          position: "absolute",
                          height: "100%",
                          width: "100%",
                          inset: "0px",
                          color: "transparent",
                        }}
                        alt="Home — Features 01 section preview"
                        loading="lazy"
                        decoding="async"
                        src="/site-assets/37772789fc8f2d7b.webp"
                      />
                      <span
                        className={
                          "absolute bottom-2 right-2 rounded-full \x62g-white/\x395 px-3 py-1.5 text-[11px] font-medium \x74ext-[\x76ar(\x2d-text)] \x73hadow-[\x76ar(\x2d-shadow-raised)]"
                        }
                      >
                        Preview
                      </span>
                    </button>
                    <div
                      className={
                        "flex flex-1 flex-col gap-3 px-2 pb-1 pt-3 [&\x5fbutton[\x61ria-haspopup]]:\x77-full"
                      }
                    >
                      <div className="flex min-w-0 items-start justify-between gap-2">
                        <div className="min-w-0">
                          <h2
                            className={
                              "truncate text-[13px] font-medium \x74ext-[\x76ar(\x2d-text)]"
                            }
                          >
                            <a
                              className={"\x75nderline-offset-2 \x68over:\x75nderline"}
                              href="/sections/evergrid-home-features-01"
                            >
                              Home — Features 01
                            </a>
                          </h2>
                          <p
                            className={
                              "mt-0.5 truncate text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"
                            }
                          >
                            Template section · From Evergrid
                          </p>
                        </div>
                        <a
                          className={
                            "-mr-1 shrink-0 rounded-full px-2 py-1 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)] transition-colors \x68over:\x62g-black/[\x30.\x304] \x68over:\x74ext-[\x76ar(\x2d-text)]"
                          }
                          href="/sections/evergrid-home-features-01"
                        >
                          Details
                        </a>
                      </div>
                      <div className={"mt-auto [&>\x64iv]:\x77-full"}>
                        <div className="relative shrink-0">
                          <button
                            className={
                              "flex h-9 items-center gap-2 rounded-full \x62g-gradient-to-b \x66rom-white \x74o-[#\x663f3f2] pl-1 pr-3 text-[12px] font-medium \x74ext-[\x76ar(\x2d-text)] \x73hadow-[\x76ar(\x2d-shadow-raised)] transition-[transform,filter,box-shadow] duration-150 \x68over:\x2dtranslate-y-0.\x35 \x68over:\x73hadow-[\x30_5px_14px_rgba(\x30,\x30,\x30,\x30.\x312)] \x61ctive:\x74ranslate-y-px \x61ctive:\x73cale-[\x30.\x397] \x66ocus-visible:\x6futline-2 \x66ocus-visible:\x6futline-offset-2 \x66ocus-visible:\x6futline-[\x76ar(\x2d-accent)] \x6dotion-reduce:\x74ransform-none"
                            }
                            type="button"
                            aria-label="Copy Section options"
                            aria-haspopup="menu"
                            aria-expanded="false"
                          >
                            <span
                              className={
                                "flex h-7 w-7 shrink-0 items-center justify-center rounded-full \x62g-[#\x37a5be8] text-white"
                              }
                            >
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                aria-hidden="true"
                              >
                                <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18" />
                              </svg>
                            </span>
                            <span className="flex-1 whitespace-nowrap text-left">Copy Section</span>
                            <span
                              className={
                                "rounded-full \x62g-[#\x657f5e1] px-1.5 py-px text-[9.5px] font-semibold uppercase tracking-wide \x74ext-[#\x31f5a33]"
                              }
                            >
                              Free
                            </span>
                            <svg
                              className={
                                "ml-0.5 \x74ext-[\x76ar(\x2d-text-secondary)] transition-transform \x2drotate-90"
                              }
                              width="13"
                              height="13"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              aria-hidden="true"
                            >
                              <path d="m6 9 6 6 6-6" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>
                  <article
                    className={
                      "relative flex flex-col \x68as-[[\x61ria-expanded=\x74rue]]:\x7a-30 rounded-[20px] \x62order \x62order-[\x76ar(\x2d-line)] bg-white p-2 \x73hadow-[\x76ar(\x2d-shadow-raised)]"
                    }
                    style={
                      {
                        viewTransitionName: "sec-evergrid-home-features-02",
                        viewTransitionClass: "sec-card",
                      } as CSSProperties
                    }
                    id="evergrid-home-features-02"
                  >
                    <button
                      className={
                        "group relative block aspect-[16/10] w-full overflow-hidden rounded-[12px] \x62g-[\x76ar(\x2d-surface-sunken)] text-left"
                      }
                      type="button"
                      aria-label="Preview Home — Features 02"
                    >
                      <img
                        className={
                          "object-cover \x6fbject-top transition-transform duration-300 \x67roup-hover:\x73cale-[\x31.\x3025]"
                        }
                        style={{
                          position: "absolute",
                          height: "100%",
                          width: "100%",
                          inset: "0px",
                          color: "transparent",
                        }}
                        alt="Home — Features 02 section preview"
                        loading="lazy"
                        decoding="async"
                        src="/site-assets/4df512604df08b20.webp"
                      />
                      <span
                        className={
                          "absolute bottom-2 right-2 rounded-full \x62g-white/\x395 px-3 py-1.5 text-[11px] font-medium \x74ext-[\x76ar(\x2d-text)] \x73hadow-[\x76ar(\x2d-shadow-raised)]"
                        }
                      >
                        Preview
                      </span>
                    </button>
                    <div
                      className={
                        "flex flex-1 flex-col gap-3 px-2 pb-1 pt-3 [&\x5fbutton[\x61ria-haspopup]]:\x77-full"
                      }
                    >
                      <div className="flex min-w-0 items-start justify-between gap-2">
                        <div className="min-w-0">
                          <h2
                            className={
                              "truncate text-[13px] font-medium \x74ext-[\x76ar(\x2d-text)]"
                            }
                          >
                            <a
                              className={"\x75nderline-offset-2 \x68over:\x75nderline"}
                              href="/sections/evergrid-home-features-02"
                            >
                              Home — Features 02
                            </a>
                          </h2>
                          <p
                            className={
                              "mt-0.5 truncate text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"
                            }
                          >
                            Template section · From Evergrid
                          </p>
                        </div>
                        <a
                          className={
                            "-mr-1 shrink-0 rounded-full px-2 py-1 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)] transition-colors \x68over:\x62g-black/[\x30.\x304] \x68over:\x74ext-[\x76ar(\x2d-text)]"
                          }
                          href="/sections/evergrid-home-features-02"
                        >
                          Details
                        </a>
                      </div>
                      <div className={"mt-auto [&>\x64iv]:\x77-full"}>
                        <div className="relative shrink-0">
                          <button
                            className={
                              "flex h-9 items-center gap-2 rounded-full \x62g-gradient-to-b \x66rom-white \x74o-[#\x663f3f2] pl-1 pr-3 text-[12px] font-medium \x74ext-[\x76ar(\x2d-text)] \x73hadow-[\x76ar(\x2d-shadow-raised)] transition-[transform,filter,box-shadow] duration-150 \x68over:\x2dtranslate-y-0.\x35 \x68over:\x73hadow-[\x30_5px_14px_rgba(\x30,\x30,\x30,\x30.\x312)] \x61ctive:\x74ranslate-y-px \x61ctive:\x73cale-[\x30.\x397] \x66ocus-visible:\x6futline-2 \x66ocus-visible:\x6futline-offset-2 \x66ocus-visible:\x6futline-[\x76ar(\x2d-accent)] \x6dotion-reduce:\x74ransform-none"
                            }
                            type="button"
                            aria-label="Copy Section options"
                            aria-haspopup="menu"
                            aria-expanded="false"
                          >
                            <span
                              className={
                                "flex h-7 w-7 shrink-0 items-center justify-center rounded-full \x62g-[#\x37a5be8] text-white"
                              }
                            >
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                aria-hidden="true"
                              >
                                <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18" />
                              </svg>
                            </span>
                            <span className="flex-1 whitespace-nowrap text-left">Copy Section</span>
                            <span
                              className={
                                "rounded-full \x62g-[#\x657f5e1] px-1.5 py-px text-[9.5px] font-semibold uppercase tracking-wide \x74ext-[#\x31f5a33]"
                              }
                            >
                              Free
                            </span>
                            <svg
                              className={
                                "ml-0.5 \x74ext-[\x76ar(\x2d-text-secondary)] transition-transform \x2drotate-90"
                              }
                              width="13"
                              height="13"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              aria-hidden="true"
                            >
                              <path d="m6 9 6 6 6-6" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>
                  <article
                    className={
                      "relative flex flex-col \x68as-[[\x61ria-expanded=\x74rue]]:\x7a-30 rounded-[20px] \x62order \x62order-[\x76ar(\x2d-line)] bg-white p-2 \x73hadow-[\x76ar(\x2d-shadow-raised)]"
                    }
                    style={
                      {
                        viewTransitionName: "sec-evergrid-about-us-team-01",
                        viewTransitionClass: "sec-card",
                      } as CSSProperties
                    }
                    id="evergrid-about-us-team-01"
                  >
                    <button
                      className={
                        "group relative block aspect-[16/10] w-full overflow-hidden rounded-[12px] \x62g-[\x76ar(\x2d-surface-sunken)] text-left"
                      }
                      type="button"
                      aria-label="Preview About Us — Team 01"
                    >
                      <img
                        className={
                          "object-cover \x6fbject-top transition-transform duration-300 \x67roup-hover:\x73cale-[\x31.\x3025]"
                        }
                        style={{
                          position: "absolute",
                          height: "100%",
                          width: "100%",
                          inset: "0px",
                          color: "transparent",
                        }}
                        alt="About Us — Team 01 section preview"
                        loading="lazy"
                        decoding="async"
                        src="/site-assets/a0175be7360b2f0f.webp"
                      />
                      <span
                        className={
                          "absolute bottom-2 right-2 rounded-full \x62g-white/\x395 px-3 py-1.5 text-[11px] font-medium \x74ext-[\x76ar(\x2d-text)] \x73hadow-[\x76ar(\x2d-shadow-raised)]"
                        }
                      >
                        Preview
                      </span>
                    </button>
                    <div
                      className={
                        "flex flex-1 flex-col gap-3 px-2 pb-1 pt-3 [&\x5fbutton[\x61ria-haspopup]]:\x77-full"
                      }
                    >
                      <div className="flex min-w-0 items-start justify-between gap-2">
                        <div className="min-w-0">
                          <h2
                            className={
                              "truncate text-[13px] font-medium \x74ext-[\x76ar(\x2d-text)]"
                            }
                          >
                            <a
                              className={"\x75nderline-offset-2 \x68over:\x75nderline"}
                              href="/sections/evergrid-about-us-team-01"
                            >
                              About Us — Team 01
                            </a>
                          </h2>
                          <p
                            className={
                              "mt-0.5 truncate text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"
                            }
                          >
                            Template section · From Evergrid
                          </p>
                        </div>
                        <a
                          className={
                            "-mr-1 shrink-0 rounded-full px-2 py-1 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)] transition-colors \x68over:\x62g-black/[\x30.\x304] \x68over:\x74ext-[\x76ar(\x2d-text)]"
                          }
                          href="/sections/evergrid-about-us-team-01"
                        >
                          Details
                        </a>
                      </div>
                      <div className={"mt-auto [&>\x64iv]:\x77-full"}>
                        <div className="relative shrink-0">
                          <button
                            className={
                              "flex h-9 items-center gap-2 rounded-full \x62g-gradient-to-b \x66rom-white \x74o-[#\x663f3f2] pl-1 pr-3 text-[12px] font-medium \x74ext-[\x76ar(\x2d-text)] \x73hadow-[\x76ar(\x2d-shadow-raised)] transition-[transform,filter,box-shadow] duration-150 \x68over:\x2dtranslate-y-0.\x35 \x68over:\x73hadow-[\x30_5px_14px_rgba(\x30,\x30,\x30,\x30.\x312)] \x61ctive:\x74ranslate-y-px \x61ctive:\x73cale-[\x30.\x397] \x66ocus-visible:\x6futline-2 \x66ocus-visible:\x6futline-offset-2 \x66ocus-visible:\x6futline-[\x76ar(\x2d-accent)] \x6dotion-reduce:\x74ransform-none"
                            }
                            type="button"
                            aria-label="Copy Section options"
                            aria-haspopup="menu"
                            aria-expanded="false"
                          >
                            <span
                              className={
                                "flex h-7 w-7 shrink-0 items-center justify-center rounded-full \x62g-[#\x37a5be8] text-white"
                              }
                            >
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                aria-hidden="true"
                              >
                                <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18" />
                              </svg>
                            </span>
                            <span className="flex-1 whitespace-nowrap text-left">Copy Section</span>
                            <span
                              className={
                                "rounded-full \x62g-[#\x657f5e1] px-1.5 py-px text-[9.5px] font-semibold uppercase tracking-wide \x74ext-[#\x31f5a33]"
                              }
                            >
                              Free
                            </span>
                            <svg
                              className={
                                "ml-0.5 \x74ext-[\x76ar(\x2d-text-secondary)] transition-transform \x2drotate-90"
                              }
                              width="13"
                              height="13"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              aria-hidden="true"
                            >
                              <path d="m6 9 6 6 6-6" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>
                  <article
                    className={
                      "relative flex flex-col \x68as-[[\x61ria-expanded=\x74rue]]:\x7a-30 rounded-[20px] \x62order \x62order-[\x76ar(\x2d-line)] bg-white p-2 \x73hadow-[\x76ar(\x2d-shadow-raised)]"
                    }
                    style={
                      {
                        viewTransitionName: "sec-evergrid-case-studies-use-cases-01",
                        viewTransitionClass: "sec-card",
                      } as CSSProperties
                    }
                    id="evergrid-case-studies-use-cases-01"
                  >
                    <button
                      className={
                        "group relative block aspect-[16/10] w-full overflow-hidden rounded-[12px] \x62g-[\x76ar(\x2d-surface-sunken)] text-left"
                      }
                      type="button"
                      aria-label="Preview Case Studies — Use Cases 01"
                    >
                      <img
                        className={
                          "object-cover \x6fbject-top transition-transform duration-300 \x67roup-hover:\x73cale-[\x31.\x3025]"
                        }
                        style={{
                          position: "absolute",
                          height: "100%",
                          width: "100%",
                          inset: "0px",
                          color: "transparent",
                        }}
                        alt="Case Studies — Use Cases 01 section preview"
                        loading="lazy"
                        decoding="async"
                        src="/site-assets/b9c61a1a4d28cc40.webp"
                      />
                      <span
                        className={
                          "absolute bottom-2 right-2 rounded-full \x62g-white/\x395 px-3 py-1.5 text-[11px] font-medium \x74ext-[\x76ar(\x2d-text)] \x73hadow-[\x76ar(\x2d-shadow-raised)]"
                        }
                      >
                        Preview
                      </span>
                    </button>
                    <div
                      className={
                        "flex flex-1 flex-col gap-3 px-2 pb-1 pt-3 [&\x5fbutton[\x61ria-haspopup]]:\x77-full"
                      }
                    >
                      <div className="flex min-w-0 items-start justify-between gap-2">
                        <div className="min-w-0">
                          <h2
                            className={
                              "truncate text-[13px] font-medium \x74ext-[\x76ar(\x2d-text)]"
                            }
                          >
                            <a
                              className={"\x75nderline-offset-2 \x68over:\x75nderline"}
                              href="/sections/evergrid-case-studies-use-cases-01"
                            >
                              Case Studies — Use Cases 01
                            </a>
                          </h2>
                          <p
                            className={
                              "mt-0.5 truncate text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"
                            }
                          >
                            Template section · From Evergrid
                          </p>
                        </div>
                        <a
                          className={
                            "-mr-1 shrink-0 rounded-full px-2 py-1 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)] transition-colors \x68over:\x62g-black/[\x30.\x304] \x68over:\x74ext-[\x76ar(\x2d-text)]"
                          }
                          href="/sections/evergrid-case-studies-use-cases-01"
                        >
                          Details
                        </a>
                      </div>
                      <div className={"mt-auto [&>\x64iv]:\x77-full"}>
                        <div className="relative shrink-0">
                          <button
                            className={
                              "flex h-9 items-center gap-2 rounded-full \x62g-gradient-to-b \x66rom-white \x74o-[#\x663f3f2] pl-1 pr-3 text-[12px] font-medium \x74ext-[\x76ar(\x2d-text)] \x73hadow-[\x76ar(\x2d-shadow-raised)] transition-[transform,filter,box-shadow] duration-150 \x68over:\x2dtranslate-y-0.\x35 \x68over:\x73hadow-[\x30_5px_14px_rgba(\x30,\x30,\x30,\x30.\x312)] \x61ctive:\x74ranslate-y-px \x61ctive:\x73cale-[\x30.\x397] \x66ocus-visible:\x6futline-2 \x66ocus-visible:\x6futline-offset-2 \x66ocus-visible:\x6futline-[\x76ar(\x2d-accent)] \x6dotion-reduce:\x74ransform-none"
                            }
                            type="button"
                            aria-label="Copy Section options"
                            aria-haspopup="menu"
                            aria-expanded="false"
                          >
                            <span
                              className={
                                "flex h-7 w-7 shrink-0 items-center justify-center rounded-full \x62g-[#\x37a5be8] text-white"
                              }
                            >
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                aria-hidden="true"
                              >
                                <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18" />
                              </svg>
                            </span>
                            <span className="flex-1 whitespace-nowrap text-left">Copy Section</span>
                            <span
                              className={
                                "rounded-full \x62g-[#\x657f5e1] px-1.5 py-px text-[9.5px] font-semibold uppercase tracking-wide \x74ext-[#\x31f5a33]"
                              }
                            >
                              Free
                            </span>
                            <svg
                              className={
                                "ml-0.5 \x74ext-[\x76ar(\x2d-text-secondary)] transition-transform \x2drotate-90"
                              }
                              width="13"
                              height="13"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              aria-hidden="true"
                            >
                              <path d="m6 9 6 6 6-6" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>
                  <article
                    className={
                      "relative flex flex-col \x68as-[[\x61ria-expanded=\x74rue]]:\x7a-30 rounded-[20px] \x62order \x62order-[\x76ar(\x2d-line)] bg-white p-2 \x73hadow-[\x76ar(\x2d-shadow-raised)]"
                    }
                    style={
                      {
                        viewTransitionName: "sec-evergrid-blog-blog-01",
                        viewTransitionClass: "sec-card",
                      } as CSSProperties
                    }
                    id="evergrid-blog-blog-01"
                  >
                    <button
                      className={
                        "group relative block aspect-[16/10] w-full overflow-hidden rounded-[12px] \x62g-[\x76ar(\x2d-surface-sunken)] text-left"
                      }
                      type="button"
                      aria-label="Preview Blog — Blog 01"
                    >
                      <img
                        className={
                          "object-cover \x6fbject-top transition-transform duration-300 \x67roup-hover:\x73cale-[\x31.\x3025]"
                        }
                        style={{
                          position: "absolute",
                          height: "100%",
                          width: "100%",
                          inset: "0px",
                          color: "transparent",
                        }}
                        alt="Blog — Blog 01 section preview"
                        loading="lazy"
                        decoding="async"
                        src="/site-assets/0f75dc4ae5800a9a.webp"
                      />
                      <span
                        className={
                          "absolute bottom-2 right-2 rounded-full \x62g-white/\x395 px-3 py-1.5 text-[11px] font-medium \x74ext-[\x76ar(\x2d-text)] \x73hadow-[\x76ar(\x2d-shadow-raised)]"
                        }
                      >
                        Preview
                      </span>
                    </button>
                    <div
                      className={
                        "flex flex-1 flex-col gap-3 px-2 pb-1 pt-3 [&\x5fbutton[\x61ria-haspopup]]:\x77-full"
                      }
                    >
                      <div className="flex min-w-0 items-start justify-between gap-2">
                        <div className="min-w-0">
                          <h2
                            className={
                              "truncate text-[13px] font-medium \x74ext-[\x76ar(\x2d-text)]"
                            }
                          >
                            <a
                              className={"\x75nderline-offset-2 \x68over:\x75nderline"}
                              href="/sections/evergrid-blog-blog-01"
                            >
                              Blog — Blog 01
                            </a>
                          </h2>
                          <p
                            className={
                              "mt-0.5 truncate text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"
                            }
                          >
                            Template section · From Evergrid
                          </p>
                        </div>
                        <a
                          className={
                            "-mr-1 shrink-0 rounded-full px-2 py-1 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)] transition-colors \x68over:\x62g-black/[\x30.\x304] \x68over:\x74ext-[\x76ar(\x2d-text)]"
                          }
                          href="/sections/evergrid-blog-blog-01"
                        >
                          Details
                        </a>
                      </div>
                      <div className={"mt-auto [&>\x64iv]:\x77-full"}>
                        <div className="relative shrink-0">
                          <button
                            className={
                              "flex h-9 items-center gap-2 rounded-full \x62g-gradient-to-b \x66rom-white \x74o-[#\x663f3f2] pl-1 pr-3 text-[12px] font-medium \x74ext-[\x76ar(\x2d-text)] \x73hadow-[\x76ar(\x2d-shadow-raised)] transition-[transform,filter,box-shadow] duration-150 \x68over:\x2dtranslate-y-0.\x35 \x68over:\x73hadow-[\x30_5px_14px_rgba(\x30,\x30,\x30,\x30.\x312)] \x61ctive:\x74ranslate-y-px \x61ctive:\x73cale-[\x30.\x397] \x66ocus-visible:\x6futline-2 \x66ocus-visible:\x6futline-offset-2 \x66ocus-visible:\x6futline-[\x76ar(\x2d-accent)] \x6dotion-reduce:\x74ransform-none"
                            }
                            type="button"
                            aria-label="Copy Section options"
                            aria-haspopup="menu"
                            aria-expanded="false"
                          >
                            <span
                              className={
                                "flex h-7 w-7 shrink-0 items-center justify-center rounded-full \x62g-[#\x37a5be8] text-white"
                              }
                            >
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                aria-hidden="true"
                              >
                                <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18" />
                              </svg>
                            </span>
                            <span className="flex-1 whitespace-nowrap text-left">Copy Section</span>
                            <span
                              className={
                                "rounded-full \x62g-[#\x657f5e1] px-1.5 py-px text-[9.5px] font-semibold uppercase tracking-wide \x74ext-[#\x31f5a33]"
                              }
                            >
                              Free
                            </span>
                            <svg
                              className={
                                "ml-0.5 \x74ext-[\x76ar(\x2d-text-secondary)] transition-transform \x2drotate-90"
                              }
                              width="13"
                              height="13"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              aria-hidden="true"
                            >
                              <path d="m6 9 6 6 6-6" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>
                  <article
                    className={
                      "relative flex flex-col \x68as-[[\x61ria-expanded=\x74rue]]:\x7a-30 rounded-[20px] \x62order \x62order-[\x76ar(\x2d-line)] bg-white p-2 \x73hadow-[\x76ar(\x2d-shadow-raised)]"
                    }
                    style={
                      {
                        viewTransitionName: "sec-evergrid-home-use-cases-01",
                        viewTransitionClass: "sec-card",
                      } as CSSProperties
                    }
                    id="evergrid-home-use-cases-01"
                  >
                    <button
                      className={
                        "group relative block aspect-[16/10] w-full overflow-hidden rounded-[12px] \x62g-[\x76ar(\x2d-surface-sunken)] text-left"
                      }
                      type="button"
                      aria-label="Preview Home — Use Cases 01"
                    >
                      <img
                        className={
                          "object-cover \x6fbject-top transition-transform duration-300 \x67roup-hover:\x73cale-[\x31.\x3025]"
                        }
                        style={{
                          position: "absolute",
                          height: "100%",
                          width: "100%",
                          inset: "0px",
                          color: "transparent",
                        }}
                        alt="Home — Use Cases 01 section preview"
                        loading="lazy"
                        decoding="async"
                        src="/site-assets/f88e1def1f2e9329.webp"
                      />
                      <span
                        className={
                          "absolute bottom-2 right-2 rounded-full \x62g-white/\x395 px-3 py-1.5 text-[11px] font-medium \x74ext-[\x76ar(\x2d-text)] \x73hadow-[\x76ar(\x2d-shadow-raised)]"
                        }
                      >
                        Preview
                      </span>
                    </button>
                    <div
                      className={
                        "flex flex-1 flex-col gap-3 px-2 pb-1 pt-3 [&\x5fbutton[\x61ria-haspopup]]:\x77-full"
                      }
                    >
                      <div className="flex min-w-0 items-start justify-between gap-2">
                        <div className="min-w-0">
                          <h2
                            className={
                              "truncate text-[13px] font-medium \x74ext-[\x76ar(\x2d-text)]"
                            }
                          >
                            <a
                              className={"\x75nderline-offset-2 \x68over:\x75nderline"}
                              href="/sections/evergrid-home-use-cases-01"
                            >
                              Home — Use Cases 01
                            </a>
                          </h2>
                          <p
                            className={
                              "mt-0.5 truncate text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"
                            }
                          >
                            Template section · From Evergrid
                          </p>
                        </div>
                        <a
                          className={
                            "-mr-1 shrink-0 rounded-full px-2 py-1 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)] transition-colors \x68over:\x62g-black/[\x30.\x304] \x68over:\x74ext-[\x76ar(\x2d-text)]"
                          }
                          href="/sections/evergrid-home-use-cases-01"
                        >
                          Details
                        </a>
                      </div>
                      <div className={"mt-auto [&>\x64iv]:\x77-full"}>
                        <div className="relative shrink-0">
                          <button
                            className={
                              "flex h-9 items-center gap-2 rounded-full \x62g-gradient-to-b \x66rom-white \x74o-[#\x663f3f2] pl-1 pr-3 text-[12px] font-medium \x74ext-[\x76ar(\x2d-text)] \x73hadow-[\x76ar(\x2d-shadow-raised)] transition-[transform,filter,box-shadow] duration-150 \x68over:\x2dtranslate-y-0.\x35 \x68over:\x73hadow-[\x30_5px_14px_rgba(\x30,\x30,\x30,\x30.\x312)] \x61ctive:\x74ranslate-y-px \x61ctive:\x73cale-[\x30.\x397] \x66ocus-visible:\x6futline-2 \x66ocus-visible:\x6futline-offset-2 \x66ocus-visible:\x6futline-[\x76ar(\x2d-accent)] \x6dotion-reduce:\x74ransform-none"
                            }
                            type="button"
                            aria-label="Copy Section options"
                            aria-haspopup="menu"
                            aria-expanded="false"
                          >
                            <span
                              className={
                                "flex h-7 w-7 shrink-0 items-center justify-center rounded-full \x62g-[#\x37a5be8] text-white"
                              }
                            >
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                aria-hidden="true"
                              >
                                <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18" />
                              </svg>
                            </span>
                            <span className="flex-1 whitespace-nowrap text-left">Copy Section</span>
                            <span
                              className={
                                "rounded-full \x62g-[#\x657f5e1] px-1.5 py-px text-[9.5px] font-semibold uppercase tracking-wide \x74ext-[#\x31f5a33]"
                              }
                            >
                              Free
                            </span>
                            <svg
                              className={
                                "ml-0.5 \x74ext-[\x76ar(\x2d-text-secondary)] transition-transform \x2drotate-90"
                              }
                              width="13"
                              height="13"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              aria-hidden="true"
                            >
                              <path d="m6 9 6 6 6-6" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>
                  <article
                    className={
                      "relative flex flex-col \x68as-[[\x61ria-expanded=\x74rue]]:\x7a-30 rounded-[20px] \x62order \x62order-[\x76ar(\x2d-line)] bg-white p-2 \x73hadow-[\x76ar(\x2d-shadow-raised)]"
                    }
                    style={
                      {
                        viewTransitionName: "sec-portfolio-plan",
                        viewTransitionClass: "sec-card",
                      } as CSSProperties
                    }
                    id="portfolio-plan"
                  >
                    <button
                      className={
                        "group relative block aspect-[16/10] w-full overflow-hidden rounded-[12px] \x62g-[\x76ar(\x2d-surface-sunken)] text-left"
                      }
                      type="button"
                      aria-label="Preview Plan"
                    >
                      <img
                        className={
                          "object-cover \x6fbject-top transition-transform duration-300 \x67roup-hover:\x73cale-[\x31.\x3025]"
                        }
                        style={{
                          position: "absolute",
                          height: "100%",
                          width: "100%",
                          inset: "0px",
                          color: "transparent",
                        }}
                        alt="Plan section preview"
                        loading="lazy"
                        decoding="async"
                        src="/site-assets/c708f3aeb8a929c0.webp"
                      />
                      <span
                        className={
                          "absolute left-2 top-2 inline-flex items-center gap-1 rounded-full \x62g-[#\x3111]/\x390 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide \x74ext-[#\x665d98a] \x73hadow-[\x76ar(\x2d-shadow-raised)] \x62ackdrop-blur"
                        }
                      >
                        ✦ Pro
                      </span>
                      <span
                        className={
                          "absolute bottom-2 right-2 rounded-full \x62g-white/\x395 px-3 py-1.5 text-[11px] font-medium \x74ext-[\x76ar(\x2d-text)] \x73hadow-[\x76ar(\x2d-shadow-raised)]"
                        }
                      >
                        Preview
                      </span>
                    </button>
                    <div
                      className={
                        "flex flex-1 flex-col gap-3 px-2 pb-1 pt-3 [&\x5fbutton[\x61ria-haspopup]]:\x77-full"
                      }
                    >
                      <div className="flex min-w-0 items-start justify-between gap-2">
                        <div className="min-w-0">
                          <h2
                            className={
                              "truncate text-[13px] font-medium \x74ext-[\x76ar(\x2d-text)]"
                            }
                          >
                            <a
                              className={"\x75nderline-offset-2 \x68over:\x75nderline"}
                              href="/sections/portfolio-plan"
                            >
                              Plan
                            </a>
                          </h2>
                          <p
                            className={
                              "mt-0.5 truncate text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"
                            }
                          >
                            Portfolio hero · Studio Original
                          </p>
                        </div>
                        <a
                          className={
                            "-mr-1 shrink-0 rounded-full px-2 py-1 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)] transition-colors \x68over:\x62g-black/[\x30.\x304] \x68over:\x74ext-[\x76ar(\x2d-text)]"
                          }
                          href="/sections/portfolio-plan"
                        >
                          Details
                        </a>
                      </div>
                      <div className={"mt-auto [&>\x64iv]:\x77-full"}>
                        <a
                          className="os-btn-dark os-spark h-10 justify-center w-full"
                          href="/pricing?plan=sections"
                        >
                          <svg
                            width="13"
                            height="13"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                          >
                            <rect x="4" y="10" width="16" height="10" rx="1" />
                            <path d="M8 10V7a4 4 0 0 1 8 0v3" />
                          </svg>{" "}
                          Unlock with Pro
                        </a>
                      </div>
                    </div>
                  </article>
                  <article
                    className={
                      "relative flex flex-col \x68as-[[\x61ria-expanded=\x74rue]]:\x7a-30 rounded-[20px] \x62order \x62order-[\x76ar(\x2d-line)] bg-white p-2 \x73hadow-[\x76ar(\x2d-shadow-raised)]"
                    }
                    style={
                      {
                        viewTransitionName: "sec-evergrid-contact-contact-01",
                        viewTransitionClass: "sec-card",
                      } as CSSProperties
                    }
                    id="evergrid-contact-contact-01"
                  >
                    <button
                      className={
                        "group relative block aspect-[16/10] w-full overflow-hidden rounded-[12px] \x62g-[\x76ar(\x2d-surface-sunken)] text-left"
                      }
                      type="button"
                      aria-label="Preview Contact — Contact 01"
                    >
                      <img
                        className={
                          "object-cover \x6fbject-top transition-transform duration-300 \x67roup-hover:\x73cale-[\x31.\x3025]"
                        }
                        style={{
                          position: "absolute",
                          height: "100%",
                          width: "100%",
                          inset: "0px",
                          color: "transparent",
                        }}
                        alt="Contact — Contact 01 section preview"
                        loading="lazy"
                        decoding="async"
                        src="/site-assets/d042291e093f2426.webp"
                      />
                      <span
                        className={
                          "absolute bottom-2 right-2 rounded-full \x62g-white/\x395 px-3 py-1.5 text-[11px] font-medium \x74ext-[\x76ar(\x2d-text)] \x73hadow-[\x76ar(\x2d-shadow-raised)]"
                        }
                      >
                        Preview
                      </span>
                    </button>
                    <div
                      className={
                        "flex flex-1 flex-col gap-3 px-2 pb-1 pt-3 [&\x5fbutton[\x61ria-haspopup]]:\x77-full"
                      }
                    >
                      <div className="flex min-w-0 items-start justify-between gap-2">
                        <div className="min-w-0">
                          <h2
                            className={
                              "truncate text-[13px] font-medium \x74ext-[\x76ar(\x2d-text)]"
                            }
                          >
                            <a
                              className={"\x75nderline-offset-2 \x68over:\x75nderline"}
                              href="/sections/evergrid-contact-contact-01"
                            >
                              Contact — Contact 01
                            </a>
                          </h2>
                          <p
                            className={
                              "mt-0.5 truncate text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"
                            }
                          >
                            Template section · From Evergrid
                          </p>
                        </div>
                        <a
                          className={
                            "-mr-1 shrink-0 rounded-full px-2 py-1 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)] transition-colors \x68over:\x62g-black/[\x30.\x304] \x68over:\x74ext-[\x76ar(\x2d-text)]"
                          }
                          href="/sections/evergrid-contact-contact-01"
                        >
                          Details
                        </a>
                      </div>
                      <div className={"mt-auto [&>\x64iv]:\x77-full"}>
                        <div className="relative shrink-0">
                          <button
                            className={
                              "flex h-9 items-center gap-2 rounded-full \x62g-gradient-to-b \x66rom-white \x74o-[#\x663f3f2] pl-1 pr-3 text-[12px] font-medium \x74ext-[\x76ar(\x2d-text)] \x73hadow-[\x76ar(\x2d-shadow-raised)] transition-[transform,filter,box-shadow] duration-150 \x68over:\x2dtranslate-y-0.\x35 \x68over:\x73hadow-[\x30_5px_14px_rgba(\x30,\x30,\x30,\x30.\x312)] \x61ctive:\x74ranslate-y-px \x61ctive:\x73cale-[\x30.\x397] \x66ocus-visible:\x6futline-2 \x66ocus-visible:\x6futline-offset-2 \x66ocus-visible:\x6futline-[\x76ar(\x2d-accent)] \x6dotion-reduce:\x74ransform-none"
                            }
                            type="button"
                            aria-label="Copy Section options"
                            aria-haspopup="menu"
                            aria-expanded="false"
                          >
                            <span
                              className={
                                "flex h-7 w-7 shrink-0 items-center justify-center rounded-full \x62g-[#\x37a5be8] text-white"
                              }
                            >
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                aria-hidden="true"
                              >
                                <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18" />
                              </svg>
                            </span>
                            <span className="flex-1 whitespace-nowrap text-left">Copy Section</span>
                            <span
                              className={
                                "rounded-full \x62g-[#\x657f5e1] px-1.5 py-px text-[9.5px] font-semibold uppercase tracking-wide \x74ext-[#\x31f5a33]"
                              }
                            >
                              Free
                            </span>
                            <svg
                              className={
                                "ml-0.5 \x74ext-[\x76ar(\x2d-text-secondary)] transition-transform \x2drotate-90"
                              }
                              width="13"
                              height="13"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              aria-hidden="true"
                            >
                              <path d="m6 9 6 6 6-6" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>
                  <article
                    className={
                      "relative flex flex-col \x68as-[[\x61ria-expanded=\x74rue]]:\x7a-30 rounded-[20px] \x62order \x62order-[\x76ar(\x2d-line)] bg-white p-2 \x73hadow-[\x76ar(\x2d-shadow-raised)]"
                    }
                    style={
                      {
                        viewTransitionName: "sec-evergrid-blog-hero-01",
                        viewTransitionClass: "sec-card",
                      } as CSSProperties
                    }
                    id="evergrid-blog-hero-01"
                  >
                    <button
                      className={
                        "group relative block aspect-[16/10] w-full overflow-hidden rounded-[12px] \x62g-[\x76ar(\x2d-surface-sunken)] text-left"
                      }
                      type="button"
                      aria-label="Preview Blog — Hero 01"
                    >
                      <img
                        className={
                          "object-cover \x6fbject-top transition-transform duration-300 \x67roup-hover:\x73cale-[\x31.\x3025]"
                        }
                        style={{
                          position: "absolute",
                          height: "100%",
                          width: "100%",
                          inset: "0px",
                          color: "transparent",
                        }}
                        alt="Blog — Hero 01 section preview"
                        loading="lazy"
                        decoding="async"
                        src="/site-assets/98f3578eca33a379.webp"
                      />
                      <span
                        className={
                          "absolute bottom-2 right-2 rounded-full \x62g-white/\x395 px-3 py-1.5 text-[11px] font-medium \x74ext-[\x76ar(\x2d-text)] \x73hadow-[\x76ar(\x2d-shadow-raised)]"
                        }
                      >
                        Preview
                      </span>
                    </button>
                    <div
                      className={
                        "flex flex-1 flex-col gap-3 px-2 pb-1 pt-3 [&\x5fbutton[\x61ria-haspopup]]:\x77-full"
                      }
                    >
                      <div className="flex min-w-0 items-start justify-between gap-2">
                        <div className="min-w-0">
                          <h2
                            className={
                              "truncate text-[13px] font-medium \x74ext-[\x76ar(\x2d-text)]"
                            }
                          >
                            <a
                              className={"\x75nderline-offset-2 \x68over:\x75nderline"}
                              href="/sections/evergrid-blog-hero-01"
                            >
                              Blog — Hero 01
                            </a>
                          </h2>
                          <p
                            className={
                              "mt-0.5 truncate text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"
                            }
                          >
                            Template section · From Evergrid
                          </p>
                        </div>
                        <a
                          className={
                            "-mr-1 shrink-0 rounded-full px-2 py-1 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)] transition-colors \x68over:\x62g-black/[\x30.\x304] \x68over:\x74ext-[\x76ar(\x2d-text)]"
                          }
                          href="/sections/evergrid-blog-hero-01"
                        >
                          Details
                        </a>
                      </div>
                      <div className={"mt-auto [&>\x64iv]:\x77-full"}>
                        <div className="relative shrink-0">
                          <button
                            className={
                              "flex h-9 items-center gap-2 rounded-full \x62g-gradient-to-b \x66rom-white \x74o-[#\x663f3f2] pl-1 pr-3 text-[12px] font-medium \x74ext-[\x76ar(\x2d-text)] \x73hadow-[\x76ar(\x2d-shadow-raised)] transition-[transform,filter,box-shadow] duration-150 \x68over:\x2dtranslate-y-0.\x35 \x68over:\x73hadow-[\x30_5px_14px_rgba(\x30,\x30,\x30,\x30.\x312)] \x61ctive:\x74ranslate-y-px \x61ctive:\x73cale-[\x30.\x397] \x66ocus-visible:\x6futline-2 \x66ocus-visible:\x6futline-offset-2 \x66ocus-visible:\x6futline-[\x76ar(\x2d-accent)] \x6dotion-reduce:\x74ransform-none"
                            }
                            type="button"
                            aria-label="Copy Section options"
                            aria-haspopup="menu"
                            aria-expanded="false"
                          >
                            <span
                              className={
                                "flex h-7 w-7 shrink-0 items-center justify-center rounded-full \x62g-[#\x37a5be8] text-white"
                              }
                            >
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                aria-hidden="true"
                              >
                                <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18" />
                              </svg>
                            </span>
                            <span className="flex-1 whitespace-nowrap text-left">Copy Section</span>
                            <span
                              className={
                                "rounded-full \x62g-[#\x657f5e1] px-1.5 py-px text-[9.5px] font-semibold uppercase tracking-wide \x74ext-[#\x31f5a33]"
                              }
                            >
                              Free
                            </span>
                            <svg
                              className={
                                "ml-0.5 \x74ext-[\x76ar(\x2d-text-secondary)] transition-transform \x2drotate-90"
                              }
                              width="13"
                              height="13"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              aria-hidden="true"
                            >
                              <path d="m6 9 6 6 6-6" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>
                  <article
                    className={
                      "relative flex flex-col \x68as-[[\x61ria-expanded=\x74rue]]:\x7a-30 rounded-[20px] \x62order \x62order-[\x76ar(\x2d-line)] bg-white p-2 \x73hadow-[\x76ar(\x2d-shadow-raised)]"
                    }
                    style={
                      {
                        viewTransitionName: "sec-evergrid-home-footer-01",
                        viewTransitionClass: "sec-card",
                      } as CSSProperties
                    }
                    id="evergrid-home-footer-01"
                  >
                    <button
                      className={
                        "group relative block aspect-[16/10] w-full overflow-hidden rounded-[12px] \x62g-[\x76ar(\x2d-surface-sunken)] text-left"
                      }
                      type="button"
                      aria-label="Preview Home — Footer 01"
                    >
                      <img
                        className={
                          "object-cover \x6fbject-top transition-transform duration-300 \x67roup-hover:\x73cale-[\x31.\x3025]"
                        }
                        style={{
                          position: "absolute",
                          height: "100%",
                          width: "100%",
                          inset: "0px",
                          color: "transparent",
                        }}
                        alt="Home — Footer 01 section preview"
                        loading="lazy"
                        decoding="async"
                        src="/site-assets/042c642a95562030.webp"
                      />
                      <span
                        className={
                          "absolute bottom-2 right-2 rounded-full \x62g-white/\x395 px-3 py-1.5 text-[11px] font-medium \x74ext-[\x76ar(\x2d-text)] \x73hadow-[\x76ar(\x2d-shadow-raised)]"
                        }
                      >
                        Preview
                      </span>
                    </button>
                    <div
                      className={
                        "flex flex-1 flex-col gap-3 px-2 pb-1 pt-3 [&\x5fbutton[\x61ria-haspopup]]:\x77-full"
                      }
                    >
                      <div className="flex min-w-0 items-start justify-between gap-2">
                        <div className="min-w-0">
                          <h2
                            className={
                              "truncate text-[13px] font-medium \x74ext-[\x76ar(\x2d-text)]"
                            }
                          >
                            <a
                              className={"\x75nderline-offset-2 \x68over:\x75nderline"}
                              href="/sections/evergrid-home-footer-01"
                            >
                              Home — Footer 01
                            </a>
                          </h2>
                          <p
                            className={
                              "mt-0.5 truncate text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"
                            }
                          >
                            Template section · From Evergrid
                          </p>
                        </div>
                        <a
                          className={
                            "-mr-1 shrink-0 rounded-full px-2 py-1 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)] transition-colors \x68over:\x62g-black/[\x30.\x304] \x68over:\x74ext-[\x76ar(\x2d-text)]"
                          }
                          href="/sections/evergrid-home-footer-01"
                        >
                          Details
                        </a>
                      </div>
                      <div className={"mt-auto [&>\x64iv]:\x77-full"}>
                        <div className="relative shrink-0">
                          <button
                            className={
                              "flex h-9 items-center gap-2 rounded-full \x62g-gradient-to-b \x66rom-white \x74o-[#\x663f3f2] pl-1 pr-3 text-[12px] font-medium \x74ext-[\x76ar(\x2d-text)] \x73hadow-[\x76ar(\x2d-shadow-raised)] transition-[transform,filter,box-shadow] duration-150 \x68over:\x2dtranslate-y-0.\x35 \x68over:\x73hadow-[\x30_5px_14px_rgba(\x30,\x30,\x30,\x30.\x312)] \x61ctive:\x74ranslate-y-px \x61ctive:\x73cale-[\x30.\x397] \x66ocus-visible:\x6futline-2 \x66ocus-visible:\x6futline-offset-2 \x66ocus-visible:\x6futline-[\x76ar(\x2d-accent)] \x6dotion-reduce:\x74ransform-none"
                            }
                            type="button"
                            aria-label="Copy Section options"
                            aria-haspopup="menu"
                            aria-expanded="false"
                          >
                            <span
                              className={
                                "flex h-7 w-7 shrink-0 items-center justify-center rounded-full \x62g-[#\x37a5be8] text-white"
                              }
                            >
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                aria-hidden="true"
                              >
                                <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18" />
                              </svg>
                            </span>
                            <span className="flex-1 whitespace-nowrap text-left">Copy Section</span>
                            <span
                              className={
                                "rounded-full \x62g-[#\x657f5e1] px-1.5 py-px text-[9.5px] font-semibold uppercase tracking-wide \x74ext-[#\x31f5a33]"
                              }
                            >
                              Free
                            </span>
                            <svg
                              className={
                                "ml-0.5 \x74ext-[\x76ar(\x2d-text-secondary)] transition-transform \x2drotate-90"
                              }
                              width="13"
                              height="13"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              aria-hidden="true"
                            >
                              <path d="m6 9 6 6 6-6" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>
                  <article
                    className={
                      "relative flex flex-col \x68as-[[\x61ria-expanded=\x74rue]]:\x7a-30 rounded-[20px] \x62order \x62order-[\x76ar(\x2d-line)] bg-white p-2 \x73hadow-[\x76ar(\x2d-shadow-raised)]"
                    }
                    style={
                      {
                        viewTransitionName: "sec-evergrid-about-us-other-01",
                        viewTransitionClass: "sec-card",
                      } as CSSProperties
                    }
                    id="evergrid-about-us-other-01"
                  >
                    <button
                      className={
                        "group relative block aspect-[16/10] w-full overflow-hidden rounded-[12px] \x62g-[\x76ar(\x2d-surface-sunken)] text-left"
                      }
                      type="button"
                      aria-label="Preview About Us — Other 01"
                    >
                      <img
                        className={
                          "object-cover \x6fbject-top transition-transform duration-300 \x67roup-hover:\x73cale-[\x31.\x3025]"
                        }
                        style={{
                          position: "absolute",
                          height: "100%",
                          width: "100%",
                          inset: "0px",
                          color: "transparent",
                        }}
                        alt="About Us — Other 01 section preview"
                        loading="lazy"
                        decoding="async"
                        src="/site-assets/bc80b328a11fd9ce.webp"
                      />
                      <span
                        className={
                          "absolute bottom-2 right-2 rounded-full \x62g-white/\x395 px-3 py-1.5 text-[11px] font-medium \x74ext-[\x76ar(\x2d-text)] \x73hadow-[\x76ar(\x2d-shadow-raised)]"
                        }
                      >
                        Preview
                      </span>
                    </button>
                    <div
                      className={
                        "flex flex-1 flex-col gap-3 px-2 pb-1 pt-3 [&\x5fbutton[\x61ria-haspopup]]:\x77-full"
                      }
                    >
                      <div className="flex min-w-0 items-start justify-between gap-2">
                        <div className="min-w-0">
                          <h2
                            className={
                              "truncate text-[13px] font-medium \x74ext-[\x76ar(\x2d-text)]"
                            }
                          >
                            <a
                              className={"\x75nderline-offset-2 \x68over:\x75nderline"}
                              href="/sections/evergrid-about-us-other-01"
                            >
                              About Us — Other 01
                            </a>
                          </h2>
                          <p
                            className={
                              "mt-0.5 truncate text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"
                            }
                          >
                            Template section · From Evergrid
                          </p>
                        </div>
                        <a
                          className={
                            "-mr-1 shrink-0 rounded-full px-2 py-1 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)] transition-colors \x68over:\x62g-black/[\x30.\x304] \x68over:\x74ext-[\x76ar(\x2d-text)]"
                          }
                          href="/sections/evergrid-about-us-other-01"
                        >
                          Details
                        </a>
                      </div>
                      <div className={"mt-auto [&>\x64iv]:\x77-full"}>
                        <div className="relative shrink-0">
                          <button
                            className={
                              "flex h-9 items-center gap-2 rounded-full \x62g-gradient-to-b \x66rom-white \x74o-[#\x663f3f2] pl-1 pr-3 text-[12px] font-medium \x74ext-[\x76ar(\x2d-text)] \x73hadow-[\x76ar(\x2d-shadow-raised)] transition-[transform,filter,box-shadow] duration-150 \x68over:\x2dtranslate-y-0.\x35 \x68over:\x73hadow-[\x30_5px_14px_rgba(\x30,\x30,\x30,\x30.\x312)] \x61ctive:\x74ranslate-y-px \x61ctive:\x73cale-[\x30.\x397] \x66ocus-visible:\x6futline-2 \x66ocus-visible:\x6futline-offset-2 \x66ocus-visible:\x6futline-[\x76ar(\x2d-accent)] \x6dotion-reduce:\x74ransform-none"
                            }
                            type="button"
                            aria-label="Copy Section options"
                            aria-haspopup="menu"
                            aria-expanded="false"
                          >
                            <span
                              className={
                                "flex h-7 w-7 shrink-0 items-center justify-center rounded-full \x62g-[#\x37a5be8] text-white"
                              }
                            >
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                aria-hidden="true"
                              >
                                <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18" />
                              </svg>
                            </span>
                            <span className="flex-1 whitespace-nowrap text-left">Copy Section</span>
                            <span
                              className={
                                "rounded-full \x62g-[#\x657f5e1] px-1.5 py-px text-[9.5px] font-semibold uppercase tracking-wide \x74ext-[#\x31f5a33]"
                              }
                            >
                              Free
                            </span>
                            <svg
                              className={
                                "ml-0.5 \x74ext-[\x76ar(\x2d-text-secondary)] transition-transform \x2drotate-90"
                              }
                              width="13"
                              height="13"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              aria-hidden="true"
                            >
                              <path d="m6 9 6 6 6-6" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>
                  <article
                    className={
                      "relative flex flex-col \x68as-[[\x61ria-expanded=\x74rue]]:\x7a-30 rounded-[20px] \x62order \x62order-[\x76ar(\x2d-line)] bg-white p-2 \x73hadow-[\x76ar(\x2d-shadow-raised)]"
                    }
                    style={
                      {
                        viewTransitionName: "sec-evergrid-product-hero-01",
                        viewTransitionClass: "sec-card",
                      } as CSSProperties
                    }
                    id="evergrid-product-hero-01"
                  >
                    <button
                      className={
                        "group relative block aspect-[16/10] w-full overflow-hidden rounded-[12px] \x62g-[\x76ar(\x2d-surface-sunken)] text-left"
                      }
                      type="button"
                      aria-label="Preview Product — Hero 01"
                    >
                      <img
                        className={
                          "object-cover \x6fbject-top transition-transform duration-300 \x67roup-hover:\x73cale-[\x31.\x3025]"
                        }
                        style={{
                          position: "absolute",
                          height: "100%",
                          width: "100%",
                          inset: "0px",
                          color: "transparent",
                        }}
                        alt="Product — Hero 01 section preview"
                        loading="lazy"
                        decoding="async"
                        src="/site-assets/1da47636db42bedf.webp"
                      />
                      <span
                        className={
                          "absolute bottom-2 right-2 rounded-full \x62g-white/\x395 px-3 py-1.5 text-[11px] font-medium \x74ext-[\x76ar(\x2d-text)] \x73hadow-[\x76ar(\x2d-shadow-raised)]"
                        }
                      >
                        Preview
                      </span>
                    </button>
                    <div
                      className={
                        "flex flex-1 flex-col gap-3 px-2 pb-1 pt-3 [&\x5fbutton[\x61ria-haspopup]]:\x77-full"
                      }
                    >
                      <div className="flex min-w-0 items-start justify-between gap-2">
                        <div className="min-w-0">
                          <h2
                            className={
                              "truncate text-[13px] font-medium \x74ext-[\x76ar(\x2d-text)]"
                            }
                          >
                            <a
                              className={"\x75nderline-offset-2 \x68over:\x75nderline"}
                              href="/sections/evergrid-product-hero-01"
                            >
                              Product — Hero 01
                            </a>
                          </h2>
                          <p
                            className={
                              "mt-0.5 truncate text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"
                            }
                          >
                            Template section · From Evergrid
                          </p>
                        </div>
                        <a
                          className={
                            "-mr-1 shrink-0 rounded-full px-2 py-1 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)] transition-colors \x68over:\x62g-black/[\x30.\x304] \x68over:\x74ext-[\x76ar(\x2d-text)]"
                          }
                          href="/sections/evergrid-product-hero-01"
                        >
                          Details
                        </a>
                      </div>
                      <div className={"mt-auto [&>\x64iv]:\x77-full"}>
                        <div className="relative shrink-0">
                          <button
                            className={
                              "flex h-9 items-center gap-2 rounded-full \x62g-gradient-to-b \x66rom-white \x74o-[#\x663f3f2] pl-1 pr-3 text-[12px] font-medium \x74ext-[\x76ar(\x2d-text)] \x73hadow-[\x76ar(\x2d-shadow-raised)] transition-[transform,filter,box-shadow] duration-150 \x68over:\x2dtranslate-y-0.\x35 \x68over:\x73hadow-[\x30_5px_14px_rgba(\x30,\x30,\x30,\x30.\x312)] \x61ctive:\x74ranslate-y-px \x61ctive:\x73cale-[\x30.\x397] \x66ocus-visible:\x6futline-2 \x66ocus-visible:\x6futline-offset-2 \x66ocus-visible:\x6futline-[\x76ar(\x2d-accent)] \x6dotion-reduce:\x74ransform-none"
                            }
                            type="button"
                            aria-label="Copy Section options"
                            aria-haspopup="menu"
                            aria-expanded="false"
                          >
                            <span
                              className={
                                "flex h-7 w-7 shrink-0 items-center justify-center rounded-full \x62g-[#\x37a5be8] text-white"
                              }
                            >
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                aria-hidden="true"
                              >
                                <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18" />
                              </svg>
                            </span>
                            <span className="flex-1 whitespace-nowrap text-left">Copy Section</span>
                            <span
                              className={
                                "rounded-full \x62g-[#\x657f5e1] px-1.5 py-px text-[9.5px] font-semibold uppercase tracking-wide \x74ext-[#\x31f5a33]"
                              }
                            >
                              Free
                            </span>
                            <svg
                              className={
                                "ml-0.5 \x74ext-[\x76ar(\x2d-text-secondary)] transition-transform \x2drotate-90"
                              }
                              width="13"
                              height="13"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              aria-hidden="true"
                            >
                              <path d="m6 9 6 6 6-6" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>
                  <article
                    className={
                      "relative flex flex-col \x68as-[[\x61ria-expanded=\x74rue]]:\x7a-30 rounded-[20px] \x62order \x62order-[\x76ar(\x2d-line)] bg-white p-2 \x73hadow-[\x76ar(\x2d-shadow-raised)]"
                    }
                    style={
                      {
                        viewTransitionName: "sec-404-halo",
                        viewTransitionClass: "sec-card",
                      } as CSSProperties
                    }
                    id="404-halo"
                  >
                    <button
                      className={
                        "group relative block aspect-[16/10] w-full overflow-hidden rounded-[12px] \x62g-[\x76ar(\x2d-surface-sunken)] text-left"
                      }
                      type="button"
                      aria-label="Preview 404 Halo"
                    >
                      <img
                        className={
                          "object-cover \x6fbject-top transition-transform duration-300 \x67roup-hover:\x73cale-[\x31.\x3025]"
                        }
                        style={{
                          position: "absolute",
                          height: "100%",
                          width: "100%",
                          inset: "0px",
                          color: "transparent",
                        }}
                        alt="404 Halo section preview"
                        loading="lazy"
                        decoding="async"
                        src="/site-assets/0b5d751aef8ab8e5.webp"
                      />
                      <span
                        className={
                          "absolute left-2 top-2 inline-flex items-center gap-1 rounded-full \x62g-[#\x3111]/\x390 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide \x74ext-[#\x665d98a] \x73hadow-[\x76ar(\x2d-shadow-raised)] \x62ackdrop-blur"
                        }
                      >
                        ✦ Pro
                      </span>
                      <span
                        className={
                          "absolute bottom-2 right-2 rounded-full \x62g-white/\x395 px-3 py-1.5 text-[11px] font-medium \x74ext-[\x76ar(\x2d-text)] \x73hadow-[\x76ar(\x2d-shadow-raised)]"
                        }
                      >
                        Preview
                      </span>
                    </button>
                    <div
                      className={
                        "flex flex-1 flex-col gap-3 px-2 pb-1 pt-3 [&\x5fbutton[\x61ria-haspopup]]:\x77-full"
                      }
                    >
                      <div className="flex min-w-0 items-start justify-between gap-2">
                        <div className="min-w-0">
                          <h2
                            className={
                              "truncate text-[13px] font-medium \x74ext-[\x76ar(\x2d-text)]"
                            }
                          >
                            <a
                              className={"\x75nderline-offset-2 \x68over:\x75nderline"}
                              href="/sections/404-halo"
                            >
                              404 Halo
                            </a>
                          </h2>
                          <p
                            className={
                              "mt-0.5 truncate text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"
                            }
                          >
                            404 page · Studio Original
                          </p>
                        </div>
                        <a
                          className={
                            "-mr-1 shrink-0 rounded-full px-2 py-1 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)] transition-colors \x68over:\x62g-black/[\x30.\x304] \x68over:\x74ext-[\x76ar(\x2d-text)]"
                          }
                          href="/sections/404-halo"
                        >
                          Details
                        </a>
                      </div>
                      <div className={"mt-auto [&>\x64iv]:\x77-full"}>
                        <a
                          className="os-btn-dark os-spark h-10 justify-center w-full"
                          href="/pricing?plan=sections"
                        >
                          <svg
                            width="13"
                            height="13"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                          >
                            <rect x="4" y="10" width="16" height="10" rx="1" />
                            <path d="M8 10V7a4 4 0 0 1 8 0v3" />
                          </svg>{" "}
                          Unlock with Pro
                        </a>
                      </div>
                    </div>
                  </article>
                  <article
                    className={
                      "relative flex flex-col \x68as-[[\x61ria-expanded=\x74rue]]:\x7a-30 rounded-[20px] \x62order \x62order-[\x76ar(\x2d-line)] bg-white p-2 \x73hadow-[\x76ar(\x2d-shadow-raised)]"
                    }
                    style={
                      {
                        viewTransitionName: "sec-404-receipt",
                        viewTransitionClass: "sec-card",
                      } as CSSProperties
                    }
                    id="404-receipt"
                  >
                    <button
                      className={
                        "group relative block aspect-[16/10] w-full overflow-hidden rounded-[12px] \x62g-[\x76ar(\x2d-surface-sunken)] text-left"
                      }
                      type="button"
                      aria-label="Preview 404 Receipt"
                    >
                      <img
                        className={
                          "object-cover \x6fbject-top transition-transform duration-300 \x67roup-hover:\x73cale-[\x31.\x3025]"
                        }
                        style={{
                          position: "absolute",
                          height: "100%",
                          width: "100%",
                          inset: "0px",
                          color: "transparent",
                        }}
                        alt="404 Receipt section preview"
                        loading="lazy"
                        decoding="async"
                        src="/site-assets/be79c10d7b4e633b.webp"
                      />
                      <span
                        className={
                          "absolute left-2 top-2 inline-flex items-center gap-1 rounded-full \x62g-[#\x3111]/\x390 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide \x74ext-[#\x665d98a] \x73hadow-[\x76ar(\x2d-shadow-raised)] \x62ackdrop-blur"
                        }
                      >
                        ✦ Pro
                      </span>
                      <span
                        className={
                          "absolute bottom-2 right-2 rounded-full \x62g-white/\x395 px-3 py-1.5 text-[11px] font-medium \x74ext-[\x76ar(\x2d-text)] \x73hadow-[\x76ar(\x2d-shadow-raised)]"
                        }
                      >
                        Preview
                      </span>
                    </button>
                    <div
                      className={
                        "flex flex-1 flex-col gap-3 px-2 pb-1 pt-3 [&\x5fbutton[\x61ria-haspopup]]:\x77-full"
                      }
                    >
                      <div className="flex min-w-0 items-start justify-between gap-2">
                        <div className="min-w-0">
                          <h2
                            className={
                              "truncate text-[13px] font-medium \x74ext-[\x76ar(\x2d-text)]"
                            }
                          >
                            <a
                              className={"\x75nderline-offset-2 \x68over:\x75nderline"}
                              href="/sections/404-receipt"
                            >
                              404 Receipt
                            </a>
                          </h2>
                          <p
                            className={
                              "mt-0.5 truncate text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"
                            }
                          >
                            404 page · Studio Original
                          </p>
                        </div>
                        <a
                          className={
                            "-mr-1 shrink-0 rounded-full px-2 py-1 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)] transition-colors \x68over:\x62g-black/[\x30.\x304] \x68over:\x74ext-[\x76ar(\x2d-text)]"
                          }
                          href="/sections/404-receipt"
                        >
                          Details
                        </a>
                      </div>
                      <div className={"mt-auto [&>\x64iv]:\x77-full"}>
                        <a
                          className="os-btn-dark os-spark h-10 justify-center w-full"
                          href="/pricing?plan=sections"
                        >
                          <svg
                            width="13"
                            height="13"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                          >
                            <rect x="4" y="10" width="16" height="10" rx="1" />
                            <path d="M8 10V7a4 4 0 0 1 8 0v3" />
                          </svg>{" "}
                          Unlock with Pro
                        </a>
                      </div>
                    </div>
                  </article>
                  <article
                    className={
                      "relative flex flex-col \x68as-[[\x61ria-expanded=\x74rue]]:\x7a-30 rounded-[20px] \x62order \x62order-[\x76ar(\x2d-line)] bg-white p-2 \x73hadow-[\x76ar(\x2d-shadow-raised)]"
                    }
                    style={
                      {
                        viewTransitionName: "sec-evergrid-home-cta-01",
                        viewTransitionClass: "sec-card",
                      } as CSSProperties
                    }
                    id="evergrid-home-cta-01"
                  >
                    <button
                      className={
                        "group relative block aspect-[16/10] w-full overflow-hidden rounded-[12px] \x62g-[\x76ar(\x2d-surface-sunken)] text-left"
                      }
                      type="button"
                      aria-label="Preview Home — CTA 01"
                    >
                      <img
                        className={
                          "object-cover \x6fbject-top transition-transform duration-300 \x67roup-hover:\x73cale-[\x31.\x3025]"
                        }
                        style={{
                          position: "absolute",
                          height: "100%",
                          width: "100%",
                          inset: "0px",
                          color: "transparent",
                        }}
                        alt="Home — CTA 01 section preview"
                        loading="lazy"
                        decoding="async"
                        src="/site-assets/042c642a95562030.webp"
                      />
                      <span
                        className={
                          "absolute bottom-2 right-2 rounded-full \x62g-white/\x395 px-3 py-1.5 text-[11px] font-medium \x74ext-[\x76ar(\x2d-text)] \x73hadow-[\x76ar(\x2d-shadow-raised)]"
                        }
                      >
                        Preview
                      </span>
                    </button>
                    <div
                      className={
                        "flex flex-1 flex-col gap-3 px-2 pb-1 pt-3 [&\x5fbutton[\x61ria-haspopup]]:\x77-full"
                      }
                    >
                      <div className="flex min-w-0 items-start justify-between gap-2">
                        <div className="min-w-0">
                          <h2
                            className={
                              "truncate text-[13px] font-medium \x74ext-[\x76ar(\x2d-text)]"
                            }
                          >
                            <a
                              className={"\x75nderline-offset-2 \x68over:\x75nderline"}
                              href="/sections/evergrid-home-cta-01"
                            >
                              Home — CTA 01
                            </a>
                          </h2>
                          <p
                            className={
                              "mt-0.5 truncate text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"
                            }
                          >
                            Template section · From Evergrid
                          </p>
                        </div>
                        <a
                          className={
                            "-mr-1 shrink-0 rounded-full px-2 py-1 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)] transition-colors \x68over:\x62g-black/[\x30.\x304] \x68over:\x74ext-[\x76ar(\x2d-text)]"
                          }
                          href="/sections/evergrid-home-cta-01"
                        >
                          Details
                        </a>
                      </div>
                      <div className={"mt-auto [&>\x64iv]:\x77-full"}>
                        <div className="relative shrink-0">
                          <button
                            className={
                              "flex h-9 items-center gap-2 rounded-full \x62g-gradient-to-b \x66rom-white \x74o-[#\x663f3f2] pl-1 pr-3 text-[12px] font-medium \x74ext-[\x76ar(\x2d-text)] \x73hadow-[\x76ar(\x2d-shadow-raised)] transition-[transform,filter,box-shadow] duration-150 \x68over:\x2dtranslate-y-0.\x35 \x68over:\x73hadow-[\x30_5px_14px_rgba(\x30,\x30,\x30,\x30.\x312)] \x61ctive:\x74ranslate-y-px \x61ctive:\x73cale-[\x30.\x397] \x66ocus-visible:\x6futline-2 \x66ocus-visible:\x6futline-offset-2 \x66ocus-visible:\x6futline-[\x76ar(\x2d-accent)] \x6dotion-reduce:\x74ransform-none"
                            }
                            type="button"
                            aria-label="Copy Section options"
                            aria-haspopup="menu"
                            aria-expanded="false"
                          >
                            <span
                              className={
                                "flex h-7 w-7 shrink-0 items-center justify-center rounded-full \x62g-[#\x37a5be8] text-white"
                              }
                            >
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                aria-hidden="true"
                              >
                                <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18" />
                              </svg>
                            </span>
                            <span className="flex-1 whitespace-nowrap text-left">Copy Section</span>
                            <span
                              className={
                                "rounded-full \x62g-[#\x657f5e1] px-1.5 py-px text-[9.5px] font-semibold uppercase tracking-wide \x74ext-[#\x31f5a33]"
                              }
                            >
                              Free
                            </span>
                            <svg
                              className={
                                "ml-0.5 \x74ext-[\x76ar(\x2d-text-secondary)] transition-transform \x2drotate-90"
                              }
                              width="13"
                              height="13"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              aria-hidden="true"
                            >
                              <path d="m6 9 6 6 6-6" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>
                  <article
                    className={
                      "relative flex flex-col \x68as-[[\x61ria-expanded=\x74rue]]:\x7a-30 rounded-[20px] \x62order \x62order-[\x76ar(\x2d-line)] bg-white p-2 \x73hadow-[\x76ar(\x2d-shadow-raised)]"
                    }
                    style={
                      {
                        viewTransitionName: "sec-404-breakout",
                        viewTransitionClass: "sec-card",
                      } as CSSProperties
                    }
                    id="404-breakout"
                  >
                    <button
                      className={
                        "group relative block aspect-[16/10] w-full overflow-hidden rounded-[12px] \x62g-[\x76ar(\x2d-surface-sunken)] text-left"
                      }
                      type="button"
                      aria-label="Preview 404 Breakout"
                    >
                      <img
                        className={
                          "object-cover \x6fbject-top transition-transform duration-300 \x67roup-hover:\x73cale-[\x31.\x3025]"
                        }
                        style={{
                          position: "absolute",
                          height: "100%",
                          width: "100%",
                          inset: "0px",
                          color: "transparent",
                        }}
                        alt="404 Breakout section preview"
                        loading="lazy"
                        decoding="async"
                        src="/site-assets/7003a8c9fd98af2a.webp"
                      />
                      <span
                        className={
                          "absolute left-2 top-2 inline-flex items-center gap-1 rounded-full \x62g-[#\x3111]/\x390 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide \x74ext-[#\x665d98a] \x73hadow-[\x76ar(\x2d-shadow-raised)] \x62ackdrop-blur"
                        }
                      >
                        ✦ Pro
                      </span>
                      <span
                        className={
                          "absolute bottom-2 right-2 rounded-full \x62g-white/\x395 px-3 py-1.5 text-[11px] font-medium \x74ext-[\x76ar(\x2d-text)] \x73hadow-[\x76ar(\x2d-shadow-raised)]"
                        }
                      >
                        Preview
                      </span>
                    </button>
                    <div
                      className={
                        "flex flex-1 flex-col gap-3 px-2 pb-1 pt-3 [&\x5fbutton[\x61ria-haspopup]]:\x77-full"
                      }
                    >
                      <div className="flex min-w-0 items-start justify-between gap-2">
                        <div className="min-w-0">
                          <h2
                            className={
                              "truncate text-[13px] font-medium \x74ext-[\x76ar(\x2d-text)]"
                            }
                          >
                            <a
                              className={"\x75nderline-offset-2 \x68over:\x75nderline"}
                              href="/sections/404-breakout"
                            >
                              404 Breakout
                            </a>
                          </h2>
                          <p
                            className={
                              "mt-0.5 truncate text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"
                            }
                          >
                            404 page · Studio Original
                          </p>
                        </div>
                        <a
                          className={
                            "-mr-1 shrink-0 rounded-full px-2 py-1 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)] transition-colors \x68over:\x62g-black/[\x30.\x304] \x68over:\x74ext-[\x76ar(\x2d-text)]"
                          }
                          href="/sections/404-breakout"
                        >
                          Details
                        </a>
                      </div>
                      <div className={"mt-auto [&>\x64iv]:\x77-full"}>
                        <a
                          className="os-btn-dark os-spark h-10 justify-center w-full"
                          href="/pricing?plan=sections"
                        >
                          <svg
                            width="13"
                            height="13"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                          >
                            <rect x="4" y="10" width="16" height="10" rx="1" />
                            <path d="M8 10V7a4 4 0 0 1 8 0v3" />
                          </svg>{" "}
                          Unlock with Pro
                        </a>
                      </div>
                    </div>
                  </article>
                  <article
                    className={
                      "relative flex flex-col \x68as-[[\x61ria-expanded=\x74rue]]:\x7a-30 rounded-[20px] \x62order \x62order-[\x76ar(\x2d-line)] bg-white p-2 \x73hadow-[\x76ar(\x2d-shadow-raised)]"
                    }
                    style={
                      {
                        viewTransitionName: "sec-404-scribble",
                        viewTransitionClass: "sec-card",
                      } as CSSProperties
                    }
                    id="404-scribble"
                  >
                    <button
                      className={
                        "group relative block aspect-[16/10] w-full overflow-hidden rounded-[12px] \x62g-[\x76ar(\x2d-surface-sunken)] text-left"
                      }
                      type="button"
                      aria-label="Preview 404 Scribble"
                    >
                      <img
                        className={
                          "object-cover \x6fbject-top transition-transform duration-300 \x67roup-hover:\x73cale-[\x31.\x3025]"
                        }
                        style={{
                          position: "absolute",
                          height: "100%",
                          width: "100%",
                          inset: "0px",
                          color: "transparent",
                        }}
                        alt="404 Scribble section preview"
                        loading="lazy"
                        decoding="async"
                        src="/site-assets/0126ffe160c9a286.webp"
                      />
                      <span
                        className={
                          "absolute left-2 top-2 inline-flex items-center gap-1 rounded-full \x62g-[#\x3111]/\x390 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide \x74ext-[#\x665d98a] \x73hadow-[\x76ar(\x2d-shadow-raised)] \x62ackdrop-blur"
                        }
                      >
                        ✦ Pro
                      </span>
                      <span
                        className={
                          "absolute bottom-2 right-2 rounded-full \x62g-white/\x395 px-3 py-1.5 text-[11px] font-medium \x74ext-[\x76ar(\x2d-text)] \x73hadow-[\x76ar(\x2d-shadow-raised)]"
                        }
                      >
                        Preview
                      </span>
                    </button>
                    <div
                      className={
                        "flex flex-1 flex-col gap-3 px-2 pb-1 pt-3 [&\x5fbutton[\x61ria-haspopup]]:\x77-full"
                      }
                    >
                      <div className="flex min-w-0 items-start justify-between gap-2">
                        <div className="min-w-0">
                          <h2
                            className={
                              "truncate text-[13px] font-medium \x74ext-[\x76ar(\x2d-text)]"
                            }
                          >
                            <a
                              className={"\x75nderline-offset-2 \x68over:\x75nderline"}
                              href="/sections/404-scribble"
                            >
                              404 Scribble
                            </a>
                          </h2>
                          <p
                            className={
                              "mt-0.5 truncate text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"
                            }
                          >
                            404 page · Studio Original
                          </p>
                        </div>
                        <a
                          className={
                            "-mr-1 shrink-0 rounded-full px-2 py-1 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)] transition-colors \x68over:\x62g-black/[\x30.\x304] \x68over:\x74ext-[\x76ar(\x2d-text)]"
                          }
                          href="/sections/404-scribble"
                        >
                          Details
                        </a>
                      </div>
                      <div className={"mt-auto [&>\x64iv]:\x77-full"}>
                        <a
                          className="os-btn-dark os-spark h-10 justify-center w-full"
                          href="/pricing?plan=sections"
                        >
                          <svg
                            width="13"
                            height="13"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                          >
                            <rect x="4" y="10" width="16" height="10" rx="1" />
                            <path d="M8 10V7a4 4 0 0 1 8 0v3" />
                          </svg>{" "}
                          Unlock with Pro
                        </a>
                      </div>
                    </div>
                  </article>
                  <article
                    className={
                      "relative flex flex-col \x68as-[[\x61ria-expanded=\x74rue]]:\x7a-30 rounded-[20px] \x62order \x62order-[\x76ar(\x2d-line)] bg-white p-2 \x73hadow-[\x76ar(\x2d-shadow-raised)]"
                    }
                    style={
                      {
                        viewTransitionName: "sec-evergrid-about-us-features-01",
                        viewTransitionClass: "sec-card",
                      } as CSSProperties
                    }
                    id="evergrid-about-us-features-01"
                  >
                    <button
                      className={
                        "group relative block aspect-[16/10] w-full overflow-hidden rounded-[12px] \x62g-[\x76ar(\x2d-surface-sunken)] text-left"
                      }
                      type="button"
                      aria-label="Preview About Us — Features 01"
                    >
                      <img
                        className={
                          "object-cover \x6fbject-top transition-transform duration-300 \x67roup-hover:\x73cale-[\x31.\x3025]"
                        }
                        style={{
                          position: "absolute",
                          height: "100%",
                          width: "100%",
                          inset: "0px",
                          color: "transparent",
                        }}
                        alt="About Us — Features 01 section preview"
                        loading="lazy"
                        decoding="async"
                        src="/site-assets/9c89a26296d555d5.webp"
                      />
                      <span
                        className={
                          "absolute bottom-2 right-2 rounded-full \x62g-white/\x395 px-3 py-1.5 text-[11px] font-medium \x74ext-[\x76ar(\x2d-text)] \x73hadow-[\x76ar(\x2d-shadow-raised)]"
                        }
                      >
                        Preview
                      </span>
                    </button>
                    <div
                      className={
                        "flex flex-1 flex-col gap-3 px-2 pb-1 pt-3 [&\x5fbutton[\x61ria-haspopup]]:\x77-full"
                      }
                    >
                      <div className="flex min-w-0 items-start justify-between gap-2">
                        <div className="min-w-0">
                          <h2
                            className={
                              "truncate text-[13px] font-medium \x74ext-[\x76ar(\x2d-text)]"
                            }
                          >
                            <a
                              className={"\x75nderline-offset-2 \x68over:\x75nderline"}
                              href="/sections/evergrid-about-us-features-01"
                            >
                              About Us — Features 01
                            </a>
                          </h2>
                          <p
                            className={
                              "mt-0.5 truncate text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"
                            }
                          >
                            Template section · From Evergrid
                          </p>
                        </div>
                        <a
                          className={
                            "-mr-1 shrink-0 rounded-full px-2 py-1 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)] transition-colors \x68over:\x62g-black/[\x30.\x304] \x68over:\x74ext-[\x76ar(\x2d-text)]"
                          }
                          href="/sections/evergrid-about-us-features-01"
                        >
                          Details
                        </a>
                      </div>
                      <div className={"mt-auto [&>\x64iv]:\x77-full"}>
                        <div className="relative shrink-0">
                          <button
                            className={
                              "flex h-9 items-center gap-2 rounded-full \x62g-gradient-to-b \x66rom-white \x74o-[#\x663f3f2] pl-1 pr-3 text-[12px] font-medium \x74ext-[\x76ar(\x2d-text)] \x73hadow-[\x76ar(\x2d-shadow-raised)] transition-[transform,filter,box-shadow] duration-150 \x68over:\x2dtranslate-y-0.\x35 \x68over:\x73hadow-[\x30_5px_14px_rgba(\x30,\x30,\x30,\x30.\x312)] \x61ctive:\x74ranslate-y-px \x61ctive:\x73cale-[\x30.\x397] \x66ocus-visible:\x6futline-2 \x66ocus-visible:\x6futline-offset-2 \x66ocus-visible:\x6futline-[\x76ar(\x2d-accent)] \x6dotion-reduce:\x74ransform-none"
                            }
                            type="button"
                            aria-label="Copy Section options"
                            aria-haspopup="menu"
                            aria-expanded="false"
                          >
                            <span
                              className={
                                "flex h-7 w-7 shrink-0 items-center justify-center rounded-full \x62g-[#\x37a5be8] text-white"
                              }
                            >
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                aria-hidden="true"
                              >
                                <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18" />
                              </svg>
                            </span>
                            <span className="flex-1 whitespace-nowrap text-left">Copy Section</span>
                            <span
                              className={
                                "rounded-full \x62g-[#\x657f5e1] px-1.5 py-px text-[9.5px] font-semibold uppercase tracking-wide \x74ext-[#\x31f5a33]"
                              }
                            >
                              Free
                            </span>
                            <svg
                              className={
                                "ml-0.5 \x74ext-[\x76ar(\x2d-text-secondary)] transition-transform \x2drotate-90"
                              }
                              width="13"
                              height="13"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              aria-hidden="true"
                            >
                              <path d="m6 9 6 6 6-6" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>
                  <article
                    className={
                      "relative flex flex-col \x68as-[[\x61ria-expanded=\x74rue]]:\x7a-30 rounded-[20px] \x62order \x62order-[\x76ar(\x2d-line)] bg-white p-2 \x73hadow-[\x76ar(\x2d-shadow-raised)]"
                    }
                    style={
                      {
                        viewTransitionName: "sec-404-mosaic",
                        viewTransitionClass: "sec-card",
                      } as CSSProperties
                    }
                    id="404-mosaic"
                  >
                    <button
                      className={
                        "group relative block aspect-[16/10] w-full overflow-hidden rounded-[12px] \x62g-[\x76ar(\x2d-surface-sunken)] text-left"
                      }
                      type="button"
                      aria-label="Preview 404 Mosaic"
                    >
                      <img
                        className={
                          "object-cover \x6fbject-top transition-transform duration-300 \x67roup-hover:\x73cale-[\x31.\x3025]"
                        }
                        style={{
                          position: "absolute",
                          height: "100%",
                          width: "100%",
                          inset: "0px",
                          color: "transparent",
                        }}
                        alt="404 Mosaic section preview"
                        loading="lazy"
                        decoding="async"
                        src="/site-assets/c8fe100ae043abf3.webp"
                      />
                      <span
                        className={
                          "absolute left-2 top-2 inline-flex items-center gap-1 rounded-full \x62g-[#\x3111]/\x390 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide \x74ext-[#\x665d98a] \x73hadow-[\x76ar(\x2d-shadow-raised)] \x62ackdrop-blur"
                        }
                      >
                        ✦ Pro
                      </span>
                      <span
                        className={
                          "absolute bottom-2 right-2 rounded-full \x62g-white/\x395 px-3 py-1.5 text-[11px] font-medium \x74ext-[\x76ar(\x2d-text)] \x73hadow-[\x76ar(\x2d-shadow-raised)]"
                        }
                      >
                        Preview
                      </span>
                    </button>
                    <div
                      className={
                        "flex flex-1 flex-col gap-3 px-2 pb-1 pt-3 [&\x5fbutton[\x61ria-haspopup]]:\x77-full"
                      }
                    >
                      <div className="flex min-w-0 items-start justify-between gap-2">
                        <div className="min-w-0">
                          <h2
                            className={
                              "truncate text-[13px] font-medium \x74ext-[\x76ar(\x2d-text)]"
                            }
                          >
                            <a
                              className={"\x75nderline-offset-2 \x68over:\x75nderline"}
                              href="/sections/404-mosaic"
                            >
                              404 Mosaic
                            </a>
                          </h2>
                          <p
                            className={
                              "mt-0.5 truncate text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"
                            }
                          >
                            404 page · Studio Original
                          </p>
                        </div>
                        <a
                          className={
                            "-mr-1 shrink-0 rounded-full px-2 py-1 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)] transition-colors \x68over:\x62g-black/[\x30.\x304] \x68over:\x74ext-[\x76ar(\x2d-text)]"
                          }
                          href="/sections/404-mosaic"
                        >
                          Details
                        </a>
                      </div>
                      <div className={"mt-auto [&>\x64iv]:\x77-full"}>
                        <a
                          className="os-btn-dark os-spark h-10 justify-center w-full"
                          href="/pricing?plan=sections"
                        >
                          <svg
                            width="13"
                            height="13"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                          >
                            <rect x="4" y="10" width="16" height="10" rx="1" />
                            <path d="M8 10V7a4 4 0 0 1 8 0v3" />
                          </svg>{" "}
                          Unlock with Pro
                        </a>
                      </div>
                    </div>
                  </article>
                  <article
                    className={
                      "relative flex flex-col \x68as-[[\x61ria-expanded=\x74rue]]:\x7a-30 rounded-[20px] \x62order \x62order-[\x76ar(\x2d-line)] bg-white p-2 \x73hadow-[\x76ar(\x2d-shadow-raised)]"
                    }
                    style={
                      {
                        viewTransitionName: "sec-evergrid-about-us-features-02",
                        viewTransitionClass: "sec-card",
                      } as CSSProperties
                    }
                    id="evergrid-about-us-features-02"
                  >
                    <button
                      className={
                        "group relative block aspect-[16/10] w-full overflow-hidden rounded-[12px] \x62g-[\x76ar(\x2d-surface-sunken)] text-left"
                      }
                      type="button"
                      aria-label="Preview About Us — Features 02"
                    >
                      <img
                        className={
                          "object-cover \x6fbject-top transition-transform duration-300 \x67roup-hover:\x73cale-[\x31.\x3025]"
                        }
                        style={{
                          position: "absolute",
                          height: "100%",
                          width: "100%",
                          inset: "0px",
                          color: "transparent",
                        }}
                        alt="About Us — Features 02 section preview"
                        loading="lazy"
                        decoding="async"
                        src="/site-assets/3b0cf45d15c621e2.webp"
                      />
                      <span
                        className={
                          "absolute bottom-2 right-2 rounded-full \x62g-white/\x395 px-3 py-1.5 text-[11px] font-medium \x74ext-[\x76ar(\x2d-text)] \x73hadow-[\x76ar(\x2d-shadow-raised)]"
                        }
                      >
                        Preview
                      </span>
                    </button>
                    <div
                      className={
                        "flex flex-1 flex-col gap-3 px-2 pb-1 pt-3 [&\x5fbutton[\x61ria-haspopup]]:\x77-full"
                      }
                    >
                      <div className="flex min-w-0 items-start justify-between gap-2">
                        <div className="min-w-0">
                          <h2
                            className={
                              "truncate text-[13px] font-medium \x74ext-[\x76ar(\x2d-text)]"
                            }
                          >
                            <a
                              className={"\x75nderline-offset-2 \x68over:\x75nderline"}
                              href="/sections/evergrid-about-us-features-02"
                            >
                              About Us — Features 02
                            </a>
                          </h2>
                          <p
                            className={
                              "mt-0.5 truncate text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"
                            }
                          >
                            Template section · From Evergrid
                          </p>
                        </div>
                        <a
                          className={
                            "-mr-1 shrink-0 rounded-full px-2 py-1 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)] transition-colors \x68over:\x62g-black/[\x30.\x304] \x68over:\x74ext-[\x76ar(\x2d-text)]"
                          }
                          href="/sections/evergrid-about-us-features-02"
                        >
                          Details
                        </a>
                      </div>
                      <div className={"mt-auto [&>\x64iv]:\x77-full"}>
                        <div className="relative shrink-0">
                          <button
                            className={
                              "flex h-9 items-center gap-2 rounded-full \x62g-gradient-to-b \x66rom-white \x74o-[#\x663f3f2] pl-1 pr-3 text-[12px] font-medium \x74ext-[\x76ar(\x2d-text)] \x73hadow-[\x76ar(\x2d-shadow-raised)] transition-[transform,filter,box-shadow] duration-150 \x68over:\x2dtranslate-y-0.\x35 \x68over:\x73hadow-[\x30_5px_14px_rgba(\x30,\x30,\x30,\x30.\x312)] \x61ctive:\x74ranslate-y-px \x61ctive:\x73cale-[\x30.\x397] \x66ocus-visible:\x6futline-2 \x66ocus-visible:\x6futline-offset-2 \x66ocus-visible:\x6futline-[\x76ar(\x2d-accent)] \x6dotion-reduce:\x74ransform-none"
                            }
                            type="button"
                            aria-label="Copy Section options"
                            aria-haspopup="menu"
                            aria-expanded="false"
                          >
                            <span
                              className={
                                "flex h-7 w-7 shrink-0 items-center justify-center rounded-full \x62g-[#\x37a5be8] text-white"
                              }
                            >
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                aria-hidden="true"
                              >
                                <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18" />
                              </svg>
                            </span>
                            <span className="flex-1 whitespace-nowrap text-left">Copy Section</span>
                            <span
                              className={
                                "rounded-full \x62g-[#\x657f5e1] px-1.5 py-px text-[9.5px] font-semibold uppercase tracking-wide \x74ext-[#\x31f5a33]"
                              }
                            >
                              Free
                            </span>
                            <svg
                              className={
                                "ml-0.5 \x74ext-[\x76ar(\x2d-text-secondary)] transition-transform \x2drotate-90"
                              }
                              width="13"
                              height="13"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              aria-hidden="true"
                            >
                              <path d="m6 9 6 6 6-6" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>
                  <article
                    className={
                      "relative flex flex-col \x68as-[[\x61ria-expanded=\x74rue]]:\x7a-30 rounded-[20px] \x62order \x62order-[\x76ar(\x2d-line)] bg-white p-2 \x73hadow-[\x76ar(\x2d-shadow-raised)]"
                    }
                    style={
                      {
                        viewTransitionName: "sec-evergrid-product-how-it-works-01",
                        viewTransitionClass: "sec-card",
                      } as CSSProperties
                    }
                    id="evergrid-product-how-it-works-01"
                  >
                    <button
                      className={
                        "group relative block aspect-[16/10] w-full overflow-hidden rounded-[12px] \x62g-[\x76ar(\x2d-surface-sunken)] text-left"
                      }
                      type="button"
                      aria-label="Preview Product — How It Works 01"
                    >
                      <img
                        className={
                          "object-cover \x6fbject-top transition-transform duration-300 \x67roup-hover:\x73cale-[\x31.\x3025]"
                        }
                        style={{
                          position: "absolute",
                          height: "100%",
                          width: "100%",
                          inset: "0px",
                          color: "transparent",
                        }}
                        alt="Product — How It Works 01 section preview"
                        loading="lazy"
                        decoding="async"
                        src="/site-assets/2d0afe4a204ffcc2.webp"
                      />
                      <span
                        className={
                          "absolute bottom-2 right-2 rounded-full \x62g-white/\x395 px-3 py-1.5 text-[11px] font-medium \x74ext-[\x76ar(\x2d-text)] \x73hadow-[\x76ar(\x2d-shadow-raised)]"
                        }
                      >
                        Preview
                      </span>
                    </button>
                    <div
                      className={
                        "flex flex-1 flex-col gap-3 px-2 pb-1 pt-3 [&\x5fbutton[\x61ria-haspopup]]:\x77-full"
                      }
                    >
                      <div className="flex min-w-0 items-start justify-between gap-2">
                        <div className="min-w-0">
                          <h2
                            className={
                              "truncate text-[13px] font-medium \x74ext-[\x76ar(\x2d-text)]"
                            }
                          >
                            <a
                              className={"\x75nderline-offset-2 \x68over:\x75nderline"}
                              href="/sections/evergrid-product-how-it-works-01"
                            >
                              Product — How It Works 01
                            </a>
                          </h2>
                          <p
                            className={
                              "mt-0.5 truncate text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"
                            }
                          >
                            Template section · From Evergrid
                          </p>
                        </div>
                        <a
                          className={
                            "-mr-1 shrink-0 rounded-full px-2 py-1 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)] transition-colors \x68over:\x62g-black/[\x30.\x304] \x68over:\x74ext-[\x76ar(\x2d-text)]"
                          }
                          href="/sections/evergrid-product-how-it-works-01"
                        >
                          Details
                        </a>
                      </div>
                      <div className={"mt-auto [&>\x64iv]:\x77-full"}>
                        <div className="relative shrink-0">
                          <button
                            className={
                              "flex h-9 items-center gap-2 rounded-full \x62g-gradient-to-b \x66rom-white \x74o-[#\x663f3f2] pl-1 pr-3 text-[12px] font-medium \x74ext-[\x76ar(\x2d-text)] \x73hadow-[\x76ar(\x2d-shadow-raised)] transition-[transform,filter,box-shadow] duration-150 \x68over:\x2dtranslate-y-0.\x35 \x68over:\x73hadow-[\x30_5px_14px_rgba(\x30,\x30,\x30,\x30.\x312)] \x61ctive:\x74ranslate-y-px \x61ctive:\x73cale-[\x30.\x397] \x66ocus-visible:\x6futline-2 \x66ocus-visible:\x6futline-offset-2 \x66ocus-visible:\x6futline-[\x76ar(\x2d-accent)] \x6dotion-reduce:\x74ransform-none"
                            }
                            type="button"
                            aria-label="Copy Section options"
                            aria-haspopup="menu"
                            aria-expanded="false"
                          >
                            <span
                              className={
                                "flex h-7 w-7 shrink-0 items-center justify-center rounded-full \x62g-[#\x37a5be8] text-white"
                              }
                            >
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                aria-hidden="true"
                              >
                                <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18" />
                              </svg>
                            </span>
                            <span className="flex-1 whitespace-nowrap text-left">Copy Section</span>
                            <span
                              className={
                                "rounded-full \x62g-[#\x657f5e1] px-1.5 py-px text-[9.5px] font-semibold uppercase tracking-wide \x74ext-[#\x31f5a33]"
                              }
                            >
                              Free
                            </span>
                            <svg
                              className={
                                "ml-0.5 \x74ext-[\x76ar(\x2d-text-secondary)] transition-transform \x2drotate-90"
                              }
                              width="13"
                              height="13"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              aria-hidden="true"
                            >
                              <path d="m6 9 6 6 6-6" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>
                  <article
                    className={
                      "relative flex flex-col \x68as-[[\x61ria-expanded=\x74rue]]:\x7a-30 rounded-[20px] \x62order \x62order-[\x76ar(\x2d-line)] bg-white p-2 \x73hadow-[\x76ar(\x2d-shadow-raised)]"
                    }
                    style={
                      {
                        viewTransitionName: "sec-prompt-atlas",
                        viewTransitionClass: "sec-card",
                      } as CSSProperties
                    }
                    id="prompt-atlas"
                  >
                    <button
                      className={
                        "group relative block aspect-[16/10] w-full overflow-hidden rounded-[12px] \x62g-[\x76ar(\x2d-surface-sunken)] text-left"
                      }
                      type="button"
                      aria-label="Preview Atlas"
                    >
                      <img
                        className={
                          "object-cover \x6fbject-top transition-transform duration-300 \x67roup-hover:\x73cale-[\x31.\x3025]"
                        }
                        style={{
                          position: "absolute",
                          height: "100%",
                          width: "100%",
                          inset: "0px",
                          color: "transparent",
                        }}
                        alt="Atlas section preview"
                        loading="lazy"
                        decoding="async"
                        src="/site-assets/6a51baf4839bcc32.webp"
                      />
                      <span
                        className={
                          "absolute left-2 top-2 inline-flex items-center gap-1 rounded-full \x62g-[#\x3111]/\x390 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide \x74ext-[#\x665d98a] \x73hadow-[\x76ar(\x2d-shadow-raised)] \x62ackdrop-blur"
                        }
                      >
                        ✦ Pro
                      </span>
                      <span
                        className={
                          "absolute bottom-2 right-2 rounded-full \x62g-white/\x395 px-3 py-1.5 text-[11px] font-medium \x74ext-[\x76ar(\x2d-text)] \x73hadow-[\x76ar(\x2d-shadow-raised)]"
                        }
                      >
                        Preview
                      </span>
                    </button>
                    <div
                      className={
                        "flex flex-1 flex-col gap-3 px-2 pb-1 pt-3 [&\x5fbutton[\x61ria-haspopup]]:\x77-full"
                      }
                    >
                      <div className="flex min-w-0 items-start justify-between gap-2">
                        <div className="min-w-0">
                          <h2
                            className={
                              "truncate text-[13px] font-medium \x74ext-[\x76ar(\x2d-text)]"
                            }
                          >
                            <a
                              className={"\x75nderline-offset-2 \x68over:\x75nderline"}
                              href="/sections/prompt-atlas"
                            >
                              Atlas
                            </a>
                          </h2>
                          <p
                            className={
                              "mt-0.5 truncate text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"
                            }
                          >
                            Hero section · Studio Original
                          </p>
                        </div>
                        <a
                          className={
                            "-mr-1 shrink-0 rounded-full px-2 py-1 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)] transition-colors \x68over:\x62g-black/[\x30.\x304] \x68over:\x74ext-[\x76ar(\x2d-text)]"
                          }
                          href="/sections/prompt-atlas"
                        >
                          Details
                        </a>
                      </div>
                      <div className={"mt-auto [&>\x64iv]:\x77-full"}>
                        <a
                          className="os-btn-dark os-spark h-10 justify-center w-full"
                          href="/pricing?plan=sections"
                        >
                          <svg
                            width="13"
                            height="13"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                          >
                            <rect x="4" y="10" width="16" height="10" rx="1" />
                            <path d="M8 10V7a4 4 0 0 1 8 0v3" />
                          </svg>{" "}
                          Unlock with Pro
                        </a>
                      </div>
                    </div>
                  </article>
                  <article
                    className={
                      "relative flex flex-col \x68as-[[\x61ria-expanded=\x74rue]]:\x7a-30 rounded-[20px] \x62order \x62order-[\x76ar(\x2d-line)] bg-white p-2 \x73hadow-[\x76ar(\x2d-shadow-raised)]"
                    }
                    style={
                      {
                        viewTransitionName: "sec-evergrid-home-navigation-01",
                        viewTransitionClass: "sec-card",
                      } as CSSProperties
                    }
                    id="evergrid-home-navigation-01"
                  >
                    <button
                      className={
                        "group relative block aspect-[16/10] w-full overflow-hidden rounded-[12px] \x62g-[\x76ar(\x2d-surface-sunken)] text-left"
                      }
                      type="button"
                      aria-label="Preview Home — Navigation 01"
                    >
                      <img
                        className={
                          "object-cover \x6fbject-top transition-transform duration-300 \x67roup-hover:\x73cale-[\x31.\x3025]"
                        }
                        style={{
                          position: "absolute",
                          height: "100%",
                          width: "100%",
                          inset: "0px",
                          color: "transparent",
                        }}
                        alt="Home — Navigation 01 section preview"
                        loading="lazy"
                        decoding="async"
                        src="/site-assets/5327319a22305984.webp"
                      />
                      <span
                        className={
                          "absolute bottom-2 right-2 rounded-full \x62g-white/\x395 px-3 py-1.5 text-[11px] font-medium \x74ext-[\x76ar(\x2d-text)] \x73hadow-[\x76ar(\x2d-shadow-raised)]"
                        }
                      >
                        Preview
                      </span>
                    </button>
                    <div
                      className={
                        "flex flex-1 flex-col gap-3 px-2 pb-1 pt-3 [&\x5fbutton[\x61ria-haspopup]]:\x77-full"
                      }
                    >
                      <div className="flex min-w-0 items-start justify-between gap-2">
                        <div className="min-w-0">
                          <h2
                            className={
                              "truncate text-[13px] font-medium \x74ext-[\x76ar(\x2d-text)]"
                            }
                          >
                            <a
                              className={"\x75nderline-offset-2 \x68over:\x75nderline"}
                              href="/sections/evergrid-home-navigation-01"
                            >
                              Home — Navigation 01
                            </a>
                          </h2>
                          <p
                            className={
                              "mt-0.5 truncate text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"
                            }
                          >
                            Template section · From Evergrid
                          </p>
                        </div>
                        <a
                          className={
                            "-mr-1 shrink-0 rounded-full px-2 py-1 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)] transition-colors \x68over:\x62g-black/[\x30.\x304] \x68over:\x74ext-[\x76ar(\x2d-text)]"
                          }
                          href="/sections/evergrid-home-navigation-01"
                        >
                          Details
                        </a>
                      </div>
                      <div className={"mt-auto [&>\x64iv]:\x77-full"}>
                        <div className="relative shrink-0">
                          <button
                            className={
                              "flex h-9 items-center gap-2 rounded-full \x62g-gradient-to-b \x66rom-white \x74o-[#\x663f3f2] pl-1 pr-3 text-[12px] font-medium \x74ext-[\x76ar(\x2d-text)] \x73hadow-[\x76ar(\x2d-shadow-raised)] transition-[transform,filter,box-shadow] duration-150 \x68over:\x2dtranslate-y-0.\x35 \x68over:\x73hadow-[\x30_5px_14px_rgba(\x30,\x30,\x30,\x30.\x312)] \x61ctive:\x74ranslate-y-px \x61ctive:\x73cale-[\x30.\x397] \x66ocus-visible:\x6futline-2 \x66ocus-visible:\x6futline-offset-2 \x66ocus-visible:\x6futline-[\x76ar(\x2d-accent)] \x6dotion-reduce:\x74ransform-none"
                            }
                            type="button"
                            aria-label="Copy Section options"
                            aria-haspopup="menu"
                            aria-expanded="false"
                          >
                            <span
                              className={
                                "flex h-7 w-7 shrink-0 items-center justify-center rounded-full \x62g-[#\x37a5be8] text-white"
                              }
                            >
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                aria-hidden="true"
                              >
                                <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18" />
                              </svg>
                            </span>
                            <span className="flex-1 whitespace-nowrap text-left">Copy Section</span>
                            <span
                              className={
                                "rounded-full \x62g-[#\x657f5e1] px-1.5 py-px text-[9.5px] font-semibold uppercase tracking-wide \x74ext-[#\x31f5a33]"
                              }
                            >
                              Free
                            </span>
                            <svg
                              className={
                                "ml-0.5 \x74ext-[\x76ar(\x2d-text-secondary)] transition-transform \x2drotate-90"
                              }
                              width="13"
                              height="13"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              aria-hidden="true"
                            >
                              <path d="m6 9 6 6 6-6" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>
                  <article
                    className={
                      "relative flex flex-col \x68as-[[\x61ria-expanded=\x74rue]]:\x7a-30 rounded-[20px] \x62order \x62order-[\x76ar(\x2d-line)] bg-white p-2 \x73hadow-[\x76ar(\x2d-shadow-raised)]"
                    }
                    style={
                      {
                        viewTransitionName: "sec-evergrid-product-features-01",
                        viewTransitionClass: "sec-card",
                      } as CSSProperties
                    }
                    id="evergrid-product-features-01"
                  >
                    <button
                      className={
                        "group relative block aspect-[16/10] w-full overflow-hidden rounded-[12px] \x62g-[\x76ar(\x2d-surface-sunken)] text-left"
                      }
                      type="button"
                      aria-label="Preview Product — Features 01"
                    >
                      <img
                        className={
                          "object-cover \x6fbject-top transition-transform duration-300 \x67roup-hover:\x73cale-[\x31.\x3025]"
                        }
                        style={{
                          position: "absolute",
                          height: "100%",
                          width: "100%",
                          inset: "0px",
                          color: "transparent",
                        }}
                        alt="Product — Features 01 section preview"
                        loading="lazy"
                        decoding="async"
                        src="/site-assets/7a477d3ecd5202c1.webp"
                      />
                      <span
                        className={
                          "absolute bottom-2 right-2 rounded-full \x62g-white/\x395 px-3 py-1.5 text-[11px] font-medium \x74ext-[\x76ar(\x2d-text)] \x73hadow-[\x76ar(\x2d-shadow-raised)]"
                        }
                      >
                        Preview
                      </span>
                    </button>
                    <div
                      className={
                        "flex flex-1 flex-col gap-3 px-2 pb-1 pt-3 [&\x5fbutton[\x61ria-haspopup]]:\x77-full"
                      }
                    >
                      <div className="flex min-w-0 items-start justify-between gap-2">
                        <div className="min-w-0">
                          <h2
                            className={
                              "truncate text-[13px] font-medium \x74ext-[\x76ar(\x2d-text)]"
                            }
                          >
                            <a
                              className={"\x75nderline-offset-2 \x68over:\x75nderline"}
                              href="/sections/evergrid-product-features-01"
                            >
                              Product — Features 01
                            </a>
                          </h2>
                          <p
                            className={
                              "mt-0.5 truncate text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"
                            }
                          >
                            Template section · From Evergrid
                          </p>
                        </div>
                        <a
                          className={
                            "-mr-1 shrink-0 rounded-full px-2 py-1 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)] transition-colors \x68over:\x62g-black/[\x30.\x304] \x68over:\x74ext-[\x76ar(\x2d-text)]"
                          }
                          href="/sections/evergrid-product-features-01"
                        >
                          Details
                        </a>
                      </div>
                      <div className={"mt-auto [&>\x64iv]:\x77-full"}>
                        <div className="relative shrink-0">
                          <button
                            className={
                              "flex h-9 items-center gap-2 rounded-full \x62g-gradient-to-b \x66rom-white \x74o-[#\x663f3f2] pl-1 pr-3 text-[12px] font-medium \x74ext-[\x76ar(\x2d-text)] \x73hadow-[\x76ar(\x2d-shadow-raised)] transition-[transform,filter,box-shadow] duration-150 \x68over:\x2dtranslate-y-0.\x35 \x68over:\x73hadow-[\x30_5px_14px_rgba(\x30,\x30,\x30,\x30.\x312)] \x61ctive:\x74ranslate-y-px \x61ctive:\x73cale-[\x30.\x397] \x66ocus-visible:\x6futline-2 \x66ocus-visible:\x6futline-offset-2 \x66ocus-visible:\x6futline-[\x76ar(\x2d-accent)] \x6dotion-reduce:\x74ransform-none"
                            }
                            type="button"
                            aria-label="Copy Section options"
                            aria-haspopup="menu"
                            aria-expanded="false"
                          >
                            <span
                              className={
                                "flex h-7 w-7 shrink-0 items-center justify-center rounded-full \x62g-[#\x37a5be8] text-white"
                              }
                            >
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                aria-hidden="true"
                              >
                                <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18" />
                              </svg>
                            </span>
                            <span className="flex-1 whitespace-nowrap text-left">Copy Section</span>
                            <span
                              className={
                                "rounded-full \x62g-[#\x657f5e1] px-1.5 py-px text-[9.5px] font-semibold uppercase tracking-wide \x74ext-[#\x31f5a33]"
                              }
                            >
                              Free
                            </span>
                            <svg
                              className={
                                "ml-0.5 \x74ext-[\x76ar(\x2d-text-secondary)] transition-transform \x2drotate-90"
                              }
                              width="13"
                              height="13"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              aria-hidden="true"
                            >
                              <path d="m6 9 6 6 6-6" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>
                  <article
                    className={
                      "relative flex flex-col \x68as-[[\x61ria-expanded=\x74rue]]:\x7a-30 rounded-[20px] \x62order \x62order-[\x76ar(\x2d-line)] bg-white p-2 \x73hadow-[\x76ar(\x2d-shadow-raised)]"
                    }
                    style={
                      {
                        viewTransitionName: "sec-404-crt",
                        viewTransitionClass: "sec-card",
                      } as CSSProperties
                    }
                    id="404-crt"
                  >
                    <button
                      className={
                        "group relative block aspect-[16/10] w-full overflow-hidden rounded-[12px] \x62g-[\x76ar(\x2d-surface-sunken)] text-left"
                      }
                      type="button"
                      aria-label="Preview 404 CRT"
                    >
                      <img
                        className={
                          "object-cover \x6fbject-top transition-transform duration-300 \x67roup-hover:\x73cale-[\x31.\x3025]"
                        }
                        style={{
                          position: "absolute",
                          height: "100%",
                          width: "100%",
                          inset: "0px",
                          color: "transparent",
                        }}
                        alt="404 CRT section preview"
                        loading="lazy"
                        decoding="async"
                        src="/site-assets/95b0bc28f416bb6f.webp"
                      />
                      <span
                        className={
                          "absolute left-2 top-2 inline-flex items-center gap-1 rounded-full \x62g-[#\x3111]/\x390 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide \x74ext-[#\x665d98a] \x73hadow-[\x76ar(\x2d-shadow-raised)] \x62ackdrop-blur"
                        }
                      >
                        ✦ Pro
                      </span>
                      <span
                        className={
                          "absolute bottom-2 right-2 rounded-full \x62g-white/\x395 px-3 py-1.5 text-[11px] font-medium \x74ext-[\x76ar(\x2d-text)] \x73hadow-[\x76ar(\x2d-shadow-raised)]"
                        }
                      >
                        Preview
                      </span>
                    </button>
                    <div
                      className={
                        "flex flex-1 flex-col gap-3 px-2 pb-1 pt-3 [&\x5fbutton[\x61ria-haspopup]]:\x77-full"
                      }
                    >
                      <div className="flex min-w-0 items-start justify-between gap-2">
                        <div className="min-w-0">
                          <h2
                            className={
                              "truncate text-[13px] font-medium \x74ext-[\x76ar(\x2d-text)]"
                            }
                          >
                            <a
                              className={"\x75nderline-offset-2 \x68over:\x75nderline"}
                              href="/sections/404-crt"
                            >
                              404 CRT
                            </a>
                          </h2>
                          <p
                            className={
                              "mt-0.5 truncate text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"
                            }
                          >
                            404 page · Studio Original
                          </p>
                        </div>
                        <a
                          className={
                            "-mr-1 shrink-0 rounded-full px-2 py-1 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)] transition-colors \x68over:\x62g-black/[\x30.\x304] \x68over:\x74ext-[\x76ar(\x2d-text)]"
                          }
                          href="/sections/404-crt"
                        >
                          Details
                        </a>
                      </div>
                      <div className={"mt-auto [&>\x64iv]:\x77-full"}>
                        <a
                          className="os-btn-dark os-spark h-10 justify-center w-full"
                          href="/pricing?plan=sections"
                        >
                          <svg
                            width="13"
                            height="13"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                          >
                            <rect x="4" y="10" width="16" height="10" rx="1" />
                            <path d="M8 10V7a4 4 0 0 1 8 0v3" />
                          </svg>{" "}
                          Unlock with Pro
                        </a>
                      </div>
                    </div>
                  </article>
                  <article
                    className={
                      "relative flex flex-col \x68as-[[\x61ria-expanded=\x74rue]]:\x7a-30 rounded-[20px] \x62order \x62order-[\x76ar(\x2d-line)] bg-white p-2 \x73hadow-[\x76ar(\x2d-shadow-raised)]"
                    }
                    style={
                      {
                        viewTransitionName: "sec-evergrid-home-faq-01",
                        viewTransitionClass: "sec-card",
                      } as CSSProperties
                    }
                    id="evergrid-home-faq-01"
                  >
                    <button
                      className={
                        "group relative block aspect-[16/10] w-full overflow-hidden rounded-[12px] \x62g-[\x76ar(\x2d-surface-sunken)] text-left"
                      }
                      type="button"
                      aria-label="Preview Home — FAQ 01"
                    >
                      <img
                        className={
                          "object-cover \x6fbject-top transition-transform duration-300 \x67roup-hover:\x73cale-[\x31.\x3025]"
                        }
                        style={{
                          position: "absolute",
                          height: "100%",
                          width: "100%",
                          inset: "0px",
                          color: "transparent",
                        }}
                        alt="Home — FAQ 01 section preview"
                        loading="lazy"
                        decoding="async"
                        src="/site-assets/1edbbc8f915bff70.webp"
                      />
                      <span
                        className={
                          "absolute bottom-2 right-2 rounded-full \x62g-white/\x395 px-3 py-1.5 text-[11px] font-medium \x74ext-[\x76ar(\x2d-text)] \x73hadow-[\x76ar(\x2d-shadow-raised)]"
                        }
                      >
                        Preview
                      </span>
                    </button>
                    <div
                      className={
                        "flex flex-1 flex-col gap-3 px-2 pb-1 pt-3 [&\x5fbutton[\x61ria-haspopup]]:\x77-full"
                      }
                    >
                      <div className="flex min-w-0 items-start justify-between gap-2">
                        <div className="min-w-0">
                          <h2
                            className={
                              "truncate text-[13px] font-medium \x74ext-[\x76ar(\x2d-text)]"
                            }
                          >
                            <a
                              className={"\x75nderline-offset-2 \x68over:\x75nderline"}
                              href="/sections/evergrid-home-faq-01"
                            >
                              Home — FAQ 01
                            </a>
                          </h2>
                          <p
                            className={
                              "mt-0.5 truncate text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"
                            }
                          >
                            Template section · From Evergrid
                          </p>
                        </div>
                        <a
                          className={
                            "-mr-1 shrink-0 rounded-full px-2 py-1 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)] transition-colors \x68over:\x62g-black/[\x30.\x304] \x68over:\x74ext-[\x76ar(\x2d-text)]"
                          }
                          href="/sections/evergrid-home-faq-01"
                        >
                          Details
                        </a>
                      </div>
                      <div className={"mt-auto [&>\x64iv]:\x77-full"}>
                        <div className="relative shrink-0">
                          <button
                            className={
                              "flex h-9 items-center gap-2 rounded-full \x62g-gradient-to-b \x66rom-white \x74o-[#\x663f3f2] pl-1 pr-3 text-[12px] font-medium \x74ext-[\x76ar(\x2d-text)] \x73hadow-[\x76ar(\x2d-shadow-raised)] transition-[transform,filter,box-shadow] duration-150 \x68over:\x2dtranslate-y-0.\x35 \x68over:\x73hadow-[\x30_5px_14px_rgba(\x30,\x30,\x30,\x30.\x312)] \x61ctive:\x74ranslate-y-px \x61ctive:\x73cale-[\x30.\x397] \x66ocus-visible:\x6futline-2 \x66ocus-visible:\x6futline-offset-2 \x66ocus-visible:\x6futline-[\x76ar(\x2d-accent)] \x6dotion-reduce:\x74ransform-none"
                            }
                            type="button"
                            aria-label="Copy Section options"
                            aria-haspopup="menu"
                            aria-expanded="false"
                          >
                            <span
                              className={
                                "flex h-7 w-7 shrink-0 items-center justify-center rounded-full \x62g-[#\x37a5be8] text-white"
                              }
                            >
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                aria-hidden="true"
                              >
                                <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18" />
                              </svg>
                            </span>
                            <span className="flex-1 whitespace-nowrap text-left">Copy Section</span>
                            <span
                              className={
                                "rounded-full \x62g-[#\x657f5e1] px-1.5 py-px text-[9.5px] font-semibold uppercase tracking-wide \x74ext-[#\x31f5a33]"
                              }
                            >
                              Free
                            </span>
                            <svg
                              className={
                                "ml-0.5 \x74ext-[\x76ar(\x2d-text-secondary)] transition-transform \x2drotate-90"
                              }
                              width="13"
                              height="13"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              aria-hidden="true"
                            >
                              <path d="m6 9 6 6 6-6" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>
                </div>
              </div>
              <div className="mt-10 flex justify-center">
                <a className="os-btn-white" href="/?collection=all">
                  Browse templates
                </a>
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
                  "relative flex h-12 flex-col items-center justify-center gap-0.5 rounded-full text-[10px] font-medium transition-[background,color] duration-150 \x62g-gradient-to-b \x66rom-white \x74o-[#\x663f3f2] \x74ext-[\x76ar(\x2d-text)] \x73hadow-[\x76ar(\x2d-shadow-raised)]"
                }
                aria-current="page"
                href="#"
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
                "group mx-2 flex items-center gap-2.5 rounded-[12px] px-2.5 py-[7px] text-[13px] transition-[background-color,color,box-shadow] duration-150 \x62g-gradient-to-b \x66rom-white \x74o-[#\x667f7f6] font-medium \x74ext-[\x76ar(\x2d-text)] \x73hadow-[\x76ar(\x2d-shadow-raised)]"
              }
              aria-current="page"
              href="#"
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

function ImportedSectionOneSectionCanCarrythe() {
  return (
    <section className="mx-auto max-w-4xl text-center">
      <p className={"os-chip mx-auto text-[12px] \x74ext-[\x76ar(\x2d-text-secondary)]"}>
        <span className="os-dot" />
        <span>
          <strong className={"font-semibold \x74ext-[\x76ar(\x2d-text)] tabular-nums"}>58</strong>{" "}
          sections · <span className="tabular-nums">38</span> free to copy
        </span>
      </p>
      <h1
        className={
          "mx-auto mt-5 whitespace-nowrap \x66ont-[\x66amily-name:\x76ar(\x2d-font-heading)] text-[clamp(22px,7.6vw,34px)] font-medium leading-[1.12] tracking-[-0.035em] \x74ext-[\x76ar(\x2d-text)] \x73m:\x74ext-[\x63lamp(\x334px,\x34.\x34vw,\x354px)]"
        }
      >
        <span>
          One section{" "}
          <span
            className={
              "vid-key relative -top-[0.04em] mx-[0.06em] inline-block h-[0.9em] w-[1.44em] \x2drotate-[\x35deg] overflow-hidden rounded-[0.2em] \x61lign-[\x2d0.\x306em]"
            }
            aria-hidden="true"
            data-site-import-desktop-variant=""
          >
            <span className="vid-flip absolute inset-[0.06em] overflow-hidden rounded-[0.15em]">
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
                src="/site-assets/8ee5e17c64c47fad.webp"
              />
            </span>
          </span>
          <span
            className={
              "vid-key relative -top-[0.04em] mx-[0.06em] inline-block h-[0.9em] w-[1.44em] \x2drotate-[\x35deg] overflow-hidden rounded-[0.2em] \x61lign-[\x2d0.\x306em]"
            }
            style={{ "--site-import-responsive-display": "inline-block" } as CSSProperties}
            aria-hidden="true"
            data-site-import-mobile-variant=""
          >
            <span className="vid-flip absolute inset-[0.06em] overflow-hidden rounded-[0.15em]">
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
                src="/site-assets/1db11d66a9a3b89c.webp"
              />
            </span>
          </span>{" "}
          can carry
        </span>
        <br />
        <span className={"\x74ext-[\x76ar(\x2d-text-tertiary)]"}>the whole page.</span>
      </h1>
      <p
        className={
          "mx-auto mt-4 whitespace-nowrap text-[clamp(11px,3.2vw,13.5px)] leading-relaxed \x74ext-[\x76ar(\x2d-text-secondary)] sm:mt-5 \x73m:\x74ext-[\x315.\x35px]"
        }
      >
        <span className="block">Heroes, portfolios, scroll stories and 404 pages.</span>
        <span className="block">Preview them live, then copy the prompt into your project.</span>
      </p>
      <div
        className={
          "mt-6 flex flex-col items-stretch justify-center gap-3 sm:mt-7 \x73m:\x66lex-row \x73m:\x69tems-center"
        }
      >
        <a
          className={
            "os-button relative inline-flex select-none items-center justify-center gap-2 rounded-full font-medium transition-[transform,box-shadow,filter,background-color] duration-150 ease-out \x64isabled:\x63ursor-not-allowed disabled:opacity-45 h-12 px-6 text-[14px] os-spark text-white w-full sm:w-auto"
          }
          style={
            {
              backgroundImage:
                "linear-gradient(rgb(46, 46, 46) 0%, rgb(26, 26, 26) 50%, rgb(14, 14, 14) 100%)",
              boxShadow:
                "rgba(255, 255, 255, 0.14) 0px 1px 0px inset, rgba(0, 0, 0, 0.5) 0px -1px 0px inset, rgba(0, 0, 0, 0.22) 0px 1px 2px, rgba(0, 0, 0, 0.5) 0px 10px 22px -10px, rgba(255, 82, 6, 0.55) 0px 8px 18px -12px",
            } as CSSProperties
          }
          href="/pricing?plan=sections"
        >
          Unlock all Pro sections · $15/mo
        </a>
        <a
          className={
            "group inline-flex h-12 w-full items-center justify-center gap-2.5 rounded-full bg-white pl-2 pr-5 text-[14px] font-semibold \x74ext-[\x76ar(\x2d-text)] \x73hadow-[\x30_0_0_1px_rgba(\x331,\x3157,\x385,\x30.\x335),\x30_6px_18px_-10px_rgba(\x331,\x3157,\x385,\x30.\x35)] transition-transform \x68over:\x2dtranslate-y-px sm:w-auto"
          }
          href="?price=free#library"
        >
          <span
            className={
              "rounded-full \x62g-[#\x31f9d55] px-2.5 py-1 text-[10.5px] font-bold uppercase tracking-wide text-white"
            }
          >
            Free
          </span>
          Browse 38 free sections
          <svg
            className={"transition-transform \x67roup-hover:\x74ranslate-x-0.\x35"}
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
      </div>
      <p
        className={
          "mx-auto mt-4 text-[11.5px] leading-relaxed \x74ext-[\x76ar(\x2d-text-tertiary)]"
        }
      >
        Pro sections come with the Sections plan · cancel anytime. Free sections only need an
        account.
      </p>
      <ul className="mt-6 flex items-center justify-center gap-4 sm:gap-5" aria-label="Works with">
        <li title="Claude Code">
          <img
            className="h-[18px] w-[18px] object-contain opacity-80"
            src="/site-assets/4df6f08245fb1868-5a19e14c570fcde745ab2532dc89a9e8.png"
            alt="Claude Code"
          />
        </li>
        <li title="Cursor">
          <img
            className="h-[18px] w-[18px] object-contain opacity-80"
            src="/site-assets/1988d9997975a92a-49ebbaad505f220ef8e4b9a616cb6435.png"
            alt="Cursor"
          />
        </li>
        <li title="v0">
          <img
            className="h-[18px] w-[18px] object-contain opacity-80"
            src="/site-assets/2a056fe515c35408-5ae9202f6b3df6563b0d0d89be27f00a.png"
            alt="v0"
          />
        </li>
        <li title="Windsurf">
          <img
            className="h-[18px] w-[18px] object-contain opacity-80"
            src="/site-assets/f991b3ed9d623f14-d08b3edb0e9aac48cc21ede08c9bc8b9.png"
            alt="Windsurf"
          />
        </li>
        <li title="Lovable">
          <img
            className="h-[18px] w-[18px] object-contain opacity-80"
            src="/site-assets/ae691e4b52122494-14e29e39e1cb77a54af42896b9e1a8b3.png"
            alt="Lovable"
          />
        </li>
        <li title="Bolt">
          <img
            className="h-[18px] w-[18px] object-contain opacity-80"
            src="/site-assets/9e7c5dcffc2bada5-0a117f6ebf8d64db0cccb3cbba727dac.png"
            alt="Bolt"
          />
        </li>
      </ul>
    </section>
  );
}

function ImportedArticleJewelcase() {
  return (
    <article
      className={
        "relative flex flex-col \x68as-[[\x61ria-expanded=\x74rue]]:\x7a-30 rounded-[20px] \x62order \x62order-[\x76ar(\x2d-line)] bg-white p-2 \x73hadow-[\x76ar(\x2d-shadow-raised)]"
      }
      style={
        {
          viewTransitionName: "sec-portfolio-jewelcase",
          viewTransitionClass: "sec-card",
        } as CSSProperties
      }
      id="portfolio-jewelcase"
    >
      <button
        className={
          "group relative block aspect-[16/10] w-full overflow-hidden rounded-[12px] \x62g-[\x76ar(\x2d-surface-sunken)] text-left"
        }
        type="button"
        aria-label="Preview Jewelcase"
      >
        <img
          className={
            "object-cover \x6fbject-top transition-transform duration-300 \x67roup-hover:\x73cale-[\x31.\x3025]"
          }
          style={{
            position: "absolute",
            height: "100%",
            width: "100%",
            inset: "0px",
            color: "transparent",
          }}
          alt="Jewelcase section preview"
          loading="lazy"
          decoding="async"
          src="/site-assets/7a4a567962749912.webp"
        />
        <span
          className={
            "absolute left-2 top-2 inline-flex items-center gap-1 rounded-full \x62g-[#\x3111]/\x390 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide \x74ext-[#\x665d98a] \x73hadow-[\x76ar(\x2d-shadow-raised)] \x62ackdrop-blur"
          }
        >
          ✦ Pro
        </span>
        <span
          className={
            "absolute bottom-2 right-2 rounded-full \x62g-white/\x395 px-3 py-1.5 text-[11px] font-medium \x74ext-[\x76ar(\x2d-text)] \x73hadow-[\x76ar(\x2d-shadow-raised)]"
          }
        >
          Preview
        </span>
      </button>
      <div
        className={
          "flex flex-1 flex-col gap-3 px-2 pb-1 pt-3 [&\x5fbutton[\x61ria-haspopup]]:\x77-full"
        }
      >
        <div className="flex min-w-0 items-start justify-between gap-2">
          <div className="min-w-0">
            <h2 className={"truncate text-[13px] font-medium \x74ext-[\x76ar(\x2d-text)]"}>
              <a
                className={"\x75nderline-offset-2 \x68over:\x75nderline"}
                href="/sections/portfolio-jewelcase"
              >
                Jewelcase
              </a>
            </h2>
            <p className={"mt-0.5 truncate text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
              Portfolio hero · Studio Original
            </p>
          </div>
          <a
            className={
              "-mr-1 shrink-0 rounded-full px-2 py-1 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)] transition-colors \x68over:\x62g-black/[\x30.\x304] \x68over:\x74ext-[\x76ar(\x2d-text)]"
            }
            href="/sections/portfolio-jewelcase"
          >
            Details
          </a>
        </div>
        <div className={"mt-auto [&>\x64iv]:\x77-full"}>
          <a
            className="os-btn-dark os-spark h-10 justify-center w-full"
            href="/pricing?plan=sections"
          >
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect x="4" y="10" width="16" height="10" rx="1" />
              <path d="M8 10V7a4 4 0 0 1 8 0v3" />
            </svg>{" "}
            Unlock with Pro
          </a>
        </div>
      </div>
    </article>
  );
}

function ImportedArticlePanes() {
  return (
    <article
      className={
        "relative flex flex-col \x68as-[[\x61ria-expanded=\x74rue]]:\x7a-30 rounded-[20px] \x62order \x62order-[\x76ar(\x2d-line)] bg-white p-2 \x73hadow-[\x76ar(\x2d-shadow-raised)]"
      }
      style={
        {
          viewTransitionName: "sec-portfolio-panes",
          viewTransitionClass: "sec-card",
        } as CSSProperties
      }
      id="portfolio-panes"
    >
      <button
        className={
          "group relative block aspect-[16/10] w-full overflow-hidden rounded-[12px] \x62g-[\x76ar(\x2d-surface-sunken)] text-left"
        }
        type="button"
        aria-label="Preview Panes"
      >
        <img
          className={
            "object-cover \x6fbject-top transition-transform duration-300 \x67roup-hover:\x73cale-[\x31.\x3025]"
          }
          style={{
            position: "absolute",
            height: "100%",
            width: "100%",
            inset: "0px",
            color: "transparent",
          }}
          alt="Panes section preview"
          loading="lazy"
          decoding="async"
          src="/site-assets/85032072e01d8d59.webp"
        />
        <span
          className={
            "absolute left-2 top-2 inline-flex items-center gap-1 rounded-full \x62g-[#\x3111]/\x390 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide \x74ext-[#\x665d98a] \x73hadow-[\x76ar(\x2d-shadow-raised)] \x62ackdrop-blur"
          }
        >
          ✦ Pro
        </span>
        <span
          className={
            "absolute bottom-2 right-2 rounded-full \x62g-white/\x395 px-3 py-1.5 text-[11px] font-medium \x74ext-[\x76ar(\x2d-text)] \x73hadow-[\x76ar(\x2d-shadow-raised)]"
          }
        >
          Preview
        </span>
      </button>
      <div
        className={
          "flex flex-1 flex-col gap-3 px-2 pb-1 pt-3 [&\x5fbutton[\x61ria-haspopup]]:\x77-full"
        }
      >
        <div className="flex min-w-0 items-start justify-between gap-2">
          <div className="min-w-0">
            <h2 className={"truncate text-[13px] font-medium \x74ext-[\x76ar(\x2d-text)]"}>
              <a
                className={"\x75nderline-offset-2 \x68over:\x75nderline"}
                href="/sections/portfolio-panes"
              >
                Panes
              </a>
            </h2>
            <p className={"mt-0.5 truncate text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
              Portfolio hero · Studio Original
            </p>
          </div>
          <a
            className={
              "-mr-1 shrink-0 rounded-full px-2 py-1 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)] transition-colors \x68over:\x62g-black/[\x30.\x304] \x68over:\x74ext-[\x76ar(\x2d-text)]"
            }
            href="/sections/portfolio-panes"
          >
            Details
          </a>
        </div>
        <div className={"mt-auto [&>\x64iv]:\x77-full"}>
          <a
            className="os-btn-dark os-spark h-10 justify-center w-full"
            href="/pricing?plan=sections"
          >
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect x="4" y="10" width="16" height="10" rx="1" />
              <path d="M8 10V7a4 4 0 0 1 8 0v3" />
            </svg>{" "}
            Unlock with Pro
          </a>
        </div>
      </div>
    </article>
  );
}

function ImportedArticleMeadow() {
  return (
    <article
      className={
        "relative flex flex-col \x68as-[[\x61ria-expanded=\x74rue]]:\x7a-30 rounded-[20px] \x62order \x62order-[\x76ar(\x2d-line)] bg-white p-2 \x73hadow-[\x76ar(\x2d-shadow-raised)]"
      }
      style={
        {
          viewTransitionName: "sec-prompt-meadow",
          viewTransitionClass: "sec-card",
        } as CSSProperties
      }
      id="prompt-meadow"
    >
      <button
        className={
          "group relative block aspect-[16/10] w-full overflow-hidden rounded-[12px] \x62g-[\x76ar(\x2d-surface-sunken)] text-left"
        }
        type="button"
        aria-label="Preview Meadow"
      >
        <img
          className={
            "object-cover \x6fbject-top transition-transform duration-300 \x67roup-hover:\x73cale-[\x31.\x3025]"
          }
          style={{
            position: "absolute",
            height: "100%",
            width: "100%",
            inset: "0px",
            color: "transparent",
          }}
          alt="Meadow section preview"
          loading="lazy"
          decoding="async"
          src="/site-assets/0a8774a472a19fea.webp"
        />
        <span
          className={
            "absolute left-2 top-2 inline-flex items-center gap-1 rounded-full \x62g-[#\x3111]/\x390 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide \x74ext-[#\x665d98a] \x73hadow-[\x76ar(\x2d-shadow-raised)] \x62ackdrop-blur"
          }
        >
          ✦ Pro
        </span>
        <span
          className={
            "absolute bottom-2 right-2 rounded-full \x62g-white/\x395 px-3 py-1.5 text-[11px] font-medium \x74ext-[\x76ar(\x2d-text)] \x73hadow-[\x76ar(\x2d-shadow-raised)]"
          }
        >
          Preview
        </span>
      </button>
      <div
        className={
          "flex flex-1 flex-col gap-3 px-2 pb-1 pt-3 [&\x5fbutton[\x61ria-haspopup]]:\x77-full"
        }
      >
        <div className="flex min-w-0 items-start justify-between gap-2">
          <div className="min-w-0">
            <h2 className={"truncate text-[13px] font-medium \x74ext-[\x76ar(\x2d-text)]"}>
              <a
                className={"\x75nderline-offset-2 \x68over:\x75nderline"}
                href="/sections/prompt-meadow"
              >
                Meadow
              </a>
            </h2>
            <p className={"mt-0.5 truncate text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
              Hero section · Studio Original
            </p>
          </div>
          <a
            className={
              "-mr-1 shrink-0 rounded-full px-2 py-1 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)] transition-colors \x68over:\x62g-black/[\x30.\x304] \x68over:\x74ext-[\x76ar(\x2d-text)]"
            }
            href="/sections/prompt-meadow"
          >
            Details
          </a>
        </div>
        <div className={"mt-auto [&>\x64iv]:\x77-full"}>
          <a
            className="os-btn-dark os-spark h-10 justify-center w-full"
            href="/pricing?plan=sections"
          >
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect x="4" y="10" width="16" height="10" rx="1" />
              <path d="M8 10V7a4 4 0 0 1 8 0v3" />
            </svg>{" "}
            Unlock with Pro
          </a>
        </div>
      </div>
    </article>
  );
}

function ImportedArticleBloom() {
  return (
    <article
      className={
        "relative flex flex-col \x68as-[[\x61ria-expanded=\x74rue]]:\x7a-30 rounded-[20px] \x62order \x62order-[\x76ar(\x2d-line)] bg-white p-2 \x73hadow-[\x76ar(\x2d-shadow-raised)]"
      }
      style={
        { viewTransitionName: "sec-prompt-bloom", viewTransitionClass: "sec-card" } as CSSProperties
      }
      id="prompt-bloom"
    >
      <button
        className={
          "group relative block aspect-[16/10] w-full overflow-hidden rounded-[12px] \x62g-[\x76ar(\x2d-surface-sunken)] text-left"
        }
        type="button"
        aria-label="Preview Bloom"
      >
        <img
          className={
            "object-cover \x6fbject-top transition-transform duration-300 \x67roup-hover:\x73cale-[\x31.\x3025]"
          }
          style={{
            position: "absolute",
            height: "100%",
            width: "100%",
            inset: "0px",
            color: "transparent",
          }}
          alt="Bloom section preview"
          loading="lazy"
          decoding="async"
          src="/site-assets/1db11d66a9a3b89c.webp"
        />
        <span
          className={
            "absolute left-2 top-2 inline-flex items-center gap-1 rounded-full \x62g-[#\x3111]/\x390 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide \x74ext-[#\x665d98a] \x73hadow-[\x76ar(\x2d-shadow-raised)] \x62ackdrop-blur"
          }
        >
          ✦ Pro
        </span>
        <span
          className={
            "absolute bottom-2 right-2 rounded-full \x62g-white/\x395 px-3 py-1.5 text-[11px] font-medium \x74ext-[\x76ar(\x2d-text)] \x73hadow-[\x76ar(\x2d-shadow-raised)]"
          }
        >
          Preview
        </span>
      </button>
      <div
        className={
          "flex flex-1 flex-col gap-3 px-2 pb-1 pt-3 [&\x5fbutton[\x61ria-haspopup]]:\x77-full"
        }
      >
        <div className="flex min-w-0 items-start justify-between gap-2">
          <div className="min-w-0">
            <h2 className={"truncate text-[13px] font-medium \x74ext-[\x76ar(\x2d-text)]"}>
              <a
                className={"\x75nderline-offset-2 \x68over:\x75nderline"}
                href="/sections/prompt-bloom"
              >
                Bloom
              </a>
            </h2>
            <p className={"mt-0.5 truncate text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
              Hero section · Studio Original
            </p>
          </div>
          <a
            className={
              "-mr-1 shrink-0 rounded-full px-2 py-1 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)] transition-colors \x68over:\x62g-black/[\x30.\x304] \x68over:\x74ext-[\x76ar(\x2d-text)]"
            }
            href="/sections/prompt-bloom"
          >
            Details
          </a>
        </div>
        <div className={"mt-auto [&>\x64iv]:\x77-full"}>
          <a
            className="os-btn-dark os-spark h-10 justify-center w-full"
            href="/pricing?plan=sections"
          >
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect x="4" y="10" width="16" height="10" rx="1" />
              <path d="M8 10V7a4 4 0 0 1 8 0v3" />
            </svg>{" "}
            Unlock with Pro
          </a>
        </div>
      </div>
    </article>
  );
}

function ImportedArticleOrbit() {
  return (
    <article
      className={
        "relative flex flex-col \x68as-[[\x61ria-expanded=\x74rue]]:\x7a-30 rounded-[20px] \x62order \x62order-[\x76ar(\x2d-line)] bg-white p-2 \x73hadow-[\x76ar(\x2d-shadow-raised)]"
      }
      style={{ viewTransitionName: "sec-orbit", viewTransitionClass: "sec-card" } as CSSProperties}
      id="orbit"
    >
      <button
        className={
          "group relative block aspect-[16/10] w-full overflow-hidden rounded-[12px] \x62g-[\x76ar(\x2d-surface-sunken)] text-left"
        }
        type="button"
        aria-label="Preview Orbit"
      >
        <img
          className={
            "object-cover \x6fbject-top transition-transform duration-300 \x67roup-hover:\x73cale-[\x31.\x3025]"
          }
          style={{
            position: "absolute",
            height: "100%",
            width: "100%",
            inset: "0px",
            color: "transparent",
          }}
          alt="Orbit section preview"
          loading="lazy"
          decoding="async"
          src="/site-assets/7dfda5219ff4277f.webp"
        />
        <span
          className={
            "absolute left-2 top-2 inline-flex items-center gap-1 rounded-full \x62g-[#\x3111]/\x390 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide \x74ext-[#\x665d98a] \x73hadow-[\x76ar(\x2d-shadow-raised)] \x62ackdrop-blur"
          }
        >
          ✦ Pro
        </span>
        <span
          className={
            "absolute bottom-2 right-2 rounded-full \x62g-white/\x395 px-3 py-1.5 text-[11px] font-medium \x74ext-[\x76ar(\x2d-text)] \x73hadow-[\x76ar(\x2d-shadow-raised)]"
          }
        >
          Preview
        </span>
      </button>
      <div
        className={
          "flex flex-1 flex-col gap-3 px-2 pb-1 pt-3 [&\x5fbutton[\x61ria-haspopup]]:\x77-full"
        }
      >
        <div className="flex min-w-0 items-start justify-between gap-2">
          <div className="min-w-0">
            <h2 className={"truncate text-[13px] font-medium \x74ext-[\x76ar(\x2d-text)]"}>
              <a className={"\x75nderline-offset-2 \x68over:\x75nderline"} href="/sections/orbit">
                Orbit
              </a>
            </h2>
            <p className={"mt-0.5 truncate text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
              Scroll story · Studio Original
            </p>
          </div>
          <a
            className={
              "-mr-1 shrink-0 rounded-full px-2 py-1 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)] transition-colors \x68over:\x62g-black/[\x30.\x304] \x68over:\x74ext-[\x76ar(\x2d-text)]"
            }
            href="/sections/orbit"
          >
            Details
          </a>
        </div>
        <div className={"mt-auto [&>\x64iv]:\x77-full"}>
          <a
            className="os-btn-dark os-spark h-10 justify-center w-full"
            href="/pricing?plan=sections"
          >
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect x="4" y="10" width="16" height="10" rx="1" />
              <path d="M8 10V7a4 4 0 0 1 8 0v3" />
            </svg>{" "}
            Unlock with Pro
          </a>
        </div>
      </div>
    </article>
  );
}

function ImportedArticleFlorilegium() {
  return (
    <article
      className={
        "relative flex flex-col \x68as-[[\x61ria-expanded=\x74rue]]:\x7a-30 rounded-[20px] \x62order \x62order-[\x76ar(\x2d-line)] bg-white p-2 \x73hadow-[\x76ar(\x2d-shadow-raised)]"
      }
      style={
        { viewTransitionName: "sec-florilegium", viewTransitionClass: "sec-card" } as CSSProperties
      }
      id="florilegium"
    >
      <button
        className={
          "group relative block aspect-[16/10] w-full overflow-hidden rounded-[12px] \x62g-[\x76ar(\x2d-surface-sunken)] text-left"
        }
        type="button"
        aria-label="Preview Florilegium"
      >
        <img
          className={
            "object-cover \x6fbject-top transition-transform duration-300 \x67roup-hover:\x73cale-[\x31.\x3025]"
          }
          style={{
            position: "absolute",
            height: "100%",
            width: "100%",
            inset: "0px",
            color: "transparent",
          }}
          alt="Florilegium section preview"
          loading="lazy"
          decoding="async"
          src="/site-assets/7f55aa020644bd72.webp"
        />
        <span
          className={
            "absolute bottom-2 right-2 rounded-full \x62g-white/\x395 px-3 py-1.5 text-[11px] font-medium \x74ext-[\x76ar(\x2d-text)] \x73hadow-[\x76ar(\x2d-shadow-raised)]"
          }
        >
          Preview
        </span>
      </button>
      <div
        className={
          "flex flex-1 flex-col gap-3 px-2 pb-1 pt-3 [&\x5fbutton[\x61ria-haspopup]]:\x77-full"
        }
      >
        <div className="flex min-w-0 items-start justify-between gap-2">
          <div className="min-w-0">
            <h2 className={"truncate text-[13px] font-medium \x74ext-[\x76ar(\x2d-text)]"}>
              <a
                className={"\x75nderline-offset-2 \x68over:\x75nderline"}
                href="/sections/florilegium"
              >
                Florilegium
              </a>
            </h2>
            <p className={"mt-0.5 truncate text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
              Scroll story · Studio Original
            </p>
          </div>
          <a
            className={
              "-mr-1 shrink-0 rounded-full px-2 py-1 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)] transition-colors \x68over:\x62g-black/[\x30.\x304] \x68over:\x74ext-[\x76ar(\x2d-text)]"
            }
            href="/sections/florilegium"
          >
            Details
          </a>
        </div>
        <div className={"mt-auto [&>\x64iv]:\x77-full"}>
          <div className="relative shrink-0">
            <button
              className={
                "flex h-9 items-center gap-2 rounded-full \x62g-gradient-to-b \x66rom-white \x74o-[#\x663f3f2] pl-1 pr-3 text-[12px] font-medium \x74ext-[\x76ar(\x2d-text)] \x73hadow-[\x76ar(\x2d-shadow-raised)] transition-[transform,filter,box-shadow] duration-150 \x68over:\x2dtranslate-y-0.\x35 \x68over:\x73hadow-[\x30_5px_14px_rgba(\x30,\x30,\x30,\x30.\x312)] \x61ctive:\x74ranslate-y-px \x61ctive:\x73cale-[\x30.\x397] \x66ocus-visible:\x6futline-2 \x66ocus-visible:\x6futline-offset-2 \x66ocus-visible:\x6futline-[\x76ar(\x2d-accent)] \x6dotion-reduce:\x74ransform-none"
              }
              type="button"
              aria-label="Copy Section options"
              aria-haspopup="menu"
              aria-expanded="false"
            >
              <span
                className={
                  "flex h-7 w-7 shrink-0 items-center justify-center rounded-full \x62g-[#\x37a5be8] text-white"
                }
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18" />
                </svg>
              </span>
              <span className="flex-1 whitespace-nowrap text-left">Copy Section</span>
              <span
                className={
                  "rounded-full \x62g-[#\x657f5e1] px-1.5 py-px text-[9.5px] font-semibold uppercase tracking-wide \x74ext-[#\x31f5a33]"
                }
              >
                Free
              </span>
              <svg
                className={
                  "ml-0.5 \x74ext-[\x76ar(\x2d-text-secondary)] transition-transform \x2drotate-90"
                }
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

function ImportedArticleJoiner() {
  return (
    <article
      className={
        "relative flex flex-col \x68as-[[\x61ria-expanded=\x74rue]]:\x7a-30 rounded-[20px] \x62order \x62order-[\x76ar(\x2d-line)] bg-white p-2 \x73hadow-[\x76ar(\x2d-shadow-raised)]"
      }
      style={{ viewTransitionName: "sec-joiner", viewTransitionClass: "sec-card" } as CSSProperties}
      id="joiner"
    >
      <button
        className={
          "group relative block aspect-[16/10] w-full overflow-hidden rounded-[12px] \x62g-[\x76ar(\x2d-surface-sunken)] text-left"
        }
        type="button"
        aria-label="Preview Joiner"
      >
        <img
          className={
            "object-cover \x6fbject-top transition-transform duration-300 \x67roup-hover:\x73cale-[\x31.\x3025]"
          }
          style={{
            position: "absolute",
            height: "100%",
            width: "100%",
            inset: "0px",
            color: "transparent",
          }}
          alt="Joiner section preview"
          loading="lazy"
          decoding="async"
          src="/site-assets/e24e06b0cd8ab940.webp"
        />
        <span
          className={
            "absolute bottom-2 right-2 rounded-full \x62g-white/\x395 px-3 py-1.5 text-[11px] font-medium \x74ext-[\x76ar(\x2d-text)] \x73hadow-[\x76ar(\x2d-shadow-raised)]"
          }
        >
          Preview
        </span>
      </button>
      <div
        className={
          "flex flex-1 flex-col gap-3 px-2 pb-1 pt-3 [&\x5fbutton[\x61ria-haspopup]]:\x77-full"
        }
      >
        <div className="flex min-w-0 items-start justify-between gap-2">
          <div className="min-w-0">
            <h2 className={"truncate text-[13px] font-medium \x74ext-[\x76ar(\x2d-text)]"}>
              <a className={"\x75nderline-offset-2 \x68over:\x75nderline"} href="/sections/joiner">
                Joiner
              </a>
            </h2>
            <p className={"mt-0.5 truncate text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
              Scroll story · Studio Original
            </p>
          </div>
          <a
            className={
              "-mr-1 shrink-0 rounded-full px-2 py-1 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)] transition-colors \x68over:\x62g-black/[\x30.\x304] \x68over:\x74ext-[\x76ar(\x2d-text)]"
            }
            href="/sections/joiner"
          >
            Details
          </a>
        </div>
        <div className={"mt-auto [&>\x64iv]:\x77-full"}>
          <div className="relative shrink-0">
            <button
              className={
                "flex h-9 items-center gap-2 rounded-full \x62g-gradient-to-b \x66rom-white \x74o-[#\x663f3f2] pl-1 pr-3 text-[12px] font-medium \x74ext-[\x76ar(\x2d-text)] \x73hadow-[\x76ar(\x2d-shadow-raised)] transition-[transform,filter,box-shadow] duration-150 \x68over:\x2dtranslate-y-0.\x35 \x68over:\x73hadow-[\x30_5px_14px_rgba(\x30,\x30,\x30,\x30.\x312)] \x61ctive:\x74ranslate-y-px \x61ctive:\x73cale-[\x30.\x397] \x66ocus-visible:\x6futline-2 \x66ocus-visible:\x6futline-offset-2 \x66ocus-visible:\x6futline-[\x76ar(\x2d-accent)] \x6dotion-reduce:\x74ransform-none"
              }
              type="button"
              aria-label="Copy Section options"
              aria-haspopup="menu"
              aria-expanded="false"
            >
              <span
                className={
                  "flex h-7 w-7 shrink-0 items-center justify-center rounded-full \x62g-[#\x37a5be8] text-white"
                }
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18" />
                </svg>
              </span>
              <span className="flex-1 whitespace-nowrap text-left">Copy Section</span>
              <span
                className={
                  "rounded-full \x62g-[#\x657f5e1] px-1.5 py-px text-[9.5px] font-semibold uppercase tracking-wide \x74ext-[#\x31f5a33]"
                }
              >
                Free
              </span>
              <svg
                className={
                  "ml-0.5 \x74ext-[\x76ar(\x2d-text-secondary)] transition-transform \x2drotate-90"
                }
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

function ImportedArticleDarkroom() {
  return (
    <article
      className={
        "relative flex flex-col \x68as-[[\x61ria-expanded=\x74rue]]:\x7a-30 rounded-[20px] \x62order \x62order-[\x76ar(\x2d-line)] bg-white p-2 \x73hadow-[\x76ar(\x2d-shadow-raised)]"
      }
      style={
        {
          viewTransitionName: "sec-prompt-darkroom",
          viewTransitionClass: "sec-card",
        } as CSSProperties
      }
      id="prompt-darkroom"
    >
      <button
        className={
          "group relative block aspect-[16/10] w-full overflow-hidden rounded-[12px] \x62g-[\x76ar(\x2d-surface-sunken)] text-left"
        }
        type="button"
        aria-label="Preview Darkroom"
      >
        <img
          className={
            "object-cover \x6fbject-top transition-transform duration-300 \x67roup-hover:\x73cale-[\x31.\x3025]"
          }
          style={{
            position: "absolute",
            height: "100%",
            width: "100%",
            inset: "0px",
            color: "transparent",
          }}
          alt="Darkroom section preview"
          loading="lazy"
          decoding="async"
          src="/site-assets/3980afc0627c0f3a.webp"
        />
        <span
          className={
            "absolute left-2 top-2 inline-flex items-center gap-1 rounded-full \x62g-[#\x3111]/\x390 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide \x74ext-[#\x665d98a] \x73hadow-[\x76ar(\x2d-shadow-raised)] \x62ackdrop-blur"
          }
        >
          ✦ Pro
        </span>
        <span
          className={
            "absolute bottom-2 right-2 rounded-full \x62g-white/\x395 px-3 py-1.5 text-[11px] font-medium \x74ext-[\x76ar(\x2d-text)] \x73hadow-[\x76ar(\x2d-shadow-raised)]"
          }
        >
          Preview
        </span>
      </button>
      <div
        className={
          "flex flex-1 flex-col gap-3 px-2 pb-1 pt-3 [&\x5fbutton[\x61ria-haspopup]]:\x77-full"
        }
      >
        <div className="flex min-w-0 items-start justify-between gap-2">
          <div className="min-w-0">
            <h2 className={"truncate text-[13px] font-medium \x74ext-[\x76ar(\x2d-text)]"}>
              <a
                className={"\x75nderline-offset-2 \x68over:\x75nderline"}
                href="/sections/prompt-darkroom"
              >
                Darkroom
              </a>
            </h2>
            <p className={"mt-0.5 truncate text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
              Hero section · Studio Original
            </p>
          </div>
          <a
            className={
              "-mr-1 shrink-0 rounded-full px-2 py-1 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)] transition-colors \x68over:\x62g-black/[\x30.\x304] \x68over:\x74ext-[\x76ar(\x2d-text)]"
            }
            href="/sections/prompt-darkroom"
          >
            Details
          </a>
        </div>
        <div className={"mt-auto [&>\x64iv]:\x77-full"}>
          <a
            className="os-btn-dark os-spark h-10 justify-center w-full"
            href="/pricing?plan=sections"
          >
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect x="4" y="10" width="16" height="10" rx="1" />
              <path d="M8 10V7a4 4 0 0 1 8 0v3" />
            </svg>{" "}
            Unlock with Pro
          </a>
        </div>
      </div>
    </article>
  );
}

function ImportedArticle404Planet() {
  return (
    <article
      className={
        "relative flex flex-col \x68as-[[\x61ria-expanded=\x74rue]]:\x7a-30 rounded-[20px] \x62order \x62order-[\x76ar(\x2d-line)] bg-white p-2 \x73hadow-[\x76ar(\x2d-shadow-raised)]"
      }
      style={
        { viewTransitionName: "sec-404-planet", viewTransitionClass: "sec-card" } as CSSProperties
      }
      id="404-planet"
    >
      <button
        className={
          "group relative block aspect-[16/10] w-full overflow-hidden rounded-[12px] \x62g-[\x76ar(\x2d-surface-sunken)] text-left"
        }
        type="button"
        aria-label="Preview 404 Planet"
      >
        <img
          className={
            "object-cover \x6fbject-top transition-transform duration-300 \x67roup-hover:\x73cale-[\x31.\x3025]"
          }
          style={{
            position: "absolute",
            height: "100%",
            width: "100%",
            inset: "0px",
            color: "transparent",
          }}
          alt="404 Planet section preview"
          loading="lazy"
          decoding="async"
          src="/site-assets/8b1303595328c998.webp"
        />
        <span
          className={
            "absolute left-2 top-2 inline-flex items-center gap-1 rounded-full \x62g-[#\x3111]/\x390 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide \x74ext-[#\x665d98a] \x73hadow-[\x76ar(\x2d-shadow-raised)] \x62ackdrop-blur"
          }
        >
          ✦ Pro
        </span>
        <span
          className={
            "absolute bottom-2 right-2 rounded-full \x62g-white/\x395 px-3 py-1.5 text-[11px] font-medium \x74ext-[\x76ar(\x2d-text)] \x73hadow-[\x76ar(\x2d-shadow-raised)]"
          }
        >
          Preview
        </span>
      </button>
      <div
        className={
          "flex flex-1 flex-col gap-3 px-2 pb-1 pt-3 [&\x5fbutton[\x61ria-haspopup]]:\x77-full"
        }
      >
        <div className="flex min-w-0 items-start justify-between gap-2">
          <div className="min-w-0">
            <h2 className={"truncate text-[13px] font-medium \x74ext-[\x76ar(\x2d-text)]"}>
              <a
                className={"\x75nderline-offset-2 \x68over:\x75nderline"}
                href="/sections/404-planet"
              >
                404 Planet
              </a>
            </h2>
            <p className={"mt-0.5 truncate text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
              404 page · Studio Original
            </p>
          </div>
          <a
            className={
              "-mr-1 shrink-0 rounded-full px-2 py-1 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)] transition-colors \x68over:\x62g-black/[\x30.\x304] \x68over:\x74ext-[\x76ar(\x2d-text)]"
            }
            href="/sections/404-planet"
          >
            Details
          </a>
        </div>
        <div className={"mt-auto [&>\x64iv]:\x77-full"}>
          <a
            className="os-btn-dark os-spark h-10 justify-center w-full"
            href="/pricing?plan=sections"
          >
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect x="4" y="10" width="16" height="10" rx="1" />
              <path d="M8 10V7a4 4 0 0 1 8 0v3" />
            </svg>{" "}
            Unlock with Pro
          </a>
        </div>
      </div>
    </article>
  );
}

function ImportedArticleTide() {
  return (
    <article
      className={
        "relative flex flex-col \x68as-[[\x61ria-expanded=\x74rue]]:\x7a-30 rounded-[20px] \x62order \x62order-[\x76ar(\x2d-line)] bg-white p-2 \x73hadow-[\x76ar(\x2d-shadow-raised)]"
      }
      style={
        { viewTransitionName: "sec-prompt-tide", viewTransitionClass: "sec-card" } as CSSProperties
      }
      id="prompt-tide"
    >
      <button
        className={
          "group relative block aspect-[16/10] w-full overflow-hidden rounded-[12px] \x62g-[\x76ar(\x2d-surface-sunken)] text-left"
        }
        type="button"
        aria-label="Preview Tide"
      >
        <img
          className={
            "object-cover \x6fbject-top transition-transform duration-300 \x67roup-hover:\x73cale-[\x31.\x3025]"
          }
          style={{
            position: "absolute",
            height: "100%",
            width: "100%",
            inset: "0px",
            color: "transparent",
          }}
          alt="Tide section preview"
          loading="lazy"
          decoding="async"
          src="/site-assets/f5631803122804d7.webp"
        />
        <span
          className={
            "absolute left-2 top-2 inline-flex items-center gap-1 rounded-full \x62g-[#\x3111]/\x390 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide \x74ext-[#\x665d98a] \x73hadow-[\x76ar(\x2d-shadow-raised)] \x62ackdrop-blur"
          }
        >
          ✦ Pro
        </span>
        <span
          className={
            "absolute bottom-2 right-2 rounded-full \x62g-white/\x395 px-3 py-1.5 text-[11px] font-medium \x74ext-[\x76ar(\x2d-text)] \x73hadow-[\x76ar(\x2d-shadow-raised)]"
          }
        >
          Preview
        </span>
      </button>
      <div
        className={
          "flex flex-1 flex-col gap-3 px-2 pb-1 pt-3 [&\x5fbutton[\x61ria-haspopup]]:\x77-full"
        }
      >
        <div className="flex min-w-0 items-start justify-between gap-2">
          <div className="min-w-0">
            <h2 className={"truncate text-[13px] font-medium \x74ext-[\x76ar(\x2d-text)]"}>
              <a
                className={"\x75nderline-offset-2 \x68over:\x75nderline"}
                href="/sections/prompt-tide"
              >
                Tide
              </a>
            </h2>
            <p className={"mt-0.5 truncate text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
              Hero section · Studio Original
            </p>
          </div>
          <a
            className={
              "-mr-1 shrink-0 rounded-full px-2 py-1 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)] transition-colors \x68over:\x62g-black/[\x30.\x304] \x68over:\x74ext-[\x76ar(\x2d-text)]"
            }
            href="/sections/prompt-tide"
          >
            Details
          </a>
        </div>
        <div className={"mt-auto [&>\x64iv]:\x77-full"}>
          <a
            className="os-btn-dark os-spark h-10 justify-center w-full"
            href="/pricing?plan=sections"
          >
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect x="4" y="10" width="16" height="10" rx="1" />
              <path d="M8 10V7a4 4 0 0 1 8 0v3" />
            </svg>{" "}
            Unlock with Pro
          </a>
        </div>
      </div>
    </article>
  );
}

function ImportedArticleDesktop() {
  return (
    <article
      className={
        "relative flex flex-col \x68as-[[\x61ria-expanded=\x74rue]]:\x7a-30 rounded-[20px] \x62order \x62order-[\x76ar(\x2d-line)] bg-white p-2 \x73hadow-[\x76ar(\x2d-shadow-raised)]"
      }
      style={
        {
          viewTransitionName: "sec-portfolio-desktop",
          viewTransitionClass: "sec-card",
        } as CSSProperties
      }
      id="portfolio-desktop"
    >
      <button
        className={
          "group relative block aspect-[16/10] w-full overflow-hidden rounded-[12px] \x62g-[\x76ar(\x2d-surface-sunken)] text-left"
        }
        type="button"
        aria-label="Preview Desktop"
      >
        <img
          className={
            "object-cover \x6fbject-top transition-transform duration-300 \x67roup-hover:\x73cale-[\x31.\x3025]"
          }
          style={{
            position: "absolute",
            height: "100%",
            width: "100%",
            inset: "0px",
            color: "transparent",
          }}
          alt="Desktop section preview"
          loading="lazy"
          decoding="async"
          src="/site-assets/84f67e00fa378b78.webp"
        />
        <span
          className={
            "absolute left-2 top-2 inline-flex items-center gap-1 rounded-full \x62g-[#\x3111]/\x390 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide \x74ext-[#\x665d98a] \x73hadow-[\x76ar(\x2d-shadow-raised)] \x62ackdrop-blur"
          }
        >
          ✦ Pro
        </span>
        <span
          className={
            "absolute bottom-2 right-2 rounded-full \x62g-white/\x395 px-3 py-1.5 text-[11px] font-medium \x74ext-[\x76ar(\x2d-text)] \x73hadow-[\x76ar(\x2d-shadow-raised)]"
          }
        >
          Preview
        </span>
      </button>
      <div
        className={
          "flex flex-1 flex-col gap-3 px-2 pb-1 pt-3 [&\x5fbutton[\x61ria-haspopup]]:\x77-full"
        }
      >
        <div className="flex min-w-0 items-start justify-between gap-2">
          <div className="min-w-0">
            <h2 className={"truncate text-[13px] font-medium \x74ext-[\x76ar(\x2d-text)]"}>
              <a
                className={"\x75nderline-offset-2 \x68over:\x75nderline"}
                href="/sections/portfolio-desktop"
              >
                Desktop
              </a>
            </h2>
            <p className={"mt-0.5 truncate text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
              Portfolio hero · Studio Original
            </p>
          </div>
          <a
            className={
              "-mr-1 shrink-0 rounded-full px-2 py-1 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)] transition-colors \x68over:\x62g-black/[\x30.\x304] \x68over:\x74ext-[\x76ar(\x2d-text)]"
            }
            href="/sections/portfolio-desktop"
          >
            Details
          </a>
        </div>
        <div className={"mt-auto [&>\x64iv]:\x77-full"}>
          <a
            className="os-btn-dark os-spark h-10 justify-center w-full"
            href="/pricing?plan=sections"
          >
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect x="4" y="10" width="16" height="10" rx="1" />
              <path d="M8 10V7a4 4 0 0 1 8 0v3" />
            </svg>{" "}
            Unlock with Pro
          </a>
        </div>
      </div>
    </article>
  );
}

function ImportedArticleKernel() {
  return (
    <article
      className={
        "relative flex flex-col \x68as-[[\x61ria-expanded=\x74rue]]:\x7a-30 rounded-[20px] \x62order \x62order-[\x76ar(\x2d-line)] bg-white p-2 \x73hadow-[\x76ar(\x2d-shadow-raised)]"
      }
      style={
        {
          viewTransitionName: "sec-prompt-kernel",
          viewTransitionClass: "sec-card",
        } as CSSProperties
      }
      id="prompt-kernel"
    >
      <button
        className={
          "group relative block aspect-[16/10] w-full overflow-hidden rounded-[12px] \x62g-[\x76ar(\x2d-surface-sunken)] text-left"
        }
        type="button"
        aria-label="Preview Kernel"
      >
        <img
          className={
            "object-cover \x6fbject-top transition-transform duration-300 \x67roup-hover:\x73cale-[\x31.\x3025]"
          }
          style={{
            position: "absolute",
            height: "100%",
            width: "100%",
            inset: "0px",
            color: "transparent",
          }}
          alt="Kernel section preview"
          loading="lazy"
          decoding="async"
          src="/site-assets/35954cbe83da4223.webp"
        />
        <span
          className={
            "absolute left-2 top-2 inline-flex items-center gap-1 rounded-full \x62g-[#\x3111]/\x390 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide \x74ext-[#\x665d98a] \x73hadow-[\x76ar(\x2d-shadow-raised)] \x62ackdrop-blur"
          }
        >
          ✦ Pro
        </span>
        <span
          className={
            "absolute bottom-2 right-2 rounded-full \x62g-white/\x395 px-3 py-1.5 text-[11px] font-medium \x74ext-[\x76ar(\x2d-text)] \x73hadow-[\x76ar(\x2d-shadow-raised)]"
          }
        >
          Preview
        </span>
      </button>
      <div
        className={
          "flex flex-1 flex-col gap-3 px-2 pb-1 pt-3 [&\x5fbutton[\x61ria-haspopup]]:\x77-full"
        }
      >
        <div className="flex min-w-0 items-start justify-between gap-2">
          <div className="min-w-0">
            <h2 className={"truncate text-[13px] font-medium \x74ext-[\x76ar(\x2d-text)]"}>
              <a
                className={"\x75nderline-offset-2 \x68over:\x75nderline"}
                href="/sections/prompt-kernel"
              >
                Kernel
              </a>
            </h2>
            <p className={"mt-0.5 truncate text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
              Hero section · Studio Original
            </p>
          </div>
          <a
            className={
              "-mr-1 shrink-0 rounded-full px-2 py-1 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)] transition-colors \x68over:\x62g-black/[\x30.\x304] \x68over:\x74ext-[\x76ar(\x2d-text)]"
            }
            href="/sections/prompt-kernel"
          >
            Details
          </a>
        </div>
        <div className={"mt-auto [&>\x64iv]:\x77-full"}>
          <a
            className="os-btn-dark os-spark h-10 justify-center w-full"
            href="/pricing?plan=sections"
          >
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect x="4" y="10" width="16" height="10" rx="1" />
              <path d="M8 10V7a4 4 0 0 1 8 0v3" />
            </svg>{" "}
            Unlock with Pro
          </a>
        </div>
      </div>
    </article>
  );
}

function ImportedArticlePetal() {
  return (
    <article
      className={
        "relative flex flex-col \x68as-[[\x61ria-expanded=\x74rue]]:\x7a-30 rounded-[20px] \x62order \x62order-[\x76ar(\x2d-line)] bg-white p-2 \x73hadow-[\x76ar(\x2d-shadow-raised)]"
      }
      style={
        { viewTransitionName: "sec-prompt-petal", viewTransitionClass: "sec-card" } as CSSProperties
      }
      id="prompt-petal"
    >
      <button
        className={
          "group relative block aspect-[16/10] w-full overflow-hidden rounded-[12px] \x62g-[\x76ar(\x2d-surface-sunken)] text-left"
        }
        type="button"
        aria-label="Preview Petal"
      >
        <img
          className={
            "object-cover \x6fbject-top transition-transform duration-300 \x67roup-hover:\x73cale-[\x31.\x3025]"
          }
          style={{
            position: "absolute",
            height: "100%",
            width: "100%",
            inset: "0px",
            color: "transparent",
          }}
          alt="Petal section preview"
          loading="lazy"
          decoding="async"
          src="/site-assets/151dc951416e275e.webp"
        />
        <span
          className={
            "absolute left-2 top-2 inline-flex items-center gap-1 rounded-full \x62g-[#\x3111]/\x390 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide \x74ext-[#\x665d98a] \x73hadow-[\x76ar(\x2d-shadow-raised)] \x62ackdrop-blur"
          }
        >
          ✦ Pro
        </span>
        <span
          className={
            "absolute bottom-2 right-2 rounded-full \x62g-white/\x395 px-3 py-1.5 text-[11px] font-medium \x74ext-[\x76ar(\x2d-text)] \x73hadow-[\x76ar(\x2d-shadow-raised)]"
          }
        >
          Preview
        </span>
      </button>
      <div
        className={
          "flex flex-1 flex-col gap-3 px-2 pb-1 pt-3 [&\x5fbutton[\x61ria-haspopup]]:\x77-full"
        }
      >
        <div className="flex min-w-0 items-start justify-between gap-2">
          <div className="min-w-0">
            <h2 className={"truncate text-[13px] font-medium \x74ext-[\x76ar(\x2d-text)]"}>
              <a
                className={"\x75nderline-offset-2 \x68over:\x75nderline"}
                href="/sections/prompt-petal"
              >
                Petal
              </a>
            </h2>
            <p className={"mt-0.5 truncate text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
              Hero section · Studio Original
            </p>
          </div>
          <a
            className={
              "-mr-1 shrink-0 rounded-full px-2 py-1 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)] transition-colors \x68over:\x62g-black/[\x30.\x304] \x68over:\x74ext-[\x76ar(\x2d-text)]"
            }
            href="/sections/prompt-petal"
          >
            Details
          </a>
        </div>
        <div className={"mt-auto [&>\x64iv]:\x77-full"}>
          <a
            className="os-btn-dark os-spark h-10 justify-center w-full"
            href="/pricing?plan=sections"
          >
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect x="4" y="10" width="16" height="10" rx="1" />
              <path d="M8 10V7a4 4 0 0 1 8 0v3" />
            </svg>{" "}
            Unlock with Pro
          </a>
        </div>
      </div>
    </article>
  );
}

function ImportedArticleVinyl() {
  return (
    <article
      className={
        "relative flex flex-col \x68as-[[\x61ria-expanded=\x74rue]]:\x7a-30 rounded-[20px] \x62order \x62order-[\x76ar(\x2d-line)] bg-white p-2 \x73hadow-[\x76ar(\x2d-shadow-raised)]"
      }
      style={
        {
          viewTransitionName: "sec-portfolio-vinyl",
          viewTransitionClass: "sec-card",
        } as CSSProperties
      }
      id="portfolio-vinyl"
    >
      <button
        className={
          "group relative block aspect-[16/10] w-full overflow-hidden rounded-[12px] \x62g-[\x76ar(\x2d-surface-sunken)] text-left"
        }
        type="button"
        aria-label="Preview Vinyl"
      >
        <img
          className={
            "object-cover \x6fbject-top transition-transform duration-300 \x67roup-hover:\x73cale-[\x31.\x3025]"
          }
          style={{
            position: "absolute",
            height: "100%",
            width: "100%",
            inset: "0px",
            color: "transparent",
          }}
          alt="Vinyl section preview"
          loading="lazy"
          decoding="async"
          src="/site-assets/ef1010ea13661467.webp"
        />
        <span
          className={
            "absolute bottom-2 right-2 rounded-full \x62g-white/\x395 px-3 py-1.5 text-[11px] font-medium \x74ext-[\x76ar(\x2d-text)] \x73hadow-[\x76ar(\x2d-shadow-raised)]"
          }
        >
          Preview
        </span>
      </button>
      <div
        className={
          "flex flex-1 flex-col gap-3 px-2 pb-1 pt-3 [&\x5fbutton[\x61ria-haspopup]]:\x77-full"
        }
      >
        <div className="flex min-w-0 items-start justify-between gap-2">
          <div className="min-w-0">
            <h2 className={"truncate text-[13px] font-medium \x74ext-[\x76ar(\x2d-text)]"}>
              <a
                className={"\x75nderline-offset-2 \x68over:\x75nderline"}
                href="/sections/portfolio-vinyl"
              >
                Vinyl
              </a>
            </h2>
            <p className={"mt-0.5 truncate text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
              Portfolio hero · Studio Original
            </p>
          </div>
          <a
            className={
              "-mr-1 shrink-0 rounded-full px-2 py-1 text-[11px] \x74ext-[\x76ar(\x2d-text-tertiary)] transition-colors \x68over:\x62g-black/[\x30.\x304] \x68over:\x74ext-[\x76ar(\x2d-text)]"
            }
            href="/sections/portfolio-vinyl"
          >
            Details
          </a>
        </div>
        <div className={"mt-auto [&>\x64iv]:\x77-full"}>
          <div className="relative shrink-0">
            <button
              className={
                "flex h-9 items-center gap-2 rounded-full \x62g-gradient-to-b \x66rom-white \x74o-[#\x663f3f2] pl-1 pr-3 text-[12px] font-medium \x74ext-[\x76ar(\x2d-text)] \x73hadow-[\x76ar(\x2d-shadow-raised)] transition-[transform,filter,box-shadow] duration-150 \x68over:\x2dtranslate-y-0.\x35 \x68over:\x73hadow-[\x30_5px_14px_rgba(\x30,\x30,\x30,\x30.\x312)] \x61ctive:\x74ranslate-y-px \x61ctive:\x73cale-[\x30.\x397] \x66ocus-visible:\x6futline-2 \x66ocus-visible:\x6futline-offset-2 \x66ocus-visible:\x6futline-[\x76ar(\x2d-accent)] \x6dotion-reduce:\x74ransform-none"
              }
              type="button"
              aria-label="Copy Section options"
              aria-haspopup="menu"
              aria-expanded="false"
            >
              <span
                className={
                  "flex h-7 w-7 shrink-0 items-center justify-center rounded-full \x62g-[#\x37a5be8] text-white"
                }
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18" />
                </svg>
              </span>
              <span className="flex-1 whitespace-nowrap text-left">Copy Section</span>
              <span
                className={
                  "rounded-full \x62g-[#\x657f5e1] px-1.5 py-px text-[9.5px] font-semibold uppercase tracking-wide \x74ext-[#\x31f5a33]"
                }
              >
                Free
              </span>
              <svg
                className={
                  "ml-0.5 \x74ext-[\x76ar(\x2d-text-secondary)] transition-transform \x2drotate-90"
                }
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
