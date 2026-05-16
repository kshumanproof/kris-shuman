import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "What's Buried Beneath the Pines",
    
    description:
      "A character-driven Southern drama about identity, reinvention, redemption, and the cost of becoming who you are.",

    openGraph: {
      title: "What's Buried Beneath the Pines | Kris Shuman",

      description:
        "A character-driven Southern drama about identity, reinvention, redemption, and the cost of becoming who you are.",

      images: [
        {
          url: "/images/pines/pines.png",
          width: 1200,
          height: 630,
          alt: "What's Buried Beneath the Pines",
        },
      ],
    },

    twitter: {
      card: "summary_large_image",

      title: "What's Buried Beneath the Pines | Kris Shuman",

      description:
        "A character-driven Southern drama about identity, reinvention, redemption, and the cost of becoming who you are.",

      images: ["/images/pines/pines.png"],
    },
  };
}