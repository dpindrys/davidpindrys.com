import HoverControlsVideo from "../../components/HoverControlsVideo";

const VEHR_PROTOTYPE_VIDEO_SRC = "/videos/vehr/prototype.mp4";

export default function VehrDeviceHeroMockup() {
  return (
    <figure className="relative w-full max-w-image overflow-hidden">
      <HoverControlsVideo
        src={VEHR_PROTOTYPE_VIDEO_SRC}
        label="VEHR clinical sensemaking interface prototype"
        className="block h-auto w-full select-none"
      />
    </figure>
  );
}
