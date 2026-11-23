"use client";

import Link from "next/link";
import type { ReactNode } from "react";

import { instantScrollToTop } from "../lib/instantScrollToTop";

export default function CaseStudyHeroLink({
  href,
  label,
  children,
  className,
}: {
  href: string;
  label: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      aria-label={label}
      onClick={instantScrollToTop}
      className={
        className ??
        "block w-full cursor-pointer rounded-[12px] outline-none focus-visible:ring-2 focus-visible:ring-black/25 focus-visible:ring-offset-2 focus-visible:ring-offset-[#F4F2EE]"
      }
    >
      {children}
    </Link>
  );
}