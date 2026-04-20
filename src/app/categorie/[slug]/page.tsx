import Link from "next/link";
import * as Icons from "lucide-react";
import { MessageCircle } from "lucide-react";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { ShopClient } from "@/components/shop/ShopClient";
import { getCategory, categories, carrosserieSubcategories } from "@/data/categories";
import { brands } from "@/data/brands";
import { products } from "@/data/products";
import { buildMetadata } from "@/lib/seo";
import { buildWhatsAppLink } from "@/lib/whatsapp";

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const cat = getCategory(params.slug);
  if (!cat) return buildMetadata({ title: "Catégorie" });
  if (cat.slug === "carrosserie") {
    return buildMetadata({
      title: "Pièces de carrosserie pour voitures chinoises au Maroc",
      description:
        "Pare-chocs, phares, rétroviseurs, calandres, ailes, portes, essuie-glaces pour Chery, MG, Geely, Haval, Changan. Devis WhatsApp, livraison 24-72h.",
      path: "/categorie/carrosserie",
    });
  }
  return buildMetadata({
    title: `${cat.name} — Pièces pour voitures chinoises`,
    description: `${cat.description} Devis WhatsApp, livraison 24-72h partout au Maroc.`,
    path: `/categorie/${cat.slug}`,
  });
}

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const cat = getCategory(params.slug);
  if (!cat) notFound();
  const list = products.filter((p) => p.category === cat.slug);
  const brandsAvailable = Array.from(new Set(list.flatMap((p) => p.compatibleVehicles.map((v) => v.brandSlug))));

  if (cat.slug === "carrosserie") {
    const subCounts: Record<string, number> = {};
    for (const p of list) {
      if (!p.subcategory) continue;
      subCounts[p.subcategory] = (subCounts[p.subcategory] || 0) + 1;
    }
    return (
      <div className="mx-auto max-w-7xl px-4 md:px-6 py-8 md:py-12">
        <Breadcrumb items={[{ label: "Accueil", href: "/" }, { label: "Catégories" }, { label: "Carrosserie" }]} />

        {/* Hero */}
        <section className="mt-4 rounded-3xl bg-gradient-to-br from-brand-charcoal via-neutral-900 to-brand-charcoal p-8 md:p-12 text-white">
          <p className="text-xs font-bold uppercase tracking-widest text-brand-red">CARROSSERIE</p>
          <h1 className="mt-2 font-display text-3xl md:text-5xl font-bold tracking-tight">
            Pièces de carrosserie pour voitures chinoises au Maroc
          </h1>
          <p className="mt-4 max-w-3xl text-neutral-300 leading-relaxed">
            Pare-chocs, phares, rétroviseurs, calandres, ailes, capots, portes, essuie-glaces et vitrages —
            plus de {list.length} références pour Chery, MG, Geely, Haval, Changan et les autres marques chinoises.
            Compatibilité vérifiée par VIN, garantie HPCS.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={buildWhatsAppLink({ message: "Bonjour HPCS, je cherche une pièce de carrosserie." })}
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-[#25D366] px-5 py-3 font-bold hover:bg-[#1ebe57]"
            >
              <MessageCircle className="h-5 w-5" /> Demander sur WhatsApp
            </a>
            <Link href="/vehicule" className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-5 py-3 font-bold text-white hover:bg-white/20">
              Choisir ma voiture
            </Link>
          </div>
        </section>

        {/* Subcategory tiles */}
        <section className="mt-12">
          <h2 className="font-display text-2xl md:text-3xl font-bold tracking-tight text-brand-charcoal">Sous-catégories</h2>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {carrosserieSubcategories.map((s) => {
              const iconKey = {
                "pare-chocs": "Car", "phares-feux": "Lightbulb", "retroviseurs": "Aperture",
                "calandre": "Grid3x3", "tolerie": "LayoutTemplate", "garnitures": "Package",
                "essuie-glaces": "CloudRain",
              }[s.slug] || "Package";
              const Icon = (Icons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[iconKey] ?? Icons.Package;
              return (
                <Link
                  key={s.slug}
                  href={`/categorie/carrosserie/${s.slug}`}
                  className="group flex flex-col gap-3 rounded-2xl border border-neutral-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-brand-red hover:shadow-xl"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-brand-red transition group-hover:bg-brand-red group-hover:text-white">
                    <Icon className="h-6 w-6" />
                  </span>
                  <div>
                    <p className="font-semibold text-brand-charcoal">{s.name}</p>
                    <p className="mt-1 text-xs text-neutral-500">{subCounts[s.slug] || 0} références</p>
                    <p className="mt-2 text-xs font-semibold text-brand-red">Voir →</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Trust strip */}
        <section className="mt-10 grid gap-3 sm:grid-cols-3">
          <div className="rounded-2xl border border-neutral-200 bg-white p-4 text-sm">
            <p className="font-bold text-brand-charcoal">Compatibilité VIN</p>
            <p className="mt-1 text-neutral-600">Chaque pièce est vérifiée avec votre numéro de châssis avant envoi.</p>
          </div>
          <div className="rounded-2xl border border-neutral-200 bg-white p-4 text-sm">
            <p className="font-bold text-brand-charcoal">Livraison 24-72h</p>
            <p className="mt-1 text-neutral-600">Emballage renforcé pour les pièces de carrosserie fragiles.</p>
          </div>
          <div className="rounded-2xl border border-neutral-200 bg-white p-4 text-sm">
            <p className="font-bold text-brand-charcoal">Retour garanti</p>
            <p className="mt-1 text-neutral-600">Si la pièce n&apos;est pas compatible, remboursement ou échange immédiat.</p>
          </div>
        </section>

        {/* Shop grid filtered on carrosserie */}
        <section className="mt-12">
          <h2 className="font-display text-2xl md:text-3xl font-bold tracking-tight text-brand-charcoal">Toutes les pièces carrosserie</h2>
          <div className="mt-6">
            <ShopClient baseProducts={list} initialCategory="carrosserie" />
          </div>
        </section>

        {/* Big WA CTA banner */}
        <section className="mt-16 rounded-3xl bg-brand-red p-8 md:p-12 text-center text-white">
          <h2 className="font-display text-2xl md:text-3xl font-bold tracking-tight">Besoin d&apos;une pièce de carrosserie ?</h2>
          <p className="mt-3 max-w-2xl mx-auto text-white/90">
            Envoyez-nous votre VIN et la pièce recherchée — notre équipe confirme la disponibilité et le prix sous 24h.
          </p>
          <a
            href={buildWhatsAppLink({ message: "Bonjour HPCS, je cherche une pièce de carrosserie. VIN : [coller VIN]. Pièce recherchée : [décrire]." })}
            target="_blank" rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-bold text-brand-red hover:bg-neutral-100"
          >
            <MessageCircle className="h-5 w-5" /> Contactez-nous sur WhatsApp
          </a>
        </section>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 md:px-6 py-8 md:py-12">
      <Breadcrumb items={[{ label: "Accueil", href: "/" }, { label: "Catégories" }, { label: cat.name }]} />
      <div className="mt-4">
        <p className="text-xs font-bold uppercase tracking-widest text-brand-red">CATÉGORIE</p>
        <h1 className="mt-2 font-display text-3xl md:text-4xl font-bold tracking-tight text-brand-charcoal">{cat.name}</h1>
        <p className="mt-2 max-w-3xl text-neutral-600 leading-relaxed">{cat.description}</p>
      </div>

      {brandsAvailable.length > 0 && (
        <div className="mt-6 flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-widest text-neutral-500">Disponible pour :</span>
          {brandsAvailable.map((bs) => {
            const b = brands.find((x) => x.slug === bs);
            if (!b) return null;
            return (
              <Link key={bs} href={`/marque/${bs}`} className="rounded-full border border-neutral-300 bg-white px-3 py-1 text-xs font-semibold hover:border-brand-red hover:text-brand-red">
                {b.name}
              </Link>
            );
          })}
        </div>
      )}

      <div className="mt-10">
        <ShopClient baseProducts={list} initialCategory={cat.slug} />
      </div>
    </div>
  );
}
