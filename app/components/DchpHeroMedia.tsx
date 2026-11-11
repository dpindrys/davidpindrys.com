import FloatingColumns from "./FloatingColumns";

/** Phone home screen beside drifting columns of portal screens. Render inside FloatingPlaybackProvider. */
export default function DchpHeroMedia() {
  return (
    <div className="group/dchp relative aspect-[16/10] w-full overflow-hidden rounded-[20px] border border-black/15">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/images/dellchildrens/hero-bg.png" alt="" className="absolute inset-0 h-full w-full object-cover" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/dellchildrens/home-mobile2.png"
        alt="Dell Children’s Health Plan member portal on a phone, showing the home screen quick links, alongside claims, care team, ID card request, and primary care physician screens."
        className="absolute left-[10%] top-[6%] h-auto w-[30%] origin-[50%_84%] transition-transform duration-500 ease-out motion-safe:group-hover/dchp:scale-[1.03] motion-reduce:transition-none"
      />
      <FloatingColumns
        className="absolute inset-y-0 left-[55%] right-[5%] grid grid-cols-2 gap-[5%]"
        columns={[
          {
            duration: 70,
            images: [
              { src: "/images/dellchildrens/all-claims.png", width: 343, height: 853 },
              { src: "/images/dellchildrens/care-team.png", width: 343, height: 645 },
            ],
          },
          {
            duration: 80,
            delay: 20,
            images: [
              { src: "/images/dellchildrens/claim.png", width: 375, height: 721 },
              { src: "/images/dellchildrens/request-cards.png", width: 343, height: 801 },
              { src: "/images/dellchildrens/choose-pcp.png", width: 343, height: 984 },
            ],
          },
        ]}
      />
    </div>
  );
}
