import { HeroSection } from "@/components/home/hero-section";
import { CategoryStrip } from "@/components/home/category-strip";
import { FeaturedBrands } from "@/components/home/featured-brands";
import { QuickAccessSection } from "@/components/home/quick-access";
import { FeaturedProducts } from "@/components/home/featured-products";
import { RentalBanner } from "@/components/home/rental-banner";
import { SubscriptionPromo } from "@/components/home/subscription-promo";
import { WhyChooseUs } from "@/components/home/why-choose-us";
import { ClientLogos } from "@/components/home/client-logos";
import { Testimonials } from "@/components/home/testimonials";
import { ContactCTA } from "@/components/home/contact-cta";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CategoryStrip />
      <FeaturedBrands />
      <QuickAccessSection />
      <FeaturedProducts />
      <RentalBanner />
      <SubscriptionPromo />
      <WhyChooseUs />
      <ClientLogos />
      <Testimonials />
      <ContactCTA />
    </>
  );
}
