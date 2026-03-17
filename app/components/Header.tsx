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
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <span className="font-normal">Boston, USA</span>
        </span>
      </div>

      {/* Right: Download CV */}
      <a
        href="#"
        className="flex items-center gap-2.5 font-sans font-bold text-[20px] leading-[1.21] text-black hover:opacity-60 transition-opacity"
      >
        <span>Download CV</span>
        {/* CV icon */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/cv-icon.png"
          alt=""
          className="w-[63px] h-[63px] object-contain"
          aria-hidden="true"
        />
      </a>
    </header>
  );
}
