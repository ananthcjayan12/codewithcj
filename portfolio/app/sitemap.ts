import { MetadataRoute } from 'next'
import { projects } from '@/data/portfolio-data'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'

export const runtime = "edge"

export default function sitemap(): MetadataRoute.Sitemap {
  // Get all project slugs
  const projectUrls = projects.map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  // Define static routes
  const routes = [
    '',
    '/about',
    '/projects',
    '/contact',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 1.0,
  }))

  return [...routes, ...projectUrls]
} 