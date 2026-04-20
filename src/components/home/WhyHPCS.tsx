import { Shield, Truck, CheckCircle2, MessageCircle, Banknote } from "lucide-react";

const items = [
  { Icon: Truck, title: "Livraison 24-72h", text: "Partout au Maroc via nos partenaires logistiques." },
  { Icon: Banknote, title: "Paiement à la livraison", text: "Payez en cash à la réception. Simple et sécurisé." },
  { Icon: CheckCircle2, title: "100% compatibles", text: "Vérification véhicule avant expédition systématique." },
  { Icon: Shield, title: "Garantie incluse", text: "3 à 24 mois selon la pièce. Remplacement rapide." },
  { Icon: MessageCircle, title: "Support 7j/7", text: "Équipe WhatsApp réactive, en français et en darija." },
];

export function WhyHPCS() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14">
      <h2 className="font-display text-2xl font-bold text-brand-charcoal md:text-3xl">Pourquoi HPCS ?</h2>
      <p className="mt-1 text-sm text-neutral-600">Votre spécialiste des pièces automobiles chinoises.</p>
      <div className="mt-8 grid gap-4 md:grid-cols-5">
        {items.map(({ Icon, title, text }) => (
          <div key={title} className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-card">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-brand-red">
              <Icon className="h-5 w-5" />
            </span>
            <h3 className="mt-3 font-semibold text-brand-charcoal">{title}</h3>
            <p className="mt-1 text-sm text-neutral-600">{text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
