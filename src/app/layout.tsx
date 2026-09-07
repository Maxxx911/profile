import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Maxim Spasyonov — Senior Full-Stack Engineer",
  description:
    "Senior Full-Stack Engineer with 6+ years of experience building backend services, modern frontends, and AI-powered products.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} h-full antialiased`}>
      <body className="min-h-full bg-zinc-50 text-zinc-900 font-sans">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
