import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { ShopClient } from "@/components/shop/ShopClient";
import { getCategory, categories } from "@/data/categories";
import { brands } from "@/data/brands";
import { products } from "@/data/products";
import { buildMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const cat = getCategory(params.slug);
  if (!cat) return buildMetadata({ title: "Catégorie" });
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
