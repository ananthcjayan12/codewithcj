import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { cache } from 'react'

// Cache the Supabase client creation
const createServerClient = cache(() => {
  return createServerComponentClient({ cookies })
})

export async function getProjects() {
  const supabase = createServerClient()
  
  try {
    const { data, error } = await supabase
      .from('projects')
      .select(`
        id,
        title,
        description,
        long_description,
        icon,
        tags,
        category,
        slug,
        status
      `)
      .eq('status', 'published')
      .order('display_order', { ascending: true })
    
    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Error fetching projects:', error)
    return []
  }
}

export const getProject = cache(async (slug: string) => {
  const supabase = createServerClient()
  
  try {
    const { data, error } = await supabase
      .from('projects')
      .select(`
        id,
        title,
        description,
        long_description,
        icon,
        tags,
        category,
        technical_details,
        key_features,
        challenges,
        solutions,
        github_url,
        live_url,
        status
      `)
      .eq('slug', slug)
      .eq('status', 'published')
      .single()
    
    if (error) throw error
    return data
  } catch (error) {
    console.error('Error fetching project:', error)
    return null
  }
}) 