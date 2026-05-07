import Image from "next/image";
import {
  frxBelowHeroMeta,
  frxBelowHeroSummaryBlock,
  frxBelowHeroTestimonial,
} from "./frxBelowHeroData";

export default function FrxBelowHero() {
  const summaryBlock = frxBelowHeroSummaryBlock;
  const testimonial = frxBelowHeroTestimonial;

  return (
    <section
      className="mt-8 md:mt-10 lg:mt-12 flex w-full flex-col gap-16"
      aria-label="Project context"
    >
      <div className="flex flex-col gap-0 md:flex-row md:gap-0">
        {frxBelowHeroMeta.map((item, i) => (
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

      <div className="flex w-full flex-col gap-6 sm:gap-7">
        <div className="grid w-full grid-cols-1 gap-10 md:grid-cols-2 md:items-start md:gap-10">
          <div className="flex min-h-0 w-full flex-col gap-6 text-left md:h-full md:min-h-0 md:gap-0">
            <div className="flex shrink-0 flex-col gap-6">
              <div className="flex flex-col gap-1.5">
                <span className="font-sans text-[12px] font-normal uppercase tracking-[0.12em] text-gray-800">
                  {summaryBlock.label}
                </span>
                <p className="font-sans text-[16px] font-normal leading-[1.5] text-black">
                  {summaryBlock.body}
                </p>
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="font-sans text-[12px] font-normal uppercase tracking-[0.12em] text-gray-800">
                  TEAM
                </span>
                <p className="font-sans text-[16px] font-normal leading-[1.5] text-black">
                  {summaryBlock.team}
                </p>
              </div>
            </div>
          </div>

          <div className="flex min-h-0 min-w-0 w-full flex-col gap-6 rounded-2xl border border-black/10 bg-white/50 p-8">
            <blockquote className="font-sans text-[16px] font-normal leading-[1.5] text-black">
              {testimonial.quote}
            </blockquote>
            <div className="flex items-center gap-4">
              <div className="relative h-[52px] w-[52px] shrink-0 overflow-hidden rounded-full">
                <Image
                  src={testimonial.avatarSrc}
                  alt={testimonial.name}
                  fill
                  className="rounded-full object-cover"
                />
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="font-sans text-[16px] font-semibold leading-[1.5] text-black">
                  {testimonial.name}
                </span>
                <span className="font-sans text-[16px] font-normal leading-[1.5] text-black/50">
                  {testimonial.title}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
