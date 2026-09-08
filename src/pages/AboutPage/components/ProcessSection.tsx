import { useRef } from 'react';
import { siteConfig } from '@/src/data/siteConfig';
import { useGSAPContext } from '@/src/hooks/useGSAPContext';
import { gsap } from '@/src/utils/gsap';
import { usePrefersReducedMotion } from '@/src/hooks/usePrefersReducedMotion';
import { GitCommit } from 'lucide-react';

export function ProcessSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useGSAPContext(
    () => {
      if (prefersReducedMotion || !containerRef.current) return;

      const processCards = containerRef.current.querySelectorAll('.process-step-item');

      processCards.forEach((card) => {
        // Continuous scrubbed reveal as card moves into focal view
        gsap.fromTo(
          card,
          { opacity: 0.2, y: 38, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            ease: 'power1.out',
            scrollTrigger: {
              trigger: card,
              start: () => 'top 92%',
              end: () => 'center 50%',
              scrub: 0.8,
              invalidateOnRefresh: true,
            },
          }
        );

        // Inner deliverable tags subtle stagger scrub
        const deliverables = card.querySelectorAll('.process-deliverable-badge');
        if (deliverables.length > 0) {
          gsap.fromTo(
            deliverables,
            { opacity: 0.3, y: 8 },
            {
              opacity: 1,
              y: 0,
              stagger: 0.05,
              ease: 'power1.out',
              scrollTrigger: {
                trigger: card,
                start: () => 'top 85%',
                end: () => 'center 45%',
                scrub: 0.8,
                invalidateOnRefresh: true,
              },
            }
          );
        }
      });
    },
    containerRef,
    [prefersReducedMotion]
  );

  return (
    <section ref={containerRef} className="py-24 hairline-t">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Sticky Lead */}
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32 space-y-6">
            <span className="font-mono text-xs text-[#e87a43] uppercase tracking-wider block">
              03 // Engagement Blueprint
            </span>
            <h3 className="font-display text-3xl md:text-5xl font-light text-[#f4f4f2] leading-[1.08]">
              Methodical <span className="font-serif italic text-[#e87a43]">Rigor</span>
            </h3>
            <p className="font-sans text-sm md:text-base text-[#8e9298] font-light leading-relaxed">
              Eliminating creative ambiguity through structured phases, explicit cognitive benchmarks, and production-grade code validation.
            </p>
          </div>
        </div>

        {/* Right Stepped Timeline */}
        <div className="lg:col-span-8 space-y-12">
          {siteConfig.process.map((step) => (
            <div
              key={step.step}
              className="process-step-item p-8 md:p-10 rounded-3xl bg-[#141618] border border-[rgba(255,255,255,0.06)] hover:border-[rgba(255,255,255,0.15)] transition-colors will-change-transform"
            >
              <div className="flex items-center justify-between pb-6 border-b border-[rgba(255,255,255,0.06)] mb-6 font-mono text-xs text-[#8e9298]">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#e87a43]" />
                  <span className="text-[#f4f4f2] font-semibold">PHASE {step.step}</span>
                </div>
                <span className="text-[#e87a43]">{step.timeline}</span>
              </div>

              <h4 className="font-display text-2xl md:text-3xl text-[#f4f4f2] font-light mb-4">
                {step.title}
              </h4>
              <p className="font-sans text-sm md:text-base text-[#8e9298] font-light leading-relaxed mb-8">
                {step.description}
              </p>

              <div className="pt-4 hairline-t">
                <span className="font-mono text-[11px] text-[#8e9298] uppercase tracking-wider block mb-3">
                  Key Artifacts & Tangible Deliverables
                </span>
                <div className="flex flex-wrap gap-2">
                  {step.deliverables.map((deliv) => (
                    <span
                      key={deliv}
                      className="process-deliverable-badge inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0c0d0e] border border-[rgba(255,255,255,0.08)] font-mono text-[11px] text-[#f4f4f2]"
                    >
                      <GitCommit size={10} className="text-[#e87a43]" />
                      <span>{deliv}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
