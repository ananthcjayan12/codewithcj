import * as z from "zod"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

export const homeFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  role: z.string().min(1, "Role is required"),
  summary: z.string().min(1, "Summary is required"),
  long_summary: z.string().optional(),
  avatar_url: z.string().optional(),
  contact_phone: z.string().optional(),
  contact_email: z.string().email().optional(),
  social_links: z.object({
    twitter: z.string().optional(),
    linkedin: z.string().optional(),
    github: z.string().optional(),
  }),
})

export type HomeFormValues = z.infer<typeof homeFormSchema>

export interface ImageUploadResponse {
  url: string
  error?: string
}

export async function uploadAvatar(file: File): Promise<ImageUploadResponse> {
  try {
    const supabase = createClientComponentClient()
    
    // Validate file type and size
    if (!file.type.startsWith('image/')) {
      throw new Error('Please upload an image file')
    }
    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      throw new Error('Image size should be less than 5MB')
    }

    // List buckets to debug
    const { data: buckets, error: bucketsError } = await supabase
      .storage
      .listBuckets()
    
    console.log('Available buckets:', buckets)
    if (bucketsError) {
      console.error('Error listing buckets:', bucketsError)
    }

    // Generate a unique file name
    const fileExt = file.name.split('.').pop()
    const fileName = `avatar-${Date.now()}.${fileExt}`

    // Upload to Supabase Storage in the avatars bucket
    const { error: uploadError, data } = await supabase
      .storage
      .from('avatars')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false
      })

    if (uploadError) {
      console.error('Upload error details:', uploadError)
      throw uploadError
    }

    // Get public URL from avatars bucket
    const { data: { publicUrl } } = supabase
      .storage
      .from('avatars')
      .getPublicUrl(fileName)

    return { url: publicUrl }
  } catch (error) {
    console.error('Detailed upload error:', error)
    return { 
      url: '', 
      error: error instanceof Error ? error.message : 'Failed to upload image' 
    }
  }
} 