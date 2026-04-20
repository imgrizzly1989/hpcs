import type { Brand } from "@/types";

const L = (slug: string, ext: "svg" | "png") => `/images/brands/${slug}.${ext}`;

export const brands: Brand[] = [
  { slug: "chery", name: "Chery", country: "Chine", founded: 1997, description: "Constructeur chinois, spécialiste SUV (Tiggo, Arrizo, Omoda).", logo: L("chery", "svg") },
  { slug: "geely", name: "Geely", country: "Chine", founded: 1986, description: "Groupe automobile majeur, propriétaire de Volvo Cars.", logo: L("geely", "svg") },
  { slug: "mg", name: "MG", country: "Chine", founded: 1924, description: "Marque historique britannique, aujourd'hui propriété du groupe SAIC.", logo: L("mg", "svg") },
  { slug: "dfsk", name: "DFSK", country: "Chine", founded: 2003, description: "Dongfeng Sokon, utilitaires et SUV accessibles.", logo: L("dfsk", "svg") },
  { slug: "great-wall", name: "Great Wall", country: "Chine", founded: 1984, description: "Leader du pick-up et du SUV robuste en Chine.", logo: L("great-wall", "png") },
  { slug: "haval", name: "Haval", country: "Chine", founded: 2013, description: "Marque SUV premium du groupe Great Wall.", logo: L("haval", "svg") },
  { slug: "jac", name: "JAC", country: "Chine", founded: 1964, description: "Constructeur polyvalent : SUV, berlines et utilitaires.", logo: L("jac", "svg") },
  { slug: "byd", name: "BYD", country: "Chine", founded: 1995, description: "Leader mondial du véhicule électrique et hybride.", logo: L("byd", "svg") },
  { slug: "baic", name: "BAIC", country: "Chine", founded: 1958, description: "Beijing Automotive, SUV et berlines polyvalents.", logo: L("baic", "png") },
  { slug: "dongfeng", name: "Dongfeng", country: "Chine", founded: 1969, description: "L'un des plus grands constructeurs chinois.", logo: L("dongfeng", "svg") },
  { slug: "jetour", name: "Jetour", country: "Chine", founded: 2018, description: "Sous-marque de Chery, orientée SUV familiaux.", logo: L("jetour", "svg") },
  { slug: "faw", name: "FAW", country: "Chine", founded: 1953, description: "First Automobile Works, pionnier de l'industrie chinoise.", logo: L("faw", "png") },
  { slug: "changan", name: "Changan", country: "Chine", founded: 1862, description: "L'un des plus anciens constructeurs chinois, SUV et berlines (CS35, CS55, CS75).", logo: L("changan", "svg") },
];

export const getBrand = (slug: string) => brands.find((b) => b.slug === slug);
