export const vinylBelowHeroMeta = [
  { label: "Client", value: "Vinyl Health" },
  { label: "Status", value: "Prototype" },
] as const;

export const vinylOverviewSection = {
  eyebrow: "Overview",
  body: "An AI-assisted overview that helps clinicians review changes in a patient’s condition and trace generated summaries back to the underlying clinical records.",
} as const;

export const vinylPatientStory = {
  title: "Sarah’s care journey",
  body: "Sarah Chen is a patient and high school teacher managing diabetes, back pain, and anxiety. Her blood sugar is improving, but new nausea, reduced sleep, and rising work stress are affecting her daily life.",
  imageSrc: "/images/vinyl/overview.png",
  imageAlt:
    "Vinyl Health overview for Sarah Chen, with prioritized insights linked to source records and a clinical timeline.",
} as const;

export const vinylPrototypeSection = {
  title: "The interactive prototype",
  body: "The prototype opens on Sarah’s overview: prioritized insights, each linked to a source record, with her clinical timeline and preferences in the same view.",
  href: "https://vinylhealth.vercel.app/",
  imageSrc: "/images/vinyl/hero.png",
  imageAlt:
    "Vinyl Health overview for Sarah Chen, with prioritized insights linked to source records and a clinical timeline.",
} as const;
