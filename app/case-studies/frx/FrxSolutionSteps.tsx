import { mediaCardClass } from "./FrxExtendedSections";

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

      <figure
        className={`${mediaCardClass} mt-10 flex w-full flex-col gap-3 md:mt-14 lg:mt-16`}
      >
        <video
          className="block h-auto w-full rounded-md border-0 bg-black/[0.02]"
          muted
          autoPlay
          loop
          playsInline
          preload="metadata"
          aria-describedby="frx-solution-workflow-caption"
          aria-label="Digital refill workflow from list through verification to submission"
        >
          <source src="/images/frx/fresenius.mp4" type="video/mp4" />
        </video>
        <figcaption
          id="frx-solution-workflow-caption"
          className="not-italic font-sans text-[16px] leading-[1.55] text-black/75"
        >
          <span className="font-semibold text-black">From list to submission:</span>{" "}
          Staff could start with only the refill essentials, expand details when
          needed, and complete the request without leaving the workflow.
        </figcaption>
      </figure>
    </div>
  );
}
