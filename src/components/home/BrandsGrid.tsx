import Link from "next/link";
import { brands } from "@/data/brands";

export function BrandsGrid() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <div className="mb-6 flex items-end justify-between">
        <div>
          <h2 className="font-display text-2xl font-bold text-brand-charcoal md:text-3xl">Marques couvertes</h2>
          <p className="mt-1 text-sm text-neutral-600">12 marques chinoises — couverture complète du marché marocain.</p>
        </div>
        <Link href="/boutique" className="hidden md:inline text-sm font-semibold text-brand-red hover:underline">Voir toutes les pièces →</Link>
      </div>
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">
        {brands.map((b) => (
          <Link
            key={b.slug}
            href={`/marque/${b.slug}`}
            className="group flex aspect-[3/2] items-center justify-center rounded-2xl border border-neutral-200 bg-white p-4 transition hover:border-brand-red hover:shadow-lg"
          >
            <span className="font-display text-lg font-black tracking-wide text-brand-charcoal group-hover:text-brand-red">
              {b.name.toUpperCase()}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
