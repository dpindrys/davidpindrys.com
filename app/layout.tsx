import type { Metadata } from "next";
import { Inter, EB_Garamond } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "David Pindrys, Healthcare Product Design",
  description:
    "Portfolio of David Pindrys, a product designer focused on clinical tools, healthcare workflows, and human factors.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${ebGaramond.variable}`} suppressHydrationWarning>
      <body className="bg-[#F0F0F0] text-black font-sans">
        <div className="h-5 w-full bg-[#00AAFF]" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
