import Link from "next/link";

type HomeShowcaseStackedCardProps = {
  href: string;
  ariaLabel: string;
  title: string;
  imageSrc: string;
  imageAlt: string;
  descriptor?: string;
  ctaLabel?: string;
};

const cardLinkClass =
  "group flex h-full min-h-0 flex-col overflow-hidden rounded-2xl border border-black/10 bg-white shadow-[0_10px_30px_-22px_rgba(0,0,0,0.25)] transition-[transform,box-shadow] duration-200 ease-out hover:-translate-y-0.5 hover:shadow-[0_26px_70px_-26px_rgba(0,0,0,0.35)] active:translate-y-0 active:shadow-[0_14px_40px_-26px_rgba(0,0,0,0.28)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/25 focus-visible:ring-offset-2 focus-visible:ring-offset-[#F4F2EE]";

const imagePanelClass =
  "flex min-h-[min(44vw,240px)] w-full items-center justify-center bg-white p-6 md:min-h-[220px] md:p-7 lg:p-8";

const imageClass =
  "h-auto w-full max-h-full select-none rounded-2xl object-contain object-center";

const ctaLinkClass =
  "inline-flex w-fit font-sans text-[15px] font-semibold leading-none text-black transition-opacity group-hover:opacity-70";

export default function HomeShowcaseStackedCard({
  href,
  ariaLabel,
  title,
  imageSrc,
  imageAlt,
  descriptor,
  ctaLabel = "View case study →",
}: HomeShowcaseStackedCardProps) {
  return (
    <Link href={href} aria-label={ariaLabel} className={cardLinkClass}>
      <div className={imagePanelClass}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={imageSrc} alt={imageAlt} className={imageClass} draggable={false} />
      </div>
      <div className="flex flex-1 flex-col justify-center gap-4 px-6 py-7 md:px-7 md:py-8 lg:px-8">
        <h3 className="font-sans text-[clamp(18px,2vw,22px)] font-semibold leading-[1.2] tracking-[-0.02em] text-black">
          {title}
        </h3>
        {descriptor ? (
          <p className="font-sans text-[14px] font-normal leading-[1.55] text-black/70 md:text-[15px]">
            {descriptor}
          </p>
        ) : null}
        <span className={ctaLinkClass} aria-hidden>
          {ctaLabel}
        </span>
      </div>
    </Link>
  );
}
