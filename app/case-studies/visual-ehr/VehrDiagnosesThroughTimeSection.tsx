import VehrRebuildingStorySteps from "./VehrRebuildingStorySteps";
import { vehrBodyClass, vehrSectionTitleClass } from "./vehrCaseStudySectionTokens";

export default function VehrDiagnosesThroughTimeSection() {
  return (
    <article aria-labelledby="vehr-diagnoses-through-time-heading">
      <h3
        id="vehr-diagnoses-through-time-heading"
        className={`scroll-mt-28 ${vehrSectionTitleClass}`}
      >
        Diagnoses in Context
      </h3>
      <p className={`${vehrBodyClass} mt-5 md:mt-6`}>
        Encounters and diagnoses share the same visit columns. For this patient,
        poorly controlled Type 2 diabetes escalates into acute hyperglycemia at
        the ED on Sep 09, then moves toward managed and improving states at PCP
        and telehealth follow-up—without leaving the timeline.
      </p>
      <VehrRebuildingStorySteps />
    </article>
  );
}
