import { TalkButton } from "./ContactModal";
import { CONTACT_HREF } from "./Header";
import LinkedInButton from "./LinkedInButton";
import { buttonTextClass } from "./buttonTokens";
import { heroBandClass } from "../lib/heroBand";
import { bodyClass, sideLeadClass } from "../lib/pageStyles";

const linkClass = "font-sans text-[13px] text-black/80 transition-colors hover:text-black";

export default function Footer({ linkBase = "" }: { linkBase?: string }) {
  return (
    <footer className={`w-full px-6 md:px-10 ${heroBandClass}`}>
      <div className="mx-auto w-full max-w-[1200px] border-t border-black/10 pt-10 md:pt-14">
        <section id="contact" aria-labelledby="contact-title" className="scroll-mt-8">
          <h2 id="contact-title" className={`max-w-[16ch] ${sideLeadClass}`}>
            Got a workflow that&apos;s hard to explain?
          </h2>
          <p className={`mt-6 max-w-[36rem] ${bodyClass}`}>
            Tell me what you&apos;re working on. A workflow, a prototype, an accessibility question, or
            something you&apos;re not sure about yet.
          </p>
          <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4 md:mt-10">
            <TalkButton>Let&apos;s talk</TalkButton>
            <LinkedInButton />
            <a href={CONTACT_HREF} className={buttonTextClass}>
              Email me
            </a>
          </div>
        </section>
        <div className="mt-14 flex flex-col gap-4 border-t border-black/10 py-8 md:mt-16 md:flex-row md:items-center md:justify-between">
          <p className="font-sans text-[13px] text-black/80">
            © 2026 David Pindrys · Boston, USA
          </p>
          <nav aria-label="Footer" className="flex flex-wrap gap-x-5 gap-y-2">
            <a href={`${linkBase}#work`} className={linkClass}>
              Work
            </a>
            <a href={`${linkBase}#services`} className={linkClass}>
              Services
            </a>
            <a href={`${linkBase}#process`} className={linkClass}>
              About
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
