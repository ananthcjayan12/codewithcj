"use client"

import { useState } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useRouter } from "next/navigation"

interface DeleteDialogProps {
  fileId: string
  fileName: string
  filePath: string
  isOpen: boolean
  onClose: () => void
}

export function DeleteDialog({ fileId, fileName, filePath, isOpen, onClose }: DeleteDialogProps) {
  const router = useRouter()
  const supabase = createClientComponentClient()
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      // Delete from storage
      const { error: storageError } = await supabase.storage
        .from('media')
        .remove([filePath])

      if (storageError) throw storageError

      // Delete from database
      const { error: dbError } = await supabase
        .from('media')
        .delete()
        .eq('id', fileId)

      if (dbError) throw dbError

      router.refresh()
      onClose()
    } catch (error) {
      console.error('Error deleting file:', error)
    } finally {
      setIsDeleting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50">
      <div className="fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] w-full max-w-lg">
        <div className="bg-background border rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Delete File</h2>
          <p className="text-muted-foreground mb-4">
            Are you sure you want to delete &quot;{fileName}&quot;? This action cannot be undone.
          </p>
          <div className="flex justify-end gap-4">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-md hover:bg-accent"
              disabled={isDeleting}
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="px-4 py-2 rounded-md bg-destructive text-destructive-foreground hover:bg-destructive/90 disabled:opacity-50"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 