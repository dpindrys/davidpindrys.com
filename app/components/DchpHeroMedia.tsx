import { versionedSrc } from "../lib/versionedSrc";
import FloatingColumns from "./FloatingColumns";

const screen = (src: string, width: number, height: number) => ({ src: versionedSrc(src), width, height });

/** Phone home screen beside drifting columns of portal screens. Render inside FloatingPlaybackProvider. */
export default function DchpHeroMedia() {
  return (
    <div className="group/dchp relative aspect-[16/10] w-full overflow-hidden rounded-[20px] border border-black/15">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/images/dellchildrens/hero-bg.png" alt="" className="absolute inset-0 h-full w-full object-cover" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/dellchildrens/home-mobile2.png"
        alt="Dell Children’s Health Plan member portal on a phone, showing the home screen quick links, alongside care team, provider results, claims, and ID card request screens."
        className="absolute left-[10%] top-[6%] h-auto w-[30%] origin-[50%_84%] transition-transform duration-500 ease-out motion-safe:group-hover/dchp:scale-[1.03] motion-reduce:transition-none"
      />
      <FloatingColumns
        className="absolute inset-y-0 left-[55%] right-[5%] grid grid-cols-2 gap-[5%]"
        columns={[
          {
            duration: 70,
            images: [
              screen("/images/dellchildrens/carestart.png", 367, 570),
              screen("/images/dellchildrens/home-long.png", 367, 1156),
              screen("/images/dellchildrens/all-claims.png", 343, 853),
            ],
          },
          {
            duration: 80,
            delay: 20,
            images: [
              screen("/images/dellchildrens/careteam2x.png", 367, 1211),
              screen("/images/dellchildrens/request-cards.png", 343, 801),
              screen("/images/dellchildrens/claim.png", 375, 721),
            ],
          },
        ]}
      />
    </div>
  );
}
