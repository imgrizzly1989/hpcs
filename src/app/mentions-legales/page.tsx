import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Mentions légales",
  description: "Mentions légales de HPCS — Hamza Parts & Components Supply, spécialiste des pièces pour voitures chinoises au Maroc.",
  path: "/mentions-legales",
});

export default function MentionsLegalesPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 md:px-6 py-12">
      <Breadcrumb items={[{ label: "Accueil", href: "/" }, { label: "Mentions légales" }]} />
      <h1 className="mt-4 font-display text-3xl md:text-4xl font-bold tracking-tight text-brand-charcoal">Mentions légales</h1>
      <div className="prose prose-neutral mt-6 max-w-none text-sm leading-relaxed text-neutral-700 space-y-5">
        <section>
          <h2 className="font-display text-xl font-bold text-brand-charcoal">Éditeur du site</h2>
          <p>Le site HPCS est édité par <strong>Hamza Parts &amp; Components Supply (HPCS)</strong>, entreprise spécialisée dans la vente de pièces détachées pour voitures chinoises au Maroc.</p>
          <p>Siège social : Casablanca, Maroc.<br />Contact : contact@hpcs.ma</p>
        </section>
        <section>
          <h2 className="font-display text-xl font-bold text-brand-charcoal">Hébergement</h2>
          <p>Site hébergé sur Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, USA.</p>
        </section>
        <section>
          <h2 className="font-display text-xl font-bold text-brand-charcoal">Propriété intellectuelle</h2>
          <p>L&apos;ensemble du contenu du site (textes, images, identité visuelle) est la propriété exclusive de HPCS, sauf mention contraire. Toute reproduction, représentation, modification ou adaptation, totale ou partielle, est interdite sans autorisation écrite préalable.</p>
        </section>
        <section>
          <h2 className="font-display text-xl font-bold text-brand-charcoal">Marques citées</h2>
          <p>Les marques automobiles citées (Chery, Geely, MG, Haval, BYD, DFSK, JAC, Great Wall, BAIC, Dongfeng, Jetour, FAW) sont la propriété de leurs détenteurs respectifs. HPCS est un distributeur indépendant non affilié aux constructeurs.</p>
        </section>
        <section>
          <h2 className="font-display text-xl font-bold text-brand-charcoal">Responsabilité</h2>
          <p>Les informations (disponibilité, compatibilité, délais) sont fournies à titre indicatif. Les prix sont communiqués exclusivement sur demande via WhatsApp ou formulaire de contact, après vérification de la compatibilité avec votre véhicule.</p>
        </section>
        <section>
          <h2 className="font-display text-xl font-bold text-brand-charcoal">Loi applicable</h2>
          <p>Les présentes mentions sont soumises au droit marocain. Tout litige relève de la compétence exclusive des tribunaux de Casablanca.</p>
        </section>
      </div>
    </div>
  );
}
