"use client";

import { useEffect, useState } from "react";

export default function ExperiencePrompt({
  image,
  prompt,
  optionA,
  optionB,
  onSelect,
  onExit,
}) {
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
          space-y-8

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

        {/* 🎥 16:9 IMAGE FRAME */}
        <div className="w-full aspect-video overflow-hidden relative">
          {image && (
            <>
              <img
                src={image}
                alt="Experience Scene"
                className="w-full h-full object-cover scale-105"
              />
              <div className="absolute inset-0 bg-black/30" />
            </>
          )}
        </div>

        {/* PROMPT */}
        <p className="max-w-2xl text-xl md:text-3xl leading-relaxed text-center text-white/90 font-light">
          {prompt}
        </p>

        {/* OPTIONS */}
        <div className="flex flex-col items-center gap-4 pt-4">
          <button
            onClick={() => onSelect(optionA.project)}
            className="cursor-pointer
              text-white/70 hover:text-white
              text-sm md:text-base
              tracking-[0.3em]
              transition duration-300
            "
          >
            {optionA.text}
          </button>

          <div className="w-12 h-px bg-white/20" />

          <button
            onClick={() => onSelect(optionB.project)}
            className="cursor-pointer
              text-white/70 hover:text-white
              text-sm md:text-base
              tracking-[0.3em]
              transition duration-300
            "
          >
            {optionB.text}
          </button>
        </div>
      </div>
    </div>
  );
}