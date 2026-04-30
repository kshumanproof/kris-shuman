"use client";

export default function ExperiencePrompt({
  image,
  prompt,
  optionA,
  optionB,
  onSelect,
  onExit,
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-6"
      onClick={onExit}
    >
      <div
        className="relative w-full max-w-3xl bg-black border border-white/10 p-8 md:p-10 space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* EXIT */}
        <button
          onClick={onExit}
          className="absolute top-4 right-4 text-white/50 hover:text-white text-xs uppercase tracking-[0.2em]"
        >
          Exit Experience
        </button>

        {/* IMAGE */}
        <div className="w-full aspect-video bg-zinc-800 flex items-center justify-center overflow-hidden">
          {image ? (
            <img
              src={image}
              alt="Experience Scene"
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-white/30">Image Placeholder</span>
          )}
        </div>

        {/* PROMPT */}
        <p className="text-xl md:text-2xl leading-relaxed text-center">
          {prompt}
        </p>

        {/* OPTIONS */}
        <div className="flex flex-col md:flex-row gap-4">
          <button
            onClick={() => onSelect(optionA.project)}
            className="flex-1 border border-white/40 py-4 px-6 text-left hover:bg-white hover:text-black transition"
          >
            {optionA.text}
          </button>

          <button
            onClick={() => onSelect(optionB.project)}
            className="flex-1 border border-white/40 py-4 px-6 text-left hover:bg-white hover:text-black transition"
          >
            {optionB.text}
          </button>
        </div>
      </div>
    </div>
  );
}