import { useRef } from 'react';
import { siteConfig } from '@/src/data/siteConfig';
import { useGSAPContext } from '@/src/hooks/useGSAPContext';
import { gsap } from '@/src/utils/gsap';
import { usePrefersReducedMotion } from '@/src/hooks/usePrefersReducedMotion';
import { Sparkles, Terminal, Wrench } from 'lucide-react';

export function SkillsMatrix() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useGSAPContext(
    () => {
      if (prefersReducedMotion || !containerRef.current) return;

      const skillGroups = containerRef.current.querySelectorAll('.skill-group-card');
      const toolsWrapper = containerRef.current.querySelector('.tools-wrapper');

      // 1. Scrubbed Domain Cards - individual dynamic triggers synchronized with scroll
      skillGroups.forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0.2, y: 36, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            ease: 'power1.out',
            scrollTrigger: {
              trigger: card,
              start: () => 'top 92%',
              end: () => 'center 55%',
              scrub: 0.8,
              invalidateOnRefresh: true,
            },
          }
        );
      });

      // 2. Scrubbed Tools Wrapper & Technical Stack
      if (toolsWrapper) {
        gsap.fromTo(
          toolsWrapper,
          { opacity: 0.25, y: 32 },
          {
            opacity: 1,
            y: 0,
            ease: 'power1.out',
            scrollTrigger: {
              trigger: toolsWrapper,
              start: () => 'top 90%',
              end: () => 'top 55%',
              scrub: 0.8,
              invalidateOnRefresh: true,
            },
          }
        );

        const toolRows = toolsWrapper.querySelectorAll('.tool-row');
        toolRows.forEach((row, i) => {
          gsap.fromTo(
            row,
            { opacity: 0.2, y: 20 },
            {
              opacity: 1,
              y: 0,
              ease: 'power1.out',
              scrollTrigger: {
                trigger: toolsWrapper,
                start: () => `top ${88 - i * 3}%`,
                end: () => 'top 50%',
                scrub: 0.8,
                invalidateOnRefresh: true,
              },
            }
          );
        });
      }
    },
    containerRef,
    [prefersReducedMotion]
  );

  return (
    <section ref={containerRef} className="py-20 hairline-t">
      {/* 1. Core Competencies Grid */}
      <div className="mb-14">
        <div className="flex items-center gap-2 mb-3">
          <Terminal size={14} className="text-[#e87a43]" />
          <span className="font-mono text-xs text-[#e87a43] uppercase tracking-wider">
            Technical Architecture & Design Mastery
          </span>
        </div>
        <h3 className="text-display-sub text-[#f4f4f2] font-light max-w-3xl">
          Specialized Domains of Product Craft
        </h3>
        <p className="mt-4 font-sans text-sm md:text-base text-[#8e9298] max-w-2xl font-light">
          Deep computational domain expertise across high-concurrency systems, spatial operating environments, and design infrastructure.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
        {siteConfig.skills.map((category, idx) => (
          <div
            key={category.title}
            className="skill-group-card p-8 rounded-3xl bg-[#141618] border border-[rgba(255,255,255,0.06)] hover:border-[rgba(255,255,255,0.15)] transition-colors will-change-transform flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[rgba(255,255,255,0.06)] mb-6 font-mono text-xs text-[#8e9298]">
                <span>0{idx + 1} // DOMAIN</span>
                <span className="text-[#e87a43]">{category.title.split(' ')[0]}</span>
              </div>

              <h4 className="font-display text-2xl text-[#f4f4f2] font-light mb-2">
                {category.title}
              </h4>
              <p className="font-sans text-xs text-[#8e9298] font-light mb-6">
                {category.subtitle}
              </p>

              <ul className="space-y-3 font-mono text-xs text-[#f4f4f2]/90">
                {category.skills.map((skill) => (
                  <li key={skill} className="flex items-center gap-3">
                    <span className="h-1 w-1 rounded-full bg-[#e87a43]" />
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* 2. Toolstack & Technical Stack */}
      <div className="tools-wrapper p-8 md:p-12 rounded-3xl bg-[#141618]/60 border border-[rgba(255,255,255,0.06)] backdrop-blur-sm">
        <div className="flex items-center gap-2 mb-4">
          <Wrench size={14} className="text-[#e87a43]" />
          <span className="font-mono text-xs text-[#e87a43] uppercase tracking-wider">
            Operational Instruments & Technology Stack
          </span>
        </div>
        <h4 className="font-display text-2xl md:text-3xl text-[#f4f4f2] font-light mb-8">
          Production Toolchain
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {siteConfig.tools.map((group) => (
            <div key={group.category} className="tool-row space-y-4 will-change-transform">
              <span className="font-mono text-xs text-[#8e9298] uppercase tracking-wider block border-b border-[rgba(255,255,255,0.06)] pb-2">
                {group.category}
              </span>
              <ul className="space-y-2 font-mono text-xs text-[#f4f4f2]">
                {group.tools.map((tool) => (
                  <li
                    key={tool}
                    className="flex items-center gap-2 text-[#8e9298] hover:text-[#f4f4f2] transition-colors"
                  >
                    <Sparkles size={10} className="text-[#e87a43]" />
                    <span>{tool}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
