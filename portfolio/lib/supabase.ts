import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function getProjects() {
  const { data: projects, error } = await supabase
    .from('projects')
    .select('*')
    .eq('status', 'published')
    .order('display_order', { ascending: true })

  if (error) {
    console.error('Error fetching projects:', error)
    return []
  }

  return projects
}

export async function getAbout() {
  const { data: about, error } = await supabase
    .from('about_content')
    .select('*')
    .single()

  if (error) {
    console.error('Error fetching about content:', error)
    return null
  }

  return about
} 