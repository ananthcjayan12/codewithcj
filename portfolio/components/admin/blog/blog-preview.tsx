"use client"

import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface BlogPreviewProps {
  isOpen: boolean
  onClose: () => void
  title: string
  excerpt: string
  content: string
  tags: string[]
}

export function BlogPreview({ isOpen, onClose, title, excerpt, content, tags }: BlogPreviewProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold">{title}</DialogTitle>
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {tags.map(tag => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </DialogHeader>

        <div className="mt-4 text-lg text-muted-foreground">
          {excerpt}
        </div>

        <div className="prose dark:prose-invert max-w-none mt-8">
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </div>
      </DialogContent>
    </Dialog>
  )
} 