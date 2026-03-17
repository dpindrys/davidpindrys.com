export default function Hero() {
  return (
    <section className="flex flex-col gap-20 w-full">
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

      {/* CTAs — left-aligned, tightened */}
      <div className="flex items-center gap-6 justify-start">
        {/* Email — blue fill */}
        <a
          href="mailto:dpindrys@gmail.com"
          className="flex items-center gap-3 h-20 px-10 rounded-2xl border-2 border-[#005077] bg-[#00AAFF] font-sans font-semibold text-[clamp(16px,1.9vw,28px)] leading-[1.21] text-white hover:opacity-80 transition-opacity"
        >
          <span>Email me</span>
          {/* Filled white mail icon */}
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

        {/* LinkedIn — white fill */}
        <a
          href="https://www.linkedin.com/in/dpindrys"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 h-20 px-10 rounded-2xl border-2 border-[#005077] bg-white font-sans font-semibold text-[clamp(16px,1.9vw,28px)] leading-[1.21] text-black hover:opacity-80 transition-opacity"
        >
          <span>Connect on LinkedIn</span>
          {/* LinkedIn "in" badge */}
          <span
            className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#0174AF] font-bold text-white text-[20px] leading-none select-none shrink-0"
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
