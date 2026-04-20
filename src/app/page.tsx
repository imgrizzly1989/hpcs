import { Hero } from "@/components/home/Hero";
import { VehicleSelector } from "@/components/home/VehicleSelector";
import { BrandsGrid } from "@/components/home/BrandsGrid";
import { CategoriesGrid } from "@/components/home/CategoriesGrid";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { WhyHPCS } from "@/components/home/WhyHPCS";
import { Newsletter } from "@/components/home/Newsletter";
import { FAQSection } from "@/components/home/FAQSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <section className="mx-auto -mt-6 max-w-7xl px-4">
        <VehicleSelector />
      </section>
      <BrandsGrid />
      <CategoriesGrid />
      <FeaturedProducts />
      <WhyHPCS />
      <FAQSection />
      <Newsletter />
    </>
  );
}
