import Link from "next/link";
import { seoCategories } from "@/data/seoCategories";
import { seoPartModels } from "@/data/seoPartModels";

const processLinks = [
  { label: "Vérification VIN avant commande", href: "/verification-vin" },
  { label: "Pièces pour garages et carrosseries", href: "/garages-carrosseries" },
];

export function SeoLinks() {
  const priorityPartModels = seoPartModels.slice(0, 16);

  return (
    <section className="py-12 md:py-16 bg-neutral-50/70 border-y border-neutral-200">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-red">RECHERCHES POPULAIRES</p>
        <h2 className="mt-2 font-display text-2xl md:text-3xl font-bold tracking-tight text-brand-charcoal">
          Catégories et pièces de voitures chinoises les plus recherchées au Maroc
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-neutral-600">
          Accès direct aux pages SEO à forte intention : carrosserie, phares, filtres, freinage, recherches par modèle et pages de confiance pour vérifier la compatibilité avant devis WhatsApp.
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          {seoCategories.map((item) => (
            <Link
              key={item.slug}
              href={`/pieces/${item.slug}`}
              className="rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm font-medium text-brand-charcoal hover:border-brand-red hover:text-brand-red"
            >
              {item.h1}
            </Link>
          ))}
        </div>
        <h3 className="mt-7 text-sm font-bold uppercase tracking-widest text-neutral-500">Demandes pièce + modèle</h3>
        <div className="mt-3 flex flex-wrap gap-2">
          {priorityPartModels.map((item) => (
            <Link
              key={item.slug}
              href={`/recherche/${item.slug}`}
              className="rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm font-medium text-brand-charcoal hover:border-brand-red hover:text-brand-red"
            >
              {item.h1}
            </Link>
          ))}
        </div>
        <h3 className="mt-7 text-sm font-bold uppercase tracking-widest text-neutral-500">Confiance et sourcing</h3>
        <div className="mt-3 flex flex-wrap gap-2">
          {processLinks.map((item) => (
            <Link key={item.href} href={item.href} className="rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm font-medium text-brand-charcoal hover:border-brand-red hover:text-brand-red">
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
