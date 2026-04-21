#!/usr/bin/env python3
"""Wikipedia pageimages fetch for remaining types."""
import json, os, urllib.parse, urllib.request, io, time, sys, re
from PIL import Image

OUT_DIR = os.path.expanduser("~/hpcs/public/images/products")
UA = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36"

# slug -> list of Wikipedia article titles to try in order
TARGETS = {
    "headlight": ["Headlamp", "Automotive_lighting"],
    "taillight": ["Automotive_lighting"],  # may not match, will inspect
    "starter": ["Starter_(engine)"],
    "side-mirror": ["Wing_mirror"],
    "pare-chocs": ["Bumper_(car)"],
    "calandre": ["Grille_(car)"],
    "wiper": ["Windscreen_wiper"],
    "windshield": ["Windshield"],
    "fog-light": ["Fog_lamp"],
    "ac-condenser": ["Air_conditioning"],  # probably won't match
    "clutch-kit": ["Clutch", "Friction_disk"],
    "door-handle": ["Car_door"],
    "hayon": ["Trunk_(car)", "Hatchback"],
    "brake-disc": ["Disc_brake"],
}

def http_get(url, binary=False, timeout=30, retries=4):
    for i in range(retries):
        try:
            req = urllib.request.Request(url, headers={"User-Agent": UA, "Accept": "*/*"})
            with urllib.request.urlopen(req, timeout=timeout) as r:
                return r.read() if binary else r.read().decode("utf-8", errors="replace")
        except urllib.error.HTTPError as e:
            if e.code in (429, 503):
                time.sleep(5 + i*5); continue
            raise
        except Exception:
            time.sleep(3)
    raise RuntimeError("retries exhausted")

def wp_pageimage(title):
    url = f"https://en.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages&titles={urllib.parse.quote(title)}&pithumbsize=1000"
    j = json.loads(http_get(url))
    for p in j["query"]["pages"].values():
        t = (p.get("thumbnail") or {}).get("source")
        if t: return t
    return None

def convert(raw, out_path, size=800):
    try:
        im = Image.open(io.BytesIO(raw)); im.load()
    except Exception: return False
    if im.mode in ("RGBA","LA","P"):
        bg = Image.new("RGB", im.size, (255,255,255))
        im2 = im.convert("RGBA"); bg.paste(im2, mask=im2.split()[-1]); im = bg
    else: im = im.convert("RGB")
    w,h = im.size
    if w < 400 or h < 400: return False
    scale = size/max(w,h); nw,nh=int(w*scale),int(h*scale)
    im = im.resize((nw,nh), Image.LANCZOS)
    c = Image.new("RGB",(size,size),(255,255,255))
    c.paste(im, ((size-nw)//2,(size-nh)//2))
    c.save(out_path,"JPEG",quality=88)
    return True

def main():
    results = {}
    for slug, topics in TARGETS.items():
        out = os.path.join(OUT_DIR, f"{slug}.jpg")
        if os.path.exists(out):
            results[slug]="EXISTS"; continue
        ok=False
        for topic in topics:
            try:
                img = wp_pageimage(topic)
                time.sleep(2)
                if not img: continue
                print(f"[{slug}] {topic} -> {img}")
                raw = http_get(img, binary=True)
                if len(raw) < 8000: continue
                if convert(raw, out):
                    results[slug]=f"OK wp:{topic}"; ok=True; break
            except Exception as e:
                print(f"  err: {e}")
            time.sleep(2)
        if not ok: results[slug]="FAIL"
    print("\n=== SUMMARY ===")
    for k,v in results.items(): print(f"{k:20s} {v}")

if __name__ == "__main__":
    main()
