import {
  vehrChallengeClusters,
  vehrChallengeIntro,
} from "./vehrChallengeData";
import { VehrChallengeClusterQuote } from "./VehrChallengeProblemCarousel";
import { vehrNavScrollMtClass } from "./vehrCaseStudyNav";
import {
  frxMetaEyebrowClass,
  frxSectionBodyClass,
  frxSectionGapClass,
  frxStrategyHeadlineClass,
} from "../frx/frxCaseStudyTypography";

const vehrClosingClusterId = "mental-model-mismatch";
const vehrImpactClusterId = "fragmented-context";
/** Slightly darker than the card beige (#E8E6E1). */
const vehrImpactGray = "#DBD8D1";

export default function VehrChallengeCard() {
  const closingCluster = vehrChallengeClusters.find(
    (cluster) => cluster.id === vehrClosingClusterId,
  );
  const impactCluster = vehrChallengeClusters.find(
    (cluster) => cluster.id === vehrImpactClusterId,
  );

  return (
    <section
      className={`relative ${frxSectionGapClass}`}
      aria-labelledby="vehr-challenge-heading"
    >
      <div
        id="vehr-nav-challenge"
        data-vehr-case-study-section=""
        className={vehrNavScrollMtClass}
      >
        <div className="relative w-full overflow-hidden rounded-2xl bg-[#E8E6E1]">
          <header className="relative z-20 px-8 pt-6 md:pt-8 lg:px-16">
            <p className={frxMetaEyebrowClass}>Challenge</p>
            {closingCluster ? (
              <>
                <h2
                  id="vehr-challenge-heading"
                  className={`${frxStrategyHeadlineClass} mt-3 w-full`}
                >
                  {closingCluster.title}
                </h2>
                <p className={`${frxSectionBodyClass} mt-5 w-full md:mt-6`}>
                  {closingCluster.description}
                </p>
              </>
            ) : null}
          </header>

          <div
            className="mt-8 md:mt-10"
            style={{ backgroundColor: vehrImpactGray }}
          >
            {impactCluster ? (
              <div className="px-8 pt-8 md:pt-10 lg:px-16 lg:pt-12">
                <p className={frxMetaEyebrowClass}>Impact</p>
                <h3
                  id={`vehr-cluster-${impactCluster.id}-heading`}
                  className={`${frxStrategyHeadlineClass} mt-3 w-full`}
                >
                  {impactCluster.title}
                </h3>
                <p className={`${frxSectionBodyClass} mt-5 w-full md:mt-6`}>
                  {impactCluster.description}
                </p>
              </div>
            ) : null}

            <div className="relative mt-6 md:mt-8 md:min-h-[22rem]">
              {closingCluster ? (
                <div className="relative z-20 px-8 pb-6 md:pb-16 lg:px-16 lg:pb-20">
                  <div className="w-full max-w-xl md:max-w-[19rem]">
                    <VehrChallengeClusterQuote cluster={closingCluster} />
                  </div>
                </div>
              ) : null}
              <div className="relative z-10 mt-2 md:absolute md:inset-0 md:mt-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={vehrChallengeIntro.imageSrc}
                  alt={vehrChallengeIntro.imageAlt}
                  className="block h-auto w-full max-w-none select-none object-contain object-bottom-right md:h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
