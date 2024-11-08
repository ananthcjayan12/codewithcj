import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

// Create a Supabase client with service role
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

// Helper function to verify API key
const verifyApiKey = (request: Request) => {
  const apiKey = request.headers.get('x-api-key')
  return apiKey === process.env.API_SECRET_KEY
}

export async function GET() {
  try {
    // Get home content
    const { data: homeContent, error: homeError } = await supabase
      .from('home_content')
      .select('*')
      .single()

    if (homeError) throw homeError

    // If featured projects exist, fetch their details
    if (homeContent?.featured_project_ids?.length > 0) {
      const { data: featuredProjects, error: projectsError } = await supabase
        .from('projects')
        .select('*')
        .in('id', homeContent.featured_project_ids)
        .eq('status', 'published')
        .order('display_order', { ascending: true })

      if (projectsError) throw projectsError

      // Combine home content with featured projects
      return NextResponse.json({
        ...homeContent,
        featured_projects: featuredProjects
      })
    }

    return NextResponse.json(homeContent)
  } catch (error) {
    console.error('Error fetching home content:', error)
    return new NextResponse(
      JSON.stringify({ error: 'Error fetching home content' }), 
      { status: 500 }
    )
  }
}

export async function PUT(request: Request) {
  try {
    if (!verifyApiKey(request)) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const body = await request.json()

    // Validate featured project IDs exist
    if (body.featured_project_ids?.length > 0) {
      const { data: projects, error: projectsError } = await supabase
        .from('projects')
        .select('id')
        .in('id', body.featured_project_ids)

      if (projectsError) throw projectsError

      // Check if all project IDs are valid
      const validIds = projects.map(p => p.id)
      const invalidIds = body.featured_project_ids.filter((id: string) => !validIds.includes(id))

      if (invalidIds.length > 0) {
        return new NextResponse(
          JSON.stringify({ error: `Invalid project IDs: ${invalidIds.join(', ')}` }), 
          { status: 400 }
        )
      }
    }

    const { data, error } = await supabase
      .from('home_content')
      .upsert({
        ...body,
        updated_at: new Date().toISOString()
      })
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error updating home content:', error)
    return new NextResponse(
      JSON.stringify({ error: 'Error updating home content' }), 
      { status: 500 }
    )
  }
} 