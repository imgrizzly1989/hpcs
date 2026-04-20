import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { products } from "@/data/products";
import { ProductCard } from "@/components/product/ProductCard";

export function TopParts() {
  const featured = products.filter((p) => p.isFeatured).slice(0, 8);
  return (
    <section className="bg-neutral-50 py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="mb-10 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-brand-red">PIÈCES POPULAIRES</p>
            <h2 className="mt-2 font-display text-3xl md:text-4xl font-bold tracking-tight text-brand-charcoal">
              Top pièces demandées au Maroc
            </h2>
          </div>
          <Link href="/boutique" className="hidden md:inline-flex items-center gap-1 text-sm font-semibold text-brand-red hover:underline">
            Voir tout le catalogue <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {featured.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
        <div className="mt-8 text-center md:hidden">
          <Link href="/boutique" className="inline-flex items-center gap-1 text-sm font-semibold text-brand-red hover:underline">
            Voir tout le catalogue <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
