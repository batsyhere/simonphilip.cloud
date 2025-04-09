export interface Section {
  id: string
  title: string
  description: string
}

export interface Project {
  title: string
  role: string
  date: string
  summary: string
  technologies: string[]
  achievements: string[]
}

export interface Experience {
  title: string
  company: string
  date: string
  description: string
  responsibilities: string[]
  technologies: string[]
}

export interface Certification {
  name: string
  issuer: string
  date: string
  description?: string
  skills?: string[]
}

export const resumeSections: Section[] = [
  {
    id: "about",
    title: "About Me",
    description: "Introduction and overview",
  },
  {
    id: "skills",
    title: "Technical Skills",
    description: "Expertise and capabilities",
  },
  {
    id: "projects",
    title: "Key Projects",
    description: "Significant achievements",
  },
  {
    id: "experience",
    title: "Work Experience",
    description: "Professional history",
  },
  {
    id: "education",
    title: "Education & Certifications",
    description: "Academic qualifications",
  },
  {
    id: "contact",
    title: "Contact Me",
    description: "Get in touch",
  },
]

export const projects: Project[] = [
  {
    title: "Multi-Cloud Infrastructure Migration",
    role: "Lead DevOps Engineer",
    date: "2022 - 2023",
    summary:
      "Designed and implemented a migration strategy from on-premises to a multi-cloud architecture using AWS and Azure.",
    technologies: ["AWS", "Azure", "Terraform", "GitHub Actions", "Prometheus", "Grafana"],
    achievements: [
      "Reduced infrastructure costs by 40%",
      "Improved deployment time by 70%",
      "Achieved 99.99% uptime",
      "Implemented comprehensive monitoring and alerting",
    ],
  },
  {
    title: "Kubernetes Platform Implementation",
    role: "Cloud Architect",
    date: "2021 - 2022",
    summary:
      "Designed and deployed a production-grade Kubernetes cluster on AWS EKS with GitOps workflow for application deployments.",
    technologies: ["Kubernetes", "AWS EKS", "ArgoCD", "Helm", "Prometheus", "Grafana"],
    achievements: [
      "Improved deployment frequency from weekly to daily releases",
      "Standardized application deployment with custom Helm charts",
      "Implemented comprehensive monitoring with Prometheus and Grafana",
      "Reduced infrastructure provisioning time from days to hours",
    ],
  },
  {
    title: "Automated Disaster Recovery Solution",
    role: "DevOps Specialist",
    date: "2020 - 2021",
    summary:
      "Designed and implemented a cross-region disaster recovery solution on AWS with automated failover mechanisms.",
    technologies: ["AWS", "CloudFormation", "Lambda", "Route53", "DynamoDB", "CloudWatch"],
    achievements: [
      "Reduced recovery time objective (RTO) from hours to minutes",
      "Implemented automated DR testing through CI/CD pipelines",
      "Created infrastructure as code templates using CloudFormation",
      "Designed automated failover mechanisms using AWS Lambda and Route53",
    ],
  },
]

export const experiences: Experience[] = [
  {
    title: "Senior Cloud DevOps Engineer",
    company: "TechCloud Solutions",
    date: "2021 - Present",
    description:
      "Leading a team of DevOps engineers in designing and implementing cloud infrastructure and CI/CD pipelines.",
    responsibilities: [
      "Architect and maintain cloud infrastructure on AWS and Azure",
      "Design and implement CI/CD pipelines for 20+ microservices",
      "Implement infrastructure as code using Terraform and Ansible",
      "Establish monitoring and alerting systems using Prometheus, Grafana, and ELK stack",
      "Reduce infrastructure costs through optimization and automation",
    ],
    technologies: [
      "AWS",
      "Azure",
      "Terraform",
      "Kubernetes",
      "Docker",
      "Jenkins",
      "GitHub Actions",
      "Prometheus",
      "Grafana",
      "ELK Stack",
    ],
  },
  {
    title: "DevOps Engineer",
    company: "InnovateSoft Inc.",
    date: "2019 - 2021",
    description:
      "Designed and implemented containerization strategy and CI/CD pipelines for automated testing and deployment.",
    responsibilities: [
      "Developed containerization strategy using Docker and Kubernetes",
      "Created CI/CD pipelines for automated testing and deployment",
      "Migrated on-premises applications to AWS cloud infrastructure",
      "Implemented infrastructure as code using Terraform",
      "Improved deployment frequency from monthly to weekly releases",
    ],
    technologies: ["Docker", "Kubernetes", "AWS", "Terraform", "Jenkins", "Python", "Bash"],
  },
  {
    title: "Systems Administrator",
    company: "DataTech Services",
    date: "2017 - 2019",
    description:
      "Managed Linux and Windows server environments and implemented backup and disaster recovery solutions.",
    responsibilities: [
      "Managed Linux and Windows server environments",
      "Implemented backup and disaster recovery solutions",
      "Automated routine tasks using Python and Bash scripts",
      "Maintained network infrastructure and security",
      "Provided technical support and troubleshooting",
    ],
    technologies: ["Linux", "Windows Server", "Python", "Bash", "VMware", "Networking", "Security"],
  },
]

export const certifications: Certification[] = [
  {
    name: "AWS Certified Solutions Architect - Professional",
    issuer: "Amazon Web Services",
    date: "2022",
    skills: ["AWS", "Cloud Architecture", "Security", "Networking", "Databases"],
  },
  {
    name: "AWS Certified DevOps Engineer - Professional",
    issuer: "Amazon Web Services",
    date: "2021",
    skills: ["AWS", "CI/CD", "Monitoring", "Security", "Automation"],
  },
  {
    name: "Microsoft Certified: Azure Administrator Associate",
    issuer: "Microsoft",
    date: "2022",
    skills: ["Azure", "Virtual Machines", "Storage", "Networking", "Security"],
  },
  {
    name: "Certified Kubernetes Administrator (CKA)",
    issuer: "Cloud Native Computing Foundation",
    date: "2021",
    skills: ["Kubernetes", "Container Orchestration", "Networking", "Security", "Troubleshooting"],
  },
  {
    name: "HashiCorp Certified: Terraform Associate",
    issuer: "HashiCorp",
    date: "2020",
    skills: ["Terraform", "Infrastructure as Code", "Cloud Provisioning", "Automation"],
  },
  {
    name: "Linux Professional Institute Certification (LPIC-1)",
    issuer: "Linux Professional Institute",
    date: "2019",
    skills: ["Linux", "System Administration", "Networking", "Security", "Scripting"],
  },
]
