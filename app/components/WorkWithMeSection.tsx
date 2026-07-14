import {
  homeColleagueQuotes,
  type HomeColleagueQuote,
} from "../lib/homeColleagueQuotes";
import { sectionHeadingClass } from "./sectionHeading";

/** Matches `HomeShowcaseCard` portfolio card hover treatment. */
const quoteCardLinkClass =
  "group flex h-full min-h-0 min-w-0 flex-col gap-6 rounded-2xl border border-black/10 bg-white p-6 shadow-[0_10px_30px_-22px_rgba(0,0,0,0.25)] transition-[transform,box-shadow] duration-200 ease-out hover:-translate-y-0.5 hover:shadow-[0_26px_70px_-26px_rgba(0,0,0,0.35)] active:translate-y-0 active:shadow-[0_14px_40px_-26px_rgba(0,0,0,0.28)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/25 focus-visible:ring-offset-2 focus-visible:ring-offset-[#F4F2EE] md:p-7 lg:p-8";

const quoteCardStaticClass =
  "flex h-full min-h-0 min-w-0 flex-col gap-6 rounded-2xl border border-black/10 bg-white p-6 shadow-[0_10px_30px_-22px_rgba(0,0,0,0.25)] md:p-7 lg:p-8";

const quoteClass =
  "font-sans text-[15px] font-normal leading-[1.55] text-black/80 md:text-[16px] md:leading-[1.6]";

const nameClass =
  "font-sans text-[15px] font-semibold leading-[1.4] text-black md:text-[16px]";

const titleClass =
  "font-sans text-[13px] font-normal leading-[1.45] text-black/55 md:text-[14px]";

function QuoteMark() {
  return (
    <svg
      width="28"
      height="22"
      viewBox="0 0 40 32"
      fill="none"
      aria-hidden
      className="shrink-0 text-black/25"
    >
      <path
        d="M8 32V18.4C8 11.2 11.2 5.6 18.4 2.4L20.8 6.4C16 8.8 13.6 12 13.6 16H20V32H8ZM28 32V18.4C28 11.2 31.2 5.6 38.4 2.4L40.8 6.4C36 8.8 33.6 12 33.6 16H40V32H28Z"
        fill="currentColor"
      />
    </svg>
  );
}

function initialsFromName(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

function QuoteCardBody({ item }: { item: HomeColleagueQuote }) {
  return (
    <>
      <QuoteMark />
      <blockquote className={quoteClass}>&ldquo;{item.quote}&rdquo;</blockquote>
      <figcaption className="mt-auto flex items-center gap-3.5 pt-2">
        {item.avatarSrc ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={item.avatarSrc}
            alt=""
            width={48}
            height={48}
            className="h-12 w-12 shrink-0 rounded-full object-cover"
          />
        ) : (
          <span
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-black/[0.06] font-sans text-[14px] font-semibold tracking-tight text-black/70"
            aria-hidden
          >
            {initialsFromName(item.name)}
          </span>
        )}
        <div className="flex min-w-0 flex-col gap-0.5">
          <span className={nameClass}>{item.name}</span>
          <span className={titleClass}>{item.title}</span>
        </div>
      </figcaption>
    </>
  );
}

function ColleagueQuoteCard({ item }: { item: HomeColleagueQuote }) {
  if (item.href) {
    return (
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Open ${item.name}’s profile`}
        className={quoteCardLinkClass}
      >
        <figure className="flex h-full min-h-0 min-w-0 flex-col gap-6">
          <QuoteCardBody item={item} />
        </figure>
      </a>
    );
  }

  return (
    <figure className={quoteCardStaticClass}>
      <QuoteCardBody item={item} />
    </figure>
  );
}

export default function WorkWithMeSection() {
  return (
    <section
      className="mt-16 w-full md:mt-20 lg:mt-24"
      aria-labelledby="work-with-me-heading"
    >
      <h2 id="work-with-me-heading" className={`${sectionHeadingClass} text-left`}>
        What it’s like to work with me
      </h2>
      <div className="mt-6 grid w-full grid-cols-1 items-stretch gap-4 sm:grid-cols-2 md:mt-8 lg:mt-10 lg:grid-cols-3 lg:gap-5">
        {homeColleagueQuotes.map((item) => (
          <div
            key={item.name}
            className={item.colSpan === 2 ? "sm:col-span-2 lg:col-span-2" : undefined}
          >
            <ColleagueQuoteCard item={item} />
          </div>
        ))}
      </div>
    </section>
  );
}
