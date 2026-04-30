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

      {/* Right: Download Resume */}
      <a
        href="https://drive.google.com/file/d/1kZjDNW5V1YBmsooHxHyb7NuMqLF4q2Nw/view?usp=sharing"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2.5 font-sans font-bold text-[20px] leading-[1.21] text-black hover:opacity-60 transition-opacity"
      >
        <span>Download Resume</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="shrink-0"
          aria-hidden="true"
        >
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
      </a>
    </header>
  );
}
