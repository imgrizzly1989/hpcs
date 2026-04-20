"use client";
import Link from "next/link";
import Image from "next/image";
import { Heart, MessageCircle } from "lucide-react";
import toast from "react-hot-toast";
import type { Product } from "@/types";
import { PriceOnRequest } from "@/components/ui/PriceOnRequest";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { useFavorites } from "@/store/favoritesStore";
import { useCart } from "@/store/cartStore";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { getBrand } from "@/data/brands";
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
    toast.success("Ajouté à ma demande de devis");
  };

  const firstCompat = product.compatibleVehicles[0];
  const brand = firstCompat ? getBrand(firstCompat.brandSlug) : undefined;
  const compatLabel = brand
    ? `${brand.name}${product.compatibleVehicles.length > 1 ? ` + ${product.compatibleVehicles.length - 1}` : ""}`
    : "";

  const waHref = buildWhatsAppLink({
    productName: product.name,
    reference: product.reference,
    path: `/produit/${product.slug}`,
  });

  return (
    <Card className="group overflow-hidden flex flex-col">
      <Link href={`/produit/${product.slug}`} className="block">
        <div className="relative aspect-square bg-neutral-50">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover transition duration-500 group-hover:scale-105"
          />
          <div className="absolute left-3 top-3 flex flex-col gap-1">
            {product.isNew && <Badge tone="danger">Nouveau</Badge>}
            {product.stock === 0 ? (
              <Badge tone="default">Rupture</Badge>
            ) : (
              <Badge tone="success">En stock</Badge>
            )}
          </div>
          <button
            onClick={onFav}
            aria-label={isFav ? "Retirer des favoris" : "Ajouter aux favoris"}
            className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 shadow-sm transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red"
          >
            <Heart className={cn("h-4 w-4", isFav ? "fill-brand-red text-brand-red" : "text-brand-charcoal")} />
          </button>
        </div>
      </Link>
      <div className="flex flex-1 flex-col p-4">
        <p className="text-[11px] font-medium uppercase tracking-wider text-neutral-500">Réf : {product.reference}</p>
        <Link href={`/produit/${product.slug}`} className="mt-1 block">
          <h3 className="line-clamp-2 min-h-[2.75rem] text-sm font-semibold text-brand-charcoal hover:text-brand-red">
            {product.name}
          </h3>
        </Link>
        {compatLabel && (
          <p className="mt-1 line-clamp-1 text-xs text-neutral-500">Compatible : {compatLabel}</p>
        )}
        <div className="mt-3 flex-1" />
        <PriceOnRequest size="sm" className="text-brand-charcoal" />
        <div className="mt-3 grid gap-2">
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="inline-flex min-h-10 items-center justify-center gap-1.5 rounded-xl bg-[#25D366] px-3 text-xs font-bold text-white transition hover:bg-[#1ebe57] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2"
          >
            <MessageCircle className="h-3.5 w-3.5" />
            Demander le prix
          </a>
          <button
            onClick={onAdd}
            disabled={product.stock === 0}
            className="inline-flex min-h-10 items-center justify-center rounded-xl border border-neutral-300 px-3 text-xs font-bold text-brand-charcoal transition hover:bg-neutral-50 disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red focus-visible:ring-offset-2"
          >
            Ajouter au devis
          </button>
        </div>
      </div>
    </Card>
  );
}
