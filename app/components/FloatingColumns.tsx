"use client";

import { createContext, useContext, useEffect, useState, type CSSProperties, type ReactNode } from "react";
import { PlayPauseIcon } from "./HeroVideo";

type FloatingImage = { src: string; width: number; height: number };
type FloatingColumn = { images: readonly FloatingImage[]; duration: number; delay?: number };

/** Phone screen width the exports are measured against; narrower crops get the page gutter back. */
const SCREEN_WIDTH = 375;

function gutterPercent(width: number) {
  return `${(Math.max(0, SCREEN_WIDTH - width) / 2 / SCREEN_WIDTH) * 100}%`;
}

type FloatingPlayback = {
  playing: boolean;
  setPlaying: (playing: boolean) => void;
  mounted: boolean;
  setMounted: (mounted: boolean) => void;
};

const FloatingPlaybackContext = createContext<FloatingPlayback | null>(null);

/**
 * Lets the pause toggle live outside a link wrapping the columns (a button can't
 * be nested inside an <a>). The toggle satisfies WCAG 2.2.2.
 */
export function FloatingPlaybackProvider({ children }: { children: ReactNode }) {
  const [playing, setPlaying] = useState(true);
  const [mounted, setMounted] = useState(false);
  return (
    <FloatingPlaybackContext.Provider value={{ playing, setPlaying, mounted, setMounted }}>
      {children}
    </FloatingPlaybackContext.Provider>
  );
}

export function FloatingColumnsToggle({ className }: { className?: string }) {
  const ctx = useContext(FloatingPlaybackContext);
  if (!ctx?.mounted) return null;
  const { playing, setPlaying } = ctx;
  return (
    <button
      type="button"
      onClick={() => setPlaying(!playing)}
      aria-label={`${playing ? "Pause" : "Play"} animation`}
      className={`${className ?? ""} motion-reduce:hidden`}
    >
      <PlayPauseIcon playing={playing} />
    </button>
  );
}

/**
 * Columns of screens drifting upward in a seamless loop (each list is rendered
 * twice and the track moves by half its height). Render inside
 * FloatingPlaybackProvider with a FloatingColumnsToggle; with reduced motion the
 * columns stay still and the toggle hides.
 */
export default function FloatingColumns({
  columns,
  className,
}: {
  columns: readonly FloatingColumn[];
  className?: string;
}) {
  const ctx = useContext(FloatingPlaybackContext);
  const playing = ctx?.playing ?? true;
  const setMounted = ctx?.setMounted;

  useEffect(() => {
    setMounted?.(true);
    return () => setMounted?.(false);
  }, [setMounted]);

  return (
    <div aria-hidden="true" className={className}>
      {columns.map((column, i) => (
        <div key={i} className="min-w-0">
          <div
            className="animate-float-up flex flex-col"
            style={
              {
                "--float-duration": `${column.duration}s`,
                animationDelay: column.delay ? `-${column.delay}s` : undefined,
                animationPlayState: playing ? "running" : "paused",
              } as CSSProperties
            }
          >
            {[...column.images, ...column.images].map((image, j) => (
              <div key={j} className="pb-[10%]">
                <div
                  className="overflow-hidden rounded-[10px] shadow-[0_18px_40px_-18px_rgba(15,40,80,0.35)]"
                  style={{ padding: gutterPercent(image.width) }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={image.src}
                    alt=""
                    width={image.width}
                    height={image.height}
                    className="block h-auto w-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
