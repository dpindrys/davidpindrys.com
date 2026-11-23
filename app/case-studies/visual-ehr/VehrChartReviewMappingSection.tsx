import type { ReactNode } from "react";
import { vehrSectionGapClass } from "./vehrCaseStudySectionTokens";

type HighlightRow = {
  label: string;
  body: ReactNode;
};

const showcaseCardShellClass =
  "rounded-2xl border border-black/10 bg-white shadow-[0_10px_30px_-22px_rgba(0,0,0,0.25)]";

/** Matches `HomeShowcaseCard` title + descriptor typography */
const showcaseTitleClass =
  "w-full font-sans text-[clamp(22px,2.2vw,28px)] font-semibold leading-[1.15] tracking-tight text-black";

const showcaseDescriptorClass =
  "w-full font-sans text-[15px] font-normal leading-[1.55] text-black/65 md:text-[16px]";

const highlightRows: HighlightRow[] = [
  {
    label: "Challenge",
    body: (
      <>
        Most EHRs <strong className="font-semibold text-black">reflect how data is stored</strong>, not
        how clinicians reason—making it hard to see what is changing and what needs attention
        across a patient&apos;s history.
      </>
    ),
  },
  {
    label: "Strategy",
    body: (
      <>
        I partnered with a practicing PCP to map the objects and relationships used in chart
        review, then designed a <strong className="font-semibold text-black">longitudinal timeline</strong> aligned
        to clinical sensemaking rather than database structure.
      </>
    ),
  },
  {
    label: "Results",
    body: (
      <>
        Delivered scalable components now <strong className="font-semibold text-black">in development</strong> with
        the founding team—helping clinicians interpret dense records over time with less chart
        digging.
      </>
    ),
  },
];

function HighlightRowItem({ label, body }: HighlightRow) {
  return (
    <div className="flex w-full flex-col gap-3.5 text-left">
      <h3 className={showcaseTitleClass}>{label}</h3>
      <p className={showcaseDescriptorClass}>{body}</p>
    </div>
  );
}

export default function VehrChartReviewMappingSection() {
  return (
    <section
      className={vehrSectionGapClass}
      aria-label="Challenge, strategy, and results"
    >
      <div className={`${showcaseCardShellClass} p-10 md:p-12 lg:p-14`}>
        <div className="mx-auto flex w-full max-w-[42rem] flex-col gap-10 md:gap-12">
          {highlightRows.map((row) => (
            <HighlightRowItem key={row.label} label={row.label} body={row.body} />
          ))}
        </div>
      </div>
    </section>
  );
}
