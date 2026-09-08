import { useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProjectBySlug, projects } from '@/src/data/projects';
import { TextReveal } from '@/src/components/common/TextReveal';
import { HairlineDivider } from '@/src/components/common/HairlineDivider';
import { MagneticButton } from '@/src/components/common/MagneticButton';
import { ArrowLeft, ArrowUpRight, Sparkles } from 'lucide-react';
import { useCursor } from '@/src/context/CursorContext';
import { useGSAPContext } from '@/src/hooks/useGSAPContext';
import { gsap } from '@/src/utils/gsap';
import { usePrefersReducedMotion } from '@/src/hooks/usePrefersReducedMotion';

export default function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const project = getProjectBySlug(slug || '');
  const { setCursorVariant, resetCursor } = useCursor();
  const containerRef = useRef<HTMLElement>(null);
  const heroMediaRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useGSAPContext(
    () => {
      if (prefersReducedMotion || !containerRef.current || !project) return;

      const heroMedia = heroMediaRef.current;
      if (heroMedia) {
        gsap.fromTo(
          heroMedia,
          { scale: 1.08, yPercent: 3 },
          {
            scale: 1,
            yPercent: -3,
            ease: 'none',
            scrollTrigger: {
              trigger: heroMedia,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.2,
            },
          }
        );
      }

      // Narrative sections reveal
      const narrativeBlocks = containerRef.current.querySelectorAll('.narrative-block');
      narrativeBlocks.forEach((block) => {
        gsap.fromTo(
          block,
          { opacity: 0.2, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: block,
              start: 'top 88%',
              toggleActions: 'play none none reverse',
              invalidateOnRefresh: true,
            },
          }
        );
      });

      // Metrics cards reveal
      const metricCards = containerRef.current.querySelectorAll('.metric-pill-card');
      metricCards.forEach((card, idx) => {
        gsap.fromTo(
          card,
          { opacity: 0.15, y: 22, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.65,
            delay: idx * 0.08,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 90%',
              toggleActions: 'play none none reverse',
              invalidateOnRefresh: true,
            },
          }
        );
      });
    },
    containerRef,
    [project?.id, prefersReducedMotion]
  );

  if (!project) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-6 text-center">
        <span className="font-mono text-xs text-[#e87a43] uppercase tracking-wider mb-2">404</span>
        <h1 className="font-display text-4xl text-[#f4f4f2] font-light">Case Study Not Found</h1>
        <p className="mt-4 font-sans text-sm text-[#8e9298]">The requested project does not exist in the archive index.</p>
        <div className="mt-8">
          <MagneticButton to="/work" variant="primary">Return to Archive</MagneticButton>
        </div>
      </div>
    );
  }

  // Find next project in array for next project trigger
  const currentIndex = projects.findIndex((p) => p.id === project.id);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  return (
    <article ref={containerRef} className="mx-auto max-w-7xl px-6 py-12 md:px-12 lg:py-20">
      {/* Top Back Navigation */}
      <div className="mb-10">
        <Link
          to="/work"
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#8e9298] hover:text-[#f4f4f2] transition-colors"
          onMouseEnter={() => setCursorVariant('pointer')}
          onMouseLeave={() => resetCursor()}
        >
          <ArrowLeft size={14} />
          <span>All Case Studies</span>
        </Link>
      </div>

      {/* Case Study Hero */}
      <div className="max-w-5xl">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles size={14} className="text-[#e87a43]" />
          <span className="font-mono text-xs text-[#e87a43] uppercase tracking-wider">
            {project.category} // {project.year}
          </span>
        </div>
        <TextReveal as="h1" className="text-display-hero text-[#f4f4f2] font-light">
          {project.title}
        </TextReveal>
        <p className="mt-6 font-sans text-xl md:text-2xl text-[#8e9298] font-light leading-relaxed max-w-3xl">
          {project.tagline}
        </p>
      </div>

      {/* Full-Bleed Panoramic Hero Asset with Scrub Parallax */}
      <div className="mt-12 overflow-hidden rounded-3xl bg-[#141618] border border-[rgba(255,255,255,0.08)] aspect-[16/9] w-full shadow-2xl">
        <div ref={heroMediaRef} className="h-full w-full will-change-transform">
          <img
            src={project.heroImage}
            alt={project.title}
            className="h-full w-full object-cover"
          />
        </div>
      </div>

      {/* Project Metadata Rail & Executive Summary */}
      <div className="narrative-container mt-16 grid grid-cols-1 lg:grid-cols-12 gap-12 pt-12 hairline-t">
        {/* Sticky Left Rail: Project Facts */}
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32 space-y-8 font-mono text-xs p-6 rounded-2xl bg-[#141618] border border-[rgba(255,255,255,0.06)]">
            <div>
              <span className="text-[#8e9298] uppercase block mb-1">Client / Partner</span>
              <span className="text-[#f4f4f2] text-sm">{project.client}</span>
            </div>

            <div>
              <span className="text-[#8e9298] uppercase block mb-1">Role / Responsibilities</span>
              <ul className="space-y-1 text-[#f4f4f2]">
                {project.role.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
            </div>

            <div>
              <span className="text-[#8e9298] uppercase block mb-1">Timeline & Scope</span>
              <span className="text-[#f4f4f2]">{project.timeline}</span>
            </div>

            <div>
              <span className="text-[#8e9298] uppercase block mb-1">Core Deliverables</span>
              <ul className="space-y-1 text-[#f4f4f2]">
                {project.deliverables.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Right Narrative Body: Challenge & Solution */}
        <div className="lg:col-span-8 space-y-12">
          <div className="narrative-block will-change-transform">
            <span className="font-mono text-xs text-[#e87a43] uppercase tracking-wider block mb-2">
              01 // The Core Friction
            </span>
            <h3 className="font-display text-2xl text-[#f4f4f2] font-light mb-4">The Challenge</h3>
            <p className="font-sans text-lg md:text-xl text-[#f4f4f2] font-light leading-relaxed">
              {project.challenge}
            </p>
          </div>

          <div className="narrative-block will-change-transform">
            <span className="font-mono text-xs text-[#e87a43] uppercase tracking-wider block mb-2">
              02 // Systematic Architecture
            </span>
            <h3 className="font-display text-2xl text-[#f4f4f2] font-light mb-4">Strategic Solution</h3>
            <p className="font-sans text-lg md:text-xl text-[#8e9298] font-light leading-relaxed">
              {project.solution}
            </p>
          </div>

          {/* Metric Performance Display */}
          <div className="pt-6 hairline-t">
            <span className="font-mono text-xs text-[#8e9298] uppercase tracking-wider block mb-6">
              03 // Measurable Systemic Outcomes
            </span>
            <div className="metrics-grid grid grid-cols-1 sm:grid-cols-3 gap-6">
              {project.metrics.map((metric) => (
                <div
                  key={metric.label}
                  className="metric-pill-card p-6 rounded-2xl bg-[#141618] border border-[rgba(255,255,255,0.06)] hover:border-[rgba(255,255,255,0.15)] transition-colors will-change-transform"
                >
                  <span className="block font-display text-3xl md:text-4xl text-[#f4f4f2] font-light">
                    {metric.value}
                  </span>
                  <span className="mt-1 block font-mono text-xs text-[#e87a43]">
                    {metric.change}
                  </span>
                  <span className="mt-2 block font-sans text-xs text-[#8e9298]">
                    {metric.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <HairlineDivider className="my-20" />

      {/* Next Project Footer Advance */}
      <section className="pt-8">
        <span className="font-mono text-xs text-[#8e9298] uppercase tracking-wider block mb-4">
          Advance to Next Case Study
        </span>
        <Link
          to={`/work/${nextProject.slug}`}
          className="group block"
          onMouseEnter={() => setCursorVariant('view', 'NEXT')}
          onMouseLeave={() => resetCursor()}
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 p-8 md:p-12 rounded-3xl bg-[#141618] border border-[rgba(255,255,255,0.08)] group-hover:border-[#e87a43] transition-colors">
            <div>
              <span className="font-mono text-xs text-[#e87a43] uppercase tracking-wider block mb-2">
                Next Project // {nextProject.category}
              </span>
              <h3 className="font-display text-3xl md:text-5xl font-light text-[#f4f4f2] group-hover:text-[#e87a43] transition-colors">
                {nextProject.title}
              </h3>
              <p className="mt-2 font-sans text-sm text-[#8e9298] max-w-xl">
                {nextProject.tagline}
              </p>
            </div>
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#f4f4f2] text-[#0c0d0e] group-hover:bg-[#e87a43] transition-colors shrink-0">
              <ArrowUpRight size={28} />
            </div>
          </div>
        </Link>
      </section>
    </article>
  );
}
