import { useRef } from 'react';
import { useGSAPContext } from '@/src/hooks/useGSAPContext';
import { gsap } from '@/src/utils/gsap';
import { usePrefersReducedMotion } from '@/src/hooks/usePrefersReducedMotion';
import { Layers, Compass, Cpu } from 'lucide-react';

export function PhilosophySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  const principles = [
    {
      index: '01',
      icon: Cpu,
      title: 'The Ergonomics of Speed',
      lead: 'Designing for sub-second cognition in high-stakes environments.',
      body: 'Whether architecting a quantitative terminal processing thousands of trades per second or a spatial operating canvas with parallel AI agents, latency is perceptual. By stripping away ornamental distraction and aligning with ocular saccades, we reduce decision time from seconds to milliseconds.',
      tags: ['Zero-Latency UI', 'High Density', 'Spatial Canvases'],
    },
    {
      index: '02',
      icon: Compass,
      title: 'The Luxury of Restraint',
      lead: 'Digital elegance emerges from what you deliberately omit.',
      body: 'In an era of hyper-saturated gradients and performative micro-interactions, true product authority is expressed through whitespace, disciplined typographic contrast, and uncompromising baseline rhythm. Restraint signals confidence.',
      tags: ['Swiss Typographic Tradition', 'Visual Silence', 'Editorial Form'],
    },
    {
      index: '03',
      icon: Layers,
      title: 'Mathematical Craft & Type Systems',
      lead: 'Unifying design tokens, physics-based springs, and code architectures.',
      body: 'Great interaction design does not end in a Figma frame. It is realized through strict modular scales, bespoke easing profiles (such as damped exponentials), and clean component architectures that bridge the chasm between design intent and engineering execution.',
      tags: ['Design Systems', 'Spring Mechanics', 'Front-End Architecture'],
    },
  ];

  useGSAPContext(
    () => {
      if (prefersReducedMotion || !containerRef.current) return;

      const cards = containerRef.current.querySelectorAll('.philosophy-card');

      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0.2, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              end: 'bottom 15%',
              toggleActions: 'play none none reverse',
              invalidateOnRefresh: true,
            },
          }
        );
      });
    },
    containerRef,
    [prefersReducedMotion]
  );

  return (
    <section
      ref={containerRef}
      className="relative w-full px-6 md:px-12 py-28 max-w-7xl mx-auto hairline-t"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        {/* Sticky Left Rail: Context Anchor */}
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32 space-y-6">
            <span className="font-mono text-xs text-[#e87a43] uppercase tracking-wider block">
              02 / Strategic Thesis
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-light text-[#f4f4f2] leading-[1.08]">
              Design as an instrument of <span className="font-serif italic text-[#e87a43]">clarity</span>.
            </h2>
            <p className="font-sans text-sm md:text-base text-[#8e9298] font-light leading-relaxed">
              Three immutable principles governing every engagement, from conceptual wireframe to production deployment.
            </p>
          </div>
        </div>

        {/* Right Flow: Narrative Principle Cards */}
        <div className="lg:col-span-8 space-y-12">
          {principles.map((p) => {
            const IconComponent = p.icon;
            return (
              <div
                key={p.index}
                className="philosophy-card p-8 md:p-10 rounded-3xl bg-[#141618] border border-[rgba(255,255,255,0.06)] hover:border-[rgba(255,255,255,0.12)] transition-colors will-change-transform"
              >
                <div className="flex items-center justify-between pb-6 border-b border-[rgba(255,255,255,0.06)] mb-6 font-mono text-xs text-[#8e9298]">
                  <span className="text-[#e87a43]">{p.index} / PRINCIPLE</span>
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1c1e22] text-[#f4f4f2]">
                    <IconComponent size={16} />
                  </div>
                </div>

                <h3 className="font-display text-2xl md:text-3xl font-light text-[#f4f4f2] mb-3">
                  {p.title}
                </h3>
                <p className="font-sans text-base text-[#f4f4f2] font-normal mb-4">
                  {p.lead}
                </p>
                <p className="font-sans text-sm md:text-base text-[#8e9298] font-light leading-relaxed mb-8">
                  {p.body}
                </p>

                <div className="flex flex-wrap gap-2 pt-4 hairline-t">
                  {p.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full bg-[#0c0d0e] border border-[rgba(255,255,255,0.08)] font-mono text-[11px] text-[#8e9298]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
