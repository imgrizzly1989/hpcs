import Link from "next/link";
import * as Icons from "lucide-react";
import { categories } from "@/data/categories";

export function CategoriesGrid() {
  return (
    <section className="mx-auto max-w-7xl px-4 md:px-6 py-16 md:py-24">
      <div className="mb-8">
        <p className="text-xs font-bold uppercase tracking-widest text-brand-red">CATÉGORIES</p>
        <h2 className="mt-2 font-display text-3xl md:text-4xl font-bold tracking-tight text-brand-charcoal">Explorez nos catégories</h2>
        <p className="mt-2 text-neutral-600 leading-relaxed">11 catégories pour couvrir tous vos besoins d&apos;entretien et de réparation.</p>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
        {categories.map((c) => {
          const Icon = (Icons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[c.icon] ?? Icons.Package;
          return (
            <Link
              key={c.slug}
              href={`/categorie/${c.slug}`}
              className="group flex flex-col gap-3 rounded-2xl border border-neutral-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-brand-red hover:shadow-xl"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-brand-red transition group-hover:bg-brand-red group-hover:text-white">
                <Icon className="h-6 w-6" />
              </span>
              <div>
                <p className="font-semibold text-brand-charcoal">{c.name}</p>
                <p className="mt-1 text-xs font-semibold text-brand-red">Voir les pièces →</p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
