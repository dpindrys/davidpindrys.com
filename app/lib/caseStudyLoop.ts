/** Order matches home case study sequence; next from FRx goes to VEHR; otherwise last → first in list. */
export const CASE_STUDY_PATHS = [
  "/case-studies/visual-ehr",
  "/case-studies/frx",
  "/case-studies/ovcp",
] as const;

export type CaseStudyPath = (typeof CASE_STUDY_PATHS)[number];

export function nextCaseStudyPath(current: CaseStudyPath): CaseStudyPath {
  if (current === "/case-studies/frx") return "/case-studies/visual-ehr";
  const i = CASE_STUDY_PATHS.indexOf(current);
  if (i < 0) return CASE_STUDY_PATHS[0]!;
  return CASE_STUDY_PATHS[(i + 1) % CASE_STUDY_PATHS.length]!;
}
