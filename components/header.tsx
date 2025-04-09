"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Menu, X } from "lucide-react"

interface HeaderProps {
  isMobileMenuOpen: boolean
  setIsMobileMenuOpen: (isOpen: boolean) => void
}

export default function Header({ isMobileMenuOpen, setIsMobileMenuOpen }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-gray-900/80 backdrop-blur-md border-b border-gray-800">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-3"
          >
            <div className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white p-2 rounded-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Your Name</h1>
              <p className="text-cyan-400 text-sm">Cloud & DevOps Engineer</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="hidden md:flex items-center space-x-6"
          >
            <Link href="#about" className="text-gray-300 hover:text-cyan-400 transition-colors">
              About
            </Link>
            <Link href="#skills" className="text-gray-300 hover:text-cyan-400 transition-colors">
              Skills
            </Link>
            <Link href="#projects" className="text-gray-300 hover:text-cyan-400 transition-colors">
              Projects
            </Link>
            <Link href="#experience" className="text-gray-300 hover:text-cyan-400 transition-colors">
              Experience
            </Link>
            <Link
              href="#contact"
              className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Contact Me
            </Link>
          </motion.div>

          <button
            className="md:hidden text-gray-300 hover:text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </header>
  )
}
