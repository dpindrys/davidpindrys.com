const VEHR_HERO_SRC = "/images/vehr/vehr-hero.png";

export default function VehrDeviceHeroMockup() {
  return (
    <figure
      className="relative w-full"
      aria-label="VEHR clinical sensemaking interface"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={VEHR_HERO_SRC}
        alt="VEHR patient timeline and clinical sensemaking interface"
        className="block h-auto w-full select-none"
        draggable={false}
      />
    </figure>
  );
}
