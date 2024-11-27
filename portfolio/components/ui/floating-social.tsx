"use client"

import { motion } from "framer-motion"
import { Github, Linkedin, Twitter, Mail } from "lucide-react"
import { useState } from "react"
import { BsWhatsapp } from 'react-icons/bs'

interface FloatingSocialProps {
  data: {
    social_links?: {
      twitter?: string
      linkedin?: string
      github?: string
    }
    contact_email?: string | null
    contact_phone?: string | null
  }
}

export function FloatingSocial({ data }: FloatingSocialProps) {
  const [isOpen, setIsOpen] = useState(false)

  // Create social links array including contact methods from data
  const socialLinks = [
    // Social Media Links
    ...(data?.social_links?.github ? [{
      name: "GitHub",
      icon: Github,
      href: data.social_links.github,
      color: "hover:bg-gray-800"
    }] : []),
    ...(data?.social_links?.linkedin ? [{
      name: "LinkedIn",
      icon: Linkedin,
      href: data.social_links.linkedin,
      color: "hover:bg-blue-600"
    }] : []),
    ...(data?.social_links?.twitter ? [{
      name: "Twitter",
      icon: Twitter,
      href: data.social_links.twitter,
      color: "hover:bg-blue-400"
    }] : []),
    
    // WhatsApp (if contact_phone exists)
    ...(data?.contact_phone ? [{
      name: "WhatsApp",
      icon: BsWhatsapp,
      href: `https://wa.me/${data.contact_phone.replace(/\D/g, '')}`,
      color: "hover:bg-green-600"
    }] : []),
    
    // Email (if contact_email exists)
    ...(data?.contact_email ? [{
      name: "Email",
      icon: Mail,
      href: `mailto:${data.contact_email}`,
      color: "hover:bg-red-600"
    }] : [])
  ].filter(Boolean)

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
          {socialLinks.map((link) => {
            const Icon = link.icon
            return (
              <motion.a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-3 rounded-full bg-white shadow-lg text-gray-600 transition-colors ${link.color} hover:text-white`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon className="w-5 h-5" />
              </motion.a>
            )
          })}
        </motion.div>

        {/* Toggle Button */}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="p-4 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg hover:shadow-orange-500/25 transition-all duration-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <BsWhatsapp className="w-6 h-6" />
        </motion.button>
      </motion.div>
    </div>
  )
} 