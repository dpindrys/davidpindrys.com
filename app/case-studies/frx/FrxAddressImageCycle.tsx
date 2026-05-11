"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import { ZOOM_MODAL_MEDIA_CLASSNAME } from "../../components/zoomModalMediaClassName";

const SLIDES = [
  {
    src: "/images/frx/address1.png",
    alt: "Shipping address step one in the refill workflow",
  },
  {
    src: "/images/frx/address2.png",
    alt: "Shipping address step two in the refill workflow",
  },
  {
    src: "/images/frx/address3.png",
    alt: "Shipping address step three in the refill workflow",
  },
] as const;

export default function FrxAddressImageCycle() {
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);

  const count = SLIDES.length;
  const slide = SLIDES[index];

  const close = useCallback(() => setOpen(false), []);

  const goNext = useCallback(() => {
    setIndex((i) => (i + 1) % count);
  }, [count]);

  const goPrev = useCallback(() => {
    setIndex((i) => (i - 1 + count) % count);
  }, [count]);

  const keyHelp = useMemo(() => {
    return `Shipping address screens. Image ${index + 1} of ${count}. Use left/right arrows to switch images. Press Escape to close.`;
  }, [count, index]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!open) return;
      if (e.key === "Escape") {
        e.preventDefault();
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
  }, [open, close, goNext, goPrev]);

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <div className="relative w-full">
        <button
          type="button"
          className="relative w-full cursor-zoom-in border-0 bg-transparent p-0 text-left outline-none focus-visible:ring-2 focus-visible:ring-black/25 focus-visible:ring-offset-2 focus-visible:ring-offset-[#F4F2EE]"
          aria-label={`View larger: ${slide.alt}`}
          onClick={() => setOpen(true)}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={slide.src}
            alt={slide.alt}
            className="block h-auto w-full rounded-md border-0 pointer-events-none"
          />
        </button>

        <button
          type="button"
          className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-lg bg-black/10 px-3 py-3 font-sans text-[18px] font-medium text-black/75 hover:bg-black/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black/25"
          aria-label="Previous image"
          onClick={goPrev}
        >
          ←
        </button>
        <button
          type="button"
          className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-lg bg-black/10 px-3 py-3 font-sans text-[18px] font-medium text-black/75 hover:bg-black/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black/25"
          aria-label="Next image"
          onClick={goNext}
        >
          →
        </button>
      </div>

      {open ? (
        <div
          className="fixed inset-0 z-[100] flex cursor-zoom-out items-center justify-center bg-black/80 p-3 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={keyHelp}
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
            src={slide.src}
            alt={slide.alt}
            className={`${ZOOM_MODAL_MEDIA_CLASSNAME} cursor-zoom-out`}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      ) : null}
    </>
  );
}
