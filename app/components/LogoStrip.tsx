const logos = [
  { src: "/images/DoD-logo.png", alt: "Department of Defense" },
  { src: "/images/UHG-logo.png", alt: "UnitedHealth Group" },
  { src: "/images/ascension-logo.png", alt: "Ascension" },
  { src: "/images/fresenius-logo.png", alt: "Fresenius Medical Care" },
  { src: "/images/kaiser-logo.png", alt: "Kaiser Permanente" },
];

const imgBase =
  "w-auto max-w-[42vw] object-contain grayscale opacity-60 sm:max-w-[40vw] md:max-w-none shrink-0 h-32 sm:h-36 md:h-40";

export default function LogoStrip() {
  return (
    <div
      className="grid w-full grid-cols-2 items-center justify-items-center gap-x-4 gap-y-8 px-3 sm:gap-x-6 sm:gap-y-10 sm:px-4 md:flex md:flex-nowrap md:justify-center md:gap-16 md:px-0"
      aria-label="Organizations"
    >
      {logos.map((logo, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={logo.src}
          src={logo.src}
          alt={logo.alt}
          className={`${imgBase} ${i === logos.length - 1 ? "col-span-2 md:col-span-1" : ""}`}
        />
      ))}
    </div>
  );
}
