# krisshuman.com

Plain HTML, CSS, and vanilla JavaScript. No build step, no framework, no `npm install` required to edit or preview.

## Structure

- `index.html`, `about.html`, `work.html` — top-level pages
- `projects/` — the 14 individual project pages
- `images/` — all site images (including `images/laurels/` for festival/recognition logos)
- `css/styles.css` — custom styles layered on top of Tailwind's CDN script
- `js/main.js` — nav, modals, search, back-to-top
- `_build/` — optional generator script. Not needed to edit existing pages; only useful if you want to add a brand-new project page without hand-building one. See `_build/README.txt`.

## Editing

Open any `.html` file directly and edit the text/markup. No rebuild needed — just save and refresh the page in a browser.

## Deploying

This project deploys to Vercel via GitHub. Push to the connected branch and Vercel auto-deploys. Since there's no `package.json` anymore, make sure the Vercel project's Framework Preset is set to "Other" (not Next.js) so it serves the files as a static site instead of trying to run a Next.js build.
