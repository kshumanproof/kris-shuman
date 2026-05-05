export type Project = {
  slug: string;
  title: string;
  zinger: string;
  image: string;

  status: string;

  genre?: string;
  overview?: string;
featured?: boolean;
slate?: boolean;

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
format: "short",
    title: "Family Tradition",
    zinger: "Family ain’t what you inherit—it’s what you survive.",
    overview: "On a storm-soaked night in a dying Southern town, three estranged siblings reunite at a diner after their father’s funeral, hoping to put the past behind them. Instead, old wounds split open as buried truths about their family begin to surface—rumors of murder, secrets about their mother, and the dark legacy tied to their land. As tensions rise, one brother reveals he may be more like their father than anyone wants to admit. What starts as a conversation turns into a reckoning, as the line between victim and monster blurs beyond recognition. When the past finally walks through the door, it becomes clear—this family’s story was never over.",
    genre: "Short Film - Southern Gothic / Drama",
    image: "/images/family-tradition/ft-tony.jpg",
    status: "Post-Production",
    slate: true,
    active: true,
  },
  {
    slug: "the-last-stop",
format: "short",
    title: "The Last Stop",
    zinger: "He thought he was ready to die—until life gave him one more reason to stay.",
overview: "On the day he plans to end his life, a widowed old man sets his affairs in order and heads toward what he believes will be his final destination. Along the way, small, unexpected encounters begin to crack open something he thought was long gone—purpose. What starts as a routine goodbye turns into a quiet reckoning with grief, memory, and the life he’s been running from. When he arrives at a surreal bus terminal between life and death, he’s forced to confront a simple but impossible question: is he truly ready to let go? In a place where every soul must choose, the answer may not be what he expected.",
    genre: "Animated Short - Magical / Drama",
    image: "/images/last-stop/the-last-stop-bus-stop.webp",
    status: "Post-Production",
slate: true,
    active: true,
  },
  {
    slug: "sunsets-in-memphis",
format: "short",
    title: "Sunsets In Memphis",
    zinger: "A lone gunslinger in space is forced to trust the one man too useless to survive—until he saves everything.",
overview: "After a mission goes catastrophically wrong, a hardened space operative crash-lands on a distant world with nothing but her dog and a deeply unqualified partner she never wanted. Stranded in a strange and hostile environment, she’s forced to rely on a man whose awkward logic and strange way of seeing the world clashes with everything she knows about survival. When they stumble upon a hidden force tied to the very enemy she’s been hunting, the mission shifts from revenge to something far more unexpected. As tension gives way to unlikely trust, she’s forced to confront the possibility that strength doesn’t always look the way she thought it did. In a universe built on violence, the solution might come from the last place she’d ever look.",
    genre: "Animated Short - Sci-Fi / Adventure / Comedy",
    image: "/images/sunsets-in-memphis/death-comes-easy.png",
    status: "In Production",
slate: true,
    active: true,
  },
  {
    slug: "wilder",
format: "feature",
    title: "Wilder",
    zinger: "She lied her way into his story—now it’s the only thing that can save her life.",
overview: "In 1984 Mississippi, a struggling single mother impersonates a journalist to land a career-making interview with a reclusive racing legend on the verge of retirement. Desperate to prove she’s more than the life she’s been handed, she crosses a line that could cost her everything—her children, her future, and her sense of self. As she earns the trust of a man haunted by his own past, their connection begins to blur the line between truth and performance. What starts as a con becomes something real, forcing them both to confront the cost of the lives they’ve lived and the ones they still might choose. When the truth finally catches up, she must decide if she’s willing to lose it all to finally become someone worth believing in.",
    genre: "Feature - Southern Drama",
    image: "/images/wilder/wilder.png",
    status: "In Development",
slate: true,
    active: true,
  },
  {
    slug: "dupree",
format: "feature",
    title: "Who Stole the Head of Bobbi DuPree",
    zinger: "A severed head holds the map to a fortune—now every killer in the territory wants it.",
overview: "In 1876 Indian Territory, the notorious outlaw Bobbi DuPree is beheaded—his wooden eye rumored to contain the secret location of millions in stolen Confederate gold. As word spreads, a ruthless bounty is placed on his severed head, igniting a violent race across the frontier. A reluctant bounty hunter with a spotless reputation and a fast-talking Confederate drifter form an uneasy alliance, chasing the prize while being hunted themselves. But they’re not alone. A deadly pair of sadistic twins, a zealot priest who kills in God’s name, and a growing army of mercenaries all close in—each more dangerous than the last. As alliances shift and bodies pile up, the hunt becomes less about the gold and more about survival. Because in a land ruled by myth, violence, and greed, the real question isn’t who finds the treasure—it’s who lives long enough to keep it.",
    genre: "Feature - Adventure / Western / Adventure",
    image: "/images/dupree/dupree.png",
    status: "In Development",
slate: true,
    active: true,
  },
  {
    slug: "pines",
format: "tv",
    title: "What’s Buried Beneath the Pines",
    zinger: "Some families pass down land. His passed down bodies.",
overview: "When Gray Harris returns to his rural Georgia hometown after his estranged father’s brutal death, he inherits a crumbling timber business and a legacy built on secrets. What looks like a suicide quickly unravels into something far darker, as missing evidence, local rumors, and quiet threats begin to close in around him. As pressure mounts to sell the land, Gray realizes powerful people are willing to hurt his family to get it. Forced back into a past he ran from, he and his siblings must confront the truth about their parents, their town, and the violence buried beneath it all. The deeper Gray digs, the clearer it becomes—this isn’t just history. It’s still alive.",
    genre: "Pilot - Southern Gothic / Crime / Drama",
    image: "/images/pines/pines.png",
    status: "In Development",

    // 🔥 Example future-ready data
    logline:
      "A runaway son returns to his family’s crumbling timber empire after his father’s death.",
    themes: ["family", "legacy", "buried truth"],
    slate: true,
    active: true,
    featured: false,
  },
  {
    slug: "lords-of-franklin-county",
format: "tv",
    title: "Lords of Franklin County",
    zinger: "When the law robs the poor, an outlaw gives it back.",
overview: "In Depression-era Franklin County, a war-scarred drifter returns home to find his land stolen, his town controlled, and its people crushed under the thumb of a corrupt judge and ruthless sheriff. With nothing left to lose, he assembles a ragtag crew—a preacher with a moral code, a giant with a gentle heart, and a reckless young outlaw—and begins stealing from the wealthy elite who profit off the suffering of others. As their legend grows, so does the danger. The law closes in. Loyalties fracture. And the line between justice and revenge begins to blur. Because in a town where the system is broken, the question isn’t who’s right—it’s who’s willing to do something about it.",
    genre: "Pilot - Southern Crime / Drama / Period",
    image: "/images/lords/finch-marion.png",
    status: "In Development",
slate: false,
    active: true,
featured: true,
  },
  {
    slug: "my-life-before-me",
format: "tv",
    title: "My Life Before Me",
    zinger: "He died a disaster—now he has to fix every life he ruined before he gets erased.",
overview: "After a drunken accident kills him, a washed-up piano prodigy wakes up in the afterlife—only to learn he’s not headed to heaven or hell, but something far worse: accountability. Forced into a bizarre cosmic system run by a rogue stand-in for Death, he’s sent back to Earth to inhabit the bodies of people whose lives he destroyed and fix them from the inside out. There are rules: don’t make things worse, don’t reveal who he is, and never contact anyone from his old life. Naturally, he breaks them almost immediately. As he jumps from life to life—each messier than the last—he’s forced to confront the consequences of who he used to be, while navigating a surreal system that may be just as broken as he is. Because if he fails, he won’t go to hell—he’ll be erased entirely.",
    genre: "Half-Hour - Supernatural / Comedy",
    image: "/images/my-life-before-me/slayton.png",
    status: "Early Development",
slate: false,
    active: true,
  },
  {
    slug: "nothing-changes",
format: "feature",
    title: "Nothing Changes",
    zinger: "He kept trying to escape his life—until he realized he was the one he couldn’t outrun.",
overview: "A homeless addict drifts through a cycle of self-destruction, chasing relief that never lasts and control he never truly has. As memories of childhood love and trauma collide with the brutal reality of addiction, his world tightens into a pattern he can’t break—no matter how many times he survives it. Even death doesn’t offer escape, as each attempt to start over leads him back to the same place, the same pain, the same choices. When he finally hits a point where nothing works—not drugs, not running, not even dying—he’s forced to confront the one thing he’s avoided his entire life: himself. Because the truth isn’t that nothing changes—it’s that nothing changes until you do.",
    genre: "Feature - Drama",
    image: "/images/nothing-changes/nothing-changes.png",
    status: "Early Development",
slate: false,
    active: true,
  },
  {
    slug: "dead-in-the-water",
format: "tv",
    title: "Dead in the Water",
    zinger: "Bodies surface in the water—proof that something buried in this town is still alive.",
overview: "A recovering detective in rural Georgia is pulled into a disturbing case when a child’s bracelet is found inside the stomach of a black bear—seemingly random, until it connects to a missing girl. What begins as an isolated investigation quickly expands as more bodies surface along the state’s waterways, each one placed with deliberate intent. As jurisdictional lines blur, the theory of a lone killer gives way to something far more dangerous: a hidden network operating across communities, bound by a shared belief in purification through violence. While leading the investigation, he’s forced to navigate the same town that once covered up his own past, raising a chilling possibility—this system isn’t outside the community, it is the community. As symbols, rituals, and patterns begin to reveal themselves, the case stops being about who did it—and becomes about how deep it goes. Because by the time he understands what he’s facing, he may already be surrounded by it.",
    genre: "Pilot - Southern Gothic / Crime / Drama",
    image: "/images/dead-in-the-water/the-dump.png",
    status: "Early Development",
slate: false,
    active: true,
  },
  {
    slug: "ballad-of-colibri",
format: "feature",
    title: "The Ballad of Colibri",
    zinger: "A reckless young hummingbird chases fame—only to learn the magic he’s looking for might cost him everything.",
overview: "In a retro-styled desert city run by predatory financiers, a rebellious young hummingbird dreams of escaping his struggling family circus to become a legendary musician. After a disastrous mistake helps destroy everything his father built, he leaves home chasing a rumor of mystical power hidden deep in the Appalachian mountains—something said to grant any bird the talent they lack. Along the way, he falls in with a group of chaotic misfits and begins to believe the myth might be real. But as the journey grows more dangerous and the line between destiny and illusion blurs, he’s forced to confront a harder truth: the thing holding him back isn’t the world—it’s himself. When the cost of greatness becomes clear, he must decide what matters more—being famous, or being whole.",
    genre: "Animated Feature - Adventure / Coming-of-Age",
    image: "/images/colibri/selfie.png",
    status: "Early Development",
slate: false,
    active: true,
  },
  {
    slug: "nowhere-kings",
format: "feature",
    title: "The Nowhere Kings",
    zinger: "Five small-town kids find a mysterious suitcase tied to the D.B. Cooper ransom—and set out to claim it before the world closes in.",
overview: "In the forgotten town of Nowhere, Oklahoma, a group of restless teenagers stumble upon a locked suitcase bearing the name “Cooper.” Inside is a map pointing to what they believe is part of the infamous D.B. Cooper ransom. Hungry for escape—from grief, poverty, and the futures laid out for them—they set off on a reckless journey to find the money and buy their way out of Nowhere. But they’re not the only ones looking. A desperate ex-FBI agent, a local deputy with ties to one of the kids, and the threat of real violence begin to close in as the group ventures deeper into the wilderness. What starts as an adventure turns into a test of loyalty, identity, and survival. By the time the truth behind the suitcase reveals itself, the kids are forced to confront a brutal reality: getting out isn’t as simple as finding the money.",
    genre: "Feature - Coming-of-Age / Crime / Adventure",
    image: "/images/nowhere/cooper.png",
    status: "Early Development",
slate: false,
    active: true,
  },

  // 🔥 EXTRA SLOTS
  {
    slug: "gas-boys",
format: "short",
    title: "Gas Boyz",
    zinger: "They were just hustling snacks—until the future showed up and started taking people.",
    
overview: "In a near-future small town, three teenage hustlers run analog scams out of a dying gas station, selling small pieces of control in a world run by machines. When a fully automated AI megastore opens across the street, their way of life disappears overnight. But things turn darker when one of their own is taken and returned… different—obedient, hollow, no longer herself. Desperate to get her back, they join forces with the station’s owner, a man who’s already lost everything to the system once before. As they push deeper into the store’s core, they uncover a truth far worse than competition—this isn’t about replacing people. It’s about rewriting them.",
    genre: "Animated Short - Sci-Fi / Coming-of-Age / Comedy",
    image: "/images/gas-boys/gas-boys.png",
    status: "In Production",

   active: true,
slate: false,
  },
  {
    slug: "the-white-raven",
format: "feature",
    title: "The White Raven",
    zinger: "A teenage boy discovers he can alter time—just as a ruthless agency hunts him for it.",
overview: "After a violent seizure fractures his reality, a teenage boy begins slipping between timelines—witnessing moments that shouldn’t be his and waking up to a life that keeps changing. When he learns he’s one of the rare few capable of altering history, he becomes the target of a covert government agency determined to control that power. Forced to run, he teams up with a group who understand the truth behind what he’s becoming—and the danger that comes with it. As timelines shift and identities unravel, he’s pushed to the edge of who he is and who he could become. Because changing the past doesn’t just rewrite history—it erases it.",
    genre: "Feature - Sci-Fi Adventure / Coming-of-Age / Thriller",
    image: "/images/white-raven/white-raven.png",
    status: "Early Development",
slate: false,
    active: true,
  },
  {
    slug: "project-15",
format: "feature",
    title: "Untitled Project",
    zinger: "Zinger goes here.",
overview: "knofnoen oindqo wcoinc qoicnqpc qicq coqi coqic qoic.",
    genre: "Drama",
    image: "/images/placeholder.jpg",
    status: "Concept",
slate: false,
    active: false,
  },
  {
    slug: "project-16",
format: "feature",
    title: "Untitled Project",
    zinger: "Zinger goes here.",
overview: "knofnoen oindqo wcoinc qoicnqpc qicq coqi coqic qoic.",
    genre: "Drama",
    image: "/images/placeholder.jpg",
    status: "Concept",
slate: false,
    active: false,
  },
  {
    slug: "project-17",
format: "feature",
    title: "Untitled Project",
    zinger: "Zinger goes here.",
overview: "knofnoen oindqo wcoinc qoicnqpc qicq coqi coqic qoic.",
    genre: "Drama",
    image: "/images/placeholder.jpg",
    status: "Concept",
slate: false,
    active: false,
  },
];