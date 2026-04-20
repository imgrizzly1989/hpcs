import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({ title: "À propos", path: "/a-propos" });

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <Breadcrumb items={[{ label: "Accueil", href: "/" }, { label: "À propos" }]} />
      <h1 className="mt-4 font-display text-3xl font-bold">À propos de HPCS</h1>
      <div className="prose mt-6 max-w-none text-neutral-700">
        <p><strong>HPCS — Hamza Parts &amp; Components Supply</strong> est le spécialiste marocain des pièces détachées pour voitures chinoises.</p>
        <p>Notre mission : offrir aux automobilistes marocains équipés de Chery, Geely, MG, Haval, BYD, DFSK, JAC et autres marques chinoises un accès simple, rapide et fiable aux pièces dont ils ont besoin — avec un support professionnel en français et en darija.</p>
        <h2 className="font-display text-xl font-bold mt-8">Nos engagements</h2>
        <ul className="mt-3 space-y-2">
          <li>Pièces OEM ou équivalents OES de qualité équivalente.</li>
          <li>Vérification de compatibilité avant chaque expédition.</li>
          <li>Livraison partout au Maroc en 24 à 72 heures.</li>
          <li>Support humain par WhatsApp 7 jours sur 7.</li>
          <li>Garantie sur chaque commande, politique de retour claire.</li>
        </ul>
        <h2 className="font-display text-xl font-bold mt-8">Le marché des voitures chinoises au Maroc</h2>
        <p>Les marques chinoises représentent une part croissante du parc automobile marocain. Pourtant, l&apos;accès aux pièces d&apos;origine reste complexe : réseaux officiels limités, délais d&apos;importation longs, informations de compatibilité peu accessibles. HPCS a été fondé pour combler ce besoin.</p>
      </div>
    </div>
  );
}
