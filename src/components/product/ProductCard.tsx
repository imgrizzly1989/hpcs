"use client";
import Link from "next/link";
import Image from "next/image";
import { Heart, MessageCircle } from "lucide-react";
import toast from "react-hot-toast";
import type { Product } from "@/types";
import { PriceOnRequest } from "@/components/ui/PriceOnRequest";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { ProductVisual } from "@/components/product/ProductVisual";
import { useFavorites } from "@/store/favoritesStore";
import { useCart } from "@/store/cartStore";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { getBrand } from "@/data/brands";
import { getProductImage } from "@/lib/productImage";
import { cn } from "@/lib/cn";

export function ProductCard({ product, photoUrl }: { product: Product; photoUrl?: string | null }) {
  const { ids, toggle } = useFavorites();
  const isFav = ids.includes(product.id);
  const add = useCart((s) => s.add);
  const photo = photoUrl ?? getProductImage(product.name, product.category);

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
    <Card className="group overflow-hidden flex flex-col transition hover:shadow-lg">
      <Link href={`/produit/${product.slug}`} className="block">
        <div className="relative aspect-square bg-white">
          {photo ? (
            <>
              <Image
                src={photo}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-contain p-4"
              />
              {brand && (
                <div className="absolute right-3 top-3 z-10">
                  <span className="inline-flex items-center gap-1.5 rounded-md border border-neutral-200 bg-white px-1.5 py-1 shadow-sm">
                    <span className="relative block h-4 w-8">
                      <Image src={brand.logo} alt={brand.name} fill sizes="32px" className="object-contain" />
                    </span>
                    <span className="text-[10px] font-bold text-neutral-700">{brand.name}</span>
                  </span>
                </div>
              )}
              <div className="absolute bottom-3 left-3 z-10">
                <span className="inline-flex items-center rounded-md border border-neutral-200 bg-white px-2 py-1 text-[10px] font-mono font-semibold text-neutral-700 shadow-sm">
                  {product.reference}
                </span>
              </div>
              <div className="absolute bottom-2 right-3 text-[10px] font-bold tracking-widest text-neutral-300">CHINAPAL</div>
            </>
          ) : (
            <ProductVisual product={product} size="card" />
          )}
          <div className="absolute left-3 top-3 z-10 flex flex-col gap-1">
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
            className="absolute right-3 bottom-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-neutral-200 transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red"
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
