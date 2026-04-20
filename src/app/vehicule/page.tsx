import Link from "next/link";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { VehicleSelector } from "@/components/home/VehicleSelector";
import { ProductGrid } from "@/components/shop/ProductGrid";
import { products } from "@/data/products";
import { getBrand } from "@/data/brands";
import { getVehiclesForBrand } from "@/data/vehicles";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({ title: "Recherche par véhicule", path: "/vehicule" });

export default function VehiclePage({ searchParams }: { searchParams: { brand?: string; model?: string; year?: string; engine?: string } }) {
  const { brand, model, year, engine } = searchParams;
  const brandData = brand ? getBrand(brand) : undefined;
  const modelData = brand && model ? getVehiclesForBrand(brand)?.models.find((m) => m.slug === model) : undefined;

  const matches = products.filter((p) =>
    p.compatibleVehicles.some((v) => {
      if (brand && v.brandSlug !== brand) return false;
      if (model && v.modelSlug !== model) return false;
      if (year) {
        const y = parseInt(year);
        if (y < v.years[0] || y > v.years[1]) return false;
      }
      if (engine && v.engines.length > 0 && !v.engines.includes(engine)) return false;
      return true;
    })
  );

  const hasQuery = Boolean(brand);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <Breadcrumb items={[{ label: "Accueil", href: "/" }, { label: "Recherche par véhicule" }]} />
      <h1 className="mt-4 font-display text-3xl font-bold text-brand-charcoal">Recherche par véhicule</h1>
      <p className="mt-1 text-sm text-neutral-600">Sélectionnez votre véhicule pour afficher uniquement les pièces compatibles.</p>

      <div className="mt-6">
        <VehicleSelector />
      </div>

      {hasQuery && (
        <div className="mt-10">
          <h2 className="font-display text-xl font-bold text-brand-charcoal">
            Résultats pour {brandData?.name ?? brand}
            {modelData ? ` ${modelData.name}` : ""}
            {year ? ` ${year}` : ""}
            {engine ? ` · ${engine}` : ""}
          </h2>
          <p className="mb-5 text-sm text-neutral-600">{matches.length} pièce(s) compatible(s)</p>
          {matches.length > 0 ? (
            <ProductGrid products={matches} />
          ) : (
            <div className="rounded-2xl border border-dashed border-neutral-300 bg-neutral-50 p-10 text-center">
              <p className="text-neutral-600">Aucune pièce ne correspond actuellement à ce véhicule.</p>
              <Link href="/contact" className="mt-3 inline-block text-sm font-semibold text-brand-red hover:underline">
                Contactez-nous — nous pouvons commander pour vous →
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
