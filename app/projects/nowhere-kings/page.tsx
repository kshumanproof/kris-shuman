"use client";

import { useState, useEffect } from "react";
import { projects } from "@/lib/projects";

type ImageItem = {
  src: string;
  caption?: string;
  enabled?: boolean;
};

export default function PinesPage() {
  /* =========================
     🎛 CONTROL PANEL
     ========================= */

  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const showHeroImage = true;

  const heroDesktop = "/images/nowhere/cooper.png";
  const heroMobile = "/images/nowhere/cooper.png";

  const gallery: ImageItem[] = [
    { src: "/images/nowhere/daily.png", caption: "A prank or an omen?", enabled: true },
    { src: "/images/nowhere/trouble.png", caption: "Looks like it was omen.", enabled: true },
    { src: "/images/gas-boys/gas-boys.png", caption: "Silence says everything.", enabled: false },
    { src: "/images/gas-boys/gas-boys.png", caption: "Old wounds, still open.", enabled: false },
    { src: "/images/gas-boys/gas-boys.png", caption: "The past is patient.", enabled: false },
    { src: "/images/gas-boys/gas-boys.png", caption: "Every room holds something.", enabled: false },
    { src: "/images/gas-boys/gas-boys.png", caption: "Every room holds something.", enabled: false },
    { src: "/images/gas-boys/gas-boys.png", caption: "You can feel it watching.", enabled: false },
  ];

  const enabledImages = gallery.filter((img) => img.enabled);

  /* =========================
     🎯 RELATED PROJECTS LOGIC
     ========================= */

  const currentSlug = "nowhere-kings";

  // 🔥 ADD THIS (PROJECT LOOKUP)
  const project = projects.find((p) => p.slug === currentSlug);

  if (!project) return <div>Not found</div>;

  const [selectedProjects, setSelectedProjects] = useState<typeof projects>([]);

  useEffect(() => {
    const filtered = projects.filter(
      (p) => p.active && p.slug !== currentSlug
    );

    // TRUE shuffle (Fisher-Yates)
    const shuffled = [...filtered];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    setSelectedProjects(shuffled.slice(0, 3));
  }, [currentSlug]);

  /* =========================
     📩 FORM HANDLER (Formspree AJAX)
     ========================= */

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const data = new FormData(form);

    const res = await fetch("https://formspree.io/f/mgorgjgb", {
      method: "POST",
      body: data,
      headers: {
        Accept: "application/json",
      },
    });

    if (res.ok) {
      setSubmitted(true);
    }
  };

  /* =========================
     🚀 NAV + UI ACTIONS
     ========================= */

  const openRequest = () => {
    setSubmitted(false);
    setOpen(true);
  };

  const closeRequest = () => {
    setOpen(false);
    setSubmitted(false);
  };

  const goToConversation = () => {
    window.location.href = "/#contact";
  };

  /* =========================
     🎨 SHARED SYSTEM
     ========================= */

  const container = "max-w-6xl mx-auto px-6 md:px-12";
  const narrow = "max-w-3xl mx-auto px-6 md:px-12";

  const section = "py-24";
  const sectionTight = "pb-24";

  const buttonPrimary = `
    px-6 py-3 md:px-8 md:py-4
    text-xs md:text-sm uppercase tracking-[0.3em]
    border border-white/50
    text-white
    bg-white/10
    hover:bg-white/20
    transition
  `;

  const buttonSecondary = `
    px-6 py-3 md:px-8 md:py-4
    text-xs md:text-sm uppercase tracking-[0.3em]
    border border-white/30
    text-white/70
    hover:text-white
    hover:border-white/50
    transition
  `;

  /* =========================
     🎬 RETURN STARTS HERE
     ========================= */

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
      THE NOWHERE KINGS
    </h1>

    <p className="text-sm text-zinc-300 leading-relaxed">
      The summer you try to escape your life is the one that defines it.
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
          <span className="block">THE NOWHERE KINGS</span>
        </h1>

        <p className="text-base md:text-lg text-zinc-200 max-w-[80%]">
          The summer you try to escape your life is the one that defines it.
        </p>

      </div>
    </section>
{/* ================= TEASER ================= */}
<section className="py-24">
  <div className={narrow}>
    <p className="text-xl md:text-2xl italic text-gray-200 leading-relaxed">
      “We were kids bein’ kids—secretly dyin’ to grow up.”
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
  {project.overview}
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
          <li>Friendship</li>
          <li>Escape</li>
          <li>Loss</li>
        </ul>
      </div>

      {/* TONE */}
      <div>
        <p className="text-xs tracking-[0.25em] uppercase text-white/40 mb-6">
          Tone
        </p>

        <p className="text-lg text-white/80 mb-4">
          Nostalgic. Gritty. Funny until it’s not.
        </p>
<p className="text-xs tracking-[0.25em] uppercase text-white/40 mb-6">
          Comps
        </p>

        <p className="text-lg text-white/80">
          Stand by Me meets No Country for Old Men
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

      {/* CTA */}
<section className="pb-32">
  <div className={`${narrow} space-y-8`}>
    <p className="text-2xl">
      If this kind of story stays with you—we should talk.
    </p>

    <div className="flex flex-col md:flex-row gap-4">
      <button
        onClick={openRequest}
        className={buttonSecondary}
      >
        Request Materials
      </button>

      <button
        onClick={goToConversation}
        className={buttonPrimary}
      >
        Start a Conversation
      </button>
    </div>
  </div>
</section>

{/* ================= RELATED PROJECTS ================= */}
<section className="border-t border-gray-800 pt-16 pb-24">
  <div className={container}>

    {/* HEADLINE */}
    <div className="mb-10">
      <p className="text-xs tracking-[0.25em] uppercase text-white/40 mb-4">
        More Stories
      </p>
    </div>

    {/* GRID */}
    <div className="grid md:grid-cols-3 gap-8">
      {selectedProjects.map(project => (
        <a
          key={project.slug}
          href={`/projects/${project.slug}`}
          className="group block"
        >
          <div
            className="w-full h-[200px] bg-cover bg-center mb-4 transition group-hover:opacity-80"
            style={{ backgroundImage: `url(${project.image})` }}
          />

          <p className="text-sm text-white/50 mb-2">
            {project.title}
          </p>

          <p className="text-lg text-white">
            {project.zinger}
          </p>
        </a>
      ))}
    </div>

  </div>
</section>

{/* ================= FOOTER ================= */}
<footer className="px-6 md:px-16 py-16 border-t border-zinc-900 text-center text-xs text-white/40">
  <p className="mb-4">
    All scripts, concepts, and materials on this site are the original work of Kris Shuman and are protected under applicable copyright laws.
  </p>

  <p>
    © 2023–{new Date().getFullYear()} krisshuman.com · Bad Bella Productions. All rights reserved.
  </p>
</footer>

{/* ================= MODAL ================= */}
{open && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">

    <div className="bg-black border border-white/20 p-8 w-full max-w-md relative">

      {/* CLOSE (TOP RIGHT) */}
      <button
        onClick={closeRequest}
        className="absolute top-4 right-4 text-white/50 hover:text-white"
      >
        ✕
      </button>

      <h2 className="text-xl mb-6">
        Request Materials
      </h2>

      {!submitted ? (
        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="email"
            name="email"
            placeholder="Your email"
            required
            className="w-full px-4 py-3 bg-black border border-white/20 text-white"
          />

          <textarea
            name="message"
            placeholder="What caught your interest? (optional)"
            className="w-full px-4 py-3 bg-black border border-white/20 text-white"
          />

          <input
            type="hidden"
            name="project"
            value="Pines"
          />

          <button
            type="submit"
            className={buttonPrimary + " w-full"}
          >
            Request Materials
          </button>

        </form>
      ) : (
        <div className="text-center space-y-4">
          <p className="text-lg">Got it.</p>
          <p className="text-sm text-white/60">
            I’ll send it over shortly.
          </p>

          <button
            onClick={closeRequest}
            className="mt-4 text-sm underline text-white/60 hover:text-white"
          >
            Close
          </button>
        </div>
      )}

    </div>
  </div>
)}

    </main>
  );
}