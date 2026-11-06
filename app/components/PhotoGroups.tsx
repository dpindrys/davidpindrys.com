"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import type { Photo, PhotoGroup } from "../lib/photos";

const PREVIEW_COUNT = 3;

const lightboxNavClass =
  "absolute top-1/2 z-[1] flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/55 text-white transition-colors hover:bg-black/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

const tileClass =
  "group/tile relative block w-full cursor-zoom-in overflow-hidden rounded-[12px] bg-black/5 outline-none focus-visible:ring-2 focus-visible:ring-black/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#E8E5DE]";

const tileImageClass =
  "object-cover transition-transform duration-500 ease-out motion-safe:group-hover/tile:scale-[1.03] motion-reduce:transition-none";

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

function Lightbox({
  title,
  photos,
  index,
  onNavigate,
  onClose,
}: {
  title: string;
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
      aria-label={title}
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

function GroupCard({ group, onOpen }: { group: PhotoGroup; onOpen: (index: number, opener: HTMLButtonElement, byPointer: boolean) => void }) {
  const [cover, ...rest] = group.photos;
  const thumbs = rest.slice(0, PREVIEW_COUNT - 1);
  const hiddenCount = group.photos.length - 1 - thumbs.length;
  const count = group.photos.length;
  const noun = group.noun ?? "photos";

  const tile = (photo: Photo, index: number, aspectClass: string, sizes: string, extra?: number) => (
    <button
      type="button"
      aria-label={`Open photo: ${photo.alt}${extra ? ` (${extra} more in this set)` : ""}`}
      onClick={(event) => onOpen(index, event.currentTarget, event.detail > 0)}
      className={`${tileClass} ${aspectClass}`}
    >
      <Image src={photo.src} alt="" fill sizes={sizes} className={tileImageClass} />
      {extra ? (
        <span
          aria-hidden="true"
          className="absolute inset-0 flex items-center justify-center bg-black/45 font-sans text-[22px] font-medium text-white md:text-[26px]"
        >
          +{extra}
        </span>
      ) : null}
    </button>
  );

  return (
    <li className="flex flex-col rounded-[20px] bg-[#E8E5DE] p-3 md:p-4">
      <div className="grid grid-cols-2 gap-2 md:gap-3">
        <div className="col-span-2">{tile(cover, 0, "aspect-[2/1]", "(min-width: 768px) 38vw, 100vw")}</div>
        {thumbs.map((photo, i) => (
          <div key={photo.src} className={thumbs.length === 1 ? "col-span-2" : undefined}>
            {tile(
              photo,
              i + 1,
              thumbs.length === 1 ? "aspect-[2/1]" : "aspect-[16/10]",
              thumbs.length === 1 ? "(min-width: 768px) 38vw, 100vw" : "(min-width: 768px) 19vw, 50vw",
              i === thumbs.length - 1 && hiddenCount > 0 ? hiddenCount : undefined,
            )}
          </div>
        ))}
      </div>
      <div className="px-1 pb-1 pt-5 md:px-2 md:pb-2 md:pt-6">
        <p className="font-sans text-[12px] font-medium uppercase leading-none tracking-[0.14em] text-black/70">
          {group.label} · {count} {count === 1 ? noun.replace(/s$/, "") : noun}
        </p>
        <h3 className="mt-3 font-sans text-[1.375rem] font-medium leading-[1.2] tracking-[-0.02em] text-black md:text-[1.625rem]">
          {group.title}
        </h3>
        {group.description ? (
          <p className="mt-2 font-sans text-[16px] leading-[1.6] text-black/70 md:text-[17px]">{group.description}</p>
        ) : null}
      </div>
    </li>
  );
}

export default function PhotoGroups({ groups }: { groups: readonly PhotoGroup[] }) {
  const openerRef = useRef<HTMLButtonElement | null>(null);
  const openedByPointerRef = useRef(false);
  const [open, setOpen] = useState<{ group: number; index: number } | null>(null);

  const navigate = useCallback(
    (step: 1 | -1) => {
      setOpen((current) => {
        if (!current) return current;
        const total = groups[current.group].photos.length;
        return { ...current, index: (current.index + step + total) % total };
      });
    },
    [groups],
  );

  const close = useCallback(() => {
    setOpen(null);
    const opener = openerRef.current;
    if (!opener) return;
    opener.focus({ preventScroll: true });
    if (openedByPointerRef.current) opener.blur();
  }, []);

  if (groups.length === 0) return null;

  return (
    <>
      <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
        {groups.map((group, groupIndex) => (
          <GroupCard
            key={group.id}
            group={group}
            onOpen={(index, opener, byPointer) => {
              openerRef.current = opener;
              openedByPointerRef.current = byPointer;
              setOpen({ group: groupIndex, index });
            }}
          />
        ))}
      </ul>
      {open ? (
        <Lightbox
          title={groups[open.group].title}
          photos={groups[open.group].photos}
          index={open.index}
          onNavigate={navigate}
          onClose={close}
        />
      ) : null}
    </>
  );
}
