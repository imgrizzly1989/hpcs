import { notFound } from "next/navigation";
import Link from "next/link";
import { ShieldCheck, CheckCircle2, Truck, MessageCircle, ChevronUp, ChevronDown, ChevronLeft, ChevronRight, Clock } from "lucide-react";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Badge } from "@/components/ui/Badge";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductSpecs } from "@/components/product/ProductSpecs";
import { AddToCartButton } from "@/components/product/AddToCartButton";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { RelatedProducts } from "@/components/product/RelatedProducts";
import { products, getProduct } from "@/data/products";
import { getCategory } from "@/data/categories";
import { getBrand } from "@/data/brands";
import { getVehiclesForBrand } from "@/data/vehicles";
import { buildMetadata, productJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { buildWhatsAppLink } from "@/lib/whatsapp";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const p = getProduct(params.slug);
  if (!p) return buildMetadata({ title: "Produit" });
  const firstSentence = p.description.split(".")[0] + ".";
  return buildMetadata({
    title: p.name,
    description: `${firstSentence} Prix sur demande via WhatsApp — livraison au Maroc.`,
    path: `/produit/${p.slug}`,
  });
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProduct(params.slug);
  if (!product) notFound();
  const category = getCategory(product.category);

  const productLd = productJsonLd(product);
  const crumbLd = breadcrumbJsonLd([
    { name: "Accueil", url: "/" },
    { name: "Boutique", url: "/boutique" },
    { name: product.name, url: `/produit/${product.slug}` },
  ]);

  const waHref = buildWhatsAppLink({
    productName: product.name,
    reference: product.reference,
    path: `/produit/${product.slug}`,
  });

  return (
    <div className="mx-auto max-w-7xl px-4 md:px-6 py-8 md:py-12 pb-28 md:pb-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbLd) }} />
      <Breadcrumb
        items={[
          { label: "Accueil", href: "/" },
          { label: "Boutique", href: "/boutique" },
          ...(category ? [{ label: category.name, href: `/categorie/${category.slug}` }] : []),
          { label: product.name },
        ]}
      />

      <div className="mt-6 grid gap-10 md:grid-cols-2">
        <ProductGallery product={product} />

        <div className="flex flex-col">
          <div className="flex flex-wrap items-center gap-2">
            {product.isNew && <Badge tone="danger">Nouveau</Badge>}
            {product.category === "carrosserie" && product.stock === 0 ? (
              <Badge tone="default">
                <Clock className="mr-1 inline h-3 w-3" /> Sur commande — délai 5-10 jours
              </Badge>
            ) : product.stock > 0 ? (
              <Badge tone="success">En stock</Badge>
            ) : (
              <Badge tone="default">Rupture</Badge>
            )}
            {category && (
              <Link href={`/categorie/${category.slug}`} className="text-xs font-semibold uppercase tracking-widest text-neutral-500 hover:text-brand-red">
                {category.name}
              </Link>
            )}
          </div>

          <h1 className="mt-3 font-display text-2xl font-bold tracking-tight text-brand-charcoal md:text-3xl">{product.name}</h1>

          {/* Carrosserie position row */}
          {product.category === "carrosserie" && (product.position || product.specs["Côté"]) && (
            <div className="mt-3 flex flex-wrap items-center gap-2">
              {product.position && (
                <span className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-1.5 text-xs font-semibold text-brand-charcoal">
                  {/Avant/i.test(product.position) ? <ChevronUp className="h-3.5 w-3.5 text-brand-red" /> : /Arri/i.test(product.position) ? <ChevronDown className="h-3.5 w-3.5 text-brand-red" /> : null}
                  Position : {product.position}
                </span>
              )}
              {product.specs["Côté"] && product.specs["Côté"] !== "—" && (
                <span className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-1.5 text-xs font-semibold text-brand-charcoal">
                  {/Gauche/i.test(product.specs["Côté"]) ? <ChevronLeft className="h-3.5 w-3.5 text-brand-red" /> : <ChevronRight className="h-3.5 w-3.5 text-brand-red" />}
                  Côté : {product.specs["Côté"]}
                </span>
              )}
            </div>
          )}

          <p className="mt-2 text-sm text-neutral-500">
            Réf. OEM : <span className="font-mono text-brand-charcoal">{product.reference}</span>
          </p>

          {/* Price-on-request block */}
          <div className="mt-6 rounded-2xl bg-neutral-50 border border-neutral-200 p-6">
            <p className="font-display text-2xl font-bold text-brand-charcoal">Prix sur demande</p>
            <p className="mt-1 text-sm text-neutral-600 leading-relaxed">
              Contactez-nous pour un devis personnalisé selon votre véhicule. Réponse en moins de 24h.
            </p>
            <div className="mt-5 flex flex-col gap-3">
              <WhatsAppButton
                productName={product.name}
                reference={product.reference}
                path={`/produit/${product.slug}`}
                label={product.category === "carrosserie" ? "Demander disponibilité et prix sur WhatsApp" : "Demander le prix sur WhatsApp"}
                size="lg"
              />
              <AddToCartButton product={product} />
            </div>
          </div>

          {/* Trust chips */}
          <div className="mt-5 grid gap-2 sm:grid-cols-3">
            <div className="flex items-center gap-2 rounded-xl border border-neutral-200 bg-white p-3 text-xs font-medium text-neutral-700">
              <ShieldCheck className="h-4 w-4 text-brand-red shrink-0" />
              {product.category === "carrosserie" ? "Compatibilité à vérifier avec votre VIN" : "100% compatible"}
            </div>
            <div className="flex items-center gap-2 rounded-xl border border-neutral-200 bg-white p-3 text-xs font-medium text-neutral-700">
              <CheckCircle2 className="h-4 w-4 text-brand-red shrink-0" />
              {product.category === "carrosserie" ? "Retour garanti si non compatible" : "Vérifié par HPCS"}
            </div>
            <div className="flex items-center gap-2 rounded-xl border border-neutral-200 bg-white p-3 text-xs font-medium text-neutral-700">
              <Truck className="h-4 w-4 text-brand-red shrink-0" />
              {product.category === "carrosserie" ? "Livraison protégée 24-72h" : "Livraison 24-72h"}
            </div>
          </div>

          {/* Compatibility box */}
          <div className="mt-8 rounded-2xl border border-neutral-200 border-l-4 border-l-brand-red bg-white p-5">
            <h2 className="font-display text-lg font-bold text-brand-charcoal">Véhicules compatibles</h2>
            <div className="mt-3 overflow-hidden rounded-xl border border-neutral-200">
              <table className="w-full text-sm">
                <thead className="bg-neutral-50 text-xs uppercase tracking-widest text-neutral-500">
                  <tr>
                    <th className="px-4 py-2 text-left">Marque</th>
                    <th className="px-4 py-2 text-left">Modèle</th>
                    <th className="px-4 py-2 text-left">Années</th>
                    <th className="px-4 py-2 text-left">Moteur</th>
                  </tr>
                </thead>
                <tbody>
                  {product.compatibleVehicles.map((v, i) => {
                    const b = getBrand(v.brandSlug);
                    const m = getVehiclesForBrand(v.brandSlug)?.models.find((x) => x.slug === v.modelSlug);
                    return (
                      <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-neutral-50"}>
                        <td className="px-4 py-2">{b?.name ?? v.brandSlug}</td>
                        <td className="px-4 py-2">{m?.name ?? v.modelSlug}</td>
                        <td className="px-4 py-2">{v.years[0]} – {v.years[1]}</td>
                        <td className="px-4 py-2">{v.engines.length ? v.engines.join(", ") : "Tous"}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <p className="mt-6 text-sm leading-relaxed text-neutral-700">{product.description}</p>

          <div className="mt-8">
            <h2 className="mb-3 text-sm font-bold uppercase tracking-widest text-brand-charcoal">Caractéristiques</h2>
            <ProductSpecs specs={product.specs} />
          </div>
        </div>
      </div>

      <RelatedProducts current={product} />

      {/* Sticky mobile CTA */}
      <div className="md:hidden fixed bottom-[60px] inset-x-0 z-40 border-t border-neutral-200 bg-white p-3 shadow-[0_-4px_12px_rgba(0,0,0,0.06)]">
        <a href={waHref} target="_blank" rel="noopener noreferrer" className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] font-bold text-white">
          <MessageCircle className="h-5 w-5" /> Demander le prix sur WhatsApp
        </a>
      </div>
    </div>
  );
}
