#!/usr/bin/env python3
"""Retry specific part types with tighter title filtering."""
import os, io, json, urllib.request, urllib.parse, ssl
from PIL import Image, ImageOps

OUT = os.path.join(os.path.dirname(__file__), "..", "public", "images", "products")
UA = "HPCSBot/1.0 (contact@hpcs.ma)"
CTX = ssl.create_default_context()

# (part_type, [queries], [required keywords in title (any)], [banned keywords in title (none)])
TARGETS = [
    ("brake-pads",   ["brake pad car", "disc brake pad automotive", "brake pads"],
                      ["brake pad", "brake-pad"],
                      ["shimano", "bicycle", "bike", "hydraulic lever"]),
    ("brake-disc",   ["brake disc car", "brake rotor automotive", "ventilated disc brake"],
                      ["disc", "rotor"],
                      ["shimano", "bicycle", "bike", "magura", "julie"]),
    ("fuel-filter",  ["fuel filter", "diesel fuel filter"],
                      ["fuel filter"],
                      ["tank", "gas station"]),
    ("radiator",     ["car radiator", "engine radiator", "aluminium radiator"],
                      ["radiator"],
                      ["grill", "grille", "building", "room", "heating"]),
    ("water-pump",   ["water pump engine", "coolant pump"],
                      ["water pump", "coolant pump"],
                      ["well", "1899", "book", "house"]),
    ("shock-absorber", ["shock absorber", "strut damper"],
                      ["shock", "strut", "damper"],
                      ["1935", "book", "diagram"]),
    ("ignition-coil", ["ignition coil pack", "coil on plug"],
                      ["coil"],
                      ["vibrator", "tesla"]),
    ("headlight",    ["automobile headlight", "headlamp"],
                      ["headlight", "headlamp"],
                      ["soviet", "night"]),
    ("taillight",    ["tail lamp", "rear light car"],
                      ["tail", "rear light", "rear lamp"],
                      ["road", "night", "sunset"]),
    ("ac-compressor", ["car ac compressor", "automotive compressor"],
                      ["compressor"],
                      ["amtrak", "train", "refrigerator", "air conditioner unit"]),
    ("clutch-kit",   ["clutch disc car", "clutch plate"],
                      ["clutch"],
                      ["transmission", "gearbox", "bicycle"]),
    ("starter",      ["starter motor car", "car starter"],
                      ["starter"],
                      ["battery", "button", "pistol"]),
    ("side-mirror",  ["side mirror car", "wing mirror car", "rear view mirror exterior"],
                      ["mirror"],
                      ["sunset", "interior", "selfie"]),
    ("stabilizer-link", ["sway bar link", "anti roll bar link"],
                      ["link", "sway bar", "stabilizer"],
                      ["ship", "boat"]),
    ("cabin-filter", ["cabin filter pollen", "hvac filter car"],
                      ["cabin", "pollen"],
                      ["computer", "demciflex"]),
    ("drive-belt",   ["serpentine belt", "accessory drive belt"],
                      ["belt"],
                      ["conveyor", "seat belt"]),
    ("ac-condenser", ["automotive condenser cooling", "car condenser radiator"],
                      ["condenser"],
                      ["sponge", "microphone", "chemistry"]),
]

def req_bytes(url):
    r = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(r, timeout=40, context=CTX) as resp:
        return resp.read()

def req_json(url):
    return json.loads(req_bytes(url))

def search(q):
    url = ("https://commons.wikimedia.org/w/api.php?action=query&format=json"
           "&list=search&srnamespace=6&srlimit=20&srsearch=" + urllib.parse.quote(q + " filetype:bitmap"))
    try:
        d = req_json(url)
        return [x["title"] for x in d.get("query", {}).get("search", [])]
    except Exception:
        return []

def imageinfo(title):
    url = ("https://commons.wikimedia.org/w/api.php?action=query&format=json"
           "&prop=imageinfo&iiprop=url|size|mime&titles=" + urllib.parse.quote(title))
    try:
        d = req_json(url)
        for p in d.get("query", {}).get("pages", {}).values():
            return (p.get("imageinfo") or [{}])[0]
    except Exception:
        pass
    return {}

def process(data, out_path):
    img = Image.open(io.BytesIO(data))
    img = ImageOps.exif_transpose(img).convert("RGB")
    img.thumbnail((780, 780), Image.LANCZOS)
    canvas = Image.new("RGB", (800, 800), (255, 255, 255))
    canvas.paste(img, ((800 - img.width) // 2, (800 - img.height) // 2))
    canvas.save(out_path, "JPEG", quality=85, optimize=True)

def ok(title, required, banned):
    tl = title.lower()
    if any(b in tl for b in banned):
        return False
    if required and not any(r in tl for r in required):
        return False
    return True

for pt, queries, req_kw, banned in TARGETS:
    out_path = os.path.join(OUT, f"{pt}.jpg")
    if os.path.exists(out_path):
        continue
    print(f"→ {pt}")
    found = False
    for q in queries:
        if found: break
        for title in search(q):
            if not ok(title, req_kw, banned):
                continue
            info = imageinfo(title)
            url = info.get("url")
            mime = info.get("mime", "")
            sz = info.get("size", 0)
            if not url or mime not in ("image/jpeg", "image/png"):
                continue
            if sz < 3000 or sz > 8 * 1024 * 1024:
                continue
            try:
                data = req_bytes(url)
                process(data, out_path)
                print(f"  OK {title}")
                found = True
                break
            except Exception as e:
                print(f"  fail {title}: {e}")
    if not found:
        print(f"  SKIP {pt} (ProductVisual fallback)")
