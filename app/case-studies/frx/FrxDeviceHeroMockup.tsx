import HoverControlsVideo from "../../components/HoverControlsVideo";

const FRX_HERO_VIDEO_SRC = "/images/frx/fresenius.mp4";

export default function FrxDeviceHeroMockup() {
  return (
    <figure className="relative w-full overflow-hidden rounded-[16px] border border-black/15">
      <HoverControlsVideo
        src={FRX_HERO_VIDEO_SRC}
        label="In-clinic digital refill workflow in CareTeamHub"
        className="block h-auto w-full rounded-[16px]"
        style={{
          transform: "scale(0.985)",
          transformOrigin: "center",
          clipPath: "inset(0 0 0 1px round 16px)",
        }}
      />
    </figure>
  );
}
