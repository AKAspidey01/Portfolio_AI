import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { projects } from '@/src/data/projects';
import { useGSAPContext } from '@/src/hooks/useGSAPContext';
import { gsap } from '@/src/utils/gsap';
import { usePrefersReducedMotion } from '@/src/hooks/usePrefersReducedMotion';
import { useCursor } from '@/src/context/CursorContext';
import { ArrowUpRight } from 'lucide-react';
import { MagneticButton } from '@/src/components/common/MagneticButton';

export function HorizontalShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const slideCounterRef = useRef<HTMLSpanElement>(null);
  const { setCursorVariant, resetCursor } = useCursor();
  const prefersReducedMotion = usePrefersReducedMotion();

  useGSAPContext(
    () => {
      if (prefersReducedMotion || !sectionRef.current || !trackRef.current) return;

      const track = trackRef.current;
      const section = sectionRef.current;
      const mm = gsap.matchMedia();

      // Desktop pinning and horizontal scrub (>= 1024px)
      mm.add('(min-width: 1024px)', () => {
        const totalSlides = projects.length;

        // Defensive dynamic measurement of horizontal scroll distance
        const getDistance = () => {
          if (!track) return 0;
          const scrollWidth = track.scrollWidth;
          const viewportWidth = window.innerWidth;
          // 96px provides elegant terminal padding for the last card
          const distance = scrollWidth - viewportWidth + 96;
          return Math.max(0, distance);
        };

        const initialDistance = getDistance();
        // Defensive check: If content does not exceed viewport, do not pin
        if (initialDistance <= 20) return;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            pin: true,
            start: 'top top',
            end: () => `+=${getDistance()}`,
            scrub: 1,
            invalidateOnRefresh: true,
            anticipatePin: 1,
            onUpdate: (self) => {
              const progress = self.progress;
              const current = Math.min(
                totalSlides,
                Math.floor(progress * totalSlides) + 1
              );

              // Update DOM directly to avoid costly React re-renders during high-frequency scroll
              if (slideCounterRef.current) {
                slideCounterRef.current.textContent = `0${current}`;
              }
              if (progressBarRef.current) {
                gsap.set(progressBarRef.current, { scaleX: Math.max(0.15, progress) });
              }
            },
          },
        });

        // 1. Primary motion: Dynamic horizontal translation
        tl.to(track, {
          x: () => -getDistance(),
          ease: 'none',
        });

        // 2. Secondary motion: Subtle parallax on inner images
        const cardImages = track.querySelectorAll('.card-inner-image');
        if (cardImages.length > 0) {
          tl.fromTo(
            cardImages,
            { xPercent: -10 },
            { xPercent: 10, ease: 'none' },
            0
          );
        }

        return () => {
          tl.kill();
        };
      });

      return () => mm.revert();
    },
    sectionRef,
    [prefersReducedMotion]
  );

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#0c0d0e] py-20 lg:py-0 lg:h-screen flex flex-col justify-center hairline-t overflow-hidden"
    >
      {/* Top Header Bar inside the showcase */}
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 lg:mb-12 shrink-0">
        <div>
          <span className="font-mono text-xs text-[#e87a43] uppercase tracking-wider block mb-2">
            Selected Works Showcase
          </span>
          <h2 className="text-display-sub text-[#f4f4f2] font-light">
            Curated Systems & Interfaces
          </h2>
        </div>

        {/* Progress & Slide Counter */}
        <div className="flex items-center gap-6 font-mono text-xs text-[#8e9298]">
          <div className="flex items-center gap-2">
            <span ref={slideCounterRef} className="text-[#f4f4f2] text-sm font-semibold">
              01
            </span>
            <span>/</span>
            <span>0{projects.length}</span>
          </div>

          <div className="hidden sm:block h-[2px] w-32 bg-[rgba(255,255,255,0.1)] rounded-full overflow-hidden">
            <div
              ref={progressBarRef}
              className="h-full w-full bg-[#e87a43] origin-left will-change-transform"
              style={{ transform: 'scaleX(0.25)' }}
            />
          </div>

          <MagneticButton to="/work" variant="secondary" className="!py-1.5 !px-4 !text-[10px]">
            Archive View
          </MagneticButton>
        </div>
      </div>

      {/* The Horizontal Reel Track */}
      <div className="w-full overflow-visible">
        <div
          ref={trackRef}
          className="flex flex-col lg:flex-row gap-8 lg:gap-12 px-6 md:px-12 max-w-7xl lg:max-w-none mx-auto will-change-transform"
        >
          {projects.map((project, idx) => (
            <div
              key={project.id}
              className="w-full lg:w-[70vw] lg:max-w-[850px] shrink-0"
              onMouseEnter={() => setCursorVariant('view', 'VIEW')}
              onMouseLeave={() => resetCursor()}
            >
              <Link to={`/work/${project.slug}`} className="group block">
                {/* Media Monolith */}
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-3xl bg-[#141618] border border-[rgba(255,255,255,0.08)] shadow-xl">
                  <img
                    src={project.heroImage}
                    alt={project.title}
                    loading="lazy"
                    className="card-inner-image h-full w-[120%] max-w-none object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300" />

                  {/* Badges */}
                  <div className="absolute top-6 left-6 flex items-center gap-2">
                    <span className="font-mono text-xs px-3 py-1 rounded-full bg-[#0c0d0e]/80 backdrop-blur-md text-[#f4f4f2] hairline-t">
                      0{idx + 1} — {project.category}
                    </span>
                    <span className="font-mono text-xs px-3 py-1 rounded-full bg-[#0c0d0e]/80 backdrop-blur-md text-[#8e9298]">
                      {project.year}
                    </span>
                  </div>

                  <div className="absolute bottom-6 right-6 hidden sm:flex h-12 w-12 items-center justify-center rounded-full bg-[#f4f4f2] text-[#0c0d0e] group-hover:bg-[#e87a43] transition-colors">
                    <ArrowUpRight size={20} />
                  </div>
                </div>

                {/* Project Metadata Footer */}
                <div className="mt-6 flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-display text-2xl lg:text-3xl font-light text-[#f4f4f2] group-hover:text-[#e87a43] transition-colors">
                      {project.title}
                    </h3>
                    <p className="mt-1 font-sans text-sm text-[#8e9298] max-w-xl font-light">
                      {project.tagline}
                    </p>
                  </div>

                  <div className="hidden md:flex flex-col items-end font-mono text-xs text-[#8e9298]">
                    <span>{project.client}</span>
                    <span className="text-[10px] text-[#4b4f55] uppercase mt-0.5">{project.timeline}</span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
