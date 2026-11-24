import { buttonOutlineClass, buttonPrimaryClass, buttonTextClass } from "./buttonTokens";

export const LINKEDIN_HREF = "https://linkedin.com/in/dpindrys";

function ExternalLinkIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className ?? "h-[1.15em] w-[1.15em] shrink-0"} aria-hidden="true" fill="none">
      <path d="M14 5h5v5M19 5l-9 9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M17 13.5V19H5V7h5.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function LinkedInButton({
  variant = "text",
}: {
  /** Matches homepage CTA system: primary · outline · text. */
  variant?: "primary" | "outline" | "text";
}) {
  const className =
    variant === "primary"
      ? buttonPrimaryClass
      : variant === "outline"
        ? buttonOutlineClass
        : buttonTextClass;

  return (
    <a href={LINKEDIN_HREF} target="_blank" rel="noopener noreferrer" className={className}>
      LinkedIn
      <ExternalLinkIcon className={variant === "text" ? "h-[0.95em] w-[0.95em] shrink-0" : undefined} />
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}
