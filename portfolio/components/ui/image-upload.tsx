"use client"

import { useState } from "react"
import { Upload, X } from "lucide-react"
import Image from "next/image"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

interface ImageUploadProps {
  value?: string
  onChange: (url: string) => void
  onRemove: () => void
  bucket: "blog" | "projects"
}

export function ImageUpload({
  value,
  onChange,
  onRemove,
  bucket
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const supabase = createClientComponentClient()

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      setIsUploading(true)

      // Generate unique filename
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random().toString(36).slice(2)}.${fileExt}`

      // Upload to Supabase storage
      const { data, error } = await supabase
        .storage
        .from('images')
        .upload(`${bucket}/${fileName}`, file, {
          cacheControl: '3600',
          upsert: false
        })

      if (error) throw error

      // Get public URL
      const { data: { publicUrl } } = supabase
        .storage
        .from('images')
        .getPublicUrl(`${bucket}/${fileName}`)

      onChange(publicUrl)
    } catch (error) {
      console.error('Error uploading image:', error)
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="flex items-center gap-4">
      <div className="relative w-40 h-40">
        {value ? (
          <>
            <Image
              src={value}
              alt="Upload"
              fill
              className="object-cover rounded-lg"
            />
            <button
              onClick={onRemove}
              className="absolute -top-2 -right-2 p-1 rounded-full bg-red-500 text-white hover:bg-red-600"
            >
              <X className="w-4 h-4" />
            </button>
          </>
        ) : (
          <label className="flex flex-col items-center justify-center w-full h-full border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Upload className="w-8 h-8 text-gray-400" />
              <p className="text-sm text-gray-500 mt-2">Click to upload</p>
            </div>
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleUpload}
              disabled={isUploading}
            />
          </label>
        )}
      </div>
      {isUploading && (
        <p className="text-sm text-gray-500">Uploading...</p>
      )}
    </div>
  )
} 