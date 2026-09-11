import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "./components/Header";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const SITE_URL = "https://www.davidpindrys.com";
const SITE_DESCRIPTION =
  "Portfolio of David Pindrys, a product designer focused on clinical tools, healthcare workflows, and human factors.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "David Pindrys, Healthcare Product Design",
    template: "%s | David Pindrys",
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    type: "website",
    siteName: "David Pindrys",
    url: SITE_URL,
    title: "David Pindrys, Healthcare Product Design",
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: "David Pindrys, Healthcare Product Design",
    description: SITE_DESCRIPTION,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="bg-[#F4F2EE] text-black font-sans">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <Header />
        {children}
      </body>
    </html>
  );
}
