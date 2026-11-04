import { withPublicPageHead } from "@/lib/seo";
import type { CSSProperties } from "react";
import { useState, useEffect, useRef } from "react";
import { createFileRoute } from "@tanstack/react-router";
import capturedCSS from "../styles/site.css?raw";
import { AssistantCopyOptions } from "@/components/AssistantCopyOptions";
import { copySectionPrompt } from "@/lib/assistant-copy";
import { SectionAssistantMenu } from "@/components/SectionAssistantMenu";
import {
  HomeBrowseTemplatesLinkLabel,
  HomeHeroCatalogParagraph,
} from "@/components/marketing/HomePublicCopy";
import { HomeFreeSectionsChip } from "@/components/marketing/HomeFreeSectionsChip";
import {
  SidebarSectionCount,
  SidebarTemplateCount,
} from "@/components/marketing/TemplatesPublicCopy";

export const Route = createFileRoute("/")({
  head: () =>
    withPublicPageHead("/", [
      { title: "Substrates — Website templates & Claude video skills" },
      {
        name: "description",
        content:
          "Premium website templates and free sections for Claude Code, Cursor, v0, Webflow and Framer.",
      },
      { property: "og:title", content: "Substrates — Website templates & Claude video skills" },
      {
        property: "og:description",
        content: "Discover Substrates website templates and free AI-ready sections.",
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

const SECTION_PREVIEWS = [
  "condensation",
  "florilegium",
  "joiner",
  "portfolio-collage",
  "signal",
  "transmission",
];
const TEMPLATE_DEMOS = [
  "daylight",
  "evergrid",
  "legion",
  "lumenis",
  "nullify",
  "pretty",
  "protocol",
  "stillpoint",
  "wings",
];

function Index() {
  const [assistantSection, setAssistantSection] = useState<string | null>(null);
  const [openMenu0, setOpenMenu0] = useState(null as string | null);
  const [navigationOpen, setNavigationOpen] = useState(false);
  const [cookiesVisible, setCookiesVisible] = useState(true);
  const [preview, setPreview] = useState<{
    name: string;
    image: string;
    section: boolean;
    id: string;
  } | null>(null);
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [rating, setRating] = useState<string | null>(null);
  const [previewSize, setPreviewSize] = useState("Desktop");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [favLoaded, setFavLoaded] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const [feedbackSent, setFeedbackSent] = useState(false);
  useEffect(() => {
    try {
      setFavorites(JSON.parse(localStorage.getItem("supply-favorites") || "[]"));
    } catch {
      /* ignore */
    }
    setFavLoaded(true);
  }, []);
  useEffect(() => {
    if (favLoaded) localStorage.setItem("supply-favorites", JSON.stringify(favorites));
    document
      .querySelectorAll<HTMLButtonElement>('button[aria-label$=" favorites"]')
      .forEach((b) => {
        const name = (b.getAttribute("aria-label") || "")
          .replace(/^(Add|Remove) /, "")
          .replace(/ (to|from) favorites$/, "");
        const on = favorites.includes(name);
        b.setAttribute(
          "aria-label",
          on ? `Remove ${name} from favorites` : `Add ${name} to favorites`,
        );
        b.setAttribute("aria-pressed", String(on));
        b.querySelectorAll("svg").forEach((s) => {
          s.style.fill = on ? "#e5484d" : "";
          s.style.color = on ? "#e5484d" : "";
        });
      });
  }, [favorites, favLoaded]);
  useEffect(() => {
    const out = (e: MouseEvent) => {
      if (
        !(e.target instanceof Element) ||
        !e.target.closest('[role="menu"], [aria-haspopup="menu"]')
      )
        setOpenMenu0(null);
    };
    document.addEventListener("click", out);
    return () => document.removeEventListener("click", out);
  }, []);
  const returnFocus = useRef<HTMLElement | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const closePanels = () => {
    setNavigationOpen(false);
    setPreview(null);
    setFeedbackOpen(false);
    setOpenMenu0(null);
    returnFocus.current?.focus();
  };
  useEffect(() => {
    const key = (event: KeyboardEvent) => {
      if (event.key === "Escape") closePanels();
      if (event.key === "Tab" && dialogRef.current) {
        const items = Array.from(
          dialogRef.current.querySelectorAll<HTMLElement>(
            "button:not([disabled]), a, textarea, input",
          ),
        );
        const first = items[0];
        const last = items.at(-1);
        if (event.shiftKey && document.activeElement === first && last) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last && first) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", key);
    return () => document.removeEventListener("keydown", key);
  }, []);
  useEffect(() => {
    if (!preview && !feedbackOpen && !navigationOpen) return;
    const old = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialogRef.current?.querySelector<HTMLElement>("button, a")?.focus();
    return () => {
      document.body.style.overflow = old;
    };
  }, [preview, feedbackOpen, navigationOpen]);
  const handleControl = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!(event.target instanceof Element)) return;
    const button = event.target.closest("button");
    if (!button) return;
    if (button.getAttribute("aria-haspopup") === "menu" && !button.getAttribute("aria-controls")) {
      const slug = button.closest("article")?.id;
      if (slug) setAssistantSection(slug);
    }
    const label = button.getAttribute("aria-label") || button.textContent?.trim() || "";
    if (label === "Open navigation") {
      returnFocus.current = button;
      setNavigationOpen(true);
    }
    if (label === "Close navigation") closePanels();
    if (label === "Decline" || label === "Accept") setCookiesVisible(false);
    if (label === "Feedback") {
      returnFocus.current = button;
      setNavigationOpen(false);
      setFeedbackOpen(true);
    }
    if (label.startsWith("Add ") || label.startsWith("Remove ")) {
      const name = label.replace(/^(Add|Remove) /, "").replace(/ (to|from) favorites$/, "");
      setFavorites((old) => (old.includes(name) ? old.filter((n) => n !== name) : [...old, name]));
    }
    if (button.getAttribute("role") === "menuitem") {
      const id = button.closest("article")?.id || "portfolio-collage";
      const tool = (button.getAttribute("title") || "").replace("Copy section for ", "");
      void copySectionPrompt(id, tool)
        .then(() => {
          setOpenMenu0(null);
          setCopied(`Prompt copied for ${tool}`);
          window.setTimeout(() => setCopied(null), 3000);
        })
        .catch(() => setCopied("Could not copy. Please try again."));
    }
    if (label.startsWith("Preview ") || label.includes("Try Lumenis free")) {
      const card = button.closest("article");
      const image = card?.querySelector("img");
      const name = label.includes("Try Lumenis free") ? "Lumenis" : label.replace("Preview ", "");
      const lumenis = document.querySelector<HTMLImageElement>(
        'img[alt="Lumenis template preview"]',
      );
      returnFocus.current = button;
      setPreviewSize("Desktop");
      setPreview({
        name,
        image: image?.getAttribute("src") || lumenis?.getAttribute("src") || "",
        section: !!card?.id,
        id: card?.id || name.toLowerCase(),
      });
    }
  };
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
      <div onClick={handleControl} className="flex min-h-screen">
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
            aria-expanded={navigationOpen}
            aria-controls="phone-navigation"
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
        {navigationOpen && (
          <div className="supply-navigation-backdrop">
            <button
              type="button"
              aria-label="Close navigation"
              className="supply-navigation-dismiss"
            />
          </div>
        )}
        <ImportedAside navigationOpen={navigationOpen} />
        <div className="flex min-w-0 flex-1 flex-col pb-24 lg:pb-0 lg:pl-[var(--sidebar-w)]">
          <main className="min-w-0 flex-1" id="main">
            <div className={"\x73pace-y-16 px-4 pb-20 pt-[72px] sm:px-6 lg:px-8 lg:pt-8"}>
              <ImportedSectionPremiumWebsiteTemplatesReady />
              <ImportedSectionFreeAndAIReady />
              <ImportedSectionWebflowPicksHandSelected />
              <section aria-labelledby="home-sections">
                <div className="mb-5 flex flex-wrap items-end justify-between gap-x-6 gap-y-3 px-1">
                  <div>
                    <div
                      className={
                        "label flex items-center gap-2 \x74ext-[\x76ar(\x2d-text-secondary)]"
                      }
                    >
                      <span
                        className={
                          "rounded-full \x62g-[#\x657f5e1] px-1.5 py-px text-[9.5px] font-semibold \x74ext-[#\x31f5a33]"
                        }
                      >
                        FREE
                      </span>{" "}
                      Sections
                    </div>
                    <h2
                      className={
                        "mt-2 \x66ont-[\x66amily-name:\x76ar(\x2d-font-heading)] text-[24px] font-medium leading-[1.1] tracking-tight \x73m:\x74ext-[\x328px]"
                      }
                      id="home-sections"
                    >
                      <span className={"\x74ext-[\x76ar(\x2d-text)]"}>Free sections,</span>{" "}
                      <span className={"\x74ext-[\x76ar(\x2d-text-tertiary)]"}>
                        ready to paste into Claude.
                      </span>
                    </h2>
                  </div>
                  <a className="os-btn-white" href="/sections?price=free">
                    All free sections{" "}
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
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </a>
                </div>
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  <article
                    className={
                      "relative flex flex-col \x68as-[[\x61ria-expanded=\x74rue]]:\x7a-30 rounded-[20px] \x62order \x62order-[\x76ar(\x2d-line)] bg-white p-2 \x73hadow-[\x76ar(\x2d-shadow-raised)]"
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
                              "\x61nimate-fade-in absolute right-0 z-[70] w-[248px] rounded-[12px] \x62order \x62order-[\x76ar(\x2d-line)] bg-white p-2 \x74ext-[\x76ar(\x2d-text)] \x73hadow-[\x30_18px_48px_rgba(\x30,\x30,\x30,\x30.\x316)] top-[calc(100%+8px)]"
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
                                  src="/site-assets/be6b42e1c3e9dbc4-0a117f6ebf8d64db0cccb3cbba727dac.png"
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
                              "\x61nimate-fade-in absolute right-0 z-[70] w-[248px] rounded-[12px] \x62order \x62order-[\x76ar(\x2d-line)] bg-white p-2 \x74ext-[\x76ar(\x2d-text)] \x73hadow-[\x30_18px_48px_rgba(\x30,\x30,\x30,\x30.\x316)] top-[calc(100%+8px)]"
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
                                  src="/site-assets/be6b42e1c3e9dbc4-0a117f6ebf8d64db0cccb3cbba727dac.png"
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
                              "\x61nimate-fade-in absolute right-0 z-[70] w-[248px] rounded-[12px] \x62order \x62order-[\x76ar(\x2d-line)] bg-white p-2 \x74ext-[\x76ar(\x2d-text)] \x73hadow-[\x30_18px_48px_rgba(\x30,\x30,\x30,\x30.\x316)] top-[calc(100%+8px)]"
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
                                  src="/site-assets/be6b42e1c3e9dbc4-0a117f6ebf8d64db0cccb3cbba727dac.png"
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
                                  src="/site-assets/be6b42e1c3e9dbc4-0a117f6ebf8d64db0cccb3cbba727dac.png"
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
                </div>
              </section>
              <ImportedSectionFramerTemplatesReadyTo />
              <p
                className={
                  "-mt-8 px-1 text-center text-[13px] \x74ext-[\x76ar(\x2d-text-tertiary)]"
                }
              >
                Looking for something specific?{" "}
                <a
                  className={
                    "\x74ext-[\x76ar(\x2d-text-secondary)] underline \x75nderline-offset-4 \x68over:\x74ext-[\x76ar(\x2d-text)]"
                  }
                  href="/templates"
                >
                  Browse the full template index
                </a>
              </p>
              <section className="os-dark overflow-hidden !rounded-[var(--r-shell)] px-6 py-12 sm:px-10">
                <div className="flex flex-wrap items-end justify-between gap-6">
                  <div>
                    <h2
                      className={
                        "max-w-lg \x66ont-[\x66amily-name:\x76ar(\x2d-font-heading)] text-[28px] font-medium leading-[1.1] tracking-tight \x73m:\x74ext-[\x336px]"
                      }
                    >
                      <span className={"\x74ext-white/\x345"}>One membership,</span>{" "}
                      <span className="text-white">the whole catalog.</span>
                    </h2>
                    <p className={"mt-3 max-w-md text-[14px] leading-relaxed \x74ext-white/\x360"}>
                      Monthly credits or lifetime access. Everything you unlock stays yours.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <a
                      className={
                        "os-button relative inline-flex select-none items-center justify-center gap-2 rounded-full font-medium transition-[transform,box-shadow,filter,background-color] duration-150 ease-out \x64isabled:\x63ursor-not-allowed disabled:opacity-45 h-12 px-6 text-[14px] \x74ext-[\x76ar(\x2d-text)]"
                      }
                      style={
                        {
                          backgroundImage:
                            "linear-gradient(rgb(255, 255, 255) 0%, rgb(248, 248, 247) 55%, rgb(239, 239, 238) 100%)",
                          boxShadow:
                            "rgb(255, 255, 255) 0px 1px 0px inset, rgba(0, 0, 0, 0.05) 0px -1px 0px inset, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px, rgba(0, 0, 0, 0.08) 0px 1px 2px, rgba(0, 0, 0, 0.28) 0px 8px 18px -10px",
                        } as CSSProperties
                      }
                      href="/pricing"
                    >
                      See plans
                    </a>
                    <a
                      className={
                        "os-button relative inline-flex select-none items-center justify-center gap-2 rounded-full font-medium transition-[transform,box-shadow,filter,background-color] duration-150 ease-out \x64isabled:\x63ursor-not-allowed disabled:opacity-45 h-12 px-6 text-[14px] \x74ext-white/\x390"
                      }
                      style={{
                        background: "rgba(255, 255, 255, 0.07)",
                        boxShadow:
                          "rgba(255, 255, 255, 0.1) 0px 1px 0px inset, rgba(255, 255, 255, 0.12) 0px 0px 0px 1px",
                      }}
                      href="/?collection=all"
                    >
                      <HomeBrowseTemplatesLinkLabel />
                    </a>
                  </div>
                </div>
              </section>
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
        hidden={!cookiesVisible}
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
            onClick={() => setCookiesVisible(false)}
          >
            Decline
          </button>
          <button
            className={"os-btn-dark \x6dax-sm:!\x68-9 \x6dax-sm:!\x74ext-[\x313px]"}
            type="button"
            onClick={() => setCookiesVisible(false)}
          >
            Accept
          </button>
        </div>
      </div>
      {(preview || feedbackOpen) && (
        <div
          className="supply-popup-backdrop"
          onClick={(event) => {
            if (event.target === event.currentTarget) closePanels();
          }}
        >
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label={preview ? `${preview.name} preview` : "Feedback"}
            className={preview ? "os-shell supply-preview-panel" : "os-shell supply-feedback-panel"}
          >
            <button
              type="button"
              className="os-btn-white supply-popup-close"
              aria-label={preview ? "Close preview" : "Close feedback"}
              onClick={closePanels}
            >
              ×
            </button>
            {preview ? (
              <>
                <header className="supply-preview-header">
                  <strong>{preview.name}</strong>
                  <div className="supply-preview-sizes" role="group" aria-label="Preview size">
                    {["Desktop", "Tablet", "Mobile"].map((size) => (
                      <button
                        key={size}
                        type="button"
                        className="os-btn-white"
                        aria-pressed={previewSize === size}
                        onClick={() => setPreviewSize(size)}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                  <a
                    className="os-btn-dark"
                    href={
                      "/signin?next=" +
                      encodeURIComponent("/?" + (preview.section ? "section=" : "t=") + preview.id)
                    }
                  >
                    {preview.section ? "Sign in to copy — free" : "Sign up to unlock"}
                  </a>
                </header>
                <div className="supply-preview-content" data-size={previewSize}>
                  {SECTION_PREVIEWS.includes(preview.id) ? (
                    <iframe
                      key={preview.id}
                      src={`/section-previews/${preview.id}/index.html`}
                      title={`${preview.name} live preview`}
                      sandbox="allow-scripts"
                      style={{
                        display: "block",
                        width: "100%",
                        maxWidth:
                          previewSize === "Mobile" ? 390 : previewSize === "Tablet" ? 768 : 1440,
                        height: "100%",
                        minHeight: "60vh",
                        margin: "0 auto",
                        border: 0,
                        background: "#fff",
                      }}
                    />
                  ) : (
                    <>
                      <img src={preview.image} alt={`${preview.name} preview`} />
                      {!preview.section && (
                        <a
                          className="os-btn-white"
                          style={{ position: "absolute", top: 16, right: 16 }}
                          href={`/templates/${preview.id}`}
                        >
                          View details
                        </a>
                      )}
                      {TEMPLATE_DEMOS.includes(preview.id) && (
                        <a
                          className="os-btn-dark"
                          style={{
                            position: "absolute",
                            bottom: 16,
                            left: "50%",
                            transform: "translateX(-50%)",
                          }}
                          href={`https://ovo-${preview.id}.webflow.io/`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Open live demo ↗
                        </a>
                      )}
                    </>
                  )}
                </div>
                <footer className="supply-preview-footer">
                  {preview.section
                    ? "Sign in to copy this section for free. No plan needed."
                    : "Template details"}
                </footer>
              </>
            ) : (
              <>
                {feedbackSent ? (
                  <>
                    <p className="label">Feedback</p>
                    <h2 className="supply-feedback-title">Thanks for your feedback!</h2>
                    <button
                      type="button"
                      className="os-btn-dark supply-feedback-submit"
                      onClick={closePanels}
                    >
                      Close
                    </button>
                  </>
                ) : (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      const msg = (
                        e.currentTarget.elements.namedItem("message") as HTMLTextAreaElement
                      ).value.trim();
                      if (!rating) return;
                      try {
                        const all = JSON.parse(localStorage.getItem("supply-feedback") || "[]");
                        all.push({ rating, msg, at: Date.now() });
                        localStorage.setItem("supply-feedback", JSON.stringify(all));
                      } catch {
                        /* ignore */
                      }
                      setFeedbackSent(true);
                    }}
                  >
                    <p className="label">Feedback</p>
                    <h2 className="supply-feedback-title">Are you happy with Supply?</h2>
                    <div
                      className="os-inset supply-feedback-ratings"
                      role="radiogroup"
                      aria-label="How do you feel?"
                    >
                      {["Not great", "It's okay", "Love it"].map((value, index) => (
                        <button
                          type="button"
                          className="os-btn-white"
                          role="radio"
                          aria-checked={rating === value}
                          key={value}
                          onClick={() => setRating(value)}
                        >
                          <span>{["☹", "◯", "☺"][index]}</span>
                          {value}
                        </button>
                      ))}
                    </div>
                    <label className="sr-only" htmlFor="feedback-message">
                      Tell us more (optional)
                    </label>
                    <textarea
                      className="os-inset supply-feedback-message"
                      id="feedback-message"
                      name="message"
                      rows={3}
                      maxLength={2000}
                      placeholder="Tell us more — what would make it better? (optional)"
                    />
                    <button
                      type="submit"
                      className="os-btn-dark supply-feedback-submit"
                      disabled={!rating}
                    >
                      {rating ? "Send feedback" : "Pick a face to continue"}
                    </button>
                  </form>
                )}
              </>
            )}
          </div>
        </div>
      )}
      {copied && (
        <div
          role="status"
          style={{
            position: "fixed",
            bottom: 24,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 100,
            background: "#111",
            color: "#fff",
            padding: "10px 16px",
            borderRadius: 999,
            fontSize: 13,
          }}
        >
          {copied}
        </div>
      )}
    </>
  );
}

function ImportedAside({ navigationOpen }: { navigationOpen: boolean }) {
  return (
    <aside
      id="phone-navigation"
      data-mobile-open={navigationOpen}
      className={
        "fixed \x69nset-y-0 left-0 z-20 hidden w-[var(--sidebar-w)] py-3 pl-3 \x6cg:\x62lock"
      }
    >
      <div className="os-shell h-full overflow-hidden">
        <div className="flex h-full flex-col">
          <div className="relative flex h-14 items-center gap-2 px-5">
            {navigationOpen && (
              <button
                type="button"
                className="supply-navigation-close"
                aria-label="Close navigation"
              >
                ×
              </button>
            )}
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
                "group mx-2 flex items-center gap-2.5 rounded-[12px] px-2.5 py-[7px] text-[13px] transition-[background-color,color,box-shadow] duration-150 \x62g-gradient-to-b \x66rom-white \x74o-[#\x667f7f6] font-medium \x74ext-[\x76ar(\x2d-text)] \x73hadow-[\x76ar(\x2d-shadow-raised)]"
              }
              aria-current="page"
              href="/"
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

function ImportedSectionPremiumWebsiteTemplatesReady() {
  return (
    <section className="os-shell p-2">
      <div className="os-inset relative grid items-center gap-8 overflow-hidden px-6 py-10 sm:px-10 sm:py-14 lg:grid-cols-[1.05fr_1fr]">
        <div className="relative z-10">
          <div className="os-chip text-[10.5px] uppercase tracking-[0.06em]">
            <span className="os-dot" />
            For Claude, Cursor, v0 &amp; more
          </div>
          <h1
            className={
              "mt-5 max-w-xl \x66ont-[\x66amily-name:\x76ar(\x2d-font-heading)] text-[36px] font-medium leading-[1.04] tracking-tight \x73m:\x74ext-[\x352px]"
            }
          >
            <span className={"\x74ext-[\x76ar(\x2d-text-tertiary)]"}>
              Premium website templates,
            </span>{" "}
            <span className={"\x74ext-[\x76ar(\x2d-text)]"}>ready for Claude.</span>
          </h1>
          <HomeHeroCatalogParagraph />
          <div
            className={
              "mt-7 flex flex-col gap-3 \x73m:\x66lex-row \x73m:\x66lex-wrap \x73m:\x69tems-center"
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
              href="/?collection=all"
            >
              Browse all templates
            </a>
            <a
              className={
                "os-button relative inline-flex select-none items-center justify-center gap-2 rounded-full font-medium transition-[transform,box-shadow,filter,background-color] duration-150 ease-out \x64isabled:\x63ursor-not-allowed disabled:opacity-45 h-12 px-6 text-[14px] \x74ext-[\x76ar(\x2d-text)] w-full sm:w-auto"
              }
              style={
                {
                  backgroundImage:
                    "linear-gradient(rgb(255, 255, 255) 0%, rgb(248, 248, 247) 55%, rgb(239, 239, 238) 100%)",
                  boxShadow:
                    "rgb(255, 255, 255) 0px 1px 0px inset, rgba(0, 0, 0, 0.05) 0px -1px 0px inset, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px, rgba(0, 0, 0, 0.08) 0px 1px 2px, rgba(0, 0, 0, 0.28) 0px 8px 18px -10px",
                } as CSSProperties
              }
              href="/sections?price=free"
            >
              Get free sections
            </a>
          </div>
        </div>
        <div className={"relative hidden h-[300px] \x6cg:\x62lock"} aria-hidden="true">
          <div
            className={
              "absolute left-1/2 top-1/2 aspect-[16/10] w-[78%] overflow-hidden rounded-[16px] \x62g-[\x76ar(\x2d-surface-sunken)] \x73hadow-[\x30_0_0_1px_rgba(\x30,\x30,\x30,\x30.\x306),\x30_24px_48px_-20px_rgba(\x30,\x30,\x30,\x30.\x345)]"
            }
            style={{
              transform: "translate(-50%, -50%) translate(-34px, 18px) rotate(-5deg)",
              zIndex: "2",
            }}
            data-site-import-responsive="113"
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
              src="/site-assets/99635933ce7a7ab4.webp"
            />
          </div>
          <div
            className={
              "absolute left-1/2 top-1/2 aspect-[16/10] w-[78%] overflow-hidden rounded-[16px] \x62g-[\x76ar(\x2d-surface-sunken)] \x73hadow-[\x30_0_0_1px_rgba(\x30,\x30,\x30,\x30.\x306),\x30_24px_48px_-20px_rgba(\x30,\x30,\x30,\x30.\x345)]"
            }
            style={{
              transform: "translate(-50%, -50%) translate(0px, 0px) rotate(0deg)",
              zIndex: "3",
            }}
            data-site-import-responsive="115"
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
              width="640"
              height="400"
              src="/site-assets/b20b3900aa8e76f7.jpg"
            />
          </div>
          <div
            className={
              "absolute left-1/2 top-1/2 aspect-[16/10] w-[78%] overflow-hidden rounded-[16px] \x62g-[\x76ar(\x2d-surface-sunken)] \x73hadow-[\x30_0_0_1px_rgba(\x30,\x30,\x30,\x30.\x306),\x30_24px_48px_-20px_rgba(\x30,\x30,\x30,\x30.\x345)]"
            }
            style={{
              transform: "translate(-50%, -50%) translate(34px, -18px) rotate(5deg)",
              zIndex: "1",
            }}
            data-site-import-responsive="117"
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
          </div>
        </div>
      </div>
    </section>
  );
}

function ImportedSectionFreeAndAIReady() {
  return (
    <section className="-mt-8 grid gap-3 sm:grid-cols-3" aria-label="Free and AI-ready">
      <a
        className={
          "os-shell group flex flex-col p-5 transition-transform duration-200 \x68over:\x2dtranslate-y-0.\x35"
        }
        href="/sections?price=free"
      >
        <span
          className={
            "flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.08em] \x74ext-[#\x31f5a33]"
          }
        >
          <span className={"rounded-full \x62g-[#\x657f5e1] px-2 py-0.5"}>Free</span>
        </span>
        <span className={"mt-3 text-[16px] font-medium \x74ext-[\x76ar(\x2d-text)]"}>
          <HomeFreeSectionsChip />
        </span>
        <span className={"mt-1 text-[13px] leading-relaxed \x74ext-[\x76ar(\x2d-text-secondary)]"}>
          Paste them into Claude Code, Cursor or v0. Sign in, no card, no plan.
        </span>
        <span
          className={
            "mt-auto flex items-center gap-1 pt-4 text-[12.5px] font-medium \x74ext-[\x76ar(\x2d-text)]"
          }
        >
          Get free sections{" "}
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
        </span>
      </a>
      <button
        className={
          "os-shell group flex flex-col p-5 text-left transition-transform duration-200 \x68over:\x2dtranslate-y-0.\x35"
        }
        type="button"
      >
        <span
          className={
            "flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.08em] \x74ext-[#\x31f5a33]"
          }
        >
          <span className={"rounded-full \x62g-[#\x657f5e1] px-2 py-0.5"}>Free</span>
          <span className={"\x74ext-[\x76ar(\x2d-text-tertiary)]"}>Full template prompt</span>
        </span>
        <span className={"mt-3 text-[16px] font-medium \x74ext-[\x76ar(\x2d-text)]"}>
          Try Lumenis free
        </span>
        <span className={"mt-1 text-[13px] leading-relaxed \x74ext-[\x76ar(\x2d-text-secondary)]"}>
          Copy the complete Lumenis template prompt into your AI tool and see what it builds. Free
          after sign-in.
        </span>
        <span
          className={
            "mt-auto flex items-center gap-1 pt-4 text-[12.5px] font-medium \x74ext-[\x76ar(\x2d-text)]"
          }
        >
          Preview Lumenis{" "}
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
        </span>
      </button>
      <a
        className={
          "os-shell group flex flex-col p-5 transition-transform duration-200 \x68over:\x2dtranslate-y-0.\x35"
        }
        href={"/?collection=all&ai=1"}
      >
        <span
          className={
            "flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.08em] \x74ext-[#\x35b44c7]"
          }
        >
          <span className={"rounded-full \x62g-[#\x65feafe] px-2 py-0.5"}>AI-ready</span>
        </span>
        <span className={"mt-3 text-[16px] font-medium \x74ext-[\x76ar(\x2d-text)]"}>
          18 templates with full AI prompts
        </span>
        <span className={"mt-1 text-[13px] leading-relaxed \x74ext-[\x76ar(\x2d-text-secondary)]"}>
          Unlock one and copy the whole build into Claude. More on the way.
        </span>
        <span
          className={
            "mt-auto flex items-center gap-1 pt-4 text-[12.5px] font-medium \x74ext-[\x76ar(\x2d-text)]"
          }
        >
          See AI-ready templates{" "}
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
        </span>
      </a>
    </section>
  );
}

function ImportedSectionWebflowPicksHandSelected() {
  return (
    <section aria-labelledby="home-webflow">
      <div className="mb-5 flex flex-wrap items-end justify-between gap-x-6 gap-y-3 px-1">
        <div>
          <div className={"label flex items-center gap-2 \x74ext-[\x76ar(\x2d-text-secondary)]"}>
            <svg width="14.625" height="9" viewBox="0 0 26 16" fill="none" aria-hidden="true">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M25.65 0L17.4654 16H9.77778L13.203 9.36892H13.0493C10.2235 13.0372 6.00738 15.452 0 16V9.46068C0 9.46068 3.84306 9.23369 6.10229 6.85844H0V0.000126383H6.85832V5.64099L7.01225 5.64036L9.8148 0.000126383H15.0016V5.60523L15.1555 5.60497L18.0632 0H25.65Z"
                fill="currentColor"
              />
            </svg>{" "}
            Webflow
          </div>
          <h2
            className={
              "mt-2 \x66ont-[\x66amily-name:\x76ar(\x2d-font-heading)] text-[24px] font-medium leading-[1.1] tracking-tight \x73m:\x74ext-[\x328px]"
            }
            id="home-webflow"
          >
            <span className={"\x74ext-[\x76ar(\x2d-text)]"}>Webflow picks,</span>{" "}
            <span className={"\x74ext-[\x76ar(\x2d-text-tertiary)]"}>
              hand-selected by Substrates.
            </span>
          </h2>
        </div>
        <a className="os-btn-white" href="/?platform=webflow">
          All Webflow{" "}
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
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </a>
      </div>
      <ul className="grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2 xl:grid-cols-3">
        <li>
          <article className="os-card aspect-[16/10] w-full">
            <button
              className={
                "os-preview-trigger absolute inset-0 block h-full w-full cursor-pointer overflow-hidden text-left \x6futline-none"
              }
              type="button"
              aria-label="Preview Stillpoint"
            >
              <img
                className={"os-preview-img object-cover \x6fbject-top"}
                style={{
                  position: "absolute",
                  height: "100%",
                  width: "100%",
                  inset: "0px",
                  color: "transparent",
                }}
                alt="Stillpoint template preview"
                loading="lazy"
                decoding="async"
                src="/site-assets/5ee6ef4b5d3a5a80.webp"
              />
            </button>
            <div className="os-blur" aria-hidden="true">
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>
            <div className="pointer-events-none absolute left-3 top-3 z-[2] flex flex-wrap gap-1.5">
              <span className="os-glass-tag">
                <svg
                  width="11"
                  height="11"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18" />
                </svg>{" "}
                AI-ready
              </span>
            </div>
            <div className="os-card-bar flex items-end justify-between gap-3 px-4 pb-3.5">
              <div className="min-w-0">
                <h3 className="os-card-title truncate text-[14px] font-medium leading-tight text-white">
                  Stillpoint
                </h3>
                <p className={"mt-1 truncate text-[11.5px] leading-tight \x74ext-white/\x365"}>
                  Therapy &amp; Psychology
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-2.5">
                <div className="relative flex items-center justify-end">
                  <div className={"os-card-formats flex items-center gap-2 \x74ext-white/\x385"}>
                    <span
                      className="flex items-center"
                      title="Webflow"
                      role="img"
                      aria-label="Webflow"
                    >
                      <svg
                        width="17.875"
                        height="11"
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
                  </div>
                  <span
                    className={
                      "os-card-cta absolute right-0 flex h-7 items-center gap-1 whitespace-nowrap rounded-full \x62g-white/\x395 pl-3 pr-2.5 text-[11.5px] font-medium \x74ext-[\x76ar(\x2d-text)] \x73hadow-[\x30_4px_12px_-4px_rgba(\x30,\x30,\x30,\x30.\x34),\x69nset_0_1px_0_#\x66ff]"
                    }
                    aria-hidden="true"
                  >
                    Preview
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
                  </span>
                </div>
                <button
                  className={
                    "relative inline-flex items-center justify-center transition-colors \x74ext-white/\x385 hover:text-white os-interactive -m-1.5 p-1.5 \x64rop-shadow-[\x30_1px_2px_rgba(\x30,\x30,\x30,\x30.\x335)]"
                  }
                  type="button"
                  aria-label="Add Stillpoint to favorites"
                  aria-pressed="false"
                  title="Favorites are saved to your account"
                >
                  <span>
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
                      <path d="M12 20s-7-4.4-7-9.2A4 4 0 0 1 12 8a4 4 0 0 1 7 2.8C19 15.6 12 20 12 20Z" />
                    </svg>
                  </span>
                </button>
              </div>
            </div>
          </article>
        </li>
        <li>
          <article className="os-card aspect-[16/10] w-full">
            <button
              className={
                "os-preview-trigger absolute inset-0 block h-full w-full cursor-pointer overflow-hidden text-left \x6futline-none"
              }
              type="button"
              aria-label="Preview Evergrid"
            >
              <img
                className={"os-preview-img object-cover \x6fbject-top"}
                style={{
                  position: "absolute",
                  height: "100%",
                  width: "100%",
                  inset: "0px",
                  color: "transparent",
                }}
                alt="Evergrid template preview"
                loading="lazy"
                decoding="async"
                src="/site-assets/84cb0b3d02e2b143.webp"
              />
            </button>
            <div className="os-blur" aria-hidden="true">
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>
            <div className="pointer-events-none absolute left-3 top-3 z-[2] flex flex-wrap gap-1.5">
              <span className="os-glass-tag">
                <svg
                  width="11"
                  height="11"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18" />
                </svg>{" "}
                AI-ready
              </span>
            </div>
            <div className="os-card-bar flex items-end justify-between gap-3 px-4 pb-3.5">
              <div className="min-w-0">
                <h3 className="os-card-title truncate text-[14px] font-medium leading-tight text-white">
                  Evergrid
                </h3>
                <p className={"mt-1 truncate text-[11.5px] leading-tight \x74ext-white/\x365"}>
                  Software &amp; SaaS
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-2.5">
                <div className="relative flex items-center justify-end">
                  <div className={"os-card-formats flex items-center gap-2 \x74ext-white/\x385"}>
                    <span
                      className="flex items-center"
                      title="Webflow"
                      role="img"
                      aria-label="Webflow"
                    >
                      <svg
                        width="17.875"
                        height="11"
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
                  </div>
                  <span
                    className={
                      "os-card-cta absolute right-0 flex h-7 items-center gap-1 whitespace-nowrap rounded-full \x62g-white/\x395 pl-3 pr-2.5 text-[11.5px] font-medium \x74ext-[\x76ar(\x2d-text)] \x73hadow-[\x30_4px_12px_-4px_rgba(\x30,\x30,\x30,\x30.\x34),\x69nset_0_1px_0_#\x66ff]"
                    }
                    aria-hidden="true"
                  >
                    Preview
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
                  </span>
                </div>
                <button
                  className={
                    "relative inline-flex items-center justify-center transition-colors \x74ext-white/\x385 hover:text-white os-interactive -m-1.5 p-1.5 \x64rop-shadow-[\x30_1px_2px_rgba(\x30,\x30,\x30,\x30.\x335)]"
                  }
                  type="button"
                  aria-label="Add Evergrid to favorites"
                  aria-pressed="false"
                  title="Favorites are saved to your account"
                >
                  <span>
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
                      <path d="M12 20s-7-4.4-7-9.2A4 4 0 0 1 12 8a4 4 0 0 1 7 2.8C19 15.6 12 20 12 20Z" />
                    </svg>
                  </span>
                </button>
              </div>
            </div>
          </article>
        </li>
        <li>
          <article className="os-card aspect-[16/10] w-full">
            <button
              className={
                "os-preview-trigger absolute inset-0 block h-full w-full cursor-pointer overflow-hidden text-left \x6futline-none"
              }
              type="button"
              aria-label="Preview Protocol"
            >
              <img
                className={"os-preview-img object-cover \x6fbject-top"}
                style={{
                  position: "absolute",
                  height: "100%",
                  width: "100%",
                  inset: "0px",
                  color: "transparent",
                }}
                alt="Protocol template preview"
                loading="lazy"
                decoding="async"
                src="/site-assets/614d6ffd42b218df.webp"
              />
            </button>
            <div className="os-blur" aria-hidden="true">
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>
            <div className="pointer-events-none absolute left-3 top-3 z-[2] flex flex-wrap gap-1.5">
              <span className="os-glass-tag">
                <svg
                  width="11"
                  height="11"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18" />
                </svg>{" "}
                AI-ready
              </span>
            </div>
            <div className="os-card-bar flex items-end justify-between gap-3 px-4 pb-3.5">
              <div className="min-w-0">
                <h3 className="os-card-title truncate text-[14px] font-medium leading-tight text-white">
                  Protocol
                </h3>
                <p className={"mt-1 truncate text-[11.5px] leading-tight \x74ext-white/\x365"}>
                  Business &amp; Finance Blog
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-2.5">
                <div className="relative flex items-center justify-end">
                  <div className={"os-card-formats flex items-center gap-2 \x74ext-white/\x385"}>
                    <span
                      className="flex items-center"
                      title="Webflow"
                      role="img"
                      aria-label="Webflow"
                    >
                      <svg
                        width="17.875"
                        height="11"
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
                  </div>
                  <span
                    className={
                      "os-card-cta absolute right-0 flex h-7 items-center gap-1 whitespace-nowrap rounded-full \x62g-white/\x395 pl-3 pr-2.5 text-[11.5px] font-medium \x74ext-[\x76ar(\x2d-text)] \x73hadow-[\x30_4px_12px_-4px_rgba(\x30,\x30,\x30,\x30.\x34),\x69nset_0_1px_0_#\x66ff]"
                    }
                    aria-hidden="true"
                  >
                    Preview
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
                  </span>
                </div>
                <button
                  className={
                    "relative inline-flex items-center justify-center transition-colors \x74ext-white/\x385 hover:text-white os-interactive -m-1.5 p-1.5 \x64rop-shadow-[\x30_1px_2px_rgba(\x30,\x30,\x30,\x30.\x335)]"
                  }
                  type="button"
                  aria-label="Add Protocol to favorites"
                  aria-pressed="false"
                  title="Favorites are saved to your account"
                >
                  <span>
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
                      <path d="M12 20s-7-4.4-7-9.2A4 4 0 0 1 12 8a4 4 0 0 1 7 2.8C19 15.6 12 20 12 20Z" />
                    </svg>
                  </span>
                </button>
              </div>
            </div>
          </article>
        </li>
        <li>
          <article className="os-card aspect-[16/10] w-full">
            <button
              className={
                "os-preview-trigger absolute inset-0 block h-full w-full cursor-pointer overflow-hidden text-left \x6futline-none"
              }
              type="button"
              aria-label="Preview Lumenis"
            >
              <img
                className={"os-preview-img object-cover \x6fbject-top"}
                style={{
                  position: "absolute",
                  height: "100%",
                  width: "100%",
                  inset: "0px",
                  color: "transparent",
                }}
                alt="Lumenis template preview"
                loading="lazy"
                decoding="async"
                src="/site-assets/40f9a83ab363d229.webp"
              />
            </button>
            <div className="os-blur" aria-hidden="true">
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>
            <div className="pointer-events-none absolute left-3 top-3 z-[2] flex flex-wrap gap-1.5">
              <span className={"os-glass-tag \x74ext-[#\x31f5a33]"}>
                <svg
                  width="11"
                  height="11"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18" />
                </svg>{" "}
                Free AI prompt
              </span>
            </div>
            <div className="os-card-bar flex items-end justify-between gap-3 px-4 pb-3.5">
              <div className="min-w-0">
                <h3 className="os-card-title truncate text-[14px] font-medium leading-tight text-white">
                  Lumenis
                </h3>
                <p className={"mt-1 truncate text-[11.5px] leading-tight \x74ext-white/\x365"}>
                  Design Portfolio
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-2.5">
                <div className="relative flex items-center justify-end">
                  <div className={"os-card-formats flex items-center gap-2 \x74ext-white/\x385"}>
                    <span
                      className="flex items-center"
                      title="Webflow"
                      role="img"
                      aria-label="Webflow"
                    >
                      <svg
                        width="17.875"
                        height="11"
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
                  </div>
                  <span
                    className={
                      "os-card-cta absolute right-0 flex h-7 items-center gap-1 whitespace-nowrap rounded-full \x62g-white/\x395 pl-3 pr-2.5 text-[11.5px] font-medium \x74ext-[\x76ar(\x2d-text)] \x73hadow-[\x30_4px_12px_-4px_rgba(\x30,\x30,\x30,\x30.\x34),\x69nset_0_1px_0_#\x66ff]"
                    }
                    aria-hidden="true"
                  >
                    Preview
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
                  </span>
                </div>
                <button
                  className={
                    "relative inline-flex items-center justify-center transition-colors \x74ext-white/\x385 hover:text-white os-interactive -m-1.5 p-1.5 \x64rop-shadow-[\x30_1px_2px_rgba(\x30,\x30,\x30,\x30.\x335)]"
                  }
                  type="button"
                  aria-label="Add Lumenis to favorites"
                  aria-pressed="false"
                  title="Favorites are saved to your account"
                >
                  <span>
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
                      <path d="M12 20s-7-4.4-7-9.2A4 4 0 0 1 12 8a4 4 0 0 1 7 2.8C19 15.6 12 20 12 20Z" />
                    </svg>
                  </span>
                </button>
              </div>
            </div>
          </article>
        </li>
        <li>
          <article className="os-card aspect-[16/10] w-full">
            <button
              className={
                "os-preview-trigger absolute inset-0 block h-full w-full cursor-pointer overflow-hidden text-left \x6futline-none"
              }
              type="button"
              aria-label="Preview Legion"
            >
              <img
                className={"os-preview-img object-cover \x6fbject-top"}
                style={{
                  position: "absolute",
                  height: "100%",
                  width: "100%",
                  inset: "0px",
                  color: "transparent",
                }}
                alt="Legion template preview"
                loading="lazy"
                decoding="async"
                src="/site-assets/83c347b4a7b2d1dc.webp"
              />
            </button>
            <div className="os-blur" aria-hidden="true">
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>
            <div className="pointer-events-none absolute left-3 top-3 z-[2] flex flex-wrap gap-1.5">
              <span className="os-glass-tag">
                <svg
                  width="11"
                  height="11"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18" />
                </svg>{" "}
                AI-ready
              </span>
            </div>
            <div className="os-card-bar flex items-end justify-between gap-3 px-4 pb-3.5">
              <div className="min-w-0">
                <h3 className="os-card-title truncate text-[14px] font-medium leading-tight text-white">
                  Legion
                </h3>
                <p className={"mt-1 truncate text-[11.5px] leading-tight \x74ext-white/\x365"}>
                  Photography &amp; Video Portfolio
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-2.5">
                <div className="relative flex items-center justify-end">
                  <div className={"os-card-formats flex items-center gap-2 \x74ext-white/\x385"}>
                    <span
                      className="flex items-center"
                      title="Webflow"
                      role="img"
                      aria-label="Webflow"
                    >
                      <svg
                        width="17.875"
                        height="11"
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
                  </div>
                  <span
                    className={
                      "os-card-cta absolute right-0 flex h-7 items-center gap-1 whitespace-nowrap rounded-full \x62g-white/\x395 pl-3 pr-2.5 text-[11.5px] font-medium \x74ext-[\x76ar(\x2d-text)] \x73hadow-[\x30_4px_12px_-4px_rgba(\x30,\x30,\x30,\x30.\x34),\x69nset_0_1px_0_#\x66ff]"
                    }
                    aria-hidden="true"
                  >
                    Preview
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
                  </span>
                </div>
                <button
                  className={
                    "relative inline-flex items-center justify-center transition-colors \x74ext-white/\x385 hover:text-white os-interactive -m-1.5 p-1.5 \x64rop-shadow-[\x30_1px_2px_rgba(\x30,\x30,\x30,\x30.\x335)]"
                  }
                  type="button"
                  aria-label="Add Legion to favorites"
                  aria-pressed="false"
                  title="Favorites are saved to your account"
                >
                  <span>
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
                      <path d="M12 20s-7-4.4-7-9.2A4 4 0 0 1 12 8a4 4 0 0 1 7 2.8C19 15.6 12 20 12 20Z" />
                    </svg>
                  </span>
                </button>
              </div>
            </div>
          </article>
        </li>
        <li>
          <article className="os-card aspect-[16/10] w-full">
            <button
              className={
                "os-preview-trigger absolute inset-0 block h-full w-full cursor-pointer overflow-hidden text-left \x6futline-none"
              }
              type="button"
              aria-label="Preview Nullify"
            >
              <img
                className={"os-preview-img object-cover \x6fbject-top"}
                style={{
                  position: "absolute",
                  height: "100%",
                  width: "100%",
                  inset: "0px",
                  color: "transparent",
                }}
                alt="Nullify template preview"
                loading="lazy"
                decoding="async"
                src="/site-assets/b7dc577d80dcf8a8.webp"
              />
            </button>
            <div className="os-blur" aria-hidden="true">
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>
            <div className="pointer-events-none absolute left-3 top-3 z-[2] flex flex-wrap gap-1.5">
              <span className="os-glass-tag">
                <svg
                  width="11"
                  height="11"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18" />
                </svg>{" "}
                AI-ready
              </span>
            </div>
            <div className="os-card-bar flex items-end justify-between gap-3 px-4 pb-3.5">
              <div className="min-w-0">
                <h3 className="os-card-title truncate text-[14px] font-medium leading-tight text-white">
                  Nullify
                </h3>
                <p className={"mt-1 truncate text-[11.5px] leading-tight \x74ext-white/\x365"}>
                  Software &amp; SaaS
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-2.5">
                <div className="relative flex items-center justify-end">
                  <div className={"os-card-formats flex items-center gap-2 \x74ext-white/\x385"}>
                    <span
                      className="flex items-center"
                      title="Webflow"
                      role="img"
                      aria-label="Webflow"
                    >
                      <svg
                        width="17.875"
                        height="11"
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
                  </div>
                  <span
                    className={
                      "os-card-cta absolute right-0 flex h-7 items-center gap-1 whitespace-nowrap rounded-full \x62g-white/\x395 pl-3 pr-2.5 text-[11.5px] font-medium \x74ext-[\x76ar(\x2d-text)] \x73hadow-[\x30_4px_12px_-4px_rgba(\x30,\x30,\x30,\x30.\x34),\x69nset_0_1px_0_#\x66ff]"
                    }
                    aria-hidden="true"
                  >
                    Preview
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
                  </span>
                </div>
                <button
                  className={
                    "relative inline-flex items-center justify-center transition-colors \x74ext-white/\x385 hover:text-white os-interactive -m-1.5 p-1.5 \x64rop-shadow-[\x30_1px_2px_rgba(\x30,\x30,\x30,\x30.\x335)]"
                  }
                  type="button"
                  aria-label="Add Nullify to favorites"
                  aria-pressed="false"
                  title="Favorites are saved to your account"
                >
                  <span>
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
                      <path d="M12 20s-7-4.4-7-9.2A4 4 0 0 1 12 8a4 4 0 0 1 7 2.8C19 15.6 12 20 12 20Z" />
                    </svg>
                  </span>
                </button>
              </div>
            </div>
          </article>
        </li>
      </ul>
    </section>
  );
}

function ImportedArticleFlorilegium() {
  return (
    <article
      className={
        "relative flex flex-col \x68as-[[\x61ria-expanded=\x74rue]]:\x7a-30 rounded-[20px] \x62order \x62order-[\x76ar(\x2d-line)] bg-white p-2 \x73hadow-[\x76ar(\x2d-shadow-raised)]"
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

function ImportedSectionFramerTemplatesReadyTo() {
  return (
    <section aria-labelledby="home-framer">
      <div className="mb-5 flex flex-wrap items-end justify-between gap-x-6 gap-y-3 px-1">
        <div>
          <div className={"label flex items-center gap-2 \x74ext-[\x76ar(\x2d-text-secondary)]"}>
            <svg
              width="7.333333333333333"
              height="11"
              viewBox="0 0 192 288"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M 96 192 L 96 288 L 0 192 L 0 96 L 96 96 L 0 0 L 192 0 L 192 96 L 96 96 L 192 192 Z"
                fill="currentColor"
              />
            </svg>{" "}
            Framer
          </div>
          <h2
            className={
              "mt-2 \x66ont-[\x66amily-name:\x76ar(\x2d-font-heading)] text-[24px] font-medium leading-[1.1] tracking-tight \x73m:\x74ext-[\x328px]"
            }
            id="home-framer"
          >
            <span className={"\x74ext-[\x76ar(\x2d-text)]"}>Framer templates,</span>{" "}
            <span className={"\x74ext-[\x76ar(\x2d-text-tertiary)]"}>ready to remix.</span>
          </h2>
        </div>
        <a className="os-btn-white" href="/?platform=framer">
          All Framer{" "}
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
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </a>
      </div>
      <ul className="grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2 xl:grid-cols-3">
        <li>
          <article className="os-card aspect-[16/10] w-full">
            <button
              className={
                "os-preview-trigger absolute inset-0 block h-full w-full cursor-pointer overflow-hidden text-left \x6futline-none"
              }
              type="button"
              aria-label="Preview Cherry"
            >
              <img
                className={"os-preview-img object-cover \x6fbject-top"}
                style={{
                  position: "absolute",
                  height: "100%",
                  width: "100%",
                  inset: "0px",
                  color: "transparent",
                }}
                alt="Cherry template preview"
                loading="lazy"
                decoding="async"
                src="/site-assets/99635933ce7a7ab4.webp"
              />
            </button>
            <div className="os-blur" aria-hidden="true">
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>
            <div className="os-card-bar flex items-end justify-between gap-3 px-4 pb-3.5">
              <div className="min-w-0">
                <h3 className="os-card-title truncate text-[14px] font-medium leading-tight text-white">
                  Cherry
                </h3>
                <p className={"mt-1 truncate text-[11.5px] leading-tight \x74ext-white/\x365"}>
                  Design Portfolio
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-2.5">
                <div className="relative flex items-center justify-end">
                  <div className={"os-card-formats flex items-center gap-2 \x74ext-white/\x385"}>
                    <span
                      className="flex items-center"
                      title="Framer — free"
                      role="img"
                      aria-label="Framer — free"
                    >
                      <svg
                        width="9.333333333333332"
                        height="14"
                        viewBox="0 0 192 288"
                        fill="none"
                        aria-hidden="true"
                      >
                        <path
                          d="M 96 192 L 96 288 L 0 192 L 0 96 L 96 96 L 0 0 L 192 0 L 192 96 L 96 96 L 192 192 Z"
                          fill="currentColor"
                        />
                      </svg>
                    </span>
                  </div>
                  <span
                    className={
                      "os-card-cta absolute right-0 flex h-7 items-center gap-1 whitespace-nowrap rounded-full \x62g-white/\x395 pl-3 pr-2.5 text-[11.5px] font-medium \x74ext-[\x76ar(\x2d-text)] \x73hadow-[\x30_4px_12px_-4px_rgba(\x30,\x30,\x30,\x30.\x34),\x69nset_0_1px_0_#\x66ff]"
                    }
                    aria-hidden="true"
                  >
                    Preview
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
                  </span>
                </div>
                <button
                  className={
                    "relative inline-flex items-center justify-center transition-colors \x74ext-white/\x385 hover:text-white os-interactive -m-1.5 p-1.5 \x64rop-shadow-[\x30_1px_2px_rgba(\x30,\x30,\x30,\x30.\x335)]"
                  }
                  type="button"
                  aria-label="Add Cherry to favorites"
                  aria-pressed="false"
                  title="Favorites are saved to your account"
                >
                  <span>
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
                      <path d="M12 20s-7-4.4-7-9.2A4 4 0 0 1 12 8a4 4 0 0 1 7 2.8C19 15.6 12 20 12 20Z" />
                    </svg>
                  </span>
                </button>
              </div>
            </div>
          </article>
        </li>
        <li>
          <article className="os-card aspect-[16/10] w-full">
            <button
              className={
                "os-preview-trigger absolute inset-0 block h-full w-full cursor-pointer overflow-hidden text-left \x6futline-none"
              }
              type="button"
              aria-label="Preview Madeline"
            >
              <img
                className={"os-preview-img object-cover \x6fbject-top"}
                style={{
                  position: "absolute",
                  height: "100%",
                  width: "100%",
                  inset: "0px",
                  color: "transparent",
                }}
                alt="Madeline template preview"
                loading="lazy"
                decoding="async"
                width="640"
                height="400"
                src="/site-assets/b20b3900aa8e76f7.jpg"
              />
            </button>
            <div className="os-blur" aria-hidden="true">
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>
            <div className="os-card-bar flex items-end justify-between gap-3 px-4 pb-3.5">
              <div className="min-w-0">
                <h3 className="os-card-title truncate text-[14px] font-medium leading-tight text-white">
                  Madeline
                </h3>
                <p className={"mt-1 truncate text-[11.5px] leading-tight \x74ext-white/\x365"}>
                  Design Portfolio
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-2.5">
                <div className="relative flex items-center justify-end">
                  <div className={"os-card-formats flex items-center gap-2 \x74ext-white/\x385"}>
                    <span
                      className="flex items-center"
                      title="Framer"
                      role="img"
                      aria-label="Framer"
                    >
                      <svg
                        width="9.333333333333332"
                        height="14"
                        viewBox="0 0 192 288"
                        fill="none"
                        aria-hidden="true"
                      >
                        <path
                          d="M 96 192 L 96 288 L 0 192 L 0 96 L 96 96 L 0 0 L 192 0 L 192 96 L 96 96 L 192 192 Z"
                          fill="currentColor"
                        />
                      </svg>
                    </span>
                  </div>
                  <span
                    className={
                      "os-card-cta absolute right-0 flex h-7 items-center gap-1 whitespace-nowrap rounded-full \x62g-white/\x395 pl-3 pr-2.5 text-[11.5px] font-medium \x74ext-[\x76ar(\x2d-text)] \x73hadow-[\x30_4px_12px_-4px_rgba(\x30,\x30,\x30,\x30.\x34),\x69nset_0_1px_0_#\x66ff]"
                    }
                    aria-hidden="true"
                  >
                    Preview
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
                  </span>
                </div>
                <button
                  className={
                    "relative inline-flex items-center justify-center transition-colors \x74ext-white/\x385 hover:text-white os-interactive -m-1.5 p-1.5 \x64rop-shadow-[\x30_1px_2px_rgba(\x30,\x30,\x30,\x30.\x335)]"
                  }
                  type="button"
                  aria-label="Add Madeline to favorites"
                  aria-pressed="false"
                  title="Favorites are saved to your account"
                >
                  <span>
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
                      <path d="M12 20s-7-4.4-7-9.2A4 4 0 0 1 12 8a4 4 0 0 1 7 2.8C19 15.6 12 20 12 20Z" />
                    </svg>
                  </span>
                </button>
              </div>
            </div>
          </article>
        </li>
        <li>
          <article className="os-card aspect-[16/10] w-full">
            <button
              className={
                "os-preview-trigger absolute inset-0 block h-full w-full cursor-pointer overflow-hidden text-left \x6futline-none"
              }
              type="button"
              aria-label="Preview Queue"
            >
              <img
                className={"os-preview-img object-cover \x6fbject-top"}
                style={{
                  position: "absolute",
                  height: "100%",
                  width: "100%",
                  inset: "0px",
                  color: "transparent",
                }}
                alt="Queue template preview"
                loading="lazy"
                decoding="async"
                src="/site-assets/e2c6f5674424c7be.webp"
              />
            </button>
            <div className="os-blur" aria-hidden="true">
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>
            <div className="os-card-bar flex items-end justify-between gap-3 px-4 pb-3.5">
              <div className="min-w-0">
                <h3 className="os-card-title truncate text-[14px] font-medium leading-tight text-white">
                  Queue
                </h3>
                <p className={"mt-1 truncate text-[11.5px] leading-tight \x74ext-white/\x365"}>
                  Waitlist
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-2.5">
                <div className="relative flex items-center justify-end">
                  <div className={"os-card-formats flex items-center gap-2 \x74ext-white/\x385"}>
                    <span
                      className="flex items-center"
                      title="Framer"
                      role="img"
                      aria-label="Framer"
                    >
                      <svg
                        width="9.333333333333332"
                        height="14"
                        viewBox="0 0 192 288"
                        fill="none"
                        aria-hidden="true"
                      >
                        <path
                          d="M 96 192 L 96 288 L 0 192 L 0 96 L 96 96 L 0 0 L 192 0 L 192 96 L 96 96 L 192 192 Z"
                          fill="currentColor"
                        />
                      </svg>
                    </span>
                  </div>
                  <span
                    className={
                      "os-card-cta absolute right-0 flex h-7 items-center gap-1 whitespace-nowrap rounded-full \x62g-white/\x395 pl-3 pr-2.5 text-[11.5px] font-medium \x74ext-[\x76ar(\x2d-text)] \x73hadow-[\x30_4px_12px_-4px_rgba(\x30,\x30,\x30,\x30.\x34),\x69nset_0_1px_0_#\x66ff]"
                    }
                    aria-hidden="true"
                  >
                    Preview
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
                  </span>
                </div>
                <button
                  className={
                    "relative inline-flex items-center justify-center transition-colors \x74ext-white/\x385 hover:text-white os-interactive -m-1.5 p-1.5 \x64rop-shadow-[\x30_1px_2px_rgba(\x30,\x30,\x30,\x30.\x335)]"
                  }
                  type="button"
                  aria-label="Add Queue to favorites"
                  aria-pressed="false"
                  title="Favorites are saved to your account"
                >
                  <span>
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
                      <path d="M12 20s-7-4.4-7-9.2A4 4 0 0 1 12 8a4 4 0 0 1 7 2.8C19 15.6 12 20 12 20Z" />
                    </svg>
                  </span>
                </button>
              </div>
            </div>
          </article>
        </li>
        <li>
          <article className="os-card aspect-[16/10] w-full">
            <button
              className={
                "os-preview-trigger absolute inset-0 block h-full w-full cursor-pointer overflow-hidden text-left \x6futline-none"
              }
              type="button"
              aria-label="Preview Pretty"
            >
              <img
                className={"os-preview-img object-cover \x6fbject-top"}
                style={{
                  position: "absolute",
                  height: "100%",
                  width: "100%",
                  inset: "0px",
                  color: "transparent",
                }}
                alt="Pretty template preview"
                loading="lazy"
                decoding="async"
                src="/site-assets/e611cb809f2f58a2.webp"
              />
            </button>
            <div className="os-blur" aria-hidden="true">
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>
            <div className="pointer-events-none absolute left-3 top-3 z-[2] flex flex-wrap gap-1.5">
              <span className="os-glass-tag">
                <svg
                  width="11"
                  height="11"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18" />
                </svg>{" "}
                AI-ready
              </span>
            </div>
            <div className="os-card-bar flex items-end justify-between gap-3 px-4 pb-3.5">
              <div className="min-w-0">
                <h3 className="os-card-title truncate text-[14px] font-medium leading-tight text-white">
                  Pretty
                </h3>
                <p className={"mt-1 truncate text-[11.5px] leading-tight \x74ext-white/\x365"}>
                  Software &amp; SaaS
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-2.5">
                <div className="relative flex items-center justify-end">
                  <div className={"os-card-formats flex items-center gap-2 \x74ext-white/\x385"}>
                    <span
                      className="flex items-center"
                      title="Webflow"
                      role="img"
                      aria-label="Webflow"
                    >
                      <svg
                        width="17.875"
                        height="11"
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
                    <span
                      className="flex items-center"
                      title="Framer — free"
                      role="img"
                      aria-label="Framer — free"
                    >
                      <svg
                        width="9.333333333333332"
                        height="14"
                        viewBox="0 0 192 288"
                        fill="none"
                        aria-hidden="true"
                      >
                        <path
                          d="M 96 192 L 96 288 L 0 192 L 0 96 L 96 96 L 0 0 L 192 0 L 192 96 L 96 96 L 192 192 Z"
                          fill="currentColor"
                        />
                      </svg>
                    </span>
                  </div>
                  <span
                    className={
                      "os-card-cta absolute right-0 flex h-7 items-center gap-1 whitespace-nowrap rounded-full \x62g-white/\x395 pl-3 pr-2.5 text-[11.5px] font-medium \x74ext-[\x76ar(\x2d-text)] \x73hadow-[\x30_4px_12px_-4px_rgba(\x30,\x30,\x30,\x30.\x34),\x69nset_0_1px_0_#\x66ff]"
                    }
                    aria-hidden="true"
                  >
                    Preview
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
                  </span>
                </div>
                <button
                  className={
                    "relative inline-flex items-center justify-center transition-colors \x74ext-white/\x385 hover:text-white os-interactive -m-1.5 p-1.5 \x64rop-shadow-[\x30_1px_2px_rgba(\x30,\x30,\x30,\x30.\x335)]"
                  }
                  type="button"
                  aria-label="Add Pretty to favorites"
                  aria-pressed="false"
                  title="Favorites are saved to your account"
                >
                  <span>
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
                      <path d="M12 20s-7-4.4-7-9.2A4 4 0 0 1 12 8a4 4 0 0 1 7 2.8C19 15.6 12 20 12 20Z" />
                    </svg>
                  </span>
                </button>
              </div>
            </div>
          </article>
        </li>
        <li>
          <article className="os-card aspect-[16/10] w-full">
            <button
              className={
                "os-preview-trigger absolute inset-0 block h-full w-full cursor-pointer overflow-hidden text-left \x6futline-none"
              }
              type="button"
              aria-label="Preview Wings"
            >
              <img
                className={"os-preview-img object-cover \x6fbject-top"}
                style={{
                  position: "absolute",
                  height: "100%",
                  width: "100%",
                  inset: "0px",
                  color: "transparent",
                }}
                alt="Wings template preview"
                loading="lazy"
                decoding="async"
                src="/site-assets/acf328f50931d605.webp"
              />
            </button>
            <div className="os-blur" aria-hidden="true">
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>
            <div className="pointer-events-none absolute left-3 top-3 z-[2] flex flex-wrap gap-1.5">
              <span className="os-glass-tag">
                <svg
                  width="11"
                  height="11"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18" />
                </svg>{" "}
                AI-ready
              </span>
            </div>
            <div className="os-card-bar flex items-end justify-between gap-3 px-4 pb-3.5">
              <div className="min-w-0">
                <h3 className="os-card-title truncate text-[14px] font-medium leading-tight text-white">
                  Wings
                </h3>
                <p className={"mt-1 truncate text-[11.5px] leading-tight \x74ext-white/\x365"}>
                  Freelancers &amp; Consultants
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-2.5">
                <div className="relative flex items-center justify-end">
                  <div className={"os-card-formats flex items-center gap-2 \x74ext-white/\x385"}>
                    <span
                      className="flex items-center"
                      title="Webflow"
                      role="img"
                      aria-label="Webflow"
                    >
                      <svg
                        width="17.875"
                        height="11"
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
                    <span
                      className="flex items-center"
                      title="Framer"
                      role="img"
                      aria-label="Framer"
                    >
                      <svg
                        width="9.333333333333332"
                        height="14"
                        viewBox="0 0 192 288"
                        fill="none"
                        aria-hidden="true"
                      >
                        <path
                          d="M 96 192 L 96 288 L 0 192 L 0 96 L 96 96 L 0 0 L 192 0 L 192 96 L 96 96 L 192 192 Z"
                          fill="currentColor"
                        />
                      </svg>
                    </span>
                  </div>
                  <span
                    className={
                      "os-card-cta absolute right-0 flex h-7 items-center gap-1 whitespace-nowrap rounded-full \x62g-white/\x395 pl-3 pr-2.5 text-[11.5px] font-medium \x74ext-[\x76ar(\x2d-text)] \x73hadow-[\x30_4px_12px_-4px_rgba(\x30,\x30,\x30,\x30.\x34),\x69nset_0_1px_0_#\x66ff]"
                    }
                    aria-hidden="true"
                  >
                    Preview
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
                  </span>
                </div>
                <button
                  className={
                    "relative inline-flex items-center justify-center transition-colors \x74ext-white/\x385 hover:text-white os-interactive -m-1.5 p-1.5 \x64rop-shadow-[\x30_1px_2px_rgba(\x30,\x30,\x30,\x30.\x335)]"
                  }
                  type="button"
                  aria-label="Add Wings to favorites"
                  aria-pressed="false"
                  title="Favorites are saved to your account"
                >
                  <span>
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
                      <path d="M12 20s-7-4.4-7-9.2A4 4 0 0 1 12 8a4 4 0 0 1 7 2.8C19 15.6 12 20 12 20Z" />
                    </svg>
                  </span>
                </button>
              </div>
            </div>
          </article>
        </li>
        <li>
          <article className="os-card aspect-[16/10] w-full">
            <button
              className={
                "os-preview-trigger absolute inset-0 block h-full w-full cursor-pointer overflow-hidden text-left \x6futline-none"
              }
              type="button"
              aria-label="Preview Daylight"
            >
              <img
                className={"os-preview-img object-cover \x6fbject-top"}
                style={{
                  position: "absolute",
                  height: "100%",
                  width: "100%",
                  inset: "0px",
                  color: "transparent",
                }}
                alt="Daylight template preview"
                loading="lazy"
                decoding="async"
                src="/site-assets/ab92887d56dbc66d.webp"
              />
            </button>
            <div className="os-blur" aria-hidden="true">
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>
            <div className="pointer-events-none absolute left-3 top-3 z-[2] flex flex-wrap gap-1.5">
              <span className="os-glass-tag">
                <svg
                  width="11"
                  height="11"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18" />
                </svg>{" "}
                AI-ready
              </span>
            </div>
            <div className="os-card-bar flex items-end justify-between gap-3 px-4 pb-3.5">
              <div className="min-w-0">
                <h3 className="os-card-title truncate text-[14px] font-medium leading-tight text-white">
                  Daylight
                </h3>
                <p className={"mt-1 truncate text-[11.5px] leading-tight \x74ext-white/\x365"}>
                  Architecture
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-2.5">
                <div className="relative flex items-center justify-end">
                  <div className={"os-card-formats flex items-center gap-2 \x74ext-white/\x385"}>
                    <span
                      className="flex items-center"
                      title="Webflow"
                      role="img"
                      aria-label="Webflow"
                    >
                      <svg
                        width="17.875"
                        height="11"
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
                    <span
                      className="flex items-center"
                      title="Framer"
                      role="img"
                      aria-label="Framer"
                    >
                      <svg
                        width="9.333333333333332"
                        height="14"
                        viewBox="0 0 192 288"
                        fill="none"
                        aria-hidden="true"
                      >
                        <path
                          d="M 96 192 L 96 288 L 0 192 L 0 96 L 96 96 L 0 0 L 192 0 L 192 96 L 96 96 L 192 192 Z"
                          fill="currentColor"
                        />
                      </svg>
                    </span>
                  </div>
                  <span
                    className={
                      "os-card-cta absolute right-0 flex h-7 items-center gap-1 whitespace-nowrap rounded-full \x62g-white/\x395 pl-3 pr-2.5 text-[11.5px] font-medium \x74ext-[\x76ar(\x2d-text)] \x73hadow-[\x30_4px_12px_-4px_rgba(\x30,\x30,\x30,\x30.\x34),\x69nset_0_1px_0_#\x66ff]"
                    }
                    aria-hidden="true"
                  >
                    Preview
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
                  </span>
                </div>
                <button
                  className={
                    "relative inline-flex items-center justify-center transition-colors \x74ext-white/\x385 hover:text-white os-interactive -m-1.5 p-1.5 \x64rop-shadow-[\x30_1px_2px_rgba(\x30,\x30,\x30,\x30.\x335)]"
                  }
                  type="button"
                  aria-label="Add Daylight to favorites"
                  aria-pressed="false"
                  title="Favorites are saved to your account"
                >
                  <span>
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
                      <path d="M12 20s-7-4.4-7-9.2A4 4 0 0 1 12 8a4 4 0 0 1 7 2.8C19 15.6 12 20 12 20Z" />
                    </svg>
                  </span>
                </button>
              </div>
            </div>
          </article>
        </li>
      </ul>
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
              "relative flex h-12 flex-col items-center justify-center gap-0.5 rounded-full text-[10px] font-medium transition-[background,color] duration-150 \x62g-gradient-to-b \x66rom-white \x74o-[#\x663f3f2] \x74ext-[\x76ar(\x2d-text)] \x73hadow-[\x76ar(\x2d-shadow-raised)]"
            }
            aria-current="page"
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
