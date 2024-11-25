"use client"

import { motion } from 'framer-motion'
import { container } from '@/lib/utils'
import { useAbout } from '@/hooks/use-about'
import { 
  Code2, 
  Cpu,
  Wrench,
  ChevronRight 
} from 'lucide-react'

export function AboutSection() {
  const { about, isLoading, error } = useAbout()

  if (isLoading) {
    return <div className={container}>Loading about content...</div>
  }

  if (error) {
    return <div className={container}>Error loading about content: {error.message}</div>
  }

  const skillCategories = [
    { name: 'Technical', icon: Code2, skills: about?.skills?.technical || [] },
    { name: 'Tools', icon: Wrench, skills: about?.skills?.tools || [] },
    { name: 'Soft Skills', icon: Cpu, skills: about?.skills?.soft || [] },
  ]

  return (
    <div className={container}>
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20"
        >
          {/* Left Column - Summary */}
          <div className="space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
              About Me
            </h2>
            <div className="prose prose-lg">
              <p>{about?.bio}</p>
            </div>
            
            {/* Skills Grid */}
            <div className="space-y-6">
              {skillCategories.map((category, categoryIndex) => (
                <div key={category.name} className="space-y-3">
                  <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-900">
                    <category.icon className="w-5 h-5 text-blue-600" />
                    {category.name}
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {category.skills.map((skill, index) => (
                      <motion.div
                        key={skill}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center gap-2 text-gray-600"
                      >
                        <ChevronRight className="w-4 h-4 text-blue-600" />
                        <span>{skill}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Experience & Education */}
          <div className="space-y-12">
            {/* Experience */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900">Experience</h3>
              {about?.experience?.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative pl-8 border-l-2 border-gray-200 py-4"
                >
                  <div className="absolute left-[-9px] top-6 w-4 h-4 rounded-full bg-blue-600" />
                  <h4 className="text-lg font-semibold text-gray-900">{exp.role}</h4>
                  <p className="text-gray-600">{exp.company}</p>
                  <p className="text-sm text-gray-500">{exp.period}</p>
                </motion.div>
              ))}
            </div>

            {/* Education */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900">Education</h3>
              {about?.education?.map((edu, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative pl-8 border-l-2 border-gray-200 py-4"
                >
                  <div className="absolute left-[-9px] top-6 w-4 h-4 rounded-full bg-blue-600" />
                  <h4 className="text-lg font-semibold text-gray-900">{edu.degree}</h4>
                  <p className="text-gray-600">{edu.school}</p>
                  <p className="text-sm text-gray-500">{edu.period}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
} 