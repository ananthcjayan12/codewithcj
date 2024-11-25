import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export interface Project {
  id: string
  title: string
  description: string
  long_description?: string
  category: string
  tags: string[]
  slug: string
  icon?: string
  github_url?: string
  live_url?: string
  status: 'draft' | 'published'
  display_order: number
}

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function fetchProjects() {
      try {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .eq('status', 'published')
          .order('display_order', { ascending: true })

        if (error) throw error

        setProjects(data || [])
      } catch (e) {
        setError(e as Error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProjects()
  }, [])

  return { projects, isLoading, error }
} 