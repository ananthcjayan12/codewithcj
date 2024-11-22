"use client"

import { useState } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useRouter } from "next/navigation"
import { Folder, FolderPlus, MoreVertical } from "lucide-react"

interface FolderManagerProps {
  currentFolder: string | null
  onFolderChange: (folder: string | null) => void
}

export function FolderManager({ currentFolder, onFolderChange }: FolderManagerProps) {
  const router = useRouter()
  const supabase = createClientComponentClient()
  const [isCreating, setIsCreating] = useState(false)
  const [newFolderName, setNewFolderName] = useState("")
  const [folders, setFolders] = useState<string[]>([])

  const handleCreateFolder = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newFolderName.trim()) return

    try {
      const { error } = await supabase
        .from('media_folders')
        .insert({ name: newFolderName })

      if (error) throw error

      setFolders([...folders, newFolderName])
      setNewFolderName("")
      setIsCreating(false)
      router.refresh()
    } catch (error) {
      console.error('Error creating folder:', error)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-medium">Folders</h3>
        <button
          onClick={() => setIsCreating(true)}
          className="p-2 hover:bg-accent rounded-md"
        >
          <FolderPlus className="h-4 w-4" />
        </button>
      </div>

      <div className="space-y-1">
        <button
          onClick={() => onFolderChange(null)}
          className={`w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm ${
            currentFolder === null ? 'bg-accent' : 'hover:bg-accent'
          }`}
        >
          <Folder className="h-4 w-4" />
          All Files
        </button>

        {folders.map((folder) => (
          <button
            key={folder}
            onClick={() => onFolderChange(folder)}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-sm ${
              currentFolder === folder ? 'bg-accent' : 'hover:bg-accent'
            }`}
          >
            <span className="flex items-center gap-2">
              <Folder className="h-4 w-4" />
              {folder}
            </span>
            <MoreVertical className="h-4 w-4 opacity-0 group-hover:opacity-100" />
          </button>
        ))}
      </div>

      {isCreating && (
        <form onSubmit={handleCreateFolder} className="space-y-2">
          <input
            type="text"
            value={newFolderName}
            onChange={(e) => setNewFolderName(e.target.value)}
            placeholder="Folder name"
            className="w-full rounded-md border bg-background px-3 py-2 text-sm"
            autoFocus
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsCreating(false)}
              className="px-3 py-1 text-sm hover:bg-accent rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-3 py-1 text-sm bg-primary text-primary-foreground hover:bg-primary/90 rounded-md"
            >
              Create
            </button>
          </div>
        </form>
      )}
    </div>
  )
} 