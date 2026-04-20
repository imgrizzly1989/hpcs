import { Car, Search, MessageCircle, Truck } from "lucide-react";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { Button } from "@/components/ui/Button";

const steps = [
  { Icon: Car, title: "Choisissez votre véhicule", text: "Sélectionnez marque, modèle, année et motorisation." },
  { Icon: Search, title: "Trouvez votre pièce", text: "Parcourez notre catalogue ou cherchez par référence OEM." },
  { Icon: MessageCircle, title: "Contactez-nous sur WhatsApp", text: "Confirmez la disponibilité et recevez votre devis." },
  { Icon: Truck, title: "Livraison au Maroc", text: "Paiement à la livraison dans toutes les villes du Maroc." },
];

export function HowToOrder() {
  return (
    <section className="bg-neutral-50 border-y border-neutral-200">
      <div className="mx-auto max-w-7xl px-4 md:px-6 py-16 md:py-24">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-widest text-brand-red">COMMENT COMMANDER</p>
          <h2 className="mt-2 font-display text-3xl md:text-4xl font-bold tracking-tight text-brand-charcoal">
            Votre pièce livrée en 4 étapes simples
          </h2>
          <p className="mt-3 text-neutral-600 leading-relaxed">
            Un processus rapide, sans surprise, pensé pour les particuliers comme pour les garages professionnels.
          </p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-4">
          {steps.map(({ Icon, title, text }, i) => (
            <div key={title} className="relative rounded-2xl border border-neutral-200 bg-white p-6 shadow-card">
              <span className="absolute -top-3 left-6 rounded-full bg-brand-red px-3 py-1 text-xs font-black text-white">
                Étape {i + 1}
              </span>
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-brand-red">
                <Icon className="h-6 w-6" />
              </span>
              <h3 className="mt-4 font-display text-lg font-bold text-brand-charcoal">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-600">{text}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <a href={buildWhatsAppLink({})} target="_blank" rel="noopener noreferrer">
            <Button variant="whatsapp" size="lg">
              <MessageCircle className="h-5 w-5" />
              Commencer ma demande sur WhatsApp
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}
