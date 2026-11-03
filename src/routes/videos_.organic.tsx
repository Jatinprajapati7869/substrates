import { withPublicPageHead } from "@/lib/seo";
import { useSupplyShell } from "@/lib/use-supply-shell";
import { useVideoPremiumPageLock } from "@/lib/use-video-premium-page";
import type { CSSProperties } from "react";
import { useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import capturedCSS from "../styles/pages/videos.organic.css?raw";

export const Route = createFileRoute("/videos_/organic")({
  head: () =>
    withPublicPageHead("/videos/organic", [
      { title: "Organic — Video Style for Claude — Substrates" },
      {
        name: "description",
        content:
          "Watch Organic video examples and explore the included Claude skill, style guide and render workflow.",
      },
      { property: "og:title", content: "Organic — Video Style for Claude — Substrates" },
      {
        property: "og:description",
        content:
          "Watch Organic video examples and explore the included Claude skill, style guide and render workflow.",
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
  useImportedLayout();
  useSampleSelection();
  useVideoPremiumPageLock(true);
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
            <div className="mx-auto max-w-6xl px-4 pb-28 pt-[72px] sm:px-6 lg:pt-8">
              <nav
                className={
                  "mb-5 flex items-center gap-1.5 text-[12px] \x74ext-[\x76ar(\x2d-text-tertiary)]"
                }
              >
                <a className={"\x68over:\x74ext-[\x76ar(\x2d-text)]"} href="/videos">
                  Videos
                </a>{" "}
                <span>/</span>{" "}
                <span className={"\x74ext-[\x76ar(\x2d-text-secondary)]"}>Organic</span>
              </nav>
              <div className="grid gap-8 lg:grid-cols-[minmax(0,420px)_1fr] lg:gap-12">
                <div className={"\x6cg:\x73ticky lg:top-8 lg:self-start"}>
                  <div className="relative mx-auto max-w-[230px] sm:max-w-[360px]">
                    <div
                      className={
                        "relative aspect-[9/16] overflow-hidden rounded-[18px] bg-black \x73hadow-[\x30_0_0_1px_rgba(\x30,\x30,\x30,\x30.\x308),\x30_30px_60px_-28px_rgba(\x30,\x30,\x30,\x30.\x355)]"
                      }
                    >
                      <video
                        className="h-full w-full object-cover"
                        src="/site-assets/0fa7a2f3e366dece.mp4"
                        muted
                        loop
                        playsInline
                        preload="auto"
                        autoPlay
                        controls
                      />
                    </div>
                  </div>
                  <div className="mx-auto mt-3 flex max-w-[360px] gap-2">
                    <button
                      className={
                        "relative flex-1 overflow-hidden rounded-[10px] text-left transition-shadow \x72ing-2 \x72ing-[#\x3111]"
                      }
                      type="button"
                      aria-pressed="true"
                    >
                      <div className="relative aspect-[9/16] overflow-hidden rounded-[18px] bg-black !rounded-[10px]">
                        <video
                          className="h-full w-full object-cover"
                          src="/site-assets/0fa7a2f3e366dece.mp4"
                          muted
                          loop
                          playsInline
                          preload="auto"
                        />
                      </div>
                      <span
                        className={
                          "absolute \x69nset-x-1 bottom-1 truncate \x72ounded \x62g-black/\x355 px-1 text-[9px] text-white"
                        }
                      >
                        Firefly Glow
                      </span>
                    </button>
                    <button
                      className={
                        "relative flex-1 overflow-hidden rounded-[10px] text-left transition-shadow \x72ing-1 \x72ing-black/\x310"
                      }
                      type="button"
                      aria-pressed="false"
                    >
                      <div className="relative aspect-[9/16] overflow-hidden rounded-[18px] bg-black !rounded-[10px]">
                        <video
                          className="h-full w-full object-cover"
                          src="/site-assets/200f16a8dd5a8877.mp4"
                          muted
                          loop
                          playsInline
                          preload="auto"
                        />
                      </div>
                      <span
                        className={
                          "absolute \x69nset-x-1 bottom-1 truncate \x72ounded \x62g-black/\x355 px-1 text-[9px] text-white"
                        }
                      >
                        Noise Cancelling
                      </span>
                    </button>
                  </div>
                  <div
                    className={"mx-auto mt-4 max-w-[360px] \x73croll-mt-24 \x6cg:\x68idden"}
                    id="get"
                  >
                    <div className={"flex flex-col gap-2 \x73m:\x66lex-row"}>
                      <a
                        className={
                          "flex h-12 w-full items-center sm:flex-1 justify-center gap-2 rounded-full \x62g-[#\x3111] text-[14px] font-semibold text-white"
                        }
                        href="/pricing/videos"
                      >
                        Unlock all styles · $9.99/mo
                      </a>
                    </div>
                  </div>
                </div>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={
                        "rounded-full px-2.5 py-1 text-[10.5px] font-semibold uppercase tracking-wide \x62g-[#\x3111] \x74ext-[#\x665d98a]"
                      }
                    >
                      Video membership
                    </span>
                    <span className="os-chip h-6 text-[10.5px]">Explainer</span>
                  </div>
                  <h1
                    className={
                      "mt-3 \x66ont-[\x66amily-name:\x76ar(\x2d-font-heading)] text-[34px] font-medium leading-[1.05] tracking-tight \x73m:\x74ext-[\x344px]"
                    }
                  >
                    Organic
                  </h1>
                  <p
                    className={
                      "mt-3 text-[15px] leading-relaxed \x74ext-[\x76ar(\x2d-text-secondary)]"
                    }
                  >
                    Organic turns a topic into a short vertical explainer with soft, drifting colour
                    auras on warm paper, calm captions, soft 3D objects and slow camera moves.
                    Claude invents visuals for each topic (a 3D model, a scene type or a sound) and
                    renders the MP4 with sound effects on your own computer, with no API keys.
                  </p>
                  <div className={"os-shell mt-6 hidden p-4 sm:p-5 \x6cg:\x62lock"}>
                    <div className={"flex flex-col gap-2 \x73m:\x66lex-row"}>
                      <a
                        className={
                          "flex h-12 w-full items-center sm:flex-1 justify-center gap-2 rounded-full \x62g-[#\x3111] text-[14px] font-semibold text-white"
                        }
                        href="/pricing/videos"
                      >
                        Unlock all styles · $9.99/mo
                      </a>
                    </div>
                  </div>
                  <ImportedSectionGoodForLessSuited />
                  <section className="mt-8" data-video-member-only>
                    <h2 className={"mb-3 text-[15px] font-semibold \x74ext-[\x76ar(\x2d-text)]"}>
                      What's included
                    </h2>
                    <div className="grid gap-2 sm:grid-cols-2">
                      <div className="os-inset px-4 py-3">
                        <p className={"text-[13px] font-medium \x74ext-[\x76ar(\x2d-text)]"}>
                          SKILL.md
                        </p>
                        <p
                          className={
                            "mt-0.5 text-[12.5px] leading-relaxed \x74ext-[\x76ar(\x2d-text-secondary)]"
                          }
                        >
                          Teaches Claude the style, pacing and scene rules, step by step
                        </p>
                      </div>
                      <div className="os-inset px-4 py-3">
                        <p className={"text-[13px] font-medium \x74ext-[\x76ar(\x2d-text)]"}>
                          Style guide + reference frames
                        </p>
                        <p
                          className={
                            "mt-0.5 text-[12.5px] leading-relaxed \x74ext-[\x76ar(\x2d-text-secondary)]"
                          }
                        >
                          Palette, type, layout and motion rules, with rendered key frames
                        </p>
                      </div>
                      <div className="os-inset px-4 py-3">
                        <p className={"text-[13px] font-medium \x74ext-[\x76ar(\x2d-text)]"}>
                          Render scripts
                        </p>
                        <p
                          className={
                            "mt-0.5 text-[12.5px] leading-relaxed \x74ext-[\x76ar(\x2d-text-secondary)]"
                          }
                        >
                          Reusable scene templates and a one-command render to MP4
                        </p>
                      </div>
                      <div className="os-inset px-4 py-3">
                        <p className={"text-[13px] font-medium \x74ext-[\x76ar(\x2d-text)]"}>
                          A worked example
                        </p>
                        <p
                          className={
                            "mt-0.5 text-[12.5px] leading-relaxed \x74ext-[\x76ar(\x2d-text-secondary)]"
                          }
                        >
                          Script, storyboard and the finished video it produced
                        </p>
                      </div>
                    </div>
                  </section>
                  <ImportedSectionYouGiveYouGet />
                  <section className="mt-8" data-video-member-only>
                    <h2 className={"mb-3 text-[15px] font-semibold \x74ext-[\x76ar(\x2d-text)]"}>
                      How to use it
                    </h2>
                    <details className="os-inset group px-4 py-3" open>
                      <summary
                        className={
                          "cursor-pointer text-[13.5px] font-medium \x74ext-[\x76ar(\x2d-text)]"
                        }
                      >
                        Step by step (new to Claude Code)
                      </summary>
                      <ol
                        className={
                          "mt-3 list-decimal \x73pace-y-2 pl-5 text-[13px] leading-relaxed \x74ext-[\x76ar(\x2d-text-secondary)]"
                        }
                      >
                        <li>Install Claude Code and sign in with your Claude account.</li>
                        <li>
                          Download this style’s ZIP and unzip it into your skills folder (
                          <code className="text-[12px]">~/.claude/skills/organic</code>).
                        </li>
                        <li>Restart Claude Code so it picks up the skill.</li>
                        <li>
                          Ask: “Use the Organic skill to make an explanation video about &lt;your
                          topic&gt;.”
                        </li>
                        <li>Review the script Claude proposes, then let it render the scenes.</li>
                        <li>Finish the steps under “Before you export” below.</li>
                      </ol>
                    </details>
                    <details className="os-inset mt-2 px-4 py-3">
                      <summary
                        className={
                          "cursor-pointer text-[13.5px] font-medium \x74ext-[\x76ar(\x2d-text)]"
                        }
                      >
                        Quick start (already use skills)
                      </summary>
                      <p className={"mt-2 text-[13px] \x74ext-[\x76ar(\x2d-text-secondary)]"}>
                        Copy the install prompt, paste it into Claude Code, give it a topic.
                      </p>
                    </details>
                  </section>
                  <ImportedSectionToolsYouLlNeed />
                  <section className="mt-8">
                    <h2 className={"mb-3 text-[15px] font-semibold \x74ext-[\x76ar(\x2d-text)]"}>
                      Voiceover
                    </h2>
                    <div
                      className={
                        "os-inset px-4 py-3 text-[13px] leading-relaxed \x74ext-[\x76ar(\x2d-text-secondary)]"
                      }
                    >
                      <p>
                        <span className={"font-medium \x74ext-[\x76ar(\x2d-text)]"}>Tool:</span>{" "}
                        ElevenLabs or Epidemic Sound
                      </p>
                      <p>
                        <span className={"font-medium \x74ext-[\x76ar(\x2d-text)]"}>Cost:</span>{" "}
                        ElevenLabs: Free plan with a monthly character limit (check its licence
                        terms); paid plans available · Epidemic Sound: Paid subscription; a free
                        trial has been offered before but may not be available
                      </p>
                      <p className="mt-1">
                        Optional. The examples here have no voiceover; captions carry the story. Add
                        your own recording or a TTS you are licensed to use.
                      </p>
                    </div>
                  </section>
                  <ImportedSectionBeforeYouExport />
                </div>
              </div>
              <section className="mt-16">
                <h2
                  className={
                    "\x66ont-[\x66amily-name:\x76ar(\x2d-font-heading)] text-[22px] font-medium tracking-tight"
                  }
                >
                  More styles
                </h2>
                <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  <a className="os-shell block p-1.5" href="/videos/small-details">
                    <div className="relative aspect-[9/16] overflow-hidden rounded-[18px] bg-black">
                      <video
                        className="h-full w-full object-cover"
                        src="/site-assets/eb1bf923e75e1b03.mp4"
                        muted
                        loop
                        playsInline
                        preload="auto"
                      />
                    </div>
                    <p
                      className={
                        "px-1 pb-1 pt-2 text-[13px] font-medium \x74ext-[\x76ar(\x2d-text)]"
                      }
                    >
                      Small details. Big difference.
                    </p>
                  </a>
                  <a className="os-shell block p-1.5" href="/videos/rays">
                    <div className="relative aspect-[9/16] overflow-hidden rounded-[18px] bg-black">
                      <video
                        className="h-full w-full object-cover"
                        src="/site-assets/98d9947330bee3f6.mp4"
                        muted
                        loop
                        playsInline
                        preload="auto"
                      />
                    </div>
                    <p
                      className={
                        "px-1 pb-1 pt-2 text-[13px] font-medium \x74ext-[\x76ar(\x2d-text)]"
                      }
                    >
                      Rays
                    </p>
                  </a>
                  <a className="os-shell block p-1.5" href="/videos/kiln">
                    <div className="relative aspect-[9/16] overflow-hidden rounded-[18px] bg-black">
                      <video
                        className="h-full w-full object-cover"
                        src="/site-assets/4d82b15ad5c33738.mp4"
                        muted
                        loop
                        playsInline
                        preload="auto"
                      />
                    </div>
                    <p
                      className={
                        "px-1 pb-1 pt-2 text-[13px] font-medium \x74ext-[\x76ar(\x2d-text)]"
                      }
                    >
                      Kiln
                    </p>
                  </a>
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
                "group mx-2 flex items-center gap-2.5 rounded-[12px] px-2.5 py-[7px] text-[13px] transition-[background-color,color,box-shadow] duration-150 \x62g-gradient-to-b \x66rom-white \x74o-[#\x667f7f6] font-medium \x74ext-[\x76ar(\x2d-text)] \x73hadow-[\x76ar(\x2d-shadow-raised)]"
              }
              aria-current="page"
              href="/videos"
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
                href="/pricing/videos"
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

function ImportedSectionGoodForLessSuited() {
  return (
    <section className="mt-8">
      <h2 className={"mb-3 text-[15px] font-semibold \x74ext-[\x76ar(\x2d-text)]"}>
        Good for / less suited for
      </h2>
      <div className="grid gap-3 sm:grid-cols-2">
        <ul className={"\x73pace-y-2"}>
          <li
            className={
              "flex items-start gap-2.5 text-[13px] leading-relaxed \x74ext-[\x76ar(\x2d-text-secondary)]"
            }
          >
            <span
              className={
                "mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-white \x74ext-[\x76ar(\x2d-text)] \x73hadow-[\x30_0_0_1px_rgba(\x30,\x30,\x30,\x30.\x308)]"
              }
            >
              <svg
                width="10"
                height="10"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="m5 12.5 4.5 4.5L19 7.5" />
              </svg>
            </span>
            "How does X work?" science, nature and tech explainers
          </li>
          <li
            className={
              "flex items-start gap-2.5 text-[13px] leading-relaxed \x74ext-[\x76ar(\x2d-text-secondary)]"
            }
          >
            <span
              className={
                "mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-white \x74ext-[\x76ar(\x2d-text)] \x73hadow-[\x30_0_0_1px_rgba(\x30,\x30,\x30,\x30.\x308)]"
              }
            >
              <svg
                width="10"
                height="10"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="m5 12.5 4.5 4.5L19 7.5" />
              </svg>
            </span>
            Product, gadget or AI-feature intros with a soft 3D model of the thing
          </li>
          <li
            className={
              "flex items-start gap-2.5 text-[13px] leading-relaxed \x74ext-[\x76ar(\x2d-text-secondary)]"
            }
          >
            <span
              className={
                "mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-white \x74ext-[\x76ar(\x2d-text)] \x73hadow-[\x30_0_0_1px_rgba(\x30,\x30,\x30,\x30.\x308)]"
              }
            >
              <svg
                width="10"
                height="10"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="m5 12.5 4.5 4.5L19 7.5" />
              </svg>
            </span>
            Wellness, design, culture and brand-story shorts
          </li>
        </ul>
        <ul className={"\x73pace-y-2"}>
          <li
            className={
              "flex items-start gap-2.5 text-[13px] leading-relaxed \x74ext-[\x76ar(\x2d-text-tertiary)]"
            }
          >
            <span
              className={
                "mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-white \x74ext-[\x76ar(\x2d-text)] \x73hadow-[\x30_0_0_1px_rgba(\x30,\x30,\x30,\x30.\x308)]"
              }
            >
              <svg
                width="10"
                height="10"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="m6 6 12 12M18 6 6 18" />
              </svg>
            </span>
            Dense data with many numbers or charts
          </li>
          <li
            className={
              "flex items-start gap-2.5 text-[13px] leading-relaxed \x74ext-[\x76ar(\x2d-text-tertiary)]"
            }
          >
            <span
              className={
                "mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-white \x74ext-[\x76ar(\x2d-text)] \x73hadow-[\x30_0_0_1px_rgba(\x30,\x30,\x30,\x30.\x308)]"
              }
            >
              <svg
                width="10"
                height="10"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="m6 6 12 12M18 6 6 18" />
              </svg>
            </span>
            Fast, loud meme or hype edits
          </li>
          <li
            className={
              "flex items-start gap-2.5 text-[13px] leading-relaxed \x74ext-[\x76ar(\x2d-text-tertiary)]"
            }
          >
            <span
              className={
                "mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-white \x74ext-[\x76ar(\x2d-text)] \x73hadow-[\x30_0_0_1px_rgba(\x30,\x30,\x30,\x30.\x308)]"
              }
            >
              <svg
                width="10"
                height="10"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="m6 6 12 12M18 6 6 18" />
              </svg>
            </span>
            Screen-recording tutorials that need exact UI steps
          </li>
        </ul>
      </div>
    </section>
  );
}

function ImportedSectionYouGiveYouGet() {
  return (
    <section className="mt-8">
      <h2 className={"mb-3 text-[15px] font-semibold \x74ext-[\x76ar(\x2d-text)]"}>
        You give / you get
      </h2>
      <div className="grid gap-2 sm:grid-cols-2">
        <div className="os-inset px-4 py-3">
          <p className="label mb-2">You provide</p>
          <ul className={"\x73pace-y-2"}>
            <li
              className={
                "flex items-start gap-2.5 text-[13px] leading-relaxed \x74ext-[\x76ar(\x2d-text-secondary)]"
              }
            >
              <span
                className={
                  "mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-white \x74ext-[\x76ar(\x2d-text)] \x73hadow-[\x30_0_0_1px_rgba(\x30,\x30,\x30,\x30.\x308)]"
                }
              >
                <svg
                  width="10"
                  height="10"
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
              A topic or question to explain
            </li>
            <li
              className={
                "flex items-start gap-2.5 text-[13px] leading-relaxed \x74ext-[\x76ar(\x2d-text-secondary)]"
              }
            >
              <span
                className={
                  "mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-white \x74ext-[\x76ar(\x2d-text)] \x73hadow-[\x30_0_0_1px_rgba(\x30,\x30,\x30,\x30.\x308)]"
                }
              >
                <svg
                  width="10"
                  height="10"
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
              Optional: length (default 15 s), audience, preferred colour mood
            </li>
            <li
              className={
                "flex items-start gap-2.5 text-[13px] leading-relaxed \x74ext-[\x76ar(\x2d-text-secondary)]"
              }
            >
              <span
                className={
                  "mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-white \x74ext-[\x76ar(\x2d-text)] \x73hadow-[\x30_0_0_1px_rgba(\x30,\x30,\x30,\x30.\x308)]"
                }
              >
                <svg
                  width="10"
                  height="10"
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
              Optional: a voiceover file (MP3/WAV)
            </li>
            <li
              className={
                "flex items-start gap-2.5 text-[13px] leading-relaxed \x74ext-[\x76ar(\x2d-text-secondary)]"
              }
            >
              <span
                className={
                  "mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-white \x74ext-[\x76ar(\x2d-text)] \x73hadow-[\x30_0_0_1px_rgba(\x30,\x30,\x30,\x30.\x308)]"
                }
              >
                <svg
                  width="10"
                  height="10"
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
              Optional: any numbers you want shown, with their source
            </li>
          </ul>
        </div>
        <div className="os-inset px-4 py-3">
          <p className="label mb-2">You get back</p>
          <ul className={"\x73pace-y-2"}>
            <li
              className={
                "flex items-start gap-2.5 text-[13px] leading-relaxed \x74ext-[\x76ar(\x2d-text-secondary)]"
              }
            >
              <span
                className={
                  "mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-white \x74ext-[\x76ar(\x2d-text)] \x73hadow-[\x30_0_0_1px_rgba(\x30,\x30,\x30,\x30.\x308)]"
                }
              >
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="m5 12.5 4.5 4.5L19 7.5" />
                </svg>
              </span>
              A 1080×1920 (9:16) 30 fps MP4 with animated captions
            </li>
            <li
              className={
                "flex items-start gap-2.5 text-[13px] leading-relaxed \x74ext-[\x76ar(\x2d-text-secondary)]"
              }
            >
              <span
                className={
                  "mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-white \x74ext-[\x76ar(\x2d-text)] \x73hadow-[\x30_0_0_1px_rgba(\x30,\x30,\x30,\x30.\x308)]"
                }
              >
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="m5 12.5 4.5 4.5L19 7.5" />
                </svg>
              </span>
              Visuals made for your topic: custom soft 3D models, scene types or sounds
            </li>
            <li
              className={
                "flex items-start gap-2.5 text-[13px] leading-relaxed \x74ext-[\x76ar(\x2d-text-secondary)]"
              }
            >
              <span
                className={
                  "mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-white \x74ext-[\x76ar(\x2d-text)] \x73hadow-[\x30_0_0_1px_rgba(\x30,\x30,\x30,\x30.\x308)]"
                }
              >
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="m5 12.5 4.5 4.5L19 7.5" />
                </svg>
              </span>
              Camera moves (push, orbit, drift) and fly-through transitions, or a calm flat variant
            </li>
            <li
              className={
                "flex items-start gap-2.5 text-[13px] leading-relaxed \x74ext-[\x76ar(\x2d-text-secondary)]"
              }
            >
              <span
                className={
                  "mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-white \x74ext-[\x76ar(\x2d-text)] \x73hadow-[\x30_0_0_1px_rgba(\x30,\x30,\x30,\x30.\x308)]"
                }
              >
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="m5 12.5 4.5 4.5L19 7.5" />
                </svg>
              </span>
              Sound design generated in code (ambient pad + 7 effects) mixed in
            </li>
            <li
              className={
                "flex items-start gap-2.5 text-[13px] leading-relaxed \x74ext-[\x76ar(\x2d-text-secondary)]"
              }
            >
              <span
                className={
                  "mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-white \x74ext-[\x76ar(\x2d-text)] \x73hadow-[\x30_0_0_1px_rgba(\x30,\x30,\x30,\x30.\x308)]"
                }
              >
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="m5 12.5 4.5 4.5L19 7.5" />
                </svg>
              </span>
              script.md with the on-screen text and fact notes
            </li>
            <li
              className={
                "flex items-start gap-2.5 text-[13px] leading-relaxed \x74ext-[\x76ar(\x2d-text-secondary)]"
              }
            >
              <span
                className={
                  "mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-white \x74ext-[\x76ar(\x2d-text)] \x73hadow-[\x30_0_0_1px_rgba(\x30,\x30,\x30,\x30.\x308)]"
                }
              >
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="m5 12.5 4.5 4.5L19 7.5" />
                </svg>
              </span>
              storyboard.md you can edit and re-render with one command
            </li>
            <li
              className={
                "flex items-start gap-2.5 text-[13px] leading-relaxed \x74ext-[\x76ar(\x2d-text-secondary)]"
              }
            >
              <span
                className={
                  "mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-white \x74ext-[\x76ar(\x2d-text)] \x73hadow-[\x30_0_0_1px_rgba(\x30,\x30,\x30,\x30.\x308)]"
                }
              >
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="m5 12.5 4.5 4.5L19 7.5" />
                </svg>
              </span>
              The sound effects as WAV files for your own edits
            </li>
            <li
              className={
                "flex items-start gap-2.5 text-[13px] leading-relaxed \x74ext-[\x76ar(\x2d-text-secondary)]"
              }
            >
              <span
                className={
                  "mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-white \x74ext-[\x76ar(\x2d-text)] \x73hadow-[\x30_0_0_1px_rgba(\x30,\x30,\x30,\x30.\x308)]"
                }
              >
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="m5 12.5 4.5 4.5L19 7.5" />
                </svg>
              </span>
              10 reusable scene templates, 3 built-in 3D models and a style guide
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

function ImportedSectionToolsYouLlNeed() {
  return (
    <section className="mt-8">
      <h2 className={"mb-3 text-[15px] font-semibold \x74ext-[\x76ar(\x2d-text)]"}>
        Tools you'll need
      </h2>
      <div className={"overflow-hidden rounded-[14px] \x72ing-1 \x72ing-[\x76ar(\x2d-line)]"}>
        <div
          className={
            "flex flex-col gap-0.5 \x62order-b \x62order-[\x76ar(\x2d-line)] bg-white px-4 py-3 \x6cast:\x62order-0 \x73m:\x66lex-row \x73m:\x69tems-center sm:gap-4"
          }
        >
          <p className={"w-36 shrink-0 text-[13px] font-medium \x74ext-[\x76ar(\x2d-text)]"}>
            Claude Code
          </p>
          <p className={"flex-1 text-[12.5px] \x74ext-[\x76ar(\x2d-text-secondary)]"}>
            Writes the script and storyboard, checks frames, runs the render
          </p>
          <p className={"text-[12px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
            Paid: needs a Claude Pro or Max plan or Anthropic API credits (see claude.com/pricing)
          </p>
        </div>
        <div
          className={
            "flex flex-col gap-0.5 \x62order-b \x62order-[\x76ar(\x2d-line)] bg-white px-4 py-3 \x6cast:\x62order-0 \x73m:\x66lex-row \x73m:\x69tems-center sm:gap-4"
          }
        >
          <p className={"w-36 shrink-0 text-[13px] font-medium \x74ext-[\x76ar(\x2d-text)]"}>
            Node.js
          </p>
          <p className={"flex-1 text-[12.5px] \x74ext-[\x76ar(\x2d-text-secondary)]"}>
            Runs the render scripts
          </p>
          <p className={"text-[12px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>Free</p>
        </div>
        <div
          className={
            "flex flex-col gap-0.5 \x62order-b \x62order-[\x76ar(\x2d-line)] bg-white px-4 py-3 \x6cast:\x62order-0 \x73m:\x66lex-row \x73m:\x69tems-center sm:gap-4"
          }
        >
          <p className={"w-36 shrink-0 text-[13px] font-medium \x74ext-[\x76ar(\x2d-text)]"}>
            @napi-rs/canvas
          </p>
          <p className={"flex-1 text-[12.5px] \x74ext-[\x76ar(\x2d-text-secondary)]"}>
            Draws every frame
          </p>
          <p className={"text-[12px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
            Free (open source, installed automatically)
          </p>
        </div>
        <div
          className={
            "flex flex-col gap-0.5 \x62order-b \x62order-[\x76ar(\x2d-line)] bg-white px-4 py-3 \x6cast:\x62order-0 \x73m:\x66lex-row \x73m:\x69tems-center sm:gap-4"
          }
        >
          <p className={"w-36 shrink-0 text-[13px] font-medium \x74ext-[\x76ar(\x2d-text)]"}>
            ffmpeg (via ffmpeg-static)
          </p>
          <p className={"flex-1 text-[12.5px] \x74ext-[\x76ar(\x2d-text-secondary)]"}>
            Encodes the MP4 and mixes audio
          </p>
          <p className={"text-[12px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
            Free (open source, installed automatically)
          </p>
        </div>
        <div
          className={
            "flex flex-col gap-0.5 \x62order-b \x62order-[\x76ar(\x2d-line)] bg-white px-4 py-3 \x6cast:\x62order-0 \x73m:\x66lex-row \x73m:\x69tems-center sm:gap-4"
          }
        >
          <p className={"w-36 shrink-0 text-[13px] font-medium \x74ext-[\x76ar(\x2d-text)]"}>
            Inter + DM Mono (Google Fonts)
          </p>
          <p className={"flex-1 text-[12.5px] \x74ext-[\x76ar(\x2d-text-secondary)]"}>Typography</p>
          <p className={"text-[12px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
            Free (SIL Open Font License, bundled)
          </p>
        </div>
        <div
          className={
            "flex flex-col gap-0.5 \x62order-b \x62order-[\x76ar(\x2d-line)] bg-white px-4 py-3 \x6cast:\x62order-0 \x73m:\x66lex-row \x73m:\x69tems-center sm:gap-4"
          }
        >
          <p className={"w-36 shrink-0 text-[13px] font-medium \x74ext-[\x76ar(\x2d-text)]"}>
            ElevenLabs
          </p>
          <p className={"flex-1 text-[12.5px] \x74ext-[\x76ar(\x2d-text-secondary)]"}>
            Optional voiceover
          </p>
          <p className={"text-[12px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
            Free plan with a monthly character limit (check its licence terms); paid plans available
          </p>
        </div>
        <div
          className={
            "flex flex-col gap-0.5 \x62order-b \x62order-[\x76ar(\x2d-line)] bg-white px-4 py-3 \x6cast:\x62order-0 \x73m:\x66lex-row \x73m:\x69tems-center sm:gap-4"
          }
        >
          <p className={"w-36 shrink-0 text-[13px] font-medium \x74ext-[\x76ar(\x2d-text)]"}>
            Epidemic Sound
          </p>
          <p className={"flex-1 text-[12.5px] \x74ext-[\x76ar(\x2d-text-secondary)]"}>
            Optional, more human-sounding voiceover
          </p>
          <p className={"text-[12px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
            Paid subscription; a free trial has been offered before but may not be available
          </p>
        </div>
      </div>
      <p className={"mt-2 text-[12px] \x74ext-[\x76ar(\x2d-text-tertiary)]"}>
        Supported workflow: Claude Code with the skill installed in ~/.claude/skills. Renders run on
        your own computer, no API keys.
      </p>
    </section>
  );
}

function ImportedSectionBeforeYouExport() {
  return (
    <section className="mt-8">
      <h2 className={"mb-3 text-[15px] font-semibold \x74ext-[\x76ar(\x2d-text)]"}>
        Before you export
      </h2>
      <ul className={"\x73pace-y-2"}>
        <li
          className={
            "flex items-start gap-2.5 text-[13px] leading-relaxed \x74ext-[\x76ar(\x2d-text-secondary)]"
          }
        >
          <span
            className={
              "mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-white \x74ext-[\x76ar(\x2d-text)] \x73hadow-[\x30_0_0_1px_rgba(\x30,\x30,\x30,\x30.\x308)]"
            }
          >
            <svg
              width="10"
              height="10"
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
          Install Node.js 18 or newer from nodejs.org (one time)
        </li>
        <li
          className={
            "flex items-start gap-2.5 text-[13px] leading-relaxed \x74ext-[\x76ar(\x2d-text-secondary)]"
          }
        >
          <span
            className={
              "mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-white \x74ext-[\x76ar(\x2d-text)] \x73hadow-[\x30_0_0_1px_rgba(\x30,\x30,\x30,\x30.\x308)]"
            }
          >
            <svg
              width="10"
              height="10"
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
          Unzip organic.zip into your Claude skills folder (~/.claude/skills/organic)
        </li>
        <li
          className={
            "flex items-start gap-2.5 text-[13px] leading-relaxed \x74ext-[\x76ar(\x2d-text-secondary)]"
          }
        >
          <span
            className={
              "mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-white \x74ext-[\x76ar(\x2d-text)] \x73hadow-[\x30_0_0_1px_rgba(\x30,\x30,\x30,\x30.\x308)]"
            }
          >
            <svg
              width="10"
              height="10"
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
          Run "npm install --prefix scripts" inside that folder (one time; or let Claude do it with
          the install prompt)
        </li>
        <li
          className={
            "flex items-start gap-2.5 text-[13px] leading-relaxed \x74ext-[\x76ar(\x2d-text-secondary)]"
          }
        >
          <span
            className={
              "mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-white \x74ext-[\x76ar(\x2d-text)] \x73hadow-[\x30_0_0_1px_rgba(\x30,\x30,\x30,\x30.\x308)]"
            }
          >
            <svg
              width="10"
              height="10"
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
          Optional: create a voiceover in ElevenLabs or Epidemic Sound and drop the file in the
          video folder
        </li>
        <li
          className={
            "flex items-start gap-2.5 text-[13px] leading-relaxed \x74ext-[\x76ar(\x2d-text-secondary)]"
          }
        >
          <span
            className={
              "mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-white \x74ext-[\x76ar(\x2d-text)] \x73hadow-[\x30_0_0_1px_rgba(\x30,\x30,\x30,\x30.\x308)]"
            }
          >
            <svg
              width="10"
              height="10"
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
          Post or upload the finished MP4 yourself
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
              "relative flex h-12 flex-col items-center justify-center gap-0.5 rounded-full text-[10px] font-medium transition-[background,color] duration-150 \x62g-gradient-to-b \x66rom-white \x74o-[#\x663f3f2] \x74ext-[\x76ar(\x2d-text)] \x73hadow-[\x76ar(\x2d-shadow-raised)]"
            }
            aria-current="page"
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
            href="/pricing/videos"
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

function useSampleSelection() {
  useEffect(() => {
    const player = document.querySelector<HTMLVideoElement>("main video[controls]");
    const buttons = Array.from(
      document.querySelectorAll<HTMLButtonElement>("main button[aria-pressed]"),
    );
    const firstButton = buttons[0];
    if (!player || !firstButton) return;
    const selectedClass = firstButton.className;
    const idleClass = buttons[1]?.className ?? selectedClass;
    const select = (event: MouseEvent) => {
      const target = event.currentTarget;
      if (!(target instanceof HTMLButtonElement)) return;
      const src = target.querySelector("video")?.getAttribute("src");
      if (!src) return;
      buttons.forEach((button) => {
        button.setAttribute("aria-pressed", String(button === target));
        button.className = button === target ? selectedClass : idleClass;
      });
      player.pause();
      player.src = src;
      player.load();
      void player.play().catch(() => {});
    };
    buttons.forEach((button) => button.addEventListener("click", select));
    return () => buttons.forEach((button) => button.removeEventListener("click", select));
  }, []);
}
