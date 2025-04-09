"use client"

import Image from "next/image"
import { motion } from "framer-motion"

interface ProjectCardProps {
  title: string
  category: string
  image: string
  description: string
  link: string
}

export default function ProjectCard({ title, category, image, description, link }: ProjectCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="group overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition-all duration-300 hover:shadow-md"
    >
      <div className="relative h-48 overflow-hidden">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
        <div className="absolute bottom-0 left-0 w-full p-4 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <span className="text-sm font-medium">{category}</span>
        </div>
      </div>

      <div className="p-6">
        <h3 className="mb-2 text-xl font-medium text-zinc-900">{title}</h3>
        <p className="mb-4 text-zinc-600">{description}</p>
      </div>
    </motion.div>
  )
}
