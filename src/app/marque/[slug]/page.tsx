import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { ShopClient } from "@/components/shop/ShopClient";
import { brands, getBrand } from "@/data/brands";
import { categories } from "@/data/categories";
import { products } from "@/data/products";
import { buildMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return brands.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const b = getBrand(params.slug);
  if (!b) return buildMetadata({ title: "Marque" });
  return buildMetadata({
    title: `Pièces ${b.name} au Maroc`,
    description: `Pièces détachées d'origine pour voitures ${b.name} au Maroc. Devis WhatsApp et livraison 24-72h partout au Maroc.`,
    path: `/marque/${b.slug}`,
  });
}

export default function BrandPage({ params }: { params: { slug: string } }) {
  const brand = getBrand(params.slug);
  if (!brand) notFound();
  const list = products.filter((p) => p.compatibleVehicles.some((v) => v.brandSlug === brand.slug));
  const catsAvailable = Array.from(new Set(list.map((p) => p.category)));

  return (
    <div className="mx-auto max-w-7xl px-4 md:px-6 py-8 md:py-12">
      <Breadcrumb items={[{ label: "Accueil", href: "/" }, { label: "Marques" }, { label: brand.name }]} />
      <div className="mt-4">
        <p className="text-xs font-bold uppercase tracking-widest text-brand-red">MARQUE</p>
        <h1 className="mt-2 font-display text-3xl md:text-4xl font-bold tracking-tight text-brand-charcoal">Pièces {brand.name}</h1>
        <p className="mt-2 max-w-3xl text-neutral-600 leading-relaxed">{brand.description}</p>
      </div>

      {catsAvailable.length > 0 && (
        <div className="mt-6 flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-widest text-neutral-500">Catégories disponibles :</span>
          {catsAvailable.map((cs) => {
            const c = categories.find((x) => x.slug === cs);
            if (!c) return null;
            return (
              <Link key={cs} href={`/categorie/${cs}`} className="rounded-full border border-neutral-300 bg-white px-3 py-1 text-xs font-semibold hover:border-brand-red hover:text-brand-red">
                {c.name}
              </Link>
            );
          })}
        </div>
      )}

      <div className="mt-10">
        <ShopClient baseProducts={list} initialBrand={brand.slug} />
      </div>
    </div>
  );
}
