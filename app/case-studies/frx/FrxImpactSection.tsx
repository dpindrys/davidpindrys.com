import {
  frxImpactEvidenceRows,
  frxImpactScale,
  frxImpactSectionIntro,
  frxImpactThemeColors,
  type FrxImpactEvidenceRow,
  type FrxImpactThemeKey,
} from "./frxImpactData";
import { frxMetaEyebrowClass } from "./frxCaseStudyTypography";

const frxImpactProblemBg = "#E8E6E1";
/** Site primary blue (`--color-blue` in globals.css). */
const frxImpactPrimaryBlue = "#00AAFF";
const frxImpactPrimaryBlueMuted = "#D9F4FF";

const frxImpactSectionTitleClass =
  "font-sans text-[clamp(24px,3.2vw,36px)] font-semibold leading-[1.2] tracking-[-0.02em] text-black";

const frxImpactRowTitleClass =
  "font-sans text-[16px] font-semibold leading-[1.4] text-black md:text-[17px]";

const frxImpactRowBodyClass =
  "font-sans text-[15px] font-normal leading-[1.55] text-black/75 md:text-[16px]";

const frxImpactQuoteClass =
  "font-sans text-[15px] font-normal leading-[1.55] text-black md:text-[16px]";

const frxImpactAttributionClass =
  "font-sans text-[11px] font-normal uppercase tracking-[0.12em]";

const frxImpactRowGridClass =
  "grid grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-0";

function FrxImpactQuoteMark() {
  return (
    <svg
      width="32"
      height="26"
      viewBox="0 0 40 32"
      fill="none"
      aria-hidden
      className="shrink-0 text-blue"
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
          <path
            d="M11.5 12h9a2 2 0 012 2v6.5a2 2 0 01-2 2h-1.5l-2.5 2.5V20.5h-1.5a2 2 0 01-2-2V12z"
            stroke={accent}
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}
        {theme === "purple" && (
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
      className={`${frxImpactRowGridClass} px-6 py-8 md:px-8 md:py-10 lg:px-10 lg:py-11 ${
        isLast ? "" : "border-b border-black/[0.06]"
      }`}
    >
      <div className="flex min-w-0 gap-5 md:gap-6 lg:pr-10">
        <FrxImpactThemeIcon theme={theme} accent={accent} muted={muted} />
        <div className="flex min-w-0 flex-col gap-2 pt-1">
          <h3 className={frxImpactRowTitleClass}>{headline}</h3>
          <p className={frxImpactRowBodyClass}>{description}</p>
        </div>
      </div>

      <figure className="flex min-w-0 flex-col gap-4 border-black/[0.06] lg:border-l lg:pl-10">
        <FrxImpactQuoteMark />
        <blockquote className={frxImpactQuoteClass}>
          &ldquo;{quote}&rdquo;
        </blockquote>
        <figcaption
          className={frxImpactAttributionClass}
          style={{ color: accent }}
        >
          {attribution}
        </figcaption>
      </figure>
    </article>
  );
}

function FrxImpactScaleRow() {
  return (
    <article
      className={`${frxImpactRowGridClass} rounded-2xl px-6 py-8 md:px-8 md:py-10 lg:px-10 lg:py-11`}
      style={{ backgroundColor: frxImpactProblemBg }}
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

      <div className="flex min-w-0 flex-col gap-4 border-black/[0.06] sm:flex-row sm:items-start sm:gap-6 lg:border-l lg:pl-10">
        <p className="shrink-0 font-sans text-[clamp(52px,10vw,80px)] font-semibold leading-none tracking-[-0.03em] text-blue">
          {frxImpactScale.stat}
        </p>
        <p className="max-w-sm pt-1 font-sans text-[15px] font-normal leading-[1.55] text-black/80 md:text-[16px] md:leading-[1.6]">
          {frxImpactScale.statDetail}
        </p>
      </div>
    </article>
  );
}

export default function FrxImpactSection() {
  return (
    <section
      className="relative mt-24 w-[calc(100%+4rem)] max-w-none -mx-8 md:mt-32 lg:mt-40 lg:w-[calc(100%+8rem)] lg:-mx-16"
      aria-labelledby="frx-impact-heading"
    >
      <div
        className="rounded-2xl px-6 py-10 md:px-10 md:py-12 lg:px-14 lg:py-14"
        style={{ backgroundColor: frxImpactProblemBg }}
      >
        <header>
          <p className={frxMetaEyebrowClass}>{frxImpactSectionIntro.eyebrow}</p>
          <h2
            id="frx-impact-heading"
            className={`${frxImpactSectionTitleClass} mt-4 md:mt-5`}
          >
            {frxImpactSectionIntro.title}
          </h2>
        </header>

        <div className="mt-8 overflow-hidden rounded-2xl bg-[#F4F2EE] md:mt-10 lg:mt-12">
          {frxImpactEvidenceRows.map((row, index) => (
            <FrxImpactQuoteRow
              key={row.headline}
              {...row}
              isLast={index === frxImpactEvidenceRows.length - 1}
            />
          ))}
        </div>

        <div className="mt-4 md:mt-5">
          <FrxImpactScaleRow />
        </div>
      </div>
    </section>
  );
}
