"use client"

import { useState } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useRouter } from "next/navigation"

interface AnalyticsSettings {
  google_analytics_id?: string
  google_tag_manager_id?: string
  enable_page_views: boolean
  enable_event_tracking: boolean
  excluded_paths: string[]
}

interface AnalyticsSettingsProps {
  initialData?: AnalyticsSettings
}

export function AnalyticsSettings({ initialData }: AnalyticsSettingsProps) {
  const router = useRouter()
  const supabase = createClientComponentClient()
  const [isLoading, setIsLoading] = useState(false)
  const [settings, setSettings] = useState<AnalyticsSettings>(initialData || {
    enable_page_views: true,
    enable_event_tracking: true,
    excluded_paths: ['/admin', '/api'],
  })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const { error } = await supabase
        .from('settings')
        .update({
          analytics: settings,
          updated_at: new Date().toISOString()
        })
        .eq('id', 1)

      if (error) throw error

      router.refresh()
    } catch (error) {
      console.error('Error saving analytics settings:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Analytics Settings</h2>
        
        <div className="space-y-2">
          <label htmlFor="ga_id" className="text-sm font-medium">
            Google Analytics ID
          </label>
          <input
            id="ga_id"
            type="text"
            value={settings.google_analytics_id || ''}
            onChange={(e) => setSettings(prev => ({ ...prev, google_analytics_id: e.target.value }))}
            className="w-full rounded-md border bg-background px-4 py-2"
            placeholder="UA-XXXXXXXXX-X or G-XXXXXXXXXX"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="gtm_id" className="text-sm font-medium">
            Google Tag Manager ID
          </label>
          <input
            id="gtm_id"
            type="text"
            value={settings.google_tag_manager_id || ''}
            onChange={(e) => setSettings(prev => ({ ...prev, google_tag_manager_id: e.target.value }))}
            className="w-full rounded-md border bg-background px-4 py-2"
            placeholder="GTM-XXXXXXX"
          />
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <input
              id="page_views"
              type="checkbox"
              checked={settings.enable_page_views}
              onChange={(e) => setSettings(prev => ({ ...prev, enable_page_views: e.target.checked }))}
              className="rounded border-gray-300"
            />
            <label htmlFor="page_views" className="text-sm font-medium">
              Enable Page View Tracking
            </label>
          </div>

          <div className="flex items-center gap-2">
            <input
              id="event_tracking"
              type="checkbox"
              checked={settings.enable_event_tracking}
              onChange={(e) => setSettings(prev => ({ ...prev, enable_event_tracking: e.target.checked }))}
              className="rounded border-gray-300"
            />
            <label htmlFor="event_tracking" className="text-sm font-medium">
              Enable Event Tracking
            </label>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">
            Excluded Paths
          </label>
          <div className="space-y-2">
            {settings.excluded_paths.map((path, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  value={path}
                  onChange={(e) => {
                    const newPaths = [...settings.excluded_paths]
                    newPaths[index] = e.target.value
                    setSettings(prev => ({ ...prev, excluded_paths: newPaths }))
                  }}
                  className="flex-1 rounded-md border bg-background px-4 py-2"
                />
                <button
                  type="button"
                  onClick={() => {
                    setSettings(prev => ({
                      ...prev,
                      excluded_paths: prev.excluded_paths.filter((_, i) => i !== index)
                    }))
                  }}
                  className="px-3 py-2 text-sm text-destructive hover:bg-destructive/10 rounded-md"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => {
                setSettings(prev => ({
                  ...prev,
                  excluded_paths: [...prev.excluded_paths, '']
                }))
              }}
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Add Path
            </button>
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
      >
        {isLoading ? "Saving..." : "Save Analytics Settings"}
      </button>
    </form>
  )
} 