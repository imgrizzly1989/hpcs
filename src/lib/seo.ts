import type { Metadata } from "next";
import type { Product, FaqEntry } from "@/types";
import { getProductImage } from "@/lib/productImage";
import { getSiteUrl } from "@/lib/site";

const SITE = getSiteUrl();

export function buildMetadata(opts: { title: string; description?: string; path?: string }): Metadata {
  const description =
    opts.description ??
    "CHINAPAL : pièces automobiles compatibles pour voitures chinoises au Maroc. Chery, Geely, MG, Haval, BYD, DFSK et plus. Devis WhatsApp, livraison 24-72h.";
  const url = `${SITE}${opts.path ?? "/"}`;
  return {
    title: opts.title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: opts.title,
      description,
      url,
      type: "website",
      locale: "fr_MA",
      siteName: "CHINAPAL",
      images: [{ url: `${SITE}/images/chinapal-logo.jpg`, width: 1200, height: 630, alt: "CHINAPAL pièces automobiles chinoises au Maroc" }],
    },
    twitter: { card: "summary_large_image", title: opts.title, description, images: [`${SITE}/images/chinapal-logo.jpg`] },
  };
}

export function productJsonLd(p: Product) {
  // NOTE: intentionally no price offers since we show "Prix sur demande".
  const image = p.image || p.images?.[0] || getProductImage(p.name, p.category) || "/images/products/general-part.jpg";
  const availability = p.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/PreOrder";
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.name,
    image: [`${SITE}${image}`],
    description: p.description,
    sku: p.reference,
    brand: { "@type": "Brand", name: "CHINAPAL" },
    offers: {
      "@type": "Offer",
      url: `${SITE}/produit/${p.slug}`,
      priceCurrency: "MAD",
      priceSpecification: { "@type": "PriceSpecification", priceCurrency: "MAD", description: "Prix sur demande après vérification VIN" },
      availability,
      seller: { "@type": "AutoPartsStore", name: "CHINAPAL" },
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

export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "AutoPartsStore",
    name: "CHINAPAL",
    url: SITE,
    telephone: "+212****2999",
    areaServed: "MA",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "09:00",
        closes: "18:30",
      },
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+212650542999",
        contactType: "customer service",
        areaServed: "MA",
        availableLanguage: ["fr", "ar"],
      },
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Casablanca",
      addressCountry: "MA",
    },
    description:
      "Spécialiste des pièces automobiles pour voitures chinoises au Maroc : carrosserie, freinage, suspension, filtration et pièces moteur.",
    sameAs: ["https://wa.me/212650542999"],
    serviceArea: {
      "@type": "Country",
      name: "Maroc",
    },
  };
}
