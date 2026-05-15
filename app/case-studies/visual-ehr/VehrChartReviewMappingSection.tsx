import {
  vehrBodyClass,
  vehrEyebrowClass,
  vehrProblemCardClass,
  vehrSectionGapClass,
  vehrSectionTitleClass,
} from "./vehrCaseStudySectionTokens";

export default function VehrChartReviewMappingSection() {
  return (
    <section
      className={vehrSectionGapClass}
      aria-labelledby="vehr-mapping-chart-review-heading"
    >
      <div className={vehrProblemCardClass}>
        <p className={vehrEyebrowClass}>Mapping Chart Review</p>
        <h2
          id="vehr-mapping-chart-review-heading"
          className={`${vehrSectionTitleClass} mt-4 md:mt-5`}
        >
          Deconstructing the Chart Review Process
        </h2>
        <p className={`${vehrBodyClass} mt-5 md:mt-6`}>
          I worked with Cole to map the objects clinicians use during chart
          review — encounters, notes, diagnoses, labs, vitals, and medications —
          then used those relationships to shape the VEHR timeline.
        </p>
        <div className="mt-8 grid w-full grid-cols-1 gap-10 md:mt-10 md:grid-cols-2 md:items-start md:gap-12 lg:gap-14">
          <div className="flex min-w-0 w-full flex-col gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/vehr/chart2.png"
              alt="Chart review mapping: clinical objects and relationships"
              className="block h-auto w-full rounded-none border border-black/10 bg-white/40 shadow-[0_12px_40px_-18px_rgba(0,0,0,0.12),0_4px_12px_-4px_rgba(0,0,0,0.08)]"
            />
            <p className="font-sans text-[16px] leading-[1.55] text-black/65">
              <strong className="font-semibold text-black/65">
                Cole&apos;s paper chart system:
              </strong>{" "}
              A useful reference for how clinical information gets organized when
              the record structure follows the clinician&apos;s reasoning.
            </p>
          </div>
          <div className="flex min-w-0 w-full flex-col gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/vehr/map.png"
              alt="Domain map of problems, events, and relationships for chart review"
              className="block h-auto w-full rounded-none border border-black/10 bg-white/40 shadow-[0_12px_40px_-18px_rgba(0,0,0,0.12),0_4px_12px_-4px_rgba(0,0,0,0.08)]"
            />
            <p className="font-sans text-[16px] leading-[1.55] text-black/65">
              <strong className="font-semibold text-black/65">
                Object mapping:
              </strong>{" "}
              Translating that reasoning into encounters, diagnoses, labs,
              vitals, medications, and notes.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
