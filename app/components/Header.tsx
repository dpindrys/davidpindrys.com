import { TalkButton } from "./ContactModal";

const linkClass =
  "font-sans text-[14px] leading-none text-black/70 transition-colors hover:text-black";

export const CONTACT_HREF = "mailto:dpindrys@gmail.com";

export default function Header() {
  return (
    <header id="top" className="w-full px-6 md:px-10">
      <div className="mx-auto flex w-full max-w-[1040px] flex-wrap items-center justify-between gap-x-6 gap-y-3 py-6 md:py-8">
        <a href="#top" className="flex flex-col gap-1 font-sans leading-none">
          <span className="text-[15px] font-semibold text-black">David Pindrys</span>
          <span className="text-[13px] text-black/55">Healthcare product design</span>
        </a>
        <nav aria-label="Primary" className="flex flex-wrap items-center gap-x-5 gap-y-2 md:gap-x-8">
          <a href="#work" className={linkClass}>
            Work
          </a>
          <a href="#approach" className={linkClass}>
            Approach
          </a>
          <a href="#services" className={linkClass}>
            Services
          </a>
          <TalkButton variant="nav">Let&apos;s talk</TalkButton>
        </nav>
      </div>
    </header>
  );
}
