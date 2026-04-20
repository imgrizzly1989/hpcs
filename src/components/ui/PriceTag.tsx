import { formatMAD } from "@/lib/format";
import { cn } from "@/lib/cn";

export function PriceTag({ price, oldPrice, className }: { price: number; oldPrice?: number; className?: string }) {
  return (
    <div className={cn("flex items-baseline gap-2", className)}>
      <span className="text-lg font-bold text-brand-charcoal">{formatMAD(price)}</span>
      {oldPrice && oldPrice > price && (
        <span className="text-sm text-neutral-400 line-through">{formatMAD(oldPrice)}</span>
      )}
    </div>
  );
}
