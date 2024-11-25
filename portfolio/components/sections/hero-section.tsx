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
    <section className="relative min-h-[90vh] flex items-center overflow-hidden pt-24">
      <div className={`${container} relative z-10`}>
        <div className="max-w-5xl mx-auto text-center space-y-8">
          {/* Small Profile Image */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative inline-block"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full opacity-75 blur" />
            {data?.avatar_url && (
              <div className="relative w-[80px] h-[80px]">
                <Image
                  src={data.avatar_url}
                  alt={data.name}
                  width={80}
                  height={80}
                  className="rounded-full border-2 border-white shadow-lg object-cover relative z-10"
                  priority
                />
              </div>
            )}
          </motion.div>

          {/* Main Content */}
          <div className="space-y-6">
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
                className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight"
              >
                Hi, I'm{' '}
                <span className="relative inline-block">
                  {data?.name || 'Your Name'}
                  <div className="absolute left-0 right-0 h-4 bg-gradient-to-r from-yellow-300 to-orange-300 opacity-50 bottom-2 -z-10 transform -rotate-1" />
                </span>
              </motion.h1>

              {/* Roles with Modern Badges */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex flex-wrap justify-center gap-3 text-lg"
              >
                <span className="px-4 py-1.5 bg-gradient-to-r from-yellow-500/10 to-yellow-500/20 text-yellow-700 rounded-full font-medium border border-yellow-500/20">
                  Backend Engineer
                </span>
                <span className="px-4 py-1.5 bg-gradient-to-r from-orange-500/10 to-orange-500/20 text-orange-700 rounded-full font-medium border border-orange-500/20">
                  Automation Specialist
                </span>
                <span className="px-4 py-1.5 bg-gradient-to-r from-red-500/10 to-red-500/20 text-red-700 rounded-full font-medium border border-red-500/20">
                  AI Enthusiast
                </span>
              </motion.div>
            </div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            >
              {data?.summary || 'Welcome to my innovation journey...'}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap gap-4 justify-center"
            >
              <a
                href="#projects"
                className="group px-8 py-3 bg-black text-white rounded-full font-medium inline-flex items-center hover:bg-gradient-to-r hover:from-yellow-500 hover:to-orange-500 transition-all duration-300"
              >
                <span className="relative flex items-center">
                  View Projects
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </a>
              <a
                href="#contact"
                className="px-8 py-3 bg-white/90 backdrop-blur-sm ring-1 ring-black/5 hover:ring-orange-500/50 text-gray-900 rounded-full font-medium hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
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
      </div>

      {/* Decorative Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-yellow-200/30 rounded-full mix-blend-multiply filter blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-orange-200/30 rounded-full mix-blend-multiply filter blur-3xl animate-float2" />
      </div>
    </section>
  )
} 