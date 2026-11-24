/** Scroll targets in the Visual EHR case study (sidebar nav + scrollspy). */
export const vehrCaseStudyNavSections = [
  { id: "vehr-nav-overview", label: "Overview" },
  { id: "vehr-nav-challenge", label: "Challenge" },
  { id: "vehr-nav-strategy", label: "Strategy" },
  { id: "vehr-nav-groundwork", label: "Groundwork" },
  { id: "vehr-nav-examples", label: "Examples" },
  { id: "vehr-nav-prototype", label: "Prototype" },
] as const;

/** Gap above section eyebrows; clears mobile sticky chrome, modest on desktop sidebar. */
export const vehrNavScrollMtClass = "scroll-mt-28 md:scroll-mt-8";

export type VehrCaseStudyNavId =
  (typeof vehrCaseStudyNavSections)[number]["id"];

/** Sidebar title: work name (homepage card tagline). */
export const VEHR_CASE_STUDY_MODAL_TITLE = "Clinical timeline";
/** Sidebar subtitle: client (homepage card client). */
export const VEHR_CASE_STUDY_MODAL_SUBTITLE = "VEHR Technologies";
