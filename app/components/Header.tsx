export default function Header() {
  return (
    <header className="flex items-center justify-between w-full">
      {/* Left: avatar + name + location */}
      <div className="flex items-center gap-5">
        {/* Profile photo */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/profile.png"
          alt="David Pindrys"
          className="w-[63px] h-[63px] rounded-full object-cover shrink-0"
        />
        <span className="font-sans text-[20px] leading-[1.21] text-black tracking-tight">
          <span className="font-bold">David Pindrys</span>
          <span className="hidden md:inline font-normal">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Boston, USA
          </span>
        </span>
      </div>

      {/* Right: Download CV */}
      <a
        href="https://drive.google.com/file/d/1qBAF8g5JQp4q7NWs0AghUgfpHcGIf-J9/view?usp=sharing"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2.5 font-sans font-bold text-[20px] leading-[1.21] text-black hover:opacity-60 transition-opacity"
      >
        <span>Download CV</span>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/cv-icon.png"
          alt=""
          className="h-10 w-10 shrink-0 object-contain brightness-0"
          aria-hidden="true"
        />
      </a>
    </header>
  );
}
