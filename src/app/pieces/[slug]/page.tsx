import Link from "next/link";
import { notFound } from "next/navigation";
import { MessageCircle } from "lucide-react";
import { ProductCard } from "@/components/product/ProductCard";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { products } from "@/data/products";
import { seoCategories, getSeoCategory } from "@/data/seoCategories";
import { buildMetadata, breadcrumbJsonLd, faqJsonLd } from "@/lib/seo";
import { buildWhatsAppLink } from "@/lib/whatsapp";

export function generateStaticParams() {
  return seoCategories.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const page = getSeoCategory(params.slug);
  if (!page) return buildMetadata({ title: "Pièces auto" });
  return buildMetadata({
    title: page.title,
    description: page.description,
    path: `/pieces/${page.slug}`,
  });
}

function getSeoProducts(slug: string) {
  const page = getSeoCategory(slug);
  if (!page) return [];
  return products
    .filter((p) => {
      const byCategory = page.categorySlugs?.includes(p.category) ?? false;
      const byName = page.nameRegex ? page.nameRegex.test(p.name) : false;
      return byCategory || byName;
    })
    .slice(0, 48);
}

export default function PiecesSeoPage({ params }: { params: { slug: string } }) {
  const page = getSeoCategory(params.slug);
  if (!page) notFound();

  const listed = getSeoProducts(params.slug);
  const faq = [
    {
      q: "Comment vérifier la compatibilité de la pièce avec mon véhicule ?",
      a: "Envoyez votre modèle, année et idéalement votre numéro VIN sur WhatsApp. L'équipe CHINAPAL confirme la référence compatible avant validation.",
    },
    {
      q: "Livrez-vous partout au Maroc ?",
      a: "Oui. CHINAPAL livre à Casablanca, Rabat, Marrakech, Tanger, Fès, Agadir, Oujda et dans tout le Maroc en 24 à 72h selon la destination.",
    },
    {
      q: "Pourquoi le prix n'est pas affiché ?",
      a: "Les prix sont traités sur demande pour garantir la bonne version de la pièce selon le véhicule et la disponibilité. Le devis est envoyé rapidement sur WhatsApp.",
    },
  ];

  const breadcrumbLd = breadcrumbJsonLd([
    { name: "Accueil", url: "/" },
    { name: "Pièces auto", url: "/boutique" },
    { name: page.h1, url: `/pieces/${page.slug}` },
  ]);

  const faqLd = faqJsonLd(faq);

  return (
    <div className="mx-auto max-w-7xl px-4 md:px-6 py-8 md:py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      <Breadcrumb items={[{ label: "Accueil", href: "/" }, { label: "Pièces auto", href: "/boutique" }, { label: page.h1 }]} />

      <section className="mt-4 rounded-2xl border border-neutral-200 bg-white p-6 md:p-8">
        <p className="text-xs font-bold uppercase tracking-widest text-brand-red">SEO MAROC</p>
        <h1 className="mt-2 font-display text-3xl md:text-4xl font-bold tracking-tight text-brand-charcoal">{page.h1}</h1>
        <p className="mt-3 max-w-4xl text-neutral-600 leading-relaxed">{page.description}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {page.internalLinks.map((l) => (
            <Link key={l.href} href={l.href} className="rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-1.5 text-sm font-medium text-brand-charcoal hover:border-brand-red hover:text-brand-red">
              {l.label}
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-2xl md:text-3xl font-bold tracking-tight text-brand-charcoal">Références disponibles</h2>
        <p className="mt-2 text-neutral-600">Sélection de pièces compatibles pour voitures chinoises au Maroc. Prix sur demande, validation rapide via WhatsApp.</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {listed.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="mt-12 rounded-2xl border border-neutral-200 bg-neutral-50 p-6 md:p-8">
        <h2 className="font-display text-2xl font-bold tracking-tight text-brand-charcoal">Pourquoi CHINAPAL pour vos pièces chinoises au Maroc ?</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <p className="text-sm text-neutral-700">• Entreprise basée à Casablanca, focalisée uniquement sur les véhicules chinois.</p>
          <p className="text-sm text-neutral-700">• Support WhatsApp rapide pour vérifier compatibilité, position et version.</p>
          <p className="text-sm text-neutral-700">• Service pour particuliers, garagistes et revendeurs au Maroc.</p>
          <p className="text-sm text-neutral-700">• Livraison nationale avec emballage adapté aux pièces sensibles.</p>
        </div>
        <a
          href={buildWhatsAppLink({ message: `Bonjour CHINAPAL, je cherche ${page.h1.toLowerCase()} pour mon véhicule au Maroc.` })}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#25D366] px-6 py-3 font-bold text-white hover:bg-[#1ebe57]"
        >
          <MessageCircle className="h-5 w-5" /> Demander disponibilité et prix sur WhatsApp
        </a>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-2xl font-bold tracking-tight text-brand-charcoal">FAQ rapide</h2>
        <div className="mt-4 space-y-3">
          {faq.map((item) => (
            <details key={item.q} className="rounded-xl border border-neutral-200 bg-white p-4">
              <summary className="cursor-pointer text-sm font-semibold text-brand-charcoal">{item.q}</summary>
              <p className="mt-2 text-sm text-neutral-600 leading-relaxed">{item.a}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
