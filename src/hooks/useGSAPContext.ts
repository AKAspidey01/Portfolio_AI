import { useLayoutEffect, useEffect, type RefObject } from 'react';
import { gsap } from '@/src/utils/gsap';

// Use isomorphic layout effect for SSR safety
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

/**
 * Encapsulates GSAP context creation and automatic cleanup.
 * Guarantees all tweens, timelines, and ScrollTriggers within the callback
 * are safely reverted when the component unmounts or dependencies change.
 */
export function useGSAPContext(
  animationCallback: (context: gsap.Context) => void | (() => void),
  scope?: RefObject<HTMLElement | null | HTMLDivElement>,
  dependencies: unknown[] = []
): void {
  useIsomorphicLayoutEffect(() => {
    let userCleanup: void | (() => void);
    const ctx = gsap.context((self) => {
      userCleanup = animationCallback(self);
    }, scope?.current || undefined);

    return () => {
      if (typeof userCleanup === 'function') {
        try {
          userCleanup();
        } catch {
          // Prevent cleanup errors from crashing React unmount
        }
      }
      ctx.revert();
    };
  }, dependencies);
}
