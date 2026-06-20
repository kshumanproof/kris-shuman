You do NOT need this folder to run or edit the site. The site is plain HTML/CSS/JS —
open any .html file and edit it directly.

This folder just holds the script Claude used to generate the 14 project pages from
one shared template + one data file (data.py), so a future change like adding a 15th
project doesn't mean copy-pasting and hand-editing a whole new page.

To add a new project later: add an entry to data.py, then run:
    python3 build_site.py
from this folder (requires Python 3 + Pillow only). Or just ask Claude to do it.
