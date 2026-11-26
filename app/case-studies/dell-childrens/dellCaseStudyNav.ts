/** Scroll targets in the Dell Children's case study (sidebar nav + scrollspy). */
export const dellCaseStudyNavSections = [
  { id: "dell-nav-overview", label: "Overview" },
  { id: "dell-nav-home", label: "Home" },
  { id: "dell-nav-care-team", label: "Care team" },
  { id: "dell-nav-id-cards", label: "ID cards" },
] as const;

/** Gap above section targets; clears mobile sticky chrome, modest on desktop sidebar. */
export const dellNavScrollMtClass = "scroll-mt-28 md:scroll-mt-8";

export type DellCaseStudyNavId =
  (typeof dellCaseStudyNavSections)[number]["id"];

/** Sidebar title: work name (homepage card tagline). */
export const DELL_CASE_STUDY_MODAL_TITLE = "Member self-service portal";
/** Sidebar subtitle: client (homepage card client). */
export const DELL_CASE_STUDY_MODAL_SUBTITLE = "Dell Children’s Health Plan";
