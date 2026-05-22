/** Scroll to a home-page section when landing with a hash (e.g. /#about). */
export function scrollToHomeSection(hash?: string) {
  const id =
    hash?.replace("#", "") ||
    window.location.hash.replace("#", "") ||
    "home";
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ block: "start" });
    return;
  }
  window.scrollTo(0, 0);
}
