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
  console.log('Fetching project with slug:', slug)
  
  const { data: project, error } = await supabase
    .from('projects')
    .select(`
      id,
      title,
      description,
      long_description,
      icon,
      featured_image,
      tags,
      category,
      slug,
      status,
      technical_details,
      key_features,
      challenges,
      solutions,
      github_url,
      live_url,
      created_at
    `)
    .eq('slug', slug)
    .eq('status', 'published')
    .single()

  console.log('Raw project data:', project)

  if (error) {
    console.error('Error fetching project:', error)
    throw error
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

export async function getBlogPost(slug: string) {
  console.log('Fetching blog post with slug:', slug)
  
  const { data: post, error } = await supabase
    .from('blog_posts')
    .select(`
      id,
      title,
      slug,
      content,
      excerpt,
      featured_image,
      tags,
      status,
      created_at
    `)
    .eq('slug', slug)
    .eq('status', 'published')
    .single()

  console.log('Raw blog post data:', post)

  if (error) {
    console.error('Error fetching blog post:', error)
    throw error
  }

  if (!post) {
    throw new Error('Blog post not found')
  }

  return post
}

export async function getBlogPosts() {
  const { data: posts, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('status', 'published')
    .order('created_at', { ascending: false })

  console.log('Blog posts data:', posts)

  if (error) {
    console.error('Error fetching blog posts:', error)
    throw new Error('Failed to fetch blog posts')
  }

  return posts || []
} 