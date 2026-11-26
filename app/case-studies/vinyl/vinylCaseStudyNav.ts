/** Scroll targets in the Vinyl Health case study (sidebar nav + scrollspy). */
export const vinylCaseStudyNavSections = [
  { id: "vinyl-nav-overview", label: "Overview" },
  { id: "vinyl-nav-story", label: "Patient story" },
  { id: "vinyl-nav-prototype", label: "Prototype" },
] as const;

/** Gap above section targets; clears mobile sticky chrome, modest on desktop sidebar. */
export const vinylNavScrollMtClass = "scroll-mt-28 md:scroll-mt-8";

export type VinylCaseStudyNavId =
  (typeof vinylCaseStudyNavSections)[number]["id"];

/** Sidebar title: work name (homepage card tagline). */
export const VINYL_CASE_STUDY_MODAL_TITLE = "AI-assisted patient overview";
/** Sidebar subtitle: client (homepage card client). */
export const VINYL_CASE_STUDY_MODAL_SUBTITLE = "Vinyl Health";
