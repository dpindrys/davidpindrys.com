/** Information circle (i) for More info CTA */
export default function ViewCaseStudyIcon({
  className = "h-[18px] w-[18px] shrink-0 text-current",
  "aria-hidden": ariaHidden = true,
}: {
  className?: string;
  "aria-hidden"?: boolean;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden={ariaHidden}
    >
      <circle
        cx="12"
        cy="12"
        r="9.25"
        stroke="currentColor"
        strokeWidth="1.75"
      />
      <circle cx="12" cy="8" r="1.15" fill="currentColor" />
      <path
        d="M12 11v5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}
