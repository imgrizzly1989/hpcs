import Link from "next/link";
import { Car, Lightbulb, Aperture, Grid3x3, MessageCircle } from "lucide-react";
import { buildWhatsAppLink } from "@/lib/whatsapp";

const TILES = [
  { slug: "pare-chocs", name: "Pare-chocs", Icon: Car, desc: "Avant, arrière, spoilers, bas de caisse" },
  { slug: "phares-feux", name: "Phares & Feux", Icon: Lightbulb, desc: "Phares avant, feux arrière, antibrouillards" },
  { slug: "retroviseurs", name: "Rétroviseurs", Icon: Aperture, desc: "Rétroviseurs électriques et coques" },
  { slug: "calandre", name: "Calandres", Icon: Grid3x3, desc: "Calandres et cadres de calandre" },
];

export function CarrosserieShowcase() {
  return (
    <section className="mx-auto max-w-7xl px-4 md:px-6 py-16 md:py-24">
      <div className="mb-8">
        <p className="text-xs font-bold uppercase tracking-widest text-brand-red">CARROSSERIE</p>
        <h2 className="mt-2 font-display text-3xl md:text-4xl font-bold tracking-tight text-brand-charcoal">
          Pièces de carrosserie pour voitures chinoises au Maroc
        </h2>
        <p className="mt-3 max-w-3xl text-neutral-600 leading-relaxed">
          Pare-chocs, phares, rétroviseurs, calandres, ailes, portes et accessoires extérieurs —
          pour toutes les grandes marques chinoises présentes au Maroc (Chery, MG, Geely, Haval, Changan).
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {TILES.map((t) => (
          <Link
            key={t.slug}
            href={`/categorie/carrosserie/${t.slug}`}
            className="group relative overflow-hidden rounded-3xl border border-neutral-200 bg-white p-6 transition hover:-translate-y-0.5 hover:border-brand-red hover:shadow-xl"
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-brand-red transition group-hover:bg-brand-red group-hover:text-white">
              <t.Icon className="h-7 w-7" />
            </span>
            <p className="mt-5 font-display text-lg font-bold text-brand-charcoal">{t.name}</p>
            <p className="mt-1 text-sm text-neutral-500">{t.desc}</p>
            <p className="mt-4 text-xs font-bold text-brand-red">Voir les pièces →</p>
          </Link>
        ))}
      </div>

      <div className="mt-10 flex flex-col items-center gap-4 rounded-3xl bg-brand-charcoal p-8 md:p-10 text-center text-white">
        <h3 className="font-display text-xl md:text-2xl font-bold">Besoin d&apos;une pièce carrosserie ?</h3>
        <p className="max-w-2xl text-neutral-300 text-sm leading-relaxed">
          Envoyez le VIN de votre véhicule sur WhatsApp — notre équipe confirme la disponibilité et vous envoie un devis sous 24h.
        </p>
        <a
          href={buildWhatsAppLink({ message: "Bonjour CHINAPAL, je cherche une pièce de carrosserie." })}
          target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-xl bg-[#25D366] px-6 py-3 font-bold text-white hover:bg-[#1ebe57]"
        >
          <MessageCircle className="h-5 w-5" /> Contactez-nous sur WhatsApp
        </a>
      </div>
    </section>
  );
}
