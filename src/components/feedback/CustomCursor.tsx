import { useEffect, useRef, useState } from 'react';
import { useCursor } from '@/src/context/CursorContext';
import { gsap } from '@/src/utils/gsap';
import { usePrefersReducedMotion } from '@/src/hooks/usePrefersReducedMotion';

export function CustomCursor() {
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const { cursorState } = useCursor();
  const prefersReducedMotion = usePrefersReducedMotion();

  // Synchronously determine if desktop fine pointer is active on initial render
  const [isFinePointer] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  });

  const isEnabled = isFinePointer && !prefersReducedMotion;

  useEffect(() => {
    if (!isEnabled) {
      document.body.classList.remove('has-custom-cursor');
      return;
    }

    document.body.classList.add('has-custom-cursor');

    const dot = cursorDotRef.current;
    const ring = cursorRingRef.current;
    if (!dot || !ring) return;

    // Set initial centering offsets via GSAP transforms
    gsap.set(dot, { xPercent: -50, yPercent: -50, opacity: 0 });
    gsap.set(ring, { xPercent: -50, yPercent: -50, opacity: 0 });

    // Hardware-accelerated quick setters
    const setDotX = gsap.quickTo(dot, 'x', { duration: 0.08, ease: 'power3' });
    const setDotY = gsap.quickTo(dot, 'y', { duration: 0.08, ease: 'power3' });
    const setRingX = gsap.quickTo(ring, 'x', { duration: 0.24, ease: 'power3.out' });
    const setRingY = gsap.quickTo(ring, 'y', { duration: 0.24, ease: 'power3.out' });

    let isVisible = false;

    const onMouseMove = (e: MouseEvent) => {
      if (!isVisible) {
        gsap.to([dot, ring], { opacity: 1, duration: 0.25, overwrite: 'auto' });
        isVisible = true;
      }
      setDotX(e.clientX);
      setDotY(e.clientY);
      setRingX(e.clientX);
      setRingY(e.clientY);
    };

    const onMouseLeave = () => {
      gsap.to([dot, ring], { opacity: 0, duration: 0.25, overwrite: 'auto' });
      isVisible = false;
    };

    const onMouseEnter = () => {
      gsap.to([dot, ring], { opacity: 1, duration: 0.25, overwrite: 'auto' });
      isVisible = true;
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      document.body.classList.remove('has-custom-cursor');
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, [isEnabled]);

  // Contextual cursor morphing based on cursorState
  useEffect(() => {
    if (!isEnabled) return;
    const ring = cursorRingRef.current;
    const dot = cursorDotRef.current;
    if (!ring || !dot) return;

    switch (cursorState.variant) {
      case 'view':
        gsap.to(ring, {
          width: 80,
          height: 80,
          backgroundColor: '#e87a43',
          borderColor: 'transparent',
          duration: 0.3,
          ease: 'power2.out',
          overwrite: 'auto',
        });
        gsap.to(dot, { scale: 0, opacity: 0, duration: 0.2, overwrite: 'auto' });
        break;

      case 'pointer':
        gsap.to(ring, {
          width: 50,
          height: 50,
          backgroundColor: 'rgba(232, 122, 67, 0.12)',
          borderColor: 'rgba(232, 122, 67, 0.6)',
          duration: 0.3,
          ease: 'power2.out',
          overwrite: 'auto',
        });
        gsap.to(dot, { scale: 1.4, opacity: 1, duration: 0.2, overwrite: 'auto' });
        break;

      case 'drag':
        gsap.to(ring, {
          width: 90,
          height: 38,
          borderRadius: 20,
          backgroundColor: '#1c1e22',
          borderColor: 'rgba(255, 255, 255, 0.3)',
          duration: 0.3,
          ease: 'power2.out',
          overwrite: 'auto',
        });
        gsap.to(dot, { scale: 0, opacity: 0, duration: 0.2, overwrite: 'auto' });
        break;

      default:
        gsap.to(ring, {
          width: 32,
          height: 32,
          borderRadius: '50%',
          backgroundColor: 'transparent',
          borderColor: 'rgba(244, 244, 242, 0.35)',
          duration: 0.3,
          ease: 'power2.out',
          overwrite: 'auto',
        });
        gsap.to(dot, { scale: 1, opacity: 1, duration: 0.2, overwrite: 'auto' });
        break;
    }
  }, [cursorState.variant, isEnabled]);

  if (!isEnabled) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden select-none"
    >
      {/* Precision Core Dot */}
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 h-1.5 w-1.5 rounded-full bg-[#f4f4f2] shadow-[0_0_8px_rgba(255,255,255,0.8)] will-change-transform"
      />

      {/* Kinetic Halo Ring / Label Carrier */}
      <div
        ref={cursorRingRef}
        className="fixed top-0 left-0 flex h-8 w-8 items-center justify-center rounded-full border border-[rgba(244,244,242,0.35)] backdrop-blur-[0.5px] will-change-transform"
      >
        {cursorState.label && (
          <span className="font-mono text-[10px] font-bold tracking-widest text-[#0c0d0e] uppercase select-none">
            {cursorState.label}
          </span>
        )}
      </div>
    </div>
  );
}
