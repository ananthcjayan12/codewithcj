import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

interface Education {
  degree: string
  school: string
  period: string
}

interface Experience {
  role: string
  company: string
  period: string
}

interface About {
  title: string
  bio: string
  skills: {
    technical?: string[]
    soft?: string[]
    tools?: string[]
  }
  experience: Experience[]
  education: Education[]
  achievements: string[]
}

export function useAbout() {
  const [about, setAbout] = useState<About | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function fetchAbout() {
      try {
        const { data, error } = await supabase
          .from('about_content')
          .select('*')
          .single()

        if (error) throw error

        // Ensure skills is an object with arrays
        const formattedData = {
          ...data,
          skills: typeof data.skills === 'object' ? data.skills : {},
          experience: Array.isArray(data.experience) ? data.experience : [],
          education: Array.isArray(data.education) ? data.education : [],
          achievements: Array.isArray(data.achievements) ? data.achievements : []
        }

        setAbout(formattedData)
      } catch (e) {
        setError(e as Error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchAbout()
  }, [])

  return { about, isLoading, error }
} 