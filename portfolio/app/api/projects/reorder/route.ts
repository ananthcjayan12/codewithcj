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

export async function POST(request: Request) {
  try {
    if (!verifyApiKey(request)) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const body = await request.json()
    const { items } = body

    if (!Array.isArray(items)) {
      return new NextResponse('Invalid request body', { status: 400 })
    }

    // Update each project's display order
    for (const item of items) {
      const { error } = await supabase
        .from('projects')
        .update({ display_order: item.display_order })
        .eq('id', item.id)

      if (error) throw error
    }

    return new NextResponse(null, { status: 204 })
  } catch (error) {
    console.error('Error reordering projects:', error)
    return new NextResponse(
      JSON.stringify({ error: 'Error reordering projects' }), 
      { status: 500 }
    )
  }
} 