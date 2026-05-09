"use client";

import Image from "next/image";
import CaseStudyHighlights from "../../components/CaseStudyHighlights";
import {
  vehrBelowHeroCaseStudyHighlights,
  vehrBelowHeroMeta,
  vehrBelowHeroSummaryBlock,
  vehrBelowHeroTestimonial,
} from "./vehrBelowHeroData";

export default function VehrBelowHero() {
  const summaryBlock = vehrBelowHeroSummaryBlock;
  const testimonial = vehrBelowHeroTestimonial;
  const hasCaseStudyHighlights =
    vehrBelowHeroCaseStudyHighlights.frames.length > 0;

  return (
    <section
      className="mt-8 md:mt-10 lg:mt-12 w-full flex flex-col gap-16"
      aria-label="Project context"
    >
      <div className="flex flex-col gap-0 md:flex-row md:gap-0">
        {vehrBelowHeroMeta.map((item, i) => (
          <div
            key={`${item.label}-${i}`}
            className="flex flex-col gap-1.5 py-6 border-b border-black/10 last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0 md:py-0 md:flex-1 md:pr-8 md:last:pr-0 md:pl-8 md:first:pl-0"
          >
            <span className="font-sans font-normal text-[12px] uppercase tracking-[0.12em] text-gray-800">
              {item.label}
            </span>
            <span className="font-sans font-semibold text-[16px] leading-[1.5] text-black">
              {item.value}
            </span>
          </div>
        ))}
      </div>

      <div className="flex w-full flex-col gap-6 sm:gap-7">
        <div className="grid w-full grid-cols-1 gap-10 md:grid-cols-2 md:items-start md:gap-10">
          <div
            className={
              hasCaseStudyHighlights
                ? "flex min-h-0 w-full flex-col gap-6 text-left md:h-full md:min-h-0 md:gap-0"
                : "flex min-h-0 w-full flex-col text-left"
            }
          >
            <div className="flex flex-col gap-6 shrink-0">
              <div className="flex flex-col gap-1.5">
                <span className="font-sans font-normal text-[12px] uppercase tracking-[0.12em] text-gray-800">
                  {summaryBlock.label}
                </span>
                <p className="font-sans font-normal text-[16px] leading-[1.5] text-black">
                  {summaryBlock.body}
                </p>
              </div>
              {summaryBlock.team ? (
                <div className="flex flex-col gap-1.5">
                  <span className="font-sans font-normal text-[12px] uppercase tracking-[0.12em] text-gray-800">
                    TEAM
                  </span>
                  <p className="font-sans font-normal text-[16px] leading-[1.5] text-black">
                    {summaryBlock.team}
                  </p>
                </div>
              ) : null}
            </div>
          </div>

          <div className="flex min-h-0 min-w-0 w-full flex-col gap-6 rounded-2xl border border-black/10 bg-white/50 p-8">
            <blockquote className="font-sans font-normal text-[16px] leading-[1.5] text-black">
              {testimonial.quote}
            </blockquote>
            <div className="flex items-center gap-4">
              {testimonial.avatarSrc ? (
                <div className="relative w-[52px] h-[52px] rounded-full overflow-hidden shrink-0">
                  <Image
                    src={testimonial.avatarSrc}
                    alt={testimonial.name}
                    fill
                    className="object-cover rounded-full"
                  />
                </div>
              ) : (
                <div className="w-[52px] h-[52px] rounded-full bg-[#D4D4D4] shrink-0" />
              )}
              <div className="flex flex-col gap-0.5">
                <span className="font-sans font-semibold text-[16px] leading-[1.5] text-black">
                  {testimonial.name}
                </span>
                {testimonial.title ? (
                  <span className="font-sans font-normal text-[16px] leading-[1.5] text-black/50">
                    {testimonial.title}
                  </span>
                ) : null}
              </div>
            </div>
          </div>
        </div>

        {hasCaseStudyHighlights ? (
          <CaseStudyHighlights data={vehrBelowHeroCaseStudyHighlights} />
        ) : null}
      </div>
    </section>
  );
}
