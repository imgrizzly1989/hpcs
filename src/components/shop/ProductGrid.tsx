"use client";
import { Product } from "@/types";
import { ProductCard } from "@/components/product/ProductCard";

export function ProductGrid({ products }: { products: Product[] }) {
  if (products.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-neutral-300 bg-neutral-50 p-12 text-center">
        <p className="text-neutral-500">Aucun produit ne correspond à votre recherche.</p>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
      {products.map((p) => <ProductCard key={p.id} product={p} />)}
    </div>
  );
}
