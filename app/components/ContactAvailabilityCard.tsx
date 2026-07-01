import { frxSectionBodyClass } from "../case-studies/frx/frxCaseStudyTypography";

const cardClass =
  "flex min-w-0 flex-col gap-5 rounded-2xl border border-black/10 bg-white p-6 shadow-[0_10px_30px_-22px_rgba(0,0,0,0.25)] md:gap-6 md:p-8";

const titleClass =
  "font-sans text-[18px] font-semibold leading-[1.3] text-black md:text-[19px]";

const itemClass = "flex gap-3 text-left";

const availabilityItems = [
  "Available for consulting (up to 15 hours/week)",
  "Open to discussing full-time opportunities starting January 2027",
] as const;

function CheckIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className="mt-0.5 shrink-0 text-[#3D9B5F]"
    >
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M8 12.5l2.5 2.5L16 9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className="mt-0.5 shrink-0 text-[#3B8FD9]"
    >
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M12 7v5l3 2"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function ContactAvailabilityCard() {
  return (
    <aside className={cardClass} aria-label="Current availability">
      <h2 className={titleClass}>Current availability</h2>
      <ul className="flex flex-col gap-4">
        {availabilityItems.map((item) => (
          <li key={item} className={itemClass}>
            <CheckIcon />
            <span className={frxSectionBodyClass}>{item}</span>
          </li>
        ))}
        <li className={`${itemClass} border-t border-black/10 pt-4`}>
          <ClockIcon />
          <div className="flex flex-col gap-0.5">
            <span className="font-sans text-[13px] font-semibold leading-none text-black/70">
              Typical response time
            </span>
            <span className={frxSectionBodyClass}>Within 24–48 hours</span>
          </div>
        </li>
      </ul>
    </aside>
  );
}
