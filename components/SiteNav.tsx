"use client";

import { useState } from "react";

export default function SiteNav() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* DESKTOP + MOBILE BAR */}
      <header
        className="
          fixed top-0 left-0 w-full z-50
          bg-black/30 backdrop-blur-md
          border-b border-white/10
        "
      >
        <div
          className="
            max-w-7xl mx-auto
            px-6 md:px-12
            h-20
            flex items-center justify-between
          "
        >
          {/* LOGO */}
          <a
            href="/"
            className="
              text-sm md:text-base
              uppercase tracking-[0.25em]
              text-white/70
              hover:text-white
              transition duration-300
            "
          >
            Kris Shuman
          </a>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex items-center gap-10">
            <a
              href="/work"
              className="
                text-xs uppercase tracking-[0.25em]
                text-white/60
                hover:text-white
                transition duration-300
              "
            >
              Work
            </a>

            <a
              href="/about"
              className="
                text-xs uppercase tracking-[0.25em]
                text-white/60
                hover:text-white
                transition duration-300
              "
            >
              About
            </a>

            <a
              href="/#contact"
              className="
                text-xs uppercase tracking-[0.25em]
                text-white/60
                hover:text-white
                transition duration-300
              "
            >
              Contact
            </a>
          </nav>

          {/* MOBILE BUTTON */}
          <button
            onClick={() => setOpen(true)}
            className="
              md:hidden
              text-xs uppercase tracking-[0.3em]
              text-white/70
              hover:text-white
              transition
            "
          >
            Menu
          </button>
        </div>
      </header>

      {/* MOBILE OVERLAY */}
      {open && (
        <div
          className="
            fixed inset-0 z-[999]
            bg-black/95 backdrop-blur-xl
            flex flex-col items-center justify-center
          "
        >
          {/* CLOSE */}
          <button
            onClick={() => setOpen(false)}
            className="
              absolute top-8 right-8
              text-xs uppercase tracking-[0.3em]
              text-white/50 hover:text-white
              transition
            "
          >
            Close
          </button>

          {/* LINKS */}
          <nav className="flex flex-col items-center gap-10">
            <a
              href="/"
              onClick={() => setOpen(false)}
              className="
                text-2xl uppercase tracking-[0.2em]
                text-white/80 hover:text-white
                transition
              "
            >
              Home
            </a>

            <a
              href="/work"
              onClick={() => setOpen(false)}
              className="
                text-2xl uppercase tracking-[0.2em]
                text-white/80 hover:text-white
                transition
              "
            >
              Work
            </a>

            <a
              href="/about"
              onClick={() => setOpen(false)}
              className="
                text-2xl uppercase tracking-[0.2em]
                text-white/80 hover:text-white
                transition
              "
            >
              About
            </a>

            <a
              href="/#contact"
              onClick={() => setOpen(false)}
              className="
                text-2xl uppercase tracking-[0.2em]
                text-white/80 hover:text-white
                transition
              "
            >
              Contact
            </a>
          </nav>
        </div>
      )}
    </>
  );
}