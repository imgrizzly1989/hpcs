import { Hero } from "@/components/home/Hero";
import { VehicleSelector } from "@/components/home/VehicleSelector";
import { BrandsGrid } from "@/components/home/BrandsGrid";
import { TopVehicles } from "@/components/home/TopVehicles";
import { CategoriesGrid } from "@/components/home/CategoriesGrid";
import { CarrosserieShowcase } from "@/components/home/CarrosserieShowcase";
import { SeoLinks } from "@/components/home/SeoLinks";
import { TopParts } from "@/components/home/TopParts";
import { HowToOrder } from "@/components/home/HowToOrder";
import { WhyCHINAPAL } from "@/components/home/WhyCHINAPAL";
import { Testimonials } from "@/components/home/Testimonials";
import { TrustStats } from "@/components/home/TrustStats";
import { Newsletter } from "@/components/home/Newsletter";
import { FAQSection } from "@/components/home/FAQSection";
import Link from "next/link";
import { seoModels } from "@/data/seoModels";
import { seoCities } from "@/data/seoCities";

export default function HomePage() {
  return (
    <>
      <Hero />
      <section className="mx-auto max-w-7xl px-4 md:px-6 -mt-10 relative z-10">
        <VehicleSelector />
      </section>
      <BrandsGrid />
      <TopVehicles />
      <CategoriesGrid />
      <CarrosserieShowcase />
      <SeoLinks />
      <section className="mx-auto max-w-7xl px-4 md:px-6 py-12 md:py-16">
        <p className="text-xs font-bold uppercase tracking-widest text-brand-red">GUIDES POPULAIRES</p>
        <h2 className="mt-2 font-display text-2xl md:text-3xl font-bold tracking-tight text-brand-charcoal">Modèles les plus recherchés au Maroc</h2>
        <div className="mt-5 flex flex-wrap gap-2">
          {seoModels.map((item) => (
            <Link key={item.slug} href={`/modeles/${item.slug}`} className="rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm font-medium text-brand-charcoal hover:border-brand-red hover:text-brand-red">
              {item.h1}
            </Link>
          ))}
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 md:px-6 pb-12 md:pb-16">
        <div className="rounded-3xl border border-neutral-200 bg-white p-6 md:p-8">
          <p className="text-xs font-bold uppercase tracking-widest text-brand-red">SEO LOCAL MAROC</p>
          <h2 className="mt-2 font-display text-2xl md:text-3xl font-bold tracking-tight text-brand-charcoal">Pièces voitures chinoises par ville</h2>
          <p className="mt-3 max-w-3xl text-neutral-600 leading-relaxed">
            CHINAPAL traite les demandes depuis Casablanca et livre les pièces compatibles pour voitures chinoises dans les principales villes du Maroc, avec vérification VIN avant devis.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {seoCities.map((item) => (
              <Link key={item.slug} href={`/pieces-voitures-chinoises/${item.slug}`} className="rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-2 text-sm font-medium text-brand-charcoal hover:border-brand-red hover:text-brand-red">
                Pièces voitures chinoises {item.city}
              </Link>
            ))}
          </div>
        </div>
      </section>
      <TopParts />
      <HowToOrder />
      <WhyCHINAPAL />
      <Testimonials />
      <TrustStats />
      <FAQSection />
      <Newsletter />
    </>
  );
}
