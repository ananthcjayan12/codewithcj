"use client"

import { motion } from "framer-motion"
import { container } from "@/lib/utils"

export function AboutSection() {
  return (
    <section id="about" className="py-20 relative">
      {/* Background with subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />
      </div>

      <div className={`${container} relative`}>
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Header */}
          <div className="text-center space-y-4">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white"
            >
              About Me
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
            >
              Welcome to my innovation journey, where I integrate creative problem-solving with technical excellence...
            </motion.p>
          </div>

          {/* Technical Skills Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 shadow-sm">
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">Technical Skills</h3>
              <div className="grid grid-cols-2 gap-4">
                {/* Left Column */}
                <div className="space-y-3">
                  {['Python', 'JavaScript', 'React', 'Node.js', 'Django', 'MongoDB'].map((skill) => (
                    <div key={skill} className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-blue-500" />
                      <span className="text-gray-700 dark:text-gray-300">{skill}</span>
                    </div>
                  ))}
                </div>
                {/* Right Column */}
                <div className="space-y-3">
                  {['AWS', 'Docker', 'Git', 'SQL', 'TypeScript', 'Next.js'].map((skill) => (
                    <div key={skill} className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-blue-500" />
                      <span className="text-gray-700 dark:text-gray-300">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Additional Skills or Info */}
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">Specializations</h3>
              <div className="space-y-4">
                {[
                  'Full Stack Development',
                  'Cloud Architecture',
                  'DevOps & Automation',
                  'AI/ML Integration'
                ].map((spec) => (
                  <div key={spec} className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-500" />
                    <span className="text-gray-700 dark:text-gray-300">{spec}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 