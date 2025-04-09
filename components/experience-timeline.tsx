"use client"

import { motion } from "framer-motion"
import { Briefcase } from "lucide-react"
import type { Experience } from "@/lib/resume-data"

interface ExperienceTimelineProps {
  experiences: Experience[]
}

export default function ExperienceTimeline({ experiences }: ExperienceTimelineProps) {
  return (
    <div className="relative">
      {/* Timeline line */}
      <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500 to-blue-500 hidden md:block"></div>

      <div className="space-y-12">
        {experiences.map((experience, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + index * 0.1 }}
            className="flex flex-col md:flex-row"
          >
            <div className="md:w-64 flex-shrink-0 mb-4 md:mb-0">
              <div className="flex md:flex-col items-center md:items-end">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center z-10 mr-4 md:mr-0 md:mb-2">
                  <Briefcase className="h-8 w-8 text-white" />
                </div>
                <div className="text-right">
                  <h4 className="text-lg font-bold text-white">{experience.company}</h4>
                  <p className="text-cyan-400">{experience.date}</p>
                </div>
              </div>
            </div>

            <div className="md:ml-12 bg-gray-800/50 rounded-xl p-6 border border-gray-700 flex-1">
              <h3 className="text-xl font-bold text-white">{experience.title}</h3>
              <p className="text-gray-400 mt-2">{experience.description}</p>

              <div className="mt-4 space-y-2">
                <h4 className="text-cyan-400 font-medium">Key Responsibilities:</h4>
                <ul className="space-y-1">
                  {experience.responsibilities.map((item, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-cyan-500 mr-2">•</span>
                      <span className="text-gray-300 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-700">
                <div className="flex flex-wrap gap-2">
                  {experience.technologies.map((tech, techIndex) => (
                    <span key={techIndex} className="px-2 py-1 bg-gray-700 text-cyan-300 rounded text-xs">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
