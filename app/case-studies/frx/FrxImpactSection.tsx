import Image from "next/image";

import {
  FrxProcessRowShell,
  rowBodyClass,
  rowBodyTextClass,
  rowHeadingClass,
} from "./FrxExtendedSections";

const eyebrowClass =
  "font-sans text-[12px] font-normal uppercase tracking-[0.12em] text-gray-800";
const sectionTitleClass =
  "w-full font-sans text-[clamp(26px,4vw,38px)] font-semibold leading-[1.15] tracking-[-0.02em] text-black";
const introClass =
  "w-full font-sans text-[22px] font-normal leading-[1.45] text-black/80 md:text-[24px]";

/** Matches testimonial card in `FrxBelowHero` (Peruri Sai Mahesh). */
const testimonialCardClass =
  "flex min-h-0 min-w-0 w-full flex-col gap-6 rounded-2xl border border-black/10 bg-white/50 p-8";

type ImpactQuote = {
  quote: string;
  name: string;
  title: string;
  avatarSrc: string;
};

type ImpactRow = {
  heading: string;
  body: string;
} & ImpactQuote;

const impactRows: readonly ImpactRow[] = [
  {
    heading: "1. Time Saved for Clinic Staff",
    body: "The workflow reduced repeat calls, paper handling, and pharmacy lookups, giving staff back time each week.",
    quote:
      '"Realistically on a big program you\'re saving 2–3 hours per week."',
    name: "Tara E. Towe",
    title: "Program Manager",
    avatarSrc: "/images/frx/time.png",
  },
  {
    heading: "2. Faster Answers for Patients",
    body: "Shipment and refill status became visible in the workflow, helping staff answer patient questions without calling pharmacy.",
    quote:
      '"Quick. Was able to see shipment, call patient back within minutes."',
    name: "Pat Denton",
    title: "Program Manager",
    avatarSrc: "/images/frx/clinical.png",
  },
  {
    heading: "3. Easy Adoption at the Point of Care",
    body: "Staff could refill medications from the clinic workflow without learning a separate process or leaving the patient context.",
    quote:
      '"It\'s super easy, literally the push of a button. We LOVE it."',
    name: "Natisha Winegarner",
    title: "RN",
    avatarSrc: "/images/frx/ease.png",
  },
];

function FrxImpactQuoteCard({
  quote,
  name,
  title,
  avatarSrc,
}: ImpactQuote) {
  return (
    <div className={testimonialCardClass}>
      <blockquote className={`${rowBodyTextClass} whitespace-pre-line`}>
        {quote}
      </blockquote>
      <div className="flex items-center gap-4">
        <div className="relative h-[52px] w-[52px] shrink-0 overflow-hidden rounded-full">
          <Image
            src={avatarSrc}
            alt={name}
            fill
            className="rounded-full object-cover"
          />
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="font-sans text-[16px] font-semibold leading-[1.5] text-black">
            {name}
          </span>
          <span className="font-sans text-[16px] font-normal leading-[1.5] text-black/50">
            {title}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function FrxImpactSection() {
  return (
    <section
      className="mt-16 w-full md:mt-24 lg:mt-28"
      aria-labelledby="frx-impact-heading"
    >
      <p className={eyebrowClass}>Impact</p>
      <h2
        id="frx-impact-heading"
        className={`${sectionTitleClass} mt-4 md:mt-5`}
      >
        The Refill Button, Deployed at Scale
      </h2>
      <p className={`${introClass} mt-5 md:mt-6`}>
        Reported refill time dropped by ~70%, while staff gained clearer
        medication visibility across 2,800+ clinics serving 43,000+ patients.
      </p>

      <div className="mt-10 w-full md:mt-14 lg:mt-16">
        {impactRows.map((row, i) => (
          <FrxProcessRowShell
            key={row.heading}
            isFirst={i === 0}
            left={
              <>
                <h3 className={rowHeadingClass}>{row.heading}</h3>
                <p className={rowBodyClass}>{row.body}</p>
              </>
            }
          >
            <FrxImpactQuoteCard
              quote={row.quote}
              name={row.name}
              title={row.title}
              avatarSrc={row.avatarSrc}
            />
          </FrxProcessRowShell>
        ))}
      </div>
    </section>
  );
}
