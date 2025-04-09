"use client"

import { motion } from "framer-motion"
import { Award, Calendar } from "lucide-react"
import type { Certification } from "@/lib/resume-data"

interface CertificationGridProps {
  certifications: Certification[]
}

export default function CertificationGrid({ certifications }: CertificationGridProps) {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certifications.map((cert, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.1 }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 hover:border-cyan-500/50 transition-colors"
          >
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-3 rounded-lg">
                <Award className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">{cert.name}</h3>
                <p className="text-cyan-400 text-sm">{cert.issuer}</p>
              </div>
            </div>

            <div className="mt-4 flex items-center text-gray-400 text-sm">
              <Calendar className="h-4 w-4 mr-2" />
              {cert.date}
            </div>

            {cert.description && <p className="mt-3 text-gray-300 text-sm">{cert.description}</p>}

            {cert.skills && (
              <div className="mt-4 flex flex-wrap gap-2">
                {cert.skills.map((skill, skillIndex) => (
                  <span key={skillIndex} className="px-2 py-1 bg-gray-700 text-cyan-300 rounded text-xs">
                    {skill}
                  </span>
                ))}
              </div>
            )}
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-12 bg-gray-800/50 rounded-xl p-6 border border-gray-700"
      >
        <h3 className="text-xl font-bold text-white mb-4">Education</h3>
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/3">
            <h4 className="text-lg font-semibold text-white">Bachelor of Science in Computer Science</h4>
            <p className="text-cyan-400">University of Technology</p>
          </div>
          <div className="md:w-2/3 mt-2 md:mt-0">
            <p className="text-gray-300">Specialized in Systems Architecture and Network Security</p>
            <p className="text-gray-400 mt-2">2013 - 2017</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="px-2 py-1 bg-gray-700 text-cyan-300 rounded text-xs">Computer Networks</span>
              <span className="px-2 py-1 bg-gray-700 text-cyan-300 rounded text-xs">Systems Design</span>
              <span className="px-2 py-1 bg-gray-700 text-cyan-300 rounded text-xs">Algorithms</span>
              <span className="px-2 py-1 bg-gray-700 text-cyan-300 rounded text-xs">Database Systems</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
