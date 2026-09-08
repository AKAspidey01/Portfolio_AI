import { useRef } from 'react';
import { TextReveal } from '@/src/components/common/TextReveal';
import { HairlineDivider } from '@/src/components/common/HairlineDivider';
import { MagneticButton } from '@/src/components/common/MagneticButton';
import { siteConfig } from '@/src/data/siteConfig';
import { SkillsMatrix } from './components/SkillsMatrix';
import { ProcessSection } from './components/ProcessSection';
import { useGSAPContext } from '@/src/hooks/useGSAPContext';
import { gsap } from '@/src/utils/gsap';
import { usePrefersReducedMotion } from '@/src/hooks/usePrefersReducedMotion';
import { Award, Briefcase, Sparkles } from 'lucide-react';

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroImageRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  const experiences = [
    {
      period: '2022 — Present',
      role: 'Principal Design Technologist',
      company: 'Vance Studio',
      location: 'Zurich / Remote',
      description:
        'Advising frontier AI and high-frequency fintech ventures on spatial interaction design, computational typography, and operational ergonomics.',
    },
    {
      period: '2019 — 2022',
      role: 'Staff Product Designer',
      company: 'Linear Spatial',
      location: 'San Francisco, CA',
      description:
        'Led core desktop application and spatial canvas primitives from pre-seed through Series B hyper-growth, establishing the foundational design token architecture.',
    },
    {
      period: '2016 — 2019',
      role: 'Senior Motion & Interaction Designer',
      company: 'Kinetic Labs Europe',
      location: 'Berlin, DE',
      description:
        'Designed interactive digital exhibits, kinetic brand architectures, and multi-touch spatial installations for premier cultural and automotive institutions.',
    },
  ];

  const recognitions = [
    { year: '2025', award: 'Awwwards Site of the Year', project: 'Chronos Spatial OS', category: 'Nominee' },
    { year: '2024', award: 'CSS Design Awards Site of the Day', project: 'Axiom Terminal', category: 'Winner' },
    { year: '2024', award: 'FWA of the Month', project: 'Cerebra Neural Inspector', category: 'Winner' },
    { year: '2023', award: 'Red Dot Best of the Best', project: 'Strata Monograph', category: 'Interface Design' },
  ];

  useGSAPContext(
    () => {
      if (prefersReducedMotion || !containerRef.current) return;

      const heroImg = heroImageRef.current;
      if (heroImg) {
        gsap.fromTo(
          heroImg,
          { scale: 1.08, yPercent: 4 },
          {
            scale: 1,
            yPercent: -4,
            ease: 'none',
            scrollTrigger: {
              trigger: heroImg,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.2,
            },
          }
        );
      }

      // Experience timeline card entry
      const expItems = containerRef.current.querySelectorAll('.experience-row');
      gsap.fromTo(
        expItems,
        { opacity: 0.15, x: -20 },
        {
          opacity: 1,
          x: 0,
          stagger: 0.15,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.experience-wrapper',
            start: 'top 85%',
            toggleActions: 'play none none reverse',
            invalidateOnRefresh: true,
          },
        }
      );

      // Recognitions stagger
      const awardRows = containerRef.current.querySelectorAll('.award-row');
      gsap.fromTo(
        awardRows,
        { opacity: 0.2, y: 15 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.08,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.awards-wrapper',
            start: 'top 85%',
            toggleActions: 'play none none reverse',
            invalidateOnRefresh: true,
          },
        }
      );
    },
    containerRef,
    [prefersReducedMotion]
  );

  return (
    <div ref={containerRef} className="mx-auto max-w-7xl px-6 py-16 md:px-12 md:py-24">
      {/* 1. Intro Editorial Statement */}
      <div className="max-w-5xl">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles size={14} className="text-[#e87a43]" />
          <span className="font-mono text-xs text-[#e87a43] uppercase tracking-wider">
            Index 02 // Biography & Systematic Craft
          </span>
        </div>
        <TextReveal as="h1" className="text-display-sub text-[#f4f4f2] font-light">
          Operating at the confluence of cognitive ergonomics, computational aesthetics, and kinetic systems.
        </TextReveal>
      </div>

      {/* 2. Biography & Portrait with Sticky Left Rail */}
      <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-12 pt-12 hairline-t">
        {/* Left Column: Portrait & Studio Coordinates */}
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32 space-y-8">
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-[#141618] border border-[rgba(255,255,255,0.08)]">
              <div ref={heroImageRef} className="h-full w-full will-change-transform">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop"
                  alt="Kaelen Vance portrait"
                  className="h-full w-full object-cover grayscale contrast-125"
                />
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#141618] border border-[rgba(255,255,255,0.06)] font-mono text-xs space-y-3">
              <div className="flex justify-between text-[#8e9298]">
                <span>Location</span>
                <span className="text-[#f4f4f2]">{siteConfig.location}</span>
              </div>
              <div className="flex justify-between text-[#8e9298]">
                <span>Timezone</span>
                <span className="text-[#f4f4f2]">{siteConfig.timezone}</span>
              </div>
              <div className="flex justify-between text-[#8e9298]">
                <span>Availability</span>
                <span className="text-[#e87a43]">{siteConfig.availability}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Editorial Thesis */}
        <div className="lg:col-span-8 space-y-12">
          <div>
            <span className="font-mono text-xs text-[#e87a43] uppercase tracking-wider block mb-3">
              Thesis & Values
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-light text-[#f4f4f2] mb-6">
              The Philosophy of Quiet Authority
            </h2>
            <div className="space-y-6 font-sans text-base md:text-lg text-[#8e9298] font-light leading-relaxed">
              <p>
                Great software is not loud. In an ecosystem dominated by sensory inflation, hyper-saturated gradients, and disposable micro-trends, true luxury in digital product design is quiet, unwavering precision.
              </p>
              <p>
                I partner with a small handful of venture engineering teams each year to architect computational tools where every micro-interaction has mathematical justification, every typographic scale respects natural eye saccades, and every millisecond of transition communicates state hierarchy.
              </p>
              <p>
                Software is the highest-leverage medium of human cognition. When an interface achieves mechanical clarity, the tool dissolves, leaving only direct intellectual output.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Skills Matrix Section */}
      <SkillsMatrix />

      {/* 4. Systematic Process Section */}
      <ProcessSection />

      {/* 5. Career Trajectory */}
      <section className="experience-wrapper py-24 hairline-t">
        <div className="flex items-center gap-2 mb-3">
          <Briefcase size={14} className="text-[#e87a43]" />
          <span className="font-mono text-xs text-[#e87a43] uppercase tracking-wider">
            Trajectory & Proven Leadership
          </span>
        </div>
        <h3 className="text-display-sub text-[#f4f4f2] font-light mb-12">
          Career Experience
        </h3>

        <div className="space-y-8">
          {experiences.map((exp) => (
            <div
              key={exp.company}
              className="experience-row flex flex-col md:flex-row md:items-baseline justify-between gap-4 p-8 rounded-2xl bg-[#141618] border border-[rgba(255,255,255,0.06)] hover:border-[rgba(255,255,255,0.12)] transition-colors will-change-transform"
            >
              <div className="space-y-2">
                <span className="font-mono text-xs text-[#e87a43]">{exp.period}</span>
                <h4 className="font-display text-2xl text-[#f4f4f2] font-light">{exp.role}</h4>
                <span className="font-sans text-sm text-[#8e9298] block">
                  {exp.company} — {exp.location}
                </span>
                <p className="font-sans text-sm text-[#8e9298] max-w-2xl font-light pt-2">
                  {exp.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Honors & Jury Recognitions */}
      <section className="awards-wrapper py-20 hairline-t">
        <div className="flex items-center gap-2 mb-3">
          <Award size={14} className="text-[#e87a43]" />
          <span className="font-mono text-xs text-[#e87a43] uppercase tracking-wider">
            Industry Verification
          </span>
        </div>
        <h3 className="text-display-sub text-[#f4f4f2] font-light mb-10">
          Honors & Jury Recognitions
        </h3>

        <div className="space-y-3 font-mono text-xs">
          {recognitions.map((rec) => (
            <div
              key={rec.award}
              className="award-row flex items-center justify-between p-4 rounded-xl bg-[#141618]/50 border border-[rgba(255,255,255,0.04)] will-change-transform hover:border-[rgba(255,255,255,0.1)] transition-colors"
            >
              <div className="flex items-center gap-4">
                <span className="text-[#8e9298]">{rec.year}</span>
                <span className="text-[#f4f4f2]">{rec.award}</span>
                <span className="hidden sm:inline text-[rgba(255,255,255,0.2)]">/</span>
                <span className="hidden sm:inline text-[#8e9298]">{rec.project}</span>
              </div>
              <span className="text-[#e87a43] font-semibold">{rec.category}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Outro Bridge to Collaboration */}
      <div className="pt-12 text-center hairline-t">
        <h4 className="font-display text-3xl md:text-5xl font-light text-[#f4f4f2] mb-6">
          Ready to engineer your next flagship system?
        </h4>
        <MagneticButton to="/contact" variant="primary" cursorLabel="INQUIRE">
          Initiate Collaboration
        </MagneticButton>
      </div>
    </div>
  );
}
