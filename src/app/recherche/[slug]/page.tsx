import Link from "next/link";
import { notFound } from "next/navigation";
import { MessageCircle } from "lucide-react";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { ProductGrid } from "@/components/shop/ProductGrid";
import { getBrand } from "@/data/brands";
import { getCategory } from "@/data/categories";
import { products } from "@/data/products";
import { getSeoModelByVehicle } from "@/data/seoModels";
import { getVehiclesForBrand } from "@/data/vehicles";
import { getSeoPartModel, seoPartModels } from "@/data/seoPartModels";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { buildWhatsAppLink } from "@/lib/whatsapp";

export function generateStaticParams() {
  return seoPartModels.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const page = getSeoPartModel(params.slug);
  if (!page) return buildMetadata({ title: "Recherche" });
  return buildMetadata({
    title: page.title,
    description: page.description,
    path: `/recherche/${page.slug}`,
  });
}

export default function SeoPartModelPage({ params }: { params: { slug: string } }) {
  const page = getSeoPartModel(params.slug);
  if (!page) notFound();

  const brand = getBrand(page.brandSlug);
  const vehicle = getVehiclesForBrand(page.brandSlug)?.models.find((item) => item.slug === page.modelSlug);
  const modelPage = getSeoModelByVehicle(page.brandSlug, page.modelSlug);

  const listedProducts = products
    .filter((product) => {
      const compatible = product.compatibleVehicles.some((v) => v.brandSlug === page.brandSlug && v.modelSlug === page.modelSlug);
      if (!compatible) return false;
      const categoryMatch = page.categorySlugs.includes(product.category);
      const subcategoryMatch = page.subcategory ? product.subcategory === page.subcategory : false;
      const regexMatch = page.nameRegex ? page.nameRegex.test(product.name) : false;
      return (categoryMatch || subcategoryMatch) && regexMatch;
    })
    .slice(0, 24);

  const breadcrumbLd = breadcrumbJsonLd([
    { name: "Accueil", url: "/" },
    { name: modelPage?.h1 ?? `${brand?.name ?? page.brandSlug} ${vehicle?.name ?? page.modelSlug}`, url: modelPage ? `/modeles/${modelPage.slug}` : "/vehicule" },
    { name: page.h1, url: `/recherche/${page.slug}` },
  ]);

  const categoryLinks = page.categorySlugs
    .map((slug) => getCategory(slug))
    .filter((item): item is NonNullable<ReturnType<typeof getCategory>> => Boolean(item));

  const whatsappHref = buildWhatsAppLink({
    message: `Bonjour CHINAPAL, je cherche ${page.h1.toLowerCase()} pour ${brand?.name ?? page.brandSlug} ${vehicle?.name ?? page.modelSlug}. Pouvez-vous vérifier la compatibilité ?`,
    path: `/recherche/${page.slug}`,
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      <Breadcrumb
        items={[
          { label: "Accueil", href: "/" },
          ...(modelPage ? [{ label: modelPage.h1, href: `/modeles/${modelPage.slug}` }] : []),
          { label: page.h1 },
        ]}
      />

      <section className="mt-4 rounded-3xl border border-neutral-200 bg-white p-6 md:p-8">
        <p className="text-xs font-bold uppercase tracking-widest text-brand-red">Recherche ciblée Maroc</p>
        <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-brand-charcoal md:text-4xl">{page.h1}</h1>
        <p className="mt-4 max-w-4xl text-neutral-700 leading-relaxed">{page.intro}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {page.relatedSearches.map((link) => (
            <Link key={link.href} href={link.href} className="rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-2 text-sm font-medium text-brand-charcoal hover:border-brand-red hover:text-brand-red">
              {link.label}
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-10 grid gap-6 lg:grid-cols-[1.65fr_1fr]">
        <div>
          <h2 className="font-display text-2xl font-bold tracking-tight text-brand-charcoal">Produits compatibles</h2>
          <p className="mt-2 text-neutral-600">Sélection filtrée pour {brand?.name} {vehicle?.name}. Prix sur demande, validation avant commande.</p>
          <div className="mt-6">
            <ProductGrid products={listedProducts} />
          </div>
        </div>

        <aside className="space-y-6">
          <div className="rounded-3xl border border-neutral-200 bg-white p-6">
            <h2 className="font-display text-xl font-bold text-brand-charcoal">Compatibilité</h2>
            <p className="mt-4 text-sm leading-relaxed text-neutral-700">{page.compatibilityText}</p>
          </div>

          <div className="rounded-3xl border border-neutral-200 bg-neutral-50 p-6">
            <h2 className="font-display text-xl font-bold text-brand-charcoal">Liens utiles</h2>
            <div className="mt-4 space-y-3">
              {modelPage && (
                <Link href={`/modeles/${modelPage.slug}`} className="block rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm font-medium text-brand-charcoal hover:border-brand-red hover:text-brand-red">
                  Guide {brand?.name} {vehicle?.name}
                </Link>
              )}
              {categoryLinks.map((category) => (
                <Link key={category.slug} href={`/categorie/${category.slug}`} className="block rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm font-medium text-brand-charcoal hover:border-brand-red hover:text-brand-red">
                  {category.name}
                </Link>
              ))}
            </div>
            <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#25D366] px-5 py-3 text-sm font-bold text-white hover:bg-[#1ebe57]">
              <MessageCircle className="h-4 w-4" /> Demander disponibilité et prix sur WhatsApp
            </a>
          </div>
        </aside>
      </section>
    </div>
  );
}
