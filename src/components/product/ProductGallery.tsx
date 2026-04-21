"use client";
import { useState } from "react";
import Image from "next/image";
import type { Product } from "@/types";
import { ProductVisual } from "@/components/product/ProductVisual";
import { getProductImage } from "@/lib/productImage";
import { getBrand } from "@/data/brands";
import { cn } from "@/lib/cn";

export function ProductGallery({ product }: { product: Product }) {
  const [idx, setIdx] = useState(0);
  const labels = ["Vue produit", "Détail", "Compatibilité"];
  const photo = getProductImage(product.name, product.category);
  const firstCompat = product.compatibleVehicles[0];
  const brand = firstCompat ? getBrand(firstCompat.brandSlug) : undefined;

  const MainView = () => {
    if (!photo) {
      return <ProductVisual product={product} size="gallery" variantLabel={labels[idx]} />;
    }
    return (
      <div className="relative h-full w-full bg-white">
        <Image
          src={photo}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className={cn(
            "object-contain p-6 transition",
            idx === 1 && "scale-110",
            idx === 2 && "opacity-90"
          )}
          priority
        />
        {brand && (
          <div className="absolute right-3 top-3 z-10">
            <span className="inline-flex items-center gap-1.5 rounded-md border border-neutral-200 bg-white px-2 py-1 shadow-sm">
              <span className="relative block h-5 w-10">
                <Image src={brand.logo} alt={brand.name} fill sizes="40px" className="object-contain" />
              </span>
              <span className="text-xs font-bold text-neutral-700">{brand.name}</span>
            </span>
          </div>
        )}
        <div className="absolute bottom-3 left-3 z-10">
          <span className="inline-flex items-center rounded-md border border-neutral-200 bg-white px-2 py-1 text-xs font-mono font-semibold text-neutral-700 shadow-sm">
            {product.reference}
          </span>
        </div>
        <div className="absolute left-3 top-3 z-10">
          <span className="inline-flex items-center rounded-md bg-brand-charcoal/90 px-2 py-1 text-[10px] font-semibold uppercase tracking-widest text-white">
            {labels[idx]}
          </span>
        </div>
        <div className="absolute bottom-3 right-3 text-xs font-bold tracking-widest text-neutral-300">CHINAPAL</div>
      </div>
    );
  };

  return (
    <div>
      <div className="relative aspect-square overflow-hidden rounded-2xl border border-neutral-200">
        <MainView />
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2">
        {labels.map((label, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            aria-label={label}
            className={cn(
              "relative aspect-square overflow-hidden rounded-xl border bg-white transition",
              i === idx
                ? "border-brand-red ring-2 ring-brand-red/30"
                : "border-neutral-200 hover:border-neutral-400"
            )}
          >
            {photo ? (
              <Image src={photo} alt={label} fill sizes="120px" className="object-contain p-2" />
            ) : (
              <ProductVisual product={product} size="thumb" />
            )}
            <span className="absolute bottom-1 left-1 rounded bg-white/90 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-widest text-neutral-700">
              {label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
