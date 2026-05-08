/** Order matches home case study sequence; Next loops last → first. */
export const CASE_STUDY_PATHS = [
  "/case-studies/visual-ehr",
  "/case-studies/frx",
  "/case-studies/ovcp",
] as const;

export type CaseStudyPath = (typeof CASE_STUDY_PATHS)[number];

export function nextCaseStudyPath(current: CaseStudyPath): CaseStudyPath {
  const i = CASE_STUDY_PATHS.indexOf(current);
  if (i < 0) return CASE_STUDY_PATHS[0]!;
  return CASE_STUDY_PATHS[(i + 1) % CASE_STUDY_PATHS.length]!;
}
