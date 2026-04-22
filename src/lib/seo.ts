import type { Metadata } from "next";
import type { Product, FaqEntry } from "@/types";

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export function buildMetadata(opts: { title: string; description?: string; path?: string }): Metadata {
  const description =
    opts.description ??
    "CHINAPAL : pièces automobiles d'origine pour voitures chinoises au Maroc. Chery, Geely, MG, Haval, BYD, DFSK et plus. Devis WhatsApp, livraison 24-72h.";
  const url = `${SITE}${opts.path ?? "/"}`;
  return {
    title: opts.title,
    description,
    alternates: { canonical: url },
    openGraph: { title: opts.title, description, url, type: "website", locale: "fr_MA" },
  };
}

export function productJsonLd(p: Product) {
  // NOTE: intentionally no price offers since we show "Prix sur demande".
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.name,
    image: [`${SITE}${p.image}`],
    description: p.description,
    sku: p.reference,
    brand: { "@type": "Brand", name: "CHINAPAL" },
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
