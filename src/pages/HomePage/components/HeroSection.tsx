import { useRef } from 'react';
import { TextReveal } from '@/src/components/common/TextReveal';
import { MagneticButton } from '@/src/components/common/MagneticButton';
import { useGSAPContext } from '@/src/hooks/useGSAPContext';
import { gsap } from '@/src/utils/gsap';
import { usePrefersReducedMotion } from '@/src/hooks/usePrefersReducedMotion';
import { ArrowDown, Sparkles } from 'lucide-react';
import { useCursor } from '@/src/context/CursorContext';
import { Link } from 'react-router-dom';

/**
 * HeroSection
 * Choreographs the transition from editorial display typography to the visual monolith.
 * Uses scrubbed scale & clip-path mapped to scroll range (top -> 100vh).
 */
export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleWrapperRef = useRef<HTMLDivElement>(null);
  const monolithRef = useRef<HTMLDivElement>(null);
  const { setCursorVariant, resetCursor } = useCursor();
  const prefersReducedMotion = usePrefersReducedMotion();

  useGSAPContext(
    () => {
      if (prefersReducedMotion || !containerRef.current) return;

      const titleWrapper = titleWrapperRef.current;
      const monolith = monolithRef.current;
      if (!titleWrapper || !monolith) return;

      // Only apply scrubbed camera track on screens > 768px
      const mm = gsap.matchMedia();

      mm.add('(min-width: 768px)', () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });

        // 1. Primary motion: Title compresses and recedes gracefully
        tl.to(
          titleWrapper,
          {
            yPercent: -18,
            scale: 0.95,
            opacity: 0.35,
            ease: 'power1.out',
          },
          0
        );

        // 2. Primary motion: Monolith card expands from inset geometry to full aperture
        tl.fromTo(
          monolith,
          {
            scale: 0.92,
            yPercent: 8,
            clipPath: 'inset(5% 5% 5% 5% round 24px)',
          },
          {
            scale: 1,
            yPercent: 0,
            clipPath: 'inset(0% 0% 0% 0% round 16px)',
            ease: 'power1.out',
          },
          0
        );

        return () => {
          tl.kill();
        };
      });

      return () => mm.revert();
    },
    containerRef,
    [prefersReducedMotion]
  );

  return (
    <section
      ref={containerRef}
      className="relative min-h-[140vh] w-full px-6 md:px-12 max-w-7xl mx-auto pt-8 pb-24"
    >
      {/* 1. Header Coordinates & Live Availability */}
      <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-[#8e9298] uppercase tracking-wider pb-12 hairline-b">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[#e87a43]" />
          <span>Spatial & Computational Product Design</span>
        </div>
        <div className="flex items-center gap-3">
          <span>Zurich / San Francisco</span>
          <span className="text-[rgba(255,255,255,0.2)]">/</span>
          <span className="text-[#f4f4f2]">Index 2026</span>
        </div>
      </div>

      {/* 2. Display Typography Anchor */}
      <div ref={titleWrapperRef} className="pt-16 pb-12 will-change-transform">
        <div className="flex items-center gap-2 mb-6">
          <Sparkles size={14} className="text-[#e87a43]" />
          <span className="font-mono text-xs text-[#e87a43] uppercase tracking-wider">
            Principal Portfolio & Systems Lab
          </span>
        </div>

        <TextReveal
          as="h1"
          className="text-display-hero text-[#f4f4f2] font-light max-w-5xl tracking-tight"
          duration={1.0}
          stagger={0.05}
        >
          Architecting computational tools and visceral spatial software.
        </TextReveal>

        <p className="mt-8 max-w-2xl font-sans text-lg md:text-xl text-[#8e9298] font-light leading-relaxed">
          Translating deep quantitative algorithms, multi-agent AI environments, and spatial computing metaphors into quiet, authoritative design systems.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <MagneticButton to="/work" variant="primary" cursorLabel="PROJECTS">
            Explore Selected Work
          </MagneticButton>
          <MagneticButton to="/about" variant="secondary" cursorLabel="APPROACH">
            Design Philosophy
          </MagneticButton>
        </div>
      </div>

      {/* 3. The Visual Monolith: Aperture into the Portfolio */}
      <div
        ref={monolithRef}
        className="relative mt-8 aspect-[16/9] w-full overflow-hidden rounded-2xl bg-[#141618] border border-[rgba(255,255,255,0.08)] shadow-2xl will-change-transform"
        onMouseEnter={() => setCursorVariant('view', 'FEATURE')}
        onMouseLeave={() => resetCursor()}
      >
        <img
          src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2264&auto=format&fit=crop"
          alt="Chronos Spatial OS interface overview"
          className="h-full w-full object-cover"
        />

        {/* Cinematic Monolith Overlay & Caption */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0d0e]/90 via-transparent to-transparent flex flex-col justify-end p-6 md:p-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="font-mono text-xs text-[#e87a43] uppercase tracking-wider block mb-1">
                Featured Flagship Case Study
              </span>
              <h2 className="font-display text-2xl md:text-4xl text-[#f4f4f2] font-light">
                Chronos Spatial Operating System
              </h2>
              <p className="mt-1 font-sans text-sm text-[#8e9298] max-w-lg">
                Volumetric spatial interaction model and multi-agent cognitive timeline for Apple Vision Pro & spatial canvases.
              </p>
            </div>

            <Link
              to="/work/chronos-spatial-os"
              className="inline-flex items-center justify-center rounded-full bg-[#f4f4f2] px-6 py-3 font-mono text-xs font-semibold uppercase tracking-wider text-[#0c0d0e] hover:bg-[#e87a43] transition-colors shrink-0"
            >
              Open Case Study
            </Link>
          </div>
        </div>
      </div>

      {/* 4. Bottom Scroll Hint */}
      <div className="mt-8 flex items-center justify-between font-mono text-xs text-[#8e9298] pt-4">
        <span>Curated Works 01—04</span>
        <div className="flex items-center gap-2">
          <span className="uppercase text-[11px] tracking-wider">Scroll to traverse</span>
          <ArrowDown size={14} className="animate-bounce text-[#e87a43]" />
        </div>
      </div>
    </section>
  );
}
