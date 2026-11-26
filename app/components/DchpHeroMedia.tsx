/** Web portal with the phone in front, on the shared hero background. */
export default function DchpHeroMedia({ framed = true }: { framed?: boolean }) {
  return (
    <div
      className={`group/dchp relative aspect-[16/10] w-full overflow-hidden ${
        framed ? "select-none rounded-[12px] border border-black/15" : ""
      }`}
    >
      {framed ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src="/images/dellchildrens/hero-bg.png"
          alt=""
          draggable={false}
          className="pointer-events-none absolute inset-0 h-full w-full object-cover"
        />
      ) : null}
      <div className="pointer-events-none absolute inset-0 origin-center transition-transform duration-500 ease-out motion-safe:group-hover/dchp:scale-[1.02] motion-reduce:transition-none">
        <div className="absolute left-[5%] top-1/2 w-[74%] -translate-y-1/2 overflow-hidden rounded-[12px] bg-white shadow-[0_24px_60px_-20px_rgba(15,40,80,0.35)]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/dellchildrens/home-desktop-89.png"
            alt=""
            draggable={false}
            className="block h-auto w-full"
          />
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/dellchildrens/home-mobile2.png"
          alt="Dell Children’s Health Plan member home on the web, with the phone screen in front showing quick links and covered members."
          draggable={false}
          className="absolute right-[4%] top-1/2 z-10 h-[88%] w-auto -translate-y-1/2 drop-shadow-[0_18px_36px_rgba(15,40,80,0.38)]"
        />
      </div>
    </div>
  );
}
