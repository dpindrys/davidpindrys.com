import type { ReactNode } from "react";
import VehrTimelineStepVisual from "./VehrTimelineStepVisual";
import type { VehrTimelineStepVariant } from "./VehrTimelineStepVisual";

const stepHeadingClass =
  "font-sans text-[22px] md:text-[24px] font-semibold leading-[1.25] tracking-tight text-black";
const stepBodyClass =
  "font-sans text-[22px] md:text-[24px] font-normal leading-[1.45] text-black/80";

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

const steps: readonly {
  title: string;
  body: string;
  visualVariant: VehrTimelineStepVariant;
}[] = [
  {
    title: "1. When did care happen?",
    body: "Encounters mark the moments where clinical data becomes verifiable and actionable.",
    visualVariant: "encounters-only",
  },
  {
    title: "2. Which problems were active?",
    body: "The diagnosis moves through the care sequence: addressed at urgent care, exacerbated at the ER, then resolved at PCP follow-up.",
    visualVariant: "diagnoses-encounters",
  },
  {
    title: "3. What happened at the ER?",
    body: "Opening an encounter reveals the clinical details behind that moment in the story.",
    visualVariant: "er-encounter-tooltip",
  },
];

export default function VehrRebuildingStorySteps() {
  return (
    <div className="mt-14 md:mt-16 lg:mt-20">
      {steps.map((step, i) => (
        <StepRow key={step.title} isFirst={i === 0}>
          <div className="flex max-w-md flex-col gap-4">
            <h4 className={stepHeadingClass}>{step.title}</h4>
            <p className={stepBodyClass}>{step.body}</p>
          </div>
          <div className="w-full min-w-0">
            <VehrTimelineStepVisual variant={step.visualVariant} />
          </div>
        </StepRow>
      ))}
    </div>
  );
}
