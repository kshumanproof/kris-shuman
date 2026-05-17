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
  metadataBase: new URL("https://krisshuman.com"),

  title: {
    default: "Kris Shuman | Screenwriter",
    template: "%s | Kris Shuman",
  },

  description:
    "Screenwriter and storyteller crafting character-driven films about identity, redemption, consequence, and the cost of becoming who you are.",

  keywords: [
    "Kris Shuman",
    "screenwriter",
    "screenplay writer",
    "film writer",
    "television writer",
    "writer portfolio",
    "Austin Film Festival",
    "Final Draft Big Break",
    "Script Pipeline",
    "southern gothic",
    "cinematic storytelling",
  ],

  authors: [{ name: "Kris Shuman" }],

  creator: "Kris Shuman",

  openGraph: {
    title: "Kris Shuman | Screenwriter",

    description:
      "Character-driven stories about identity, redemption, and the cost of becoming who you are.",

    url: "https://krisshuman.com",

    siteName: "Kris Shuman",

    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Kris Shuman Screenwriter Portfolio",
      },
    ],

    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",

    title: "Kris Shuman | Screenwriter",

    description:
      "Character-driven stories about identity, redemption, and the cost of becoming who you are.",

    images: ["/og-image.jpg"]
  },

  robots: {
  index: true,
  follow: true,
},

alternates: {
  canonical: "https://krisshuman.com",
},

icons: {
  icon: "/favicon.ico",
},
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
        {/* 🔥 PERSON SCHEMA */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",

              name: "Kris Shuman",

              url: "https://krisshuman.com",

              jobTitle: "Screenwriter",

              description:
                "Screenwriter and storyteller crafting character-driven films about identity, redemption, consequence, and the cost of becoming who you are.",

              sameAs: [
                "https://www.instagram.com/",
                "https://www.imdb.com/",
              ],
            }),
          }}
        />

        {children}

        {/* 🔥 GLOBAL EXPERIENCE SYSTEM */}
        <ExperienceLayer />
        <ContinuePrompt />
      </body>
    </html>
  );
}