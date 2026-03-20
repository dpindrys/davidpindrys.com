"use client";

import { useCallback, useEffect, useState } from "react";

export interface TriptychItem {
  src: string;
  alt: string;
}

export default function TriptychLightbox({ items }: { items: TriptychItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const close = useCallback(() => setOpenIndex(null), []);

  const goNext = useCallback(() => {
    setOpenIndex((i) => (i === null ? 0 : (i + 1) % items.length));
  }, [items.length]);

  const goPrev = useCallback(() => {
    setOpenIndex((i) => (i === null ? 0 : (i - 1 + items.length) % items.length));
  }, [items.length]);

  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
        return;
      }
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
  }, [openIndex, close, goNext, goPrev]);

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

  if (!items.length) return null;

  return (
    <>
      {/* Transparent gutters; no borders or shadows on thumbnails */}
      <div className="grid w-full grid-cols-3 gap-1 bg-transparent sm:gap-2">
        {items.map((item, i) => (
          <button
            key={`${item.src}-${i}`}
            type="button"
            onClick={() => setOpenIndex(i)}
            className="relative aspect-[16/10] w-full min-w-0 cursor-zoom-in overflow-hidden bg-transparent shadow-none outline-none focus-visible:ring-2 focus-visible:ring-black/25 focus-visible:ring-offset-2 focus-visible:ring-offset-[#F0F0F0]"
            aria-label={`View larger: ${item.alt}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.src}
              alt={item.alt}
              className="absolute inset-0 h-full w-full border-0 object-contain object-center shadow-none"
            />
          </button>
        ))}
      </div>

      {openIndex !== null && items[openIndex] && (
        <div
          className="fixed inset-0 z-[100] flex cursor-zoom-out items-center justify-center bg-black/90 p-3 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={`Image ${openIndex + 1} of ${items.length}. Use arrow keys to navigate.`}
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

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={items[openIndex].src}
            alt={items[openIndex].alt}
            className="max-h-[min(92vh,100%)] w-full max-w-[100vw] cursor-default border-0 object-contain shadow-none"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
