import ExperienceLayer from "@/components/experience/ExperienceLayer";
import ContinuePrompt from "@/components/experience/ContinuePrompt";
import type { Metadata } from "next";
import "./globals.css";
import { Geist, Geist_Mono, Reenie_Beanie } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const hand = Reenie_Beanie({
  variable: "--font-hand",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Kris Shuman",
  description: "Screenwriter portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${hand.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-black text-white">
        {children}

        {/* 🔥 GLOBAL EXPERIENCE SYSTEM */}
        <ExperienceLayer />
        <ContinuePrompt />
      </body>
    </html>
  );
}