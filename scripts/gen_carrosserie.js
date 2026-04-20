// Generates body-part products and appends to src/data/products.ts.
// Usage:
//   node scripts/gen_carrosserie.js > /tmp/carrosserie_block.ts
// Then paste the output before the final "];" of products array.
//
// Deterministic IDs: starts at p-217.
const MODELS = [
  ["mg", "zs", 2017, 2024, ["1.5L", "1.0T"], "MG ZS"],
  ["chery", "tiggo-4-pro", 2020, 2024, ["1.5L", "1.5T"], "Chery Tiggo 4 Pro"],
  ["chery", "tiggo-7-pro", 2020, 2024, ["1.5T"], "Chery Tiggo 7 Pro"],
  ["geely", "coolray", 2019, 2024, ["1.5T"], "Geely Coolray"],
  ["geely", "gx3-pro", 2021, 2024, ["1.5L"], "Geely GX3 Pro"],
  ["haval", "h6", 2017, 2024, ["1.5T", "2.0T"], "Haval H6"],
  ["haval", "jolion", 2021, 2024, ["1.5T"], "Haval Jolion"],
  ["changan", "cs55", 2018, 2024, ["1.5T"], "Changan CS55"],
  ["mg", "hs", 2018, 2024, ["1.5T", "2.0T"], "MG HS"],
];

// Parts catalog: sub slug codes
//  PC pare-chocs, PH phares-feux, RT retroviseurs, CL calandre,
//  TL tolerie, GR garnitures, EG essuie-glaces
const PARTS = [
  // PARE-CHOCS
  { k: "bumper-front", slugBase: "pare-chocs-avant", name: "Pare-chocs avant", sub: "pare-chocs", code: "PC", position: "Avant", cote: "", weight: "8.5 kg", warranty: "6 mois" },
  { k: "bumper-rear", slugBase: "pare-chocs-arriere", name: "Pare-chocs arrière", sub: "pare-chocs", code: "PC", position: "Arrière", cote: "", weight: "7.9 kg", warranty: "6 mois" },
  { k: "spoiler-front", slugBase: "spoiler-avant", name: "Spoiler avant", sub: "pare-chocs", code: "PC", position: "Avant", cote: "", weight: "1.8 kg", warranty: "6 mois" },
  { k: "spoiler-rear", slugBase: "becquet-arriere", name: "Becquet arrière", sub: "pare-chocs", code: "PC", position: "Arrière", cote: "", weight: "1.2 kg", warranty: "6 mois" },
  { k: "bumper-molding", slugBase: "baguette-pare-chocs", name: "Baguette de pare-chocs", sub: "pare-chocs", code: "PC", position: "", cote: "", weight: "0.6 kg", warranty: "6 mois" },
  { k: "rocker-left", slugBase: "bas-caisse-gauche", name: "Bas de caisse gauche", sub: "pare-chocs", code: "PC", position: "Latéral", cote: "Gauche", weight: "2.4 kg", warranty: "6 mois" },
  { k: "rocker-right", slugBase: "bas-caisse-droit", name: "Bas de caisse droit", sub: "pare-chocs", code: "PC", position: "Latéral", cote: "Droit", weight: "2.4 kg", warranty: "6 mois" },
  { k: "side-skirt", slugBase: "deflecteur-jupe-laterale", name: "Déflecteur d'air (jupe latérale)", sub: "pare-chocs", code: "PC", position: "Latéral", cote: "", weight: "1.6 kg", warranty: "6 mois" },

  // PHARES-FEUX
  { k: "headlight-left", slugBase: "phare-avant-gauche", name: "Phare avant gauche", sub: "phares-feux", code: "PH", position: "Avant", cote: "Gauche", weight: "3.4 kg", warranty: "6 mois" },
  { k: "headlight-right", slugBase: "phare-avant-droit", name: "Phare avant droit", sub: "phares-feux", code: "PH", position: "Avant", cote: "Droit", weight: "3.4 kg", warranty: "6 mois" },
  { k: "taillight-left", slugBase: "feu-arriere-gauche", name: "Feu arrière gauche", sub: "phares-feux", code: "PH", position: "Arrière", cote: "Gauche", weight: "1.6 kg", warranty: "6 mois" },
  { k: "taillight-right", slugBase: "feu-arriere-droit", name: "Feu arrière droit", sub: "phares-feux", code: "PH", position: "Arrière", cote: "Droit", weight: "1.6 kg", warranty: "6 mois" },
  { k: "fog-left", slugBase: "antibrouillard-avant-gauche", name: "Feu antibrouillard avant gauche", sub: "phares-feux", code: "PH", position: "Avant", cote: "Gauche", weight: "0.5 kg", warranty: "6 mois" },
  { k: "fog-right", slugBase: "antibrouillard-avant-droit", name: "Feu antibrouillard avant droit", sub: "phares-feux", code: "PH", position: "Avant", cote: "Droit", weight: "0.5 kg", warranty: "6 mois" },
  { k: "fog-rear", slugBase: "antibrouillard-arriere", name: "Feu antibrouillard arrière", sub: "phares-feux", code: "PH", position: "Arrière", cote: "", weight: "0.4 kg", warranty: "6 mois" },
  { k: "fog-cover", slugBase: "cache-antibrouillard", name: "Cache antibrouillard", sub: "phares-feux", code: "PH", position: "Avant", cote: "", weight: "0.2 kg", warranty: "6 mois" },

  // RETROVISEURS
  { k: "mirror-left", slugBase: "retroviseur-exterieur-gauche", name: "Rétroviseur extérieur gauche (électrique)", sub: "retroviseurs", code: "RT", position: "Latéral", cote: "Gauche", weight: "1.4 kg", warranty: "6 mois" },
  { k: "mirror-right", slugBase: "retroviseur-exterieur-droit", name: "Rétroviseur extérieur droit (électrique)", sub: "retroviseurs", code: "RT", position: "Latéral", cote: "Droit", weight: "1.4 kg", warranty: "6 mois" },
  { k: "mirror-shell-left", slugBase: "coque-retroviseur-gauche", name: "Coque de rétroviseur gauche", sub: "retroviseurs", code: "RT", position: "Latéral", cote: "Gauche", weight: "0.3 kg", warranty: "6 mois" },
  { k: "mirror-shell-right", slugBase: "coque-retroviseur-droit", name: "Coque de rétroviseur droit", sub: "retroviseurs", code: "RT", position: "Latéral", cote: "Droit", weight: "0.3 kg", warranty: "6 mois" },

  // CALANDRE
  { k: "grille", slugBase: "calandre-avant", name: "Calandre avant", sub: "calandre", code: "CL", position: "Avant", cote: "", weight: "2.1 kg", warranty: "6 mois" },
  { k: "grille-frame", slugBase: "cadre-calandre", name: "Cadre de calandre / grille", sub: "calandre", code: "CL", position: "Avant", cote: "", weight: "1.3 kg", warranty: "6 mois" },

  // TOLERIE
  { k: "hood", slugBase: "capot-moteur", name: "Capot moteur", sub: "tolerie", code: "TL", position: "Avant", cote: "", weight: "14.0 kg", warranty: "6 mois" },
  { k: "fender-fl", slugBase: "aile-avant-gauche", name: "Aile avant gauche", sub: "tolerie", code: "TL", position: "Avant", cote: "Gauche", weight: "4.2 kg", warranty: "6 mois" },
  { k: "fender-fr", slugBase: "aile-avant-droite", name: "Aile avant droite", sub: "tolerie", code: "TL", position: "Avant", cote: "Droit", weight: "4.2 kg", warranty: "6 mois" },
  { k: "door-fl", slugBase: "porte-avant-gauche", name: "Porte avant gauche", sub: "tolerie", code: "TL", position: "Avant", cote: "Gauche", weight: "18.0 kg", warranty: "6 mois" },
  { k: "door-fr", slugBase: "porte-avant-droite", name: "Porte avant droite", sub: "tolerie", code: "TL", position: "Avant", cote: "Droit", weight: "18.0 kg", warranty: "6 mois" },
  { k: "door-rl", slugBase: "porte-arriere-gauche", name: "Porte arrière gauche", sub: "tolerie", code: "TL", position: "Arrière", cote: "Gauche", weight: "16.0 kg", warranty: "6 mois" },
  { k: "door-rr", slugBase: "porte-arriere-droite", name: "Porte arrière droite", sub: "tolerie", code: "TL", position: "Arrière", cote: "Droit", weight: "16.0 kg", warranty: "6 mois" },
  { k: "door-handle", slugBase: "poignee-porte-exterieure", name: "Poignée de porte extérieure", sub: "tolerie", code: "TL", position: "", cote: "", weight: "0.3 kg", warranty: "6 mois" },

  // GARNITURES
  { k: "door-molding", slugBase: "moulure-porte-laterale", name: "Moulure de porte latérale", sub: "garnitures", code: "GR", position: "Latéral", cote: "", weight: "0.8 kg", warranty: "6 mois" },

  // ESSUIE-GLACES / VITRAGES
  { k: "wiper-front-set", slugBase: "essuie-glace-avant-jeu", name: "Essuie-glaces avant (jeu de 2)", sub: "essuie-glaces", code: "EG", position: "Avant", cote: "", weight: "0.5 kg", warranty: "6 mois" },
  { k: "wiper-rear", slugBase: "essuie-glace-arriere", name: "Essuie-glace arrière", sub: "essuie-glaces", code: "EG", position: "Arrière", cote: "", weight: "0.2 kg", warranty: "6 mois" },
  { k: "wiper-blade", slugBase: "balai-essuie-glace", name: "Balai d'essuie-glace", sub: "essuie-glaces", code: "EG", position: "", cote: "", weight: "0.2 kg", warranty: "6 mois" },
  { k: "windshield", slugBase: "pare-brise-avant", name: "Pare-brise avant", sub: "essuie-glaces", code: "EG", position: "Avant", cote: "", weight: "17.0 kg", warranty: "6 mois" },
  { k: "side-glass-l", slugBase: "vitre-laterale-conducteur", name: "Vitre latérale conducteur", sub: "essuie-glaces", code: "EG", position: "Latéral", cote: "Gauche", weight: "3.0 kg", warranty: "6 mois" },
  { k: "side-glass-r", slugBase: "vitre-laterale-passager", name: "Vitre latérale passager", sub: "essuie-glaces", code: "EG", position: "Latéral", cote: "Droit", weight: "3.0 kg", warranty: "6 mois" },
  { k: "rear-window", slugBase: "lunette-arriere", name: "Lunette arrière", sub: "essuie-glaces", code: "EG", position: "Arrière", cote: "", weight: "8.0 kg", warranty: "6 mois" },
  { k: "windshield-seal", slugBase: "joint-pare-brise", name: "Joint de pare-brise", sub: "essuie-glaces", code: "EG", position: "Avant", cote: "", weight: "0.4 kg", warranty: "6 mois" },
  { k: "door-seal", slugBase: "joint-porte", name: "Joint de porte", sub: "essuie-glaces", code: "EG", position: "", cote: "", weight: "0.3 kg", warranty: "6 mois" },
];

const BRAND_NAMES = {
  mg: "MG", chery: "Chery", geely: "Geely", haval: "Haval", changan: "Changan",
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

let counter = 217;
const refCounters = { PC: 0, PH: 0, RT: 0, CL: 0, TL: 0, GR: 0, EG: 0 };
const out = [];
const seenSlugs = new Set();

for (const [brandSlug, modelSlug, yStart, yEnd, engines, humanName] of MODELS) {
  for (const P of PARTS) {
    refCounters[P.code] += 1;
    const refNum = pad(refCounters[P.code], 3);
    const reference = `HPCS-CR${P.code}-${refNum}`;
    const id = `p-${pad(counter, 3)}`;
    counter++;
    const slug = `${P.slugBase}-${modelSlug}`;
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

    // Sur commande: ~35% of items
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

    out.push({
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
}

process.stderr.write(`Generated ${out.length} carrosserie products\n`);
process.stdout.write("  // === CARROSSERIE (body parts) ===\n");
process.stdout.write(out.map(fmtProduct).join(",\n") + ",\n");
