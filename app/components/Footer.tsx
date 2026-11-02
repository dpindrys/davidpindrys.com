import { TalkButton } from "./ContactModal";
import { CONTACT_HREF } from "./Header";

const linkClass = "font-sans text-[13px] text-black/55 transition-colors hover:text-black";

export default function Footer() {
  return (
    <footer className="w-full px-6 md:px-10">
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
          <TalkButton className="mt-8 md:mt-10">Let&apos;s talk</TalkButton>
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
