import { products } from "@/data/products";
import { ProductCard } from "@/components/product/ProductCard";
import Link from "next/link";

export function FeaturedProducts() {
  const featured = products.slice(0, 8);
  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <div className="mb-6 flex items-end justify-between">
        <div>
          <h2 className="font-display text-2xl font-bold text-brand-charcoal md:text-3xl">Pièces populaires</h2>
          <p className="mt-1 text-sm text-neutral-600">Sélection HPCS — prix compétitifs, livraison rapide.</p>
        </div>
        <Link href="/boutique" className="hidden md:inline text-sm font-semibold text-brand-red hover:underline">Tout voir →</Link>
      </div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {featured.map((p) => <ProductCard key={p.id} product={p} />)}
      </div>
    </section>
  );
}
