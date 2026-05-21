import ZoomableProblemVideo from "../../components/ZoomableProblemVideo";
import {
  frxCenteredIntroBlockClass,
  frxPaddedEyebrowClass,
  frxSectionBodyClass,
  frxSectionIntroStackClass,
} from "./frxCaseStudyTypography";
import { frxStrategyHeadlineClass, mediaCardClass } from "./FrxExtendedSections";

export default function FrxSolutionSteps() {
  return (
    <section
      className="relative mt-16 w-full pt-12 md:mt-24 md:pt-16 lg:mt-28 lg:pt-20"
      aria-labelledby="frx-solution-intro-heading"
    >
      <p className={frxPaddedEyebrowClass}>The Solution</p>
      <div className="flex w-full flex-col gap-10 pb-12 md:gap-12 md:pb-16 lg:gap-14 lg:pb-20">
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
          <ZoomableProblemVideo
            src="/images/frx/fresenius.mp4"
            cardClassName={`${mediaCardClass} w-full`}
            ariaLabel="Digital refill workflow from list through verification to submission"
            dialogLabel="Refill workflow video"
          />
        </div>
      </div>
    </section>
  );
}
