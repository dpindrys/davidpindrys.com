"use client";

import Link from "next/link";
import { useCallback, useEffect, useId, useState } from "react";

import CaseStudyHeroVideo from "../../components/CaseStudyHeroVideo";
import CaseStudyMobileStickyChrome from "../../components/CaseStudyMobileStickyChrome";
import { DemoWalkthroughMobileCaptions } from "../../components/DemoCaptionChrome";
import { useNarratedDemoPlayback } from "../../hooks/useNarratedDemoPlayback";
import { vehrDemoCaptions } from "../../lib/vehrDemoCaptions";
import { instantScrollToTop } from "../../lib/instantScrollToTop";
import { companyNameClass } from "../../lib/pageStyles";
import VehrCaseStudyBody from "./VehrCaseStudyBody";
import {
  VEHR_CASE_STUDY_MODAL_SUBTITLE,
  VEHR_CASE_STUDY_MODAL_TITLE,
  vehrCaseStudyNavSections,
  type VehrCaseStudyNavId,
} from "./vehrCaseStudyNav";

const VEHR_HERO_VIDEO_SRC = "/videos/vehr-zoom-subtly.mp4";
const VEHR_HERO_BG = "/images/vehr/bg.png";
const VEHR_PLAYBACK_CLIENT = "VEHR Technologies";

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
 * Full-viewport Visual EHR case study: sticky sidebar + scrollspy, hero video
 * with flush caption bar. Site Header is suppressed on this route to avoid
 * double nav.
 */
export default function VehrCaseStudyView() {
  const titleId = useId();
  const [activeNavId, setActiveNavId] = useState<VehrCaseStudyNavId>(
    vehrCaseStudyNavSections[0].id,
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
    captions: vehrDemoCaptions,
    keyboardEnabled: true,
    resetKey: "vehr-case-study-page",
    onPlayIntent: instantScrollToTop,
  });

  const scrollToSection = useCallback((sectionId: VehrCaseStudyNavId) => {
    const target = document.getElementById(sectionId);
    if (!target) return;
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveNavId(sectionId);
  }, []);

  useEffect(() => {
    const sectionEls = vehrCaseStudyNavSections
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
          setActiveNavId(best.target.id as VehrCaseStudyNavId);
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
              <p className={companyNameClass}>{VEHR_CASE_STUDY_MODAL_TITLE}</p>
              <p className="mt-1 font-sans text-[15px] leading-[1.4] text-black/70 md:text-[16px]">
                {VEHR_CASE_STUDY_MODAL_SUBTITLE}
              </p>
            </div>
          </div>
          <nav className="flex min-h-0 flex-1 flex-col gap-0.5 overflow-y-auto px-2 py-3">
            <ul className="flex flex-col gap-0.5">
              {vehrCaseStudyNavSections.map(({ id, label }) => {
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
            title={VEHR_CASE_STUDY_MODAL_TITLE}
            subtitle={VEHR_CASE_STUDY_MODAL_SUBTITLE}
          >
            <header className="relative border-b border-black/10">
              <h1 id={titleId} className="sr-only">
                {VEHR_CASE_STUDY_MODAL_TITLE}
              </h1>
              <div
                className="relative flex w-full flex-col overflow-hidden bg-cover bg-center"
                style={{ backgroundImage: `url(${VEHR_HERO_BG})` }}
              >
                <div className="relative mx-auto w-full max-w-[1200px] px-4 py-4">
                  <div className="relative w-full overflow-hidden rounded-[12px] shadow-[0_24px_60px_-20px_rgba(15,40,80,0.35)]">
                    <CaseStudyHeroVideo
                      videoRef={videoRef}
                      src={VEHR_HERO_VIDEO_SRC}
                      label="VEHR clinical timeline prototype for Jordan Reyes"
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
                  playbackClient={VEHR_PLAYBACK_CLIENT}
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
              <VehrCaseStudyBody />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
