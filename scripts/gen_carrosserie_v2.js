// Phase 2: extends carrosserie to 8 new brands / 24 new models.
// Continues ID sequence at p-577 and ref counters from end of phase 1.
// Usage: node scripts/gen_carrosserie_v2.js > /tmp/carrosserie_v2_block.ts

const MODELS = [
  // BYD
  ["byd", "atto-3", 2022, 2024, ["Électrique"], "BYD Atto 3"],
  ["byd", "seal-u", 2023, 2024, ["Électrique", "Hybride"], "BYD Seal U"],
  ["byd", "song-plus", 2020, 2024, ["1.5T", "Hybride"], "BYD Song Plus"],
  // Dongfeng
  ["dongfeng", "ax7", 2019, 2024, ["1.6T", "2.0T"], "Dongfeng AX7"],
  ["dongfeng", "mage", 2022, 2024, ["1.5T", "2.0T"], "Dongfeng Mage"],
  ["dongfeng", "shine", 2023, 2024, ["1.5T"], "Dongfeng Shine"],
  // DFSK
  ["dfsk", "glory-500", 2018, 2023, ["1.5T"], "DFSK Glory 500"],
  ["dfsk", "glory-580", 2017, 2023, ["1.5T", "1.8L"], "DFSK Glory 580"],
  ["dfsk", "k01", 2019, 2024, ["1.2L"], "DFSK K01"],
  // FAW
  ["faw", "bestune-t33", 2019, 2023, ["1.6L"], "FAW Bestune T33"],
  ["faw", "bestune-t77", 2018, 2024, ["1.2T", "1.5T"], "FAW Bestune T77"],
  ["faw", "bestune-t99", 2020, 2024, ["2.0T"], "FAW Bestune T99"],
  // Jetour
  ["jetour", "x70", 2019, 2024, ["1.5T", "2.0T"], "Jetour X70"],
  ["jetour", "x70-plus", 2021, 2024, ["1.5T", "1.6T"], "Jetour X70 Plus"],
  ["jetour", "dashing", 2022, 2024, ["1.5T", "1.6T"], "Jetour Dashing"],
  // BAIC
  ["baic", "x35", 2018, 2023, ["1.5L"], "BAIC X35"],
  ["baic", "x55", 2020, 2024, ["1.5T"], "BAIC X55"],
  ["baic", "x25", 2017, 2022, ["1.5L"], "BAIC X25"],
  // JAC
  ["jac", "js3", 2020, 2024, ["1.5L", "1.5T"], "JAC JS3"],
  ["jac", "js4", 2019, 2024, ["1.5L", "1.5T"], "JAC JS4"],
  ["jac", "js6", 2022, 2024, ["1.5T"], "JAC JS6"],
  ["jac", "j7", 2019, 2024, ["1.5T"], "JAC J7"],
  // Great Wall
  ["great-wall", "wingle", 2014, 2024, ["2.0L Diesel", "2.4L"], "Great Wall Wingle"],
  ["great-wall", "poer", 2019, 2024, ["2.0T Diesel", "2.0T"], "Great Wall Poer"],
  ["great-wall", "steed", 2014, 2022, ["2.4L", "2.0L Diesel"], "Great Wall Steed"],
];

const PARTS = [
  { k: "bumper-front", slugBase: "pare-chocs-avant", name: "Pare-chocs avant", sub: "pare-chocs", code: "PC", position: "Avant", cote: "", warranty: "6 mois" },
  { k: "bumper-rear", slugBase: "pare-chocs-arriere", name: "Pare-chocs arrière", sub: "pare-chocs", code: "PC", position: "Arrière", cote: "", warranty: "6 mois" },
  { k: "spoiler-front", slugBase: "spoiler-avant", name: "Spoiler avant", sub: "pare-chocs", code: "PC", position: "Avant", cote: "", warranty: "6 mois" },
  { k: "spoiler-rear", slugBase: "becquet-arriere", name: "Becquet arrière", sub: "pare-chocs", code: "PC", position: "Arrière", cote: "", warranty: "6 mois" },
  { k: "bumper-molding", slugBase: "baguette-pare-chocs", name: "Baguette de pare-chocs", sub: "pare-chocs", code: "PC", position: "", cote: "", warranty: "6 mois" },
  { k: "rocker-left", slugBase: "bas-caisse-gauche", name: "Bas de caisse gauche", sub: "pare-chocs", code: "PC", position: "Latéral", cote: "Gauche", warranty: "6 mois" },
  { k: "rocker-right", slugBase: "bas-caisse-droit", name: "Bas de caisse droit", sub: "pare-chocs", code: "PC", position: "Latéral", cote: "Droit", warranty: "6 mois" },
  { k: "side-skirt", slugBase: "deflecteur-jupe-laterale", name: "Déflecteur d'air (jupe latérale)", sub: "pare-chocs", code: "PC", position: "Latéral", cote: "", warranty: "6 mois" },

  { k: "headlight-left", slugBase: "phare-avant-gauche", name: "Phare avant gauche", sub: "phares-feux", code: "PH", position: "Avant", cote: "Gauche", warranty: "6 mois" },
  { k: "headlight-right", slugBase: "phare-avant-droit", name: "Phare avant droit", sub: "phares-feux", code: "PH", position: "Avant", cote: "Droit", warranty: "6 mois" },
  { k: "taillight-left", slugBase: "feu-arriere-gauche", name: "Feu arrière gauche", sub: "phares-feux", code: "PH", position: "Arrière", cote: "Gauche", warranty: "6 mois" },
  { k: "taillight-right", slugBase: "feu-arriere-droit", name: "Feu arrière droit", sub: "phares-feux", code: "PH", position: "Arrière", cote: "Droit", warranty: "6 mois" },
  { k: "fog-left", slugBase: "antibrouillard-avant-gauche", name: "Feu antibrouillard avant gauche", sub: "phares-feux", code: "PH", position: "Avant", cote: "Gauche", warranty: "6 mois" },
  { k: "fog-right", slugBase: "antibrouillard-avant-droit", name: "Feu antibrouillard avant droit", sub: "phares-feux", code: "PH", position: "Avant", cote: "Droit", warranty: "6 mois" },
  { k: "fog-rear", slugBase: "antibrouillard-arriere", name: "Feu antibrouillard arrière", sub: "phares-feux", code: "PH", position: "Arrière", cote: "", warranty: "6 mois" },
  { k: "fog-cover", slugBase: "cache-antibrouillard", name: "Cache antibrouillard", sub: "phares-feux", code: "PH", position: "Avant", cote: "", warranty: "6 mois" },

  { k: "mirror-left", slugBase: "retroviseur-exterieur-gauche", name: "Rétroviseur extérieur gauche (électrique)", sub: "retroviseurs", code: "RT", position: "Latéral", cote: "Gauche", warranty: "6 mois" },
  { k: "mirror-right", slugBase: "retroviseur-exterieur-droit", name: "Rétroviseur extérieur droit (électrique)", sub: "retroviseurs", code: "RT", position: "Latéral", cote: "Droit", warranty: "6 mois" },
  { k: "mirror-shell-left", slugBase: "coque-retroviseur-gauche", name: "Coque de rétroviseur gauche", sub: "retroviseurs", code: "RT", position: "Latéral", cote: "Gauche", warranty: "6 mois" },
  { k: "mirror-shell-right", slugBase: "coque-retroviseur-droit", name: "Coque de rétroviseur droit", sub: "retroviseurs", code: "RT", position: "Latéral", cote: "Droit", warranty: "6 mois" },

  { k: "grille", slugBase: "calandre-avant", name: "Calandre avant", sub: "calandre", code: "CL", position: "Avant", cote: "", warranty: "6 mois" },
  { k: "grille-frame", slugBase: "cadre-calandre", name: "Cadre de calandre / grille", sub: "calandre", code: "CL", position: "Avant", cote: "", warranty: "6 mois" },

  { k: "hood", slugBase: "capot-moteur", name: "Capot moteur", sub: "tolerie", code: "TL", position: "Avant", cote: "", warranty: "6 mois" },
  { k: "fender-fl", slugBase: "aile-avant-gauche", name: "Aile avant gauche", sub: "tolerie", code: "TL", position: "Avant", cote: "Gauche", warranty: "6 mois" },
  { k: "fender-fr", slugBase: "aile-avant-droite", name: "Aile avant droite", sub: "tolerie", code: "TL", position: "Avant", cote: "Droit", warranty: "6 mois" },
  { k: "door-fl", slugBase: "porte-avant-gauche", name: "Porte avant gauche", sub: "tolerie", code: "TL", position: "Avant", cote: "Gauche", warranty: "6 mois" },
  { k: "door-fr", slugBase: "porte-avant-droite", name: "Porte avant droite", sub: "tolerie", code: "TL", position: "Avant", cote: "Droit", warranty: "6 mois" },
  { k: "door-rl", slugBase: "porte-arriere-gauche", name: "Porte arrière gauche", sub: "tolerie", code: "TL", position: "Arrière", cote: "Gauche", warranty: "6 mois" },
  { k: "door-rr", slugBase: "porte-arriere-droite", name: "Porte arrière droite", sub: "tolerie", code: "TL", position: "Arrière", cote: "Droit", warranty: "6 mois" },
  { k: "door-handle", slugBase: "poignee-porte-exterieure", name: "Poignée de porte extérieure", sub: "tolerie", code: "TL", position: "", cote: "", warranty: "6 mois" },
  { k: "tailgate", slugBase: "hayon-arriere", name: "Hayon arrière", sub: "tolerie", code: "TL", position: "Arrière", cote: "", warranty: "6 mois" },

  { k: "door-molding", slugBase: "moulure-porte-laterale", name: "Moulure de porte latérale", sub: "garnitures", code: "GR", position: "Latéral", cote: "", warranty: "6 mois" },
  { k: "fender-trim", slugBase: "garniture-aile", name: "Garniture d'aile", sub: "garnitures", code: "GR", position: "Latéral", cote: "", warranty: "6 mois" },

  { k: "wiper-front-set", slugBase: "essuie-glace-avant-jeu", name: "Essuie-glaces avant (jeu de 2)", sub: "essuie-glaces", code: "EG", position: "Avant", cote: "", warranty: "6 mois" },
  { k: "wiper-rear", slugBase: "essuie-glace-arriere", name: "Essuie-glace arrière", sub: "essuie-glaces", code: "EG", position: "Arrière", cote: "", warranty: "6 mois" },
  { k: "wiper-blade", slugBase: "balai-essuie-glace", name: "Balai d'essuie-glace", sub: "essuie-glaces", code: "EG", position: "", cote: "", warranty: "6 mois" },
  { k: "windshield", slugBase: "pare-brise-avant", name: "Pare-brise avant", sub: "essuie-glaces", code: "EG", position: "Avant", cote: "", warranty: "6 mois" },
  { k: "side-glass-l", slugBase: "vitre-laterale-conducteur", name: "Vitre latérale conducteur", sub: "essuie-glaces", code: "EG", position: "Latéral", cote: "Gauche", warranty: "6 mois" },
  { k: "side-glass-r", slugBase: "vitre-laterale-passager", name: "Vitre latérale passager", sub: "essuie-glaces", code: "EG", position: "Latéral", cote: "Droit", warranty: "6 mois" },
  { k: "rear-window", slugBase: "lunette-arriere", name: "Lunette arrière", sub: "essuie-glaces", code: "EG", position: "Arrière", cote: "", warranty: "6 mois" },
  { k: "windshield-seal", slugBase: "joint-pare-brise", name: "Joint de pare-brise", sub: "essuie-glaces", code: "EG", position: "Avant", cote: "", warranty: "6 mois" },
  { k: "door-seal", slugBase: "joint-porte", name: "Joint de porte", sub: "essuie-glaces", code: "EG", position: "", cote: "", warranty: "6 mois" },
];

const BRAND_NAMES = {
  byd: "BYD", dongfeng: "Dongfeng", dfsk: "DFSK", faw: "FAW",
  jetour: "Jetour", baic: "BAIC", jac: "JAC", "great-wall": "Great Wall",
};

function pad(n, w) { return n.toString().padStart(w, "0"); }
function rseed(seed) { const x = Math.sin(seed) * 10000; return x - Math.floor(x); }
function randInt(min, max, seed) { return Math.floor(min + rseed(seed) * (max - min + 1)); }
function esc(s) { return s.replace(/\\/g, "\\\\").replace(/"/g, '\\"'); }

function fmtProduct(p) {
  const compat = p.compatibleVehicles.map((c) =>
    `{ brandSlug: "${c.brandSlug}", modelSlug: "${c.modelSlug}", years: [${c.years[0]}, ${c.years[1]}], engines: [${c.engines.map(e => `"${esc(e)}"`).join(", ")}] }`
  ).join(", ");
  const specs = Object.entries(p.specs).map(([k, v]) => `    ${JSON.stringify(k)}: "${esc(v)}"`).join(",\n");
  return `  {
    id: "${p.id}", slug: "${p.slug}", name: "${esc(p.name)}",
    reference: "${p.reference}", category: "${p.category}", subcategory: "${p.subcategory}",${p.position ? ` position: "${esc(p.position)}",` : ""}
    compatibleVehicles: [${compat}],
    price: 0, stock: ${p.stock},
    description: "${esc(p.description)}",
    specs: {
${specs}
    },
  }`;
}

// Counters continue from phase 1 (9 models × PARTS1 counts).
// Phase 1 PARTS counts: PC=8, PH=8, RT=4, CL=2, TL=8, GR=1, EG=9.
let counter = 577;
const refCounters = { PC: 72, PH: 72, RT: 36, CL: 18, TL: 72, GR: 9, EG: 81 };
const out = [];
const seenSlugs = new Set();

let byBrand = {};

for (const [brandSlug, modelSlug, yStart, yEnd, engines, humanName] of MODELS) {
  const brandOut = [];
  for (const P of PARTS) {
    refCounters[P.code] += 1;
    const refNum = pad(refCounters[P.code], 3);
    const reference = `HPCS-CR${P.code}-${refNum}`;
    const id = `p-${pad(counter, 3)}`;
    counter++;
    const slug = `${P.slugBase}-${brandSlug}-${modelSlug}`;
    if (seenSlugs.has(slug)) throw new Error("dup slug " + slug);
    seenSlugs.add(slug);

    const name = `${P.name} ${humanName}`;
    const yearsStr = `${yStart}-${yEnd}`;
    const engineStr = engines.length ? ` (${engines.join(" / ")})` : "";
    const posLabel = [P.position, P.cote].filter(Boolean).join(" ");

    const desc = [
      `${P.name}${posLabel ? ` (${posLabel})` : ""} compatible ${humanName} ${yearsStr}${engineStr}.`,
      `Pièce de carrosserie équivalent OEM — pose recommandée en atelier, compatibilité à vérifier avec votre VIN avant commande.`,
    ].join(" ");

    const stockSeed = counter * 31 + P.code.charCodeAt(0);
    const onOrder = rseed(stockSeed) < 0.35;
    const stock = onOrder ? 0 : randInt(2, 25, stockSeed);

    const specs = {
      "Référence OEM": reference,
      "Position": posLabel || "—",
      "Côté": P.cote || "—",
      "Marque compatible": BRAND_NAMES[brandSlug],
      "Modèle": humanName,
      "Années": yearsStr,
      "Garantie": P.warranty,
      "Origine": "Chine / OEM équivalent",
    };

    brandOut.push({
      id, slug, name, reference,
      category: "carrosserie",
      subcategory: P.sub,
      position: posLabel || undefined,
      compatibleVehicles: [{ brandSlug, modelSlug, years: [yStart, yEnd], engines }],
      price: 0, stock,
      description: desc,
      specs,
    });
  }
  (byBrand[brandSlug] ||= []).push({ humanName, items: brandOut });
  out.push(...brandOut);
}

process.stderr.write(`Generated ${out.length} carrosserie products (phase 2)\n`);

// Emit grouped by brand with header comments.
const chunks = [];
chunks.push("  // === CARROSSERIE phase 2 — 8 new brands ===");
for (const [brandSlug, groups] of Object.entries(byBrand)) {
  chunks.push(`  // === ${BRAND_NAMES[brandSlug].toUpperCase()} ===`);
  for (const g of groups) {
    chunks.push(`  // --- ${g.humanName} ---`);
    chunks.push(g.items.map(fmtProduct).join(",\n") + ",");
  }
}
process.stdout.write(chunks.join("\n") + "\n");
