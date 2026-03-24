import { SECONDARY_OUTLINE_INTERACTIVE } from "./buttonTokens";

export default function Hero() {
  return (
    <section className="flex w-full flex-col gap-10">
      <h1 className="max-w-[1291px] font-sans text-[clamp(32px,4.8vw,64px)] font-semibold leading-[1.305] text-black">
        I design digital healthcare products that make complex clinical workflows clearer, safer, and easier to use.
      </h1>

      {/* CTAs */}
      <div className="flex flex-wrap items-center gap-4 justify-start">
        <a
          href="mailto:dpindrys@gmail.com"
          className="inline-flex h-12 items-center gap-2 rounded-2xl border-2 border-[#0078B3] bg-[#00AAFF] px-4 font-sans font-semibold text-[16px] leading-none text-white hover:opacity-90 transition-opacity"
        >
          <span>Email me</span>
          <svg
            width="22"
            height="18"
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
          className={`inline-flex h-12 items-center gap-2 rounded-2xl px-4 font-sans font-semibold text-[16px] leading-none text-black ${SECONDARY_OUTLINE_INTERACTIVE}`}
        >
          <span>My LinkedIn</span>
          <span
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0174AF] font-bold text-[15px] leading-none text-white select-none shrink-0"
            style={{ fontFamily: "Arial, sans-serif" }}
            aria-hidden="true"
          >
            in
          </span>
        </a>
      </div>
    </section>
  );
}
