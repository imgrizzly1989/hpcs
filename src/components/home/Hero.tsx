import Link from "next/link";
import { Truck, Wallet, MessageCircle, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { buildWhatsAppLink } from "@/lib/whatsapp";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-neutral-200 bg-white">
      <div className="absolute inset-0 -z-10 opacity-[0.035] [background-image:radial-gradient(#1A1D23_1px,transparent_1px)] [background-size:16px_16px]" />
      <div className="mx-auto grid max-w-7xl gap-10 px-4 md:px-6 py-16 md:grid-cols-2 md:py-24 md:min-h-[600px] lg:min-h-[700px] md:items-center">
        <div className="flex flex-col justify-center">
          <span className="inline-flex w-fit items-center gap-2 rounded-full bg-red-50 px-3 py-1 text-xs font-bold uppercase tracking-widest text-brand-red">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-red" /> Spécialiste voitures chinoises · Maroc
          </span>
          <h1 className="mt-5 font-display text-4xl font-bold leading-[1.05] tracking-tight text-brand-charcoal md:text-6xl">
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
        <div className="relative flex items-center justify-center">
          <div className="relative aspect-[4/3] w-full max-w-lg overflow-hidden rounded-3xl border border-neutral-200 bg-neutral-50 shadow-xl">
            {/* Hero illustration - premium SVG composition */}
            <svg viewBox="0 0 800 600" className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#1A1D23" />
                  <stop offset="100%" stopColor="#2a2f38" />
                </linearGradient>
                <radialGradient id="spot" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#E11D2E" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#E11D2E" stopOpacity="0" />
                </radialGradient>
              </defs>
              <rect width="800" height="600" fill="url(#bg)" />
              <circle cx="400" cy="300" r="250" fill="url(#spot)" />
              {/* Brake disc */}
              <g transform="translate(400,300)">
                <circle r="180" fill="none" stroke="#3a3f48" strokeWidth="2" />
                <circle r="170" fill="#2a2f38" />
                <circle r="165" fill="none" stroke="#4a4f58" strokeWidth="1" />
                <circle r="60" fill="#1A1D23" />
                <circle r="55" fill="none" stroke="#E11D2E" strokeWidth="3" />
                <circle r="20" fill="#E11D2E" />
                {/* Vents */}
                {Array.from({ length: 24 }).map((_, i) => (
                  <rect key={i} x="-2" y="-160" width="4" height="80" fill="#1A1D23" transform={`rotate(${(i * 360) / 24})`} />
                ))}
                <circle r="120" fill="none" stroke="#3a3f48" strokeWidth="8" />
              </g>
              <text x="400" y="560" textAnchor="middle" fill="#ffffff" fontSize="18" fontWeight="700" fontFamily="system-ui" letterSpacing="4">HPCS · ORIGINE · QUALITÉ</text>
            </svg>
          </div>
        </div>
      </div>

      <div className="bg-brand-charcoal text-white">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-4 md:px-6 py-6 md:grid-cols-4">
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
