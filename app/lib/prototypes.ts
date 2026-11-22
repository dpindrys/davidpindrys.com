import type { DemoCaption } from "../components/DemoDialog";

export type Prototype = {
  id: string;
  client: string;
  focus: string;
  summary: string;
  image: string;
  imageAlt: string;
  /** Optional background for stacked hero (foreground uses `image`). */
  bgImage?: string;
  video: string;
  href: string;
  /** Modal header title (e.g. “Clinical Timeline”). */
  demoTitle?: string;
  /** Modal header subtitle (e.g. client name). */
  demoSubtitle?: string;
  /** Caption list section heading (e.g. “Jordan’s care journey”). */
  demoWalkthroughHeading?: string;
  demoDescription?: string;
  demoCaptions?: readonly DemoCaption[];
};

/**
 * Cache-bust tokens from `stat` mtimes of `public/audio/vehr#.wav`.
 * Bump the matching entry (or re-stat) whenever a narration file is replaced.
 */
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
const vehrDemoCaptions: readonly DemoCaption[] = [
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

/**
 * Cache-bust tokens from `stat` mtimes of `public/audio/vinyl#.wav`.
 * Bump the matching entry (or re-stat) whenever a narration file is replaced.
 */
const VINYL_AUDIO_V = {
  1: 1795126161,
  2: 1795126196,
  3: 1795126220,
  4: 1795126246,
  5: 1795126457,
  6: 1795126293,
} as const;

function vinylAudio(n: keyof typeof VINYL_AUDIO_V): string {
  return `/audio/vinyl${n}.wav?v=${VINYL_AUDIO_V[n]}`;
}

/** Timed captions for the Vinyl Health guided demo (narration: public/audio/vinyl1–6.wav). */
const vinylDemoCaptions: readonly DemoCaption[] = [
  {
    start: 0,
    end: 7,
    text: "The overview highlights new nausea and changes in sleep, activity, and work stress.",
    audio: vinylAudio(1),
  },
  {
    start: 7,
    end: 11,
    text: "Her A1c has improved from 7.2% to 6.8%.",
    audio: vinylAudio(2),
  },
  {
    start: 11,
    end: 17,
    text: "The timeline brings together patient reports, device readings, labs, and clinical visits.",
    audio: vinylAudio(3),
  },
  {
    start: 17,
    end: 24,
    text: "Opening a source reveals why gabapentin was stopped: drowsiness was affecting her work.",
    audio: vinylAudio(4),
  },
  {
    start: 24,
    end: 28,
    text: "The clinician returns to the summary with the supporting record checked.",
    audio: vinylAudio(5),
  },
  {
    start: 28,
    text: "Sarah’s preferences stay visible alongside the clinical insights.",
    audio: vinylAudio(6),
  },
];

export const prototypes: readonly Prototype[] = [
  {
    id: "vehr",
    client: "VEHR Technologies",
    focus: "Clinical timeline",
    summary:
      "A clinical timeline that brings symptoms, encounters, and measurements into one view, helping clinicians follow a patient’s history and see how changes connect.",
    image: "/images/vehr/hero.png",
    imageAlt:
      "VEHR clinical timeline for Jordan Reyes, with conditions, demographics, and a measurement heatmap.",
    bgImage: "/images/vehr/bg.png",
    video: "/videos/vehr/prototype.mp4",
    href: "https://visual-ehr.vercel.app",
    demoTitle: "Clinical Timeline",
    demoSubtitle: "VEHR Technologies",
    demoWalkthroughHeading: "Jordan’s care journey",
    demoDescription:
      "Jordan is a patient with type 2 diabetes and hypertension. After urgent care and an ER visit, his follow-up records show improving symptoms, blood pressure, and blood sugar.",
    demoCaptions: vehrDemoCaptions,
  },
  {
    id: "vinyl",
    client: "Vinyl Health",
    focus: "AI-assisted patient overview",
    summary:
      "An AI-assisted overview that helps clinicians review changes in a patient’s condition and trace generated summaries back to the underlying clinical records.",
    image: "/images/vinyl/hero.png",
    imageAlt:
      "Vinyl Health overview for Sarah Chen, with prioritized insights linked to source records and a clinical timeline.",
    bgImage: "/images/vinyl/bg.png",
    video: "/videos/vinyl.mp4",
    href: "https://vinylhealth.vercel.app/",
    demoTitle: "AI-assisted patient overview",
    demoSubtitle: "Vinyl Health",
    demoWalkthroughHeading: "Sarah’s care journey",
    demoDescription:
      "Sarah Chen is a patient and high school teacher managing diabetes, back pain, and anxiety. Her blood sugar is improving, but new nausea, reduced sleep, and rising work stress are affecting her daily life.",
    demoCaptions: vinylDemoCaptions,
  },
];