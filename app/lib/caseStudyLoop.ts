/** Order for next-project navigation; next from FRx still goes to VEHR (see `nextCaseStudyPath`). */
export const CASE_STUDY_PATHS = [
  "/case-studies/visual-ehr",
  "/case-studies/frx",
  "/case-studies/ovcp",
  "/case-studies/dell-childrens",
] as const;

export type CaseStudyPath = (typeof CASE_STUDY_PATHS)[number];

export function nextCaseStudyPath(current: CaseStudyPath): CaseStudyPath {
  if (current === "/case-studies/frx") return "/case-studies/visual-ehr";
  const i = CASE_STUDY_PATHS.indexOf(current);
  if (i < 0) return CASE_STUDY_PATHS[0]!;
  return CASE_STUDY_PATHS[(i + 1) % CASE_STUDY_PATHS.length]!;
}
