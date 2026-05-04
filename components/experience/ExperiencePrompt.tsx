"use client";

import { useEffect, useState } from "react";

type Option = {
  text: string;
  project: string;
};

type Props = {
  image: string;
  prompt: string;
  optionA: Option;
  optionB: Option;
  onSelect: (route: string) => void;
  onExit: () => void;
};

export default function ExperiencePrompt({
  image,
  prompt,
  optionA,
  optionB,
  onSelect,
  onExit,
}: Props) {
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
          relative w-full max-w-4xl mx-auto
          flex flex-col space-y-5

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
          Exit Adventure
        </button>

        {/* 🎥 IMAGE */}
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

        {/* TEXT + OPTIONS SHARE WIDTH */}
        <div className="w-full">
          {/* PROMPT */}
          <p className="text-left text-lg md:text-2xl leading-snug text-white/85 font-light">
            {prompt}
          </p>

          {/* OPTIONS */}
          <div className="flex flex-col items-start gap-3 w-full mt-4">
            <button
              onClick={() => onSelect(optionA.project)}
              className="
                cursor-pointer
                text-left w-full
                text-white/70 hover:text-white
                text-sm md:text-base
                tracking-[0.3em]
                transition duration-300
              "
            >
              {"A) " + optionA.text}
            </button>

            {/* FULL WIDTH DIVIDER */}
            <div className="w-full h-px bg-white/20" />

            <button
              onClick={() => onSelect(optionB.project)}
              className="
                cursor-pointer
                text-left w-full
                text-white/70 hover:text-white
                text-sm md:text-base
                tracking-[0.3em]
                transition duration-300
              "
            >
              {"B) " + optionB.text}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}