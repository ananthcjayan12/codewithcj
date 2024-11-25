"use client"

import { motion } from "framer-motion"
import { Github, Linkedin, Mail, MessageCircle } from "lucide-react"
import { useState } from "react"

export function FloatingSocial() {
  const [isOpen, setIsOpen] = useState(false)

  const socialLinks = [
    {
      name: "GitHub",
      icon: Github,
      href: "https://github.com/yourusername",
      color: "hover:bg-gray-800"
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      href: "https://linkedin.com/in/yourusername",
      color: "hover:bg-blue-600"
    },
    {
      name: "Email",
      icon: Mail,
      href: "mailto:your@email.com",
      color: "hover:bg-red-600"
    }
  ]

  return (
    <div className="fixed right-6 bottom-6 z-50">
      <motion.div className="flex flex-col items-end gap-4">
        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ 
            opacity: isOpen ? 1 : 0, 
            scale: isOpen ? 1 : 0.5,
            y: isOpen ? 0 : 20 
          }}
          className="flex flex-col gap-4"
        >
          {socialLinks.map((link) => (
            <motion.a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`p-3 rounded-full bg-white shadow-lg text-gray-600 transition-colors ${link.color} hover:text-white`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <link.icon className="w-5 h-5" />
            </motion.a>
          ))}
        </motion.div>

        {/* Toggle Button */}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="p-4 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <MessageCircle className="w-6 h-6" />
        </motion.button>
      </motion.div>
    </div>
  )
} 