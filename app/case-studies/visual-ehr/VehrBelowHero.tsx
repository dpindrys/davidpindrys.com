import { vehrBelowHeroMeta } from "./vehrBelowHeroData";
import {
  frxMetaLabelClass,
  frxMetaValueClass,
} from "../frx/frxCaseStudyTypography";

export default function VehrBelowHero() {
  return (
    <section
      className="mt-12 flex w-full flex-col"
      aria-label="Project context"
    >
      <div className="flex flex-col gap-0 md:flex-row md:gap-0">
        {vehrBelowHeroMeta.map((item, i) => (
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