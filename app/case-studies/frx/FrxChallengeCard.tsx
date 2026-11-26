import {
  frxChallengeImpact,
  frxChallengeIntro,
  frxClinicQuotes,
} from "./frxChallengeData";
import { frxNavScrollMtClass } from "./frxCaseStudyNav";
import {
  frxFilledBandClass,
  frxMetaEyebrowClass,
  frxSectionBodyClass,
  frxSectionGapClass,
  frxStrategyHeadlineClass,
} from "./frxCaseStudyTypography";

const frxClinicQuoteClass = frxSectionBodyClass;

const frxClinicAttributionClass =
  "font-sans text-[13px] font-normal uppercase tracking-[0.12em] text-black/70";

function FrxQuoteMarkIcon() {
  return (
    <svg
      width="40"
      height="32"
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

function FrxClinicQuote({
  quote,
  attribution,
}: {
  quote: string;
  attribution: string;
}) {
  return (
    <figure className="flex min-w-0 flex-col gap-5 md:gap-6">
      <FrxQuoteMarkIcon />
      <blockquote className={frxClinicQuoteClass}>&ldquo;{quote}&rdquo;</blockquote>
      <figcaption className={frxClinicAttributionClass}>{attribution}</figcaption>
    </figure>
  );
}

export default function FrxChallengeCard() {
  const [leadQuote, ...moreClinicQuotes] = frxClinicQuotes;

  return (
    <>
      <section
        className={`${frxSectionGapClass} ${frxFilledBandClass}`}
        aria-labelledby="frx-problem-heading"
      >
        <div
          id="frx-nav-challenge"
          data-frx-case-study-section=""
          className={frxNavScrollMtClass}
        >
          <p className={frxMetaEyebrowClass}>Challenge</p>

          <div className="mt-6 grid w-full grid-cols-1 items-stretch gap-6 md:grid-cols-[minmax(0,1fr)_20rem] md:gap-8">
            <div className="flex min-w-0 flex-col gap-4 text-left">
              <h2 id="frx-problem-heading" className={frxStrategyHeadlineClass}>
                {frxChallengeIntro.title}
              </h2>
              <p className={frxSectionBodyClass}>{frxChallengeIntro.body}</p>
              {leadQuote ? (
                <div className="mt-2">
                  <FrxClinicQuote
                    quote={leadQuote.quote}
                    attribution={leadQuote.attribution}
                  />
                </div>
              ) : null}
            </div>

            <div className="relative min-h-48 overflow-hidden rounded-[16px] border border-black/15 bg-white/40 md:h-full md:min-h-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={frxChallengeIntro.imageSrc}
                alt={frxChallengeIntro.imageAlt}
                className="h-auto w-full object-cover object-[44%_center] md:absolute md:inset-0 md:h-full"
              />
            </div>
          </div>
        </div>
      </section>

      <div className={frxSectionGapClass}>
        <p className={frxMetaEyebrowClass}>Impact</p>
        <p className={`${frxSectionBodyClass} mt-6`}>{frxChallengeImpact.body}</p>

        <div className="mt-10 grid grid-cols-1 md:mt-12 md:grid-cols-2">
          {moreClinicQuotes.map((item, index) => (
            <div
              key={item.attribution + index}
              className={`min-w-0 py-6 md:py-0 ${
                index > 0
                  ? "border-t border-black/10 pt-6 md:border-t-0 md:border-l md:pl-6 md:pt-0 lg:pl-8"
                  : "md:pr-6 lg:pr-8"
              }`}
            >
              <FrxClinicQuote quote={item.quote} attribution={item.attribution} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
