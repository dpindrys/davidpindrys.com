"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

/**
 * Inline video with zoom cursor; click opens the same clip full-viewport like
 * {@link ZoomableProblemImagePair} problem figures.
 */
export default function ZoomableProblemVideo({
  src,
  type = "video/mp4",
  ariaLabel,
  labelledBy,
  describedBy,
  dialogLabel = "Enlarged video",
  cardClassName,
  focusRingOffsetClass = "focus-visible:ring-offset-[#F4F2EE]",
  videoClassName = "block h-auto w-full rounded-md border-0 bg-black/[0.02]",
}: {
  src: string;
  type?: string;
  ariaLabel: string;
  labelledBy?: string;
  describedBy?: string;
  dialogLabel?: string;
  cardClassName: string;
  focusRingOffsetClass?: string;
  videoClassName?: string;
}) {
  const [open, setOpen] = useState(false);
  const inlineRef = useRef<HTMLVideoElement>(null);
  const modalRef = useRef<HTMLVideoElement>(null);
  const timeForModalRef = useRef(0);

  const close = useCallback(() => {
    const t = modalRef.current?.currentTime ?? 0;
    setOpen(false);
    requestAnimationFrame(() => {
      const el = inlineRef.current;
      if (el) {
        el.currentTime = t;
        void el.play().catch(() => {});
      }
    });
  }, []);

  const openModal = useCallback(() => {
    timeForModalRef.current = inlineRef.current?.currentTime ?? 0;
    inlineRef.current?.pause();
    setOpen(true);
  }, []);

  useLayoutEffect(() => {
    if (!open) return;
    const el = modalRef.current;
    if (!el) return;
    el.currentTime = timeForModalRef.current;
    void el.play().catch(() => {});
  }, [open]);

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

  const sharedVideoProps = {
    muted: true,
    autoPlay: true,
    loop: true,
    playsInline: true,
    preload: "metadata" as const,
  };

  return (
    <>
      <div className={cardClassName}>
        <button
          type="button"
          onClick={openModal}
          className={`relative w-full cursor-zoom-in border-0 bg-transparent p-0 text-left outline-none focus-visible:ring-2 focus-visible:ring-black/25 focus-visible:ring-offset-2 ${focusRingOffsetClass}`}
          {...(labelledBy && describedBy
            ? { "aria-labelledby": labelledBy, "aria-describedby": describedBy }
            : { "aria-label": ariaLabel })}
        >
          <video
            ref={inlineRef}
            className={`${videoClassName} pointer-events-none`}
            aria-hidden
            {...sharedVideoProps}
          >
            <source src={src} type={type} />
          </video>
        </button>
      </div>

      {open ? (
        <div
          className="fixed inset-0 z-[100] flex cursor-zoom-out items-center justify-center bg-black/80 p-3 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={`${dialogLabel}. ${ariaLabel}. Click anywhere or press Escape to close.`}
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
          <video
            ref={modalRef}
            className="max-h-[min(92vh,100%)] w-full max-w-[min(1200px,100vw)] cursor-zoom-out rounded-md border-0 object-contain shadow-none"
            {...sharedVideoProps}
            controls
            aria-label={ariaLabel}
            onClick={(e) => e.stopPropagation()}
          >
            <source src={src} type={type} />
          </video>
        </div>
      ) : null}
    </>
  );
}
