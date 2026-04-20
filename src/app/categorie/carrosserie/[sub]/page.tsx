import Link from "next/link";
import { notFound } from "next/navigation";
import { MessageCircle } from "lucide-react";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { ShopClient } from "@/components/shop/ShopClient";
import { carrosserieSubcategories, getSubcategory } from "@/data/categories";
import { products } from "@/data/products";
import { buildMetadata } from "@/lib/seo";
import { buildWhatsAppLink } from "@/lib/whatsapp";

export function generateStaticParams() {
  return carrosserieSubcategories.map((s) => ({ sub: s.slug }));
}

export async function generateMetadata({ params }: { params: { sub: string } }) {
  const s = getSubcategory("carrosserie", params.sub);
  if (!s) return buildMetadata({ title: "Sous-catégorie" });
  return buildMetadata({
    title: `${s.name} pour voitures chinoises au Maroc`,
    description: `${s.description ?? ""} Compatibles Chery, MG, Geely, Haval, Changan. Devis WhatsApp, livraison au Maroc.`,
    path: `/categorie/carrosserie/${s.slug}`,
  });
}

export default function CarrosserieSubPage({ params }: { params: { sub: string } }) {
  const sub = getSubcategory("carrosserie", params.sub);
  if (!sub) notFound();
  const list = products.filter((p) => p.category === "carrosserie" && p.subcategory === sub.slug);

  return (
    <div className="mx-auto max-w-7xl px-4 md:px-6 py-8 md:py-12">
      <Breadcrumb
        items={[
          { label: "Accueil", href: "/" },
          { label: "Carrosserie", href: "/categorie/carrosserie" },
          { label: sub.name },
        ]}
      />
      <div className="mt-4">
        <p className="text-xs font-bold uppercase tracking-widest text-brand-red">CARROSSERIE · {sub.name.toUpperCase()}</p>
        <h1 className="mt-2 font-display text-3xl md:text-4xl font-bold tracking-tight text-brand-charcoal">
          {sub.name} pour voitures chinoises au Maroc
        </h1>
        {sub.description && <p className="mt-2 max-w-3xl text-neutral-600 leading-relaxed">{sub.description}</p>}
      </div>

      {/* Other subcategories */}
      <div className="mt-6 flex flex-wrap gap-2">
        {carrosserieSubcategories.map((s) => (
          <Link
            key={s.slug}
            href={`/categorie/carrosserie/${s.slug}`}
            className={`rounded-full border px-3 py-1 text-xs font-semibold ${s.slug === sub.slug ? "border-brand-red bg-brand-red text-white" : "border-neutral-300 bg-white hover:border-brand-red hover:text-brand-red"}`}
          >
            {s.name}
          </Link>
        ))}
      </div>

      <div className="mt-10">
        {list.length > 0 ? (
          <ShopClient baseProducts={list} initialCategory="carrosserie" initialSubcategory={sub.slug} />
        ) : (
          <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-8 text-center">
            <p className="text-neutral-600">Aucune pièce trouvée pour cette sous-catégorie. Contactez-nous pour une demande personnalisée.</p>
            <a
              href={buildWhatsAppLink({ message: `Bonjour HPCS, je cherche une pièce de type ${sub.name}.` })}
              target="_blank" rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[#25D366] px-5 py-3 font-bold text-white hover:bg-[#1ebe57]"
            >
              <MessageCircle className="h-5 w-5" /> Contacter HPCS
            </a>
          </div>
        )}
      </div>

      <div className="mt-16 rounded-3xl bg-brand-charcoal p-8 md:p-12 text-center text-white">
        <h2 className="font-display text-2xl md:text-3xl font-bold tracking-tight">Besoin d&apos;aide pour {sub.name.toLowerCase()} ?</h2>
        <p className="mt-3 max-w-2xl mx-auto text-neutral-300">
          Envoyez votre VIN et la pièce recherchée, nous confirmons la compatibilité et le prix.
        </p>
        <a
          href={buildWhatsAppLink({ message: `Bonjour HPCS, je cherche ${sub.name.toLowerCase()} pour ma voiture. VIN : [coller VIN].` })}
          target="_blank" rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#25D366] px-6 py-3 font-bold text-white hover:bg-[#1ebe57]"
        >
          <MessageCircle className="h-5 w-5" /> WhatsApp
        </a>
      </div>
    </div>
  );
}
