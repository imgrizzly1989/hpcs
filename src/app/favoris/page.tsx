"use client";
import Link from "next/link";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { useFavorites } from "@/store/favoritesStore";
import { products } from "@/data/products";
import { ProductGrid } from "@/components/shop/ProductGrid";
import { Button } from "@/components/ui/Button";

export default function FavorisPage() {
  const ids = useFavorites((s) => s.ids);
  const list = products.filter((p) => ids.includes(p.id));
  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <Breadcrumb items={[{ label: "Accueil", href: "/" }, { label: "Favoris" }]} />
      <h1 className="mt-4 font-display text-3xl font-bold">Mes favoris</h1>
      <p className="mt-1 text-sm text-neutral-600">Vos pièces enregistrées pour plus tard.</p>
      <div className="mt-8">
        {list.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-neutral-300 bg-neutral-50 p-12 text-center">
            <p className="text-neutral-600">Aucun favori pour le moment.</p>
            <Link href="/boutique" className="mt-4 inline-block"><Button>Explorer la boutique</Button></Link>
          </div>
        ) : <ProductGrid products={list} />}
      </div>
    </div>
  );
}
