export interface NavLinkItem {
  label: string;
  href: string;
  index: string;
}

export interface SocialLinkItem {
  label: string;
  href: string;
  handle: string;
}

export interface SkillCategory {
  title: string;
  subtitle: string;
  skills: string[];
}

export interface ToolGroup {
  category: string;
  tools: string[];
}

export interface ProcessStep {
  step: string;
  title: string;
  timeline: string;
  description: string;
  deliverables: string[];
}

export interface StudioConfig {
  name: string;
  title: string;
  location: string;
  timezone: string;
  email: string;
  availability: 'Available for Q3/Q4' | 'Booked' | 'Select Inquiries Only';
  socials: SocialLinkItem[];
  skills: SkillCategory[];
  tools: ToolGroup[];
  process: ProcessStep[];
}
