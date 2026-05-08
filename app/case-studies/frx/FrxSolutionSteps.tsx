import ZoomableProblemVideo from "../../components/ZoomableProblemVideo";
import {
  FrxProcessRowShell,
  mediaCardClass,
  rowBodyClass,
  rowHeadingClass,
} from "./FrxExtendedSections";

const eyebrowClass =
  "font-sans text-[12px] font-normal uppercase tracking-[0.12em] text-gray-800";
const sectionTitleClass =
  "w-full font-sans text-[clamp(26px,4vw,38px)] font-semibold leading-[1.15] tracking-[-0.02em] text-black";
const introClass =
  "w-full font-sans text-[22px] md:text-[24px] font-normal leading-[1.45] text-black/80";

export default function FrxSolutionSteps() {
  return (
    <div>
      <p className={eyebrowClass}>The Solution</p>
      <h3 className={`${sectionTitleClass} mt-4`}>
        A Focused Digital Refill Workflow
      </h3>
      <p className={`${introClass} mt-6`}>
        The final workflow let staff move from refill need to submission in one
        place: scan the essentials, verify prescription details, and submit with
        the required patient, shipping, and confirmation context close at hand.
      </p>

      <div className="mt-10 w-full md:mt-14 lg:mt-16">
        <FrxProcessRowShell
          isFirst
          align="start"
          left={
            <>
              <h3
                className={rowHeadingClass}
                id="frx-solution-workflow-caption-title"
              >
                From List to Submission
              </h3>
              <p
                className={rowBodyClass}
                id="frx-solution-workflow-caption"
              >
                Staff could start with only the refill essentials, expand details
                when needed, and complete the request without leaving the workflow.
              </p>
            </>
          }
        >
          <ZoomableProblemVideo
            src="/images/frx/fresenius.mp4"
            cardClassName={mediaCardClass}
            ariaLabel="Digital refill workflow from list through verification to submission"
            labelledBy="frx-solution-workflow-caption-title"
            describedBy="frx-solution-workflow-caption"
            dialogLabel="Refill workflow video"
          />
        </FrxProcessRowShell>
      </div>
    </div>
  );
}
