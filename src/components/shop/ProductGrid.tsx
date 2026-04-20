"use client";
import { PackageX, MessageCircle } from "lucide-react";
import { Product } from "@/types";
import { ProductCard } from "@/components/product/ProductCard";
import { buildWhatsAppLink } from "@/lib/whatsapp";

export function ProductGrid({ products }: { products: Product[] }) {
  if (products.length === 0) {
    const msg = "Bonjour HPCS, je cherche une pièce que je n'ai pas trouvée sur votre site. Pièce recherchée : [décrivez] — pour [véhicule / modèle / année].";
    return (
      <div className="rounded-3xl border border-dashed border-neutral-300 bg-neutral-50 p-10 text-center">
        <PackageX className="mx-auto h-12 w-12 text-neutral-400" />
        <h3 className="mt-4 font-display text-xl font-bold text-brand-charcoal">Aucune pièce trouvée</h3>
        <p className="mt-2 text-sm text-neutral-600 max-w-md mx-auto leading-relaxed">
          Nous n&apos;avons pas encore cette référence en stock — mais nous pouvons la commander pour vous.
        </p>
        <a
          href={buildWhatsAppLink({ message: msg })}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#25D366] px-5 py-3 text-sm font-bold text-white hover:bg-[#1ebe57]"
        >
          <MessageCircle className="h-4 w-4" />
          Rechercher ma pièce sur WhatsApp
        </a>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
      {products.map((p) => <ProductCard key={p.id} product={p} />)}
    </div>
  );
}
