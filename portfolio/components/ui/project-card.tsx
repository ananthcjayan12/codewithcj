"use client"

import { motion } from "framer-motion"
import { OptimizedImage } from "@/components/ui/optimized-image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

interface ProjectCardProps {
  title: string
  description: string
  image: string
  tags: string[]
  slug: string
}

export function ProjectCard({
  title,
  description,
  image,
  tags,
  slug,
}: ProjectCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="group relative overflow-hidden rounded-lg border bg-background p-2 transition-colors hover:bg-accent/50"
    >
      <Link href={`/projects/${slug}`} className="block">
        <div className="aspect-video overflow-hidden rounded-md">
          <OptimizedImage
            src={image}
            alt={title}
            width={600}
            height={400}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="p-4">
          <h3 className="line-clamp-1 text-xl font-semibold group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
            {description}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium transition-colors group-hover:bg-secondary/80"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="mt-4 flex items-center text-sm text-muted-foreground">
            Learn more
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </Link>
    </motion.div>
  )
} 