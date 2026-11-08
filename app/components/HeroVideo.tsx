"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
  type RefObject,
} from "react";

type HeroVideoState = {
  videoRef: RefObject<HTMLVideoElement | null>;
  playing: boolean;
  setPlaying: (playing: boolean) => void;
  label: string | null;
  setLabel: (label: string) => void;
};

const HeroVideoContext = createContext<HeroVideoState | null>(null);

/**
 * Lets a play/pause toggle live outside the hero link (a button can't be nested
 * inside an <a>) while still controlling the video rendered inside it.
 */
export function HeroVideoProvider({ children }: { children: ReactNode }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  return (
    <HeroVideoContext.Provider value={{ videoRef, playing, setPlaying, label, setLabel }}>
      {children}
    </HeroVideoContext.Provider>
  );
}

/**
 * Muted autoplaying loop. When the OS asks for reduced motion the clip does not
 * autoplay (WCAG 2.2.2); HeroVideoToggle provides the pause control.
 */
export function HeroVideo({
  src,
  label,
  className,
  style,
}: {
  src: string;
  label: string;
  className?: string;
  style?: CSSProperties;
}) {
  const ctx = useContext(HeroVideoContext);
  const fallbackRef = useRef<HTMLVideoElement>(null);
  const ref = ctx?.videoRef ?? fallbackRef;
  const setPlaying = ctx?.setPlaying;
  const setLabel = ctx?.setLabel;
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    setLabel?.(label);
  }, [label, setLabel]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => {
      setReduceMotion(mq.matches);
      if (mq.matches) ref.current?.pause();
      // Autoplay can start before hydration attaches onPlay.
      setPlaying?.(ref.current ? !ref.current.paused : false);
    };
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, [ref, setPlaying]);

  return (
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
      preload="auto"
      onPlay={() => setPlaying?.(true)}
      onPause={() => setPlaying?.(false)}
    />
  );
}

export function HeroVideoToggle({ className }: { className?: string }) {
  const ctx = useContext(HeroVideoContext);
  if (!ctx?.label) return null;
  const { videoRef, playing, label } = ctx;

  const toggle = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) void video.play();
    else video.pause();
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`${playing ? "Pause" : "Play"} video: ${label}`}
      className={className}
    >
      <PlayPauseIcon playing={playing} />
    </button>
  );
}

export function PlayPauseIcon({ playing }: { playing: boolean }) {
  return playing ? (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className="h-5 w-5">
      <rect x="6" y="5" width="4" height="14" rx="1" />
      <rect x="14" y="5" width="4" height="14" rx="1" />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className="ml-0.5 h-5 w-5">
      <path d="M8 5.14v13.72a1 1 0 0 0 1.52.85l10.6-6.86a1 1 0 0 0 0-1.7L9.52 4.29A1 1 0 0 0 8 5.14Z" />
    </svg>
  );
}
