"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { container } from '@/lib/utils'
import { ProjectCard } from '@/components/ui/project-card'
import { useProjects } from '@/hooks/use-projects'
import type { Project } from '@/hooks/use-projects'

const categories = ['All', 'Frontend', 'Backend', 'Full Stack', 'AI/ML', 'Mobile'] as const
type Category = typeof categories[number] | 'All'

export function ProjectsSection() {
  const { projects, isLoading, error } = useProjects()
  const [activeCategory, setActiveCategory] = useState<Category>('All')

  const filteredProjects = projects.filter((project: Project) => 
    activeCategory === 'All' || project.category === activeCategory
  )

  if (isLoading) {
    return (
      <div className={container}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="h-64 bg-gray-200 rounded-2xl" />
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return <div className={container}>Error loading projects: {error.message}</div>
  }

  return (
    <div className={container}>
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-white dark:via-gray-200 dark:to-white">
          Featured Projects
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          A collection of my best work, showcasing my skills and experience in different areas.
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
              activeCategory === category
                ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-lg shadow-orange-500/30'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <AnimatePresence mode="wait">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          layout
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ delay: index * 0.1 }}
            >
              <ProjectCard project={project} index={index} />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <p className="text-lg text-gray-600">No projects found in this category.</p>
        </div>
      )}
    </div>
  )
} 