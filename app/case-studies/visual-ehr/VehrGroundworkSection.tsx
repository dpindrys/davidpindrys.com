import ZoomableProblemImage from "../../components/ZoomableProblemImage";
import { vehrGroundworkSection } from "./vehrGroundworkData";
import { vehrChallengeClusters } from "./vehrChallengeData";
import { VehrChallengeClusterQuote } from "./VehrChallengeProblemCarousel";
import { vehrNavScrollMtClass } from "./vehrCaseStudyNav";
import {
  frxStrategyHeadlineClass,
  mediaCardClass,
} from "../frx/FrxExtendedSections";
import {
  frxMetaEyebrowClass,
  frxPaddedEyebrowClass,
  frxSectionBodyClass,
  frxSectionIntroStackClass,
  frxSplitRowGridClass,
} from "../frx/frxCaseStudyTypography";

const imageShellClass = "flex min-h-0 min-w-0 w-full [&_button]:w-full";

const imageClass = "block w-full rounded-md border-0 object-contain";

const trendsCluster = vehrChallengeClusters.find(
  (cluster) => cluster.id === "trends-noise",
);

/** Slightly darker than the card beige (#E8E6E1), matching the first challenge card. */
const vehrCardGray = "#DBD8D1";

export default function VehrGroundworkSection() {
  const { eyebrow, title, body, image } = vehrGroundworkSection;

  return (
    <section
      id="vehr-nav-groundwork"
      data-vehr-case-study-section=""
      className={`relative mt-16 w-full pt-12 md:mt-24 md:pt-16 lg:mt-28 lg:pt-20 ${vehrNavScrollMtClass}`}
      aria-labelledby="vehr-groundwork-heading"
    >
      <p className={frxPaddedEyebrowClass}>{eyebrow}</p>
      <div className={frxSplitRowGridClass}>
        <div className={`${frxSectionIntroStackClass} self-start`}>
          <h2 id="vehr-groundwork-heading" className={frxStrategyHeadlineClass}>
            {title}
          </h2>
          <p className={frxSectionBodyClass}>{body}</p>
        </div>

        <div className={`${mediaCardClass} min-w-0 w-full self-start`}>
          <ZoomableProblemImage
            src={image.src}
            alt={image.alt}
            shellClassName={imageShellClass}
            imgClassName={imageClass}
            elevateOnHover={false}
          />
        </div>
      </div>

      <div className={`${mediaCardClass} mt-8 w-full md:mt-10`}>
        <ZoomableProblemImage
          src="/images/vehr/diagnoses-encounters.png"
          alt="Diagnoses and encounters aligned on shared timeline visit columns"
          shellClassName={imageShellClass}
          imgClassName={imageClass}
          elevateOnHover={false}
        />
      </div>

      <div className={`${frxSplitRowGridClass} mt-8 md:mt-10`}>
        <div className={`${frxSectionIntroStackClass} self-start`}>
          <h2 id="vehr-vitals-labs-heading" className={frxStrategyHeadlineClass}>
            Vitals and labs
          </h2>
          <p className={frxSectionBodyClass}>{body}</p>
        </div>

        <div className={`${mediaCardClass} min-w-0 w-full self-start`}>
          <ZoomableProblemImage
            src="/images/vehr/vitals-linegraph.png"
            alt="Heart rate, blood pressure, and oxygen saturation drawn as line graphs across visits"
            shellClassName={imageShellClass}
            imgClassName={imageClass}
            elevateOnHover={false}
          />
        </div>
      </div>

      {trendsCluster ? (
        <div className="mt-12 pb-12 md:mt-16 md:pb-16 lg:pb-20">
          <div
            id="vehr-nav-trends"
            data-vehr-case-study-section=""
            className={`w-full overflow-hidden rounded-2xl bg-[#E8E6E1] ${vehrNavScrollMtClass}`}
          >
          <header className="relative z-20 px-8 pb-8 pt-6 md:pb-10 md:pt-8 lg:px-16 lg:pb-12">
            <p className={frxMetaEyebrowClass}>Challenge</p>
            <h2
              id="vehr-cluster-trends-noise-heading"
              className={`${frxStrategyHeadlineClass} mt-3 w-full`}
            >
              {trendsCluster.title}
            </h2>
            <p className={`${frxSectionBodyClass} mt-5 w-full md:mt-6`}>
              {trendsCluster.description}
            </p>
          </header>

          <div style={{ backgroundColor: vehrCardGray }}>
            <div className="px-8 pt-8 md:pt-10 lg:px-16 lg:pt-12">
              <h2
                id="vehr-trends-follow-heading"
                className={`${frxStrategyHeadlineClass} w-full`}
              >
                {trendsCluster.title}
              </h2>
              <p className={`${frxSectionBodyClass} mt-5 w-full md:mt-6`}>
                {trendsCluster.description}
              </p>
            </div>
            <div className="mt-6 grid w-full grid-cols-1 items-center gap-6 px-8 pb-8 md:mt-8 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] md:gap-8 md:pb-10 lg:gap-10 lg:px-16 lg:pb-12">
              <VehrChallengeClusterQuote cluster={trendsCluster} />
              <ZoomableProblemImage
                src={trendsCluster.imageSrc}
                alt={trendsCluster.imageAlt}
                shellClassName="w-full min-w-0 rounded-md shadow-[0_10px_24px_-12px_rgba(0,0,0,0.28),0_2px_6px_-2px_rgba(0,0,0,0.12)]"
                imgClassName="block h-auto w-full rounded-md border-0"
                focusRingOffsetClass="focus-visible:ring-offset-[#DBD8D1]"
                elevateOnHover={false}
              />
            </div>
          </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
