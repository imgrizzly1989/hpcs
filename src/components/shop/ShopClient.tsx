"use client";
import { useMemo, useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import { brands } from "@/data/brands";
import { categories, carrosserieSubcategories } from "@/data/categories";
import { vehicles } from "@/data/vehicles";
import { products as allProducts } from "@/data/products";
import { Select } from "@/components/ui/Select";
import { ProductGrid } from "./ProductGrid";
import { cn } from "@/lib/cn";
import type { Product } from "@/types";

type Sort = "relevance" | "newest" | "nameAsc" | "nameDesc";
type PositionFilter = "all" | "avant" | "arriere" | "gauche" | "droit";

interface Props {
  initialCategory?: string;
  initialBrand?: string;
  initialSubcategory?: string;
  baseProducts?: Product[];
}

export function ShopClient({ initialCategory, initialBrand, initialSubcategory, baseProducts }: Props) {
  const base = baseProducts ?? allProducts;
  const [selCats, setSelCats] = useState<string[]>(initialCategory ? [initialCategory] : []);
  const [selBrands, setSelBrands] = useState<string[]>(initialBrand ? [initialBrand] : []);
  const [selModels, setSelModels] = useState<string[]>([]);
  const [selSub, setSelSub] = useState<string>(initialSubcategory ?? "");
  const [position, setPosition] = useState<PositionFilter>("all");
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sort, setSort] = useState<Sort>("relevance");
  const [mobileOpen, setMobileOpen] = useState(false);

  const carrosserieSelected = selCats.length === 1 && selCats[0] === "carrosserie";

  const availableModels = useMemo(() => {
    if (selBrands.length === 0) return [];
    return vehicles.filter((v) => selBrands.includes(v.brandSlug)).flatMap((v) => v.models.map((m) => ({ ...m, brandSlug: v.brandSlug })));
  }, [selBrands]);

  const catCounts = useMemo(() => {
    const map: Record<string, number> = {};
    for (const p of base) {
      if (selBrands.length && !p.compatibleVehicles.some((v) => selBrands.includes(v.brandSlug))) continue;
      if (inStockOnly && p.stock === 0) continue;
      map[p.category] = (map[p.category] || 0) + 1;
    }
    return map;
  }, [base, selBrands, inStockOnly]);

  const brandCounts = useMemo(() => {
    const map: Record<string, number> = {};
    for (const p of base) {
      if (selCats.length && !selCats.includes(p.category)) continue;
      if (inStockOnly && p.stock === 0) continue;
      const uniqueBrands = new Set(p.compatibleVehicles.map((v) => v.brandSlug));
      uniqueBrands.forEach((b) => { map[b] = (map[b] || 0) + 1; });
    }
    return map;
  }, [base, selCats, inStockOnly]);

  const subCounts = useMemo(() => {
    const map: Record<string, number> = {};
    if (!carrosserieSelected) return map;
    for (const p of base) {
      if (p.category !== "carrosserie" || !p.subcategory) continue;
      if (selBrands.length && !p.compatibleVehicles.some((v) => selBrands.includes(v.brandSlug))) continue;
      map[p.subcategory] = (map[p.subcategory] || 0) + 1;
    }
    return map;
  }, [base, selBrands, carrosserieSelected]);

  const filtered = useMemo(() => {
    let list = [...base];
    if (selCats.length) list = list.filter((p) => selCats.includes(p.category));
    if (selBrands.length)
      list = list.filter((p) => p.compatibleVehicles.some((v) => selBrands.includes(v.brandSlug)));
    if (selModels.length)
      list = list.filter((p) => p.compatibleVehicles.some((v) => selModels.includes(v.modelSlug)));
    if (carrosserieSelected && selSub) list = list.filter((p) => p.subcategory === selSub);
    if (carrosserieSelected && position !== "all") {
      const needle = position === "arriere" ? "Arrière" : position === "avant" ? "Avant" : position === "gauche" ? "Gauche" : "Droit";
      list = list.filter((p) => (p.position || "").toLowerCase().includes(needle.toLowerCase()));
    }
    if (inStockOnly) list = list.filter((p) => p.stock > 0);
    switch (sort) {
      case "nameAsc": list.sort((a, b) => a.name.localeCompare(b.name, "fr")); break;
      case "nameDesc": list.sort((a, b) => b.name.localeCompare(a.name, "fr")); break;
      case "newest": list.sort((a, b) => Number(!!b.isNew) - Number(!!a.isNew)); break;
    }
    return list;
  }, [base, selCats, selBrands, selModels, selSub, position, carrosserieSelected, inStockOnly, sort]);

  const toggle = (arr: string[], v: string, set: (n: string[]) => void) => {
    set(arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);
  };

  const anyActive = selCats.length > 0 || selBrands.length > 0 || selModels.length > 0 || inStockOnly || selSub !== "" || position !== "all";
  const clearAll = () => { setSelCats([]); setSelBrands([]); setSelModels([]); setSelSub(""); setPosition("all"); setInStockOnly(false); setSort("relevance"); };

  const Sidebar = (
    <aside className="space-y-6">
      {anyActive && (
        <button onClick={clearAll} className="text-xs font-bold text-brand-red hover:underline">Effacer les filtres</button>
      )}
      <div>
        <h3 className="mb-3 text-xs font-bold uppercase tracking-widest text-brand-charcoal">Marque</h3>
        <ul className="grid grid-cols-2 gap-2">
          {brands.map((b) => {
            const c = brandCounts[b.slug] || 0;
            return (
              <li key={b.slug}>
                <label className={cn("flex cursor-pointer items-center gap-2 text-sm", c === 0 && "opacity-50")}>
                  <input
                    type="checkbox"
                    checked={selBrands.includes(b.slug)}
                    onChange={() => { toggle(selBrands, b.slug, setSelBrands); setSelModels([]); }}
                    className="h-4 w-4 accent-brand-red"
                  />
                  {b.name} <span className="text-xs text-neutral-400">({c})</span>
                </label>
              </li>
            );
          })}
        </ul>
      </div>

      {availableModels.length > 0 && (
        <div>
          <h3 className="mb-3 text-xs font-bold uppercase tracking-widest text-brand-charcoal">Modèle</h3>
          <ul className="space-y-2 max-h-60 overflow-y-auto">
            {availableModels.map((m) => (
              <li key={`${m.brandSlug}-${m.slug}`}>
                <label className="flex cursor-pointer items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={selModels.includes(m.slug)}
                    onChange={() => toggle(selModels, m.slug, setSelModels)}
                    className="h-4 w-4 accent-brand-red"
                  />
                  {m.name}
                </label>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div>
        <h3 className="mb-3 text-xs font-bold uppercase tracking-widest text-brand-charcoal">Catégorie</h3>
        <ul className="space-y-2">
          {categories.map((c) => {
            const n = catCounts[c.slug] || 0;
            return (
              <li key={c.slug}>
                <label className={cn("flex cursor-pointer items-center gap-2 text-sm", n === 0 && "opacity-50")}>
                  <input
                    type="checkbox"
                    checked={selCats.includes(c.slug)}
                    onChange={() => { toggle(selCats, c.slug, setSelCats); setSelSub(""); setPosition("all"); }}
                    className="h-4 w-4 accent-brand-red"
                  />
                  {c.name} <span className="text-xs text-neutral-400">({n})</span>
                </label>
              </li>
            );
          })}
        </ul>
      </div>

      {carrosserieSelected && (
        <>
          <div>
            <h3 className="mb-3 text-xs font-bold uppercase tracking-widest text-brand-charcoal">Sous-catégorie</h3>
            <ul className="space-y-2">
              <li>
                <label className="flex cursor-pointer items-center gap-2 text-sm">
                  <input type="radio" name="sub" checked={selSub === ""} onChange={() => setSelSub("")} className="h-4 w-4 accent-brand-red" />
                  Toutes
                </label>
              </li>
              {carrosserieSubcategories.map((s) => (
                <li key={s.slug}>
                  <label className={cn("flex cursor-pointer items-center gap-2 text-sm", (subCounts[s.slug] || 0) === 0 && "opacity-50")}>
                    <input type="radio" name="sub" checked={selSub === s.slug} onChange={() => setSelSub(s.slug)} className="h-4 w-4 accent-brand-red" />
                    {s.name} <span className="text-xs text-neutral-400">({subCounts[s.slug] || 0})</span>
                  </label>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-3 text-xs font-bold uppercase tracking-widest text-brand-charcoal">Position</h3>
            <Select value={position} onChange={(e) => setPosition(e.target.value as PositionFilter)}>
              <option value="all">Toutes</option>
              <option value="avant">Avant</option>
              <option value="arriere">Arrière</option>
              <option value="gauche">Gauche</option>
              <option value="droit">Droit</option>
            </Select>
          </div>
        </>
      )}

      <div>
        <h3 className="mb-3 text-xs font-bold uppercase tracking-widest text-brand-charcoal">Disponibilité</h3>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={inStockOnly} onChange={(e) => setInStockOnly(e.target.checked)} className="h-4 w-4 accent-brand-red" />
          En stock uniquement
        </label>
      </div>
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
            <option value="newest">Nouveautés</option>
            <option value="nameAsc">Nom A-Z</option>
            <option value="nameDesc">Nom Z-A</option>
          </Select>
        </div>

        {anyActive && (
          <div className="mb-4 flex flex-wrap items-center gap-2">
            {selBrands.map((b) => (
              <button key={b} onClick={() => toggle(selBrands, b, setSelBrands)} className="inline-flex items-center gap-1 rounded-full bg-neutral-100 px-3 py-1 text-xs">
                {brands.find((x) => x.slug === b)?.name} <X className="h-3 w-3" />
              </button>
            ))}
            {selCats.map((c) => (
              <button key={c} onClick={() => toggle(selCats, c, setSelCats)} className="inline-flex items-center gap-1 rounded-full bg-neutral-100 px-3 py-1 text-xs">
                {categories.find((x) => x.slug === c)?.name} <X className="h-3 w-3" />
              </button>
            ))}
            {selSub && (
              <button onClick={() => setSelSub("")} className="inline-flex items-center gap-1 rounded-full bg-neutral-100 px-3 py-1 text-xs">
                {carrosserieSubcategories.find((s) => s.slug === selSub)?.name} <X className="h-3 w-3" />
              </button>
            )}
            {position !== "all" && (
              <button onClick={() => setPosition("all")} className="inline-flex items-center gap-1 rounded-full bg-neutral-100 px-3 py-1 text-xs">
                Position: {position} <X className="h-3 w-3" />
              </button>
            )}
            {inStockOnly && (
              <button onClick={() => setInStockOnly(false)} className="inline-flex items-center gap-1 rounded-full bg-neutral-100 px-3 py-1 text-xs">
                En stock <X className="h-3 w-3" />
              </button>
            )}
            <button onClick={clearAll} className="text-xs font-bold text-brand-red hover:underline ml-2">Tout effacer</button>
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
