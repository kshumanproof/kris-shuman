export type Project = {
  slug: string;
  title: string;
  zinger: string;
  image: string;

  status: string;

  genre?: string;
  overview?: string;

  // 🔥 OPTIONAL (future use — safe to leave empty)
  logline?: string;
  synopsis?: string;
  themes?: string[];
  tone?: string;

  // 🔥 OPTIONAL MEDIA (for trailers later)
  mediaType?: "image" | "video";
  mediaSrc?: string;

  active: boolean;
};

export const projects: Project[] = [
  {
    slug: "family-tradition",
    title: "Family Tradition",
    zinger: "Some families don’t inherit land—they inherit what’s buried beneath it.",
    overview: "knofnoen oindqo wcoinc qoicnqpc qicq coqi coqic qoic.",
    genre: "Drama",
    image: "/images/family-tradition.jpg",
    status: "Early Development",
    active: true,
  },
  {
    slug: "the-last-stop",
    title: "The Last Stop",
    zinger: "You don’t get a second chance—you get a different ending.",
overview: "knofnoen oindqo wcoinc qoicnqpc qicq coqi coqic qoic.",
    genre: "Drama",
    image: "/images/lords/lords.png",
    status: "Early Development",
    active: true,
  },
  {
    slug: "sunsets-in-memphis",
    title: "Sunsets In Memphis",
    zinger: "Some places don’t let you leave—they just wait.",
overview: "knofnoen oindqo wcoinc qoicnqpc qicq coqi coqic qoic.",
    genre: "Drama",
    image: "/images/memphis.jpg",
    status: "Early Development",
    active: true,
  },
  {
    slug: "wilder",
    title: "Wilder",
    zinger: "Silence doesn’t mean nothing happened.",
overview: "knofnoen oindqo wcoinc qoicnqpc qicq coqi coqic qoic.",
    genre: "Drama",
    image: "/images/lords/lords.png",
    status: "In Development",
    active: true,
  },
  {
    slug: "dupree",
    title: "Who Stole the Head of Bobbi DuPree",
    zinger: "Some stories don’t want to be solved.",
overview: "knofnoen oindqo wcoinc qoicnqpc qicq coqi coqic qoic.",
    genre: "Drama",
    image: "/images/dupree.jpg",
    status: "In Development",
    active: true,
  },
  {
    slug: "pines",
    title: "What’s Buried Beneath the Pines",
    zinger: "You don’t outrun the past—it follows.",
overview: "knofnoen oindqo wcoinc qoicnqpc qicq coqi coqic qoic.",
    genre: "Drama",
    image: "/images/pines.jpg",
    status: "In Development",

    // 🔥 Example future-ready data
    logline:
      "A runaway son returns to his family’s crumbling timber empire after his father’s death.",
    themes: ["family", "legacy", "buried truth"],

    active: true,
  },
  {
    slug: "lords-of-franklin-county",
    title: "Lords of Franklin County",
    zinger: "Power doesn’t corrupt—it reveals.",
overview: "knofnoen oindqo wcoinc qoicnqpc qicq coqi coqic qoic.",
    genre: "Drama",
    image: "/images/lords.jpg",
    status: "In Development",
    active: true,
  },
  {
    slug: "my-life-before-me",
    title: "My Life Before Me",
    zinger: "You can’t remember something that never happened… or can you?",
overview: "knofnoen oindqo wcoinc qoicnqpc qicq coqi coqic qoic.",
    genre: "Drama",
    image: "/images/life-before.jpg",
    status: "Early Development",
    active: true,
  },
  {
    slug: "nothing-changes",
    title: "Nothing Changes",
    zinger: "People don’t change. They reveal.",
overview: "knofnoen oindqo wcoinc qoicnqpc qicq coqi coqic qoic.",
    genre: "Drama",
    image: "/images/nothing-changes.jpg",
    status: "Early Development",
    active: true,
  },
  {
    slug: "dead-in-the-water",
    title: "Dead in the Water",
    zinger: "Still waters don’t stay still.",
overview: "knofnoen oindqo wcoinc qoicnqpc qicq coqi coqic qoic.",
    genre: "Drama",
    image: "/images/dead-water.jpg",
    status: "Early Development",
    active: true,
  },
  {
    slug: "ballad-of-colibri",
    title: "The Ballad of Colibri",
    zinger: "Some songs are written in blood.",
overview: "knofnoen oindqo wcoinc qoicnqpc qicq coqi coqic qoic.",
    genre: "Drama",
    image: "/images/colibri.jpg",
    status: "Early Development",
    active: true,
  },
  {
    slug: "nowhere-kings",
    title: "The Nowhere Kings",
    zinger: "If nowhere is home, where do you go?",
overview: "knofnoen oindqo wcoinc qoicnqpc qicq coqi coqic qoic.",
    genre: "Drama",
    image: "/images/nowhere.jpg",
    status: "Early Development",
    active: true,
  },

  // 🔥 EXTRA SLOTS
  {
    slug: "gas-boys",
    title: "Gas Boyz",
    zinger: "Zinger goes here.",
    image: "/images/gas-boys/gas-boys.png",
overview: "knofnoen oindqo wcoinc qoicnqpc qicq coqi coqic qoic.",
    genre: "Drama",
    status: "In Production",

    // 🔥 Example of future video usage
    mediaType: "video",
    mediaSrc: "/videos/gas-boys.mp4",

    active: true,
  },
  {
    slug: "the-white-raven",
    title: "The White Raven",
    zinger: "Zinger goes here.",
overview: "knofnoen oindqo wcoinc qoicnqpc qicq coqi coqic qoic.",
    genre: "Drama",
    image: "/images/placeholder.jpg",
    status: "Early Development",
    active: true,
  },
  {
    slug: "project-15",
    title: "Untitled Project",
    zinger: "Zinger goes here.",
overview: "knofnoen oindqo wcoinc qoicnqpc qicq coqi coqic qoic.",
    genre: "Drama",
    image: "/images/placeholder.jpg",
    status: "Concept",
    active: false,
  },
  {
    slug: "project-16",
    title: "Untitled Project",
    zinger: "Zinger goes here.",
overview: "knofnoen oindqo wcoinc qoicnqpc qicq coqi coqic qoic.",
    genre: "Drama",
    image: "/images/placeholder.jpg",
    status: "Concept",
    active: false,
  },
  {
    slug: "project-17",
    title: "Untitled Project",
    zinger: "Zinger goes here.",
overview: "knofnoen oindqo wcoinc qoicnqpc qicq coqi coqic qoic.",
    genre: "Drama",
    image: "/images/placeholder.jpg",
    status: "Concept",
    active: false,
  },
];