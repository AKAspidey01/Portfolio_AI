import type { StudioConfig, NavLinkItem } from '@/src/types/common';

export const siteConfig: StudioConfig = {
  name: 'Kaelen Vance',
  title: 'Principal Product & Motion Designer',
  location: 'Zurich / San Francisco',
  timezone: 'CET (UTC+1)',
  email: 'studio@kaelenvance.design',
  availability: 'Available for Q3/Q4',
  socials: [
    { label: 'ReadCV', href: 'https://read.cv', handle: '@kaelenvance' },
    { label: 'Twitter / X', href: 'https://twitter.com', handle: '@kaelenvance' },
    { label: 'GitHub', href: 'https://github.com', handle: 'kaelenvance' },
    { label: 'LinkedIn', href: 'https://linkedin.com', handle: 'kaelenvance' },
  ],
  skills: [
    {
      title: 'Spatial & Interaction Architecture',
      subtitle: 'Volumetric UX, Gestural Mechanics & Spatial Computing',
      skills: [
        'Volumetric Spatial Canvases',
        'Direct-Manipulation Physics',
        'Gaze & Pinch Heuristics',
        'Spatial Soundscaping & Depth Cues',
        'Multi-Window Ergonomics',
      ],
    },
    {
      title: 'Quantitative & Financial Systems',
      subtitle: 'High-Density Information Architecture & Zero-Latency UI',
      skills: [
        'Sub-Millisecond Order Books',
        'Algorithmic Visualizer Interfaces',
        'Cognitive Saccade Optimization',
        'Dense Data Grid Orchestration',
        'Risk & Execution Workflows',
      ],
    },
    {
      title: 'Multi-Agent AI & Cognitive Interfaces',
      subtitle: 'Contextual Steering, Explainable Models & Neural Tooling',
      skills: [
        'Agentic Workflow Orchestration',
        'Latent Space Exploration Tools',
        'Token Streaming UX & Status Loops',
        'Prompt & Hyperparameter Studios',
        'Safety & Alignment Visualizers',
      ],
    },
    {
      title: 'Design Systems & Mathematical Craft',
      subtitle: 'Systemic Tokens, Easing Curves & Component Infrastructures',
      skills: [
        'Multi-Platform Design Tokens',
        'Spring Physics & Kinetic Curves',
        'Typographic Scale Equations',
        'Accessible Contrast Governance (WCAG AAA)',
        'Component API Design & Docs',
      ],
    },
  ],
  tools: [
    {
      category: 'Design & Systems Architecture',
      tools: ['Figma', 'Tokens Studio', 'Linear', 'Principle', 'ProtoPie'],
    },
    {
      category: 'Motion & Physics Engineering',
      tools: ['GSAP & ScrollTrigger', 'Lenis Smooth Scroll', 'Framer Motion', 'Lottie', 'Custom Physics Springs'],
    },
    {
      category: 'Creative Technology & Front-End',
      tools: ['React & Next.js', 'TypeScript', 'Tailwind CSS', 'WebGL & Three.js', 'Vite & Node.js'],
    },
    {
      category: 'Spatial & 3D Environments',
      tools: ['visionOS SDK', 'RealityKit', 'Blender', 'Spline 3D', 'Unity Spatial Tools'],
    },
  ],
  process: [
    {
      step: '01',
      title: 'Mathematical Framing & Cognitive Mapping',
      timeline: 'Week 01—02',
      description:
        'Deconstructing the algorithmic and operational problem space. Establishing cognitive friction baselines, latency thresholds, and information density targets before touching visual form.',
      deliverables: ['Information Topology', 'Friction Audit', 'Spatial Ergonomics Spec'],
    },
    {
      step: '02',
      title: 'Structural Architecture & Kinetic Prototyping',
      timeline: 'Week 03—05',
      description:
        'Rapid physical and volumetric prototyping. Translating theoretical models into interactive prototypes with real spring mechanics, gesture curves, and contextual layouts.',
      deliverables: ['Interactive Code Sandbox', 'Micro-Interaction Matrix', 'Key Canvas Screens'],
    },
    {
      step: '03',
      title: 'Systematization & Design Token Unification',
      timeline: 'Week 06—08',
      description:
        'Transforming approved flows into mathematically unified design systems. Codifying color luminance, typography scales, accessibility contrasts, and responsive rules into consumable tokens.',
      deliverables: ['Design Token Engine', 'Production UI Library', 'Multi-State Guidelines'],
    },
    {
      step: '04',
      title: 'Production Engineering & Motion Tuning',
      timeline: 'Week 09—12',
      description:
        'Pairing directly with engineering to eliminate design debt. Tuning easing curves down to the frame (60/120fps), verifying accessibility flags, and deploying zero-regression software.',
      deliverables: ['Production PRs & Code Sync', 'Motion Audit Suite', 'Executive Design QA'],
    },
  ],
};

export const navigationLinks: NavLinkItem[] = [
  { index: '01', label: 'Index', href: '/' },
  { index: '02', label: 'Selected Work', href: '/work' },
  { index: '03', label: 'Philosophy & Bio', href: '/about' },
  { index: '04', label: 'Inquire', href: '/contact' },
];
