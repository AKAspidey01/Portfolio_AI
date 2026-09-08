import { useRef } from 'react';
import { useGSAPContext } from '@/src/hooks/useGSAPContext';
import { gsap } from '@/src/utils/gsap';
import { usePrefersReducedMotion } from '@/src/hooks/usePrefersReducedMotion';

interface TextRevealProps {
  id?: string;
  children: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'div';
  className?: string;
  delay?: number;
  duration?: number;
  stagger?: number;
  scrub?: boolean;
}

export function TextReveal({
  id,
  children,
  as: Component = 'div',
  className = '',
  delay = 0,
  duration = 0.9,
  stagger = 0.05,
}: TextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  // Split text into words to maintain natural line wrapping without layout shift
  const words = children.split(' ');

  useGSAPContext(
    () => {
      if (prefersReducedMotion || !containerRef.current) return;

      const wordSpans = containerRef.current.querySelectorAll('.word-inner');

      gsap.fromTo(
        wordSpans,
        {
          yPercent: 120,
          opacity: 0,
        },
        {
          yPercent: 0,
          opacity: 1,
          duration,
          delay,
          stagger,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
        }
      );
    },
    containerRef,
    [children, prefersReducedMotion, delay, duration, stagger]
  );

  return (
    <Component id={id} ref={containerRef as never} className={`inline-block overflow-hidden ${className}`}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="inline-block overflow-hidden align-top">
          <span className="word-inner inline-block will-change-transform">
            {word}&nbsp;
          </span>
        </span>
      ))}
    </Component>
  );
}
