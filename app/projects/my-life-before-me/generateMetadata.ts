import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "My Life Before Me",
    
    description:
      "A character-driven Southern drama about identity, reinvention, redemption, and the cost of becoming who you are.",

alternates: {
  canonical: "https://krisshuman.com/projects/my-life-before-me",
},

    openGraph: {
      title: "My Life Before Me | Kris Shuman",

      description:
        "A character-driven Southern drama about identity, reinvention, redemption, and the cost of becoming who you are.",

      images: [
        {
          url: "/images/my-life-before-me/slayton.png",
          width: 1200,
          height: 630,
          alt: "My Life Before Me",
        },
      ],
    },

    twitter: {
      card: "summary_large_image",

      title: "My Life Before Me | Kris Shuman",

      description:
        "A character-driven Southern drama about identity, reinvention, redemption, and the cost of becoming who you are.",

      images: ["/images/my-life-before-me/slayton.png"],
    },
  };
}