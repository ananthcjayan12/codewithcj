"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { container } from "@/lib/utils"
import { ArrowRight } from "lucide-react"

interface HeroSectionProps {
  data: {
    name: string
    role: string
    summary: string
    avatar_url: string
  }
}

export function HeroSection({ data }: HeroSectionProps) {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      <div className={`${container} relative z-10`}>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left space-y-8">
            {/* Profile Image for Mobile */}
            <div className="lg:hidden flex justify-center mb-8">
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-2xl opacity-20" />
                {data?.avatar_url && (
                  <Image
                    src={data.avatar_url}
                    alt={data.name}
                    width={200}
                    height={200}
                    className="rounded-full border-4 border-white shadow-xl relative z-10"
                  />
                )}
              </motion.div>
            </div>

            {/* Name and Title */}
            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-5xl lg:text-7xl font-bold tracking-tight bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent"
              >
                {data?.name || 'Your Name'}
              </motion.h1>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex flex-wrap justify-center lg:justify-start gap-4 text-xl lg:text-2xl font-medium"
              >
                <span className="text-blue-600">Backend Engineer</span>
                <span className="text-purple-600">Automation Specialist</span>
                <span className="text-indigo-600">AI Enthusiast</span>
              </motion.div>
            </div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto lg:mx-0"
            >
              {data?.summary || 'Welcome to my innovation journey...'}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap gap-4 justify-center lg:justify-start"
            >
              <a
                href="#projects"
                className="group px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full font-medium inline-flex items-center hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 hover:-translate-y-0.5"
              >
                View Projects
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#contact"
                className="px-8 py-3 bg-white/90 backdrop-blur-sm text-gray-900 rounded-full font-medium border border-gray-200 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
              >
                Get in Touch
              </a>
            </motion.div>
          </div>

          {/* Profile Image for Desktop */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="hidden lg:block relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-[2rem] blur-3xl opacity-20" />
            {data?.avatar_url && (
              <Image
                src={data.avatar_url}
                alt={data.name}
                width={500}
                height={500}
                className="rounded-[2rem] border-8 border-white shadow-2xl relative z-10"
                priority
              />
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
} 