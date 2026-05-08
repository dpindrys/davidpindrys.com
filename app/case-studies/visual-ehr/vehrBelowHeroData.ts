import type { CaseStudyHighlightsData } from "../../components/CaseStudyHighlights";

export const vehrBelowHeroMeta = [
  { label: "Role", value: "Founding Product Design Lead" },
  { label: "Timeline", value: "4 months" },
  { label: "Status", value: "In development" },
] as const;

export const vehrBelowHeroSummaryBlock = {
  label: "SUMMARY",
  body:
    "I worked with a practicing physician to design a chart review workflow that makes dense patient data over time easier to interpret, and delivered scalable components now being implemented by his development team.",
  team: "Founding clinical lead, engineering team, and myself",
  prototypeLink: {
    href: "https://visual-ehr.vercel.app/",
    label: "View the prototype",
  },
} as const;

export const vehrBelowHeroTestimonial = {
  quote:
    '"As a first-time founder, David\'s guidance was crucial. His work greatly advanced our team\'s quality and timeline."',
  name: "Cole Marolf MD",
  title: "Practicing clinician & Founder, VEHR Technologies",
  avatarSrc: "/images/cole.png",
} as const;

export const vehrBelowHeroCaseStudyHighlights: CaseStudyHighlightsData = {
  modalPresentation: "composite-vehr",
  modalBrandHeader: {
    projectTitle: "Clinical Sensemaking",
    company: "VEHR Technologies",
  },
  compositeRows: {
    mismatchOverload: [[0, 1]],
    researchMapping: [[0, 1]],
    timelineSolution: [[0]],
    domainArchitecture: [[0, 1]],
    impactValidation: [[0]],
  },
  frames: [
    {
      id: "mismatchOverload",
      title: "Mismatch & Overload",
      summary:
        "Most EHRs reflect how data is stored, not how clinicians think—and dense views can obscure what is changing and what needs attention.",
      images: [
        {
          src: "/images/vehr/mismatch.png",
          modalPrimarySrc: "/images/vehr/mismatch.png",
          alt: "Mental model mismatch between EHR structure and clinical reasoning",
          thumbnailTitle: "Mental Model Mismatch",
          modalTitle: "Mental Model Mismatch",
          modalBody:
            "Most EHRs organize by data source, not clinical reasoning. Tab-based navigation creates friction when clinicians need to build a patient story across time.",
        },
        {
          src: "/images/vehr/overload.png",
          modalPrimarySrc: "/images/vehr/overload.png",
          alt: "Dense data with weak clinical signal",
          thumbnailTitle: "Overload without Insight",
          modalTitle: "Overload without Insight",
          modalBody:
            "Even when data is visualized, overlapping trends without context make it hard to identify what's changing and what needs attention.",
        },
      ],
    },
    {
      id: "researchMapping",
      title: "Research & Mapping",
      summary:
        "Understanding clinician sensemaking and mapping the domain made it possible to design around problems and relationships instead of isolated data fields.",
      images: [
        {
          src: "/images/vehr/note.png",
          alt: "Clinician-led research artifacts for workflow and sensemaking",
          thumbnailTitle: "Clinician-led Research",
          modalTitle: "Clinician-led Research",
          modalBody:
            "I worked directly with Dr. Cole Marolf, a practicing PCP, to understand how clinicians construct patient narratives over time. We examined how he builds context from fragmented EHR data during chart review.",
        },
        {
          src: "/images/vehr/map.png",
          alt: "Mapping the domain: problems, events, outcomes, and relationships",
          thumbnailTitle: "Mapping the Clinical Workflow",
          modalTitle: "Mapping the Clinical Workflow",
          modalBody:
            "We mapped the clinical entities and relationships that drive decision-making (diagnoses, treatments, outcomes, timeline) to ensure the interface aligned with clinical reasoning, not database structure.",
        },
      ],
    },
    {
      id: "timelineSolution",
      title: "Timeline Solution",
      summary:
        "A longitudinal view aligns encounters and outcomes over time so clinicians can see patterns and change without chart digging.",
      images: [
        {
          src: "/images/vehr/timeline.png",
          alt: "Longitudinal view of clinical data over time",
          thumbnailTitle: "Longitudinal Patient Data",
          modalTitle: "Longitudinal Patient Data",
          modalBodyParagraphs: [
            "Encounters, vitals, diagnoses, and patient-reported data align across a shared timeline, making clinical relationships and patterns visible at a glance.",
            "Clinicians can scan vertically to see correlations at a moment in time, or horizontally to track a single domain's trajectory.",
          ],
        },
      ],
    },
    {
      id: "domainArchitecture",
      title: "Domain Architecture",
      summary:
        "A unified visual structure surfaces signal first while keeping detail accessible, so clinicians stay oriented as they move from overview to action.",
      images: [
        {
          src: "/images/vehr/research3.png",
          alt: "Signal first, detail on demand with unified visual structure",
          thumbnailTitle: "Signal first, detail on demand",
          modalTitle: "Signal first, detail on demand",
          modalBody:
            "A unified visual structure helps clinicians spot patterns and abnormalities quickly, while preserving access to the detail needed for care planning.",
        },
        {
          src: "/images/vehr/voice2.png",
          alt: "Domain-aligned structure keeps context connected for decisions",
          thumbnailTitle: "Context stays connected",
          modalTitle: "Context stays connected",
          modalBody:
            "Keeping related problems, notes, and outcomes connected in one structure reduces chart digging and supports clearer, more confident review.",
        },
      ],
    },
    {
      id: "impactValidation",
      title: "Impact & Validation",
      summary:
        "Validation from a practicing clinician and founder after reviewing early concepts and prototypes.",
      images: [
        {
          alt: "Impact & Validation",
          thumbnailTitle: "Impact & Validation",
          modalTitle: "Impact & Validation",
          omitModalMedia: true,
          modalTestimonials: [
            {
              quote:
                "\"David brought design expertise to our early concepts, identifying core workflow needs and adding novel solutions - especially the heatmap visualization, which balances data density with clarity better than anything I've seen in practice.\"",
              attribution:
                "— Dr. Cole Marolf, Practicing Clinician & Founder, VEHR Technologies",
              avatarSrc: "/images/cole.png",
            },
          ],
        },
      ],
    },
  ],
};
