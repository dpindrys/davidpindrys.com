import VehrMedicationsSolutionRows from "./VehrMedicationsSolutionRows";
import { vehrBodyClass, vehrSectionTitleClass } from "./vehrCaseStudySectionTokens";

export default function VehrMedicationEventsSection() {
  return (
    <article aria-labelledby="vehr-medication-events-heading">
      <h3
        id="vehr-medication-events-heading"
        className={`scroll-mt-28 ${vehrSectionTitleClass}`}
      >
        Understanding Treatment Changes
      </h3>
      <p className={`${vehrBodyClass} mt-5 md:mt-6`}>
        Inspired in part by{" "}
        <a
          href="http://toomanyclicks.com/about-1"
          className="text-black underline decoration-black/30 underline-offset-[0.2em] transition-colors hover:decoration-black/60"
          target="_blank"
          rel="noopener noreferrer"
        >
          Jeff Belden, MD
        </a>
        &rsquo;s medication-list usability work, VEHR treats medications as events
        on the shared timeline—not static list items. On Sep 09, metformin proves
        insufficient and insulin begins; by Sep 14, dosing and glycemic control
        align with the same columns used for labs and encounters.
      </p>
      <VehrMedicationsSolutionRows />
    </article>
  );
}
