"use client"

export function getProfileContent(profileType: string) {
  if (profileType === "recruiter") {
    return {
      profileImage: "/placeholder.svg?height=32&width=32",
      hero: {
        title: "Cloud Engineer & DevOps Specialist",
        description:
          "Experienced cloud engineer with expertise in AWS, Azure, and GCP. Specializing in building scalable, secure, and cost-effective cloud infrastructure.",
        image: "/placeholder.svg?height=700&width=1200",
        details: [
          "5+ years of experience in cloud engineering and DevOps",
          "Expertise in designing and implementing cloud solutions",
          "Strong background in automation and infrastructure as code",
          "Proven track record of optimizing cloud costs and improving performance",
        ],
        skills: ["AWS", "Azure", "GCP", "Kubernetes", "Terraform", "CI/CD", "Docker"],
      },
      rows: [
        {
          title: "Professional Experience",
          items: [
            {
              title: "Senior Cloud Engineer",
              period: "2021 - Present",
              company: "TechCorp Solutions",
              description: "Leading cloud infrastructure design and implementation for enterprise clients.",
              image: "/placeholder.svg?height=113&width=200",
              details: [
                "Led the migration of legacy infrastructure to AWS, resulting in 40% cost reduction",
                "Implemented infrastructure as code using Terraform across multiple environments",
                "Designed and deployed Kubernetes clusters for microservices architecture",
                "Established CI/CD pipelines using GitHub Actions and ArgoCD",
              ],
              achievements: [
                "Reduced cloud infrastructure costs by 40% through optimization",
                "Improved deployment frequency from weekly to daily releases",
                "Implemented auto-scaling solutions that handled 300% traffic increase during peak periods",
              ],
              skills: ["AWS", "Kubernetes", "Terraform", "CI/CD", "Docker"],
            },
            {
              title: "Cloud DevOps Engineer",
              period: "2019 - 2021",
              company: "Innovate Systems Inc.",
              description: "Managed multi-cloud infrastructure and implemented DevOps practices.",
              image: "/placeholder.svg?height=113&width=200",
              details: [
                "Managed multi-cloud infrastructure across AWS and Azure",
                "Automated deployment processes, reducing deployment time by 60%",
                "Implemented monitoring and alerting using Prometheus and Grafana",
                "Optimized cloud costs, achieving 25% reduction in monthly spend",
              ],
              achievements: [
                "Reduced deployment time by 60% through automation",
                "Implemented monitoring solutions that improved incident response time by 45%",
                "Achieved 99.99% uptime for critical services",
              ],
              skills: ["AWS", "Azure", "Docker", "Ansible", "Prometheus"],
            },
            {
              title: "Systems Administrator",
              period: "2017 - 2019",
              company: "Global Tech Solutions",
              description: "Managed on-premises infrastructure and initiated cloud migration.",
              image: "/placeholder.svg?height=113&width=200",
              details: [
                "Managed on-premises infrastructure and initiated cloud migration",
                "Implemented backup and disaster recovery solutions",
                "Automated routine tasks using Python and Bash scripts",
                "Provided technical support and troubleshooting for internal teams",
              ],
              achievements: [
                "Successfully migrated 70% of on-premises workloads to the cloud",
                "Reduced system downtime by 60% through improved monitoring and maintenance",
                "Implemented automated backup solutions that reduced recovery time by 80%",
              ],
              skills: ["Linux", "Windows Server", "Python", "Bash", "VMware"],
            },
          ],
        },
        {
          title: "Key Projects",
          items: [
            {
              title: "Multi-Cloud Kubernetes Platform",
              description:
                "A Kubernetes platform that spans multiple cloud providers for high availability and disaster recovery.",
              image: "/placeholder.svg?height=113&width=200",
              details: [
                "Designed and implemented a Kubernetes platform across AWS and GCP",
                "Used Terraform for infrastructure provisioning and management",
                "Implemented GitOps workflow with ArgoCD for application deployment",
                "Set up multi-cluster monitoring and alerting",
              ],
              achievements: [
                "Achieved 99.99% uptime across all environments",
                "Reduced deployment time by 70% through automation",
                "Implemented cost optimization strategies saving $15,000 monthly",
              ],
              skills: ["Kubernetes", "Terraform", "AWS", "GCP", "ArgoCD", "Prometheus"],
            },
            {
              title: "Serverless Data Pipeline",
              description: "A fully serverless ETL pipeline for processing and analyzing large datasets in real-time.",
              image: "/placeholder.svg?height=113&width=200",
              details: [
                "Designed and implemented a serverless data processing pipeline",
                "Used AWS Lambda, S3, and DynamoDB for data processing and storage",
                "Implemented real-time analytics with Amazon Kinesis",
                "Set up monitoring and alerting for the pipeline",
              ],
              achievements: [
                "Processed over 10TB of data daily with minimal operational overhead",
                "Reduced data processing costs by 60% compared to previous solution",
                "Improved data availability from T+1 day to near real-time",
              ],
              skills: ["AWS Lambda", "S3", "DynamoDB", "Kinesis", "Python"],
            },
            {
              title: "Cloud Cost Optimization Tool",
              description:
                "An automated tool that analyzes cloud resources and provides recommendations for cost optimization.",
              image: "/placeholder.svg?height=113&width=200",
              details: [
                "Developed a tool to analyze cloud resource usage and identify optimization opportunities",
                "Implemented automated recommendations for rightsizing and reserved instances",
                "Created dashboards for visualizing cost trends and savings",
                "Integrated with multiple cloud providers",
              ],
              achievements: [
                "Identified over $200,000 in annual cloud cost savings",
                "Automated the implementation of 80% of cost-saving recommendations",
                "Reduced cloud waste by 35% across all environments",
              ],
              skills: ["Python", "AWS", "React", "Node.js", "Data Analysis"],
            },
          ],
        },
        {
          title: "Skills & Certifications",
          items: [
            {
              title: "Cloud Platforms",
              description: "Expertise in major cloud platforms and services.",
              image: "/placeholder.svg?height=113&width=200",
              details: [
                "Amazon Web Services (AWS)",
                "Microsoft Azure",
                "Google Cloud Platform (GCP)",
                "DigitalOcean",
                "Heroku",
              ],
              skills: ["AWS", "Azure", "GCP", "DigitalOcean", "Heroku"],
            },
            {
              title: "DevOps Tools",
              description: "Experience with a wide range of DevOps tools and practices.",
              image: "/placeholder.svg?height=113&width=200",
              details: [
                "Containerization: Docker, Kubernetes",
                "Infrastructure as Code: Terraform, CloudFormation, Pulumi",
                "CI/CD: Jenkins, GitHub Actions, CircleCI, ArgoCD",
                "Monitoring: Prometheus, Grafana, ELK Stack",
              ],
              skills: ["Docker", "Kubernetes", "Terraform", "Jenkins", "GitHub Actions", "Prometheus"],
            },
            {
              title: "Certifications",
              description: "Professional certifications in cloud and DevOps technologies.",
              image: "/placeholder.svg?height=113&width=200",
              details: [
                "AWS Certified Solutions Architect - Professional",
                "AWS Certified DevOps Engineer - Professional",
                "Microsoft Certified: Azure Solutions Architect Expert",
                "Google Cloud Professional Cloud Architect",
                "Certified Kubernetes Administrator (CKA)",
              ],
            },
          ],
        },
        {
          title: "Education & Training",
          items: [
            {
              title: "Master of Science in Computer Science",
              period: "2015 - 2017",
              description: "University of Technology, Specialization in Distributed Systems",
              image: "/placeholder.svg?height=113&width=200",
              details: [
                "Focus on distributed systems and cloud computing",
                "Research on container orchestration optimization",
                "GPA: 3.9/4.0",
              ],
            },
            {
              title: "Bachelor of Science in Computer Engineering",
              period: "2011 - 2015",
              description: "State University, Cum Laude",
              image: "/placeholder.svg?height=113&width=200",
              details: [
                "Focus on computer architecture and networking",
                "Senior project: Automated deployment system for web applications",
                "GPA: 3.7/4.0",
              ],
            },
          ],
        },
      ],
    }
  } else {
    // Developer profile
    return {
      profileImage: "/placeholder.svg?height=32&width=32",
      hero: {
        title: "Cloud Engineer & DevOps Specialist",
        description: "Building scalable infrastructure and automating everything. Let's talk code, containers, and cloud architecture.",
        image: "/placeholder.svg?height=700&width=1200",
        details: [
          "5+ years of experience in cloud engineering and DevOps",
          "Expertise in containerization, orchestration, and infrastructure as code",
          "Full-stack development experience with modern frameworks and languages",
          "Open source contributor and automation enthusiast"
        ],
        skills: ["Kubernetes", "Docker", "Terraform", "AWS", "Python", "Go", "JavaScript"]
      },
      rows: [
        {
          title: "Technical Skills",
          items: [
            {
              title: "Infrastructure as Code",
              description: "Building infrastructure through code for reproducibility and version control.",
              image: "/placeholder.svg?height=113&width=200",
              details: [
                "Terraform for multi-cloud infrastructure provisioning",
                "AWS CloudFormation for AWS-specific resources",
                "Pulumi for infrastructure as actual code",
                "Ansible for configuration management"
              ],
              skills: ["Terraform", "CloudFormation", "Pulumi", "Ansible", "YAML", "HCL"],
              codeExample: `
# Example Terraform code for AWS EKS cluster
resource "aws_eks_cluster" "main" {
  name     = "eks-cluster"
  role_arn = aws_iam_role.eks_cluster.arn
  version  = "1.24"

  vpc_config {
    subnet_ids = var.subnet_ids
  }
}
              `
            },
            {
              title: "Container Orchestration",
              description: "Managing containerized applications at scale with Kubernetes.",
              image: "/placeholder.svg?height=113&width=200",
              details: [
                "Kubernetes cluster setup and management",
                "Helm for package management",
                "Custom operators and controllers",
                "Service mesh implementation with Istio"
              ],
              skills: ["Kubernetes", "Helm", "Docker", "Istio", "ArgoCD", "Kustomize"],
              codeExample: `
# Example Kubernetes Deployment
apiVersion: apps/v1
kind: Deployment
metadata:
  name: microservice
spec:
  replicas: 3
  selector:
    matchLabels:
      app: microservice
  template:
    metadata:
      labels:
        app: microservice
    spec:
      containers:
      - name: app
        image: myapp:1.0.0
        ports:
        - containerPort: 8080
              `
            },
            {
              title: "CI/CD Pipelines",
              description: "Automating build, test, and deployment processes.",
              image: "/placeholder.svg?height=113&width=200",
              details: [
                "GitHub Actions for CI/CD workflows",
                "Jenkins pipeline configuration",
                "ArgoCD for GitOps deployments",
                "CircleCI and Travis CI integration"
              ],
              skills: ["GitHub Actions", "Jenkins", "ArgoCD", "CircleCI", "GitOps"],
              codeExample: `
# Example GitHub Actions workflow
name: CI/CD Pipeline

on:
  push:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Build and test
        run: |\
          docker build -t myapp:${{ github.sha }} \.
          docker run myapp:${{ github.sha }} npm test
              `
            }
          ]
        },
        {
          title: "Cloud Architecture",
          items: [
            {
              title: "Multi-Cloud Kubernetes Platform",
              description: "A Kubernetes platform that spans multiple cloud providers for high availability and disaster recovery.",
              image: "/placeholder.svg?height=113&width=200",
              details: [
                "Designed and implemented a Kubernetes platform across AWS and GCP",
                "Used Terraform for infrastructure provisioning and management",
                "Implemented GitOps workflow with ArgoCD for application deployment",
                "Set up multi-cluster monitoring and alerting"
              ],
              skills: ["Kubernetes", "Terraform", "AWS", "GCP", "ArgoCD", "Prometheus"],
              githubLink: "https://github.com/username/multi-cloud-k8s",
              demoLink: "https://demo.example.com"
            },
            {
              title: "Serverless Data Pipeline",
              description: "A fully serverless ETL pipeline for processing and analyzing large datasets in real-time.",
              image: "/placeholder.svg?height=113&width=200",
              details: [
                "Designed and implemented a serverless data processing pipeline",
                "Used AWS Lambda, S3, and DynamoDB for data processing and storage",
                "Implemented real-time analytics with Amazon Kinesis",
                "Set up monitoring and alerting for the pipeline"
              ],
              skills: ["AWS Lambda", "S3", "DynamoDB", "Kinesis", "Python"],
              githubLink: "https://github.com/username/serverless-data-pipeline",
              codeExample: `
# Example AWS Lambda function for data processing
import json
import boto3

def lambda_handler(event, context):
    # Process records from Kinesis
    for record in event['Records']:
        payload = json.loads(record['kinesis']['data'])
        process_data(payload)
        
    return {
        'statusCode': 200,
        'body': json.dumps('Processing complete')
    }
              `
            },
            {
              title: "Microservices Architecture",
              description: "Designing and implementing scalable microservices architectures.",
              image: "/placeholder.svg?height=113&width=200",
              details: [
                "Service decomposition and domain-driven design",
                "API gateway implementation",
                "Service discovery and load balancing",
                "Distributed tracing and monitoring"
              ],
              skills: ["Microservices", "API Gateway", "gRPC", "REST", "Event-Driven Architecture"]
            }
          ]
        },
        {
          title: "Programming Languages",
          items: [
            {
              title: "Go",
              description: "Building efficient and concurrent systems with Go.",
              image: "/placeholder.svg?height=113&width=200",
              details: [
                "Microservices and API development",
                "CLI tools and utilities",
                "Kubernetes operators and controllers",
                "Performance-critical components"
              ],
              skills: ["Go", "Concurrency", "Microservices", "CLI"],
              codeExample: `
// Example Go HTTP server
package main

import (
    "fmt"
    "log"
    "net/http"
)

func handler(w http.ResponseWriter, r *http.Request) {
    fmt.Fprintf(w, "Hello, %s!", r.URL.Path[1:])
}

func main() {
    http.HandleFunc("/", handler)
    log.Fatal(http.ListenAndServe(":8080", nil))
}
              `
            },
            {
              title: "Python",
              description: "Automation, data processing, and backend development with Python.",
              image: "/placeholder.svg?height=113&width=200",
              details: [
                "Automation scripts and tools",
                "Data processing and analysis",
                "API development with Flask and FastAPI",
                "AWS Lambda functions"
              ],
              skills: ["Python", "Flask", "FastAPI", "Pandas", "Boto3"],
              codeExample: `
# Example FastAPI application
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class Item(BaseModel):
    name: str
    description: str = None
    price: float

@app.post("/items/")
async def create_item(item: Item):
    return {"item_id": 1, **item.dict()}
              `
            },
            {
              title: "JavaScript/TypeScript",
              description: "Frontend and Node.js development with JavaScript and TypeScript.",
              image: "/placeholder.svg?height=113&width=200",
              details: [
                "React and Next.js for frontend development",
                "Node.js for backend services",
                "TypeScript for type-safe applications",
                "Express.js for API development"
              ],
              skills: ["JavaScript", "TypeScript", "React", "Node.js", "Express"],
              codeExample: `
// Example TypeScript React component
import React, { useState, useEffect } from 'react';

interface Props {
  initialCount: number;
}

const Counter: React.FC<Props> = ({ initialCount }) => {
  const [count, setCount] = useState(initialCount);
  
  useEffect(() => {
    document.title = \`Count: \${count}\`;
  }, [count]);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
};

export default Counter;
              `
            }
          ]
        },
        {
          title: "Open Source Contributions",
          items: [
            {
              title: "Kubernetes Operator Framework",
              description: "Contributions to the Kubernetes Operator SDK and related projects.",
              image: "/placeholder.svg?height=113&width=200",
              details: [
                "Implemented new features for the Operator SDK",
                "Fixed bugs and improved documentation",
                "Created example operators for the community",
                "Participated in code reviews and design discussions"
              ],
              skills: ["Kubernetes", "Go", "Operators"],
              githubLink: "https://github.com/operator-framework/operator-sdk"
            },
            {
              title: "Terraform Provider Development",
              description: "Developing and maintaining custom Terraform providers.",
              image: "/placeholder.svg?height=113&width=200",
              details: [
                "Created custom Terraform providers for internal tools",
                "Contributed to existing providers",
                "Implemented new resources and data sources",
                "Improved test coverage and documentation"
              ],
              skills: ["Terraform", "Go", "Infrastructure as Code"],
              githubLink: "https://github.com/username/terraform-provider-example"
            }
          ]
        },
        {
          title: "Learning & Development",
          items: [
            {
              title: "Current Learning Focus",
              description: "Technologies and concepts I'm currently exploring.",
              image: "/placeholder.svg?height=113&width=200",
              details: [
                "WebAssembly and WASI for cloud-native applications",
                "eBPF for observability and security",
                "Rust for systems programming",
                "Machine learning operations (MLOps)"
              ],
              skills: ["WebAssembly", "eBPF", "Rust", "MLOps"]
            },
            {
              title: "Technical Blog",
              description: "Sharing knowledge and experiences through technical writing.",
              image: "/placeholder.svg?height=113&width=200",
              details: [
                "Regular articles on cloud architecture and DevOps",
                "Tutorials on Kubernetes, Terraform, and other tools",
                "Deep dives into specific technologies",
                "Lessons learned from real-world projects"
              ],
              externalLink: "https://blog.example.com"
            }
          ]
        }
      ]
    };
  }
}
