"use client";

import { useCallback, useEffect, useId, useMemo, useState } from "react";

import { ZOOM_MODAL_MEDIA_CLASSNAME } from "../../components/zoomModalMediaClassName";
import { frxOutlineCardClass } from "./frxCaseStudyTypography";

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

const cardClass = `${frxOutlineCardClass} overflow-hidden bg-white`;

const modalNavButtonClass =
  "absolute top-1/2 z-[101] -translate-y-1/2 rounded-lg bg-white/10 px-3 py-4 font-sans text-white hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60";

/**
 * One white card with three address thumbnails visible at once.
 * Zoom lives only in the modal (arrows / keyboard cycle there).
 */
export default function FrxPrototypeScanGallery() {
  const labelId = useId();
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);

  const count = SLIDES.length;
  const slide = SLIDES[index];

  const close = useCallback(() => setOpen(false), []);

  const openAt = useCallback((i: number) => {
    setIndex(i);
    setOpen(true);
  }, []);

  const goNext = useCallback(() => {
    setIndex((i) => (i + 1) % count);
  }, [count]);

  const goPrev = useCallback(() => {
    setIndex((i) => (i - 1 + count) % count);
  }, [count]);

  const statusText = useMemo(
    () => `Shipping address screens · ${index + 1} of ${count}`,
    [count, index],
  );

  const dialogLabel = useMemo(
    () =>
      `${statusText}. ${slide.alt}. Use left and right arrows to switch images. Press Escape to close.`,
    [slide.alt, statusText],
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
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
      <div
        className={`${cardClass} flex w-full min-w-0 flex-col gap-3`}
        role="region"
        aria-labelledby={labelId}
      >
        <p
          id={labelId}
          className="font-sans text-[13px] font-medium leading-none tracking-[0.04em] text-black/70"
        >
          Shipping address screens
        </p>

        <ul className="grid w-full min-w-0 grid-cols-3 gap-2 sm:gap-3">
          {SLIDES.map((item, i) => (
            <li key={item.src} className="min-w-0">
              <button
                type="button"
                className="relative w-full cursor-zoom-in border-0 bg-transparent p-0 text-left outline-none focus-visible:ring-2 focus-visible:ring-black/25 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                aria-label={`View larger: ${item.alt} (${i + 1} of ${count})`}
                onClick={() => openAt(i)}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.src}
                  alt={item.alt}
                  className="pointer-events-none block h-auto w-full rounded-md border border-black/10"
                />
              </button>
            </li>
          ))}
        </ul>
      </div>

      {open ? (
        <div
          className="fixed inset-0 z-[100] flex min-w-0 cursor-zoom-out items-center justify-center overflow-x-hidden bg-black/80 p-3 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={dialogLabel}
          onClick={close}
        >
          <button
            type="button"
            className="absolute right-3 top-3 z-[101] rounded-lg bg-white/15 px-4 py-2 font-sans text-sm font-medium text-white hover:bg-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 sm:right-6 sm:top-6"
            onClick={(e) => {
              e.stopPropagation();
              close();
            }}
          >
            Close
          </button>

          <button
            type="button"
            className={`${modalNavButtonClass} left-2 sm:left-6`}
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
            className={`${modalNavButtonClass} right-2 sm:right-6`}
            aria-label="Next image"
            onClick={(e) => {
              e.stopPropagation();
              goNext();
            }}
          >
            →
          </button>

          <p className="pointer-events-none absolute bottom-3 left-1/2 z-[101] -translate-x-1/2 rounded-md bg-black/50 px-3 py-1.5 font-sans text-[13px] font-medium text-white sm:bottom-6">
            {index + 1} / {count}
          </p>

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
