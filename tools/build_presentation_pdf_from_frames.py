#!/usr/bin/env python3

from pathlib import Path
from reportlab.pdfgen import canvas
from reportlab.lib.units import inch
from reportlab.lib.utils import ImageReader
import shutil

ROOT = Path.cwd()
FRAMES_DIR = ROOT / "exports" / "presentation" / "frames"

OUT_CANONICAL = ROOT / "exports" / "presentation" / "joseph-robinson-ist782-portfolio-presentation.pdf"
OUT_COMPAT = ROOT / "exports" / "presentation" / "portfolio-presentation.pdf"
OUT_FROM_FRAMES = ROOT / "exports" / "presentation" / "portfolio-presentation-from-frames.pdf"

ROOT_URL = "https://blackbone.live"
PORTFOLIO_URL = "https://blackbone.live/portfolio/"

SLIDE_URLS = {
    1: ROOT_URL,
    2: PORTFOLIO_URL,
    3: "https://blackbone.live/portfolio/reader/?doc=financial-packet",
    4: "https://blackbone.live/portfolio/reader/?doc=chemical-packet",
    5: "https://blackbone.live/portfolio/reader/?doc=inventory-packet",
    6: PORTFOLIO_URL,
    7: PORTFOLIO_URL,
    8: PORTFOLIO_URL,
    9: PORTFOLIO_URL,
}

frames = sorted(FRAMES_DIR.glob("slide-*.png"))

if not frames:
    raise SystemExit(f"No slide frames found in {FRAMES_DIR}")

page_w = 16 * inch
page_h = 9 * inch

c = canvas.Canvas(str(OUT_CANONICAL), pagesize=(page_w, page_h))

for frame in frames:
    slide_num = int(frame.stem.split("-")[-1])
    url = SLIDE_URLS.get(slide_num, PORTFOLIO_URL)

    print(f"Adding {frame.name} -> {url}")

    c.drawImage(
        ImageReader(str(frame)),
        0,
        0,
        width=page_w,
        height=page_h,
        preserveAspectRatio=False,
        anchor="c",
    )

    c.linkURL(url, (0, 0, page_w, page_h), relative=0)
    c.showPage()

c.save()

shutil.copy2(OUT_CANONICAL, OUT_COMPAT)
shutil.copy2(OUT_CANONICAL, OUT_FROM_FRAMES)

print()
print(f"Created: {OUT_CANONICAL}")
print(f"Also wrote: {OUT_COMPAT}")
print(f"Also wrote: {OUT_FROM_FRAMES}")
