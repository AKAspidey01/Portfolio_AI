import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins once globally
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);

  // Global default configurations
  gsap.defaults({
    ease: 'power3.out',
    duration: 0.8,
  });

  // Optimize ScrollTrigger refresh
  ScrollTrigger.config({
    autoRefreshEvents: 'visibilitychange,DOMContentLoaded,load,resize',
    ignoreMobileResize: true,
  });
}

export { gsap, ScrollTrigger };
export default gsap;
