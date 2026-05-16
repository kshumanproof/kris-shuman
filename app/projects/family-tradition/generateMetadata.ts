import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Family Tradition",
    
    description:
      "A character-driven Southern drama about identity, reinvention, redemption, and the cost of becoming who you are.",

    openGraph: {
      title: "Family Tradition | Kris Shuman",

      description:
        "A character-driven Southern drama about identity, reinvention, redemption, and the cost of becoming who you are.",

      images: [
        {
          url: "/images/family-tradition/ft-gray-diner.jpg",
          width: 1200,
          height: 630,
          alt: "Family Tradition",
        },
      ],
    },

    twitter: {
      card: "summary_large_image",

      title: "Family Tradition | Kris Shuman",

      description:
        "A character-driven Southern drama about identity, reinvention, redemption, and the cost of becoming who you are.",

      images: ["/images/family-tradition/ft-gray-diner.jpg"],
    },
  };
}