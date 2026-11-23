import ZoomableProblemImage from "../../components/ZoomableProblemImage";
import { vehrGroundworkSection } from "./vehrGroundworkData";
import {
  frxStrategyHeadlineClass,
  mediaCardClass,
} from "../frx/FrxExtendedSections";
import {
  frxCenteredIntroBlockClass,
  frxPaddedEyebrowClass,
  frxSectionBodyClass,
  frxSectionIntroStackClass,
} from "../frx/frxCaseStudyTypography";

const imageShellClass = "flex min-h-0 min-w-0 w-full [&_button]:w-full";

const imageClass = "block w-full rounded-md border-0 object-contain";

export default function VehrGroundworkSection() {
  const { eyebrow, title, body, image } = vehrGroundworkSection;

  return (
    <section
      className="relative mt-16 w-full pt-12 md:mt-24 md:pt-16 lg:mt-28 lg:pt-20"
      aria-labelledby="vehr-groundwork-heading"
    >
      <p className={frxPaddedEyebrowClass}>{eyebrow}</p>
      <div className="flex w-full flex-col gap-10 pb-12 md:gap-12 md:pb-16 lg:gap-14 lg:pb-20">
        <div className={frxCenteredIntroBlockClass}>
          <div className={frxSectionIntroStackClass}>
            <h2 id="vehr-groundwork-heading" className={frxStrategyHeadlineClass}>
              {title}
            </h2>
            <p className={frxSectionBodyClass}>{body}</p>
          </div>
        </div>

        <div className={`${mediaCardClass} w-full min-w-0`}>
          <ZoomableProblemImage
            src={image.src}
            alt={image.alt}
            shellClassName={imageShellClass}
            imgClassName={imageClass}
            elevateOnHover={false}
          />
        </div>
      </div>
    </section>
  );
}
