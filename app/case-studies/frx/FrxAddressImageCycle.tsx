"use client";

import { useEffect, useState } from "react";

const SLIDES = [
  {
    src: "/images/frx/address1.png",
    durationMs: 2000,
    alt: "Shipping address step one in the refill workflow",
  },
  {
    src: "/images/frx/address2.png",
    durationMs: 1000,
    alt: "Shipping address step two in the refill workflow",
  },
  {
    src: "/images/frx/address3.png",
    durationMs: 3000,
    alt: "Shipping address step three in the refill workflow",
  },
] as const;

export default function FrxAddressImageCycle() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    let cancelled = false;
    let timeoutId: ReturnType<typeof setTimeout>;

    const schedule = (i: number) => {
      if (cancelled) return;
      const slide = SLIDES[i % SLIDES.length];
      setIndex(i % SLIDES.length);
      timeoutId = setTimeout(() => schedule(i + 1), slide.durationMs);
    };

    schedule(0);
    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
    };
  }, []);

  const slide = SLIDES[index];

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={slide.src}
      alt={slide.alt}
      className="block h-auto w-full rounded-md border-0"
    />
  );
}
