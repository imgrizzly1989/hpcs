"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Heart, Menu, Search, ShoppingBag, User, X, MessageCircle, MapPin } from "lucide-react";
import { useCart } from "@/store/cartStore";
import { useFavorites } from "@/store/favoritesStore";
import { categories } from "@/data/categories";
import { brands } from "@/data/brands";
import { buildWhatsAppLink, WHATSAPP_NUMBER } from "@/lib/whatsapp";
import { cn } from "@/lib/cn";
import fr from "@/locales/fr.json";

const waDisplay = `+${WHATSAPP_NUMBER.slice(0, 3)} ${WHATSAPP_NUMBER.slice(3, 4)} ${WHATSAPP_NUMBER.slice(4, 6)} ${WHATSAPP_NUMBER.slice(6, 8)} ${WHATSAPP_NUMBER.slice(8, 10)} ${WHATSAPP_NUMBER.slice(10)}`;

export function Header() {
  const count = useCart((s) => s.items.reduce((a, b) => a + b.quantity, 0));
  const favCount = useFavorites((s) => s.ids.length);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<null | "cat" | "brand">(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!openMenu) return;
    const close = () => setOpenMenu(null);
    window.addEventListener("click", close);
    return () => window.removeEventListener("click", close);
  }, [openMenu]);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full border-b bg-white/95 backdrop-blur transition-shadow",
        scrolled ? "border-neutral-200 shadow-sm" : "border-neutral-100"
      )}
    >
      <div className="hidden md:block bg-brand-charcoal text-white text-xs">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 md:px-6 py-2">
          <span className="inline-flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" /> Casablanca, Maroc · Livraison partout au Maroc</span>
          <a href={buildWhatsAppLink({})} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 hover:text-[#25D366]">
            <MessageCircle className="h-3.5 w-3.5" /> WhatsApp : {waDisplay}
          </a>
        </div>
      </div>
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 md:px-6 py-3">
        <button
          aria-label="Menu"
          onClick={() => setOpen(!open)}
          className="md:hidden rounded-lg p-2 hover:bg-neutral-100"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>

        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/images/chinapal-logo.jpg"
            alt="CHINAPAL"
            width={300}
            height={168}
            className="h-14 w-auto rounded md:h-16"
            priority
          />
          <span className="hidden sm:inline text-[10px] uppercase tracking-[0.2em] text-neutral-500">
            Pièces chinoises · Maroc
          </span>
        </Link>

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
          <Link href="/panier" aria-label="Demande de devis" className="relative rounded-lg p-2 hover:bg-neutral-100">
            <ShoppingBag className="h-5 w-5" />
            {count > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-brand-red px-1 text-[10px] font-bold text-white">{count}</span>
            )}
          </Link>
          <a
            href={buildWhatsAppLink({})}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Contacter sur WhatsApp"
            className="hidden sm:inline-flex items-center gap-1.5 rounded-xl bg-[#25D366] px-3 py-2 text-xs font-bold text-white hover:bg-[#1ebe57]"
          >
            <MessageCircle className="h-4 w-4" />
            <span className="hidden lg:inline">WhatsApp</span>
          </a>
        </div>
      </div>

      <nav className="hidden md:block border-t border-neutral-100">
        <div className="mx-auto flex max-w-7xl items-center gap-6 px-4 md:px-6 py-2 text-sm font-medium text-brand-charcoal overflow-x-auto">
          <Link href="/" className="hover:text-brand-red whitespace-nowrap">{fr.nav.home}</Link>
          <Link href="/boutique" className="hover:text-brand-red whitespace-nowrap">{fr.nav.shop}</Link>
          <Link href="/vehicule" className="inline-flex items-center gap-1 hover:text-brand-red whitespace-nowrap">Choisir ma voiture</Link>
          <div className="relative" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setOpenMenu(openMenu === "cat" ? null : "cat")}
              className="hover:text-brand-red whitespace-nowrap"
              aria-expanded={openMenu === "cat"}
            >
              {fr.nav.categories}
            </button>
            <div className={cn(
              "absolute left-0 top-full z-30 mt-2 grid w-[420px] grid-cols-2 gap-1 rounded-2xl border border-neutral-200 bg-white p-3 shadow-lg transition",
              openMenu === "cat" ? "visible opacity-100" : "invisible opacity-0"
            )}>
              {categories.map((c) => (
                <Link key={c.slug} href={`/categorie/${c.slug}`} onClick={() => setOpenMenu(null)} className="rounded-lg px-3 py-2 text-sm hover:bg-neutral-50 hover:text-brand-red">
                  {c.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="relative" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setOpenMenu(openMenu === "brand" ? null : "brand")}
              className="hover:text-brand-red whitespace-nowrap"
              aria-expanded={openMenu === "brand"}
            >
              {fr.nav.brands}
            </button>
            <div className={cn(
              "absolute left-0 top-full z-30 mt-2 grid w-[420px] grid-cols-3 gap-1 rounded-2xl border border-neutral-200 bg-white p-3 shadow-lg transition",
              openMenu === "brand" ? "visible opacity-100" : "invisible opacity-0"
            )}>
              {brands.map((b) => (
                <Link key={b.slug} href={`/marque/${b.slug}`} onClick={() => setOpenMenu(null)} className="rounded-lg px-3 py-2 text-sm hover:bg-neutral-50 hover:text-brand-red">
                  {b.name}
                </Link>
              ))}
            </div>
          </div>
          <Link href="/faq" className="hover:text-brand-red whitespace-nowrap">{fr.nav.faq}</Link>
          <Link href="/contact" className="hover:text-brand-red whitespace-nowrap">{fr.nav.contact}</Link>
        </div>
      </nav>

      {open && (
        <div className="md:hidden border-t border-neutral-200 bg-white">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3 text-sm font-medium">
            <Link href="/" onClick={() => setOpen(false)} className="rounded-lg px-3 py-2 hover:bg-neutral-50">{fr.nav.home}</Link>
            <Link href="/boutique" onClick={() => setOpen(false)} className="rounded-lg px-3 py-2 hover:bg-neutral-50">{fr.nav.shop}</Link>
            <Link href="/vehicule" onClick={() => setOpen(false)} className="rounded-lg px-3 py-2 hover:bg-neutral-50">Choisir ma voiture</Link>
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
            <a href={buildWhatsAppLink({})} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 py-3 text-sm font-bold text-white">
              <MessageCircle className="h-4 w-4" /> Contacter sur WhatsApp
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
