import type { ReactNode } from "react";

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

const masterSolutionRows = [
  {
    num: "1",
    layer: "Encounters + Diagnoses",
    question: "What happened, and which problems were active?",
    imageSrc: "/images/vehr/1.png",
    imageAlt:
      "Longitudinal timeline aligning encounters and diagnoses over time",
    payoff: false,
  },
  {
    num: "2",
    layer: "Labs + Vitals",
    question: "What objective evidence supports the story?",
    imageSrc: "/images/vehr/2.png",
    imageAlt: "Labs and vitals compressed into a scannable signal view",
    payoff: false,
  },
  {
    num: "3",
    layer: "Medications",
    question: "What treatment changed, and why?",
    imageSrc: "/images/vehr/3.png",
    imageAlt: "Medication and treatment documentation in clinical context",
    payoff: false,
  },
  {
    num: "4",
    layer: "Full Timeline",
    question: "What is the patient story?",
    imageSrc: "/images/vehr/vehr.png",
    imageAlt: "VEHR combined patient timeline for full chart review",
    payoff: true,
  },
] as const;

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
        VEHR reorganizes clinical review around time. Each layer answers one
        clinical question, then combines into a full timeline clinicians can
        scan, filter, and inspect.
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
              <p className={`${stepBodyClass} mt-3`}>{row.question}</p>
            </div>
            <div className="w-full min-w-0">
              <div
                className={`${visualShellClass} ${row.payoff ? "ring-2 ring-black/[0.12] shadow-[0_16px_48px_-20px_rgba(0,0,0,0.18),0_6px_16px_-6px_rgba(0,0,0,0.1)]" : ""}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={row.imageSrc}
                  alt={row.imageAlt}
                  className={thumbClass}
                />
              </div>
            </div>
          </StepRow>
        ))}
      </div>
    </>
  );
}
