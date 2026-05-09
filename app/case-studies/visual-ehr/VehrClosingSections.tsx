import { SECONDARY_OUTLINE_INTERACTIVE } from "../../components/buttonTokens";
import { vehrBelowHeroTestimonial } from "./vehrBelowHeroData";

const eyebrowClass =
  "font-sans text-[12px] font-normal uppercase tracking-[0.12em] text-gray-800";
const sectionTitleClass =
  "w-full font-sans text-[clamp(26px,4vw,38px)] font-semibold leading-[1.15] tracking-[-0.02em] text-black";
const bodyClass =
  "w-full font-sans text-[22px] font-normal leading-[1.45] text-black/80 md:text-[24px]";
const subheadingClass =
  "font-sans text-[22px] md:text-[24px] font-semibold leading-[1.25] tracking-tight text-black";

const visualShellClass =
  "rounded-2xl border border-black/10 bg-white p-4 md:p-5 shadow-[0_12px_40px_-18px_rgba(0,0,0,0.1),0_4px_12px_-4px_rgba(0,0,0,0.06)]";

const sectionGapClass = "mt-16 w-full md:mt-20 lg:mt-24";

const prototypeHref = "https://visual-ehr.vercel.app/";

export default function VehrClosingSections() {
  return (
    <>
      <section
        className={sectionGapClass}
        aria-labelledby="vehr-full-prototype-heading"
      >
        <p
          id="vehr-full-prototype-eyebrow"
          className={`scroll-mt-28 ${eyebrowClass}`}
        >
          The Full Prototype
        </p>
        <h2
          id="vehr-full-prototype-heading"
          className={`${sectionTitleClass} mt-4 md:mt-5`}
        >
          Putting the Timeline Together
        </h2>
        <p className={`${bodyClass} mt-5 md:mt-6`}>
          The final prototype combines encounters, diagnoses, labs, vitals,
          medications, patient-reported context, and compressed time into one
          interactive timeline. Clinicians can start with the patient story,
          scan for clinical signals, then drill into source details only when
          needed.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-8 md:mt-12 md:grid-cols-2 md:items-center md:gap-12 lg:mt-14 lg:gap-14">
          <div className="flex max-w-md flex-col gap-0 md:max-w-none lg:max-w-lg">
            <h3
              id="vehr-validation-heading"
              className={subheadingClass}
            >
              What the Prototype Tested
            </h3>
            <p className={`${bodyClass} mt-4 md:mt-5`}>
              Testing with Dr. Marolf helped evaluate whether the timeline made
              complex chart review easier to scan and reason through. His feedback
              reinforced the value of a quick patient overview before clinicians
              drill into encounters, labs, vitals, and medications.
            </p>
            <div className="mt-8 flex w-full justify-start md:mt-10">
              <a
                href={prototypeHref}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex h-12 shrink-0 items-center gap-2 rounded-2xl px-4 font-sans font-semibold text-[16px] leading-none text-black transition-opacity hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/25 focus-visible:ring-offset-2 focus-visible:ring-offset-[#F4F2EE] ${SECONDARY_OUTLINE_INTERACTIVE}`}
                aria-label="View interactive prototype (opens in new tab)"
              >
                <span>View interactive prototype</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="shrink-0 text-black/70"
                  aria-hidden
                >
                  <path d="M7 17L17 7M17 7H10M17 7V15" />
                </svg>
              </a>
            </div>
          </div>
          <div className="w-full min-w-0">
            <div className={visualShellClass}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/vehr/vehr.png"
                alt="Full interactive VEHR prototype"
                className="block h-auto w-full rounded-md border-0"
              />
            </div>
          </div>
        </div>
      </section>

      <section
        className={sectionGapClass}
        aria-label="Clinical feedback from Dr. Cole Marolf"
      >
        <figure className="rounded-2xl border border-black/10 bg-white/50 p-8 md:p-10">
          <blockquote className={bodyClass}>
            &ldquo;David demonstrated strong insight into reframing healthcare
            data interaction… especially the heat map, which improved data density
            while maintaining clarity.&rdquo;
          </blockquote>
          <figcaption className="mt-6 flex items-center gap-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={vehrBelowHeroTestimonial.avatarSrc}
              alt="Dr. Cole Marolf"
              width={52}
              height={52}
              className="h-[52px] w-[52px] shrink-0 rounded-full object-cover"
            />
            <span className="font-sans text-[16px] font-semibold leading-[1.5] text-black">
              Dr. Cole Marolf
            </span>
          </figcaption>
        </figure>
      </section>
    </>
  );
}
