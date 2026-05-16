export const metadata: Metadata = {
  metadataBase: new URL("https://krisshuman.com"),

  title: {
    default: "Kris Shuman | Screenwriter",
    template: "%s | Kris Shuman",
  },

  description:
    "Character-driven stories about identity, redemption, and the cost of becoming who you are.",

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
    images: ["/og-image.jpg"],
  },

  icons: {
    icon: "/favicon.ico",
  },
};