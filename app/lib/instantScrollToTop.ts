/** Jump to the top without animating (bypasses `html { scroll-behavior: smooth }`). */
export function instantScrollToTop() {
  if (typeof window === "undefined") return;

  const html = document.documentElement;
  const previous = html.style.scrollBehavior;
  html.style.scrollBehavior = "auto";
  // Chrome needs reflow before scroll picks up scrollBehavior (see Next.js disable-smooth-scroll).
  html.getClientRects();
  window.scrollTo(0, 0);
  html.scrollTop = 0;
  document.body.scrollTop = 0;
  html.style.scrollBehavior = previous;
}