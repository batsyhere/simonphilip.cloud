"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import CommandInput from "@/components/command-input"
import Section from "@/components/section"
import { executeCommand } from "@/lib/commands"
import type { Section as SectionType } from "@/lib/sections-data"

interface TerminalProps {
  sections: SectionType[]
  currentSection: number
  onSectionComplete: (sectionIndex: number) => void
  onSectionChange: (sectionIndex: number) => void
}

interface TerminalLine {
  type: "input" | "output" | "section"
  content: string | React.ReactNode
}

export default function Terminal({ sections, currentSection, onSectionComplete, onSectionChange }: TerminalProps) {
  const [terminalHistory, setTerminalHistory] = useState<TerminalLine[]>([
    {
      type: "output",
      content: "Welcome to RESUME.SYS. Type 'help' to see available commands.",
    },
    {
      type: "section",
      content: <Section key={sections[0].id} section={sections[0]} onComplete={() => onSectionComplete(0)} />,
    },
  ])
  const [inputHistory, setInputHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const terminalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [terminalHistory])

  useEffect(() => {
    // When current section changes, add it to terminal history
    const sectionExists = terminalHistory.some(
      (line) =>
        line.type === "section" &&
        (line.content as React.ReactElement)?.props?.section?.id === sections[currentSection].id,
    )

    if (!sectionExists) {
      setTerminalHistory([
        ...terminalHistory,
        {
          type: "section",
          content: (
            <Section
              key={sections[currentSection].id}
              section={sections[currentSection]}
              onComplete={() => onSectionComplete(currentSection)}
            />
          ),
        },
      ])
    }
  }, [currentSection, sections, terminalHistory, onSectionComplete])

  const handleCommand = (command: string) => {
    // Add command to history
    setInputHistory([command, ...inputHistory])
    setHistoryIndex(-1)

    // Add command to terminal display
    setTerminalHistory([...terminalHistory, { type: "input", content: `> ${command}` }])

    // Execute command and get result
    const result = executeCommand(command, sections, currentSection, onSectionChange)

    // Add result to terminal display
    setTerminalHistory((prev) => [...prev, { type: "output", content: result }])
  }

  const handleHistoryNavigation = (direction: "up" | "down") => {
    if (inputHistory.length === 0) return

    let newIndex
    if (direction === "up") {
      newIndex = historyIndex < inputHistory.length - 1 ? historyIndex + 1 : historyIndex
    } else {
      newIndex = historyIndex > 0 ? historyIndex - 1 : -1
    }

    setHistoryIndex(newIndex)
    return newIndex === -1 ? "" : inputHistory[newIndex]
  }

  return (
    <div className="flex flex-col h-full">
      <div ref={terminalRef} className="flex-1 overflow-y-auto mb-4 font-mono text-sm">
        {terminalHistory.map((line, index) => (
          <div key={index} className="mb-2">
            {line.type === "input" && <div className="text-green-400">{line.content}</div>}
            {line.type === "output" && <div className="text-gray-300">{line.content}</div>}
            {line.type === "section" && <div className="my-4 border-l-2 border-green-700 pl-4">{line.content}</div>}
          </div>
        ))}
      </div>

      <CommandInput onCommand={handleCommand} onHistoryNavigation={handleHistoryNavigation} sections={sections} />
    </div>
  )
}
