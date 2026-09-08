import { useRef } from 'react';
import { useGSAPContext } from '@/src/hooks/useGSAPContext';
import { gsap } from '@/src/utils/gsap';
import { usePrefersReducedMotion } from '@/src/hooks/usePrefersReducedMotion';

export function StatisticsMarquee() {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  const partners = [
    'Chronos Spatial Labs',
    'Axiom Capital',
    'Cerebra Neural',
    'Strata Tokyo',
    'Linear Spatial',
    'Cognition Foundry',
    'Vektor Systems',
    'Helios Quantitative',
  ];

  const metrics = [
    { value: '12+', label: 'Years Leading Digital Product Craft', detail: 'From pre-seed to NASDAQ listed' },
    { value: '$2.4B', label: 'Cumulative Valuation of Client Products', detail: 'Across 16 deployed systems' },
    { value: '14', label: 'Global Industry Recognitions', detail: 'Awwwards, FWA, Red Dot, FastCo' },
    { value: '99.4%', label: 'On-Time Systems Delivery Benchmark', detail: 'Zero architectural regressions' },
  ];

  useGSAPContext(
    () => {
      if (prefersReducedMotion || !marqueeRef.current) return;

      const row = marqueeRef.current.querySelector('.marquee-inner');
      if (!row) return;

      // Continuous serene loop
      const tween = gsap.to(row, {
        xPercent: -50,
        repeat: -1,
        duration: 28,
        ease: 'none',
      });

      return () => {
        tween.kill();
      };
    },
    marqueeRef,
    [prefersReducedMotion]
  );

  return (
    <section className="relative w-full py-24 bg-[#0c0d0e] hairline-t">
      {/* 1. Measurable Impact Statistics Grid */}
      <div className="mx-auto max-w-7xl px-6 md:px-12 mb-20">
        <div className="mb-12">
          <span className="font-mono text-xs text-[#e87a43] uppercase tracking-wider block mb-2">
            03 / Impact & Proven Velocity
          </span>
          <h2 className="text-display-sub text-[#f4f4f2] font-light">
            Measured by Systematic Outcomes
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {metrics.map((metric) => (
            <div
              key={metric.label}
              className="p-8 rounded-2xl bg-[#141618] border border-[rgba(255,255,255,0.06)] flex flex-col justify-between"
            >
              <div>
                <span className="font-display text-4xl lg:text-5xl font-light text-[#f4f4f2] tracking-tight">
                  {metric.value}
                </span>
                <span className="mt-3 block font-mono text-xs text-[#e87a43] uppercase tracking-wider">
                  {metric.label}
                </span>
              </div>
              <p className="mt-6 font-sans text-xs text-[#8e9298] pt-4 border-t border-[rgba(255,255,255,0.06)]">
                {metric.detail}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Infinite Seamless Partner Marquee */}
      <div ref={marqueeRef} className="w-full overflow-hidden border-y border-[rgba(255,255,255,0.08)] py-6 bg-[#141618]/50 backdrop-blur-sm">
        <div className="marquee-inner flex w-max items-center gap-12 font-display text-xl sm:text-2xl font-light text-[#8e9298] tracking-wider uppercase select-none will-change-transform">
          {/* Repeat list twice for seamless wrap */}
          {[...partners, ...partners].map((partner, i) => (
            <div key={`${partner}-${i}`} className="flex items-center gap-12 shrink-0">
              <span className="hover:text-[#f4f4f2] transition-colors cursor-default">
                {partner}
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-[#e87a43]" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
