"use client";

import { useState, type CSSProperties } from "react";
import { PlayPauseIcon } from "./HeroVideo";

type FloatingImage = { src: string; width: number; height: number };
type FloatingColumn = { images: readonly FloatingImage[]; duration: number; delay?: number };

/**
 * Columns of screens drifting upward in a seamless loop (each list is rendered
 * twice and the track moves by half its height). The pause button satisfies
 * WCAG 2.2.2; with reduced motion the columns stay still and the button hides.
 */
export default function FloatingColumns({
  columns,
  className,
  toggleClassName,
}: {
  columns: readonly FloatingColumn[];
  className?: string;
  toggleClassName?: string;
}) {
  const [playing, setPlaying] = useState(true);

  return (
    <>
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
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={image.src}
                    alt=""
                    width={image.width}
                    height={image.height}
                    className="block h-auto w-full rounded-[10px] shadow-[0_18px_40px_-18px_rgba(15,40,80,0.35)]"
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={() => setPlaying((value) => !value)}
        aria-label={`${playing ? "Pause" : "Play"} animation`}
        className={`${toggleClassName ?? ""} motion-reduce:hidden`}
      >
        <PlayPauseIcon playing={playing} />
      </button>
    </>
  );
}
