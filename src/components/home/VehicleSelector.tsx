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
      onSubmit={onSubmit}
      className={`rounded-2xl border border-neutral-200 bg-white p-5 shadow-card ${compact ? "" : "md:p-7"}`}
    >
      <div className="mb-4 flex items-center gap-2">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-50 text-brand-red">
          <Car className="h-5 w-5" />
        </span>
        <h2 className="font-display text-lg font-bold text-brand-charcoal">Trouvez la pièce exacte pour votre voiture</h2>
      </div>
      <div className="grid gap-3 md:grid-cols-4">
        <Select value={brand} onChange={(e) => { setBrand(e.target.value); setModel(""); setYear(""); setEngine(""); }}>
          <option value="">Choisir une marque</option>
          {brands.map((b) => <option key={b.slug} value={b.slug}>{b.name}</option>)}
        </Select>
        <Select value={model} onChange={(e) => { setModel(e.target.value); setYear(""); setEngine(""); }} disabled={!brand}>
          <option value="">Choisir un modèle</option>
          {models.map((m) => <option key={m.slug} value={m.slug}>{m.name}</option>)}
        </Select>
        <Select value={year} onChange={(e) => setYear(e.target.value)} disabled={!model}>
          <option value="">Choisir une année</option>
          {years.map((y) => <option key={y} value={y}>{y}</option>)}
        </Select>
        <Select value={engine} onChange={(e) => setEngine(e.target.value)} disabled={!model}>
          <option value="">Choisir un moteur</option>
          {engines.map((e2) => <option key={e2} value={e2}>{e2}</option>)}
        </Select>
      </div>
      <div className="mt-4 flex justify-end">
        <Button type="submit" disabled={!brand}>Rechercher les pièces</Button>
      </div>
    </form>
  );
}
