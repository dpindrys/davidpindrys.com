import { TalkButton } from "./ContactModal";
import { CONTACT_HREF } from "./Header";
import LinkedInButton from "./LinkedInButton";
import { heroBandClass } from "../lib/heroBand";

const linkClass = "font-sans text-[13px] text-black/55 transition-colors hover:text-black";

export default function Footer({ linkBase = "" }: { linkBase?: string }) {
  return (
    <footer className={`w-full px-6 md:px-10 ${heroBandClass}`}>
      <div className="mx-auto w-full max-w-[1920px] border-t border-black/10 pt-10 md:pt-14">
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
            <LinkedInButton />
            <a
              href={CONTACT_HREF}
              className="font-sans text-[1.375rem] font-medium leading-[1.1] text-black/70 transition-colors hover:text-black sm:ml-2 md:text-[1.75rem]"
            >
              Email me
            </a>
          </div>
        </section>
        <div className="mt-14 flex flex-col gap-4 border-t border-black/10 py-8 md:mt-16 md:flex-row md:items-center md:justify-between">
          <p className="font-sans text-[13px] text-black/55">
            © 2026 David Pindrys · Senior Product Designer · Boston, USA
          </p>
          <nav aria-label="Footer" className="flex flex-wrap gap-x-5 gap-y-2">
            <a href={`${linkBase}#work`} className={linkClass}>
              Work
            </a>
            <a href={`${linkBase}#services`} className={linkClass}>
              Services
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
