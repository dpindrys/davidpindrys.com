export const LINKEDIN_HREF = "https://linkedin.com/in/dpindrys";

export default function LinkedInButton() {
  return (
    <a
      href={LINKEDIN_HREF}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 bg-[#0A66C2] px-6 py-3.5 font-sans text-[1.375rem] font-medium leading-[1.1] text-white transition-colors hover:bg-[#004182] md:px-7 md:py-4 md:text-[1.75rem]"
    >
      LinkedIn
      <svg viewBox="0 0 24 24" className="h-[1.15em] w-[1.15em] shrink-0" aria-hidden="true" fill="none">
        <path d="M14 5h5v5M19 5l-9 9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M17 13.5V19H5V7h5.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}
