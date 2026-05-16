"use client";

import { useEffect, useState } from "react";

export default function BackToTop() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowTop(window.scrollY > window.innerHeight * 0.4);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (!showTop) return null;

  return (
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
  );
}