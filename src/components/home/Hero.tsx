import Link from "next/link";
import { CheckCircle2, Shield, Truck, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-neutral-200 bg-white">
      <div className="absolute inset-0 -z-10 opacity-[0.04] [background-image:radial-gradient(#1A1D23_1px,transparent_1px)] [background-size:16px_16px]" />
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 md:grid-cols-2 md:py-20">
        <div className="flex flex-col justify-center">
          <span className="inline-flex w-fit items-center gap-2 rounded-full bg-red-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-brand-red">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-red" /> Spécialiste voitures chinoises · Maroc
          </span>
          <h1 className="mt-4 font-display text-4xl font-black leading-tight text-brand-charcoal md:text-5xl">
            Vos pièces pour <span className="text-brand-red">voitures chinoises</span> au Maroc
          </h1>
          <p className="mt-4 max-w-xl text-base text-neutral-600">
            Plaquettes, filtres, phares, amortisseurs et plus — pièces fiables pour Chery, Geely, MG, Haval, BYD, DFSK, JAC et toutes les marques chinoises du marché marocain.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/boutique"><Button size="lg">Parcourir la boutique</Button></Link>
            <Link href="/vehicule"><Button variant="outline" size="lg">Trouver par véhicule</Button></Link>
          </div>
          <ul className="mt-8 grid gap-2 text-sm text-neutral-600 sm:grid-cols-2">
            <li className="flex items-center gap-2"><Truck className="h-4 w-4 text-brand-red" /> Livraison 24-72h partout au Maroc</li>
            <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-brand-red" /> Paiement à la livraison</li>
            <li className="flex items-center gap-2"><Shield className="h-4 w-4 text-brand-red" /> Pièces 100% compatibles</li>
            <li className="flex items-center gap-2"><MessageCircle className="h-4 w-4 text-brand-red" /> Support WhatsApp 7j/7</li>
          </ul>
        </div>
        <div className="relative flex items-center justify-center">
          <div className="relative aspect-[4/3] w-full max-w-lg overflow-hidden rounded-2xl border border-neutral-200 bg-gradient-to-br from-neutral-50 to-neutral-100 shadow-lg">
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-8 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-red text-3xl font-black text-white">H</div>
              <p className="font-display text-2xl font-bold text-brand-charcoal">HPCS</p>
              <p className="text-sm text-neutral-500">Hamza Parts &amp; Components Supply</p>
              <p className="mt-2 text-xs uppercase tracking-widest text-neutral-400">Pièces fiables · Marques chinoises</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
