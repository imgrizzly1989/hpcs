import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { ShopClient } from "@/components/shop/ShopClient";
import { getCategory, categories } from "@/data/categories";
import { products } from "@/data/products";
import { buildMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const cat = getCategory(params.slug);
  if (!cat) return buildMetadata({ title: "Catégorie" });
  return buildMetadata({ title: cat.name, description: cat.description, path: `/categorie/${cat.slug}` });
}

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const cat = getCategory(params.slug);
  if (!cat) notFound();
  const list = products.filter((p) => p.category === cat.slug);
  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <Breadcrumb items={[{ label: "Accueil", href: "/" }, { label: "Catégories" }, { label: cat.name }]} />
      <h1 className="mt-4 font-display text-3xl font-bold text-brand-charcoal">{cat.name}</h1>
      <p className="mt-1 text-sm text-neutral-600">{cat.description}</p>
      <div className="mt-8">
        <ShopClient baseProducts={list} initialCategory={cat.slug} />
      </div>
    </div>
  );
}
