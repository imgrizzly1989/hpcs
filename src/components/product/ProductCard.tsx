"use client";
import Link from "next/link";
import Image from "next/image";
import { Heart } from "lucide-react";
import toast from "react-hot-toast";
import type { Product } from "@/types";
import { PriceTag } from "@/components/ui/PriceTag";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { useFavorites } from "@/store/favoritesStore";
import { useCart } from "@/store/cartStore";
import { cn } from "@/lib/cn";

export function ProductCard({ product }: { product: Product }) {
  const { ids, toggle } = useFavorites();
  const isFav = ids.includes(product.id);
  const add = useCart((s) => s.add);

  const onFav = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggle(product.id);
    toast.success(isFav ? "Retiré des favoris" : "Ajouté aux favoris");
  };

  const onAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    add(product, 1);
    toast.success("Produit ajouté au panier");
  };

  return (
    <Card className="group overflow-hidden">
      <Link href={`/produit/${product.slug}`} className="block">
        <div className="relative aspect-square bg-neutral-50">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-contain p-6 transition group-hover:scale-105"
          />
          <div className="absolute left-3 top-3 flex flex-col gap-1">
            {product.isNew && <Badge tone="danger">Nouveau</Badge>}
            {product.oldPrice && <Badge tone="warning">Promo</Badge>}
            {product.stock === 0 && <Badge tone="default">Rupture</Badge>}
          </div>
          <button
            onClick={onFav}
            aria-label={isFav ? "Retirer des favoris" : "Ajouter aux favoris"}
            className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow-sm transition hover:bg-white"
          >
            <Heart className={cn("h-4 w-4", isFav ? "fill-brand-red text-brand-red" : "text-brand-charcoal")} />
          </button>
        </div>
        <div className="p-4">
          <p className="text-[11px] font-medium uppercase tracking-wider text-neutral-500">Réf: {product.reference}</p>
          <h3 className="mt-1 line-clamp-2 min-h-[2.75rem] text-sm font-semibold text-brand-charcoal">{product.name}</h3>
          <div className="mt-3 flex items-center justify-between gap-2">
            <PriceTag price={product.price} oldPrice={product.oldPrice} />
            <button
              onClick={onAdd}
              disabled={product.stock === 0}
              className="rounded-xl bg-brand-red px-3 py-2 text-xs font-bold text-white transition hover:bg-red-700 disabled:opacity-50"
            >
              Ajouter
            </button>
          </div>
        </div>
      </Link>
    </Card>
  );
}
