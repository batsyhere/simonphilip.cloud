"use client"

import type React from "react"

import { useRef, useEffect, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

interface ParallaxSectionProps {
  children: React.ReactNode
  id?: string
  className?: string
}

export default function ParallaxSection({ children, id, className }: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [elementTop, setElementTop] = useState(0)
  const [clientHeight, setClientHeight] = useState(0)

  const { scrollY } = useScroll()

  // Calculate the element's position relative to the viewport
  useEffect(() => {
    if (!ref.current) return

    const setValues = () => {
      setElementTop(ref.current?.offsetTop || 0)
      setClientHeight(window.innerHeight)
    }

    setValues()
    window.addEventListener("resize", setValues)

    return () => window.removeEventListener("resize", setValues)
  }, [ref])

  const y = useTransform(scrollY, [elementTop - clientHeight, elementTop + clientHeight], [0, 100])

  return (
    <section id={id} ref={ref} className={className}>
      <motion.div style={{ y }} className="relative">
        {children}
      </motion.div>
    </section>
  )
}
