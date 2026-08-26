#!/usr/bin/env python3
"""
Build the atmospheric project heroes for krisshuman.com.

Each source photo is center-cropped to 16:9, resized, then graded to match the
homepage hero (images/forest-road.webp): the same tonal shape (lifted shadows,
highlights rolled off to a matte ceiling), the same warm-olive colour cast, the
same desaturation, the same fine monochrome grain, and a light vignette.

The tone match runs on luminance with chroma carried along proportionally, and
the colour cast is applied as a smooth function of luminance. Doing it per RGB
channel instead tears bright skies into rainbow bands.

Usage:  python3 make_heroes.py                 # every project with a hero_source
        python3 make_heroes.py losers-guide    # just one, by slug
"""
import os, sys
import numpy as np
from PIL import Image, ImageOps, ImageEnhance

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from data import PROJECTS

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
IMG = os.path.join(REPO, "images")
REFERENCE = os.path.join(IMG, "forest-road.webp")   # the homepage hero = the look

# ---- dials ------------------------------------------------------------------
TONE   = 0.92    # how far to adopt the reference's tonal shape (0 = original)
CAST   = 0.85    # how far to adopt its warm-olive colour cast
SAT    = 0.90    # extra desaturation afterwards
GRAIN  = 1.35    # monochrome grain sigma, measured off the homepage hero
VIGNET = 0.16    # corner darkening; 0 = off
LUT_SMOOTH = 31  # tone-curve smoothing; raise if a smooth sky shows speckle

def jobs():
    """Every project in data.py that declares a hero_source. data.py stays the
    single source of truth — adding a project never means editing this file."""
    out = {}
    for p in PROJECTS:
        src = p.get("hero_source")
        if not src:
            continue
        rel = lambda q: q.lstrip("/").removeprefix("images/")   # paths in data.py are site-absolute
        out[p["slug"]] = (rel(src), rel(p["image"]),
                          tuple(p.get("hero_size", (2400, 1350))))
    return out


JOBS = jobs()
# Smooth skies need more bits than detailed frames — start high and step down
# only until the file fits the budget.
BUDGET, QUALITIES = 430 * 1024, [92, 88, 84, 80, 76, 74]

W_LUMA = np.array([0.2126, 0.7152, 0.0722], dtype=np.float32)


def luma(a):
    return a @ W_LUMA


def smooth(v, k=15):
    ker = np.ones(k, dtype=np.float32) / k
    return np.convolve(np.pad(v, k, mode="edge"), ker, mode="same")[k:-k]


def cdf(vals):
    h, _ = np.histogram(vals, bins=256, range=(0, 256))
    c = np.cumsum(h).astype(np.float32)
    return c / max(c[-1], 1)


def tone_lut(src_vals, ref_cdf):
    """256-entry LUT mapping source luma onto the reference's luma distribution."""
    s = cdf(src_vals)
    lut = np.interp(s, ref_cdf, np.arange(256, dtype=np.float32))
    # Heavy smoothing matters: where the source histogram is dense (a big flat
    # sky) the raw LUT goes near-vertical and turns fine cloud texture into
    # speckle. Smoothing trades an exact distribution match for a clean sky.
    return smooth(np.maximum.accumulate(lut), LUT_SMOOTH)


def cast_profile(arr, y):
    """Mean (channel - luma) at each luma level: the image's colour cast."""
    yi = np.clip(y.astype(np.int32), 0, 255).ravel()
    counts = np.bincount(yi, minlength=256).astype(np.float32)
    prof = np.empty((3, 256), dtype=np.float32)
    for c in range(3):
        tot = np.bincount(yi, weights=(arr[..., c] - y).ravel(), minlength=256)
        seen = counts > 32
        p = np.zeros(256, dtype=np.float32)
        p[seen] = tot[seen] / counts[seen]
        if seen.any():                                   # fill the empty tails
            idx = np.flatnonzero(seen)
            p = np.interp(np.arange(256), idx, p[idx])
        prof[c] = smooth(p, 21)
    return prof


def crop_16x9(im):
    w, h = im.size
    if w * 9 > h * 16:
        nw = round(h * 16 / 9); left = (w - nw) // 2
        return im.crop((left, 0, left + nw, h))
    nh = round(w * 9 / 16); top = (h - nh) // 2
    return im.crop((0, top, w, top + nh))


def vignette(h, w, amount):
    yy, xx = np.mgrid[0:h, 0:w]
    r = np.sqrt(((xx - w / 2) / (w / 2)) ** 2 + ((yy - h / 2) / (h / 2)) ** 2) / np.sqrt(2)
    return (1.0 - amount * np.clip(r, 0, 1) ** 2.2).astype(np.float32)


def load_reference():
    a = np.asarray(Image.open(REFERENCE).convert("RGB")).astype(np.float32)
    y = luma(a)
    return cdf(y), cast_profile(a, y)


def process(key, ref_cdf, ref_cast):
    src_name, dst_rel, (W, H) = JOBS[key]
    src = os.path.join(IMG, src_name)
    dst = os.path.join(IMG, dst_rel)
    if not os.path.exists(src):
        print(f"{key:16} SKIPPED — source photo missing: images/{src_name}")
        return
    os.makedirs(os.path.dirname(dst), exist_ok=True)

    im = Image.open(src)
    im.draft("RGB", (W * 2, H * 2))
    im = crop_16x9(im.convert("RGB")).resize((W, H), Image.LANCZOS)
    im = ImageOps.autocontrast(im, cutoff=0.5)
    a = np.asarray(im).astype(np.float32)

    # 1. tonal shape, on luminance, chroma carried proportionally
    y = luma(a)
    lut = tone_lut(y, ref_cdf)
    y2 = np.interp(y, np.arange(256, dtype=np.float32), lut)
    y2 = y * (1 - TONE) + y2 * TONE
    a = a * ((y2 + 1.0) / (y + 1.0))[..., None]

    # 2. colour cast, as a smooth function of luminance
    y2i = np.clip(y2, 0, 255)
    cur_cast = cast_profile(a, y2i)
    xs = np.arange(256, dtype=np.float32)
    for c in range(3):
        delta = smooth(ref_cast[c] - cur_cast[c], 21)
        a[..., c] += CAST * np.interp(y2i, xs, delta)

    im = ImageEnhance.Color(Image.fromarray(np.clip(a, 0, 255).astype(np.uint8))).enhance(SAT)

    # 3. vignette + grain (the grain also dithers away any residual banding)
    a = np.asarray(im).astype(np.float32)
    if VIGNET:
        a *= vignette(H, W, VIGNET)[..., None]
    if GRAIN:
        rng = np.random.default_rng(abs(hash(key)) % (2 ** 32))
        a += rng.normal(0.0, GRAIN, (H, W, 1))
    im = Image.fromarray(np.clip(a, 0, 255).astype(np.uint8))

    for q in QUALITIES:
        im.save(dst, "WEBP", quality=q, method=6)
        size = os.path.getsize(dst)
        if size <= BUDGET:
            break
    print(f"{key:16} -> images/{dst_rel:46} {W}x{H}  q{q}  {size/1024:.0f} KB")


if __name__ == "__main__":
    rc, rk = load_reference()
    wanted = sys.argv[1:] or list(JOBS)
    for k in wanted:
        if k not in JOBS:
            print(f"{k:16} no such project, or it has no hero_source in data.py")
            continue
        process(k, rc, rk)
