import ZoomableProblemImage from "../../components/ZoomableProblemImage";
import { vehrStrategySection } from "./vehrStrategyData";
import {
  frxStrategyHeadlineClass,
  mediaCardClass,
} from "../frx/FrxExtendedSections";
import {
  frxPaddedEyebrowClass,
  frxSectionBodyClass,
  frxSectionIntroStackClass,
  frxSplitRowGridClass,
} from "../frx/frxCaseStudyTypography";

const strategyImageShellClass = "flex min-h-0 min-w-0 w-full [&_button]:w-full";

const strategyImageClass = "block w-full rounded-md border-0 object-contain";

export default function VehrStrategySection() {
  const { eyebrow, title, bodyLead, bodyFollow, image } = vehrStrategySection;

  return (
    <section
      className="relative mt-16 w-full pt-12 md:mt-24 md:pt-16 lg:mt-28 lg:pt-20"
      aria-labelledby="vehr-strategy-heading"
    >
      <p className={frxPaddedEyebrowClass}>{eyebrow}</p>
      <div className={`${frxSplitRowGridClass} pb-12 md:pb-16 lg:pb-20`}>
        <div className={`${frxSectionIntroStackClass} self-start`}>
          <h2 id="vehr-strategy-heading" className={frxStrategyHeadlineClass}>
            {title}
          </h2>
          <p className={frxSectionBodyClass}>{bodyLead}</p>
          <p className={frxSectionBodyClass}>{bodyFollow}</p>
        </div>

        <div className={`${mediaCardClass} min-w-0 w-full self-start`}>
          <ZoomableProblemImage
            src={image.src}
            alt={image.alt}
            shellClassName={strategyImageShellClass}
            imgClassName={strategyImageClass}
            elevateOnHover={false}
          />
        </div>
      </div>
    </section>
  );
}
