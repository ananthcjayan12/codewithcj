"use client"

import { useState } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useRouter } from "next/navigation"
import { Trash2, FolderInput, Check } from "lucide-react"

interface BulkActionsProps {
  selectedFiles: string[]
  onClearSelection: () => void
}

export function BulkActions({ selectedFiles, onClearSelection }: BulkActionsProps) {
  const router = useRouter()
  const supabase = createClientComponentClient()
  const [isDeleting, setIsDeleting] = useState(false)
  const [isMoving, setIsMoving] = useState(false)

  const handleBulkDelete = async () => {
    if (!selectedFiles.length) return
    setIsDeleting(true)

    try {
      // Delete files from storage
      const { error: storageError } = await supabase.storage
        .from('media')
        .remove(selectedFiles)

      if (storageError) throw storageError

      // Delete records from database
      const { error: dbError } = await supabase
        .from('media')
        .delete()
        .in('id', selectedFiles)

      if (dbError) throw dbError

      router.refresh()
      onClearSelection()
    } catch (error) {
      console.error('Error deleting files:', error)
    } finally {
      setIsDeleting(false)
    }
  }

  if (!selectedFiles.length) return null

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-background border rounded-lg shadow-lg p-4 flex items-center gap-4">
      <span className="text-sm font-medium">
        {selectedFiles.length} file{selectedFiles.length > 1 ? 's' : ''} selected
      </span>

      <div className="flex items-center gap-2">
        <button
          onClick={handleBulkDelete}
          disabled={isDeleting}
          className="inline-flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium bg-destructive text-destructive-foreground hover:bg-destructive/90 disabled:opacity-50"
        >
          <Trash2 className="mr-2 h-4 w-4" />
          {isDeleting ? "Deleting..." : "Delete"}
        </button>

        <button
          onClick={onClearSelection}
          className="inline-flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent"
        >
          Clear Selection
        </button>
      </div>
    </div>
  )
} 