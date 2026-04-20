import Link from "next/link";
import { ChevronRight } from "lucide-react";

export interface Crumb { label: string; href?: string; }

export function Breadcrumb({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Fil d'Ariane" className="flex items-center gap-1 text-sm text-neutral-500">
      {items.map((it, i) => {
        const last = i === items.length - 1;
        return (
          <span key={i} className="flex items-center gap-1">
            {it.href && !last ? (
              <Link href={it.href} className="hover:text-brand-red">{it.label}</Link>
            ) : (
              <span className={last ? "text-brand-charcoal font-medium" : ""}>{it.label}</span>
            )}
            {!last && <ChevronRight className="h-3.5 w-3.5" />}
          </span>
        );
      })}
    </nav>
  );
}
