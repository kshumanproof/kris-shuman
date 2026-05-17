import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Nothing Changes",
    
    description:
      "A character-driven Southern drama about identity, reinvention, redemption, and the cost of becoming who you are.",

alternates: {
  canonical: "https://krisshuman.com/projects/nothing-changes",
},

    openGraph: {
      title: "Nothing Changes | Kris Shuman",

      description:
        "A character-driven Southern drama about identity, reinvention, redemption, and the cost of becoming who you are.",

      images: [
        {
          url: "/images/nothing-changes/nothing-changes.png",
          width: 1200,
          height: 630,
          alt: "Nothing Changes",
        },
      ],
    },

    twitter: {
      card: "summary_large_image",

      title: "Nothing Changes | Kris Shuman",

      description:
        "A character-driven Southern drama about identity, reinvention, redemption, and the cost of becoming who you are.",

      images: ["/images/nothing-changes/nothing-changes.png"],
    },
  };
}