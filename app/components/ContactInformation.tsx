import type { ReactNode } from "react";

import { frxSectionBodyClass } from "../case-studies/frx/frxCaseStudyTypography";

const CONTACT_EMAIL = "dpindrys@gmail.com";
const CONTACT_PHONE = "(808) 268-2590";
const LINKEDIN_HREF = "https://www.linkedin.com/in/dpindrys";
const LINKEDIN_LABEL = "linkedin.com/in/dpindrys";

const titleClass =
  "font-sans text-[18px] font-semibold leading-[1.3] text-black md:text-[19px]";

const itemLabelClass =
  "font-sans text-[13px] font-semibold leading-none text-black/70";

function ContactIcon({ children }: { children: ReactNode }) {
  return (
    <span
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-black/70 shadow-[0_1px_3px_rgba(0,0,0,0.06)]"
      aria-hidden
    >
      {children}
    </span>
  );
}

const contactItems = [
  {
    label: "Email",
    href: `mailto:${CONTACT_EMAIL}`,
    value: CONTACT_EMAIL,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.75" />
        <path d="M3 7l9 6 9-6" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: "Phone",
    href: "tel:+18082682590",
    value: CONTACT_PHONE,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path
          d="M6.5 4h3l1.5 4-2 1.5a11 11 0 005 5L17.5 12.5 21.5 14v3A2 2 0 0119.7 19 16 16 0 015 5.3 2 2 0 016.5 4z"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: LINKEDIN_HREF,
    value: LINKEDIN_LABEL,
    external: true,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="1.75" />
        <path d="M8 11v5M8 8v.01M12 16v-5c0-1.5 1-2.5 2.5-2.5S17 9.5 17 11v5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: "Location",
    value: "Boston, Massachusetts, USA",
    subvalue: "Open to remote collaboration across the world",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 21s6-5.2 6-10a6 6 0 10-12 0c0 4.8 6 10 6 10z"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinejoin="round"
        />
        <circle cx="12" cy="11" r="2" stroke="currentColor" strokeWidth="1.75" />
      </svg>
    ),
  },
] as const;

export default function ContactInformation() {
  return (
    <section aria-labelledby="contact-information-heading">
      <h2 id="contact-information-heading" className={titleClass}>
        Contact information
      </h2>

      <ul className="mt-6 flex flex-col gap-5 md:mt-8 md:gap-6">
        {contactItems.map((item) => (
          <li key={item.label} className="flex gap-4">
            <ContactIcon>{item.icon}</ContactIcon>
            <div className="flex min-w-0 flex-col gap-1">
              <span className={itemLabelClass}>{item.label}</span>
              {"href" in item && item.href ? (
                <a
                  href={item.href}
                  className={`${frxSectionBodyClass} w-fit transition-opacity hover:opacity-70`}
                  {...("external" in item && item.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                >
                  {item.value}
                </a>
              ) : (
                <>
                  <span className={frxSectionBodyClass}>{item.value}</span>
                  {"subvalue" in item && item.subvalue ? (
                    <span className="font-sans text-[14px] leading-[1.5] text-black/55 md:text-[15px]">
                      {item.subvalue}
                    </span>
                  ) : null}
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
