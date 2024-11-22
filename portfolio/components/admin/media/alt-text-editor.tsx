"use client"

import { useState } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useRouter } from "next/navigation"

interface AltTextEditorProps {
  fileId: string
  currentAltText: string | null
  isOpen: boolean
  onClose: () => void
}

export function AltTextEditor({ fileId, currentAltText, isOpen, onClose }: AltTextEditorProps) {
  const router = useRouter()
  const supabase = createClientComponentClient()
  const [altText, setAltText] = useState(currentAltText || "")
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async () => {
    setIsSaving(true)
    try {
      const { error } = await supabase
        .from('media')
        .update({ alt_text: altText })
        .eq('id', fileId)

      if (error) throw error

      router.refresh()
      onClose()
    } catch (error) {
      console.error('Error updating alt text:', error)
    } finally {
      setIsSaving(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50">
      <div className="fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] w-full max-w-lg">
        <div className="bg-background border rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Edit Alt Text</h2>
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="alt-text" className="text-sm font-medium">
                Alternative Text
              </label>
              <textarea
                id="alt-text"
                value={altText}
                onChange={(e) => setAltText(e.target.value)}
                className="w-full rounded-md border bg-background px-4 py-2 min-h-[100px]"
                placeholder="Describe the image for accessibility"
              />
              <p className="text-xs text-muted-foreground">
                Provide a descriptive text that conveys the content and function of the image.
              </p>
            </div>
            <div className="flex justify-end gap-4">
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-md hover:bg-accent"
                disabled={isSaving}
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
              >
                {isSaving ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 