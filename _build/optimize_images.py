#!/usr/bin/env python3
"""
Optimize images from the Next.js public/images tree into html-site/images.
- Resizes to sane max widths (heroes vs thumbnails vs misc)
- Converts everything to WebP (huge size win, broad browser support in 2026)
- Preserves relative folder structure / filenames (swap extension to .webp)
- Leaves non-image files (resume.pdf, favicon.ico, signature.png w/ transparency) handled separately
"""
import os
from pathlib import Path
from PIL import Image

SRC = Path("/sessions/admiring-youthful-keller/mnt/kris-shuman-site/public/images")
DST = Path("/sessions/admiring-youthful-keller/mnt/kris-shuman-site/html-site/images")

# Hero images get a larger max width since they're full-bleed; everything else (gallery/thumbs) smaller.
HERO_HINTS = {"forest-road.png"}  # homepage hero; project heroes are the file matching the project's "image" field, handled by name heuristics below

MAX_W_HERO = 2200
MAX_W_DEFAULT = 1400
QUALITY = 78

total_before = 0
total_after = 0
count = 0

DST.mkdir(parents=True, exist_ok=True)

for root, dirs, files in os.walk(SRC):
    rel_dir = Path(root).relative_to(SRC)
    out_dir = DST / rel_dir
    out_dir.mkdir(parents=True, exist_ok=True)
    for fname in files:
        src_path = Path(root) / fname
        ext = src_path.suffix.lower()
        if ext not in (".png", ".jpg", ".jpeg", ".webp"):
            # copy as-is (e.g. any stray non-image)
            continue
        size_before = src_path.stat().st_size
        total_before += size_before

        try:
            img = Image.open(src_path)
            img = img.convert("RGB") if img.mode in ("P",) else img
            if img.mode == "RGBA":
                pass  # keep alpha
            max_w = MAX_W_HERO if fname in HERO_HINTS or "hero" in fname.lower() else MAX_W_DEFAULT
            if img.width > max_w:
                ratio = max_w / img.width
                img = img.resize((max_w, int(img.height * ratio)), Image.LANCZOS)

            out_name = src_path.stem + ".webp"
            out_path = out_dir / out_name
            save_kwargs = {"quality": QUALITY, "method": 6}
            img.save(out_path, "WEBP", **save_kwargs)
            size_after = out_path.stat().st_size
            total_after += size_after
            count += 1
        except Exception as e:
            print(f"FAILED: {src_path}: {e}")

print(f"Converted {count} images")
print(f"Before: {total_before/1024/1024:.1f} MB")
print(f"After:  {total_after/1024/1024:.1f} MB")
print(f"Savings: {(1 - total_after/total_before)*100:.1f}%")
