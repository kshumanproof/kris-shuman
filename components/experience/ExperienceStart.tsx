"use client";

import { useEffect, useState } from "react";

export default function ExperienceStart({ onBegin, onExit }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 150);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-6"
      onClick={onExit}
    >
      <div
        className={`
          relative w-full max-w-4xl
          flex flex-col items-center
          space-y-10

          transition-all duration-500
          ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
        `}
        onClick={(e) => e.stopPropagation()}
      >
        {/* EXIT */}
        <button
          onClick={onExit}
          className="cursor-pointer absolute -top-8 right-0 text-white/40 hover:text-white text-[10px] uppercase tracking-[0.3em] transition"
        >
          Exit Experience
        </button>

        {/* 🎥 SAME IMAGE FRAME AS PROMPTS */}
        <div className="w-full aspect-video overflow-hidden relative">
          <img
            src="/images/lords/lords.png" // 👈 use your hero image here
            alt="Experience Start"
            className="w-full h-full object-cover scale-105"
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>

        {/* TEXT */}
        <p className="max-w-2xl text-xl md:text-3xl leading-relaxed text-center text-white/90 font-light">
          Every story starts with a choice.
        </p>

        {/* BEGIN (same style as choices) */}
        <div className="flex flex-col items-center gap-4 pt-4">
          <button
  onClick={onBegin}
  className="
    relative
cursor-pointer
    text-white/80 hover:text-white

    text-sm md:text-base
    tracking-[0.4em]

    transition duration-300

    animate-pulse-slow
  "
>
  <span className="relative z-10">
    START YOUR ADVENTURE
  </span>

  {/* GLOW LAYER */}
  <span
    className="
      absolute inset-0
      blur-xl
      opacity-40
      bg-white
      animate-glow
    "
  />
</button>
        </div>
      </div>
    </div>
  );
}