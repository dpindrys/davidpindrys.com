"use client";

import Link from "next/link";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type RefObject,
} from "react";
import { createPortal } from "react-dom";

import { DemoWalkthroughMobileCaptions } from "../../components/DemoCaptionChrome";
import { useNarratedDemoPlayback } from "../../hooks/useNarratedDemoPlayback";
import { frxDemoCaptions } from "../../lib/frxDemoCaptions";
import { companyNameClass } from "../../lib/pageStyles";
import FrxCaseStudyBody from "./FrxCaseStudyBody";
import {
  FRX_CASE_STUDY_MODAL_SUBTITLE,
  FRX_CASE_STUDY_MODAL_TITLE,
  frxCaseStudyNavSections,
  type FrxCaseStudyNavId,
} from "./frxCaseStudyNav";

const FRX_HERO_VIDEO_SRC = "/images/frx/fresenius.mp4";
const FRX_HERO_BG = "/images/frx/bg.png";
const FRX_PLAYBACK_CLIENT = "Fresenius Medical Care";

const sidebarBackLinkClass =
  "flex w-full items-center gap-2 border-b border-black/10 bg-black/[0.05] px-3 py-2.5 font-sans text-[14px] font-medium leading-snug tracking-[-0.01em] text-black/70 outline-none transition-colors hover:text-black focus-visible:ring-2 focus-visible:ring-black/25 focus-visible:ring-inset";

const navButtonClass =
  "w-full rounded-md px-3 py-2 text-left font-sans text-[14px] font-medium leading-snug tracking-[-0.01em] outline-none transition-colors focus-visible:ring-2 focus-visible:ring-black/25 focus-visible:ring-offset-2 focus-visible:ring-offset-[#F4F2EE]";

function SidebarBackChevronIcon() {
  return (
    <svg
      width="16"
      height="12"
      viewBox="0 0 16 12"
      fill="none"
      aria-hidden
      className="block shrink-0"
    >
      <path
        d="M15 6H2.5M6.5 1.5 1.5 6l5 4.5"
        stroke="currentColor"
        strokeWidth="1.15"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

type CloseModality = "keyboard" | "pointer";

export default function FrxCaseStudyModal({
  onClose,
  openerRef,
}: {
  onClose: () => void;
  openerRef: RefObject<HTMLButtonElement | null>;
}) {
  const titleId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const closeModalityRef = useRef<CloseModality>("pointer");
  const [activeNavId, setActiveNavId] = useState<FrxCaseStudyNavId>(
    frxCaseStudyNavSections[0].id,
  );
  const [mounted, setMounted] = useState(false);

  const {
    videoRef,
    captionsId,
    hasCaptions,
    hasNarrationAudio,
    narrationMuted,
    toggleNarrationMute,
    captions,
    playing,
    togglePlayback,
    seekToAdjacentCaption,
    seekToCaption,
    pauseSession,
    videoHandlers,
    activeCueIndex,
  } = useNarratedDemoPlayback({
    captions: frxDemoCaptions,
    keyboardEnabled: true,
    resetKey: "frx-case-study-modal",
  });

  const requestClose = useCallback(
    (modality: CloseModality) => {
      pauseSession();
      closeModalityRef.current = modality;
      if (modality === "pointer") {
        openerRef.current?.blur();
      }
      onClose();
    },
    [onClose, openerRef, pauseSession],
  );

  const scrollToSection = useCallback((sectionId: FrxCaseStudyNavId) => {
    const root = scrollRef.current;
    if (!root) return;

    const target =
      root.querySelector<HTMLElement>(`#${CSS.escape(sectionId)}`) ??
      document.getElementById(sectionId);
    if (!target) return;

    const scrollMarginTop =
      Number.parseFloat(getComputedStyle(target).scrollMarginTop) || 0;
    const targetTop =
      target.getBoundingClientRect().top - root.getBoundingClientRect().top;
    root.scrollTo({
      top: root.scrollTop + targetTop - scrollMarginTop,
      behavior: "smooth",
    });
    setActiveNavId(sectionId);
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const opener = openerRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeModalityRef.current = "pointer";

    const frame = requestAnimationFrame(() => {
      dialogRef.current?.focus({ preventScroll: true });
    });

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        requestClose("keyboard");
        return;
      }
      if (event.key !== "Tab") return;
      const dialog = dialogRef.current;
      const focusRoot = overlayRef.current ?? dialog;
      if (!focusRoot || !dialog) return;
      const focusable = [
        ...focusRoot.querySelectorAll<HTMLElement>(
          "button, a[href], video, input[type='range']",
        ),
      ].filter((el) => el.tabIndex !== -1 && !el.hasAttribute("disabled"));
      if (focusable.length === 0) {
        event.preventDefault();
        dialog.focus({ preventScroll: true });
        return;
      }
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;
      if (
        event.shiftKey &&
        (active === first || active === dialog || !focusRoot.contains(active))
      ) {
        event.preventDefault();
        last.focus();
      } else if (
        !event.shiftKey &&
        (active === last || active === dialog || active === focusRoot)
      ) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      if (closeModalityRef.current === "keyboard") {
        opener?.focus({ preventScroll: true });
      } else {
        opener?.blur();
      }
    };
  }, [openerRef, requestClose]);

  useEffect(() => {
    if (!mounted) return;

    const root = scrollRef.current;
    if (!root) return;

    const sectionEls = frxCaseStudyNavSections
      .map(({ id }) => root.querySelector<HTMLElement>(`#${CSS.escape(id)}`))
      .filter((el): el is HTMLElement => el != null);

    if (sectionEls.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length === 0) return;

        const rootRect = root.getBoundingClientRect();
        const anchorY = rootRect.top + rootRect.height * 0.18;

        const best = [...visible].sort((a, b) => {
          const aTop = a.boundingClientRect.top;
          const bTop = b.boundingClientRect.top;
          const aDist = Math.abs(aTop - anchorY);
          const bDist = Math.abs(bTop - anchorY);
          if (aDist !== bDist) return aDist - bDist;
          return bTop - aTop;
        })[0];

        if (best?.target.id) {
          setActiveNavId(best.target.id as FrxCaseStudyNavId);
        }
      },
      {
        root,
        // Band near the top of the scrollport — matches scroll-mt-8 eyebrow landings.
        rootMargin: "-8% 0px -65% 0px",
        threshold: [0, 0.01, 0.1, 0.25, 0.5, 0.75, 1],
      },
    );

    sectionEls.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [mounted]);

  if (!mounted || typeof document === "undefined") return null;

  return createPortal(
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[145] flex flex-col overflow-hidden bg-[#F4F2EE]"
    >
      <div
        role="dialog"
        ref={dialogRef}
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={hasCaptions ? captionsId : undefined}
        tabIndex={-1}
        className="flex min-h-0 flex-1 flex-col outline-none focus:outline-none"
      >
        {hasCaptions && captions ? (
          <p id={captionsId} className="sr-only" aria-live="polite">
            {captions[activeCueIndex]?.text ?? ""}
          </p>
        ) : null}

        <div
          ref={scrollRef}
          className="flex min-h-0 min-w-0 flex-1 overflow-y-auto overscroll-contain"
        >
          <aside
            className="sticky top-0 hidden h-dvh max-h-dvh w-[min(280px,30vw)] shrink-0 flex-col self-start border-r border-black/10 bg-[#F4F2EE] md:flex"
            aria-label="Case study sections"
          >
            <div className="border-b border-black/10">
              <Link
                href="/#work"
                onClick={() => requestClose("pointer")}
                aria-label="Back to work"
                className={sidebarBackLinkClass}
              >
                <SidebarBackChevronIcon />
                Back to work
              </Link>
              <div className="min-w-0 px-3 py-4">
                <p className={companyNameClass}>
                  {FRX_CASE_STUDY_MODAL_TITLE}
                </p>
                <p className="mt-1 font-sans text-[15px] leading-[1.4] text-black/70 md:text-[16px]">
                  {FRX_CASE_STUDY_MODAL_SUBTITLE}
                </p>
              </div>
            </div>
            <nav className="flex min-h-0 flex-1 flex-col gap-0.5 overflow-y-auto px-2 py-3">
              <ul className="flex flex-col gap-0.5">
                {frxCaseStudyNavSections.map(({ id, label }) => {
                  const active = activeNavId === id;
                  return (
                    <li key={id}>
                      <button
                        type="button"
                        className={`${navButtonClass} ${
                          active
                            ? "bg-black/[0.08] font-semibold text-black"
                            : "text-black/65 hover:bg-black/[0.04] hover:text-black"
                        }`}
                        aria-current={active ? "location" : undefined}
                        onClick={() => scrollToSection(id)}
                      >
                        {label}
                      </button>
                    </li>
                  );
                })}
              </ul>
              <p className="mt-auto px-2 pt-6 font-sans text-[12px] leading-snug text-black/45">
                Prefer a shareable URL?{" "}
                <Link
                  href="/case-studies/frx"
                  className="font-medium text-black/70 underline decoration-black/20 underline-offset-2 hover:text-black"
                >
                  Open full page
                </Link>
              </p>
            </nav>
          </aside>

          <div className="min-w-0 flex-1">
            <div className="mx-auto w-full max-w-[1200px]">
              <header className="relative border-b border-black/10">
                <h2 id={titleId} className="sr-only">
                  {FRX_CASE_STUDY_MODAL_TITLE}
                </h2>
                <div
                  className="relative flex flex-col overflow-hidden bg-cover bg-center"
                  style={{ backgroundImage: `url(${FRX_HERO_BG})` }}
                >
                  <div className="relative px-4 py-4">
                    <div className="relative w-full overflow-hidden rounded-[12px] shadow-[0_24px_60px_-20px_rgba(15,40,80,0.35)]">
                      <video
                        ref={videoRef}
                        src={FRX_HERO_VIDEO_SRC}
                        className="block h-auto w-full"
                        playsInline
                        preload="metadata"
                        aria-label="In-clinic digital refill workflow in CareTeamHub"
                        {...videoHandlers}
                      />
                    </div>
                  </div>
                </div>

                {hasCaptions && captions ? (
                  <DemoWalkthroughMobileCaptions
                    captions={captions}
                    activeCueIndex={activeCueIndex}
                    onSeekToAdjacentCaption={seekToAdjacentCaption}
                    onSeekToCaption={seekToCaption}
                    playing={playing}
                    onTogglePlayback={togglePlayback}
                    playbackClient={FRX_PLAYBACK_CLIENT}
                    hasNarrationAudio={hasNarrationAudio}
                    narrationMuted={narrationMuted}
                    onToggleNarrationMute={toggleNarrationMute}
                    showFromMd
                    showNavArrows={false}
                    flush
                  />
                ) : null}
              </header>

              <nav
                className="border-b border-black/10 md:hidden"
                aria-label="Case study sections"
              >
                <ul className="flex gap-1 overflow-x-auto px-3 py-2.5 [-webkit-overflow-scrolling:touch]">
                  {frxCaseStudyNavSections.map(({ id, label }) => {
                    const active = activeNavId === id;
                    return (
                      <li key={id} className="shrink-0">
                        <button
                          type="button"
                          className={`rounded-full px-3 py-1.5 font-sans text-[13px] font-medium leading-none whitespace-nowrap outline-none focus-visible:ring-2 focus-visible:ring-black/25 ${
                            active
                              ? "bg-black text-white"
                              : "bg-black/[0.06] text-black/70"
                          }`}
                          aria-current={active ? "location" : undefined}
                          onClick={() => scrollToSection(id)}
                        >
                          {label}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              <div className="w-full px-4 py-6 md:py-8">
                <FrxCaseStudyBody variant="modal" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}