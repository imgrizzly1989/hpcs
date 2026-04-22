import type { FaqEntry } from "@/types";

export type SeoModelPage = {
  slug: string;
  title: string;
  h1: string;
  description: string;
  brandSlug: string;
  modelSlug: string;
  intro: string;
  body: string[];
  topCategories: string[];
  faq: FaqEntry[];
  internalLinks: { label: string; href: string }[];
};

export const seoModels: SeoModelPage[] = [
  {
    slug: "mg-zs-maroc",
    title: "Pièces MG ZS au Maroc | Phare, pare-chocs, filtres",
    h1: "Pièces MG ZS au Maroc",
    description:
      "Pièces détachées MG ZS au Maroc : phares, pare-chocs, rétroviseurs, filtres, freinage et suspension. CHINAPAL à Casablanca, devis WhatsApp rapide et livraison nationale.",
    brandSlug: "mg",
    modelSlug: "zs",
    intro:
      "La MG ZS fait partie des SUV chinois les plus visibles sur les routes marocaines, ce qui crée une demande forte en pièces de carrosserie, filtration et entretien courant. Chez CHINAPAL, nous traitons chaque demande MG ZS avec une approche simple : confirmer la bonne version, vérifier la compatibilité selon l'année et la motorisation, puis proposer la référence adaptée sans perte de temps.",
    body: [
      "Pour une MG ZS au Maroc, les recherches les plus fréquentes concernent les phares avant, les pare-chocs, les rétroviseurs électriques, les filtres à huile et les plaquettes de frein. Nous savons que plusieurs variantes circulent entre les finitions, les phases et les équipements. C'est pourquoi notre équipe vérifie les détails utiles avant validation, notamment la position de la pièce, le côté gauche ou droit, ainsi que la plage d'années compatible.",
      "Notre service est basé à Casablanca et couvre tout le Maroc, aussi bien pour les particuliers que pour les garages. Vous pouvez nous envoyer la référence, une photo ou simplement la description de la pièce recherchée. CHINAPAL répond sur WhatsApp avec un accompagnement rapide, sans affichage de prix générique, afin d'éviter les erreurs de commande sur un véhicule aussi diffusé que le MG ZS. Si vous recherchez une pièce MG ZS fiable au Maroc, notre sélection vous permet d'accéder plus vite aux bonnes références, avec livraison nationale et suivi humain.",
    ],
    topCategories: ["carrosserie", "eclairage", "filtration", "freinage"],
    faq: [
      { q: "Comment vérifier une pièce pour MG ZS avant commande ?", a: "Envoyez l'année, la motorisation, une photo ou le VIN sur WhatsApp. CHINAPAL contrôle la compatibilité avant validation." },
      { q: "Quelles pièces MG ZS sont les plus demandées au Maroc ?", a: "Les phares, pare-chocs, rétroviseurs, filtres et plaquettes de frein font partie des demandes les plus fréquentes pour MG ZS." },
      { q: "Livrez-vous les pièces MG ZS hors Casablanca ?", a: "Oui, nous livrons à Casablanca, Rabat, Tanger, Fès, Marrakech, Agadir et partout au Maroc selon la destination." },
    ],
    internalLinks: [
      { label: "Phares MG ZS", href: "/recherche/phare-mg-zs-maroc" },
      { label: "Pare-chocs MG ZS", href: "/recherche/pare-chocs-mg-zs-maroc" },
      { label: "Filtres MG ZS", href: "/pieces/filtres-maroc" },
      { label: "Marque MG", href: "/marque/mg" },
    ],
  },
  {
    slug: "chery-tiggo-4-pro-maroc",
    title: "Pièces Chery Tiggo 4 Pro au Maroc | Carrosserie et entretien",
    h1: "Pièces Chery Tiggo 4 Pro au Maroc",
    description:
      "Pièces Chery Tiggo 4 Pro au Maroc : phare, pare-chocs, rétroviseur, filtre à huile, plaquettes de frein et plus. CHINAPAL Casablanca, livraison Maroc et assistance WhatsApp.",
    brandSlug: "chery",
    modelSlug: "tiggo-4-pro",
    intro:
      "La Chery Tiggo 4 Pro s'est rapidement imposée au Maroc sur le segment SUV compact. Cette diffusion augmente naturellement les besoins en pièces d'entretien et en pièces de carrosserie, surtout après choc léger ou entretien périodique. CHINAPAL accompagne les propriétaires de Tiggo 4 Pro avec une sélection ciblée sur les références réellement demandées sur le marché marocain.",
    body: [
      "Les demandes les plus courantes pour Chery Tiggo 4 Pro concernent les phares, les pare-chocs avant et arrière, les rétroviseurs, les filtres à huile et les plaquettes de frein. Sur ce modèle, une vérification sérieuse reste importante pour distinguer la bonne version selon l'année, la finition et parfois la motorisation. Nous validons donc la pièce à partir du modèle exact, d'une photo, du VIN ou de la référence disponible.",
      "Basée à Casablanca, l'équipe CHINAPAL travaille avec des particuliers comme avec des garages partout au Maroc. Notre objectif est d'éviter les commandes approximatives et d'accélérer la recherche de pièces Chery Tiggo 4 Pro compatibles. Vous gagnez du temps, vous limitez le risque d'erreur et vous bénéficiez d'un accompagnement WhatsApp rapide. Pour une pièce Chery Tiggo 4 Pro au Maroc, nous privilégions la compatibilité, la disponibilité et une logistique claire vers toutes les villes du Royaume.",
    ],
    topCategories: ["carrosserie", "eclairage", "filtration", "freinage"],
    faq: [
      { q: "CHINAPAL propose-t-il des pièces pour Tiggo 4 Pro récentes ?", a: "Oui, nous traitons les demandes pour les versions récentes de Chery Tiggo 4 Pro en vérifiant systématiquement l'année et la configuration." },
      { q: "Puis-je commander une pièce carrosserie Tiggo 4 Pro à distance ?", a: "Oui. Envoyez la photo de la pièce ou du véhicule, et nous confirmons la bonne référence avant expédition au Maroc." },
      { q: "Le service est-il réservé aux garages ?", a: "Non. CHINAPAL sert aussi bien les particuliers que les ateliers et professionnels de l'automobile." },
    ],
    internalLinks: [
      { label: "Phare Tiggo 4 Pro", href: "/recherche/phare-chery-tiggo-4-pro-maroc" },
      { label: "Rétroviseur Tiggo 4 Pro", href: "/recherche/retroviseur-chery-tiggo-4-pro-maroc" },
      { label: "Pièces Chery", href: "/marque/chery" },
      { label: "Freinage Maroc", href: "/pieces/freinage-maroc" },
    ],
  },
  {
    slug: "chery-tiggo-7-pro-maroc",
    title: "Pièces Chery Tiggo 7 Pro au Maroc | SUV chinois",
    h1: "Pièces Chery Tiggo 7 Pro au Maroc",
    description:
      "Pièces Chery Tiggo 7 Pro au Maroc : phares, pare-chocs, rétroviseurs, filtres et freinage. Assistance CHINAPAL à Casablanca, livraison partout au Maroc.",
    brandSlug: "chery",
    modelSlug: "tiggo-7-pro",
    intro:
      "Le Chery Tiggo 7 Pro attire de plus en plus de conducteurs marocains à la recherche d'un SUV bien équipé. Avec cette montée en parc, la demande en pièces compatibles devient plus stratégique, notamment pour la carrosserie, l'éclairage et l'entretien périodique. CHINAPAL a structuré une offre orientée terrain pour répondre rapidement aux recherches autour du Tiggo 7 Pro au Maroc.",
    body: [
      "Sur Chery Tiggo 7 Pro, les besoins récurrents portent sur les optiques avant, les pare-chocs, les éléments de rétroviseur, la filtration et les composants de freinage. Selon les versions et les millésimes, certaines références peuvent varier. Nous demandons donc les informations utiles avant confirmation : année, motorisation, photo de la pièce démontée ou numéro VIN lorsqu'il est disponible.",
      "Notre valeur ajoutée ne se limite pas au catalogue. Depuis Casablanca, nous accompagnons les particuliers, les garages et les revendeurs partout au Maroc avec un traitement rapide sur WhatsApp. Vous obtenez une réponse claire, une vérification de compatibilité et une orientation vers la bonne catégorie si la pièce recherchée n'est pas immédiatement visible. Pour trouver une pièce Chery Tiggo 7 Pro au Maroc sans perdre de temps, CHINAPAL mise sur une sélection ciblée, une vérification humaine et une expédition nationale sécurisée.",
    ],
    topCategories: ["carrosserie", "eclairage", "filtration", "freinage"],
    faq: [
      { q: "Avez-vous des pièces d'entretien pour Chery Tiggo 7 Pro ?", a: "Oui, notamment des filtres, des pièces de freinage et d'autres références demandées pour l'entretien courant du Tiggo 7 Pro." },
      { q: "Comment éviter une erreur de référence sur Tiggo 7 Pro ?", a: "Le plus simple est d'envoyer une photo, l'année ou le VIN. Nous vérifions la compatibilité avant toute validation." },
      { q: "Livrez-vous les pièces Chery Tiggo 7 Pro partout au Maroc ?", a: "Oui, CHINAPAL expédie vers les principales villes et dans tout le Royaume selon la destination." },
    ],
    internalLinks: [
      { label: "Pièces Chery", href: "/marque/chery" },
      { label: "Catégorie Filtration", href: "/categorie/filtration" },
      { label: "Catégorie Carrosserie", href: "/categorie/carrosserie" },
      { label: "Marque Chery", href: "/marque/chery" },
    ],
  },
  {
    slug: "geely-coolray-maroc",
    title: "Pièces Geely Coolray au Maroc | CHINAPAL Casablanca",
    h1: "Pièces Geely Coolray au Maroc",
    description:
      "Pièces Geely Coolray au Maroc : phare, pare-chocs, filtre à huile, plaquettes de frein, rétroviseur et plus. CHINAPAL Casablanca, livraison Maroc, support WhatsApp.",
    brandSlug: "geely",
    modelSlug: "coolray",
    intro:
      "Le Geely Coolray est un SUV urbain très recherché au Maroc, et les demandes de pièces suivent la même progression. Pour ce modèle, la rapidité de réponse et la justesse de compatibilité sont essentielles, surtout en carrosserie et entretien. CHINAPAL centralise les recherches Geely Coolray avec une logique orientée résultats : identifier vite la bonne pièce et éviter les références approximatives.",
    body: [
      "Parmi les recherches les plus fréquentes sur Geely Coolray, on retrouve les phares, les pare-chocs, les rétroviseurs, les filtres à huile et les plaquettes de frein. Certaines pièces visuelles peuvent sembler proches d'une version à l'autre alors que la référence diffère. Notre équipe vérifie donc le modèle, l'année et la pièce précise recherchée avant de confirmer la disponibilité. Cette méthode réduit les erreurs et accélère le traitement.",
      "CHINAPAL opère depuis Casablanca et livre partout au Maroc, avec un service conçu pour les particuliers, les ateliers et les professionnels. Vous pouvez démarrer votre demande avec une simple photo, une référence ou le nom du modèle. Nous vous guidons ensuite vers la bonne page produit ou vers une recherche plus ciblée. Pour les propriétaires de Geely Coolray au Maroc, cette page regroupe les accès les plus utiles pour trouver des pièces compatibles avec un accompagnement humain et une réponse rapide sur WhatsApp.",
    ],
    topCategories: ["carrosserie", "eclairage", "filtration", "freinage"],
    faq: [
      { q: "Quels types de pièces Coolray sont les plus demandés ?", a: "Les phares, pare-chocs, rétroviseurs, filtres et pièces de freinage sont parmi les recherches les plus fréquentes pour Geely Coolray." },
      { q: "CHINAPAL vérifie-t-il la compatibilité pour Coolray ?", a: "Oui, nous vérifions la compatibilité à partir de l'année, de la référence, d'une photo ou du VIN quand il est disponible." },
      { q: "Puis-je demander un devis sur WhatsApp ?", a: "Oui, WhatsApp reste le canal prioritaire pour obtenir une réponse rapide et une validation avant commande." },
    ],
    internalLinks: [
      { label: "Phare Geely Coolray", href: "/recherche/phare-geely-coolray-maroc" },
      { label: "Pare-chocs Geely Coolray", href: "/recherche/pare-chocs-geely-coolray-maroc" },
      { label: "Pièces Geely", href: "/marque/geely" },
      { label: "Filtres Maroc", href: "/pieces/filtres-maroc" },
    ],
  },
  {
    slug: "geely-gx3-pro-maroc",
    title: "Pièces Geely GX3 Pro au Maroc | Entretien et carrosserie",
    h1: "Pièces Geely GX3 Pro au Maroc",
    description:
      "Pièces Geely GX3 Pro au Maroc : phares, filtration, freinage, carrosserie et rétroviseurs. CHINAPAL Casablanca, vérification compatibilité et livraison Maroc.",
    brandSlug: "geely",
    modelSlug: "gx3-pro",
    intro:
      "Le Geely GX3 Pro occupe une place intéressante sur le marché marocain des SUV compacts. Les propriétaires recherchent surtout des pièces d'entretien et des éléments de carrosserie capables de respecter la configuration exacte du véhicule. CHINAPAL a donc structuré un parcours simple pour faciliter les recherches de pièces Geely GX3 Pro au Maroc, avec vérification humaine à chaque étape utile.",
    body: [
      "Les demandes les plus fréquentes pour Geely GX3 Pro concernent les phares, les pare-chocs, les rétroviseurs, les filtres à huile et les plaquettes de frein. Pour ce modèle, il est important de confirmer la bonne pièce selon le millésime et la version. Une photo, le numéro de châssis ou la référence d'origine nous permettent d'aller plus vite et de limiter tout risque d'erreur au moment de la préparation.",
      "Depuis Casablanca, CHINAPAL sert une clientèle de particuliers et de garages dans tout le Maroc. Notre approche privilégie la compatibilité réelle, sans afficher de prix standardisés qui peuvent induire en erreur selon la version recherchée. Vous obtenez un accompagnement réactif, des liens vers les catégories importantes et une orientation directe vers les recherches les plus demandées. Si vous cherchez une pièce Geely GX3 Pro au Maroc, cette page vous aide à accéder rapidement aux références les plus pertinentes.",
    ],
    topCategories: ["carrosserie", "eclairage", "filtration", "freinage"],
    faq: [
      { q: "Puis-je commander une pièce Geely GX3 Pro depuis une autre ville ?", a: "Oui, CHINAPAL livre partout au Maroc avec suivi et validation préalable de la compatibilité." },
      { q: "Quelles informations faut-il envoyer pour GX3 Pro ?", a: "L'année, la motorisation, une photo de la pièce ou le VIN sont les informations les plus utiles pour confirmer la référence." },
      { q: "Travaillez-vous avec les garages ?", a: "Oui, nous accompagnons les particuliers et les garages pour les demandes ponctuelles ou régulières sur Geely GX3 Pro." },
    ],
    internalLinks: [
      { label: "Freinage GX3 Pro", href: "/pieces/freinage-maroc" },
      { label: "Pièces Geely", href: "/marque/geely" },
      { label: "Catégorie Éclairage", href: "/categorie/eclairage" },
      { label: "Catégorie Filtration", href: "/categorie/filtration" },
    ],
  },
  {
    slug: "haval-h6-maroc",
    title: "Pièces Haval H6 au Maroc | CHINAPAL pièces SUV chinois",
    h1: "Pièces Haval H6 au Maroc",
    description:
      "Pièces Haval H6 au Maroc : phares, pare-chocs, filtres, plaquettes de frein, rétroviseurs et plus. CHINAPAL Casablanca, livraison Maroc et devis WhatsApp.",
    brandSlug: "haval",
    modelSlug: "h6",
    intro:
      "Le Haval H6 est l'un des SUV chinois les plus connus au Maroc, avec un parc qui génère des besoins croissants en pièces d'entretien et de carrosserie. Pour ce modèle, la bonne référence dépend souvent du millésime, de la finition et parfois de détails visuels précis. CHINAPAL répond à cette réalité avec un accompagnement centré sur la compatibilité et la réactivité.",
    body: [
      "Les recherches Haval H6 les plus fréquentes portent sur les phares avant, les pare-chocs, les rétroviseurs, les filtres à huile et les plaquettes de frein. À cela s'ajoutent d'autres éléments de suspension, d'éclairage et de filtration selon l'usage du véhicule. Notre équipe vérifie la pièce recherchée à partir du modèle, de la photo, de l'année ou du VIN afin de confirmer la bonne version avant envoi.",
      "Installé à Casablanca, CHINAPAL traite des demandes pour particuliers, garages et revendeurs dans tout le Maroc. Nous ne mettons pas en avant des prix standardisés car la priorité reste la justesse de la pièce. Vous bénéficiez ainsi d'une validation sérieuse, d'un échange rapide sur WhatsApp et d'une livraison nationale. Pour trouver une pièce Haval H6 au Maroc dans de bonnes conditions, cette page regroupe les catégories et recherches à fort potentiel, avec des liens directs vers les références les plus demandées.",
    ],
    topCategories: ["carrosserie", "eclairage", "filtration", "freinage"],
    faq: [
      { q: "CHINAPAL traite-t-il les demandes Haval H6 anciennes et récentes ?", a: "Oui, nous vérifions la compatibilité en fonction de l'année et de la version pour les différentes demandes Haval H6." },
      { q: "Comment demander un phare ou un pare-chocs Haval H6 ?", a: "Envoyez la pièce souhaitée, une photo du véhicule ou la référence disponible sur WhatsApp pour validation rapide." },
      { q: "L'expédition est-elle possible hors Casablanca ?", a: "Oui, CHINAPAL livre dans tout le Maroc avec un service adapté aux pièces fragiles et encombrantes." },
    ],
    internalLinks: [
      { label: "Phare Haval H6", href: "/recherche/phare-haval-h6-maroc" },
      { label: "Filtre à huile Haval H6", href: "/recherche/filtre-huile-haval-h6-maroc" },
      { label: "Pièces Haval", href: "/marque/haval" },
      { label: "Carrosserie Maroc", href: "/pieces/pare-choc-maroc" },
    ],
  },
  {
    slug: "haval-jolion-maroc",
    title: "Pièces Haval Jolion au Maroc | SUV Haval Casablanca",
    h1: "Pièces Haval Jolion au Maroc",
    description:
      "Pièces Haval Jolion au Maroc : phares, pare-chocs, filtres, plaquettes, rétroviseurs. CHINAPAL Casablanca, support WhatsApp et livraison partout au Maroc.",
    brandSlug: "haval",
    modelSlug: "jolion",
    intro:
      "Le Haval Jolion gagne rapidement du terrain au Maroc, ce qui entraîne une hausse des recherches en pièces compatibles pour entretien, freinage et carrosserie. Sur un modèle récent comme celui-ci, il est important d'identifier la bonne référence dès le départ. CHINAPAL facilite cette recherche avec une sélection dédiée et un accompagnement réactif depuis Casablanca.",
    body: [
      "Pour Haval Jolion, les demandes récurrentes concernent les phares avant, les pare-chocs, les rétroviseurs extérieurs, les filtres à huile et les plaquettes de frein. D'autres références comme les filtres habitacle ou les pièces de suspension sont également très demandées selon le kilométrage et l'usage. Nous confirmons la compatibilité à partir du modèle exact, de l'année, d'une photo ou du VIN afin de réduire les erreurs de commande.",
      "CHINAPAL travaille avec des particuliers et des garages partout au Maroc. Notre priorité n'est pas d'afficher un prix générique, mais de proposer la bonne pièce Haval Jolion avec une validation fiable. Vous pouvez commencer votre demande sur WhatsApp et recevoir rapidement une orientation vers la bonne référence ou la bonne catégorie. Cette page a été pensée pour capter les recherches à forte intention d'achat autour du Haval Jolion au Maroc et les transformer en demandes qualifiées, simples à traiter.",
    ],
    topCategories: ["carrosserie", "eclairage", "filtration", "freinage"],
    faq: [
      { q: "Quelles pièces Haval Jolion sont les plus recherchées ?", a: "Les phares, pare-chocs, rétroviseurs, filtres et plaquettes de frein sont parmi les demandes les plus fréquentes." },
      { q: "WhatsApp est-il le canal le plus rapide ?", a: "Oui, WhatsApp est prioritaire chez CHINAPAL pour confirmer la pièce, la compatibilité et la disponibilité." },
      { q: "Livrez-vous aux garages au Maroc ?", a: "Oui, nous servons aussi les garages et ateliers qui recherchent des pièces Haval Jolion compatibles et fiables." },
    ],
    internalLinks: [
      { label: "Pièces Haval", href: "/marque/haval" },
      { label: "Catégorie Carrosserie", href: "/categorie/carrosserie" },
      { label: "Marque Haval", href: "/marque/haval" },
      { label: "Catégorie Filtration", href: "/categorie/filtration" },
    ],
  },
  {
    slug: "byd-atto-3-maroc",
    title: "Pièces BYD Atto 3 au Maroc | CHINAPAL Casablanca",
    h1: "Pièces BYD Atto 3 au Maroc",
    description:
      "Pièces BYD Atto 3 au Maroc : phare, pare-chocs, rétroviseur, filtre habitacle, suspension et freinage. CHINAPAL Casablanca, service WhatsApp et livraison nationale.",
    brandSlug: "byd",
    modelSlug: "atto-3",
    intro:
      "Le BYD Atto 3 représente la montée en puissance des véhicules chinois électrifiés au Maroc. Ce type de modèle exige une approche encore plus rigoureuse sur la compatibilité, notamment pour la carrosserie, l'éclairage, l'habitacle et certains composants de suspension. CHINAPAL accompagne ces demandes avec un service spécialisé sur les véhicules chinois, sans dilution sur d'autres segments.",
    body: [
      "Pour BYD Atto 3, les recherches les plus pertinentes concernent les phares, les pare-chocs, les rétroviseurs, le filtre d'habitacle, la suspension et les pièces de freinage. Même lorsque la pièce semble standard, une vérification reste utile selon l'année, la finition et la configuration du véhicule. Nous validons chaque demande à partir d'informations concrètes : photo, année, référence existante ou VIN si le client peut le partager.",
      "Depuis Casablanca, CHINAPAL traite des demandes BYD Atto 3 provenant de tout le Maroc. Notre accompagnement s'adresse aux particuliers, aux garages et aux ateliers qui veulent limiter les erreurs et gagner du temps. Vous pouvez envoyer votre demande sur WhatsApp et recevoir une réponse orientée compatibilité plutôt qu'une simple estimation approximative. Cette page regroupe les liens les plus utiles pour trouver une pièce BYD Atto 3 au Maroc, avec une logique de recherche claire, une validation humaine et une livraison nationale organisée.",
    ],
    topCategories: ["carrosserie", "eclairage", "filtration", "suspension", "freinage"],
    faq: [
      { q: "CHINAPAL traite-t-il les pièces BYD Atto 3 au Maroc ?", a: "Oui, nous traitons les demandes les plus fréquentes autour du BYD Atto 3 avec vérification préalable de la compatibilité." },
      { q: "Quelles pièces Atto 3 sont souvent demandées ?", a: "Les phares, pare-chocs, rétroviseurs, filtres habitacle, pièces de suspension et composants de freinage reviennent souvent." },
      { q: "Comment envoyer une demande de pièce BYD ?", a: "Le plus rapide est de nous écrire sur WhatsApp avec la pièce recherchée, l'année et une photo si possible." },
    ],
    internalLinks: [
      { label: "Phare BYD Atto 3", href: "/recherche/phare-byd-atto-3-maroc" },
      { label: "Suspension BYD Atto 3", href: "/recherche/suspension-byd-atto-3-maroc" },
      { label: "Pièces BYD", href: "/marque/byd" },
      { label: "Catégorie Suspension", href: "/categorie/suspension" },
    ],
  },
  {
    slug: "jac-js4-maroc",
    title: "Pièces JAC JS4 au Maroc | JAC SUV CHINAPAL",
    h1: "Pièces JAC JS4 au Maroc",
    description:
      "Pièces JAC JS4 au Maroc : phares, pare-chocs, filtre à huile, plaquettes de frein et plus. CHINAPAL Casablanca, livraison Maroc et assistance rapide sur WhatsApp.",
    brandSlug: "jac",
    modelSlug: "js4",
    intro:
      "Le JAC JS4 fait partie des SUV chinois qui génèrent de plus en plus de recherches au Maroc, surtout pour la carrosserie, la filtration et le freinage. Sur ce type de véhicule, il est essentiel d'obtenir la bonne pièce dès le premier échange. CHINAPAL a donc mis en place une page dédiée JAC JS4 pour centraliser les recherches à forte intention et faciliter la vérification avant commande.",
    body: [
      "Les demandes les plus fréquentes pour JAC JS4 portent sur les phares, les pare-chocs, le filtre à huile et les plaquettes de frein. Les rétroviseurs, filtres habitacle et certaines pièces de suspension peuvent aussi être recherchés selon l'utilisation du véhicule. Nous vérifions la compatibilité à partir du modèle, de l'année, d'une photo ou du numéro VIN afin d'éviter les confusions entre références proches.",
      "CHINAPAL est basé à Casablanca et livre dans tout le Maroc avec un service pensé pour les particuliers et les garages. Nous privilégions la précision de la pièce et la qualité de l'échange plutôt qu'un affichage automatique de prix. Résultat : une demande mieux qualifiée, un traitement plus rapide et moins d'erreurs à la réception. Si vous cherchez une pièce JAC JS4 au Maroc, cette page vous donne un accès direct aux recherches les plus utiles et aux catégories les plus pertinentes pour votre besoin.",
    ],
    topCategories: ["carrosserie", "eclairage", "filtration", "freinage"],
    faq: [
      { q: "Avez-vous des pièces de carrosserie JAC JS4 ?", a: "Oui, nous traitons notamment les demandes de phares, pare-chocs et autres pièces de carrosserie selon disponibilité et version." },
      { q: "Puis-je demander un filtre ou des plaquettes pour JS4 ?", a: "Oui, les pièces d'entretien comme les filtres et les plaquettes font partie des demandes que nous gérons régulièrement." },
      { q: "Le service CHINAPAL couvre-t-il tout le Maroc ?", a: "Oui, nous sommes basés à Casablanca mais nous livrons à l'échelle nationale." },
    ],
    internalLinks: [
      { label: "Phare JAC JS4", href: "/recherche/phare-jac-js4-maroc" },
      { label: "Plaquettes JAC JS4", href: "/recherche/plaquettes-frein-jac-js4-maroc" },
      { label: "Pièces JAC", href: "/marque/jac" },
      { label: "Filtres Maroc", href: "/pieces/filtres-maroc" },
    ],
  },
  {
    slug: "jetour-x70-maroc",
    title: "Pièces Jetour X70 au Maroc | SUV Jetour CHINAPAL",
    h1: "Pièces Jetour X70 au Maroc",
    description:
      "Pièces Jetour X70 au Maroc : phare, carrosserie, filtration, freinage et pièces compatibles. CHINAPAL Casablanca, livraison Maroc et devis WhatsApp rapide.",
    brandSlug: "jetour",
    modelSlug: "x70",
    intro:
      "Le Jetour X70 est un SUV familial qui suscite un intérêt croissant au Maroc, avec des besoins concrets en pièces de carrosserie et en entretien courant. Comme pour d'autres modèles chinois récents, il faut éviter les approximations et confirmer la bonne référence avant commande. CHINAPAL aide les propriétaires de Jetour X70 à trouver plus vite des pièces compatibles grâce à un parcours simple et orienté conversion.",
    body: [
      "Sur Jetour X70, les recherches concernent souvent les phares, les pare-chocs, les filtres à huile, les filtres habitacle et les pièces de freinage. Les véhicules de cette famille peuvent présenter des différences selon les versions et les années, ce qui justifie une validation sérieuse. Notre équipe contrôle les informations disponibles avant expédition pour proposer une référence adaptée au besoin réel du client.",
      "Basée à Casablanca, CHINAPAL sert tout le Maroc et travaille avec les particuliers comme avec les garages. Le canal WhatsApp permet d'accélérer la vérification, surtout lorsqu'il faut confirmer un côté, une position ou une version visuelle. Cette page Jetour X70 a été construite pour capter les recherches les plus qualifiées autour du modèle et guider l'utilisateur vers les catégories et pages SEO les plus utiles. Vous gagnez ainsi du temps dans la recherche et sécurisez davantage votre demande de pièce Jetour X70 au Maroc.",
    ],
    topCategories: ["carrosserie", "eclairage", "filtration", "freinage"],
    faq: [
      { q: "CHINAPAL propose-t-il des pièces pour Jetour X70 ?", a: "Oui, nous gérons les demandes les plus courantes autour du Jetour X70 avec validation de compatibilité avant confirmation." },
      { q: "Comment trouver un phare Jetour X70 au Maroc ?", a: "Vous pouvez passer par la page dédiée ou nous écrire sur WhatsApp avec une photo et les détails du véhicule." },
      { q: "Livrez-vous les pièces Jetour hors Casablanca ?", a: "Oui, CHINAPAL expédie les pièces Jetour X70 partout au Maroc selon la destination et le format du colis." },
    ],
    internalLinks: [
      { label: "Phare Jetour X70", href: "/recherche/phare-jetour-x70-maroc" },
      { label: "Pièces Jetour", href: "/marque/jetour" },
      { label: "Pièces de freinage", href: "/pieces/freinage-maroc" },
      { label: "Catégorie Carrosserie", href: "/categorie/carrosserie" },
    ],
  },
];

export const getSeoModel = (slug: string) => seoModels.find((item) => item.slug === slug);

export const getSeoModelByVehicle = (brandSlug: string, modelSlug: string) =>
  seoModels.find((item) => item.brandSlug === brandSlug && item.modelSlug === modelSlug);

export const getSeoModelsForBrand = (brandSlug: string) =>
  seoModels.filter((item) => item.brandSlug === brandSlug);

export const getSeoModelsForCategory = (categorySlug: string) =>
  seoModels.filter((item) => item.topCategories.includes(categorySlug));
