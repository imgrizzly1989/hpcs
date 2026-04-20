import Link from "next/link";
import { brands } from "@/data/brands";

export function BrandsGrid() {
  return (
    <section className="mx-auto max-w-7xl px-4 md:px-6 py-16 md:py-24">
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-brand-red">MARQUES PRISES EN CHARGE</p>
          <h2 className="mt-2 font-display text-3xl md:text-4xl font-bold tracking-tight text-brand-charcoal">Toutes les marques chinoises</h2>
          <p className="mt-2 text-neutral-600 leading-relaxed">12 marques couvertes — l&apos;essentiel du marché marocain.</p>
        </div>
        <Link href="/boutique" className="hidden md:inline text-sm font-semibold text-brand-red hover:underline">Voir toutes les pièces →</Link>
      </div>
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">
        {brands.map((b) => (
          <Link
            key={b.slug}
            href={`/marque/${b.slug}`}
            className="group flex aspect-[3/2] items-center justify-center rounded-2xl border border-neutral-200 bg-white p-4 transition hover:-translate-y-0.5 hover:border-brand-red hover:shadow-xl"
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
