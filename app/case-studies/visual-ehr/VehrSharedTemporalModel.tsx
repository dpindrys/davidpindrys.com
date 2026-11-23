import VehrSharedTemporalModelDiagram from "./VehrSharedTemporalModelDiagram";
import {
  vehrBodyClass,
  vehrEyebrowClass,
  vehrSectionTitleClass,
} from "./vehrCaseStudySectionTokens";

export default function VehrSharedTemporalModel() {
  return (
    <>
      <p className={vehrEyebrowClass}>The Core Solution</p>
      <h2
        id="vehr-master-solution-heading"
        className={`scroll-mt-28 ${vehrSectionTitleClass} mt-4 md:mt-5`}
      >
        On Timeline. One Story.
      </h2>
      <p className={`${vehrBodyClass} mt-5 md:mt-6`}>
        VEHR aligns key clinical and patient-reported data on the same visit
        columns. This shared temporal model makes it easy to understand what
        changed, when it changed, and what else was happening around it.
      </p>

      <div className="mt-10 w-full md:mt-12 lg:mt-14">
        <VehrSharedTemporalModelDiagram />
      </div>
    </>
  );
}
