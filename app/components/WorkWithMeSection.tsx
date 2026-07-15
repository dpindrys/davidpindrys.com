import {
  homeColleagueQuotes,
  type HomeColleagueQuote,
} from "../lib/homeColleagueQuotes";
import { sectionHeadingClass } from "./sectionHeading";

const quoteCardClass =
  "relative flex h-full min-h-0 min-w-0 flex-col gap-6 rounded-2xl border border-black/10 bg-white p-6 md:p-7 lg:p-8";

const quoteClass =
  "font-sans text-[15px] font-normal leading-[1.55] text-black/80 md:text-[16px] md:leading-[1.6]";

const nameClass =
  "font-sans text-[15px] font-semibold leading-[1.4] text-black md:text-[16px]";

const titleClass =
  "font-sans text-[13px] font-normal leading-[1.45] text-black/55 md:text-[14px]";

const profileLinkClass =
  "absolute bottom-5 right-5 inline-flex h-11 w-11 items-center justify-center rounded-full text-black opacity-50 transition-[opacity,background-color] hover:bg-black/[0.04] hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/25 focus-visible:ring-offset-2 focus-visible:ring-offset-[#F4F2EE] md:bottom-6 md:right-6";

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

function LinkedInIcon() {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      className="shrink-0"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function ExternalLinkIcon() {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className="shrink-0"
    >
      <path d="M7 17 17 7" />
      <path d="M7 7h10v10" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      className="shrink-0"
    >
      <path d="M12 2.5 4.5 6v5.6c0 4.7 3.2 9.1 7.5 10.4 4.3-1.3 7.5-5.7 7.5-10.4V6L12 2.5z" />
    </svg>
  );
}

function DoctorDirectoryIcon() {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className="shrink-0"
    >
      <circle cx="12" cy="12" r="10" fill="currentColor" />
      <path
        d="M12 7.25v9.5M7.25 12h9.5"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
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

function ColleagueQuoteCard({ item }: { item: HomeColleagueQuote }) {
  const isLinkedIn =
    item.linkIcon === "linkedin" ||
    (!item.linkIcon && !item.linkIconSrc && Boolean(item.href?.includes("linkedin.com")));

  function ProfileIcon() {
    if (item.linkIconSrc) {
      return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={item.linkIconSrc}
          alt=""
          width={26}
          height={26}
          className="h-[26px] w-[26px] shrink-0 object-contain"
        />
      );
    }
    if (item.linkIcon === "doctor") return <DoctorDirectoryIcon />;
    if (item.linkIcon === "shield") return <ShieldIcon />;
    if (item.linkIcon === "external") return <ExternalLinkIcon />;
    if (isLinkedIn || item.linkIcon === "linkedin") return <LinkedInIcon />;
    return <ExternalLinkIcon />;
  }

  return (
    <figure className={quoteCardClass}>
      <QuoteMark />
      <blockquote className={quoteClass}>&ldquo;{item.quote}&rdquo;</blockquote>
      <figcaption className="mt-auto flex items-center gap-3.5 pr-10 pt-2">
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
          <span className={titleClass}>{item.company}</span>
        </div>
      </figcaption>

      {item.href ? (
        <a
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open ${item.name}’s ${isLinkedIn ? "LinkedIn" : "U.S. News Health"} profile`}
          className={profileLinkClass}
        >
          <ProfileIcon />
        </a>
      ) : null}
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
