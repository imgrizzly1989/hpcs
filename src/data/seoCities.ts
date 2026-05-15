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

  {
    slug: "meknes",
    city: "Meknès",
    title: "Pièces voitures chinoises Meknès | Livraison Maroc",
    h1: "Pièces pour voitures chinoises à Meknès",
    description: "Pièces Chery, MG, Geely, Haval, BYD, JAC et DFSK livrées à Meknès. Vérification VIN, devis WhatsApp et sourcing depuis Casablanca.",
    intro: "À Meknès, les demandes en pièces pour voitures chinoises viennent autant des particuliers que des garages qui veulent éviter les références approximatives. CHINAPAL centralise la recherche depuis Casablanca, confirme la compatibilité par VIN, photo ou référence visible, puis organise l'expédition adaptée.",
    proof: ["Livraison vers Meknès", "Vérification avant devis", "Support particuliers et garages", "Carrosserie, éclairage, freinage, filtration et suspension"],
    popularSearches: [
      { label: "Pièces MG Meknès", href: "/marque/mg" },
      { label: "Pièces Chery Meknès", href: "/marque/chery" },
      { label: "Pare-chocs voitures chinoises", href: "/pieces/pare-choc-maroc" },
      { label: "Guides modèles populaires", href: "/vehicule" },
    ],
    faq: commonFaq("Meknès"),
  },
  {
    slug: "oujda",
    city: "Oujda",
    title: "Pièces voitures chinoises Oujda | Devis WhatsApp",
    h1: "Pièces pour voitures chinoises à Oujda",
    description: "Pièces automobiles chinoises pour Oujda : MG, Chery, Geely, Haval, BYD, JAC, DFSK. Livraison Maroc, vérification VIN et WhatsApp.",
    intro: "Pour Oujda, l'enjeu principal est de recevoir la bonne pièce du premier coup, surtout pour les optiques, éléments de carrosserie et références d'entretien. CHINAPAL demande les détails utiles avant confirmation afin de limiter les erreurs liées aux versions, finitions et marchés d'importation.",
    proof: ["Expédition vers Oujda", "Validation par photo ou VIN", "Pièces pour marques chinoises", "Canal WhatsApp prioritaire"],
    popularSearches: [
      { label: "Pièces Haval Oujda", href: "/marque/haval" },
      { label: "Pièces JAC Oujda", href: "/marque/jac" },
      { label: "Phares voitures chinoises", href: "/pieces/phares-maroc" },
      { label: "Freinage voitures chinoises", href: "/pieces/freinage-maroc" },
    ],
    faq: commonFaq("Oujda"),
  },
  {
    slug: "kenitra",
    city: "Kénitra",
    title: "Pièces voitures chinoises Kénitra | CHINAPAL",
    h1: "Pièces pour voitures chinoises à Kénitra",
    description: "Pièces Chery, MG, Geely, Haval, BYD et JAC livrées à Kénitra. Carrosserie, filtres, phares, freinage, devis WhatsApp.",
    intro: "À Kénitra, les besoins en pièces de voitures chinoises concernent souvent l'entretien courant et la remise en état après choc. CHINAPAL oriente la recherche par marque, modèle et pièce exacte, avec validation de compatibilité avant devis et expédition.",
    proof: ["Livraison vers Kénitra", "Contrôle compatibilité", "Assistance garages et particuliers", "Demande simple par WhatsApp"],
    popularSearches: [
      { label: "Pièces Geely Kénitra", href: "/marque/geely" },
      { label: "Pièces Changan Kénitra", href: "/marque/changan" },
      { label: "Rétroviseurs voitures chinoises", href: "/pieces/retroviseur-maroc" },
      { label: "Filtres et entretien", href: "/pieces/filtres-maroc" },
    ],
    faq: commonFaq("Kénitra"),
  },
  {
    slug: "tetouan",
    city: "Tétouan",
    title: "Pièces voitures chinoises Tétouan | Livraison Maroc",
    h1: "Pièces pour voitures chinoises à Tétouan",
    description: "Pièces voitures chinoises livrées à Tétouan : MG, Chery, Geely, Haval, BYD, JAC. Vérification VIN et devis WhatsApp.",
    intro: "Les garages et conducteurs de Tétouan recherchent des pièces compatibles sans perdre de temps sur des références proches mais incorrectes. CHINAPAL vérifie les informations véhicule avant confirmation, notamment pour carrosserie, éclairage, freinage et filtration.",
    proof: ["Expédition vers Tétouan", "VIN ou photo conseillé", "Sélection dédiée marques chinoises", "Traitement WhatsApp rapide"],
    popularSearches: [
      { label: "Pièces BYD Tétouan", href: "/marque/byd" },
      { label: "Pièces Jetour Tétouan", href: "/marque/jetour" },
      { label: "Carrosserie voitures chinoises", href: "/categorie/carrosserie" },
      { label: "Recherche par modèle", href: "/vehicule" },
    ],
    faq: commonFaq("Tétouan"),
  },
  {
    slug: "el-jadida",
    city: "El Jadida",
    title: "Pièces voitures chinoises El Jadida | CHINAPAL Maroc",
    h1: "Pièces pour voitures chinoises à El Jadida",
    description: "Pièces Chery, MG, Geely, Haval, BYD et JAC pour El Jadida. Livraison depuis Casablanca, vérification compatibilité et WhatsApp.",
    intro: "À El Jadida, la proximité avec Casablanca permet de traiter rapidement des demandes de pièces pour voitures chinoises, à condition de confirmer la bonne référence. CHINAPAL privilégie une vérification avant devis pour éviter les retours sur pièces visuellement proches.",
    proof: ["Livraison vers El Jadida", "Service depuis Casablanca", "Contrôle référence avant expédition", "Particuliers, garages et ateliers"],
    popularSearches: [
      { label: "Pièces MG El Jadida", href: "/marque/mg" },
      { label: "Pièces DFSK El Jadida", href: "/marque/dfsk" },
      { label: "Pare-chocs voitures chinoises", href: "/pieces/pare-choc-maroc" },
      { label: "Phares voitures chinoises", href: "/pieces/phares-maroc" },
    ],
    faq: commonFaq("El Jadida"),
  },
];

export const getSeoCity = (slug: string) => seoCities.find((item) => item.slug === slug);
