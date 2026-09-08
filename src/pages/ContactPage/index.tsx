import React, { useState, useRef } from 'react';
import { TextReveal } from '@/src/components/common/TextReveal';
import { MagneticButton } from '@/src/components/common/MagneticButton';
import { siteConfig } from '@/src/data/siteConfig';
import { Check, Copy, Sparkles, Send } from 'lucide-react';
import { useGSAPContext } from '@/src/hooks/useGSAPContext';
import { gsap } from '@/src/utils/gsap';
import { usePrefersReducedMotion } from '@/src/hooks/usePrefersReducedMotion';
import { useCursor } from '@/src/context/CursorContext';

export default function ContactPage() {
  const [copied, setCopied] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectScope: 'Spatial / Product Design',
    budget: '$50k — $100k',
    message: '',
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const { setCursorVariant, resetCursor } = useCursor();

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(siteConfig.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  useGSAPContext(
    () => {
      if (prefersReducedMotion || !containerRef.current) return;

      const mm = gsap.matchMedia();

      // 1. Large Inquiry Headline subtle scroll response
      if (headlineRef.current) {
        gsap.to(headlineRef.current, {
          yPercent: -10,
          opacity: 0.85,
          ease: 'none',
          scrollTrigger: {
            trigger: headlineRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });
      }

      // 2. Left Column Transmission & Status Panels Scrub
      const leftPanels = containerRef.current.querySelectorAll('.contact-panel-left');
      leftPanels.forEach((panel, i) => {
        gsap.fromTo(
          panel,
          { opacity: 0.2, y: 34, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            ease: 'power1.out',
            scrollTrigger: {
              trigger: panel,
              start: () => `top ${90 - i * 3}%`,
              end: () => 'center 50%',
              scrub: 0.8,
              invalidateOnRefresh: true,
            },
          }
        );
      });

      // 3. Right Column: Inquiry Form Card Scrub
      const formWrapper = containerRef.current.querySelector('.contact-form-wrapper');
      if (formWrapper) {
        gsap.fromTo(
          formWrapper,
          { opacity: 0.2, y: 38, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            ease: 'power1.out',
            scrollTrigger: {
              trigger: formWrapper,
              start: () => 'top 90%',
              end: () => 'center 50%',
              scrub: 0.8,
              invalidateOnRefresh: true,
            },
          }
        );

        // 4. Contact CTA Magnetic Button Entrance
        const submitRow = formWrapper.querySelector('.contact-submit-row');
        if (submitRow) {
          gsap.fromTo(
            submitRow,
            { opacity: 0.3, y: 18 },
            {
              opacity: 1,
              y: 0,
              ease: 'power1.out',
              scrollTrigger: {
                trigger: submitRow,
                start: () => 'top 94%',
                end: () => 'top 75%',
                scrub: 0.8,
                invalidateOnRefresh: true,
              },
            }
          );
        }
      }

      return () => mm.revert();
    },
    containerRef,
    [prefersReducedMotion, formSubmitted]
  );

  return (
    <div ref={containerRef} className="mx-auto max-w-7xl px-6 py-16 md:px-12 md:py-24">
      <div ref={headlineRef} className="max-w-4xl will-change-transform">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles size={14} className="text-[#e87a43]" />
          <span className="font-mono text-xs text-[#e87a43] uppercase tracking-wider">
            Index 03 // Direct Advisory & Engagement
          </span>
        </div>
        <TextReveal as="h1" className="text-display-sub text-[#f4f4f2] font-light">
          Initiate an Engagement
        </TextReveal>
        <p className="mt-6 font-sans text-base md:text-lg text-[#8e9298] max-w-2xl font-light leading-relaxed">
          Accepting select advisory, design system architecture, and high-impact product redesign engagements for upcoming quarters.
        </p>
      </div>

      <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-12 pt-12 hairline-t">
        {/* Left Column: Direct Access & Studio Status */}
        <div className="lg:col-span-5 space-y-8 font-mono text-xs">
          <div className="contact-panel-left p-6 rounded-3xl bg-[#141618] border border-[rgba(255,255,255,0.06)] space-y-4 will-change-transform shadow-lg">
            <span className="text-[#8e9298] uppercase block">Direct Electronic Transmission</span>
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#f4f4f2] font-mono">{siteConfig.email}</span>
              <button
                type="button"
                onClick={handleCopyEmail}
                onMouseEnter={() => setCursorVariant('pointer')}
                onMouseLeave={() => resetCursor()}
                className="flex items-center gap-1.5 text-xs text-[#e87a43] hover:text-[#f4f4f2] transition-colors focus:outline-none px-3 py-1.5 rounded-full bg-[#0c0d0e] border border-[rgba(255,255,255,0.08)]"
                aria-label="Copy studio email address"
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>

          <div className="contact-panel-left space-y-4 p-6 rounded-3xl bg-[#141618] border border-[rgba(255,255,255,0.06)] will-change-transform shadow-lg">
            <div>
              <span className="text-[#8e9298] uppercase block mb-1">Current Availability</span>
              <span className="text-[#e87a43] font-semibold">{siteConfig.availability}</span>
            </div>
            <div>
              <span className="text-[#8e9298] uppercase block mb-1">Response Latency</span>
              <span className="text-[#f4f4f2]">Usually within 24 business hours</span>
            </div>
            <div>
              <span className="text-[#8e9298] uppercase block mb-1">Primary Coordinates</span>
              <span className="text-[#8e9298]">{siteConfig.location} — {siteConfig.timezone}</span>
            </div>
          </div>

          <div className="contact-panel-left p-6 rounded-3xl bg-[#141618]/50 border border-[rgba(255,255,255,0.04)] will-change-transform">
            <span className="text-[#8e9298] uppercase block mb-3">Engagement Modalities</span>
            <ul className="space-y-2 text-[#8e9298] font-sans text-xs">
              <li>• Embedded Principal Advisory (Monthly Retainer)</li>
              <li>• End-to-End Flagship Redesign (Fixed Milestone)</li>
              <li>• Spatial & Volumetric UX Prototype Sprints (3-4 Weeks)</li>
            </ul>
          </div>
        </div>

        {/* Right Column: Inquiry Form */}
        <div className="contact-form-wrapper lg:col-span-7 will-change-transform">
          {formSubmitted ? (
            <div className="p-10 rounded-3xl bg-[#141618] border border-[rgba(255,255,255,0.08)] text-center space-y-6 shadow-2xl">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#e87a43]/20 text-[#e87a43]">
                <Send size={24} />
              </div>
              <div>
                <span className="font-mono text-xs text-[#e87a43] uppercase tracking-wider block mb-2">
                  Transmission Received
                </span>
                <h3 className="font-display text-3xl text-[#f4f4f2] font-light">
                  Briefing Dispatched Successfully
                </h3>
              </div>
              <p className="font-sans text-sm text-[#8e9298] max-w-md mx-auto leading-relaxed">
                Your briefing has been logged in our studio queue. We will review your scope against current availability and respond within one business day.
              </p>
              <div className="pt-4">
                <button
                  type="button"
                  onClick={() => setFormSubmitted(false)}
                  className="font-mono text-xs text-[#8e9298] hover:text-[#f4f4f2] underline uppercase tracking-wider"
                >
                  Submit Another Inquiry
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="contact-name" className="block font-mono text-xs uppercase tracking-wider text-[#8e9298] mb-2">
                    Name / Principal
                  </label>
                  <input
                    id="contact-name"
                    required
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Alexandre Miller"
                    className="w-full rounded-2xl bg-[#141618] border border-[rgba(255,255,255,0.08)] px-4 py-3 text-sm text-[#f4f4f2] placeholder-[#4b4f55] focus:border-[#e87a43] focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="contact-email" className="block font-mono text-xs uppercase tracking-wider text-[#8e9298] mb-2">
                    Work Email
                  </label>
                  <input
                    id="contact-email"
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="alex@chronos.ai"
                    className="w-full rounded-2xl bg-[#141618] border border-[rgba(255,255,255,0.08)] px-4 py-3 text-sm text-[#f4f4f2] placeholder-[#4b4f55] focus:border-[#e87a43] focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="contact-scope" className="block font-mono text-xs uppercase tracking-wider text-[#8e9298] mb-2">
                    Scope of Work
                  </label>
                  <select
                    id="contact-scope"
                    value={formData.projectScope}
                    onChange={(e) => setFormData({ ...formData, projectScope: e.target.value })}
                    className="w-full rounded-2xl bg-[#141618] border border-[rgba(255,255,255,0.08)] px-4 py-3 text-sm text-[#f4f4f2] focus:border-[#e87a43] focus:outline-none transition-colors"
                  >
                    <option>Spatial / Product Design</option>
                    <option>Design Systems Architecture</option>
                    <option>High-Frequency Fintech UI</option>
                    <option>Advisory / Design Direction</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="contact-budget" className="block font-mono text-xs uppercase tracking-wider text-[#8e9298] mb-2">
                    Estimated Budget Allocation
                  </label>
                  <select
                    id="contact-budget"
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full rounded-2xl bg-[#141618] border border-[rgba(255,255,255,0.08)] px-4 py-3 text-sm text-[#f4f4f2] focus:border-[#e87a43] focus:outline-none transition-colors"
                  >
                    <option>$25k — $50k</option>
                    <option>$50k — $100k</option>
                    <option>$100k+</option>
                    <option>Monthly Advisory Retainer</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="contact-message" className="block font-mono text-xs uppercase tracking-wider text-[#8e9298] mb-2">
                  Project Brief & Objectives
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Outline the core friction, current product stage, and ideal target timeline..."
                  className="w-full rounded-2xl bg-[#141618] border border-[rgba(255,255,255,0.08)] px-4 py-3 text-sm text-[#f4f4f2] placeholder-[#4b4f55] focus:border-[#e87a43] focus:outline-none transition-colors resize-none"
                />
              </div>

              <div className="contact-submit-row pt-2 will-change-transform">
                <MagneticButton type="submit" variant="primary" className="!w-full !py-4" cursorLabel="SEND">
                  Transmit Inquiry
                </MagneticButton>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
