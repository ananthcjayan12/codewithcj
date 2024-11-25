"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"

// Modern color schemes inspired by ShipFast
const colorSchemes = [
  {
    background: "bg-gradient-to-br from-yellow-100/80 via-yellow-50 to-orange-50",
    accent: "bg-gradient-to-r from-yellow-400 to-orange-500",
    text: "text-orange-600",
    border: "border-orange-100",
    hover: "hover:border-orange-200",
  },
  {
    background: "bg-gradient-to-br from-blue-100/80 via-blue-50 to-cyan-50",
    accent: "bg-gradient-to-r from-blue-500 to-cyan-500",
    text: "text-blue-600",
    border: "border-blue-100",
    hover: "hover:border-blue-200",
  },
  {
    background: "bg-gradient-to-br from-purple-100/80 via-purple-50 to-pink-50",
    accent: "bg-gradient-to-r from-purple-500 to-pink-500",
    text: "text-purple-600",
    border: "border-purple-100",
    hover: "hover:border-purple-200",
  },
  {
    background: "bg-gradient-to-br from-green-100/80 via-green-50 to-emerald-50",
    accent: "bg-gradient-to-r from-green-500 to-emerald-500",
    text: "text-emerald-600",
    border: "border-green-100",
    hover: "hover:border-green-200",
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
        whileHover={{ y: -5, scale: 1.02 }}
        className={`group relative overflow-hidden rounded-2xl border-2 ${colorScheme.border} ${colorScheme.hover} ${colorScheme.background} p-6 transition-all duration-300 hover:shadow-xl`}
      >
        <div className="space-y-4">
          {/* Category Tag */}
          <div className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${colorScheme.accent} text-white shadow-sm`}>
            {project.category}
          </div>

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
                className="inline-block rounded-full px-2.5 py-0.5 text-xs font-medium text-gray-600 bg-white/80 backdrop-blur-sm border border-gray-100"
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