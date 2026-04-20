import Link from "next/link";
import Image from "next/image";
import { brands } from "@/data/brands";

export function BrandsGrid() {
  return (
    <section id="marques" className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8 py-16 md:py-24">
      <div className="mb-10 flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-red mb-3">Marques prises en charge</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-brand-charcoal">Toutes les marques chinoises</h2>
          <p className="mt-2 text-neutral-600 leading-relaxed">12 marques couvertes — l&apos;essentiel du marché marocain.</p>
        </div>
        <Link href="/boutique" className="hidden md:inline text-sm font-semibold text-brand-red hover:underline">Voir toutes les pièces →</Link>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {brands.map((b) => (
          <Link
            key={b.slug}
            href={`/marque/${b.slug}`}
            className="group flex flex-col items-center justify-center gap-3 rounded-2xl border border-neutral-200 bg-white p-6 transition hover:-translate-y-0.5 hover:border-brand-red hover:shadow-lg"
          >
            <div className="relative flex h-14 w-full items-center justify-center">
              <Image
                src={b.logo}
                alt={`${b.name} logo`}
                width={140}
                height={56}
                className="max-h-14 w-auto object-contain"
              />
            </div>
            <span className="text-xs font-medium text-neutral-500 group-hover:text-brand-red">
              {b.name}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
