import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({ title: "Confidentialité", path: "/confidentialite" });

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <Breadcrumb items={[{ label: "Accueil", href: "/" }, { label: "Confidentialité" }]} />
      <h1 className="mt-4 font-display text-3xl font-bold">Politique de confidentialité</h1>
      <div className="prose mt-6 max-w-none text-neutral-700 space-y-3">
        <p>CHINAPAL respecte la vie privée de ses clients conformément à la loi 09-08 relative à la protection des données personnelles au Maroc.</p>
        <h2 className="font-display text-xl font-bold">Données collectées</h2>
        <p>Nom, téléphone, ville, adresse de livraison, email — uniquement pour traiter vos commandes et vous contacter.</p>
        <h2 className="font-display text-xl font-bold">Utilisation</h2>
        <p>Les données ne sont jamais revendues. Elles servent exclusivement au traitement de commandes, au SAV et à des communications optionnelles (newsletter).</p>
        <h2 className="font-display text-xl font-bold">Cookies</h2>
        <p>Nous utilisons uniquement des cookies techniques (panier, session). Aucun traceur publicitaire tiers n&apos;est installé.</p>
        <h2 className="font-display text-xl font-bold">Vos droits</h2>
        <p>Vous pouvez à tout moment demander l&apos;accès, la rectification ou la suppression de vos données en écrivant à contact@chinapal.ma.</p>
      </div>
    </div>
  );
}
