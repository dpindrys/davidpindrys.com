import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "./components/Header";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
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
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="bg-[#F4F2EE] text-black font-sans">
        <Header />
        {children}
      </body>
    </html>
  );
}
