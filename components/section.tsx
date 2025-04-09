"use client"

import { useState, useEffect } from "react"
import type { Section as SectionType } from "@/lib/sections-data"

interface SectionProps {
  section: SectionType
  onComplete: () => void
}

export default function Section({ section, onComplete }: SectionProps) {
  const [visibleContent, setVisibleContent] = useState<string[]>([])
  const [isComplete, setIsComplete] = useState(false)
  const contentLines = Array.isArray(section.content) ? section.content : [section.content]

  useEffect(() => {
    let currentLine = 0

    const interval = setInterval(() => {
      if (currentLine < contentLines.length) {
        setVisibleContent((prev) => [...prev, contentLines[currentLine]])
        currentLine++
      } else {
        clearInterval(interval)
        setIsComplete(true)
        onComplete()
      }
    }, 50) // Adjust typing speed here

    return () => clearInterval(interval)
  }, [contentLines, onComplete])

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
        <h2 className="text-xl font-bold">{section.title}</h2>
      </div>

      <div className="pl-4 border-l border-green-900 space-y-2">
        {visibleContent.map((line, index) => (
          <div key={index} className="leading-relaxed">
            {line}
          </div>
        ))}
      </div>

      {isComplete && section.tasks && (
        <div className="mt-4 pl-4">
          <h3 className="text-sm font-bold mb-2">MISSION OBJECTIVES:</h3>
          <ul className="space-y-1">
            {section.tasks.map((task, index) => (
              <li key={index} className="flex items-start">
                <span className="mr-2">→</span>
                <span>{task}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
