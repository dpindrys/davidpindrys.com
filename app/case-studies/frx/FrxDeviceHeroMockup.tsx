const FRX_HERO_VIDEO_SRC = "/images/frx/fresenius.mp4";

export default function FrxDeviceHeroMockup() {
  return (
    <figure
      className="relative w-full overflow-hidden rounded-2xl"
      aria-label="In-clinic digital refill workflow in CareTeamHub"
    >
      <video
        className="block h-auto w-full rounded-2xl"
        src={FRX_HERO_VIDEO_SRC}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        style={{
          transform: "scale(0.985)",
          transformOrigin: "center",
          clipPath: "inset(0 0 0 1px round 16px)",
        }}
        aria-hidden
      />
    </figure>
  );
}
