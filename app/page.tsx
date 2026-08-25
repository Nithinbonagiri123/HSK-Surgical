import { Hero } from '@/components/sections/Hero';
import { Intro } from '@/components/sections/Intro';
import { SpecialtiesGrid } from '@/components/sections/SpecialtiesGrid';
import { FeaturedProducts } from '@/components/sections/FeaturedProducts';
import { PrecisionExplode } from '@/components/sections/PrecisionExplode';
import { NeedleCloseup } from '@/components/sections/NeedleCloseup';
import { ClearViewStory } from '@/components/sections/ClearViewStory';
import { BigStats } from '@/components/sections/BigStats';
import { ProductExplorerPreview } from '@/components/sections/ProductExplorerPreview';
import { WhyHSK } from '@/components/sections/WhyHSK';
import { AboutTeaser } from '@/components/sections/AboutTeaser';
import { ContactCTA } from '@/components/sections/ContactCTA';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Intro />
      <SpecialtiesGrid />
      <FeaturedProducts />
      <PrecisionExplode />
      <NeedleCloseup />
      <ClearViewStory />
      <BigStats />
      <ProductExplorerPreview />
      <WhyHSK />
      <AboutTeaser />
      <ContactCTA />
    </>
  );
}
