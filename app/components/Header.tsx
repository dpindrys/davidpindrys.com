"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const RESUME_HREF =
  "https://drive.google.com/file/d/1kZjDNW5V1YBmsooHxHyb7NuMqLF4q2Nw/view?usp=sharing";
const LINKEDIN_HREF = "https://www.linkedin.com/in/dpindrys";

import {
  HOME_NAV_SECTION_IDS,
  type HomeNavSectionId,
} from "../lib/homeNavSections";

const navLinks: readonly {
  id: HomeNavSectionId;
  href: string;
  label: string;
}[] = [
  { id: "home", href: "/#home", label: "Home" },
  { id: "work", href: "/work", label: "Work" },
  { id: "about", href: "/#about", label: "About" },
  { id: "contact", href: "/#contact", label: "Contact" },
];

const navShellClass = "flex flex-row items-center justify-center gap-1";

const navItemBaseClass =
  "rounded-[10px] px-3 py-2 font-sans text-[13px] font-normal leading-none transition-colors duration-200 md:px-3.5 md:py-2.5 md:text-[14px]";

function navItemClass(active: boolean, workOnCaseStudy: boolean) {
  if (workOnCaseStudy) {
    return `${navItemBaseClass} text-black shadow-[inset_0_0_0_3px_rgba(0,0,0,0.06)] hover:bg-black/[0.06] hover:shadow-none`;
  }
  if (active) {
    return `${navItemBaseClass} bg-black/[0.06] text-black`;
  }
  return `${navItemBaseClass} text-gray-800 hover:bg-black/[0.04] hover:text-black`;
}

const actionItemClass =
  "inline-flex items-center gap-1.5 rounded-[10px] px-3 py-2 font-sans text-[13px] font-normal leading-none text-gray-800 transition-colors duration-200 hover:bg-black/[0.04] hover:text-black md:px-3.5 md:py-2.5 md:text-[14px]";

function DownloadIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="shrink-0"
      aria-hidden
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

function ExternalLinkIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="shrink-0"
      aria-hidden
    >
      <path d="M7 17 17 7" />
      <path d="M7 7h10v10" />
    </svg>
  );
}

function useHomeScrollSpy(enabled: boolean) {
  const [activeSection, setActiveSection] =
    useState<HomeNavSectionId>("home");

  useEffect(() => {
    if (!enabled) {
      setActiveSection("home");
      return;
    }

    const sections = HOME_NAV_SECTION_IDS.map((id) =>
      document.getElementById(id),
    ).filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const ratios = new Map<string, number>();

    const pickActive = () => {
      let bestId: HomeNavSectionId = "home";
      let bestRatio = -1;
      for (const id of HOME_NAV_SECTION_IDS) {
        const ratio = ratios.get(id) ?? 0;
        if (ratio > bestRatio) {
          bestRatio = ratio;
          bestId = id;
        }
      }
      setActiveSection(bestId);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          ratios.set(entry.target.id, entry.intersectionRatio);
        }
        pickActive();
      },
      {
        rootMargin: "-12% 0px -50% 0px",
        threshold: [0, 0.08, 0.15, 0.25, 0.4, 0.55, 0.7],
      },
    );

    for (const section of sections) {
      observer.observe(section);
    }

    const onScroll = () => {
      if (window.scrollY < 80) {
        setActiveSection("home");
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [enabled]);

  useEffect(() => {
    if (!enabled) return;
    const nextUrl =
      activeSection === "home" ? "/" : `/#${activeSection}`;
    const current = `${window.location.pathname}${window.location.hash}`;
    if (current !== nextUrl) {
      window.history.replaceState(null, "", nextUrl);
    }
  }, [activeSection, enabled]);

  return activeSection;
}

export default function Header() {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const onWorkPage = pathname === "/work";
  const onCaseStudy = pathname.startsWith("/case-studies");
  const activeSection = useHomeScrollSpy(onHome);

  const isLinkActive = (link: (typeof navLinks)[number]) => {
    if (link.id === "work" && (onWorkPage || onCaseStudy)) {
      return true;
    }
    if (!onHome) {
      return false;
    }
    return activeSection === link.id;
  };

  return (
    <>
      <header className="pointer-events-none fixed top-5 left-0 right-0 z-50 flex justify-center px-8 lg:px-16">
        <div className="pointer-events-auto w-full max-w-[1200px]">
          <div className="flex w-[calc(100%+4rem)] max-w-none -mx-8 items-center gap-2 rounded-xl border border-black/10 bg-white/90 p-1.5 md:gap-3 md:p-2 lg:w-[calc(100%+8rem)] lg:-mx-16">
            <Link
              href="/#home"
              className="flex min-w-0 shrink-0 items-center gap-2.5 rounded-[10px] py-1 pl-1 pr-2 transition-colors hover:bg-black/[0.03] md:gap-3 md:pr-3"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/profile.png"
                alt="David Pindrys"
                className="h-9 w-9 shrink-0 rounded-full object-cover md:h-10 md:w-10"
              />
              <span className="flex min-w-0 flex-col gap-0.5 font-sans text-[13px] leading-tight tracking-tight text-black md:text-[14px]">
                <span className="font-bold">David Pindrys</span>
                <span className="font-normal text-gray-800">Boston, USA</span>
              </span>
            </Link>

            <nav
              className={`${navShellClass} mx-auto flex min-w-0 flex-1 justify-center`}
              aria-label="Primary"
            >
              {navLinks.map((link) => {
                const active = isLinkActive(link);
                const workOnCaseStudy = link.id === "work" && onCaseStudy;

                return (
                  <Link
                    key={link.id}
                    href={link.href}
                    className={navItemClass(active, workOnCaseStudy)}
                    aria-current={active ? "page" : undefined}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            <div className="ml-auto flex shrink-0 flex-row gap-1">
              <a
                href={RESUME_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className={actionItemClass}
              >
                <span>Resume</span>
                <DownloadIcon />
              </a>
              <a
                href={LINKEDIN_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className={actionItemClass}
              >
                <span>LinkedIn</span>
                <ExternalLinkIcon />
              </a>
            </div>
          </div>
        </div>
      </header>

      <div className="h-[5.25rem] shrink-0 md:h-[5.75rem]" aria-hidden />
    </>
  );
}
