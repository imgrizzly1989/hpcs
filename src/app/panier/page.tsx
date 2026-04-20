"use client";
import Link from "next/link";
import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/store/cartStore";
import { Button } from "@/components/ui/Button";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { formatMAD } from "@/lib/format";

export default function CartPage() {
  const items = useCart((s) => s.items);
  const setQty = useCart((s) => s.setQty);
  const remove = useCart((s) => s.remove);
  const total = useCart((s) => s.items.reduce((a, b) => a + b.price * b.quantity, 0));

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <Breadcrumb items={[{ label: "Accueil", href: "/" }, { label: "Panier" }]} />
      <h1 className="mt-4 font-display text-3xl font-bold text-brand-charcoal">Mon panier</h1>

      {items.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-dashed border-neutral-300 bg-neutral-50 p-12 text-center">
          <p className="text-neutral-600">Votre panier est vide.</p>
          <Link href="/boutique" className="mt-4 inline-block"><Button>Continuer mes achats</Button></Link>
        </div>
      ) : (
        <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_360px]">
          <div className="space-y-3">
            {items.map((it) => (
              <div key={it.id} className="flex items-center gap-4 rounded-2xl border border-neutral-200 bg-white p-4">
                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-neutral-50">
                  <Image src={it.image} alt={it.name} fill sizes="80px" className="object-contain p-2" />
                </div>
                <div className="flex-1 min-w-0">
                  <Link href={`/produit/${it.slug}`} className="line-clamp-2 text-sm font-semibold text-brand-charcoal hover:text-brand-red">{it.name}</Link>
                  <p className="mt-0.5 text-xs text-neutral-500">Réf: {it.reference}</p>
                  <p className="mt-1 text-sm font-bold">{formatMAD(it.price)}</p>
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

          <aside className="rounded-2xl border border-neutral-200 bg-white p-5 h-fit sticky top-24">
            <h2 className="font-display text-lg font-bold text-brand-charcoal">Récapitulatif</h2>
            <div className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-neutral-600">Sous-total</span><span className="font-semibold">{formatMAD(total)}</span></div>
              <div className="flex justify-between"><span className="text-neutral-600">Livraison</span><span className="text-neutral-500 text-xs">Calculée à l&apos;étape suivante</span></div>
              <div className="border-t pt-2 flex justify-between text-base"><span className="font-bold">Total</span><span className="font-bold">{formatMAD(total)}</span></div>
            </div>
            <Link href="/checkout"><Button className="mt-5 w-full" size="lg">Passer la commande</Button></Link>
            <Link href="/boutique" className="mt-3 block text-center text-xs font-semibold text-neutral-600 hover:text-brand-red">Continuer mes achats</Link>
          </aside>
        </div>
      )}
    </div>
  );
}
