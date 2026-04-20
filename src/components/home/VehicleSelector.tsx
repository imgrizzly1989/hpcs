"use client";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Select } from "@/components/ui/Select";
import { brands } from "@/data/brands";
import { vehicles, yearsForModel } from "@/data/vehicles";
import { Car } from "lucide-react";

export function VehicleSelector({ compact = false }: { compact?: boolean }) {
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [engine, setEngine] = useState("");
  const router = useRouter();

  const models = useMemo(
    () => vehicles.find((v) => v.brandSlug === brand)?.models ?? [],
    [brand]
  );
  const currentModel = models.find((m) => m.slug === model);
  const years = currentModel ? yearsForModel(currentModel.yearStart, currentModel.yearEnd) : [];
  const engines = currentModel?.engines ?? [];

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (brand) params.set("brand", brand);
    if (model) params.set("model", model);
    if (year) params.set("year", year);
    if (engine) params.set("engine", engine);
    router.push(`/vehicule?${params.toString()}`);
  };

  return (
    <form
      id="vehicule"
      onSubmit={onSubmit}
      className={`rounded-3xl border border-neutral-200 bg-white p-6 shadow-lg ${compact ? "" : "md:p-8"}`}
    >
      <div className="mb-5 flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-brand-red">
          <Car className="h-6 w-6" />
        </span>
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-brand-red">TROUVEZ VOTRE PIÈCE</p>
          <h2 className="font-display text-xl font-bold text-brand-charcoal md:text-2xl">Sélectionnez votre véhicule</h2>
        </div>
      </div>
      <div className="grid gap-3 md:grid-cols-4">
        <Select value={brand} onChange={(e) => { setBrand(e.target.value); setModel(""); setYear(""); setEngine(""); }}>
          <option value="">Marque</option>
          {brands.map((b) => <option key={b.slug} value={b.slug}>{b.name}</option>)}
        </Select>
        <Select value={model} onChange={(e) => { setModel(e.target.value); setYear(""); setEngine(""); }} disabled={!brand}>
          <option value="">Modèle</option>
          {models.map((m) => <option key={m.slug} value={m.slug}>{m.name}</option>)}
        </Select>
        <Select value={year} onChange={(e) => setYear(e.target.value)} disabled={!model}>
          <option value="">Année</option>
          {years.map((y) => <option key={y} value={y}>{y}</option>)}
        </Select>
        <Select value={engine} onChange={(e) => setEngine(e.target.value)} disabled={!model}>
          <option value="">Moteur</option>
          {engines.map((e2) => <option key={e2} value={e2}>{e2}</option>)}
        </Select>
      </div>
      <div className="mt-5">
        <Button type="submit" size="lg" disabled={!brand} className="w-full md:w-auto">
          Rechercher les pièces compatibles
        </Button>
      </div>
    </form>
  );
}
