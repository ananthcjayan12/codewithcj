"use client"

import { useState } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useRouter } from "next/navigation"
import { Trash2, Image, FileText, Download } from "lucide-react"
import { formatBytes } from "@/lib/utils"
import { SearchFilter } from "./search-filter"
import { Pagination } from "./pagination"
import { BulkActions } from "./bulk-actions"

interface MediaFile {
  id: string
  filename: string
  path: string
  size: number
  mime_type: string
  alt_text: string | null
  created_at: string
}

interface MediaLibraryProps {
  files: MediaFile[]
}

const ITEMS_PER_PAGE = 12

export function MediaLibrary({ files }: MediaLibraryProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState("")
  const [fileType, setFileType] = useState("All")
  const [selectedFiles, setSelectedFiles] = useState<string[]>([])

  // Filter files based on search and type
  const filteredFiles = files.filter((file) => {
    const matchesSearch = file.filename.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = fileType === "All" 
      ? true 
      : fileType === "Images" 
        ? file.mime_type.startsWith('image/')
        : fileType === "Documents"
          ? file.mime_type.includes('document') || file.mime_type.includes('pdf')
          : fileType === "Videos"
            ? file.mime_type.startsWith('video/')
            : !file.mime_type.match(/^(image|video|document|pdf)/)

    return matchesSearch && matchesType
  })

  // Calculate pagination
  const totalPages = Math.ceil(filteredFiles.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const paginatedFiles = filteredFiles.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  const router = useRouter()
  const supabase = createClientComponentClient()
  const [selectedFile, setSelectedFile] = useState<string | null>(null)

  const handleDelete = async (id: string) => {
    const { error } = await supabase
      .from('media')
      .delete()
      .eq('id', id)

    if (!error) {
      router.refresh()
    }
  }

  const getFileIcon = (mimeType: string) => {
    if (mimeType.startsWith('image/')) {
      return <Image className="h-6 w-6" />
    }
    return <FileText className="h-6 w-6" />
  }

  return (
    <div className="space-y-6">
      <SearchFilter 
        onSearch={setSearchTerm}
        onFilterChange={setFileType}
      />

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {paginatedFiles.map((file) => (
          <div
            key={file.id}
            className={`group relative rounded-lg border p-4 hover:bg-accent transition-colors ${
              selectedFile === file.id ? 'ring-2 ring-primary' : ''
            }`}
            onClick={() => setSelectedFile(file.id)}
          >
            <div className="aspect-square mb-2 flex items-center justify-center rounded-md bg-muted">
              {getFileIcon(file.mime_type)}
            </div>
            <div className="space-y-1">
              <p className="truncate text-sm font-medium">{file.filename}</p>
              <p className="text-xs text-muted-foreground">{formatBytes(file.size)}</p>
            </div>
            <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  window.open(file.path, '_blank')
                }}
                className="p-1.5 rounded-md hover:bg-background"
                title="Download"
              >
                <Download className="h-4 w-4" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  handleDelete(file.id)
                }}
                className="p-1.5 rounded-md hover:bg-destructive/10 text-destructive"
                title="Delete"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredFiles.length > ITEMS_PER_PAGE && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}

      <BulkActions
        selectedFiles={selectedFiles}
        onClearSelection={() => setSelectedFiles([])}
      />
    </div>
  )
} 