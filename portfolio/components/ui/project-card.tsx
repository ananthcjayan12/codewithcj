"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"

// Color combinations following 60-30-10 rule
const colorSchemes = [
  {
    background: "bg-gradient-to-br from-blue-50 to-blue-100",
    accent: "bg-blue-600",
    text: "text-blue-600",
    border: "border-blue-200",
    hover: "hover:border-blue-300",
  },
  {
    background: "bg-gradient-to-br from-purple-50 to-purple-100",
    accent: "bg-purple-600",
    text: "text-purple-600",
    border: "border-purple-200",
    hover: "hover:border-purple-300",
  },
  {
    background: "bg-gradient-to-br from-emerald-50 to-emerald-100",
    accent: "bg-emerald-600",
    text: "text-emerald-600",
    border: "border-emerald-200",
    hover: "hover:border-emerald-300",
  },
  {
    background: "bg-gradient-to-br from-orange-50 to-orange-100",
    accent: "bg-orange-600",
    text: "text-orange-600",
    border: "border-orange-200",
    hover: "hover:border-orange-300",
  },
]

interface ProjectCardProps {
  project: {
    id: string
    title: string
    description: string
    category: string
    tags: string[]
    slug?: string
  }
  index?: number
}

export function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  const colorScheme = colorSchemes[index % colorSchemes.length]
  const href = project?.slug ? `/projects/${project.slug}` : `/projects/${project.id}`

  return (
    <Link href={href}>
      <motion.div
        whileHover={{ y: -5 }}
        className={`group relative overflow-hidden rounded-2xl border-2 ${colorScheme.border} ${colorScheme.hover} ${colorScheme.background} p-6 transition-all duration-300`}
      >
        <div className="space-y-4">
          {/* Category Tag */}
          <span className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${colorScheme.text} bg-white/80 backdrop-blur-sm`}>
            {project.category}
          </span>

          {/* Title */}
          <h3 className="text-xl font-bold text-gray-900 group-hover:text-gray-700 transition-colors">
            {project.title}
          </h3>

          {/* Description */}
          <p className="text-gray-600 line-clamp-2">
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 pt-2">
            {project.tags?.map((tag) => (
              <span
                key={tag}
                className="inline-block rounded-full px-2.5 py-0.5 text-xs font-medium text-gray-600 bg-white/60 backdrop-blur-sm"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Arrow Icon */}
          <div className={`absolute top-6 right-6 p-2 rounded-full ${colorScheme.accent} text-white transform scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300`}>
            <ArrowUpRight className="w-4 h-4" />
          </div>
        </div>
      </motion.div>
    </Link>
  )
} 