import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { ShopClient } from "@/components/shop/ShopClient";
import { brands, getBrand } from "@/data/brands";
import { products } from "@/data/products";
import { buildMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return brands.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const b = getBrand(params.slug);
  if (!b) return buildMetadata({ title: "Marque" });
  return buildMetadata({ title: `Pièces ${b.name}`, description: `Pièces détachées pour voitures ${b.name} au Maroc.`, path: `/marque/${b.slug}` });
}

export default function BrandPage({ params }: { params: { slug: string } }) {
  const brand = getBrand(params.slug);
  if (!brand) notFound();
  const list = products.filter((p) => p.compatibleVehicles.some((v) => v.brandSlug === brand.slug));
  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <Breadcrumb items={[{ label: "Accueil", href: "/" }, { label: "Marques" }, { label: brand.name }]} />
      <h1 className="mt-4 font-display text-3xl font-bold text-brand-charcoal">Pièces {brand.name}</h1>
      <p className="mt-1 text-sm text-neutral-600">{brand.description}</p>
      <div className="mt-8">
        <ShopClient baseProducts={list} initialBrand={brand.slug} />
      </div>
    </div>
  );
}
