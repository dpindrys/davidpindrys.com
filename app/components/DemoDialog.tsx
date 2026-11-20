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
import { cardTitleClass, compactPlayControlSizeClass, sideLeadClass } from "../lib/pageStyles";

export type DemoCaption = {
  /** Inclusive start time in seconds. */
  start: number;
  /** Exclusive end time in seconds; omit for “through end of video”. */
  end?: number;
  text: string;
  /** Optional narration audio URL for this cue (e.g. VEHR `/audio/vehr1.wav`). */
  audio?: string;
};

export type DemoDialogLayout = "default" | "walkthrough";

/** Pause between narrated cue audio ending and the next segment. */
const BREATH_MS = 2500;
/**
 * When the next cue’s start equals this cue’s exclusive end, nudge the freeze
 * frame slightly into the next segment so the held frame shows next-cue visuals
 * (e.g. VEHR modal open) rather than the last frame of the finishing cue.
 */
const FREEZE_INTO_NEXT_EPS = 0.05;
/**
 * Slightly slow video for narrated demos (VEHR) so pacing matches voice.
 * 0.9 stays smooth on typical devices; narration audio stays at 1.0.
 */
const NARRATED_PLAYBACK_RATE = 0.9;

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

/**
 * Segment 1 (cue index 0) plays continuously into the next cue — no freeze-at-
 * next-start, wait-for-audio, or breath. Later narrated cues keep that hold.
 */
function shouldFreezeNarratedCue(index: number): boolean {
  return index > 0;
}

/**
 * Video time to freeze on while finishing a narrated cue’s audio + breath.
 * Mid cues: next cue’s start (plus a tiny epsilon when start === this end) so the
 * hold shows the next segment’s opening frame. Last cue: near exclusive end.
 */
function narratedFreezeHoldTime(
  caption: DemoCaption,
  index: number,
  captions: readonly DemoCaption[],
  duration: number,
): number {
  const end = captionEndAt(caption, index, captions, duration);
  const next = captions[index + 1];
  if (!next) {
    return Math.max(caption.start, Math.min(end - 0.04, end));
  }
  let holdAt = next.start;
  if (holdAt <= end + 1e-3) {
    holdAt = next.start + FREEZE_INTO_NEXT_EPS;
  }
  if (Number.isFinite(duration) && duration > 0) {
    holdAt = Math.min(holdAt, Math.max(caption.start, duration - 0.04));
  }
  return holdAt;
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
 * Fill 0–1 for a narrated cue during video play: map video progress into the
 * video wall-clock share of (video + estimated remaining-audio + breath) so the
 * bar still has room to move during freeze/breath instead of sitting at 100%.
 */
function narratedCueFillDuringVideo(
  time: number,
  caption: DemoCaption,
  index: number,
  captions: readonly DemoCaption[],
  duration: number,
  audioDurationSec: number | null,
): number {
  const start = caption.start;
  const end = captionEndAt(caption, index, captions, duration);
  if (time >= end) return 1;
  if (time <= start) return 0;
  const span = Math.max(end - start, 1e-6);
  const videoProgress = (time - start) / span;
  const videoWallMs = (span / NARRATED_PLAYBACK_RATE) * 1000;
  const audioPlayedByVideoEnd = span / NARRATED_PLAYBACK_RATE;
  const remAudioMs =
    audioDurationSec != null && Number.isFinite(audioDurationSec)
      ? Math.max(0, (audioDurationSec - audioPlayedByVideoEnd) * 1000)
      : 0;
  const totalMs = videoWallMs + remAudioMs + BREATH_MS;
  return Math.min(1, Math.max(0, (videoProgress * videoWallMs) / totalMs));
}

/**
 * Per-cue fill 0–1. Completed cues stay full; the active cue fills by
 * (currentTime - start) / (end - start) over [start, end). Narrated cues
 * (with `audio`) pace against estimated hold so freeze/breath still has motion.
 * On ended, all 1.
 */
function segmentFillsAt(
  time: number,
  captions: readonly DemoCaption[],
  ended: boolean,
  duration: number,
  options?: {
    activeCueAudioDurationSec?: number | null;
  },
): number[] {
  if (captions.length === 0) return [];
  if (ended) return captions.map(() => 1);

  const activeAudioDur = options?.activeCueAudioDurationSec ?? null;

  return captions.map((caption, i) => {
    const start = caption.start;
    const end = captionEndAt(caption, i, captions, duration);
    if (time >= end) return 1;
    if (time <= start) return 0;
    // Cue 0 has no freeze/breath — fill linearly with the video span.
    if (caption.audio && shouldFreezeNarratedCue(i)) {
      return narratedCueFillDuringVideo(time, caption, i, captions, duration, activeAudioDur);
    }
    const span = Math.max(end - start, 1e-6);
    return Math.min(1, Math.max(0, (time - start) / span));
  });
}

/** Prior cues full; held cue at `fill`; later cues empty — used during narration freeze-hold. */
function segmentFillsDuringHold(
  captions: readonly DemoCaption[],
  heldIndex: number,
  fill: number,
): number[] {
  const clamped = Math.min(1, Math.max(0, fill));
  return captions.map((_, i) => {
    if (i < heldIndex) return 1;
    if (i === heldIndex) return clamped;
    return 0;
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

/** Shared pill chrome for hero “View demo” marks on cards. */
const viewDemoPlayMarkVisualClass =
  "flex items-center justify-center rounded-full bg-black/60 px-5 py-3 font-sans text-[15px] font-medium leading-none tracking-[-0.01em] text-white sm:px-6 sm:py-3.5 sm:text-[16px]";

/** Rounded pill; muted gray fill + white label (readable on media). */
export const viewDemoPlayMarkClass = `pointer-events-none ${viewDemoPlayMarkVisualClass}`;

const START_DEMO_CUE_DELAY_MS = 500;

const viewDemoPlayMarkFocusRingClass =
  "ring-2 ring-black/25 ring-offset-2 ring-offset-transparent";

/** In-modal centered play control; DCHP toggle language (gray circle + white icon), scaled up. */
const modalPlayButtonClass =
  "absolute left-1/2 top-1/2 z-[1] flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white outline-none !outline-none focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent sm:h-20 sm:w-20 [-webkit-tap-highlight-color:transparent]";

/**
 * Delayed center play cue over the video (walkthrough / after open). Larger than the
 * default-layout control so the first play affordance reads as the primary action.
 */
const startDemoCueButtonClass =
  "pointer-events-auto flex h-20 w-20 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white outline-none !outline-none focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent animate-page-fade-in sm:h-24 sm:w-24 [-webkit-tap-highlight-color:transparent]";

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
  /** Single shared narration element; swapped per cue when captions include `audio`. */
  const narrationAudioRef = useRef<HTMLAudioElement | null>(null);
  /** Cue index currently loaded into `narrationAudioRef`; -1 when stopped / none. */
  const narrationCueRef = useRef(-1);
  /** Walkthrough: heading + caption + segments column; play diameter tracks its height. */
  const walkthroughStackRef = useRef<HTMLDivElement>(null);
  /** Pointer closes should not leave a sticky focus ring on the opener. */
  const closeModalityRef = useRef<"keyboard" | "pointer">("pointer");
  /** Latch so the final caption stays visible after `ended` until replay/seek-to-start. */
  const playbackEndedRef = useRef(false);
  /** Last applied cue index; -1 until the first sync so open does not fade-in. */
  const activeCueRef = useRef(-1);
  const captionFadeTimeoutRef = useRef<number | null>(null);
  /**
   * Narrated demos: video is paused on the next cue’s opening frame (or near end on
   * the last cue) while narration (and then BREATH_MS) finish before advancing.
   * Caption/bar stay on the finishing cue for the whole hold. Only when cue has `audio`.
   */
  const freezeActiveRef = useRef(false);
  /** Cue index held during freeze; -1 when not freezing. */
  const freezeCueIndexRef = useRef(-1);
  /** Breath timeout after narration ends at a freeze boundary. */
  const breathTimerRef = useRef<number | null>(null);
  /**
   * User hit pause during freeze/breath — do not auto-advance until they play again.
   * Freeze frame stays; timers stay cleared until resume.
   */
  const userPausedDuringFreezeRef = useRef(false);
  /** Next video.pause() is for freeze-hold; onPause must not stop narration or clear `playing`. */
  const programmaticPauseRef = useRef(false);
  /** Next currentTime assign is internal (freeze clamp / advance); onSeeked must not cancel freeze. */
  const programmaticSeekRef = useRef(false);
  /** Mirrors `playing` for handlers that should not close over stale state. */
  const playingRef = useRef(false);
  const captions = demo?.captions;
  const hasCaptions = Boolean(captions && captions.length > 0);
  const hasNarrationAudio = Boolean(captions?.some((caption) => Boolean(caption.audio)));
  const isWalkthrough = demo?.layout === "walkthrough";
  const [captionText, setCaptionText] = useState("");
  const [segmentFills, setSegmentFills] = useState<number[]>([]);
  /**
   * Wall-clock fill animation for the held segment during auto narration hold.
   * `startedAt` is performance.now() when the current run began; `fromFill` is the
   * fill at that moment; duration spans remaining audio + breath until advance.
   */
  const holdFillAnimRef = useRef<{
    cueIndex: number;
    fromFill: number;
    startedAt: number;
    durationMs: number;
  } | null>(null);
  const holdFillRafRef = useRef<number | null>(null);
  /** Fill frozen when the user Space-pauses during an auto-hold (resume continues from here). */
  const pausedHoldFillRef = useRef<number | null>(null);
  const [captionOpaque, setCaptionOpaque] = useState(true);
  /** False on open so the centered play affordance shows; syncs with native controls. */
  const [playing, setPlaying] = useState(false);
  playingRef.current = playing;
  /**
   * Delayed center play cue over the video: false until 0.5s after open (or forever if
   * playback started earlier). Cleared on close via the demo-reset effect below.
   */
  const [showStartDemoCue, setShowStartDemoCue] = useState(false);
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

  const clearBreathTimer = useCallback(() => {
    if (breathTimerRef.current != null) {
      window.clearTimeout(breathTimerRef.current);
      breathTimerRef.current = null;
    }
  }, []);

  const stopHoldFillAnimation = useCallback(() => {
    if (holdFillRafRef.current != null) {
      window.cancelAnimationFrame(holdFillRafRef.current);
      holdFillRafRef.current = null;
    }
    holdFillAnimRef.current = null;
  }, []);

  /** Current interpolated fill for an in-flight hold animation (does not stop it). */
  const peekHoldFill = useCallback((): number | null => {
    const anim = holdFillAnimRef.current;
    if (!anim) return null;
    if (anim.durationMs <= 0) return 1;
    const t = Math.min(1, Math.max(0, (performance.now() - anim.startedAt) / anim.durationMs));
    return anim.fromFill + (1 - anim.fromFill) * t;
  }, []);

  /**
   * Animate the held segment from `fromFill` → 1 over `durationMs` (remaining
   * audio + breath). Cancels any prior hold-fill rAF.
   */
  const startHoldFillAnimation = useCallback(
    (cueIndex: number, fromFill: number, durationMs: number) => {
      if (!captions?.length) return;
      if (holdFillRafRef.current != null) {
        window.cancelAnimationFrame(holdFillRafRef.current);
        holdFillRafRef.current = null;
      }

      const start = Math.min(1, Math.max(0, fromFill));
      // Already full: keep a tiny travel so the bar still reaches 1 at advance
      // instead of sitting static for the whole hold.
      const from = start >= 0.999 ? 0.92 : start;
      const duration = Math.max(durationMs, 1);

      holdFillAnimRef.current = {
        cueIndex,
        fromFill: from,
        startedAt: performance.now(),
        durationMs: duration,
      };
      setSegmentFills(segmentFillsDuringHold(captions, cueIndex, from));

      const tick = () => {
        const anim = holdFillAnimRef.current;
        if (!anim || anim.cueIndex !== cueIndex) {
          holdFillRafRef.current = null;
          return;
        }
        const elapsed = performance.now() - anim.startedAt;
        const t = Math.min(1, elapsed / anim.durationMs);
        const fill = anim.fromFill + (1 - anim.fromFill) * t;
        setSegmentFills(segmentFillsDuringHold(captions, cueIndex, fill));
        if (t < 1) {
          holdFillRafRef.current = window.requestAnimationFrame(tick);
        } else {
          holdFillRafRef.current = null;
        }
      };
      holdFillRafRef.current = window.requestAnimationFrame(tick);
    },
    [captions],
  );

  /** Remaining hold wait from now: leftover narration + full breath after audio ends. */
  const estimateHoldDurationMs = useCallback((cueIndex: number): number => {
    const audio = narrationAudioRef.current;
    let remAudioMs = 0;
    if (
      audio &&
      narrationCueRef.current === cueIndex &&
      audio.src !== "" &&
      audio.error == null &&
      !audio.ended
    ) {
      if (Number.isFinite(audio.duration) && audio.duration > 0) {
        remAudioMs = Math.max(0, (audio.duration - audio.currentTime) * 1000);
      }
    }
    return remAudioMs + BREATH_MS;
  }, []);

  const clearFreezeState = useCallback(() => {
    clearBreathTimer();
    stopHoldFillAnimation();
    pausedHoldFillRef.current = null;
    freezeActiveRef.current = false;
    freezeCueIndexRef.current = -1;
    userPausedDuringFreezeRef.current = false;
  }, [clearBreathTimer, stopHoldFillAnimation]);

  const stopNarration = useCallback(() => {
    const audio = narrationAudioRef.current;
    narrationCueRef.current = -1;
    if (!audio) return;
    audio.pause();
    audio.removeAttribute("src");
    // Reset so the next cue does not briefly play a stale buffer.
    try {
      audio.load();
    } catch {
      // Ignore load errors on emptied src.
    }
  }, []);

  useEffect(() => {
    playbackEndedRef.current = false;
    activeCueRef.current = -1;
    narrationCueRef.current = -1;
    clearFreezeState();
    programmaticPauseRef.current = false;
    programmaticSeekRef.current = false;
    setPlaying(false);
    setShowStartDemoCue(false);
    stopNarration();
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
    // Restore default rate when closing / switching demos; narrated rate is reapplied on the video element.
    const video = videoRef.current;
    if (video) video.playbackRate = 1;
  }, [clearFreezeState, demo, stopNarration]);

  // Delayed center play overlay: appear 0.5s after open if still paused; clear on close/unmount.
  useEffect(() => {
    if (!demo) {
      setShowStartDemoCue(false);
      return;
    }
    setShowStartDemoCue(false);
    const timer = window.setTimeout(() => {
      const video = videoRef.current;
      if (video && !video.paused && !video.ended) return;
      setShowStartDemoCue(true);
    }, START_DEMO_CUE_DELAY_MS);
    return () => {
      window.clearTimeout(timer);
      setShowStartDemoCue(false);
    };
  }, [demo]);

  useEffect(() => {
    return () => {
      if (captionFadeTimeoutRef.current != null) {
        window.clearTimeout(captionFadeTimeoutRef.current);
      }
      clearBreathTimer();
      clearFreezeState();
      stopNarration();
      narrationAudioRef.current = null;
    };
  }, [clearBreathTimer, clearFreezeState, stopNarration]);

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

      // Auto narration-hold: caption stays locked; hold-fill rAF owns the bar.
      // Manual pause during hold falls through so bars track paused video time.
      if (
        freezeActiveRef.current &&
        freezeCueIndexRef.current >= 0 &&
        !userPausedDuringFreezeRef.current
      ) {
        const index = freezeCueIndexRef.current;
        const caption = captions[index];
        if (caption) {
          applyCaptionCue(index, caption.text);
          return;
        }
      }

      const time = video.currentTime;
      // Replay / seek toward the start clears the ended latch.
      if (playbackEndedRef.current && time < 0.25) {
        playbackEndedRef.current = false;
      }
      const ended = playbackEndedRef.current;
      const duration = Number.isFinite(video.duration) ? video.duration : Number.NaN;

      // Play-through past a narrated cue’s end toward the next-start freeze frame:
      // keep caption + bar on the finishing cue (not the next) until freeze locks.
      // Cue 0 skips freeze — fall through so captions/bars advance into cue 1.
      let finishing = activeCueRef.current;
      if (finishing < 0 || finishing >= captions.length) {
        finishing = captionCueIndexAt(time, captions, ended, duration);
      }
      const finishingCaption = captions[finishing];
      if (
        !ended &&
        shouldFreezeNarratedCue(finishing) &&
        finishingCaption?.audio &&
        captions[finishing + 1] &&
        !userPausedDuringFreezeRef.current
      ) {
        const end = captionEndAt(finishingCaption, finishing, captions, duration);
        const holdAt = narratedFreezeHoldTime(finishingCaption, finishing, captions, duration);
        if (time + 1e-3 >= end && time + 1e-3 < holdAt) {
          const audio = narrationAudioRef.current;
          const audioDur =
            audio &&
            narrationCueRef.current === finishing &&
            Number.isFinite(audio.duration) &&
            audio.duration > 0
              ? audio.duration
              : null;
          const fill = narratedCueFillDuringVideo(
            Math.min(time, end - 0.04),
            finishingCaption,
            finishing,
            captions,
            duration,
            audioDur,
          );
          setSegmentFills(segmentFillsDuringHold(captions, finishing, fill));
          applyCaptionCue(finishing, finishingCaption.text);
          return;
        }
      }

      const index = captionCueIndexAt(time, captions, ended, duration);
      const text = captionTextAt(time, captions, ended);
      const audio = narrationAudioRef.current;
      const activeCueAudioDurationSec =
        audio &&
        narrationCueRef.current === index &&
        Number.isFinite(audio.duration) &&
        audio.duration > 0
          ? audio.duration
          : null;
      setSegmentFills(
        segmentFillsAt(time, captions, ended, duration, { activeCueAudioDurationSec }),
      );
      applyCaptionCue(index, text);
    },
    [applyCaptionCue, captions],
  );

  /**
   * After narration finishes at a freeze boundary: wait BREATH_MS, then either
   * seek/play into the next cue or latch the ended state on the last cue.
   */
  const advanceAfterBreath = useCallback(() => {
    const video = videoRef.current;
    if (!video || !captions?.length) return;
    if (userPausedDuringFreezeRef.current) return;

    const cueIndex = freezeCueIndexRef.current;
    clearFreezeState();

    if (cueIndex < 0) return;

    if (cueIndex >= captions.length - 1) {
      playbackEndedRef.current = true;
      setPlaying(false);
      stopNarration();
      setSegmentFills(captions.map(() => 1));
      applyCaptionCue(cueIndex, captions[cueIndex].text);
      return;
    }

    const next = captions[cueIndex + 1];
    if (!next) return;

    playbackEndedRef.current = false;
    // Commit the next cue *before* seek/play. Freeze holds at next.start (+eps when
    // contiguous), so a seek to next.start sits in [prev.end, prevHoldAt). If
    // activeCueRef still names the finishing cue, syncCaptions keeps that cue and
    // maybeFreezeAtCueBoundary re-enters freeze on it — looping segment 1 forever.
    applyCaptionCue(cueIndex + 1, next.text);

    // Already on/after next.start (typical: held at next.start + FREEZE_INTO_NEXT_EPS).
    // Resume in place so we do not rewind into the previous cue’s freeze window.
    if (video.currentTime + 1e-3 < next.start) {
      programmaticSeekRef.current = true;
      video.currentTime = next.start;
    }
    void video.play().catch(() => {
      // Autoplay blocked after programmatic advance — UI stays paused.
    });
  }, [applyCaptionCue, captions, clearFreezeState, stopNarration]);

  const startBreathAfterNarration = useCallback(() => {
    clearBreathTimer();
    if (!freezeActiveRef.current || userPausedDuringFreezeRef.current) return;

    // Re-anchor hold fill so the bar reaches 1 exactly when breath ends / next cue starts,
    // correcting any leftover-audio estimate drift from freeze entry.
    const cueIndex = freezeCueIndexRef.current;
    if (cueIndex >= 0 && captions?.length) {
      const from = peekHoldFill() ?? 0;
      startHoldFillAnimation(cueIndex, from, BREATH_MS);
    }

    breathTimerRef.current = window.setTimeout(() => {
      breathTimerRef.current = null;
      advanceAfterBreath();
    }, BREATH_MS);
  }, [
    advanceAfterBreath,
    captions,
    clearBreathTimer,
    peekHoldFill,
    startHoldFillAnimation,
  ]);

  /**
   * Pause video on the narrated freeze frame (next cue start, or near end on the
   * last cue); keep narration + caption/bar on this cue, then breath → advance.
   */
  const enterFreezeAtCue = useCallback(
    (video: HTMLVideoElement, index: number) => {
      if (!captions?.length || freezeActiveRef.current) return;
      // Segment 1: no freeze / wait-for-audio / breath — play through into cue 1.
      if (!shouldFreezeNarratedCue(index)) return;
      const caption = captions[index];
      if (!caption?.audio) return;

      const duration = Number.isFinite(video.duration) ? video.duration : Number.NaN;
      const end = captionEndAt(caption, index, captions, duration);
      const holdAt = narratedFreezeHoldTime(caption, index, captions, duration);

      freezeActiveRef.current = true;
      freezeCueIndexRef.current = index;
      userPausedDuringFreezeRef.current = false;
      clearBreathTimer();

      if (Math.abs(video.currentTime - holdAt) > 0.02) {
        programmaticSeekRef.current = true;
        video.currentTime = holdAt;
      }

      if (!video.paused) {
        programmaticPauseRef.current = true;
        video.pause();
      }

      // Keep chrome in the playing state so Space still means “pause the experience”.
      setPlaying(true);
      setShowStartDemoCue(false);
      // Caption/bar stay on the finishing cue even when the held frame is in the next.
      applyCaptionCue(index, caption.text);

      // Continue filling this segment across remaining audio + breath so the bar
      // keeps moving until advance (not frozen mid-bar or stuck at full).
      const audioForFill = narrationAudioRef.current;
      const audioDur =
        audioForFill &&
        narrationCueRef.current === index &&
        Number.isFinite(audioForFill.duration) &&
        audioForFill.duration > 0
          ? audioForFill.duration
          : null;
      // Sample fill at the cue’s video end (not holdAt past end) so we don't hit
      // narratedCueFillDuringVideo’s time>=end → 1 shortcut before breath.
      const fromFill = narratedCueFillDuringVideo(
        Math.min(holdAt, end - 0.04),
        caption,
        index,
        captions,
        duration,
        audioDur,
      );
      startHoldFillAnimation(index, fromFill, estimateHoldDurationMs(index));

      const audio = narrationAudioRef.current;
      const narrationStillPlaying =
        audio &&
        narrationCueRef.current === index &&
        !audio.ended &&
        audio.src !== "" &&
        audio.error == null;

      if (narrationStillPlaying) {
        if (audio.paused && !userPausedDuringFreezeRef.current) {
          void audio.play().catch(() => {
            startBreathAfterNarration();
          });
        }
        const onEnded = () => {
          if (!freezeActiveRef.current || freezeCueIndexRef.current !== index) return;
          startBreathAfterNarration();
        };
        audio.addEventListener("ended", onEnded, { once: true });
      } else {
        // No/finished audio for this cue: breath immediately, then advance.
        startBreathAfterNarration();
      }
    },
    [
      applyCaptionCue,
      captions,
      clearBreathTimer,
      estimateHoldDurationMs,
      startBreathAfterNarration,
      startHoldFillAnimation,
    ],
  );

  /**
   * When video reaches the narrated freeze frame (next cue start, or near end on
   * the last cue), freeze until audio + breath complete. Caption stays on the
   * finishing cue. No-ops for cues without `audio` so Vinyl/Frx stay continuous.
   */
  const maybeFreezeAtCueBoundary = useCallback(
    (video: HTMLVideoElement) => {
      if (!hasNarrationAudio || !captions?.length) return;
      if (freezeActiveRef.current || playbackEndedRef.current) return;
      // Only freeze while the session is playing (ignore scrub while paused).
      if (video.paused && !programmaticPauseRef.current) return;

      const duration = Number.isFinite(video.duration) ? video.duration : Number.NaN;
      const time = video.currentTime;
      // Use the cue we were showing (before sync advances) so crossing into the
      // next-start hold freezes that finishing segment — not the next cue index.
      let index = activeCueRef.current;
      if (index < 0 || index >= captions.length) {
        index = captionCueIndexAt(time, captions, false, duration);
      }
      const caption = captions[index];
      if (!caption?.audio || !shouldFreezeNarratedCue(index)) return;

      const holdAt = narratedFreezeHoldTime(caption, index, captions, duration);
      // Hit or crossed the hold frame (or natural video end on the last cue).
      if (time + 1e-3 >= holdAt || (video.ended && index === captions.length - 1)) {
        enterFreezeAtCue(video, index);
      }
    },
    [captions, enterFreezeAtCue, hasNarrationAudio],
  );

  /**
   * Keep one HTMLAudioElement in lockstep with the active caption cue.
   * Only runs when at least one caption has `audio` (VEHR today). Missing files
   * fail `play()` / error quietly and leave narration silent for that cue.
   *
   * Video may run at NARRATED_PLAYBACK_RATE; narration stays at 1.0 — do not
   * continuously re-seek audio to the slowed video clock (only on cue change / user seek).
   */
  const syncNarrationFromVideo = useCallback(
    (video: HTMLVideoElement, options?: { forceAudioSeek?: boolean }) => {
      if (!hasNarrationAudio || !captions?.length) {
        stopNarration();
        return;
      }

      // Freeze owns narration play/pause until breath advances or the user seeks away.
      if (freezeActiveRef.current) return;

      const time = video.currentTime;
      if (playbackEndedRef.current && time < 0.25) {
        playbackEndedRef.current = false;
      }
      const ended = playbackEndedRef.current || video.ended;
      if (ended) {
        stopNarration();
        return;
      }

      const duration = Number.isFinite(video.duration) ? video.duration : Number.NaN;
      // Prefer the finishing cue while video plays through to the next-start freeze
      // frame so narration is not swapped to the next clip early. Cue 0 skips freeze —
      // advance audio with the video cue (may cut vehr1 early when crossing into cue 1).
      let index = activeCueRef.current;
      if (index < 0 || index >= captions.length) {
        index = captionCueIndexAt(time, captions, false, duration);
      } else {
        const finishing = captions[index];
        const next = captions[index + 1];
        if (shouldFreezeNarratedCue(index) && finishing?.audio && next) {
          const end = captionEndAt(finishing, index, captions, duration);
          const holdAt = narratedFreezeHoldTime(finishing, index, captions, duration);
          if (!(time + 1e-3 >= end && time + 1e-3 < holdAt)) {
            index = captionCueIndexAt(time, captions, false, duration);
          }
        } else {
          index = captionCueIndexAt(time, captions, false, duration);
        }
      }
      const caption = captions[index];
      const audioSrc = caption?.audio;
      if (!audioSrc) {
        stopNarration();
        return;
      }

      let audio = narrationAudioRef.current;
      if (!audio) {
        audio = new Audio();
        audio.preload = "auto";
        audio.playbackRate = 1;
        narrationAudioRef.current = audio;
      } else {
        audio.playbackRate = 1;
      }

      const offset = Math.max(0, time - caption.start);
      const absoluteSrc = new URL(audioSrc, window.location.origin).href;
      const cueChanged = narrationCueRef.current !== index;
      const srcChanged = audio.src !== absoluteSrc;
      const forceAudioSeek = options?.forceAudioSeek === true;

      const seekAudio = () => {
        try {
          if (Number.isFinite(audio!.duration) && audio!.duration > 0) {
            audio!.currentTime = Math.min(offset, Math.max(0, audio!.duration - 0.05));
          } else {
            audio!.currentTime = offset;
          }
        } catch {
          // readyState may still block seeks; play will start near 0.
        }
      };

      const playOrPauseWithVideo = () => {
        if (video.paused) {
          if (!audio!.paused) audio!.pause();
          return;
        }
        // Do not loop a finished clip until the cue changes or the user seeks.
        if (!audio!.paused || audio!.ended) return;
        void audio!.play().catch(() => {
          // Autoplay policy, missing file, or decode error: leave silent.
        });
      };

      if (cueChanged || srcChanged) {
        narrationCueRef.current = index;
        audio.pause();
        if (srcChanged) {
          audio.src = audioSrc;
        }
        const onReady = () => {
          seekAudio();
          playOrPauseWithVideo();
        };
        if (audio.readyState >= 1) {
          onReady();
        } else {
          audio.addEventListener("loadedmetadata", onReady, { once: true });
          audio.addEventListener(
            "error",
            () => {
              // Missing / unloadable file: drop this cue’s narration.
              if (narrationCueRef.current === index) {
                narrationCueRef.current = -1;
              }
            },
            { once: true },
          );
        }
        return;
      }

      // Same cue: realign only on explicit seeks (arrows / scrub), not every timeupdate —
      // video runs slower than narration, so continuous offset sync would chop the voice.
      if (forceAudioSeek && Math.abs(audio.currentTime - offset) > 0.35) {
        seekAudio();
      }
      playOrPauseWithVideo();
    },
    [captions, hasNarrationAudio, stopNarration],
  );

  const applyNarratedPlaybackRate = useCallback(
    (video: HTMLVideoElement) => {
      video.playbackRate = hasNarrationAudio ? NARRATED_PLAYBACK_RATE : 1;
    },
    [hasNarrationAudio],
  );

  /**
   * Seek to cue `start`. Cancels freeze/breath and syncs immediately.
   * If the session was playing (including freeze-hold), resume from the new cue.
   */
  const seekToCaption = useCallback(
    (index: number) => {
      const video = videoRef.current;
      if (!video || !captions?.length) return;
      const caption = captions[index];
      if (!caption) return;

      const resumeAfterSeek =
        playingRef.current || (freezeActiveRef.current && !userPausedDuringFreezeRef.current);

      clearFreezeState();
      playbackEndedRef.current = false;
      // Set active cue before seeking so contiguous next.start lands (time === end of
      // previous) are not treated as still finishing the prior narrated cue.
      applyCaptionCue(index, caption.text);
      programmaticSeekRef.current = true;
      video.currentTime = caption.start;

      if (resumeAfterSeek) {
        void video.play().catch(() => {
          // Autoplay policy: leave paused; captions still sync via onSeeked.
        });
      }
    },
    [applyCaptionCue, captions, clearFreezeState],
  );

  /**
   * True when the guided session has finished (latch, native ended, or paused
   * within a hair of duration). Used so Play / Space restarts from cue 0.
   */
  const isPlaybackAtEnd = useCallback((video: HTMLVideoElement): boolean => {
    if (playbackEndedRef.current) return true;
    if (video.ended) return true;
    const duration = video.duration;
    if (
      video.paused &&
      Number.isFinite(duration) &&
      duration > 0 &&
      video.currentTime >= duration - 0.08
    ) {
      return true;
    }
    return false;
  }, []);

  /** Seek to 0, reset captions/narration to the first cue, then play. */
  const replayFromStart = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    clearFreezeState();
    playbackEndedRef.current = false;
    stopNarration();

    if (captions?.length) {
      applyCaptionCue(0, captions[0].text);
      setSegmentFills(captions.map(() => 0));
      setCaptionOpaque(true);
    }

    programmaticSeekRef.current = true;
    video.currentTime = 0;
    setPlaying(true);
    setShowStartDemoCue(false);
    applyNarratedPlaybackRate(video);
    void video.play().catch(() => {
      setPlaying(false);
    });
  }, [
    applyCaptionCue,
    applyNarratedPlaybackRate,
    captions,
    clearFreezeState,
    stopNarration,
  ]);

  const togglePlayback = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    // Freeze-hold: video is already paused; Space toggles the narrated “session”.
    if (freezeActiveRef.current) {
      if (!userPausedDuringFreezeRef.current && playingRef.current) {
        // User pause during freeze/breath — cancel pending advance until play.
        // Freeze hold-fill motion at the current interpolated value (true pause).
        userPausedDuringFreezeRef.current = true;
        clearBreathTimer();
        narrationAudioRef.current?.pause();
        setPlaying(false);
        const pausedFill = peekHoldFill();
        const pausedIndex = freezeCueIndexRef.current;
        pausedHoldFillRef.current = pausedFill;
        stopHoldFillAnimation();
        if (captions?.length && pausedIndex >= 0 && pausedFill != null) {
          setSegmentFills(segmentFillsDuringHold(captions, pausedIndex, pausedFill));
        } else if (captions?.length) {
          const duration = Number.isFinite(video.duration) ? video.duration : Number.NaN;
          setSegmentFills(segmentFillsAt(video.currentTime, captions, false, duration));
        }
        return;
      }

      // Resume: continue narration if needed, otherwise restart breath → advance.
      userPausedDuringFreezeRef.current = false;
      setPlaying(true);
      setShowStartDemoCue(false);

      const index = freezeCueIndexRef.current;
      // Restart hold-fill from wherever the bar was paused, over the new remaining wait.
      if (index >= 0 && captions?.length) {
        const currentFill = pausedHoldFillRef.current ?? 0;
        pausedHoldFillRef.current = null;
        startHoldFillAnimation(index, currentFill, estimateHoldDurationMs(index));
      }
      const audio = narrationAudioRef.current;
      const narrationStillPlaying =
        audio &&
        index >= 0 &&
        narrationCueRef.current === index &&
        !audio.ended &&
        audio.src !== "";

      if (narrationStillPlaying) {
        void audio.play().catch(() => {
          startBreathAfterNarration();
        });
        const onEnded = () => {
          if (!freezeActiveRef.current || freezeCueIndexRef.current !== index) return;
          startBreathAfterNarration();
        };
        audio.addEventListener("ended", onEnded, { once: true });
      } else {
        startBreathAfterNarration();
      }
      return;
    }

    // Ended / near end while paused: Play / Space restarts from the beginning.
    if (video.paused && isPlaybackAtEnd(video)) {
      replayFromStart();
      return;
    }

    if (video.paused) {
      void video.play();
    } else {
      video.pause();
    }
  }, [
    captions,
    clearBreathTimer,
    estimateHoldDurationMs,
    isPlaybackAtEnd,
    peekHoldFill,
    replayFromStart,
    startBreathAfterNarration,
    startHoldFillAnimation,
    stopHoldFillAnimation,
  ]);

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
  // Hold-fill rAF writes into `segmentFills`; no snap-to-full override (that looked stuck).
  const timelineFills = segmentFills;

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
          {timelineFills.map((fill, i) => (
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
            ? sideLeadClass
            : sideLeadClass
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
          const video = event.currentTarget;
          if (hasNarrationAudio) maybeFreezeAtCueBoundary(video);
          syncCaptionsFromVideo(video);
          if (hasNarrationAudio) syncNarrationFromVideo(video);
        }
      : undefined,
    onSeeked: hasCaptions
      ? (event: SyntheticEvent<HTMLVideoElement>) => {
          const video = event.currentTarget;
          if (programmaticSeekRef.current) {
            programmaticSeekRef.current = false;
            syncCaptionsFromVideo(video);
            if (hasNarrationAudio && !freezeActiveRef.current) {
              syncNarrationFromVideo(video, { forceAudioSeek: true });
            }
            return;
          }
          // User seek (arrows / scrub / segment bars) cancels freeze/breath and resyncs.
          if (freezeActiveRef.current) clearFreezeState();
          syncCaptionsFromVideo(video);
          if (hasNarrationAudio) syncNarrationFromVideo(video, { forceAudioSeek: true });
        }
      : undefined,
    onLoadedMetadata: (event: SyntheticEvent<HTMLVideoElement>) => {
      const video = event.currentTarget;
      applyNarratedPlaybackRate(video);
      if (!hasCaptions) return;
      syncCaptionsFromVideo(video);
      if (hasNarrationAudio) syncNarrationFromVideo(video);
    },
    onPlay: (event: SyntheticEvent<HTMLVideoElement>) => {
      setPlaying(true);
      setShowStartDemoCue(false);
      const video = event.currentTarget;
      applyNarratedPlaybackRate(video);
      if (video.currentTime < 0.25) playbackEndedRef.current = false;
      if (hasCaptions) syncCaptionsFromVideo(video);
      if (hasNarrationAudio) syncNarrationFromVideo(video);
    },
    onPause: () => {
      // Freeze-hold pause: keep session "playing" and leave narration running.
      if (programmaticPauseRef.current) {
        programmaticPauseRef.current = false;
        if (freezeActiveRef.current) return;
      }
      setPlaying(false);
      // Keep cue/src loaded so resume continues near the same offset on play.
      if (hasNarrationAudio) narrationAudioRef.current?.pause();
    },
    onEnded: hasCaptions
      ? (event: SyntheticEvent<HTMLVideoElement>) => {
          const video = event.currentTarget;
          const last = captions?.length ? captions.length - 1 : -1;
          // Last narrated cue: freeze until audio + breath, then latch ended (no loop).
          if (hasNarrationAudio && last >= 0 && captions?.[last]?.audio) {
            if (!freezeActiveRef.current) enterFreezeAtCue(video, last);
            return;
          }
          setPlaying(false);
          playbackEndedRef.current = true;
          if (hasNarrationAudio) stopNarration();
          if (captions?.length) {
            setSegmentFills(captions.map(() => 1));
            applyCaptionCue(last, captionTextAt(video.currentTime, captions, true));
          }
        }
      : () => {
          setPlaying(false);
          if (hasNarrationAudio) stopNarration();
        },
  };

  const describedBy =
    [hasCaptions ? captionsId : null, isWalkthrough && demo.description ? descriptionId : null]
      .filter(Boolean)
      .join(" ") || undefined;

  return createPortal(
    // Overlay scrolls (body is overflow-locked). items-center-safe centers when the
    // panel fits; falls back to start so short viewports can scroll without clipping
    // the top. Mobile still fills via min-h-[100dvh] on the panel.
    <div className="fixed inset-0 z-[140] overflow-y-auto overscroll-contain">
      <div className="flex min-h-full items-center-safe justify-center p-0 sm:p-4">
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
                    <h3 className={cardTitleClass}>
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
                onClick={togglePlayback}
              >
                <PlayIcon className="ml-[6%] h-[42%] w-[42%] shrink-0" />
              </button>
            ) : null}
            {showStartDemoCue && !playing ? (
              <div className="pointer-events-none absolute inset-0 z-[2] flex items-center justify-center">
                <button
                  type="button"
                  aria-label={`Start demo for ${demo.client}`}
                  className={startDemoCueButtonClass}
                  onClick={togglePlayback}
                >
                  <PlayIcon className="ml-[6%] h-[42%] w-[42%] shrink-0" />
                </button>
              </div>
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
