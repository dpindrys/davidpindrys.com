import { frxHeroFocusPills } from "../case-studies/frx/frxBelowHeroData";
import { vehrHeroFocusPills } from "../case-studies/visual-ehr/vehrBelowHeroData";

export const showcaseCardHrefs = new Set([
  "/case-studies/visual-ehr",
  "/case-studies/frx",
  "/case-studies/dell-childrens",
]);

export type FullShowcaseCard = {
  href: string;
  ariaLabel: string;
  title: string;
  descriptor: string;
  imageSrc: string;
  imageAlt: string;
  pills?: readonly string[];
};

export type StackedShowcaseCard = {
  href: string;
  ariaLabel: string;
  title: string;
  imageSrc: string;
  imageAlt: string;
  descriptor?: string;
  ctaLabel?: string;
};

export const homeFeaturedWorkCards: readonly FullShowcaseCard[] = [
  {
    href: "/case-studies/visual-ehr",
    ariaLabel: "Open VEHR case study",
    title: "Rebuilding chart review around the patient story",
    descriptor:
      "Built with a practicing physician to replace tab-by-tab navigation with a single timeline that aligns clinical data into a coherent narrative.",
    imageSrc: "/images/vehr/vehr-hero.png",
    imageAlt: "VEHR Technologies, patient timeline interface on iPad",
    pills: vehrHeroFocusPills,
  },
  {
    href: "/case-studies/frx",
    ariaLabel: "Open Fresenius case study",
    title: "A one-click refill workflow for 2,800+ dialysis clinics",
    descriptor:
      "Replaced the paper, fax, and phone-tag process nurses and dietitians had used for years, cutting refill time by 70%.",
    imageSrc: "/images/frx-card.png",
    imageAlt: "Fresenius refill workflow keeping key information in one place",
    pills: frxHeroFocusPills,
  },
];

export const additionalFullWorkCards: readonly FullShowcaseCard[] = [
  {
    href: "/case-studies/dell-childrens",
    ariaLabel: "Open Dell Children's Health Plan case study",
    title: "Responsive Care Access",
    descriptor:
      "Responsive portal for 40,000+ members for Dell Children's Health Plan",
    imageSrc: "/images/dchp-card.png",
    imageAlt: "Dell Children's Health Plan, responsive member portal",
  },
];

export const stackedWorkCards: readonly StackedShowcaseCard[] = [
  {
    href: "/case-studies/ovcp",
    ariaLabel: "Open OVCP case study",
    title: "Problem List Reconciliation",
    imageSrc: "/images/ovcp-card.png",
    imageAlt: "OVCP problem list reconciliation on iPad",
    descriptor:
      "DoD EHR usability research — co-designing problem list reconciliation with physicians.",
  },
  {
    href: "#",
    ariaLabel: "Picwell Medicare Part D plan selection",
    title: "Medicare Part-D Plan Selection",
    imageSrc: "/images/picwell-card.png",
    imageAlt: "Picwell Medicare Part D plan comparison experience",
    descriptor: "Helping members compare and choose Medicare Part D plans.",
    ctaLabel: "Case study coming soon",
  },
];

export const allFullWorkCards: readonly FullShowcaseCard[] = [
  ...homeFeaturedWorkCards,
  ...additionalFullWorkCards,
];
