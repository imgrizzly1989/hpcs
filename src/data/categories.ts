import type { Category } from "@/types";

export const categories: Category[] = [
  { slug: "moteur", name: "Moteur", icon: "Cog", description: "Pièces moteur : courroies, pompes, kits distribution, embrayages." },
  { slug: "freinage", name: "Freinage", icon: "CircleDot", description: "Plaquettes, disques, étriers, flexibles pour tous véhicules chinois." },
  { slug: "suspension", name: "Suspension", icon: "Waves", description: "Amortisseurs, rotules, silent-blocs, barres stabilisatrices." },
  { slug: "direction", name: "Direction", icon: "Navigation", description: "Crémaillères, biellettes, rotules de direction." },
  { slug: "refroidissement", name: "Refroidissement", icon: "Thermometer", description: "Radiateurs, thermostats, durites, ventilateurs." },
  { slug: "electricite", name: "Électricité", icon: "Zap", description: "Alternateurs, démarreurs, bobines, capteurs, batteries." },
  { slug: "carrosserie", name: "Carrosserie", icon: "Car", description: "Pare-chocs, rétroviseurs, ailes, capots, portes." },
  { slug: "eclairage", name: "Éclairage", icon: "Lightbulb", description: "Phares, feux arrière, clignotants, ampoules LED." },
  { slug: "climatisation", name: "Climatisation", icon: "Snowflake", description: "Compresseurs, condenseurs, évaporateurs." },
  { slug: "filtration", name: "Filtration", icon: "Filter", description: "Filtres à huile, à air, habitacle, carburant." },
  { slug: "accessoires", name: "Accessoires", icon: "Package", description: "Tapis, housses, batteries universelles, accessoires divers." },
];

export const getCategory = (slug: string) => categories.find((c) => c.slug === slug);
