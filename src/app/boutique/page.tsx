import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { ShopClient } from "@/components/shop/ShopClient";
import { buildMetadata } from "@/lib/seo";
import { buildWhatsAppLink } from "@/lib/whatsapp";

export const metadata = buildMetadata({
  title: "Boutique",
  description: "Boutique HPCS : catalogue complet de pièces pour voitures chinoises au Maroc. Chery, Geely, MG, Haval, BYD. Devis WhatsApp, livraison 24-72h.",
  path: "/boutique",
});

export default function BoutiquePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 md:px-6 py-8 md:py-12">
      <Breadcrumb items={[{ label: "Accueil", href: "/" }, { label: "Boutique" }]} />
      <div className="mt-4">
        <p className="text-xs font-bold uppercase tracking-widest text-brand-red">NOTRE CATALOGUE</p>
        <h1 className="mt-2 font-display text-3xl md:text-4xl font-bold tracking-tight text-brand-charcoal">Boutique</h1>
        <p className="mt-2 text-neutral-600 leading-relaxed max-w-2xl">Toutes nos pièces pour voitures chinoises. Filtrez par marque, modèle ou catégorie.</p>
      </div>
      <div className="mt-10">
        <ShopClient />
      </div>

      {/* Shop footer CTA */}
      <div className="mt-16 rounded-3xl bg-brand-charcoal p-8 md:p-12 text-center text-white">
        <h2 className="font-display text-2xl md:text-3xl font-bold tracking-tight">Vous ne trouvez pas votre pièce ?</h2>
        <p className="mt-3 text-neutral-300 max-w-2xl mx-auto leading-relaxed">
          Envoyez-nous le numéro de châssis (VIN) de votre véhicule et la pièce recherchée — nous la trouvons pour vous.
        </p>
        <a
          href={buildWhatsAppLink({ message: "Bonjour HPCS, je cherche une pièce spécifique. VIN de mon véhicule : [coller VIN]. Pièce recherchée : [décrire]." })}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#25D366] px-6 py-3 font-bold text-white hover:bg-[#1ebe57]"
        >
          <MessageCircle className="h-5 w-5" />
          Contacter HPCS sur WhatsApp
        </a>
        <p className="mt-4 text-xs text-neutral-400">
          Ou consultez <Link href="/faq" className="underline hover:text-white">notre FAQ</Link> pour les questions fréquentes.
        </p>
      </div>
    </div>
  );
}
