import { TalkButton } from "./ContactModal";
import { CONTACT_HREF } from "./Header";
import { heroBandClass } from "../lib/heroBand";

const linkClass = "font-sans text-[13px] text-black/55 transition-colors hover:text-black";

export default function Footer() {
  return (
    <footer className={`w-full px-6 md:px-10 ${heroBandClass}`}>
      <div className="mx-auto w-full max-w-[1040px] border-t border-black/10 pt-10 md:pt-14">
        <section id="contact" aria-labelledby="contact-title" className="scroll-mt-8">
          <h2
            id="contact-title"
            className="max-w-[16ch] font-sans text-[clamp(2.25rem,5vw,4rem)] font-normal leading-[1.05] tracking-[-0.04em] text-black"
          >
            Got a workflow that&apos;s hard to explain?
          </h2>
          <p className="mt-6 max-w-[36rem] font-sans text-[16px] leading-[1.6] text-black/70 md:text-[17px]">
            Tell me what you&apos;re working on. A workflow, a prototype, an accessibility question, or
            something you&apos;re not sure about yet.
          </p>
          <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center md:mt-10">
            <TalkButton variant="hero">Let&apos;s talk</TalkButton>
            <a
              href="https://linkedin.com/in/dpindrys"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#0A66C2] px-6 py-3.5 font-sans text-[1.375rem] font-medium leading-[1.1] text-white transition-colors hover:bg-[#004182] md:px-7 md:py-4 md:text-[1.75rem]"
            >
              LinkedIn
              <svg viewBox="0 0 24 24" className="h-[1.15em] w-[1.15em] shrink-0" aria-hidden="true" fill="none">
                <path d="M14 5h5v5M19 5l-9 9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M17 13.5V19H5V7h5.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>
        </section>
        <div className="mt-14 flex flex-col gap-4 border-t border-black/10 py-8 md:mt-16 md:flex-row md:items-center md:justify-between">
          <p className="font-sans text-[13px] text-black/55">
            © 2026 David Pindrys · Senior Product Designer · Boston, USA
          </p>
          <nav aria-label="Footer" className="flex flex-wrap gap-x-5 gap-y-2">
            <a href="#approach" className={linkClass}>
              Approach
            </a>
            <a href="#services" className={linkClass}>
              Services
            </a>
            <a href="#work" className={linkClass}>
              Work
            </a>
            <a href="https://linkedin.com/in/dpindrys" className={linkClass} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
            <a href={CONTACT_HREF} className={linkClass}>
              Email
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
