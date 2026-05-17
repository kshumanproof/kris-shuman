import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Wilder",
    
    description:
      "A character-driven Southern drama about identity, reinvention, redemption, and the cost of becoming who you are.",

alternates: {
  canonical: "https://krisshuman.com/projects/wilder",
},

    openGraph: {
      title: "Wilder | Kris Shuman",

      description:
        "A character-driven Southern drama about identity, reinvention, redemption, and the cost of becoming who you are.",

      images: [
        {
          url: "/images/wilder/wilder.png",
          width: 1200,
          height: 630,
          alt: "Wilder",
        },
      ],
    },

    twitter: {
      card: "summary_large_image",

      title: "Wilder | Kris Shuman",

      description:
        "A character-driven Southern drama about identity, reinvention, redemption, and the cost of becoming who you are.",

      images: ["/images/wilder/wilder.png"],
    },
  };
}