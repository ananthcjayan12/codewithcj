"use client"

import { useState, useEffect } from "react"
import { Search, Filter } from "lucide-react"

interface SearchFilterProps {
  onSearch: (term: string) => void
  onFilterChange: (type: string) => void
}

const fileTypes = [
  "All",
  "Images",
  "Documents",
  "Videos",
  "Others"
]

export function SearchFilter({ onSearch, onFilterChange }: SearchFilterProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState("All")

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      onSearch(searchTerm)
    }, 300)

    return () => clearTimeout(delayDebounceFn)
  }, [searchTerm, onSearch])

  const handleTypeChange = (type: string) => {
    setSelectedType(type)
    onFilterChange(type)
  }

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search files..."
          className="w-full rounded-md border bg-background pl-10 pr-4 py-2 text-sm"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        {fileTypes.map((type) => (
          <button
            key={type}
            onClick={() => handleTypeChange(type)}
            className={`inline-flex items-center rounded-full px-3 py-1 text-sm ${
              selectedType === type
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            }`}
          >
            {type === "All" && <Filter className="mr-1 h-3 w-3" />}
            {type}
          </button>
        ))}
      </div>
    </div>
  )
} 