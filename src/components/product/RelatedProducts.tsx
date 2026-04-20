import { products } from "@/data/products";
import { ProductCard } from "./ProductCard";
import type { Product } from "@/types";

export function RelatedProducts({ current }: { current: Product }) {
  const related = products.filter((p) => p.category === current.category && p.id !== current.id).slice(0, 4);
  if (related.length === 0) return null;
  return (
    <section className="mt-14">
      <h2 className="mb-5 font-display text-2xl font-bold text-brand-charcoal">Produits similaires</h2>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {related.map((p) => <ProductCard key={p.id} product={p} />)}
      </div>
    </section>
  );
}
