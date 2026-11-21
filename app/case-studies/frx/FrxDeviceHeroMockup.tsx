"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  DemoCaptionBody,
  DemoShortcutHints,
} from "../../components/DemoCaptionChrome";
import { useNarratedDemoPlayback } from "../../hooks/useNarratedDemoPlayback";
import { frxDemoCaptions } from "../../lib/frxDemoCaptions";

const FRX_HERO_VIDEO_SRC = "/images/frx/fresenius.mp4";
const FRX_HERO_LABEL = "In-clinic digital refill workflow in CareTeamHub";

/**
 * Full-bleed play/pause: no focus ring on the button itself (globals.css
 * `button:focus-visible` loses to this attribute rule + !outline-none).
 * Keyboard affordance is a ring on the circular mark only.
 */
const heroPlayButtonClass =
  "absolute inset-0 z-[1] flex cursor-pointer items-center justify-center opacity-0 outline-none !outline-none transition-opacity duration-200 focus:outline-none focus-visible:outline-none focus-visible:!outline-none group-hover:opacity-100 focus-visible:opacity-100 [-webkit-tap-highlight-color:transparent]";

const heroPlayMarkClass =
  "flex h-20 w-20 items-center justify-center rounded-full bg-black/60 text-white md:h-24 md:w-24";

const heroPlayMarkFocusRingClass =
  "ring-2 ring-white/40 ring-offset-2 ring-offset-transparent";

function PlayIcon({ className = "ml-1 h-9 w-9 md:h-11 md:w-11" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="currentColor">
      <path d="M8 5.2v13.6a.8.8 0 0 0 1.22.68l10.4-6.8a.8.8 0 0 0 0-1.36L9.22 4.52A.8.8 0 0 0 8 5.2Z" />
    </svg>
  );
}

function PauseIcon({ className = "h-9 w-9 md:h-11 md:w-11" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="currentColor">
      <rect x="6" y="5" width="4" height="14" rx="1" />
      <rect x="14" y="5" width="4" height="14" rx="1" />
    </svg>
  );
}

export default function FrxDeviceHeroMockup() {
  const heroRef = useRef<HTMLElement>(null);
  const [heroInView, setHeroInView] = useState(true);
  const [focusVisible, setFocusVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  const {
    videoRef,
    captionsId,
    hasCaptions,
    hasNarrationAudio,
    narrationMuted,
    toggleNarrationMute,
    captions,
    captionText,
    captionOpaque,
    captionSpacer,
    segmentFills,
    playing,
    playbackStarted,
    togglePlayback,
    seekToCaption,
    pauseSession,
    videoHandlers,
  } = useNarratedDemoPlayback({
    captions: frxDemoCaptions,
    // Space/arrows only while the fixed chrome is up (hero in view after play).
    keyboardEnabled: heroInView,
    keyboardRequiresPlaybackStarted: true,
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setHeroInView(entry.isIntersecting && entry.intersectionRatio > 0.12);
      },
      { threshold: [0, 0.12, 0.25, 0.5] },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  /**
   * Scroll past hero → hide fixed bar and pause video + narration.
   * Scroll back → bar can return (playbackStarted stays latched) but playback
   * stays paused until the user hits play / Space again (pauseSession never resumes).
   */
  useEffect(() => {
    if (!heroInView && playbackStarted) {
      pauseSession();
    }
  }, [heroInView, pauseSession, playbackStarted]);

  const showCaptionBar =
    playbackStarted && heroInView && hasCaptions && captions != null && captions.length > 0;

  return (
    <>
      <figure
        ref={heroRef}
        className="group relative w-full overflow-hidden rounded-[16px]"
      >
        <video
          ref={videoRef}
          src={FRX_HERO_VIDEO_SRC}
          className="block h-auto w-[calc(100%+1px)] max-w-none -translate-x-px"
          aria-label={FRX_HERO_LABEL}
          aria-describedby={showCaptionBar ? captionsId : undefined}
          muted
          playsInline
          preload="auto"
          {...videoHandlers}
        />
        <button
          type="button"
          data-frx-hero-play=""
          onClick={(event) => {
            togglePlayback();
            // Pointer activate: drop focus so the full-bleed control cannot flash an outline.
            event.currentTarget.blur();
          }}
          onFocus={(event) => {
            setFocusVisible(event.currentTarget.matches(":focus-visible"));
          }}
          onBlur={() => setFocusVisible(false)}
          aria-label={`${playing ? "Pause" : "Play"} video: ${FRX_HERO_LABEL}`}
          className={heroPlayButtonClass}
        >
          <span
            className={
              focusVisible
                ? `${heroPlayMarkClass} ${heroPlayMarkFocusRingClass}`
                : heroPlayMarkClass
            }
            aria-hidden="true"
          >
            {playing ? (
              <PauseIcon className="h-9 w-9 md:h-11 md:w-11" />
            ) : (
              <PlayIcon className="ml-1 h-9 w-9 md:h-11 md:w-11" />
            )}
          </span>
        </button>
      </figure>

      {mounted && showCaptionBar && captions
        ? createPortal(
            <div
              className="fixed inset-x-0 bottom-0 z-[120] border-t border-black/10 bg-[#F4F2EE]"
              role="region"
              aria-label="Demo captions"
            >
              <div className="mx-auto w-full max-w-5xl px-4 pb-3 pt-3 sm:px-5 sm:pb-4 sm:pt-3.5">
                <DemoCaptionBody
                  captions={captions}
                  captionText={captionText}
                  captionOpaque={captionOpaque}
                  captionSpacer={captionSpacer}
                  segmentFills={segmentFills}
                  captionsId={captionsId}
                  onSeekToCaption={seekToCaption}
                  hasNarrationAudio={hasNarrationAudio}
                  narrationMuted={narrationMuted}
                  onToggleNarrationMute={toggleNarrationMute}
                />
                <div className="mt-3 border-t border-black/10 pt-3 sm:mt-3.5 sm:pt-3.5">
                  <DemoShortcutHints showCaptions />
                </div>
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
