import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export async function getProjects() {
  const supabase = createServerComponentClient({ cookies })
  
  console.log('Fetching projects from Supabase...')
  
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('status', 'published')
      .order('display_order', { ascending: true })
    
    console.log('Projects fetch result:', { data, error })
    
    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Error fetching projects:', error)
    return []
  }
}

export async function getProject(slug: string) {
  const supabase = createServerComponentClient({ cookies })
  
  try {
    const { data, error } = await supabase
      .from('projects')
      .select(`
        *
      `)
      .eq('slug', slug)
      .single()
    
    if (error) throw error
    return data
  } catch (error) {
    console.error('Error fetching project:', error)
    return null
  }
} 