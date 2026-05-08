import type { ReactNode } from "react";

import ZoomableProblemImage from "../../components/ZoomableProblemImage";

const eyebrowClass =
  "font-sans text-[12px] font-normal uppercase tracking-[0.12em] text-gray-800";
const sectionTitleClass =
  "w-full font-sans text-[clamp(26px,4vw,38px)] font-semibold leading-[1.15] tracking-[-0.02em] text-black";
const introClass =
  "w-full font-sans text-[22px] md:text-[24px] font-normal leading-[1.45] text-black/80";
const stepHeadingClass =
  "font-sans text-[22px] md:text-[24px] font-semibold leading-[1.25] tracking-tight text-black";
const stepBodyClass =
  "font-sans text-[22px] md:text-[24px] font-normal leading-[1.45] text-black/80";
const stepQuestionClass =
  "font-sans text-[20px] md:text-[22px] font-semibold leading-[1.35] tracking-tight text-black";

/** Former arrow-line styling; kept so stale HMR/server chunks cannot throw ReferenceError. */
const responseClass =
  "mt-3 font-sans text-[18px] font-normal leading-[1.45] text-black/50 md:text-[20px]";

const visualShellClass =
  "rounded-2xl border border-black/10 bg-white p-4 md:p-5 shadow-[0_12px_40px_-18px_rgba(0,0,0,0.1),0_4px_12px_-4px_rgba(0,0,0,0.06)]";

const thumbClass = "block h-auto w-full rounded-md border-0";

function StepRow({
  children,
  isFirst,
}: {
  children: ReactNode;
  isFirst?: boolean;
}) {
  return (
    <div
      className={`grid grid-cols-1 gap-8 md:grid-cols-2 md:items-center md:gap-12 lg:gap-14 ${isFirst ? "pt-0" : "border-t border-black/10 pt-12 md:pt-16 lg:pt-20"} pb-12 md:pb-16 lg:pb-20`}
    >
      {children}
    </div>
  );
}

type MasterSolutionRow = {
  num: string;
  layer: string;
  question: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  payoff: boolean;
  /** When set, the visual is wrapped in a jump link to this section id. */
  scrollTargetId?: string;
};

const masterSolutionRows: MasterSolutionRow[] = [
  {
    num: "1",
    layer: "Patient Overview",
    question: "What needs attention now?",
    description:
      "The overview surfaces current risks, monitored conditions, stable problems, and relevant care context before clinicians inspect the timeline.",
    imageSrc: "/images/vehr/overview.png",
    imageAlt:
      "VEHR patient overview: risks, monitored and stable conditions, and care context",
    payoff: false,
  },
  {
    num: "2",
    layer: "Patient-Reported Data",
    question: "How is the patient experiencing the condition?",
    description:
      "Patient-reported symptoms and outcomes add lived experience to the clinical record, showing what may be improving, worsening, or persisting between visits.",
    imageSrc: "/images/vehr/patient-reported.png",
    imageAlt:
      "Patient-reported symptom grid: fatigue, pain, functional limitation, and distress over time",
    payoff: false,
    scrollTargetId: "vehr-patient-stories-heading",
  },
  {
    num: "3",
    layer: "Encounters + Diagnoses",
    question: "What happened, and which problems were active?",
    description:
      "Encounters create the timeline backbone: when care happened, why the patient was seen, and which problems were active.",
    imageSrc: "/images/vehr/1.png",
    imageAlt:
      "Longitudinal timeline aligning encounters and diagnoses over time",
    payoff: false,
    scrollTargetId: "vehr-patient-stories-heading",
  },
  {
    num: "4",
    layer: "Labs + Vitals",
    question: "What objective evidence supports the story?",
    description:
      "Objective measures show whether the patient’s condition improved, worsened, or stayed stable.",
    imageSrc: "/images/vehr/2.png",
    imageAlt: "Labs and vitals compressed into a scannable signal view",
    payoff: false,
    scrollTargetId: "vehr-ehr-problems-heading",
  },
  {
    num: "5",
    layer: "Medications",
    question: "What treatment changed, and why?",
    description:
      "Medication events align treatment changes with nearby encounters, diagnoses, labs, and vitals.",
    imageSrc: "/images/vehr/3.png",
    imageAlt: "Medication and treatment documentation in clinical context",
    payoff: false,
    scrollTargetId: "vehr-medications-problem-heading",
  },
  {
    num: "6",
    layer: "Full Timeline",
    question: "What is the patient story?",
    description:
      "The combined view lets clinicians scan the patient story first, then inspect source details when needed.",
    imageSrc: "/images/vehr/vehr.png",
    imageAlt: "VEHR combined patient timeline for full chart review",
    payoff: true,
    scrollTargetId: "vehr-full-prototype-eyebrow",
  },
];

const visualLinkClass =
  "group block w-full min-w-0 rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/25 focus-visible:ring-offset-2 focus-visible:ring-offset-[#F4F2EE]";

export default function VehrMasterSolutionSummary() {
  return (
    <>
      <p className={eyebrowClass}>The Core Solution</p>
      <h2
        id="vehr-master-solution-heading"
        className={`${sectionTitleClass} mt-4 md:mt-5`}
      >
        Build the Chart Around the Patient Story
      </h2>
      <p className={`${introClass} mt-5 md:mt-6`}>
        VEHR organizes chart review as a layered clinical narrative.
        Patient-reported data introduces how the patient is doing, encounters
        anchor when care happened, objective measures show clinical change, and
        medications show treatment decisions in context.
      </p>

      <div className="mt-14 md:mt-16 lg:mt-20">
        {masterSolutionRows.map((row, i) => (
          <StepRow key={row.num} isFirst={i === 0}>
            <div className="flex max-w-md flex-col gap-1 md:max-w-none lg:max-w-lg">
              <h4
                className={`${stepHeadingClass} ${row.payoff ? "md:text-[25px]" : ""}`}
              >
                {row.num}. {row.layer}
              </h4>
              <p className={`${stepQuestionClass} mt-2`}>{row.question}</p>
              <p className={`${stepBodyClass} mt-3`}>{row.description}</p>
            </div>
            <div className="w-full min-w-0">
              {row.scrollTargetId ? (
                <a
                  href={`#${row.scrollTargetId}`}
                  className={visualLinkClass}
                  aria-label={`Jump to ${row.layer}`}
                >
                  <div
                    className={`${visualShellClass} transition-shadow duration-200 group-hover:shadow-[0_16px_48px_-20px_rgba(0,0,0,0.14),0_6px_16px_-6px_rgba(0,0,0,0.08)] ${row.payoff ? "ring-2 ring-black/[0.12] shadow-[0_16px_48px_-20px_rgba(0,0,0,0.18),0_6px_16px_-6px_rgba(0,0,0,0.1)]" : ""}`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={row.imageSrc}
                      alt={row.imageAlt}
                      className={thumbClass}
                    />
                  </div>
                </a>
              ) : (
                <ZoomableProblemImage
                  src={row.imageSrc}
                  alt={row.imageAlt}
                  shellClassName={`${visualShellClass} ${row.payoff ? "ring-2 ring-black/[0.12] shadow-[0_16px_48px_-20px_rgba(0,0,0,0.18),0_6px_16px_-6px_rgba(0,0,0,0.1)]" : ""}`}
                  imgClassName={thumbClass}
                  dialogLabel={`${row.layer} visual`}
                />
              )}
            </div>
          </StepRow>
        ))}
      </div>
    </>
  );
}
