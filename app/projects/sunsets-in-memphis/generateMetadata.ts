import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Sunsets In Memphis",
    
    description:
      "A character-driven Southern drama about identity, reinvention, redemption, and the cost of becoming who you are.",

    openGraph: {
      title: "Sunsets In Memphis | Kris Shuman",

      description:
        "A character-driven Southern drama about identity, reinvention, redemption, and the cost of becoming who you are.",

      images: [
        {
          url: "/images/sunsets-in-memphis/somebody-help.png",
          width: 1200,
          height: 630,
          alt: "Sunsets In Memphis",
        },
      ],
    },

    twitter: {
      card: "summary_large_image",

      title: "Sunsets In Memphis | Kris Shuman",

      description:
        "A character-driven Southern drama about identity, reinvention, redemption, and the cost of becoming who you are.",

      images: ["/images/sunsets-in-memphis/somebody-help.png"],
    },
  };
}