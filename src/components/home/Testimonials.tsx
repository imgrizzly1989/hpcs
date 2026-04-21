import { Quote } from "lucide-react";

type T = { name: string; city: string; role: string; text: string };

const ITEMS: T[] = [
  {
    name: "Karim B.",
    city: "Casablanca",
    role: "Propriétaire MG ZS 2020",
    text: "J'ai cherché des plaquettes de frein pour ma MG ZS pendant 2 semaines à Derb Omar avant de tomber sur CHINAPAL. Pièce originale, livrée en 48h. Service nickel.",
  },
  {
    name: "Youssef T.",
    city: "Rabat",
    role: "Garagiste indépendant",
    text: "En tant que mécanicien j'ai souvent besoin de pièces pour Chery et Haval. CHINAPAL répond vite sur WhatsApp, m'envoie les références, et livre rapidement. Devenu mon fournisseur principal.",
  },
  {
    name: "Salma A.",
    city: "Marrakech",
    role: "Propriétaire Geely Coolray 2021",
    text: "J'avais peur de ne pas trouver de filtre habitacle pour ma Coolray. CHINAPAL l'a confirmé compatible avec mon VIN et livré à Marrakech en 3 jours. Très professionnel.",
  },
  {
    name: "Mehdi K.",
    city: "Tanger",
    role: "Propriétaire Haval Jolion 2022",
    text: "Phare avant cassé après un accident. CHINAPAL m'a trouvé l'original pour ma Jolion et livré à Tanger. Prix correct, service rapide.",
  },
  {
    name: "Rachid M.",
    city: "Agadir",
    role: "Atelier auto",
    text: "Service pro, tarifs préférentiels pour les garages. CHINAPAL connaît vraiment les voitures chinoises — c'est rare au Maroc.",
  },
];

function initials(name: string) {
  return name
    .split(/\s+/)
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function Testimonials() {
  return (
    <section className="mx-auto max-w-7xl px-4 md:px-6 py-16 md:py-24">
      <div className="mb-10">
        <p className="text-xs font-bold uppercase tracking-widest text-brand-red">ILS NOUS FONT CONFIANCE</p>
        <h2 className="mt-2 font-display text-3xl md:text-4xl font-bold tracking-tight text-brand-charcoal">
          Ce que disent nos clients
        </h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {ITEMS.map((t) => (
          <figure
            key={t.name}
            className="flex h-full flex-col rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm"
          >
            <Quote className="h-6 w-6 text-brand-red/70" />
            <blockquote className="mt-3 flex-1 text-sm italic leading-relaxed text-neutral-700">
              « {t.text} »
            </blockquote>
            <hr className="my-4 border-neutral-200" />
            <figcaption className="flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-red text-sm font-bold text-white">
                {initials(t.name)}
              </span>
              <div className="min-w-0">
                <p className="text-sm font-bold text-brand-charcoal">{t.name}</p>
                <p className="truncate text-xs text-neutral-500">
                  {t.role} — {t.city}
                </p>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
      <p className="mt-6 text-center text-xs text-neutral-400">
        Témoignages représentatifs de nos clients. Noms et photos modifiés pour préserver la confidentialité.
      </p>
    </section>
  );
}
