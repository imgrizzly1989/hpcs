import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({ title: "Conditions générales", path: "/conditions" });

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <Breadcrumb items={[{ label: "Accueil", href: "/" }, { label: "Conditions générales" }]} />
      <h1 className="mt-4 font-display text-3xl font-bold">Conditions générales de vente</h1>
      <div className="prose mt-6 max-w-none text-neutral-700 space-y-3">
        <p>Les présentes conditions régissent les ventes effectuées via le site HPCS.</p>
        <h2 className="font-display text-xl font-bold">1. Commandes</h2>
        <p>Toute commande implique l&apos;acceptation des présentes CGV. La validation se fait en ligne ou via WhatsApp.</p>
        <h2 className="font-display text-xl font-bold">2. Prix</h2>
        <p>Les prix sont indiqués en Dirhams marocains (MAD) TTC, hors frais de livraison.</p>
        <h2 className="font-display text-xl font-bold">3. Paiement</h2>
        <p>Paiement à la livraison en cash. Paiement par carte bancaire bientôt disponible.</p>
        <h2 className="font-display text-xl font-bold">4. Livraison</h2>
        <p>Voir la page Livraison &amp; Retours.</p>
        <h2 className="font-display text-xl font-bold">5. Garantie et responsabilité</h2>
        <p>HPCS garantit la conformité des pièces. La responsabilité de HPCS ne peut être engagée pour des dommages liés à une installation incorrecte.</p>
        <h2 className="font-display text-xl font-bold">6. Juridiction</h2>
        <p>Tout litige est régi par le droit marocain et relève de la juridiction des tribunaux de Casablanca.</p>
      </div>
    </div>
  );
}
