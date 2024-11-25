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
    <section className="relative min-h-[90vh] flex items-center overflow-hidden pt-20 md:pt-24">
      <div className={`${container} relative z-10`}>
        <div className="max-w-5xl mx-auto text-center space-y-6 md:space-y-8 px-4">
          {/* Profile Image - Fixed size and consistent positioning */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative inline-block mb-2 md:mb-4"
          >
            {/* Glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-orange-500/50 to-yellow-500/50 rounded-full opacity-75 blur-md" />
            
            {/* Fixed size container */}
            <div className="relative w-[100px] h-[100px] overflow-hidden rounded-full border-4 border-white shadow-xl">
              {data?.avatar_url && (
                <Image
                  src={data.avatar_url}
                  alt={data.name}
                  width={100}
                  height={100}
                  className="object-cover"
                  priority
                />
              )}
            </div>
          </motion.div>

          {/* Welcome Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center px-3 py-1 rounded-full bg-orange-100 text-orange-600 text-sm font-medium"
          >
            <span className="flex h-2 w-2 rounded-full bg-orange-500 mr-2" />
            Welcome to my portfolio
          </motion.div>

          {/* Name and Title */}
          <div className="space-y-4">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight px-4"
            >
              Hi, I'm{' '}
              <div className="relative inline-block mt-2 md:mt-0">
                <span className="relative z-10 text-white px-2 py-1 whitespace-nowrap">
                  {data?.name || 'Your Name'}
                </span>
                <div 
                  className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-600 transform -rotate-1 rounded-lg"
                  style={{ 
                    top: '-0.2em',
                    bottom: '-0.2em',
                    left: '-0.1em',
                    right: '-0.1em'
                  }}
                />
              </div>
            </motion.h1>

            {/* Roles */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap justify-center gap-2 md:gap-3 px-4"
            >
              {['Backend Engineer', 'Automation Specialist', 'AI Enthusiast'].map((role) => (
                <span
                  key={role}
                  className="px-3 py-1.5 md:px-4 md:py-1.5 text-sm md:text-base bg-gradient-to-r from-yellow-500/10 to-yellow-500/20 text-yellow-700 rounded-full font-medium border border-yellow-500/20"
                >
                  {role}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-base md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed px-4"
          >
            {data?.summary || 'Welcome to my innovation journey...'}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-3 justify-center px-4"
          >
            <a
              href="#projects"
              className="group px-6 md:px-8 py-3 bg-black text-white rounded-full font-medium inline-flex items-center justify-center hover:bg-gradient-to-r hover:from-yellow-500 hover:to-orange-500 transition-all duration-300"
            >
              <span className="relative flex items-center">
                View Projects
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </a>
            <a
              href="#contact"
              className="px-6 md:px-8 py-3 bg-white/90 backdrop-blur-sm ring-1 ring-black/5 hover:ring-orange-500/50 text-gray-900 rounded-full font-medium hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center"
            >
              Get in Touch
            </a>
          </motion.div>

          {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/50 backdrop-blur-sm border border-black/5 rounded-full text-sm text-gray-600"
          >
            <span className="flex h-2 w-2 rounded-full bg-green-500" />
            Available for new projects
          </motion.div>
        </div>
      </div>
    </section>
  )
} 