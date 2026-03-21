import { sectionHeadingClass } from "./sectionHeading";

export default function Hero() {
  return (
    <section className="flex w-full flex-col gap-10">
      {/* Headline + subhead */}
      <div className="flex flex-col gap-5">
        <h1 className="font-serif font-normal text-[clamp(40px,5.5vw,75px)] leading-[1.305] text-black max-w-[1291px]">
          Designing clinical products that make complex care workflows clearer,
          safer, and easier to use.
        </h1>
        <p className="font-sans font-normal text-[clamp(16px,1.9vw,28px)] leading-[1.4] text-black max-w-[1291px]">
          I help healthcare startups and product teams turn clinical complexity,
          fragmented data, and messy workflows into products clinicians can
          trust.
        </p>
      </div>

      {/* CTAs */}
      <div className="flex flex-wrap items-center gap-6 justify-start">
        <a
          href="mailto:dpindrys@gmail.com"
          className="flex items-center gap-3 h-20 px-10 rounded-2xl border-2 border-[#005077] bg-[#00AAFF] font-sans font-semibold text-[clamp(16px,1.9vw,28px)] leading-[1.21] text-white hover:opacity-80 transition-opacity"
        >
          <span>Email me</span>
          <svg
            width="28"
            height="23"
            viewBox="0 0 44 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            className="shrink-0"
          >
            <rect width="44" height="36" rx="5" fill="white" />
            <path d="M2 4L22 22L42 4" stroke="#00AAFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>

        <a
          href="https://www.linkedin.com/in/dpindrys"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 h-20 px-10 rounded-2xl border-2 border-[#005077] bg-white font-sans font-semibold text-[clamp(16px,1.9vw,28px)] leading-[1.21] text-black hover:opacity-80 transition-opacity"
        >
          <span>My LinkedIn</span>
          <span
            className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#0174AF] font-bold text-white text-[20px] leading-none select-none shrink-0"
            style={{ fontFamily: "Arial, sans-serif" }}
            aria-hidden="true"
          >
            in
          </span>
        </a>
      </div>

      {/* Gap below label matches Selected work → project logo (page.tsx h2 mb-*) */}
      <div className="flex w-full flex-col gap-2 md:gap-5 lg:gap-10">
        <h2 className={sectionHeadingClass}>Ways to work with me</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 w-full items-stretch">
          <a
            href="https://cal.com/dpindrys/30min"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="On your team, schedule a hiring conversation (opens in new tab)"
            className="flex flex-col rounded-2xl border-2 border-[#005077] bg-white p-5 md:p-6 min-h-0 h-full text-left no-underline shadow-none hover:opacity-80 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-black/20 focus-visible:ring-offset-2 focus-visible:ring-offset-[#F0F0F0]"
          >
            <h3 className="font-sans font-bold text-[16px] leading-snug text-black">
              On your team
            </h3>
            <p className="mt-1.5 font-sans font-normal text-[15px] leading-[1.45] text-black/75">
              For full-time, contract, or fractional opportunities.
            </p>
            <span className="mt-auto pt-5 font-sans font-semibold text-[15px] leading-snug text-black">
              Schedule a hiring conversation →
            </span>
          </a>
          <a
            href="https://cal.com/dpindrys/15min"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Project-based, schedule a project intro (opens in new tab)"
            className="flex flex-col rounded-2xl border-2 border-[#005077] bg-white p-5 md:p-6 min-h-0 h-full text-left no-underline shadow-none hover:opacity-80 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-black/20 focus-visible:ring-offset-2 focus-visible:ring-offset-[#F0F0F0]"
          >
            <h3 className="font-sans font-bold text-[16px] leading-snug text-black">
              Project-based
            </h3>
            <p className="mt-1.5 font-sans font-normal text-[15px] leading-[1.45] text-black/75">
              Freelance, consulting, or scoped project support.
            </p>
            <span className="mt-auto pt-5 font-sans font-semibold text-[15px] leading-snug text-black">
              Schedule a project intro →
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
