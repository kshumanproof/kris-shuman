import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Who Stole the Head of Bobbi DuPree",
    
    description:
      "A character-driven Southern drama about identity, reinvention, redemption, and the cost of becoming who you are.",

    openGraph: {
      title: "Who Stole the Head of Bobbi DuPree | Kris Shuman",

      description:
        "A character-driven Southern drama about identity, reinvention, redemption, and the cost of becoming who you are.",

      images: [
        {
          url: "/images/dupree/dupree.png",
          width: 1200,
          height: 630,
          alt: "Who Stole the Head of Bobbi DuPree",
        },
      ],
    },

    twitter: {
      card: "summary_large_image",

      title: "Who Stole the Head of Bobbi DuPree | Kris Shuman",

      description:
        "A character-driven Southern drama about identity, reinvention, redemption, and the cost of becoming who you are.",

      images: ["/images/dupree/dupree.png"],
    },
  };
}