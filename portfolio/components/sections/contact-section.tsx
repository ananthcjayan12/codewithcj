"use client"

import { motion } from "framer-motion"
import { container } from "@/lib/utils"
import { Twitter, Linkedin, Github, Mail } from "lucide-react"
import { BsWhatsapp } from 'react-icons/bs'

interface ContactSectionProps {
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

export function ContactSection({ data }: ContactSectionProps) {
  // Create social links array including contact methods from data
  const socialLinks = [
    // GitHub
    ...(data?.social_links?.github ? [{
      name: "GitHub",
      icon: Github,
      href: data.social_links.github,
      color: "bg-gray-900",
      hoverColor: "group-hover:bg-gray-900",
      textColor: "text-gray-900",
      description: "Check out my GitHub"
    }] : []),
    
    // LinkedIn
    ...(data?.social_links?.linkedin ? [{
      name: "LinkedIn",
      icon: Linkedin,
      href: data.social_links.linkedin,
      color: "bg-[#0A66C2]",
      hoverColor: "group-hover:bg-[#0A66C2]",
      textColor: "text-[#0A66C2]",
      description: "Connect on LinkedIn"
    }] : []),
    
    // Twitter
    ...(data?.social_links?.twitter ? [{
      name: "Twitter",
      icon: Twitter,
      href: data.social_links.twitter,
      color: "bg-[#1DA1F2]",
      hoverColor: "group-hover:bg-[#1DA1F2]",
      textColor: "text-[#1DA1F2]",
      description: "Follow me on Twitter"
    }] : []),
    
    // WhatsApp
    ...(data?.contact_phone ? [{
      name: "WhatsApp",
      icon: BsWhatsapp,
      href: `https://wa.me/${data.contact_phone.replace(/\D/g, '')}`,
      color: "bg-[#25D366]",
      hoverColor: "group-hover:bg-[#25D366]",
      textColor: "text-[#25D366]",
      description: "Chat on WhatsApp"
    }] : []),
    
    // Email
    ...(data?.contact_email ? [{
      name: "Email",
      icon: Mail,
      href: `mailto:${data.contact_email}`,
      color: "bg-[#EA4335]",
      hoverColor: "group-hover:bg-[#EA4335]",
      textColor: "text-[#EA4335]",
      description: "Send me an email"
    }] : [])
  ].filter(Boolean)

  return (
    <section id="contact" className="relative">
      <div className={container}>
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center space-y-4 mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl font-bold"
            >
              Get in Touch
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-gray-600 text-lg"
            >
              Feel free to reach out through any of these platforms
            </motion.p>
          </div>

          {/* Social Links Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {socialLinks.map((link) => {
              const Icon = link.icon
              return (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex flex-col items-center gap-4 p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                >
                  <div className={`p-4 rounded-full transition-colors bg-gray-50 ${link.textColor} ${link.hoverColor}`}>
                    <Icon className="w-6 h-6 group-hover:text-white transition-colors" />
                  </div>
                  <div className="text-center">
                    <h3 className={`font-medium ${link.textColor}`}>{link.name}</h3>
                    <p className="text-sm text-gray-600">{link.description}</p>
                  </div>
                  <div className="absolute inset-0 rounded-2xl transition-colors group-hover:bg-gray-50/50" />
                </a>
              )
            })}
          </motion.div>
        </div>
      </div>
    </section>
  )
} 