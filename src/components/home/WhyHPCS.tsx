import { Target, Truck, ShieldCheck, Wrench } from "lucide-react";

const items = [
  { Icon: Target, title: "Spécialiste voitures chinoises", text: "Nous ne faisons que ça depuis nos débuts. Une expertise pointue sur Chery, Geely, Haval, MG, BYD et plus." },
  { Icon: Truck, title: "Livraison dans tout le Maroc", text: "De Casablanca à Dakhla, de Tanger à Oujda — livraison rapide 24-72h." },
  { Icon: ShieldCheck, title: "Compatibilité garantie", text: "Chaque pièce est vérifiée avec votre numéro de châssis (VIN) avant expédition." },
  { Icon: Wrench, title: "Service pour garages", text: "Tarifs préférentiels et volumes pour mécaniciens et revendeurs professionnels." },
];

export function WhyHPCS() {
  return (
    <section className="mx-auto max-w-7xl px-4 md:px-6 py-16 md:py-24">
      <div className="mb-10">
        <p className="text-xs font-bold uppercase tracking-widest text-brand-red">POURQUOI HPCS</p>
        <h2 className="mt-2 font-display text-3xl md:text-4xl font-bold tracking-tight text-brand-charcoal">
          Le bon interlocuteur pour les pièces chinoises
        </h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {items.map(({ Icon, title, text }) => (
          <div key={title} className="rounded-2xl border border-neutral-200 bg-white p-6 transition hover:shadow-xl">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-brand-red">
              <Icon className="h-6 w-6" />
            </span>
            <h3 className="mt-4 font-display text-lg font-bold text-brand-charcoal">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-neutral-600">{text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
