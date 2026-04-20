import { cn } from "@/lib/cn";

export function PriceOnRequest({ className, size = "md" }: { className?: string; size?: "sm" | "md" | "lg" }) {
  const sizes = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-xl",
  };
  return (
    <span className={cn("font-bold text-brand-charcoal", sizes[size], className)}>
      Prix sur demande
    </span>
  );
}
