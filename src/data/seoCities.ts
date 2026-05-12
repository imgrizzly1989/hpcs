export type SeoCityPage = {
  slug: string;
  city: string;
  title: string;
  h1: string;
  description: string;
  intro: string;
  proof: string[];
  popularSearches: { label: string; href: string }[];
  faq: { q: string; a: string }[];
};

const commonFaq = (city: string) => [
  {
    q: `Livrez-vous des pièces de voitures chinoises à ${city} ?`,
    a: `Oui. CHINAPAL prépare les demandes depuis Casablanca et organise l'expédition vers ${city} après validation de la référence et de la compatibilité véhicule.`,
  },
  {
    q: "Pourquoi demander le VIN avant le devis ?",
    a: "Sur les marques chinoises, une même pièce peut changer selon l'année, la finition, le marché ou la phase du modèle. Le VIN, une photo ou une référence d'origine réduit fortement le risque d'erreur.",
  },
  {
    q: "Puis-je commander pour un garage ou un client final ?",
    a: "Oui. Le service CHINAPAL s'adresse aux particuliers, garages, ateliers carrosserie et revendeurs qui recherchent des pièces compatibles pour voitures chinoises au Maroc.",
  },
];

export const seoCities: SeoCityPage[] = [
  {
    slug: "casablanca",
    city: "Casablanca",
    title: "Pièces voitures chinoises Casablanca | CHINAPAL",
    h1: "Pièces pour voitures chinoises à Casablanca",
    description: "Pièces Chery, Geely, MG, Haval, BYD, JAC et DFSK à Casablanca. Carrosserie, phares, filtres, freinage, devis WhatsApp et vérification VIN.",
    intro: "Casablanca concentre une grande partie des garages, ateliers carrosserie et demandes urgentes en pièces pour voitures chinoises au Maroc. CHINAPAL traite ces recherches avec une logique simple : identifier la marque et le modèle, confirmer la compatibilité, puis orienter vers la bonne référence sans promettre une pièce approximative.",
    proof: ["Service basé à Casablanca", "Vérification VIN avant confirmation", "Demandes particuliers, garages et revendeurs", "Pièces carrosserie, éclairage, filtration, freinage et suspension"],
    popularSearches: [
      { label: "Pare-chocs MG ZS Casablanca", href: "/recherche/pare-chocs-mg-zs-maroc" },
      { label: "Phare Chery Tiggo Casablanca", href: "/recherche/phare-chery-tiggo-4-pro-maroc" },
      { label: "Carrosserie voitures chinoises", href: "/categorie/carrosserie" },
      { label: "Toutes les marques chinoises", href: "/vehicule" },
    ],
    faq: commonFaq("Casablanca"),
  },
  {
    slug: "rabat",
    city: "Rabat",
    title: "Pièces voitures chinoises Rabat | Livraison Maroc",
    h1: "Pièces pour voitures chinoises à Rabat",
    description: "Pièces automobiles chinoises livrées à Rabat : MG, Chery, Geely, Haval, BYD, JAC, DFSK. Devis WhatsApp, VIN requis, livraison depuis Casablanca.",
    intro: "À Rabat, les recherches de pièces pour voitures chinoises concernent souvent les SUV récents, les pièces de choc et l'entretien courant. CHINAPAL accompagne les propriétaires et garages de Rabat avec un catalogue orienté marques chinoises et une validation humaine avant envoi.",
    proof: ["Livraison vers Rabat", "Validation par photo, référence ou VIN", "Support WhatsApp rapide", "Sélection dédiée aux marques chinoises"],
    popularSearches: [
      { label: "Pièces MG Rabat", href: "/marque/mg" },
      { label: "Pièces Chery Rabat", href: "/marque/chery" },
      { label: "Phares voitures chinoises", href: "/categorie/eclairage" },
      { label: "Guides modèles populaires", href: "/vehicule" },
    ],
    faq: commonFaq("Rabat"),
  },
  {
    slug: "tanger",
    city: "Tanger",
    title: "Pièces voitures chinoises Tanger | CHINAPAL Maroc",
    h1: "Pièces pour voitures chinoises à Tanger",
    description: "Commandez des pièces Chery, MG, Geely, Haval, BYD et JAC pour Tanger. Carrosserie, éclairage, filtres, freinage, vérification VIN et WhatsApp.",
    intro: "Pour Tanger, la priorité est d'éviter les erreurs de compatibilité sur des véhicules chinois souvent récents ou importés avec différentes finitions. CHINAPAL demande les détails utiles avant devis afin de sécuriser la pièce avant expédition.",
    proof: ["Expédition vers Tanger", "Contrôle compatibilité avant devis", "Pièces pour SUV, berlines et utilitaires chinois", "Canal WhatsApp prioritaire"],
    popularSearches: [
      { label: "Pièces Haval Tanger", href: "/marque/haval" },
      { label: "Pièces Geely Tanger", href: "/marque/geely" },
      { label: "Rétroviseurs et carrosserie", href: "/categorie/carrosserie" },
      { label: "Freinage voitures chinoises", href: "/categorie/freinage" },
    ],
    faq: commonFaq("Tanger"),
  },
  {
    slug: "marrakech",
    city: "Marrakech",
    title: "Pièces voitures chinoises Marrakech | Devis WhatsApp",
    h1: "Pièces pour voitures chinoises à Marrakech",
    description: "Pièces de voitures chinoises livrées à Marrakech : carrosserie, phares, filtres, freinage pour MG, Chery, Geely, BYD, Haval et JAC.",
    intro: "À Marrakech, les demandes portent souvent sur des pièces de carrosserie, optiques et entretien pour SUV chinois. CHINAPAL centralise ces recherches et privilégie la vérification VIN ou photo pour confirmer la référence avant expédition.",
    proof: ["Livraison vers Marrakech", "Devis après confirmation", "Emballage adapté aux pièces fragiles", "Assistance particuliers et garages"],
    popularSearches: [
      { label: "Pièces BYD Marrakech", href: "/marque/byd" },
      { label: "Pièces Jetour Marrakech", href: "/marque/jetour" },
      { label: "Pare-chocs voitures chinoises", href: "/pieces/pare-choc-maroc" },
      { label: "Filtres et entretien", href: "/categorie/filtration" },
    ],
    faq: commonFaq("Marrakech"),
  },
  {
    slug: "fes",
    city: "Fès",
    title: "Pièces voitures chinoises Fès | CHINAPAL",
    h1: "Pièces pour voitures chinoises à Fès",
    description: "Pièces automobiles chinoises pour Fès : Chery, MG, Geely, Haval, BYD, JAC, DFSK. Livraison Maroc, devis WhatsApp, compatibilité VIN.",
    intro: "Les propriétaires et garages de Fès recherchent de plus en plus des pièces compatibles pour marques chinoises. CHINAPAL structure ces demandes autour des modèles les plus présents et d'une validation sérieuse avant commande.",
    proof: ["Expédition vers Fès", "Réponse WhatsApp", "Vérification modèle, année et VIN", "Catalogue dédié voitures chinoises"],
    popularSearches: [
      { label: "Pièces JAC Fès", href: "/marque/jac" },
      { label: "Pièces DFSK Fès", href: "/marque/dfsk" },
      { label: "Suspension voitures chinoises", href: "/categorie/suspension" },
      { label: "Modèles les plus demandés", href: "/vehicule" },
    ],
    faq: commonFaq("Fès"),
  },
  {
    slug: "agadir",
    city: "Agadir",
    title: "Pièces voitures chinoises Agadir | Livraison Maroc",
    h1: "Pièces pour voitures chinoises à Agadir",
    description: "Pièces MG, Chery, Geely, Haval, BYD et JAC livrées à Agadir. Carrosserie, phares, filtres, freinage, devis WhatsApp avec VIN.",
    intro: "À Agadir, les demandes en pièces de voitures chinoises nécessitent un traitement clair pour éviter les retours coûteux. CHINAPAL vérifie la compatibilité avant de confirmer la disponibilité ou l'alternative adaptée.",
    proof: ["Livraison vers Agadir", "Contrôle avant expédition", "Pièces carrosserie et entretien", "Support WhatsApp direct"],
    popularSearches: [
      { label: "Pièces Changan Agadir", href: "/marque/changan" },
      { label: "Pièces Dongfeng Agadir", href: "/marque/dongfeng" },
      { label: "Éclairage voitures chinoises", href: "/categorie/eclairage" },
      { label: "Recherche par modèle", href: "/vehicule" },
    ],
    faq: commonFaq("Agadir"),
  },
];

export const getSeoCity = (slug: string) => seoCities.find((item) => item.slug === slug);
