export const dellBelowHeroMeta = [
  { label: "Client", value: "Dell Children’s Health Plan" },
  { label: "Timeline", value: "4 months" },
  { label: "Status", value: "Launched" },
] as const;

export const dellOverviewSection = {
  eyebrow: "Overview",
  body: "I led design of a children’s Medicaid member portal, launching care team, ID card, and prior authorization tools for 40,000+ members in four months.",
} as const;

export const dellHomeSection = {
  title: "Routine tasks, with the family in view",
  body: "The home screen opens on the signed-in member. Quick links lead to the care team, a provider search, ID cards, and plan coverage. Each covered family member has their own ID card, handbook, and care team.",
  imageSrc: "/images/dellchildrens/home-desktop-89.png",
  imageAlt:
    "Dell Children’s Health Plan home for Mali Khandavalli, with quick links and a plan overview listing two covered members.",
} as const;

export const dellCareTeamSection = {
  title: "A search that starts with what we know",
  body: "Provider results open on the member’s ZIP code, with language as a filter beside the list. ZIP code stays editable while the results are on screen.",
  imageSrc: "/images/dellchildrens/careteam2x.png",
  imageAlt:
    "Primary care providers near ZIP 78701, with a control to choose a new ZIP code and a Speaks Spanish filter.",
} as const;

export const dellIdCardsSection = {
  title: "ID cards for the whole family",
  body: "A request can include each covered member, sent to the address on file or a new shipping address.",
  imageSrc: "/images/dellchildrens/request-cards.png",
  imageAlt:
    "Request ID cards form with four covered members selected and a choice between the default address and a new shipping address.",
} as const;
