import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "The Ballad Of Colibri",
    
    description:
  "A character-driven Southern drama about identity, reinvention, redemption, and the cost of becoming who you are.",

alternates: {
  canonical: "https://krisshuman.com/projects/ballad-of-colibri",
},

openGraph: {
      title: "The Ballad Of Colibri | Kris Shuman",

      description:
        "A character-driven Southern drama about identity, reinvention, redemption, and the cost of becoming who you are.",

      images: [
        {
          url: "/images/colibri/selfie.png",
          width: 1200,
          height: 630,
          alt: "The Ballad Of Colibri",
        },
      ],
    },

    twitter: {
      card: "summary_large_image",

      title: "The Ballad Of Colibri | Kris Shuman",

      description:
        "A character-driven Southern drama about identity, reinvention, redemption, and the cost of becoming who you are.",

      images: ["/images/colibri/selfie.png"],
    },
  };
}