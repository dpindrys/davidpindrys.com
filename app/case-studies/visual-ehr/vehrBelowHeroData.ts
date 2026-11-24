export const vehrBelowHeroMeta = [
  { label: "Role", value: "Founding Product Design Lead" },
  { label: "Client", value: "VEHR Technologies" },
  { label: "Timeline", value: "4 months" },
  { label: "Status", value: "In development" },
] as const;

export const vehrHeroFocusPills = [
  "EHR Design",
  "Data Visualization",
  "Clinical Workflows",
] as const;

export const vehrHeroLead = {
  body:
    "I collaborated with a practicing physician founder to design a timeline-based chart review platform that reorganizes fragmented EHR data into longitudinal clinical narratives. I led workflow design, information architecture, and scalable UI systems now being implemented by the VEHR engineering team.",
} as const;

/** Page Overview band above the ROLE / CLIENT meta row. */
export const vehrOverviewSection = {
  eyebrow: "Overview",
  body: vehrHeroLead.body,
} as const;

export const vehrProductContext = {
  title: "Chart review for an EHR startup",
  body:
    "VEHR Technologies is developing a timeline-based chart review platform designed around how clinicians naturally interpret patient history over time. The platform reorganizes fragmented EHR data into connected clinical narratives that support contextual review, pattern recognition, and longitudinal sensemaking across complex patient records.",
} as const;

export const vehrBelowHeroTestimonial = {
  quote:
    "As a first-time founder, David's guidance was crucial. His work greatly advanced our team's quality and timeline.",
  name: "Cole Marolf MD",
  title: "Practicing clinician & Founder, VEHR Technologies",
  avatarSrc: "/images/cole.png",
} as const;
