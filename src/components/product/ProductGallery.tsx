"use client";
import { useState } from "react";
import type { Product } from "@/types";
import { ProductVisual } from "@/components/product/ProductVisual";
import { cn } from "@/lib/cn";

export function ProductGallery({ product }: { product: Product }) {
  const [idx, setIdx] = useState(0);
  const views = ["Vue 1", "Vue 2", "Vue 3"];

  return (
    <div>
      <div className="relative aspect-square overflow-hidden rounded-2xl border border-neutral-200">
        <ProductVisual
          product={product}
          size="gallery"
          variantLabel={views[idx]}
        />
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2">
        {views.map((label, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            aria-label={label}
            className={cn(
              "relative aspect-square overflow-hidden rounded-xl border transition",
              i === idx
                ? "border-brand-red ring-2 ring-brand-red/30"
                : "border-neutral-200 hover:border-neutral-400"
            )}
          >
            <ProductVisual product={product} size="thumb" />
            <span className="absolute bottom-1 left-1 rounded bg-white/90 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-widest text-neutral-700">
              {label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
