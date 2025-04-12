"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"

interface ExperienceCardProps {
  title: string
  company: string
  period: string
  description: string
  achievements: string[]
}

export default function ExperienceCard({ title, company, period, description, achievements }: ExperienceCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h3 className="text-xl font-medium text-zinc-900">{title}</h3>
          <p className="text-zinc-600">{company}</p>
        </div>
        <div className="rounded-full px-4 py-1 text-sm text-zinc-900 bg-highlight">{period}</div>
      </div>

      <p className="mt-4 text-zinc-600">{description}</p>

      <div className="mt-6">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2 text-sm font-medium text-zinc-900"
        >
          {isExpanded ? "Hide" : "Show"} achievements
          <ChevronDown className={`h-4 w-4 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
        </button>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <ul className="mt-4 space-y-2 pl-5">
                {achievements.map((achievement, index) => (
                  <li key={index} className="list-disc text-zinc-600">
                    {achievement}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
