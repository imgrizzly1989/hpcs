"use client";
import Link from "next/link";
import Image from "next/image";
import { Minus, Plus, Trash2, MessageCircle } from "lucide-react";
import { useCart } from "@/store/cartStore";
import { Button } from "@/components/ui/Button";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { buildCartWhatsAppLink } from "@/lib/whatsapp";

export default function CartPage() {
  const items = useCart((s) => s.items);
  const setQty = useCart((s) => s.setQty);
  const remove = useCart((s) => s.remove);

  const waHref = buildCartWhatsAppLink(items);

  return (
    <div className="mx-auto max-w-7xl px-4 md:px-6 py-8 md:py-12">
      <Breadcrumb items={[{ label: "Accueil", href: "/" }, { label: "Ma demande de devis" }]} />
      <h1 className="mt-4 font-display text-3xl md:text-4xl font-bold tracking-tight text-brand-charcoal">Ma demande de devis</h1>
      <p className="mt-2 text-neutral-600 leading-relaxed">Préparez la liste de pièces souhaitées, puis envoyez-la en 1 clic sur WhatsApp.</p>

      {items.length === 0 ? (
        <div className="mt-8 rounded-3xl border border-dashed border-neutral-300 bg-neutral-50 p-12 text-center">
          <p className="text-neutral-600">Votre demande est vide.</p>
          <Link href="/boutique" className="mt-4 inline-block"><Button>Parcourir la boutique</Button></Link>
        </div>
      ) : (
        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_380px]">
          <div className="space-y-3">
            {items.map((it) => (
              <div key={it.id} className="flex items-center gap-4 rounded-2xl border border-neutral-200 bg-white p-4">
                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-neutral-50">
                  <Image src={it.image} alt={it.name} fill sizes="80px" className="object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <Link href={`/produit/${it.slug}`} className="line-clamp-2 text-sm font-semibold text-brand-charcoal hover:text-brand-red">{it.name}</Link>
                  <p className="mt-0.5 text-xs text-neutral-500">Réf : {it.reference}</p>
                  <p className="mt-1 text-xs text-neutral-500">Prix sur demande</p>
                </div>
                <div className="flex items-center rounded-xl border border-neutral-300">
                  <button aria-label="-" onClick={() => setQty(it.id, it.quantity - 1)} className="h-9 w-9 flex items-center justify-center"><Minus className="h-3.5 w-3.5" /></button>
                  <span className="w-8 text-center text-sm font-semibold">{it.quantity}</span>
                  <button aria-label="+" onClick={() => setQty(it.id, it.quantity + 1)} className="h-9 w-9 flex items-center justify-center"><Plus className="h-3.5 w-3.5" /></button>
                </div>
                <button aria-label="Retirer" onClick={() => remove(it.id)} className="rounded-lg p-2 text-neutral-500 hover:bg-red-50 hover:text-brand-red">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>

          <aside className="rounded-2xl border border-neutral-200 bg-white p-6 h-fit lg:sticky lg:top-28">
            <h2 className="font-display text-lg font-bold text-brand-charcoal">Envoyer ma demande</h2>
            <p className="mt-2 text-sm text-neutral-600 leading-relaxed">
              Nous vous contactons pour confirmer votre devis par WhatsApp — disponibilité, prix et livraison en moins de 24h.
            </p>
            <div className="mt-4 text-sm">
              <div className="flex justify-between text-neutral-600">
                <span>Articles</span>
                <span className="font-semibold text-brand-charcoal">{items.reduce((a, b) => a + b.quantity, 0)}</span>
              </div>
            </div>
            <a href={waHref} target="_blank" rel="noopener noreferrer" className="mt-5 block">
              <Button variant="whatsapp" size="lg" className="w-full" type="button">
                <MessageCircle className="h-5 w-5" />
                Envoyer ma demande sur WhatsApp
              </Button>
            </a>
            <Link href="/checkout" className="mt-3 block text-center text-xs font-semibold text-neutral-600 hover:text-brand-red">
              Ou faire ma demande par formulaire →
            </Link>
            <Link href="/boutique" className="mt-2 block text-center text-xs font-semibold text-neutral-500 hover:text-brand-red">
              Continuer mes recherches
            </Link>
          </aside>
        </div>
      )}
    </div>
  );
}
