import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "The Nowhere Kings",
    
    description:
      "A character-driven Southern drama about identity, reinvention, redemption, and the cost of becoming who you are.",

    openGraph: {
      title: "The Nowhere Kings | Kris Shuman",

      description:
        "A character-driven Southern drama about identity, reinvention, redemption, and the cost of becoming who you are.",

      images: [
        {
          url: "/images/nowhere/cooper.png",
          width: 1200,
          height: 630,
          alt: "The Nowhere Kings",
        },
      ],
    },

    twitter: {
      card: "summary_large_image",

      title: "The Nowhere Kings | Kris Shuman",

      description:
        "A character-driven Southern drama about identity, reinvention, redemption, and the cost of becoming who you are.",

      images: ["/images/nowhere/cooper.png"],
    },
  };
}