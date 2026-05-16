import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Dead In The Water",
    
    description:
      "A character-driven Southern drama about identity, reinvention, redemption, and the cost of becoming who you are.",

    openGraph: {
      title: "Dead In The Water | Kris Shuman",

      description:
        "A character-driven Southern drama about identity, reinvention, redemption, and the cost of becoming who you are.",

      images: [
        {
          url: "/images/dead-in-the-water/crime.png",
          width: 1200,
          height: 630,
          alt: "Dead In The Water",
        },
      ],
    },

    twitter: {
      card: "summary_large_image",

      title: "Dead In The Water | Kris Shuman",

      description:
        "A character-driven Southern drama about identity, reinvention, redemption, and the cost of becoming who you are.",

      images: ["/images/dead-in-the-water/crime.png"],
    },
  };
}