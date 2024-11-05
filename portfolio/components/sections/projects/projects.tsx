"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ProjectCard } from "@/components/ui/project-card"
import { projects } from "@/data/portfolio-data"

const categories = ["All", "Automation", "AI", "Business", "Finance"]

export function ProjectsSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All")

  const filteredProjects = selectedCategory === "All"
    ? projects
    : projects.filter((project) => project.category === selectedCategory)

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-4"
      >
        <h1 className="text-3xl font-bold">Projects & Solutions</h1>
        <p className="text-muted-foreground max-w-2xl">
          Explore my portfolio of automation, AI, and full-stack development projects. 
          Each project demonstrates my commitment to creating efficient, scalable solutions.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex flex-wrap gap-2"
      >
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              selectedCategory === category
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            }`}
          >
            {category}
          </button>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        {filteredProjects.map((project) => (
          <ProjectCard
            key={project.slug}
            title={project.title}
            description={project.description}
            image={project.image}
            tags={project.tags}
            slug={project.slug}
          />
        ))}
      </motion.div>

      {filteredProjects.length === 0 && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-muted-foreground"
        >
          No projects found in this category.
        </motion.p>
      )}
    </div>
  )
} 