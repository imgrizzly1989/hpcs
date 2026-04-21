#!/usr/bin/env python3
"""Second pass: strict fetch with aggressive throttling + tighter title filters."""
import json, os, re, urllib.parse, urllib.request, io, time
from PIL import Image

OUT_DIR = os.path.expanduser("~/hpcs/public/images/products")
UA = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36"
THROTTLE = 2.5

TYPES = {
    "shock-absorber": {
        "queries": [
            ("automotive shock absorber part", [r"shock"], [r"absorb|strut|damper"],
             [r"ducati|bicycle|bike|motorcycle|motorbike|airplane|railway|train|harley|yamaha|kawasaki|honda\s+cb|suzuki\s+gs"]),
            ("macpherson strut", [r"macpherson|strut"], [], [r"motorcycle|bike"]),
        ],
    },
    "stabilizer-link": {
        "queries": [
            ("anti roll bar link car", [r"(anti.?roll|sway|stabili[sz]er)"], [r"link|bar"], [r"bicycle|bike"]),
        ],
    },
    "taillight": {
        "queries": [
            ("LED tail light car", [r"(tail.?light|tail.?lamp|rear.?lamp|rear.?light)"], [r"led|close|led-|led_|halogen|auto|car"],
             [r"road|night|dark|scene|traffic|landscape|parking|mountain|fog|rain|bicycle|motorcycle|train|aircraft|truck|bus"]),
            ("car rear light assembly", [r"(rear|tail).{0,10}(light|lamp)"], [r"assembly|cluster"], [r"motorcycle|bike"]),
        ],
    },
    "clutch-kit": {
        "queries": [
            ("car clutch disc friction", [r"clutch"], [r"disc|plate|friction"], [r"bicycle|hand|gearbox|pedal"]),
            ("clutch pressure plate", [r"pressure\s*plate|clutch\s*kit"], [], []),
        ],
    },
    "starter": {
        "queries": [
            ("car starter motor part", [r"starter.?motor"], [], [r"pull.?cord|rope|button|relay|switch|artillery|pistol|gun|lawnmower"]),
        ],
    },
    "side-mirror": {
        "queries": [
            ("car side mirror detached", [r"(wing|side|door|rear.?view).?mirror"], [r"car|auto|vehicle|bmw|ford|honda|toyota|mazda"],
             [r"reflection|reflects|selfie|scene|inside|interior|view.?from|bicycle|motorcycle"]),
        ],
    },
    "pare-chocs": {
        "queries": [
            ("car front bumper part", [r"bumper"], [r"car|auto|vehicle"],
             [r"sticker|pool|pinball|train|hitch|bus|truck|kid|baby|car.*crash|damaged|broken"]),
        ],
    },
    "calandre": {
        "queries": [
            ("car radiator grille close", [r"(radiator.?grille|front.?grille|grille.*car|car.*grille)"], [],
             [r"bbq|barbecue|cooking|window|fireplace|heating|restaurant|antique|vintage|classic"]),
        ],
    },
    "wiper": {
        "queries": [
            ("windshield wiper blade product", [r"wiper.*blade|wiper.?blade"], [],
             [r"motorcycle|bike|rain|water|snow|ice|frost|bug|insect"]),
            ("new wiper blade", [r"wiper"], [r"blade|new|replacement"], [r"rain|snow"]),
        ],
    },
    "fog-light": {
        "queries": [
            ("car fog lamp part", [r"fog.?(lamp|light)"], [r"car|auto|vehicle|bumper|front|led|halogen"],
             [r"foggy|mist|weather|scene|landscape|morning|trees|forest|field|building|bus|tram|night|road"]),
        ],
    },
    "door-handle": {
        "queries": [
            ("car exterior door handle close", [r"(car|auto|vehicle|bmw|honda|toyota|mazda|ford).*door.?handle|door.?handle.*(car|auto)"], [],
             [r"house|home|building|interior|indoor|room|office|refrigerator|cabinet|knob"]),
        ],
    },
    "ac-condenser": {
        "queries": [
            ("automotive ac condenser", [r"condenser"], [r"air.?conditioning|a/c|automotive|car|auto|vehicle|hvac"],
             [r"steam|tesla|electronic|capacitor|microphone|optical"]),
        ],
    },
    "windshield": {
        "queries": [
            ("car windshield new glass", [r"windshield|windscreen"], [r"glass|new|replacement|installation"],
             [r"broken|damage|crack|shatter|frost|ice|bug|insect|rain|dirty|through"]),
        ],
    },
}

BAD_EXT = re.compile(r"\.(svg|gif|webm|ogv|pdf|tif|tiff)$", re.I)

def http_get(url, binary=False, timeout=30, retries=5):
    last = None
    for i in range(retries):
        try:
            req = urllib.request.Request(url, headers={"User-Agent": UA, "Accept": "*/*"})
            with urllib.request.urlopen(req, timeout=timeout) as r:
                return r.read() if binary else r.read().decode("utf-8", errors="replace")
        except urllib.error.HTTPError as e:
            last = e
            if e.code in (429, 503):
                wait = 5 + i*5
                print(f"    {e.code} wait {wait}s")
                time.sleep(wait); continue
            raise
        except Exception as e:
            last = e; time.sleep(3); continue
    raise last

def commons_search(q, limit=25):
    url = f"https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=search&gsrnamespace=6&gsrsearch={urllib.parse.quote(q)}&gsrlimit={limit}&prop=imageinfo&iiprop=url|size|mime&iiurlwidth=900"
    try:
        j = json.loads(http_get(url))
        pages = j.get("query", {}).get("pages", {})
        items = []
        for p in pages.values():
            info = (p.get("imageinfo") or [{}])[0]
            title = p.get("title","")
            thumb = info.get("thumburl"); mime = info.get("mime","")
            idx = p.get("index", 9999)
            if thumb and mime.startswith("image/"):
                items.append((idx, title, thumb))
        items.sort()
        return items
    except Exception as e:
        print(f"  search err: {e}"); return []

def title_ok(title, must_all, must_any, deny):
    if BAD_EXT.search(title): return False
    if not re.search(r"\.(jpe?g|png)$", title, re.I): return False
    for pat in must_all:
        if not re.search(pat, title, re.I): return False
    if deny:
        for pat in deny:
            if re.search(pat, title, re.I): return False
    if must_any:
        if not any(re.search(p, title, re.I) for p in must_any):
            return False
    return True

def convert_to_square(raw, out_path, size=800):
    try:
        im = Image.open(io.BytesIO(raw)); im.load()
    except Exception as e:
        print(f"  open err: {e}"); return False
    if im.mode in ("RGBA", "LA", "P"):
        bg = Image.new("RGB", im.size, (255,255,255))
        im2 = im.convert("RGBA"); bg.paste(im2, mask=im2.split()[-1]); im = bg
    else:
        im = im.convert("RGB")
    w, h = im.size
    if w < 400 or h < 400: return False
    scale = size / max(w, h)
    nw, nh = int(w*scale), int(h*scale)
    im = im.resize((nw, nh), Image.LANCZOS)
    canvas = Image.new("RGB", (size, size), (255,255,255))
    canvas.paste(im, ((size-nw)//2, (size-nh)//2))
    canvas.save(out_path, "JPEG", quality=88)
    return True

def try_image(url, out_path):
    try:
        data = http_get(url, binary=True)
    except Exception as e:
        print(f"  dl err: {e}"); return False
    if len(data) < 8000: return False
    if data[:15].lstrip().startswith(b"<"): return False
    if not convert_to_square(data, out_path): return False
    if os.path.getsize(out_path) < 8000:
        os.remove(out_path); return False
    return True

def fetch_for(slug, cfg):
    out = os.path.join(OUT_DIR, f"{slug}.jpg")
    if os.path.exists(out):
        print(f"[{slug}] exists, skip"); return "EXISTS"
    print(f"[{slug}]")
    for q, must_all, must_any, deny in cfg["queries"]:
        items = commons_search(q)
        time.sleep(THROTTLE)
        for idx, title, thumb in items[:12]:
            if not title_ok(title, must_all, must_any, deny): continue
            print(f"  try: {title}")
            if try_image(thumb, out):
                return f"OK {title}"
            time.sleep(THROTTLE)
    return "FAIL"

def main():
    results = {}
    for slug, cfg in TYPES.items():
        try: results[slug] = fetch_for(slug, cfg)
        except Exception as e: results[slug] = f"ERR {e}"
        print()
    print("\n=== SUMMARY ===")
    for k, v in results.items():
        print(f"{k:20s} {v}")

if __name__ == "__main__":
    main()
