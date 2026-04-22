"use client";
import toast from "react-hot-toast";
import { MessageCircle, Mail, Phone, MapPin } from "lucide-react";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Input, Textarea } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { buildWhatsAppLink, WHATSAPP_NUMBER } from "@/lib/whatsapp";

export default function ContactPage() {
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Merci, nous vous répondons sous 24h");
  };
  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <Breadcrumb items={[{ label: "Accueil", href: "/" }, { label: "Contact" }]} />
      <h1 className="mt-4 font-display text-3xl font-bold">Contactez-nous</h1>
      <p className="mt-1 text-sm text-neutral-600">Notre équipe vous accompagne du lundi au samedi avec priorité sur WhatsApp.</p>

      <div className="mt-8 grid gap-8 md:grid-cols-[1fr_300px]">
        <form onSubmit={onSubmit} className="space-y-4 rounded-2xl border border-neutral-200 bg-white p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div><label className="text-xs font-semibold">Nom complet</label><Input required /></div>
            <div><label className="text-xs font-semibold">Téléphone</label><Input type="tel" required /></div>
          </div>
          <div><label className="text-xs font-semibold">Email</label><Input type="email" required /></div>
          <div><label className="text-xs font-semibold">Message</label><Textarea required placeholder="Modèle du véhicule, pièce recherchée..." /></div>
          <Button type="submit" size="lg">Envoyer</Button>
        </form>

        <aside className="space-y-3">
          <a href={buildWhatsAppLink({})} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 rounded-2xl border border-neutral-200 bg-white p-4 hover:border-[#25D366]">
            <MessageCircle className="h-5 w-5 text-[#25D366]" />
            <div><p className="text-sm font-semibold">WhatsApp</p><p className="text-xs text-neutral-600">+{WHATSAPP_NUMBER}</p><p className="text-xs text-neutral-500">Canal prioritaire pour compatibilité et devis</p></div>
          </a>
          <div className="flex items-center gap-3 rounded-2xl border border-neutral-200 bg-white p-4">
            <Phone className="h-5 w-5 text-brand-red" />
            <div><p className="text-sm font-semibold">Téléphone</p><p className="text-xs text-neutral-600">+{WHATSAPP_NUMBER}</p></div>
          </div>
          <div className="flex items-center gap-3 rounded-2xl border border-neutral-200 bg-white p-4">
            <Mail className="h-5 w-5 text-brand-red" />
            <div><p className="text-sm font-semibold">Email</p><p className="text-xs text-neutral-600">contact@chinapal.ma</p></div>
          </div>
          <div className="flex items-center gap-3 rounded-2xl border border-neutral-200 bg-white p-4">
            <MapPin className="h-5 w-5 text-brand-red" />
            <div><p className="text-sm font-semibold">Adresse</p><p className="text-xs text-neutral-600">Casablanca, Maroc</p></div>
          </div>
          <div className="rounded-2xl border border-neutral-200 bg-white p-4">
            <p className="text-sm font-semibold">Horaires</p>
            <p className="mt-1 text-xs text-neutral-600">Lundi au samedi : 09:00 - 18:30</p>
          </div>
          <div className="rounded-2xl border border-neutral-200 bg-white p-4">
            <p className="text-sm font-semibold">Zone de service</p>
            <p className="mt-1 text-xs text-neutral-600">Casablanca, Rabat, Tanger, Fès, Marrakech, Agadir et livraison dans tout le Maroc.</p>
          </div>
          <div className="rounded-2xl border border-dashed border-neutral-300 bg-neutral-50 p-4">
            <p className="text-sm font-semibold">Repère localisation</p>
            <p className="mt-1 text-xs leading-relaxed text-neutral-600">Entreprise basée à Casablanca. Le plan n&apos;est pas intégré ici, mais notre équipe vous partage la localisation exacte et les consignes d&apos;accès par WhatsApp selon votre besoin.</p>
          </div>
        </aside>
      </div>
    </div>
  );
}
