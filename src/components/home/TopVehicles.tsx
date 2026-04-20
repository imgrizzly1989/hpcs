import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { getBrand } from "@/data/brands";

type TopVehicle = { brand: string; model: string; label: string };

const VEHICLES: TopVehicle[] = [
  { brand: "mg", model: "zs", label: "MG ZS" },
  { brand: "chery", model: "tiggo-4-pro", label: "Chery Tiggo 4 Pro" },
  { brand: "geely", model: "coolray", label: "Geely Coolray" },
  { brand: "haval", model: "jolion", label: "Haval Jolion" },
  { brand: "haval", model: "h6", label: "Haval H6" },
  { brand: "mg", model: "hs", label: "MG HS" },
  { brand: "chery", model: "tiggo-7-pro", label: "Chery Tiggo 7 Pro" },
  { brand: "geely", model: "emgrand", label: "Geely Emgrand" },
];

export function TopVehicles() {
  return (
    <section className="mx-auto max-w-7xl px-4 md:px-6 py-16 md:py-20">
      <div className="mb-10">
        <p className="text-xs font-bold uppercase tracking-widest text-brand-red">VÉHICULES COUVERTS</p>
        <h2 className="mt-2 font-display text-3xl md:text-4xl font-bold tracking-tight text-brand-charcoal">
          Top véhicules avec stock disponible
        </h2>
        <p className="mt-2 text-sm text-neutral-600">
          Pièces en stock pour les modèles les plus roulés au Maroc.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
        {VEHICLES.map((v) => {
          const brand = getBrand(v.brand);
          return (
            <Link
              key={`${v.brand}-${v.model}`}
              href={`/vehicule?brand=${v.brand}&model=${v.model}`}
              className="group flex flex-col rounded-2xl border border-neutral-200 bg-white p-4 transition hover:-translate-y-0.5 hover:border-brand-red hover:shadow-lg"
            >
              <div className="flex h-10 items-center">
                {brand && (
                  <Image
                    src={brand.logo}
                    alt={brand.name}
                    width={96}
                    height={32}
                    className="max-h-8 w-auto object-contain"
                  />
                )}
              </div>
              <h3 className="mt-3 font-display text-base font-bold text-brand-charcoal">{v.label}</h3>
              <p className="mt-1 text-xs text-neutral-500">Pièces disponibles</p>
              <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-brand-red">
                Voir toutes les pièces
                <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
