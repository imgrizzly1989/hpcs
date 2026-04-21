import Image from "next/image";
import type { LucideIcon } from "lucide-react";
import {
  Cog, CircleDot, Lightbulb, Filter, Waves, Navigation,
  Thermometer, Zap, Car, Snowflake, Package, Wrench,
} from "lucide-react";
import type { Product } from "@/types";
import { getBrand } from "@/data/brands";
import { cn } from "@/lib/cn";

const ICONS: Record<string, LucideIcon> = {
  moteur: Cog,
  freinage: CircleDot,
  eclairage: Lightbulb,
  filtration: Filter,
  suspension: Waves,
  direction: Navigation,
  refroidissement: Thermometer,
  electricite: Zap,
  carrosserie: Car,
  climatisation: Snowflake,
  accessoires: Package,
};

type Size = "card" | "gallery" | "thumb" | "cart";

export function ProductVisual({
  product,
  size = "card",
  variantLabel,
  className,
}: {
  product: Product;
  size?: Size;
  variantLabel?: string;
  className?: string;
}) {
  const Icon = ICONS[product.category] ?? Wrench;
  const firstCompat = product.compatibleVehicles[0];
  const brand = firstCompat ? getBrand(firstCompat.brandSlug) : undefined;

  const iconSize =
    size === "gallery"
      ? "w-28 h-28 md:w-40 md:h-40"
      : size === "thumb"
      ? "w-8 h-8"
      : size === "cart"
      ? "w-8 h-8"
      : "w-20 h-20 md:w-24 md:h-24";

  const bg = size === "gallery" ? "bg-white" : "bg-neutral-50";

  return (
    <div
      className={cn(
        "relative h-full w-full overflow-hidden",
        bg,
        className
      )}
      style={{
        backgroundImage:
          "radial-gradient(rgba(23,23,23,0.12) 1px, transparent 1px)",
        backgroundSize: size === "thumb" || size === "cart" ? "8px 8px" : "14px 14px",
      }}
    >
      {/* Center icon */}
      <div className="absolute inset-0 flex items-center justify-center">
        <Icon className={cn(iconSize, "text-neutral-400")} strokeWidth={1.5} />
      </div>

      {size !== "thumb" && size !== "cart" && (
        <>
          {/* Reference chip bottom-left */}
          <div className="absolute bottom-2 left-2 md:bottom-3 md:left-3">
            <span className="inline-flex items-center rounded-md border border-neutral-200 bg-white px-2 py-1 text-[10px] font-mono font-semibold text-neutral-700 shadow-sm">
              {product.reference}
            </span>
          </div>

          {/* Brand badge top-right */}
          {brand && (
            <div className="absolute right-2 top-2 md:right-3 md:top-3">
              <span className="inline-flex items-center gap-1.5 rounded-md border border-neutral-200 bg-white px-1.5 py-1 shadow-sm">
                <span className="relative block h-4 w-8">
                  <Image
                    src={brand.logo}
                    alt={brand.name}
                    fill
                    sizes="32px"
                    className="object-contain"
                  />
                </span>
                <span className="text-[10px] font-bold text-neutral-700">
                  {brand.name}
                </span>
              </span>
            </div>
          )}

          {/* CHINAPAL watermark bottom-right */}
          <div className="absolute bottom-2 right-3 text-[10px] font-bold tracking-widest text-neutral-300">
            CHINAPAL
          </div>

          {/* Gallery variant label top-left */}
          {variantLabel && (
            <div className="absolute left-2 top-2 md:left-3 md:top-3">
              <span className="inline-flex items-center rounded-md bg-brand-charcoal/90 px-2 py-1 text-[10px] font-semibold uppercase tracking-widest text-white">
                {variantLabel}
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
}
