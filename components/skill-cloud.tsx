"use client"

import { useEffect, useRef } from "react"

export default function SkillCloud() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const skills = [
    { name: "AWS", level: 90 },
    { name: "Docker", level: 85 },
    { name: "Kubernetes", level: 80 },
    { name: "Terraform", level: 85 },
    { name: "CI/CD", level: 90 },
    { name: "Linux", level: 85 },
    { name: "Python", level: 75 },
    { name: "Ansible", level: 70 },
    { name: "Git", level: 80 },
    { name: "Monitoring", level: 75 },
    { name: "Azure", level: 65 },
    { name: "GCP", level: 60 },
  ]

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    // Skill bubble parameters
    const bubbles: {
      name: string
      level: number
      x: number
      y: number
      radius: number
      vx: number
      vy: number
      color: string
    }[] = []

    // Colors for skill bubbles
    const colors = [
      "#3B82F6", // blue-500
      "#10B981", // emerald-500
      "#8B5CF6", // violet-500
      "#F59E0B", // amber-500
      "#EC4899", // pink-500
    ]

    // Initialize bubbles
    skills.forEach((skill, index) => {
      bubbles.push({
        name: skill.name,
        level: skill.level,
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: 30 + (skill.level / 100) * 20, // Size based on skill level
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        color: colors[index % colors.length],
      })
    })

    // Draw a bubble
    function drawBubble(bubble: (typeof bubbles)[0]) {
      if (!ctx) return

      // Draw circle
      ctx.fillStyle = bubble.color + "80" // Add transparency
      ctx.beginPath()
      ctx.arc(bubble.x, bubble.y, bubble.radius, 0, Math.PI * 2)
      ctx.fill()

      // Draw border
      ctx.strokeStyle = bubble.color
      ctx.lineWidth = 2
      ctx.stroke()

      // Draw text
      ctx.fillStyle = "#1F2937" // gray-800
      ctx.font = "bold 14px Arial"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText(bubble.name, bubble.x, bubble.y)
    }

    // Animation loop
    function animate() {
      if (!ctx) return

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw bubbles
      bubbles.forEach((bubble) => {
        // Move bubble
        bubble.x += bubble.vx
        bubble.y += bubble.vy

        // Bounce off walls
        if (bubble.x < bubble.radius || bubble.x > canvas.width - bubble.radius) {
          bubble.vx *= -1
        }
        if (bubble.y < bubble.radius || bubble.y > canvas.height - bubble.radius) {
          bubble.vy *= -1
        }

        // Draw bubble
        drawBubble(bubble)
      })

      requestAnimationFrame(animate)
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
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-blue-700">Skills Visualization</h2>
      <div className="h-[300px] rounded-lg overflow-hidden border border-gray-200">
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>
      <div className="text-sm text-gray-500 text-center">Bubble size represents skill proficiency</div>
    </div>
  )
}
