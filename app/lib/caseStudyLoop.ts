/** Order for next-project navigation among published case studies. */
export const CASE_STUDY_PATHS = ["/case-studies/frx"] as const;

export type CaseStudyPath = (typeof CASE_STUDY_PATHS)[number];

export function nextCaseStudyPath(current: CaseStudyPath): CaseStudyPath {
  const i = CASE_STUDY_PATHS.indexOf(current);
  if (i < 0) return CASE_STUDY_PATHS[0]!;
  return CASE_STUDY_PATHS[(i + 1) % CASE_STUDY_PATHS.length]!;
}
