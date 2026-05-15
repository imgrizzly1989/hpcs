import type { MetadataRoute } from "next";
import { products } from "@/data/products";
import { brands } from "@/data/brands";
import { categories } from "@/data/categories";
import { seoCategories } from "@/data/seoCategories";
import { seoModels } from "@/data/seoModels";
import { seoPartModels } from "@/data/seoPartModels";
import { seoCities } from "@/data/seoCities";
import { getSiteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  // Keep transactional/account utility pages out of XML sitemap; crawlers can still discover them,
  // but the sitemap should prioritize indexable SEO and trust pages.
  const staticPaths = [
    "", "/boutique", "/vehicule", "/faq", "/contact", "/a-propos", "/livraison-retours",
    "/verification-vin", "/garages-carrosseries", "/confidentialite", "/conditions",
  ];
  const now = new Date();
  return [
    ...staticPaths.map((p) => ({ url: `${base}${p}`, lastModified: now })),
    ...products.map((p) => ({ url: `${base}/produit/${p.slug}`, lastModified: now })),
    ...brands.map((b) => ({ url: `${base}/marque/${b.slug}`, lastModified: now })),
    ...categories.map((c) => ({ url: `${base}/categorie/${c.slug}`, lastModified: now })),
    ...seoCategories.map((s) => ({ url: `${base}/pieces/${s.slug}`, lastModified: now })),
    ...seoModels.map((s) => ({ url: `${base}/modeles/${s.slug}`, lastModified: now })),
    ...seoPartModels.map((s) => ({ url: `${base}/recherche/${s.slug}`, lastModified: now })),
    ...seoCities.map((s) => ({ url: `${base}/pieces-voitures-chinoises/${s.slug}`, lastModified: now })),
  ];
}
