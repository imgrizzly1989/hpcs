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
