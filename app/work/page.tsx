"use client";

import { projects } from "@/lib/projects";
import BackToTop from "@/components/BackToTop";
import SiteNav from "@/components/SiteNav";

export default function WorkPage() {
  const activeProjects = projects.filter((p) => p.active);

  const produced = activeProjects.filter((p) =>
    ["Post-Production", "In Production"].includes(p.status)
  );

  const development = activeProjects.filter((p) =>
    ["In Development"].includes(p.status)
  );

  const early = activeProjects.filter((p) =>
    ["Early Development", "Concept"].includes(p.status)
  );

  // 🔥 NEW: RENDER BY FORMAT (Feature / TV / Short)
  const renderProjects = (list: typeof projects) => {
    const formats = ["feature", "tv", "short"] as const;

    return formats.map((format) => {
      const filtered = list.filter((p) => p.format === format);

      if (filtered.length === 0) return null;

      return (
        <div key={format} className="space-y-16">
          
          {/* SUBHEADER */}
          <h3 className="text-xs uppercase tracking-[0.25em] text-white/40">
            {format === "feature"
              ? "Features"
              : format === "tv"
              ? "Television"
              : "Shorts"}
          </h3>

          <div className="space-y-32">
            {filtered.map((project, i) => {
              const isLeft = i % 2 === 0;

              return (
                <a
                  key={project.slug}
                  href={`/projects/${project.slug}`}
                  className="group block transition duration-500 hover:-translate-y-1"
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
                      <div className="absolute top-3 left-3 z-10 text-[10px] uppercase tracking-[0.3em] bg-black/60 px-3 py-1 text-white/70">
                        {project.status}
                      </div>

                      {project.mediaType === "video" && project.mediaSrc ? (
                        <video
                          src={project.mediaSrc}
                          autoPlay
                          muted
                          loop
                          playsInline
                          className="w-full h-full object-cover transition duration-700 group-hover:scale-[1.03] group-hover:brightness-110 group-hover:saturate-125"
                        />
                      ) : (
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover transition duration-700 group-hover:scale-[1.03] group-hover:brightness-110 group-hover:saturate-125"
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

                      <span className="text-xs uppercase tracking-[0.3em] text-zinc-500 group-hover:text-white transition">
                        View Project →
                      </span>
                    </div>

                  </div>
                </a>
              );
            })}
          </div>

        </div>
      );
    });
  };

  return (
    <>
  <SiteNav />
    <main className="bg-[#0B0B0C] text-white px-6 md:px-16 pt-24 pb-32">

  


      {/* HEADER */}
<div className="max-w-3xl mt-20 mb-20">
        

        <h1 className="text-3xl md:text-5xl font-bold leading-tight">
          Stories about identity, consequence, and what refuses to stay buried.
        </h1>
      </div>
      {/* ================= SECTION NAV ================= */}
<div className="sticky top-0 z-40 bg-[#0B0B0C]/90 backdrop-blur-md border-y border-white/10 py-4 mb-20">

  <div className="flex flex-wrap justify-center gap-8 text-xs uppercase tracking-[0.25em] text-white/60">

    <a
      href="#produced"
      className="hover:text-white transition"
    >
      Produced
    </a>

    <a
      href="#development"
      className="hover:text-white transition"
    >
      In Development
    </a>

    <a
      href="#early"
      className="hover:text-white transition"
    >
      Early / Concept
    </a>

  </div>

</div>

      {/* PROJECT LIST */}
<div className="space-y-32">

  {/* PRODUCED / IN PRODUCTION */}
{activeProjects.filter(p =>
  ["Post-Production", "In Production"].includes(p.status)
).length > 0 && (
  <section id="produced">
    <h2 className="text-lg uppercase tracking-[0.3em] text-zinc-200 mb-12">
      Produced & In Production
    </h2>

    {["feature", "tv", "short"].map((format) => {
      const filtered = activeProjects
        .filter(p =>
          ["Post-Production", "In Production"].includes(p.status)
        )
        .filter(p => p.format === format);

      if (filtered.length === 0) return null;

      return (
        <div key={format} className="space-y-32">

          {/* FORMAT HEADER */}
          <h3 className="text-sm uppercase tracking-[0.25em] text-white/60">
            {format === "feature"
              ? "Features"
              : format === "tv"
              ? "Television"
              : "Shorts"}
          </h3>

          {filtered.map((project, i) => {
            const isLeft = i % 2 === 0;

            return (
              <a
                key={project.slug}
                href={`/projects/${project.slug}`}
                className="group block transition duration-500 hover:-translate-y-1"
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
                    <div className="absolute top-3 left-3 z-10 text-[10px] uppercase tracking-[0.3em] bg-black/60 px-3 py-1 text-white/70">
                      {project.status}
                    </div>

                    {project.mediaType === "video" && project.mediaSrc ? (
                      <video
                        src={project.mediaSrc}
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="w-full h-full object-cover transition duration-700 group-hover:scale-[1.03] group-hover:brightness-110 group-hover:saturate-125"
                      />
                    ) : (
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition duration-700 group-hover:scale-[1.03] group-hover:brightness-110 group-hover:saturate-125"
                      />
                    )}
                  </div>

                  {/* TEXT */}
                  <div className={`${isLeft ? "" : "md:order-1"}`}>
                    <h2 className="text-2xl md:text-3xl font-semibold mb-0 group-hover:text-white transition">
                      {project.title}
                    </h2>

                    <p className="text-sm uppercase tracking-[0.18em] text-zinc-500 mb-5 max-w-md">
  {project.genre}
</p>

<p className="text-lg text-zinc-100 leading-relaxed mb-5 max-w-md">
  {project.zinger}
</p>

<p className="text-[15px] leading-relaxed text-zinc-400 mb-6 max-w-md">
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
      );
    })}
  </section>
)}

  {/* IN DEVELOPMENT */}
{activeProjects.filter(p =>
  ["In Development"].includes(p.status)
).length > 0 && (
  <section id="development">
    <h2 className="text-lg uppercase tracking-[0.3em] text-zinc-200 mb-12">
      In Development
    </h2>

    {["feature", "tv", "short"].map((format) => {
      const filtered = activeProjects
        .filter(p => ["In Development"].includes(p.status))
        .filter(p => p.format === format);

      if (filtered.length === 0) return null;

      return (
        <div key={format} className="space-y-32">

          {/* FORMAT HEADER */}
          <h3 className="text-md uppercase tracking-[0.25em] text-white/60">
            {format === "feature"
              ? "Features"
              : format === "tv"
              ? "Television"
              : "Shorts"}
          </h3>

          {filtered.map((project, i) => {
            const isLeft = i % 2 === 0;

            return (
              <a
                key={project.slug}
                href={`/projects/${project.slug}`}
                className="group block transition duration-500 hover:-translate-y-1"
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
                    <div className="absolute top-3 left-3 z-10 text-[10px] uppercase tracking-[0.3em] bg-black/60 px-3 py-1 text-white/70">
                      {project.status}
                    </div>

                    {project.mediaType === "video" && project.mediaSrc ? (
                      <video
                        src={project.mediaSrc}
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="w-full h-full object-cover transition duration-700 group-hover:scale-[1.03] group-hover:brightness-110 group-hover:saturate-125"
                      />
                    ) : (
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition duration-700 group-hover:scale-[1.03] group-hover:brightness-110 group-hover:saturate-125"
                      />
                    )}
                  </div>

                  {/* TEXT */}
                  <div className={`${isLeft ? "" : "md:order-1"}`}>
                    <h2 className="text-2xl md:text-3xl font-semibold mb-0 group-hover:text-white transition">
                      {project.title}
                    </h2>

                    <p className="text-sm uppercase tracking-[0.18em] text-zinc-500 mb-5 max-w-md">
  {project.genre}
</p>

<p className="text-lg text-zinc-100 leading-relaxed mb-5 max-w-md">
  {project.zinger}
</p>

<p className="text-[15px] leading-relaxed text-zinc-400 mb-6 max-w-md">
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
      );
    })}
  </section>
)}

  {/* EARLY / CONCEPT */}
{activeProjects.filter(p =>
  ["Early Development", "Concept"].includes(p.status)
).length > 0 && (
  <section id="early">
    <h2 className="text-lg uppercase tracking-[0.3em] text-zinc-200 mb-12">
      Early / Concept
    </h2>

    {["feature", "tv", "short"].map((format) => {
      const filtered = activeProjects
        .filter(p =>
          ["Early Development", "Concept"].includes(p.status)
        )
        .filter(p => p.format === format);

      if (filtered.length === 0) return null;

      return (
        <div key={format} className="space-y-32">

          {/* FORMAT HEADER */}
          <h3 className="text-md uppercase tracking-[0.25em] text-white/60">
            {format === "feature"
              ? "Features"
              : format === "tv"
              ? "Television"
              : "Shorts"}
          </h3>

          {filtered.map((project, i) => {
            const isLeft = i % 2 === 0;

            return (
              <a
                key={project.slug}
                href={`/projects/${project.slug}`}
                className="group block transition duration-500 hover:-translate-y-1"
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
                    <div className="absolute top-3 left-3 z-10 text-[10px] uppercase tracking-[0.3em] bg-black/60 px-3 py-1 text-white/70">
                      {project.status}
                    </div>

                    {project.mediaType === "video" && project.mediaSrc ? (
                      <video
                        src={project.mediaSrc}
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="w-full h-full object-cover transition duration-700 group-hover:scale-[1.03] group-hover:brightness-110 group-hover:saturate-125"
                      />
                    ) : (
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition duration-700 group-hover:scale-[1.03] group-hover:brightness-110 group-hover:saturate-125"
                      />
                    )}
                  </div>

                  {/* TEXT */}
                  <div className={`${isLeft ? "" : "md:order-1"}`}>
                    <h2 className="text-2xl md:text-3xl font-semibold mb-0 group-hover:text-white transition">
                      {project.title}
                    </h2>

                    <p className="text-sm uppercase tracking-[0.18em] text-zinc-500 mb-5 max-w-md">
  {project.genre}
</p>

<p className="text-lg text-zinc-100 leading-relaxed mb-5 max-w-md">
  {project.zinger}
</p>

<p className="text-[15px] leading-relaxed text-zinc-400 mb-6 max-w-md">
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
      );
    })}
  </section>
)}
</div>
{/* ================= FOOTER ================= */}
<footer className="px-6 md:px-16 py-16 border-t border-zinc-900 text-center text-xs text-white/40">
  <p className="mb-4">
    All scripts, concepts, and materials on this site are the original work of Kris Shuman and are protected under applicable copyright laws.
  </p>

  <p>
          © {new Date().getFullYear()} krisshuman.com · Bad Bella Productions. All rights reserved.
        </p>
</footer>
<BackToTop />
    </main>
</>
  );
}