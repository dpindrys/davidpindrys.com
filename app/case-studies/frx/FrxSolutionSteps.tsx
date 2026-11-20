import ZoomableProblemImage from "../../components/ZoomableProblemImage";
import {
  frxCenteredIntroBlockClass,
  frxMetaEyebrowClass,
  frxSectionBodyClass,
  frxSectionGapClass,
  frxSectionIntroStackClass,
  frxStrategyHeadlineClass,
} from "./frxCaseStudyTypography";
import { mediaCardClass } from "./FrxExtendedSections";

export default function FrxSolutionSteps() {
  return (
    <section
      className={frxSectionGapClass}
      aria-labelledby="frx-solution-intro-heading"
    >
      <p className={frxMetaEyebrowClass}>The Solution</p>
      <div className="mt-6 flex w-full flex-col gap-6 md:gap-8">
        <div className={frxCenteredIntroBlockClass}>
          <div className={frxSectionIntroStackClass}>
            <h2
              id="frx-solution-intro-heading"
              className={frxStrategyHeadlineClass}
            >
              A focused digital refill workflow
            </h2>
            <p className={frxSectionBodyClass}>
              The final workflow let staff move from refill need to submission in
              one place: scan the essentials, verify prescription details, and
              submit with the required patient, shipping, and confirmation context
              close at hand.
            </p>
            <p className={frxSectionBodyClass}>
              I partnered closely with front-end engineers through build,
              reviewing each implementation against the prototype to keep
              interaction details, edge case handling, and information density
              intact from design through release.
            </p>
          </div>
        </div>

        <div className="w-full min-w-0">
          <ZoomableProblemImage
            src="/images/frx/frx.png"
            alt="In-clinic digital refill workflow in CareTeamHub"
            shellClassName={`${mediaCardClass} w-full`}
            imgClassName="block h-auto w-full rounded-md border-0"
            dialogLabel="Refill workflow"
          />
        </div>
      </div>
    </section>
  );
}
