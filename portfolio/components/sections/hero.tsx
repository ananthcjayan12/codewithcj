"use client"

import { motion } from "framer-motion"
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react"
import Link from "next/link"
import { OptimizedImage } from "@/components/ui/optimized-image"
import { personalInfo } from "@/data/portfolio-data"
import { container, section } from "@/lib/utils"

const socialLinks = [
  {
    name: "GitHub",
    href: "https://github.com/yourusername",
    icon: Github,
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/yourusername",
    icon: Linkedin,
  },
  {
    name: "Email",
    href: "mailto:your@email.com",
    icon: Mail,
  },
]

export function HeroSection() {
  return (
    <section className={section}>
      <div className={`${container} flex flex-col items-center text-center`}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center space-y-8"
        >
          <div className="relative h-32 w-32 sm:h-40 sm:w-40 lg:h-48 lg:w-48">
            <OptimizedImage
              src="/avatar.jpg"
              alt="Profile picture"
              width={192}
              height={192}
              className="rounded-full border-4 border-foreground/10 shadow-lg"
              priority
            />
          </div>

          <div className="space-y-4">
            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold">
              Hi, I'm <span className="text-primary">{personalInfo.name}</span>
            </h1>
            <p className="text-xl sm:text-2xl font-medium text-muted-foreground">
              {personalInfo.role}
            </p>
          </div>

          <div className="max-w-[65ch] space-y-4">
            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
              {personalInfo.summary}
            </p>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              {personalInfo.longSummary}
            </p>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12 flex flex-col sm:flex-row gap-4"
        >
          <Link
            href="/projects"
            className="inline-flex items-center justify-center rounded-lg bg-primary px-8 py-3 text-base font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            View Projects
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
          
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-lg border border-input bg-background px-8 py-3 text-base font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            Contact Me
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 flex gap-6"
        >
          {socialLinks.map((link) => {
            const Icon = link.icon
            return (
              <Link
                key={link.name}
                href={link.href}
                className="rounded-full p-3 transition-colors hover:bg-accent hover:text-accent-foreground"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon className="h-6 w-6 sm:h-7 sm:w-7" />
                <span className="sr-only">{link.name}</span>
              </Link>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
} 