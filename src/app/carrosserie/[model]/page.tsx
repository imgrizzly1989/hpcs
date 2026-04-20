import Link from "next/link";
import { notFound } from "next/navigation";
import { MessageCircle } from "lucide-react";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { ProductGrid } from "@/components/shop/ProductGrid";
import { carrosserieSubcategories } from "@/data/categories";
import { products } from "@/data/products";
import { vehicles } from "@/data/vehicles";
import { buildMetadata } from "@/lib/seo";
import { buildWhatsAppLink } from "@/lib/whatsapp";

const MODEL_SLUGS = [
  "mg-zs", "chery-tiggo-4-pro", "chery-tiggo-7-pro",
  "geely-coolray", "geely-gx3-pro", "haval-h6",
  "haval-jolion", "changan-cs55", "mg-hs",
];

// Map route slug -> { brandSlug, modelSlug, name }
function resolveModel(routeSlug: string) {
  for (const v of vehicles) {
    for (const m of v.models) {
      if (`${v.brandSlug}-${m.slug}` === routeSlug || m.slug === routeSlug) {
        return { brandSlug: v.brandSlug, modelSlug: m.slug, name: m.name };
      }
    }
  }
  return null;
}

export function generateStaticParams() {
  return MODEL_SLUGS.map((model) => ({ model }));
}

export async function generateMetadata({ params }: { params: { model: string } }) {
  const m = resolveModel(params.model);
  if (!m) return buildMetadata({ title: "Carrosserie" });
  return buildMetadata({
    title: `Pièces de carrosserie ${m.name} au Maroc`,
    description: `Pare-chocs, phares, rétroviseurs, ailes, portes et essuie-glaces pour ${m.name}. Devis WhatsApp, livraison 24-72h.`,
    path: `/carrosserie/${params.model}`,
  });
}

export default function CarrosserieModelPage({ params }: { params: { model: string } }) {
  const m = resolveModel(params.model);
  if (!m) notFound();
  const list = products.filter(
    (p) => p.category === "carrosserie" && p.compatibleVehicles.some((v) => v.modelSlug === m.modelSlug && v.brandSlug === m.brandSlug),
  );
  // Group by subcategory
  const groups: Record<string, typeof list> = {};
  for (const p of list) {
    if (!p.subcategory) continue;
    (groups[p.subcategory] ||= []).push(p);
  }

  const otherModels = MODEL_SLUGS.filter((s) => s !== params.model);

  return (
    <div className="mx-auto max-w-7xl px-4 md:px-6 py-8 md:py-12">
      <Breadcrumb
        items={[
          { label: "Accueil", href: "/" },
          { label: "Carrosserie", href: "/categorie/carrosserie" },
          { label: m.name },
        ]}
      />
      <div className="mt-4">
        <p className="text-xs font-bold uppercase tracking-widest text-brand-red">CARROSSERIE · {m.name.toUpperCase()}</p>
        <h1 className="mt-2 font-display text-3xl md:text-4xl font-bold tracking-tight text-brand-charcoal">
          Pièces de carrosserie {m.name}
        </h1>
        <p className="mt-2 max-w-3xl text-neutral-600 leading-relaxed">
          {list.length} références de carrosserie compatibles {m.name} : pare-chocs, phares, rétroviseurs, ailes, portes, essuie-glaces…
        </p>
      </div>

      {carrosserieSubcategories.map((s) => {
        const arr = groups[s.slug] || [];
        if (arr.length === 0) return null;
        return (
          <section key={s.slug} className="mt-12">
            <div className="flex items-end justify-between gap-4">
              <h2 className="font-display text-xl md:text-2xl font-bold tracking-tight text-brand-charcoal">{s.name}</h2>
              <Link href={`/categorie/carrosserie/${s.slug}`} className="text-sm font-bold text-brand-red hover:underline">Voir tout →</Link>
            </div>
            <div className="mt-4">
              <ProductGrid products={arr} />
            </div>
          </section>
        );
      })}

      {/* Cross-links to other models */}
      <section className="mt-16">
        <h2 className="font-display text-lg font-bold text-brand-charcoal">Autres modèles</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {otherModels.map((slug) => {
            const o = resolveModel(slug);
            if (!o) return null;
            return (
              <Link key={slug} href={`/carrosserie/${slug}`} className="rounded-full border border-neutral-300 bg-white px-3 py-1 text-xs font-semibold hover:border-brand-red hover:text-brand-red">
                Carrosserie {o.name}
              </Link>
            );
          })}
        </div>
      </section>

      <section className="mt-16 rounded-3xl bg-brand-red p-8 md:p-12 text-center text-white">
        <h2 className="font-display text-2xl md:text-3xl font-bold tracking-tight">Pièce introuvable pour votre {m.name} ?</h2>
        <p className="mt-3 max-w-2xl mx-auto text-white/90">
          Envoyez-nous le VIN et la description, nous vous revenons sous 24h avec un devis.
        </p>
        <a
          href={buildWhatsAppLink({ message: `Bonjour HPCS, je cherche une pièce de carrosserie pour ${m.name}. VIN : [coller VIN]. Pièce : [décrire].` })}
          target="_blank" rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-bold text-brand-red hover:bg-neutral-100"
        >
          <MessageCircle className="h-5 w-5" /> Contactez-nous sur WhatsApp
        </a>
      </section>
    </div>
  );
}
