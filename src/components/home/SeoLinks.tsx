import Link from "next/link";
import { seoCategories } from "@/data/seoCategories";

export function SeoLinks() {
  return (
    <section className="py-12 md:py-16 bg-neutral-50/70 border-y border-neutral-200">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-red">RECHERCHES POPULAIRES</p>
        <h2 className="mt-2 font-display text-2xl md:text-3xl font-bold tracking-tight text-brand-charcoal">
          Catégories les plus recherchées au Maroc
        </h2>
        <div className="mt-5 flex flex-wrap gap-2">
          {seoCategories.map((item) => (
            <Link
              key={item.slug}
              href={`/pieces/${item.slug}`}
              className="rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm font-medium text-brand-charcoal hover:border-brand-red hover:text-brand-red"
            >
              {item.h1}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
