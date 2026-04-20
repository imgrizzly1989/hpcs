import { Hero } from "@/components/home/Hero";
import { VehicleSelector } from "@/components/home/VehicleSelector";
import { BrandsGrid } from "@/components/home/BrandsGrid";
import { TopVehicles } from "@/components/home/TopVehicles";
import { CategoriesGrid } from "@/components/home/CategoriesGrid";
import { CarrosserieShowcase } from "@/components/home/CarrosserieShowcase";
import { TopParts } from "@/components/home/TopParts";
import { HowToOrder } from "@/components/home/HowToOrder";
import { WhyHPCS } from "@/components/home/WhyHPCS";
import { Testimonials } from "@/components/home/Testimonials";
import { TrustStats } from "@/components/home/TrustStats";
import { Newsletter } from "@/components/home/Newsletter";
import { FAQSection } from "@/components/home/FAQSection";

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
      <TopParts />
      <HowToOrder />
      <WhyHPCS />
      <Testimonials />
      <TrustStats />
      <FAQSection />
      <Newsletter />
    </>
  );
}
