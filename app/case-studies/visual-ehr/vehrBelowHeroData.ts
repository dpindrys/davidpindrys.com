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
    "As founding product design lead, I partnered with VEHR’s physician founder to design a new way to review patient charts. I led workflow design, information architecture, and the UI system that VEHR’s engineering team is now implementing.",
} as const;

/** Page Overview band above the ROLE / CLIENT meta row. */
export const vehrOverviewSection = {
  eyebrow: "Overview",
  body: vehrHeroLead.body,
} as const;

export const vehrBelowHeroTestimonial = {
  quote:
    "As a first-time founder, David's guidance was crucial. His work greatly advanced our team's quality and timeline.",
  name: "Cole Marolf MD",
  title: "Practicing clinician & Founder, VEHR Technologies",
  avatarSrc: "/images/cole.png",
} as const;
