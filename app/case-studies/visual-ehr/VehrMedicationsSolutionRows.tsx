"use client";

import type { ReactNode } from "react";

import {
  FrxProcessRowShell,
  rowBodyClass,
  rowHeadingClass,
} from "../frx/FrxExtendedSections";

import {
  MEDICATION_FIGURE_AXIS_DATES,
  MedicationTimelineStrip,
  medHoldTooltipDetail,
  medicationFigureRows,
  TimelineColumnTooltipAnchor,
  toSigTooltipHeaderDate,
  toSigTooltipSinceDate,
  VehrKeyValueHoldTooltipChrome,
  VehrSigMedicationTooltipChrome,
  VehrSharedAxisDateRow,
  type SharedMedicationRow,
} from "./DesignLogicFromSignal";
import {
  CASE_STUDY_MATRIX_INNER_GRID_CLASS,
  CASE_STUDY_MATRIX_LABEL_COL_CLASS,
  CASE_STUDY_MATRIX_ROW_LABEL_CLASS,
  CASE_STUDY_MATRIX_SHELL_CLASS,
} from "./caseStudyVisualTokens";

/** Sep 09 — insulin glargine initiated in ED. */
const INSULIN_INIT_COL = 1;

/** Same shell as vitals/labs matrix; `overflow-visible` so timeline tooltips aren’t clipped. */
const medicationChartCardClass = `${CASE_STUDY_MATRIX_SHELL_CLASS} overflow-visible`;

function MedicationSolutionFigure({
  rows,
  axisDates,
  tooltipDemo,
}: {
  rows: readonly SharedMedicationRow[];
  axisDates: readonly string[];
  tooltipDemo?: {
    medId: string;
    col: number;
    placement?: "above" | "below";
    /** Custom tooltip body for the medication demo. */
    detail?: "subtherapeutic-reduction" | "insulin-initiation";
  };
}) {
  const colCount = rows[0]?.cells.length ?? 0;
  const showTip =
    tooltipDemo &&
    colCount === axisDates.length &&
    rows.some((r) => r.id === tooltipDemo.medId);

  const tipPlacement = tooltipDemo?.placement ?? "above";
  const panelPlacement = tipPlacement === "below" ? "below" : "above";

  return (
    <div className={`w-full ${showTip ? "relative z-10" : ""}`} aria-hidden>
      {/*
        overflow-x-auto forces overflow-y to compute to auto (CSS), which clips
        absolutely positioned tooltips. When the demo tooltip is shown, keep
        overflow visible so the panel can extend past the card. */}
      <div
        className={
          showTip
            ? "w-full overflow-visible pb-0.5"
            : "w-full overflow-x-auto pb-0.5 [-webkit-overflow-scrolling:touch]"
        }
      >
        <div
          className={
            colCount <= 4 ? "min-w-[280px] md:min-w-0" : "min-w-[560px] md:min-w-0"
          }
        >
          <div className={CASE_STUDY_MATRIX_INNER_GRID_CLASS}>
            <div className="min-w-0">
              <div className="space-y-1.5">
                {rows.map((mrow) => {
                  const tipThisRow = showTip && tooltipDemo!.medId === mrow.id;
                  const tipCell =
                    tipThisRow && tooltipDemo
                      ? mrow.cells[tooltipDemo.col]
                      : undefined;
                  const axisLabel = tooltipDemo
                    ? (axisDates[tooltipDemo.col] ?? "")
                    : "";
                  const showInsulinTooltip =
                    tipThisRow &&
                    tooltipDemo &&
                    tooltipDemo.detail === "insulin-initiation";
                  const showSigTooltip =
                    tipThisRow &&
                    tooltipDemo &&
                    tipCell?.kind === "dose" &&
                    tooltipDemo.detail === "subtherapeutic-reduction";
                  const showKvTooltip =
                    tipThisRow &&
                    tooltipDemo &&
                    tipCell?.kind === "dose" &&
                    !showInsulinTooltip &&
                    tooltipDemo.detail !== "subtherapeutic-reduction";
                  return (
                    <div
                      key={mrow.id}
                      className={`relative isolate flex min-h-[52px] items-center md:min-h-[60px] ${
                        tipThisRow
                          ? "rounded-[4px] shadow-[inset_0_0_0_2px_rgba(255,255,255,0.88),0_4px_14px_-4px_rgba(0,0,0,0.22)]"
                          : ""
                      }`}
                    >
                      {showInsulinTooltip ? (
                        <TimelineColumnTooltipAnchor
                          globalColIndex={tooltipDemo!.col}
                          colStart={0}
                          visibleColCount={axisDates.length}
                          placement={tipPlacement}
                        >
                          <VehrKeyValueHoldTooltipChrome
                            panelPlacement={panelPlacement}
                            primaryTitle="Insulin glargine"
                            secondaryTitle="Medication"
                            date={toSigTooltipHeaderDate(axisLabel)}
                            rows={[
                              { label: "Initiated", value: "During ED visit" },
                              { label: "Dose", value: "10 units nightly" },
                              { label: "Reason", value: "Uncontrolled hyperglycemia" },
                              { label: "Status", value: "Active" },
                            ]}
                          />
                        </TimelineColumnTooltipAnchor>
                      ) : null}
                      {showSigTooltip ? (
                        <TimelineColumnTooltipAnchor
                          globalColIndex={tooltipDemo!.col}
                          colStart={0}
                          visibleColCount={axisDates.length}
                          placement={tipPlacement}
                        >
                          <VehrSigMedicationTooltipChrome
                            medicationName={mrow.name}
                            headerDate={toSigTooltipHeaderDate(axisLabel)}
                            sigLine="10 mg · PO · daily"
                            doseState="Below typical dose range."
                            sinceDate={toSigTooltipSinceDate(axisLabel)}
                            panelPlacement={panelPlacement}
                          />
                        </TimelineColumnTooltipAnchor>
                      ) : null}
                      {showKvTooltip ? (
                        <TimelineColumnTooltipAnchor
                          globalColIndex={tooltipDemo!.col}
                          colStart={0}
                          visibleColCount={axisDates.length}
                          placement={tipPlacement}
                        >
                          <VehrKeyValueHoldTooltipChrome
                            panelPlacement={panelPlacement}
                            {...medHoldTooltipDetail(
                              mrow,
                              tipCell!,
                              tooltipDemo!.col,
                              axisDates,
                            )}
                          />
                        </TimelineColumnTooltipAnchor>
                      ) : null}
                      <div className="pointer-events-none w-full">
                        <MedicationTimelineStrip cells={mrow.cells} />
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="mt-4 border-t border-black/10">
                <VehrSharedAxisDateRow labels={axisDates} />
              </div>
            </div>

            <div className={CASE_STUDY_MATRIX_LABEL_COL_CLASS}>
              <div className="grid gap-1.5">
                {rows.map((mrow) => (
                  <div
                    key={mrow.id}
                    className={CASE_STUDY_MATRIX_ROW_LABEL_CLASS}
                  >
                    {mrow.name}
                  </div>
                ))}
              </div>
              <div className="invisible mt-4 border-t border-black/10">
                <VehrSharedAxisDateRow labels={axisDates} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap justify-center gap-x-4 gap-y-1.5 border-t border-black/10 pt-4 md:hidden">
        {rows.map((mrow) => (
          <span
            key={mrow.id}
            className="font-sans text-[11px] font-semibold leading-tight text-black/60"
          >
            {mrow.name}
          </span>
        ))}
      </div>
    </div>
  );
}

function VisualCard({ children }: { children: ReactNode }) {
  return <div className={medicationChartCardClass}>{children}</div>;
}

export default function VehrMedicationsSolutionRows() {
  return (
    <div className="mt-10 w-full md:mt-14 lg:mt-16">
      <FrxProcessRowShell
        isFirst
        left={
          <>
            <h3 className={rowHeadingClass}>1. Treatment progression over time</h3>
            <p className={rowBodyClass}>
              Metformin continues through the timeline; insulin glargine appears when oral
              therapy alone was no longer enough—aligned to the same dates as labs and encounters.
            </p>
          </>
        }
      >
        <VisualCard>
          <MedicationSolutionFigure
            rows={medicationFigureRows}
            axisDates={MEDICATION_FIGURE_AXIS_DATES}
          />
        </VisualCard>
      </FrxProcessRowShell>

      <FrxProcessRowShell
        left={
          <>
            <h3 className={rowHeadingClass}>2. Dose changes in context</h3>
            <p className={rowBodyClass}>
              Dose labels on the bar show metformin titration from 500 mg BID to 1000 mg BID after
              the acute event—read beside glucose and visit type on the same columns.
            </p>
          </>
        }
      >
        <VisualCard>
          <MedicationSolutionFigure
            rows={medicationFigureRows}
            axisDates={MEDICATION_FIGURE_AXIS_DATES}
          />
        </VisualCard>
      </FrxProcessRowShell>

      <FrxProcessRowShell
        left={
          <>
            <h3 className={rowHeadingClass}>3. Why insulin started</h3>
            <p className={rowBodyClass}>
              Sep 09 documents initiation during the ED visit—dose, reason, and status without
              leaving the longitudinal view.
            </p>
          </>
        }
      >
        <VisualCard>
          <MedicationSolutionFigure
            rows={medicationFigureRows}
            axisDates={MEDICATION_FIGURE_AXIS_DATES}
            tooltipDemo={{
              medId: "insulin-glargine",
              col: INSULIN_INIT_COL,
              placement: "above",
              detail: "insulin-initiation",
            }}
          />
        </VisualCard>
      </FrxProcessRowShell>
    </div>
  );
}
