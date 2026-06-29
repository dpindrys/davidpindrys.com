const VEHR_PROTOTYPE_VIDEO_SRC = "/videos/vehr/prototype.mp4";

export default function VehrDeviceHeroMockup() {
  return (
    <figure
      className="relative w-full overflow-hidden rounded-lg"
      aria-label="VEHR clinical sensemaking interface"
    >
      <video
        className="block h-auto w-full select-none rounded-lg"
        src={VEHR_PROTOTYPE_VIDEO_SRC}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden
      />
    </figure>
  );
}
