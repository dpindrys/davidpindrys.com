import type { DemoCaption } from "../components/DemoDialog";

/** Cache-bust tokens from `stat` mtimes of `public/audio/vehr#.wav`. */
const VEHR_AUDIO_V = {
  1: 1795113036,
  2: 1795112368,
  3: 1795112401,
  4: 1795112427,
  5: 1795112449,
  6: 1795112467,
} as const;

function vehrAudio(n: keyof typeof VEHR_AUDIO_V): string {
  return `/audio/vehr${n}.wav?v=${VEHR_AUDIO_V[n]}`;
}

/** Timed captions for the VEHR guided demo (narration: public/audio/vehr1–6.wav). */
export const vehrDemoCaptions: readonly DemoCaption[] = [
  {
    start: 0,
    end: 5,
    text: "Meet Jordan Reyes, a patient with type 2 diabetes and hypertension.",
    audio: vehrAudio(1),
  },
  {
    start: 5,
    end: 10,
    text: "Earlier urgent care and ER visits coincide with high fatigue, pain, and distress.",
    audio: vehrAudio(2),
  },
  {
    start: 10,
    end: 14,
    text: "Hovering reveals individual symptom reports and how they change over time.",
    audio: vehrAudio(3),
  },
  {
    start: 14,
    end: 18,
    text: "Visits, vitals, labs, and medications line up on the same timeline.",
    audio: vehrAudio(4),
  },
  {
    start: 18,
    end: 25,
    text: "Across follow-ups, his A1c falls from 10.8% to 6.7%, while blood pressure also improves.",
    audio: vehrAudio(5),
  },
  {
    start: 25,
    text: "The overview highlights his progress and what still needs monitoring.",
    audio: vehrAudio(6),
  },
];