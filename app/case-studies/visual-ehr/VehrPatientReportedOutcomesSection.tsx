import type { ReactNode } from "react";

import {
  CASE_STUDY_MATRIX_INNER_GRID_COMPACT_CLASS,
  CASE_STUDY_MATRIX_LABEL_COL_COMPACT_CLASS,
  CASE_STUDY_MATRIX_ROW_LABEL_CLASS,
  CASE_STUDY_MATRIX_SHELL_CLASS,
} from "./caseStudyVisualTokens";
import {
  CASE_STUDY_VISIT_DATES,
  PRO_SYMPTOM_ROWS,
  PRO_THIRST_TOOLTIP_COL,
  proSeverityTone,
} from "./vehrCaseStudyNarrative";

import { vehrBodyClass, vehrSectionTitleClass } from "./vehrCaseStudySectionTokens";
const stepHeadingClass =
  "font-sans text-[22px] md:text-[24px] font-semibold leading-[1.25] tracking-tight text-black";
const stepBodyClass =
  "font-sans text-[22px] md:text-[24px] font-normal leading-[1.45] text-black/80";

const timelineColDividerClass = "border-r border-black/10";

function StepRow({
  children,
  isFirst,
  alignTop,
}: {
  children: ReactNode;
  isFirst?: boolean;
  alignTop?: boolean;
}) {
  const alignClass = alignTop ? "md:items-start" : "md:items-center";
  return (
    <div
      className={`grid grid-cols-1 gap-8 md:grid-cols-2 ${alignClass} md:gap-12 lg:gap-14 ${isFirst ? "pt-0" : "border-t border-black/10 pt-12 md:pt-16 lg:pt-20"} pb-12 md:pb-16 lg:pb-20`}
    >
      {children}
    </div>
  );
}

function FigureDateRow() {
  return (
    <div className="pt-3 md:pt-3.5">
      <div
        className="grid gap-1.5"
        style={{
          gridTemplateColumns: `repeat(${CASE_STUDY_VISIT_DATES.length}, minmax(0, 1fr))`,
        }}
        role="row"
        aria-label="Timeline dates"
      >
        {CASE_STUDY_VISIT_DATES.map((label, j) => (
          <div
            key={label}
            className={`text-center font-sans text-[10px] font-semibold leading-tight text-black/90 md:text-[12px] ${j < CASE_STUDY_VISIT_DATES.length - 1 ? timelineColDividerClass : ""}`}
          >
            {label}
          </div>
        ))}
      </div>
    </div>
  );
}

function ProValueCell({
  label,
  tone,
}: {
  label: string;
  tone: ReturnType<typeof proSeverityTone>;
}) {
  const bg =
    tone === "light"
      ? "bg-[#fdf2f8] text-[#111827]"
      : tone === "mid"
        ? "bg-[#fbcfe8] text-[#111827]"
        : tone === "high"
          ? "bg-[#ec4899] text-white"
          : "bg-[#be185d] text-white";
  return (
    <div
      className={`flex min-h-[44px] flex-1 items-center justify-center border-b border-r border-black/[0.06] font-sans text-[11px] font-medium leading-none tracking-[-0.02em] last:border-r-0 md:min-h-[52px] md:text-[12px] ${bg}`}
    >
      {label}
    </div>
  );
}

function SymptomRowStrip({
  values,
  tooltipCol,
}: {
  values: readonly number[];
  tooltipCol?: number;
}) {
  return (
    <div className="flex min-h-[52px] w-full min-w-0 overflow-hidden rounded-md border border-black/[0.08] md:min-h-[60px]">
      {values.map((v, i) => {
        const cell = <ProValueCell key={i} label={String(v)} tone={proSeverityTone(v)} />;
        if (tooltipCol === i) {
          return (
            <div key={i} className="relative z-10 min-w-0 flex-1 overflow-visible">
              <div className="pointer-events-none absolute bottom-[calc(100%+8px)] left-1/2 z-10 w-[min(280px,calc(100vw-3rem))] max-w-[280px] -translate-x-1/2 rounded-2xl bg-black px-5 py-4 text-left text-white shadow-[0_10px_40px_rgba(0,0,0,0.35)]">
                <div className="flex items-start justify-between gap-3">
                  <span className="text-[13px] font-bold leading-tight">Thirst</span>
                  <span className="max-w-[58%] text-right text-[11px] font-normal leading-snug text-gray-300">
                    Sep 09
                  </span>
                </div>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="text-[28px] font-extrabold leading-none">
                    9<span className="text-[14px] font-medium text-gray-300">/10</span>
                  </span>
                </div>
                <p className="mt-3 border-t border-white/10 pt-3 text-[12px] leading-snug text-gray-300">
                  Persistent excessive thirst and nocturia reported during ED intake.
                </p>
                <p className="mt-2 text-[12px] leading-snug text-gray-400">
                  Trend: Significant worsening from prior visit
                </p>
                <div
                  className="absolute -bottom-1.5 left-1/2 h-2.5 w-2.5 -translate-x-1/2 rotate-45 bg-black"
                  aria-hidden
                />
              </div>
              {cell}
            </div>
          );
        }
        return cell;
      })}
    </div>
  );
}

function SymptomBurdenFigure() {
  return (
    <div className={CASE_STUDY_MATRIX_SHELL_CLASS}>
      <div className={CASE_STUDY_MATRIX_INNER_GRID_COMPACT_CLASS}>
        <div className="min-w-0">
          <div className="space-y-1.5">
            {PRO_SYMPTOM_ROWS.map((row) => (
              <SymptomRowStrip key={row.id} values={row.values} />
            ))}
          </div>
          <div className="mt-4 border-t border-black/10">
            <FigureDateRow />
          </div>
        </div>

        <div className={CASE_STUDY_MATRIX_LABEL_COL_COMPACT_CLASS}>
          <div className="grid gap-1.5">
            {PRO_SYMPTOM_ROWS.map((row) => (
              <div key={row.id} className={CASE_STUDY_MATRIX_ROW_LABEL_CLASS}>
                {row.label}
              </div>
            ))}
          </div>
          <div className="invisible mt-4 border-t border-black/10">
            <FigureDateRow />
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap justify-center gap-x-4 gap-y-1.5 border-t border-black/10 pt-4 md:hidden">
        {PRO_SYMPTOM_ROWS.map((row) => (
          <span
            key={row.id}
            className="font-sans text-[11px] font-semibold leading-tight text-black/60"
          >
            {row.label}
          </span>
        ))}
      </div>
    </div>
  );
}

function SymptomDetailFigure() {
  return (
    <div className={`${CASE_STUDY_MATRIX_SHELL_CLASS} overflow-visible pt-12 md:pt-14`}>
      <div className={CASE_STUDY_MATRIX_INNER_GRID_COMPACT_CLASS}>
        <div className="min-w-0">
          <div className="space-y-1.5">
            {PRO_SYMPTOM_ROWS.map((row) => (
              <SymptomRowStrip
                key={row.id}
                values={row.values}
                tooltipCol={row.id === "thirst" ? PRO_THIRST_TOOLTIP_COL : undefined}
              />
            ))}
          </div>
          <div className="mt-4 border-t border-black/10">
            <FigureDateRow />
          </div>
        </div>

        <div className={CASE_STUDY_MATRIX_LABEL_COL_COMPACT_CLASS}>
          <div className="grid gap-1.5">
            {PRO_SYMPTOM_ROWS.map((row) => (
              <div key={row.id} className={CASE_STUDY_MATRIX_ROW_LABEL_CLASS}>
                {row.label}
              </div>
            ))}
          </div>
          <div className="invisible mt-4 border-t border-black/10">
            <FigureDateRow />
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap justify-center gap-x-4 gap-y-1.5 border-t border-black/10 pt-4 md:hidden">
        {PRO_SYMPTOM_ROWS.map((row) => (
          <span
            key={row.id}
            className="font-sans text-[11px] font-semibold leading-tight text-black/60"
          >
            {row.label}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function VehrSymptomsOnTimelineSection() {
  return (
    <article aria-labelledby="vehr-symptoms-on-timeline-heading">
      <h3
        id="vehr-symptoms-on-timeline-heading"
        className={`scroll-mt-28 ${vehrSectionTitleClass}`}
      >
        Symptoms on the Timeline
      </h3>
      <p className={`${vehrBodyClass} mt-5 md:mt-6`}>
        Fatigue, thirst, and insomnia align to the same visit columns as encounters,
        labs, and medications. Burden intensifies into Sep 09 and eases across PCP
        and telehealth—so patient-reported change reads with the clinical events
        around it.
      </p>

      <div className="mt-10 w-full md:mt-12 lg:mt-14">
        <StepRow isFirst>
          <div className="flex max-w-md flex-col gap-4">
            <h4 className={stepHeadingClass}>1. Symptom burden over time</h4>
            <p className={stepBodyClass}>
              Shared temporal alignment reveals how symptoms intensified leading into
              the emergency visit on Sep 09 and gradually improved after treatment
              changes at Sep 10 and Sep 14.
            </p>
          </div>
          <div className="w-full min-w-0">
            <SymptomBurdenFigure />
          </div>
        </StepRow>

        <StepRow alignTop>
          <div className="flex max-w-md flex-col gap-4">
            <h4 className={stepHeadingClass}>2. Detail at the acute visit</h4>
            <p className={stepBodyClass}>
              A concise panel anchors severity and context to Sep 09 without pulling
              clinicians out of the longitudinal read.
            </p>
          </div>
          <div className="w-full min-w-0">
            <SymptomDetailFigure />
          </div>
        </StepRow>
      </div>
    </article>
  );
}
