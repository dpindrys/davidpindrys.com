"use client";

import {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type RefObject,
  type SyntheticEvent,
} from "react";
import { createPortal } from "react-dom";
import { companyNameClass, compactPlayControlSizeClass } from "../lib/pageStyles";

export type DemoCaption = {
  /** Inclusive start time in seconds. */
  start: number;
  /** Exclusive end time in seconds; omit for “through end of video”. */
  end?: number;
  text: string;
};

export type DemoDialogLayout = "default" | "walkthrough";

export type DemoDialogContent = {
  client: string;
  video: string;
  title?: string;
  description?: string;
  /**
   * Walkthrough only: heading beside the play control (above captions/segments).
   * Modal `title` stays at the top of the chrome; this is the in-stack label.
   */
  walkthroughHeading?: string;
  /** Timed captions; only pass for demos that should show them (e.g. VEHR, Vinyl, Frx). */
  captions?: readonly DemoCaption[];
  /**
   * `walkthrough`: title + patient summary above a divider, then play + heading +
   * captions/segments, video below (no native controls). Used by VEHR; Vinyl/Frx keep `default`.
   */
  layout?: DemoDialogLayout;
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

/** Accessible name for a caption timeline segment control. */
function captionSegmentLabel(caption: DemoCaption, index: number, total: number): string {
  const trimmed = caption.text.trim();
  const truncated =
    trimmed.length > 64 ? `${trimmed.slice(0, 61).trimEnd()}…` : trimmed;
  if (truncated) {
    return `Go to caption ${index + 1} of ${total}: ${truncated}`;
  }
  return `Go to caption ${index + 1} of ${total}`;
}

const CAPTION_FADE_MS = 120;

/**
 * Full-bleed clickable media overlay; "View demo" mark is visual-only.
 * Mark visibility is React-controlled (pointer + focus-visible) — never CSS group-hover —
 * so stuck :hover after click/modal close cannot fight hide. Touch / no-hover devices keep
 * the mark visible until force-hidden/open.
 *
 * !outline-none beats unlayered `button:focus-visible` in globals.css (utilities lose to
 * unlayered rules). Keyboard affordance is a ring on the mark, not the full-bleed button.
 */
export const viewDemoPlayButtonClass =
  "absolute inset-0 z-[1] flex cursor-pointer items-center justify-center select-none outline-none !outline-none focus:outline-none focus-visible:outline-none focus-visible:!outline-none [-webkit-tap-highlight-color:transparent]";

/** Rounded pill; muted gray fill + white label (readable on media). */
export const viewDemoPlayMarkClass =
  "pointer-events-none flex items-center justify-center rounded-full bg-black/60 px-5 py-3 font-sans text-[15px] font-medium leading-none tracking-[-0.01em] text-white sm:px-6 sm:py-3.5 sm:text-[16px]";

const viewDemoPlayMarkFocusRingClass =
  "ring-2 ring-black/25 ring-offset-2 ring-offset-transparent";

/** In-modal centered play control; DCHP toggle language (gray circle + white icon), scaled up. */
const modalPlayButtonClass =
  "absolute left-1/2 top-1/2 z-[1] flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white outline-none !outline-none focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent sm:h-20 sm:w-20 [-webkit-tap-highlight-color:transparent]";

/**
 * Walkthrough (VEHR): left of heading + caption + segments; diameter set to that
 * column’s height via ResizeObserver (avoids flex stretch + aspect-ratio inflation).
 * Fallback size shares `compactPlayControlSizeClass` with the DCHP/hero toggle.
 */
const walkthroughPlayButtonClass =
  `flex ${compactPlayControlSizeClass} shrink-0 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white outline-none !outline-none focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/25 focus-visible:ring-offset-2 focus-visible:ring-offset-[#F4F2EE] [-webkit-tap-highlight-color:transparent]`;

/** Tactile shortcut keys in the cream modal footer (pure CSS, non-interactive). */
const demoShortcutKbdBaseClass =
  "pointer-events-none select-none rounded-[6px] border border-black/35 border-b-2 bg-white font-sans text-[11px] font-medium leading-none text-black/80 sm:text-[12px]";
const demoShortcutKbdClass = `${demoShortcutKbdBaseClass} px-2.5 py-1`;
const demoShortcutKbdCompactClass = `${demoShortcutKbdBaseClass} px-1.5 py-1`;

export function PlayIcon({ className = "ml-[6%] h-[38%] w-[38%] shrink-0" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="currentColor">
      <path d="M8 5.2v13.6a.8.8 0 0 0 1.22.68l10.4-6.8a.8.8 0 0 0 0-1.36L9.22 4.52A.8.8 0 0 0 8 5.2Z" />
    </svg>
  );
}

function PauseIcon({ className = "h-[38%] w-[38%] shrink-0" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="currentColor">
      <rect x="6" y="5" width="4" height="14" rx="1" />
      <rect x="14" y="5" width="4" height="14" rx="1" />
    </svg>
  );
}

/** Play control + dialog; place inside a `relative` media container. */
export function DemoPlayOverlay({
  client,
  video,
  title,
  description,
  walkthroughHeading,
  captions,
  layout,
}: {
  client: string;
  video: string;
  title?: string;
  description?: string;
  walkthroughHeading?: string;
  captions?: readonly DemoCaption[];
  /** Pass `walkthrough` for VEHR; omit/`default` keeps the existing modal layout. */
  layout?: DemoDialogLayout;
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
            View demo
          </span>
        ) : null}
      </button>
      <DemoDialog
        demo={
          open
            ? { client, video, title, description, walkthroughHeading, captions, layout }
            : null
        }
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
  const videoRef = useRef<HTMLVideoElement>(null);
  /** Walkthrough: heading + caption + segments column; play diameter tracks its height. */
  const walkthroughStackRef = useRef<HTMLDivElement>(null);
  /** Pointer closes should not leave a sticky focus ring on the opener. */
  const closeModalityRef = useRef<"keyboard" | "pointer">("pointer");
  /** Latch so the final caption stays visible after `ended` until replay/seek-to-start. */
  const playbackEndedRef = useRef(false);
  /** Last applied cue index; -1 until the first sync so open does not fade-in. */
  const activeCueRef = useRef(-1);
  const captionFadeTimeoutRef = useRef<number | null>(null);
  const captions = demo?.captions;
  const hasCaptions = Boolean(captions && captions.length > 0);
  const isWalkthrough = demo?.layout === "walkthrough";
  const [captionText, setCaptionText] = useState("");
  const [segmentFills, setSegmentFills] = useState<number[]>([]);
  const [captionOpaque, setCaptionOpaque] = useState(true);
  /** False on open so the centered play affordance shows; syncs with native controls. */
  const [playing, setPlaying] = useState(false);
  /** Pixel diameter for walkthrough play; matches content stack height. */
  const [walkthroughPlaySize, setWalkthroughPlaySize] = useState<number | null>(null);

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

    // Focus the dialog panel (not a child control) so open does not show a
    // focus-visible ring. Space / arrows still work via document key handlers.
    const frame = requestAnimationFrame(() => {
      dialogRef.current?.focus({ preventScroll: true });
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
      if (focusable.length === 0) {
        // No tab stops: keep focus on the panel so Tab cannot escape to the page.
        event.preventDefault();
        dialog.focus({ preventScroll: true });
        return;
      }
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;
      // Dialog panel may hold initial focus (tabIndex=-1); treat Shift+Tab from
      // the panel like Shift+Tab from the first control.
      if (event.shiftKey && (active === first || active === dialog || !dialog.contains(active))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (active === last || active === dialog)) {
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
    setPlaying(false);
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

  useLayoutEffect(() => {
    if (!isWalkthrough) {
      setWalkthroughPlaySize(null);
      return;
    }
    const el = walkthroughStackRef.current;
    if (!el) return;

    const sync = () => {
      const height = el.getBoundingClientRect().height;
      setWalkthroughPlaySize(height > 0 ? Math.round(height) : null);
    };
    sync();

    const observer = new ResizeObserver(sync);
    observer.observe(el);
    return () => observer.disconnect();
  }, [demo, isWalkthrough]);

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

  /** Seek to cue `start`; leave play/pause as-is. Caption/progress update via onSeeked sync. */
  const seekToCaption = useCallback(
    (index: number) => {
      const video = videoRef.current;
      if (!video || !captions?.length) return;
      const caption = captions[index];
      if (!caption) return;
      playbackEndedRef.current = false;
      video.currentTime = caption.start;
    },
    [captions],
  );

  const togglePlayback = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      void video.play();
    } else {
      video.pause();
    }
  }, []);

  // Space: play/pause (does not close). Left/Right: caption cues when present.
  // Escape still closes via the focus-trap handler. Ignore when typing in an editable field.
  useEffect(() => {
    if (!demo) return;

    const onKeyDown = (event: KeyboardEvent) => {
      const isSpace = event.key === " " || event.key === "Spacebar";
      const isArrow = event.key === "ArrowLeft" || event.key === "ArrowRight";
      if (!isSpace && !isArrow) return;
      if (isArrow && !captions?.length) return;

      const target = event.target;
      if (
        target instanceof HTMLElement &&
        (target.isContentEditable ||
          target.closest("input, textarea, select, [contenteditable='true']"))
      ) {
        return;
      }

      event.preventDefault();

      if (isSpace) {
        togglePlayback();
        return;
      }

      const video = videoRef.current;
      if (!video || !captions?.length) return;

      const duration = Number.isFinite(video.duration) ? video.duration : Number.NaN;
      let current = activeCueRef.current;
      if (current < 0) {
        current = captionCueIndexAt(
          video.currentTime,
          captions,
          playbackEndedRef.current,
          duration,
        );
      }

      if (event.key === "ArrowLeft") {
        // First cue: restart at its start; otherwise go to previous.
        seekToCaption(current <= 0 ? 0 : current - 1);
      } else if (current < captions.length - 1) {
        seekToCaption(current + 1);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [captions, demo, seekToCaption, togglePlayback]);

  if (!demo || typeof document === "undefined") return null;

  const captionSpacer = hasCaptions && captions ? longestCaptionText(captions) : "";
  const descriptionId = `${titleId}-desc`;

  const captionBody =
    hasCaptions && captions ? (
      <>
        <div className="relative" aria-live="polite">
          <p
            className="invisible font-sans text-[15px] font-normal leading-[1.45] sm:text-[16px]"
            aria-hidden="true"
          >
            {captionSpacer}
          </p>
          <p
            id={captionsId}
            className={`absolute inset-0 font-sans text-[15px] font-normal leading-[1.45] text-black/80 transition-opacity duration-150 ease-out motion-reduce:transition-none sm:text-[16px] ${
              captionOpaque ? "opacity-100" : "opacity-0"
            }`}
          >
            {captionText}
          </p>
        </div>
        <div
          className="mt-3 flex gap-1 sm:gap-1.5"
          role="group"
          aria-label="Caption timeline"
        >
          {segmentFills.map((fill, i) => (
            <button
              key={i}
              type="button"
              aria-label={captionSegmentLabel(captions[i], i, captions.length)}
              onClick={() => seekToCaption(i)}
              className="h-1 min-w-0 flex-1 cursor-pointer overflow-hidden rounded-[1px] bg-black/10 outline-none focus-visible:ring-2 focus-visible:ring-black/25 focus-visible:ring-offset-2 focus-visible:ring-offset-[#F4F2EE]"
            >
              <span
                className="block h-full bg-[rgb(15_12_19)]"
                style={{ width: `${Math.round(fill * 1000) / 10}%` }}
                aria-hidden="true"
              />
            </button>
          ))}
        </div>
      </>
    ) : null;

  /** Default (Vinyl/Frx): captions alone below the video. */
  const captionBlock = captionBody ? <div className="min-w-0 flex-1">{captionBody}</div> : null;

  const titleHeading = (
    <h2
      id={titleId}
      className={
        demo.title
          ? isWalkthrough
            ? companyNameClass
            : "font-sans text-[16px] font-bold leading-snug text-black"
          : "font-sans text-[16px] font-medium leading-none text-black"
      }
    >
      {demo.title ?? `${demo.client} guided demo`}
    </h2>
  );

  /** Desktop-only × beside the title row; Escape + backdrop still dismiss on mobile. */
  const closeButton = (
    <button
      type="button"
      onClick={closeFromPointer}
      aria-label="Close"
      className="hidden h-10 w-10 shrink-0 items-center justify-center font-sans text-[22px] leading-none text-black/70 outline-none hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/25 focus-visible:ring-offset-2 focus-visible:ring-offset-[#F4F2EE] md:flex"
    >
      <span aria-hidden>×</span>
    </button>
  );

  const titleRow = (
    <div className="flex items-start justify-between gap-4">
      <div className="min-w-0 flex-1">{titleHeading}</div>
      {closeButton}
    </div>
  );

  const videoHandlers = {
    onTimeUpdate: hasCaptions
      ? (event: SyntheticEvent<HTMLVideoElement>) => {
          syncCaptionsFromVideo(event.currentTarget);
        }
      : undefined,
    onSeeked: hasCaptions
      ? (event: SyntheticEvent<HTMLVideoElement>) => {
          syncCaptionsFromVideo(event.currentTarget);
        }
      : undefined,
    onLoadedMetadata: hasCaptions
      ? (event: SyntheticEvent<HTMLVideoElement>) => {
          syncCaptionsFromVideo(event.currentTarget);
        }
      : undefined,
    onPlay: (event: SyntheticEvent<HTMLVideoElement>) => {
      setPlaying(true);
      if (!hasCaptions) return;
      const video = event.currentTarget;
      if (video.currentTime < 0.25) playbackEndedRef.current = false;
      syncCaptionsFromVideo(video);
    },
    onPause: () => {
      setPlaying(false);
    },
    onEnded: hasCaptions
      ? (event: SyntheticEvent<HTMLVideoElement>) => {
          setPlaying(false);
          playbackEndedRef.current = true;
          if (captions?.length) {
            const last = captions.length - 1;
            setSegmentFills(captions.map(() => 1));
            applyCaptionCue(last, captionTextAt(event.currentTarget.currentTime, captions, true));
          }
        }
      : () => {
          setPlaying(false);
        },
  };

  const describedBy =
    [hasCaptions ? captionsId : null, isWalkthrough && demo.description ? descriptionId : null]
      .filter(Boolean)
      .join(" ") || undefined;

  return createPortal(
    // Overlay scrolls (body is overflow-locked). items-start pins the panel to the top
    // so short viewports can reach chrome + video + shortcuts; mobile fills the screen.
    <div className="fixed inset-0 z-[140] overflow-y-auto overscroll-contain">
      <div className="flex min-h-full items-start justify-center p-0 sm:p-4">
        <div className="fixed inset-0 bg-black/70" onClick={closeFromPointer} aria-hidden="true" />
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          aria-describedby={describedBy}
          tabIndex={-1}
          className="relative z-[1] flex min-h-[100dvh] w-full max-w-5xl flex-col overflow-hidden rounded-none bg-black shadow-[0_24px_80px_-32px_rgba(0,0,0,0.55)] outline-none focus:outline-none sm:min-h-0 sm:rounded-[16px]"
        >
          {isWalkthrough ? (
            <div className="relative shrink-0 bg-[#F4F2EE]">
              <div className="px-4 pb-3 pt-3 sm:px-5 sm:pb-3.5 sm:pt-4">
                {titleRow}
                {demo.description ? (
                  <p
                    id={descriptionId}
                    className="mt-1 font-sans text-[14px] font-normal leading-[1.4] text-black/70 sm:text-[15px]"
                  >
                    {demo.description}
                  </p>
                ) : null}
              </div>
              <div className="h-px w-full bg-black/10" aria-hidden="true" />
              <div className="flex items-start gap-3 px-4 pb-3 pt-3 sm:gap-4 sm:px-5 sm:pb-4 sm:pt-3.5">
                <button
                  type="button"
                  aria-label={playing ? `Pause demo for ${demo.client}` : `Play demo for ${demo.client}`}
                  className={walkthroughPlayButtonClass}
                  style={
                    walkthroughPlaySize != null
                      ? { width: walkthroughPlaySize, height: walkthroughPlaySize }
                      : undefined
                  }
                  onClick={togglePlayback}
                >
                  {playing ? (
                    <PauseIcon className="h-[38%] w-[38%] shrink-0" />
                  ) : (
                    <PlayIcon className="ml-[6%] h-[38%] w-[38%] shrink-0" />
                  )}
                </button>
                <div ref={walkthroughStackRef} className="min-w-0 flex-1">
                  {demo.walkthroughHeading ? (
                    <h3 className="font-sans text-[16px] font-bold leading-snug text-black">
                      {demo.walkthroughHeading}
                    </h3>
                  ) : null}
                  {captionBody ? (
                    <div className={demo.walkthroughHeading ? "mt-2" : undefined}>{captionBody}</div>
                  ) : null}
                </div>
              </div>
            </div>
          ) : (
            <div className="shrink-0 bg-[#F4F2EE] px-4 py-3 sm:px-5">
              {titleRow}
              {demo.description ? (
                <p className="mt-1 font-sans text-[14px] font-normal leading-[1.4] text-black/70 sm:text-[15px]">
                  {demo.description}
                </p>
              ) : null}
            </div>
          )}

          <div className="relative min-h-0 flex-1 bg-black">
            <video
              ref={videoRef}
              src={demo.video}
              controls={!isWalkthrough}
              playsInline
              preload="metadata"
              className="block max-h-[min(78vh,820px)] w-full bg-black"
              aria-label={`Guided demo for ${demo.client}`}
              {...videoHandlers}
            />
            {!isWalkthrough && !playing ? (
              <button
                type="button"
                aria-label={`Play demo for ${demo.client}`}
                className={modalPlayButtonClass}
                onClick={() => {
                  void videoRef.current?.play();
                }}
              >
                <PlayIcon className="ml-[6%] h-[42%] w-[42%] shrink-0" />
              </button>
            ) : null}
          </div>

          <div
            className="flex shrink-0 flex-wrap items-center gap-x-5 gap-y-2 border-t border-black/10 bg-[#F4F2EE] px-4 py-3 sm:gap-x-6 sm:px-5 sm:py-3.5"
            aria-hidden="true"
          >
            <span className="inline-flex items-center gap-2 font-sans text-[13px] font-normal leading-none text-black/70 sm:text-[14px]">
              <kbd className={demoShortcutKbdClass}>Space</kbd>
              Play / Pause
            </span>
            {hasCaptions ? (
              <span className="inline-flex items-center gap-2 font-sans text-[13px] font-normal leading-none text-black/70 sm:text-[14px]">
                <span className="inline-flex items-center gap-1">
                  <kbd className={demoShortcutKbdCompactClass}>←</kbd>
                  <kbd className={demoShortcutKbdCompactClass}>→</kbd>
                </span>
                Previous / Next
              </span>
            ) : null}
          </div>

          {!isWalkthrough && hasCaptions && captions ? (
            <div className="shrink-0 bg-[#F4F2EE] px-4 pb-3 pt-0 sm:px-5 sm:pb-4">{captionBlock}</div>
          ) : null}
        </div>
      </div>
    </div>,
    document.body,
  );
}
