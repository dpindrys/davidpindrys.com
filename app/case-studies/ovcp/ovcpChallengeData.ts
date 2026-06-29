export const ovcpChallengeIntro = {
  title: "The Problem List is a Shared Pain Point",
  body:
    "In health informatics circles, problem lists are often described as the problem of all EMRs—because few systems present them well. As diagnoses accumulate over time, inconsistent documentation, duplicate entries, and unclear standards make lists harder to scan, trust, and reconcile—leaving critical context buried in long, difficult-to-read records.",
  imageSrc: "/images/ovcp/docs.png",
  imageAlt:
    "Dense problem list documentation illustrating how clinical records grow unwieldy over time",
} as const;

export const ovcpClinicQuotes = [
  {
    quote:
      "The document can quickly grow to 30 or more lines of text, making a clear and quick understanding of the patient's health nearly impossible.",
    attribution: "PHYSICIAN",
  },
  {
    quote:
      "Different codes are added to the problem list that reference the same disease. The problem list becomes redundant…",
    attribution: "CLINICAL SME",
  },
  {
    quote:
      "One physician would not add 'persistent cough'… Yet, if that patient is admitted to the emergency room, such information could be a key clue for determining treatment.",
    attribution: "EMERGENCY PHYSICIAN",
  },
] as const;

export const ovcpChallengeImpact = {
  title: "The impact",
  body:
    "Overgrown lists, redundant entries, and unclear governance make problem lists hard to trust and slow to reconcile—pulling clinicians away from the clinical picture and toward administrative cleanup.",
} as const;
