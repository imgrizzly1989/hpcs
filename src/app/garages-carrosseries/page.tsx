import Link from "next/link";
import { Wrench, MessageCircle, ShieldCheck, Truck } from "lucide-react";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { buildMetadata, breadcrumbJsonLd, faqJsonLd } from "@/lib/seo";
import { buildWhatsAppLink } from "@/lib/whatsapp";

const faq = [
  { q: "CHINAPAL travaille-t-il avec les garages au Maroc ?", a: "Oui. Nous traitons les demandes des garages, ateliers carrosserie et revendeurs qui recherchent des pièces compatibles pour voitures chinoises, avec validation avant commande." },
  { q: "Quelles informations envoyer pour gagner du temps ?", a: "Envoyez la marque, le modèle, l'année, une photo de la pièce, le côté gauche/droit si nécessaire, et idéalement le VIN ou la référence visible." },
  { q: "Pouvez-vous confirmer un prix sans référence exacte ?", a: "Non. Le prix et la disponibilité doivent être confirmés selon la référence exacte, la qualité demandée et la ville de livraison." },
];

export const metadata = buildMetadata({
  title: "Pièces voitures chinoises pour garages au Maroc",
  description: "Service CHINAPAL pour garages et carrosseries au Maroc : pièces chinoises compatibles, vérification VIN/photo, devis WhatsApp et livraison nationale.",
  path: "/garages-carrosseries",
});

export default function GaragesCarrosseriesPage() {
  const whatsappHref = buildWhatsAppLink({ message: "Bonjour CHINAPAL, je suis un garage/atelier et je cherche des pièces pour voitures chinoises. Je peux envoyer photos, VIN et références.", path: "/garages-carrosseries" });
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd([{ name: "Accueil", url: "/" }, { name: "Garages et carrosseries", url: "/garages-carrosseries" }])) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faq)) }} />
      <Breadcrumb items={[{ label: "Accueil", href: "/" }, { label: "Garages et carrosseries" }]} />
      <section className="mt-4 rounded-3xl border border-neutral-200 bg-brand-charcoal p-6 text-white md:p-10">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-red">B2B Maroc · Garages · Ateliers carrosserie</p>
        <h1 className="mt-3 font-display text-3xl font-bold tracking-tight md:text-5xl">Pièces voitures chinoises pour garages et carrosseries au Maroc</h1>
        <p className="mt-5 max-w-4xl text-base leading-relaxed text-white/80 md:text-lg">CHINAPAL aide les professionnels à trouver des pièces compatibles pour MG, Chery, Geely, Haval, BYD, JAC, DFSK et autres marques chinoises. Notre rôle est de vérifier avant de confirmer, plutôt que vendre une pièce qui ne se monte pas.</p>
        <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#25D366] px-5 py-3 text-sm font-bold text-white hover:bg-[#1ebe57]"><MessageCircle className="h-4 w-4" /> Ouvrir une demande garage</a>
      </section>
      <section className="mt-10 grid gap-5 md:grid-cols-3">
        {[{ icon: ShieldCheck, title: "Compatibilité d'abord", text: "VIN, photo, côté, connecteur, version et phase du véhicule sont vérifiés avant devis quand l'information est disponible." }, { icon: Wrench, title: "Pièces souvent demandées", text: "Pare-chocs, phares, rétroviseurs, calandres, filtres, plaquettes, suspension et références d'entretien pour véhicules chinois." }, { icon: Truck, title: "Livraison nationale", text: "Préparation depuis Casablanca et expédition vers les villes marocaines selon la pièce, son volume et sa fragilité." }].map((item) => <div key={item.title} className="rounded-3xl border border-neutral-200 bg-white p-6"><item.icon className="h-6 w-6 text-brand-red" /><h2 className="mt-4 font-display text-xl font-bold text-brand-charcoal">{item.title}</h2><p className="mt-2 text-sm leading-relaxed text-neutral-700">{item.text}</p></div>)}
      </section>
      <section className="mt-10 rounded-3xl border border-neutral-200 bg-white p-6 md:p-8">
        <h2 className="font-display text-2xl font-bold text-brand-charcoal">Méthode de demande pour professionnels</h2>
        <ol className="mt-4 grid gap-3 text-sm leading-relaxed text-neutral-700 md:grid-cols-4">
          <li className="rounded-2xl bg-neutral-50 p-4"><strong>1. Identifier</strong><br />Marque, modèle, année, version et pièce recherchée.</li>
          <li className="rounded-2xl bg-neutral-50 p-4"><strong>2. Envoyer preuves</strong><br />Photo de la pièce, VIN, référence visible, côté gauche/droit.</li>
          <li className="rounded-2xl bg-neutral-50 p-4"><strong>3. Vérifier</strong><br />Nous confirmons la compatibilité possible et les informations manquantes.</li>
          <li className="rounded-2xl bg-neutral-50 p-4"><strong>4. Devis</strong><br />Prix, disponibilité et délai sont confirmés uniquement après référence exploitable.</li>
        </ol>
        <div className="mt-6 flex flex-wrap gap-2">
          <Link href="/verification-vin" className="rounded-lg border border-neutral-200 px-3 py-2 text-sm font-semibold hover:border-brand-red hover:text-brand-red">Processus de vérification VIN</Link>
          <Link href="/pieces/pare-choc-maroc" className="rounded-lg border border-neutral-200 px-3 py-2 text-sm font-semibold hover:border-brand-red hover:text-brand-red">Pare-chocs Maroc</Link>
          <Link href="/pieces/phares-maroc" className="rounded-lg border border-neutral-200 px-3 py-2 text-sm font-semibold hover:border-brand-red hover:text-brand-red">Phares Maroc</Link>
        </div>
      </section>
    </div>
  );
}
