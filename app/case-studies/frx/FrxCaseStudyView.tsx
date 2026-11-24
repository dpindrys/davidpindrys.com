"use client";

import Link from "next/link";
import { useCallback, useEffect, useId, useRef, useState } from "react";

import CaseStudyHeroVideo from "../../components/CaseStudyHeroVideo";
import CaseStudyMobileStickyChrome from "../../components/CaseStudyMobileStickyChrome";
import { DemoWalkthroughMobileCaptions } from "../../components/DemoCaptionChrome";
import { useNarratedDemoPlayback } from "../../hooks/useNarratedDemoPlayback";
import { frxDemoCaptions } from "../../lib/frxDemoCaptions";
import { instantScrollToTop } from "../../lib/instantScrollToTop";
import { companyNameClass } from "../../lib/pageStyles";
import FrxCaseStudyBody from "./FrxCaseStudyBody";
import {
  FRX_CASE_STUDY_MODAL_SUBTITLE,
  FRX_CASE_STUDY_MODAL_TITLE,
  frxCaseStudyNavSections,
  type FrxCaseStudyNavId,
} from "./frxCaseStudyNav";

const FRX_HERO_VIDEO_SRC = "/videos/fresenius-guided-zoom-v1.mp4";
const FRX_HERO_POSTER = "/images/frx/hero-poster.jpg";
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

/**
 * Full-viewport Frx case study: sticky sidebar + scrollspy, hero video with
 * caption bar. Site Header is suppressed on this route to avoid double nav.
 */
export default function FrxCaseStudyView() {
  const titleId = useId();
  const heroCaptionRef = useRef<HTMLElement>(null);
  const [activeNavId, setActiveNavId] = useState<FrxCaseStudyNavId>(
    frxCaseStudyNavSections[0].id,
  );

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
    videoHandlers,
    activeCueIndex,
  } = useNarratedDemoPlayback({
    captions: frxDemoCaptions,
    keyboardEnabled: true,
    resetKey: "frx-case-study-page",
    onPlayIntent: instantScrollToTop,
    pauseWhenOffscreenRef: heroCaptionRef,
  });

  const scrollToSection = useCallback((sectionId: FrxCaseStudyNavId) => {
    const target = document.getElementById(sectionId);
    if (!target) return;
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveNavId(sectionId);
  }, []);

  useEffect(() => {
    const sectionEls = frxCaseStudyNavSections
      .map(({ id }) => document.getElementById(id))
      .filter((el): el is HTMLElement => el != null);

    if (sectionEls.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length === 0) return;

        const anchorY = window.innerHeight * 0.18;

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
        // Band near the top of the viewport — matches scroll-mt eyebrow landings.
        rootMargin: "-8% 0px -65% 0px",
        threshold: [0, 0.01, 0.1, 0.25, 0.5, 0.75, 1],
      },
    );

    sectionEls.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <main
      id="main-content"
      className="min-h-dvh bg-[#F4F2EE]"
      aria-labelledby={titleId}
      aria-describedby={hasCaptions ? captionsId : undefined}
    >
      {hasCaptions && captions ? (
        <p id={captionsId} className="sr-only" aria-live="polite">
          {captions[activeCueIndex]?.text ?? ""}
        </p>
      ) : null}

      <div className="flex min-h-dvh min-w-0">
        <aside
          className="sticky top-0 hidden h-dvh max-h-dvh w-[min(280px,30vw)] shrink-0 flex-col self-start border-r border-black/10 bg-[#F4F2EE] md:flex"
          aria-label="Case study sections"
        >
          <div className="border-b border-black/10">
            <Link
              href="/#work"
              aria-label="Selected work"
              className={sidebarBackLinkClass}
            >
              <SidebarBackChevronIcon />
              Selected work
            </Link>
            <div className="min-w-0 px-3 py-4">
              <p className={companyNameClass}>{FRX_CASE_STUDY_MODAL_TITLE}</p>
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
          </nav>
        </aside>

        <div className="min-w-0 flex-1">
          <CaseStudyMobileStickyChrome
            title={FRX_CASE_STUDY_MODAL_TITLE}
            subtitle={FRX_CASE_STUDY_MODAL_SUBTITLE}
          >
            <header
              ref={heroCaptionRef}
              className="relative border-b border-black/10"
            >
              <h1 id={titleId} className="sr-only">
                {FRX_CASE_STUDY_MODAL_TITLE}
              </h1>
              <div
                className="relative flex w-full flex-col overflow-hidden bg-cover bg-center"
                style={{ backgroundImage: `url(${FRX_HERO_BG})` }}
              >
                <div className="relative mx-auto w-full max-w-[1200px] px-4 py-4">
                  <div className="relative w-full overflow-hidden rounded-[12px] shadow-[0_24px_60px_-20px_rgba(15,40,80,0.35)]">
                    <CaseStudyHeroVideo
                      videoRef={videoRef}
                      src={FRX_HERO_VIDEO_SRC}
                      poster={FRX_HERO_POSTER}
                      label="In-clinic digital refill workflow in CareTeamHub"
                      playing={playing}
                      onTogglePlayback={togglePlayback}
                      videoHandlers={videoHandlers}
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
          </CaseStudyMobileStickyChrome>

          <div className="mx-auto w-full max-w-[1200px]">
            <div className="w-full px-4 py-6 md:py-8">
              <FrxCaseStudyBody />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
