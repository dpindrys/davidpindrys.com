export type HomeColleagueQuote = {
  quote: string;
  name: string;
  /** Role / title line. */
  title: string;
  /** Company line — always shown below the role. */
  company: string;
  /** Optional — when omitted, a initials avatar is shown. */
  avatarSrc?: string;
  /** Optional profile link. */
  href?: string;
  /** Built-in profile-link icon. Defaults to LinkedIn for linkedin.com, else external. */
  linkIcon?: "linkedin" | "doctor" | "shield" | "external";
  /** Optional custom image icon for the profile link. */
  linkIconSrc?: string;
  /** Desktop grid column span (default 1). */
  colSpan?: 1 | 2;
};

/** Easy to replace — drop in new colleague quotes as you gather them. */
export const homeColleagueQuotes: readonly HomeColleagueQuote[] = [
  {
    quote:
      "David didn’t just hand off designs—he stayed engaged through the pilot, tackled edge cases, and iterated until the solution worked in the real world, not just in Figma.",
    name: "Mahesh",
    title: "Lead Salesforce Engineer",
    company: "Fresenius Medical Care",
    avatarSrc: "/images/mahesh.png",
    href: "https://www.linkedin.com/in/sai-mahesh-0525/",
  },
  {
    quote:
      "As a first-time founder, David’s guidance was crucial. His work greatly advanced our team’s quality and timeline.",
    name: "Dr. Cole Marolf",
    title: "Practicing clinician & Founder",
    company: "VEHR Technologies",
    avatarSrc: "/images/cole.png",
    href: "https://health.usnews.com/doctors/cole-marolf-1431490",
    linkIconSrc: "/images/pluscase.png",
  },
  {
    quote:
      "David took the time to deeply understand my workflow, challenges, and goals, ensuring the application wasn’t just functional—it was useful and intuitive for our team.",
    name: "Samantha Ramsey",
    title: "Nursing Informatics Director",
    company: "Fresenius Medical Care",
    avatarSrc: "/images/samantha.png",
    href: "https://www.linkedin.com/in/samantha-ramsey-msn-rn-cnn-02bb8880/",
  },
  {
    quote:
      "David’s remarkable initiative in building our UI/UX architecture from scratch has been nothing short of impressive.",
    name: "Larissa Doronina",
    title: "Principal UX Architect",
    company: "Fresenius Medical Care",
    avatarSrc: "/images/larissa.png",
    href: "https://www.linkedin.com/in/ldoronina/",
  },
  {
    quote:
      "David designed previously unavailable Ascension portal workflows (care team/PCP designation, ID card requests, prior auth) and partnered effectively across product, engineering, and data to keep delivery moving.",
    name: "Steven Long",
    title: "Product Manager",
    company: "Ascension Studio",
    avatarSrc: "/images/steven.png",
    href: "https://www.linkedin.com/in/steven-long-5a040419/",
  },
  {
    quote:
      "Knowing David had already done the hard work to create a trustworthy design freed me to focus on implementation and helped streamline our team’s workflow.",
    name: "Clint Smith",
    title: "Backend Software Engineer",
    company: "Included Health",
    avatarSrc: "/images/clint.png",
    href: "https://www.linkedin.com/in/clintsmithmaui/",
  },
] as const;
