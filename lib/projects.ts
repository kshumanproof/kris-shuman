export type Project = {
  slug: string;
  title: string;
  zinger: string;
  image: string;
  active: boolean;
};

export const projects: Project[] = [
  {
    slug: "family-tradition",
    title: "Family Tradition",
    zinger: "Some families don’t inherit land—they inherit what’s buried beneath it.",
    image: "/images/family-tradition.jpg",
    active: true,
  },
  {
    slug: "the-last-stop",
    title: "The Last Stop",
    zinger: "You don’t get a second chance—you get a different ending.",
    image: "/images/last-stop.jpg",
    active: true,
  },
  {
    slug: "sunsets-in-memphis",
    title: "Sunsets In Memphis",
    zinger: "Some places don’t let you leave—they just wait.",
    image: "/images/memphis.jpg",
    active: true,
  },
  {
    slug: "wilder",
    title: "Wilder",
    zinger: "Silence doesn’t mean nothing happened.",
    image: "/images/lords/lords.png",
    active: true,
  },
  {
    slug: "dupree",
    title: "Who Stole the Head of Bobbi DuPree",
    zinger: "Some stories don’t want to be solved.",
    image: "/images/dupree.jpg",
    active: true,
  },
  {
    slug: "pines",
    title: "What’s Buried Beneath the Pines",
    zinger: "You don’t outrun the past—it follows.",
    image: "/images/pines.jpg",
    active: true,
  },
  {
    slug: "lords-of-franklin-county",
    title: "Lords of Franklin County",
    zinger: "Power doesn’t corrupt—it reveals.",
    image: "/images/lords.jpg",
    active: true,
  },
  {
    slug: "my-life-before-me",
    title: "My Life Before Me",
    zinger: "You can’t remember something that never happened… or can you?",
    image: "/images/life-before.jpg",
    active: true,
  },
  {
    slug: "nothing-changes",
    title: "Nothing Changes",
    zinger: "People don’t change. They reveal.",
    image: "/images/nothing-changes.jpg",
    active: true,
  },
  {
    slug: "dead-in-the-water",
    title: "Dead in the Water",
    zinger: "Still waters don’t stay still.",
    image: "/images/dead-water.jpg",
    active: true,
  },
  {
    slug: "ballad-of-colibri",
    title: "The Ballad of Colibri",
    zinger: "Some songs are written in blood.",
    image: "/images/colibri.jpg",
    active: true,
  },
  {
    slug: "nowhere-kings",
    title: "The Nowhere Kings",
    zinger: "If nowhere is home, where do you go?",
    image: "/images/nowhere.jpg",
    active: true,
  },

  // 🔥 EXTRA SLOTS (future-proof)
  {
    slug: "gas-boys",
    title: "Gas Boyz",
    zinger: "Zinger goes here.",
    image: "/images/gas-boys/gas-boys.png",
    active: true,
  },
  {
    slug: "the-white-raven",
    title: "The White Raven",
    zinger: "Zinger goes here.",
    image: "/images/placeholder.jpg",
    active: true,
  },
  {
    slug: "project-15",
    title: "Untitled Project",
    zinger: "Zinger goes here.",
    image: "/images/placeholder.jpg",
    active: false,
  },
  {
    slug: "project-16",
    title: "Untitled Project",
    zinger: "Zinger goes here.",
    image: "/images/placeholder.jpg",
    active: false,
  },
  {
    slug: "project-17",
    title: "Untitled Project",
    zinger: "Zinger goes here.",
    image: "/images/placeholder.jpg",
    active: false,
  },
];