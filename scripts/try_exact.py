#!/usr/bin/env python3
"""Targeted retry for a few essentials."""
import os, io, json, urllib.request, urllib.parse, ssl
from PIL import Image, ImageOps

OUT = os.path.join(os.path.dirname(__file__), "..", "public", "images", "products")
UA = "HPCSBot/1.0 (contact@hpcs.ma)"
CTX = ssl.create_default_context()

# exact filenames to try on Commons (vehicle-specific part photos)
# keyed by destination name
TRY = {
    "brake-pads": [
        "File:Brake pads (brembo).jpg",
        "File:Brake pads 02.jpg",
        "File:Brake-pads-new.jpg",
        "File:Brake pad.jpg",
        "File:New front brake pads.jpg",
        "File:Wagner brake pads.JPG",
    ],
    "brake-disc": [
        "File:Brake disc.jpg",
        "File:Brake rotor.jpg",
        "File:Brake disc 01.jpg",
        "File:Bremsscheibe.jpg",
        "File:Drilled brake disc.jpg",
    ],
    "headlight": [
        "File:Car headlight.jpg",
        "File:Automobile headlight.jpg",
        "File:Halogen headlight.jpg",
        "File:LED headlight.jpg",
    ],
    "taillight": [
        "File:Car tail light.jpg",
        "File:Tail light.jpg",
        "File:LED taillight.jpg",
    ],
    "shock-absorber": [
        "File:Shock absorber.jpg",
        "File:Car shock absorber.jpg",
        "File:Bilstein shock absorber.jpg",
    ],
    "side-mirror": [
        "File:Car side view mirror.jpg",
        "File:Side view mirror.jpg",
    ],
    "ac-compressor": [
        "File:Car air conditioning compressor.jpg",
        "File:AC compressor.jpg",
        "File:Automotive AC compressor.jpg",
    ],
    "starter": [
        "File:Car starter motor.jpg",
        "File:Starter motor.jpg",
    ],
    "clutch-kit": [
        "File:Car clutch.jpg",
        "File:Clutch disc.jpg",
        "File:Clutch kit.jpg",
    ],
    "radiator": [
        "File:Car radiator.jpg",
        "File:Automotive radiator.jpg",
        "File:Aluminium radiator.jpg",
    ],
    "stabilizer-link": [
        "File:Stabilizer link.jpg",
        "File:Anti roll bar link.jpg",
        "File:Sway bar end link.jpg",
    ],
    "ac-condenser": [
        "File:Car AC condenser.jpg",
        "File:Automotive condenser.jpg",
    ],
    "cabin-filter": [
        "File:Cabin filter.jpg",
        "File:Car cabin air filter.jpg",
    ],
}

def req_bytes(url):
    r = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(r, timeout=30, context=CTX) as resp:
        return resp.read()

def req_json(url):
    return json.loads(req_bytes(url))

def info(title):
    url = ("https://commons.wikimedia.org/w/api.php?action=query&format=json"
           "&prop=imageinfo&iiprop=url|size|mime&titles=" + urllib.parse.quote(title))
    try:
        d = req_json(url)
        pages = d.get("query", {}).get("pages", {})
        for pid, p in pages.items():
            if pid == "-1":
                return None
            ii = p.get("imageinfo")
            if ii: return ii[0]
    except Exception as e:
        print("err:", e)
    return None

def process(data, out_path):
    img = Image.open(io.BytesIO(data))
    img = ImageOps.exif_transpose(img).convert("RGB")
    img.thumbnail((780, 780), Image.LANCZOS)
    canvas = Image.new("RGB", (800, 800), (255, 255, 255))
    canvas.paste(img, ((800 - img.width) // 2, (800 - img.height) // 2))
    canvas.save(out_path, "JPEG", quality=85, optimize=True)

for key, titles in TRY.items():
    out = os.path.join(OUT, f"{key}.jpg")
    if os.path.exists(out):
        continue
    print(f"→ {key}")
    for t in titles:
        ii = info(t)
        if not ii: continue
        mime = ii.get("mime", "")
        if mime not in ("image/jpeg", "image/png"):
            continue
        sz = ii.get("size", 0)
        if sz < 3000 or sz > 8*1024*1024:
            continue
        url = ii.get("url")
        try:
            data = req_bytes(url)
            process(data, out)
            print(f"  OK {t}")
            break
        except Exception as e:
            print(f"  fail {t}: {e}")
    else:
        print(f"  SKIP {key}")
