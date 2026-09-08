import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { gsap, ScrollTrigger } from '@/src/utils/gsap';
import { usePrefersReducedMotion } from '@/src/hooks/usePrefersReducedMotion';
import { useLenis } from '@/src/context/SmoothScrollContext';

interface PageTransitionProps {
  children: React.ReactNode;
}

export function PageTransition({ children }: PageTransitionProps) {
  const { pathname } = useLocation();
  const { scrollTo } = useLenis();
  const contentRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    // 1. Immediately reset scroll position on route change
    scrollTo(0, { immediate: true });

    if (prefersReducedMotion) {
      ScrollTrigger.refresh();
      return;
    }

    const content = contentRef.current;
    const progress = progressBarRef.current;
    if (!content || !progress) return;

    // 2. Animate subtle architectural route line across the top
    gsap.fromTo(
      progress,
      { scaleX: 0, opacity: 1 },
      {
        scaleX: 1,
        opacity: 0,
        duration: 0.4,
        ease: 'power3.inOut',
      }
    );

    // 3. Subtle editorial content entrance fade (pure opacity, NO transforms that break position: fixed)
    gsap.fromTo(
      content,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 0.35,
        ease: 'power2.out',
        // CRITICAL: Clear all inline properties so children's position: fixed / pin is never broken
        clearProps: 'opacity,transform',
        onComplete: () => {
          ScrollTrigger.refresh();
        },
      }
    );

    // Refresh triggers once fonts/DOM have finished paint
    if (document.fonts) {
      document.fonts.ready.then(() => {
        ScrollTrigger.refresh();
      });
    }

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => clearTimeout(timer);
  }, [pathname, scrollTo, prefersReducedMotion]);

  return (
    <>
      {/* 1px Architectural Route Transition Bar */}
      <div
        ref={progressBarRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[10000] h-[2px] w-full bg-[#e87a43] origin-left will-change-transform"
        style={{ transform: 'scaleX(0)', opacity: 0 }}
      />

      {/* Unconstrained Content Container (No transform or will-change that would create a containing block) */}
      <div ref={contentRef} className="w-full">
        {children}
      </div>
    </>
  );
}
