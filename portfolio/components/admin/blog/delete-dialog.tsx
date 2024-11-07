"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface DeleteDialogProps {
  postId: string
  postTitle: string
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

export function DeleteDialog({ postId, postTitle, isOpen, onClose, onSuccess }: DeleteDialogProps) {
  const [isDeleting, setIsDeleting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleDelete = async () => {
    setIsDeleting(true)
    setError(null)
    
    try {
      const response = await fetch(`/api/blog?id=${postId}`, {
        method: 'DELETE',
        headers: {
          'x-api-key': process.env.NEXT_PUBLIC_API_KEY || '',
        }
      })

      if (!response.ok) {
        throw new Error('Failed to delete post')
      }

      onSuccess()
    } catch (error) {
      console.error('Error deleting post:', error)
      setError('Failed to delete post. Please try again.')
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Blog Post</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete &quot;{postTitle}&quot;? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        {error && (
          <div className="text-sm text-destructive mt-2">
            {error}
          </div>
        )}
        <div className="flex justify-end gap-4 mt-4">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isDeleting}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
} 