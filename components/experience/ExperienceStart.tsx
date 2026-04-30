"use client";

export default function ExperienceStart({ onBegin, onExit }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-6">

      <div className="relative w-full max-w-xl bg-black border border-white/10 p-10 text-center space-y-6">

        {/* EXIT */}
        <button
          onClick={onExit}
          className="absolute top-4 right-4 text-white/50 hover:text-white text-xs uppercase tracking-[0.2em]"
        >
          Exit
        </button>

        <p className="text-xl md:text-2xl leading-relaxed">
          Every story starts with a choice.
        </p>

        <button
          onClick={onBegin}
          className="border border-white/50 px-6 py-3 uppercase tracking-[0.3em] text-sm hover:bg-white hover:text-black transition"
        >
          Begin
        </button>

      </div>
    </div>
  );
}