import {
  ovcpChallengeImpact,
  ovcpChallengeIntro,
  ovcpClinicQuotes,
} from "./ovcpChallengeData";
import {
  frxMetaEyebrowClass,
  frxPaddedEyebrowClass,
  frxSectionBodyClass,
  frxSectionTitleClass,
  frxSplitRowGridClass,
} from "../frx/frxCaseStudyTypography";

const ovcpChallengeAccent = "#5B8FA8";
const ovcpChallengeAccentMuted = "#E4EEF2";

const ovcpChallengeTitleClass =
  "font-sans text-[clamp(22px,2.8vw,32px)] font-semibold leading-[1.25] tracking-[-0.01em] text-black";

const ovcpClinicQuoteClass =
  "font-sans text-[16px] font-normal leading-[1.5] text-black md:text-[17px]";

const ovcpClinicAttributionClass =
  "font-sans text-[12px] font-normal uppercase tracking-[0.12em] text-gray-800";

function OvcpQuoteMarkIcon() {
  return (
    <svg
      width="40"
      height="32"
      viewBox="0 0 40 32"
      fill="none"
      aria-hidden
      className="shrink-0 text-gray-800"
    >
      <path
        d="M8 32V18.4C8 11.2 11.2 5.6 18.4 2.4L20.8 6.4C16 8.8 13.6 12 13.6 16H20V32H8ZM28 32V18.4C28 11.2 31.2 5.6 38.4 2.4L40.8 6.4C36 8.8 33.6 12 33.6 16H40V32H28Z"
        fill="currentColor"
        opacity="0.85"
      />
    </svg>
  );
}

function OvcpImpactIcon() {
  return (
    <div
      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full md:h-14 md:w-14"
      style={{ backgroundColor: ovcpChallengeAccentMuted }}
      aria-hidden
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle
          cx="12"
          cy="12"
          r="9"
          stroke={ovcpChallengeAccent}
          strokeWidth="1.5"
        />
        <path
          d="M12 8v5"
          stroke={ovcpChallengeAccent}
          strokeWidth="1.75"
          strokeLinecap="round"
        />
        <circle cx="12" cy="16" r="1" fill={ovcpChallengeAccent} />
      </svg>
    </div>
  );
}

export default function OvcpChallengeCard() {
  return (
    <section
      className="relative mt-24 w-[calc(100%+4rem)] max-w-none -mx-8 rounded-2xl bg-[#E8E6E1] py-12 md:mt-32 md:py-16 lg:mt-40 lg:py-20 lg:w-[calc(100%+8rem)] lg:-mx-16"
      aria-labelledby="ovcp-problem-heading"
    >
      <p className={`left-8 lg:left-16 ${frxPaddedEyebrowClass}`}>Challenge</p>

      <div className="px-8 lg:px-16">
        <div className={frxSplitRowGridClass}>
          <div className="flex min-w-0 flex-col gap-4 text-left">
            <h2 id="ovcp-problem-heading" className={ovcpChallengeTitleClass}>
              {ovcpChallengeIntro.title}
            </h2>
            <p className={frxSectionBodyClass}>{ovcpChallengeIntro.body}</p>
          </div>

          <div className="min-w-0 w-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={ovcpChallengeIntro.imageSrc}
              alt={ovcpChallengeIntro.imageAlt}
              className="h-auto w-full rounded-2xl border border-black/10 bg-white/40 object-cover"
            />
          </div>
        </div>

        <div className="mt-12 md:mt-16 lg:mt-20">
          <p className={frxMetaEyebrowClass}>From the clinic</p>

          <div className="mt-6 grid grid-cols-1 md:mt-8 md:grid-cols-3">
            {ovcpClinicQuotes.map((item, index) => (
              <figure
                key={item.attribution + index}
                className={`flex min-w-0 flex-col gap-5 py-8 md:gap-6 md:py-0 md:pr-8 lg:pr-10 ${
                  index > 0
                    ? "border-t border-black/10 pt-8 md:border-t-0 md:border-l md:pl-8 md:pt-0 lg:pl-10"
                    : ""
                } ${index < ovcpClinicQuotes.length - 1 ? "md:pr-8 lg:pr-10" : ""}`}
              >
                <OvcpQuoteMarkIcon />
                <blockquote className={ovcpClinicQuoteClass}>
                  &ldquo;{item.quote}&rdquo;
                </blockquote>
                <figcaption className={ovcpClinicAttributionClass}>
                  {item.attribution}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>

        <div
          className="mt-10 flex gap-4 border-t border-black/10 pt-8 md:mt-12 md:gap-5 md:pt-10 lg:mt-14"
          role="region"
          aria-label={ovcpChallengeImpact.title}
        >
          <OvcpImpactIcon />
          <div className="flex min-w-0 flex-col gap-1.5">
            <h3 className={frxSectionTitleClass}>{ovcpChallengeImpact.title}</h3>
            <p className={frxSectionBodyClass}>{ovcpChallengeImpact.body}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
