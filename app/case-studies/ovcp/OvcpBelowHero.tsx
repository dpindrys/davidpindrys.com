import { ovcpBelowHeroMeta, ovcpBelowHeroSummary } from "./ovcpBelowHeroData";

const eyebrowClass =
  "font-sans text-[12px] font-normal uppercase tracking-[0.12em] text-gray-800";

export default function OvcpBelowHero() {
  const summary = ovcpBelowHeroSummary;

  return (
    <section
      className="mt-8 flex w-full flex-col gap-10 md:mt-10 md:gap-14 lg:mt-12"
      aria-label="Project context"
    >
      <div className="flex flex-col gap-0 md:flex-row md:gap-0">
        {ovcpBelowHeroMeta.map((item, i) => (
          <div
            key={`${item.label}-${i}`}
            className="flex flex-col gap-1.5 border-b border-black/10 py-6 last:border-b-0 md:flex-1 md:border-b-0 md:border-r md:py-0 md:pl-8 md:pr-8 md:first:pl-0 md:last:border-r-0 md:last:pr-0"
          >
            <span className={eyebrowClass}>{item.label}</span>
            <span className="font-sans text-[16px] font-semibold leading-[1.5] text-black">
              {item.value}
            </span>
          </div>
        ))}
      </div>

      <div className="flex w-full flex-col gap-6">
        <div className="flex flex-col gap-1.5">
          <span className={eyebrowClass}>{summary.label}</span>
          <p className="font-sans text-[16px] font-normal leading-[1.5] text-black">
            {summary.body}
          </p>
        </div>
      </div>
    </section>
  );
}
