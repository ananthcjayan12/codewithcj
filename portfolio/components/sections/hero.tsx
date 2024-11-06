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
    href: "https://github.com/ananthuuu",
    icon: Github,
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/ananthcjayan",
    icon: Linkedin,
  },
  {
    name: "Email",
    href: "mailto:ananthcjayan@gmail.com",
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
          className="flex flex-col items-center gap-8"
        >
          {/* Profile Image */}
          <div className="relative h-40 w-40 sm:h-48 sm:w-48">
            <OptimizedImage
              src="/profile.jpg" // Make sure to add your profile picture in the public folder
              alt="Ananth C Jayan"
              width={192}
              height={192}
              className="rounded-full border-4 border-primary/10 shadow-xl"
              priority
            />
          </div>

          {/* Name and Role */}
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              {personalInfo.name}
            </h1>
            <p className="text-xl text-muted-foreground sm:text-2xl font-medium">
              {personalInfo.role}
            </p>
          </div>

          {/* Summary */}
          <div className="max-w-[65ch] space-y-4">
            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
              {personalInfo.summary}
            </p>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              {personalInfo.longSummary}
            </p>
          </div>
        </motion.div>

        {/* Call to Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12 flex flex-col sm:flex-row gap-4"
        >
          <Link
            href="/projects"
            className="inline-flex items-center justify-center rounded-lg bg-primary px-8 py-3 text-lg font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            View Projects
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-lg border bg-background px-8 py-3 text-lg font-medium transition-colors hover:bg-accent"
          >
            Get in Touch
          </Link>
        </motion.div>

        {/* Social Links */}
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