import { PRIMARY_FILLED_INTERACTIVE } from "../../components/buttonTokens";
import { vehrBelowHeroTestimonial } from "./vehrBelowHeroData";
import { vehrBodyClass } from "./vehrCaseStudySectionTokens";

const eyebrowClass =
  "font-sans text-[12px] font-normal uppercase tracking-[0.12em] text-gray-800";
const sectionTitleClass =
  "w-full font-sans text-[clamp(26px,4vw,38px)] font-semibold leading-[1.15] tracking-[-0.02em] text-black";
const closingQuoteClass =
  "font-sans text-[16px] font-normal leading-[1.5] text-gray-800 md:text-[17px]";
const sectionGapClass = "mt-16 w-full md:mt-20 lg:mt-24";

const prototypeCardClass =
  "w-full overflow-hidden rounded-2xl border border-black/10 bg-white px-5 py-6 shadow-[0_12px_40px_-18px_rgba(0,0,0,0.1),0_4px_12px_-4px_rgba(0,0,0,0.06)] md:px-8 md:py-8 lg:px-10 lg:py-10";

const prototypeHref = "https://visual-ehr.vercel.app/";

export default function VehrClosingSections() {
  return (
    <>
      <section
        className={sectionGapClass}
        aria-labelledby="vehr-full-prototype-heading"
      >
        <div className={prototypeCardClass}>
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
          <p className={`${vehrBodyClass} mt-5 md:mt-6`}>
            The final prototype combines encounters, diagnoses, labs, vitals,
            medications, patient-reported context, and compressed time into one
            interactive timeline. Clinicians can start with the patient story,
            scan for clinical signals, then drill into source details only when
            needed.
          </p>

          <a
            href={prototypeHref}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 block w-full rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/25 focus-visible:ring-offset-2 focus-visible:ring-offset-white md:mt-10"
            aria-label="View interactive prototype (opens in new tab)"
          >
            <video
              className="block w-full rounded-lg"
              src="/videos/vehr/prototype.mp4"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              aria-hidden
            />
          </a>

          <div className="mt-6 flex justify-center md:mt-8">
            <a
              href={prototypeHref}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex h-12 shrink-0 items-center gap-2 rounded-2xl px-5 font-sans text-[16px] font-semibold leading-none transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/25 focus-visible:ring-offset-2 focus-visible:ring-offset-white ${PRIMARY_FILLED_INTERACTIVE}`}
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
                className="shrink-0"
                aria-hidden
              >
                <path d="M7 17L17 7M17 7H10M17 7V15" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      <section
        className={sectionGapClass}
        aria-label="Clinical feedback from Dr. Cole Marolf"
      >
        <figure className="rounded-2xl border border-black/10 bg-white/50 p-8 md:p-10">
          <blockquote className={closingQuoteClass}>
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
