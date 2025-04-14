export interface ResumeData {
    name: string;
    title: string;
    summary: string;
    skills: string[];
    certifications: string[];
    experience: {
      role: string;
      company: string;
      duration: string;
      responsibilities: string[];
    }[];
    projects: {
      name: string;
      description: string;
    }[];
    education: {
      degree: string;
      institution: string;
      year: string;
    }[];
  }
  