"use client";

import { useCallback, useEffect, useState } from "react";

import { ZOOM_MODAL_MEDIA_CLASSNAME } from "./zoomModalMediaClassName";

/**
 * Single thumbnail with zoom cursor; click opens a modal that scales media up to the
 * modal width (capped by viewport height), preserving aspect ratio.
 */
export default function ZoomableProblemImage({
  src,
  alt,
  shellClassName,
  imgClassName,
  focusRingOffsetClass = "focus-visible:ring-offset-[#F4F2EE]",
  dialogLabel = "Enlarged figure",
  elevateOnHover = true,
}: {
  src: string;
  alt: string;
  shellClassName: string;
  imgClassName: string;
  focusRingOffsetClass?: string;
  dialogLabel?: string;
  elevateOnHover?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const hoverClasses = elevateOnHover
    ? "transition-shadow duration-200 group-hover:shadow-[0_16px_48px_-20px_rgba(0,0,0,0.14),0_6px_16px_-6px_rgba(0,0,0,0.08)]"
    : "";

  return (
    <>
      <div className={`group ${shellClassName} ${hoverClasses}`}>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className={`relative w-full cursor-zoom-in border-0 bg-transparent p-0 text-left outline-none focus-visible:ring-2 focus-visible:ring-black/25 focus-visible:ring-offset-2 ${focusRingOffsetClass}`}
          aria-label={`View larger: ${alt}`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={alt}
            className={`${imgClassName} pointer-events-none`}
          />
        </button>
      </div>

      {open ? (
        <div
          className="fixed inset-0 z-[100] flex cursor-zoom-out items-center justify-center bg-black/80 p-3 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={`${dialogLabel}. Click anywhere or press Escape to close.`}
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
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={alt}
            className={`${ZOOM_MODAL_MEDIA_CLASSNAME} cursor-zoom-out`}
          />
        </div>
      ) : null}
    </>
  );
}
