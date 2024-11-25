"use client"

import { motion } from 'framer-motion'
import { container } from '@/lib/utils'
import { useAbout } from '@/hooks/use-about'
import { ChevronRight } from 'lucide-react'

export function AboutSection() {
  const { about, isLoading, error } = useAbout()

  if (isLoading) {
    return <div className={container}>Loading about content...</div>
  }

  if (error) {
    return <div className={container}>Error loading about content: {error.message}</div>
  }

  return (
    <div className={container}>
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">
            About Me
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-indigo-600 to-violet-600 mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column - Bio */}
          <div className="lg:col-span-7">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="prose prose-lg max-w-none"
            >
              <p className="text-gray-600 leading-relaxed">{about?.bio}</p>
            </motion.div>
          </div>

          {/* Right Column - Skills */}
          <div className="lg:col-span-5">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Technical Skills</h3>
              <div className="grid grid-cols-2 gap-3">
                {about?.skills?.technical?.map((skill, index) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-2 text-gray-600 text-sm"
                  >
                    <ChevronRight className="w-4 h-4 text-indigo-600" />
                    <span>{skill}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Experience & Education */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-16">
          {/* Experience */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-xl font-semibold text-gray-900 pb-2 border-b border-gray-200">
              Experience
            </h3>
            {about?.experience?.map((exp, index) => (
              <div 
                key={index}
                className="relative pl-6 border-l-2 border-indigo-100 py-4"
              >
                <div className="absolute left-[-5px] top-6 w-2 h-2 rounded-full bg-indigo-600" />
                <h4 className="text-lg font-medium text-gray-900">{exp.role}</h4>
                <p className="text-indigo-600 font-medium">{exp.company}</p>
                <p className="text-sm text-gray-500 mt-1">{exp.period}</p>
              </div>
            ))}
          </motion.div>

          {/* Education */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-xl font-semibold text-gray-900 pb-2 border-b border-gray-200">
              Education
            </h3>
            {about?.education?.map((edu, index) => (
              <div 
                key={index}
                className="relative pl-6 border-l-2 border-indigo-100 py-4"
              >
                <div className="absolute left-[-5px] top-6 w-2 h-2 rounded-full bg-indigo-600" />
                <h4 className="text-lg font-medium text-gray-900">{edu.degree}</h4>
                <p className="text-indigo-600 font-medium">{edu.school}</p>
                <p className="text-sm text-gray-500 mt-1">{edu.period}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  )
} 