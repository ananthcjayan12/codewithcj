"use client"

import { useState } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useRouter } from "next/navigation"

interface SiteSettings {
  site_name: string
  site_description: string
  meta_keywords: string
  google_analytics_id?: string
  social_links: {
    twitter?: string
    facebook?: string
    instagram?: string
    linkedin?: string
  }
  theme: {
    primary_color: string
    secondary_color: string
    font_family: string
  }
}

interface SettingsFormProps {
  initialData?: SiteSettings
}

export function SettingsForm({ initialData }: SettingsFormProps) {
  const router = useRouter()
  const supabase = createClientComponentClient()
  const [isLoading, setIsLoading] = useState(false)
  const [settings, setSettings] = useState<SiteSettings>(initialData || {
    site_name: "",
    site_description: "",
    meta_keywords: "",
    social_links: {},
    theme: {
      primary_color: "#0070F3",
      secondary_color: "#6366F1",
      font_family: "Geist"
    }
  })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const { error } = await supabase
        .from('settings')
        .upsert({
          id: 1, // Single row for settings
          ...settings,
          updated_at: new Date().toISOString()
        })

      if (error) throw error

      router.refresh()
    } catch (error) {
      console.error('Error saving settings:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">General Settings</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="site_name" className="text-sm font-medium">
              Site Name
            </label>
            <input
              id="site_name"
              type="text"
              value={settings.site_name}
              onChange={(e) => setSettings(prev => ({ ...prev, site_name: e.target.value }))}
              className="w-full rounded-md border bg-background px-4 py-2"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="site_description" className="text-sm font-medium">
              Site Description
            </label>
            <input
              id="site_description"
              type="text"
              value={settings.site_description}
              onChange={(e) => setSettings(prev => ({ ...prev, site_description: e.target.value }))}
              className="w-full rounded-md border bg-background px-4 py-2"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="meta_keywords" className="text-sm font-medium">
            Meta Keywords
          </label>
          <input
            id="meta_keywords"
            type="text"
            value={settings.meta_keywords}
            onChange={(e) => setSettings(prev => ({ ...prev, meta_keywords: e.target.value }))}
            className="w-full rounded-md border bg-background px-4 py-2"
            placeholder="Separate keywords with commas"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="google_analytics" className="text-sm font-medium">
            Google Analytics ID
          </label>
          <input
            id="google_analytics"
            type="text"
            value={settings.google_analytics_id}
            onChange={(e) => setSettings(prev => ({ ...prev, google_analytics_id: e.target.value }))}
            className="w-full rounded-md border bg-background px-4 py-2"
            placeholder="UA-XXXXXXXXX-X"
          />
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Theme Settings</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="space-y-2">
            <label htmlFor="primary_color" className="text-sm font-medium">
              Primary Color
            </label>
            <input
              id="primary_color"
              type="color"
              value={settings.theme.primary_color}
              onChange={(e) => setSettings(prev => ({
                ...prev,
                theme: { ...prev.theme, primary_color: e.target.value }
              }))}
              className="w-full h-10 rounded-md border bg-background px-2"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="secondary_color" className="text-sm font-medium">
              Secondary Color
            </label>
            <input
              id="secondary_color"
              type="color"
              value={settings.theme.secondary_color}
              onChange={(e) => setSettings(prev => ({
                ...prev,
                theme: { ...prev.theme, secondary_color: e.target.value }
              }))}
              className="w-full h-10 rounded-md border bg-background px-2"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="font_family" className="text-sm font-medium">
              Font Family
            </label>
            <select
              id="font_family"
              value={settings.theme.font_family}
              onChange={(e) => setSettings(prev => ({
                ...prev,
                theme: { ...prev.theme, font_family: e.target.value }
              }))}
              className="w-full rounded-md border bg-background px-4 py-2"
            >
              <option value="Geist">Geist</option>
              <option value="Inter">Inter</option>
              <option value="Roboto">Roboto</option>
            </select>
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
      >
        {isLoading ? "Saving..." : "Save Settings"}
      </button>
    </form>
  )
} 