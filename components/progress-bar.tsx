"use client"

import { useState } from "react"
import type { Section } from "@/lib/sections-data"
import { LockIcon, UnlockIcon, CheckIcon } from "lucide-react"

interface ProgressBarProps {
  sections: Section[]
  completedSections: number[]
  currentSection: number
  onSectionChange: (sectionIndex: number) => void
}

export default function ProgressBar({
  sections,
  completedSections,
  currentSection,
  onSectionChange,
}: ProgressBarProps) {
  const [hoveredSection, setHoveredSection] = useState<number | null>(null)

  const getSectionStatus = (index: number) => {
    if (completedSections.includes(index)) return "completed"
    if (index === 0 || completedSections.includes(index - 1)) return "unlocked"
    return "locked"
  }

  return (
    <div className="space-y-4">
      {sections.map((section, index) => {
        const status = getSectionStatus(index)
        const isActive = currentSection === index

        return (
          <div
            key={section.id}
            className={`
              p-3 border rounded-md transition-all duration-300
              ${isActive ? "border-green-400 bg-gray-900" : "border-green-900"}
              ${status === "locked" ? "opacity-50" : "cursor-pointer hover:border-green-400"}
              ${hoveredSection === index ? "bg-gray-900" : ""}
            `}
            onClick={() => {
              if (status !== "locked") {
                onSectionChange(index)
              }
            }}
            onMouseEnter={() => setHoveredSection(index)}
            onMouseLeave={() => setHoveredSection(null)}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm">{section.title}</span>
              <span>
                {status === "locked" && <LockIcon size={16} />}
                {status === "unlocked" && <UnlockIcon size={16} />}
                {status === "completed" && <CheckIcon size={16} className="text-green-400" />}
              </span>
            </div>

            {(isActive || hoveredSection === index) && status !== "locked" && (
              <div className="mt-2 text-xs text-gray-400">{section.description}</div>
            )}
          </div>
        )
      })}

      <div className="mt-6">
        <div className="text-xs mb-2">MISSION PROGRESS</div>
        <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-green-400 transition-all duration-500"
            style={{
              width: `${(completedSections.length / sections.length) * 100}%`,
            }}
          />
        </div>
        <div className="text-right text-xs mt-1">
          {completedSections.length}/{sections.length} COMPLETE
        </div>
      </div>
    </div>
  )
}
