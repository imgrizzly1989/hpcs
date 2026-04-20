import Link from "next/link";
import { brands } from "@/data/brands";
import { categories } from "@/data/categories";
import { CheckCircle2 } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-neutral-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-red text-white font-black">H</span>
              <span className="font-display text-xl font-black text-brand-charcoal">HPCS</span>
            </div>
            <p className="mt-3 text-sm text-neutral-600">Hamza Parts &amp; Components Supply — votre spécialiste des pièces automobiles chinoises au Maroc.</p>
            <ul className="mt-4 space-y-1.5 text-xs text-neutral-600">
              {["Livraison 24-72h au Maroc", "Paiement à la livraison", "Pièces 100% compatibles", "Support WhatsApp 7j/7", "Garantie sur commandes"].map((t) => (
                <li key={t} className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-brand-red" /> {t}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-brand-charcoal">Catégories</h3>
            <ul className="mt-4 space-y-2 text-sm text-neutral-600">
              {categories.slice(0, 7).map((c) => (
                <li key={c.slug}><Link href={`/categorie/${c.slug}`} className="hover:text-brand-red">{c.name}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-brand-charcoal">Marques</h3>
            <ul className="mt-4 grid grid-cols-2 gap-y-2 text-sm text-neutral-600">
              {brands.map((b) => (
                <li key={b.slug}><Link href={`/marque/${b.slug}`} className="hover:text-brand-red">{b.name}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-brand-charcoal">Informations</h3>
            <ul className="mt-4 space-y-2 text-sm text-neutral-600">
              <li><Link href="/a-propos" className="hover:text-brand-red">À propos</Link></li>
              <li><Link href="/contact" className="hover:text-brand-red">Contact</Link></li>
              <li><Link href="/faq" className="hover:text-brand-red">FAQ</Link></li>
              <li><Link href="/livraison-retours" className="hover:text-brand-red">Livraison &amp; Retours</Link></li>
              <li><Link href="/confidentialite" className="hover:text-brand-red">Confidentialité</Link></li>
              <li><Link href="/conditions" className="hover:text-brand-red">Conditions générales</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-neutral-200 pt-6 text-xs text-neutral-500 md:flex-row">
          <p>© {new Date().getFullYear()} HPCS — Hamza Parts &amp; Components Supply. Tous droits réservés.</p>
          <p>Conçu au Maroc · fr-MA</p>
        </div>
      </div>
    </footer>
  );
}
