"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

export default function InfrastructureCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      const devicePixelRatio = window.devicePixelRatio || 1
      canvas.width = canvas.offsetWidth * devicePixelRatio
      canvas.height = canvas.offsetHeight * devicePixelRatio
      ctx.scale(devicePixelRatio, devicePixelRatio)
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Infrastructure nodes
    const nodes = [
      { id: "user", x: 50, y: 150, radius: 15, color: "#06b6d4", label: "User" },
      { id: "cdn", x: 150, y: 100, radius: 15, color: "#0ea5e9", label: "CDN" },
      { id: "lb", x: 250, y: 150, radius: 15, color: "#3b82f6", label: "Load Balancer" },
      { id: "app1", x: 350, y: 80, radius: 15, color: "#6366f1", label: "App Server 1" },
      { id: "app2", x: 350, y: 150, radius: 15, color: "#6366f1", label: "App Server 2" },
      { id: "app3", x: 350, y: 220, radius: 15, color: "#6366f1", label: "App Server 3" },
      { id: "db", x: 450, y: 150, radius: 15, color: "#8b5cf6", label: "Database" },
      { id: "cache", x: 450, y: 80, radius: 15, color: "#a855f7", label: "Cache" },
      { id: "storage", x: 450, y: 220, radius: 15, color: "#d946ef", label: "Storage" },
    ]

    // Connections between nodes
    const connections = [
      { from: "user", to: "cdn" },
      { from: "cdn", to: "lb" },
      { from: "lb", to: "app1" },
      { from: "lb", to: "app2" },
      { from: "lb", to: "app3" },
      { from: "app1", to: "db" },
      { from: "app2", to: "db" },
      { from: "app3", to: "db" },
      { from: "app1", to: "cache" },
      { from: "app2", to: "cache" },
      { from: "app3", to: "cache" },
      { from: "app1", to: "storage" },
      { from: "app2", to: "storage" },
      { from: "app3", to: "storage" },
    ]

    // Data packets for animation
    const packets: { x: number; y: number; targetNodeId: string; progress: number; speed: number; color: string }[] = []

    // Animation variables
    let animationFrameId: number
    let lastTime = 0
    const fps = 60
    const interval = 1000 / fps

    // Draw a node
    function drawNode(node: (typeof nodes)[0], highlight = false) {
      if (!ctx) return

      // Draw node circle
      ctx.beginPath()
      ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2)
      ctx.fillStyle = highlight ? "#ffffff" : node.color
      ctx.fill()

      // Draw glow effect
      if (highlight) {
        ctx.beginPath()
        ctx.arc(node.x, node.y, node.radius + 5, 0, Math.PI * 2)
        ctx.fillStyle = `${node.color}40`
        ctx.fill()
      }

      // Draw label
      ctx.fillStyle = "#e5e7eb"
      ctx.font = "12px Arial"
      ctx.textAlign = "center"
      ctx.fillText(node.label, node.x, node.y + node.radius + 15)
    }

    // Draw a connection between nodes
    function drawConnection(from: (typeof nodes)[0], to: (typeof nodes)[0], highlight = false) {
      if (!ctx) return

      ctx.beginPath()
      ctx.moveTo(from.x, from.y)
      ctx.lineTo(to.x, to.y)
      ctx.strokeStyle = highlight ? "#ffffff" : "#4b5563"
      ctx.lineWidth = highlight ? 2 : 1
      ctx.stroke()
    }

    // Create a data packet
    function createPacket() {
      const randomConnection = connections[Math.floor(Math.random() * connections.length)]
      const fromNode = nodes.find((n) => n.id === randomConnection.from)
      const toNode = nodes.find((n) => n.id === randomConnection.to)

      if (fromNode && toNode) {
        packets.push({
          x: fromNode.x,
          y: fromNode.y,
          targetNodeId: toNode.id,
          progress: 0,
          speed: 0.01 + Math.random() * 0.02,
          color: fromNode.color,
        })
      }
    }

    // Update and draw a data packet
    function updatePacket(packet: (typeof packets)[0], deltaTime: number) {
      if (!ctx) return

      const targetNode = nodes.find((n) => n.id === packet.targetNodeId)
      if (!targetNode) return

      // Update position based on progress
      packet.progress += packet.speed * deltaTime
      if (packet.progress >= 1) {
        // Remove packet when it reaches the target
        const index = packets.indexOf(packet)
        if (index > -1) {
          packets.splice(index, 1)
        }
        return
      }

      // Calculate position along the path
      packet.x = lerp(packet.x, targetNode.x, packet.progress)
      packet.y = lerp(packet.y, targetNode.y, packet.progress)

      // Draw packet
      ctx.beginPath()
      ctx.arc(packet.x, packet.y, 3, 0, Math.PI * 2)
      ctx.fillStyle = packet.color
      ctx.fill()
    }

    // Linear interpolation helper
    function lerp(start: number, end: number, t: number) {
      return start * (1 - t) + end * t
    }

    // Animation loop
    function animate(currentTime: number) {
      const deltaTime = currentTime - lastTime

      if (deltaTime >= interval) {
        // Clear canvas
        ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight)

        // Draw connections
        connections.forEach((connection) => {
          const fromNode = nodes.find((n) => n.id === connection.from)
          const toNode = nodes.find((n) => n.id === connection.to)
          if (fromNode && toNode) {
            drawConnection(fromNode, toNode)
          }
        })

        // Draw nodes
        nodes.forEach((node) => {
          drawNode(node)
        })

        // Create new packets occasionally
        if (Math.random() < 0.05) {
          createPacket()
        }

        // Update and draw packets
        packets.forEach((packet) => {
          updatePacket(packet, deltaTime / 1000)
        })

        lastTime = currentTime
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    // Start animation
    animationFrameId = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener("resize", setCanvasDimensions)
    }
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="bg-gray-800/50 rounded-xl p-4 border border-gray-700 h-[300px] md:h-[400px]"
    >
      <h3 className="text-lg font-semibold text-cyan-400 mb-2">Cloud Infrastructure Visualization</h3>
      <canvas ref={canvasRef} className="w-full h-[calc(100%-2rem)]" />
    </motion.div>
  )
}
