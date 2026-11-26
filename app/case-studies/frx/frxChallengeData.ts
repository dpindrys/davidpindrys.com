export const frxChallengeIntro = {
  title: "Refills still ran on paper, fax, and phone calls",
  body:
    "Clinic staff documented refill requests on paper forms, faxed them to FreseniusRx, and called the pharmacy for updates. Once a form left the clinic, staff had no way to see its status from the patient’s chart.",
  imageSrc: "/images/frx/overload.png",
  imageAlt:
    "Information overload from paper and fax refill workflows",
} as const;

export const frxClinicQuotes = [
  {
    quote:
      "The biggest issue is having to go into every single patient to check for refills. That's quite time consuming.",
    attribution: "CLINIC ADMIN",
  },
  {
    quote: "On the phone at least 15 minutes or more (for each refill).",
    attribution: "FACILITY ADMIN",
  },
  {
    quote:
      "A million things can happen from the time you get up to walk to the copier.",
    attribution: "HT RN",
  },
] as const;

export const frxChallengeImpact = {
  title: "The impact",
  body:
    "Manual processes created visibility gaps, required repeated follow-ups, and pulled nurses away from direct patient care.",
} as const;
