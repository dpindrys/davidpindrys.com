const logos = [
  { src: "/images/DoD-logo.png", alt: "Department of Defense" },
  { src: "/images/UHG-logo.png", alt: "UnitedHealth Group" },
  { src: "/images/ascension-logo.png", alt: "Ascension" },
  { src: "/images/fresenius-logo.png", alt: "Fresenius Medical Care" },
  { src: "/images/kaiser-logo.png", alt: "Kaiser Permanente" },
];

export default function LogoStrip() {
  return (
    <div className="flex items-center justify-between w-full gap-16">
      {logos.map((logo) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={logo.src}
          src={logo.src}
          alt={logo.alt}
          className="h-40 w-auto object-contain grayscale opacity-60"
        />
      ))}
    </div>
  );
}
