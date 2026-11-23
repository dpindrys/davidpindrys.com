import type { DemoCaption } from "./demoNarration";

/** Cache-bust tokens from `stat` mtimes of `public/audio/frx#.wav`. */
const FRX_AUDIO_V = {
  1: 1795126910,
  2: 1795126931,
  3: 1795126950,
  4: 1795126969,
  5: 1795126986,
  6: 1795127012,
} as const;

function frxAudio(n: keyof typeof FRX_AUDIO_V): string {
  return `/audio/frx${n}.wav?v=${FRX_AUDIO_V[n]}`;
}

/**
 * Timed captions for the Fresenius guided demo (narration: public/audio/frx1–6.wav).
 * Cue 0 is a silent rest lead (start === end === 0): shown on open / at rest /
 * before narration via preferRestLead. Timed lookup skips it so cue 1 still owns
 * t ∈ [0, 5) once playback starts. Cues 1–6 keep video + frx1–6 narration sync.
 */
export const frxDemoCaptions: readonly DemoCaption[] = [
  {
    start: 0,
    end: 0,
    text: "Jane Doe is prescribed 4 medications through FreseniusRX. One is on hold and one refill is 30 days past due.",
  },
  {
    start: 0,
    end: 5,
    text: "The medication list flags overdue refills and prescriptions on hold.",
    audio: frxAudio(1),
  },
  {
    start: 5,
    end: 10,
    text: "Supporting information includes forms, insurance, allergies, contact details, and addresses.",
    audio: frxAudio(2),
  },
  {
    start: 10,
    end: 14,
    text: "Staff select a medication to begin a refill request.",
    audio: frxAudio(3),
  },
  {
    start: 14,
    end: 19,
    text: "The request opens within Jane’s record, keeping her information and care team visible.",
    audio: frxAudio(4),
  },
  {
    start: 19,
    end: 23,
    text: "Staff can review shipping details, remaining refills, days’ supply, and copay before submitting.",
    audio: frxAudio(5),
  },
  {
    start: 23,
    text: "Medication refills stay within the application clinic staff already use.",
    audio: frxAudio(6),
  },
];
