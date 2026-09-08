import { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { siteConfig, navigationLinks } from '@/src/data/siteConfig';
import { MagneticButton } from '@/src/components/common/MagneticButton';
import { Menu, X } from 'lucide-react';

export function Header() {
  const [time, setTime] = useState<string>('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  // Studio live clock (CET / Zurich)
  useEffect(() => {
    const updateClock = () => {
      try {
        const now = new Date();
        const formatted = new Intl.DateTimeFormat('en-GB', {
          timeZone: 'Europe/Zurich',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        }).format(now);
        setTime(`${formatted} CET`);
      } catch {
        setTime('STUDIO ACTIVE');
      }
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="fixed top-0 left-0 z-40 w-full backdrop-blur-md bg-[#0c0d0e]/80 hairline-b transition-all duration-300">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 md:px-12">
        {/* Left: Designer Identity & Availability Beacon */}
        <div className="flex items-center gap-4">
          <Link
            to="/"
            className="group flex flex-col items-start focus:outline-none"
            aria-label="Kaelen Vance Portfolio Home"
          >
            <span className="font-display text-sm font-semibold tracking-tight text-[#f4f4f2] group-hover:text-[#e87a43] transition-colors duration-200">
              {siteConfig.name}
            </span>
            <span className="font-mono text-[11px] text-[#8e9298] tracking-wider uppercase">
              Principal Design
            </span>
          </Link>

          <div className="hidden sm:flex items-center gap-2 pl-4 hairline-l py-1">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-mono text-[10px] tracking-wider text-[#8e9298] uppercase">
              {siteConfig.availability}
            </span>
          </div>
        </div>

        {/* Center: Live Studio Time & Coordinates */}
        <div className="hidden lg:flex items-center gap-3 font-mono text-xs text-[#8e9298]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#e87a43]" />
          <span>{siteConfig.location}</span>
          <span className="text-[rgba(255,255,255,0.2)]">/</span>
          <span className="text-[#f4f4f2] tabular-nums font-mono">{time || '12:00:00 CET'}</span>
        </div>

        {/* Right: Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1" aria-label="Main Navigation">
          {navigationLinks.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              end={item.href === '/'}
              className={({ isActive }) =>
                `group relative px-4 py-2 font-mono text-xs uppercase tracking-wider transition-colors duration-200 ${
                  isActive ? 'text-[#e87a43]' : 'text-[#8e9298] hover:text-[#f4f4f2]'
                }`
              }
            >
              {({ isActive }) => (
                <span className="relative flex items-center gap-1.5">
                  <span className="text-[10px] text-[#4b4f55] group-hover:text-[#e87a43] transition-colors">
                    {item.index}
                  </span>
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 h-[2px] w-full bg-[#e87a43]" />
                  )}
                </span>
              )}
            </NavLink>
          ))}

          <div className="ml-4">
            <MagneticButton
              to="/contact"
              variant="primary"
              className="!py-2 !px-5 !text-[11px]"
              cursorLabel="INQUIRE"
            >
              Start Project
            </MagneticButton>
          </div>
        </nav>

        {/* Mobile Hamburger Toggle */}
        <button
          type="button"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(255,255,255,0.1)] text-[#f4f4f2] md:hidden focus:outline-none"
          aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="fixed inset-x-0 top-20 bottom-0 z-50 bg-[#0c0d0e]/98 backdrop-blur-xl px-8 py-10 flex flex-col justify-between md:hidden hairline-t">
          <nav className="flex flex-col gap-6" aria-label="Mobile Navigation">
            {navigationLinks.map((item) => (
              <NavLink
                key={item.href}
                to={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-baseline justify-between py-2 border-b border-[rgba(255,255,255,0.06)] font-display text-2xl tracking-tight ${
                    isActive ? 'text-[#e87a43]' : 'text-[#f4f4f2]'
                  }`
                }
              >
                <span>{item.label}</span>
                <span className="font-mono text-xs text-[#8e9298]">{item.index}</span>
              </NavLink>
            ))}
          </nav>

          <div className="space-y-4 pt-6 hairline-t">
            <div className="flex items-center justify-between font-mono text-xs text-[#8e9298]">
              <span>Studio Zurich</span>
              <span className="text-[#f4f4f2] tabular-nums">{time}</span>
            </div>
            <Link
              to="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex w-full items-center justify-center rounded-full bg-[#f4f4f2] py-4 font-mono text-xs font-semibold uppercase tracking-wider text-[#0c0d0e]"
            >
              Start Project Inquiry
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
