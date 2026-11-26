export const frxBelowHeroMeta = [
  { label: "Role", value: "UX Design Lead" },
  { label: "Client", value: "Fresenius Medical Care" },
  { label: "Timeline", value: "6 months" },
  { label: "Status", value: "Launched enterprise-wide" },
] as const;

export const frxHeroFocusPills = [
  "Clinical Workflows",
  "Care Coordination",
  "Enterprise Systems",
] as const;

export const frxBelowHeroSummaryBlock = {
  body:
    "FreseniusRx is Fresenius Medical Care's in-house pharmacy for dialysis patients. I led research and design for a refill workflow within CareTeamHub, the Salesforce application nurses and dietitians use at the point of care. Staff can request refills and track prescription and shipment status directly in the patient chart, replacing paper, fax, and phone follow-ups.\n\nThe workflow made refills 70% faster across 2,800+ clinics serving 43,000+ patients.",
} as const;

/** Modal/page Overview band above the ROLE / CLIENT meta row. */
export const frxOverviewSection = {
  eyebrow: "Overview",
  body: "I led research and design for a refill workflow in CareTeamHub that connected clinic staff with FreseniusRx, Fresenius Medical Care’s pharmacy for dialysis patients. The new workflow made refills 70% faster across 2,800+ clinics serving 43,000+ patients.",
} as const;
