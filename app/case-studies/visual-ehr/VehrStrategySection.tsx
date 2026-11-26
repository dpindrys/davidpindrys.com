import ZoomableProblemImage from "../../components/ZoomableProblemImage";
import { vehrStrategySection } from "./vehrStrategyData";
import { vehrNavScrollMtClass } from "./vehrCaseStudyNav";
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

const strategyImageShellClass =
  "flex min-h-0 min-w-0 w-full [&_button]:block [&_button]:w-full";

export default function VehrStrategySection() {
  const { eyebrow, title, bodyLead, bodyFollow, images } = vehrStrategySection;
  const [noteImage, mapImage] = images;

  return (
    <section
      id="vehr-nav-strategy"
      data-vehr-case-study-section=""
      className={`relative mt-16 w-full pt-12 md:mt-24 md:pt-16 lg:mt-28 lg:pt-20 ${vehrNavScrollMtClass}`}
      aria-labelledby="vehr-strategy-heading"
    >
      <p className={frxPaddedEyebrowClass}>{eyebrow}</p>
      <div className={frxSplitRowGridClass}>
        <div className={`${frxSectionIntroStackClass} self-start`}>
          <h2 id="vehr-strategy-heading" className={frxStrategyHeadlineClass}>
            {title}
          </h2>
          <p className={frxSectionBodyClass}>{bodyLead}</p>
          <p className={frxSectionBodyClass}>{bodyFollow}</p>
        </div>

        <div className={`${mediaCardClass} min-w-0 w-full self-start`}>
          <ZoomableProblemImage
            src={noteImage.src}
            alt={noteImage.alt}
            shellClassName={strategyImageShellClass}
            imgClassName="block h-auto w-full rounded-md border-0"
            elevateOnHover={false}
          />
        </div>
      </div>

      <div className={`${mediaCardClass} mt-8 w-full md:mt-10`}>
        <ZoomableProblemImage
          src={mapImage.src}
          alt={mapImage.alt}
          shellClassName={strategyImageShellClass}
          imgClassName="block h-auto w-full rounded-md border-0"
          elevateOnHover={false}
        />
      </div>
    </section>
  );
}
