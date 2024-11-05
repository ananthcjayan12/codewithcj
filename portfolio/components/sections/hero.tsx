"use client"

import { motion } from "framer-motion"
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { personalInfo } from "@/data/portfolio-data"

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
    <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
      <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center gap-4"
        >
          <Image
            src="/avatar.jpg"
            alt="Profile picture"
            width={150}
            height={150}
            className="rounded-full border-4 border-foreground/10"
            priority
          />
          <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
            Hi, I'm <span className="text-primary">{personalInfo.name}</span>
          </h1>
          <p className="text-2xl font-semibold text-muted-foreground">
            {personalInfo.role}
          </p>
          <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            {personalInfo.summary}
          </p>
          <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-lg">
            {personalInfo.longSummary}
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex gap-4"
        >
          <Link
            href="/projects"
            className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            View Projects
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
          
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-6 py-3 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            Contact Me
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex gap-4"
        >
          {socialLinks.map((link) => {
            const Icon = link.icon
            return (
              <Link
                key={link.name}
                href={link.href}
                className="rounded-full p-2 transition-colors hover:bg-accent hover:text-accent-foreground"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon className="h-5 w-5" />
                <span className="sr-only">{link.name}</span>
              </Link>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
} 