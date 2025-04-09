"use client"

import { useEffect, useRef, useState } from "react"

interface CloudJourneyProps {
  currentSection: number
  onAnimationComplete: () => void
}

export default function CloudJourney({ currentSection, onAnimationComplete }: CloudJourneyProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isAnimating, setIsAnimating] = useState(true)

  // Cloud infrastructure elements based on current section
  const sections = [
    { name: "About", icon: "👤", color: "#3B82F6" },
    { name: "Skills", icon: "🛠️", color: "#10B981" },
    { name: "Projects", icon: "🚀", color: "#8B5CF6" },
    { name: "Experience", icon: "💼", color: "#F59E0B" },
    { name: "Education", icon: "🎓", color: "#EC4899" },
    { name: "Contact", icon: "📱", color: "#6366F1" },
  ]

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    // Cloud parameters
    const cloudCount = 10
    const clouds: { x: number; y: number; speed: number; size: number; opacity: number }[] = []

    // Initialize clouds
    for (let i = 0; i < cloudCount; i++) {
      clouds.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        speed: 0.2 + Math.random() * 0.3,
        size: 30 + Math.random() * 40,
        opacity: 0.1 + Math.random() * 0.2,
      })
    }

    // Draw a cloud
    function drawCloud(x: number, y: number, size: number, opacity: number) {
      if (!ctx) return

      ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`
      ctx.beginPath()
      ctx.arc(x, y, size * 0.4, 0, Math.PI * 2)
      ctx.arc(x + size * 0.3, y - size * 0.2, size * 0.3, 0, Math.PI * 2)
      ctx.arc(x + size * 0.4, y + size * 0.1, size * 0.3, 0, Math.PI * 2)
      ctx.arc(x - size * 0.3, y, size * 0.3, 0, Math.PI * 2)
      ctx.closePath()
      ctx.fill()
    }

    // Draw infrastructure elements
    function drawInfrastructure() {
      if (!ctx) return

      const centerX = canvas.width / 2
      const centerY = canvas.height / 2
      const radius = Math.min(canvas.width, canvas.height) * 0.3

      // Draw connecting lines
      ctx.strokeStyle = "rgba(59, 130, 246, 0.3)"
      ctx.lineWidth = 2

      // Draw center hub
      ctx.fillStyle = "#3B82F6"
      ctx.beginPath()
      ctx.arc(centerX, centerY, 30, 0, Math.PI * 2)
      ctx.fill()

      // Draw icon in center
      ctx.fillStyle = "white"
      ctx.font = "20px Arial"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText("☁️", centerX, centerY)

      // Draw section nodes
      sections.forEach((section, index) => {
        const angle = (index * Math.PI * 2) / sections.length
        const x = centerX + radius * Math.cos(angle)
        const y = centerY + radius * Math.sin(angle)

        // Draw connecting line
        ctx.beginPath()
        ctx.moveTo(centerX, centerY)
        ctx.lineTo(x, y)
        ctx.stroke()

        // Draw node
        ctx.fillStyle = index === currentSection ? section.color : "rgba(156, 163, 175, 0.5)"
        ctx.beginPath()
        ctx.arc(x, y, 25, 0, Math.PI * 2)
        ctx.fill()

        // Draw icon
        ctx.fillStyle = "white"
        ctx.font = "16px Arial"
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"
        ctx.fillText(section.icon, x, y)

        // Draw label
        ctx.fillStyle = "#1F2937"
        ctx.font = "14px Arial"
        ctx.fillText(section.name, x, y + 40)
      })
    }

    // Animation loop
    let animationFrameId: number
    let frameCount = 0
    const maxFrames = 180 // 3 seconds at 60fps

    function animate() {
      if (!ctx) return

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw clouds
      clouds.forEach((cloud) => {
        cloud.x += cloud.speed
        if (cloud.x > canvas.width + cloud.size) {
          cloud.x = -cloud.size
        }
        drawCloud(cloud.x, cloud.y, cloud.size, cloud.opacity)
      })

      // Draw infrastructure
      drawInfrastructure()

      // Count frames for initial animation
      if (isAnimating) {
        frameCount++
        if (frameCount >= maxFrames) {
          setIsAnimating(false)
          onAnimationComplete()
        }
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    // Handle window resize
    const handleResize = () => {
      if (canvas) {
        canvas.width = canvas.offsetWidth
        canvas.height = canvas.offsetHeight
      }
    }

    window.addEventListener("resize", handleResize)

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener("resize", handleResize)
    }
  }, [currentSection, isAnimating, onAnimationComplete])

  return (
    <div className="relative">
      <h2 className="text-2xl font-bold text-blue-700 mb-4">Cloud Infrastructure Journey</h2>
      <div className="relative h-[300px] rounded-lg overflow-hidden">
        <canvas ref={canvasRef} className="w-full h-full" />
        <div className="absolute bottom-2 right-2 bg-white/80 rounded-lg px-3 py-1 text-sm text-blue-700">
          Click on sections to navigate
        </div>
      </div>
    </div>
  )
}
