// Paths are resolved from wherever the CLI is invoked, which build_site.py
// pins to the site root. Scans the BUILT html plus main.js, so it catches both
// the classes build_site.py assembles in f-strings and the ones the scripts
// toggle at runtime.
module.exports = {
  content: [
    "./index.html", "./about.html", "./work.html",
    "./projects/*.html",
    "./js/*.js",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Fraunces", "Georgia", "serif"],
      },
      colors: {
        ember: { DEFAULT: "#C9824A", light: "#E2A571", dark: "#7A3B2E" },
        gold: "#D8B25C",
      },
    },
  },
};
