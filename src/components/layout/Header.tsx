"use client";
import Link from "next/link";
import { useState } from "react";
import { Heart, Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { useCart } from "@/store/cartStore";
import { useFavorites } from "@/store/favoritesStore";
import { categories } from "@/data/categories";
import { brands } from "@/data/brands";
import fr from "@/locales/fr.json";

export function Header() {
  const count = useCart((s) => s.items.reduce((a, b) => a + b.quantity, 0));
  const favCount = useFavorites((s) => s.ids.length);
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-neutral-200 bg-white/95 backdrop-blur">
      <div className="bg-brand-charcoal text-white text-xs">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-1.5">
          <span>Livraison 24-72h au Maroc · Paiement à la livraison</span>
          <span className="hidden sm:inline">Support WhatsApp 7j/7</span>
        </div>
      </div>
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
        <button
          aria-label="Menu"
          onClick={() => setOpen(!open)}
          className="md:hidden rounded-lg p-2 hover:bg-neutral-100"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>

        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-red text-white font-black">H</span>
          <span className="flex flex-col leading-tight">
            <span className="font-display text-lg font-black tracking-tight text-brand-charcoal">HPCS</span>
            <span className="hidden sm:inline text-[10px] uppercase tracking-widest text-neutral-500">Pièces chinoises · Maroc</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-brand-charcoal">
          <Link href="/" className="hover:text-brand-red">{fr.nav.home}</Link>
          <Link href="/boutique" className="hover:text-brand-red">{fr.nav.shop}</Link>
          <div className="group relative">
            <button className="hover:text-brand-red">{fr.nav.categories}</button>
            <div className="invisible absolute left-0 top-full z-30 mt-2 grid w-[420px] grid-cols-2 gap-1 rounded-2xl border border-neutral-200 bg-white p-3 opacity-0 shadow-lg transition group-hover:visible group-hover:opacity-100">
              {categories.map((c) => (
                <Link key={c.slug} href={`/categorie/${c.slug}`} className="rounded-lg px-3 py-2 text-sm hover:bg-neutral-50 hover:text-brand-red">
                  {c.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="group relative">
            <button className="hover:text-brand-red">{fr.nav.brands}</button>
            <div className="invisible absolute left-0 top-full z-30 mt-2 grid w-[420px] grid-cols-3 gap-1 rounded-2xl border border-neutral-200 bg-white p-3 opacity-0 shadow-lg transition group-hover:visible group-hover:opacity-100">
              {brands.map((b) => (
                <Link key={b.slug} href={`/marque/${b.slug}`} className="rounded-lg px-3 py-2 text-sm hover:bg-neutral-50 hover:text-brand-red">
                  {b.name}
                </Link>
              ))}
            </div>
          </div>
          <Link href="/faq" className="hover:text-brand-red">{fr.nav.faq}</Link>
          <Link href="/contact" className="hover:text-brand-red">{fr.nav.contact}</Link>
        </nav>

        <div className="flex items-center gap-1">
          <Link href="/boutique" aria-label="Rechercher" className="rounded-lg p-2 hover:bg-neutral-100">
            <Search className="h-5 w-5" />
          </Link>
          <Link href="/favoris" aria-label="Favoris" className="relative rounded-lg p-2 hover:bg-neutral-100">
            <Heart className="h-5 w-5" />
            {favCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-brand-red px-1 text-[10px] font-bold text-white">{favCount}</span>
            )}
          </Link>
          <Link href="/compte" aria-label="Compte" className="hidden sm:inline-flex rounded-lg p-2 hover:bg-neutral-100">
            <User className="h-5 w-5" />
          </Link>
          <Link href="/panier" aria-label="Panier" className="relative rounded-lg p-2 hover:bg-neutral-100">
            <ShoppingBag className="h-5 w-5" />
            {count > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-brand-red px-1 text-[10px] font-bold text-white">{count}</span>
            )}
          </Link>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-neutral-200 bg-white">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3 text-sm font-medium">
            <Link href="/" onClick={() => setOpen(false)} className="rounded-lg px-3 py-2 hover:bg-neutral-50">{fr.nav.home}</Link>
            <Link href="/boutique" onClick={() => setOpen(false)} className="rounded-lg px-3 py-2 hover:bg-neutral-50">{fr.nav.shop}</Link>
            <details className="group">
              <summary className="cursor-pointer list-none rounded-lg px-3 py-2 hover:bg-neutral-50">{fr.nav.categories}</summary>
              <div className="grid grid-cols-2 gap-1 pl-3">
                {categories.map((c) => (
                  <Link key={c.slug} href={`/categorie/${c.slug}`} onClick={() => setOpen(false)} className="rounded-lg px-3 py-1.5 text-sm text-neutral-600 hover:text-brand-red">{c.name}</Link>
                ))}
              </div>
            </details>
            <details className="group">
              <summary className="cursor-pointer list-none rounded-lg px-3 py-2 hover:bg-neutral-50">{fr.nav.brands}</summary>
              <div className="grid grid-cols-3 gap-1 pl-3">
                {brands.map((b) => (
                  <Link key={b.slug} href={`/marque/${b.slug}`} onClick={() => setOpen(false)} className="rounded-lg px-3 py-1.5 text-sm text-neutral-600 hover:text-brand-red">{b.name}</Link>
                ))}
              </div>
            </details>
            <Link href="/faq" onClick={() => setOpen(false)} className="rounded-lg px-3 py-2 hover:bg-neutral-50">{fr.nav.faq}</Link>
            <Link href="/contact" onClick={() => setOpen(false)} className="rounded-lg px-3 py-2 hover:bg-neutral-50">{fr.nav.contact}</Link>
          </nav>
        </div>
      )}
    </header>
  );
}
