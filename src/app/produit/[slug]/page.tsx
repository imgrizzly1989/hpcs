import { notFound } from "next/navigation";
import Link from "next/link";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Badge } from "@/components/ui/Badge";
import { PriceTag } from "@/components/ui/PriceTag";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductSpecs } from "@/components/product/ProductSpecs";
import { AddToCartButton } from "@/components/product/AddToCartButton";
import { WhatsAppOrderButton } from "@/components/product/WhatsAppOrderButton";
import { RelatedProducts } from "@/components/product/RelatedProducts";
import { products, getProduct } from "@/data/products";
import { getCategory } from "@/data/categories";
import { getBrand } from "@/data/brands";
import { getVehiclesForBrand } from "@/data/vehicles";
import { buildMetadata, productJsonLd, breadcrumbJsonLd } from "@/lib/seo";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const p = getProduct(params.slug);
  if (!p) return buildMetadata({ title: "Produit" });
  return buildMetadata({ title: p.name, description: p.description, path: `/produit/${p.slug}` });
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

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
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

      <div className="mt-6 grid gap-8 md:grid-cols-2">
        <ProductGallery images={product.images} alt={product.name} />

        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            {product.isNew && <Badge tone="danger">Nouveau</Badge>}
            {product.stock > 0 ? (
              <Badge tone="success">En stock</Badge>
            ) : (
              <Badge tone="default">Rupture</Badge>
            )}
            {category && <Link href={`/categorie/${category.slug}`} className="text-xs font-semibold uppercase tracking-wider text-neutral-500 hover:text-brand-red">{category.name}</Link>}
          </div>

          <h1 className="mt-3 font-display text-2xl font-bold text-brand-charcoal md:text-3xl">{product.name}</h1>
          <p className="mt-1 text-sm text-neutral-500">Référence : <span className="font-mono">{product.reference}</span></p>

          <div className="mt-4">
            <PriceTag price={product.price} oldPrice={product.oldPrice} className="text-2xl" />
            <p className="mt-1 text-xs text-neutral-500">Prix TTC · Livraison en sus</p>
          </div>

          <p className="mt-5 text-sm leading-relaxed text-neutral-700">{product.description}</p>

          <div className="mt-6 flex flex-col gap-3">
            <AddToCartButton product={product} />
            <WhatsAppOrderButton productName={product.name} reference={product.reference} path={`/produit/${product.slug}`} />
          </div>

          <div className="mt-8">
            <h2 className="mb-3 text-sm font-bold uppercase tracking-wider text-brand-charcoal">Caractéristiques</h2>
            <ProductSpecs specs={product.specs} />
          </div>

          <div className="mt-8">
            <h2 className="mb-3 text-sm font-bold uppercase tracking-wider text-brand-charcoal">Compatibilité véhicules</h2>
            <div className="overflow-hidden rounded-2xl border border-neutral-200">
              <table className="w-full text-sm">
                <thead className="bg-neutral-50 text-xs uppercase tracking-wider text-neutral-500">
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
        </div>
      </div>

      <RelatedProducts current={product} />
    </div>
  );
}
