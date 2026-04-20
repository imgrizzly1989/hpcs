import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { ShopClient } from "@/components/shop/ShopClient";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({ title: "Boutique", description: "Catalogue complet de pièces pour voitures chinoises au Maroc.", path: "/boutique" });

export default function BoutiquePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <Breadcrumb items={[{ label: "Accueil", href: "/" }, { label: "Boutique" }]} />
      <h1 className="mt-4 font-display text-3xl font-bold text-brand-charcoal">Boutique</h1>
      <p className="mt-1 text-sm text-neutral-600">Toutes nos pièces pour voitures chinoises. Filtrez par marque, catégorie ou prix.</p>
      <div className="mt-8">
        <ShopClient />
      </div>
    </div>
  );
}
