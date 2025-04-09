"use client"

import { motion } from "framer-motion"
import { Cloud, Code, Server, Briefcase, GraduationCap, Mail } from "lucide-react"
import type { Section } from "@/lib/resume-data"

interface SideNavProps {
  sections: Section[]
  currentSection: number
  onSectionChange: (sectionIndex: number) => void
  isMobileMenuOpen: boolean
}

export default function SideNav({ sections, currentSection, onSectionChange, isMobileMenuOpen }: SideNavProps) {
  const icons = [
    <Cloud key="cloud" className="h-5 w-5" />,
    <Code key="code" className="h-5 w-5" />,
    <Server key="server" className="h-5 w-5" />,
    <Briefcase key="briefcase" className="h-5 w-5" />,
    <GraduationCap key="academic" className="h-5 w-5" />,
    <Mail key="mail" className="h-5 w-5" />,
  ]

  const sidebarVariants = {
    hidden: { x: "-100%" },
    visible: { x: 0 },
  }

  return (
    <>
      {/* Mobile Navigation */}
      <motion.div
        className="lg:hidden fixed inset-0 z-40 bg-gray-900"
        initial="hidden"
        animate={isMobileMenuOpen ? "visible" : "hidden"}
        variants={sidebarVariants}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <div className="pt-20 px-4 h-full overflow-y-auto">
          <div className="space-y-2">
            {sections.map((section, index) => (
              <motion.button
                key={section.id}
                className={`w-full flex items-center p-4 rounded-lg transition-all ${
                  currentSection === index
                    ? "bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-white border-l-4 border-cyan-500"
                    : "text-gray-400 hover:bg-gray-800"
                }`}
                onClick={() => onSectionChange(index)}
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.98 }}
              >
                <div
                  className={`mr-3 p-2 rounded-lg ${
                    currentSection === index
                      ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white"
                      : "bg-gray-800 text-gray-400"
                  }`}
                >
                  {icons[index]}
                </div>
                <span className="font-medium">{section.title}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Desktop Navigation */}
      <motion.aside
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
        className="hidden lg:block w-64 shrink-0 border-r border-gray-800 h-[calc(100vh-4rem)] sticky top-16 overflow-y-auto py-8 px-4"
      >
        <div className="space-y-2">
          {sections.map((section, index) => (
            <motion.button
              key={section.id}
              className={`w-full flex items-center p-3 rounded-lg transition-all ${
                currentSection === index
                  ? "bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-white border-l-4 border-cyan-500"
                  : "text-gray-400 hover:bg-gray-800"
              }`}
              onClick={() => onSectionChange(index)}
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.98 }}
            >
              <div
                className={`mr-3 p-2 rounded-lg ${
                  currentSection === index
                    ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white"
                    : "bg-gray-800 text-gray-400"
                }`}
              >
                {icons[index]}
              </div>
              <span className="font-medium">{section.title}</span>
            </motion.button>
          ))}
        </div>

        <div className="mt-12 pt-6 border-t border-gray-800">
          <div className="bg-gray-800 rounded-lg p-4">
            <h3 className="font-bold text-cyan-400 mb-2">Resume Progress</h3>
            <div className="w-full h-1 bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-500"
                style={{
                  width: `${((currentSection + 1) / sections.length) * 100}%`,
                }}
              />
            </div>
            <div className="text-right text-xs mt-2 text-gray-400">
              {currentSection + 1}/{sections.length} Sections
            </div>
          </div>
        </div>
      </motion.aside>
    </>
  )
}
