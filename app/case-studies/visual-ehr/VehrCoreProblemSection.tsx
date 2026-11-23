import {
  vehrBodyClass,
  vehrEyebrowClass,
  vehrSectionTitleClass,
} from "./vehrCaseStudySectionTokens";

export default function VehrCoreProblemBlock() {
  return (
    <div>
      <p className={vehrEyebrowClass}>The Core Problem</p>
      <h2
        id="vehr-master-problem-heading"
        className={`scroll-mt-28 ${vehrSectionTitleClass} mt-4 md:mt-5`}
      >
        Fragmented patient records disrupt clinical reasoning
      </h2>
      <p className={`${vehrBodyClass} mt-5 md:mt-6`}>
        Clinicians rarely review one data type at a time. They reconstruct what
        happened to a patient across encounters, labs, medications, diagnoses,
        and patient-reported information—often by moving between tabs, comparing
        dates, and mentally stitching context back together. The record is
        organized by source; clinical reasoning runs along time.
      </p>
    </div>
  );
}
