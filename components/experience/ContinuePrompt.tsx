"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { experienceSteps } from "@/lib/experienceConfig";

export default function ContinuePrompt() {
  const [active, setActive] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const check = () => {
    const isActive = localStorage.getItem("experienceActive") === "true";
    const stepRaw = localStorage.getItem("experienceStep");
    const step = stepRaw ? parseInt(stepRaw, 10) : 0;

    const isHome = pathname === "/";

    setActive(isActive && step > 0 && !isHome);
  };

  useEffect(() => {
    check();
  }, [pathname]);

  useEffect(() => {
    window.addEventListener("focus", check);
    return () => {
      window.removeEventListener("focus", check);
    };
  }, []);

  if (!active) return null;

  return (
    <button
      onClick={() => {
        const stepRaw = localStorage.getItem("experienceStep");
        const step = stepRaw ? parseInt(stepRaw, 10) : 0;

        // 🔥 END OF EXPERIENCE
        if (step >= experienceSteps.length) {
          localStorage.setItem("experienceActive", "false");
          localStorage.removeItem("experienceStep");

          router.push("/?ending=true");
          return;
        }

        // 🔁 NORMAL FLOW
        window.dispatchEvent(new Event("experienceStart"));
      }}
      className="
        fixed right-6 top-1/2 -translate-y-1/2
        z-[9999]

        px-4 py-3
        text-xs uppercase tracking-[0.3em]

        border border-white/30
        text-white/70
        bg-black/40 backdrop-blur-sm

        hover:text-white hover:border-white/50 hover:bg-black/60

        transition duration-300
      "
    >
      Continue Game →
    </button>
  );
}