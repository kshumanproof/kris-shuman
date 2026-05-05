"use client";

import { useState } from "react";

export default function AboutPage() {
  const [showResume, setShowResume] = useState(false);

  const heroImage = "/images/about/forest-road.png";

  return (
    <main className="bg-[#0B0B0C] text-white">

      {/* ================= MOBILE HERO ================= */}
<section className="md:hidden relative w-full min-h-screen overflow-hidden">

  {/* BG */}
  <img
    src={heroImage}
    className="absolute inset-0 w-full h-full object-cover"
    alt="About"
  />

  <div className="absolute inset-0 bg-black/70" />

  {/* TOP NAME */}
  <div className="absolute top-6 left-6 z-20">
    <a
      href="/"
      className="text-sm uppercase tracking-[0.2em] text-white/70"
    >
      Kris Shuman
    </a>
  </div>

  {/* CONTENT */}
  <div className="relative z-10 px-6 pt-24 pb-16">

    <div className="max-w-md mx-auto space-y-6 text-center">

      <p className="text-sm text-white/80 leading-relaxed">
        Being raised in the South, stories weren’t told. They were lived. Avoided. Buried. But that’s not just where I’m from. That’s how people are.
      </p>

      <p className="text-sm text-white/90 leading-relaxed">
        Recovery didn’t give me answers. It just made it harder to ignore things. And once you start seeing the truth — you can’t unsee it.
      </p>

      <p className="text-sm text-white/90 leading-relaxed">
        That’s what I write about: people at the breaking point and the moment where who they’ve been pretending to be stops working.
      </p>

      <p className="text-sm text-white/90 leading-relaxed">
        I don’t build characters. I follow them. And eventually, the truth shows up.
      </p>

      <p className="pt-4 text-base font-semibold text-white leading-snug">
        I didn’t come to storytelling to escape anything. I came to face it.
      </p>

      <p className="text-2xl font-semibold leading-tight text-white">
        And I chose to write about it.
      </p>

      {/* SIGNATURE */}
      <div className="flex justify-center pt-4">
        <img
          src="/images/signature.png"
          alt="Signature"
          className="w-[120px] opacity-80"
        />
      </div>

    </div>

  </div>

</section>


{/* ================= DESKTOP HERO ================= */}
<section className="hidden md:block relative w-full h-[80vh] md:h-screen overflow-hidden">

  {/* TOP LEFT NAME */}
  <div className="absolute top-6 left-10 z-20">
    <a
      href="/"
      className="text-xl uppercase tracking-[0.2em] text-white/70 hover:text-white transition"
    >
      Kris Shuman
    </a>
  </div>

  {/* BG IMAGE */}
  <img
    src={heroImage}
    className="absolute inset-0 w-full h-full object-cover"
    alt="About"
  />

  <div className="absolute inset-0 bg-black/60 pointer-events-none" />

  {/* CENTER STATEMENT */}
  <div className="relative z-10 flex items-center justify-center h-full px-6 text-center">
    
    <div className="max-w-2xl mx-auto space-y-6 text-white">

      <p className="text-lg text-white/80 leading-snug">
        Being raised in the South, stories weren’t told. They were lived. Avoided. Buried. But that’s not just where I’m from. That’s how people are.
      </p>

      <p className="text-lg text-white/90 leading-snug">
        Recovery didn’t give me answers. It just made it harder to ignore things. And once you start seeing the truth — you can’t unsee it.
      </p>

      <p className="text-lg text-white/90 leading-snug">
        That’s what I write about: people at the breaking point and the moment where who they’ve been pretending to be stops working.
      </p>

      <p className="text-lg text-white/90 leading-snug">
        I don’t build characters. I follow them. And eventually, the truth shows up.
      </p>

      <p className="pt-5 text-xl font-semibold text-white leading-snug">
        I didn’t come to storytelling to escape anything. I came to face it.
      </p>

      <p className="pt-2 text-4xl font-semibold leading-tight text-white">
        And I chose to write about it.
      </p>

      <div className="flex justify-end pr-16 -mt-2">
        <img
          src="/images/signature.png"
          alt="Signature"
          className="w-[180px] opacity-85 rotate-[2deg]"
        />
      </div>

    </div>

  </div>

  {/* SCROLL (DESKTOP ONLY) */}
  <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center text-white/50">

    <span className="text-[10px] uppercase tracking-[0.3em] mb-3">
      Scroll
    </span>

    <div className="w-5 h-9 border border-white/30 rounded-full flex items-start justify-center p-1 overflow-hidden">
      <div
        className="w-1 h-2 bg-white rounded-full"
        style={{
          animation: "scrollDot 1.6s ease-in-out infinite"
        }}
      />
    </div>

    <style jsx>{`
      @keyframes scrollDot {
        0% { transform: translateY(0); opacity: 0; }
        40% { opacity: 1; }
        100% { transform: translateY(12px); opacity: 0; }
      }
    `}</style>

  </div>

</section>

      {/* ================= PROOF ================= */}
      <section className="px-6 md:px-16 py-32 border-t border-zinc-900 text-center">

        <p className="text-xs uppercase tracking-[0.35em] text-zinc-500 mb-12">
          Recognized By
        </p>

        <div className="
          max-w-xl mx-auto
          flex flex-col items-center gap-y-3
          md:flex-row md:flex-wrap md:justify-center md:gap-x-8 md:gap-y-3
          text-zinc-400
        ">
          <div>Austin Film Festival</div>
          <div>Script Pipeline</div>
          <div>Final Draft Big Break</div>
          <div>PAGE Awards</div>
          <div>Nashville Film Festival</div>
        </div>

        <div className="mt-16 max-w-2xl mx-auto">
          <p className="text-white/60 italic text-lg leading-relaxed">
            “An existential grittiness… that could satisfy the same audience drawn to Nic Pizzolatto’s work.”
          </p>

          <p className="text-white/30 text-xs uppercase tracking-[0.2em] mt-4">
            — The Black List
          </p>
        </div>

      </section>

      {/* ================= ACTION ================= */}
      <section className="px-6 md:px-16 py-32 border-t border-zinc-900 text-center">

        <div className="flex flex-col md:flex-row justify-center gap-6">

          <button
            onClick={() => setShowResume(true)}
            className="
              px-8 py-4
              text-sm uppercase tracking-[0.3em]
              border border-white/50
              text-white
              bg-white/10
              hover:bg-white/20
            "
          >
            View Résumé
          </button>

          <a
            href="/work"
            className="
              px-8 py-4
              text-sm uppercase tracking-[0.3em]
              border border-white/50
              text-white
              bg-white/10
              hover:bg-white/20
            "
          >
            View Work
          </a>

        </div>

      </section>

      {/* ================= FOOTER ================= */}
      <footer className="px-6 md:px-16 py-16 border-t border-zinc-900 text-center text-xs text-white/40">
        <p className="mb-4">
          All scripts, concepts, and materials on this site are the original work of Kris Shuman and are protected under applicable copyright laws.
        </p>

        <p>
          © {new Date().getFullYear()} krisshuman.com · Bad Bella Productions. All rights reserved.
        </p>
      </footer>

      {/* ================= RESUME MODAL ================= */}
      {showResume && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-6"
          onClick={() => setShowResume(false)}
        >
          <div
            className="relative w-full max-w-4xl h-[80vh] bg-black border border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe src="/resume.pdf" className="w-full h-full" />

            <button
              onClick={() => setShowResume(false)}
              className="absolute top-4 right-6 text-white/60 hover:text-white text-xs uppercase tracking-[0.3em]"
            >
              Close
            </button>
          </div>
        </div>
      )}

    </main>
  );
}