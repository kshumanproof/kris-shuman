"use client";

import { projects } from "@/lib/projects";

export default function WorkPage() {
  const activeProjects = projects.filter((p) => p.active);

  return (
    <main className="bg-[#0B0B0C] text-white px-6 md:px-16 py-24 space-y-32">
{/* 🔥 TOP NAV (matches homepage) */}
<div className="absolute top-6 left-6 right-6 z-50 flex justify-between items-center">
  <a
    href="/"
    className="text-xl uppercase tracking-[0.2em] text-white/70 hover:text-white transition"
  >
    Kris Shuman
  </a>

  <a
    href="/#writer"
    className="text-xl uppercase tracking-[0.2em] text-white/60 hover:text-white transition"
  >
    The Writer
  </a>
</div>

      {/* HEADER */}
      <div className="max-w-3xl">
        <p className="text-xs uppercase tracking-[0.3em] text-zinc-500 mb-4">
          All Projects
        </p>

        <h1 className="text-3xl md:text-5xl font-bold leading-tight">
          Stories about identity, consequence, and what refuses to stay buried.
        </h1>
      </div>

      {/* PROJECT LIST */}
      <div className="space-y-32">

        {activeProjects.map((project, i) => {
  const isLeft = i % 2 === 0;

  return (
    <a
      key={project.slug}
      href={`/projects/${project.slug}`}
      className="group block"
    >
      <div className="grid md:grid-cols-2 gap-10 items-center">

        {/* MEDIA */}
        <div
          className={`
            relative
            w-full aspect-video overflow-hidden bg-zinc-900
            ${isLeft ? "" : "md:order-2"}
          `}
        >
          {/* 🔥 STATUS BADGE */}
          <div className="absolute top-3 left-3 z-10 text-[10px] uppercase tracking-[0.3em] bg-black/60 px-3 py-1 text-white/70">
            {project.status}
          </div>

          {/* 🔥 VIDEO OR IMAGE */}
          {project.mediaType === "video" && project.mediaSrc ? (
            <video
              src={project.mediaSrc}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover transition duration-700 group-hover:scale-105"
            />
          ) : (
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover transition duration-700 group-hover:scale-105"
            />
          )}
        </div>

        {/* TEXT */}
        <div className={`${isLeft ? "" : "md:order-1"}`}>
          <h2 className="text-2xl md:text-3xl font-semibold mb-0 group-hover:text-white transition">
            {project.title}
          </h2>
          <p className="text-zinc-400 mb-6 max-w-md">
            {project.genre}
          </p>

          <p className="text-zinc-400 mb-6 max-w-md">
            {project.zinger}
          </p>
	  
	  <p className="text-zinc-400 mb-6 max-w-md">
            {project.overview}
          </p>

          <span className="text-xs uppercase tracking-[0.3em] text-zinc-500 group-hover:text-white transition">
            View Project →
          </span>
        </div>

      </div>
    </a>
  );
})}
      </div>
{/* ================= FOOTER ================= */}
<footer className="px-6 md:px-16 py-16 border-t border-zinc-900 text-center text-xs text-white/40">
  <p className="mb-4">
    All scripts, concepts, and materials on this site are the original work of Kris Shuman and are protected under applicable copyright laws.
  </p>

  <p>
    © 2023–{new Date().getFullYear()} krisshuman.com · Bad Bella Productions. All rights reserved.
  </p>
</footer>
    </main>
  );
}