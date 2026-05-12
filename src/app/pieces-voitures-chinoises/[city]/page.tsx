import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle2, MapPin, MessageCircle, ShieldCheck, Truck } from "lucide-react";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { brands } from "@/data/brands";
import { categories } from "@/data/categories";
import { getSeoCity, seoCities } from "@/data/seoCities";
import { seoModels } from "@/data/seoModels";
import { buildMetadata, breadcrumbJsonLd, faqJsonLd } from "@/lib/seo";
import { buildWhatsAppLink } from "@/lib/whatsapp";

export function generateStaticParams() {
  return seoCities.map((item) => ({ city: item.slug }));
}

export async function generateMetadata({ params }: { params: { city: string } }) {
  const page = getSeoCity(params.city);
  if (!page) return buildMetadata({ title: "Pièces voitures chinoises Maroc" });
  return buildMetadata({
    title: page.title,
    description: page.description,
    path: `/pieces-voitures-chinoises/${page.slug}`,
  });
}

export default function CitySeoPage({ params }: { params: { city: string } }) {
  const page = getSeoCity(params.city);
  if (!page) notFound();

  const breadcrumbLd = breadcrumbJsonLd([
    { name: "Accueil", url: "/" },
    { name: "Pièces voitures chinoises Maroc", url: "/vehicule" },
    { name: page.city, url: `/pieces-voitures-chinoises/${page.slug}` },
  ]);
  const faqLd = faqJsonLd(page.faq);
  const whatsappHref = buildWhatsAppLink({
    message: `Bonjour CHINAPAL, je cherche une pièce pour voiture chinoise à ${page.city}. Je peux envoyer le VIN/la photo pour vérification.`,
    path: `/pieces-voitures-chinoises/${page.slug}`,
  });

  const priorityModels = seoModels.slice(0, 8);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      <Breadcrumb
        items={[
          { label: "Accueil", href: "/" },
          { label: "Voitures chinoises", href: "/vehicule" },
          { label: page.city },
        ]}
      />

      <section className="mt-4 overflow-hidden rounded-3xl border border-neutral-200 bg-brand-charcoal text-white shadow-sm">
        <div className="grid gap-0 lg:grid-cols-[1.5fr_1fr]">
          <div className="p-6 md:p-10">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-red">Livraison Maroc · Spécialiste voitures chinoises</p>
            <h1 className="mt-3 font-display text-3xl font-bold tracking-tight md:text-5xl">{page.h1}</h1>
            <p className="mt-5 max-w-4xl text-base leading-relaxed text-white/80 md:text-lg">{page.intro}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl bg-[#25D366] px-5 py-3 text-sm font-bold text-white hover:bg-[#1ebe57]">
                <MessageCircle className="h-4 w-4" /> Demander une pièce sur WhatsApp
              </a>
              <Link href="/vehicule" className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-bold text-white hover:bg-white/15">
                Voir les marques et modèles
              </Link>
            </div>
          </div>
          <div className="border-t border-white/10 bg-white/[0.04] p-6 md:p-8 lg:border-l lg:border-t-0">
            <div className="grid gap-3">
              {page.proof.map((item, index) => {
                const Icon = [MapPin, ShieldCheck, Truck, CheckCircle2][index] ?? CheckCircle2;
                return (
                  <div key={item} className="rounded-2xl border border-white/10 bg-white/10 p-4 text-sm font-semibold text-white">
                    <Icon className="mb-2 h-5 w-5 text-brand-red" /> {item}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="mt-10 grid gap-6 lg:grid-cols-[1.35fr_0.9fr]">
        <div className="rounded-3xl border border-neutral-200 bg-white p-6 md:p-8">
          <h2 className="font-display text-2xl font-bold tracking-tight text-brand-charcoal">Recherches fréquentes à {page.city}</h2>
          <p className="mt-3 text-neutral-700 leading-relaxed">
            Cette page cible les recherches locales comme “pièces voitures chinoises {page.city}”, “pièces Chery {page.city}”, “pièces MG {page.city}” ou “pare-chocs voiture chinoise {page.city}”. Le but n&apos;est pas de vendre une référence au hasard : CHINAPAL vérifie la pièce, la version et la compatibilité avant de confirmer le devis.
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {page.popularSearches.map((item) => (
              <Link key={item.href} href={item.href} className="rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm font-semibold text-brand-charcoal hover:border-brand-red hover:text-brand-red">
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <aside className="rounded-3xl border border-neutral-200 bg-neutral-50 p-6 md:p-8">
          <h2 className="font-display text-2xl font-bold tracking-tight text-brand-charcoal">Marques chinoises couvertes</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {brands.map((brand) => (
              <Link key={brand.slug} href={`/marque/${brand.slug}`} className="rounded-full border border-neutral-300 bg-white px-3 py-1.5 text-sm font-semibold text-brand-charcoal hover:border-brand-red hover:text-brand-red">
                {brand.name}
              </Link>
            ))}
          </div>
          <h3 className="mt-6 text-sm font-bold uppercase tracking-widest text-neutral-500">Catégories principales</h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {categories.slice(0, 8).map((category) => (
              <Link key={category.slug} href={`/categorie/${category.slug}`} className="rounded-full border border-neutral-300 bg-white px-3 py-1.5 text-sm font-semibold text-brand-charcoal hover:border-brand-red hover:text-brand-red">
                {category.name}
              </Link>
            ))}
          </div>
        </aside>
      </section>

      <section className="mt-10 rounded-3xl border border-neutral-200 bg-white p-6 md:p-8">
        <h2 className="font-display text-2xl font-bold tracking-tight text-brand-charcoal">Guides modèles utiles pour {page.city}</h2>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {priorityModels.map((item) => (
            <Link key={item.slug} href={`/modeles/${item.slug}`} className="rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-4 text-sm font-semibold text-brand-charcoal hover:border-brand-red hover:text-brand-red">
              {item.h1}
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-10 rounded-3xl border border-neutral-200 bg-white p-6 md:p-8">
        <h2 className="font-display text-2xl font-bold tracking-tight text-brand-charcoal">Questions fréquentes</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {page.faq.map((item) => (
            <details key={item.q} className="rounded-2xl border border-neutral-200 bg-neutral-50 p-4">
              <summary className="cursor-pointer text-sm font-semibold text-brand-charcoal">{item.q}</summary>
              <p className="mt-2 text-sm leading-relaxed text-neutral-700">{item.a}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
