import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "The White Raven",
    
    description:
      "A character-driven Southern drama about identity, reinvention, redemption, and the cost of becoming who you are.",

alternates: {
  canonical: "https://krisshuman.com/projects/the-white-raven",
},

    openGraph: {
      title: "The White Raven | Kris Shuman",

      description:
        "A character-driven Southern drama about identity, reinvention, redemption, and the cost of becoming who you are.",

      images: [
        {
          url: "/images/white-raven/white-raven.png",
          width: 1200,
          height: 630,
          alt: "The White Raven",
        },
      ],
    },

    twitter: {
      card: "summary_large_image",

      title: "The White Raven | Kris Shuman",

      description:
        "A character-driven Southern drama about identity, reinvention, redemption, and the cost of becoming who you are.",

      images: ["/images/white-raven/white-raven.png"],
    },
  };
}