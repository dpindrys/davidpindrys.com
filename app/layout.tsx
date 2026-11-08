import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import { ContactProvider } from "./components/ContactModal";
import Header from "./components/Header";
import "./globals.css";

const quicksand = Quicksand({
  subsets: ["latin"],
  variable: "--font-quicksand",
  display: "swap",
});

const SITE_URL = "https://www.davidpindrys.com";
const SITE_TITLE = "David Pindrys, Senior Product Designer | Healthcare";
const SITE_DESCRIPTION =
  "Senior product designer for clinical and public-sector workflows. Medicaid portal, clinical refill workflow, EHR design, and accessibility audits.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: "%s | David Pindrys",
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    type: "website",
    siteName: "David Pindrys",
    url: SITE_URL,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={quicksand.variable} suppressHydrationWarning>
      <body className="bg-[#F4F2EE] text-black font-sans">
        <ContactProvider>
          <a href="#main-content" className="skip-link">
            Skip to main content
          </a>
          <Header />
          {children}
        </ContactProvider>
      </body>
    </html>
  );
}
