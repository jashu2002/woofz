import { Hero } from "@/components/hero/Hero";
import { Philosophy } from "@/components/sections/Philosophy";
import { ParallaxBanner } from "@/components/sections/ParallaxBanner";
import { FeaturedCollection } from "@/components/sections/FeaturedCollection";
import { ProductStory } from "@/components/products/ProductStory";
import { VisualAnchor } from "@/components/sections/VisualAnchor";
import { Materials } from "@/components/sections/Materials";
import { ForThemForHome } from "@/components/sections/ForThemForHome";
import { Comfort } from "@/components/sections/Comfort";
import { Testimonials } from "@/components/sections/Testimonials";
import { JournalSection } from "@/components/sections/JournalSection";
import { Newsletter } from "@/components/sections/Newsletter";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Philosophy />
      <ParallaxBanner />
      <FeaturedCollection />
      <ProductStory />
      <VisualAnchor statement="Soft enough for them." substatement="Beautiful enough for you." />
      <Materials />
      <ForThemForHome />
      <Comfort />
      <Testimonials />
      <JournalSection />
      <Newsletter />
    </>
  );
}
