import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Lords of Franklin County",
    
    description:
      "A character-driven Southern drama about identity, reinvention, redemption, and the cost of becoming who you are.",

    openGraph: {
      title: "Lords of Franklin County | Kris Shuman",

      description:
        "A character-driven Southern drama about identity, reinvention, redemption, and the cost of becoming who you are.",

      images: [
        {
          url: "/images/lords/finch-marion.png",
          width: 1200,
          height: 630,
          alt: "Lords of Franklin County",
        },
      ],
    },

    twitter: {
      card: "summary_large_image",

      title: "Lords of Franklin County | Kris Shuman",

      description:
        "A character-driven Southern drama about identity, reinvention, redemption, and the cost of becoming who you are.",

      images: ["/images/lords/finch-marion.png"],
    },
  };
}