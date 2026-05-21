import Link from "next/link";

type HomeShowcaseCardProps = {
  href: string;
  ariaLabel: string;
  title: string;
  descriptor: string;
  imageAlt: string;
  heroSrc: string;
  pills?: readonly string[];
  ctaLabel?: string;
};

const showcasePillClass =
  "inline-flex rounded-full border border-black/15 bg-transparent px-3 py-1 font-sans text-[12px] leading-none text-black/45";

const cardLinkClass =
  "group block w-full overflow-hidden rounded-2xl border border-black/10 bg-white shadow-[0_10px_30px_-22px_rgba(0,0,0,0.25)] transition-[transform,box-shadow] duration-200 ease-out hover:-translate-y-0.5 hover:shadow-[0_26px_70px_-26px_rgba(0,0,0,0.35)] active:translate-y-0 active:shadow-[0_14px_40px_-26px_rgba(0,0,0,0.28)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/25 focus-visible:ring-offset-2 focus-visible:ring-offset-[#F4F2EE]";

const heroImageClassVehir =
  "pointer-events-none absolute top-[5%] left-[-25%] h-[100%] w-auto min-w-[105%] max-w-none select-none object-cover object-[72%_28%] contrast-[1.05] saturate-[1.03] md:min-w-[107%] lg:min-w-[110%]";

const showcaseImagePanelPaddingClass = "p-7 md:p-9 lg:p-10";

const heroImageClassContained =
  "h-auto w-full max-h-full select-none rounded-2xl object-contain object-center";

function isContainedCardImage(src: string) {
  return src.includes("-card") || src.includes("vehr/vehr-hero");
}

function imagePanelClassFor(heroSrc: string) {
  const base =
    "order-1 flex min-h-[min(54vw,320px)] min-w-0 items-center justify-center bg-white md:order-none md:min-h-0";
  if (heroSrc.includes("dchp-card")) {
    return `${base} rounded-none overflow-visible ${showcaseImagePanelPaddingClass}`;
  }
  return `${base} ${showcaseImagePanelPaddingClass}`;
}

function heroImageClassFor(src: string) {
  if (src.includes("vehr-hero")) return heroImageClassVehir;
  return heroImageClassVehir;
}

const ctaLinkClass =
  "inline-flex w-fit font-sans text-[15px] font-semibold leading-none text-black transition-opacity group-hover:opacity-70 md:text-[16px]";

export default function HomeShowcaseCard({
  href,
  ariaLabel,
  title,
  descriptor,
  imageAlt,
  heroSrc,
  pills,
  ctaLabel = "View case study →",
}: HomeShowcaseCardProps) {
  return (
    <Link href={href} aria-label={ariaLabel} className={cardLinkClass}>
      <div className="grid w-full grid-cols-1 items-stretch md:min-h-[500px] md:grid-cols-2 md:gap-0 lg:min-h-[540px]">
        {isContainedCardImage(heroSrc) ? (
          <div className={imagePanelClassFor(heroSrc)}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={heroSrc}
              alt={imageAlt}
              className={heroImageClassContained}
              draggable={false}
            />
          </div>
        ) : (
          <div className="relative order-1 min-h-[min(54vw,320px)] min-w-0 overflow-hidden bg-white md:order-none md:min-h-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={heroSrc}
              alt=""
              className={heroImageClassFor(heroSrc)}
              draggable={false}
              aria-hidden
            />
            <span className="sr-only">{imageAlt}</span>
          </div>
        )}

        <div className="relative order-2 flex min-h-full min-w-0 flex-col justify-center bg-white py-10 md:order-none md:py-0">
          <div className="flex w-full min-w-0 flex-col gap-6 px-7 text-left md:px-9 lg:px-10">
            <div className="flex w-full flex-col gap-4">
              <h3 className="w-full font-sans text-[clamp(20px,2.1vw,26px)] font-semibold leading-[1.2] tracking-[-0.02em] text-black">
                {title}
              </h3>
              {descriptor ? (
                <p className="w-full font-sans text-[15px] font-normal leading-[1.6] text-black/70 md:text-[16px]">
                  {descriptor}
                </p>
              ) : null}
            </div>

            {pills && pills.length > 0 ? (
              <ul className="flex flex-wrap gap-2" aria-label="Focus areas">
                {pills.map((label) => (
                  <li key={label}>
                    <span className={showcasePillClass}>{label}</span>
                  </li>
                ))}
              </ul>
            ) : null}

            <span className={ctaLinkClass} aria-hidden>
              {ctaLabel}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
