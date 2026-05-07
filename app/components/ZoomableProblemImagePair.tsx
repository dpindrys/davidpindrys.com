"use client";

import { useCallback, useEffect, useState, type ReactNode } from "react";

export type ZoomableProblemImageColumn = {
  src: string;
  alt: string;
  caption: ReactNode;
};

const thumbImgClass =
  "block h-auto w-full rounded-none border border-black/10 bg-white/40 shadow-[0_12px_40px_-18px_rgba(0,0,0,0.12),0_4px_12px_-4px_rgba(0,0,0,0.08)]";

/**
 * Two-column problem visuals: zoom cursor on thumbnails, click opens full-screen modal,
 * click anywhere closes, arrow keys cycle within this pair.
 */
export default function ZoomableProblemImagePair({
  columns,
  className,
  dialogLabel = "Enlarged figure",
}: {
  columns: ZoomableProblemImageColumn[];
  /** Grid wrapper classes (margins, gaps, responsive columns). */
  className?: string;
  dialogLabel?: string;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const count = columns.length;

  const close = useCallback(() => setOpenIndex(null), []);

  const goNext = useCallback(() => {
    setOpenIndex((i) =>
      i === null || count < 1 ? 0 : (i + 1) % count,
    );
  }, [count]);

  const goPrev = useCallback(() => {
    setOpenIndex((i) =>
      i === null || count < 1 ? 0 : (i - 1 + count) % count,
    );
  }, [count]);

  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
        return;
      }
      if (count < 2) return;
      if (e.key === "ArrowRight") {
        e.preventDefault();
        goNext();
        return;
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        goPrev();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openIndex, close, goNext, goPrev, count]);

  useEffect(() => {
    if (openIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [openIndex]);

  if (!count) return null;

  const active = openIndex !== null ? columns[openIndex] : null;

  return (
    <>
      <div className={className}>
        {columns.map((col, i) => (
          <div key={col.src} className="flex min-w-0 w-full flex-col gap-3">
            <button
              type="button"
              onClick={() => setOpenIndex(i)}
              className="relative w-full cursor-zoom-in border-0 bg-transparent p-0 text-left outline-none focus-visible:ring-2 focus-visible:ring-black/25 focus-visible:ring-offset-2 focus-visible:ring-offset-[#E8E6E1]"
              aria-label={`View larger: ${col.alt}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={col.src}
                alt={col.alt}
                className={`${thumbImgClass} pointer-events-none`}
              />
            </button>
            {col.caption}
          </div>
        ))}
      </div>

      {active && openIndex !== null && (
        <div
          className="fixed inset-0 z-[100] flex cursor-zoom-out items-center justify-center bg-black/80 p-3 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={`${dialogLabel}. Image ${openIndex + 1} of ${count}. Click anywhere or press Escape to close. Use arrow keys to switch images.`}
          onClick={close}
        >
          <button
            type="button"
            className="absolute right-3 top-3 z-[101] rounded-lg bg-white/15 px-4 py-2 font-sans text-sm font-medium text-white hover:bg-white/25 sm:right-6 sm:top-6"
            onClick={(e) => {
              e.stopPropagation();
              close();
            }}
          >
            Close
          </button>

          {count > 1 ? (
            <>
              <button
                type="button"
                className="absolute left-2 top-1/2 z-[101] -translate-y-1/2 rounded-lg bg-white/10 px-3 py-4 font-sans text-white hover:bg-white/20 sm:left-6"
                aria-label="Previous image"
                onClick={(e) => {
                  e.stopPropagation();
                  goPrev();
                }}
              >
                ←
              </button>
              <button
                type="button"
                className="absolute right-2 top-1/2 z-[101] -translate-y-1/2 rounded-lg bg-white/10 px-3 py-4 font-sans text-white hover:bg-white/20 sm:right-6"
                aria-label="Next image"
                onClick={(e) => {
                  e.stopPropagation();
                  goNext();
                }}
              >
                →
              </button>
            </>
          ) : null}

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={active.src}
            alt={active.alt}
            className="max-h-[min(92vh,100%)] w-full max-w-[100vw] cursor-zoom-out border-0 object-contain shadow-none"
          />
        </div>
      )}
    </>
  );
}
