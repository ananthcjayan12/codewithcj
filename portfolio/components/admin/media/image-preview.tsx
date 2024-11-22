"use client"

import { useState } from "react"
import Image from "next/image"
import { X, Download, ExternalLink } from "lucide-react"
import { formatBytes } from "@/lib/utils"

interface ImagePreviewProps {
  file: {
    id: string
    filename: string
    path: string
    size: number
    mime_type: string
    alt_text: string | null
    created_at: string
  }
  onClose: () => void
}

export function ImagePreview({ file, onClose }: ImagePreviewProps) {
  const [isLoading, setIsLoading] = useState(true)

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50">
      <div className="fixed inset-x-4 top-[50%] translate-y-[-50%] max-h-[90vh] bg-background border rounded-lg shadow-lg md:inset-x-auto md:left-[50%] md:translate-x-[-50%] md:w-full md:max-w-3xl">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Image Details</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-accent rounded-md"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
          <div className="relative aspect-square bg-muted rounded-md overflow-hidden">
            {file.mime_type.startsWith('image/') && (
              <Image
                src={file.path}
                alt={file.filename}
                fill
                className={`object-contain transition-opacity duration-300 ${
                  isLoading ? 'opacity-0' : 'opacity-100'
                }`}
                onLoadingComplete={() => setIsLoading(false)}
              />
            )}
          </div>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-medium">File Name</h3>
              <p className="text-sm text-muted-foreground">{file.filename}</p>
            </div>
            
            <div>
              <h3 className="font-medium">Type</h3>
              <p className="text-sm text-muted-foreground">{file.mime_type}</p>
            </div>
            
            <div>
              <h3 className="font-medium">Size</h3>
              <p className="text-sm text-muted-foreground">{formatBytes(file.size)}</p>
            </div>
            
            <div>
              <h3 className="font-medium">Uploaded</h3>
              <p className="text-sm text-muted-foreground">{formatDate(file.created_at)}</p>
            </div>
            
            <div>
              <h3 className="font-medium">Alt Text</h3>
              <p className="text-sm text-muted-foreground">
                {file.alt_text || "No alt text provided"}
              </p>
            </div>

            <div className="flex gap-2 pt-4">
              <a
                href={file.path}
                download
                className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
              >
                <Download className="mr-2 h-4 w-4" />
                Download
              </a>
              <a
                href={file.path}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-md border px-4 py-2 text-sm font-medium hover:bg-accent"
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                Open
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 