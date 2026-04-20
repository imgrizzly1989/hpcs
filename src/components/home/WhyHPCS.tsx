import { Target, Truck, MessageCircle, ShieldCheck, Users, BadgeCheck } from "lucide-react";

const items = [
  {
    Icon: Target,
    title: "Spécialiste voitures chinoises au Maroc",
    text: "Notre seule spécialité depuis nos débuts. Expertise sur Chery, Geely, MG, Haval, BYD, Changan et plus de 12 marques.",
  },
  {
    Icon: Truck,
    title: "Livraison rapide partout au Maroc",
    text: "Casablanca, Rabat, Marrakech, Tanger, Agadir, Fès, Oujda, Dakhla — 24-72h dans tout le Royaume.",
  },
  {
    Icon: MessageCircle,
    title: "Support WhatsApp 7j/7",
    text: "Réponse rapide. Envoyez votre VIN, nous trouvons la pièce exacte.",
  },
  {
    Icon: ShieldCheck,
    title: "Pièces testées et compatibles",
    text: "Chaque référence vérifiée avant expédition. Compatibilité garantie par VIN.",
  },
  {
    Icon: Users,
    title: "Service particuliers et garages",
    text: "Tarifs préférentiels et volumes pour mécaniciens, ateliers, revendeurs.",
  },
  {
    Icon: BadgeCheck,
    title: "Stock sélectionné avec soin",
    text: "Nous ne stockons que les pièces les plus demandées par les conducteurs marocains.",
  },
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
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {items.map(({ Icon, title, text }) => (
          <div
            key={title}
            className="rounded-2xl border border-neutral-200 bg-white p-6 transition hover:shadow-xl"
          >
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
