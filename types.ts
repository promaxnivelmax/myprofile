
export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  description: string;
}

export interface Education {
  id: string;
  institution: string;
  title: string;
  year: string;
}

export interface Skill {
  id: string;
  name: string;
  level: number; // 0-100
}

export interface Project {
  id: string;
  title: string;
  description: string;
  link?: string;
  github?: string;
  category: 'Automatización' | 'Web' | 'Gestión';
}

export interface SupportDoc {
  id: string;
  title: string;
  url: string;
  category: string;
  description?: string;
  // Added emisor property to fix property not found error in Admin.tsx
  emisor?: string;
}

export interface PortfolioData {
  profile: {
    name: string;
    title: string;
    about: string;
    location: string;
    email: string;
    phone: string;
    photoUrl: string;
    accentColor: string;
  };
  experience: Experience[];
  education: Education[];
  skills: Skill[];
  complementaryEducation: string[];
  projects: Project[];
  supports: SupportDoc[];
}
