import { siteConfig } from '@/src/data/siteConfig';
import { MagneticButton } from '@/src/components/common/MagneticButton';
import { useLenis } from '@/src/context/SmoothScrollContext';
import { ArrowUpRight, ArrowUp } from 'lucide-react';

export function Footer() {
  const { scrollTo } = useLenis();

  const handleBackToTop = () => {
    scrollTo(0, { immediate: false, duration: 1.2 });
  };

  return (
    <footer className="relative w-full bg-[#0c0d0e] hairline-t">
      <div className="mx-auto max-w-7xl px-6 py-20 md:px-12 md:py-28">
        {/* Top: Architectural Call-to-Action */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8 items-start">
          <div className="lg:col-span-8">
            <span className="font-mono text-xs text-[#e87a43] uppercase tracking-wider block mb-4">
              Direct Access / Inquiries
            </span>
            <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-light tracking-tight text-[#f4f4f2] leading-[1.02]">
              Let’s construct the next <span className="italic font-serif text-[#e87a43]">benchmark</span> together.
            </h2>
          </div>

          <div className="lg:col-span-4 flex flex-col items-start lg:items-end justify-between h-full gap-8">
            <div className="text-left lg:text-right">
              <span className="font-mono text-xs text-[#8e9298] block uppercase">Current Focus</span>
              <p className="mt-1 font-sans text-sm text-[#f4f4f2] max-w-xs">
                Spatial computing systems, cognitive trading terminals, and high-velocity product architectures.
              </p>
            </div>

            <MagneticButton
              href={`mailto:${siteConfig.email}`}
              variant="primary"
              className="!px-8 !py-4 !text-xs !bg-[#e87a43] !text-[#0c0d0e] hover:!bg-[#f4f4f2]"
              cursorLabel="EMAIL"
            >
              {siteConfig.email}
            </MagneticButton>
          </div>
        </div>

        {/* Mid: Social & Platform Index */}
        <div className="mt-20 pt-10 hairline-t grid grid-cols-2 sm:grid-cols-4 gap-6">
          {siteConfig.socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-start p-4 rounded-xl hover:bg-[#141618] transition-colors duration-200"
            >
              <div className="flex items-center gap-1 text-[#8e9298] group-hover:text-[#e87a43] transition-colors">
                <span className="font-mono text-xs uppercase tracking-wider">{social.label}</span>
                <ArrowUpRight size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
              <span className="mt-1 font-mono text-[11px] text-[#4b4f55] group-hover:text-[#8e9298] transition-colors">
                {social.handle}
              </span>
            </a>
          ))}
        </div>

        {/* Bottom Bar: Copyright & Back-to-Top */}
        <div className="mt-16 flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 hairline-t text-xs font-mono text-[#8e9298]">
          <div className="flex items-center gap-4">
            <span>© {new Date().getFullYear()} Kaelen Vance</span>
            <span>/</span>
            <span>All rights reserved</span>
            <span>/</span>
            <span className="hidden md:inline">Zurich & San Francisco</span>
          </div>

          <button
            type="button"
            onClick={handleBackToTop}
            className="group flex items-center gap-2 text-[#8e9298] hover:text-[#f4f4f2] transition-colors duration-200 focus:outline-none"
            aria-label="Scroll back to top of page"
          >
            <span>Back to top</span>
            <span className="flex h-6 w-6 items-center justify-center rounded-full border border-[rgba(255,255,255,0.1)] group-hover:border-[#e87a43] group-hover:text-[#e87a43] transition-colors">
              <ArrowUp size={12} />
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
}
