import { hasImage } from '@/lib/images.server';
import Hero from '@/components/sections/Hero';
import ServiceLineSections from '@/components/sections/ServiceLineSection';
import Features from '@/components/sections/Features';
import FinePrint from '@/components/sections/FinePrint';
import HowItWorks from '@/components/sections/HowItWorks';
import Faq from '@/components/sections/Faq';
import SectionWipe from '@/components/primitives/SectionWipe';

/**
 * Canonical page order:
 *
 *   Top disclosure bar  ── app/layout.tsx
 *   Sticky header       ── app/layout.tsx
 *   1. Hero
 *   2. Service lines, in order: fiber → cable → bundle → tv → mobile → phone.
 *      Only lines Fidium actually sells render; the rest are absent entirely.
 *   3. Why fiber (benefits grid)
 *   4. Honest fine-print grid
 *   5. How it works
 *   6. FAQ
 *   Footer              ── app/layout.tsx
 */
export default function Page() {
  // Resolved at build time; Hero is a client component so it receives a boolean
  // rather than reaching for the filesystem itself.
  const heroImage = hasImage('hero');

  return (
    <>
      <Hero hasHeroImage={heroImage} />

      <ServiceLineSections />

      <Features />

      {/* Why-fiber is a dark photographic section, so the wipe leaves ink. */}
      <SectionWipe from="ink" to="white" />

      <FinePrint />

      <SectionWipe from="white" to="ink" />

      <HowItWorks />

      <SectionWipe from="ink" to="slate" />

      <Faq />
    </>
  );
}
