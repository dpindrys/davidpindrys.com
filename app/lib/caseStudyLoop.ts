/** Order for next-project: FRx → DCHP → FRx. */
export const CASE_STUDY_PATHS = [
  "/case-studies/frx",
  "/case-studies/dell-childrens",
] as const;

export type CaseStudyPath = (typeof CASE_STUDY_PATHS)[number];

export function nextCaseStudyPath(current: CaseStudyPath): CaseStudyPath {
  const i = CASE_STUDY_PATHS.indexOf(current);
  if (i < 0) return CASE_STUDY_PATHS[0]!;
  return CASE_STUDY_PATHS[(i + 1) % CASE_STUDY_PATHS.length]!;
}
