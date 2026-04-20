#!/usr/bin/env python3
"""Fetch curated part photos from Wikimedia Commons, resize to 800x800 white-bg JPEG."""
import os, sys, json, io, urllib.request, urllib.parse, ssl
from PIL import Image, ImageOps

OUT = os.path.join(os.path.dirname(__file__), "..", "public", "images", "products")
os.makedirs(OUT, exist_ok=True)

UA = "HPCSBot/1.0 (contact@hpcs.ma) Python-urllib"
CTX = ssl.create_default_context()

QUERIES = {
    "brake-pads":      ["brake pad", "disc brake pad"],
    "brake-disc":      ["brake disc rotor", "brake disc"],
    "oil-filter":      ["oil filter car", "engine oil filter"],
    "air-filter":      ["air filter engine", "automotive air filter"],
    "cabin-filter":    ["cabin air filter", "pollen filter car"],
    "fuel-filter":     ["fuel filter automotive", "fuel filter"],
    "radiator":        ["automobile radiator", "car radiator"],
    "ac-condenser":    ["car air conditioning condenser", "ac condenser car"],
    "water-pump":      ["water pump automotive", "coolant pump car"],
    "thermostat":      ["automotive thermostat", "car thermostat"],
    "shock-absorber":  ["shock absorber car", "McPherson strut"],
    "ball-joint":      ["ball joint suspension", "ball joint car"],
    "stabilizer-link": ["stabilizer link", "sway bar end link"],
    "spark-plug":      ["spark plug"],
    "ignition-coil":   ["ignition coil", "ignition coil pack"],
    "headlight":       ["car headlight", "automobile headlamp"],
    "taillight":       ["car tail light", "automobile tail lamp"],
    "abs-sensor":      ["ABS wheel speed sensor", "wheel speed sensor"],
    "oxygen-sensor":   ["oxygen sensor lambda", "lambda sensor"],
    "ac-compressor":   ["air conditioning compressor car", "automotive ac compressor"],
    "timing-belt":     ["timing belt"],
    "drive-belt":      ["serpentine belt", "drive belt automotive"],
    "clutch-kit":      ["clutch automotive", "car clutch disc"],
    "alternator":      ["alternator automotive", "car alternator"],
    "starter":         ["starter motor automotive", "car starter motor"],
    "side-mirror":     ["car side mirror", "wing mirror"],
    "floor-mat":       ["car floor mat", "automobile floor mat"],
}

def http_json(url):
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=30, context=CTX) as r:
        return json.loads(r.read())

def http_bytes(url):
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=60, context=CTX) as r:
        return r.read()

def search_commons(query):
    url = ("https://commons.wikimedia.org/w/api.php?action=query&format=json"
           "&list=search&srnamespace=6&srlimit=10&srsearch=" +
           urllib.parse.quote(query + " filetype:bitmap"))
    try:
        data = http_json(url)
        return [x["title"] for x in data.get("query", {}).get("search", [])]
    except Exception as e:
        print(f"  search error: {e}")
        return []

def get_imageinfo(title):
    url = ("https://commons.wikimedia.org/w/api.php?action=query&format=json"
           "&prop=imageinfo&iiprop=url|size|mime&titles=" + urllib.parse.quote(title))
    try:
        data = http_json(url)
        pages = data.get("query", {}).get("pages", {})
        for p in pages.values():
            info = p.get("imageinfo", [{}])[0]
            return info
    except Exception as e:
        print(f"  imageinfo error: {e}")
    return {}

def is_good_mime(mime):
    return mime in ("image/jpeg", "image/png", "image/webp")

def process(raw_bytes, out_path):
    img = Image.open(io.BytesIO(raw_bytes))
    # Handle EXIF rotation
    img = ImageOps.exif_transpose(img)
    img = img.convert("RGB")
    # Fit within 800x800, then paste on white square
    img.thumbnail((780, 780), Image.LANCZOS)
    canvas = Image.new("RGB", (800, 800), (255, 255, 255))
    x = (800 - img.width) // 2
    y = (800 - img.height) // 2
    canvas.paste(img, (x, y))
    canvas.save(out_path, "JPEG", quality=85, optimize=True)

def fetch(part_type, queries):
    print(f"→ {part_type}")
    out_path = os.path.join(OUT, f"{part_type}.jpg")
    for q in queries:
        titles = search_commons(q)
        for t in titles:
            tl = t.lower()
            # Skip obvious non-part results
            skip_kw = ["diagram", "logo", "map", "svg", "icon", "chart",
                       "portrait", "person", "advertising poster"]
            if any(k in tl for k in skip_kw):
                continue
            info = get_imageinfo(t)
            url = info.get("url")
            mime = info.get("mime", "")
            size = info.get("size", 0)
            if not url or not is_good_mime(mime):
                continue
            if size < 3000 or size > 8 * 1024 * 1024:
                continue
            try:
                data = http_bytes(url)
                process(data, out_path)
                fsz = os.path.getsize(out_path)
                if fsz < 3000:
                    os.remove(out_path)
                    continue
                print(f"  OK {t} ({fsz} bytes) from query '{q}'")
                return True
            except Exception as e:
                print(f"  fail {t}: {e}")
                continue
    print(f"  FAIL {part_type}")
    return False

if __name__ == "__main__":
    ok, fail = [], []
    for pt, qs in QUERIES.items():
        if fetch(pt, qs):
            ok.append(pt)
        else:
            fail.append(pt)
    print("\n=== SUMMARY ===")
    print(f"OK   ({len(ok)}): {ok}")
    print(f"FAIL ({len(fail)}): {fail}")
