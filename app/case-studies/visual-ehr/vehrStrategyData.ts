export const vehrStrategySection = {
  eyebrow: "Strategy",
  title: "Mapping a mental model",
  bodyLead:
    "Reducing cognitive load by structuring information around how clinicians reconstruct patient history over time.",
  bodyFollow:
    "Before wireframes, I worked with Cole Marolf, MD to build an object map from his chart review workflow—translating how he moves through a patient record into the entities, relationships, and temporal links the product would need to support.",
  images: [
    {
      src: "/images/vehr/note.png",
      alt: "Handwritten clinical note and chart tabs used to trace how information is accessed during a visit",
    },
    {
      src: "/images/vehr/map.png",
      alt: "Object map of chart review connecting provider, patient, diagnoses, vitals, testing, treatments, and notes",
    },
  ],
} as const;
