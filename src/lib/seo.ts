import type { Metadata } from "next";
import type { Product, FaqEntry } from "@/types";

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export function buildMetadata(opts: { title: string; description?: string; path?: string }): Metadata {
  const title = `HPCS — ${opts.title}`;
  const description =
    opts.description ??
    "HPCS : pièces automobiles pour voitures chinoises au Maroc. Chery, Geely, MG, Haval, BYD, DFSK et plus.";
  const url = `${SITE}${opts.path ?? "/"}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, type: "website", locale: "fr_MA" },
  };
}

export function productJsonLd(p: Product) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.name,
    image: [`${SITE}${p.image}`],
    description: p.description,
    sku: p.reference,
    brand: { "@type": "Brand", name: "HPCS" },
    offers: {
      "@type": "Offer",
      url: `${SITE}/produit/${p.slug}`,
      priceCurrency: "MAD",
      price: p.price,
      availability: p.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
    },
  };
}

export function faqJsonLd(entries: FaqEntry[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: entries.map((e) => ({
      "@type": "Question",
      name: e.q,
      acceptedAnswer: { "@type": "Answer", text: e.a },
    })),
  };
}

export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${SITE}${it.url}`,
    })),
  };
}
