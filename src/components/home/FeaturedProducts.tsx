import { products } from "@/data/products";
import { ProductCard } from "@/components/product/ProductCard";
import Link from "next/link";

export function FeaturedProducts() {
  const featured = products.slice(0, 8);
  return (
    <section className="mx-auto max-w-7xl px-4 md:px-6 py-16 md:py-24">
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-brand-red">SÉLECTION</p>
          <h2 className="mt-2 font-display text-3xl md:text-4xl font-bold tracking-tight text-brand-charcoal">Pièces les plus demandées</h2>
          <p className="mt-2 text-neutral-600 leading-relaxed">Les pièces les plus recherchées par nos clients au Maroc.</p>
        </div>
        <Link href="/boutique" className="hidden md:inline text-sm font-semibold text-brand-red hover:underline">Voir toute la boutique →</Link>
      </div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {featured.map((p) => <ProductCard key={p.id} product={p} />)}
      </div>
      <div className="mt-8 text-center md:hidden">
        <Link href="/boutique" className="text-sm font-semibold text-brand-red hover:underline">Voir toute la boutique →</Link>
      </div>
    </section>
  );
}
