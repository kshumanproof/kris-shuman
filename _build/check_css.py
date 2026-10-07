# -*- coding: utf-8 -*-
"""Every class the site uses must exist in the compiled stylesheet.

This is the whole risk of moving off the Play CDN: the CDN had every utility
available at runtime, a compiled file only has what the scanner found. A class
it missed does not error, it just silently stops styling something."""
import io, re, sys, glob, os

CUSTOM = set("""animate-scrollDot font-display grain laurel lb-stage marquee-mask
marquee-track overlay-cinematic overlay-cinematic-soft overlay-vignette snap-row
snap-row-flush tap-target is-zoom can-zoom group peer sr-only""".split())

def used():
    toks = set()
    for f in ['index.html','about.html','work.html'] + sorted(glob.glob('projects/*.html')):
        h = io.open(f, encoding='utf-8').read()
        for m in re.findall(r'class="([^"]*)"', h):
            toks |= set(m.split())
    js = io.open('js/main.js', encoding='utf-8').read()
    for m in re.findall(r'classList\.(?:add|remove|toggle)\(\s*"([^"]+)"', js):
        toks |= set(m.split())
    for m in re.findall(r'class=\\?"([^"\\]*)', js):
        toks |= set(m.split())
    return {t for t in toks if t and not t.startswith('{')}

def esc(c):
    # Tailwind escapes most specials with a backslash, but a comma becomes the
    # CSS unicode escape '\\2c ' - checking for '\\,' reports false misses.
    out = ''
    for ch in c:
        if ch == ',':
            out += '\\2c '
        elif ch in '/:[]().%#!<>+*~=\'"&':
            out += '\\' + ch
        else:
            out += ch
    return out

css = io.open('css/tailwind.css', encoding='utf-8').read()
missing = []
for c in sorted(used()):
    if c in CUSTOM: continue
    if re.search(r'\.' + re.escape(esc(c)) + r'(?=[\s,{:>~+\\)])', css): continue
    missing.append(c)

print("classes used on the site : %d" % len(used()))
print("custom / non-Tailwind    : %d" % len(CUSTOM & used()))
if missing:
    print("\nMISSING FROM COMPILED CSS (%d):" % len(missing))
    for c in missing: print("   %s" % c)
    sys.exit(1)
print("\nALL CLASSES PRESENT - compiled stylesheet covers the site")
