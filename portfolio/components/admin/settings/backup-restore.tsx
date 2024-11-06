"use client"

import { useState } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useRouter } from "next/navigation"
import { Download, Upload, AlertCircle } from "lucide-react"

export function BackupRestore() {
  const router = useRouter()
  const supabase = createClientComponentClient()
  const [isExporting, setIsExporting] = useState(false)
  const [isImporting, setIsImporting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleExport = async () => {
    setIsExporting(true)
    setError(null)

    try {
      // Export data from each table
      const { data: profileData } = await supabase.from('profiles').select('*')
      const { data: projectsData } = await supabase.from('projects').select('*')
      const { data: blogData } = await supabase.from('blog_posts').select('*')
      const { data: mediaData } = await supabase.from('media').select('*')
      const { data: settingsData } = await supabase.from('settings').select('*')

      const backupData = {
        version: "1.0",
        timestamp: new Date().toISOString(),
        data: {
          profiles: profileData,
          projects: projectsData,
          blog_posts: blogData,
          media: mediaData,
          settings: settingsData
        }
      }

      // Create and download backup file
      const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `portfolio-backup-${new Date().toISOString()}.json`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error) {
      console.error('Error exporting data:', error)
      setError('Failed to export data')
    } finally {
      setIsExporting(false)
    }
  }

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return
    setIsImporting(true)
    setError(null)

    try {
      const file = e.target.files[0]
      const fileContent = await file.text()
      const backupData = JSON.parse(fileContent)

      // Validate backup format
      if (!backupData.version || !backupData.data) {
        throw new Error('Invalid backup file format')
      }

      // Import data to each table
      for (const [table, data] of Object.entries(backupData.data)) {
        const { error } = await supabase
          .from(table)
          .upsert(data as any[])

        if (error) throw error
      }

      router.refresh()
    } catch (error) {
      console.error('Error importing data:', error)
      setError('Failed to import data')
    } finally {
      setIsImporting(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Backup & Restore</h2>
        <p className="text-sm text-muted-foreground">
          Export your data for backup or import from a previous backup.
        </p>
      </div>

      {error && (
        <div className="flex items-center gap-2 p-4 rounded-md bg-destructive/10 text-destructive">
          <AlertCircle className="h-4 w-4" />
          <p className="text-sm">{error}</p>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={handleExport}
          disabled={isExporting}
          className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
        >
          <Download className="mr-2 h-4 w-4" />
          {isExporting ? "Exporting..." : "Export Data"}
        </button>

        <div className="relative">
          <input
            type="file"
            accept=".json"
            onChange={handleImport}
            disabled={isImporting}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
          />
          <button
            className="inline-flex items-center justify-center rounded-md border px-4 py-2 text-sm font-medium hover:bg-accent disabled:opacity-50"
            disabled={isImporting}
          >
            <Upload className="mr-2 h-4 w-4" />
            {isImporting ? "Importing..." : "Import Data"}
          </button>
        </div>
      </div>

      <div className="rounded-md bg-muted p-4">
        <h3 className="text-sm font-medium mb-2">Note:</h3>
        <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
          <li>Backup includes all your content and settings</li>
          <li>Media files need to be backed up separately</li>
          <li>Import will overwrite existing data</li>
        </ul>
      </div>
    </div>
  )
} 