// Generates src/data/products.ts with 120+ products.
// Run: node scripts/gen_products.js
const fs = require("fs");
const path = require("path");

// Priority models (must each have 6-10 parts):
// tuples [brandSlug, modelSlug, yearStart, yearEnd, engines, humanName]
const MODELS = [
  ["mg", "zs", 2017, 2024, ["1.5L", "1.0T"], "MG ZS"],
  ["mg", "hs", 2018, 2024, ["1.5T", "2.0T"], "MG HS"],
  ["mg", "mg5", 2020, 2024, ["1.5L"], "MG 5"],
  ["chery", "tiggo-4-pro", 2020, 2024, ["1.5L", "1.5T"], "Chery Tiggo 4 Pro"],
  ["chery", "tiggo-7-pro", 2020, 2024, ["1.5T"], "Chery Tiggo 7 Pro"],
  ["chery", "tiggo-8-pro", 2019, 2024, ["1.6T", "2.0T"], "Chery Tiggo 8 Pro"],
  ["chery", "tiggo-2-pro", 2019, 2024, ["1.5L"], "Chery Tiggo 2 Pro"],
  ["geely", "coolray", 2019, 2024, ["1.5T"], "Geely Coolray"],
  ["geely", "emgrand", 2018, 2024, ["1.5L"], "Geely Emgrand"],
  ["geely", "gx3-pro", 2021, 2024, ["1.5L"], "Geely GX3 Pro"],
  ["geely", "azkarra", 2019, 2024, ["1.8T", "2.0T"], "Geely Azkarra"],
  ["haval", "h6", 2017, 2024, ["1.5T", "2.0T"], "Haval H6"],
  ["haval", "jolion", 2021, 2024, ["1.5T"], "Haval Jolion"],
  ["haval", "h2", 2014, 2022, ["1.5T"], "Haval H2"],
  ["haval", "f7", 2019, 2024, ["1.5T", "2.0T"], "Haval F7"],
  ["changan", "cs55", 2018, 2024, ["1.5T"], "Changan CS55"],
  ["changan", "cs35-plus", 2018, 2024, ["1.6L", "1.4T"], "Changan CS35 Plus"],
  ["byd", "song", 2020, 2024, ["1.5T", "Hybride"], "BYD Song Plus"],
  ["byd", "atto-3", 2022, 2024, ["Électrique"], "BYD Atto 3"],
  ["jac", "j7", 2019, 2024, ["1.5T"], "JAC J7"],
  ["jac", "js4", 2019, 2024, ["1.5L", "1.5T"], "JAC JS4"],
  ["dfsk", "glory-580", 2017, 2023, ["1.5T", "1.8L"], "DFSK Glory 580"],
  ["jetour", "x70", 2019, 2024, ["1.5T", "2.0T"], "Jetour X70"],
  ["dongfeng", "ax7", 2019, 2024, ["1.6T", "2.0T"], "Dongfeng AX7"],
];

// Part templates: [slug, nameFr, category, specType, weight, warranty, featured, position?]
// We generate 6-10 parts per model by cycling through these.
// Each row: { key, nameTpl: (v) => str, slug: (v) => str, category, specs, featured }
const PARTS = [
  { k: "brake-pads-front", name: (m) => `Plaquettes de frein avant ${m.name}`, slug: (m) => `plaquettes-frein-avant-${m.modelSlug}`, cat: "freinage", pos: "Avant", type: "Plaquettes semi-métalliques", warranty: "12 mois", weight: "1.1 kg", featured: true },
  { k: "brake-pads-rear", name: (m) => `Plaquettes de frein arrière ${m.name}`, slug: (m) => `plaquettes-frein-arriere-${m.modelSlug}`, cat: "freinage", pos: "Arrière", type: "Plaquettes semi-métalliques", warranty: "12 mois", weight: "0.9 kg" },
  { k: "brake-disc-front", name: (m) => `Disques de frein avant (paire) ${m.name}`, slug: (m) => `disques-frein-avant-${m.modelSlug}`, cat: "freinage", pos: "Avant", type: "Disque ventilé", warranty: "12 mois", weight: "7.5 kg" },
  { k: "brake-disc-rear", name: (m) => `Disques de frein arrière (paire) ${m.name}`, slug: (m) => `disques-frein-arriere-${m.modelSlug}`, cat: "freinage", pos: "Arrière", type: "Disque plein", warranty: "12 mois", weight: "5.5 kg" },
  { k: "oil-filter", name: (m) => `Filtre à huile ${m.name}`, slug: (m) => `filtre-huile-${m.modelSlug}`, cat: "filtration", type: "Filtre à huile haute efficacité", warranty: "12 mois", weight: "0.3 kg", featured: true },
  { k: "air-filter", name: (m) => `Filtre à air moteur ${m.name}`, slug: (m) => `filtre-air-moteur-${m.modelSlug}`, cat: "filtration", type: "Filtre à air plissé", warranty: "12 mois", weight: "0.4 kg" },
  { k: "cabin-filter", name: (m) => `Filtre d'habitacle ${m.name}`, slug: (m) => `filtre-habitacle-${m.modelSlug}`, cat: "filtration", type: "Filtre charbon actif", warranty: "12 mois", weight: "0.2 kg" },
  { k: "fuel-filter", name: (m) => `Filtre à carburant ${m.name}`, slug: (m) => `filtre-carburant-${m.modelSlug}`, cat: "filtration", type: "Filtre à carburant", warranty: "12 mois", weight: "0.4 kg" },
  { k: "radiator", name: (m) => `Radiateur moteur ${m.name}`, slug: (m) => `radiateur-moteur-${m.modelSlug}`, cat: "refroidissement", type: "Radiateur aluminium", warranty: "12 mois", weight: "3.8 kg" },
  { k: "ac-condenser", name: (m) => `Radiateur de climatisation (condenseur) ${m.name}`, slug: (m) => `condenseur-clim-${m.modelSlug}`, cat: "climatisation", type: "Condenseur aluminium", warranty: "12 mois", weight: "2.4 kg" },
  { k: "water-pump", name: (m) => `Pompe à eau ${m.name}`, slug: (m) => `pompe-eau-${m.modelSlug}`, cat: "refroidissement", type: "Pompe à eau mécanique", warranty: "12 mois", weight: "1.1 kg" },
  { k: "thermostat", name: (m) => `Thermostat moteur ${m.name}`, slug: (m) => `thermostat-${m.modelSlug}`, cat: "refroidissement", type: "Thermostat 87°C", warranty: "12 mois", weight: "0.3 kg" },
  { k: "shock-front", name: (m) => `Amortisseur avant ${m.name}`, slug: (m) => `amortisseur-avant-${m.modelSlug}`, cat: "suspension", pos: "Avant", type: "Amortisseur à gaz", warranty: "12 mois", weight: "3.1 kg", featured: true },
  { k: "shock-rear", name: (m) => `Amortisseur arrière ${m.name}`, slug: (m) => `amortisseur-arriere-${m.modelSlug}`, cat: "suspension", pos: "Arrière", type: "Amortisseur à gaz", warranty: "12 mois", weight: "2.8 kg" },
  { k: "ball-joint", name: (m) => `Rotule de suspension ${m.name}`, slug: (m) => `rotule-suspension-${m.modelSlug}`, cat: "suspension", type: "Rotule acier forgé", warranty: "12 mois", weight: "0.6 kg" },
  { k: "stabilizer-link", name: (m) => `Biellette de barre stabilisatrice ${m.name}`, slug: (m) => `biellette-stabilisatrice-${m.modelSlug}`, cat: "suspension", type: "Biellette acier", warranty: "12 mois", weight: "0.4 kg" },
  { k: "spark-plugs", name: (m) => `Bougies d'allumage (jeu de 4) ${m.name}`, slug: (m) => `bougies-allumage-${m.modelSlug}`, cat: "electricite", type: "Bougies iridium", warranty: "12 mois", weight: "0.3 kg", featured: true },
  { k: "ignition-coil", name: (m) => `Bobine d'allumage ${m.name}`, slug: (m) => `bobine-allumage-${m.modelSlug}`, cat: "electricite", type: "Bobine crayon", warranty: "12 mois", weight: "0.25 kg" },
  { k: "headlight-left", name: (m) => `Phare avant gauche ${m.name}`, slug: (m) => `phare-avant-gauche-${m.modelSlug}`, cat: "eclairage", pos: "Avant gauche", type: "Phare LED/halogène", warranty: "6 mois", weight: "3.4 kg" },
  { k: "headlight-right", name: (m) => `Phare avant droit ${m.name}`, slug: (m) => `phare-avant-droit-${m.modelSlug}`, cat: "eclairage", pos: "Avant droit", type: "Phare LED/halogène", warranty: "6 mois", weight: "3.4 kg" },
  { k: "taillight-left", name: (m) => `Feu arrière gauche ${m.name}`, slug: (m) => `feu-arriere-gauche-${m.modelSlug}`, cat: "eclairage", pos: "Arrière gauche", type: "Feu LED", warranty: "6 mois", weight: "1.6 kg" },
  { k: "taillight-right", name: (m) => `Feu arrière droit ${m.name}`, slug: (m) => `feu-arriere-droit-${m.modelSlug}`, cat: "eclairage", pos: "Arrière droit", type: "Feu LED", warranty: "6 mois", weight: "1.6 kg" },
  { k: "abs-sensor", name: (m) => `Capteur ABS ${m.name}`, slug: (m) => `capteur-abs-${m.modelSlug}`, cat: "electricite", type: "Capteur de vitesse de roue", warranty: "12 mois", weight: "0.15 kg" },
  { k: "oxygen-sensor", name: (m) => `Capteur d'oxygène (sonde lambda) ${m.name}`, slug: (m) => `capteur-oxygene-${m.modelSlug}`, cat: "electricite", type: "Sonde lambda chauffée", warranty: "12 mois", weight: "0.2 kg" },
  { k: "ac-compressor", name: (m) => `Compresseur de climatisation ${m.name}`, slug: (m) => `compresseur-clim-${m.modelSlug}`, cat: "climatisation", type: "Compresseur R134a", warranty: "12 mois", weight: "5.4 kg" },
  { k: "timing-belt", name: (m) => `Kit courroie de distribution ${m.name}`, slug: (m) => `kit-courroie-distribution-${m.modelSlug}`, cat: "moteur", type: "Kit distribution (courroie + galets)", warranty: "12 mois", weight: "1.6 kg" },
  { k: "drive-belt", name: (m) => `Courroie d'accessoires ${m.name}`, slug: (m) => `courroie-accessoires-${m.modelSlug}`, cat: "moteur", type: "Courroie multipistes", warranty: "12 mois", weight: "0.3 kg" },
  { k: "clutch-kit", name: (m) => `Kit d'embrayage ${m.name}`, slug: (m) => `kit-embrayage-${m.modelSlug}`, cat: "moteur", type: "Kit complet (disque + mécanisme + butée)", warranty: "12 mois", weight: "8.3 kg" },
  { k: "alternator", name: (m) => `Alternateur ${m.name}`, slug: (m) => `alternateur-${m.modelSlug}`, cat: "electricite", type: "Alternateur 12V", warranty: "12 mois", weight: "4.7 kg" },
  { k: "starter", name: (m) => `Démarreur ${m.name}`, slug: (m) => `demarreur-${m.modelSlug}`, cat: "electricite", type: "Démarreur électrique", warranty: "12 mois", weight: "3.6 kg" },
  { k: "side-mirror", name: (m) => `Rétroviseur extérieur droit ${m.name}`, slug: (m) => `retroviseur-droit-${m.modelSlug}`, cat: "carrosserie", pos: "Extérieur droit", type: "Rétroviseur électrique avec clignotant", warranty: "6 mois", weight: "1.4 kg" },
  { k: "floor-mat", name: (m) => `Tapis de sol (jeu 4) ${m.name}`, slug: (m) => `tapis-sol-${m.modelSlug}`, cat: "accessoires", type: "Tapis caoutchouc sur-mesure", warranty: "6 mois", weight: "3.2 kg" },
];

// For each model, choose which part keys to include (between 6 and 10, varying).
function partsForModelIndex(i) {
  // Base wear items always
  const base = ["brake-pads-front", "oil-filter", "air-filter", "cabin-filter", "spark-plugs", "shock-front"];
  // Extra rotating by index to vary coverage
  const extras = [
    ["brake-pads-rear", "headlight-left", "timing-belt"],
    ["brake-disc-front", "taillight-right", "water-pump"],
    ["ignition-coil", "ball-joint", "fuel-filter"],
    ["ac-compressor", "stabilizer-link", "thermostat"],
    ["headlight-right", "drive-belt", "abs-sensor"],
    ["radiator", "alternator", "oxygen-sensor"],
    ["shock-rear", "clutch-kit", "starter"],
    ["side-mirror", "floor-mat", "brake-disc-rear"],
    ["ac-condenser", "headlight-left", "timing-belt"],
    ["taillight-left", "ball-joint", "water-pump"],
  ];
  const pick = extras[i % extras.length];
  // Always include ~3 extras (total 9) except for a few small-market models trimmed to 6
  const count = 6 <= 6 ? 3 : 3; // always 3 extras
  return [...base, ...pick.slice(0, count)];
}

function slugify(s) {
  return s.toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function pad(n, w) { return n.toString().padStart(w, "0"); }

function randInt(min, max, seed) {
  // Deterministic based on seed
  const x = Math.sin(seed) * 10000;
  const r = x - Math.floor(x);
  return Math.floor(min + r * (max - min + 1));
}

function makeProducts() {
  const out = [];
  let counter = 1;
  const refCounters = {}; // per category

  MODELS.forEach((tuple, mi) => {
    const [brandSlug, modelSlug, yStart, yEnd, engines, humanName] = tuple;
    const m = { brandSlug, modelSlug, yStart, yEnd, engines, name: humanName };
    const keys = partsForModelIndex(mi);
    keys.forEach((pk, ki) => {
      const P = PARTS.find((x) => x.k === pk);
      if (!P) return;
      const catCode = {
        freinage: "FRE", filtration: "FIL", refroidissement: "REF",
        climatisation: "CLI", suspension: "SUS", electricite: "ELE",
        eclairage: "ECL", moteur: "MOT", carrosserie: "CAR", accessoires: "ACC",
        direction: "DIR",
      }[P.cat] || "GEN";
      refCounters[catCode] = (refCounters[catCode] || 0) + 1;
      const refNum = pad(refCounters[catCode], 3);
      const reference = `HPCS-${catCode}-${refNum}`;
      const name = P.name(m);
      const baseSlug = P.slug(m);
      const id = `p-${pad(counter, 3)}`;
      counter++;

      const yearsStr = `${yStart}-${yEnd}`;
      const engineStr = engines.length ? ` (${engines.join(" / ")})` : "";
      // Base part name = generated name with model name stripped off the end
      const basePart = name.replace(new RegExp(`\\s+${humanName.replace(/[.*+?^${}()|[\\]\\\\]/g, "\\$&")}\\s*$`), "")
                           .replace(/\s*\(paire\)\s*$/, " (paire)");
      const desc = [
        `${basePart} compatible ${humanName} ${yearsStr}${engineStr}.`,
        `Référence conçue pour offrir des performances équivalentes à la pièce d'origine, conforme aux spécifications constructeur.`,
        P.cat === "freinage" ? "Installation recommandée en atelier avec rodage progressif." :
        P.cat === "moteur" ? "Pose en atelier conseillée, couple de serrage constructeur à respecter." :
        P.cat === "eclairage" ? "Connecteur d'origine, remplacement direct sans adaptation." :
        P.cat === "electricite" ? "Composant testé avant expédition. Compatibilité vérifiée par VIN." :
        P.cat === "suspension" ? "Remplacement par paire conseillé pour un comportement équilibré." :
        P.cat === "filtration" ? "À remplacer à chaque entretien périodique pour préserver votre moteur." :
        "Installation facile avec notice. Support technique HPCS disponible sur WhatsApp.",
      ].join(" ");

      const specs = {
        "Référence OEM": reference,
        "Type": P.type,
        "Marque compatible": {
          mg: "MG", chery: "Chery", geely: "Geely", haval: "Haval",
          changan: "Changan", byd: "BYD", jac: "JAC", dfsk: "DFSK",
          jetour: "Jetour", dongfeng: "Dongfeng", "great-wall": "Great Wall",
          baic: "BAIC", faw: "FAW",
        }[brandSlug],
        "Modèle": humanName,
        "Années": yearsStr,
        "Garantie": P.warranty,
        "Origine": "Chine / OEM équivalent",
      };
      if (P.pos) specs["Position"] = P.pos;

      out.push({
        id, slug: baseSlug, name, reference, category: P.cat,
        compatibleVehicles: [{ brandSlug, modelSlug, years: [yStart, yEnd], engines }],
        price: 0, stock: randInt(3, 40, counter * 17),
        description: desc,
        specs,
        isFeatured: !!P.featured && (ki === 0), // only feature the first occurrence per model
      });
    });
  });

  // Ensure ~12 featured overall
  let featuredCount = out.filter((p) => p.isFeatured).length;
  // Already ~24 (one per model) — trim to 12 by keeping first 12
  let kept = 0;
  for (const p of out) {
    if (p.isFeatured) {
      if (kept < 12) kept++;
      else p.isFeatured = false;
    }
  }

  return out;
}

const products = makeProducts();
console.error(`Generated ${products.length} products`);

// Check for slug collisions
const seen = new Set();
for (const p of products) {
  if (seen.has(p.slug)) throw new Error("duplicate slug: " + p.slug);
  seen.add(p.slug);
}

// Emit TS
const banner = `import type { Product } from "@/types";

// Auto-generated catalog (see scripts/gen_products.js).
// NOTE: HPCS-XXX-NNN placeholder references. Client provides real OEMs before production.
// Prices set to 0 — never rendered ("Prix sur demande" + WhatsApp CTA everywhere).

`;

const esc = (s) => s.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
function fmtProduct(p) {
  const compat = p.compatibleVehicles.map((c) =>
    `{ brandSlug: "${c.brandSlug}", modelSlug: "${c.modelSlug}", years: [${c.years[0]}, ${c.years[1]}], engines: [${c.engines.map(e => `"${esc(e)}"`).join(", ")}] }`
  ).join(", ");
  const specs = Object.entries(p.specs).map(([k, v]) => `    ${JSON.stringify(k)}: "${esc(v)}"`).join(",\n");
  return `  {
    id: "${p.id}", slug: "${p.slug}", name: "${esc(p.name)}",
    reference: "${p.reference}", category: "${p.category}",
    compatibleVehicles: [${compat}],
    price: 0, stock: ${p.stock},
    description: "${esc(p.description)}",
    specs: {
${specs}
    },${p.isFeatured ? "\n    isFeatured: true," : ""}
  }`;
}

// Group by category for readability
const byCat = {};
for (const p of products) {
  (byCat[p.category] ||= []).push(p);
}

let body = "export const products: Product[] = [\n";
for (const cat of Object.keys(byCat)) {
  body += `  // === ${cat.toUpperCase()} ===\n`;
  body += byCat[cat].map(fmtProduct).join(",\n") + ",\n";
}
body += "];\n\n";
body += "export const getProduct = (slug: string) => products.find((p) => p.slug === slug);\n";

fs.writeFileSync(path.join(__dirname, "..", "src/data/products.ts"), banner + body);
console.error("Wrote src/data/products.ts");
