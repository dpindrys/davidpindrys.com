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

function captionEndAt(
  caption: DemoCaption,
  index: number,
  captions: readonly DemoCaption[],
  duration: number,
): number {
  if (caption.end != null) return caption.end;
  if (Number.isFinite(duration) && duration > 0) return duration;
  // Duration unknown yet: fall through to next cue start, or a short open-ended span.
  const next = captions[index + 1];
  if (next) return next.start;
  return caption.start + 1;
}

function captionTextAt(time: number, captions: readonly DemoCaption[], ended: boolean): string {
  if (captions.length === 0) return "";
  if (ended) return captions[captions.length - 1].text;

  for (const caption of captions) {
    const end = caption.end ?? Number.POSITIVE_INFINITY;
    if (time >= caption.start && time < end) return caption.text;
  }

  return "";
}

/** 0-based active cue; last cue while ended or past the final start. */
function captionCueIndexAt(
  time: number,
  captions: readonly DemoCaption[],
  ended: boolean,
  duration: number,
): number {
  if (captions.length === 0) return 0;
  if (ended) return captions.length - 1;

  for (let i = 0; i < captions.length; i++) {
    const end = captionEndAt(captions[i], i, captions, duration);
    if (time >= captions[i].start && time < end) return i;
  }

  // Gaps / edge seeks: stay on the latest cue that has started.
  for (let i = captions.length - 1; i >= 0; i--) {
    if (time >= captions[i].start) return i;
  }
  return 0;
}

/**
 * Per-cue fill 0–1. Completed cues stay full; the active cue fills by
 * (currentTime - start) / (end - start) over [start, end). On ended, all 1.
 */
function segmentFillsAt(
  time: number,
  captions: readonly DemoCaption[],
  ended: boolean,
  duration: number,
): number[] {
  if (captions.length === 0) return [];
  if (ended) return captions.map(() => 1);

  return captions.map((caption, i) => {
    const start = caption.start;
    const end = captionEndAt(caption, i, captions, duration);
    if (time >= end) return 1;
    if (time <= start) return 0;
    const span = Math.max(end - start, 1e-6);
    return Math.min(1, Math.max(0, (time - start) / span));
  });
}

function longestCaptionText(captions: readonly DemoCaption[]): string {
  return captions.reduce((longest, caption) => (caption.text.length > longest.length ? caption.text : longest), "");
}

const CAPTION_FADE_MS = 120;

/**
 * Full-bleed clickable media overlay; circular play mark is visual-only.
 * Mark visibility is React-controlled (pointer + focus-visible) — never CSS group-hover —
 * so stuck :hover after click/modal close cannot fight hide. Touch / no-hover devices keep
 * the mark visible until force-hidden/open.
 *
 * !outline-none beats unlayered `button:focus-visible` in globals.css (utilities lose to
 * unlayered rules). Keyboard affordance is a ring on the mark, not the full-bleed button.
 */
export const viewDemoPlayButtonClass =
  "absolute inset-0 z-[1] flex cursor-pointer items-center justify-center select-none outline-none !outline-none focus:outline-none focus-visible:outline-none focus-visible:!outline-none [-webkit-tap-highlight-color:transparent]";

/** Diameter ~38% of media height; muted gray fill + white icon (DCHP toggle language, scaled up). */
export const viewDemoPlayMarkClass =
  "pointer-events-none flex h-[38%] aspect-square items-center justify-center rounded-full bg-black/60 text-white";

const viewDemoPlayMarkFocusRingClass =
  "ring-2 ring-black/25 ring-offset-2 ring-offset-transparent";

export function PlayIcon({ className = "ml-[6%] h-[38%] w-[38%] shrink-0" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="currentColor">
      <path d="M8 5.2v13.6a.8.8 0 0 0 1.22.68l10.4-6.8a.8.8 0 0 0 0-1.36L9.22 4.52A.8.8 0 0 0 8 5.2Z" />
    </svg>
  );
}

/** Play control + dialog; place inside a `relative` media container. */
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
   * Set on activate. Keeps the mark unmounted while the dialog is open and after close
   * until the pointer actually leaves the media.
   */
  const [forceHidden, setForceHidden] = useState(false);
  const [pointerInside, setPointerInside] = useState(false);
  const [focusVisible, setFocusVisible] = useState(false);
  /**
   * `null` until mounted (avoid desktop flash of the mark). Then `true` when the primary
   * input can hover; `false` on touch / coarse pointers (mark stays visible).
   */
  const [hoverCapable, setHoverCapable] = useState<boolean | null>(null);
  const openerRef = useRef<HTMLButtonElement | null>(null);
  const openRef = useRef(false);
  openRef.current = open;

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover)");
    const apply = () => setHoverCapable(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  const close = useCallback((_modality: "keyboard" | "pointer" = "pointer") => {
    setOpen(false);
  }, []);

  // Pure React visibility — no group-hover / opacity tug-of-war.
  // focusVisible wins over forceHidden so Escape focus restore still shows the mark.
  const showMark =
    !open &&
    (focusVisible ||
      (!forceHidden && (hoverCapable === false || (hoverCapable === true && pointerInside))));

  return (
    <>
      <button
        type="button"
        data-demo-play=""
        aria-label={`View demo for ${client}`}
        className={viewDemoPlayButtonClass}
        onPointerEnter={() => setPointerInside(true)}
        onPointerLeave={() => {
          setPointerInside(false);
          // Portal cover can fire leave while open — do not clear until dialog is gone.
          if (!openRef.current) setForceHidden(false);
        }}
        onFocus={(event) => {
          setFocusVisible(event.currentTarget.matches(":focus-visible"));
        }}
        onBlur={() => setFocusVisible(false)}
        onClick={(event) => {
          openerRef.current = event.currentTarget;
          setForceHidden(true);
          setFocusVisible(false);
          // Pointer activate: drop focus so unlayered global focus-visible outline cannot
          // paint a ring around the full-bleed control (especially noticeable on Frx).
          event.currentTarget.blur();
          setOpen(true);
        }}
      >
        {showMark ? (
          <span
            className={
              focusVisible
                ? `${viewDemoPlayMarkClass} ${viewDemoPlayMarkFocusRingClass}`
                : viewDemoPlayMarkClass
            }
            aria-hidden="true"
          >
            <PlayIcon />
          </span>
        ) : null}
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
  /** Last applied cue index; -1 until the first sync so open does not fade-in. */
  const activeCueRef = useRef(-1);
  const captionFadeTimeoutRef = useRef<number | null>(null);
  const captions = demo?.captions;
  const hasCaptions = Boolean(captions && captions.length > 0);
  const [captionText, setCaptionText] = useState("");
  const [segmentFills, setSegmentFills] = useState<number[]>([]);
  const [captionOpaque, setCaptionOpaque] = useState(true);

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
    activeCueRef.current = -1;
    if (captionFadeTimeoutRef.current != null) {
      window.clearTimeout(captionFadeTimeoutRef.current);
      captionFadeTimeoutRef.current = null;
    }
    if (demo?.captions?.length) {
      setCaptionText(captionTextAt(0, demo.captions, false));
      setSegmentFills(demo.captions.map(() => 0));
      setCaptionOpaque(true);
    } else {
      setCaptionText("");
      setSegmentFills([]);
      setCaptionOpaque(true);
    }
  }, [demo]);

  useEffect(() => {
    return () => {
      if (captionFadeTimeoutRef.current != null) {
        window.clearTimeout(captionFadeTimeoutRef.current);
      }
    };
  }, []);

  const applyCaptionCue = useCallback((index: number, text: string) => {
    const prev = activeCueRef.current;
    activeCueRef.current = index;

    if (prev === -1 || prev === index) {
      setCaptionText(text);
      setCaptionOpaque(true);
      return;
    }

    if (captionFadeTimeoutRef.current != null) {
      window.clearTimeout(captionFadeTimeoutRef.current);
      captionFadeTimeoutRef.current = null;
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      setCaptionText(text);
      setCaptionOpaque(true);
      return;
    }

    setCaptionOpaque(false);
    captionFadeTimeoutRef.current = window.setTimeout(() => {
      setCaptionText(text);
      setCaptionOpaque(true);
      captionFadeTimeoutRef.current = null;
    }, CAPTION_FADE_MS);
  }, []);

  const syncCaptionsFromVideo = useCallback(
    (video: HTMLVideoElement) => {
      if (!captions?.length) return;
      const time = video.currentTime;
      // Replay / seek toward the start clears the ended latch.
      if (playbackEndedRef.current && time < 0.25) {
        playbackEndedRef.current = false;
      }
      const ended = playbackEndedRef.current;
      const duration = Number.isFinite(video.duration) ? video.duration : Number.NaN;
      const index = captionCueIndexAt(time, captions, ended, duration);
      const text = captionTextAt(time, captions, ended);
      setSegmentFills(segmentFillsAt(time, captions, ended, duration));
      applyCaptionCue(index, text);
    },
    [applyCaptionCue, captions],
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
          onLoadedMetadata={
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
                    const last = captions.length - 1;
                    setSegmentFills(captions.map(() => 1));
                    applyCaptionCue(last, captionTextAt(event.currentTarget.currentTime, captions, true));
                  }
                }
              : undefined
          }
        />
        {hasCaptions && captions ? (
          <div className="bg-[#F4F2EE] px-4 py-3 sm:px-5 sm:py-4">
            <div className="relative" aria-live="polite">
              <p
                className="invisible font-sans text-[15px] font-bold leading-[1.45] sm:text-[16px]"
                aria-hidden="true"
              >
                {captionSpacer}
              </p>
              <p
                id={captionsId}
                className={`absolute inset-0 font-sans text-[15px] font-bold leading-[1.45] text-black/80 transition-opacity duration-150 ease-out motion-reduce:transition-none sm:text-[16px] ${
                  captionOpaque ? "opacity-100" : "opacity-0"
                }`}
              >
                {captionText}
              </p>
            </div>
            <div
              className="mt-3 flex gap-1 sm:gap-1.5"
              aria-hidden="true"
            >
              {segmentFills.map((fill, i) => (
                <div
                  key={i}
                  className="h-1 min-w-0 flex-1 overflow-hidden rounded-[1px] bg-black/10"
                >
                  <div
                    className="h-full bg-[rgb(15_12_19)]"
                    style={{ width: `${Math.round(fill * 1000) / 10}%` }}
                  />
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>,
    document.body,
  );
}
