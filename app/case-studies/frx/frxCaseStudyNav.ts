/** Scroll targets in the Frx case study (sidebar nav + scrollspy). */
export const frxCaseStudyNavSections = [
  { id: "frx-nav-overview", label: "Overview" },
  { id: "frx-nav-challenge", label: "Challenge" },
  { id: "frx-nav-strategy", label: "Strategy" },
  { id: "frx-nav-prototyping", label: "Prototyping" },
  { id: "frx-nav-impact", label: "Impact" },
] as const;

/** Gap above section eyebrows; clears mobile sticky chrome, modest on desktop sidebar. */
export const frxNavScrollMtClass = "scroll-mt-28 md:scroll-mt-8";

export type FrxCaseStudyNavId = (typeof frxCaseStudyNavSections)[number]["id"];

export const FRX_CASE_STUDY_MODAL_TITLE = "In-clinic refill workflow";
export const FRX_CASE_STUDY_MODAL_SUBTITLE = "Fresenius Medical Care";
export const FRX_CASE_STUDY_WALKTHROUGH_HEADING = "CareTeamHub walkthrough";