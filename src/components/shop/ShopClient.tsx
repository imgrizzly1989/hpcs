"use client";
import { useMemo, useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import { brands } from "@/data/brands";
import { categories } from "@/data/categories";
import { products as allProducts } from "@/data/products";
import { Select } from "@/components/ui/Select";
import { ProductGrid } from "./ProductGrid";
import { cn } from "@/lib/cn";
import type { Product } from "@/types";

type Sort = "relevance" | "priceAsc" | "priceDesc" | "newest";

interface Props {
  initialCategory?: string;
  initialBrand?: string;
  baseProducts?: Product[];
}

export function ShopClient({ initialCategory, initialBrand, baseProducts }: Props) {
  const base = baseProducts ?? allProducts;
  const [selCats, setSelCats] = useState<string[]>(initialCategory ? [initialCategory] : []);
  const [selBrands, setSelBrands] = useState<string[]>(initialBrand ? [initialBrand] : []);
  const maxP = Math.max(...base.map((p) => p.price));
  const [priceMax, setPriceMax] = useState<number>(maxP);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sort, setSort] = useState<Sort>("relevance");
  const [mobileOpen, setMobileOpen] = useState(false);

  const filtered = useMemo(() => {
    let list = [...base];
    if (selCats.length) list = list.filter((p) => selCats.includes(p.category));
    if (selBrands.length)
      list = list.filter((p) => p.compatibleVehicles.some((v) => selBrands.includes(v.brandSlug)));
    if (inStockOnly) list = list.filter((p) => p.stock > 0);
    list = list.filter((p) => p.price <= priceMax);
    switch (sort) {
      case "priceAsc": list.sort((a, b) => a.price - b.price); break;
      case "priceDesc": list.sort((a, b) => b.price - a.price); break;
      case "newest": list.sort((a, b) => Number(!!b.isNew) - Number(!!a.isNew)); break;
    }
    return list;
  }, [base, selCats, selBrands, inStockOnly, priceMax, sort]);

  const toggle = (arr: string[], v: string, set: (n: string[]) => void) => {
    set(arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);
  };

  const clearAll = () => {
    setSelCats([]); setSelBrands([]); setInStockOnly(false); setPriceMax(maxP); setSort("relevance");
  };

  const Sidebar = (
    <aside className="space-y-6">
      <div>
        <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-brand-charcoal">Catégories</h3>
        <ul className="space-y-2">
          {categories.map((c) => (
            <li key={c.slug}>
              <label className="flex cursor-pointer items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={selCats.includes(c.slug)}
                  onChange={() => toggle(selCats, c.slug, setSelCats)}
                  className="h-4 w-4 accent-brand-red"
                />
                {c.name}
              </label>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-brand-charcoal">Marques</h3>
        <ul className="grid grid-cols-2 gap-2">
          {brands.map((b) => (
            <li key={b.slug}>
              <label className="flex cursor-pointer items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={selBrands.includes(b.slug)}
                  onChange={() => toggle(selBrands, b.slug, setSelBrands)}
                  className="h-4 w-4 accent-brand-red"
                />
                {b.name}
              </label>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-brand-charcoal">Prix max</h3>
        <input
          type="range" min={50} max={maxP} value={priceMax}
          onChange={(e) => setPriceMax(Number(e.target.value))}
          className="w-full accent-brand-red"
        />
        <p className="mt-1 text-xs text-neutral-500">Jusqu&apos;à {priceMax} MAD</p>
      </div>
      <div>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={inStockOnly} onChange={(e) => setInStockOnly(e.target.checked)} className="h-4 w-4 accent-brand-red" />
          En stock uniquement
        </label>
      </div>
      <button onClick={clearAll} className="text-xs font-semibold text-brand-red hover:underline">Réinitialiser les filtres</button>
    </aside>
  );

  return (
    <div className="grid gap-8 md:grid-cols-[260px_1fr]">
      <div className="hidden md:block">{Sidebar}</div>

      <div>
        <div className="mb-4 flex items-center justify-between gap-3">
          <button
            onClick={() => setMobileOpen(true)}
            className="md:hidden inline-flex items-center gap-2 rounded-xl border border-neutral-300 px-3 py-2 text-sm font-semibold"
          >
            <SlidersHorizontal className="h-4 w-4" /> Filtres
          </button>
          <p className="text-sm text-neutral-600">{filtered.length} résultats</p>
          <Select value={sort} onChange={(e) => setSort(e.target.value as Sort)} className="w-auto min-w-[160px]">
            <option value="relevance">Pertinence</option>
            <option value="priceAsc">Prix croissant</option>
            <option value="priceDesc">Prix décroissant</option>
            <option value="newest">Nouveautés</option>
          </Select>
        </div>

        {(selCats.length > 0 || selBrands.length > 0 || inStockOnly) && (
          <div className="mb-4 flex flex-wrap items-center gap-2">
            {selCats.map((c) => (
              <button key={c} onClick={() => toggle(selCats, c, setSelCats)} className="inline-flex items-center gap-1 rounded-full bg-neutral-100 px-3 py-1 text-xs">
                {categories.find((x) => x.slug === c)?.name} <X className="h-3 w-3" />
              </button>
            ))}
            {selBrands.map((b) => (
              <button key={b} onClick={() => toggle(selBrands, b, setSelBrands)} className="inline-flex items-center gap-1 rounded-full bg-neutral-100 px-3 py-1 text-xs">
                {brands.find((x) => x.slug === b)?.name} <X className="h-3 w-3" />
              </button>
            ))}
            {inStockOnly && (
              <button onClick={() => setInStockOnly(false)} className="inline-flex items-center gap-1 rounded-full bg-neutral-100 px-3 py-1 text-xs">
                En stock <X className="h-3 w-3" />
              </button>
            )}
          </div>
        )}

        <ProductGrid products={filtered} />
      </div>

      {/* mobile drawer */}
      <div className={cn("fixed inset-0 z-50 md:hidden", mobileOpen ? "" : "pointer-events-none")}>
        <div
          className={cn("absolute inset-0 bg-black/40 transition-opacity", mobileOpen ? "opacity-100" : "opacity-0")}
          onClick={() => setMobileOpen(false)}
        />
        <div className={cn("absolute right-0 top-0 h-full w-[85%] max-w-sm overflow-y-auto bg-white p-5 shadow-xl transition-transform", mobileOpen ? "translate-x-0" : "translate-x-full")}>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-lg font-bold">Filtres</h2>
            <button onClick={() => setMobileOpen(false)} aria-label="Fermer"><X className="h-5 w-5" /></button>
          </div>
          {Sidebar}
        </div>
      </div>
    </div>
  );
}
