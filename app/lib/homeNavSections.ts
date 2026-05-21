export const HOME_NAV_SECTION_IDS = [
  "home",
  "work",
  "about",
  "contact",
] as const;

export type HomeNavSectionId = (typeof HOME_NAV_SECTION_IDS)[number];

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
