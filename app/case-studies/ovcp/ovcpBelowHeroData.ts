export const ovcpBelowHeroMeta = [
  { label: "Role", value: "UI Engineer" },
  { label: "Client", value: "Department of Defense" },
  { label: "Timeline", value: "2 weeks" },
  { label: "Status", value: "Research Findings Delivered" },
] as const;

export const ovcpHeroFocusPills = [
  "EHR Usability",
  "Clinical Research",
  "Problem Lists",
] as const;

export const ovcpHeroLead = {
  body:
    "In a two-week sprint with the Department of Defense, I co-designed approaches to problem list reconciliation with working physicians—exploring faster ways to relate, consolidate, and review diagnoses inside a complex military EHR.",
} as const;

export const ovcpProductContext = {
  title: "Problem list reconciliation in military EHRs",
  body:
    "In 2015, I worked with the DoD on EHR usability research focused on one of the most persistent pain points in electronic records: the problem list. Through interviews, co-design sessions, and rapid prototyping with clinical SMEs, we explored interaction patterns that could make reconciliation faster, clearer, and more trustworthy without adding administrative burden.",
} as const;
