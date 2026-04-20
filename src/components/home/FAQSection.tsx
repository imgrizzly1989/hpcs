"use client";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { faq } from "@/data/faq";
import Link from "next/link";

export function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);
  const items = faq.slice(0, 6);
  return (
    <section className="mx-auto max-w-4xl px-4 py-14">
      <h2 className="font-display text-2xl font-bold text-brand-charcoal md:text-3xl">Questions fréquentes</h2>
      <div className="mt-6 divide-y divide-neutral-200 rounded-2xl border border-neutral-200 bg-white">
        {items.map((f, i) => {
          const isOpen = open === i;
          return (
            <div key={i}>
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                aria-expanded={isOpen}
              >
                <span className="text-sm font-semibold text-brand-charcoal">{f.q}</span>
                {isOpen ? <Minus className="h-4 w-4 text-brand-red" /> : <Plus className="h-4 w-4 text-neutral-400" />}
              </button>
              {isOpen && <p className="px-5 pb-4 text-sm text-neutral-600">{f.a}</p>}
            </div>
          );
        })}
      </div>
      <div className="mt-4 text-center">
        <Link href="/faq" className="text-sm font-semibold text-brand-red hover:underline">Voir toutes les questions →</Link>
      </div>
    </section>
  );
}
