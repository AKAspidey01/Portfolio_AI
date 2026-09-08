export interface ProjectMetric {
  label: string;
  value: string;
  change?: string;
}

export interface CaseStudySection {
  id: string;
  subtitle: string;
  title: string;
  body: string[];
  callout?: string;
  assets?: {
    type: 'image' | 'video' | 'comparison';
    url: string;
    caption?: string;
    aspectRatio?: '16:9' | '16:10' | '4:5' | '1:1';
  }[];
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  client: string;
  tagline: string;
  year: string;
  category: 'Fintech Systems' | 'Spatial Computing' | 'AI Intelligence' | 'Brand Systems';
  role: string[];
  timeline: string;
  deliverables: string[];
  featured: boolean;
  order: number;
  heroImage: string;
  thumbnailImage: string;
  palette: {
    accent: string;
    background: string;
  };
  summary: string;
  challenge: string;
  solution: string;
  metrics: ProjectMetric[];
  sections: CaseStudySection[];
  designSystemSpec?: {
    typefaces: string[];
    colors: { name: string; hex: string }[];
  };
}
