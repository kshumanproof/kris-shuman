You do NOT need this folder to run or edit the site. The site is plain HTML/CSS/JS —
open any .html file and edit it directly.

This folder holds the scripts that generate every page from one data file, so a change
like adding a project doesn't mean copy-pasting and hand-editing a whole new page.

    data.py          every project and its copy — the single source of truth
    build_site.py    turns data.py into index/about/work + one page per project
    make_heroes.py   turns a source photo into a graded hero matching the homepage

Requires Python 3 + Pillow only.


ADDING A PROJECT
----------------
1. Drop the hero photo in  images/<slug>/
2. Copy an existing entry in data.py and edit it. The keys that matter:

       "slug"          url + folder name, e.g. "losers-guide"
       "image"         where the finished hero will be written
       "hero_source"   the photo from step 1
       "hero_size"     optional, default (2400, 1350); use (2000, 1125) for
                       foliage-heavy shots, which compress badly
       "active"        False hides it everywhere and stops its page regenerating
       "show_gallery"  False hides the Stills strip even if "gallery" has entries
       "slate"         True puts it in the homepage grid (which shows the first 6)
       "featured"      True puts it in the homepage featured slot — exactly one
                       project should have this, and it should have "slate": False
                       so it doesn't also appear in the grid below itself

3. Run, from inside this folder:

       python3 make_heroes.py <slug>     # grade the photo
       python3 build_site.py             # regenerate every page

   make_heroes.py with no arguments regrades every project that has a hero_source,
   and skips any whose photo is missing.


THE HERO GRADE
--------------
make_heroes.py matches every hero to images/forest-road.webp (the homepage hero):
its tonal curve, its warm-olive cast, its desaturation and its grain. Five dials at
the top of the file control how far. The tone match runs on luminance with chroma
carried along — matching each RGB channel separately tears bright skies into
rainbow bands.
