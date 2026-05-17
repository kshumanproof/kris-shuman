import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "The Last Stop",
    
    description:
      "A character-driven Southern drama about identity, reinvention, redemption, and the cost of becoming who you are.",

alternates: {
  canonical: "https://krisshuman.com/projects/the-last-stop",
},

    openGraph: {
      title: "The Last Stop | Kris Shuman",

      description:
        "A character-driven Southern drama about identity, reinvention, redemption, and the cost of becoming who you are.",

      images: [
        {
          url: "/images/last-stop/last-stop-station.png",
          width: 1200,
          height: 630,
          alt: "The Last Stop",
        },
      ],
    },

    twitter: {
      card: "summary_large_image",

      title: "The Last Stop | Kris Shuman",

      description:
        "A character-driven Southern drama about identity, reinvention, redemption, and the cost of becoming who you are.",

      images: ["/images/last-stop/last-stop-station.png"],
    },
  };
}