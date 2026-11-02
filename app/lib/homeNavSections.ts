/** Scroll to a home-page section when landing with a hash (e.g. /#about). */
export function scrollToHomeSection(hash?: string) {
  const id =
    hash?.replace("#", "") ||
    window.location.hash.replace("#", "") ||
    "home";
  const el = document.getElementById(id);
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const mobile = window.matchMedia("(max-width: 767px)").matches;
  const behavior = reduceMotion || mobile ? "auto" : "smooth";
  if (el) {
    el.scrollIntoView({ block: "start", behavior });
    return;
  }
  window.scrollTo({ top: 0, behavior });
}
