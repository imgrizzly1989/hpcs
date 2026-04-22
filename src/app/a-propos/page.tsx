import Link from "next/link";
import { Check, MapPin, MessageCircle } from "lucide-react";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { buildMetadata } from "@/lib/seo";
import { TrustStats } from "@/components/home/TrustStats";
import { buildWhatsAppLink } from "@/lib/whatsapp";

export const metadata = buildMetadata({
  title: "À propos",
  description:
    "CHINAPAL — spécialiste des pièces automobiles chinoises au Maroc. Notre histoire, notre mission, nos engagements pour les propriétaires de Chery, Geely, MG, Haval, BYD et plus.",
  path: "/a-propos",
});

const ENGAGEMENTS = [
  "Pièces 100% compatibles vérifiées par VIN",
  "Délais de livraison respectés",
  "Support technique humain via WhatsApp",
  "Tarifs transparents, sans frais cachés",
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="border-b border-neutral-200 bg-white">
        <div className="mx-auto max-w-5xl px-4 md:px-6 py-12 md:py-20">
          <Breadcrumb items={[{ label: "Accueil", href: "/" }, { label: "À propos" }]} />
          <span className="mt-5 inline-flex w-fit items-center gap-2 rounded-full bg-red-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-red">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-red" /> À propos d&apos;CHINAPAL
          </span>
          <h1 className="mt-4 font-display text-3xl md:text-5xl font-bold tracking-tight text-brand-charcoal">
            À propos d&apos;CHINAPAL
          </h1>
          <p className="mt-3 max-w-3xl text-base md:text-lg text-neutral-600 leading-relaxed">
            Spécialiste des pièces automobiles chinoises au Maroc.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4 md:px-6 py-12 md:py-16 space-y-14">
        <section className="grid gap-4 md:grid-cols-2">
          <div className="rounded-3xl border border-neutral-200 bg-white p-6">
            <p className="text-xs font-bold uppercase tracking-widest text-brand-red">Entreprise basée à Casablanca</p>
            <p className="mt-3 text-sm leading-relaxed text-neutral-700">CHINAPAL opère depuis Casablanca avec une logistique pensée pour servir rapidement les demandes venant de tout le Maroc, aussi bien sur des pièces d&apos;entretien que sur des pièces de carrosserie.</p>
          </div>
          <div className="rounded-3xl border border-neutral-200 bg-white p-6">
            <p className="text-xs font-bold uppercase tracking-widest text-brand-red">Service pour particuliers et garages</p>
            <p className="mt-3 text-sm leading-relaxed text-neutral-700">Nous accompagnons les automobilistes, ateliers, garages et revendeurs qui recherchent une pièce compatible pour véhicule chinois avec validation rapide sur WhatsApp.</p>
          </div>
        </section>

        {/* Histoire */}
        <section>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-brand-charcoal">Notre histoire</h2>
          <div className="mt-4 space-y-4 text-neutral-700 leading-relaxed">
            <p>
              CHINAPAL — Chinapal Auto Parts — a été fondé à Casablanca par Hamza, après plusieurs années passées à importer des pièces OEM pour véhicules japonais. En discutant chaque jour avec des mécaniciens et des automobilistes, il a constaté un problème récurrent : les propriétaires de voitures chinoises au Maroc étaient mal servis.
            </p>
            <p>
              Les pièces étaient difficiles à trouver, les délais d&apos;importation longs, et de nombreux garages utilisaient des substituts génériques faute d&apos;alternative. Face à cette frustration partagée, Hamza a pris la décision de se spécialiser à 100% dans les pièces pour voitures chinoises — devenant l&apos;un des premiers importateurs dédiés au Maroc.
            </p>
            <p>
              Depuis, CHINAPAL s&apos;est imposé comme l&apos;interlocuteur de référence pour les propriétaires de Chery, Geely, MG, Haval, BYD, Changan, JAC et plus de 12 marques chinoises présentes dans le Royaume.
            </p>
          </div>
        </section>

        {/* Mission */}
        <section>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-brand-charcoal">Notre mission</h2>
          <p className="mt-4 text-neutral-700 leading-relaxed">
            Simplifier l&apos;accès aux pièces compatibles pour les propriétaires marocains de voitures chinoises. Une référence, une photo, un WhatsApp — et la pièce arrive. Nous voulons que posséder une voiture chinoise au Maroc soit aussi simple que posséder une européenne ou une japonaise.
          </p>
        </section>

        {/* Engagement */}
        <section>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-brand-charcoal">Notre engagement</h2>
          <ul className="mt-5 grid gap-3 md:grid-cols-2">
            {ENGAGEMENTS.map((e) => (
              <li key={e} className="flex items-start gap-3 rounded-2xl border border-neutral-200 bg-white p-4">
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-red-50 text-brand-red">
                  <Check className="h-4 w-4" />
                </span>
                <p className="text-sm font-medium text-brand-charcoal">{e}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* Pourquoi chinoises */}
        <section>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-brand-charcoal">Pourquoi les voitures chinoises ?</h2>
          <p className="mt-4 text-neutral-700 leading-relaxed">
            Les marques chinoises — MG, Chery, Haval, Geely, BYD, Changan, JAC — connaissent une croissance spectaculaire au Maroc depuis plusieurs années. Elles offrent un rapport qualité-prix remarquable, des équipements modernes et des performances solides. Mais ce boom s&apos;accompagne d&apos;un besoin critique : un service après-vente spécialisé, capable de fournir rapidement les pièces compatibles. C&apos;est exactement la mission d&apos;CHINAPAL.
          </p>
        </section>

        {/* Closing strip */}
        <section className="rounded-3xl bg-brand-charcoal px-6 py-10 md:px-10 md:py-12 text-white">
          <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-red">
                <MapPin className="h-4 w-4" /> Basé à Casablanca
              </p>
              <h2 className="mt-2 font-display text-2xl md:text-3xl font-bold">
                Au service de tout le Maroc
              </h2>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href={buildWhatsAppLink({})}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-[#25D366] px-5 py-3 text-sm font-bold hover:bg-[#1ebe57]"
              >
                <MessageCircle className="h-4 w-4" /> Contacter sur WhatsApp
              </a>
              <Link
                href="/boutique"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 px-5 py-3 text-sm font-bold hover:bg-white/10"
              >
                Voir le catalogue
              </Link>
            </div>
          </div>
        </section>
      </div>

      <TrustStats />
    </>
  );
}
