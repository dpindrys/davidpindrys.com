"use client";

import CaseStudyHighlights from "../../components/CaseStudyHighlights";
import {
  vehrBelowHeroCaseStudyHighlights,
  vehrBelowHeroMeta,
} from "./vehrBelowHeroData";

export default function VehrBelowHero() {
  const hasCaseStudyHighlights =
    vehrBelowHeroCaseStudyHighlights.frames.length > 0;

  return (
    <section
      className="mt-8 flex w-full flex-col gap-16 md:mt-10 lg:mt-12"
      aria-label="Project context"
    >
      <div className="flex flex-col gap-0 md:flex-row md:gap-0">
        {vehrBelowHeroMeta.map((item, i) => (
          <div
            key={`${item.label}-${i}`}
            className="flex flex-col gap-1.5 border-b border-black/10 py-6 last:border-b-0 md:flex-1 md:border-b-0 md:border-r md:py-0 md:pl-8 md:pr-8 md:first:pl-0 md:last:border-r-0 md:last:pr-0"
          >
            <span className="font-sans text-[12px] font-normal uppercase tracking-[0.12em] text-gray-800">
              {item.label}
            </span>
            <span className="font-sans text-[16px] font-semibold leading-[1.5] text-black">
              {item.value}
            </span>
          </div>
        ))}
      </div>

      {hasCaseStudyHighlights ? (
        <CaseStudyHighlights data={vehrBelowHeroCaseStudyHighlights} />
      ) : null}
    </section>
  );
}
