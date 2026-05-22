import Link from "next/link";

import HomeShowcaseCard from "./HomeShowcaseCard";
import HomeShowcaseStackedCard from "./HomeShowcaseStackedCard";
import {
  showcaseCardHrefs,
  type FullShowcaseCard,
  type StackedShowcaseCard,
} from "../lib/selectedWorkCards";

const selectedWorkCardLinkClass =
  "block w-full rounded-2xl border border-black/10 bg-white/50 p-8 transition-[transform,box-shadow] duration-200 ease-out shadow-[0_10px_30px_-22px_rgba(0,0,0,0.25)] hover:-translate-y-0.5 hover:shadow-[0_26px_70px_-26px_rgba(0,0,0,0.35)] active:translate-y-0 active:shadow-[0_14px_40px_-26px_rgba(0,0,0,0.28)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/25 focus-visible:ring-offset-2 focus-visible:ring-offset-[#F4F2EE] md:p-10 lg:p-12";

function FullWorkCard({
  card,
  layout = "featured",
}: {
  card: FullShowcaseCard;
  layout?: "featured" | "stacked";
}) {
  if (showcaseCardHrefs.has(card.href)) {
    return (
      <HomeShowcaseCard
        href={card.href}
        ariaLabel={card.ariaLabel}
        title={card.title}
        descriptor={card.descriptor}
        imageAlt={card.imageAlt}
        heroSrc={card.imageSrc}
        pills={card.pills}
        layout={layout}
      />
    );
  }

  return (
    <Link
      href={card.href}
      aria-label={card.ariaLabel}
      className={selectedWorkCardLinkClass}
    >
      <div className="grid w-full grid-cols-1 items-center gap-8 md:grid-cols-[minmax(0,0.95fr)_minmax(0,1.25fr)] md:gap-10 lg:gap-14">
        <div className="order-1 flex min-w-0 flex-col justify-center gap-3 md:max-w-md lg:max-w-lg">
          <h3 className="font-sans text-[clamp(22px,2.5vw,28px)] font-semibold leading-[1.2] tracking-tight text-black">
            {card.title}
          </h3>
          <p className="font-sans text-[16px] font-normal leading-[1.55] text-black/70 md:text-[17px]">
            {card.descriptor}
          </p>
        </div>
        <div className="order-2 min-w-0 w-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={card.imageSrc}
            alt={card.imageAlt}
            className="block h-auto w-full rounded-2xl border border-black/10 bg-white/40 shadow-[0_8px_32px_-16px_rgba(0,0,0,0.12)]"
          />
        </div>
      </div>
    </Link>
  );
}

export default function SelectedWorkGrid({
  fullCards,
  stackedCards = [],
  layout = "list",
}: {
  fullCards: readonly FullShowcaseCard[];
  stackedCards?: readonly StackedShowcaseCard[];
  layout?: "list" | "twoUp";
}) {
  if (layout === "twoUp") {
    return (
      <div className="grid w-full grid-cols-1 items-stretch gap-10 md:grid-cols-2 md:gap-8 lg:gap-10">
        {fullCards.map((card) => (
          <FullWorkCard key={card.href} card={card} layout="stacked" />
        ))}
        {stackedCards.map((card) => (
          <HomeShowcaseStackedCard
            key={card.title}
            href={card.href}
            ariaLabel={card.ariaLabel}
            title={card.title}
            imageSrc={card.imageSrc}
            imageAlt={card.imageAlt}
            descriptor={card.descriptor}
            ctaLabel={card.ctaLabel}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-10 md:gap-12 lg:gap-14">
      {fullCards.map((card) => (
        <FullWorkCard key={card.href} card={card} />
      ))}
      {stackedCards.length > 0 ? (
        <div className="grid w-full grid-cols-1 gap-10 md:grid-cols-2 md:gap-8 lg:gap-10">
          {stackedCards.map((card) => (
            <HomeShowcaseStackedCard
              key={card.title}
              href={card.href}
              ariaLabel={card.ariaLabel}
              title={card.title}
              imageSrc={card.imageSrc}
              imageAlt={card.imageAlt}
              descriptor={card.descriptor}
              ctaLabel={card.ctaLabel}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
