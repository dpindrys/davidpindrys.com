"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

type HoverControlsVideoProps = {
  src: string;
  /** Describes the clip for screen readers and names the play/pause button. */
  label: string;
  className?: string;
  style?: CSSProperties;
  preload?: "auto" | "metadata" | "none";
};

/**
 * Autoplaying loop with a large centered play/pause button that only appears on
 * hover or keyboard focus. No native controls.
 *
 * WCAG 2.2.2 (Pause, Stop, Hide, Level A) requires a way to pause motion that
 * starts on its own and runs past five seconds, so the button stays reachable by
 * keyboard and becomes visible on focus. When the OS asks for reduced motion the
 * clip does not autoplay.
 */
export default function HoverControlsVideo({
  src,
  label,
  className,
  style,
  preload = "auto",
}: HoverControlsVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => {
      setReduceMotion(mq.matches);
      if (mq.matches) ref.current?.pause();
      // Autoplay can start before hydration attaches onPlay.
      setPlaying(ref.current ? !ref.current.paused : false);
    };
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  const toggle = () => {
    const video = ref.current;
    if (!video) return;
    if (video.paused) void video.play();
    else video.pause();
  };

  return (
    <div className="group relative w-full">
      <video
        ref={ref}
        src={src}
        className={className}
        style={style}
        aria-label={label}
        autoPlay={!reduceMotion}
        muted
        loop
        playsInline
        preload={preload}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />
      <button
        type="button"
        onClick={toggle}
        aria-label={`${playing ? "Pause" : "Play"} video: ${label}`}
        className="absolute inset-0 flex cursor-pointer items-center justify-center opacity-0 outline-none transition-opacity duration-200 group-hover:opacity-100 focus-visible:opacity-100"
      >
        <span className="flex h-20 w-20 items-center justify-center rounded-full bg-black/60 text-white md:h-24 md:w-24">
          {playing ? (
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className="h-9 w-9 md:h-11 md:w-11">
              <rect x="6" y="5" width="4" height="14" rx="1" />
              <rect x="14" y="5" width="4" height="14" rx="1" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className="ml-1 h-9 w-9 md:h-11 md:w-11">
              <path d="M8 5.14v13.72a1 1 0 0 0 1.52.85l10.6-6.86a1 1 0 0 0 0-1.7L9.52 4.29A1 1 0 0 0 8 5.14Z" />
            </svg>
          )}
        </span>
      </button>
    </div>
  );
}
