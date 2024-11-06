import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const supabase = createRouteHandlerClient({ cookies })
  const { searchParams } = new URL(request.url)
  const table = searchParams.get('table')
  const id = searchParams.get('id')

  if (!table) {
    return NextResponse.json(
      { error: 'Table parameter is required' },
      { status: 400 }
    )
  }

  try {
    let query = supabase.from(table).select('*')
    
    if (id) {
      query = query.eq('id', id)
    }

    const { data, error } = await query

    if (error) throw error

    return NextResponse.json({ data })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch data' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  const supabase = createRouteHandlerClient({ cookies })
  const { table, data } = await request.json()

  if (!table || !data) {
    return NextResponse.json(
      { error: 'Table and data are required' },
      { status: 400 }
    )
  }

  try {
    const { data: result, error } = await supabase
      .from(table)
      .insert(data)
      .select()

    if (error) throw error

    return NextResponse.json({ data: result })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to insert data' },
      { status: 500 }
    )
  }
}

export async function PUT(request: Request) {
  const supabase = createRouteHandlerClient({ cookies })
  const { table, id, data } = await request.json()

  if (!table || !id || !data) {
    return NextResponse.json(
      { error: 'Table, id, and data are required' },
      { status: 400 }
    )
  }

  try {
    const { data: result, error } = await supabase
      .from(table)
      .update(data)
      .eq('id', id)
      .select()

    if (error) throw error

    return NextResponse.json({ data: result })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update data' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: Request) {
  const supabase = createRouteHandlerClient({ cookies })
  const { searchParams } = new URL(request.url)
  const table = searchParams.get('table')
  const id = searchParams.get('id')

  if (!table || !id) {
    return NextResponse.json(
      { error: 'Table and id parameters are required' },
      { status: 400 }
    )
  }

  try {
    const { error } = await supabase
      .from(table)
      .delete()
      .eq('id', id)

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete data' },
      { status: 500 }
    )
  }
} 