import ExperienceLayer from "@/components/experience/ExperienceLayer";
import ContinuePrompt from "@/components/experience/ContinuePrompt";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
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