"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Mail, Phone, Linkedin, Github, Send } from "lucide-react"

export default function ContactSection() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Form submission logic would go here
    console.log("Form submitted:", formState)
    // Reset form
    setFormState({ name: "", email: "", message: "" })
    // Show success message
    alert("Message sent! I'll get back to you soon.")
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-6"
      >
        <h3 className="text-2xl font-bold text-white">Get In Touch</h3>
        <p className="text-gray-400">
          I'm always interested in discussing new projects, opportunities, or just connecting with fellow cloud and
          DevOps enthusiasts.
        </p>

        <div className="space-y-4">
          <a
            href="mailto:your.email@example.com"
            className="flex items-center p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors group"
          >
            <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-3 rounded-lg mr-4">
              <Mail className="h-5 w-5 text-white" />
            </div>
            <div>
              <div className="font-medium text-white group-hover:text-cyan-400 transition-colors">Email</div>
              <div className="text-gray-400">your.email@example.com</div>
            </div>
          </a>

          <a
            href="https://linkedin.com/in/yourprofile"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors group"
          >
            <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-3 rounded-lg mr-4">
              <Linkedin className="h-5 w-5 text-white" />
            </div>
            <div>
              <div className="font-medium text-white group-hover:text-cyan-400 transition-colors">LinkedIn</div>
              <div className="text-gray-400">linkedin.com/in/yourprofile</div>
            </div>
          </a>

          <a
            href="https://github.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors group"
          >
            <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-3 rounded-lg mr-4">
              <Github className="h-5 w-5 text-white" />
            </div>
            <div>
              <div className="font-medium text-white group-hover:text-cyan-400 transition-colors">GitHub</div>
              <div className="text-gray-400">github.com/yourusername</div>
            </div>
          </a>

          <a
            href="tel:+1234567890"
            className="flex items-center p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors group"
          >
            <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-3 rounded-lg mr-4">
              <Phone className="h-5 w-5 text-white" />
            </div>
            <div>
              <div className="font-medium text-white group-hover:text-cyan-400 transition-colors">Phone</div>
              <div className="text-gray-400">(123) 456-7890</div>
            </div>
          </a>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-gray-800/50 rounded-xl p-6 border border-gray-700"
      >
        <h3 className="text-2xl font-bold text-white mb-4">Send a Message</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formState.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-white"
              placeholder="Your name"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formState.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-white"
              placeholder="your.email@example.com"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-1">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formState.message}
              onChange={handleChange}
              required
              rows={5}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-white resize-none"
              placeholder="Your message..."
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white rounded-lg flex items-center justify-center transition-colors"
          >
            <Send className="h-4 w-4 mr-2" />
            Send Message
          </button>
        </form>
      </motion.div>
    </div>
  )
}
