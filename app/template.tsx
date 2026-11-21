"use client";

import { instantScrollToTop } from "./lib/instantScrollToTop";
import { scrollToHomeSection } from "./lib/homeNavSections";
import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect } from "react";

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    const previous = history.scrollRestoration;
    history.scrollRestoration = "manual";
    return () => {
      history.scrollRestoration = previous;
    };
  }, []);

  // Before paint: land at top so we never flash mid-page content on route change.
  useLayoutEffect(() => {
    if (pathname !== "/") {
      instantScrollToTop();
    }
  }, [pathname]);

  // After Next.js ScrollAndFocusHandler (layout-router) may adjust scroll/focus.
  useEffect(() => {
    if (pathname !== "/") {
      instantScrollToTop();
      const afterFrame = requestAnimationFrame(() => {
        requestAnimationFrame(instantScrollToTop);
      });
      return () => cancelAnimationFrame(afterFrame);
    }
  }, [pathname]);

  useEffect(() => {
    if (pathname !== "/") {
      return;
    }

    const runScroll = () => scrollToHomeSection();

    const frame = requestAnimationFrame(() => {
      requestAnimationFrame(runScroll);
    });
    const delayed = window.setTimeout(runScroll, 280);

    window.addEventListener("hashchange", runScroll);
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(delayed);
      window.removeEventListener("hashchange", runScroll);
    };
  }, [pathname]);

  return (
    <div key={pathname} className="animate-page-fade-in">
      {children}
    </div>
  );
}