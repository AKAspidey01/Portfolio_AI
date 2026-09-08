import type { Project } from '@/src/types/project';

export const projects: Project[] = [
  {
    id: 'chronos-os',
    slug: 'chronos-spatial-os',
    title: 'Chronos Spatial OS',
    client: 'Chronos Labs',
    tagline: 'Spatial operating canvas for multi-agent reasoning and temporal cognition',
    year: '2025',
    category: 'Spatial Computing',
    role: ['Principal Product Designer', 'Design Systems Architect', 'Creative Technologist'],
    timeline: '8 Months',
    deliverables: ['Spatial Interaction Model', 'Design System Spec', 'Volumetric Shader Prototypes'],
    featured: true,
    order: 1,
    heroImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2264&auto=format&fit=crop',
    thumbnailImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop',
    palette: {
      accent: '#e87a43',
      background: '#0c0d0e',
    },
    summary: 'A spatial operating environment redefining how knowledge workers perceive complex parallel timeline streams without cognitive overload.',
    challenge: 'Legacy windowing metaphors fail in augmented 3D environments. Users experience vertigo and spatial disorientation when orchestrating more than 4 concurrent data planes.',
    solution: 'Engineered a cylindrical depth-mapped timeline interface using variable gaze-dwell physics and contextual peripheral dimming that reduces eye travel by 42%.',
    metrics: [
      { label: 'Task Switch Latency', value: '180ms', change: '-54%' },
      { label: 'Continuous Dwell Focus', value: '4.8 hrs', change: '+32%' },
      { label: 'System Adoption Rate', value: '94.2%', change: 'Across 12 enterprise pilots' },
    ],
    sections: [
      {
        id: 'the-brief',
        subtitle: 'Foundations',
        title: 'Rethinking the 2D window hierarchy',
        body: [
          'Spatial computing demands an entirely new grammar of affordances. Standard desktop OS layers break down when applied to an unbounded spherical canvas.',
          'Our team investigated natural gaze saccades and hand kinematics to develop a responsive physical grid that conforms dynamically to the user’s ocular focal plane.',
        ],
      },
      {
        id: 'interaction-model',
        subtitle: 'Architecture',
        title: 'The Cylindrical Horizon',
        body: [
          'Rather than floating disjointed floating rectangles in midair, Chronos pins contextual streams along an invisible 140-degree parabolic arc.',
          'Active cards automatically expand toward the viewer using spring-damped parallax, while secondary intelligence feeds rest in peripheral high-legibility typographic ribbons.',
        ],
      },
    ],
    designSystemSpec: {
      typefaces: ['Syne Display', 'JetBrains Mono Spatial'],
      colors: [
        { name: 'Carbon Void', hex: '#0C0D0E' },
        { name: 'Kinetic Amber', hex: '#E87A43' },
        { name: 'Spectral Zinc', hex: '#8E9298' },
      ],
    },
  },
  {
    id: 'axiom-terminal',
    slug: 'axiom-algorithmic-terminal',
    title: 'Axiom Terminal',
    client: 'Axiom Global Capital',
    tagline: 'High-frequency algorithmic trading console for quantitative asset managers',
    year: '2024',
    category: 'Fintech Systems',
    role: ['Lead Design Architect', 'Information Design Specialist'],
    timeline: '6 Months',
    deliverables: ['Design Tokens', 'Zero-Latency Data Visualizations', 'Execution Ergonomics'],
    featured: true,
    order: 2,
    heroImage: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=2264&auto=format&fit=crop',
    thumbnailImage: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=1200&auto=format&fit=crop',
    palette: {
      accent: '#4383e8',
      background: '#0c0d0e',
    },
    summary: 'A surgical, high-density financial terminal engineered for institutional quants executing split-second liquidity maneuvers across decentralized order books.',
    challenge: 'Existing terminal solutions suffer from severe cognitive noise, illegible color coding, and visual latency that costs millions of dollars during volatility spikes.',
    solution: 'Architected a monospaced, high-contrast monochrome design system with contextual micro-hues reserved strictly for critical liquidity anomalies.',
    metrics: [
      { label: 'Order Execution Errors', value: '0.003%', change: '-88%' },
      { label: 'Screen Information Density', value: '4.2x', change: 'Zero perceptual clutter' },
      { label: 'Daily Trading Volume Handled', value: '$1.4B', change: 'First quarter' },
    ],
    sections: [
      {
        id: 'ergonomic-density',
        subtitle: 'Precision',
        title: 'Information design at sub-millisecond speeds',
        body: [
          'Every pixel is budgeted. By introducing an adaptive 4px modular baseline grid and strict optical typography constraints, traders can scan 48 distinct currency pairs without neck repositioning.',
        ],
      },
    ],
  },
  {
    id: 'cerebra-ai',
    slug: 'cerebra-synthetic-reasoning',
    title: 'Cerebra Intelligence',
    client: 'Cerebra Deep Neural AI',
    tagline: 'Explainable AI neural network inspector and latent space visualization suite',
    year: '2024',
    category: 'AI Intelligence',
    role: ['Principal Interaction Designer', 'Front-End Motion Strategist'],
    timeline: '5 Months',
    deliverables: ['Vector Field Visualizer', 'Model Steering UI', 'Interactive Whitepaper'],
    featured: true,
    order: 3,
    heroImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2264&auto=format&fit=crop',
    thumbnailImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1200&auto=format&fit=crop',
    palette: {
      accent: '#2dd4bf',
      background: '#0c0d0e',
    },
    summary: 'An interactive analytical instrument allowing machine learning research scientists to audit multi-modal weights and trace hallucination vectors in real-time.',
    challenge: 'Transformer models operate as black boxes. Engineers lacked intuitive visual metaphors to diagnose alignment drifts in 70B+ parameter architectures.',
    solution: 'Designed an interactive multi-dimensional topological manifold viewer paired with natural-language parameter scrubbing.',
    metrics: [
      { label: 'Debugging Cycle Time', value: '1.2 hrs', change: '-65%' },
      { label: 'Safety Audit Velocity', value: '3.8x', change: 'Faster verification' },
      { label: 'Research User NPS', value: '+78', change: 'Across top AI labs' },
    ],
    sections: [
      {
        id: 'latent-mapping',
        subtitle: 'Exploration',
        title: 'Demystifying the neural black box',
        body: [
          'Visualizing attention heads requires translating 4,096-dimensional vectors into intuitive 2D and 3D projections without mathematical distortion.',
        ],
      },
    ],
  },
  {
    id: 'strata-brand',
    slug: 'strata-kinetic-identity',
    title: 'Strata Architectural Brand',
    client: 'Strata Studio Tokyo',
    tagline: 'Kinetic brand identity and editorial digital archive for avant-garde brutalist architecture',
    year: '2023',
    category: 'Brand Systems',
    role: ['Creative Director', 'Motion Director', 'Design Engineer'],
    timeline: '4 Months',
    deliverables: ['Kinetic Monolith Identity', 'Digital Monograph', 'Sound Design Direction'],
    featured: false,
    order: 4,
    heroImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2264&auto=format&fit=crop',
    thumbnailImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop',
    palette: {
      accent: '#e87a43',
      background: '#0c0d0e',
    },
    summary: 'A physical-digital monograph celebrating monolithic concrete structures through kinetic typography, photogrammetry, and silence.',
    challenge: 'Architectural portfolios often feel static and lifeless, failing to capture the physical acoustic weight and atmospheric presence of built spaces.',
    solution: 'Created an unhurried, editorial web exhibition driven by ambient soundscapes, scroll velocity damping, and high-resolution material inspections.',
    metrics: [
      { label: 'Awwwards Site of the Day', value: 'Winner', change: 'Score: 8.42' },
      { label: 'Average Session Duration', value: '5m 14s', change: '+140% vs industry avg' },
    ],
    sections: [
      {
        id: 'materials',
        subtitle: 'Tactility',
        title: 'Concrete as a digital medium',
        body: [
          'Through micro-shadows, tactile typography, and deliberate rhythmic pauses, the digital monograph gives the impression of tangible heavy paper and weathered raw stone.',
        ],
      },
    ],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
