export const CONTACT_HREF = "mailto:dpindrys@gmail.com";

const linkClass =
  "font-sans text-[14px] leading-none text-black/70 transition-colors hover:text-black";

export default function Header() {
  return (
    <header id="top" className="w-full px-6 md:px-10">
      <div className="mx-auto flex w-full max-w-[1040px] items-center justify-between gap-6 py-6 md:py-8">
        <a href="#top" className="flex flex-col gap-1 font-sans leading-none">
          <span className="text-[15px] font-semibold text-black">David Pindrys</span>
          <span className="text-[13px] text-black/55">Healthcare product design</span>
        </a>
        <nav aria-label="Primary" className="flex items-center gap-6 md:gap-8">
          <a href="#work" className={`${linkClass} hidden sm:inline`}>
            Selected impact
          </a>
          <a href="#approach" className={`${linkClass} hidden sm:inline`}>
            Approach
          </a>
          <a href={CONTACT_HREF} className={linkClass}>
            Let’s talk <span aria-hidden>↗</span>
          </a>
        </nav>
      </div>
    </header>
  );
}
