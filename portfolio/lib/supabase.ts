import { createClient } from '@supabase/supabase-js'

// Create a Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
)

export async function getProject(slug: string) {
  const { data: project, error } = await supabase
    .from('projects')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error) {
    console.error('Error fetching project:', error)
    throw new Error('Failed to fetch project')
  }

  if (!project) {
    throw new Error('Project not found')
  }

  return project
}

export async function getProjects() {
  const { data: projects, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching projects:', error)
    throw new Error('Failed to fetch projects')
  }

  return projects || []
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