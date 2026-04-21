"use client";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { faq } from "@/data/faq";
import { faqJsonLd } from "@/lib/seo";

export default function FAQPage() {
  const [open, setOpen] = useState<number | null>(0);
  const ld = faqJsonLd(faq);
  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <Breadcrumb items={[{ label: "Accueil", href: "/" }, { label: "FAQ" }]} />
      <h1 className="mt-4 font-display text-3xl font-bold">Questions fréquentes</h1>
      <p className="mt-1 text-sm text-neutral-600">Tout ce qu&apos;il faut savoir sur CHINAPAL, livraison, garanties et compatibilité.</p>
      <div className="mt-6 divide-y divide-neutral-200 rounded-2xl border border-neutral-200 bg-white">
        {faq.map((f, i) => {
          const isOpen = open === i;
          return (
            <div key={i}>
              <button onClick={() => setOpen(isOpen ? null : i)} className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left" aria-expanded={isOpen}>
                <span className="text-sm font-semibold text-brand-charcoal">{f.q}</span>
                {isOpen ? <Minus className="h-4 w-4 text-brand-red" /> : <Plus className="h-4 w-4 text-neutral-400" />}
              </button>
              {isOpen && <p className="px-5 pb-4 text-sm text-neutral-600">{f.a}</p>}
            </div>
          );
        })}
      </div>
    </div>
  );
}
