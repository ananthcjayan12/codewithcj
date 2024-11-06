"use client"

import { useState } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useRouter } from "next/navigation"
import { Shield, Key, Lock } from "lucide-react"

interface PasswordRequirements {
  min_length: number
  require_numbers: boolean
  require_symbols: boolean
  require_uppercase: boolean
}

interface SecuritySettings {
  two_factor_enabled: boolean
  password_requirements: PasswordRequirements
  session_timeout: number
  allowed_ips: string[]
  max_login_attempts: number
}

interface SecuritySettingsProps {
  initialData?: SecuritySettings
}

export function SecuritySettings({ initialData }: SecuritySettingsProps) {
  const router = useRouter()
  const supabase = createClientComponentClient()
  const [isLoading, setIsLoading] = useState(false)
  const [settings, setSettings] = useState<SecuritySettings>(initialData || {
    two_factor_enabled: false,
    password_requirements: {
      min_length: 8,
      require_numbers: true,
      require_symbols: true,
      require_uppercase: true
    },
    session_timeout: 24,
    allowed_ips: [],
    max_login_attempts: 5
  })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const { error } = await supabase
        .from('settings')
        .update({
          security: settings,
          updated_at: new Date().toISOString()
        })
        .eq('id', 1)

      if (error) throw error

      router.refresh()
    } catch (error) {
      console.error('Error saving security settings:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Security Settings</h2>

        <div className="grid gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              <h3 className="font-medium">Authentication</h3>
            </div>

            <div className="ml-7 space-y-4">
              <div className="flex items-center gap-2">
                <input
                  id="2fa"
                  type="checkbox"
                  checked={settings.two_factor_enabled}
                  onChange={(e) => setSettings(prev => ({
                    ...prev,
                    two_factor_enabled: e.target.checked
                  }))}
                  className="rounded border-gray-300"
                />
                <label htmlFor="2fa" className="text-sm font-medium">
                  Enable Two-Factor Authentication
                </label>
              </div>

              <div className="space-y-2">
                <label htmlFor="max_attempts" className="text-sm font-medium">
                  Maximum Login Attempts
                </label>
                <input
                  id="max_attempts"
                  type="number"
                  min="1"
                  max="10"
                  value={settings.max_login_attempts}
                  onChange={(e) => setSettings(prev => ({
                    ...prev,
                    max_login_attempts: parseInt(e.target.value)
                  }))}
                  className="w-full rounded-md border bg-background px-4 py-2"
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Key className="h-5 w-5 text-primary" />
              <h3 className="font-medium">Password Requirements</h3>
            </div>

            <div className="ml-7 space-y-4">
              <div className="space-y-2">
                <label htmlFor="min_length" className="text-sm font-medium">
                  Minimum Length
                </label>
                <input
                  id="min_length"
                  type="number"
                  min="6"
                  max="32"
                  value={settings.password_requirements.min_length}
                  onChange={(e) => setSettings(prev => ({
                    ...prev,
                    password_requirements: {
                      ...prev.password_requirements,
                      min_length: parseInt(e.target.value)
                    }
                  }))}
                  className="w-full rounded-md border bg-background px-4 py-2"
                />
              </div>

              <div className="space-y-2">
                {(Object.entries(settings.password_requirements) as [keyof PasswordRequirements, boolean | number][])
                  .filter(([key]) => key !== 'min_length')
                  .map(([key, value]) => (
                    <div key={key} className="flex items-center gap-2">
                      <input
                        id={key}
                        type="checkbox"
                        checked={Boolean(value)}
                        onChange={(e) => setSettings(prev => ({
                          ...prev,
                          password_requirements: {
                            ...prev.password_requirements,
                            [key]: e.target.checked
                          }
                        }))}
                        className="rounded border-gray-300"
                      />
                      <label htmlFor={key} className="text-sm font-medium">
                        {key.split('_').map(word => 
                          word.charAt(0).toUpperCase() + word.slice(1)
                        ).join(' ')}
                      </label>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Lock className="h-5 w-5 text-primary" />
              <h3 className="font-medium">Session Security</h3>
            </div>

            <div className="ml-7 space-y-4">
              <div className="space-y-2">
                <label htmlFor="session_timeout" className="text-sm font-medium">
                  Session Timeout (hours)
                </label>
                <input
                  id="session_timeout"
                  type="number"
                  min="1"
                  max="72"
                  value={settings.session_timeout}
                  onChange={(e) => setSettings(prev => ({
                    ...prev,
                    session_timeout: parseInt(e.target.value)
                  }))}
                  className="w-full rounded-md border bg-background px-4 py-2"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Allowed IP Addresses</label>
                <div className="space-y-2">
                  {settings.allowed_ips.map((ip, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={ip}
                        onChange={(e) => {
                          const newIps = [...settings.allowed_ips]
                          newIps[index] = e.target.value
                          setSettings(prev => ({ ...prev, allowed_ips: newIps }))
                        }}
                        className="flex-1 rounded-md border bg-background px-4 py-2"
                        placeholder="xxx.xxx.xxx.xxx"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setSettings(prev => ({
                            ...prev,
                            allowed_ips: prev.allowed_ips.filter((_, i) => i !== index)
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
                        allowed_ips: [...prev.allowed_ips, '']
                      }))
                    }}
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Add IP Address
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
      >
        {isLoading ? "Saving..." : "Save Security Settings"}
      </button>
    </form>
  )
} 