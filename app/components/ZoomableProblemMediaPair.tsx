"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";

import { ZOOM_MODAL_MEDIA_CLASSNAME } from "./zoomModalMediaClassName";

export type ZoomableMediaItem =
  | { kind: "image"; src: string; alt: string }
  | { kind: "video"; src: string; label: string; type?: string };

const thumbButtonClass =
  "relative w-full cursor-zoom-in border-0 bg-transparent p-0 text-left outline-none focus-visible:ring-2 focus-visible:ring-black/25 focus-visible:ring-offset-2 focus-visible:ring-offset-[#F4F2EE]";

const navButtonClass =
  "absolute top-1/2 z-[101] -translate-y-1/2 rounded-lg bg-white/10 px-3 py-4 font-sans text-white hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60";

/**
 * Side-by-side image and video thumbnails that share one lightbox.
 * Arrow buttons and left/right keys move between the items while it is open.
 */
export default function ZoomableProblemMediaPair({
  items,
  dialogLabel = "Enlarged figure",
}: {
  items: readonly ZoomableMediaItem[];
  dialogLabel?: string;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const inlineRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const modalVideoRef = useRef<HTMLVideoElement>(null);
  const itemsRef = useRef(items);
  itemsRef.current = items;
  const count = items.length;
  const active = openIndex !== null ? items[openIndex] : null;

  const close = useCallback(() => setOpenIndex(null), []);

  const goNext = useCallback(() => {
    setOpenIndex((i) => (i === null || count < 1 ? 0 : (i + 1) % count));
  }, [count]);

  const goPrev = useCallback(() => {
    setOpenIndex((i) => (i === null || count < 1 ? 0 : (i - 1 + count) % count));
  }, [count]);

  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
        return;
      }
      if (count < 2) return;
      if (event.key === "ArrowRight") {
        event.preventDefault();
        goNext();
        return;
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        goPrev();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openIndex, close, goNext, goPrev, count]);

  useEffect(() => {
    if (openIndex !== null) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [openIndex]);

  useEffect(() => {
    inlineRefs.current.forEach((video) => {
      if (!video) return;
      if (openIndex === null) void video.play().catch(() => {});
      else video.pause();
    });
  }, [openIndex]);

  useLayoutEffect(() => {
    if (openIndex === null) return;
    const item = itemsRef.current[openIndex];
    if (!item || item.kind !== "video") return;
    const modal = modalVideoRef.current;
    if (!modal) return;
    const inline = inlineRefs.current[openIndex];
    if (inline && Number.isFinite(inline.currentTime)) {
      modal.currentTime = inline.currentTime;
    }
    void modal.play().catch(() => {});
  }, [openIndex]);

  if (!count) return null;

  const dialog =
    active && openIndex !== null && typeof document !== "undefined"
      ? createPortal(
          <div
            className="fixed inset-0 z-[100] flex min-w-0 cursor-zoom-out items-center justify-center overflow-x-hidden bg-black/80 p-3 sm:p-6"
            role="dialog"
            aria-modal="true"
            aria-label={`${dialogLabel}. ${openIndex + 1} of ${count}. Use left and right arrow keys to switch. Press Escape to close.`}
            onClick={close}
          >
            <button
              type="button"
              className="absolute right-3 top-3 z-[101] rounded-lg bg-white/15 px-4 py-2 font-sans text-sm font-medium text-white hover:bg-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 sm:right-6 sm:top-6"
              onClick={(event) => {
                event.stopPropagation();
                close();
              }}
            >
              Close
            </button>

            {count > 1 ? (
              <>
                <button
                  type="button"
                  className={`${navButtonClass} left-2 sm:left-6`}
                  aria-label="Previous"
                  onClick={(event) => {
                    event.stopPropagation();
                    goPrev();
                  }}
                >
                  ←
                </button>
                <button
                  type="button"
                  className={`${navButtonClass} right-2 sm:right-6`}
                  aria-label="Next"
                  onClick={(event) => {
                    event.stopPropagation();
                    goNext();
                  }}
                >
                  →
                </button>
              </>
            ) : null}

            {active.kind === "image" ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={active.src}
                alt={active.alt}
                className={`${ZOOM_MODAL_MEDIA_CLASSNAME} cursor-zoom-out`}
              />
            ) : (
              <video
                ref={modalVideoRef}
                className={`${ZOOM_MODAL_MEDIA_CLASSNAME} cursor-default rounded-md`}
                muted
                autoPlay
                loop
                playsInline
                controls
                preload="metadata"
                aria-label={active.label}
                onClick={(event) => event.stopPropagation()}
              >
                <source src={active.src} type={active.type ?? "video/mp4"} />
              </video>
            )}
          </div>,
          document.body,
        )
      : null;

  return (
    <>
      {items.map((item, index) => (
        <div key={item.kind === "image" ? item.src : item.src} className="min-w-0 w-full">
          <button
            type="button"
            onClick={() => setOpenIndex(index)}
            className={thumbButtonClass}
            aria-label={
              item.kind === "image" ? `View larger: ${item.alt}` : item.label
            }
          >
            {item.kind === "image" ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={item.src}
                alt={item.alt}
                className="pointer-events-none block h-auto w-full rounded-md border-0"
              />
            ) : (
              <video
                ref={(node) => {
                  inlineRefs.current[index] = node;
                }}
                className="pointer-events-none block h-auto w-full rounded-md border-0 bg-black/[0.02]"
                muted
                autoPlay
                loop
                playsInline
                preload="metadata"
                aria-hidden
              >
                <source src={item.src} type={item.type ?? "video/mp4"} />
              </video>
            )}
          </button>
        </div>
      ))}
      {dialog}
    </>
  );
}
