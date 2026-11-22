export type DemoCaption = {
  /** Inclusive start time in seconds. */
  start: number;
  /** Exclusive end time in seconds; omit for “through end of video”. */
  end?: number;
  text: string;
  /** Optional narration audio URL for this cue (e.g. `/audio/frx1.wav`). */
  audio?: string;
};

/** Pause between narrated cue audio ending and the next segment. */
export const BREATH_MS = 2500;
/**
 * When the next cue’s start equals this cue’s exclusive end, nudge the freeze
 * frame slightly into the next segment so the held frame shows next-cue visuals
 * rather than the last frame of the finishing cue.
 */
export const FREEZE_INTO_NEXT_EPS = 0.05;
/**
 * Slightly slow video for narrated demos so pacing matches voice.
 * Narration audio stays at 1.0.
 */
export const NARRATED_PLAYBACK_RATE = 0.9;

export const CAPTION_FADE_MS = 120;

export function captionEndAt(
  caption: DemoCaption,
  index: number,
  captions: readonly DemoCaption[],
  duration: number,
): number {
  if (caption.end != null) return caption.end;
  if (Number.isFinite(duration) && duration > 0) return duration;
  const next = captions[index + 1];
  if (next) return next.start;
  return caption.start + 1;
}

/**
 * Segment 1 (cue index 0) plays continuously into the next cue — no freeze-at-
 * next-start, wait-for-audio, or breath. Later narrated cues keep that hold.
 */
export function shouldFreezeNarratedCue(index: number): boolean {
  return index > 0;
}

/**
 * Video time to freeze on while finishing a narrated cue’s audio + breath.
 * Mid cues: next cue’s start (plus a tiny epsilon when start === this end).
 * Last cue: near exclusive end.
 */
export function narratedFreezeHoldTime(
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

export function captionTextAt(
  time: number,
  captions: readonly DemoCaption[],
  ended: boolean,
): string {
  if (captions.length === 0) return "";
  if (ended) return captions[captions.length - 1].text;

  for (const caption of captions) {
    const end = caption.end ?? Number.POSITIVE_INFINITY;
    if (time >= caption.start && time < end) return caption.text;
  }

  return "";
}

/** 0-based active cue; last cue while ended or past the final start. */
export function captionCueIndexAt(
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

  for (let i = captions.length - 1; i >= 0; i--) {
    if (time >= captions[i].start) return i;
  }
  return 0;
}

/**
 * Fill 0–1 for a narrated cue during video play: map video progress into the
 * video wall-clock share of (video + estimated remaining-audio + breath).
 */
export function narratedCueFillDuringVideo(
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
 * Per-cue fill 0–1. Completed cues stay full; the active cue fills over
 * [start, end). Narrated cues pace against estimated hold so freeze/breath
 * still has motion. On ended, all 1.
 */
export function segmentFillsAt(
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
    if (caption.audio && shouldFreezeNarratedCue(i)) {
      return narratedCueFillDuringVideo(time, caption, i, captions, duration, activeAudioDur);
    }
    const span = Math.max(end - start, 1e-6);
    return Math.min(1, Math.max(0, (time - start) / span));
  });
}

/** Prior cues full; held cue at `fill`; later cues empty — used during narration freeze-hold. */
export function segmentFillsDuringHold(
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

export function longestCaptionText(captions: readonly DemoCaption[]): string {
  return captions.reduce(
    (longest, caption) => (caption.text.length > longest.length ? caption.text : longest),
    "",
  );
}

/** Accessible name for a caption timeline segment control. */
/** Wall-clock label for demo footer (m:ss). */
export function formatDemoTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const total = Math.floor(seconds);
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function captionSegmentLabel(
  caption: DemoCaption,
  index: number,
  total: number,
): string {
  const trimmed = caption.text.trim();
  const truncated =
    trimmed.length > 64 ? `${trimmed.slice(0, 61).trimEnd()}…` : trimmed;
  if (truncated) {
    return `Go to caption ${index + 1} of ${total}: ${truncated}`;
  }
  return `Go to caption ${index + 1} of ${total}`;
}
