import {
  vehrChallengeClusters,
  vehrChallengeIntro,
  vehrChallengeQuotes,
} from "./vehrChallengeData";
import VehrChallengeProblemCarousel from "./VehrChallengeProblemCarousel";
import { vehrNavScrollMtClass } from "./vehrCaseStudyNav";
import {
  frxMetaEyebrowClass,
  frxSectionBodyClass,
} from "../frx/frxCaseStudyTypography";

const vehrChallengeTitleClass =
  "font-sans text-[clamp(22px,2.8vw,32px)] font-semibold leading-[1.25] tracking-[-0.01em] text-black";

const vehrClinicQuoteClass = frxSectionBodyClass;

const vehrClinicAttributionClass =
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

export default function VehrChallengeCard() {
  return (
    <section
      className="relative mt-24 w-full md:mt-32 lg:mt-40"
      aria-labelledby="vehr-challenge-heading"
    >
      <div
        id="vehr-nav-challenge"
        data-vehr-case-study-section=""
        className={vehrNavScrollMtClass}
      >
        {/* Intro card; PNG includes orange desk + black line; clipped by rounded corners */}
        <div className="relative w-full overflow-hidden rounded-2xl bg-[#E8E6E1]">
          {/* Copy: top inset matches left (px-8 / lg:px-16); height from content, not min-h */}
          <header className="relative z-20 px-8 pt-8 pb-10 md:pb-16 lg:px-16 lg:pt-16 lg:pb-20">
            {/* Eyebrow + title: full card content width */}
            <p className={frxMetaEyebrowClass}>Challenge</p>
            <h2
              id="vehr-challenge-heading"
              className={`${vehrChallengeTitleClass} mt-3 w-full`}
            >
              {vehrChallengeIntro.title}
            </h2>

            {/* Body + quotes: narrow left column beside illustration */}
            <div className="mt-5 w-full max-w-xl md:mt-6 md:max-w-[min(34rem,44%)]">
              <p className={frxSectionBodyClass}>{vehrChallengeIntro.body}</p>

              <div className="mt-8 flex flex-col gap-6 md:mt-10 md:gap-7">
                {vehrChallengeQuotes.map((item) => (
                  <figure
                    key={item.attribution}
                    className="flex min-w-0 flex-col gap-3"
                  >
                    <VehrQuoteMarkIcon />
                    <blockquote className={vehrClinicQuoteClass}>
                      &ldquo;{item.quote}&rdquo;
                    </blockquote>
                    <figcaption className={vehrClinicAttributionClass}>
                      {item.attribution}
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </header>

          {/* Illustration: in-flow on mobile; absolute bottom-right fill on md+ */}
          <div className="relative z-10 mt-2 md:absolute md:inset-0 md:z-10 md:mt-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={vehrChallengeIntro.imageSrc}
              alt={vehrChallengeIntro.imageAlt}
              className="block h-auto w-full max-w-none select-none object-contain object-bottom-right md:h-full"
            />
          </div>
        </div>

        <VehrChallengeProblemCarousel clusters={vehrChallengeClusters} />
      </div>
    </section>
  );
}
