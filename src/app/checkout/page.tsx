"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Input, Textarea } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/store/cartStore";

export default function CheckoutPage() {
  const items = useCart((s) => s.items);
  const clear = useCart((s) => s.clear);
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    // Simulated submit — no payment, just lead capture
    setTimeout(() => {
      clear();
      toast.success("Demande envoyée — nous vous contactons sur WhatsApp sous 24h");
      router.push("/compte");
    }, 400);
  };

  return (
    <div className="mx-auto max-w-5xl px-4 md:px-6 py-8 md:py-12">
      <Breadcrumb items={[{ label: "Accueil", href: "/" }, { label: "Ma demande", href: "/panier" }, { label: "Finaliser" }]} />
      <h1 className="mt-4 font-display text-3xl md:text-4xl font-bold tracking-tight text-brand-charcoal">Finaliser ma demande</h1>
      <p className="mt-2 text-neutral-600 leading-relaxed">
        Remplissez vos coordonnées — notre équipe vous contacte sur WhatsApp pour confirmer votre devis et organiser la livraison.
      </p>

      <form onSubmit={onSubmit} className="mt-8 grid gap-8 lg:grid-cols-[1fr_340px]">
        <div className="space-y-6">
          <div className="rounded-2xl border border-neutral-200 bg-white p-6">
            <h2 className="font-display text-lg font-bold text-brand-charcoal">Vos coordonnées</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div><label className="text-xs font-semibold text-neutral-600">Prénom</label><Input name="firstname" required /></div>
              <div><label className="text-xs font-semibold text-neutral-600">Nom</label><Input name="lastname" required /></div>
              <div><label className="text-xs font-semibold text-neutral-600">Téléphone (WhatsApp)</label><Input name="phone" type="tel" required placeholder="+212 6 00 00 00 00" /></div>
              <div><label className="text-xs font-semibold text-neutral-600">Ville</label><Input name="city" required /></div>
              <div className="sm:col-span-2"><label className="text-xs font-semibold text-neutral-600">Adresse de livraison</label><Input name="address" required /></div>
              <div className="sm:col-span-2"><label className="text-xs font-semibold text-neutral-600">Notes (facultatif) — VIN, véhicule, détails</label><Textarea name="notes" /></div>
            </div>
          </div>
        </div>

        <aside className="rounded-2xl border border-neutral-200 bg-white p-6 h-fit lg:sticky lg:top-28">
          <h2 className="font-display text-lg font-bold text-brand-charcoal">Récapitulatif</h2>
          <p className="mt-2 text-sm text-neutral-600">
            {items.length === 0 ? "Votre demande est vide." : "Nous vous contactons pour confirmer votre devis par WhatsApp."}
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            {items.map((i) => (
              <li key={i.id} className="flex justify-between gap-2">
                <span className="line-clamp-1 text-neutral-700">{i.name}</span>
                <span className="shrink-0 font-semibold">× {i.quantity}</span>
              </li>
            ))}
          </ul>
          <Button type="submit" size="lg" className="mt-6 w-full" disabled={submitting || items.length === 0}>
            Envoyer ma demande
          </Button>
          <p className="mt-3 text-xs text-neutral-500">Aucun paiement requis à cette étape.</p>
        </aside>
      </form>
    </div>
  );
}
