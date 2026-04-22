import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle2, MapPin, MessageCircle, Truck } from "lucide-react";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { ProductGrid } from "@/components/shop/ProductGrid";
import { brands, getBrand } from "@/data/brands";
import { categories, getCategory } from "@/data/categories";
import { products } from "@/data/products";
import { getVehiclesForBrand } from "@/data/vehicles";
import { getSeoModel, seoModels } from "@/data/seoModels";
import { buildMetadata, breadcrumbJsonLd, faqJsonLd } from "@/lib/seo";
import { buildWhatsAppLink } from "@/lib/whatsapp";

export function generateStaticParams() {
  return seoModels.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const page = getSeoModel(params.slug);
  if (!page) return buildMetadata({ title: "Modèles" });
  return buildMetadata({
    title: page.title,
    description: page.description,
    path: `/modeles/${page.slug}`,
  });
}

export default function ModelSeoPage({ params }: { params: { slug: string } }) {
  const page = getSeoModel(params.slug);
  if (!page) notFound();

  const brand = getBrand(page.brandSlug);
  const vehicle = getVehiclesForBrand(page.brandSlug)?.models.find((item) => item.slug === page.modelSlug);
  const listedProducts = products
    .filter((product) => product.compatibleVehicles.some((v) => v.brandSlug === page.brandSlug && v.modelSlug === page.modelSlug))
    .slice(0, 36);

  const breadcrumbLd = breadcrumbJsonLd([
    { name: "Accueil", url: "/" },
    { name: "Modèles", url: "/vehicule" },
    { name: page.h1, url: `/modeles/${page.slug}` },
  ]);

  const faqLd = faqJsonLd(page.faq);

  const relatedCategories = page.topCategories
    .map((slug) => getCategory(slug))
    .filter((item): item is NonNullable<ReturnType<typeof getCategory>> => Boolean(item));

  const relatedModels = seoModels
    .filter((item) => item.slug !== page.slug && (item.brandSlug === page.brandSlug || item.topCategories.some((cat) => page.topCategories.includes(cat))))
    .slice(0, 4);

  const whatsappHref = buildWhatsAppLink({
    message: `Bonjour CHINAPAL, je cherche une pièce pour ${brand?.name ?? page.brandSlug} ${vehicle?.name ?? page.modelSlug}. Pouvez-vous vérifier la compatibilité ?`,
    path: `/modeles/${page.slug}`,
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      <Breadcrumb
        items={[
          { label: "Accueil", href: "/" },
          { label: "Modèles", href: "/vehicule" },
          { label: page.h1 },
        ]}
      />

      <section className="mt-4 rounded-3xl border border-neutral-200 bg-white p-6 md:p-8">
        <p className="text-xs font-bold uppercase tracking-widest text-brand-red">Guide modèle Maroc</p>
        <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-brand-charcoal md:text-4xl">{page.h1}</h1>
        <p className="mt-4 max-w-4xl text-neutral-700 leading-relaxed">{page.intro}</p>

        <div className="mt-6 grid gap-3 md:grid-cols-4">
          <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-4 text-sm font-medium text-brand-charcoal">
            <MapPin className="mb-2 h-5 w-5 text-brand-red" /> Casablanca
          </div>
          <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-4 text-sm font-medium text-brand-charcoal">
            <Truck className="mb-2 h-5 w-5 text-brand-red" /> Livraison partout au Maroc
          </div>
          <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-4 text-sm font-medium text-brand-charcoal">
            <MessageCircle className="mb-2 h-5 w-5 text-brand-red" /> Réponse prioritaire sur WhatsApp
          </div>
          <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-4 text-sm font-medium text-brand-charcoal">
            <CheckCircle2 className="mb-2 h-5 w-5 text-brand-red" /> Service particuliers et garages
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {page.internalLinks.map((link) => (
            <Link key={link.href} href={link.href} className="rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-2 text-sm font-medium text-brand-charcoal hover:border-brand-red hover:text-brand-red">
              {link.label}
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-10 grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <div className="rounded-3xl border border-neutral-200 bg-white p-6 md:p-8">
          <h2 className="font-display text-2xl font-bold tracking-tight text-brand-charcoal">Trouver la bonne pièce {brand?.name} {vehicle?.name}</h2>
          <div className="mt-4 space-y-4 text-neutral-700 leading-relaxed">
            {page.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>

        <aside className="space-y-6">
          <div className="rounded-3xl border border-neutral-200 bg-white p-6">
            <h2 className="font-display text-xl font-bold text-brand-charcoal">Catégories utiles</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {relatedCategories.map((category) => (
                <Link key={category.slug} href={`/categorie/${category.slug}`} className="rounded-full border border-neutral-300 bg-white px-3 py-1.5 text-sm font-semibold text-brand-charcoal hover:border-brand-red hover:text-brand-red">
                  {category.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-neutral-200 bg-neutral-50 p-6">
            <h2 className="font-display text-xl font-bold text-brand-charcoal">Informations modèle</h2>
            <div className="mt-4 space-y-2 text-sm text-neutral-700">
              <p><span className="font-semibold text-brand-charcoal">Marque :</span> {brand?.name ?? page.brandSlug}</p>
              <p><span className="font-semibold text-brand-charcoal">Modèle :</span> {vehicle?.name ?? page.modelSlug}</p>
              <p><span className="font-semibold text-brand-charcoal">Motorisations :</span> {vehicle?.engines.join(", ") ?? "Selon version"}</p>
            </div>
            <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#25D366] px-5 py-3 text-sm font-bold text-white hover:bg-[#1ebe57]">
              <MessageCircle className="h-4 w-4" /> Demander disponibilité et prix sur WhatsApp
            </a>
          </div>
        </aside>
      </section>

      <section className="mt-10">
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="font-display text-2xl font-bold tracking-tight text-brand-charcoal">Sélection de pièces compatibles</h2>
            <p className="mt-1 text-neutral-600">Références filtrées pour {brand?.name} {vehicle?.name}. Prix sur demande, validation rapide via WhatsApp.</p>
          </div>
        </div>
        <div className="mt-6">
          <ProductGrid products={listedProducts} />
        </div>
      </section>

      <section className="mt-12 grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-neutral-200 bg-white p-6 md:p-8">
          <h2 className="font-display text-2xl font-bold tracking-tight text-brand-charcoal">Questions fréquentes</h2>
          <div className="mt-4 space-y-3">
            {page.faq.map((item) => (
              <details key={item.q} className="rounded-2xl border border-neutral-200 bg-neutral-50 p-4">
                <summary className="cursor-pointer text-sm font-semibold text-brand-charcoal">{item.q}</summary>
                <p className="mt-2 text-sm leading-relaxed text-neutral-700">{item.a}</p>
              </details>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-neutral-200 bg-white p-6 md:p-8">
          <h2 className="font-display text-2xl font-bold tracking-tight text-brand-charcoal">Guides liés</h2>
          <div className="mt-4 space-y-3">
            {relatedModels.map((item) => (
              <Link key={item.slug} href={`/modeles/${item.slug}`} className="block rounded-2xl border border-neutral-200 px-4 py-3 text-sm font-medium text-brand-charcoal hover:border-brand-red hover:text-brand-red">
                {item.h1}
              </Link>
            ))}
            <Link href={`/marque/${page.brandSlug}`} className="block rounded-2xl border border-neutral-200 px-4 py-3 text-sm font-medium text-brand-charcoal hover:border-brand-red hover:text-brand-red">
              Voir toutes les pièces {brands.find((item) => item.slug === page.brandSlug)?.name ?? page.brandSlug}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
