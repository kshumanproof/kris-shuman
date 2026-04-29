type ImageItem = {
  src: string;
  caption?: string;
  enabled?: boolean;
};

export default function PinesPage() {
  /* =========================
     🎛 CONTROL PANEL
     ========================= */

  const showHeroImage = true;

  const heroDesktop = "/images/gas-boys/gas-boys.png";
  const heroMobile = "/images/gas-boys/gas-boys.png";

  const gallery: ImageItem[] = [
    { src: "/images/gas-boys/gas-boys.png", caption: "A house that remembers.", enabled: true },
    { src: "/images/gas-boys/gas-boys.png", caption: "Nothing stays buried.", enabled: true },
    { src: "/images/gas-boys/gas-boys.png", caption: "Silence says everything.", enabled: true },
    { src: "/images/gas-boys/gas-boys.png", caption: "Old wounds, still open.", enabled: true },
    { src: "/images/gas-boys/gas-boys.png", caption: "The past is patient.", enabled: true },
    { src: "/images/gas-boys/gas-boys.png", caption: "Every room holds something.", enabled: true },
    { src: "/images/gas-boys/gas-boys.png", caption: "You can feel it watching.", enabled: true },
  ];

  const enabledImages = gallery.filter(img => img.enabled);

  /* =========================
   🎨 SHARED SYSTEM
   ========================= */

const container = "max-w-6xl mx-auto px-6 md:px-12";
const narrow = "max-w-3xl mx-auto px-6 md:px-12";

const section = "py-24";
const sectionTight = "pb-24";

const buttonPrimary =
  "bg-white text-black px-6 py-3 transition hover:opacity-80";

const buttonSecondary =
  "border border-white px-6 py-3 transition hover:bg-white hover:text-black";

return (
  <main className="bg-black text-white min-h-screen">

    {/* ================= MOBILE HERO ================= */}
<section className="md:hidden relative w-full h-[70vh] overflow-hidden">

  {showHeroImage && (
    <>
      <img
        src={heroMobile}
        className="absolute inset-0 w-full h-full object-cover object-top"
        alt="Pines Hero"
      />
      <div className="absolute inset-0 bg-black/60" />
    </>
  )}

  {/* TOP BAR (mobile version) */}
  <div className="absolute top-6 left-6 right-6 z-30 flex justify-between items-center">
    <a
      href="/"
      className="text-sm tracking-[0.2em] uppercase text-white/60 hover:text-white transition"
    >
      Kris Shuman
    </a>
    <a
      href="/#writer"
      className="text-sm tracking-[0.2em] uppercase text-white/60 hover:text-white transition"
    >
      Writer
    </a>
  </div>

  {/* CONTENT */}
  <div className="relative z-10 flex flex-col justify-end h-full px-6 pb-16">

    <h1 className="text-3xl font-bold mb-4">
      PINES
    </h1>

    <p className="text-sm text-zinc-300 leading-relaxed">
      Some families don’t pass down land—they pass down what’s buried beneath it.
    </p>

  </div>
</section>

    {/* ================= DESKTOP HERO ================= */}
    <section className="hidden md:block relative w-full h-[80vh] md:h-screen overflow-hidden">

      {/* IMAGE */}
      {showHeroImage && (
        <>
          <img
            src={heroDesktop}
            className="absolute inset-0 w-full h-full object-cover object-top"
            alt="Pines Hero"
          />
          <div className="absolute inset-0 bg-black/60" />
        </>
      )}

      {/* TOP BAR */}
      <div className="absolute top-8 left-16 right-16 z-30 flex justify-between items-center">
        <a
  href="/"
  className="text-xl tracking-[0.2em] uppercase text-white/60 hover:text-white transition duration-300"
>
  Kris Shuman
</a>
        <a
          href="/#writer"
          className="text-xl tracking-[0.2em] uppercase text-white/60 hover:text-white transition duration-300"
        >
          The Writer
        </a>
      </div>

      {/* CONTENT */}
      <div className="relative z-10 flex flex-col justify-end h-full px-16 pb-24 w-full">

        <h1 className="text-[clamp(2.5rem,5vw,5rem)] font-bold leading-[1.05] mb-8 w-full">
          <span className="block">WHAT'S BURIED BENEATH THE PINES</span>
        </h1>

        <p className="text-base md:text-lg text-zinc-200 max-w-[60%]">
          Some families don’t pass down land—they pass down what’s buried beneath it.
        </p>

      </div>
    </section>

      {/* ================= PROJECT DETAILS ================= */}
<section className="py-32">

  <div className="px-6 md:px-16 w-full">

    {/* OVERVIEW */}
    <div className="max-w-2xl mb-20 space-y-8">

      <p className="text-xs tracking-[0.25em] uppercase text-white/40">
        Overview
      </p>

      <p className="text-lg md:text-xl text-zinc-300 leading-relaxed">
        When a man returns home after years away, he finds a family that’s learned to survive without him—and secrets that never left.
      </p>

      <p className="text-lg md:text-xl text-zinc-300 leading-relaxed">
        What starts as a quiet homecoming turns into a slow unraveling, as buried truths begin to surface and old roles refuse to stay buried.
      </p>

      <p className="text-lg md:text-xl text-zinc-300 leading-relaxed">
        Because some things don’t stay in the past. They wait.
      </p>

    </div>

    {/* THEMES + TONE */}
    <div className="grid md:grid-cols-2 gap-16 max-w-4xl">

      {/* THEMES */}
      <div>
        <p className="text-xs tracking-[0.25em] uppercase text-white/40 mb-6">
          Themes
        </p>

        <ul className="space-y-3 text-lg text-white/80">
          <li>Identity</li>
          <li>Family Legacy</li>
          <li>Buried Truth</li>
          <li>Moral Consequence</li>
        </ul>
      </div>

      {/* TONE */}
      <div>
        <p className="text-xs tracking-[0.25em] uppercase text-white/40 mb-6">
          Tone
        </p>

        <p className="text-lg text-white/80 mb-4">
          Slow-burn tension. Grounded. Intimate. Uneasy.
        </p>

        <p className="text-sm text-white/50">
          Winter’s Bone meets Prisoners
        </p>
      </div>

    </div>

  </div>
</section>

      {/* GALLERY */}
      {enabledImages.length > 0 && (
        <section className="pb-28">
          <div className={`${container} grid grid-cols-1 md:grid-cols-2 gap-12`}>
            {enabledImages.map((img, i) => (
              <div key={i} className="space-y-3">
                <div
                  className="w-full h-[280px] md:h-[420px] bg-cover bg-center"
                  style={{ backgroundImage: `url(${img.src})` }}
                />
                {img.caption && (
                  <p className="text-sm text-gray-500">
                    {img.caption}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* TEASER */}
      <section className={sectionTight}>
        <div className={narrow}>
          <p className="text-xl italic text-gray-200">
            “You don’t get to come back and pretend none of it happened.”
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-32">
        <div className={`${narrow} space-y-8`}>
          <p className="text-2xl">
            If this kind of story stays with you—we should talk.
          </p>

          <div className="flex flex-col md:flex-row gap-4">
            <button className={buttonSecondary}>
              Request Materials
            </button>
            <button className={buttonPrimary}>
              Start a Conversation
            </button>
          </div>
        </div>
      </section>

      {/* NAV */}
      <section className="border-t border-gray-800 pt-10 pb-20">
        <div className={`${container} flex justify-between text-sm text-gray-500`}>
          <a href="/projects" className="hover:text-white">
            ← Back to Projects
          </a>
          <a href="/projects/wilder" className="hover:text-white">
            Next Project →
          </a>
        </div>
      </section>

    </main>
  );
}