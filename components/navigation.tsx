"use client"

import { motion } from "framer-motion"
import { Cloud, Server, Code, Briefcase, GraduationCap, Mail } from "lucide-react"
import type { Section } from "@/lib/resume-data"

interface NavigationProps {
  sections: Section[]
  currentSection: number
  onSectionChange: (sectionIndex: number) => void
}

export default function Navigation({ sections, currentSection, onSectionChange }: NavigationProps) {
  const icons = [
    <Cloud key="cloud" className="h-6 w-6" />,
    <Code key="code" className="h-6 w-6" />,
    <Server key="server" className="h-6 w-6" />,
    <Briefcase key="briefcase" className="h-6 w-6" />,
    <GraduationCap key="academic" className="h-6 w-6" />,
    <Mail key="mail" className="h-6 w-6" />,
  ]

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-blue-700">Navigation</h2>
      <div className="space-y-2">
        {sections.map((section, index) => (
          <motion.button
            key={section.id}
            className={`w-full flex items-center p-3 rounded-lg transition-all ${
              currentSection === index
                ? "bg-blue-500 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
            onClick={() => onSectionChange(index)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className={`mr-3 p-2 rounded-full ${currentSection === index ? "bg-blue-400" : "bg-gray-200"}`}>
              {icons[index]}
            </div>
            <span className="font-medium">{section.title}</span>
          </motion.button>
        ))}
      </div>

      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="bg-blue-50 rounded-lg p-4">
          <h3 className="font-bold text-blue-700 mb-2">Resume Progress</h3>
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500 transition-all duration-500"
              style={{
                width: `${((currentSection + 1) / sections.length) * 100}%`,
              }}
            />
          </div>
          <div className="text-right text-sm mt-1 text-blue-700">
            {currentSection + 1}/{sections.length} Sections
          </div>
        </div>
      </div>
    </div>
  )
}
