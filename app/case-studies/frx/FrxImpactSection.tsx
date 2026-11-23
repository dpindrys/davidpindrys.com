import {
  frxImpactEvidenceRows,
  frxImpactScale,
  frxImpactSectionIntro,
  frxImpactThemeColors,
  type FrxImpactEvidenceRow,
  type FrxImpactThemeKey,
} from "./frxImpactData";
import {
  bodyClass,
  cardBodyClass,
  cardTitleClass,
} from "../../lib/pageStyles";
import { frxNavScrollMtClass } from "./frxCaseStudyNav";
import {
  frxFilledBandClass,
  frxMetaEyebrowClass,
  frxSectionBodyClass,
  frxSectionGapClass,
  frxSectionIntroStackClass,
  frxStrategyHeadlineClass,
} from "./frxCaseStudyTypography";

const frxImpactPrimaryBlue = "#2F6B9E";
const frxImpactPrimaryBlueMuted = "#D4E6F3";

const frxImpactRowTitleClass = cardTitleClass;
const frxImpactRowBodyClass = cardBodyClass;
const frxImpactQuoteClass = bodyClass;
const frxImpactAttributionClass =
  "font-sans text-[13px] font-normal uppercase tracking-[0.12em] text-black/70";

const frxImpactRowGridClass =
  "grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-0";

function FrxImpactQuoteMark() {
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
        opacity="0.9"
      />
    </svg>
  );
}

function FrxImpactThemeIcon({
  theme,
  accent,
  muted,
}: {
  theme: FrxImpactThemeKey;
  accent: string;
  muted: string;
}) {
  return (
    <div
      className="flex h-[72px] w-[72px] shrink-0 items-center justify-center rounded-full md:h-20 md:w-20"
      style={{ backgroundColor: muted }}
      aria-hidden
    >
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        className="md:h-[34px] md:w-[34px]"
      >
        {theme === "green" && (
          <>
            <circle
              cx="16"
              cy="16"
              r="10"
              stroke={accent}
              strokeWidth="1.75"
            />
            <path
              d="M16 9v7l5 2.5"
              stroke={accent}
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </>
        )}
        {theme === "blue" && (
          <>
            <circle
              cx="16"
              cy="16"
              r="10"
              stroke={accent}
              strokeWidth="1.75"
            />
            <path
              d="M12.5 14.5h.01M19.5 14.5h.01"
              stroke={accent}
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M11.5 19c1.75 2.25 3.25 3.25 4.5 3.25s2.75-1 4.5-3.25"
              stroke={accent}
              strokeWidth="1.75"
              strokeLinecap="round"
            />
          </>
        )}
        {theme === "slate" && (
          <>
            <rect
              x="8"
              y="8"
              width="16"
              height="16"
              rx="3.5"
              stroke={accent}
              strokeWidth="1.75"
            />
            <path
              d="M12.5 16l2.5 2.5 6-6"
              stroke={accent}
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </>
        )}
      </svg>
    </div>
  );
}

function FrxImpactClinicsIcon({
  accent,
  muted,
}: {
  accent: string;
  muted: string;
}) {
  return (
    <div
      className="flex h-[72px] w-[72px] shrink-0 items-center justify-center rounded-full md:h-20 md:w-20"
      style={{ backgroundColor: muted }}
      aria-hidden
    >
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <circle cx="12" cy="11" r="3.5" fill={accent} />
        <circle cx="20" cy="11" r="3.5" fill={accent} />
        <path
          d="M6 24c0-3.5 2.5-6 6-6s6 2.5 6 6M14 24c0-2.5 1.75-4.5 4.5-4.5S23 21.5 23 24"
          stroke={accent}
          strokeWidth="1.75"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

function FrxImpactQuoteRow({
  theme,
  headline,
  description,
  quote,
  attribution,
  isLast = false,
}: FrxImpactEvidenceRow & { isLast?: boolean }) {
  const { accent, muted } = frxImpactThemeColors[theme];

  return (
    <article
      className={`${frxImpactRowGridClass} px-5 py-6 md:px-6 md:py-8 ${
        isLast ? "" : "border-b border-black/10"
      }`}
    >
      <div className="flex min-w-0 gap-5 md:gap-6 lg:pr-10">
        <FrxImpactThemeIcon theme={theme} accent={accent} muted={muted} />
        <div className="flex min-w-0 flex-col gap-2 pt-1">
          <h3 className={frxImpactRowTitleClass}>{headline}</h3>
          <p className={frxImpactRowBodyClass}>{description}</p>
        </div>
      </div>

      <figure className="flex min-w-0 flex-col gap-4 border-black/10 lg:border-l lg:pl-10">
        <FrxImpactQuoteMark />
        <blockquote className={frxImpactQuoteClass}>
          &ldquo;{quote}&rdquo;
        </blockquote>
        <figcaption className={frxImpactAttributionClass}>{attribution}</figcaption>
      </figure>
    </article>
  );
}

function FrxImpactScaleRow() {
  return (
    <article
      className={`${frxImpactRowGridClass} rounded-[16px] border border-black/15 bg-[#F4F2EE] px-5 py-6 md:px-6 md:py-8`}
    >
      <div className="flex min-w-0 gap-5 md:gap-6 lg:pr-10">
        <FrxImpactClinicsIcon
          accent={frxImpactPrimaryBlue}
          muted={frxImpactPrimaryBlueMuted}
        />
        <div className="flex min-w-0 flex-col gap-2 pt-1">
          <h3 className={frxImpactRowTitleClass}>{frxImpactScale.headline}</h3>
          <p className={frxImpactRowBodyClass}>{frxImpactScale.description}</p>
        </div>
      </div>

      <div className="flex min-w-0 flex-col gap-4 border-black/10 sm:flex-row sm:items-start sm:gap-6 lg:border-l lg:pl-10">
        <p className="shrink-0 font-sans text-[clamp(52px,10vw,80px)] font-medium leading-none tracking-[-0.03em] text-black">
          {frxImpactScale.stat}
        </p>
        <p className={`${bodyClass} max-w-sm pt-1`}>{frxImpactScale.statDetail}</p>
      </div>
    </article>
  );
}

export default function FrxImpactSection() {
  return (
    <section
      className={`${frxSectionGapClass} ${frxFilledBandClass}`}
      aria-labelledby="frx-impact-heading"
    >
      <div
        id="frx-nav-impact"
        data-frx-case-study-section=""
        className={frxNavScrollMtClass}
      >
        <header>
          <p className={frxMetaEyebrowClass}>{frxImpactSectionIntro.eyebrow}</p>
          <div className={`${frxSectionIntroStackClass} mt-4 md:mt-5`}>
            <h2 id="frx-impact-heading" className={frxStrategyHeadlineClass}>
              {frxImpactSectionIntro.title}
            </h2>
            <p className={frxSectionBodyClass}>
              The final workflow let staff move from refill need to submission in
              one place: scan the essentials, verify prescription details, and
              submit with the required patient, shipping, and confirmation context
              close at hand.
            </p>
            <p className={frxSectionBodyClass}>
              I partnered closely with front-end engineers through build,
              reviewing each implementation against the prototype to keep
              interaction details, edge case handling, and information density
              intact from design through release.
            </p>
          </div>
        </header>

        <div className="mt-8 overflow-hidden rounded-[16px] border border-black/15 bg-[#F4F2EE] md:mt-10">
          {frxImpactEvidenceRows.map((row, index) => (
            <FrxImpactQuoteRow
              key={row.headline}
              {...row}
              isLast={index === frxImpactEvidenceRows.length - 1}
            />
          ))}
        </div>

        <div className="mt-6">
          <FrxImpactScaleRow />
        </div>
      </div>
    </section>
  );
}
