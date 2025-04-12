"use client"

import { useEffect, useState } from "react"

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890!@#$%^&*()_+=<>?/|"

interface Props {
  text: string
  duration?: number
  className?: string
}

export default function ScrambleText({ text, duration = 3000, className }: Props) {
  const [displayedText, setDisplayedText] = useState("")
  const [done, setDone] = useState(false)

  useEffect(() => {
    let frame = 0
    const totalFrames = Math.floor(duration / 50) // slower: increased interval time

    const interval = setInterval(() => {
      let newText = ""
      for (let i = 0; i < text.length; i++) {
        if (frame > totalFrames * (i / text.length)) {
          newText += text[i]
        } else {
          newText += letters[Math.floor(Math.random() * letters.length)]
        }
      }

      setDisplayedText(newText)
      frame++

      if (frame > totalFrames) {
        clearInterval(interval)
        setDone(true)
      }
    }, 50) // was 30ms, now slower at 50ms

    return () => clearInterval(interval)
  }, [text, duration])

  return <span className={className}>{done ? text : displayedText}</span>
}
