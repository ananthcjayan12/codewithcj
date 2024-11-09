import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'
import { projectFormSchema } from '@/lib/validations/project'

export const runtime = 'edge'

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

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const category = searchParams.get('category')
    const tag = searchParams.get('tag')
    
    let query = supabase
      .from('projects')
      .select('*')
      .order('display_order', { ascending: true })

    if (status) {
      query = query.eq('status', status)
    }

    if (category) {
      query = query.eq('category', category)
    }

    if (tag) {
      query = query.contains('tags', [tag])
    }

    const { data, error } = await query

    if (error) throw error

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching projects:', error)
    return new NextResponse(
      JSON.stringify({ error: 'Error fetching projects' }), 
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    if (!verifyApiKey(request)) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const body = await request.json()

    // Validate request body
    const validatedData = projectFormSchema.parse(body)
    
    // Create slug from title if not provided
    const slug = validatedData.slug || validatedData.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '')

    // Prepare project data
    const projectData = {
      ...validatedData,
      slug,
      updated_at: new Date().toISOString(),
      created_at: new Date().toISOString(),
    }

    const { data, error } = await supabase
      .from('projects')
      .insert([projectData])
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(data, { status: 201 })
  } catch (error) {
    console.error('Error creating project:', error)
    if (error instanceof Error) {
      return new NextResponse(
        JSON.stringify({ error: error.message }), 
        { status: 400 }
      )
    }
    return new NextResponse(
      JSON.stringify({ error: 'Error creating project' }), 
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
    const { id, ...updateData } = body

    if (!id) {
      return new NextResponse('Project ID is required', { status: 400 })
    }

    // Validate request body
    const validatedData = projectFormSchema.parse(updateData)

    // Update slug if title changes and slug is not provided
    if (validatedData.title && !validatedData.slug) {
      validatedData.slug = validatedData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '')
    }

    const { data, error } = await supabase
      .from('projects')
      .update({
        ...validatedData,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error updating project:', error)
    if (error instanceof Error) {
      return new NextResponse(
        JSON.stringify({ error: error.message }), 
        { status: 400 }
      )
    }
    return new NextResponse(
      JSON.stringify({ error: 'Error updating project' }), 
      { status: 500 }
    )
  }
}

export async function DELETE(request: Request) {
  try {
    if (!verifyApiKey(request)) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return new NextResponse('Project ID is required', { status: 400 })
    }

    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id)

    if (error) throw error

    return new NextResponse(null, { status: 204 })
  } catch (error) {
    console.error('Error deleting project:', error)
    return new NextResponse(
      JSON.stringify({ error: 'Error deleting project' }), 
      { status: 500 }
    )
  }
} 