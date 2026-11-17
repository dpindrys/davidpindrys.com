"use client";

import { useCallback, useEffect, useId, useRef, useState, type RefObject } from "react";
import { createPortal } from "react-dom";

export type DemoCaption = {
  /** Inclusive start time in seconds. */
  start: number;
  /** Exclusive end time in seconds; omit for “through end of video”. */
  end?: number;
  text: string;
};

export type DemoDialogContent = {
  client: string;
  video: string;
  title?: string;
  description?: string;
  /** Timed captions; only pass for demos that should show them (e.g. VEHR, Vinyl, Frx). */
  captions?: readonly DemoCaption[];
};

function captionTextAt(time: number, captions: readonly DemoCaption[], ended: boolean): string {
  if (captions.length === 0) return "";
  if (ended) return captions[captions.length - 1].text;

  for (const caption of captions) {
    const end = caption.end ?? Number.POSITIVE_INFINITY;
    if (time >= caption.start && time < end) return caption.text;
  }

  return "";
}

function longestCaptionText(captions: readonly DemoCaption[]): string {
  return captions.reduce((longest, caption) => (caption.text.length > longest.length ? caption.text : longest), "");
}

/**
 * Full-bleed clickable media overlay; circular play mark is visual-only.
 * Hide the mark until the parent `group` is hovered (or the control is focus-visible).
 * On devices without hover, keep the mark visible via `@media (hover: hover)`.
 */
export const viewDemoPlayButtonClass =
  "group/play absolute inset-0 z-[1] flex cursor-pointer items-center justify-center opacity-100 outline-none transition-opacity duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/25 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent";

/** Diameter ~38% of media height; muted gray fill + white icon (DCHP toggle language, scaled up). */
export const viewDemoPlayMarkClass =
  "pointer-events-none flex h-[38%] aspect-square items-center justify-center rounded-full bg-black/60 text-white";

export function PlayIcon({ className = "ml-[6%] h-[38%] w-[38%] shrink-0" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="currentColor">
      <path d="M8 5.2v13.6a.8.8 0 0 0 1.22.68l10.4-6.8a.8.8 0 0 0 0-1.36L9.22 4.52A.8.8 0 0 0 8 5.2Z" />
    </svg>
  );
}

/** Play control + dialog; place inside a `relative group` media container. */
export function DemoPlayOverlay({
  client,
  video,
  title,
  description,
  captions,
}: {
  client: string;
  video: string;
  title?: string;
  description?: string;
  captions?: readonly DemoCaption[];
}) {
  const [open, setOpen] = useState(false);
  /**
   * After close, parent `.group:hover` often stays true while the pointer is still over the media.
   * Gate hover-reveal until a real pointer leave (then re-enter) so the mark does not stick.
   */
  const [awaitingPointerLeave, setAwaitingPointerLeave] = useState(false);
  const openerRef = useRef<HTMLButtonElement | null>(null);
  const openRef = useRef(false);
  openRef.current = open;

  const close = useCallback((modality: "keyboard" | "pointer" = "pointer") => {
    setOpen(false);
    // Only pointer dismiss leaves a stuck parent :hover under the cursor.
    if (modality === "pointer") setAwaitingPointerLeave(true);
  }, []);

  // While dialog is open, or until the pointer leaves after a pointer close, force hover-reveal
  // off (including stuck parent group-hover). focus-visible still reveals for keyboard restore.
  const blockHoverReveal = open || awaitingPointerLeave;
  const playButtonClass = blockHoverReveal
    ? `${viewDemoPlayButtonClass} [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover:!opacity-0 focus-visible:opacity-100`
    : `${viewDemoPlayButtonClass} [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover:opacity-100 focus-visible:opacity-100`;

  return (
    <>
      <button
        type="button"
        aria-label={`View demo for ${client}`}
        onClick={(event) => {
          openerRef.current = event.currentTarget;
          setOpen(true);
        }}
        onPointerLeave={() => {
          // Only clear the post-close gate once the dialog is gone; leave-on-open
          // (portal covering the control) must not re-arm hover reveal early.
          if (!openRef.current) setAwaitingPointerLeave(false);
        }}
        className={playButtonClass}
      >
        <span className={viewDemoPlayMarkClass} aria-hidden="true">
          <PlayIcon />
        </span>
      </button>
      <DemoDialog
        demo={open ? { client, video, title, description, captions } : null}
        onClose={close}
        openerRef={openerRef}
      />
    </>
  );
}

export default function DemoDialog({
  demo,
  onClose,
  openerRef,
}: {
  demo: DemoDialogContent | null;
  onClose: (modality?: "keyboard" | "pointer") => void;
  openerRef: RefObject<HTMLButtonElement | null>;
}) {
  const titleId = useId();
  const captionsId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  /** Pointer closes should not leave a sticky focus ring on the opener. */
  const closeModalityRef = useRef<"keyboard" | "pointer">("pointer");
  /** Latch so the final caption stays visible after `ended` until replay/seek-to-start. */
  const playbackEndedRef = useRef(false);
  const captions = demo?.captions;
  const hasCaptions = Boolean(captions && captions.length > 0);
  const [captionText, setCaptionText] = useState("");

  const closeFromPointer = useCallback(() => {
    closeModalityRef.current = "pointer";
    // Blur before unmount so focus restoration onto the opener cannot flash the play mark.
    openerRef.current?.blur();
    onClose("pointer");
  }, [onClose, openerRef]);

  useEffect(() => {
    if (!demo) return;
    const opener = openerRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeModalityRef.current = "pointer";

    const frame = requestAnimationFrame(() => {
      dialogRef.current?.querySelector<HTMLElement>("button")?.focus();
    });

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeModalityRef.current = "keyboard";
        onClose("keyboard");
        return;
      }
      if (event.key !== "Tab") return;
      const dialog = dialogRef.current;
      if (!dialog) return;
      const focusable = [...dialog.querySelectorAll<HTMLElement>("button, video, a[href]")].filter(
        (el) => el.tabIndex !== -1,
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;
      if (event.shiftKey && (active === first || !dialog.contains(active))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      // Keyboard dismiss: restore focus (focus-visible still shows for Tab/Escape users).
      // Pointer dismiss: blur so mouse clicks don't leave a persistent ring/outline.
      if (closeModalityRef.current === "keyboard") {
        opener?.focus({ preventScroll: true });
      } else {
        opener?.blur();
      }
    };
  }, [demo, onClose, openerRef]);

  useEffect(() => {
    playbackEndedRef.current = false;
    if (demo?.captions?.length) {
      setCaptionText(captionTextAt(0, demo.captions, false));
    } else {
      setCaptionText("");
    }
  }, [demo]);

  const syncCaptionsFromVideo = useCallback(
    (video: HTMLVideoElement) => {
      if (!captions?.length) return;
      const time = video.currentTime;
      // Replay / seek toward the start clears the ended latch.
      if (playbackEndedRef.current && time < 0.25) {
        playbackEndedRef.current = false;
      }
      setCaptionText(captionTextAt(time, captions, playbackEndedRef.current));
    },
    [captions],
  );

  if (!demo || typeof document === "undefined") return null;

  const captionSpacer = hasCaptions && captions ? longestCaptionText(captions) : "";

  return createPortal(
    <div className="fixed inset-0 z-[140] flex items-center justify-center p-4 sm:p-6">
      <div className="absolute inset-0 bg-black/55" onClick={closeFromPointer} />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={hasCaptions ? captionsId : undefined}
        className="relative w-full max-w-5xl overflow-hidden rounded-[16px] bg-black shadow-[0_24px_80px_-32px_rgba(0,0,0,0.55)]"
      >
        <div className="flex items-start justify-between gap-4 bg-[#F4F2EE] px-4 py-3 sm:px-5">
          <div className="min-w-0">
            <h2
              id={titleId}
              className={
                demo.title
                  ? "font-sans text-[16px] font-bold leading-snug text-black"
                  : "font-sans text-[16px] font-medium leading-none text-black"
              }
            >
              {demo.title ?? `${demo.client} guided demo`}
            </h2>
            {demo.description ? (
              <p className="mt-1 font-sans text-[14px] font-normal leading-[1.4] text-black/70 sm:text-[15px]">
                {demo.description}
              </p>
            ) : null}
          </div>
          <button
            type="button"
            onClick={closeFromPointer}
            aria-label="Close"
            className="flex h-10 w-10 shrink-0 items-center justify-center font-sans text-[22px] leading-none text-black/70 outline-none hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/25 focus-visible:ring-offset-2 focus-visible:ring-offset-[#F4F2EE]"
          >
            <span aria-hidden>×</span>
          </button>
        </div>
        <video
          src={demo.video}
          controls
          autoPlay
          playsInline
          className="block max-h-[min(78vh,820px)] w-full bg-black"
          aria-label={`Guided demo for ${demo.client}`}
          onTimeUpdate={
            hasCaptions
              ? (event) => {
                  syncCaptionsFromVideo(event.currentTarget);
                }
              : undefined
          }
          onSeeked={
            hasCaptions
              ? (event) => {
                  syncCaptionsFromVideo(event.currentTarget);
                }
              : undefined
          }
          onPlay={
            hasCaptions
              ? (event) => {
                  const video = event.currentTarget;
                  if (video.currentTime < 0.25) playbackEndedRef.current = false;
                  syncCaptionsFromVideo(video);
                }
              : undefined
          }
          onEnded={
            hasCaptions
              ? (event) => {
                  playbackEndedRef.current = true;
                  if (captions?.length) {
                    setCaptionText(captionTextAt(event.currentTarget.currentTime, captions, true));
                  }
                }
              : undefined
          }
        />
        {hasCaptions ? (
          <div className="bg-[#F4F2EE] px-4 py-3 sm:px-5 sm:py-4">
            <div className="relative" aria-live="polite">
              <p
                className="invisible font-sans text-[15px] font-normal leading-[1.45] sm:text-[16px]"
                aria-hidden="true"
              >
                {captionSpacer}
              </p>
              <p
                id={captionsId}
                className="absolute inset-0 font-sans text-[15px] font-normal leading-[1.45] text-black/80 sm:text-[16px]"
              >
                {captionText}
              </p>
            </div>
          </div>
        ) : null}
      </div>
    </div>,
    document.body,
  );
}
