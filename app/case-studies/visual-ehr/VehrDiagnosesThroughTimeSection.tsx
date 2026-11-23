import VehrRebuildingStorySteps from "./VehrRebuildingStorySteps";
import {
  frxSectionBodyClass,
  frxSectionIntroStackClass,
  frxSectionTitleClass,
} from "../frx/frxCaseStudyTypography";

export default function VehrDiagnosesThroughTimeSection() {
  return (
    <article aria-labelledby="vehr-diagnoses-through-time-heading">
      <div className={frxSectionIntroStackClass}>
        <h3
          id="vehr-diagnoses-through-time-heading"
          className={`scroll-mt-28 ${frxSectionTitleClass}`}
        >
          Diagnoses in Context
        </h3>
        <p className={frxSectionBodyClass}>
          Encounters and diagnoses share the same visit columns. For this
          patient, poorly controlled Type 2 diabetes escalates into acute
          hyperglycemia at the ED on Sep 09, then moves toward managed and
          improving states at PCP and telehealth follow-up—without leaving the
          timeline.
        </p>
      </div>
      <div className="mt-10 w-full md:mt-12 lg:mt-14">
        <VehrRebuildingStorySteps />
      </div>
    </article>
  );
}
