import type { Brand } from "@/types";

export const brands: Brand[] = [
  { slug: "chery", name: "Chery", country: "Chine", founded: 1997, description: "Constructeur chinois, spécialiste SUV (Tiggo, Arrizo, Omoda)." },
  { slug: "geely", name: "Geely", country: "Chine", founded: 1986, description: "Groupe automobile majeur, propriétaire de Volvo Cars." },
  { slug: "mg", name: "MG", country: "Chine", founded: 1924, description: "Marque historique britannique, aujourd'hui propriété du groupe SAIC." },
  { slug: "dfsk", name: "DFSK", country: "Chine", founded: 2003, description: "Dongfeng Sokon, utilitaires et SUV accessibles." },
  { slug: "great-wall", name: "Great Wall", country: "Chine", founded: 1984, description: "Leader du pick-up et du SUV robuste en Chine." },
  { slug: "haval", name: "Haval", country: "Chine", founded: 2013, description: "Marque SUV premium du groupe Great Wall." },
  { slug: "jac", name: "JAC", country: "Chine", founded: 1964, description: "Constructeur polyvalent : SUV, berlines et utilitaires." },
  { slug: "byd", name: "BYD", country: "Chine", founded: 1995, description: "Leader mondial du véhicule électrique et hybride." },
  { slug: "baic", name: "BAIC", country: "Chine", founded: 1958, description: "Beijing Automotive, SUV et berlines polyvalents." },
  { slug: "dongfeng", name: "Dongfeng", country: "Chine", founded: 1969, description: "L'un des plus grands constructeurs chinois." },
  { slug: "jetour", name: "Jetour", country: "Chine", founded: 2018, description: "Sous-marque de Chery, orientée SUV familiaux." },
  { slug: "faw", name: "FAW", country: "Chine", founded: 1953, description: "First Automobile Works, pionnier de l'industrie chinoise." },
];

export const getBrand = (slug: string) => brands.find((b) => b.slug === slug);
