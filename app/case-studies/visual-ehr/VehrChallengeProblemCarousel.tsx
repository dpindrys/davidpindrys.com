import ZoomableProblemImage from "../../components/ZoomableProblemImage";
import { frxSectionBodyClass } from "../frx/frxCaseStudyTypography";
import type { VehrChallengeCluster } from "./vehrChallengeData";

const vehrClusterTitleClass = `${frxSectionBodyClass} font-bold`;

const vehrQuoteAttributionClass =
  "font-sans text-[13px] font-normal uppercase tracking-[0.12em] text-black/70";

function VehrQuoteMarkIcon() {
  return (
    <svg
      width="32"
      height="26"
      viewBox="0 0 40 32"
      fill="none"
      aria-hidden
      className="shrink-0 text-black/70"
    >
      <path
        d="M8 32V18.4C8 11.2 11.2 5.6 18.4 2.4L20.8 6.4C16 8.8 13.6 12 13.6 16H20V32H8ZM28 32V18.4C28 11.2 31.2 5.6 38.4 2.4L40.8 6.4C36 8.8 33.6 12 33.6 16H40V32H28Z"
        fill="currentColor"
        opacity="0.85"
      />
    </svg>
  );
}

export function VehrChallengeClusterQuote({
  cluster,
}: {
  cluster: VehrChallengeCluster;
}) {
  return (
    <figure className="flex min-w-0 flex-col gap-3">
      <VehrQuoteMarkIcon />
      <blockquote className={frxSectionBodyClass}>
        &ldquo;{cluster.quote}&rdquo;
      </blockquote>
      <figcaption className={vehrQuoteAttributionClass}>
        {cluster.attribution}
      </figcaption>
    </figure>
  );
}

export default function VehrChallengeProblemCarousel({
  clusters,
}: {
  clusters: readonly VehrChallengeCluster[];
}) {
  return (
    <div className="flex w-full flex-col gap-12 md:gap-16">
      {clusters.map((cluster) => (
        <div key={cluster.id} className="flex w-full flex-col gap-5 md:gap-6">
          <div className="flex min-w-0 flex-col gap-3 text-left md:gap-4">
            <h3
              id={`vehr-cluster-${cluster.id}-heading`}
              className={vehrClusterTitleClass}
            >
              {cluster.title}
            </h3>
            <p className={frxSectionBodyClass}>{cluster.description}</p>
          </div>
          <div className="grid w-full grid-cols-1 items-center gap-6 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] md:gap-8 lg:gap-10">
            <VehrChallengeClusterQuote cluster={cluster} />
            <ZoomableProblemImage
              src={cluster.imageSrc}
              alt={cluster.imageAlt}
              shellClassName="w-full min-w-0"
              imgClassName="block h-auto w-full rounded-md border-0"
              focusRingOffsetClass="focus-visible:ring-offset-[#E8E6E1]"
              elevateOnHover={false}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
