export type SeoCategory = {
  slug: string;
  title: string;
  h1: string;
  description: string;
  categorySlugs?: string[];
  nameRegex?: RegExp;
  internalLinks: { label: string; href: string }[];
};

export const seoCategories: SeoCategory[] = [
  {
    slug: "pare-choc-maroc",
    title: "Pare-choc voiture chinoise Maroc",
    h1: "Pare-chocs pour voitures chinoises au Maroc",
    description:
      "Pare-chocs avant et arrière pour MG, Chery, Geely, Haval, BYD, Jetour, BAIC, JAC et Great Wall. Pièces compatibles, livraison rapide au Maroc, devis WhatsApp.",
    categorySlugs: ["carrosserie"],
    nameRegex: /pare-chocs|spoiler|becquet|baguette|bas de caisse|deflecteur/i,
    internalLinks: [
      { label: "Carrosserie complète", href: "/categorie/carrosserie" },
      { label: "Phares & Feux", href: "/categorie/carrosserie/phares-feux" },
      { label: "Demande par véhicule", href: "/vehicule" },
    ],
  },
  {
    slug: "retroviseur-maroc",
    title: "Rétroviseur voiture chinoise Maroc",
    h1: "Rétroviseurs pour voitures chinoises au Maroc",
    description:
      "Rétroviseurs extérieurs gauche/droite, coques et accessoires pour modèles chinois en circulation au Maroc. Vérification VIN et devis rapide sur WhatsApp.",
    categorySlugs: ["carrosserie"],
    nameRegex: /retroviseur|coque/i,
    internalLinks: [
      { label: "Sous-catégorie Rétroviseurs", href: "/categorie/carrosserie/retroviseurs" },
      { label: "Marques disponibles", href: "/boutique" },
      { label: "Contact WhatsApp", href: "/contact" },
    ],
  },
  {
    slug: "calandre-maroc",
    title: "Calandre voiture chinoise Maroc",
    h1: "Calandres et grilles pour voitures chinoises au Maroc",
    description:
      "Calandres avant, cadres et grilles de carrosserie pour SUV et berlines chinoises. Service professionnel CHINAPAL pour particuliers et garages au Maroc.",
    categorySlugs: ["carrosserie"],
    nameRegex: /calandre|grille/i,
    internalLinks: [
      { label: "Sous-catégorie Calandre", href: "/categorie/carrosserie/calandre" },
      { label: "Pièces de tôlerie", href: "/categorie/carrosserie/tolerie" },
      { label: "Livraison & retours", href: "/livraison-retours" },
    ],
  },
  {
    slug: "phares-maroc",
    title: "Phare voiture chinoise Maroc",
    h1: "Phares et optiques pour voitures chinoises au Maroc",
    description:
      "Phares avant, antibrouillards et éclairage compatible MG, Chery, Geely, Haval, BYD et autres marques chinoises au Maroc. Demande de disponibilité sur WhatsApp.",
    categorySlugs: ["carrosserie", "eclairage"],
    nameRegex: /phare|antibrouillard|optique/i,
    internalLinks: [
      { label: "Phares & Feux", href: "/categorie/carrosserie/phares-feux" },
      { label: "Catégorie Éclairage", href: "/categorie/eclairage" },
      { label: "Voir la boutique", href: "/boutique" },
    ],
  },
  {
    slug: "feu-arriere-maroc",
    title: "Feu arrière voiture chinoise Maroc",
    h1: "Feux arrière pour voitures chinoises au Maroc",
    description:
      "Feux arrière gauche/droite et ensembles optiques arrière pour véhicules chinois. Compatibilité vérifiée avec votre modèle avant expédition au Maroc.",
    categorySlugs: ["carrosserie", "eclairage"],
    nameRegex: /feu arriere|feu arrière|tail/i,
    internalLinks: [
      { label: "Sous-catégorie Phares & Feux", href: "/categorie/carrosserie/phares-feux" },
      { label: "Assistance WhatsApp", href: "/contact" },
      { label: "FAQ compatibilité", href: "/faq" },
    ],
  },
  {
    slug: "filtres-maroc",
    title: "Filtres voiture chinoise Maroc",
    h1: "Filtres auto pour voitures chinoises au Maroc",
    description:
      "Filtres à huile, filtres à air, filtres habitacle et filtres carburant pour voitures chinoises au Maroc. Stock sélectionné et livraison rapide.",
    categorySlugs: ["filtration"],
    nameRegex: /filtre/i,
    internalLinks: [
      { label: "Catégorie Filtration", href: "/categorie/filtration" },
      { label: "Pièces moteur", href: "/pieces/pieces-moteur-maroc" },
      { label: "Demande par VIN", href: "/vehicule" },
    ],
  },
  {
    slug: "suspension-maroc",
    title: "Suspension voiture chinoise Maroc",
    h1: "Pièces de suspension pour voitures chinoises au Maroc",
    description:
      "Amortisseurs, rotules, biellettes et composants de suspension pour modèles chinois. Service pro CHINAPAL pour particuliers et garages au Maroc.",
    categorySlugs: ["suspension"],
    nameRegex: /amortisseur|rotule|biellette|suspension/i,
    internalLinks: [
      { label: "Catégorie Suspension", href: "/categorie/suspension" },
      { label: "Freinage", href: "/pieces/freinage-maroc" },
      { label: "Contact WhatsApp", href: "/contact" },
    ],
  },
  {
    slug: "freinage-maroc",
    title: "Freinage voiture chinoise Maroc",
    h1: "Pièces de freinage pour voitures chinoises au Maroc",
    description:
      "Plaquettes, disques, capteurs ABS et pièces de freinage pour véhicules chinois. Réponse rapide WhatsApp et livraison partout au Maroc.",
    categorySlugs: ["freinage"],
    nameRegex: /frein|plaquette|disque|abs/i,
    internalLinks: [
      { label: "Catégorie Freinage", href: "/categorie/freinage" },
      { label: "Suspension", href: "/pieces/suspension-maroc" },
      { label: "Pièces moteur", href: "/pieces/pieces-moteur-maroc" },
    ],
  },
  {
    slug: "pieces-moteur-maroc",
    title: "Pièces moteur voiture chinoise Maroc",
    h1: "Pièces moteur pour voitures chinoises au Maroc",
    description:
      "Courroies, pompes, bougies, bobines et composants moteur pour marques chinoises au Maroc. Pièces fiables, vérification compatibilité et devis WhatsApp.",
    categorySlugs: ["moteur", "electricite", "refroidissement"],
    nameRegex: /moteur|courroie|pompe|bougie|bobine|alternateur|demarreur|radiateur|thermostat/i,
    internalLinks: [
      { label: "Catégorie Moteur", href: "/categorie/moteur" },
      { label: "Catégorie Refroidissement", href: "/categorie/refroidissement" },
      { label: "Catégorie Électricité", href: "/categorie/electricite" },
    ],
  },
];

export const getSeoCategory = (slug: string) => seoCategories.find((item) => item.slug === slug);
