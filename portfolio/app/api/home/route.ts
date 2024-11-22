import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'
import { headers } from 'next/headers'

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
const verifyApiKey = () => {
  const headersList = headers()
  const apiKey = headersList.get('x-api-key')
  return apiKey === process.env.API_SECRET_KEY
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
    if (!verifyApiKey()) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const body = await request.json()

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