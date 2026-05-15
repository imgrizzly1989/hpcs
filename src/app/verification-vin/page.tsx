import Link from "next/link";
import { Camera, MessageCircle, SearchCheck, ShieldAlert } from "lucide-react";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { buildMetadata, breadcrumbJsonLd, faqJsonLd } from "@/lib/seo";
import { buildWhatsAppLink } from "@/lib/whatsapp";

const faq = [
  { q: "Pourquoi le VIN est-il demandé pour une pièce chinoise ?", a: "Une même carrosserie peut avoir plusieurs références selon l'année, la finition, le marché d'importation, le connecteur, le côté ou la phase du modèle." },
  { q: "Puis-je envoyer seulement une photo ?", a: "Oui, une photo claire peut aider. Mais si la référence OEM n'est pas visible ou confirmée, nous ne l'inventons pas et pouvons demander plus d'informations." },
  { q: "La vérification garantit-elle toujours la compatibilité ?", a: "Elle réduit fortement le risque, mais dépend de la qualité des informations reçues. CHINAPAL préfère vérifier avant de confirmer." },
];

export const metadata = buildMetadata({
  title: "Vérification VIN pièces voitures chinoises Maroc",
  description: "Pourquoi envoyer VIN, photo ou référence OEM à CHINAPAL avant de commander une pièce MG, Chery, Geely, Haval, BYD ou JAC au Maroc.",
  path: "/verification-vin",
});

export default function VerificationVinPage() {
  const whatsappHref = buildWhatsAppLink({ message: "Bonjour CHINAPAL, je veux vérifier une pièce avec VIN/photo/référence avant commande.", path: "/verification-vin" });
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd([{ name: "Accueil", url: "/" }, { name: "Vérification VIN", url: "/verification-vin" }])) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faq)) }} />
      <Breadcrumb items={[{ label: "Accueil", href: "/" }, { label: "Vérification VIN" }]} />
      <section className="mt-4 rounded-3xl border border-neutral-200 bg-white p-6 md:p-10">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-red">Compatibilité · Pièces chinoises Maroc</p>
        <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-brand-charcoal md:text-5xl">Vérification VIN avant commande de pièces pour voitures chinoises</h1>
        <p className="mt-5 max-w-4xl text-base leading-relaxed text-neutral-700 md:text-lg">Deux pièces peuvent se ressembler mais changer par connecteur, fixation, côté, phase ou version. Avant de confirmer un devis, CHINAPAL demande le VIN, une photo ou la référence visible afin de limiter les erreurs sur MG, Chery, Geely, Haval, BYD, JAC, DFSK et autres marques chinoises au Maroc.</p>
        <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#25D366] px-5 py-3 text-sm font-bold text-white hover:bg-[#1ebe57]"><MessageCircle className="h-4 w-4" /> Envoyer VIN/photo sur WhatsApp</a>
      </section>
      <section className="mt-10 grid gap-5 md:grid-cols-3">
        {[{ icon: Camera, title: "Ce que vous envoyez", text: "VIN si disponible, photo de la pièce, photo du véhicule, côté gauche/droit, année et modèle exact." }, { icon: SearchCheck, title: "Ce que nous vérifions", text: "Version, fixation, connecteur, phase, catégorie de pièce et cohérence avec les références disponibles." }, { icon: ShieldAlert, title: "Ce que nous évitons", text: "Les montages approximatifs, les références inventées, les promesses de stock non confirmées et les retours coûteux." }].map((item) => <div key={item.title} className="rounded-3xl border border-neutral-200 bg-neutral-50 p-6"><item.icon className="h-6 w-6 text-brand-red" /><h2 className="mt-4 font-display text-xl font-bold text-brand-charcoal">{item.title}</h2><p className="mt-2 text-sm leading-relaxed text-neutral-700">{item.text}</p></div>)}
      </section>
      <section className="mt-10 rounded-3xl border border-neutral-200 bg-white p-6 md:p-8">
        <h2 className="font-display text-2xl font-bold text-brand-charcoal">Pourquoi c&apos;est important au Maroc</h2>
        <p className="mt-3 text-neutral-700 leading-relaxed">Le marché marocain mélange véhicules importés, finitions différentes et modèles récents. Pour les phares, pare-chocs, rétroviseurs, filtres, plaquettes ou pièces de suspension, une recherche par nom de modèle ne suffit pas toujours. Si la référence OEM n&apos;est pas visible ou confirmée, nous ne l&apos;inventons pas.</p>
        <div className="mt-6 flex flex-wrap gap-2">
          <Link href="/garages-carrosseries" className="rounded-lg border border-neutral-200 px-3 py-2 text-sm font-semibold hover:border-brand-red hover:text-brand-red">Service garages</Link>
          <Link href="/vehicule" className="rounded-lg border border-neutral-200 px-3 py-2 text-sm font-semibold hover:border-brand-red hover:text-brand-red">Choisir marque et modèle</Link>
          <Link href="/pieces/pare-choc-maroc" className="rounded-lg border border-neutral-200 px-3 py-2 text-sm font-semibold hover:border-brand-red hover:text-brand-red">Pièces carrosserie</Link>
        </div>
      </section>
    </div>
  );
}
