import Link from "next/link";
import Image from "next/image";
import { Truck, Wallet, MessageCircle, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { brands } from "@/data/brands";

export function Hero() {
  // Pick 6 most-searched brands for the hero grid
  const heroBrands = ["chery", "geely", "haval", "mg", "byd", "jac"]
    .map((s) => brands.find((b) => b.slug === s)!)
    .filter(Boolean);

  return (
    <section className="relative overflow-hidden border-b border-neutral-200 bg-white">
      <div className="absolute inset-0 -z-10 opacity-[0.035] [background-image:radial-gradient(#1A1D23_1px,transparent_1px)] [background-size:16px_16px]" />
      <div className="mx-auto grid max-w-7xl gap-10 px-4 md:px-6 lg:px-8 py-16 md:grid-cols-2 md:py-24 md:items-center">
        <div className="flex flex-col justify-center">
          <span className="inline-flex w-fit items-center gap-2 rounded-full bg-red-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-red">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-red" /> Spécialiste voitures chinoises · Maroc
          </span>
          <h1 className="mt-5 font-display text-3xl sm:text-4xl font-bold leading-[1.05] tracking-tight text-brand-charcoal md:text-6xl">
            Pièces d&apos;origine pour <span className="text-brand-red">voitures chinoises</span> au Maroc
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-neutral-600 md:text-lg">
            Chery · Geely · Haval · MG · BYD · JAC · Great Wall · DFSK · BAIC · Dongfeng · Jetour · FAW — trouvez la pièce exacte pour votre véhicule et commandez en 1 clic via WhatsApp.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a href={buildWhatsAppLink({})} target="_blank" rel="noopener noreferrer">
              <Button variant="whatsapp" size="lg" className="w-full sm:w-auto">
                <MessageCircle className="h-5 w-5" />
                Commander sur WhatsApp
              </Button>
            </a>
            <Link href="#vehicule">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">Choisir ma voiture</Button>
            </Link>
          </div>
        </div>

        {/* Right: brand grid card */}
        <div className="relative flex items-center justify-center">
          <div className="relative w-full max-w-lg rounded-3xl border border-neutral-200 bg-white p-8 shadow-xl md:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-red">Marques couvertes</p>
            <h2 className="mt-2 font-display text-xl font-bold tracking-tight text-brand-charcoal">
              12 marques, pièces d&apos;origine vérifiées
            </h2>
            <div className="mt-6 grid grid-cols-3 gap-3">
              {heroBrands.map((b) => (
                <Link
                  key={b.slug}
                  href={`/marque/${b.slug}`}
                  className="group flex h-20 items-center justify-center rounded-xl border border-neutral-200 bg-white p-3 transition hover:border-brand-red hover:shadow-md"
                  aria-label={b.name}
                >
                  <Image
                    src={b.logo}
                    alt={`${b.name} logo`}
                    width={120}
                    height={48}
                    className="max-h-12 w-auto object-contain transition group-hover:scale-105"
                  />
                </Link>
              ))}
            </div>
            <Link
              href="#marques"
              className="mt-6 block text-center text-xs font-semibold text-neutral-500 hover:text-brand-red"
            >
              Voir les 12 marques →
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-brand-charcoal text-white">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-4 md:px-6 lg:px-8 py-6 md:grid-cols-4">
          {[
            { Icon: Truck, title: "Livraison 24-72h", text: "Dans tout le Maroc" },
            { Icon: Wallet, title: "Paiement à la livraison", text: "Cash à la réception" },
            { Icon: MessageCircle, title: "Support WhatsApp", text: "7j/7 en français" },
            { Icon: ShieldCheck, title: "100% compatibles", text: "Vérifiées avant envoi" },
          ].map(({ Icon, title, text }) => (
            <div key={title} className="flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-brand-red">
                <Icon className="h-5 w-5" />
              </span>
              <div className="min-w-0">
                <p className="text-sm font-bold">{title}</p>
                <p className="text-xs text-neutral-400">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
