import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { projects } from '@/src/data/projects';
import { useCursor } from '@/src/context/CursorContext';
import { TextReveal } from '@/src/components/common/TextReveal';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { useGSAPContext } from '@/src/hooks/useGSAPContext';
import { gsap } from '@/src/utils/gsap';
import { usePrefersReducedMotion } from '@/src/hooks/usePrefersReducedMotion';

export default function WorkPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const { setCursorVariant, resetCursor } = useCursor();
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  const categories = ['All', 'Spatial Computing', 'Fintech Systems', 'AI Intelligence', 'Brand Systems'];

  const filteredProjects =
    selectedCategory === 'All'
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  const headerRef = useRef<HTMLDivElement>(null);

  useGSAPContext(
    () => {
      if (prefersReducedMotion || !containerRef.current) return;

      const mm = gsap.matchMedia();

      // Intro header gentle scroll-tied recession
      if (headerRef.current) {
        gsap.to(headerRef.current, {
          yPercent: -12,
          opacity: 0.85,
          ease: 'none',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });
      }

      // Desktop & Tablet scrub choreography (>= 768px)
      mm.add('(min-width: 768px)', () => {
        const projectCards = containerRef.current?.querySelectorAll('.work-card') || [];

        projectCards.forEach((card, idx) => {
          const mediaContainer = card.querySelector('.work-card-media') as HTMLElement | null;
          const innerImage = card.querySelector('.card-parallax-img img') as HTMLElement | null;
          const infoContainer = card.querySelector('.work-card-info') as HTMLElement | null;

          // Alternating subtle offset rhythm for editorial dynamism
          const isEven = idx % 2 === 0;

          // 1. Primary Card Scrub Timeline: Frame expansion and reveal
          if (mediaContainer && infoContainer) {
            const tl = gsap.timeline({
              scrollTrigger: {
                trigger: card,
                start: () => (isEven ? 'top 92%' : 'top 96%'),
                end: () => 'center 50%',
                scrub: 0.8,
                invalidateOnRefresh: true,
              },
            });

            tl.fromTo(
              mediaContainer,
              {
                scale: 0.94,
                y: 38,
                clipPath: 'inset(3.5% 2% 3.5% 2% round 24px)',
              },
              {
                scale: 1,
                y: 0,
                clipPath: 'inset(0% 0% 0% 0% round 24px)',
                ease: 'power1.out',
              },
              0
            );

            tl.fromTo(
              infoContainer,
              { opacity: 0.25, y: 22 },
              { opacity: 1, y: 0, ease: 'power1.out' },
              0.15
            );
          }

          // 2. Parallax Image Scrub across full travel
          if (innerImage) {
            gsap.fromTo(
              innerImage,
              { yPercent: isEven ? -9 : -6, scale: 1.1 },
              {
                yPercent: isEven ? 9 : 6,
                scale: 1.02,
                ease: 'none',
                scrollTrigger: {
                  trigger: card,
                  start: 'top bottom',
                  end: 'bottom top',
                  scrub: true,
                  invalidateOnRefresh: true,
                },
              }
            );
          }
        });
      });

      // Mobile scrub choreography (< 768px): Light, touch-optimized motion
      mm.add('(max-width: 767px)', () => {
        const projectCards = containerRef.current?.querySelectorAll('.work-card') || [];

        projectCards.forEach((card) => {
          const mediaContainer = card.querySelector('.work-card-media') as HTMLElement | null;
          const infoContainer = card.querySelector('.work-card-info') as HTMLElement | null;

          if (mediaContainer && infoContainer) {
            const tl = gsap.timeline({
              scrollTrigger: {
                trigger: card,
                start: () => 'top 92%',
                end: () => 'center 55%',
                scrub: 0.8,
                invalidateOnRefresh: true,
              },
            });

            tl.fromTo(
              mediaContainer,
              { opacity: 0.3, y: 28, scale: 0.97 },
              { opacity: 1, y: 0, scale: 1, ease: 'power1.out' },
              0
            );

            tl.fromTo(
              infoContainer,
              { opacity: 0.3, y: 16 },
              { opacity: 1, y: 0, ease: 'power1.out' },
              0.1
            );
          }
        });
      });

      return () => mm.revert();
    },
    containerRef,
    [selectedCategory, prefersReducedMotion]
  );

  return (
    <div ref={containerRef} className="mx-auto max-w-7xl px-6 py-16 md:px-12 md:py-24">
      {/* Editorial Header */}
      <div ref={headerRef} className="max-w-4xl will-change-transform">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles size={14} className="text-[#e87a43]" />
          <span className="font-mono text-xs text-[#e87a43] uppercase tracking-wider">
            Index 01 // Systems & Spatial Catalog
          </span>
        </div>
        <TextReveal as="h1" className="text-display-sub text-[#f4f4f2] font-light">
          Selected Systems & Spatial Case Studies
        </TextReveal>
        <p className="mt-6 font-sans text-base md:text-lg text-[#8e9298] max-w-2xl font-light leading-relaxed">
          A catalog of digital products, spatial interfaces, and multi-platform design systems deployed for venture-backed and global technology leaders.
        </p>
      </div>

      {/* Filter Chips */}
      <div className="mt-12 flex flex-wrap gap-2 pt-6 hairline-t">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setSelectedCategory(cat)}
            onMouseEnter={() => setCursorVariant('pointer')}
            onMouseLeave={() => resetCursor()}
            className={`px-4 py-2 rounded-full font-mono text-xs uppercase tracking-wider transition-all duration-300 ${
              selectedCategory === cat
                ? 'bg-[#f4f4f2] text-[#0c0d0e] font-medium shadow-md'
                : 'bg-[#141618] text-[#8e9298] hover:text-[#f4f4f2] border border-[rgba(255,255,255,0.06)]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Case Study Grid */}
      <div className="work-grid mt-16 grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14">
        {filteredProjects.map((project, idx) => (
          <Link
            key={project.id}
            to={`/work/${project.slug}`}
            className="work-card group block will-change-transform"
            onMouseEnter={() => setCursorVariant('view', 'STUDY')}
            onMouseLeave={() => resetCursor()}
          >
            <div className="work-card-media relative aspect-[16/10] w-full overflow-hidden rounded-3xl bg-[#141618] border border-[rgba(255,255,255,0.06)] shadow-lg will-change-transform">
              <div className="card-parallax-img h-full w-full will-change-transform">
                <img
                  src={project.heroImage}
                  alt={project.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 will-change-transform"
                />
              </div>
              <div className="absolute inset-0 bg-black/25 group-hover:bg-transparent transition-colors duration-300" />
              <div className="absolute top-4 left-4 font-mono text-[11px] px-3 py-1 rounded-full bg-[#0c0d0e]/80 backdrop-blur-md text-[#f4f4f2] border border-[rgba(255,255,255,0.08)]">
                0{idx + 1} — {project.year}
              </div>
            </div>

            <div className="work-card-info mt-6 flex items-start justify-between gap-4 will-change-transform">
              <div>
                <span className="font-mono text-xs text-[#e87a43] uppercase tracking-wider block mb-1">
                  {project.category}
                </span>
                <h2 className="font-display text-2xl font-light text-[#f4f4f2] group-hover:text-[#e87a43] transition-colors">
                  {project.title}
                </h2>
                <p className="mt-2 font-sans text-sm text-[#8e9298] line-clamp-2 font-light">
                  {project.summary}
                </p>
              </div>

              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[rgba(255,255,255,0.1)] group-hover:border-[#e87a43] group-hover:bg-[#e87a43] group-hover:text-[#0c0d0e] transition-all">
                <ArrowUpRight size={18} />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
