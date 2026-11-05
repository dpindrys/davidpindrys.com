"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";

import type { Photo, PhotoGroup } from "../lib/photos";

const MIN_SEQUENCE_ITEMS = 8;
const SECONDS_PER_ITEM = 14;
const SECONDS_PER_GROUP = 3;

const lightboxNavClass =
  "absolute top-1/2 z-[1] flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/55 text-white transition-colors hover:bg-black/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

function ChevronIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true" fill="none">
      <path
        d={direction === "left" ? "M15 5l-7 7 7 7" : "M9 5l7 7-7 7"}
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[1.1em] w-[1.1em] shrink-0" aria-hidden="true" fill="none">
      <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function Lightbox({
  photos,
  index,
  onNavigate,
  onClose,
}: {
  photos: readonly Photo[];
  index: number;
  onNavigate: (step: 1 | -1) => void;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const photo = photos[index];

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        onNavigate(1);
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        onNavigate(-1);
      } else if (event.key === "Tab") {
        const dialog = dialogRef.current;
        if (!dialog) return;
        const focusable = [...dialog.querySelectorAll<HTMLElement>("button:not([disabled])")];
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        const active = document.activeElement;
        if (event.shiftKey && (active === first || !dialog.contains(active))) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && (active === last || !dialog.contains(active))) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose, onNavigate]);

  return createPortal(
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label="Photo viewer"
      onClick={onClose}
      className="fixed inset-0 z-[130] flex items-center justify-center bg-black/85 px-4 py-16 motion-safe:animate-page-fade-in sm:px-20"
    >
      <p aria-live="polite" className="absolute left-4 top-5 font-sans text-[14px] leading-none text-white/80 sm:left-6 sm:top-7">
        {index + 1} of {photos.length}
      </p>
      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        className="absolute right-3 top-3 z-[1] inline-flex items-center gap-2 px-3 py-2.5 font-sans text-[14px] font-medium leading-none text-white/85 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-white sm:right-5 sm:top-5"
      >
        Close
        <CloseIcon />
      </button>
      {photos.length > 1 ? (
        <>
          <button
            type="button"
            aria-label="Previous photo"
            onClick={(event) => {
              event.stopPropagation();
              onNavigate(-1);
            }}
            className={`${lightboxNavClass} left-3 sm:left-5`}
          >
            <ChevronIcon direction="left" />
          </button>
          <button
            type="button"
            aria-label="Next photo"
            onClick={(event) => {
              event.stopPropagation();
              onNavigate(1);
            }}
            className={`${lightboxNavClass} right-3 sm:right-5`}
          >
            <ChevronIcon direction="right" />
          </button>
        </>
      ) : null}
      <Image
        key={photo.src}
        src={photo.src}
        alt={photo.alt}
        width={photo.width}
        height={photo.height}
        sizes="(min-width: 640px) calc(100vw - 10rem), 100vw"
        onClick={(event) => event.stopPropagation()}
        className="h-auto max-h-[calc(100dvh-8rem)] w-auto max-w-full object-contain motion-safe:animate-page-fade-in"
      />
    </div>,
    document.body,
  );
}

export default function PhotoCarousel({ groups }: { groups: readonly PhotoGroup[] }) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const openerRef = useRef<HTMLButtonElement | null>(null);
  const openedByPointerRef = useRef(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const photos = useMemo(() => groups.flatMap((group) => group.photos), [groups]);
  const groupStarts = useMemo(() => {
    let start = 0;
    return groups.map((group) => {
      const current = start;
      start += group.photos.length;
      return current;
    });
  }, [groups]);

  const navigate = useCallback(
    (step: 1 | -1) => {
      setOpenIndex((current) => (current === null ? current : (current + step + photos.length) % photos.length));
    },
    [photos.length],
  );

  const close = useCallback(() => {
    setOpenIndex(null);
    const opener = openerRef.current;
    if (!opener) return;
    opener.focus({ preventScroll: true });
    if (openedByPointerRef.current) opener.blur();
  }, []);

  if (photos.length === 0) return null;

  const repeats = Math.max(1, Math.ceil(MIN_SEQUENCE_ITEMS / photos.length));
  const sequence = Array.from({ length: repeats * groups.length }, (_, i) => i % groups.length);
  const sequenceItems = repeats * photos.length;
  const track = [...sequence, ...sequence];
  const paused = openIndex !== null;

  return (
    <div>
      <div
        ref={viewportRef}
        onBlur={(event) => {
          const viewport = viewportRef.current;
          if (!viewport || viewport.contains(event.relatedTarget as Node | null) || prefersReducedMotion()) return;
          viewport.scrollLeft = 0;
        }}
        className="group/strip overflow-hidden motion-reduce:overflow-x-auto"
      >
        <ul
          aria-label="Photos"
          style={{
            animationDuration: `${sequenceItems * SECONDS_PER_ITEM + sequence.length * SECONDS_PER_GROUP}s`,
            ...(paused ? { animationPlayState: "paused" } : {}),
          }}
          className="flex w-max items-start pb-2 motion-safe:animate-photo-drift group-has-[:focus-visible]/strip:[animation-play-state:paused]"
        >
          {track.map((groupIndex, position) => {
            const group = groups[groupIndex];
            const isCopy = position >= groups.length;
            return (
              <li
                key={position}
                aria-hidden={isCopy || undefined}
                className={`flex shrink-0 items-start pl-16 md:pl-[120px] ${isCopy ? "motion-reduce:hidden" : ""}`}
              >
                <ul className="flex items-start gap-5 md:gap-10">
                  {group.photos.map((photo, offset) => {
                    const photoIndex = groupStarts[groupIndex] + offset;
                    const aspect = photo.width / photo.height;
                    return (
                      <li key={photo.src} className="shrink-0">
                        <button
                          type="button"
                          tabIndex={isCopy ? -1 : undefined}
                          aria-label={`Open photo: ${photo.alt}`}
                          onClick={(event) => {
                            openerRef.current = event.currentTarget;
                            openedByPointerRef.current = event.detail > 0;
                            setOpenIndex(photoIndex);
                          }}
                          className="block cursor-zoom-in overflow-hidden rounded-[20px] outline-none focus-visible:ring-2 focus-visible:ring-black/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#F4F2EE]"
                        >
                          <Image
                            src={photo.src}
                            alt=""
                            width={photo.width}
                            height={photo.height}
                            sizes={`(min-width: 768px) ${Math.ceil(240 * aspect)}px, ${Math.ceil(160 * aspect)}px`}
                            className="block h-[160px] w-auto md:h-[240px]"
                          />
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </li>
            );
          })}
        </ul>
      </div>
      {openIndex !== null ? (
        <Lightbox photos={photos} index={openIndex} onNavigate={navigate} onClose={close} />
      ) : null}
    </div>
  );
}
