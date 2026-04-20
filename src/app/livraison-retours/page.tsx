import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({ title: "Livraison & Retours", path: "/livraison-retours" });

export default function DeliveryPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <Breadcrumb items={[{ label: "Accueil", href: "/" }, { label: "Livraison & Retours" }]} />
      <h1 className="mt-4 font-display text-3xl font-bold">Livraison &amp; Retours</h1>
      <div className="prose mt-6 max-w-none text-neutral-700 space-y-4">
        <h2 className="font-display text-xl font-bold">Délais de livraison</h2>
        <p>Nous livrons partout au Maroc en 24 à 72 heures selon la ville. Les grandes agglomérations (Casablanca, Rabat, Marrakech, Tanger, Fès) sont généralement livrées sous 24h.</p>
        <h2 className="font-display text-xl font-bold">Frais de livraison</h2>
        <p>Les frais sont calculés selon le poids, le volume et la destination. Livraison offerte pour les commandes importantes — condition communiquée lors du devis.</p>
        <h2 className="font-display text-xl font-bold">Paiement à la livraison</h2>
        <p>Paiement en cash à la réception, disponible partout au Maroc.</p>
        <h2 className="font-display text-xl font-bold">Politique de retour</h2>
        <p>Vous disposez de 7 jours à compter de la réception pour retourner une pièce non montée, dans son emballage d&apos;origine. Les frais de retour restent à la charge du client sauf erreur de notre part.</p>
        <h2 className="font-display text-xl font-bold">Garantie</h2>
        <p>Toutes nos pièces sont garanties contre les défauts de fabrication, de 3 à 24 mois selon la catégorie de produit.</p>
      </div>
    </div>
  );
}
