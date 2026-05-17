import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Gas Boys",
    
    description:
      "A character-driven Southern drama about identity, reinvention, redemption, and the cost of becoming who you are.",

alternates: {
  canonical: "https://krisshuman.com/projects/gas-boys",
},

    openGraph: {
      title: "Gas Boys | Kris Shuman",

      description:
        "A character-driven Southern drama about identity, reinvention, redemption, and the cost of becoming who you are.",

      images: [
        {
          url: "/images/gas-boys/chillin.png",
          width: 1200,
          height: 630,
          alt: "Gas Boys",
        },
      ],
    },

    twitter: {
      card: "summary_large_image",

      title: "Gas Boys | Kris Shuman",

      description:
        "A character-driven Southern drama about identity, reinvention, redemption, and the cost of becoming who you are.",

      images: ["/images/gas-boys/chillin.png"],
    },
  };
}