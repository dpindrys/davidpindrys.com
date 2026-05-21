"use client";

import { scrollToHomeSection } from "./lib/homeNavSections";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== "/") {
      window.scrollTo(0, 0);
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
