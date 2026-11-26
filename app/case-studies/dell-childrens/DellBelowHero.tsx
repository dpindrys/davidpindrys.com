import {
  dellBelowHeroMeta,
  dellOverviewSection,
} from "./dellBelowHeroData";
import {
  frxMetaEyebrowClass,
  frxMetaLabelClass,
  frxMetaValueClass,
  frxSectionBodyClass,
} from "../frx/frxCaseStudyTypography";

export default function DellBelowHero() {
  return (
    <section
      className="mt-6 flex w-full flex-col gap-8 md:mt-8 md:gap-10"
      aria-labelledby="dell-overview-heading"
    >
      <div className="flex min-w-0 flex-col">
        <p id="dell-overview-heading" className={frxMetaEyebrowClass}>
          {dellOverviewSection.eyebrow}
        </p>
        <p className={`${frxSectionBodyClass} mt-4 md:mt-5`}>
          {dellOverviewSection.body}
        </p>
      </div>

      <div
        className="flex flex-col gap-0 md:flex-row md:gap-0"
        aria-label="Project context"
      >
        {dellBelowHeroMeta.map((item, i) => (
          <div
            key={`${item.label}-${i}`}
            className="flex flex-col gap-1.5 border-b border-black/10 py-5 last:border-b-0 md:flex-1 md:border-b-0 md:border-r md:py-0 md:pl-6 md:pr-6 md:first:pl-0 md:last:border-r-0 md:last:pr-0"
          >
            <span className={`${frxMetaLabelClass} uppercase tracking-[0.12em]`}>
              {item.label}
            </span>
            <span className={frxMetaValueClass}>{item.value}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
