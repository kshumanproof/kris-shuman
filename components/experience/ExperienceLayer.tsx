"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ExperiencePrompt from "./ExperiencePrompt";
import { experienceSteps } from "@/lib/experienceConfig";

export default function ExperienceLayer() {
  const router = useRouter();

  const [active, setActive] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const [step, setStep] = useState(0);

  // ✅ Initialize state ONLY (no auto prompt)
  useEffect(() => {
    const isActive = localStorage.getItem("experienceActive") === "true";
    const savedStep = localStorage.getItem("experienceStep");

    if (isActive && savedStep !== null) {
      setActive(true);
      setStep(parseInt(savedStep, 10));
    }
  }, []);

  // ✅ Listen for manual triggers (Begin + Continue)
  useEffect(() => {
    const handleStart = () => {
      const isActive = localStorage.getItem("experienceActive") === "true";
      const savedStep = localStorage.getItem("experienceStep");

      if (isActive && savedStep !== null) {
        setActive(true);
        setStep(parseInt(savedStep, 10));
        setShowPrompt(true);
      }
    };

    window.addEventListener("experienceStart", handleStart);

    return () => {
      window.removeEventListener("experienceStart", handleStart);
    };
  }, []);

  // 👉 If not active or not showing, render nothing
  if (!active || !showPrompt) return null;

  // 👉 End of experience
  if (step >= experienceSteps.length) {
    localStorage.setItem("experienceActive", "false");
    localStorage.removeItem("experienceStep");
    setActive(false);
    return null;
  }

  const current = experienceSteps[step];
  if (!current) return null;

  return (
    <ExperiencePrompt
      image={current.image}
      prompt={current.prompt}
      optionA={{
        text: current.options[0].text,
        project: current.options[0].project,
      }}
      optionB={{
        text: current.options[1].text,
        project: current.options[1].project,
      }}
      onSelect={(route: string) => {
        const nextStep = step + 1;

        localStorage.setItem("experienceStep", nextStep.toString());

        // ✅ Hide prompt immediately
        setShowPrompt(false);

        // ✅ Navigate to selected project
        router.push(route);
      }}
      onExit={() => {
  localStorage.setItem("experienceActive", "false");
  localStorage.removeItem("experienceStep");

  setActive(false);

  // 🔥 notify rest of app immediately
  window.dispatchEvent(new Event("experienceChanged"));
}}
    />
  );
}