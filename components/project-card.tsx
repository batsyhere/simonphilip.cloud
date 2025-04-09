"use client"

import { motion } from "framer-motion"
import { Server, GitBranch, Clock } from "lucide-react"
import type { Project } from "@/lib/resume-data"

interface ProjectCardProps {
  project: Project
  index: number
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 + index * 0.1 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="bg-gray-800/50 rounded-xl overflow-hidden border border-gray-700 hover:border-cyan-500/50 transition-colors"
    >
      <div className="p-6 space-y-4">
        <div className="flex items-start justify-between">
          <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-3 rounded-lg">
            <Server className="h-5 w-5 text-white" />
          </div>
          <span className="text-xs text-gray-400 flex items-center">
            <Clock className="h-3 w-3 mr-1" />
            {project.date}
          </span>
        </div>

        <div>
          <h3 className="text-xl font-bold text-white mt-2">{project.title}</h3>
          <p className="text-cyan-400 text-sm">{project.role}</p>
        </div>

        <p className="text-gray-400 text-sm line-clamp-3">{project.summary}</p>

        <div className="space-y-2">
          <div className="flex items-center text-xs text-gray-400">
            <GitBranch className="h-3 w-3 mr-1" />
            Key Technologies
          </div>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech, techIndex) => (
              <span key={techIndex} className="px-2 py-1 bg-gray-700 text-cyan-300 rounded text-xs">
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="pt-4">
          <button className="w-full py-2 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-lg text-sm transition-colors">
            View Details
          </button>
        </div>
      </div>
    </motion.div>
  )
}
