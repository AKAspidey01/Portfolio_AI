import { HeroSection } from './components/HeroSection';
import { HorizontalShowcase } from './components/HorizontalShowcase';
import { PhilosophySection } from './components/PhilosophySection';
import { StatisticsMarquee } from './components/StatisticsMarquee';

/**
 * HomePage Assembly
 * Orchestrates the primary storytelling sequence:
 * 1. Monumental Hero with scrubbed scale transition
 * 2. Pinned Horizontal Case Study Showcase
 * 3. Sticky Narrative Philosophy Rail
 * 4. Measurable Outcomes & Partner Marquee
 */
export default function HomePage() {
  return (
    <div className="relative w-full">
      {/* 1. Kinetic Hero with Scaled Aperture */}
      <HeroSection />

      {/* 2. Pinned Horizontal Showcase */}
      <HorizontalShowcase />

      {/* 3. Sticky Philosophy & Capabilities */}
      <PhilosophySection />

      {/* 4. Statistics & Enterprise Marquee */}
      <StatisticsMarquee />
    </div>
  );
}
