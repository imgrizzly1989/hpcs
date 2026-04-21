#!/usr/bin/env python3
"""Fetch part photos from Wikimedia Commons via imageinfo (thumbnail URLs)."""
import json, os, re, sys, urllib.parse, urllib.request, io, time
from PIL import Image

OUT_DIR = os.path.expanduser("~/hpcs/public/images/products")
UA = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36"
THROTTLE = 1.2

# must_all regex: all must match title. must_any: at least one. deny: none may match.
TYPES = {
    "brake-disc": {
        "queries": [
            ("car disc brake", [r"brake"], [r"disc", r"disk", r"rotor"], [r"bicycle|bike|mtb|magura|motorbike|motorcycle"]),
            ("car brake rotor new", [r"brake"], [r"rotor", r"disc"], [r"bicycle|bike|mtb|motorbike|motorcycle"]),
        ],
    },
    "ac-condenser": {
        "queries": [
            ("car ac condenser", [r"condenser"], [r"car|auto|vehicle|conditioning|a/c|ac"], [r"steam|tesla coil|electronic|capacitor"]),
        ],
    },
    "shock-absorber": {
        "queries": [
            ("car shock absorber", [r"shock"], [r"absorb|strut|damper"], [r"bicycle|bike|motorcycle|motorbike|airplane|railway|train"]),
            ("coilover suspension car", [r"coilover"], [], [r"motorcycle|bike"]),
        ],
    },
    "stabilizer-link": {
        "queries": [
            ("sway bar end link", [r"(sway|stabili[sz]er|anti.?roll)"], [r"link|end.?link"], [r"bicycle|bike"]),
        ],
    },
    "headlight": {
        "queries": [
            ("car headlamp assembly", [r"headla"], [r"car|auto|vehicle|assembly"], [r"motorcycle|motorbike|bike|train|locomotive|aircraft|bicycle|tractor"]),
            ("automotive headlight xenon", [r"headli"], [r"car|auto|vehicle|xenon|led|halogen"], [r"motorcycle|motorbike|bicycle|train|aircraft"]),
        ],
    },
    "taillight": {
        "queries": [
            ("car tail light", [r"tail"], [r"light|lamp"], [r"motorcycle|bike|locomotive|train|aircraft|bicycle|truck|bus"]),
            ("automobile rear lamp", [r"rear"], [r"light|lamp"], [r"motorcycle|bike|train|aircraft|bicycle"]),
        ],
    },
    "clutch-kit": {
        "queries": [
            ("automotive clutch disc", [r"clutch"], [r"disc|plate|friction|kit"], [r"bicycle|gearbox only|shaft only"]),
        ],
    },
    "starter": {
        "queries": [
            ("car starter motor", [r"starter"], [r"motor"], [r"cable|button|relay|switch|artillery|pistol|gun"]),
        ],
    },
    "side-mirror": {
        "queries": [
            ("car wing mirror", [r"(wing|side|door).?mirror"], [], [r"bicycle|motorcycle"]),
        ],
    },
    "pare-chocs": {
        "queries": [
            ("car bumper front", [r"bumper"], [r"car|auto|vehicle|front|rear"], [r"sticker|pool|pinball|truck only|bus only|train|hitch"]),
        ],
    },
    "calandre": {
        "queries": [
            ("car front grille", [r"grille|grill"], [r"car|auto|front|radiator"], [r"bbq|barbecue|cooking|window|fireplace|heating|restaurant"]),
        ],
    },
    "hayon": {
        "queries": [
            ("car tailgate open", [r"tailgate|liftgate|hatchback"], [], [r"party|truck only|pickup.*tailgate"]),
        ],
    },
    "wiper": {
        "queries": [
            ("windshield wiper blade new", [r"wiper"], [r"blade"], [r"motorcycle|bike"]),
        ],
    },
    "windshield": {
        "queries": [
            ("car windshield glass", [r"windshield|windscreen"], [r"glass|car|auto|vehicle"], [r"broken|damage|crack|shatter|frost|ice|bug|insect|rain"]),
        ],
    },
    "fog-light": {
        "queries": [
            ("car fog lamp", [r"fog"], [r"lamp|light"], [r"foggy|mist|weather|scene|landscape|morning|trees|forest|field|building|bus|tram"]),
        ],
    },
    "door-handle": {
        "queries": [
            ("car exterior door handle", [r"door\s*handle"], [r"car|auto|vehicle|mazda|honda|ford|bmw|toyota"], [r"house|home|building|interior|indoor|room"]),
        ],
    },
    "cabin-filter": {  # already ok but keep for rerun if missing
        "queries": [
            ("cabin air filter car", [r"cabin"], [r"filter"], []),
        ],
    },
    "radiator": {
        "queries": [
            ("automobile radiator", [r"radiator"], [r"car|auto|vehicle|engine|coolant|cooling|automobile"], [r"heating|steam|house|home|room|apartment|old|antique|boiler|tesla"]),
        ],
    },
}

BAD_WORDS = re.compile(r"(\.svg$|\.gif$|\.webm$|\.ogv$|\.pdf$|\.tif$|\.tiff$|diagram|schematic|chart|icon$|pictogram|logo$)", re.I)

def http_get(url, binary=False, timeout=25, retries=3):
    last = None
    for i in range(retries):
        try:
            req = urllib.request.Request(url, headers={
                "User-Agent": UA,
                "Accept": "*/*",
                "Accept-Language": "en-US,en;q=0.9",
            })
            with urllib.request.urlopen(req, timeout=timeout) as r:
                return r.read() if binary else r.read().decode("utf-8", errors="replace")
        except urllib.error.HTTPError as e:
            last = e
            if e.code == 429:
                time.sleep(3 + i*3)
                continue
            raise
        except Exception as e:
            last = e; time.sleep(2); continue
    raise last

def commons_search(q, limit=20):
    url = f"https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=search&gsrnamespace=6&gsrsearch={urllib.parse.quote(q)}&gsrlimit={limit}&prop=imageinfo&iiprop=url|size|mime&iiurlwidth=900"
    try:
        j = json.loads(http_get(url))
        pages = j.get("query", {}).get("pages", {})
        # preserve search order via 'index'
        items = []
        for p in pages.values():
            info = (p.get("imageinfo") or [{}])[0]
            title = p.get("title","")
            thumb = info.get("thumburl")
            mime = info.get("mime","")
            idx = p.get("index", 9999)
            if thumb and mime.startswith("image/"):
                items.append((idx, title, thumb))
        items.sort()
        return items
    except Exception as e:
        print(f"  search err: {e}"); return []

def title_ok(title, must_all, must_any, deny):
    if BAD_WORDS.search(title): return False
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
        bg = Image.new("RGB", im.size, (255, 255, 255))
        im2 = im.convert("RGBA")
        bg.paste(im2, mask=im2.split()[-1])
        im = bg
    else:
        im = im.convert("RGB")
    w, h = im.size
    if w < 400 or h < 400: return False
    scale = size / max(w, h)
    nw, nh = int(w*scale), int(h*scale)
    im = im.resize((nw, nh), Image.LANCZOS)
    canvas = Image.new("RGB", (size, size), (255, 255, 255))
    canvas.paste(im, ((size-nw)//2, (size-nh)//2))
    canvas.save(out_path, "JPEG", quality=88)
    return True

def try_image_url(url, out_path):
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
        print(f"[{slug}] already exists, skip"); return "EXISTS"
    print(f"[{slug}] fetching ...")
    for q, must_all, must_any, deny in cfg["queries"]:
        items = commons_search(q)
        time.sleep(THROTTLE)
        for idx, title, thumb in items:
            if not title_ok(title, must_all, must_any, deny): continue
            print(f"  try: {title}")
            if try_image_url(thumb, out):
                return f"OK {title}"
            time.sleep(THROTTLE)
    return "FAIL"

def main():
    os.makedirs(OUT_DIR, exist_ok=True)
    results = {}
    for slug, cfg in TYPES.items():
        try:
            results[slug] = fetch_for(slug, cfg)
        except Exception as e:
            results[slug] = f"ERR {e}"
        print()
    print("\n=== SUMMARY ===")
    for k, v in results.items():
        print(f"{k:20s} {v}")

if __name__ == "__main__":
    main()
