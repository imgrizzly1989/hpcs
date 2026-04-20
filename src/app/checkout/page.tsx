"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Input, Textarea } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/store/cartStore";
import { formatMAD } from "@/lib/format";
import { buildWhatsAppLink } from "@/lib/whatsapp";

type Pay = "cod" | "card" | "whatsapp";

export default function CheckoutPage() {
  const items = useCart((s) => s.items);
  const total = useCart((s) => s.items.reduce((a, b) => a + b.price * b.quantity, 0));
  const clear = useCart((s) => s.clear);
  const router = useRouter();

  const [pay, setPay] = useState<Pay>("cod");
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (items.length === 0) return toast.error("Votre panier est vide");
    if (pay === "card") return toast.error("Paiement par carte bientôt disponible");

    setSubmitting(true);

    if (pay === "whatsapp") {
      const fd = new FormData(e.currentTarget);
      const lines = items.map((i) => `• ${i.name} (réf: ${i.reference}) × ${i.quantity}`).join("\n");
      const msg = `Bonjour HPCS, je souhaite commander :\n${lines}\n\nTotal: ${formatMAD(total)}\nClient: ${fd.get("firstname")} ${fd.get("lastname")}\nTel: ${fd.get("phone")}\nVille: ${fd.get("city")}\nAdresse: ${fd.get("address")}`;
      window.open(buildWhatsAppLink({ message: msg }), "_blank");
      clear();
      toast.success("Commande envoyée sur WhatsApp");
      setTimeout(() => router.push("/compte"), 400);
      return;
    }

    const id = "HPCS-" + Date.now().toString().slice(-6);
    clear();
    toast.success(`Commande ${id} confirmée — paiement à la livraison`);
    setTimeout(() => router.push("/compte"), 400);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <Breadcrumb items={[{ label: "Accueil", href: "/" }, { label: "Panier", href: "/panier" }, { label: "Commande" }]} />
      <h1 className="mt-4 font-display text-3xl font-bold text-brand-charcoal">Validation de commande</h1>

      <form onSubmit={onSubmit} className="mt-6 grid gap-8 lg:grid-cols-[1fr_360px]">
        <div className="space-y-6">
          <div className="rounded-2xl border border-neutral-200 bg-white p-5">
            <h2 className="font-display text-lg font-bold">Informations de livraison</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div><label className="text-xs font-semibold text-neutral-600">Prénom</label><Input name="firstname" required /></div>
              <div><label className="text-xs font-semibold text-neutral-600">Nom</label><Input name="lastname" required /></div>
              <div><label className="text-xs font-semibold text-neutral-600">Téléphone</label><Input name="phone" type="tel" required placeholder="+212 6 00 00 00 00" /></div>
              <div><label className="text-xs font-semibold text-neutral-600">Ville</label><Input name="city" required /></div>
              <div className="sm:col-span-2"><label className="text-xs font-semibold text-neutral-600">Adresse</label><Input name="address" required /></div>
              <div className="sm:col-span-2"><label className="text-xs font-semibold text-neutral-600">Notes (facultatif)</label><Textarea name="notes" /></div>
            </div>
          </div>

          <div className="rounded-2xl border border-neutral-200 bg-white p-5">
            <h2 className="font-display text-lg font-bold">Mode de paiement</h2>
            <div className="mt-4 space-y-2">
              <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-neutral-200 p-3 hover:bg-neutral-50">
                <input type="radio" name="pay" checked={pay === "cod"} onChange={() => setPay("cod")} className="mt-1 accent-brand-red" />
                <div><p className="text-sm font-semibold">Paiement à la livraison</p><p className="text-xs text-neutral-500">Payez en cash à la réception.</p></div>
              </label>
              <label className="flex cursor-not-allowed items-start gap-3 rounded-xl border border-neutral-200 p-3 opacity-60">
                <input type="radio" name="pay" disabled checked={pay === "card"} onChange={() => setPay("card")} className="mt-1 accent-brand-red" />
                <div><p className="text-sm font-semibold">Carte bancaire</p><p className="text-xs text-neutral-500">Bientôt disponible</p></div>
              </label>
              <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-neutral-200 p-3 hover:bg-neutral-50">
                <input type="radio" name="pay" checked={pay === "whatsapp"} onChange={() => setPay("whatsapp")} className="mt-1 accent-brand-red" />
                <div><p className="text-sm font-semibold">Finaliser sur WhatsApp</p><p className="text-xs text-neutral-500">Notre équipe vous contacte immédiatement.</p></div>
              </label>
            </div>
          </div>
        </div>

        <aside className="rounded-2xl border border-neutral-200 bg-white p-5 h-fit sticky top-24">
          <h2 className="font-display text-lg font-bold">Récapitulatif</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {items.map((i) => (
              <li key={i.id} className="flex justify-between gap-2">
                <span className="line-clamp-1 text-neutral-700">{i.name} × {i.quantity}</span>
                <span className="shrink-0 font-semibold">{formatMAD(i.price * i.quantity)}</span>
              </li>
            ))}
            {items.length === 0 && <li className="text-neutral-500">Panier vide</li>}
          </ul>
          <div className="mt-4 border-t pt-3 text-sm flex justify-between"><span className="font-bold">Total</span><span className="font-bold">{formatMAD(total)}</span></div>
          <Button type="submit" size="lg" className="mt-5 w-full" disabled={submitting || items.length === 0}>Confirmer la commande</Button>
        </aside>
      </form>
    </div>
  );
}
