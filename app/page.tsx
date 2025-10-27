"use client";
import Image from "next/image";
import { Download } from "lucide-react";
import SectionHeading from "./components/section-heading";
import SkillCard from "./components/skill-card";
import ExperienceCard from "./components/experience-card";
import ProjectCard from "./components/project-card";
import ParallaxSection from "./components/parallax-section";
import ScrambleText from "./components/scarmble-text";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-zinc-900">
      {/* Hero Section */}
      <section
        id="hero"
        className="relative flex min-h-screen items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-50 to-white"></div>
        </div>

        <div className="container relative z-10 mx-auto px-4 py-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="animate-fade-in text-5xl font-light tracking-tight text-zinc-900 sm:text-6xl md:text-7xl">
              <span className="block">
                <ScrambleText text="Simon Philip" />
              </span>
            </h1>
            <p className="mt-4 animate-fade-in-delay-1 text-xl font-light tracking-wide text-zinc-500 sm:text-2xl bg-highlight">
              <ScrambleText text="Cloud and Operations Engineer" />
            </p>
            <div className="mt-12 animate-fade-in-delay-2 flex justify-center gap-4">
              {/* Take the Tour button */}
              <a
                href="#about"
                className="group inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-6 py-3 text-sm font-medium text-zinc-900 shadow-sm transition-all duration-300 hover:border-zinc-300 hover:shadow-md"
              >
                <span>Take the Tour</span>
              </a>

              {/* Download Resume button */}
              <a
                href="/SimonPhilipResume.pdf"
                download
                className="group inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-6 py-3 text-sm font-medium text-zinc-900 shadow-sm transition-all duration-300 hover:border-zinc-300 hover:shadow-md"
              >
                <Download className="h-4 w-4 text-zinc-500 transition-all duration-300 group-hover:text-zinc-900" />
                <span>Download Resume</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <ParallaxSection id="about" className="bg-white py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="About"
            subtitle="My background and philosophy"
          />

          <div className="mx-auto mt-16 grid max-w-5xl gap-12 md:grid-cols-2">
            <div className="relative aspect-square overflow-hidden rounded-2xl">
              <Image
                src="/simon1.jpg?height=600&width=600"
                alt="Simon Philip"
                fill
                className="object-cover"
              />
            </div>

            <div className="flex flex-col justify-center">
              <p className="mb-6 text-lg leading-relaxed text-zinc-600">
                With over four years of hands-on experience in managing and
                automating cloud infrastructure, I’ve built a strong foundation
                in AWS environments and DevOps practices. My journey began with
                a curiosity for how systems scale and operate behind the
                scenes—and turned into a career where I’ve engineered secure,
                resilient, and efficient cloud solutions for real-world business
                needs.
              </p>
              <p className="mb-6 text-lg leading-relaxed text-zinc-600">
                My approach combines strategic thinking with meticulous
                attention to detail, ensuring that every project not only meets
                but exceeds client expectations.
              </p>
              <p className="text-lg leading-relaxed text-zinc-600">
                I believe that great design should be invisible, allowing users
                to intuitively interact with products without friction or
                confusion.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <span className="rounded-full bg-zinc-100 px-4 py-2 text-sm text-zinc-700 hover:bg-highlight">
                  Design Thinking
                </span>
                <span className="rounded-full bg-zinc-100 px-4 py-2 text-sm text-zinc-700 hover:bg-highlight">
                  User Experience
                </span>
                <span className="rounded-full bg-zinc-100 px-4 py-2 text-sm text-zinc-700 hover:bg-highlight">
                  Brand Strategy
                </span>
                <span className="rounded-full bg-zinc-100 px-4 py-2 text-sm text-zinc-700 hover:bg-highlight">
                  Visual Design
                </span>
              </div>
            </div>
          </div>
        </div>
      </ParallaxSection>

      {/* Skills Section */}
      <ParallaxSection id="skills" className="bg-zinc-50 py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title="Skills" subtitle="My professional toolkit" />

          <div className="mx-auto mt-16 grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <SkillCard
              title="Cloud Engineering"
              description="Designing and managing scalable, secure, and efficient cloud infrastructure on AWS."
              icon="cloud"
              skills={[
                "AWS",
                "EC2",
                "S3",
                "IAM",
                "VPC",
                "CloudWatch",
                "Route 53",
                "RDS",
              ]}
            />

            <SkillCard
              title="Infrastructure as Code"
              description="Automating infrastructure provisioning and management using modern IaC tools."
              icon="settings"
              skills={[
                "Terraform",
                "CloudFormation",
                "AWS CLI",
                "GitHub Actions",
              ]}
            />

            <SkillCard
              title="DevOps & CI/CD"
              description="Streamlining software delivery through automation, monitoring, and continuous integration."
              icon="repeat"
              skills={[
                "GitHub Actions",
                "CI/CD Pipelines",
                "Monitoring",
                "Logging",
                "Shell Scripting",
              ]}
            />

            <SkillCard
              title="Frontend Development"
              description="Building responsive and dynamic user interfaces with modern JavaScript frameworks."
              icon="code"
              skills={[
                "React",
                "TypeScript",
                "JavaScript",
                "Tailwind CSS",
                "Vite",
              ]}
            />

            <SkillCard
              title="Version Control & Collaboration"
              description="Collaborating efficiently using best practices in source control and agile workflows."
              icon="github"
              skills={[
                "Git",
                "GitHub",
                "Agile",
                "Code Reviews",
                "Branching Strategies",
              ]}
            />
          </div>
        </div>
      </ParallaxSection>

      {/* Experience Section */}
      <ParallaxSection id="experience" className="bg-white py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Experience"
            subtitle="My professional journey"
          />

          <div className="mx-auto mt-16 max-w-4xl space-y-12">
            <ExperienceCard
              title="Cloud Operations Engineer"
              company="Safe Security"
              period="Nov 2021 – Jan 2024"
              description="Led cloud operations, automation, and security initiatives in AWS environments to ensure high availability and efficient deployments."
              achievements={[
                "Implemented Disaster Recovery Automation using Jenkins to restore customer data within the past 35 days",
                "Automated 80% of manual deployment tasks, enabling over 100 stack upgrades per sprint",
                "Reduced operational time by 95% through Slack-integrated scripts",
                "Migrated code repositories from Bitbucket to GitHub for improved collaboration",
                "Led security patching and vulnerability analysis using CrowdStrike and Wiz",
                "Supported SecOps in applying AWS security best practices across the organization",
                "Maintained 99.99% uptime while driving 20% cost savings through optimization",
                "Collaborated with product teams and managed code cherry-picks for releases",
              ]}
            />

            <ExperienceCard
              title="Customer Support Engineer"
              company="Safe Security"
              period="Jan 2021 – Nov 2021"
              description="Delivered full-stack feature enhancements and customer support for SAFE, a serverless React application hosted on AWS."
              achievements={[
                "Integrated new features and design changes in the React-based flagship product",
                "Resolved customer issues efficiently, ensuring smooth user experience",
                "Maintained daily follow-ups for bug tracking and resolution",
                "Owned feature delivery for a serverless web application on AWS infrastructure",
              ]}
            />
          </div>
        </div>
      </ParallaxSection>

      {/* Certifications Section */}
      <ParallaxSection id="certifications" className="bg-zinc-50 py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Certifications"
            subtitle="Certifications undertaken"
          />

          <div className="mx-auto mt-16 grid max-w-6xl gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <ProjectCard
              title="AWS Certified Developer – Associate"
              category="Certification"
              image="/aws.png?height=400&width=600"
              description="Validated proficiency in developing and maintaining AWS-based applications, including core services and best practices."
              link="https://www.credly.com/badges/your-aws-dev-cert-link"
            />

            <ProjectCard
              title="Full Stack Development – upGrad"
              category="Certification"
              image="/fullstack.png?height=400&width=600"
              description="Completed hands-on training in front-end and back-end technologies including React, Node.js, and MongoDB."
              link="https://learn.upgrad.com/fullstack-cert"
            />

            <ProjectCard
              title="Solutions Architect Certification"
              category="Certification"
              image="/aws-saa.png?height=400&width=600"
              description="Awarded with AWS Solutions Architect Associate."
              link="#"
            />
          </div>
        </div>
      </ParallaxSection>

      {/* Contact Section */}
      <ParallaxSection id="contact" className="bg-white py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title="Contact" subtitle="Let's work together" />

          <div className="mx-auto mt-16 max-w-4xl">
            <div className="flex gap-12 flex-wrap justify-center items-center">
              <div className="flex flex-col items-center">
                <p className="mt-4 text-lg text-zinc-600 w-[80%] text-center">
                  I'm always open to discussing new projects, creative ideas, or
                  opportunities to be part of your vision.
                </p>

                <div className="mt-8 space-y-4">
                  <div className="flex items-center">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="h-5 w-5 text-zinc-600"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                        />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-zinc-900">Email</p>
                      <p><a href="mailto:simonphilip137@gmail.com" className="text-zinc-600 hover:underline">
    simonphilip137@gmail.com
  </a></p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="h-5 w-5 text-zinc-600"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                        />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-zinc-900">
                        Location
                      </p>
                      <p className="text-zinc-600">Bangalore, India</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="h-6 w-6 text-zinc-600"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.25 4.5l3.375-1.125a1.125 1.125 0 011.312.563l1.2 2.4a1.125 1.125 0 01-.25 1.313L6.5 9.5a11.25 11.25 0 005 5l1.849-1.188a1.125 1.125 0 011.313-.25l2.4 1.2a1.125 1.125 0 01.563 1.312L19.5 21.75a1.125 1.125 0 01-1.125 1.125C9.978 22.875 1.125 14.022 1.125 4.5A1.125 1.125 0 012.25 4.5z"
                        />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-zinc-900">Phone</p>
                      <a
                        href="tel:+917528893077"
                        className="text-zinc-600 hover:text-zinc-900"
                      >
                        +91 75288 93077
                      </a>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex space-x-4">
                  <a
                    href="https://linkedin.com/in/simon-philip"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full bg-zinc-100 p-2 text-zinc-600 transition-colors hover:bg-zinc-200 hover:text-zinc-900"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" />
                    </svg>
                  </a>
                  <a
                    href="https://linkedin.com/in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full bg-zinc-100 p-2 text-zinc-600 transition-colors hover:bg-zinc-200 hover:text-zinc-900"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
                    </svg>
                  </a>
                  <a
                    href="https://www.instagram.com/simonsideup/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full bg-zinc-100 p-2 text-zinc-600 transition-colors hover:bg-zinc-200 hover:text-zinc-900"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ParallaxSection>

      {/* Footer */}
      <footer className="border-t border-zinc-200 bg-white py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between md:flex-row">
            <div className="mb-4 md:mb-0">
              <p className="text-sm text-zinc-500">
                © {new Date().getFullYear()} Simon Philip. All rights reserved.
              </p>
            </div>

            <div className="flex space-x-6">
              <a href="#" className="text-sm text-zinc-500 hover:text-zinc-900">
                Privacy Policy
              </a>
              <a href="#" className="text-sm text-zinc-500 hover:text-zinc-900">
                Terms of Service
              </a>
              <a href="#" className="text-sm text-zinc-500 hover:text-zinc-900">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
