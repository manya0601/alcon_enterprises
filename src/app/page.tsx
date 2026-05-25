import { HeroSection } from "@/components/home/hero-section";
import { CategoryStrip } from "@/components/home/category-strip";
import { FeaturedProducts } from "@/components/home/featured-products";
import { RentalBanner } from "@/components/home/rental-banner";
import { WhyChooseUs } from "@/components/home/why-choose-us";
import { ClientLogos } from "@/components/home/client-logos";
import { Testimonials } from "@/components/home/testimonials";
import { ContactCTA } from "@/components/home/contact-cta";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CategoryStrip />
      <FeaturedProducts />
      <RentalBanner />
      <WhyChooseUs />
      <ClientLogos />
      <Testimonials />
      <ContactCTA />
    </>
  );
}
