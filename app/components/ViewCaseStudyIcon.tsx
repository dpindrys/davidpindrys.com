/** Simple filled rounded square (for View details CTA) */
export default function ViewCaseStudyIcon({
  className = "h-[18px] w-[18px] shrink-0 text-current",
  frontFill = "currentColor",
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
      <rect
        x="5"
        y="5"
        width="14"
        height="14"
        rx="3"
        fill={frontFill}
      />
    </svg>
  );
}
