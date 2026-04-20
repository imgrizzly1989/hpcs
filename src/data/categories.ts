import type { Category, Subcategory } from "@/types";

export const carrosserieSubcategories: Subcategory[] = [
  { slug: "pare-chocs", name: "Pare-chocs", description: "Pare-chocs avant et arrière, spoilers, baguettes, bas de caisse." },
  { slug: "phares-feux", name: "Phares & Feux", description: "Phares avant, feux arrière, antibrouillards, clignotants." },
  { slug: "retroviseurs", name: "Rétroviseurs", description: "Rétroviseurs électriques, coques, miroirs de remplacement." },
  { slug: "calandre", name: "Calandre", description: "Calandres, grilles et cadres de calandre d'origine." },
  { slug: "tolerie", name: "Capot / Ailes / Portes", description: "Capots moteur, ailes, portes avant et arrière, poignées." },
  { slug: "garnitures", name: "Garnitures extérieures", description: "Moulures, baguettes de portes, becquets, déflecteurs." },
  { slug: "essuie-glaces", name: "Essuie-glaces & Vitrages", description: "Balais d'essuie-glaces, pare-brise, vitres latérales, joints." },
];

export const categories: Category[] = [
  { slug: "moteur", name: "Moteur", icon: "Cog", description: "Pièces moteur : courroies, pompes, kits distribution, embrayages." },
  { slug: "freinage", name: "Freinage", icon: "CircleDot", description: "Plaquettes, disques, étriers, flexibles pour tous véhicules chinois." },
  { slug: "suspension", name: "Suspension", icon: "Waves", description: "Amortisseurs, rotules, silent-blocs, barres stabilisatrices." },
  { slug: "direction", name: "Direction", icon: "Navigation", description: "Crémaillères, biellettes, rotules de direction." },
  { slug: "refroidissement", name: "Refroidissement", icon: "Thermometer", description: "Radiateurs, thermostats, durites, ventilateurs." },
  { slug: "electricite", name: "Électricité", icon: "Zap", description: "Alternateurs, démarreurs, bobines, capteurs, batteries." },
  {
    slug: "carrosserie",
    name: "Carrosserie",
    icon: "Car",
    description: "Pare-chocs, phares, rétroviseurs, calandres, ailes, portes, essuie-glaces et accessoires extérieurs.",
    subcategories: carrosserieSubcategories,
  },
  { slug: "eclairage", name: "Éclairage", icon: "Lightbulb", description: "Phares, feux arrière, clignotants, ampoules LED." },
  { slug: "climatisation", name: "Climatisation", icon: "Snowflake", description: "Compresseurs, condenseurs, évaporateurs." },
  { slug: "filtration", name: "Filtration", icon: "Filter", description: "Filtres à huile, à air, habitacle, carburant." },
  { slug: "accessoires", name: "Accessoires", icon: "Package", description: "Tapis, housses, batteries universelles, accessoires divers." },
];

export const getCategory = (slug: string) => categories.find((c) => c.slug === slug);
export const getSubcategory = (catSlug: string, subSlug: string) =>
  getCategory(catSlug)?.subcategories?.find((s) => s.slug === subSlug);
