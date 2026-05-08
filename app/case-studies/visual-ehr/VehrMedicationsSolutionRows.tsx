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

/** Sep 10 — 10 mg after 20 mg therapeutic (reduction below target). */
const LISINOPRIL_REDUCTION_COL = 2;

/** Same as FRX `mediaCardClass` but `overflow-visible` so timeline tooltips aren’t clipped. */
const medicationChartCardClass =
  "overflow-visible rounded-2xl border border-black/10 bg-white p-4 shadow-[0_12px_40px_-18px_rgba(0,0,0,0.1),0_4px_12px_-4px_rgba(0,0,0,0.06)] md:p-5";

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
    /** Custom tooltip body for the medication demo (e.g. subtherapeutic reduction). */
    detail?: "subtherapeutic-reduction";
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
          <div className="grid grid-cols-1 gap-3 md:grid-cols-[1fr_112px] md:gap-2.5">
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
                  const showSigTooltip =
                    tipThisRow &&
                    tooltipDemo &&
                    tipCell?.kind === "dose" &&
                    tooltipDemo.detail === "subtherapeutic-reduction";
                  const showKvTooltip =
                    tipThisRow &&
                    tooltipDemo &&
                    tipCell?.kind === "dose" &&
                    tooltipDemo.detail !== "subtherapeutic-reduction";
                  return (
                    <div
                      key={mrow.id}
                      className={`relative isolate flex min-h-[52px] items-center px-0.5 md:min-h-[60px] ${
                        tipThisRow
                          ? "rounded-[4px] shadow-[inset_0_0_0_2px_rgba(255,255,255,0.88),0_4px_14px_-4px_rgba(0,0,0,0.22)]"
                          : ""
                      }`}
                    >
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

            <div className="hidden md:flex flex-col">
              <div className="grid gap-1.5">
                {rows.map((mrow) => (
                  <div
                    key={mrow.id}
                    className="flex min-h-[52px] w-full items-center justify-start font-sans text-[11px] font-semibold leading-tight text-black/65 md:min-h-[60px] md:text-[12px]"
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
            <h3 className={rowHeadingClass}>1. Medication events over time</h3>
            <p className={rowBodyClass}>
              Medication bars show when a treatment was active, held, or changed across the
              patient timeline.
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
            <h3 className={rowHeadingClass}>2. Dose context in line</h3>
            <p className={rowBodyClass}>
              Dose state appears directly on the timeline, so under-range, therapeutic, or flagged
              high-dose states can be reviewed against nearby clinical events.
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
            <h3 className={rowHeadingClass}>3. Details without leaving context</h3>
            <p className={rowBodyClass}>
              Tooltips reveal dose, date, and medication context while preserving the surrounding
              timeline.
            </p>
          </>
        }
      >
        <VisualCard>
          <MedicationSolutionFigure
            rows={medicationFigureRows}
            axisDates={MEDICATION_FIGURE_AXIS_DATES}
            tooltipDemo={{
              medId: "lisinopril",
              col: LISINOPRIL_REDUCTION_COL,
              placement: "above",
              detail: "subtherapeutic-reduction",
            }}
          />
        </VisualCard>
      </FrxProcessRowShell>
    </div>
  );
}
