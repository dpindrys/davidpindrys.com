"use client";

import {
  useEffect,
  useState,
  type RefObject,
  type VideoHTMLAttributes,
} from "react";

/** Treat near-zero as the poster / first frame (matches narrated playback reset). */
const FIRST_FRAME_EPS = 0.05;

type CaseStudyHeroVideoProps = {
  videoRef: RefObject<HTMLVideoElement | null>;
  src: string;
  label: string;
  playing: boolean;
  onTogglePlayback: () => void;
  videoHandlers: VideoHTMLAttributes<HTMLVideoElement>;
};

/**
 * Case study hero clip: full-surface click toggles narrated play/pause.
 * A large centered play mark appears only on hover (or keyboard focus) while
 * the video is still on the first frame — not when paused mid-timeline.
 */
export default function CaseStudyHeroVideo({
  videoRef,
  src,
  label,
  playing,
  onTogglePlayback,
  videoHandlers,
}: CaseStudyHeroVideoProps) {
  const [atFirstFrame, setAtFirstFrame] = useState(true);
  const [focusVisible, setFocusVisible] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const sync = () => {
      setAtFirstFrame(video.currentTime <= FIRST_FRAME_EPS);
    };

    sync();
    video.addEventListener("timeupdate", sync);
    video.addEventListener("seeked", sync);
    video.addEventListener("loadedmetadata", sync);
    video.addEventListener("emptied", sync);
    return () => {
      video.removeEventListener("timeupdate", sync);
      video.removeEventListener("seeked", sync);
      video.removeEventListener("loadedmetadata", sync);
      video.removeEventListener("emptied", sync);
    };
  }, [videoRef, src]);

  // Invite start only while idle on frame 0; hide once playing or past the start.
  const showPlayMark = atFirstFrame && !playing;

  return (
    <div className="group relative w-full">
      <video
        ref={videoRef}
        src={src}
        className="block h-auto w-full"
        playsInline
        preload="metadata"
        aria-label={label}
        {...videoHandlers}
      />
      <button
        type="button"
        onClick={(event) => {
          onTogglePlayback();
          // Pointer activate: drop focus so a focus ring does not linger on the overlay.
          event.currentTarget.blur();
        }}
        onFocus={(event) => {
          setFocusVisible(event.currentTarget.matches(":focus-visible"));
        }}
        onBlur={() => setFocusVisible(false)}
        aria-label={playing ? `Pause demo: ${label}` : `Play demo: ${label}`}
        className="absolute inset-0 z-[1] flex cursor-pointer items-center justify-center outline-none !outline-none focus:outline-none focus-visible:outline-none focus-visible:!outline-none [-webkit-tap-highlight-color:transparent]"
      >
        <span
          aria-hidden
          className={`pointer-events-none flex h-20 w-20 items-center justify-center rounded-full bg-black/55 text-white transition-opacity duration-200 md:h-24 md:w-24 ${
            showPlayMark
              ? focusVisible
                ? "opacity-100 ring-2 ring-white/40 ring-offset-2 ring-offset-transparent"
                : "opacity-0 group-hover:opacity-100"
              : "opacity-0"
          }`}
        >
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="ml-1 h-9 w-9 md:h-11 md:w-11"
          >
            <path d="M8 5.14v13.72a1 1 0 0 0 1.52.85l10.6-6.86a1 1 0 0 0 0-1.7L9.52 4.29A1 1 0 0 0 8 5.14Z" />
          </svg>
        </span>
      </button>
    </div>
  );
}
