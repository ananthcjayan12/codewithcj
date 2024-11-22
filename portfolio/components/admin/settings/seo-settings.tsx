"use client"

import { useState } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useRouter } from "next/navigation"

interface SeoSettings {
  meta_title: string
  meta_description: string
  meta_keywords: string[]
  og_image: string
  twitter_handle: string
  robots_txt: string
  sitemap_enabled: boolean
  structured_data: {
    organization: {
      name: string
      logo: string
      social_profiles: string[]
    }
    person: {
      name: string
      job_title: string
      image: string
    }
  }
}

interface SeoSettingsProps {
  initialData?: SeoSettings
}

export function SeoSettings({ initialData }: SeoSettingsProps) {
  const router = useRouter()
  const supabase = createClientComponentClient()
  const [isLoading, setIsLoading] = useState(false)
  const [settings, setSettings] = useState<SeoSettings>(initialData || {
    meta_title: "",
    meta_description: "",
    meta_keywords: [],
    og_image: "",
    twitter_handle: "",
    robots_txt: "User-agent: *\nAllow: /",
    sitemap_enabled: true,
    structured_data: {
      organization: {
        name: "",
        logo: "",
        social_profiles: []
      },
      person: {
        name: "",
        job_title: "",
        image: ""
      }
    }
  })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const { error } = await supabase
        .from('settings')
        .update({
          seo: settings,
          updated_at: new Date().toISOString()
        })
        .eq('id', 1)

      if (error) throw error

      router.refresh()
    } catch (error) {
      console.error('Error saving SEO settings:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">SEO Settings</h2>
        
        <div className="space-y-2">
          <label htmlFor="meta_title" className="text-sm font-medium">
            Default Meta Title
          </label>
          <input
            id="meta_title"
            type="text"
            value={settings.meta_title}
            onChange={(e) => setSettings(prev => ({ ...prev, meta_title: e.target.value }))}
            className="w-full rounded-md border bg-background px-4 py-2"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="meta_description" className="text-sm font-medium">
            Default Meta Description
          </label>
          <textarea
            id="meta_description"
            value={settings.meta_description}
            onChange={(e) => setSettings(prev => ({ ...prev, meta_description: e.target.value }))}
            className="w-full rounded-md border bg-background px-4 py-2"
            rows={3}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Meta Keywords</label>
          <div className="space-y-2">
            {settings.meta_keywords.map((keyword, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  value={keyword}
                  onChange={(e) => {
                    const newKeywords = [...settings.meta_keywords]
                    newKeywords[index] = e.target.value
                    setSettings(prev => ({ ...prev, meta_keywords: newKeywords }))
                  }}
                  className="flex-1 rounded-md border bg-background px-4 py-2"
                />
                <button
                  type="button"
                  onClick={() => {
                    setSettings(prev => ({
                      ...prev,
                      meta_keywords: prev.meta_keywords.filter((_, i) => i !== index)
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
                  meta_keywords: [...prev.meta_keywords, '']
                }))
              }}
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Add Keyword
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="robots_txt" className="text-sm font-medium">
            robots.txt Content
          </label>
          <textarea
            id="robots_txt"
            value={settings.robots_txt}
            onChange={(e) => setSettings(prev => ({ ...prev, robots_txt: e.target.value }))}
            className="w-full rounded-md border bg-background px-4 py-2 font-mono text-sm"
            rows={5}
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            id="sitemap"
            type="checkbox"
            checked={settings.sitemap_enabled}
            onChange={(e) => setSettings(prev => ({ ...prev, sitemap_enabled: e.target.checked }))}
            className="rounded border-gray-300"
          />
          <label htmlFor="sitemap" className="text-sm font-medium">
            Enable XML Sitemap
          </label>
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
      >
        {isLoading ? "Saving..." : "Save SEO Settings"}
      </button>
    </form>
  )
} 