# HPCS — Hamza Parts & Components Supply

Frontend ecommerce **Next.js 14 (App Router) + TypeScript + Tailwind CSS** pour HPCS, spécialiste marocain des **pièces détachées pour voitures chinoises** (Chery, Geely, MG, Haval, BYD, DFSK, Great Wall, JAC, BAIC, Dongfeng, Jetour, FAW).

Taglines : *Vos pièces pour voitures chinoises au Maroc — Pièces fiables pour marques chinoises — Votre spécialiste des pièces automobiles chinoises.*

## Quickstart

```bash
cp .env.example .env.local
npm install
npm run dev
# http://localhost:3000
```

Build prod :
```bash
npm run build && npm start
```

## Variables d'environnement

Voir `.env.example` :
- `NEXT_PUBLIC_WHATSAPP_NUMBER` — numéro WhatsApp (format international sans +), utilisé par le FAB et les CTA.
- `NEXT_PUBLIC_SITE_URL` — URL canonique pour SEO / sitemap / JSON-LD.

## Stack

- Next.js 14.2 (App Router) · React 18 · TypeScript 5 (strict)
- Tailwind CSS 3.4 · lucide-react · clsx · tailwind-merge
- zustand (+ persist localStorage) pour panier et favoris
- react-hot-toast pour les notifications
- Polices : Inter + Space Grotesk (next/font/google)
- Aucune dépendance payante, aucun backend/base de données

## Structure

```
src/
  app/              # App Router — toutes les pages
    page.tsx, layout.tsx, globals.css
    boutique/, categorie/[slug]/, marque/[slug]/,
    vehicule/, produit/[slug]/, panier/, checkout/,
    connexion/, inscription/, compte/, favoris/,
    faq/, contact/, a-propos/, livraison-retours/,
    confidentialite/, conditions/, not-found.tsx,
    sitemap.ts, robots.ts
  components/
    layout/  (Header, Footer, MobileBottomNav, WhatsAppFAB)
    home/    (Hero, VehicleSelector, BrandsGrid, CategoriesGrid,
              FeaturedProducts, WhyHPCS, FAQSection, Newsletter)
    product/ (ProductCard, ProductGallery, ProductSpecs,
              RelatedProducts, AddToCartButton, WhatsAppOrderButton)
    shop/    (ShopClient, ProductGrid)
    ui/      (Button, Input, Select, Badge, Card, Breadcrumb,
              PriceTag, ToastProvider)
  lib/       (cn, format MAD, whatsapp link builder, seo helpers + JSON-LD)
  store/     (cartStore, favoritesStore — zustand persist)
  data/      (brands, categories, vehicles, products, faq)
  types/     (toutes les interfaces)
  locales/   (fr.json actif, ar.json stub)
public/
  favicon.svg
  images/placeholders/  (SVG par catégorie)
  images/brands/        (wordmarks SVG par marque)
```

## Fonctionnalités clés

- **Sélecteur véhicule** cascadant (Marque → Modèle → Année → Moteur) sur l'accueil et `/vehicule` ; filtrage réel sur la table `compatibleVehicles` des produits.
- **Boutique** `/boutique` : sidebar filtres (marques, catégories, prix, stock), tri (pertinence / prix / nouveautés), drawer mobile.
- **Fiche produit** : galerie, prix MAD, disponibilité, specs, tableau de compatibilité véhicules, Add-to-cart + WhatsApp, produits similaires, JSON-LD Product + Breadcrumb.
- **Panier** : zustand persist localStorage, quantités +/-, suppression, récapitulatif.
- **Favoris** : icône cœur persistée, page `/favoris` et onglet dans `/compte`.
- **Checkout** : formulaire complet, modes de paiement (COD actif, Carte désactivé, WhatsApp qui ouvre wa.me avec récap pré-rempli), toast de confirmation + redirection.
- **Auth mock** : `/connexion` + `/inscription` → toast + redirect `/compte`.
- **WhatsApp FAB** flottant (z-50) + boutons sur chaque produit ; messages pré-remplis en français avec référence.
- **Bottom nav mobile** 4 entrées (Accueil, Favoris, Panier, Compte), état actif rouge HPCS, cachée en md+.
- **FAQ** avec accordéon + JSON-LD FAQPage.
- **SEO** : metadata par page, sitemap.ts (statique + produits + marques + catégories), robots.ts, JSON-LD Product / FAQPage / BreadcrumbList.
- **Accessible** : focus-visible ring rouge, aria-labels sur boutons-icône, alt sur images.

## Données de démo — à remplacer avant production

- **Images produits** : SVG placeholders brandés HPCS par catégorie (`/public/images/placeholders/*.svg`). Remplacer par de vraies photos produit.
- **Références OEM** : toutes au format `HPCS-XXXXX-NN` — **placeholders**, à remplacer par les vraies références constructeur.
- **Wordmarks marques** : SVG générés (texte stylisé), **pas les vrais logos**. Les logos officiels Chery, Geely, MG, etc. sont protégés — à obtenir sous licence/droit avant mise en production.
- **Prix / stocks** : valeurs démo réalistes mais non commerciales.

## i18n

- `fr-MA` actif (toutes les chaînes UI dans `src/locales/fr.json`).
- `ar.json` stub prêt (mêmes clés, valeurs vides) pour activation arabe + RTL ultérieure.
- Structure compatible migration `next-intl` si besoin.

## Roadmap

- Backend : PostgreSQL + Prisma, API routes Next.js (`/api/*`) ou tRPC.
- Admin CMS : import catalogue, gestion stocks, commandes.
- Paiement : Stripe (international) + CMI (cartes marocaines).
- Auth réelle : NextAuth + JWT, OTP SMS via provider local.
- Stock temps réel + notifications de disponibilité.
- Import catalogue OEM massif (CSV / Excel).
- RTL + arabe complet.
- Tests E2E Playwright, unit tests Vitest.

## Déploiement

Compatible Vercel en 1 clic : importer le repo, ajouter les variables d'env, deploy.

```bash
npm run build  # build prod, doit passer sans erreur
```

---

© HPCS — Hamza Parts & Components Supply. Construit au Maroc 🇲🇦
