"use client";
import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/cn";

export function ProductGallery({ images, alt }: { images: string[]; alt: string }) {
  const [idx, setIdx] = useState(0);
  const list = images.length > 0 ? images : ["/images/products/parts1.jpg"];
  return (
    <div>
      <div className="relative aspect-square overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-50">
        <Image src={list[idx]} alt={alt} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" priority />
      </div>
      {list.length > 1 && (
        <div className="mt-3 flex gap-2 overflow-x-auto">
          {list.map((src, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              aria-label={`Image ${i + 1}`}
              className={cn(
                "relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border bg-neutral-50",
                i === idx ? "border-brand-red ring-2 ring-brand-red/30" : "border-neutral-200"
              )}
            >
              <Image src={src} alt="" fill sizes="80px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
