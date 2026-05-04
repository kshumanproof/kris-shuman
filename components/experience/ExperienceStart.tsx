"use client";

import { useEffect, useState } from "react";

type Props = {
  onBegin: () => void;
  onExit: () => void;
};

export default function ExperienceStart({ onBegin, onExit }: Props) {
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
          className="cursor-pointer absolute -top-8 right-0 text-white/60 hover:text-white text-[10px] uppercase tracking-[0.3em] transition"
        >
          Nevermind...I don't like fun.
        </button>

        {/* IMAGE */}
        <div className="w-full aspect-video overflow-hidden relative">
          <img
            src="/images/experience/start.png"
            alt="Experience Start"
            className="w-full h-full object-cover scale-105"
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>

        {/* TEXT */}
        

        {/* BEGIN */}
        <div className="flex flex-col items-center gap-4 pt-4">
          <button
  onClick={() => {
    localStorage.setItem("experienceStarted", "true");
    onBegin();
  }}
  className="
    group relative

    text-white
    text-xl md:text-3xl
    font-light

    tracking-[0.15em]

    transition duration-300
  "
>
  <span className="relative z-10">
    START YOUR JOURNEY
  </span>

  {/* underline grow */}
  <span
    className="
      absolute left-0 -bottom-2 h-px w-0
      bg-white/70
      transition-all duration-300
      group-hover:w-full
    "
  />

  {/* subtle glow */}
  <span
    className="
      absolute inset-0
      opacity-0 group-hover:opacity-100
      blur-xl
      bg-white/20
      transition duration-300
    "
  />
</button>
        </div>
      </div>
    </div>
  );
}