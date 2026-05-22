"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const RESUME_HREF =
  "https://drive.google.com/file/d/1kZjDNW5V1YBmsooHxHyb7NuMqLF4q2Nw/view?usp=sharing";
const LINKEDIN_HREF = "https://www.linkedin.com/in/dpindrys";

const navLinks = [
  { id: "home", href: "/", label: "Home" },
  { id: "work", href: "/work", label: "Work" },
  { id: "about", href: "/about", label: "About" },
  { id: "contact", href: "/contact", label: "Contact" },
] as const;

const mobileMenuNavLinks = navLinks.filter((link) => link.id !== "home");

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

const mobileMenuItemClass =
  "block w-full rounded-[10px] px-3 py-3 font-sans text-[15px] font-normal leading-none text-gray-800 transition-colors hover:bg-black/[0.04] hover:text-black";

const barShellClass =
  "rounded-xl border border-black/10 bg-white/90 p-1.5 md:gap-3 md:p-2";

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

function ProfileLink({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={
        className ??
        "flex min-w-0 shrink-0 items-center gap-2.5 rounded-[10px] py-1 pl-1 pr-2 transition-colors hover:bg-black/[0.03]"
      }
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/profile.png"
        alt="David Pindrys"
        className="h-9 w-9 shrink-0 rounded-full object-cover"
      />
      <span className="flex min-w-0 flex-col gap-0.5 font-sans text-[13px] leading-tight tracking-tight text-black">
        <span className="font-bold">David Pindrys</span>
        <span className="font-normal text-gray-800">Boston, USA</span>
      </span>
    </Link>
  );
}

function ActionLinks() {
  return (
    <>
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
    </>
  );
}

function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      className="text-black"
      aria-hidden
    >
      {open ? (
        <>
          <path d="M6 6l12 12" />
          <path d="M18 6 6 18" />
        </>
      ) : (
        <>
          <path d="M4 7h16" />
          <path d="M4 12h16" />
          <path d="M4 17h16" />
        </>
      )}
    </svg>
  );
}

function useMobileHeaderOnScrollUp(menuOpen: boolean) {
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");

    const onScroll = () => {
      if (mq.matches) return;

      const y = window.scrollY;
      const delta = y - lastScrollY.current;

      if (menuOpen) {
        setVisible(true);
        lastScrollY.current = y;
        return;
      }

      if (y < 16) {
        setVisible(true);
      } else if (delta < -6) {
        setVisible(true);
      } else if (delta > 6) {
        setVisible(false);
      }

      lastScrollY.current = y;
    };

    const onResize = () => {
      if (mq.matches) setVisible(true);
    };

    lastScrollY.current = window.scrollY;
    window.addEventListener("scroll", onScroll, { passive: true });
    mq.addEventListener("change", onResize);

    return () => {
      window.removeEventListener("scroll", onScroll);
      mq.removeEventListener("change", onResize);
    };
  }, [menuOpen]);

  return visible;
}

export default function Header() {
  const pathname = usePathname();
  const onWorkPage = pathname === "/work";
  const onCaseStudy = pathname.startsWith("/case-studies");
  const [menuOpen, setMenuOpen] = useState(false);
  const mobileBarVisible = useMobileHeaderOnScrollUp(menuOpen);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  const isLinkActive = (link: (typeof navLinks)[number]) => {
    if (link.id === "work") {
      return onWorkPage || onCaseStudy;
    }
    if (link.id === "home") {
      return pathname === "/";
    }
    return pathname === link.href;
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 w-full border-b border-black/10 bg-white transition-transform duration-300 ease-out md:pointer-events-none md:top-5 md:border-b-0 md:bg-transparent md:duration-0 ${
          mobileBarVisible ? "translate-y-0" : "-translate-y-full"
        } md:translate-y-0`}
      >
        {/* Mobile */}
        <div className="pointer-events-auto mx-auto w-full max-w-[1200px] md:hidden">
          <div className="flex items-center justify-between gap-4 px-8 py-3 lg:px-16">
            <ProfileLink className="flex min-w-0 items-center gap-2.5 py-0.5 pl-0 pr-0" />
            <button
              type="button"
              className="inline-flex shrink-0 items-center justify-center rounded-[10px] p-2 text-black transition-colors hover:bg-black/[0.04]"
              aria-expanded={menuOpen}
              aria-controls="mobile-nav-menu"
              onClick={() => setMenuOpen((open) => !open)}
            >
              <span className="sr-only">{menuOpen ? "Close menu" : "Open menu"}</span>
              <HamburgerIcon open={menuOpen} />
            </button>
          </div>

          {menuOpen ? (
            <nav
              id="mobile-nav-menu"
              className="border-t border-black/[0.06] px-8 py-4 lg:px-16"
              aria-label="Mobile"
            >
              <ul className="flex flex-col gap-1">
                {mobileMenuNavLinks.map((link) => {
                  const active = isLinkActive(link);
                  const workOnCaseStudy = link.id === "work" && onCaseStudy;

                  return (
                    <li key={link.id}>
                      <Link
                        href={link.href}
                        className={`${mobileMenuItemClass} ${
                          active
                            ? "bg-black/[0.06] font-semibold text-black"
                            : ""
                        } ${
                          workOnCaseStudy
                            ? "shadow-[inset_0_0_0_2px_rgba(0,0,0,0.06)]"
                            : ""
                        }`}
                        aria-current={active ? "page" : undefined}
                        onClick={() => setMenuOpen(false)}
                      >
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
              <div className="mt-3 flex flex-col gap-1 border-t border-black/[0.06] pt-3">
                <a
                  href={RESUME_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={mobileMenuItemClass}
                  onClick={() => setMenuOpen(false)}
                >
                  <span className="inline-flex items-center gap-1.5">
                    Resume
                    <DownloadIcon />
                  </span>
                </a>
                <a
                  href={LINKEDIN_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={mobileMenuItemClass}
                  onClick={() => setMenuOpen(false)}
                >
                  <span className="inline-flex items-center gap-1.5">
                    LinkedIn
                    <ExternalLinkIcon />
                  </span>
                </a>
              </div>
            </nav>
          ) : null}
        </div>

        {/* Desktop */}
        <div className="pointer-events-none hidden justify-center px-8 lg:px-16 md:flex">
          <div className="pointer-events-auto w-full max-w-[1200px]">
            <div
              className={`flex w-[calc(100%+4rem)] max-w-none -mx-8 items-center gap-2 lg:w-[calc(100%+8rem)] lg:-mx-16 ${barShellClass}`}
            >
              <ProfileLink className="flex min-w-0 shrink-0 items-center gap-2.5 rounded-[10px] py-1 pl-1 pr-2 transition-colors hover:bg-black/[0.03] md:gap-3 md:pr-3" />

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
                <ActionLinks />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile: reserve space for fixed bar */}
      <div className="h-14 shrink-0 md:hidden" aria-hidden />

      <div className="hidden h-[5.25rem] shrink-0 md:block md:h-[5.75rem]" aria-hidden />
    </>
  );
}
