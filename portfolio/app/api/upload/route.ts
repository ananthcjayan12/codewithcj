import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export const runtime = 'edge'

export async function POST(request: Request) {
  const supabase = createRouteHandlerClient({ cookies })

  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const folder = formData.get('folder') as string || 'general'

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      )
    }

    // Upload file to Supabase Storage
    const { data: storageData, error: storageError } = await supabase
      .storage
      .from('media')
      .upload(`${folder}/${Date.now()}-${file.name}`, file)

    if (storageError) throw storageError

    // Create media record in database
    const { data: mediaData, error: dbError } = await supabase
      .from('media')
      .insert({
        filename: file.name,
        path: storageData.path,
        size: file.size,
        mime_type: file.type,
        folder: folder
      })
      .select()
      .single()

    if (dbError) throw dbError

    return NextResponse.json({ data: mediaData })
  } catch (error) {
    console.error('Error uploading file:', error)
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: Request) {
  const supabase = createRouteHandlerClient({ cookies })
  const { searchParams } = new URL(request.url)
  const path = searchParams.get('path')

  if (!path) {
    return NextResponse.json(
      { error: 'File path is required' },
      { status: 400 }
    )
  }

  try {
    // Delete file from storage
    const { error: storageError } = await supabase
      .storage
      .from('media')
      .remove([path])

    if (storageError) throw storageError

    // Delete record from database
    const { error: dbError } = await supabase
      .from('media')
      .delete()
      .eq('path', path)

    if (dbError) throw dbError

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting file:', error)
    return NextResponse.json(
      { error: 'Failed to delete file' },
      { status: 500 }
    )
  }
} 