"use client"

import { useState } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, Upload, X } from "lucide-react"
import Image from "next/image"

interface ImageUploadProps {
  onUploadComplete: (url: string) => void
  currentImage?: string
  label?: string
}

export function ImageUpload({ onUploadComplete, currentImage, label = "Image" }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [preview, setPreview] = useState<string | null>(currentImage || null)

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Reset states
    setError(null)
    setIsUploading(true)

    try {
      // Validate file type and size
      if (!file.type.startsWith('image/')) {
        throw new Error('Please upload an image file')
      }
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        throw new Error('Image size should be less than 5MB')
      }

      const supabase = createClientComponentClient()
      
      // Generate a unique file name
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`
      const filePath = `projects/${fileName}`

      // Upload to Supabase Storage
      const { error: uploadError, data } = await supabase
        .storage
        .from('images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        })

      if (uploadError) throw uploadError

      // Get public URL
      const { data: { publicUrl } } = supabase
        .storage
        .from('images')
        .getPublicUrl(filePath)

      // Set preview and notify parent
      setPreview(publicUrl)
      onUploadComplete(publicUrl)
    } catch (err) {
      console.error('Error uploading image:', err)
      setError(err instanceof Error ? err.message : 'Failed to upload image')
    } finally {
      setIsUploading(false)
    }
  }

  const handleRemove = () => {
    setPreview(null)
    onUploadComplete('')
  }

  return (
    <div className="space-y-4">
      <Label htmlFor="image-upload">{label}</Label>
      
      {preview ? (
        <div className="relative aspect-video w-full max-w-xl overflow-hidden rounded-lg border">
          <Image
            src={preview}
            alt="Preview"
            fill
            className="object-cover"
          />
          <button
            onClick={handleRemove}
            className="absolute right-2 top-2 rounded-full bg-destructive p-1 text-destructive-foreground hover:bg-destructive/90"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-4">
          <Button
            type="button"
            variant="outline"
            disabled={isUploading}
            onClick={() => document.getElementById('image-upload')?.click()}
            className="w-full max-w-xl"
          >
            {isUploading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" />
                Upload Image
              </>
            )}
          </Button>
          <Input
            id="image-upload"
            type="file"
            accept="image/*"
            onChange={handleUpload}
            className="hidden"
          />
        </div>
      )}
      
      {error && (
        <p className="text-sm text-destructive">
          {error}
        </p>
      )}
    </div>
  )
} 