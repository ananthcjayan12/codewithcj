"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { 
  ArrowRight, 
  Code2, 
  Database, 
  Bot, 
  LineChart, 
  MessageSquare, 
  QrCode, 
  FileText, 
  Video, 
  BarChart,
  Cog,
  Brain,
  Building2,
  Workflow,
  type LucideIcon
} from "lucide-react"

interface ProjectCardProps {
  title: string
  description: string
  tags: readonly string[]
  slug: string
  icon: keyof typeof iconMap
}

const iconMap: Record<string, LucideIcon> = {
  code: Code2,
  database: Database,
  bot: Bot,
  chart: LineChart,
  message: MessageSquare,
  qr: QrCode,
  file: FileText,
  video: Video,
  bar: BarChart,
  automation: Cog,
  ai: Brain,
  erp: Building2,
  workflow: Workflow,
}

export function ProjectCard({
  title,
  description,
  tags,
  slug,
  icon,
}: ProjectCardProps) {
  const IconComponent = iconMap[icon] || Code2

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="group relative overflow-hidden rounded-lg border bg-background p-6 transition-colors hover:bg-accent/50"
    >
      <Link href={`/projects/${slug}`} className="block">
        <div className="mb-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
            <IconComponent className="h-6 w-6 text-primary" />
          </div>
        </div>
        <div>
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