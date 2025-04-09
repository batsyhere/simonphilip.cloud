"use client"

import type React from "react"

import { useState, useRef, useEffect, type KeyboardEvent } from "react"
import type { Section } from "@/lib/sections-data"

interface CommandInputProps {
  onCommand: (command: string) => void
  onHistoryNavigation: (direction: "up" | "down") => string | undefined
  sections: Section[]
}

export default function CommandInput({ onCommand, onHistoryNavigation, sections }: CommandInputProps) {
  const [input, setInput] = useState("")
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const commands = ["help", "clear", "about", "skills", "projects", "experience", "education", "contact", "ls", "cd"]

  useEffect(() => {
    // Focus input on mount
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInput(value)

    if (value.trim()) {
      const filtered = commands.filter((cmd) => cmd.startsWith(value.toLowerCase()))
      setSuggestions(filtered)
      setShowSuggestions(filtered.length > 0)
    } else {
      setShowSuggestions(false)
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && input.trim()) {
      onCommand(input.trim())
      setInput("")
      setShowSuggestions(false)
    } else if (e.key === "Tab" && showSuggestions) {
      e.preventDefault()
      setInput(suggestions[0])
      setShowSuggestions(false)
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      const previousCommand = onHistoryNavigation("up")
      if (previousCommand !== undefined) {
        setInput(previousCommand)
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      const nextCommand = onHistoryNavigation("down")
      if (nextCommand !== undefined) {
        setInput(nextCommand)
      }
    }
  }

  return (
    <div className="relative">
      <div className="flex items-center bg-gray-900 border border-green-900 rounded p-2">
        <span className="text-green-400 mr-2">&gt;</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent outline-none text-green-400"
          autoFocus
        />
        <div className="animate-blink text-green-400">_</div>
      </div>

      {showSuggestions && (
        <div className="absolute bottom-full mb-2 bg-gray-900 border border-green-900 rounded w-full">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="px-2 py-1 hover:bg-gray-800 cursor-pointer"
              onClick={() => {
                setInput(suggestion)
                setShowSuggestions(false)
                if (inputRef.current) {
                  inputRef.current.focus()
                }
              }}
            >
              {suggestion}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
