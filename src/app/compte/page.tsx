"use client";
import { useState } from "react";
import Link from "next/link";
import { Package, Heart, MapPin, User as UserIcon } from "lucide-react";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { cn } from "@/lib/cn";
import { useFavorites } from "@/store/favoritesStore";
import { products } from "@/data/products";
import { ProductGrid } from "@/components/shop/ProductGrid";

type Tab = "orders" | "favorites" | "addresses";

export default function AccountPage() {
  const [tab, setTab] = useState<Tab>("orders");
  const favIds = useFavorites((s) => s.ids);
  const favProducts = products.filter((p) => favIds.includes(p.id));

  const tabs: { id: Tab; label: string; Icon: React.ComponentType<{ className?: string }> }[] = [
    { id: "orders", label: "Commandes", Icon: Package },
    { id: "favorites", label: "Favoris", Icon: Heart },
    { id: "addresses", label: "Adresses", Icon: MapPin },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <Breadcrumb items={[{ label: "Accueil", href: "/" }, { label: "Mon compte" }]} />
      <div className="mt-4 flex items-center gap-3">
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-brand-red"><UserIcon className="h-6 w-6" /></span>
        <div>
          <h1 className="font-display text-2xl font-bold">Bonjour 👋</h1>
          <p className="text-sm text-neutral-600">Bienvenue dans votre espace HPCS</p>
        </div>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-[220px_1fr]">
        <nav className="space-y-1">
          {tabs.map(({ id, label, Icon }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={cn(
                "flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold transition",
                tab === id ? "bg-brand-red text-white" : "hover:bg-neutral-100 text-brand-charcoal"
              )}
            >
              <Icon className="h-4 w-4" /> {label}
            </button>
          ))}
          <Link href="/" className="block rounded-xl px-3 py-2 text-sm font-semibold text-neutral-500 hover:bg-neutral-100">Déconnexion</Link>
        </nav>

        <section className="rounded-2xl border border-neutral-200 bg-white p-6">
          {tab === "orders" && (
            <div className="py-10 text-center">
              <Package className="mx-auto h-10 w-10 text-neutral-300" />
              <h2 className="mt-3 font-display text-lg font-bold">Aucune commande pour l&apos;instant</h2>
              <p className="mt-1 text-sm text-neutral-600">Commencez par explorer notre catalogue.</p>
              <Link href="/boutique" className="mt-4 inline-block rounded-xl bg-brand-red px-5 py-2 text-sm font-bold text-white">Parcourir la boutique</Link>
            </div>
          )}
          {tab === "favorites" && (
            <div>
              <h2 className="mb-4 font-display text-lg font-bold">Mes favoris</h2>
              {favProducts.length === 0 ? (
                <p className="text-sm text-neutral-600">Aucun favori pour le moment.</p>
              ) : (
                <ProductGrid products={favProducts} />
              )}
            </div>
          )}
          {tab === "addresses" && (
            <div className="py-10 text-center">
              <MapPin className="mx-auto h-10 w-10 text-neutral-300" />
              <h2 className="mt-3 font-display text-lg font-bold">Aucune adresse enregistrée</h2>
              <p className="mt-1 text-sm text-neutral-600">Ajoutez une adresse de livraison pour accélérer vos commandes.</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
