import {
  vehrBodyClass,
  vehrEyebrowClass,
  vehrSectionGapClass,
  vehrSectionTitleClass,
} from "./vehrCaseStudySectionTokens";

export default function VehrNarrativeSynthesis() {
  return (
    <section
      className={vehrSectionGapClass}
      aria-labelledby="vehr-narrative-synthesis-heading"
    >
      <p className={vehrEyebrowClass}>Synthesis</p>
      <h2
        id="vehr-narrative-synthesis-heading"
        className={`scroll-mt-28 ${vehrSectionTitleClass} mt-4 md:mt-5`}
      >
        Bringing the Patient Story Together
      </h2>
      <p className={`${vehrBodyClass} mt-5 md:mt-6`}>
        Clinical meaning emerges when symptoms, encounters, diagnoses, labs, and
        medications share the same temporal structure. On Jul 21, early fatigue and
        thirst accompany elevated glucose at urgent care. By Sep 09, symptoms peak,
        glucose reaches 342 mg/dL in the emergency department, and insulin is
        started. Sep 10 and Sep 14 show the same columns calming—PCP follow-up,
        then telehealth—as glucose, blood pressure, and reported burden trend
        toward stability.
      </p>
      <p className={`${vehrBodyClass} mt-5`}>
        The argument that opened this case study—fragmentation across time and
        sources—resolves here: the same events become understandable across domains.
        Clinicians can see not only what changed, but what surrounded the change:
        which visit addressed the diagnosis, which treatment escalated, and whether
        patient-reported burden moved in the same direction as the labs.
      </p>
    </section>
  );
}
