#!/usr/bin/env python3
import datetime
import json
import os
import sys

from PIL import Image
sys.path.insert(0, ".")
from data import PROJECTS, FORMAT_LABEL, STATUS_GROUPS, RECOGNITION, TIER1_ORGS, ORG_SHORT, PRESS_QUOTE

# Site root = the folder above this one, so the builder works from any checkout.
OUT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

SITE_URL = "https://krisshuman.com"
GA_ID = "G-7LMZHXYYBF"
CALENDLY = "https://calendly.com/kris-krisshuman/30min"
FORMSPREE = "https://formspree.io/f/mgorgjgb"

# Site-wide share card. A real photograph - the homepage hero, which is also the
# grade reference for every project hero - cut to the 1.91:1 shape social cards
# actually render. Filename is deliberately new so Facebook, LinkedIn and X fetch
# it fresh instead of serving whatever they cached for the old one.
SITE_COVER = "/og-cover.jpg"
SITE_COVER_ALT = "A dirt road running into dense Southern pine woods under a flat grey sky"

_DIMS = {}


def image_dims(rel_path):
    """Real pixel size of an image, read once per build. Social platforms use the
    declared width/height to lay a card out before the file arrives, so guessing
    them - as this file did with a hardcoded 1200x630 - gets the card cropped."""
    if rel_path not in _DIMS:
        try:
            with Image.open(os.path.join(OUT, rel_path.lstrip("/"))) as im:
                _DIMS[rel_path] = im.size
        except Exception:
            _DIMS[rel_path] = (1200, 630)
    return _DIMS[rel_path]

ACTIVE_PROJECTS = [p for p in PROJECTS if p["active"]]

RECOGNITION_SLUGS = {
    "The Black List": "the-black-list",
    "Austin Film Festival": "austin-film-festival",
    "Script Pipeline": "script-pipeline",
    "Final Draft Big Break": "final-draft-big-break",
    "PAGE Awards": "page-awards",
    "Nashville Film Festival": "nashville-film-festival",
    "HollyShorts Film Festival": "hollyshorts",
}


def logo_exists(slug):
    for ext in ("webp", "png", "svg", "jpg"):
        if os.path.exists(f"{OUT}/images/laurels/{slug}.{ext}"):
            return f"images/laurels/{slug}.{ext}"
    return None


def related(slug, n=3):
    pool = [p for p in ACTIVE_PROJECTS if p["slug"] != slug]
    slugs = [pr["slug"] for pr in ACTIVE_PROJECTS]
    idx = slugs.index(slug) if slug in slugs else 0
    rotated = pool[idx:] + pool[:idx]
    return rotated[:n]


def esc(s):
    return s.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;").replace('"', "&quot;")


LAUREL_SVG = """<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" class="laurel">
  <g stroke="currentColor" stroke-width="1.6" stroke-linecap="round">
    <path d="M30 8c-7 4-11 11-11 20s4 16 11 24"/>
    <path d="M22 14c-3 1-6 3-7 5M19 22c-3 0-6 1-8 3M18 31c-3 -1 -6 0 -8 1M19 40c-3 -1 -6 -3 -7 -5M22 48c-2 -2 -4 -4 -5 -6"/>
    <path d="M34 8c7 4 11 11 11 20s-4 16-11 24"/>
    <path d="M42 14c3 1 6 3 7 5M45 22c3 0 6 1 8 3M46 31c3 -1 6 0 8 1M45 40c3 -1 6 -3 7 -5M42 48c2 -2 4 -4 5 -6"/>
  </g>
</svg>"""


def recognition_badge(name):
    slug = RECOGNITION_SLUGS.get(name, name.lower().replace(" ", "-"))
    logo = logo_exists(slug)
    if logo:
        inner = f'<img src="{logo}" alt="{esc(name)}" loading="lazy" class="h-14 md:h-16 w-auto object-contain mx-auto">'
    else:
        inner = f'<span class="text-ember/80">{LAUREL_SVG}</span><span class="text-[11px] md:text-xs uppercase tracking-[0.18em] text-zinc-300 leading-tight">{esc(name)}</span>'
    return f'<div class="flex flex-col items-center gap-2 px-8 md:px-12 shrink-0">{inner}</div>'


def pull_quote(text, speaker=None, size="text-2xl md:text-4xl"):
    speaker_html = f'<p class="mt-5 text-xs tracking-[0.25em] uppercase text-zinc-500">&mdash; {esc(speaker)}</p>' if speaker else ""
    return f"""
        <div class="relative max-w-3xl mx-auto text-center px-2">
          <span aria-hidden="true" class="font-display text-ember/30 text-6xl md:text-8xl leading-none select-none">&ldquo;</span>
          <p class="font-display italic {size} text-zinc-100 leading-[1.25] -mt-6 md:-mt-10">{esc(text)}</p>
          {speaker_html}
        </div>
"""


# ---------- shared chrome ----------

def nav(prefix, current=""):
    home = prefix + "index.html"
    work = prefix + "work.html"
    about = prefix + "about.html"
    contact = prefix + "index.html#contact"
    return f"""
  <header class="fixed top-0 left-0 w-full z-50 bg-black/40 backdrop-blur-md border-b border-white/10">
    <div class="max-w-7xl mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
      <a href="{home}" class="font-display text-base md:text-lg tracking-[0.1em] text-white/85 hover:text-white transition">Kris Shuman</a>
      <nav class="hidden md:flex items-center gap-10">
        <a href="{work}" class="text-xs uppercase tracking-[0.25em] text-white/60 hover:text-ember transition">The Slate</a>
        <a href="{about}" class="text-xs uppercase tracking-[0.25em] text-white/60 hover:text-ember transition">About</a>
        <a href="{contact}" class="text-xs uppercase tracking-[0.25em] text-white/60 hover:text-ember transition">Contact</a>
      </nav>
      <button id="navToggle" class="tap-target md:hidden text-xs uppercase tracking-[0.3em] text-white/70 hover:text-white transition -mr-2 px-3">Menu</button>
    </div>
  </header>

  <div id="navOverlay" class="hidden fixed inset-0 z-[999] bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center">
    <button id="navClose" class="tap-target absolute top-6 right-6 text-xs uppercase tracking-[0.3em] text-white/50 hover:text-white transition px-3">Close</button>
    <nav class="flex flex-col items-center gap-10">
      <a href="{home}" class="text-2xl uppercase tracking-[0.2em] text-white/80 hover:text-ember transition">Home</a>
      <a href="{work}" class="text-2xl uppercase tracking-[0.2em] text-white/80 hover:text-ember transition">The Slate</a>
      <a href="{about}" class="text-2xl uppercase tracking-[0.2em] text-white/80 hover:text-ember transition">About</a>
      <a href="{contact}" class="text-2xl uppercase tracking-[0.2em] text-white/80 hover:text-ember transition">Contact</a>
    </nav>
  </div>
"""


def footer(prefix):
    return f"""
  <footer class="px-6 md:px-16 py-16 border-t border-white/5 text-center text-xs text-white/35">
    <p class="mb-4 max-w-3xl mx-auto leading-relaxed">All scripts, concepts, and materials on this site are the original work of Kris Shuman and are protected under applicable copyright laws. All imagery is photographic: titles in development use licensed stock photography, and produced titles use frames from the finished films.</p>
    <p>&copy; <span id="year"></span> krisshuman.com &middot; Bad Bella Productions. All rights reserved.</p>
  </footer>
"""


def back_to_top():
    return """
  <button id="backToTop" type="button" aria-label="Back to top"
    class="hidden fixed bottom-6 right-6 z-[90] w-11 h-11 items-center justify-center border border-white/30 text-white text-sm bg-black/60 backdrop-blur-sm hover:border-ember hover:text-ember transition shadow-[0_0_20px_rgba(0,0,0,0.4)]">
    &uarr;
  </button>
"""


def calendly_modal():
    return f"""
  <div id="calendlyModal" class="hidden fixed inset-0 z-[100] bg-black/85 flex items-center justify-center p-4">
    <button type="button" data-close-calendly class="tap-target absolute top-6 right-6 z-[110] text-white text-sm uppercase tracking-[0.2em] hover:text-ember transition px-3">Close</button>
    <div class="w-full max-w-4xl h-[80vh] bg-white rounded-md overflow-hidden shadow-[0_0_60px_rgba(0,0,0,0.6)]">
      <iframe src="{CALENDLY}" class="w-full h-full" title="Schedule a call with Kris Shuman"></iframe>
    </div>
  </div>
"""


def request_modal():
    return f"""
  <div id="requestModal" class="hidden fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4">
    <div class="bg-[#0f0c0a] border border-white/15 p-8 w-full max-w-md relative">
      <button type="button" data-close-request class="tap-target absolute top-2 right-2 text-white/50 hover:text-white">&#10005;</button>
      <h2 class="font-display text-2xl mb-2">Request Materials</h2>
      <p id="requestProjectLabel" class="text-sm text-white/50 mb-6"></p>
      <form id="requestForm" action="{FORMSPREE}" method="POST" class="space-y-4">
        <input type="email" name="email" placeholder="Your email" required class="w-full px-4 py-3 bg-black border border-white/20 text-white focus:border-ember outline-none">
        <textarea name="message" placeholder="What caught your interest? (optional)" class="w-full px-4 py-3 bg-black border border-white/20 text-white focus:border-ember outline-none"></textarea>
        <input type="hidden" name="project" id="requestProjectField" value="">
        <button type="submit" class="w-full px-6 py-3 text-xs uppercase tracking-[0.3em] border border-ember text-white bg-ember/15 hover:bg-ember/30 transition">Request Materials</button>
      </form>
      <div id="requestSuccess" class="hidden text-center space-y-4">
        <p class="text-lg">Got it.</p>
        <p class="text-sm text-white/60">I&rsquo;ll send it over shortly.</p>
        <button type="button" data-close-request class="mt-2 text-sm underline text-white/60 hover:text-white">Close</button>
      </div>
    </div>
  </div>
"""


PERSON_JSONLD = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Kris Shuman",
    "url": SITE_URL,
    "jobTitle": "Screenwriter",
    "description": "Screenwriter crafting character-driven Southern stories about identity, redemption, consequence, and the cost of becoming who you are.",
    "sameAs": [
        "https://www.imdb.com/name/nm15546725/",
        "https://www.linkedin.com/in/krisshuman/",
        "https://x.com/thekrisshuman",
    ],
}

TAILWIND_CONFIG = """
  <script>
    tailwind.config = {
      theme: {
        extend: {
          fontFamily: { sans: ['Inter', 'system-ui', 'sans-serif'], display: ['Fraunces', 'Georgia', 'serif'] },
          colors: { ember: { DEFAULT: '#C9824A', light: '#E2A571', dark: '#7A3B2E' }, gold: '#D8B25C' },
        }
      }
    }
  </script>
"""


def head(title, description, canonical_path, og_image, prefix, jsonld_objs=None,
         og_type="website", og_image_alt=None):
    canonical = SITE_URL + canonical_path
    og_image_url = SITE_URL + og_image
    og_w, og_h = image_dims(og_image)
    og_image_alt = og_image_alt or title
    jsonld_objs = jsonld_objs or []
    jsonld_html = "\n".join(
        f'  <script type="application/ld+json">{json.dumps(o)}</script>' for o in jsonld_objs
    )
    return f"""<!DOCTYPE html>
<html lang="en" class="h-full">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{esc(title)}</title>
  <meta name="description" content="{esc(description)}">
  <link rel="canonical" href="{canonical}">
  <meta name="robots" content="index, follow">
  <link rel="icon" href="{prefix}favicon.ico">

  <meta property="og:title" content="{esc(title)}">
  <meta property="og:description" content="{esc(description)}">
  <meta property="og:url" content="{canonical}">
  <meta property="og:site_name" content="Kris Shuman">
  <meta property="og:type" content="{og_type}">
  <meta property="og:locale" content="en_US">
  <meta property="og:image" content="{og_image_url}">
  <meta property="og:image:width" content="{og_w}">
  <meta property="og:image:height" content="{og_h}">
  <meta property="og:image:alt" content="{esc(og_image_alt)}">

  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:site" content="@thekrisshuman">
  <meta name="twitter:creator" content="@thekrisshuman">
  <meta name="twitter:title" content="{esc(title)}">
  <meta name="twitter:description" content="{esc(description)}">
  <meta name="twitter:image" content="{og_image_url}">
  <meta name="twitter:image:alt" content="{esc(og_image_alt)}">

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Fraunces:ital,wght@0,400;0,500;0,600;0,700;0,900;1,400;1,500;1,600&display=swap" rel="stylesheet">

  <script src="https://cdn.tailwindcss.com"></script>
{TAILWIND_CONFIG}
  <link rel="stylesheet" href="{prefix}css/styles.css">

  <script async src="https://www.googletagmanager.com/gtag/js?id={GA_ID}"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){{dataLayer.push(arguments);}}
    gtag('js', new Date());
    gtag('config', '{GA_ID}');
  </script>
{jsonld_html}
</head>
<body class="min-h-full bg-[#0a0908] text-white font-sans antialiased">
"""


HTML_FOOT = """
  <script src="{prefix}js/main.js"></script>
</body>
</html>
"""

# ---------- recognized-by section ----------

def recognized_by(extra_classes=""):
    badges = "".join(recognition_badge(r) for r in RECOGNITION)
    return f"""
    <section class="py-12 md:py-16 bg-[#0a0908] border-y border-white/5 overflow-hidden {extra_classes}">
      <p class="text-xs uppercase tracking-[0.35em] text-zinc-500 mb-8 text-center px-6">Recognized By</p>
      <div class="marquee-mask md:max-w-4xl md:mx-auto">
        <div class="marquee-track items-center">
          {badges}
          {badges}
        </div>
      </div>
    </section>
"""


def press_quote_section():
    return f"""
    <section class="px-6 md:px-16 py-20 md:py-28 bg-[#0d0a08]">
      {pull_quote(PRESS_QUOTE['text'], PRESS_QUOTE['source'], size="text-xl md:text-3xl")}
    </section>
"""


# ---------- page builders ----------

def work_order():
    """Active projects in the order the work page lists them (status group, then format)."""
    ordered = []
    for _label, statuses in STATUS_GROUPS:
        group = [p for p in ACTIVE_PROJECTS if p["status"] in statuses]
        for fmt in ("feature", "tv", "short"):
            ordered += [p for p in group if p["format"] == fmt]
    return ordered


def straight(s):
    """Curly apostrophes -> straight, for JS string literals and data- attributes."""
    return s.replace("\u2019", "'")


def all_projects_script():
    """Inline index of the active slate that powers the search box in js/main.js."""
    rows = ",\n".join(
        "    {{ title: {t}, url: {u}, genre: {g}, zinger: {z} }}".format(
            t=json.dumps(straight(p["title"]), ensure_ascii=False),
            u=json.dumps(f"projects/{p['slug']}.html"),
            g=json.dumps(straight(p["genre"]), ensure_ascii=False),
            z=json.dumps(straight(p["zinger"]), ensure_ascii=False),
        )
        for p in work_order()
    )
    return f"""
  <script>
  var ALL_PROJECTS = [
{rows}
  ];
  </script>"""


def nomination_count(p):
    """A placement in two years is two nominations, not one."""
    return sum(max(len(n.get("years", [])), 1) for n in p.get("nominations", []))


def listed_nominations(p):
    """Placements spelled out on the project page - the majors only. The
    thumbnail badge still counts every placement, listed or not.

    Ordered newest first, so the most recent year reads leftmost. An entry is
    ranked by its EARLIEST year: a chip carrying 2025 and 2026 still reaches back
    into 2025, so it sits to the right of a chip that is 2026 alone. Ties hold
    data.py's order, since sorted() is stable; an entry with no year sorts last."""
    noms = [n for n in p.get("nominations", []) if n["org"] in TIER1_ORGS]
    return sorted(noms, key=lambda n: -min(n.get("years") or [0]))


def show_nominations(p):
    """On by default for every project, present and future. Set
    "show_nominations": False to suppress the badge even when there are entries."""
    return nomination_count(p) > 0 and p.get("show_nominations", True)


# Award rosette. Inline so there is no asset to ship and nothing to 404, sized in
# em so it holds proportion at both badge sizes, and drawn in currentColor so it
# follows the badge's own colour.
def nomination_mark(tight=False):
    """Award rosette. Inline so there is no asset to ship and nothing to 404, sized
    in em so it tracks the badge, and drawn in currentColor so it follows the
    badge's colour. Slightly smaller on a tight badge."""
    em = "w-[1.5em] h-[1.5em] md:w-[1.7em] md:h-[1.7em]" if tight else "w-[1.7em] h-[1.7em]"
    return ('<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" '
            f'focusable="false" class="{em} shrink-0">'
            '<circle cx="12" cy="8" r="6"/>'
            '<path d="M7.6 12.9 5.4 22l6.6-3.4L18.6 22l-2.2-9.1a8 8 0 0 1-8.8 0z"/>'
            '</svg>')


def badge_metrics(size, tight):
    """Type, tracking and padding for a thumbnail badge.

    tight is for the homepage slate card, whose thumbnail is only w-32 (128px)
    on mobile. At the normal 9px with 0.25em tracking, "Post-Production" wants
    ~131px and "8 Nominations" ~136px against 112px of usable width, so both
    were being clipped by the image's overflow-hidden. Below md the badge drops
    to 8px with almost no tracking, which brings the longest label - "Early
    Development" - to about 106px. From md up every value returns to what it
    was, so the desktop rendering is byte-identical."""
    if tight:
        return ("text-[8px] md:text-[9px] px-1.5 md:px-2 py-0.5 md:py-1",
                "tracking-[0.04em] md:tracking-[0.25em]",
                "gap-1 md:gap-1.5")
    cls = "text-[9px] px-2 py-1" if size == "sm" else "text-[10px] px-3 py-1"
    tracking = "tracking-[0.25em]" if size == "sm" else "tracking-[0.3em]"
    return cls, tracking, "gap-1.5"


def nomination_badge(p, size="sm", tight=False):
    """Count badge for a thumbnail. Empty string when there is nothing to show."""
    if not show_nominations(p):
        return ""
    n = nomination_count(p)
    txt = f"{n} Nomination" + ("" if n == 1 else "s")
    cls, tracking, gap = badge_metrics(size, tight)
    return (f'<span class="inline-flex items-center {gap} {cls} uppercase {tracking} '
            f'bg-black/70 text-gold whitespace-nowrap">{nomination_mark(tight)}{txt}</span>')


def nomination_lines(p):
    """One line per festival: org, tier, then every year it placed."""
    out = []
    for n in listed_nominations(p):
        bits = [n["org"]]
        if n.get("tier"):
            bits.append(n["tier"])
        if n.get("years"):
            bits.append(", ".join(str(y) for y in n["years"]))
        out.append(bits)
    return out


def project_description(p):
    """Search snippet. The zinger earns the click; the placements say why it is
    worth one. Full festival names, because that is what people type. The genre
    tail is only added when it fits inside the ~160 characters Google displays -
    a truncated credit reads worse than no credit."""
    out = p["zinger"].rstrip()
    if show_nominations(p):
        orgs = [n["org"] for n in listed_nominations(p)]
        total = nomination_count(p)
        word = "nomination" if total == 1 else "nominations"
        if len(orgs) == 1:
            listed = f"at {orgs[0]}"
        elif len(orgs) == 2:
            listed = f"at {orgs[0]} and {orgs[1]}"
        else:
            listed = f"at {orgs[0]}, {orgs[1]} and {len(orgs) - 2} more"
        out += f" {total} screenplay {word} {listed}."
    else:
        tail = f" {p['genre']} by screenwriter Kris Shuman."
        if len(out) + len(tail) <= 160:
            out += tail
    return out


def all_awards():
    """Every placement the site displays, as a flat record for the Person entity -
    the thing that ties 'Kris Shuman' to these festivals in a knowledge graph."""
    out = []
    for p in ACTIVE_PROJECTS:
        if not show_nominations(p):
            continue
        for n in listed_nominations(p):
            years = ", ".join(str(y) for y in n.get("years", []))
            out.append(f'{n["org"]} - {p["title"]}' + (f" ({years})" if years else ""))
    return out


WEBSITE_JSONLD = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Kris Shuman",
    "url": SITE_URL,
    "inLanguage": "en-US",
}


def slate_jsonld():
    """The slate index had no structured data at all. This states, in order, that
    the page is a list of these eleven works."""
    return {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": "The Kris Shuman slate",
        "itemListOrder": "https://schema.org/ItemListOrderAscending",
        "numberOfItems": len(work_order()),
        "itemListElement": [
            {"@type": "ListItem", "position": i + 1, "name": p["title"],
             "url": f"{SITE_URL}/projects/{p['slug']}.html"}
            for i, p in enumerate(work_order())
        ],
    }


def breadcrumb_jsonld(p):
    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {"@type": "ListItem", "position": 1, "name": "Home", "item": SITE_URL + "/"},
            {"@type": "ListItem", "position": 2, "name": "The Slate", "item": SITE_URL + "/work.html"},
            {"@type": "ListItem", "position": 3, "name": p["title"],
             "item": f"{SITE_URL}/projects/{p['slug']}.html"},
        ],
    }


def person_jsonld():
    """PERSON_JSONLD plus the parts that need the project data: a stable @id every
    CreativeWork points at, and the award list."""
    d = dict(PERSON_JSONLD)
    d["@id"] = SITE_URL + "/#kris-shuman"
    d["knowsAbout"] = ["Screenwriting", "Southern Gothic fiction",
                       "Television drama", "Feature film development"]
    awards = all_awards()
    if awards:
        d["award"] = awards
    return d


def still_credit(p):
    """Photo credit, set inside the hero directly under the tagline.

    Reads as attribution rather than a disclaimer - naming the director and the
    person who shot or animated it settles provenance better than a label
    insisting the image is not generative. The film's name is the h1 right above,
    so the line says "the finished film" instead of repeating the title."""
    roles = p.get("credit")
    if not roles:
        return ""
    dot = '<span class="text-white/25 px-2">&middot;</span>'
    tail = dot.join(esc(r) for r in roles)
    return (f'\n        <p class="mt-5 md:mt-6 text-[11px] md:text-xs text-white/45 '
            f'leading-relaxed max-w-[90%] md:max-w-[65%]">Stills from the finished film{dot}{tail}</p>')


def recognition_chip(n):
    """One festival mark: common name, then the year(s) it placed, in ember."""
    name = ORG_SHORT.get(n["org"], n["org"])
    shown = (esc(name) if name == n["org"] else
             f'<abbr title="{esc(n["org"])}" class="no-underline">{esc(name)}</abbr>')
    years = ", ".join(str(y) for y in n.get("years", []))
    yr = (f'<span class="text-ember text-[10px] tracking-[0.1em] tabular-nums">{esc(years)}</span>'
          if years else "")
    return (f'<span class="inline-flex items-baseline gap-2 border border-white/10 '
            f'bg-white/[0.02] px-3 py-1.5 whitespace-nowrap">'
            f'<span class="text-white/80 text-xs sm:text-[13px]">{shown}</span>{yr}</span>')


def recognition_row(p):
    """Eyebrow label over a horizontal run of chips. Wraps to a second line only
    when the credits don't fit on one. Empty when there is nothing to list."""
    if not show_nominations(p):
        return ""
    noms = listed_nominations(p)
    if not noms:
        return ""
    chips = "".join(recognition_chip(n) for n in noms)
    return f"""<div class="mb-5 md:mb-6 pb-5 md:pb-6 border-b border-white/10">
          <span class="block text-white/35 uppercase tracking-[0.15em] text-[10px] sm:text-xs mb-3">Recognition</span>
          <div class="flex flex-wrap gap-2">{chips}</div>
        </div>
        """


def status_badge(p, size="sm", tight=False):
    cls, tracking, _ = badge_metrics(size, tight)
    return (f'<span class="{cls} uppercase {tracking} bg-black/70 '
            f'text-white/70 whitespace-nowrap">{esc(p["status"])}</span>')


def thumb_badges(p, size="sm", tight=False):
    """Status left, nominations right. Stacked top-left on mobile, split at md.

    tight also pulls the inset in by 2px a side on mobile, which buys the labels
    another 4px inside a 128px thumbnail."""
    if tight:
        inset = "top-1.5 left-1.5 right-1.5 md:top-2 md:left-2 md:right-2"
    else:
        inset = "top-2 left-2 right-2" if size == "sm" else "top-3 left-3 right-3"
    return (f'<div class="absolute {inset} z-10 flex flex-col items-start gap-1 '
            f'md:flex-row md:justify-between md:items-center">'
            f'{status_badge(p, size, tight)}{nomination_badge(p, size, tight)}</div>')


def project_card(p, prefix):
    href = f"{prefix}projects/{p['slug']}.html"
    return f"""
        <a href="{href}" class="group flex md:block gap-4 md:gap-0 items-stretch" data-title="{esc(p['title'].lower())}" data-zinger="{esc(p['zinger'].lower())}">
          <div class="w-32 md:w-full aspect-[3/4] md:aspect-video overflow-hidden bg-zinc-900 md:mb-4 relative shrink-0">
            {thumb_badges(p, "sm", tight=True)}
            <img src="{prefix.replace('projects/', '')}{p['image'][1:]}" alt="{esc(p['title'])}" loading="lazy" width="640" height="360" class="w-full h-full object-cover transition duration-700 group-hover:scale-105">
          </div>
          <div class="flex-1 min-w-0 py-1">
            <p class="text-[11px] uppercase tracking-[0.18em] text-zinc-500 mb-1.5">{esc(p['genre'])}</p>
            <h3 class="font-display text-lg md:text-xl font-medium mb-1.5 group-hover:text-ember transition">{esc(p['title'])}</h3>
            <p class="text-sm md:text-[15px] leading-relaxed text-zinc-300 mb-1.5 line-clamp-3 md:line-clamp-none">{esc(p['zinger'])}</p>
            <p class="text-[11px] uppercase tracking-[0.16em] text-ember/70 italic">{esc(p['comps'])}</p>
          </div>
        </a>
"""


def build_index():
    prefix = ""
    title = "Kris Shuman | Screenwriter — Southern Gothic Film & TV"
    description = "Kris Shuman writes character-driven Southern stories for film and television. Browse an active slate of features, limited series, and shorts in development and production."
    featured = next((p for p in ACTIVE_PROJECTS if p.get("featured")), ACTIVE_PROJECTS[0])
    # The slate strip led with whatever order the data happened to be in, which
    # put the two projects carrying no placements in the first row and left the
    # one with fifteen down in the second. Sorting by placement count fixes that
    # and keeps fixing it: a script that picks up its first nomination moves up
    # on the next build without anyone touching this file. Python's sort is
    # stable, so anything level stays in the order data.py sets.
    slate_preview = sorted([p for p in ACTIVE_PROJECTS if p.get("slate")],
                           key=nomination_count, reverse=True)[:6]
    cards = "".join(project_card(p, prefix) for p in slate_preview)

    body = f"""
{nav(prefix)}
  <main class="bg-[#0a0908] text-white">

    <section class="relative w-full min-h-[78vh] md:min-h-[94vh] flex flex-col justify-end overflow-hidden">
      <img src="{prefix}images/forest-road.webp" alt="A lone forest road at dusk, evoking the rural Southern settings of Kris Shuman's stories" class="absolute inset-0 w-full h-full object-cover" width="2200" height="1467">
      <div class="absolute inset-0 overlay-cinematic"></div>
      <div class="absolute inset-0 overlay-vignette"></div>
      <div class="relative z-10 px-6 md:px-16 pb-12 md:pb-20 w-full max-w-4xl">
        <h1 class="font-display font-medium text-[clamp(2.1rem,7vw,4.3rem)] leading-[1.1] mb-4 max-w-[95%]">People Don&rsquo;t Change. <em class="italic text-ember">They Reveal.</em></h1>
        <p class="font-display italic text-xl md:text-2xl text-white/85 tracking-wide mb-7 md:mb-8">Kris Shuman <span class="text-ember/70 not-italic text-[11px] md:text-xs uppercase tracking-[0.35em] align-middle ml-2">Screenwriter</span></p>
        <p class="text-base md:text-lg text-zinc-200 max-w-xl mb-7">Character-driven Southern stories for film and television &mdash; features, limited series, and shorts, in active development and production.</p>
        <button type="button" data-open-calendly class="tap-target inline-block px-8 py-4 text-xs md:text-sm uppercase tracking-[0.3em] border border-ember text-white bg-ember/15 hover:bg-ember/30 transition">Schedule a Call</button>
      </div>
    </section>

{recognized_by()}
{press_quote_section()}

    <section class="px-6 md:px-16 pt-16 md:pt-20 pb-10 border-t border-white/5">
      <p class="text-xs uppercase tracking-[0.3em] text-zinc-500 mb-6">Featured Project</p>
      <a href="{prefix}projects/{featured['slug']}.html" class="grid md:grid-cols-2 gap-8 md:gap-10 items-center group">
        <div class="relative w-full overflow-hidden rounded-md">
          <div class="w-full aspect-[16/9] overflow-hidden relative">
            {thumb_badges(featured, "lg")}
            <img src="{prefix}{featured['image'][1:]}" alt="{esc(featured['title'])}" loading="lazy" width="800" height="450" class="w-full h-full object-cover transition duration-700 group-hover:scale-[1.03]">
          </div>
        </div>
        <div>
          <p class="text-xs uppercase tracking-[0.25em] text-zinc-500 mb-3">{esc(featured['genre'])} &middot; {esc(featured['status'])}</p>
          <h2 class="font-display text-3xl md:text-4xl font-medium mb-3 transition group-hover:text-ember">{esc(featured['title'])}</h2>
          <p class="text-zinc-100 text-lg md:text-xl leading-relaxed mb-4 transition group-hover:text-white">{esc(featured['zinger'])}</p>
          <p class="text-[15px] leading-relaxed text-zinc-400 mb-4">{esc(featured['overview'][:260])}&hellip;</p>
          <p class="text-xs uppercase tracking-[0.25em] text-ember/80 italic">{esc(featured['comps'])}</p>
        </div>
      </a>
    </section>

    <section class="relative z-10 px-6 md:px-16 pt-10 pb-24 bg-[#0d0a08] mt-16">
      <div class="flex items-center justify-between mb-8 gap-6 flex-wrap">
        <p class="text-xs uppercase tracking-[0.3em] text-zinc-400">The Slate</p>
        <div class="hidden md:block relative max-w-xs w-full">
          <input id="slateSearch" type="text" placeholder="Search all projects&hellip;" autocomplete="off" class="w-full bg-transparent border-b border-white/30 text-white text-sm placeholder:text-white/40 py-2 pr-8 outline-none focus:border-ember">
          <div id="slateResults" class="hidden absolute top-full left-0 right-0 mt-1 bg-[#0f0c0a] border border-white/15 z-50 shadow-[0_8px_32px_rgba(0,0,0,0.6)]"></div>
        </div>
      </div>
      <div id="slateGrid" class="flex flex-col gap-6 md:grid md:grid-cols-3 md:gap-10">
        {cards}
      </div>
      <div class="mt-16 flex justify-end">
        <a href="{prefix}work.html" class="group text-xs uppercase tracking-[0.3em] text-zinc-400 hover:text-ember transition">
          <span>View Full Slate</span>
          <span class="inline-block ml-2 transform transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
        </a>
      </div>
    </section>

    <section id="writer" class="px-6 md:px-16 py-28 md:py-36 text-center">
      <div class="max-w-2xl mx-auto">
        <p class="font-display text-2xl md:text-3xl leading-relaxed">I write about people at the breaking point.<br>The ones trying to outrun who they&rsquo;ve been&mdash;<br>and learning the hard way that you don&rsquo;t get to.</p>
        <p class="mt-6 text-sm uppercase tracking-[0.2em] text-ember/80 text-right">&mdash; Kris</p>
        <div class="mt-12 text-sm uppercase tracking-[0.25em]">
          <a href="{prefix}about.html" class="text-white/60 hover:text-ember transition">View Full Bio</a>
        </div>
      </div>
    </section>

    <section id="contact" class="px-6 md:px-16 py-32 md:py-44 border-t border-white/5 text-center bg-[#0d0a08]">
      <div class="max-w-xl mx-auto">
        <p class="font-display text-xl md:text-2xl leading-relaxed mb-12">If something here fits what you&rsquo;re building&mdash;<br class="hidden md:block">let&rsquo;s talk.</p>
        <button type="button" data-open-calendly class="tap-target inline-block px-12 py-5 text-sm uppercase tracking-[0.3em] border border-ember text-white bg-ember/20 hover:bg-ember/35 transition">Schedule a Call</button>
        <p class="mt-8 text-xs text-white/40">Or <a href="mailto:kris@krisshuman.com" class="underline hover:text-ember transition">email Kris</a></p>

        <div class="mt-16 pt-16 border-t border-white/10">
          <p class="text-xs uppercase tracking-[0.35em] text-zinc-500 mb-6">Representation</p>
          <p class="text-white/85 font-medium mb-1">Amanda Robles</p>
          <p class="text-sm text-zinc-400 mb-8">Middle Rock Management</p>
          <button type="button" id="contactRepBtn" class="tap-target text-xs uppercase tracking-[0.3em] text-zinc-400 hover:text-ember transition border-b border-zinc-600 hover:border-ember pb-0.5">Contact Rep &rarr;</button>
        </div>
      </div>
    </section>

{footer(prefix)}
  </main>
{back_to_top()}
{calendly_modal()}
{all_projects_script()}"""
    html = head(title, description, "/", SITE_COVER, prefix, [person_jsonld(), WEBSITE_JSONLD],
                og_image_alt=SITE_COVER_ALT) + body + HTML_FOOT.format(prefix=prefix)
    return html


def build_about():
    prefix = ""
    title = "About Kris Shuman | Southern Screenwriter"
    description = "Kris Shuman is a Southern screenwriter writing character-driven film and television about identity, recovery, and the cost of becoming who you are."
    body = f"""
{nav(prefix)}
  <main class="bg-[#0a0908] text-white">
    <h1 class="sr-only">Kris Shuman &mdash; Southern screenwriter for film and television</h1>
    <section class="relative w-full min-h-[100vh] flex flex-col justify-center">
      <img src="{prefix}images/about/forest-road.webp" alt="A quiet Southern forest road" class="absolute inset-0 w-full h-full object-cover overflow-hidden" width="2200" height="1467">
      <div class="absolute inset-0 overlay-cinematic"></div>
      <div class="relative z-10 px-6 md:px-16 pt-32 pb-14 md:pb-20 w-full">
        <div class="max-w-2xl mx-auto space-y-5 text-center text-white">
          <p class="text-base md:text-lg text-white/90 leading-snug">Being raised in the South, stories weren&rsquo;t told. They were lived. Avoided. Buried. But that&rsquo;s not just where I&rsquo;m from. That&rsquo;s how people are.</p>
          <p class="text-base md:text-lg text-white/90 leading-snug">Recovery didn&rsquo;t give me answers. It just made it harder to ignore things. And once you start seeing the truth &mdash; you can&rsquo;t unsee it.</p>
          <p class="text-base md:text-lg text-white/90 leading-snug">That&rsquo;s what I write about: people at the breaking point, and the moment where who they&rsquo;ve been pretending to be stops working.</p>
          <p class="text-base md:text-lg text-white/90 leading-snug">I don&rsquo;t build characters. I follow them. And eventually, the truth shows up.</p>
          <p class="font-display pt-3 text-xl md:text-2xl font-medium text-white leading-snug">I didn&rsquo;t come to storytelling to escape anything. I came to face it. And I chose to write about it.</p>
          <div class="flex justify-center md:justify-end pt-2">
            <img src="{prefix}images/signature.webp" alt="Kris Shuman signature" class="w-[160px] opacity-85" width="160" height="69">
          </div>
        </div>
      </div>
    </section>

{recognized_by()}
{press_quote_section()}

    <section class="px-6 md:px-16 py-24 md:py-32 text-center">
      <div class="flex flex-col md:flex-row justify-center gap-4 md:gap-6">
        <button type="button" id="openResume" class="tap-target px-8 py-4 text-sm uppercase tracking-[0.3em] border border-white/40 text-white hover:border-ember hover:text-ember transition">View R&eacute;sum&eacute;</button>
        <a href="{prefix}work.html" class="tap-target px-8 py-4 text-sm uppercase tracking-[0.3em] border border-ember bg-ember/15 text-white hover:bg-ember/30 transition">View the Slate</a>
      </div>
      <p class="mt-10 text-xs text-zinc-500">Represented by <span class="text-zinc-300">Amanda Robles</span> &middot; Middle Rock Management</p>
    </section>

{footer(prefix)}
  </main>

  <div id="resumeModal" class="hidden fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-6">
    <div class="relative w-full max-w-4xl h-[80vh] bg-black border border-white/10">
      <iframe src="{prefix}resume.pdf" class="w-full h-full" title="Kris Shuman r&eacute;sum&eacute;"></iframe>
      <button type="button" id="closeResume" class="tap-target absolute top-2 right-2 text-white/60 hover:text-white text-xs uppercase tracking-[0.3em]">Close</button>
    </div>
  </div>
{back_to_top()}
{calendly_modal()}
"""
    html = head(title, description, "/about.html", SITE_COVER, prefix, [person_jsonld()],
                og_type="profile", og_image_alt=SITE_COVER_ALT) + body + HTML_FOOT.format(prefix=prefix)
    return html


def build_work():
    prefix = ""
    title = "The Slate | Kris Shuman"
    description = "The full slate of Kris Shuman projects in film and television: features, limited series, and shorts, from early development through production."

    sections_html = ""
    anchors = []
    row_count = 0
    for label, statuses in STATUS_GROUPS:
        group = [p for p in ACTIVE_PROJECTS if p["status"] in statuses]
        if not group:
            continue
        anchor_id = label.split(" ")[0].lower().replace("&", "and")
        anchors.append((anchor_id, label))
        rows = ""
        for fmt in ("feature", "tv", "short"):
            filtered = [p for p in group if p["format"] == fmt]
            if not filtered:
                continue
            rows += f'<h3 class="text-sm uppercase tracking-[0.25em] text-white/50 mb-10">{FORMAT_LABEL[fmt]}</h3>\n<div class="space-y-6 md:space-y-24 mb-24">\n'
            for i, p in enumerate(filtered):
                order = "" if i % 2 == 0 else "md:order-2"
                text_order = "" if i % 2 == 0 else "md:order-1"
                tint = "bg-[#0d0a08]" if row_count % 2 else ""
                row_count += 1
                rows += f"""
              <a href="{prefix}projects/{p['slug']}.html" class="group block transition duration-500 hover:-translate-y-1 {tint} md:bg-transparent p-4 md:p-0 -mx-4 md:mx-0 rounded" data-title="{esc(straight(p['title'].lower()))}" data-zinger="{esc(straight(p['zinger'].lower()))}">
                <div class="grid md:grid-cols-2 gap-6 md:gap-10 items-center">
                  <div class="relative w-full aspect-video overflow-hidden bg-zinc-900 {order}">
                    {thumb_badges(p, "lg")}
                    <img src="{prefix}{p['image'][1:]}" alt="{esc(p['title'])}" loading="lazy" width="640" height="360" class="w-full h-full object-cover transition duration-700 group-hover:scale-[1.03]">
                  </div>
                  <div class="{text_order}">
                    <p class="text-sm uppercase tracking-[0.18em] text-zinc-500 mb-3">{esc(p['genre'])}</p>
                    <h2 class="font-display text-2xl md:text-3xl font-medium mb-3 group-hover:text-ember transition">{esc(p['title'])}</h2>
                    <p class="text-lg text-zinc-100 leading-relaxed mb-3 max-w-md">{esc(p['zinger'])}</p>
                    <p class="text-xs uppercase tracking-[0.2em] text-ember/80 italic mb-5">{esc(p['comps'])}</p>
                    <span class="text-xs uppercase tracking-[0.3em] text-zinc-500 group-hover:text-ember transition">View Project &rarr;</span>
                  </div>
                </div>
              </a>
"""
            rows += "</div>\n"
        sections_html += f'<section id="{anchor_id}" class="mb-20"><h2 class="font-display text-lg uppercase tracking-[0.3em] text-zinc-200 mb-12">{label}</h2>{rows}</section>\n'

    nav_links = "".join(f'<a href="#{aid}" class="hover:text-ember transition">{lbl}</a>' for aid, lbl in anchors)

    body = f"""
{nav(prefix)}
  <main class="bg-[#0a0908] text-white px-6 md:px-16 pt-32 pb-32">
    <div class="max-w-3xl mb-16">
      <p class="text-xs uppercase tracking-[0.3em] text-zinc-500 mb-4">The Slate</p>
      <h1 class="font-display text-3xl md:text-5xl font-medium leading-tight">Stories about identity, consequence, and what refuses to stay buried.</h1>
    </div>
    <div class="sticky top-20 z-40 bg-[#0a0908]/95 backdrop-blur-md border-y border-white/10 py-4 mb-20 -mx-6 px-6 md:mx-0 md:px-0 overflow-x-auto">
      <div class="flex flex-nowrap md:flex-wrap justify-start md:justify-center gap-6 md:gap-8 text-xs uppercase tracking-[0.25em] text-white/60 whitespace-nowrap">
        {nav_links}
      </div>
    </div>
    <div class="mb-12 relative max-w-md">
      <input id="workSearch" type="text" placeholder="Search all projects&hellip;" class="w-full bg-transparent border-b border-white/30 text-white text-sm placeholder:text-white/40 py-2 pr-8 outline-none focus:border-ember">
    </div>

    {sections_html}
{footer(prefix)}
  </main>
{back_to_top()}
{calendly_modal()}
"""
    html = head(title, description, "/work.html", SITE_COVER, prefix, [slate_jsonld()],
                og_image_alt=SITE_COVER_ALT) + body + HTML_FOOT.format(prefix=prefix)
    return html


def check_gallery_order():
    """Stills have to run in screen order, and the only thing that proves that is
    the frame number they were pulled at.

    Filenames arrive stripped of it often enough - an upload renames them, an
    export renumbers them - that the order ends up being inferred from whatever
    sequence the files happened to land in, which is a coin flip. Where an array
    records its frame numbers, the build checks them, so a set that is out of
    order stops the build instead of quietly shipping the film backwards."""
    for p in ACTIVE_PROJECTS:
        got = [(g["frame"], g["src"]) for g in (p.get("gallery") or []) if "frame" in g]
        if len(got) < 2:
            continue
        for (fa, sa), (fb, sb) in zip(got, got[1:]):
            if fb <= fa:
                raise SystemExit(
                    "Build stopped - %s stills are out of screen order:\n"
                    "  frame %d (%s) comes before frame %d (%s)"
                    % (p["slug"], fa, sa.rsplit("/", 1)[-1], fb, sb.rsplit("/", 1)[-1]))


def cta_link(p):
    """A hand-off to an outside site that carries the project further.

    Deliberately not a third button. The two buttons above it are the ones that
    start a conversation, which is what the page is for; sending the reader off
    the site is a weaker outcome, so it reads as a line of text rather than
    competing for the same weight. The note carries why the link is there, which
    on the short film is the whole point - without it a link to a series site
    just looks like a stray plug."""
    link = p.get("cta_link")
    if not link:
        return ""
    note = f"{esc(link['note'])} " if link.get("note") else ""
    return f"""
        <p class="text-sm text-white/50 leading-relaxed">{note}<a href="{link['url']}" target="_blank" rel="noopener noreferrer" class="text-ember hover:text-ember-light underline underline-offset-4 decoration-ember/40 transition whitespace-nowrap">{esc(link['label'])} &rarr;</a></p>"""


def gallery_cell(p):
    """The shape every tile in a project's grid and carousel is cut to.

    Stills come off a film in whatever the matte was doing at that moment - this
    set runs 2.67:1, 1.89:1 and a full 16:9 - and laying those out at their true
    heights gives a row with one tall tile and one short one, which reads as a
    bug rather than as fidelity. So the contact sheet is uniform and the viewer
    keeps the truth: click a tile and the whole frame is there, uncropped.

    The shape is the commonest one in the array rather than a hardcoded ratio,
    so a future project whose stills are all 16:9 gets a 16:9 sheet without
    anyone setting anything. Ties go to the widest. gallery_ratio overrides."""
    if p.get("gallery_ratio"):
        w, h = p["gallery_ratio"].split("/")
        return int(w), int(h)
    shapes = {}
    for g in p.get("gallery") or []:
        key = (g.get("w", 16), g.get("h", 9))
        shapes[key] = shapes.get(key, 0) + 1
    if not shapes:
        return 16, 9
    # most common first; on a tie the widest frame wins
    return max(shapes, key=lambda k: (shapes[k], k[0] / k[1]))


def build_project(p):
    prefix = "../"
    title = f"{p['title']} | Kris Shuman"
    description = project_description(p)
    canonical_path = f"/projects/{p['slug']}.html"

    # object-top only anchors vertically; horizontally object-cover stays centred,
    # which on a phone crops a wide hero to its middle and can lose the subject.
    # hero_focus overrides that per project. Underscores because Tailwind arbitrary
    # values cannot contain spaces.
    _focus = p.get("hero_focus")
    hero_object = f"object-[{_focus.replace(' ', '_')}]" if _focus else "object-top"
    hero_w, hero_h = image_dims(p["image"])

    gallery_html = ""
    if p["gallery"] and p.get("show_gallery", False):
        def still(g, i, n, flush=False):
            """One tile of the contact sheet, cut to the project's common
            shape by gallery_cell so a row never mixes heights. The tile is a
            crop; the frame behind it is not, and that is what the viewer opens.

            Both copies of a still - the phone carousel and the desktop grid -
            are buttons into the same viewer, and both carry the same data-lb-i,
            so the viewer indexes the gallery itself rather than the elements it
            found. That is what keeps prev/next and the counter honest when the
            same frame exists twice in the DOM.

            flush is the phone treatment: a wide frame is a thin strip on a
            portrait screen however wide the slide is, so the slide takes the
            whole viewport and the picture is the way into the viewer.

            On the desktop grid an odd count would leave the last still beside
            an empty half-column; spanning it turns that gap into a closing
            frame."""
            w, h = g.get("w", 16), g.get("h", 9)
            cw, ch = gallery_cell(p)
            alt = esc(g.get("alt") or p["title"] + " film still")
            src = f"{prefix}{g['src'][1:]}"
            hover = "" if flush else " transition duration-500 group-hover:scale-[1.03]"
            box = (f'<div class="w-full overflow-hidden bg-zinc-900" style="aspect-ratio:{cw}/{ch}">'
                   f'<img src="{src}" alt="{alt}" loading="lazy" width="{w}" height="{h}" '
                   f'class="w-full h-full object-cover object-center{hover}"></div>')
            opener = (f'type="button" data-lb-open data-lb-i="{i}" data-lb-src="{src}" '
                      f'data-lb-alt="{alt}" aria-label="Open still {i + 1} of {n}"')
            if flush:
                return (f'<button {opener} class="w-screen shrink-0 block p-0 border-0 '
                        f'bg-transparent">{box}</button>')
            span = " md:col-span-2" if (n % 2 and i == n - 1) else ""
            return (f'<button {opener} class="group block w-full p-0 border-0 bg-transparent '
                    f'text-left cursor-zoom-in{span}">{box}</button>')

        n_stills = len(p["gallery"])
        items_m = "".join(still(g, i, n_stills, True) for i, g in enumerate(p["gallery"]))
        items_d = "".join(still(g, i, n_stills) for i, g in enumerate(p["gallery"]))

        def dot(i):
            on = "w-4 bg-ember" if i == 0 else "w-1.5 bg-white/25"
            return (f'<button type="button" class="h-1.5 {on} rounded-full transition-all" '
                    f'aria-label="Go to still {i + 1}" aria-current="{str(i == 0).lower()}"></button>')

        dots = "".join(dot(i) for i in range(n_stills))
        arrow = ('<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" '
                 'stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5" aria-hidden="true">'
                 '<path d="m9 6 6 6-6 6"/></svg>')
        nav_btn = ("absolute top-1/2 -translate-y-1/2 z-10 w-11 h-11 md:w-12 md:h-12 flex items-center "
                   "justify-center rounded-full bg-white/10 hover:bg-white/20 border border-white/20 "
                   "text-white/85 transition")
        gallery_html = f"""
    <section class="pb-24 md:pb-28 bg-[#0d0a08] pt-16">
      <p class="text-xs tracking-[0.25em] uppercase text-white/40 mb-8 px-6 md:px-12 max-w-6xl mx-auto">Stills</p>
      <div class="md:hidden" data-stills>
        <div class="relative">
          <div class="snap-row snap-row-flush" data-stills-row>{items_m}</div>
          <button type="button" data-stills-next aria-label="Next still" class="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-11 h-11 flex items-center justify-center rounded-full bg-black/55 border border-white/20 text-white/85 active:scale-95 transition">{arrow}</button>
        </div>
        <p class="text-[11px] tracking-[0.18em] uppercase text-white/35 text-center mt-4">Tap a frame to enlarge</p>
        <div class="flex justify-center items-center gap-2 mt-3 px-6" data-stills-dots>{dots}</div>
      </div>
      <div class="hidden md:grid max-w-6xl mx-auto px-12 grid-cols-2 gap-8 items-start">{items_d}</div>
    </section>

    <div data-lightbox class="hidden fixed inset-0 z-[80] bg-black" role="dialog" aria-modal="true" aria-label="Still viewer">
      <div class="lb-stage" data-lb-stage><img data-lb-img alt=""></div>
      <button type="button" data-lb-close aria-label="Close viewer" class="absolute top-4 right-4 md:top-6 md:right-6 z-10 w-11 h-11 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white text-2xl leading-none transition">&times;</button>
      <button type="button" data-lb-prev aria-label="Previous still" class="{nav_btn} left-2 md:left-6 rotate-180">{arrow}</button>
      <button type="button" data-lb-next aria-label="Next still" class="{nav_btn} right-2 md:right-6">{arrow}</button>
      <p data-lb-hint class="absolute bottom-11 md:bottom-12 inset-x-0 text-center text-[11px] tracking-[0.18em] uppercase text-white/30 px-6">
        <span class="md:hidden">Tap to zoom &middot; turn your phone for a wider view</span>
        <span class="hidden md:inline">Click the frame for full resolution</span>
      </p>
      <p data-lb-count class="absolute bottom-5 md:bottom-6 inset-x-0 text-center text-[11px] tracking-[0.2em] uppercase text-white/45"></p>
    </div>
"""

    themes_html = "".join(f"<li>{esc(t)}</li>" for t in p["themes"])

    rel = related(p["slug"])
    rel_html = "".join(f"""
        <a href="{prefix}projects/{r['slug']}.html" class="group block">
          <div class="relative mb-4">
            {thumb_badges(r, "sm")}
            <img src="{prefix}{r['image'][1:]}" alt="{esc(r['title'])}" loading="lazy" width="400" height="225" class="w-full h-[200px] object-cover bg-zinc-900 transition group-hover:opacity-80">
          </div>
          <p class="text-sm text-white/50 mb-2">{esc(r['title'])}</p>
          <p class="font-display text-lg text-white">{esc(r['zinger'])}</p>
        </a>""" for r in rel)

    jsonld = {
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        "name": p["title"],
        "description": p["overview"][:300],
        "genre": p["genre"],
        "creator": {"@type": "Person", "@id": SITE_URL + "/#kris-shuman", "name": "Kris Shuman"},
        "inLanguage": "en-US",
        "image": SITE_URL + p["image"],
        "url": SITE_URL + canonical_path,
    }
    # The project's own site is the same work under another address; sameAs is
    # what lets a search engine join them into one entity instead of two.
    if p.get("cta_link"):
        jsonld["sameAs"] = [p["cta_link"]["url"]]
    # Every frame on the page belongs to this work, so schema.org gets all of
    # them rather than the hero alone - that is the association image search reads.
    if p.get("gallery") and p.get("show_gallery", False):
        jsonld["image"] = ([SITE_URL + p["image"]]
                           + [SITE_URL + g["src"] for g in p["gallery"]])

    if show_nominations(p):
        jsonld["award"] = [" \u2014 ".join(bits) for bits in nomination_lines(p)]

    body = f"""
{nav(prefix)}
  <main class="bg-[#0a0908] text-white min-h-screen">
    <section class="relative w-full pt-20">
      <!-- On a phone the title block sits BELOW the picture, not on it. Anchoring
           it to the bottom of the hero meant every pixel taken off the section
           height came out of the photograph while the type stayed put. From md up
           it goes back to an overlay, where a full-screen hero has room for both.

           pt-20 clears the fixed 80px header, which is only 40% opaque and was
           veiling the top of the frame. The desktop height subtracts the same 5rem
           so the hero still ends exactly at the fold rather than overshooting. -->
      <div class="relative w-full h-[44vh] md:h-[calc(100vh-5rem)] overflow-hidden">
        <img src="{prefix}{p['image'][1:]}" alt="{esc(p['title'])}" class="absolute inset-0 w-full h-full object-cover {hero_object}" width="{hero_w}" height="{hero_h}">
        <div class="absolute inset-0 overlay-cinematic"></div>
      </div>
      <div class="relative z-10 w-full px-6 md:px-16 pt-6 pb-1 md:pt-0 md:pb-20 md:absolute md:inset-x-0 md:bottom-0">
        <h1 class="font-display font-medium text-[clamp(1.9rem,5.5vw,4.6rem)] leading-[1.08] mb-3 max-w-[92%] md:max-w-[80%]">{esc(p['title'])}</h1>
        <p class="text-base md:text-lg text-zinc-200 max-w-[90%] md:max-w-[65%]">{esc(p['subtitle'])}</p>{still_credit(p)}
      </div>
    </section>

    <section class="border-b border-white/10 bg-[#0d0a08]">
      <div class="max-w-5xl mx-auto px-6 md:px-12 py-5 md:py-6">
        {recognition_row(p)}<div class="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6 text-xs md:text-sm">
        <div class="flex sm:flex-col gap-2 sm:gap-1">
          <span class="text-white/35 uppercase tracking-[0.15em] text-[10px] sm:text-xs">Format</span>
          <span class="text-white/80 uppercase tracking-[0.1em]">{esc(p['genre'])}</span>
        </div>
        <div class="flex sm:flex-col gap-2 sm:gap-1">
          <span class="text-white/35 uppercase tracking-[0.15em] text-[10px] sm:text-xs">Status</span>
          <span class="text-ember uppercase tracking-[0.1em]">{esc(p['status'])}</span>
        </div>
        <div class="flex sm:flex-col gap-2 sm:gap-1">
          <span class="text-white/35 uppercase tracking-[0.15em] text-[10px] sm:text-xs">Comps</span>
          <span class="text-white/80 italic">{esc(p['comps'])}</span>
        </div>
        </div>
      </div>
    </section>

    <section class="pt-16 md:pt-20 pb-4 px-6">
      {pull_quote(p['teaser'], p['teaser_speaker'])}
    </section>

    <section class="py-16">
      <div class="px-6 md:px-16 w-full">
        <div class="max-w-2xl mb-14 space-y-4">
          <p class="text-xs tracking-[0.25em] uppercase text-white/40">Overview</p>
          <p class="text-lg md:text-xl text-zinc-300 leading-normal">{esc(p['overview'])}</p>
        </div>
        <div class="grid md:grid-cols-2 gap-10 md:gap-16 max-w-4xl">
          <div>
            <p class="text-xs tracking-[0.25em] uppercase text-white/40 mb-5">Themes</p>
            <ul class="space-y-3 text-lg text-white/80 list-none">{themes_html}</ul>
          </div>
          <div>
            <p class="text-xs tracking-[0.25em] uppercase text-white/40 mb-5">Tone</p>
            <p class="text-lg text-white/80">{esc(p['tone'])}</p>
          </div>
        </div>
      </div>
    </section>

    {gallery_html}

    <section class="pb-24 pt-16">
      <div class="max-w-3xl mx-auto px-6 md:px-12 space-y-8">
        <p class="font-display text-2xl">If this kind of story fits what you&rsquo;re building&mdash;let&rsquo;s talk.</p>
        <div class="flex flex-col md:flex-row gap-4">
          <button type="button" data-open-request data-project="{esc(p['title'])}" class="tap-target px-6 py-3 md:px-8 md:py-4 text-xs md:text-sm uppercase tracking-[0.3em] border border-white/30 text-white/70 hover:text-white hover:border-white/50 transition">Request Materials</button>
          <button type="button" data-open-calendly class="tap-target px-6 py-3 md:px-8 md:py-4 text-xs md:text-sm uppercase tracking-[0.3em] border border-ember text-white bg-ember/15 hover:bg-ember/30 transition">Schedule a Call</button>
        </div>{cta_link(p)}
      </div>
    </section>

    <section class="border-t border-white/5 pt-16 pb-24 bg-[#0d0a08]">
      <div class="max-w-6xl mx-auto px-6 md:px-12">
        <p class="text-xs tracking-[0.25em] uppercase text-white/40 mb-10">More Stories</p>
        <div class="grid md:grid-cols-3 gap-8">{rel_html}</div>
      </div>
    </section>

{footer(prefix)}
  </main>
{back_to_top()}
{calendly_modal()}
{request_modal()}
"""
    html = head(title, description, canonical_path, p["image"], prefix,
                [jsonld, breadcrumb_jsonld(p)], og_type="article",
                og_image_alt=f"Key image for {p['title']}, {p['genre']} by Kris Shuman") + body + HTML_FOOT.format(prefix=prefix)
    return html


def write(path, content):
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)


def build_sitemap():
    urls = ["/", "/about.html", "/work.html"] + [f"/projects/{p['slug']}.html" for p in ACTIVE_PROJECTS]
    rows = []
    for u in urls:
        rel = "index.html" if u == "/" else u.lstrip("/")
        try:
            stamp = datetime.date.fromtimestamp(os.path.getmtime(os.path.join(OUT, rel))).isoformat()
            rows.append(f"  <url><loc>{SITE_URL}{u}</loc><lastmod>{stamp}</lastmod></url>")
        except OSError:
            rows.append(f"  <url><loc>{SITE_URL}{u}</loc></url>")
    items = "\n".join(rows)
    return f'<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n{items}\n</urlset>\n'


def build_robots():
    return f"User-agent: *\nAllow: /\n\nSitemap: {SITE_URL}/sitemap.xml\n"


def rendered_images(p):
    """Every image path a built page will actually put in an <img> or a share
    card. A gallery that is switched off never reaches the HTML, so its files
    are not required to exist yet - that is how a project can carry a planned
    shot list before the stills come back."""
    refs = [p["image"]] if p.get("image") else []
    if p.get("gallery") and p.get("show_gallery", False):
        refs += [g["src"] for g in p["gallery"]]
    return refs


def check_images():
    """Stop before writing rather than ship a page of broken icons.

    Anything a page will render has to be on disk. Paths that only sit in the
    data - a hidden gallery waiting on art - are reported instead, because the
    day that gallery is switched on is the day they start mattering."""
    missing, waiting = [], {}
    for p in ACTIVE_PROJECTS:
        for r in rendered_images(p):
            if not os.path.exists(os.path.join(OUT, r.lstrip("/"))):
                missing.append(f"{p['slug']}: {r}")
        if p.get("gallery") and not p.get("show_gallery", False):
            gone = [g["src"] for g in p["gallery"]
                    if not os.path.exists(os.path.join(OUT, g["src"].lstrip("/")))]
            if gone:
                waiting[p["slug"]] = len(gone)

    if missing:
        raise SystemExit("Build stopped - active projects reference images that "
                         "are not on disk:\n  " + "\n  ".join(missing))
    if waiting:
        n = sum(waiting.values())
        pairs = ", ".join(f"{k} ({v})" for k, v in sorted(waiting.items()))
        print(f"  note: {n} gallery entries have no file yet, in hidden galleries "
              f"so nothing renders - {pairs}")
        print("        turning show_gallery on for one of those will stop the build "
              "until its files exist.")


def prune_stale_pages():
    """projects/ is build output, so the build owns all of it.

    Switching a project to active=False used to leave its page sitting there for
    ever - still deployable, still reachable by anyone holding the URL, still
    indexed from before, and pointing at art that had long since been deleted.
    Anything in the folder that no active project claims is stale and goes."""
    live = {f"{p['slug']}.html" for p in ACTIVE_PROJECTS}
    folder = os.path.join(OUT, "projects")
    for name in sorted(os.listdir(folder)):
        if name.endswith(".html") and name not in live:
            os.remove(os.path.join(folder, name))
            print(f"  removed stale page projects/{name}")


if __name__ == "__main__":
    check_images()
    check_gallery_order()
    os.makedirs(f"{OUT}/images/laurels", exist_ok=True)
    write(f"{OUT}/index.html", build_index())
    write(f"{OUT}/about.html", build_about())
    write(f"{OUT}/work.html", build_work())
    for p in ACTIVE_PROJECTS:
        write(f"{OUT}/projects/{p['slug']}.html", build_project(p))
    prune_stale_pages()
    write(f"{OUT}/sitemap.xml", build_sitemap())
    write(f"{OUT}/robots.txt", build_robots())
    print(f"Built {3 + len(ACTIVE_PROJECTS)} HTML pages + sitemap.xml + robots.txt")
