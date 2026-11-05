"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { heroBandClass } from "../lib/heroBand";
import { MessageIcon, TalkButton, useOpenContact } from "./ContactModal";

const linkClass =
  "font-sans text-[14px] leading-none text-black/70 transition-colors hover:text-black";

const menuLinkClass =
  "text-left font-sans text-[clamp(2.5rem,12vw,4rem)] font-normal leading-[1.05] tracking-[-0.035em] text-black";

export const CONTACT_HREF = "mailto:dpindrys@gmail.com";

const menuLinks = [
  { href: "#work", label: "Work" },
  { href: "#services", label: "Services" },
  { href: "#about", label: "About" },
] as const;

export default function Header() {
  const openContact = useOpenContact();
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [bandHeight, setBandHeight] = useState(0);
  const headerRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const lastY = useRef(0);
  const hiddenRef = useRef(false);
  const menuOpenRef = useRef(false);
  menuOpenRef.current = menuOpen;

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;
    const measure = () => setBandHeight(header.offsetHeight);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(header);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    lastY.current = window.scrollY;

    const mobileNav = () => window.matchMedia("(max-width: 767px)").matches;

    const showHeader = () => {
      if (!hiddenRef.current) return;
      hiddenRef.current = false;
      setHidden(false);
    };

    let linkScrolling = false;
    let linkScrollTimer: number | undefined;
    const endLinkScrollSoon = () => {
      clearTimeout(linkScrollTimer);
      linkScrollTimer = window.setTimeout(() => {
        linkScrolling = false;
      }, 200);
    };

    const onClick = (event: MouseEvent) => {
      if (mobileNav() || !(event.target instanceof Element)) return;
      const link = event.target.closest<HTMLAnchorElement>('a[href^="#"]');
      if (!link || link.getAttribute("href") === "#top") return;
      linkScrolling = true;
      endLinkScrollSoon();
    };

    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastY.current;
      if (menuOpenRef.current || mobileNav()) {
        lastY.current = y;
        showHeader();
        return;
      }
      let next = hiddenRef.current;
      if (y < 24) next = false;
      else if (linkScrolling) {
        next = true;
        endLinkScrollSoon();
      } else if (delta > 8) next = true;
      else if (delta < -8) next = false;
      lastY.current = y;
      if (next === hiddenRef.current) return;
      hiddenRef.current = next;
      setHidden(next);
    };

    const onNarrow = () => {
      if (mobileNav()) showHeader();
    };

    const narrowQuery = window.matchMedia("(max-width: 767px)");
    narrowQuery.addEventListener("change", onNarrow);
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("click", onClick);
    return () => {
      clearTimeout(linkScrollTimer);
      narrowQuery.removeEventListener("change", onNarrow);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("click", onClick);
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    const main = document.getElementById("main-content");
    const footer = document.querySelector("footer");
    main?.setAttribute("inert", "");
    footer?.setAttribute("inert", "");
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const visibleFocusable = () => {
      const root = headerRef.current;
      const menu = document.getElementById("mobile-nav");
      const nodes = [
        ...(root?.querySelectorAll<HTMLElement>("a[href], button:not([disabled])") ?? []),
        ...(menu?.querySelectorAll<HTMLElement>("a[href], button:not([disabled])") ?? []),
      ];
      return nodes.filter((el) => el.getClientRects().length > 0);
    };

    document.getElementById("mobile-nav")?.querySelector<HTMLElement>("a")?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setMenuOpen(false);
        menuButtonRef.current?.focus();
        return;
      }
      if (event.key !== "Tab") return;
      const items = visibleFocusable();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;
      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    const onResize = () => {
      if (window.matchMedia("(min-width: 768px)").matches) setMenuOpen(false);
    };

    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
      main?.removeAttribute("inert");
      footer?.removeAttribute("inert");
      document.body.style.overflow = previousOverflow;
    };
  }, [menuOpen]);

  const closeMenu = () => {
    setMenuOpen(false);
    menuButtonRef.current?.focus();
  };

  const concealed = hidden && !menuOpen;
  const onHome = usePathname() === "/";
  const sectionHref = (href: string) => (onHome ? href : `/${href}`);

  return (
    <>
    <header
      ref={headerRef}
      id="top"
      inert={concealed ? true : undefined}
      className={`fixed inset-x-0 top-0 z-40 w-full px-6 transition-transform duration-200 ease-out md:px-10 ${heroBandClass} ${
        concealed ? "pointer-events-none -translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="mx-auto flex w-full max-w-[1920px] items-center justify-between gap-x-4 py-6 md:py-8">
        <a
          href={onHome ? "#top" : "/"}
          onClick={(event) => {
            if (!onHome) {
              setMenuOpen(false);
              return;
            }
            event.preventDefault();
            setMenuOpen(false);
            const instant =
              window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
              window.matchMedia("(max-width: 767px)").matches;
            window.scrollTo({ top: 0, behavior: instant ? "auto" : "smooth" });
            history.replaceState(null, "", window.location.pathname + window.location.search);
          }}
          className="flex min-w-0 flex-col gap-1 font-sans leading-none"
        >
          <span className="text-[15px] font-semibold text-black">David Pindrys</span>
          <span className="text-[13px] text-black/55">Product Design · Human Factors · Boston</span>
        </a>
        <button
          ref={menuButtonRef}
          type="button"
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center text-black md:hidden"
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <MenuIcon open={menuOpen} />
        </button>
        <nav aria-label="Primary" className="hidden flex-wrap items-center gap-x-5 gap-y-2 md:flex md:gap-x-8">
          {menuLinks.map((link) => (
            <a key={link.href} href={sectionHref(link.href)} className={linkClass}>
              {link.label}
            </a>
          ))}
          <TalkButton variant="nav">Let&apos;s talk</TalkButton>
        </nav>
      </div>
    </header>
    {menuOpen ? (
      <div
        id="mobile-nav"
        className={`fixed inset-x-0 bottom-0 z-30 md:hidden ${heroBandClass}`}
        style={{ top: bandHeight }}
      >
        <nav aria-label="Sections" className="flex h-full flex-col justify-center gap-8 px-6">
          {menuLinks.map((link) => (
            <a key={link.href} href={sectionHref(link.href)} onClick={closeMenu} className={menuLinkClass}>
              {link.label}
            </a>
          ))}
          <button
            type="button"
            className="inline-flex w-fit items-center gap-[0.35em] bg-[#1F2621] px-[0.45em] py-[0.28em] text-left font-sans text-[clamp(2.5rem,12vw,4rem)] font-normal leading-[1.05] tracking-[-0.035em] text-[#F4F2EE] transition-colors hover:bg-[#2A332C]"
            onClick={() => {
              setMenuOpen(false);
              openContact(menuButtonRef.current);
            }}
          >
            Let&apos;s talk
            <MessageIcon />
          </button>
        </nav>
      </div>
    ) : null}
    <div aria-hidden="true" className={heroBandClass} style={{ height: bandHeight }} />
    </>
  );
}

function MenuIcon({ open }: { open: boolean }) {
  if (open) {
    return (
      <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true" fill="none">
        <path d="M3 3 L15 15 M15 3 L3 15" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    );
  }
  return (
    <svg width="22" height="16" viewBox="0 0 22 16" aria-hidden="true" fill="none">
      <path d="M1 1.5 H21" stroke="currentColor" strokeWidth="1.5" />
      <path d="M1 8 H21" stroke="currentColor" strokeWidth="1.5" />
      <path d="M1 14.5 H21" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
