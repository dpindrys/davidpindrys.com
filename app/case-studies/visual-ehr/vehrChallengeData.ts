export type VehrChallengeCluster = {
  id: string;
  title: string;
  panelLabel: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  quote: string;
  attribution: string;
};

export const vehrChallengeIntro = {
  title: "Source-based records fragment longitudinal reasoning",
  body:
    "Most EHRs organize information by storage type rather than by how clinicians reconstruct patient history. Labs, medications, vitals, diagnoses, and notes are separated across tabs, tables, and isolated trend views — forcing clinicians to manually piece together what changed, when it changed, and why it mattered.",
} as const;

export const vehrChallengeClusters: readonly VehrChallengeCluster[] = [
  {
    id: "trends-noise",
    title: "Trends become noise quickly",
    panelLabel: "Overloaded",
    description:
      "Labs and vitals are clinically valuable longitudinally, but multi-scale trend views often bury meaningful change in visual noise. Interpreting whether a value matters — and what surrounded it — becomes its own reconstruction task.",
    imageSrc: "/images/vehr/overload.png",
    imageAlt:
      "Overlapping multi-scale trend lines where clinically important changes are buried in visual noise",
    quote:
      "The trends are technically there, but interpreting them takes work.",
    attribution: "Internal Medicine Physician",
  },
  {
    id: "fragmented-context",
    title: "Clinical context becomes fragmented",
    panelLabel: "Fragmented",
    description:
      "Labs, medications, vitals, notes, and diagnoses often live in separate tabs and workflows. Reviewing a patient story requires repeated context switching and cross-referencing across disconnected views.",
    imageSrc: "/images/vehr/epic-encounters.png",
    imageAlt:
      "Epic EHR encounter list organized as disconnected modules across the chart",
    quote:
      "Labs, meds, vitals, notes — everything lives in separate places, so clinical context gets fragmented.",
    attribution: "Hospital Clinician",
  },
  {
    id: "mental-model-mismatch",
    title: "Mental model mismatch",
    panelLabel: "Mismatched",
    description:
      "Most EHRs reflect how information is stored rather than how clinicians naturally reconstruct patient history. Clinical reasoning is longitudinal and relational, but source-based records force providers into chart scavenger hunts.",
    imageSrc: "/images/vehr/map.png",
    imageAlt:
      "Clinical workflow map connecting problems, events, and outcomes across patient history",
    quote:
      "Rather than an HPI followed by a chart scavenger hunt, the clinician's mind desires a story enfolded with history.",
    attribution: "Cole Marolf, MD",
  },
] as const;
