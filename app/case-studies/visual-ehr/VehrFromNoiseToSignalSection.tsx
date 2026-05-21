import DesignLogicFromSignal from "./DesignLogicFromSignal";
import {
  frxSectionBodyClass,
  frxSectionIntroStackClass,
  frxSectionTitleClass,
} from "../frx/frxCaseStudyTypography";

export default function VehrFromNoiseToSignalSection() {
  return (
    <article aria-labelledby="vehr-noise-to-signal-heading">
      <div className={frxSectionIntroStackClass}>
        <h3
          id="vehr-noise-to-signal-heading"
          className={`scroll-mt-28 ${frxSectionTitleClass}`}
        >
          Physiologic Changes
        </h3>
        <p className={frxSectionBodyClass}>
          Glucose and blood pressure read as longitudinal patterns on the same
          dates as symptoms and medications: early elevation at urgent care, a
          marked spike at the ED on Sep 09, then gradual improvement through PCP
          and telehealth. Color carries severity; exact values and context stay
          one interaction away.
        </p>
      </div>
      <div className="mt-10 w-full md:mt-12 lg:mt-14">
        <DesignLogicFromSignal omitLeadIn omitSharedAxis />
      </div>
    </article>
  );
}
