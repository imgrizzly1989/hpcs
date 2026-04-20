#!/usr/bin/env python3
import urllib.request, urllib.parse, ssl, os, json
UA = "HPCSBot/1.0 (contact@hpcs.ma)"
CTX = ssl.create_default_context()

def req_bytes(url):
    r = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(r, timeout=30, context=CTX) as resp:
        return resp.read()

def req_json(url):
    return json.loads(req_bytes(url))

# Try specific title first
candidates = [
    "File:Changan Automobile logo.svg",
    "File:Changan logo.png",
    "File:Logo Changan.svg",
]
title = None
for c in candidates:
    data = req_json(f"https://commons.wikimedia.org/w/api.php?action=query&format=json&prop=imageinfo&iiprop=url|size|mime&titles=" + urllib.parse.quote(c))
    pages = data.get("query", {}).get("pages", {})
    for pid, p in pages.items():
        if pid != "-1" and p.get("imageinfo"):
            title = c
            url = p["imageinfo"][0]["url"]
            print(f"Found: {c} → {url}")
            data_bytes = req_bytes(url)
            out = os.path.join(os.path.dirname(__file__), "..", "public", "images", "brands", "changan.png" if c.endswith(".png") else "changan.svg")
            with open(out, "wb") as f:
                f.write(data_bytes)
            print(f"Saved {out} ({len(data_bytes)} bytes)")
            raise SystemExit(0)

# Fallback: search
q = urllib.parse.quote("Changan logo")
data = req_json(f"https://commons.wikimedia.org/w/api.php?action=query&format=json&list=search&srnamespace=6&srlimit=20&srsearch={q}")
for s in data["query"]["search"]:
    t = s["title"]
    tl = t.lower()
    if "logo" in tl and "changan" in tl and "mazda" not in tl and "ford" not in tl and "suzuki" not in tl:
        print("candidate:", t)
        info = req_json(f"https://commons.wikimedia.org/w/api.php?action=query&format=json&prop=imageinfo&iiprop=url|size|mime&titles=" + urllib.parse.quote(t))
        for pid, p in info["query"]["pages"].items():
            if p.get("imageinfo"):
                url = p["imageinfo"][0]["url"]
                mime = p["imageinfo"][0]["mime"]
                ext = "png" if "png" in mime else ("svg" if "svg" in mime else "jpg")
                print("url:", url)
                data_bytes = req_bytes(url)
                out = os.path.join(os.path.dirname(__file__), "..", "public", "images", "brands", f"changan.{ext}")
                with open(out, "wb") as f:
                    f.write(data_bytes)
                print(f"Saved {out} ({len(data_bytes)} bytes)")
                raise SystemExit(0)
print("FAILED")
