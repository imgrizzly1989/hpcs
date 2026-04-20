import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, MessageCircle, Mail } from "lucide-react";
import { brands } from "@/data/brands";
import { buildWhatsAppLink, WHATSAPP_NUMBER } from "@/lib/whatsapp";

export function Footer() {
  return (
    <footer className="mt-20 bg-brand-charcoal text-neutral-300">
      <div className="mx-auto max-w-7xl px-4 md:px-6 py-16">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-red text-white font-black">H</span>
              <span className="font-display text-xl font-black text-white">HPCS</span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-neutral-400">Hamza Parts &amp; Components Supply — votre spécialiste des pièces automobiles chinoises au Maroc.</p>
            <ul className="mt-5 space-y-2 text-sm text-neutral-400">
              <li className="flex items-start gap-2"><MapPin className="h-4 w-4 mt-0.5 text-brand-red shrink-0" /> Casablanca, Maroc</li>
              <li className="flex items-start gap-2"><Phone className="h-4 w-4 mt-0.5 text-brand-red shrink-0" /> +{WHATSAPP_NUMBER}</li>
              <li className="flex items-start gap-2"><Mail className="h-4 w-4 mt-0.5 text-brand-red shrink-0" /> contact@hpcs.ma</li>
              <li>
                <a href={buildWhatsAppLink({})} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-2 rounded-xl bg-[#25D366] px-4 py-2 text-sm font-bold text-white hover:bg-[#1ebe57]">
                  <MessageCircle className="h-4 w-4" /> WhatsApp
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-white">Navigation</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link href="/boutique" className="hover:text-brand-red">Boutique</Link></li>
              <li><Link href="/vehicule" className="hover:text-brand-red">Choisir ma voiture</Link></li>
              <li><Link href="/faq" className="hover:text-brand-red">FAQ</Link></li>
              <li><Link href="/contact" className="hover:text-brand-red">Contact</Link></li>
              <li><Link href="/a-propos" className="hover:text-brand-red">À propos</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-white">Marques chinoises</h3>
            <ul className="mt-4 grid grid-cols-2 gap-y-2 text-sm">
              {brands.map((b) => (
                <li key={b.slug}>
                  <Link href={`/marque/${b.slug}`} className="inline-flex items-center gap-2 hover:text-brand-red">
                    <span className="flex h-5 w-8 shrink-0 items-center justify-center rounded bg-white/5 p-0.5">
                      <Image src={b.logo} alt="" width={32} height={16} className="max-h-4 w-auto object-contain" />
                    </span>
                    {b.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-white">Informations légales</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link href="/mentions-legales" className="hover:text-brand-red">Mentions légales</Link></li>
              <li><Link href="/confidentialite" className="hover:text-brand-red">Politique de confidentialité</Link></li>
              <li><Link href="/conditions" className="hover:text-brand-red">Conditions générales de vente</Link></li>
              <li><Link href="/livraison-retours" className="hover:text-brand-red">Conditions de livraison</Link></li>
              <li><Link href="/livraison-retours" className="hover:text-brand-red">Politique de retours</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-neutral-500 md:flex-row">
          <p>© {new Date().getFullYear()} HPCS — Hamza Parts &amp; Components Supply. Tous droits réservés.</p>
          <div className="flex items-center gap-4">
            <a href={buildWhatsAppLink({})} target="_blank" rel="noopener noreferrer" className="hover:text-white" aria-label="WhatsApp">WhatsApp</a>
            <a href="#" className="hover:text-white" aria-label="Facebook">Facebook</a>
            <a href="#" className="hover:text-white" aria-label="Instagram">Instagram</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
