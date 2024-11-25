"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { container } from '@/lib/utils'
import { ProjectCard } from '@/components/ui/project-card'
import { useProjects } from '@/hooks/use-projects'

const categories = ['All', 'Frontend', 'Backend', 'Full Stack', 'AI/ML', 'Mobile']

export function ProjectsSection() {
  const { projects, isLoading, error } = useProjects()
  const [activeCategory, setActiveCategory] = useState('All')

  const filteredProjects = projects?.filter(project => 
    activeCategory === 'All' ? true : project.category === activeCategory
  )

  if (isLoading) {
    return <div className={container}>Loading projects...</div>
  }

  if (error) {
    return <div className={container}>Error loading projects: {error.message}</div>
  }

  return (
    <div className={container}>
      <div className="max-w-2xl mx-auto text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
          Featured Projects
        </h2>
        <p className="text-xl text-gray-600">
          A collection of my best work, showcasing my skills and experience in different areas.
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              activeCategory === category
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        layout
      >
        {filteredProjects?.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <ProjectCard project={project} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
} 