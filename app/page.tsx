"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Header from "@/components/header"
import Footer from "@/components/footer"
import SideNav from "@/components/side-nav"
import InfrastructureCanvas from "@/components/infrastructure-canvas"
import SkillsMatrix from "@/components/skills-matrix"
import ProjectCard from "@/components/project-card"
import ExperienceTimeline from "@/components/experience-timeline"
import CertificationGrid from "@/components/certification-grid"
import ContactSection from "@/components/contact-section"
import { resumeSections, projects, experiences, certifications } from "@/lib/resume-data"
import ParticleBackground from "@/components/particle-background"

export default function Home() {
  const [currentSection, setCurrentSection] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  const handleSectionChange = (sectionIndex: number) => {
    setCurrentSection(sectionIndex)
    setIsMobileMenuOpen(false)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-center">
          <div className="relative w-32 h-32 mx-auto mb-4">
            <div className="absolute inset-0 rounded-full bg-cyan-500/20 animate-ping"></div>
            <div className="absolute inset-2 rounded-full bg-cyan-500/40 animate-pulse"></div>
            <div className="absolute inset-4 rounded-full bg-gray-800 shadow-lg flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-cyan-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
                />
              </svg>
            </div>
          </div>
          <h1 className="text-2xl font-bold text-cyan-400">Initializing System</h1>
          <div className="mt-4 flex justify-center">
            <div className="flex space-x-2">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-3 h-3 rounded-full bg-cyan-500"
                  style={{ animation: `pulse 1.5s ease-in-out ${i * 0.3}s infinite` }}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-gray-100 relative overflow-hidden">
      <ParticleBackground />

      <Header isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />

      <div className="flex-1 flex flex-col lg:flex-row">
        <SideNav
          sections={resumeSections}
          currentSection={currentSection}
          onSectionChange={handleSectionChange}
          isMobileMenuOpen={isMobileMenuOpen}
        />

        <main className="flex-1 container mx-auto px-4 py-8 lg:py-16 relative z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSection}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="space-y-12"
            >
              {currentSection === 0 && (
                <section id="about" className="space-y-8">
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                      Cloud & DevOps Engineer
                    </h1>
                    <div className="h-1 w-32 bg-gradient-to-r from-cyan-500 to-blue-500 mt-4"></div>
                  </motion.div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 }}
                      className="prose prose-invert max-w-none"
                    >
                      <p className="text-xl text-gray-300">
                        I architect and implement scalable, resilient cloud infrastructure and CI/CD pipelines that
                        power modern applications.
                      </p>
                      <p className="text-gray-400">
                        With expertise in AWS, Azure, and GCP, along with containerization technologies like Docker and
                        Kubernetes, I specialize in building infrastructure that scales seamlessly with your business
                        needs.
                      </p>
                      <p className="text-gray-400">
                        My approach combines technical excellence with business acumen, ensuring that infrastructure
                        supports organizational goals while maintaining reliability, security, and cost-effectiveness.
                      </p>
                      <div className="flex flex-wrap gap-3 mt-6">
                        <span className="px-3 py-1 bg-gray-800 text-cyan-400 rounded-full text-sm">AWS</span>
                        <span className="px-3 py-1 bg-gray-800 text-cyan-400 rounded-full text-sm">Kubernetes</span>
                        <span className="px-3 py-1 bg-gray-800 text-cyan-400 rounded-full text-sm">Terraform</span>
                        <span className="px-3 py-1 bg-gray-800 text-cyan-400 rounded-full text-sm">CI/CD</span>
                        <span className="px-3 py-1 bg-gray-800 text-cyan-400 rounded-full text-sm">Docker</span>
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 }}
                    >
                      <InfrastructureCanvas />
                    </motion.div>
                  </div>
                </section>
              )}

              {currentSection === 1 && (
                <section id="skills" className="space-y-8">
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
                    <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                      Technical Skills
                    </h2>
                    <div className="h-1 w-24 bg-gradient-to-r from-cyan-500 to-blue-500 mt-2"></div>
                    <p className="text-gray-400 mt-4">
                      My technical toolkit is built around modern cloud and DevOps practices, with a focus on
                      automation, scalability, and security.
                    </p>
                  </motion.div>

                  <SkillsMatrix />
                </section>
              )}

              {currentSection === 2 && (
                <section id="projects" className="space-y-8">
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
                    <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                      Key Projects
                    </h2>
                    <div className="h-1 w-24 bg-gradient-to-r from-cyan-500 to-blue-500 mt-2"></div>
                    <p className="text-gray-400 mt-4">
                      Significant projects that demonstrate my cloud architecture and DevOps capabilities.
                    </p>
                  </motion.div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project, index) => (
                      <ProjectCard key={index} project={project} index={index} />
                    ))}
                  </div>
                </section>
              )}

              {currentSection === 3 && (
                <section id="experience" className="space-y-8">
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
                    <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                      Work Experience
                    </h2>
                    <div className="h-1 w-24 bg-gradient-to-r from-cyan-500 to-blue-500 mt-2"></div>
                    <p className="text-gray-400 mt-4">
                      My professional journey in cloud infrastructure and DevOps engineering.
                    </p>
                  </motion.div>

                  <ExperienceTimeline experiences={experiences} />
                </section>
              )}

              {currentSection === 4 && (
                <section id="education" className="space-y-8">
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
                    <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                      Education & Certifications
                    </h2>
                    <div className="h-1 w-24 bg-gradient-to-r from-cyan-500 to-blue-500 mt-2"></div>
                    <p className="text-gray-400 mt-4">
                      My academic background and professional certifications in cloud and DevOps technologies.
                    </p>
                  </motion.div>

                  <CertificationGrid certifications={certifications} />
                </section>
              )}

              {currentSection === 5 && (
                <section id="contact" className="space-y-8">
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
                    <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                      Contact Me
                    </h2>
                    <div className="h-1 w-24 bg-gradient-to-r from-cyan-500 to-blue-500 mt-2"></div>
                    <p className="text-gray-400 mt-4">Interested in working together? Let's connect.</p>
                  </motion.div>

                  <ContactSection />
                </section>
              )}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      <Footer />
    </div>
  )
}
