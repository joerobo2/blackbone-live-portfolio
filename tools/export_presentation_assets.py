#!/usr/bin/env python3

from pathlib import Path
from http.server import SimpleHTTPRequestHandler
from socketserver import TCPServer
import functools
import json
import os
import re
import shutil
import subprocess
import threading
import time

REPO = Path.cwd()
SOURCE_HTML = REPO / "portfolio" / "presentation" / "index.html"

EXPORT_ROOT = REPO / "exports" / "presentation"
HTML_DIR = EXPORT_ROOT / "html"
FRAMES_DIR = EXPORT_ROOT / "frames"
PDF_DIR = EXPORT_ROOT / "pdf"
KDENLIVE_DIR = EXPORT_ROOT / "kdenlive"

VIEWPORT_W = 1920
VIEWPORT_H = 1080
DEVICE_SCALE_FACTOR = 2

for d in [HTML_DIR, FRAMES_DIR, PDF_DIR, KDENLIVE_DIR]:
    d.mkdir(parents=True, exist_ok=True)

def find_browser():
    for candidate in [
        os.environ.get("CHROME_BIN"),
        shutil.which("chromium"),
        shutil.which("google-chrome"),
        shutil.which("google-chrome-stable"),
    ]:
        if candidate:
            return candidate
    raise SystemExit("No Chromium/Chrome executable found. Install chromium first.")

def strip_scripts(html: str) -> str:
    return re.sub(r"<script\b[^>]*>.*?</script>", "", html, flags=re.S | re.I)

def force_active_slide(html: str, target_slide: int) -> str:
    def repl(match):
        tag = match.group(0)
        slide_num = int(match.group(1))

        class_match = re.search(r'class="([^"]*)"', tag)
        if not class_match:
            return tag

        classes = class_match.group(1).split()
        classes = [c for c in classes if c != "is-active"]

        if slide_num == target_slide and "is-active" not in classes:
            classes.append("is-active")

        new_class = 'class="' + " ".join(classes) + '"'
        tag = tag[:class_match.start()] + new_class + tag[class_match.end():]
        return tag

    return re.sub(
        r'<section\b(?=[^>]*\bdata-slide="(\d+)")[^>]*>',
        repl,
        html,
        flags=re.S,
    )

def inject_export_css(html: str) -> str:
    export_css = f"""
<style id="presentation-export-clean">
  @page {{
    size: 16in 9in;
    margin: 0;
  }}

  html,
  body {{
    width: {VIEWPORT_W}px !important;
    height: {VIEWPORT_H}px !important;
    margin: 0 !important;
    padding: 0 !important;
    overflow: hidden !important;
    background: #020817 !important;
  }}

  header,
  nav,
  footer,
  .site-header,
  .site-footer,
  .presentation-controls,
  .slide-audio-button,
  .slide-audio-button--slide,
  .slide-audio-button--control {{
    display: none !important;
  }}

  body.presentation-page {{
    min-height: {VIEWPORT_H}px !important;
    overflow: hidden !important;
  }}

  .presentation-slide {{
    display: none !important;
  }}

  .presentation-slide.is-active {{
    display: grid !important;
    opacity: 1 !important;
    visibility: visible !important;
  }}
</style>
"""
    if "</head>" not in html:
        raise SystemExit("Could not find </head> in presentation HTML.")

    return html.replace("</head>", export_css + "\n</head>", 1)

def get_audio_duration(audio_path: Path):
    if not audio_path.exists():
        return ""

    cmd = [
        "ffprobe",
        "-v", "error",
        "-show_entries", "format=duration",
        "-of", "json",
        str(audio_path),
    ]

    try:
        result = subprocess.run(cmd, check=True, capture_output=True, text=True)
        data = json.loads(result.stdout)
        duration = float(data["format"]["duration"])
        return f"{duration:.2f}"
    except Exception:
        return ""

def run_chromium(browser, args):
    base = [
        browser,
        "--headless=new",
        "--disable-gpu",
        "--disable-dev-shm-usage",
        "--hide-scrollbars",
        f"--window-size={VIEWPORT_W},{VIEWPORT_H}",
        f"--force-device-scale-factor={DEVICE_SCALE_FACTOR}",
    ]

    result = subprocess.run(base + args, capture_output=True, text=True)

    if result.returncode != 0:
        fallback = base.copy()
        fallback[1] = "--headless"
        result = subprocess.run(fallback + args, capture_output=True, text=True)

    if result.returncode != 0:
        print(result.stdout)
        print(result.stderr)
        raise SystemExit("Chromium export failed.")

def main():
    if not SOURCE_HTML.exists():
        raise SystemExit(f"Missing source HTML: {SOURCE_HTML}")

    browser = find_browser()
    print(f"Using browser: {browser}")

    original = SOURCE_HTML.read_text()
    original = strip_scripts(original)

    slide_nums = [int(n) for n in re.findall(r'data-slide="(\d+)"', original)]
    slide_nums = sorted(set(slide_nums))

    if not slide_nums:
        raise SystemExit("No slides found.")

    print(f"Slides found: {slide_nums}")

    for slide_num in slide_nums:
        html = force_active_slide(original, slide_num)
        html = inject_export_css(html)
        out = HTML_DIR / f"slide-{slide_num:02d}.html"
        out.write_text(html)

    handler = functools.partial(SimpleHTTPRequestHandler, directory=str(REPO))

    class QuietServer(TCPServer):
        allow_reuse_address = True

    server = QuietServer(("127.0.0.1", 0), handler)
    port = server.server_address[1]

    thread = threading.Thread(target=server.serve_forever, daemon=True)
    thread.start()
    time.sleep(0.4)

    try:
        for slide_num in slide_nums:
            url = f"http://127.0.0.1:{port}/exports/presentation/html/slide-{slide_num:02d}.html"
            png_out = FRAMES_DIR / f"slide-{slide_num:02d}.png"
            pdf_out = PDF_DIR / f"slide-{slide_num:02d}.pdf"

            print(f"Exporting slide {slide_num:02d} PNG...")
            run_chromium(browser, [
                f"--screenshot={png_out}",
                url,
            ])

            print(f"Exporting slide {slide_num:02d} PDF...")
            run_chromium(browser, [
                "--no-pdf-header-footer",
                f"--print-to-pdf={pdf_out}",
                url,
            ])

    finally:
        server.shutdown()
        server.server_close()

    combined_pdf = EXPORT_ROOT / "portfolio-presentation.pdf"
    pdfunite = shutil.which("pdfunite")

    if pdfunite:
        pdfs = [str(PDF_DIR / f"slide-{n:02d}.pdf") for n in slide_nums]
        subprocess.run([pdfunite, *pdfs, str(combined_pdf)], check=True)
        print(f"Combined PDF created: {combined_pdf}")
    else:
        print("pdfunite not found. Per-slide PDFs were created, but combined PDF was skipped.")

    manifest = EXPORT_ROOT / "manifest.csv"
    rows = ["slide,png,pdf,audio,audio_seconds"]

    for slide_num in slide_nums:
        png = FRAMES_DIR / f"slide-{slide_num:02d}.png"
        pdf = PDF_DIR / f"slide-{slide_num:02d}.pdf"
        audio = REPO / "assets" / "audio" / "presentation" / f"slide-{slide_num:02d}.mp3"
        duration = get_audio_duration(audio)
        rows.append(
            f"{slide_num:02d},{png.relative_to(REPO)},{pdf.relative_to(REPO)},{audio.relative_to(REPO)},{duration}"
        )

    manifest.write_text("\n".join(rows) + "\n")

    notes = KDENLIVE_DIR / "README.md"
    notes.write_text(f"""# Kdenlive Assembly Notes

Project:
- Resolution: {VIEWPORT_W}x{VIEWPORT_H}
- Frame rate: 30 fps
- Output: MP4 / H.264 / 1080p

Import:
- PNG frames from: exports/presentation/frames/
- MP3 narration from: assets/audio/presentation/

Timeline order:
1. slide-01.png with slide-01.mp3
2. slide-02.png with slide-02.mp3
3. slide-03.png with slide-03.mp3
4. slide-04.png with slide-04.mp3
5. slide-05.png with slide-05.mp3
6. slide-06.png with slide-06.mp3
7. slide-07.png with slide-07.mp3
8. slide-08.png with slide-08.mp3
9. slide-09.png with slide-09.mp3

Use the audio clip length to set each still image duration.
""")

    print()
    print("DONE")
    print(f"Frames: {FRAMES_DIR}")
    print(f"PDFs: {PDF_DIR}")
    print(f"Manifest: {manifest}")
    print(f"Kdenlive notes: {notes}")
    if combined_pdf.exists():
        print(f"Combined PDF: {combined_pdf}")

if __name__ == "__main__":
    main()
