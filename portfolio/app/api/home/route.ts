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
  return apiKey === 'portfolio-api-key-123'
}

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('home_content')
      .select('*')
      .single()

    if (error) throw error

    return NextResponse.json(data)
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
      console.error('API key verification failed')
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const body = await request.json()
    console.log('Updating home content with:', body) // Debug log

    const { data, error } = await supabase
      .from('home_content')
      .upsert({
        ...body,
        updated_at: new Date().toISOString()
      })
      .select()
      .single()

    if (error) {
      console.error('Supabase error:', error) // Debug log
      throw error
    }

    console.log('Updated home content:', data) // Debug log
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error updating home content:', error)
    return new NextResponse(
      JSON.stringify({ error: 'Error updating home content' }), 
      { status: 500 }
    )
  }
} 