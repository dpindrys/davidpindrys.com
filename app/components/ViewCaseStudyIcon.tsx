/** Copy-style icon: rear sheet outline, front sheet white fill (for primary CTA on blue) */
export default function ViewCaseStudyIcon({
  className = "h-[18px] w-[18px] shrink-0 text-current",
  frontFill = "white",
  "aria-hidden": ariaHidden = true,
}: {
  className?: string;
  frontFill?: string;
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
      {/* Beneath: outline only */}
      <rect
        x="3"
        y="9"
        width="12"
        height="12"
        rx="2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      {/* Top / front: white fill + stroke */}
      <rect
        x="9"
        y="3"
        width="12"
        height="12"
        rx="2"
        fill={frontFill}
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
    </svg>
  );
}
