import Link from "next/link";
import * as Icons from "lucide-react";
import { categories } from "@/data/categories";

export function CategoriesGrid() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <div className="mb-6">
        <h2 className="font-display text-2xl font-bold text-brand-charcoal md:text-3xl">Catégories de pièces</h2>
        <p className="mt-1 text-sm text-neutral-600">11 catégories pour couvrir l&apos;ensemble de vos besoins.</p>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {categories.map((c) => {
          const Icon = (Icons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[c.icon] ?? Icons.Package;
          return (
            <Link
              key={c.slug}
              href={`/categorie/${c.slug}`}
              className="group flex flex-col items-center gap-2 rounded-2xl border border-neutral-200 bg-white p-4 text-center transition hover:border-brand-red hover:shadow-lg"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-brand-red transition group-hover:bg-brand-red group-hover:text-white">
                <Icon className="h-6 w-6" />
              </span>
              <span className="text-sm font-semibold text-brand-charcoal">{c.name}</span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
