"use client";

import { useState, useEffect } from "react";
import ExperienceStart from "@/components/experience/ExperienceStart";

const heroLines = [
  ["You don’t outrun who you are.", "You just get better at hiding it."],
  ["Some families inherit land.", "Others inherit what’s buried beneath it."],
  ["Everyone’s chasing something.", "Some things should stay lost."],
  ["People don’t change.", "They reveal."],
];

const heroImage = "/images/lords/lords.png";

const projects = [
  {
    title: "PINES",
    slug: "pines",
    description:
      "A runaway son returns to his family’s crumbling timber empire after his father’s death.",
    image: "/images/gas-boys/gas-boys.png",
  },
];

export default function Home() {
  const [line] = useState(() => {
    const seed = Math.floor(Date.now() / 1000);
    const index = seed % heroLines.length;
    return heroLines[index];
  });

  const lead = projects[0];
  const [showCalendly, setShowCalendly] = useState(false);
  const [showTop, setShowTop] = useState(false);

  // EXPERIENCE STATE
  const [showStart, setShowStart] = useState(false);
  const [experienceTick, setExperienceTick] = useState(0);
  const [showEnding, setShowEnding] = useState(false);

  const openCalendly = () => {
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      window.location.href = "https://calendly.com/kris-krisshuman/30min";
      return;
    }

    setShowCalendly(true);
  };

  // ✅ SCROLL EFFECT (unchanged)
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const triggerPoint = window.innerHeight * 0.4;
      setShowTop(scrollPosition > triggerPoint);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // ✅ ENDING EFFECT (correct placement)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    if (params.get("ending") === "true") {
      setShowEnding(true);

      // clean URL so it doesn't persist
      window.history.replaceState({}, "", "/");
    }
  }, []);

  return (
    <main className="bg-[#0B0B0C] text-white">
      {/* ================= MOBILE HERO ================= */}
      <section className="block md:hidden relative pb-28">
        <div className="relative w-full h-[70vh]">
          <img
            src={heroImage}
            className="absolute inset-0 w-full h-full object-cover"
            alt="Hero"
          />

          <div className="absolute inset-0 bg-black/60 pointer-events-none" />

          {/* ✅ FIXED BUTTON */}
          <button
            onClick={() => setShowStart(true)}
            className="
              absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2
              z-40
              px-6 py-2 text-xs uppercase tracking-[0.3em]
              border border-white/30
              text-white
              bg-white/5 backdrop-blur-sm
              shadow-[0_0_20px_rgba(255,255,255,0.15)]
            "
          >
            Play A Game?
          </button>

          <div className="absolute top-6 left-6 right-6 z-30 flex justify-between items-center">
            <p className="text-xs uppercase tracking-[0.2em] text-white/70">
              Kris Shuman
            </p>
            <a
              href="#writer"
              className="text-xs md:text-xl tracking-[0.2em] uppercase text-white/60 hover:text-white transition duration-300"
            >
              The Writer
            </a>
          </div>

          <div className="absolute left-0 right-0 bottom-0 z-50 px-6 translate-y-1/2">
            <div className="pointer-events-none">
              <h1 className="text-[clamp(1.8rem,6vw,2.8rem)] font-bold leading-[1.1] mb-6">
                {(line || heroLines[0]).join(" ")}
              </h1>

              <p className="text-sm text-zinc-200">
                Character-driven films about identity, redemption, and the cost of becoming who you are.
              </p>

              <p className="text-[10px] uppercase tracking-[0.25em] text-white/50 mt-3 mb-6">
                Austin Film Festival Semifinalist • Script Pipeline • Final Draft Big Break
              </p>
            </div>

            <a
              href="https://calendly.com/kris-krisshuman/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="
                inline-block
                relative z-[60]
                pointer-events-auto
                px-6 py-3 md:px-8 md:py-4
                text-xs md:text-sm uppercase tracking-[0.3em]
                border border-white/50
                text-white
                bg-white/10
                hover:bg-white/20
                transition
              "
            >
              Book A Call
            </a>
          </div>
        </div>
      </section>

      {/* ================= DESKTOP HERO ================= */}
      <section className="hidden md:block relative w-full h-[80vh] md:h-screen overflow-hidden">

        {/* ✅ FIXED BUTTON */}
        <button
          onClick={() => setShowStart(true)}
          className="
            fixed top-6 left-1/2 -translate-x-1/2
            z-50
            px-6 py-2 text-xs uppercase tracking-[0.3em]
            border border-white/30
            text-white
            bg-white/5
            shadow-[0_0_16px_rgba(255,255,255,0.12)]
            hover:shadow-[0_0_28px_rgba(255,255,255,0.22)]
            transition
          "
        >
          How 'Bout A Little Game?
        </button>

        <img
          src={heroImage}
          className="absolute inset-0 w-full h-full object-cover"
          alt="Hero"
        />

        <div className="absolute inset-0 bg-black/60 pointer-events-none" />

        <div className="absolute top-8 left-16 right-16 z-30 flex justify-between items-center">
          <p className="text-xl tracking-[0.2em] uppercase text-white/60">
            Kris Shuman
          </p>
          <a
            href="#writer"
            className="text-xs md:text-xl tracking-[0.2em] uppercase text-white/60 hover:text-white transition duration-300"
          >
            The Writer
          </a>
        </div>

        <div className="relative z-10 flex flex-col justify-end h-full px-16 pb-24 w-full">
          <h1 className="text-[clamp(2.5rem,5vw,5rem)] font-bold leading-[1.05] mb-8 w-full">
            {line?.map((sentence, i) => (
              <span key={i} className="block">
                {sentence}
              </span>
            ))}
          </h1>

          <p className="text-base md:text-lg text-zinc-200 max-w-[60%]">
            Character-driven films about identity, redemption, and the cost of becoming who you are.
          </p>

          <p className="text-xs uppercase tracking-[0.25em] text-white/50 mt-4">
            Austin Film Festival Semifinalist • Script Pipeline • Final Draft Big Break
          </p>

          <div className="mt-6">
            <button
              type="button"
              onClick={openCalendly}
              className="
                px-6 py-3 md:px-8 md:py-4
                text-xs md:text-sm uppercase tracking-[0.3em]
                border border-white/50
                text-white
                bg-white/10
                hover:bg-white/20
                transition
              "
            >
              Book A Call
            </button>
          </div>
        </div>
      </section>

      {/* ✅ EXPERIENCE START MODAL */}
      {showStart && (
        <ExperienceStart
          onBegin={() => {
  localStorage.setItem("experienceActive", "true");
  localStorage.setItem("experienceStep", "0");

  // 🔥 THIS IS THE MISSING PIECE
  window.dispatchEvent(new Event("experienceStart"));

  setShowStart(false);
}}
          onExit={() => setShowStart(false)}
        />
      )}
    
      {/* ================= FEATURED PROJECT ================= */}
      <section className="mt-10 px-6 md:px-16 pt-24 pb-10 border-t border-zinc-900">
        <p className="text-xs uppercase tracking-[0.3em] text-zinc-500 mb-6">
          Featured Project
        </p>

        <a
          href={`/projects/${lead.slug}`}
          className="grid md:grid-cols-2 gap-10 items-center group"
        >
          <div className="relative w-full overflow-hidden rounded-md">
            <div className="w-full aspect-[16/9] overflow-hidden">
              <img
                src={lead.image}
                alt={lead.title}
                className="w-full h-full object-cover transition duration-700 group-hover:scale-[1.03]"
              />
            </div>
          </div>

          <div>
            <h2 className="text-4xl font-bold mb-4 transition group-hover:text-white">
              {lead.title}
            </h2>
            <p className="text-zinc-400 transition group-hover:text-zinc-300">
              {lead.description}
            </p>
          </div>
        </a>
      </section>

     {/* ================= PROJECT SLATE ================= */}
<section className="px-6 md:px-16 pt-6 pb-24 border-t border-zinc-900">

  <p className="text-xs uppercase tracking-[0.3em] text-zinc-500 mb-8">
    Stories in Development
  </p>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">

    {/* ===== PROJECT 1 ===== */}
    <a href="/projects/pines" className="group block">
      <div className="w-full aspect-[16/9] overflow-hidden bg-zinc-900 mb-4">
        <img
          src="/images/pines/ft-gray-woods.jpg"
          alt="Pines"
          className="w-full h-full object-cover transition duration-700 group-hover:scale-105"
        />
      </div>

      <h3 className="text-lg font-semibold mb-2 group-hover:text-white transition">
        PINES
      </h3>

      <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-600">
        Early Development
      </p>

      <p className="text-sm text-zinc-400 mb-1">
        A son returns home to bury his father—and inherits everything he ran from.
      </p>
    </a>

    {/* ===== PROJECT 2 ===== */}
    <a href="/projects/wilder" className="group block">
      <div className="w-full aspect-[16/9] overflow-hidden bg-zinc-900 mb-4">
        <img
          src="/images/wilder/wilder.webp"
          alt="Wilder"
          className="w-full h-full object-cover transition duration-700 group-hover:scale-105"
        />
      </div>

      <h3 className="text-lg font-semibold mb-2 group-hover:text-white transition">
        WILDER
      </h3>

      <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-600">
        Early Development
      </p>

      <p className="text-sm text-zinc-400 mb-1">
        A son returns home to bury his father—and inherits everything he ran from.
      </p>
    </a>

    {/* ===== PROJECT 3 ===== */}
    <a href="/projects/dupree" className="group block">
      <div className="w-full aspect-[16/9] overflow-hidden bg-zinc-900 mb-4">
        <img
          src="/images/dupree/dupree.webp"
          alt="Dupree"
          className="w-full h-full object-cover transition duration-700 group-hover:scale-105"
        />
      </div>

      <h3 className="text-lg font-semibold mb-2 group-hover:text-white transition">
        DUPREE
      </h3>

      <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-600">
        Early Development
      </p>

      <p className="text-sm text-zinc-400 mb-1">
        A son returns home to bury his father—and inherits everything he ran from.
      </p>
    </a>

    {/* ===== PROJECT 4 ===== */}
    <a href="/projects/lords" className="group block">
      <div className="w-full aspect-[16/9] overflow-hidden bg-zinc-900 mb-4">
        <img
          src="/images/lords/lords.png"
          alt="Lords"
          className="w-full h-full object-cover transition duration-700 group-hover:scale-105"
        />
      </div>

      <h3 className="text-lg font-semibold mb-2 group-hover:text-white transition">
        LORDS
      </h3>

      <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-600">
        Early Development
      </p>

      <p className="text-sm text-zinc-400 mb-1">
        A son returns home to bury his father—and inherits everything he ran from.
      </p>
    </a>

    {/* ===== PROJECT 5 ===== */}
    <a href="/projects/gas-boys" className="group block">
      <div className="w-full aspect-[16/9] overflow-hidden bg-zinc-900 mb-4">
        <img
          src="/images/gas-boys/gas-boys.png"
          alt="Gas Boys"
          className="w-full h-full object-cover transition duration-700 group-hover:scale-105"
        />
      </div>

      <h3 className="text-lg font-semibold mb-2 group-hover:text-white transition">
        GAS BOYS
      </h3>

      <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-600">
        Early Development
      </p>

      <p className="text-sm text-zinc-400 mb-1">
        A son returns home to bury his father—and inherits everything he ran from.
      </p>
    </a>

    {/* ===== PROJECT 6 (PLACEHOLDER) ===== */}
    <a href="/projects/placeholder" className="group block">
      <div className="w-full aspect-[16/9] overflow-hidden bg-zinc-900 mb-4">
        <img
          src="/images/placeholder.jpg"
          alt="Coming Soon"
          className="w-full h-full object-cover opacity-60 transition duration-700 group-hover:scale-105"
        />
      </div>

      <h3 className="text-lg font-semibold mb-2 text-zinc-400">
        UNTITLED
      </h3>

      <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-600">
        Early Development
      </p>

      <p className="text-sm text-zinc-400 mb-1">
        A son returns home to bury his father—and inherits everything he ran from.
      </p>
    </a>

  </div>
</section>


{/* ================= THE WRITER ================= */}
<section
  id="writer"
  className="px-6 md:px-16 py-40 border-t border-zinc-900 text-center"
>

  <div className="max-w-2xl mx-auto">
  <p className="text-2xl md:text-3xl leading-relaxed">
    I write about people at the breaking point.
    <br />
    The ones trying to outrun who they’ve been—
    <br />
    and learning the hard way that you don’t get to.
  </p>

  <p className="mt-6 text-m uppercase tracking-[0.2em] text-white/90 text-right">
    — Kris
  </p>

  <div className="mt-12 text-m uppercase tracking-[0.25em]">
    <a href="/about" className="text-white/60 hover:text-white transition">
      View Full Bio
    </a>
  </div>
</div>
  

</section>


{/* ================= PROOF ================= */}
<section className="px-6 md:px-16 py-32 border-t border-zinc-900 text-center">

  <p className="text-xs uppercase tracking-[0.35em] text-zinc-500 mb-12">
    Recognized By
  </p>

  {(() => {
    const items = [
      "Austin Film Festival",
      "Script Pipeline",
      "Final Draft Big Break",
      "PAGE Awards",
      "Nashville Film Festival"
    ];

    return (
      <div className="
        max-w-xl mx-auto
        flex flex-col items-center gap-y-3   /* mobile */
        md:flex-row md:flex-wrap md:justify-center md:gap-x-8 md:gap-y-3
        text-zinc-400
      ">

        {items.map((item, i) => (
          <div key={i}>
            {item}
          </div>
        ))}

      </div>
    );
  })()}

</section>


{/* ================= CONTACT ================= */}
<section className="px-6 md:px-16 py-44 border-t border-zinc-900 text-center">
  <div className="max-w-xl mx-auto">
    <p className="text-xl md:text-2xl leading-relaxed mb-12">
      If something here stays with you —
      <br className="hidden md:block" />
      we should talk.
    </p>

    <a
  href="https://calendly.com/kris-krisshuman/30min"
  target="_blank"
  rel="noopener noreferrer"
  className="
    inline-block
    relative z-[60]
    pointer-events-auto
    px-12 py-5
    text-sm uppercase tracking-[0.3em]
    border border-white/50
    text-white
    bg-white/15
    hover:bg-white/30
    transition
    shadow-[0_0_20px_rgba(255,255,255,0.15)]
  "
>
  Schedule a Call
</a>

    <p className="mt-8 text-xs text-white/40">
      Or{" "}
      <a
        href="mailto:you@email.com"
        className="relative z-[60] underline hover:text-white/70 transition"
      >
        email Kris
      </a>
    </p>
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

{/* ================= CALENDLY MODAL ================= */}
{showCalendly && (
  <div className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center">
    <button
      type="button"
      onClick={() => setShowCalendly(false)}
      className="absolute top-6 right-6 z-[110] text-white text-sm uppercase tracking-[0.2em] hover:text-white/70 transition"
    >
      Close
    </button>

    <div className="w-full max-w-4xl h-[80vh] bg-white rounded-md overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.5)]">
      <iframe
        src="https://calendly.com/kris-krisshuman/30min"
        className="w-full h-full"
        title="Calendly Scheduling"
      />
    </div>
  </div>
)}

{/* ================= BACK TO TOP ================= */}
{showTop && (
  <button
    type="button"
    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    className="
      fixed bottom-6 right-6
      z-[90]
      w-10 h-10
      flex items-center justify-center
      border border-white/30
      text-white text-sm
      bg-white/10
      backdrop-blur-sm
      hover:bg-white/20
      transition
      shadow-[0_0_20px_rgba(255,255,255,0.15)]
    "
  >
    ↑
  </button>
)}

{showEnding && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-6">
    <div className="relative w-full max-w-xl bg-black border border-white/10 p-10 text-center space-y-6">

      <button
        onClick={() => setShowEnding(false)}
        className="absolute top-4 right-4 text-white/50 hover:text-white text-xs uppercase tracking-[0.2em]"
      >
        Close
      </button>

      <p className="text-xl md:text-2xl leading-relaxed">
        Every story leaves something behind.
      </p>

      <p className="text-white/70">
        If this one stayed with you…
        we should talk.
      </p>

      <button
        onClick={openCalendly}
        className="border border-white/50 px-6 py-3 uppercase tracking-[0.3em] text-sm hover:bg-white hover:text-black transition"
      >
        Book A Call
      </button>

    </div>
  </div>
)}
</main>
  );
}